package de.daydaylx.nachtzug19.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

/**
 * Backlog Sheet (Story Mode)
 *
 * Displays previously read narrative beats in reverse chronological order.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BacklogSheet(
  backlog: List<BacklogEntry>,
  onDismiss: () -> Unit
) {
  ModalBottomSheet(
    onDismissRequest = onDismiss,
    containerColor = NachtzugColors.BackgroundPanel,
    contentColor = NachtzugColors.TextPrimary
  ) {
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
      Text(
        text = "Backlog",
        style = MaterialTheme.typography.titleMedium,
        color = NachtzugColors.TextPrimary,
        modifier = Modifier.padding(bottom = 12.dp)
      )

      if (backlog.isEmpty()) {
        Text(
          text = "Noch keine Einträge im Backlog.",
          style = MaterialTheme.typography.bodyMedium,
          color = NachtzugColors.TextMuted,
          modifier = Modifier.padding(vertical = 24.dp)
        )
      } else {
        LazyColumn(
          modifier = Modifier
            .fillMaxWidth()
            .heightIn(max = 500.dp),
          reverseLayout = true  // Newest at bottom (most recent visible first in reverse)
        ) {
          items(backlog) { entry ->
            BacklogItem(entry)
            Spacer(modifier = Modifier.height(12.dp))
          }
        }
      }

      Spacer(modifier = Modifier.height(16.dp))
    }
  }
}

/**
 * Backlog Item Component
 *
 * Displays a single beat entry with text and optional metadata.
 */
@Composable
private fun BacklogItem(entry: BacklogEntry) {
  Column(
    modifier = Modifier
      .fillMaxWidth()
      .background(
        color = NachtzugColors.BackgroundPanelElevated,
        shape = RoundedCornerShape(8.dp)
      )
      .border(
        width = 1.dp,
        color = NachtzugColors.ReaderBorderMuted,
        shape = RoundedCornerShape(8.dp)
      )
      .padding(12.dp)
  ) {
    Text(
      text = entry.text,
      style = MaterialTheme.typography.bodyMedium,
      color = NachtzugColors.TextMuted
    )
  }
}
