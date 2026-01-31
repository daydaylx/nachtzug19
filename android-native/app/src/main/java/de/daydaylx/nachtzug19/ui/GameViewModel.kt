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
  val settings: ReaderSettings = ReaderSettings()
)

class GameViewModel(
  private val repository: StoryRepository,
  private val dataStore: GameDataStore
) : ViewModel() {
  private val engine = GameEngine()
  private val _uiState = MutableStateFlow(UiState())
  val uiState: StateFlow<UiState> = _uiState.asStateFlow()

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
      fallbackSceneId = "c1_s01_platform",
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
    val story = _uiState.value.story ?: return
    engine.makeChoice(choice)
    updateUi(story)
    saveCurrentState()
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
  }

  fun closeSceneOverlay() {
    _uiState.value = _uiState.value.copy(isOverlayOpen = false)
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

  private fun updateUi(story: StoryContent) {
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
