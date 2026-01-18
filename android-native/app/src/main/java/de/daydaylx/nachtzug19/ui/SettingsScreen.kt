package de.daydaylx.nachtzug19.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.ReaderSettings

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
  settings: ReaderSettings,
  onBack: () -> Unit,
  onUpdateSettings: (ReaderSettings) -> Unit
) {
  var localSettings by remember(settings) { mutableStateOf(settings) }

  Scaffold(
    topBar = {
      TopAppBar(
        title = { Text("Einstellungen") },
        navigationIcon = {
          IconButton(onClick = onBack) {
            Icon(Icons.Default.ArrowBack, contentDescription = "Back")
          }
        }
      )
    }
  ) { padding ->
    Column(
      modifier = Modifier
        .padding(padding)
        .padding(20.dp)
    ) {
      Text("Textgröße", style = MaterialTheme.typography.titleSmall)
      Slider(
        value = localSettings.textSizeSp,
        onValueChange = {
          localSettings = localSettings.copy(textSizeSp = it)
          onUpdateSettings(localSettings)
        },
        valueRange = 14f..24f
      )

      Spacer(modifier = Modifier.height(16.dp))
      SettingsToggle(
        label = "Reduce Motion",
        checked = localSettings.reduceMotion,
        onToggle = {
          localSettings = localSettings.copy(reduceMotion = it)
          onUpdateSettings(localSettings)
        }
      )
      SettingsToggle(
        label = "Immersion FX",
        checked = localSettings.immersionFx,
        onToggle = {
          localSettings = localSettings.copy(immersionFx = it)
          onUpdateSettings(localSettings)
        }
      )
      SettingsToggle(
        label = "Status anzeigen",
        checked = localSettings.showStatus,
        onToggle = {
          localSettings = localSettings.copy(showStatus = it)
          onUpdateSettings(localSettings)
        }
      )
      SettingsToggle(
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

@Composable
private fun SettingsToggle(label: String, checked: Boolean, onToggle: (Boolean) -> Unit) {
  Row(
    modifier = Modifier
      .fillMaxWidth()
      .padding(vertical = 8.dp),
    verticalAlignment = Alignment.CenterVertically
  ) {
    Text(label, modifier = Modifier.weight(1f))
    Switch(checked = checked, onCheckedChange = onToggle)
  }
}
