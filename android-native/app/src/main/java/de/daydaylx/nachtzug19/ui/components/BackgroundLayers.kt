package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.DrawScope
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors
import kotlin.math.sin
import kotlin.random.Random

private val BgDark = NachtzugColors.BackgroundDeep
private val BgLighter = NachtzugColors.BackgroundPanel

@Composable
fun BackgroundBase(modifier: Modifier = Modifier) {
  Box(
    modifier = modifier
      .fillMaxSize()
      .background(
        Brush.verticalGradient(
          colors = listOf(BgDark, BgLighter),
          startY = 0f,
          endY = Float.POSITIVE_INFINITY
        )
      )
  )
}

@Composable
fun BackgroundDrift(
  driftLevel: Int,
  enabled: Boolean,
  modifier: Modifier = Modifier
) {
  if (!enabled || driftLevel < 2) return

  val infiniteTransition = rememberInfiniteTransition(label = "drift")
  
  // Animation speed varies with drift level
  val durationMillis = when {
    driftLevel >= 4 -> 20000 // Slower, more unsettling
    driftLevel >= 2 -> 30000 // Normal
    else -> 30000
  }
  
  val offset by infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 360f,
    animationSpec = infiniteRepeatable(
      animation = tween(durationMillis = durationMillis, easing = LinearEasing),
      repeatMode = RepeatMode.Restart
    ),
    label = "driftOffset"
  )

  // Color shifts based on drift level
  val driftColor = when {
    driftLevel <= 3 -> NachtzugColors.DriftOverlayNeutral // Neutral to slightly cold
    else -> NachtzugColors.DriftOverlayCold // Colder at high drift
  }
  
  val driftAlpha = 0.02f + (0.03f * driftLevel / 6f)

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(driftColor.copy(alpha = driftAlpha))
  )

  Canvas(modifier = modifier.fillMaxSize()) {
    drawDriftLines(offset, driftLevel)
    if (driftLevel >= 4) {
      drawGlitches(driftLevel)
    }
  }
}

private fun DrawScope.drawDriftLines(offset: Float, driftLevel: Int) {
  val lineCount = driftLevel.coerceAtMost(6)

  repeat(lineCount) { i ->
    val yPos = size.height * (i + 1) / (lineCount + 1f)
    val xShift = sin((offset + i * 60f) * Math.PI / 180f).toFloat() * size.width * 0.03f
    val alpha = (0.02f + 0.01f * driftLevel).coerceAtMost(0.1f)

    drawLine(
      color = Color.White.copy(alpha = alpha),
      start = Offset(0f, yPos + xShift),
      end = Offset(size.width, yPos + xShift * 0.5f),
      strokeWidth = 1f
    )
  }
}

private fun DrawScope.drawGlitches(driftLevel: Int) {
  val random = Random(System.currentTimeMillis() / 150)
  val glitchCount = (driftLevel - 3).coerceAtLeast(0) * 2
  
  repeat(glitchCount) {
    if (random.nextFloat() < 0.3f) { // Random chance to show glitch
        val x = random.nextFloat() * size.width
        val y = random.nextFloat() * size.height
        val w = random.nextFloat() * size.width * 0.4f
        val h = random.nextFloat() * 4f + 1f
        
        // Chromatic aberration-like color
        val color = when (random.nextInt(3)) {
            0 -> Color.Cyan.copy(alpha = 0.15f)
            1 -> Color.Magenta.copy(alpha = 0.15f)
            else -> Color.White.copy(alpha = 0.2f)
        }
        
        drawRect(
            color = color,
            topLeft = Offset(x - w / 2, y),
            size = Size(w, h)
        )
    }
  }
}

@Composable
fun VignetteLayer(
  enabled: Boolean = true,
  modifier: Modifier = Modifier
) {
  if (!enabled) return

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(
        Brush.radialGradient(
          colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.4f)),
          radius = Float.POSITIVE_INFINITY
        )
      )
  )
}

@Composable
fun NoiseLayer(enabled: Boolean, modifier: Modifier = Modifier) {
  if (!enabled) return

  Canvas(modifier = modifier.fillMaxSize()) {
    drawNoise()
  }
}

private fun DrawScope.drawNoise() {
  val random = Random(System.currentTimeMillis() / 100)
  val pixelSize = 4f
  val cols = (size.width / pixelSize).toInt()
  val rows = (size.height / pixelSize).toInt()

  repeat(cols * rows / 50) {
    val x = random.nextFloat() * size.width
    val y = random.nextFloat() * size.height
    val alpha = random.nextFloat() * 0.05f

    drawCircle(
      color = Color.White.copy(alpha = alpha),
      radius = pixelSize / 2,
      center = Offset(x, y)
    )
  }
}
