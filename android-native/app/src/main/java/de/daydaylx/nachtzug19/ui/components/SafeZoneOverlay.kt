package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

/**
 * Safe Zone Overlay to ensure text readability
 * Darkens top 12% and bottom 18% of screen
 * 
 * This ensures that narrative text and choices are always readable
 * regardless of the background image content
 */
@Composable
fun SafeZoneOverlay(
    enabled: Boolean = true,
    modifier: Modifier = Modifier
) {
    if (!enabled) return
    
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color.Black.copy(alpha = 0.6f),  // Top 12%
                        Color.Transparent.copy(alpha = 0f),  // Middle 70%
                        Color.Black.copy(alpha = 0.8f)   // Bottom 18%
                    ),
                    startY = 0f,
                    endY = Float.POSITIVE_INFINITY
                )
            )
    )
}
