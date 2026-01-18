package de.daydaylx.nachtzug19.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.sp

private val DarkColorScheme = darkColorScheme(
  primary = NachtzugColors.StationNeon,
  secondary = NachtzugColors.ControlOrange,
  background = NachtzugColors.Background,
  surface = NachtzugColors.ReaderCard,
  onBackground = Color(0xFFE8E8E8),
  onSurface = Color(0xFFE8E8E8),
  error = NachtzugColors.WarningRed
)

private val LightColorScheme = lightColorScheme(
  primary = NachtzugColors.StationNeon,
  secondary = NachtzugColors.ControlOrange,
  background = NachtzugColors.Background,
  surface = NachtzugColors.ReaderCard,
  onBackground = Color(0xFFE8E8E8),
  onSurface = Color(0xFFE8E8E8),
  error = NachtzugColors.WarningRed
)

private fun Typography(): Typography {
  return Typography(
    // Narrative: Serif für E-Reader Feeling
    bodyLarge = TextStyle(
      fontFamily = FontFamily.Serif,
      fontSize = 16.sp,
      lineHeight = 24.sp,
      letterSpacing = 0.5.sp
    ),
    bodyMedium = TextStyle(
      fontFamily = FontFamily.Serif,
      fontSize = 14.sp,
      lineHeight = 20.sp,
      letterSpacing = 0.25.sp
    ),
    // UI Labels: Sans
    labelLarge = TextStyle(
      fontFamily = FontFamily.SansSerif,
      fontSize = 14.sp,
      letterSpacing = 0.15.sp
    ),
    labelMedium = TextStyle(
      fontFamily = FontFamily.SansSerif,
      fontSize = 12.sp,
      letterSpacing = 0.25.sp
    ),
    labelSmall = TextStyle(
      fontFamily = FontFamily.SansSerif,
      fontSize = 10.sp,
      letterSpacing = 0.4.sp
    ),
    titleLarge = TextStyle(
      fontFamily = FontFamily.SansSerif,
      fontSize = 22.sp,
      letterSpacing = 0.sp
    ),
    titleMedium = TextStyle(
      fontFamily = FontFamily.SansSerif,
      fontSize = 18.sp,
      letterSpacing = 0.sp
    )
  )
}

@Composable
fun NachtzugTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  content: @Composable () -> Unit
) {
  val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
  
  MaterialTheme(
    colorScheme = colorScheme,
    typography = Typography(),
    content = content
  )
}