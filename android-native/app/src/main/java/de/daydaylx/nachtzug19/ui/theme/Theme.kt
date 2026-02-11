package de.daydaylx.nachtzug19.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val NachtzugColorScheme = darkColorScheme(
  primary = NachtzugColors.StationNeon,
  secondary = NachtzugColors.DriftNeutral,
  background = NachtzugColors.BackgroundDeep,
  surface = NachtzugColors.BackgroundPanel,
  onPrimary = NachtzugColors.BackgroundDeep,
  onSecondary = NachtzugColors.BackgroundDeep,
  onBackground = NachtzugColors.TextPrimary,
  onSurface = NachtzugColors.TextPrimary
)

@Composable
fun NachtzugTheme(content: @Composable () -> Unit) {
  MaterialTheme(
    colorScheme = NachtzugColorScheme,
    typography = NachtzugTypography,
    content = content
  )
}
