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
import de.daydaylx.nachtzug19.ui.theme.PixelTypography

@Composable
fun SettingsScreen(
  settings: ReaderSettings,
  onBack: () -> Unit,
  onUpdateSettings: (ReaderSettings) -> Unit
) {
  var localSettings by remember(settings) { mutableStateOf(settings) }
  val scrollState = rememberScrollState()

  Box(modifier = Modifier.fillMaxSize()) {
    AnimatedBackground(
      currentBackground = BackgroundAsset.Compartment,
      driftLevel = 1,
      enabled = true
    )
    SafeZoneOverlay(enabled = true)
    VignetteLayer()
    NoiseLayer(enabled = localSettings.immersionFx)

    Column(
      modifier = Modifier
        .fillMaxSize()
        .statusBarsPadding()
        .navigationBarsPadding()
        .verticalScroll(scrollState)
        .padding(horizontal = 20.dp, vertical = 12.dp),
      verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
      SettingsHeader(onBack = onBack)

      SettingsSection(title = "Reader") {
        Text(
          text = "Textgröße",
          style = MaterialTheme.typography.labelLarge,
          color = Color(0xFFE8E8E8)
        )
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          Text("14", style = MaterialTheme.typography.labelSmall, color = Color(0x99E8E8E8))
          Text(
            text = localSettings.textSizeSp.toInt().toString(),
            style = MaterialTheme.typography.labelSmall,
            color = NachtzugColors.StationNeon
          )
          Text("24", style = MaterialTheme.typography.labelSmall, color = Color(0x99E8E8E8))
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
      }

      SettingsSection(title = "Effekte") {
        SettingsToggleRow(
          label = "Reduce Motion",
          checked = localSettings.reduceMotion,
          onToggle = {
            localSettings = localSettings.copy(reduceMotion = it)
            onUpdateSettings(localSettings)
          }
        )
        SettingsToggleRow(
          label = "Immersion FX",
          checked = localSettings.immersionFx,
          onToggle = {
            localSettings = localSettings.copy(immersionFx = it)
            onUpdateSettings(localSettings)
          }
        )
      }

      SettingsSection(title = "Overlay") {
        SettingsToggleRow(
          label = "Status anzeigen",
          checked = localSettings.showStatus,
          onToggle = {
            localSettings = localSettings.copy(showStatus = it)
            onUpdateSettings(localSettings)
          }
        )
        SettingsToggleRow(
          label = "Beziehungen anzeigen",
          checked = localSettings.showRelations,
          onToggle = {
            localSettings = localSettings.copy(showRelations = it)
            onUpdateSettings(localSettings)
          }
        )
      }
    }
  }
}

@Composable
private fun SettingsHeader(
  onBack: () -> Unit,
  modifier: Modifier = Modifier
) {
  val borderOuter = Color(0xFF0B0F14)
  val borderInner = Color(0xFF2E3540)
  val background = Color(0xFF141A22)

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
          tint = Color(0xFFE8E8E8)
        )
      }
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = "EINSTELLUNGEN",
        style = PixelTypography.body,
        color = Color(0xFFE8E8E8)
      )
    }
  }
}

@Composable
private fun SettingsSection(
  title: String,
  modifier: Modifier = Modifier,
  content: @Composable ColumnScope.() -> Unit
) {
  val borderOuter = Color(0x990B0F14)
  val borderInner = Color(0x882E3540)
  val background = Color(0xB2141A22)
  val borderSize = 3.dp
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
        .padding(14.dp),
      verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      Text(
        text = title,
        style = MaterialTheme.typography.labelLarge,
        color = NachtzugColors.StationNeon
      )
      content()
    }
  }
}

@Composable
private fun SettingsToggleRow(
  label: String,
  checked: Boolean,
  onToggle: (Boolean) -> Unit
) {
  Row(
    modifier = Modifier.fillMaxWidth(),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween
  ) {
    Text(
      text = label,
      style = MaterialTheme.typography.bodyMedium,
      color = Color(0xFFE8E8E8),
      modifier = Modifier.weight(1f)
    )
    Switch(
      checked = checked,
      onCheckedChange = onToggle,
      colors = SwitchDefaults.colors(
        checkedThumbColor = NachtzugColors.StationNeon,
        checkedTrackColor = NachtzugColors.TicketEmpty,
        uncheckedThumbColor = Color(0xFF7A8694),
        uncheckedTrackColor = Color(0xFF27313D),
        checkedBorderColor = NachtzugColors.StationNeon,
        uncheckedBorderColor = Color(0x553E4753)
      )
    )
  }
}
