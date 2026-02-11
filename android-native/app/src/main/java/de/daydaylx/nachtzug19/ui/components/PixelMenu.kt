package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors
import de.daydaylx.nachtzug19.ui.theme.PixelTypography

/**
 * Legacy-Menü für ältere Choice-Layouts.
 *
 * Neue Auswahl-UI sollte `TicketChoice` verwenden.
 */
@Deprecated("Use TicketChoice instead for Reader Noir UI consistency")
@Composable
fun PixelMenu(
  options: List<String>,
  onSelect: (Int) -> Unit,
  modifier: Modifier = Modifier,
  selectedIndex: Int = 0
) {
  Column(
    modifier = modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(6.dp)
  ) {
    options.forEachIndexed { index, label ->
      key(label) {
        PixelMenuRow(
          label = label,
          selected = index == selectedIndex,
          onClick = { onSelect(index) }
        )
      }
    }
  }
}

@Composable
private fun PixelMenuRow(
  label: String,
  selected: Boolean,
  onClick: () -> Unit
) {
  val background = if (selected) NachtzugColors.BackgroundMenuSelected else NachtzugColors.BackgroundMenuIdle
  val cursorColor = if (selected) NachtzugColors.TextHighlight else NachtzugColors.TextPrimary

  // Focus State Support for Accessibility
  val interactionSource = remember { MutableInteractionSource() }
  val isFocused by interactionSource.collectIsFocusedAsState()

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .background(background)
      .border(
        width = if (isFocused) 2.dp else 0.dp,
        color = if (isFocused) NachtzugColors.FocusCyan else Color.Transparent
      )
      .clickable(
        interactionSource = interactionSource,
        indication = null,
        onClickLabel = label
      ) { onClick() }
      .padding(vertical = 6.dp, horizontal = 10.dp)
      .semantics {
        contentDescription = label
      },
    verticalAlignment = Alignment.CenterVertically
  ) {
    Box(
      modifier = Modifier
        .size(8.dp)
        .background(cursorColor)
    )
    Spacer(modifier = Modifier.width(8.dp))
    Text(
      text = label,
      style = PixelTypography.body,
      color = NachtzugColors.TextPrimary
    )
  }
}
