package de.daydaylx.nachtzug19.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.ReaderSettings
import de.daydaylx.nachtzug19.ui.components.AnimatedBackground
import de.daydaylx.nachtzug19.ui.components.BackgroundAsset
import de.daydaylx.nachtzug19.ui.components.NoiseLayer
import de.daydaylx.nachtzug19.ui.components.SafeZoneOverlay
import de.daydaylx.nachtzug19.ui.components.VignetteLayer
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@Composable
fun SettingsScreen(
  settings: ReaderSettings,
  onBack: () -> Unit,
  onUpdateSettings: (ReaderSettings) -> Unit
) {
  var localSettings by remember(settings) { mutableStateOf(settings) }
  val motionPolicy = remember(localSettings) { localSettings.toMotionPolicy() }
  val scrollState = rememberScrollState()
  val atmosphereLayersEnabled = motionPolicy.allowContinuousEffects

  Box(modifier = Modifier.fillMaxSize()) {
    AnimatedBackground(
      currentBackground = BackgroundAsset.Compartment,
      driftLevel = 1,
      motionPolicy = motionPolicy,
      enabled = true
    )
    SafeZoneOverlay(enabled = atmosphereLayersEnabled)
    VignetteLayer(enabled = atmosphereLayersEnabled)
    NoiseLayer(enabled = atmosphereLayersEnabled)

    Column(
      modifier = Modifier
        .fillMaxSize()
        .statusBarsPadding()
        .navigationBarsPadding()
        .verticalScroll(scrollState)
        .padding(horizontal = 20.dp, vertical = 12.dp),
      verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      SettingsHeader(onBack = onBack)

      SettingsSection(
        title = "Lesen",
        description = "Grundlagen für ruhiges, längeres Lesen."
      ) {
        Text(
          text = "Textgröße",
          style = MaterialTheme.typography.labelLarge,
          color = NachtzugColors.TextPrimary
        )
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          Text(
            "14",
            style = MaterialTheme.typography.labelSmall,
            color = NachtzugColors.TextPrimary.copy(alpha = 0.60f)
          )
          Text(
            text = localSettings.textSizeSp.toInt().toString(),
            style = MaterialTheme.typography.labelSmall,
            color = NachtzugColors.StationNeon
          )
          Text(
            "24",
            style = MaterialTheme.typography.labelSmall,
            color = NachtzugColors.TextPrimary.copy(alpha = 0.60f)
          )
        }
        Slider(
          value = localSettings.textSizeSp,
          onValueChange = {
            localSettings = localSettings.copy(textSizeSp = it)
            onUpdateSettings(localSettings)
          },
          valueRange = 14f..24f,
          colors = SliderDefaults.colors(
            thumbColor = NachtzugColors.StationNeon,
            activeTrackColor = NachtzugColors.StationNeon,
            inactiveTrackColor = NachtzugColors.ReaderBorder
          )
        )
        SettingHint("Empfohlen: 18 pt für ruhiges Lesen auf dem Smartphone.")
        SettingsToggleRow(
          label = "Lesen erzwingen (Choices erst nach Scroll)",
          hint = "Wenn aktiv, werden Entscheidungen bei langen Texten erst nach ~70 % Scroll freigeschaltet.",
          checked = localSettings.enforceReadBeforeChoices,
          onToggle = {
            localSettings = localSettings.copy(enforceReadBeforeChoices = it)
            onUpdateSettings(localSettings)
          }
        )
      }

      SettingsSection(
        title = "Effekte",
        description = "Animation und Atmosphäre."
      ) {
        SettingsToggleRow(
          label = "Bewegung reduzieren",
          hint = "Reduziert Übergänge und kontinuierliche Bewegung.",
          checked = localSettings.reduceMotion,
          onToggle = {
            localSettings = localSettings.copy(reduceMotion = it)
            onUpdateSettings(localSettings)
          }
        )
        SettingsToggleRow(
          label = "Atmosphäreneffekte",
          hint = "Steuert Drift, Rauschen und visuelle Effekte.",
          checked = localSettings.immersionFx,
          onToggle = {
            localSettings = localSettings.copy(immersionFx = it)
            onUpdateSettings(localSettings)
          }
        )
      }

      SettingsSection(
        title = "Einblendungen",
        description = "Zusätzliche Informationen im Reader."
      ) {
        SettingsToggleRow(
          label = "Status anzeigen",
          hint = "Erlaubt den Zugriff auf die Statusansicht im Spiel.",
          checked = localSettings.showStatus,
          onToggle = {
            localSettings = localSettings.copy(showStatus = it)
            onUpdateSettings(localSettings)
          }
        )
        SettingsToggleRow(
          label = "Mini-Statusleiste anzeigen",
          hint = "Zeigt Statuswerte dauerhaft über den Entscheidungen.",
          checked = localSettings.showMicrobar,
          enabled = localSettings.showStatus,
          onToggle = {
            localSettings = localSettings.copy(showMicrobar = it)
            onUpdateSettings(localSettings)
          }
        )
        SettingsToggleRow(
          label = "Beziehungen anzeigen",
          hint = "Blendet Beziehungswerte in der Statusansicht ein.",
          checked = localSettings.showRelations,
          onToggle = {
            localSettings = localSettings.copy(showRelations = it)
            onUpdateSettings(localSettings)
          }
        )
      }

      SettingsSection(
        title = "Reader-Modus",
        description = "Wähle zwischen Scroll- und Story-Modus."
      ) {
        SettingsToggleRow(
          label = "Story-Modus (Tap-to-advance)",
          hint = "Beat-basierter Flow mit Typewriter-Effekt. Tippe zum Weiterlesen. Aus = klassischer Scroll-Modus.",
          checked = localSettings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY,
          onToggle = { checked ->
            localSettings = localSettings.copy(
              readerMode = if (checked) de.daydaylx.nachtzug19.model.ReaderMode.STORY
                          else de.daydaylx.nachtzug19.model.ReaderMode.SCROLL
            )
            onUpdateSettings(localSettings)
          }
        )

        if (localSettings.readerMode == de.daydaylx.nachtzug19.model.ReaderMode.STORY) {
          SettingsToggleRow(
            label = "Typewriter-Effekt",
            hint = "Zeigt Text sukzessive an. Aus = sofortige Anzeige.",
            checked = localSettings.typewriterEnabled,
            onToggle = {
              localSettings = localSettings.copy(typewriterEnabled = it)
              onUpdateSettings(localSettings)
            }
          )

          if (localSettings.typewriterEnabled) {
            Text(
              text = "Typewriter-Geschwindigkeit",
              style = MaterialTheme.typography.labelLarge,
              color = NachtzugColors.TextPrimary
            )
            Row(
              modifier = Modifier.fillMaxWidth(),
              horizontalArrangement = Arrangement.SpaceBetween
            ) {
              Text(
                "0.5x",
                style = MaterialTheme.typography.labelSmall,
                color = NachtzugColors.TextPrimary.copy(alpha = 0.60f)
              )
              Text(
                text = "${localSettings.typewriterSpeed}x",
                style = MaterialTheme.typography.labelSmall,
                color = NachtzugColors.StationNeon
              )
              Text(
                "2.0x",
                style = MaterialTheme.typography.labelSmall,
                color = NachtzugColors.TextPrimary.copy(alpha = 0.60f)
              )
            }
            Slider(
              value = localSettings.typewriterSpeed,
              onValueChange = {
                localSettings = localSettings.copy(typewriterSpeed = it)
                onUpdateSettings(localSettings)
              },
              valueRange = 0.5f..2.0f,
              steps = 2,  // 0.5, 1.0, 1.5, 2.0
              colors = SliderDefaults.colors(
                thumbColor = NachtzugColors.StationNeon,
                activeTrackColor = NachtzugColors.StationNeon,
                inactiveTrackColor = NachtzugColors.ReaderBorder
              )
            )
            SettingHint("Empfohlen: 1.0x. Bei 'Bewegung reduzieren' wird auf 10x beschleunigt.")
          }
        }
      }
    }
  }
}

