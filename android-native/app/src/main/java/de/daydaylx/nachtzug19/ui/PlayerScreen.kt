package de.daydaylx.nachtzug19.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.ReaderSettings
import de.daydaylx.nachtzug19.model.SceneTag
import de.daydaylx.nachtzug19.ui.components.*
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlayerScreen(
  uiState: UiState,
  onChoice: (Choice) -> Unit,
  onReset: () -> Unit,
  onOpenSettings: () -> Unit,
  onExit: () -> Unit,
  onTapContent: () -> Unit = {},
  onTypewriterComplete: () -> Unit = {},
  onOpenBacklog: () -> Unit = {},
  onCloseBacklog: () -> Unit = {}
) {
  var showStatus by remember { mutableStateOf(false) }
  var showExitDialog by remember { mutableStateOf(false) }
  var processingChoiceKey by remember { mutableStateOf<String?>(null) }
  
  val settings = uiState.settings
  val motionPolicy = remember(settings) { settings.toMotionPolicy() }
  val atmosphereLayersEnabled = motionPolicy.allowContinuousEffects

  // Reset processing state when scene changes
  LaunchedEffect(uiState.currentScene) {
    processingChoiceKey = null
  }

  BackHandler {
    showExitDialog = true
  }

  if (showExitDialog) {
    AlertDialog(
      onDismissRequest = { showExitDialog = false },
      title = { Text("Spiel beenden?") },
      text = { Text("Dein Fortschritt wird automatisch gespeichert.") },
      confirmButton = {
        TextButton(onClick = { 
          showExitDialog = false
          onExit() 
        }) {
          Text("Beenden")
        }
      },
      dismissButton = {
        TextButton(onClick = { showExitDialog = false }) {
          Text("Abbrechen")
        }
      },
      containerColor = MaterialTheme.colorScheme.surface,
      titleContentColor = MaterialTheme.colorScheme.onSurface,
      textContentColor = MaterialTheme.colorScheme.onSurfaceVariant
    )
  }

  Scaffold(
    topBar = {
      val chapterLabel = uiState.state?.chapter_index?.let { "K$it" } ?: "K?"
      PixelHUD(
        title = "$chapterLabel · NACHTZUG 19",
        showStatusButton = false,
        onStatusClick = {},
        onSettingsClick = onOpenSettings,
        onBacklogClick = if (settings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
          onOpenBacklog
        } else null
      )
    }
    ) { padding ->
    Box(
      modifier = Modifier
        .fillMaxSize()
        .padding(padding)
    ) {
      // Background Layers - Determine background from scene tags, ID, and chapter
      val currentBackground = uiState.currentScene?.let { scene ->
          getBackgroundForTags(
              tags = scene.tags,
              sceneId = scene.id,
              chapter = scene.chapter
          )
      } ?: BackgroundAsset.Default
      
      // Animated background with drift tinting
      // Backgrounds are always shown for atmosphere
      AnimatedBackground(
          currentBackground = currentBackground,
          driftLevel = uiState.state?.pressure?.memory_drift ?: 0,
          motionPolicy = motionPolicy,
          enabled = true  // Always show backgrounds for atmosphere
      )
      
      // Safe zone overlay for text readability
      SafeZoneOverlay(enabled = atmosphereLayersEnabled)
      
      // Existing layers
      if (motionPolicy.allowBackgroundDrift && uiState.state != null) {
        BackgroundDrift(
          driftLevel = uiState.state.pressure.memory_drift,
          enabled = true
        )
      }
      VignetteLayer(enabled = atmosphereLayersEnabled)
      NoiseLayer(enabled = atmosphereLayersEnabled)

      when {
        uiState.isLoading -> {
          LoadingScreen()
        }
        uiState.errorMessage != null -> {
          CenteredMessage(uiState.errorMessage)
        }
        uiState.ending != null -> {
          EndingView(
            title = uiState.ending.title,
            narrative = uiState.ending.narrative,
            onReset = onReset
          )
        }
        else -> {
          StoryReader(
            title = uiState.currentScene?.title,
            narrative = uiState.resolvedNarrative,
            choices = uiState.availableChoices,
            settings = settings,
            uiState = uiState,
            showStationOverlay = uiState.currentScene?.tags?.contains(SceneTag.StationEnd) == true,
            showAnnouncement = uiState.currentScene?.tags?.contains(SceneTag.Announcement) == true,
            announcementText = uiState.currentScene?.announcement ?: "",
            motionPolicy = motionPolicy,
            atmosphereLayersEnabled = atmosphereLayersEnabled,
            processingChoiceKey = processingChoiceKey,
            onChoice = { choice, choiceKey ->
              processingChoiceKey = choiceKey
              onChoice(choice)
            },
            onShowStatus = { showStatus = true },
            onTapContent = onTapContent,
            onTypewriterComplete = onTypewriterComplete
          )
        }
      }

      if (settings.showStatus && showStatus && uiState.state != null) {
        ModalBottomSheet(
          onDismissRequest = { showStatus = false },
          containerColor = NachtzugColors.BackgroundPanel,
          contentColor = NachtzugColors.TextPrimary,
          scrimColor = Color.Black.copy(alpha = 0.55f)
        ) {
          StatusSheet(uiState)
        }
      }

      // Backlog sheet (Story Mode only)
      if (uiState.isBacklogOpen && settings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
        BacklogSheet(
          backlog = uiState.backlog,
          onDismiss = onCloseBacklog
        )
      }
    }
  }

  if (!settings.showStatus && showStatus) {
    showStatus = false
  }
}

