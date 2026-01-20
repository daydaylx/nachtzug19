package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

private class TicketShape(
  private val cornerRadius: Float,
  private val holeRadius: Float,
  private val holeCount: Int = 7
) : Shape {
  override fun createOutline(
    size: Size,
    layoutDirection: LayoutDirection,
    density: Density
  ): Outline {
    val path = Path().apply {
      // Main rectangle with rounded corners
      addRoundRect(
        androidx.compose.ui.geometry.RoundRect(
          rect = Rect(0f, 0f, size.width, size.height),
          radiusX = cornerRadius,
          radiusY = cornerRadius
        )
      )

      // Cut out holes on the right edge
      val holeSpacing = size.height / (holeCount + 1)
      val holeX = size.width // Right edge center of hole
      
      for (i in 1..holeCount) {
        val holeY = holeSpacing * i
        val holeRect = Rect(
          left = holeX - holeRadius,
          top = holeY - holeRadius,
          right = holeX + holeRadius,
          bottom = holeY + holeRadius
        )
        // Creating a small path for the hole and subtracting it
        val holePath = Path().apply { addOval(holeRect) }
        op(this, holePath, androidx.compose.ui.graphics.PathOperation.Difference)
      }
    }
    return Outline.Generic(path)
  }
}

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

  // Visual constants
  val cornerRadius = 12.dp
  val holeRadius = 4.dp
  
  // Custom Shape for the ticket
  val ticketShape = remember { TicketShape(cornerRadius.value * 3f, holeRadius.value * 3f) }

  Surface(
    modifier = modifier
      .fillMaxWidth()
      .scale(scale)
      .shadow(4.dp, ticketShape, spotColor = Color.Black)
      .clickable(enabled = !isProcessing) {
        isPressed = true
        onClick()
      },
    shape = ticketShape,
    color = NachtzugColors.TicketEmpty,
    border = BorderStroke(
      width = 1.dp,
      color = if (isPressed) NachtzugColors.StationNeon.copy(alpha = 0.5f) 
              else NachtzugColors.ReaderBorder.copy(alpha = 0.3f)
    )
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 16.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = label,
        style = MaterialTheme.typography.bodyLarge.copy(
          fontSize = 16.sp,
          fontFamily = FontFamily.SansSerif,
          color = if (isPressed) NachtzugColors.StationNeon else MaterialTheme.colorScheme.onSurface
        ),
        textAlign = TextAlign.Start,
        modifier = Modifier
          .weight(1f)
          .padding(end = 16.dp),
        maxLines = 2
      )

      // Ticket stamp area
      Box(
        modifier = Modifier
          .size(32.dp)
          .background(
            color = if (isPressed) NachtzugColors.StationNeon.copy(alpha = 0.2f) 
                    else NachtzugColors.TicketFilled.copy(alpha = 0.1f),
            shape = CircleShape
          ),
        contentAlignment = Alignment.Center
      ) {
        Text(
          text = "19",
          style = MaterialTheme.typography.labelSmall.copy(
            fontSize = 10.sp,
            color = if (isPressed) NachtzugColors.StationNeon else NachtzugColors.TicketFilled.copy(alpha = 0.5f)
          )
        )
      }
    }
  }

  LaunchedEffect(isProcessing) {
    if (isProcessing) {
      isPressed = false
    }
  }
}