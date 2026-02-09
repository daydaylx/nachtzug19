package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.MotionPolicy
import kotlinx.coroutines.delay

@Composable
fun ChoiceFeedback(
    visible: Boolean,
    motionPolicy: MotionPolicy,
    message: String = "Wird verarbeitet...",
    onAnimationEnd: () -> Unit = {}
) {
    // Trigger callback when animation completes
    LaunchedEffect(visible, motionPolicy.choiceFeedbackVisibleMs) {
        if (visible) {
            if (motionPolicy.choiceFeedbackVisibleMs > 0) {
                delay(motionPolicy.choiceFeedbackVisibleMs)
            }
            onAnimationEnd()
        }
    }

    if (motionPolicy.choiceFeedbackFadeDurationMs <= 0) {
        if (visible) {
            ChoiceFeedbackBubble(message = message)
        }
        return
    }

    AnimatedVisibility(
        visible = visible,
        enter = fadeIn(animationSpec = tween(motionPolicy.choiceFeedbackFadeDurationMs)),
        exit = fadeOut(animationSpec = tween(motionPolicy.choiceFeedbackFadeDurationMs))
    ) {
        ChoiceFeedbackBubble(message = message)
    }
}

@Composable
private fun ChoiceFeedbackBubble(message: String) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(bottom = 24.dp),
        contentAlignment = Alignment.BottomCenter
    ) {
        Text(
            text = message,
            style = MaterialTheme.typography.labelMedium,
            color = Color(0xFFE8E8E8),
            modifier = Modifier
                .background(
                    color = Color(0x66141A22),
                    shape = MaterialTheme.shapes.small
                )
                .padding(horizontal = 12.dp, vertical = 6.dp)
        )
    }
}
