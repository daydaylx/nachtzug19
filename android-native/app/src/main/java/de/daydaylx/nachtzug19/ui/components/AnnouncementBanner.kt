package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

/**
 * Announcement Banner für wichtige Durchsagen.
 *
 * Zeigt Announcements mit Slide-in Animation von oben an.
 * Wird für Szenen mit SceneTag.Announcement verwendet.
 *
 * @param text Der Announcement-Text
 * @param visible Ob das Banner sichtbar sein soll
 * @param animationsEnabled Ob Animationen aktiv sind
 */
@Composable
fun AnnouncementBanner(
    text: String,
    visible: Boolean,
    animationsEnabled: Boolean = true,
    modifier: Modifier = Modifier
) {
    AnimatedVisibility(
        visible = visible && text.isNotBlank(),
        enter = if (animationsEnabled) {
            fadeIn(animationSpec = tween(200)) + slideInVertically(
                animationSpec = tween(200),
                initialOffsetY = { -it }
            )
        } else {
            fadeIn(animationSpec = tween(0))
        },
        exit = if (animationsEnabled) {
            fadeOut(animationSpec = tween(200)) + slideOutVertically(
                animationSpec = tween(200),
                targetOffsetY = { -it }
            )
        } else {
            fadeOut(animationSpec = tween(0))
        },
        modifier = modifier
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF1A1F2B))
                .border(
                    width = 1.dp,
                    color = Color(0xFFFFD369)
                )
                .padding(vertical = 8.dp, horizontal = 12.dp),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = text,
                style = MaterialTheme.typography.labelMedium,
                color = Color(0xFFFFD369),
                textAlign = TextAlign.Center
            )
        }
    }
}
