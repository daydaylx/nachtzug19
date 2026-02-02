package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asAndroidBitmap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import android.graphics.Paint

/**
 * @deprecated GBA-Pixel-Overworld System deprecated. Use Reader Noir (PlayerScreen) instead.
 * Tile Renderer wird nicht mehr benötigt für die story-fokussierte UI.
 */
/**
 * Tile Renderer
 *
 * Renders tiles from a tileset onto the canvas
 * Supports procedural tiles as fallback for prototype
 */
@Deprecated("Overworld tile rendering is no longer used. Use PlayerScreen for story rendering.")
object TileRenderer {
    private val bitmapPaint = Paint().apply {
        isFilterBitmap = false
        isAntiAlias = false
    }
    
    /**
     * Draw a single tile at the specified position
     * 
     * @param tileId Tile ID to draw
     * @param tileset Tileset containing tile definitions
     * @param position Top-left position of the tile
     * @param tileSize Size of each tile in pixels
     */
    fun DrawScope.drawTile(
        tileId: Int,
        tileset: Tileset,
        position: Offset,
        tileSize: Float
    ) {
        val tileDef = tileset.getTile(tileId)
        if (tileDef == null) {
            return
        }
        
        drawRect(
            color = tileDef.color,
            topLeft = position,
            size = Size(tileSize, tileSize)
        )
        
        // Optional: Add subtle detail based on tile type
        // This can be expanded later for more visual variety
        when (tileDef.type) {
            TileType.WALL_TOP -> {
                // Add depth line at bottom
                drawRect(
                    color = Color.Black.copy(alpha = 0.3f),
                    topLeft = Offset(position.x, position.y + tileSize * 0.9f),
                    size = Size(tileSize, tileSize * 0.1f)
                )
            }
            TileType.WINDOW -> {
                // Add glass reflection
                drawRect(
                    color = Color.White.copy(alpha = 0.1f),
                    topLeft = Offset(position.x + tileSize * 0.3f, position.y + tileSize * 0.3f),
                    size = Size(tileSize * 0.4f, tileSize * 0.4f)
                )
            }
            TileType.DOOR -> {
                // Add door frame detail
                drawRect(
                    color = Color.Black.copy(alpha = 0.2f),
                    topLeft = Offset(position.x + tileSize * 0.2f, position.y + tileSize * 0.2f),
                    size = Size(tileSize * 0.6f, tileSize * 0.6f)
                )
            }
            else -> {
                // No additional detail for floor, seats, etc.
            }
        }
    }
    
    /**
     * Draw a complete tile map
     * 
     * @param tileMap Tile map to draw
     * @param tileset Tileset containing tile definitions
     * @param origin Origin offset for camera positioning
     * @param tileSize Size of each tile in pixels
     */
    fun DrawScope.drawTileMap(
        tileMap: TileMap,
        tileset: Tileset,
        origin: Offset,
        tileSize: Float
    ) {
        for (y in 0 until tileMap.height) {
            for (x in 0 until tileMap.width) {
                val tileId = tileMap.getTile(x, y)
                val position = Offset(
                    origin.x + x * tileSize,
                    origin.y + y * tileSize
                )
                drawTile(tileId, tileset, position, tileSize)
            }
        }
    }

    /**
     * Draw a tile map using a tileset bitmap (sprite sheet)
     */
    fun DrawScope.drawTileMapBitmap(
        tileMap: TileMap,
        tileset: Tileset,
        tilesetBitmap: ImageBitmap,
        origin: Offset,
        tileSize: Float
    ) {
        val tilePx = tileset.tileSize.toFloat()
        val columns = tileset.columns

        for (y in 0 until tileMap.height) {
            for (x in 0 until tileMap.width) {
                val tileId = tileMap.getTile(x, y)
                val tileIndex = tileset.getTileIndex(tileId)
                val srcX = (tileIndex % columns) * tilePx
                val srcY = (tileIndex / columns) * tilePx

                val destLeft = origin.x + x * tileSize
                val destTop = origin.y + y * tileSize

                drawIntoCanvas { canvas ->
                    val srcRect = android.graphics.Rect(
                        srcX.toInt(),
                        srcY.toInt(),
                        (srcX + tilePx).toInt(),
                        (srcY + tilePx).toInt()
                    )
                    val destRect = android.graphics.Rect(
                        destLeft.toInt(),
                        destTop.toInt(),
                        (destLeft + tileSize).toInt(),
                        (destTop + tileSize).toInt()
                    )
                    canvas.nativeCanvas.drawBitmap(
                        tilesetBitmap.asAndroidBitmap(),
                        srcRect,
                        destRect,
                        bitmapPaint
                    )
                }
            }
        }
    }
    
    /**
     * Draw a tile map with ambience tinting
     * 
     * @param tileMap Tile map to draw
     * @param tileset Tileset containing tile definitions
     * @param origin Origin offset for camera positioning
     * @param tileSize Size of each tile in pixels
     * @param ambienceColor Color to blend with tiles
     */
    fun DrawScope.drawTileMapWithAmbience(
        tileMap: TileMap,
        tileset: Tileset,
        origin: Offset,
        tileSize: Float,
        ambienceColor: Color
    ) {
        for (y in 0 until tileMap.height) {
            for (x in 0 until tileMap.width) {
                val tileId = tileMap.getTile(x, y)
                val position = Offset(
                    origin.x + x * tileSize,
                    origin.y + y * tileSize
                )
                
                val tileDef = tileset.getTile(tileId)
                if (tileDef == null) {
                    continue
                }
                
                // Blend ambience color with tile color
                val blendedColor = Color(
                    red = (tileDef.color.red * 0.9f + ambienceColor.red * 0.1f),
                    green = (tileDef.color.green * 0.9f + ambienceColor.green * 0.1f),
                    blue = (tileDef.color.blue * 0.9f + ambienceColor.blue * 0.1f),
                    alpha = 1f
                )
                
                drawRect(
                    color = blendedColor,
                    topLeft = position,
                    size = Size(tileSize, tileSize)
                )
                
                // Add details based on tile type
                when (tileDef.type) {
                    TileType.WALL_TOP -> {
                        drawRect(
                            color = Color.Black.copy(alpha = 0.3f),
                            topLeft = Offset(position.x, position.y + tileSize * 0.9f),
                            size = Size(tileSize, tileSize * 0.1f)
                        )
                    }
                    TileType.WINDOW -> {
                        drawRect(
                            color = Color.White.copy(alpha = 0.1f),
                            topLeft = Offset(position.x + tileSize * 0.3f, position.y + tileSize * 0.3f),
                            size = Size(tileSize * 0.4f, tileSize * 0.4f)
                        )
                    }
                    TileType.DOOR -> {
                        drawRect(
                            color = Color.Black.copy(alpha = 0.2f),
                            topLeft = Offset(position.x + tileSize * 0.2f, position.y + tileSize * 0.2f),
                            size = Size(tileSize * 0.6f, tileSize * 0.6f)
                        )
                    }
                    else -> {
                        // No additional detail for floor, seats, etc.
                    }
                }
            }
        }
    }
}
