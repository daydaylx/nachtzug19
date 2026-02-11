package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.UiState
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@Composable
fun StatusSheet(
  uiState: UiState,
  modifier: Modifier = Modifier
) {
  val state = uiState.state ?: return
  val scrollState = rememberScrollState()
  
  // Tooltip State Management
  var activeTooltip by remember { mutableStateOf<String?>(null) }
  
  Column(
    modifier = modifier
      .fillMaxWidth()
      .verticalScroll(scrollState)
      .navigationBarsPadding()
      .padding(horizontal = 20.dp, vertical = 12.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
  ) {
    Text(
      text = "STATUS",
      style = MaterialTheme.typography.labelMedium,
      color = NachtzugColors.TextPrimary
    )

    StatusSection(title = "Tickets") {
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
    }

    StatusSection(title = "Druck") {
      Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        PressureBar(
          label = "Aufmerksamkeit (Schaffner)",
          value = state.pressure.conductor_attention,
          baseColor = NachtzugColors.ControlOrange,
          warningThreshold = 3,
          dangerThreshold = 5
        )
        PressureBar(
          label = "Erinnerungsdrift",
          value = state.pressure.memory_drift,
          baseColor = NachtzugColors.DriftNeutral,
          warningThreshold = 3,
          dangerThreshold = 5
        )
      }
    }

    StatusSection(title = "Gegenstände") {
      ItemIcon("Kassettenrekorder", state.items.has_recorder)
      ItemIcon("Tag19-Etikett", state.items.has_tag19)
      ItemIcon("Foto-Anomalie", state.items.photo_anomaly)
    }

    if (uiState.settings.showRelations) {
      StatusSection(title = "Beziehungen") {
        RelationshipDots("Abteil 7", state.relations.rel_comp7)
        RelationshipDots("Der Junge", state.relations.rel_boy)
        RelationshipDots("Der Schlaflose", state.relations.rel_sleepless)
      }  
    }
  }
}

@Composable
private fun StatusSection(
  title: String,
  modifier: Modifier = Modifier,
  content: @Composable ColumnScope.() -> Unit
) {
  val borderOuter = NachtzugColors.PanelBorderOuterSoft
  val borderInner = NachtzugColors.PanelBorderInnerSoft
  val background = NachtzugColors.ReaderPanelSoft
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
      verticalArrangement = Arrangement.spacedBy(8.dp)
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
