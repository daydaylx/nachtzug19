package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathOperation
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.geometry.RoundRect
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

enum class Tone {
    OBSERVANT, CAUTIOUS, IMPULSIVE, COMPASSIONATE
}

data class TicketChoiceStyle(
    val isWeighted: Boolean = true,
    val tone: Tone? = null
)

private class TicketShape(
    private val cornerRadius: Float,
    private val holeRadius: Float,
    private val holeCount: Int = 7
) : Shape {
    override fun createOutline(
        size: Size,
        layoutDirection: LayoutDirection,
        density: Density
    ): Outline {
        val path = Path().apply {
            addRoundRect(
                RoundRect(
                    left = 0f,
                    top = 0f,
                    right = size.width,
                    bottom = size.height,
                    cornerRadius = CornerRadius(cornerRadius)
                )
            )
            
            val holeSpacing = size.height / (holeCount + 1)
            val holeX = size.width
            
            for (i in 1..holeCount) {
                val holeY = holeSpacing * i
                val holeRect = Rect(
                    left = holeX - holeRadius,
                    top = holeY - holeRadius,
                    right = holeX + holeRadius,
                    bottom = holeY + holeRadius
                )
                addOval(holeRect)
            }
        }
        return Outline.Generic(path)
    }
}

@Composable
fun TicketChoice(
    label: String,
    onClick: () -> Unit,
    isProcessing: Boolean,
    style: TicketChoiceStyle = TicketChoiceStyle(),
    modifier: Modifier = Modifier
) {
    var isPressed by remember { mutableStateOf(false) }
    
    // Accessibility & Focus Handling
    val interactionSource = remember { MutableInteractionSource() }
    val isFocused by interactionSource.collectIsFocusedAsState()
    
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.98f else 1f,
        label = "ticketScale",
        animationSpec = tween(150)
    )
    
    Surface(
        modifier = modifier
            .fillMaxWidth()
            .scale(scale)
            .shadow(
                elevation = if (isFocused) 8.dp else 4.dp,
                TicketShape(12.dp.value * 3f, 4.dp.value * 3f),
                spotColor = if (isFocused) NachtzugColors.StationNeon.copy(alpha = 0.5f) else Color.Black.copy(alpha = 0.3f)
            )
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                enabled = !isProcessing
            ) {
                isPressed = true
                onClick()
            }
            .semantics {
                role = Role.Button
                contentDescription = label
            },
        shape = TicketShape(12.dp.value * 3f, 4.dp.value * 3f),
        color = NachtzugColors.TicketEmpty,
        border = BorderStroke(
            width = if (isFocused) 2.dp else 1.dp,
            color = when {
                isFocused -> NachtzugColors.StationNeon
                isPressed -> NachtzugColors.StationNeon.copy(alpha = 0.5f)
                else -> NachtzugColors.ReaderBorder.copy(alpha = 0.3f)
            }
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = label,
                style = MaterialTheme.typography.bodyLarge.copy(
                    fontSize = 16.sp,
                    fontFamily = FontFamily.SansSerif,
                    color = if (isPressed || isFocused) NachtzugColors.StationNeon else MaterialTheme.colorScheme.onSurface,
                    lineHeight = 22.sp
                ),
                textAlign = TextAlign.Start,
                modifier = Modifier
                    .weight(1f)
                    .padding(end = 16.dp),
                maxLines = 4,
                overflow = TextOverflow.Ellipsis
            )
            
            TicketStampArea(style = style)
        }
    }
    
    LaunchedEffect(isProcessing) {
        if (isProcessing) {
            isPressed = false
        }
    }
}

@Composable
private fun TicketStampArea(style: TicketChoiceStyle) {
    Box(
        modifier = Modifier.size(32.dp),
        contentAlignment = Alignment.Center
    ) {
        Box(
            modifier = Modifier
                .size(28.dp)
                .background(
                    color = NachtzugColors.TicketFilled.copy(alpha = 0.1f),
                    shape = CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = if (style.tone != null) "★" else "19",
                style = MaterialTheme.typography.labelSmall.copy(
                    fontSize = if (style.tone != null) 14.sp else 10.sp,
                    color = NachtzugColors.TicketFilled.copy(alpha = 0.5f)
                )
            )
        }
    }
}
