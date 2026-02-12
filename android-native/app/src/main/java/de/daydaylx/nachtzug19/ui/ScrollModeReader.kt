package de.daydaylx.nachtzug19.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.ReaderSettings
import de.daydaylx.nachtzug19.model.SceneTag
import de.daydaylx.nachtzug19.model.resolvedWeight
import de.daydaylx.nachtzug19.ui.components.AnnouncementBanner
import de.daydaylx.nachtzug19.ui.components.Microbar
import de.daydaylx.nachtzug19.ui.components.PixelDialogBox
import de.daydaylx.nachtzug19.ui.components.StationOverlay
import de.daydaylx.nachtzug19.ui.components.TicketChoice
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors
import kotlinx.coroutines.delay

private const val READTHROUGH_LENGTH_THRESHOLD = 420
private const val READ_UNLOCK_PROGRESS_THRESHOLD = 0.70f
private const val READ_UNLOCK_AUTO_RELEASE_MS = 10_000L

internal fun shouldUnlockChoices(
  enforceReadBeforeChoices: Boolean,
  narrativeLength: Int,
  scrollMaxValue: Int,
  scrollValue: Int,
  autoUnlockElapsed: Boolean
): Boolean {
  if (!enforceReadBeforeChoices || narrativeLength < READTHROUGH_LENGTH_THRESHOLD) {
    return true
  }
  if (scrollMaxValue <= 0) {
    return true
  }
  if (autoUnlockElapsed) {
    return true
  }
  val readProgress = scrollValue.toFloat() / scrollMaxValue.toFloat()
  return readProgress >= READ_UNLOCK_PROGRESS_THRESHOLD
}

@Composable
fun ScrollModeReader(
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
  val unlockPercent = (READ_UNLOCK_PROGRESS_THRESHOLD * 100).toInt()
  val unlockSeconds = (READ_UNLOCK_AUTO_RELEASE_MS / 1_000L).toInt()
  val narrativeRequiresReadthrough = narrative.length >= READTHROUGH_LENGTH_THRESHOLD
  val interactionLocked = processingChoiceKey != null
  var autoUnlockElapsed by remember(sceneKey, settings.enforceReadBeforeChoices, narrative) {
    mutableStateOf(false)
  }
  var autoUnlockSecondsRemaining by remember(sceneKey, settings.enforceReadBeforeChoices, narrative) {
    mutableStateOf(unlockSeconds)
  }

  LaunchedEffect(sceneKey, settings.enforceReadBeforeChoices, narrativeRequiresReadthrough) {
    autoUnlockElapsed = false
    autoUnlockSecondsRemaining = unlockSeconds
    if (!settings.enforceReadBeforeChoices || !narrativeRequiresReadthrough) {
      return@LaunchedEffect
    }
    while (autoUnlockSecondsRemaining > 0) {
      delay(1_000L)
      autoUnlockSecondsRemaining -= 1
    }
    autoUnlockElapsed = true
  }

  val choicesUnlocked by remember(
    narrative,
    settings.enforceReadBeforeChoices,
    narrativeScrollState.maxValue,
    narrativeScrollState.value,
    autoUnlockElapsed
  ) {
    derivedStateOf {
      shouldUnlockChoices(
        enforceReadBeforeChoices = settings.enforceReadBeforeChoices,
        narrativeLength = narrative.length,
        scrollMaxValue = narrativeScrollState.maxValue,
        scrollValue = narrativeScrollState.value,
        autoUnlockElapsed = autoUnlockElapsed
      )
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
      showAtmosphereLayers = atmosphereLayersEnabled,
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
            val countdown = autoUnlockSecondsRemaining.coerceAtLeast(1)
            Text(
              text = "Scrolle mindestens $unlockPercent % oder warte noch $countdown s, um Entscheidungen freizuschalten.",
              style = MaterialTheme.typography.labelSmall,
              color = NachtzugColors.TextPrimary.copy(alpha = 0.70f)
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
        choices.forEachIndexed { index, choice ->
            val choiceKey = choice.id ?: "choice_$index"
            key(choiceKey) {
                TicketChoice(
                    label = choice.label ?: "Weiter",
                    onClick = { onChoice(choice, choiceKey) },
                    isProcessing = processingChoiceKey == choiceKey,
                    isInteractionLocked = interactionLocked,
                    weight = choice.resolvedWeight(),
                    enabled = choicesUnlocked
                )
            }
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
        .background(NachtzugColors.ReaderScrimStrong)
        .border(width = 1.dp, color = NachtzugColors.StationNeon.copy(alpha = 0.40f), shape = shape)
        .clickable(onClick = onClick)
        .padding(horizontal = horizontalPadding, vertical = verticalPadding)
    ) {
      Text(
        text = "Status",
        style = MaterialTheme.typography.labelMedium,
        color = NachtzugColors.StationNeon
      )
    }
  }
}
