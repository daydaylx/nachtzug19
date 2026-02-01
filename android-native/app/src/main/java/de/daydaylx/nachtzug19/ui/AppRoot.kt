package de.daydaylx.nachtzug19.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import de.daydaylx.nachtzug19.ui.overworld.OverworldScreen
import de.daydaylx.nachtzug19.ui.theme.NachtzugTheme

private const val ROUTE_PLAYER = "player"
private const val ROUTE_SETTINGS = "settings"

@Composable
fun AppRoot(
  viewModel: GameViewModel,
  navController: NavHostController = rememberNavController()
) {
  val uiState by viewModel.uiState.collectAsState()

  NavHost(navController = navController, startDestination = ROUTE_PLAYER) {
    composable(ROUTE_PLAYER) {
      OverworldScreen(
        uiState = uiState,
        settingsReduceMotion = uiState.settings.reduceMotion,
        onOpenSettings = { navController.navigate(ROUTE_SETTINGS) },
        onTriggerScene = { viewModel.openSceneForHotspot(it) },
        onMoveSceneChoice = { viewModel.makeChoice(it) },
        onReset = { viewModel.resetGame() }
      )
    }
    composable(ROUTE_SETTINGS) {
      SettingsScreen(
        settings = uiState.settings,
        onBack = { navController.popBackStack() },
        onUpdateSettings = { viewModel.updateSettings(it) }
      )
    }
  }
}
