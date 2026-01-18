package de.daydaylx.nachtzug19.ui.components

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.TextUnit
import kotlinx.coroutines.delay

@Composable
fun TypewriterText(
  text: String,
  textSizeSp: Float,
  enabled: Boolean,
  modifier: Modifier = Modifier,
  style: TextStyle = MaterialTheme.typography.bodyLarge,
  delayMillis: Long = 15L
) {
  var displayedText by remember(text) { mutableStateOf(if (enabled) "" else text) }

  LaunchedEffect(text, enabled) {
    if (enabled && displayedText != text) {
      displayedText = ""
      text.forEachIndexed { index, _ ->
        displayedText = text.substring(0, index + 1)
        delay(delayMillis)
      }
    } else if (!enabled) {
      displayedText = text
    }
  }

  Text(
    text = displayedText,
    style = style.copy(
      fontFamily = FontFamily.Serif,
      fontSize = TextUnit(textSizeSp, androidx.compose.ui.unit.TextUnitType.Sp),
      lineHeight = TextUnit(textSizeSp * 1.5f, androidx.compose.ui.unit.TextUnitType.Sp)
    ),
    color = MaterialTheme.colorScheme.onSurface,
    modifier = modifier
  )
}
