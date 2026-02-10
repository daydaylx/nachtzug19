package de.daydaylx.nachtzug19.data

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import de.daydaylx.nachtzug19.model.GameSave
import de.daydaylx.nachtzug19.model.GameState
import de.daydaylx.nachtzug19.model.HistoryEntry
import de.daydaylx.nachtzug19.model.ReaderSettings
import de.daydaylx.nachtzug19.model.createInitialState
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

private val Context.dataStore by preferencesDataStore(name = "nachtzug19")

class GameDataStore(private val context: Context) {
  private val stateKey = stringPreferencesKey("state_json")
  private val historyKey = stringPreferencesKey("history_json")
  private val currentSceneKey = stringPreferencesKey("current_scene_id")
  private val settingsKey = stringPreferencesKey("settings_json")

  suspend fun loadGame(): GameSave? {
    val prefs = context.dataStore.data.first()
    val stateJson = prefs[stateKey] ?: return null
    val historyJson = prefs[historyKey]
    val currentSceneId = prefs[currentSceneKey]

    val saved = StoryJson.json.decodeFromString(GameState.serializer(), stateJson)
    val history = historyJson?.let {
      StoryJson.json.decodeFromString(ListSerializer(HistoryEntry.serializer()), it)
    } ?: saved.history

    // Deep merge against defaults so old saves get new fields
    val defaults = createInitialState(saved.current_scene_id)
    val state = defaults.copy(
      stats = saved.stats,
      tickets = saved.tickets,
      pressure = saved.pressure,
      relations = saved.relations,
      items = defaults.items.copy(
        has_recorder = saved.items.has_recorder,
        has_tag19 = saved.items.has_tag19,
        has_ticket = saved.items.has_ticket,
        photo_anomaly = saved.items.photo_anomaly,
        played_recorder = saved.items.played_recorder,
        memory_search_active = saved.items.memory_search_active,
        emma_memory_unlocked = saved.items.emma_memory_unlocked,
        stance_bold = saved.items.stance_bold,
        stance_cautious = saved.items.stance_cautious
      ),
      current_scene_id = saved.current_scene_id,
      visited_scene_ids = saved.visited_scene_ids,
      chapter_index = saved.chapter_index,
      station_count = saved.station_count,
      history = history,
      isGameOver = saved.isGameOver,
      endingId = saved.endingId,
      save_version = saved.save_version
    )

    val resolvedCurrentScene = currentSceneId ?: state.current_scene_id
    return GameSave(
      current_scene_id = resolvedCurrentScene,
      state = state.copy(current_scene_id = resolvedCurrentScene),
      history = history
    )
  }

  suspend fun saveGame(save: GameSave) {
    context.dataStore.edit { prefs ->
      prefs[stateKey] = StoryJson.json.encodeToString(GameState.serializer(), save.state)
      prefs[historyKey] = StoryJson.json.encodeToString(ListSerializer(HistoryEntry.serializer()), save.history)
      prefs[currentSceneKey] = save.current_scene_id
    }
  }

  fun settingsFlow(): Flow<ReaderSettings> {
    return context.dataStore.data.map { prefs ->
      prefs[settingsKey]?.let {
        StoryJson.json.decodeFromString(ReaderSettings.serializer(), it)
      } ?: ReaderSettings()
    }
  }

  suspend fun saveSettings(settings: ReaderSettings) {
    context.dataStore.edit { prefs ->
      prefs[settingsKey] = StoryJson.json.encodeToString(ReaderSettings.serializer(), settings)
    }
  }
}
