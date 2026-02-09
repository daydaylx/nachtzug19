package de.daydaylx.nachtzug19.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.ReaderSettings
import de.daydaylx.nachtzug19.model.SceneTag
import de.daydaylx.nachtzug19.model.resolvedWeight
import de.daydaylx.nachtzug19.ui.components.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlayerScreen(
  uiState: UiState,
  onChoice: (Choice) -> Unit,
  onReset: () -> Unit,
  onOpenSettings: () -> Unit,
  onExit: () -> Unit
) {
  var showStatus by remember { mutableStateOf(false) }
  var showExitDialog by remember { mutableStateOf(false) }
  var isProcessing by remember { mutableStateOf(false) }
  
  val settings = uiState.settings
  val motionPolicy = remember(settings) { settings.toMotionPolicy() }

  // Reset processing state when scene changes
  LaunchedEffect(uiState.currentScene) {
    isProcessing = false
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
        onSettingsClick = onOpenSettings
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
      SafeZoneOverlay(enabled = true)
      
      // Existing layers
      if (motionPolicy.allowBackgroundDrift && uiState.state != null) {
        BackgroundDrift(
          driftLevel = uiState.state.pressure.memory_drift,
          enabled = true
        )
      }
      VignetteLayer()
      NoiseLayer(enabled = motionPolicy.allowContinuousEffects)

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
            isProcessing = isProcessing,
            onChoice = { choice ->
              isProcessing = true
              onChoice(choice)
            },
            onShowStatus = { showStatus = true }
          )
        }
      }

      if (settings.showStatus && showStatus && uiState.state != null) {
        ModalBottomSheet(
          onDismissRequest = { showStatus = false },
          containerColor = Color(0xFF141A22),
          contentColor = Color(0xFFE8E8E8),
          scrimColor = Color.Black.copy(alpha = 0.55f)
        ) {
          StatusSheet(uiState)
        }
      }

      ChoiceFeedback(
        visible = isProcessing,
        motionPolicy = motionPolicy
      )
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
  isProcessing: Boolean,
  onChoice: (Choice) -> Unit,
  onShowStatus: () -> Unit
) {
  val state = uiState.state
  val isSmallDisplayHeight = LocalConfiguration.current.screenHeightDp <= 760
  val horizontalPadding = if (isSmallDisplayHeight) 14.dp else 20.dp
  val topGap = if (isSmallDisplayHeight) 8.dp else 12.dp
  val bottomGap = if (isSmallDisplayHeight) 8.dp else 12.dp
  val choiceSpacing = if (isSmallDisplayHeight) 10.dp else 12.dp
  val bottomChoicePadding = if (isSmallDisplayHeight) 8.dp else 12.dp
  val showTopStationOverlay = showStationOverlay
  val showTopAnnouncement = showAnnouncement && !showTopStationOverlay
  val showMicrobar = settings.showStatus && settings.showMicrobar && state != null
  val showStatusQuickAction = settings.showStatus && !showMicrobar && state != null
  val narrativeScrollState = rememberScrollState()
  val sceneKey = uiState.currentScene?.id ?: narrative
  val narrativeRequiresReadthrough = narrative.length >= 420
  val choicesUnlocked by remember(narrative, narrativeScrollState.maxValue, narrativeScrollState.value) {
    derivedStateOf {
      !narrativeRequiresReadthrough ||
        narrativeScrollState.maxValue == 0 ||
        narrativeScrollState.value >= narrativeScrollState.maxValue
    }
  }

  LaunchedEffect(sceneKey) {
    // Keep scene changes calm: no animated jump-back on new narrative.
    narrativeScrollState.scrollTo(0)
  }

  Column(
    modifier = Modifier
      .fillMaxSize()
      .padding(horizontal = horizontalPadding)
  ) {
    if (showTopAnnouncement) {
      AnnouncementBanner(
        text = announcementText,
        visible = true,
        animationsEnabled = motionPolicy.allowTransitions
      )
    }

    if (showTopStationOverlay) {
      StationOverlay(
        visible = true,
        stationCount = state?.station_count ?: 0,
        motionPolicy = motionPolicy
      )
    }

    PixelDialogBox(
      title = title,
      narrative = narrative,
      scrollState = narrativeScrollState,
      showScrollIndicators = !settings.reduceMotion,
      textSizeSp = settings.textSizeSp,
      enableTypewriter = false,
      modifier = Modifier
        .fillMaxWidth()
        .weight(1f)
        .padding(top = topGap)
    )

    Spacer(modifier = Modifier.height(if (isSmallDisplayHeight) 12.dp else 16.dp))

    // Choices Area (Ticket Style)
    Column(
        verticalArrangement = Arrangement.spacedBy(choiceSpacing),
        modifier = Modifier
          .fillMaxWidth()
          .navigationBarsPadding()
          .padding(bottom = bottomChoicePadding)
    ) {
        if (!choicesUnlocked) {
            Text(
              text = "Bis zum Ende scrollen, um Entscheidungen freizuschalten.",
              style = MaterialTheme.typography.labelSmall,
              color = Color(0xB3E8E8E8)
            )
        }
        if (showMicrobar) {
          Microbar(
            tickets = state!!.tickets,
            drift = state.pressure.memory_drift,
            attention = state.pressure.conductor_attention,
            onClick = onShowStatus,
            dense = isSmallDisplayHeight,
            modifier = Modifier
              .fillMaxWidth()
              .padding(vertical = if (isSmallDisplayHeight) 2.dp else 4.dp)
          )
        } else if (showStatusQuickAction) {
          StatusQuickAction(
            compact = isSmallDisplayHeight,
            onClick = onShowStatus
          )
        }
        choices.forEach { choice ->
            TicketChoice(
                label = choice.label ?: "Weiter",
                onClick = { onChoice(choice) },
                isProcessing = isProcessing,
                weight = choice.resolvedWeight(),
                enabled = choicesUnlocked
            )
        }
    }
    Spacer(modifier = Modifier.height(bottomGap))
  }
}

@Composable
private fun StatusQuickAction(
  compact: Boolean,
  onClick: () -> Unit
) {
  val shape = RoundedCornerShape(12.dp)
  val horizontalPadding = if (compact) 10.dp else 12.dp
  val verticalPadding = if (compact) 6.dp else 8.dp
  Box(
    modifier = Modifier.fillMaxWidth(),
    contentAlignment = Alignment.CenterEnd
  ) {
    Box(
      modifier = Modifier
        .clip(shape)
        .background(Color(0xCC141A22))
        .border(width = 1.dp, color = Color(0x665BC0BE), shape = shape)
        .clickable(onClick = onClick)
        .padding(horizontal = horizontalPadding, vertical = verticalPadding)
    ) {
      Text(
        text = "Status",
        style = MaterialTheme.typography.labelMedium,
        color = Color(0xFF5BC0BE)
      )
    }
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
