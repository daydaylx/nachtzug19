package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Popup
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@Composable
fun TicketStamp(
  label: String,
  value: Int,
  maxValue: Int = 5,
  description: String? = null,
  showTooltip: Boolean = false,
  onToggleTooltip: () -> Unit = {},
  modifier: Modifier = Modifier
) {
  Box(modifier = modifier) {
    if (showTooltip && description != null) {
      Popup(
        alignment = Alignment.TopCenter,
        onDismissRequest = onToggleTooltip
      ) {
        Surface(
          color = Color(0xFF141A22),
          shape = MaterialTheme.shapes.small,
          border = androidx.compose.foundation.BorderStroke(1.dp, Color(0x553E4753)),
          shadowElevation = 4.dp,
          modifier = Modifier.padding(bottom = 8.dp).width(180.dp)
        ) {
          Text(
            text = description,
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFFE8E8E8),
            modifier = Modifier.padding(8.dp)
          )
        }
      }
    }

    Column(
      modifier = Modifier.clickable { onToggleTooltip() },
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
      Text(
        text = label,
        style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
        color = Color(0x99E8E8E8)
      )

      Canvas(modifier = Modifier.size(60.dp, 16.dp)) {
        drawTicketSegments(value, maxValue)
      }

      Text(
        text = "$value/$maxValue",
        style = MaterialTheme.typography.labelSmall.copy(fontSize = 9.sp),
        color = Color(0x77E8E8E8)
      )
    }
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
  baseColor: Color,
  warningThreshold: Int = 3,
  dangerThreshold: Int = 5,
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
      drawPressureSegments(value, maxValue, baseColor, warningThreshold, dangerThreshold)
    }
  }
}

private fun DrawScope.drawPressureSegments(
  value: Int, 
  maxValue: Int, 
  baseColor: Color, 
  warningThreshold: Int, 
  dangerThreshold: Int
) {
  val segmentWidth = size.width / maxValue
  val segmentHeight = size.height
  val gap = 2.dp.toPx()

  repeat(maxValue) { index ->
    val x = index * segmentWidth
    val filled = index < value
    
    val color = when {
        !filled -> baseColor.copy(alpha = 0.2f)
        index >= dangerThreshold -> NachtzugColors.WarningRed
        index >= warningThreshold -> Color(0xFFE09F3E) // Orange/Warning
        else -> baseColor
    }

    drawRect(
      color = color,
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
    val glowColor = NachtzugColors.StationNeon
    val animatedColor by animateColorAsState(
        targetValue = if (hasItem) glowColor else NachtzugColors.TicketEmpty,
        label = "itemGlow",
        animationSpec = tween(500)
    )

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
                        color = animatedColor,
                        radius = size.minDimension / 2,
                        style = Fill
                    )
                    if (hasItem) {
                        // Glow effect layer
                         drawCircle(
                            color = glowColor.copy(alpha = 0.4f),
                            radius = size.minDimension / 2 + 2.dp.toPx()
                        )
                    }
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

@Composable
fun RelationshipDots(
    label: String,
    value: Int, // -2 to +10 roughly
    modifier: Modifier = Modifier
) {
    // Mapping: -2 (Hostile/Red) ... 0 (Neutral/Gray) ... +4 (Friendly/Green)
    val color = when {
        value < 0 -> NachtzugColors.WarningRed
        value > 2 -> Color(0xFF5BC0BE) // Teal
        else -> Color.Gray
    }
    
    Row(
        modifier = modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label, 
            style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.sp),
             color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.8f)
        )
        
        Row(horizontalArrangement = Arrangement.spacedBy(2.dp)) {
            // Visualize 5 dots max, active based on normalized value
            // Simple approach: Just text score + color for now to keep it clean, 
            // or a small bar. Let's do simple text with color for Phase 4.
            Text(
                text = if (value > 0) "+$value" else "$value",
                style = MaterialTheme.typography.labelSmall.copy(
                    fontSize = 12.sp,
                    fontWeight = androidx.compose.ui.text.font.FontWeight.Bold
                ),
                color = color
            )
        }
    }
}
