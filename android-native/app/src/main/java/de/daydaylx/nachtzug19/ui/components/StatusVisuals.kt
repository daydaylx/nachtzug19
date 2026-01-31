package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@Composable
fun TicketStamp(
  label: String,
  value: Int,
  maxValue: Int = 5,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier,
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(4.dp)
  ) {
    Text(
      text = label,
      style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
      color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
    )

    Canvas(modifier = Modifier.size(60.dp, 16.dp)) {
      drawTicketSegments(value, maxValue)
    }

    Text(
      text = "$value/$maxValue",
      style = MaterialTheme.typography.labelSmall.copy(fontSize = 9.sp),
      color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f)
    )
  }
}

private fun DrawScope.drawTicketSegments(value: Int, maxValue: Int) {
  val segmentWidth = size.width / maxValue
  val segmentHeight = size.height
  val gap = 2.dp.toPx()

  repeat(maxValue) { index ->
    val x = index * segmentWidth
    val filled = index < value
    
    // Wärmere Farbe bei hohen Werten (Attention), sonst standard
    val baseColor = if (filled) NachtzugColors.TicketFilled else NachtzugColors.TicketEmpty

    // Leichte Variation für abgenutztes Aussehen
    val variation = if (filled) {
      when (index % 3) {
        0 -> baseColor
        1 -> baseColor.copy(alpha = 0.9f)
        else -> baseColor.copy(alpha = 0.85f)
      }
    } else baseColor

    drawRect(
      color = variation,
      topLeft = Offset(x + gap / 2, 0f),
      size = Size(segmentWidth - gap, segmentHeight)
    )
  }
}

@Composable
fun PressureBar(
  label: String,
  value: Int,
  maxValue: Int = 6,
  color: Color,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(4.dp)
  ) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = label,
        style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.sp),
        color = MaterialTheme.colorScheme.onSurface
      )
      Text(
        text = "$value/$maxValue",
        style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
      )
    }

    Canvas(modifier = Modifier.fillMaxWidth().height(8.dp)) {
      drawPressureSegments(value, maxValue, color)
    }
  }
}

private fun DrawScope.drawPressureSegments(value: Int, maxValue: Int, color: Color) {
  val segmentWidth = size.width / maxValue
  val segmentHeight = size.height
  val gap = 2.dp.toPx()

  repeat(maxValue) { index ->
    val x = index * segmentWidth
    val filled = index < value
    val segmentColor = if (filled) color else color.copy(alpha = 0.2f)

    drawRect(
      color = segmentColor,
      topLeft = Offset(x + gap / 2, 0f),
      size = Size(segmentWidth - gap, segmentHeight)
    )
  }
}

@Composable
fun ItemIcon(
  label: String,
  hasItem: Boolean,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalAlignment = Alignment.CenterVertically
  ) {
    Box(
      modifier = Modifier
        .size(16.dp)
        .drawWithContent {
          drawCircle(
            color = if (hasItem) NachtzugColors.TicketFilled else NachtzugColors.TicketEmpty,
            radius = size.minDimension / 2
          )
        }
    )
    Text(
      text = label,
      style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
      color = if (hasItem) MaterialTheme.colorScheme.onSurface 
              else MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f)
    )
  }
}