@Composable
private fun SettingsHeader(
  onBack: () -> Unit,
  modifier: Modifier = Modifier
) {
  val borderOuter = NachtzugColors.PanelBorderOuter
  val borderInner = NachtzugColors.PanelBorderInner
  val background = NachtzugColors.BackgroundPanel

  Box(
    modifier = modifier
      .fillMaxWidth()
      .drawBehind {
        val outer = 2.dp.toPx()
        val inner = 1.dp.toPx()
        drawRect(color = borderOuter, size = size)
        drawRect(
          color = borderInner,
          topLeft = Offset(outer, outer),
          size = Size(size.width - outer * 2, size.height - outer * 2)
        )
        drawRect(
          color = background,
          topLeft = Offset(outer + inner, outer + inner),
          size = Size(size.width - (outer + inner) * 2, size.height - (outer + inner) * 2)
        )
      }
      .background(Color.Transparent)
      .padding(horizontal = 6.dp, vertical = 6.dp)
  ) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(onClick = onBack) {
        Icon(
          imageVector = Icons.AutoMirrored.Filled.ArrowBack,
          contentDescription = "Zurück",
          tint = NachtzugColors.TextPrimary
        )
      }
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = "Einstellungen",
        style = MaterialTheme.typography.titleMedium,
        color = NachtzugColors.TextPrimary
      )
    }
  }
}

