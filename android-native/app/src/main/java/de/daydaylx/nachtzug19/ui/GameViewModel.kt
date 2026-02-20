package de.daydaylx.nachtzug19.ui

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import de.daydaylx.nachtzug19.BuildConfig
import de.daydaylx.nachtzug19.data.GameDataStore
import de.daydaylx.nachtzug19.data.StoryRepository
import de.daydaylx.nachtzug19.engine.ContentValidator
import de.daydaylx.nachtzug19.engine.GameEngine
import de.daydaylx.nachtzug19.engine.getAvailableChoices
import de.daydaylx.nachtzug19.engine.resolveSceneNarrative
import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.Ending
import de.daydaylx.nachtzug19.model.GameSave
import de.daydaylx.nachtzug19.model.GameState
import de.daydaylx.nachtzug19.model.ReaderSettings
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.StoryContent
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

private const val TAG = "NachtzugViewModel"

data class UiState(
  val isLoading: Boolean = true,
  val errorMessage: String? = null,
  val story: StoryContent? = null,
  val state: GameState? = null,
  val currentScene: Scene? = null,
  val isOverlayOpen: Boolean = false,
  val availableChoices: List<Choice> = emptyList(),
  val resolvedNarrative: String = "",
  val ending: Ending? = null,
  val settings: ReaderSettings = ReaderSettings(),

  // Story Mode Fields (nur aktiv wenn readerMode == STORY)
  val narrativeBeats: NarrativeBeats? = null,
  val beatIndex: Int = 0,
  val beatPhase: BeatPhase = BeatPhase.LOADING,
  val isBacklogOpen: Boolean = false,
  val backlog: List<BacklogEntry> = emptyList()
)

