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
    val C_SKIN = NachtzugColors.PixelSkin
    val C_HAIR = NachtzugColors.PixelHair
    val C_UNIFORM = NachtzugColors.PixelUniform
    val C_UNIFORM_ACCENT = NachtzugColors.StationNeon // Cyan
    val C_RED = NachtzugColors.WarningRed
    val C_WHITE = Color.White
    val C_SHIRT = NachtzugColors.PixelShirt
    val C_JEANS = NachtzugColors.PixelJeans
    val C_GLASS = NachtzugColors.PixelGlass.copy(alpha = 0.3f)
    val C_FRAME = NachtzugColors.PixelFrame
    val C_SEAT = NachtzugColors.PixelSeat // Brown leather

    // 12x16 Player (Backpack Traveler)
    val PLAYER = parseSprite(
        12, 16,
        mapOf(
            'S' to C_SKIN, 'H' to C_HAIR, 'J' to C_JEANS, 'T' to C_SHIRT, 
            'B' to NachtzugColors.PixelBackpack, // Backpack brown
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
            'B' to NachtzugColors.PixelBoyPants, 'X' to Color.Black
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
            'S' to C_SKIN, 'G' to NachtzugColors.PixelSleeplessHoodie, 'X' to Color.Black
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
