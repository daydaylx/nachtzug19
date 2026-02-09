package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text

/**
 * Dialog-Container für Titel + Narrative mit optionalen Scroll-Hinweisen.
 */
@Composable
fun PixelDialogBox(
  title: String?,
  narrative: String,
  scrollState: ScrollState,
  modifier: Modifier = Modifier,
  contentPadding: Dp = 12.dp,
  showScrollIndicators: Boolean = true,
  textSizeSp: Float = 16f,
  enableTypewriter: Boolean = false
) {
  // Higher opacity + local dimming: keeps narrative readable over photo-rich backgrounds.
  val borderOuter = Color(0xCC0B0F14)
  val borderInner = Color(0xAA2E3540)
  val background = Color(0xD4141A22)
  val borderSize = 3.dp
  val innerBorderSize = 1.dp
  val hasOverflow = scrollState.maxValue > 0
  val scrollProgress = if (scrollState.maxValue == 0) {
    1f
  } else {
    scrollState.value.toFloat() / scrollState.maxValue.toFloat()
  }
  var skipRequested by remember(narrative, enableTypewriter) { mutableStateOf(false) }
  var speedMultiplier by remember(narrative, enableTypewriter) { mutableFloatStateOf(1f) }
  var typewriterFinished by remember(narrative, enableTypewriter) { mutableStateOf(!enableTypewriter) }

  Box(
    modifier = modifier
      .fillMaxWidth()
      .drawBehind {
        val outer = borderSize.toPx()
        val inner = innerBorderSize.toPx()
        drawRect(color = borderOuter, size = size)
        drawRect(
          color = borderInner,
          topLeft = Offset(outer, outer),
          size = Size(size.width - outer * 2, size.height - outer * 2)
        )
        drawRect(
          color = background,
          topLeft = Offset(outer + inner, outer + inner),
          size = Size(size.width - (outer + inner) * 2, size.height - (outer + inner) * 2)
        )
      }
      .padding(borderSize + innerBorderSize)
  ) {
    Box(
      modifier = Modifier
        .fillMaxSize()
        .background(
          Brush.verticalGradient(
            colors = listOf(
              Color(0xD6141A22),
              Color(0xE6141A22),
              Color(0xD6141A22)
            )
          )
        )
        .padding(contentPadding)
    ) {
      Box(
        modifier = Modifier
          .fillMaxSize()
          .background(
            Brush.radialGradient(
              colors = listOf(
                Color.Transparent,
                Color.Black.copy(alpha = 0.22f)
              ),
              radius = Float.POSITIVE_INFINITY
            )
          )
      )

      Column(
        modifier = Modifier
        .fillMaxWidth()
        .verticalScroll(scrollState)
        .padding(bottom = if (showScrollIndicators && hasOverflow) 28.dp else 0.dp)
      ) {
        if (!title.isNullOrBlank()) {
          Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            color = Color(0xFFE8E8E8)
          )
          Spacer(modifier = Modifier.height(8.dp))
        }
        if (enableTypewriter && !typewriterFinished) {
          Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
          ) {
            TypewriterControl(
              label = if (speedMultiplier > 1f) "Tempo x3" else "Tempo x1",
              active = speedMultiplier > 1f,
              onClick = { speedMultiplier = if (speedMultiplier > 1f) 1f else 3f }
            )
            Spacer(modifier = Modifier.width(8.dp))
            TypewriterControl(
              label = "Sofort",
              active = false,
              onClick = { skipRequested = true }
            )
          }
          Spacer(modifier = Modifier.height(8.dp))
        }

        TypewriterText(
          text = narrative,
          textSizeSp = textSizeSp,
          enabled = enableTypewriter,
          speedMultiplier = speedMultiplier,
          skip = skipRequested,
          style = MaterialTheme.typography.bodyLarge,
          onAnimationFinished = { typewriterFinished = true }
        )
      }

      if (showScrollIndicators && hasOverflow && scrollState.canScrollForward) {
        Column(
          modifier = Modifier
            .align(Alignment.BottomCenter)
            .padding(bottom = 2.dp),
          horizontalAlignment = Alignment.CenterHorizontally
        ) {
          NarrativeProgressIndicator(scrollProgress = scrollProgress.coerceIn(0f, 1f))
          ContinueHint(
            visible = scrollState.canScrollForward,
            modifier = Modifier.padding(top = 6.dp)
          )
        }
      }
    }
  }
}

@Composable
private fun TypewriterControl(
  label: String,
  active: Boolean,
  onClick: () -> Unit
) {
  val background = if (active) {
    Color(0xFF223744)
  } else {
    Color(0x66222A34)
  }
  val border = if (active) {
    Color(0xFF5BC0BE)
  } else {
    Color(0x663E4753)
  }

  Box(
    modifier = Modifier
      .background(color = border, shape = RectangleShape)
      .padding(1.dp)
      .background(color = background, shape = RectangleShape)
      .clickable(onClick = onClick)
      .padding(horizontal = 8.dp, vertical = 4.dp)
  ) {
    Text(
      text = label,
      style = MaterialTheme.typography.labelSmall,
      color = Color(0xFFE8E8E8)
    )
  }
}
