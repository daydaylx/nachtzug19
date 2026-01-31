package de.daydaylx.nachtzug19.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/**
 * Typography System for NACHTZUG 19
 * 
 * Phase 2: Typography with Reader Noir aesthetic
 * 
 * Note: Using system fonts (Serif, Monospace) for now.
 * Lora and JetBrains Mono will be added when font files are available.
 */
val NachtzugTypography = Typography(
    // Narrative text (Reader mode) - Serif font
    displayLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Medium,
        fontSize = 24.sp,
        lineHeight = 38.sp
    ),
    displayMedium = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Medium,
        fontSize = 20.sp,
        lineHeight = 32.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 28.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 24.sp
    ),
    
    // UI labels - Monospace font
    labelLarge = TextStyle(
        fontFamily = FontFamily.Monospace,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    labelMedium = TextStyle(
        fontFamily = FontFamily.Monospace,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 18.sp
    ),
    labelSmall = TextStyle(
        fontFamily = FontFamily.Monospace,
        fontWeight = FontWeight.Normal,
        fontSize = 10.sp,
        lineHeight = 16.sp
    ),
    
    // Title for scenes
    titleMedium = TextStyle(
        fontFamily = FontFamily.Monospace,
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = 24.sp
    ),
    
    // Title for larger text
    titleLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Bold,
        fontSize = 28.sp,
        lineHeight = 36.sp
    )
)
