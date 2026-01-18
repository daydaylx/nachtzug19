package de.daydaylx.nachtzug19.data

import android.content.Context
import android.util.Log
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.StoryContent
import de.daydaylx.nachtzug19.model.StoryExport
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import kotlinx.serialization.decodeFromString
import java.io.BufferedReader

private const val TAG = "StoryRepository"
private const val MAX_RETRIES = 3
private const val RETRY_DELAY_MS = 1000L

class StoryRepository(private val context: Context) {
  suspend fun loadStory(): StoryContent = withContext(Dispatchers.IO) {
    var lastException: Exception? = null

    repeat(MAX_RETRIES) { attempt ->
      try {
        Log.d(TAG, "Loading story.json (attempt ${attempt + 1}/$MAX_RETRIES)")
        
        val jsonText = context.assets.open("story.json")
          .bufferedReader()
          .use(BufferedReader::readText)

        if (jsonText.isBlank()) {
          throw IllegalStateException("story.json is empty")
        }

        val export = StoryJson.json.decodeFromString(StoryExport.serializer(), jsonText)
        
        if (export.scenes.isEmpty()) {
          throw IllegalStateException("No scenes found in story.json")
        }

        val scenesById = export.scenes.associateBy(Scene::id)
        
        Log.d(TAG, "Story loaded successfully: ${export.scenes.size} scenes, ${export.endings.size} endings")
        
        return@withContext StoryContent(
          manifest = export.manifest,
          scenes = export.scenes,
          scenesById = scenesById,
          endings = export.endings
        )
      } catch (e: Exception) {
        lastException = e
        Log.e(TAG, "Failed to load story (attempt ${attempt + 1}/$MAX_RETRIES)", e)
        
        if (attempt < MAX_RETRIES - 1) {
          delay(RETRY_DELAY_MS)
        }
      }
    }

    throw IllegalStateException(
      "Failed to load story after $MAX_RETRIES attempts",
      lastException
    )
  }
}
