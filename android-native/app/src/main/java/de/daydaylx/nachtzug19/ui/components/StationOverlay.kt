package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.*
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.MotionPolicy
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

@Composable
fun StationOverlay(
    visible: Boolean, 
    stationCount: Int,
    motionPolicy: MotionPolicy
) {
    if (motionPolicy.allowTransitions) {
        AnimatedVisibility(
            visible = visible,
            enter = fadeIn(animationSpec = tween(motionPolicy.overlayTransitionDurationMs)) + slideInVertically(
                animationSpec = tween(motionPolicy.overlayTransitionDurationMs),
                initialOffsetY = { -it }  // Von oben
            ),
            exit = fadeOut(animationSpec = tween(motionPolicy.overlayTransitionDurationMs)) + slideOutVertically(
                animationSpec = tween(motionPolicy.overlayTransitionDurationMs),
                targetOffsetY = { -it }  // Nach oben
            )
        ) {
            StationOverlayCard(
                stationCount = stationCount,
                pulseEnabled = motionPolicy.allowContinuousEffects
            )
        }
    } else if (visible) {
        StationOverlayCard(
            stationCount = stationCount,
            pulseEnabled = false
        )
    }
}

@Composable
private fun StationOverlayCard(
    stationCount: Int,
    pulseEnabled: Boolean
) {
    val alpha = if (pulseEnabled) {
        val infiniteTransition = rememberInfiniteTransition(label = "pulse")
        val pulsingAlpha by infiniteTransition.animateFloat(
            initialValue = 0.6f,
            targetValue = 1f,
            animationSpec = infiniteRepeatable(
                animation = tween(1000, easing = FastOutSlowInEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "pulseAlpha"
        )
        pulsingAlpha
    } else {
        1f
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(Color.Black.copy(alpha = 0.9f))
            .padding(vertical = 12.dp, horizontal = 16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "STATION ERREICHT",
                    color = Color.White.copy(alpha = 0.7f),
                    style = MaterialTheme.typography.labelSmall
                )
                Text(
                    text = "Halt #$stationCount",
                    color = NachtzugColors.StationNeon.copy(alpha = alpha),
                    style = MaterialTheme.typography.titleLarge
                )
            }
            
            // Visual accent
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(
                        color = NachtzugColors.StationNeon.copy(alpha = 0.1f * alpha),
                        shape = RoundedCornerShape(4.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "19",
                    color = NachtzugColors.StationNeon,
                    style = MaterialTheme.typography.labelLarge
                )
            }
        }
    }
}
