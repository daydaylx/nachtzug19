package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
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
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.geometry.RoundRect
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.Role
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

// Re-using the types from TicketChoice.kt would be ideal, but to avoid circular deps or duplication issues if I'm replacing it,
// I'll assume they are defined here or I import them if they are public in TicketChoice.kt.
// For safety, I'll redefine them if I can't find them, but TicketChoice.kt has them.
// Let's rely on TicketChoice.kt for the types if they are public.
// Wait, Kotlin files in same package share visibility.

// Since I am creating a new file, I will rename the component to avoid conflict if both exist.
// But I will likely replace usage in PlayerScreen.

private class EnhancedTicketShape(
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
            
            // Right side holes
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
fun TicketChoiceEnhanced(
    label: String,
    onClick: () -> Unit,
    isProcessing: Boolean,
    style: TicketChoiceStyle = TicketChoiceStyle(),
    modifier: Modifier = Modifier
) {
    var isPressed by remember { mutableStateOf(false) }
    
    // Scale Animation
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.98f else 1f,
        label = "ticketScale",
        animationSpec = tween(150)
    )
    
    // Color Animation for Border
    val targetBorderColor = if (isPressed) NachtzugColors.StationNeon else NachtzugColors.ReaderBorder.copy(alpha = 0.3f)
    val borderColor by animateColorAsState(
        targetValue = targetBorderColor,
        label = "ticketBorderColor",
        animationSpec = tween(150)
    )

    Surface(
        modifier = modifier
            .fillMaxWidth()
            .scale(scale)
            .shadow(
                elevation = 4.dp,
                EnhancedTicketShape(12.dp.value * 3f, 4.dp.value * 3f),
                spotColor = Color.Black.copy(alpha = 0.3f)
            )
            .clickable(
                enabled = !isProcessing,
                onClickLabel = label,
                role = Role.Button
            ) {
                isPressed = true
                onClick()
            }
            .semantics {
                contentDescription = label
                role = Role.Button
            },
        shape = EnhancedTicketShape(12.dp.value * 3f, 4.dp.value * 3f),
        color = NachtzugColors.TicketEmpty,
        border = BorderStroke(
            width = 1.dp,
            color = borderColor
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
                    color = if (isPressed) NachtzugColors.StationNeon else MaterialTheme.colorScheme.onSurface,
                    lineHeight = 22.sp
                ),
                textAlign = TextAlign.Start,
                modifier = Modifier
                    .weight(1f)
                    .padding(end = 16.dp),
                maxLines = 4
            )
            
            EnhancedTicketStampArea(style = style, isPressed = isPressed)
        }
    }
    
    LaunchedEffect(isProcessing) {
        if (!isProcessing) {
            isPressed = false
        }
    }
}

@Composable
private fun EnhancedTicketStampArea(style: TicketChoiceStyle, isPressed: Boolean) {
    val stampColor = if (isPressed) NachtzugColors.StationNeon else NachtzugColors.TicketFilled
    
    Box(
        modifier = Modifier.size(32.dp),
        contentAlignment = Alignment.Center
    ) {
        Box(
            modifier = Modifier
                .size(28.dp)
                .background(
                    color = stampColor.copy(alpha = if (isPressed) 0.2f else 0.1f),
                    shape = CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = if (style.tone != null) "★" else "19",
                style = MaterialTheme.typography.labelSmall.copy(
                    fontSize = if (style.tone != null) 14.sp else 10.sp,
                    color = stampColor.copy(alpha = if (isPressed) 0.8f else 0.5f)
                )
            )
        }
    }
}
