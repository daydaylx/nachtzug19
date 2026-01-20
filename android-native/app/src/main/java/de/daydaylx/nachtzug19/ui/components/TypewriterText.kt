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

@Composable
fun TypewriterText(
  text: String,
  textSizeSp: Float,
  enabled: Boolean,
  modifier: Modifier = Modifier,
  style: TextStyle = MaterialTheme.typography.bodyLarge,
  delayMillis: Long = 10L
) {
  var visibleChars by remember(text) { mutableIntStateOf(if (enabled) 0 else text.length) }

  LaunchedEffect(text, enabled) {
    if (enabled && visibleChars < text.length) {
      // Reset if text changed
      visibleChars = 0
      
      // Animate character reveal
      // Chunking improves performance for long texts
      val chunkSize = 3
      for (i in 0 until text.length step chunkSize) {
        visibleChars = (i + chunkSize).coerceAtMost(text.length)
        delay(delayMillis)
      }
      visibleChars = text.length
    } else if (!enabled) {
      visibleChars = text.length
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
