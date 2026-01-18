package de.daydaylx.nachtzug19.data

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import de.daydaylx.nachtzug19.model.GameSave
import de.daydaylx.nachtzug19.model.GameState
import de.daydaylx.nachtzug19.model.HistoryEntry
import de.daydaylx.nachtzug19.model.ReaderSettings
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

    val state = StoryJson.json.decodeFromString(GameState.serializer(), stateJson)
    val history = historyJson?.let {
      StoryJson.json.decodeFromString(ListSerializer(HistoryEntry.serializer()), it)
    } ?: state.history

    val resolvedCurrentScene = currentSceneId ?: state.current_scene_id
    return GameSave(
      current_scene_id = resolvedCurrentScene,
      state = state.copy(current_scene_id = resolvedCurrentScene, history = history),
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
