package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors
import kotlin.math.roundToInt

/**
 * Reader Card Component for NACHTZUG 19
 * 
 * Phase 2: Reader Noir aesthetic with paper/plastic texture
 * Phase 5: Drift shake effect
 * 
 * Design principles:
 * - Soft depth (elevation 4-12dp)
 * - Paper/plastic texture overlay
 * - Warm dark gray background (not pure white)
 * - Minimal border (no frame kitsch)
 */
@Composable
fun ReaderCard(
    title: String?,
    narrative: String,
    textSizeSp: Float = 16f,
    driftLevel: Int = 0,
    modifier: Modifier = Modifier
) {
    // Phase 5: Card Shake Effect
    val infiniteTransition = rememberInfiniteTransition(label = "shake")
    
    val shakeIntensity = when {
        driftLevel >= 5 -> 3f
        driftLevel >= 3 -> 1.5f
        else -> 0f
    }
    
    val offsetX by infiniteTransition.animateFloat(
        initialValue = -shakeIntensity,
        targetValue = shakeIntensity,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 50, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "shakeX"
    )

    val offsetY by infiniteTransition.animateFloat(
        initialValue = shakeIntensity,
        targetValue = -shakeIntensity,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 40, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "shakeY"
    )

    // Paper/plastic texture overlay gradient
    val textureBrush = Brush.radialGradient(
        colors = listOf(
            Color.White.copy(alpha = 0.02f),
            Color.Transparent
        ),
        radius = Float.POSITIVE_INFINITY
    )
    
    // Drift ghost shadow effect
    val cardElevation = if (driftLevel >= 4) 8.dp else 4.dp
    val cardShadowColor = if (driftLevel >= 4) 
        Color.Black.copy(alpha = 0.4f) 
    else 
        Color.Black.copy(alpha = 0.3f)
    
    // Reader card background color (warm dark gray, not pure white)
    val cardBackgroundColor = NachtzugColors.BackgroundPanelElevated
    
    Card(
        modifier = modifier
            .offset { IntOffset(offsetX.roundToInt(), offsetY.roundToInt()) }
            .shadow(
                elevation = cardElevation,
                shape = RoundedCornerShape(16.dp),
                spotColor = cardShadowColor
            ),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = cardBackgroundColor
        )
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(textureBrush)  // Paper/plastic texture
        ) {
            NarrativeContent(
                title = title,
                narrative = narrative,
                textSizeSp = textSizeSp
            )
        }
    }
}

/**
 * Narrative content with title and typewriter text
 */
@Composable
private fun NarrativeContent(
    title: String?,
    narrative: String,
    textSizeSp: Float
) {
    androidx.compose.foundation.layout.Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp)
    ) {
        if (!title.isNullOrBlank()) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
            )
            Spacer(modifier = Modifier.height(12.dp))
        }
        
        TypewriterText(
            text = narrative,
            textSizeSp = textSizeSp,
            enabled = true  // Controlled by settings in parent
        )
    }
}

/**
 * Narrative Progress Indicator
 * 
 * Shows scroll progress as a thin bar at bottom of card
 */
@Composable
fun NarrativeProgressIndicator(
    scrollProgress: Float,  // 0.0 to 1.0
    modifier: Modifier = Modifier
) {
    val trackWidth = 48.dp
    Box(
        modifier = modifier
            .height(1.dp)
            .width(trackWidth)
            .background(
                color = Color.White.copy(alpha = 0.08f),
                shape = RoundedCornerShape(1.dp)
            )
    ) {
        Box(
            modifier = Modifier
                .height(1.dp)
                .width(trackWidth * scrollProgress.coerceIn(0f, 1f))
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(
                            MaterialTheme.colorScheme.primary.copy(alpha = 0.65f),
                            Color.White.copy(alpha = 0.2f)
                        )
                    ),
                    shape = RoundedCornerShape(1.dp)
                )
        )
    }
}

/**
 * Continue Hint
 * 
 * Shows "↓ Scrollen ↓" hint when more content is available
 */
@Composable
fun ContinueHint(
    visible: Boolean, 
    modifier: Modifier = Modifier
) {
    if (!visible) return
    val shape = RoundedCornerShape(999.dp)
    
    Box(
        modifier = modifier,
        contentAlignment = androidx.compose.ui.Alignment.Center
    ) {
      Box(
        modifier = Modifier
          .background(color = NachtzugColors.ReaderScrimStrong.copy(alpha = 0.80f), shape = shape)
          .border(width = 1.dp, color = NachtzugColors.ReaderBorderStrong.copy(alpha = 0.72f), shape = shape)
          .padding(horizontal = 10.dp, vertical = 3.dp)
      ) {
          Text(
              text = "Weiter unten",
              style = MaterialTheme.typography.labelSmall,
              color = NachtzugColors.TextMuted.copy(alpha = 0.90f)
          )
      }
    }
}
