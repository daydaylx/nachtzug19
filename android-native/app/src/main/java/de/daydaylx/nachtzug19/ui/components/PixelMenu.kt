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
  val background = if (selected) Color(0xAA1B2330) else Color(0x9910151D)  // 67% / 60% opaque - more transparent
  val cursorColor = if (selected) Color(0xFFFFD369) else Color(0xFFE8E8E8)

  // Focus State Support for Accessibility
  val interactionSource = remember { MutableInteractionSource() }
  val isFocused by interactionSource.collectIsFocusedAsState()

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .background(background)
      .border(
        width = if (isFocused) 2.dp else 0.dp,
        color = if (isFocused) Color(0xFF00BCD4) else Color.Transparent
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
      color = Color(0xFFE8E8E8)
    )
  }
}
