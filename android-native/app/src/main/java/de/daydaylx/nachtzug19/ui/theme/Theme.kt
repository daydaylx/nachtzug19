package de.daydaylx.nachtzug19.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.sp
import androidx.compose.material3.Typography

private val NachtzugColorScheme = darkColorScheme(
  primary = Color(0xFF5BC0BE),
  secondary = Color(0xFF9BC1BC),
  tertiary = Color(0xFFE6EBE0),
  background = Color(0xFF0B0F14),
  surface = Color(0xFF141A22),
  onPrimary = Color(0xFF001F1F),
  onSecondary = Color(0xFF0B0F14),
  onBackground = Color(0xFFE6EBE0),
  onSurface = Color(0xFFE6EBE0)
)

private val NachtzugTypography = Typography(
  bodyLarge = TextStyle(
    fontFamily = FontFamily.Serif,
    fontSize = 18.sp,
    lineHeight = 26.sp
  ),
  titleMedium = TextStyle(
    fontFamily = FontFamily.Serif,
    fontSize = 20.sp
  )
)

@Composable
fun NachtzugTheme(content: @Composable () -> Unit) {
  MaterialTheme(
    colorScheme = NachtzugColorScheme,
    typography = NachtzugTypography,
    content = content
  )
}
