package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.UiState

@Composable
fun StatusSheet(
  uiState: UiState,
  modifier: Modifier = Modifier
) {
  val state = uiState.state ?: return
  
  // Tooltip State Management
  var activeTooltip by remember { mutableStateOf<String?>(null) }
  
  Column(
    modifier = modifier.padding(20.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
  ) {
    Text("Status", style = MaterialTheme.typography.titleMedium)

    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceEvenly
    ) {
      TicketStamp(
          label = "Wahrheit", 
          value = state.tickets.tickets_truth,
          description = "Erkenntnis darüber, was wirklich geschehen ist.",
          showTooltip = activeTooltip == "truth",
          onToggleTooltip = { activeTooltip = if (activeTooltip == "truth") null else "truth" }
      )
      TicketStamp(
          label = "Flucht", 
          value = state.tickets.tickets_escape,
          description = "Der Drang, dem Zug und der Verantwortung zu entkommen.",
          showTooltip = activeTooltip == "escape",
          onToggleTooltip = { activeTooltip = if (activeTooltip == "escape") null else "escape" }
      )
    }
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceEvenly
    ) {
      TicketStamp(
          label = "Schuld", 
          value = state.tickets.tickets_guilt,
          description = "Die Last vergangener Taten, die schwer wiegt.",
          showTooltip = activeTooltip == "guilt",
          onToggleTooltip = { activeTooltip = if (activeTooltip == "guilt") null else "guilt" }
      )
      TicketStamp(
          label = "Liebe", 
          value = state.tickets.tickets_love,
          description = "Verbindung zu anderen, trotz der Umstände.",
          showTooltip = activeTooltip == "love",
          onToggleTooltip = { activeTooltip = if (activeTooltip == "love") null else "love" }
      )
    }

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        PressureBar(
          label = "Attention (Schaffner)",
          value = state.pressure.conductor_attention,
          baseColor = androidx.compose.ui.graphics.Color(0xFFE07856),
          warningThreshold = 3,
          dangerThreshold = 5
        )
        PressureBar(
          label = "Memory Drift",
          value = state.pressure.memory_drift,
          baseColor = androidx.compose.ui.graphics.Color(0xFF9BC1BC),
          warningThreshold = 3,
          dangerThreshold = 5
        )
    }

    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
      Text("Items", style = MaterialTheme.typography.labelMedium)
      ItemIcon("Kassettenrekorder", state.items.has_recorder)
      ItemIcon("Tag19-Etikett", state.items.has_tag19)
      ItemIcon("Foto-Anomalie", state.items.photo_anomaly)
    }

    if (uiState.settings.showRelations) {
      Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Text("Beziehungen", style = MaterialTheme.typography.labelMedium)
        RelationshipDots("Compartment 7", state.relations.rel_comp7)
        RelationshipDots("The Boy", state.relations.rel_boy)
        RelationshipDots("Sleepless", state.relations.rel_sleepless)
      }
    }
  }
}