@Composable
private fun SettingsSection(
  title: String,
  description: String? = null,
  modifier: Modifier = Modifier,
  content: @Composable ColumnScope.() -> Unit
) {
  val borderOuter = NachtzugColors.PanelBorderOuterSoft
  val borderInner = NachtzugColors.PanelBorderInnerSoft
  val background = NachtzugColors.ReaderPanelSoft
  val borderSize = 2.dp
  val innerBorderSize = 1.dp

  Box(
    modifier = modifier
      .fillMaxWidth()
      .drawBehind {
        val outer = borderSize.toPx()
        val inner = innerBorderSize.toPx()
        drawRect(color = borderOuter, size = size)
        drawRect(
          color = borderInner,
          topLeft = Offset(outer, outer),
          size = Size(size.width - outer * 2, size.height - outer * 2)
        )
        drawRect(
          color = background,
          topLeft = Offset(outer + inner, outer + inner),
          size = Size(size.width - (outer + inner) * 2, size.height - (outer + inner) * 2)
        )
      }
      .padding(borderSize + innerBorderSize)
  ) {
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(12.dp),
      verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
      Text(
        text = title,
        style = MaterialTheme.typography.labelLarge,
        color = NachtzugColors.StationNeon
      )
      if (!description.isNullOrBlank()) {
        SettingHint(description)
      }
      content()
    }
  }
}

@Composable
private fun SettingsToggleRow(
  label: String,
  hint: String,
  checked: Boolean,
  enabled: Boolean = true,
  onToggle: (Boolean) -> Unit
) {
  Row(
    modifier = Modifier.fillMaxWidth(),
    verticalAlignment = Alignment.Top,
    horizontalArrangement = Arrangement.SpaceBetween
  ) {
    Column(
      modifier = Modifier
        .weight(1f)
        .padding(end = 12.dp),
      verticalArrangement = Arrangement.spacedBy(2.dp)
    ) {
      Text(
        text = label,
        style = MaterialTheme.typography.bodyMedium,
        color = if (enabled) {
          NachtzugColors.TextPrimary
        } else {
          NachtzugColors.TextPrimary.copy(alpha = 0.5f)
        }
      )
      SettingHint(
        text = hint,
        enabled = enabled
      )
    }
    Switch(
      checked = checked,
      enabled = enabled,
      onCheckedChange = onToggle,
      modifier = Modifier.padding(top = 2.dp),
      colors = SwitchDefaults.colors(
        checkedThumbColor = NachtzugColors.StationNeon,
        checkedTrackColor = NachtzugColors.TicketEmpty,
        uncheckedThumbColor = NachtzugColors.TextDisabled,
        uncheckedTrackColor = NachtzugColors.SwitchTrackOff,
        checkedBorderColor = NachtzugColors.StationNeon,
        uncheckedBorderColor = NachtzugColors.ReaderBorderMuted
      )
    )
  }
}

@Composable
private fun SettingHint(
  text: String,
  enabled: Boolean = true
) {
  Text(
    text = text,
    style = MaterialTheme.typography.bodySmall,
    color = if (enabled) {
      NachtzugColors.TextMuted.copy(alpha = 0.70f)
    } else {
      NachtzugColors.TextMutedSoft.copy(alpha = 0.40f)
    }
  )
}
