package de.daydaylx.nachtzug19.ui.overworld

/**
 * Game Resolution Constants for Pokemon-style UI
 * 
 * Based on GBA resolution (240x160) with 16x16 tiles
 * This provides a classic handheld game feel with integer scaling
 */
object GameResolution {
    /**
     * Internal game resolution (GBA-style)
     * 240x160 pixels = 15x10 tiles at 16x16 pixels each
     */
    const val WIDTH = 240
    const val HEIGHT = 160

    /**
     * Tile size in pixels
     * Standard for Pokemon-style games
     */
    const val TILE_SIZE = 16

    /**
     * Number of tiles horizontally
     */
    const val TILES_X = WIDTH / TILE_SIZE  // 15

    /**
     * Number of tiles vertically
     */
    const val TILES_Y = HEIGHT / TILE_SIZE  // 10

    /**
     * Aspect ratio of the game viewport
     */
    const val ASPECT_RATIO = WIDTH.toFloat() / HEIGHT.toFloat()  // 1.5

    /**
     * Maximum scale factor for integer scaling
     * Prevents excessive upscaling on very large screens
     */
    const val MAX_SCALE = 4

    /**
     * Minimum scale factor for integer scaling
     * Ensures the game is visible even on small screens
     */
    const val MIN_SCALE = 1
}
