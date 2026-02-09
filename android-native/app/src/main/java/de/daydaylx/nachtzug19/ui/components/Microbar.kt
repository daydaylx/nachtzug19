package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.Tickets
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@Composable
fun Microbar(
  tickets: Tickets,
  drift: Int,
  attention: Int,
  onClick: () -> Unit,
  dense: Boolean = false,
  modifier: Modifier = Modifier
) {
  val cornerRadius = if (dense) 16.dp else 20.dp
  val horizontalPadding = if (dense) 10.dp else 12.dp
  val verticalPadding = if (dense) 6.dp else 8.dp
  val iconSize = if (dense) 26.dp else 30.dp
  val glyphSize = if (dense) 16.dp else 18.dp

  Row(
    modifier = modifier
      .fillMaxWidth()
      .clip(RoundedCornerShape(cornerRadius))
      .background(Color.Black.copy(alpha = 0.62f))
      .padding(horizontal = horizontalPadding, vertical = verticalPadding)
      .clickable(onClick = onClick),
    horizontalArrangement = Arrangement.SpaceEvenly,
    verticalAlignment = Alignment.CenterVertically
  ) {
    MicroIcon(
      icon = ReaderIcons.Tickets,
      label = "Tickets",
      value = tickets.total(),
      max = 20,
      color = NachtzugColors.TicketFilled,
      iconSize = iconSize,
      glyphSize = glyphSize
    )
    MicroIcon(
      icon = ReaderIcons.Drift,
      label = "Erinnerungsdrift",
      value = drift,
      max = 6,
      color = NachtzugColors.DriftNeutral.copy(alpha = 0.9f),
      iconSize = iconSize,
      glyphSize = glyphSize
    )
    MicroIcon(
      icon = ReaderIcons.Attention,
      label = "Aufmerksamkeit",
      value = attention,
      max = 6,
      color = NachtzugColors.ControlOrange.copy(alpha = 0.9f),
      iconSize = iconSize,
      glyphSize = glyphSize
    )
  }
}

@Composable
private fun MicroIcon(
  icon: ImageVector,
  label: String,
  value: Int,
  max: Int,
  color: Color,
  iconSize: Dp,
  glyphSize: Dp,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier,
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(2.dp)
  ) {
    Box(
      modifier = Modifier
        .size(iconSize)
        .clip(CircleShape)
        .background(
          color = MaterialTheme.colorScheme.surface.copy(alpha = 0.55f),
          shape = CircleShape
        ),
      contentAlignment = Alignment.Center
    ) {
      Icon(
        imageVector = icon,
        contentDescription = "$label: $value von $max",
        tint = color,
        modifier = Modifier.size(glyphSize)
      )
    }
    Text(
      text = value.toString(),
      style = MaterialTheme.typography.labelSmall,
      color = color.copy(alpha = 0.92f)
    )
  }
}
