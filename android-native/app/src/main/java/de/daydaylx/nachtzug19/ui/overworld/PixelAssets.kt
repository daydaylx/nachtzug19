package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.ui.graphics.Color
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

/**
 * Pre-parsed sprite data structure for efficient rendering.
 */
data class PixelSprite(
    val width: Int,
    val height: Int,
    val pixels: List<Color?> // Null = Transparent
)

object PixelAssets {
    // Colors
    val C_SKIN = Color(0xFFE8C07D)
    val C_HAIR = Color(0xFF5A3A29)
    val C_UNIFORM = Color(0xFF2A3039)
    val C_UNIFORM_ACCENT = NachtzugColors.StationNeon // Cyan
    val C_RED = NachtzugColors.WarningRed
    val C_WHITE = Color.White
    val C_SHIRT = Color(0xFF8899A6)
    val C_JEANS = Color(0xFF3E5F8A)
    val C_GLASS = Color(0xFF88CCDD).copy(alpha = 0.3f)
    val C_FRAME = Color(0xFF444444)
    val C_SEAT = Color(0xFF8B4513) // Brown leather

    // 12x16 Player (Backpack Traveler)
    val PLAYER = parseSprite(
        12, 16,
        mapOf(
            'S' to C_SKIN, 'H' to C_HAIR, 'J' to C_JEANS, 'T' to C_SHIRT, 
            'B' to Color(0xFF654321), // Backpack brown
            'X' to Color.Black
        ),
        """
        ....HHHH....
        ....HHHH....
        ...SSHHSS...
        ...SSSSSS...
        ...TTTTTT...
        ..BTTTTTTB..
        ..BTTTTTTB..
        ..BTTTTTTB..
        ..BTTTTTTB..
        ..BBJJJJBB..
        ...JJJJJJ...
        ...JJ..JJ...
        ...JJ..JJ...
        ...JJ..JJ...
        ...XX..XX...
        ............
        """.trimIndent()
    )

    // 12x16 Conductor (Uniform + Hat)
    val CONDUCTOR = parseSprite(
        12, 16,
        mapOf(
            'S' to C_SKIN, 'U' to C_UNIFORM, 'A' to C_UNIFORM_ACCENT,
            'G' to Color.Gray, 'X' to Color.Black
        ),
        """
        ...UUUUUU...
        ..UUUUUUUU..
        ..UUAAAAUU..
        ...SSSSSS...
        ...SSSSSS...
        ...UUUUUU...
        ..GUUUUUUG..
        ..GUUAAUUG..
        ..GUUUUUUG..
        ..GUUUUUUG..
        ...UU..UU...
        ...UU..UU...
        ...UU..UU...
        ...UU..UU...
        ...XX..XX...
        ............
        """.trimIndent()
    )

    // 12x16 Boy (Cap + Shorts)
    val BOY = parseSprite(
        12, 16,
        mapOf(
            'S' to C_SKIN, 'R' to C_RED, 'W' to C_WHITE,
            'B' to Color.Blue, 'X' to Color.Black
        ),
        """
        ....RRRR....
        ...RRRRRR...
        ...SSRRRR...
        ...SSSSSS...
        ...WWWWWW...
        ..WWWWWWWW..
        ..WWWWWWWW..
        ...BBBBBB...
        ...BBBBBB...
        ...SS..SS...
        ...SS..SS...
        ...SS..SS...
        ...WW..WW...
        ...XX..XX...
        ............
        ............
        """.trimIndent()
    )

    // 12x16 Sleepless (Hoodie?)
    val SLEEPLESS = parseSprite(
        12, 16,
        mapOf(
            'S' to C_SKIN, 'G' to Color.DarkGray, 'X' to Color.Black
        ),
        """
        ....GGGG....
        ...GGGGGG...
        ...GSSSSG...
        ...GSSSSG...
        ...GGGGGG...
        ..GGGGGGGG..
        ..GGGGGGGG..
        ..GGGGGGGG..
        ...GG..GG...
        ...GG..GG...
        ...GG..GG...
        ...GG..GG...
        ...XX..XX...
        ............
        ............
        ............
        """.trimIndent()
    )
    
    // 16x16 Window (Train Window)
    val WINDOW = parseSprite(
        16, 16,
        mapOf(
            'G' to C_GLASS, 'F' to C_FRAME, 'N' to NachtzugColors.Background
        ),
        """
        FFFFFFFFFFFFFFFF
        FNNNNNNNNNNNNNNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNGGGGGGGGGGGGNF
        FNNNNNNNNNNNNNNF
        FFFFFFFFFFFFFFFF
        ................
        ................
        """.trimIndent()
    )

    private fun parseSprite(width: Int, height: Int, palette: Map<Char, Color>, data: String): PixelSprite {
        // Remove newlines and whitespace
        val cleanData = data.replace(Regex("\\s+"), "")
        val pixels = ArrayList<Color?>(width * height)
        
        for (char in cleanData) {
            pixels.add(palette[char]) // null if not in palette (e.g. '.')
        }
        
        // Pad if short (safety)
        while (pixels.size < width * height) {
            pixels.add(null)
        }
        
        return PixelSprite(width, height, pixels)
    }
}