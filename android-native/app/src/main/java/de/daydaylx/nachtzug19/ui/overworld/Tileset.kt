package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.ui.graphics.Color
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

/**
 * @deprecated GBA-Pixel-Overworld System deprecated. Use Reader Noir (PlayerScreen) instead.
 * Tileset wird nicht mehr benötigt für die story-fokussierte UI.
 */
/**
 * Tile Type Enumeration
 *
 * Defines different types of tiles for the game world
 */
@Deprecated("Overworld tileset is no longer used. Use PlayerScreen for story rendering.")
enum class TileType {
    FLOOR_A,
    FLOOR_B,
    WALL_TOP,
    WALL_BOTTOM,
    WALL_LEFT,
    WALL_RIGHT,
    WALL_CORNER_TL,
    WALL_CORNER_TR,
    WALL_CORNER_BL,
    WALL_CORNER_BR,
    DOOR,
    DOOR_LOCKED,
    WINDOW,
    SEAT,
    FLOOR_SPECIAL
}

/**
 * Tile Definition
 * 
 * Represents a single tile in the tileset with its visual properties
 */
data class TileDefinition(
    val id: Int,
    val type: TileType,
    val color: Color,
    val variant: Int = 0  // For different visual variants (e.g., floor patterns)
)

/**
 * Tileset
 * 
 * Contains all tile definitions for the game world
 * Tiles are 16x16 pixels, matching Pokemon-style games
 */
data class Tileset(
    val id: String,
    val tileSize: Int = 16,
    val columns: Int,
    val tiles: List<TileDefinition>
) {
    /**
     * Get tile definition by ID
     */
    fun getTile(id: Int): TileDefinition? {
        return tiles.firstOrNull { it.id == id }
    }

    /**
     * Get tile definition by type
     */
    fun getTilesByType(type: TileType): List<TileDefinition> {
        return tiles.filter { it.type == type }
    }

    /**
     * Get tile index within the tileset list
     * Used for bitmap-based rendering.
     */
    fun getTileIndex(id: Int): Int {
        return tiles.indexOfFirst { it.id == id }.coerceAtLeast(0)
    }
}

/**
 * Default Tileset for Nachtzug 19
 * 
 * Uses the Noir palette with Pokemon-style tile types
 */
object DefaultTileset {
    val tiles = listOf(
        // Floor tiles (checkerboard pattern)
        TileDefinition(0, TileType.FLOOR_A, NachtzugColors.TileFloorA),
        TileDefinition(1, TileType.FLOOR_B, NachtzugColors.TileFloorB),
        
        // Wall tiles
        TileDefinition(2, TileType.WALL_TOP, NachtzugColors.TileWall),
        TileDefinition(3, TileType.WALL_BOTTOM, NachtzugColors.TileWall),
        TileDefinition(4, TileType.WALL_LEFT, NachtzugColors.TileWall),
        TileDefinition(5, TileType.WALL_RIGHT, NachtzugColors.TileWall),
        
        // Corner tiles
        TileDefinition(6, TileType.WALL_CORNER_TL, NachtzugColors.TileWall),
        TileDefinition(7, TileType.WALL_CORNER_TR, NachtzugColors.TileWall),
        TileDefinition(8, TileType.WALL_CORNER_BL, NachtzugColors.TileWall),
        TileDefinition(9, TileType.WALL_CORNER_BR, NachtzugColors.TileWall),
        
        // Door tiles
        TileDefinition(10, TileType.DOOR, NachtzugColors.StationNeon),  // Unlocked - Station Neon
        TileDefinition(11, TileType.DOOR_LOCKED, NachtzugColors.WarningRed),  // Locked - Warning Red
        
        // Window tile
        TileDefinition(12, TileType.WINDOW, NachtzugColors.TileWindow),
        
        // Seat tile
        TileDefinition(13, TileType.SEAT, NachtzugColors.TileSeat),
        
        // Special floor tiles
        TileDefinition(14, TileType.FLOOR_SPECIAL, NachtzugColors.TileFloorSpecial)
    )
    
    val tileset = Tileset(
        id = "default",
        tileSize = 16,
        columns = 4,
        tiles = tiles
    )
}
