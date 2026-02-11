package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.tween
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.disabled
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.ChoiceWeight
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors
import kotlinx.coroutines.delay

private data class ChoiceVisualStyle(
    val accent: Color,
    val badgeLabel: String,
    val accessibilityLabel: String
)

private fun ChoiceWeight.visualStyle(): ChoiceVisualStyle {
    return when (this) {
        ChoiceWeight.Neutral -> ChoiceVisualStyle(
            accent = NachtzugColors.StationNeon,
            badgeLabel = "Neutral",
            accessibilityLabel = "neutral"
        )
        ChoiceWeight.Riskant -> ChoiceVisualStyle(
            accent = NachtzugColors.ControlOrange,
            badgeLabel = "Riskant",
            accessibilityLabel = "riskant"
        )
        ChoiceWeight.Irreversibel -> ChoiceVisualStyle(
            accent = NachtzugColors.WarningRed,
            badgeLabel = "Endgültig",
            accessibilityLabel = "irreversibel"
        )
    }
}

@Composable
fun TicketChoice(
    label: String,
    onClick: () -> Unit,
    isProcessing: Boolean,
    isInteractionLocked: Boolean = false,
    weight: ChoiceWeight = ChoiceWeight.Neutral,
    enabled: Boolean = true,
    modifier: Modifier = Modifier
) {
    val visualStyle = remember(weight) { weight.visualStyle() }
    val isEnabled = enabled && !isInteractionLocked
    val shape = RoundedCornerShape(12.dp)
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val isFocused by interactionSource.collectIsFocusedAsState()
    var processingDots by remember(label) { mutableIntStateOf(3) }

    LaunchedEffect(isProcessing) {
        if (!isProcessing) {
            processingDots = 3
            return@LaunchedEffect
        }
        while (isProcessing) {
            for (dotCount in 1..3) {
                processingDots = dotCount
                delay(220L)
            }
        }
    }

    val processingPulse = if (isProcessing) {
        val transition = rememberInfiniteTransition(label = "ticketProcessingPulse")
        val alpha by transition.animateFloat(
            initialValue = 0.45f,
            targetValue = 1f,
            animationSpec = infiniteRepeatable(
                animation = tween(durationMillis = 480, easing = LinearEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "ticketProcessingAlpha"
        )
        alpha
    } else {
        1f
    }

    val displayedLabel = if (isProcessing) {
        "Wird verarbeitet${".".repeat(processingDots)}"
    } else {
        label
    }
    val badgeLabel = if (isProcessing) {
        ".".repeat(processingDots)
    } else {
        visualStyle.badgeLabel
    }

    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.994f else 1f,
        label = "ticketScale",
        animationSpec = tween(120)
    )

    val borderColor by animateColorAsState(
        targetValue = when {
            !isEnabled -> NachtzugColors.ReaderBorder.copy(alpha = 0.24f)
            isFocused -> visualStyle.accent.copy(alpha = 0.85f)
            isPressed -> visualStyle.accent.copy(alpha = 0.70f)
            else -> visualStyle.accent.copy(alpha = 0.45f)
        },
        label = "ticketBorder"
    )

    val cardColor by animateColorAsState(
        targetValue = if (isEnabled) {
            NachtzugColors.TicketEmpty.copy(alpha = 0.90f)
        } else {
            NachtzugColors.TicketEmpty.copy(alpha = 0.55f)
        },
        label = "ticketCard"
    )

    Surface(
        modifier = modifier
            .fillMaxWidth()
            .scale(scale)
            .shadow(
                elevation = if (isFocused) 6.dp else 3.dp,
                shape = shape,
                spotColor = Color.Black.copy(alpha = 0.35f)
            )
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                enabled = isEnabled
            ) {
                onClick()
            }
            .semantics(mergeDescendants = true) {
                role = Role.Button
                contentDescription = if (isProcessing) {
                    "$label, wird verarbeitet"
                } else {
                    "$label, ${visualStyle.accessibilityLabel}"
                }
                if (!isEnabled) disabled()
            },
        shape = shape,
        color = cardColor,
        border = BorderStroke(
            width = if (isFocused) 2.dp else 1.dp,
            color = borderColor
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp, vertical = 14.dp),
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .width(3.dp)
                    .height(34.dp),
            ) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = visualStyle.accent.copy(alpha = if (isEnabled) 0.65f else 0.25f),
                    shape = RoundedCornerShape(999.dp)
                ) {}
            }

            Text(
                text = displayedLabel,
                style = MaterialTheme.typography.bodyLarge.copy(
                    color = if (isProcessing) {
                        MaterialTheme.colorScheme.onSurface.copy(alpha = 0.56f + 0.34f * processingPulse)
                    } else if (isEnabled) {
                        MaterialTheme.colorScheme.onSurface.copy(alpha = 0.93f)
                    } else {
                        MaterialTheme.colorScheme.onSurface.copy(alpha = 0.48f)
                    }
                ),
                modifier = Modifier
                    .weight(1f)
                    .padding(end = 8.dp),
                maxLines = 4,
                overflow = TextOverflow.Ellipsis
            )

            Surface(
                color = visualStyle.accent.copy(alpha = if (isEnabled) 0.18f else 0.08f),
                shape = RoundedCornerShape(10.dp),
                border = BorderStroke(
                    width = 1.dp,
                    color = visualStyle.accent.copy(alpha = if (isEnabled) 0.40f else 0.20f)
                )
            ) {
                Text(
                    text = badgeLabel,
                    style = MaterialTheme.typography.labelSmall,
                    color = if (isProcessing) {
                        visualStyle.accent.copy(alpha = 0.35f + 0.60f * processingPulse)
                    } else {
                        visualStyle.accent.copy(alpha = if (isEnabled) 0.95f else 0.40f)
                    },
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                )
            }
        }
    }
}
