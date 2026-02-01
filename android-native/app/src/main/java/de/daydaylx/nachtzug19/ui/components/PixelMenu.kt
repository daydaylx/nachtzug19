package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.theme.PixelTypography

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
      PixelMenuRow(
        label = label,
        selected = index == selectedIndex,
        onClick = { onSelect(index) }
      )
    }
  }
}

@Composable
private fun PixelMenuRow(
  label: String,
  selected: Boolean,
  onClick: () -> Unit
) {
  val background = if (selected) Color(0xFF1B2330) else Color(0xFF10151D)
  val cursorColor = if (selected) Color(0xFFFFD369) else Color(0xFFE8E8E8)

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .background(background)
      .clickable(onClick = onClick)
      .padding(vertical = 6.dp, horizontal = 10.dp),
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