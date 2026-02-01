package de.daydaylx.nachtzug19.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.googlefonts.Font
import androidx.compose.ui.text.googlefonts.GoogleFont
import androidx.compose.ui.unit.sp
import de.daydaylx.nachtzug19.R

// Google Fonts Provider Setup
val provider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs
)

val LoraFont = FontFamily(
    Font(googleFont = GoogleFont("Lora"), fontProvider = provider)
)

val JetBrainsMonoFont = FontFamily(
    Font(googleFont = GoogleFont("JetBrains Mono"), fontProvider = provider)
)

val PixelFont = FontFamily(
    Font(googleFont = GoogleFont("Press Start 2P"), fontProvider = provider)
)

object PixelTypography {
    val title = TextStyle(
        fontFamily = PixelFont,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp
    )
    val body = TextStyle(
        fontFamily = PixelFont,
        fontWeight = FontWeight.Normal,
        fontSize = 10.sp,
        lineHeight = 14.sp
    )
}

/**
 * Typography System for NACHTZUG 19
 * 
 * Phase 8: Typography with Google Fonts (Lora, JetBrains Mono)
 */
val NachtzugTypography = Typography(
    // Narrative text (Reader mode) - Serif font (Lora)
    displayLarge = TextStyle(
        fontFamily = LoraFont,
        fontWeight = FontWeight.Medium,
        fontSize = 24.sp,
        lineHeight = 38.sp
    ),
    displayMedium = TextStyle(
        fontFamily = LoraFont,
        fontWeight = FontWeight.Medium,
        fontSize = 20.sp,
        lineHeight = 32.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = LoraFont,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 28.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = LoraFont,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 24.sp
    ),
    
    // UI labels - Monospace font (JetBrains Mono)
    labelLarge = TextStyle(
        fontFamily = JetBrainsMonoFont,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    labelMedium = TextStyle(
        fontFamily = JetBrainsMonoFont,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 18.sp
    ),
    labelSmall = TextStyle(
        fontFamily = JetBrainsMonoFont,
        fontWeight = FontWeight.Normal,
        fontSize = 10.sp,
        lineHeight = 16.sp
    ),
    
    // Title for scenes
    titleMedium = TextStyle(
        fontFamily = JetBrainsMonoFont,
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = 24.sp
    ),
    
    // Title for larger text
    titleLarge = TextStyle(
        fontFamily = LoraFont,
        fontWeight = FontWeight.Bold,
        fontSize = 28.sp,
        lineHeight = 36.sp
    )
)