class GameViewModel(
  private val repository: StoryRepository,
  private val dataStore: GameDataStore
) : ViewModel() {
  private val engine = GameEngine()
  private val _uiState = MutableStateFlow(UiState())
  val uiState: StateFlow<UiState> = _uiState.asStateFlow()
  private var pendingDebugSceneId: String? = null

  private data class HotspotSceneMapping(
    val defaultSceneId: String,
    val fallbackSceneId: String,
    val isActive: (GameState) -> Boolean
  )

  private val hotspotToScene: Map<String, HotspotSceneMapping> = mapOf(
    "npc_boy" to HotspotSceneMapping(
      defaultSceneId = "c2_s02_boy_recorder",
      fallbackSceneId = "c2_s02c_boy_vanish",
      isActive = { state -> !state.items.has_recorder }
    ),
    "npc_conductor" to HotspotSceneMapping(
      defaultSceneId = "c2_control_01_approach",
      fallbackSceneId = "c2_control_01_aftermath",
      isActive = { state -> state.pressure.conductor_attention < 2 }
    ),
    "obj_recorder" to HotspotSceneMapping(
      defaultSceneId = "c2_s02_boy_recorder",
      fallbackSceneId = "c2_s02a_recorder_listening",
      isActive = { state -> !state.items.has_recorder }
    ),
    "door_wagon7" to HotspotSceneMapping(
      defaultSceneId = "c3_s03_wagen7_approach",
      fallbackSceneId = "c3_s01_wagen7_locked",
      isActive = { state ->
        state.chapter_index >= 3 ||
          state.relations.rel_comp7 >= 1 ||
          state.tickets.tickets_truth >= 2
      }
    ),
    "obj_window" to HotspotSceneMapping(
      defaultSceneId = "c1_s03a_find_seat",
      fallbackSceneId = "c1_hub_platform",
      isActive = { state -> state.pressure.memory_drift >= 1 }
    ),
    "npc_comp7" to HotspotSceneMapping(
      defaultSceneId = "c3_s03b_inside_comp7",
      fallbackSceneId = "c2_s03_comp7_intro",
      isActive = { state -> state.chapter_index >= 3 }
    ),
    "npc_sleepless" to HotspotSceneMapping(
      defaultSceneId = "c2_control_01_aftermath",
      fallbackSceneId = "c1_s04_sleepless_intro",
      isActive = { state -> state.chapter_index >= 2 }
    )
  )

  init {
    viewModelScope.launch {
      dataStore.settingsFlow().collect { settings ->
        _uiState.value = _uiState.value.copy(settings = settings)
      }
    }

    viewModelScope.launch {
      dataStore.backlogFlow().collect { backlog ->
        _uiState.value = _uiState.value.copy(backlog = backlog)
      }
    }

    viewModelScope.launch {
      try {
        val story = repository.loadStory()
        engine.setStory(story.scenesById, story.endings, story.manifest.start_scene_id)

        // Try to load saved game
        try {
          dataStore.loadGame()?.let { save ->
            val restored = save.state.copy(
              current_scene_id = save.current_scene_id,
              history = save.history
            )
            engine.setState(restored)
            Log.d(TAG, "Saved game loaded successfully")
          }
        } catch (e: Exception) {
          Log.w(TAG, "Failed to load saved game, starting fresh", e)
          // Continue with fresh game state
        }

        if (BuildConfig.DEBUG) {
          val validation = ContentValidator.validateContent(
            story.manifest.start_scene_id,
            story.scenesById,
            story.endings
          )
          if (!validation.valid) {
            validation.errors.forEach { Log.e(TAG, "[Validation] ${it.message}") }
          }
          validation.warnings.forEach { Log.w(TAG, "[Validation] ${it.message}") }
        }

        updateUi(story)
        applyPendingDebugScene(story)
      } catch (error: Exception) {
        Log.e(TAG, "Failed to load story", error)
        val userMessage = when {
          error.message?.contains("story.json") == true -> 
            "Story-Datei fehlt oder ist beschädigt. Bitte App neu installieren."
          error.message?.contains("empty") == true -> 
            "Story-Datei ist leer. Bitte App neu installieren."
          error.message?.contains("No scenes") == true -> 
            "Keine Szenen in der Story gefunden. Bitte App neu installieren."
          else -> 
            "Fehler beim Laden der Story: ${error.message ?: "Unbekannter Fehler"}"
        }
        _uiState.value = _uiState.value.copy(
          isLoading = false,
          errorMessage = userMessage
        )
      }
    }
  }

  fun makeChoice(choice: Choice) {
    // Story Mode: Set phase to CHOICE_COMMITTING
    if (_uiState.value.settings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
      _uiState.value = _uiState.value.copy(beatPhase = BeatPhase.CHOICE_COMMITTING)
    }

    val story = _uiState.value.story ?: return
    engine.makeChoice(choice)
    updateUi(story)
    saveCurrentState()

    // Story Mode: Reset beat index on new scene
    if (_uiState.value.settings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
      val initialPhase = initialStoryBeatPhase(_uiState.value.settings)
      _uiState.value = _uiState.value.copy(
        beatIndex = 0,
        beatPhase = initialPhase
      )
    }
  }

  fun openSceneForHotspot(hotspotId: String) {
    val story = _uiState.value.story ?: return
    val current = engine.state
    val mapping = hotspotToScene[hotspotId] ?: return
    val sceneId = if (mapping.isActive(current)) {
      mapping.defaultSceneId
    } else {
      mapping.fallbackSceneId
    }
    val next = current.copy(current_scene_id = sceneId)
    engine.setState(next)
    updateUi(story)
    _uiState.value = _uiState.value.copy(isOverlayOpen = true)

    // Story Mode: Treat overlay as separate beat context
    if (_uiState.value.settings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
      val initialPhase = initialStoryBeatPhase(_uiState.value.settings)
      _uiState.value = _uiState.value.copy(
        beatIndex = 0,  // Reset for overlay
        beatPhase = initialPhase
      )
      // Do NOT saveReaderProgress() - Overlay is temporary
    }
  }

  fun closeSceneOverlay() {
    _uiState.value = _uiState.value.copy(isOverlayOpen = false)

    // Story Mode: Restore main scene state from before overlay
    if (_uiState.value.settings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
      restoreReaderProgressIfPossible()  // Restore previous beat index
    }
  }

  fun resetGame() {
    val story = _uiState.value.story ?: return
    engine.reset(story.manifest.start_scene_id)
    updateUi(story)
    saveCurrentState()
  }

  fun updateSettings(settings: ReaderSettings) {
    viewModelScope.launch {
      dataStore.saveSettings(settings)
    }
  }

  fun setDebugScene(sceneId: String) {
    if (!BuildConfig.DEBUG || sceneId.isBlank()) return
    pendingDebugSceneId = sceneId

    val story = _uiState.value.story ?: return
    applyPendingDebugScene(story)
  }

  private fun updateUi(story: StoryContent) {
    advanceAutoTransitionsIfNeeded()

    val state = engine.state
    val scene = engine.getCurrentScene()
    val choices = scene?.let { getAvailableChoices(state, it) } ?: emptyList()
    val narrative = scene?.let { resolveSceneNarrative(it, state) } ?: ""
    val ending = engine.getEnding()

    _uiState.value = _uiState.value.copy(
      isLoading = false,
      errorMessage = null,
      story = story,
      state = state,
      currentScene = scene,
      isOverlayOpen = _uiState.value.isOverlayOpen,
      availableChoices = choices,
      resolvedNarrative = narrative,
      ending = ending
    )

    // Update beats for Story Mode
    updateBeatsIfStoryMode(narrative, _uiState.value.settings)
  }

  private fun advanceAutoTransitionsIfNeeded(maxSteps: Int = 12) {
    var steps = 0
    while (steps < maxSteps) {
      val advanced = engine.advanceAutoNextIfNeeded()
      if (!advanced) return
      steps += 1
      if (BuildConfig.DEBUG) {
        Log.d(TAG, "Auto-next applied (#$steps): ${engine.state.current_scene_id}")
      }
    }
    Log.w(TAG, "Auto-next loop aborted after $maxSteps steps to prevent infinite transition chain")
  }

  private fun updateBeatsIfStoryMode(narrative: String, settings: ReaderSettings) {
    if (settings.readerMode != de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
      _uiState.value = _uiState.value.copy(
        narrativeBeats = null,
        beatIndex = 0,
        beatPhase = BeatPhase.SCENE_READY
      )
      return
    }

    val beats = BeatSplitter.splitIntoBeats(narrative)
    val initialPhase = initialStoryBeatPhase(settings)
    _uiState.value = _uiState.value.copy(
      narrativeBeats = beats,
      beatIndex = 0,
      beatPhase = initialPhase
    )

    // Restore progress if applicable
    restoreReaderProgressIfPossible()
  }

  private fun initialStoryBeatPhase(settings: ReaderSettings): BeatPhase {
    return if (settings.typewriterEnabled) {
      BeatPhase.BEAT_TYPING
    } else {
      BeatPhase.BEAT_REVEALED
    }
  }

  private fun restoreReaderProgressIfPossible() {
    viewModelScope.launch {
      val progress = dataStore.readerProgressFlow().first() ?: return@launch
      val uiState = _uiState.value

      // Nur wiederherstellen wenn gleiche Szene
      if (progress.sceneId == uiState.currentScene?.id) {
        val beats = uiState.narrativeBeats
        if (beats != null && progress.beatIndex in beats.beats.indices) {
          _uiState.value = _uiState.value.copy(
            beatIndex = progress.beatIndex,
            beatPhase = BeatPhase.BEAT_REVEALED
          )
        }
      }
    }
  }

  // Story Mode: Tap Event Handler
  fun onTapContent() {
    val uiState = _uiState.value
    val settings = uiState.settings

    if (settings.readerMode != de.daydaylx.nachtzug19.model.ReaderMode.STORY) return

    when (uiState.beatPhase) {
      BeatPhase.BEAT_TYPING -> {
        // Tap während Typewriter → sofort komplett anzeigen
        _uiState.value = _uiState.value.copy(beatPhase = BeatPhase.BEAT_REVEALED)
      }
      BeatPhase.BEAT_REVEALED -> {
        val beats = uiState.narrativeBeats ?: return
        val currentIndex = uiState.beatIndex

        if (currentIndex < beats.beats.lastIndex) {
          // Nächster Beat
          advanceToNextBeat()
        } else {
          // Letzter Beat erreicht → Choices
          _uiState.value = _uiState.value.copy(beatPhase = BeatPhase.CHOICES_AVAILABLE)
        }
      }
      BeatPhase.CHOICES_AVAILABLE -> {
        // Tap im Content macht nichts (Choices brauchen expliziten Tap)
      }
      else -> { /* Ignore */ }
    }
  }

  // Story Mode: Typewriter Complete Handler
  fun onTypewriterComplete() {
    if (_uiState.value.settings.readerMode != de.daydaylx.nachtzug19.model.ReaderMode.STORY) return
    if (_uiState.value.beatPhase == BeatPhase.BEAT_TYPING) {
      _uiState.value = _uiState.value.copy(beatPhase = BeatPhase.BEAT_REVEALED)
    }
  }

  private fun advanceToNextBeat() {
    val uiState = _uiState.value
    val beats = uiState.narrativeBeats ?: return
    val newIndex = (uiState.beatIndex + 1).coerceAtMost(beats.beats.lastIndex)

    // Append current beat to backlog
    appendBeatToBacklog(
      sceneId = uiState.currentScene?.id ?: "",
      beatIndex = uiState.beatIndex,
      text = beats.beats.getOrNull(uiState.beatIndex) ?: ""
    )

    _uiState.value = _uiState.value.copy(
      beatIndex = newIndex,
      beatPhase = BeatPhase.BEAT_TYPING
    )

    // Save progress (reader position + game state)
    saveReaderProgress()
    autoSaveGameState()
  }

  private fun autoSaveGameState() {
    val state = _uiState.value.state ?: return
    val currentScene = _uiState.value.currentScene ?: return

    viewModelScope.launch {
      try {
        val save = GameSave(
          current_scene_id = currentScene.id,
          state = state,
          history = state.history
        )
        dataStore.saveGame(save)
      } catch (e: Exception) {
        if (BuildConfig.DEBUG) {
          android.util.Log.e(TAG, "Auto-save failed", e)
        }
      }
    }
  }

  private fun appendBeatToBacklog(sceneId: String, beatIndex: Int, text: String) {
    viewModelScope.launch {
      val current = dataStore.backlogFlow().first()
      val newEntry = BacklogEntry(
        timestamp = System.currentTimeMillis(),
        sceneId = sceneId,
        beatIndex = beatIndex,
        text = text
      )
      dataStore.saveBacklog(current + newEntry)
    }
  }

  private fun saveReaderProgress() {
    viewModelScope.launch {
      val uiState = _uiState.value
      val sceneId = uiState.currentScene?.id ?: return@launch
      val progress = ReaderProgress(
        sceneId = sceneId,
        beatIndex = uiState.beatIndex
      )
      dataStore.saveReaderProgress(progress)
    }
  }

  // Backlog UI Toggle
  fun onOpenBacklog() {
    _uiState.value = _uiState.value.copy(isBacklogOpen = true)
  }

  fun onCloseBacklog() {
    _uiState.value = _uiState.value.copy(isBacklogOpen = false)
  }

  private fun applyPendingDebugScene(story: StoryContent) {
    val sceneId = pendingDebugSceneId ?: return
    if (!story.scenesById.containsKey(sceneId)) {
      Log.w(TAG, "Debug scene not found: $sceneId")
      return
    }

    val next = engine.state.copy(current_scene_id = sceneId)
    engine.setState(next)
    updateUi(story)
    saveCurrentState()
    pendingDebugSceneId = null
    Log.d(TAG, "Debug scene override applied: $sceneId")
  }

  private fun saveCurrentState() {
    viewModelScope.launch {
      val state = engine.state
      dataStore.saveGame(
        GameSave(
          current_scene_id = state.current_scene_id,
          state = state,
          history = state.history
        )
      )
    }
  }
}

class GameViewModelFactory(
  private val repository: StoryRepository,
  private val dataStore: GameDataStore
) : ViewModelProvider.Factory {
  override fun <T : ViewModel> create(modelClass: Class<T>): T {
    if (modelClass.isAssignableFrom(GameViewModel::class.java)) {
      @Suppress("UNCHECKED_CAST")
      return GameViewModel(repository, dataStore) as T
    }
    throw IllegalArgumentException("Unknown ViewModel class")
  }
}
