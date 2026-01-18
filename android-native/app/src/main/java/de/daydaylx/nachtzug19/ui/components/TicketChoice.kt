package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@Composable
fun TicketChoice(
  label: String,
  onClick: () -> Unit,
  isProcessing: Boolean,
  modifier: Modifier = Modifier
) {
  var isPressed by remember { mutableStateOf(false) }
  val scale by animateFloatAsState(
    targetValue = if (isPressed) 0.98f else 1f,
    label = "ticketScale",
    animationSpec = androidx.compose.animation.core.tween(150)
  )

  Card(
    modifier = modifier
      .fillMaxWidth()
      .scale(scale)
      .drawWithContent {
        drawContent()
        // Punch holes along right edge
        val holeSize = 4.dp.toPx()
        val holeSpacing = 8.dp.toPx()
        val startX = size.width - 6.dp.toPx()
        val centerY = size.height / 2
        
        for (i in -3..3) {
          drawCircle(
            color = Color.Black.copy(alpha = 0.4f),
            radius = holeSize / 2,
            center = Offset(
              x = startX,
              y = centerY + (i * holeSpacing)
            ),
            style = Stroke(width = 1.dp.toPx())
          )
        }
      },
    shape = RoundedCornerShape(12.dp),
    colors = CardDefaults.cardColors(
      containerColor = NachtzugColors.TicketEmpty
    ),
    border = BorderStroke(
      width = 1.dp,
      color = NachtzugColors.ReaderBorder.copy(alpha = 0.3f)
    ),
    onClick = {
      if (!isProcessing) {
        isPressed = true
        onClick()
      }
    }
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 14.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = label,
        style = MaterialTheme.typography.bodyLarge.copy(
          fontSize = 15.sp,
          fontFamily = FontFamily.SansSerif,
          color = MaterialTheme.colorScheme.onSurface
        ),
        textAlign = TextAlign.Start,
        modifier = Modifier.weight(1f),
        maxLines = 2
      )

      // Small ticket icon decoration
      Box(
        modifier = Modifier
          .size(24.dp)
          .background(
            color = NachtzugColors.TicketFilled.copy(alpha = 0.1f),
            shape = CircleShape
          )
      )
    }
  }

  LaunchedEffect(isProcessing) {
    if (isProcessing) {
      isPressed = false
    }
  }
}