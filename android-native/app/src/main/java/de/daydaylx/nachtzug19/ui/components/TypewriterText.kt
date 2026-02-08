package de.daydaylx.nachtzug19.ui.components

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.TextUnit
import kotlinx.coroutines.delay
import kotlin.math.max

@Composable
fun TypewriterText(
  text: String,
  textSizeSp: Float,
  enabled: Boolean,
  modifier: Modifier = Modifier,
  style: TextStyle = MaterialTheme.typography.bodyLarge,
  delayMillis: Long = 10L,
  speedMultiplier: Float = 1f,
  skip: Boolean = false,
  onAnimationFinished: (() -> Unit)? = null
) {
  var visibleChars by remember(text) { mutableIntStateOf(if (enabled) 0 else text.length) }
  val safeSpeedMultiplier = speedMultiplier.coerceAtLeast(0.25f)

  LaunchedEffect(enabled, skip, text) {
    if (!enabled || skip) {
      visibleChars = text.length
      onAnimationFinished?.invoke()
    } else if (text.isEmpty()) {
      visibleChars = text.length
      onAnimationFinished?.invoke()
    }
  }

  LaunchedEffect(text, enabled, skip, safeSpeedMultiplier) {
    if (!enabled || skip || visibleChars >= text.length) {
      if (visibleChars >= text.length) {
        onAnimationFinished?.invoke()
      }
      return@LaunchedEffect
    }

    // Chunking improves performance for long texts.
    val chunkSize = 3
    while (visibleChars < text.length && enabled && !skip) {
      visibleChars = (visibleChars + chunkSize).coerceAtMost(text.length)
      if (visibleChars < text.length) {
        val effectiveDelay = max(1, (delayMillis / safeSpeedMultiplier).toInt()).toLong()
        delay(effectiveDelay)
      }
    }

    if (visibleChars >= text.length) {
      onAnimationFinished?.invoke()
    }
  }

  val annotatedString = buildAnnotatedString {
    withStyle(style = SpanStyle(color = MaterialTheme.colorScheme.onSurface)) {
      append(text.substring(0, visibleChars))
    }
    withStyle(style = SpanStyle(color = Color.Transparent)) {
      append(text.substring(visibleChars))
    }
  }

  Text(
    text = annotatedString,
    style = style.copy(
      fontFamily = FontFamily.Serif,
      fontSize = TextUnit(textSizeSp, androidx.compose.ui.unit.TextUnitType.Sp),
      lineHeight = TextUnit(textSizeSp * 1.5f, androidx.compose.ui.unit.TextUnitType.Sp)
    ),
    modifier = modifier
  )
}
