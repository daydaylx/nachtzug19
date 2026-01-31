package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.UiState

@Composable
fun StatusSheet(
  uiState: UiState,
  modifier: Modifier = Modifier
) {
  val state = uiState.state ?: return
  Column(
    modifier = modifier.padding(20.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
  ) {
    Text("Status", style = MaterialTheme.typography.titleMedium)

    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceEvenly
    ) {
      TicketStamp("Wahrheit", state.tickets.tickets_truth)
      TicketStamp("Flucht", state.tickets.tickets_escape)
    }
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceEvenly
    ) {
      TicketStamp("Schuld", state.tickets.tickets_guilt)
      TicketStamp("Liebe", state.tickets.tickets_love)
    }

    PressureBar(
      label = "Attention",
      value = state.pressure.conductor_attention,
      color = androidx.compose.ui.graphics.Color(0xFFE07856)
    )
    PressureBar(
      label = "Drift",
      value = state.pressure.memory_drift,
      color = androidx.compose.ui.graphics.Color(0xFF9BC1BC)
    )

    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
      Text("Items", style = MaterialTheme.typography.labelMedium)
      ItemIcon("Kassettenrekorder", state.items.has_recorder)
      ItemIcon("Tag19-Etikett", state.items.has_tag19)
      ItemIcon("Foto-Anomalie", state.items.photo_anomaly)
    }

    if (uiState.settings.showRelations) {
      Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Text("Beziehungen", style = MaterialTheme.typography.labelMedium)
        Text(
          "Comp7: ${state.relations.rel_comp7} · Boy: ${state.relations.rel_boy} · Sleepless: ${state.relations.rel_sleepless}",
          style = MaterialTheme.typography.bodySmall
        )
      }
    }
  }
}