@Composable
private fun StoryReader(
  title: String?,
  narrative: String,
  choices: List<Choice>,
  settings: ReaderSettings,
  uiState: UiState,
  showStationOverlay: Boolean,
  showAnnouncement: Boolean,
  announcementText: String,
  motionPolicy: MotionPolicy,
  atmosphereLayersEnabled: Boolean,
  processingChoiceKey: String?,
  onChoice: (Choice, String) -> Unit,
  onShowStatus: () -> Unit,
  onTapContent: () -> Unit = {},
  onTypewriterComplete: () -> Unit = {}
) {
  // Mode-based routing: SCROLL vs STORY
  if (settings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.SCROLL) {
    ScrollModeReader(
      title = title,
      narrative = narrative,
      choices = choices,
      settings = settings,
      uiState = uiState,
      showStationOverlay = showStationOverlay,
      showAnnouncement = showAnnouncement,
      announcementText = announcementText,
      motionPolicy = motionPolicy,
      atmosphereLayersEnabled = atmosphereLayersEnabled,
      processingChoiceKey = processingChoiceKey,
      onChoice = onChoice,
      onShowStatus = onShowStatus
    )
  } else {
    StoryModeReader(
      title = title,
      narrative = narrative,
      choices = choices,
      settings = settings,
      uiState = uiState,
      showStationOverlay = showStationOverlay,
      showAnnouncement = showAnnouncement,
      announcementText = announcementText,
      motionPolicy = motionPolicy,
      atmosphereLayersEnabled = atmosphereLayersEnabled,
      processingChoiceKey = processingChoiceKey,
      onChoice = onChoice,
      onShowStatus = onShowStatus,
      onTapContent = onTapContent,
      onTypewriterComplete = onTypewriterComplete
    )
  }
}

@Composable
private fun EndingView(title: String, narrative: String, onReset: () -> Unit) {
  Column(
    modifier = Modifier
      .fillMaxSize()
      .padding(24.dp),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    Text(title, style = MaterialTheme.typography.titleLarge)
    Spacer(modifier = Modifier.height(16.dp))
    Text(narrative, style = MaterialTheme.typography.bodyLarge, textAlign = TextAlign.Center)
    Spacer(modifier = Modifier.height(24.dp))
    Button(onClick = onReset) {
      Text("Neustart")
    }
  }
}

@Composable
private fun CenteredMessage(text: String) {
  Surface(
    modifier = Modifier.fillMaxSize(),
    color = MaterialTheme.colorScheme.background
  ) {
    Box(contentAlignment = Alignment.Center) {
      Text(text = text, style = MaterialTheme.typography.bodyLarge)
    }
  }
}
