package de.daydaylx.nachtzug19.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.key
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.TextUnitType
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.ReaderSettings
import de.daydaylx.nachtzug19.model.SceneTag
import de.daydaylx.nachtzug19.model.resolvedWeight
import de.daydaylx.nachtzug19.ui.components.AnnouncementBanner
import de.daydaylx.nachtzug19.ui.components.ContinueHint
import de.daydaylx.nachtzug19.ui.components.Microbar
import de.daydaylx.nachtzug19.ui.components.PixelDialogBox
import de.daydaylx.nachtzug19.ui.components.StationOverlay
import de.daydaylx.nachtzug19.ui.components.TicketChoice
import de.daydaylx.nachtzug19.ui.components.TypewriterText
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

/**
 * Story Mode Reader
 *
 * Beat-based tap-to-advance reader with typewriter effect.
 * Displays narrative in digestible chunks (beats).
 */
@Composable
fun StoryModeReader(
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
  onTapContent: () -> Unit,
  onTypewriterComplete: () -> Unit
) {
  val state = uiState.state
  val beats = uiState.narrativeBeats
  val currentBeat = beats?.beats?.getOrNull(uiState.beatIndex) ?: narrative
  val isLastBeat = uiState.beatIndex == (beats?.beats?.lastIndex ?: 0)
  val screenHeightDp = LocalConfiguration.current.screenHeightDp
  val isSmallDisplayHeight = screenHeightDp <= 760
  val horizontalPadding = if (isSmallDisplayHeight) 14.dp else 20.dp
  val topGap = if (isSmallDisplayHeight) 6.dp else 12.dp
  val bottomGap = if (isSmallDisplayHeight) 4.dp else 10.dp
  val choiceSpacing = if (isSmallDisplayHeight) 8.dp else 12.dp
  val bottomChoicePadding = if (isSmallDisplayHeight) 4.dp else 10.dp
  val panelMaxHeight = (screenHeightDp * if (isSmallDisplayHeight) 0.56f else 0.64f).dp
  val panelMinHeight = if (isSmallDisplayHeight) 210.dp else 260.dp
  val showTopStationOverlay = showStationOverlay
  val showTopAnnouncement = showAnnouncement && !showTopStationOverlay
  val showMicrobar = settings.showStatus && settings.showMicrobar && state != null
  val interactionLocked = processingChoiceKey != null
  val canAdvanceBeat = uiState.beatPhase != BeatPhase.CHOICES_AVAILABLE

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
      Spacer(modifier = Modifier.height(topGap))
    }

    if (showTopStationOverlay) {
      StationOverlay(
        visible = true,
        stationCount = state?.station_count ?: 0,
        motionPolicy = motionPolicy,
        dense = isSmallDisplayHeight
      )
      Spacer(modifier = Modifier.height(topGap))
    }

    // Story Panel (main beat display)
    Box(
      modifier = Modifier
        .heightIn(min = panelMinHeight, max = panelMaxHeight)
        .weight(1f, fill = false)
        .fillMaxWidth()
        .clickable(
          enabled = canAdvanceBeat,
          role = Role.Button,
          onClickLabel = "Nächsten Abschnitt anzeigen",
          interactionSource = remember { MutableInteractionSource() },
          indication = null
        ) {
          onTapContent()
        }
    ) {
      StoryPanel(
        beat = currentBeat,
        title = title,
        beatPhase = uiState.beatPhase,
        beatIndex = uiState.beatIndex,
        totalBeats = beats?.beats?.size ?: 1,
        typewriterEnabled = settings.typewriterEnabled,
        typewriterSpeed = if (settings.reduceMotion) 10.0f else settings.typewriterSpeed,
        textSizeSp = settings.textSizeSp,
        atmosphereLayersEnabled = atmosphereLayersEnabled,
        onTypewriterComplete = onTypewriterComplete
      )

      // Continue hint (when not last beat and revealed)
      if (!isLastBeat && uiState.beatPhase == BeatPhase.BEAT_REVEALED) {
        ContinueHint(
          visible = true,
          modifier = Modifier
            .align(Alignment.BottomEnd)
            .padding(16.dp)
        )
      }
    }

    Spacer(modifier = Modifier.height(if (isSmallDisplayHeight) 8.dp else 16.dp))

    // Bottom Area: Microbar + Choices
    Column(
      verticalArrangement = Arrangement.spacedBy(choiceSpacing),
      modifier = Modifier
        .fillMaxWidth()
        .navigationBarsPadding()
        .padding(bottom = bottomChoicePadding)
    ) {
      if (showMicrobar) {
        Microbar(
          tickets = state!!.tickets,
          drift = state.pressure.memory_drift,
          attention = state.pressure.conductor_attention,
          onClick = onShowStatus,
          dense = isSmallDisplayHeight,
          modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = if (isSmallDisplayHeight) 1.dp else 4.dp)
        )
      }

      // Choices when available
      if (uiState.beatPhase == BeatPhase.CHOICES_AVAILABLE) {
        choices.forEachIndexed { index, choice ->
          val choiceKey = choice.id ?: "choice_$index"
          key(choiceKey) {
            TicketChoice(
              label = choice.label ?: "Weiter",
              onClick = { onChoice(choice, choiceKey) },
              isProcessing = processingChoiceKey == choiceKey,
              isInteractionLocked = interactionLocked,
              weight = choice.resolvedWeight(),
              enabled = true
            )
          }
        }
      }
    }
    Spacer(modifier = Modifier.height(bottomGap))
  }
}

/**
 * Story Panel Component
 *
 * Displays the current beat with typewriter effect.
 */
@Composable
@Suppress("UNUSED_PARAMETER")
private fun StoryPanel(
  beat: String,
  title: String?,
  beatPhase: BeatPhase,
  beatIndex: Int,
  totalBeats: Int,
  typewriterEnabled: Boolean,
  typewriterSpeed: Float,
  textSizeSp: Float,
  atmosphereLayersEnabled: Boolean,
  onTypewriterComplete: () -> Unit
) {
  // Determine if we should enable typewriter based on beatPhase
  val shouldTypewrite = beatPhase == BeatPhase.BEAT_TYPING && typewriterEnabled
  val showProgress = totalBeats > 1

  Box(modifier = Modifier.fillMaxSize()) {
    PixelDialogBox(
      title = title,
      narrative = beat,
      scrollState = androidx.compose.foundation.rememberScrollState(),
      showScrollIndicators = false,  // Story mode doesn't need scroll indicators
      showAtmosphereLayers = atmosphereLayersEnabled,
      textSizeSp = textSizeSp,
      enableTypewriter = shouldTypewrite,
      typewriterSpeed = typewriterSpeed,
      onTypewriterFinished = if (shouldTypewrite) onTypewriterComplete else null,
      modifier = Modifier.fillMaxSize()
    )

    // Beat Progress Indicator (top right)
    if (showProgress) {
      Text(
        text = "${beatIndex + 1}/$totalBeats",
        style = MaterialTheme.typography.labelSmall,
        color = NachtzugColors.TextMuted.copy(alpha = 0.65f),
        modifier = Modifier
          .align(Alignment.TopEnd)
          .padding(16.dp)
      )
    }
  }
}
