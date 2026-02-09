package de.daydaylx.nachtzug19

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.lifecycle.ViewModelProvider
import de.daydaylx.nachtzug19.data.GameDataStore
import de.daydaylx.nachtzug19.data.StoryRepository
import de.daydaylx.nachtzug19.ui.AppRoot
import de.daydaylx.nachtzug19.ui.GameViewModelFactory
import de.daydaylx.nachtzug19.ui.theme.NachtzugTheme

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val repository = StoryRepository(applicationContext)
    val dataStore = GameDataStore(applicationContext)
    val viewModel = ViewModelProvider(
      this,
      GameViewModelFactory(repository, dataStore)
    )[de.daydaylx.nachtzug19.ui.GameViewModel::class.java]

    if (BuildConfig.DEBUG) {
      intent?.getStringExtra("debug_scene_id")?.let { sceneId ->
        viewModel.setDebugScene(sceneId)
      }
    }

    setContent {
      NachtzugTheme {
        AppRoot(viewModel)
      }
    }
  }
}
