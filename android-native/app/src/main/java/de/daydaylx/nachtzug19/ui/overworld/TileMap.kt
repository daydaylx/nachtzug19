package de.daydaylx.nachtzug19.ui.overworld

/**
 * Tile Map
 * 
 * Represents a 2D grid of tile IDs for a room
 * Uses a flattened IntArray for efficient storage
 */
data class TileMap(
    val width: Int,
    val height: Int,
    val tiles: IntArray  // Flattened 2D array: tiles[y * width + x]
) {
    /**
     * Get tile ID at position
     * 
     * @param x X coordinate in tiles
     * @param y Y coordinate in tiles
     * @return Tile ID at position, or -1 if out of bounds
     */
    fun getTile(x: Int, y: Int): Int {
        if (x < 0 || x >= width || y < 0 || y >= height) {
            return -1
        }
        return tiles[y * width + x]
    }
    
    /**
     * Set tile ID at position
     * 
     * @param x X coordinate in tiles
     * @param y Y coordinate in tiles
     * @param tileId New tile ID to set
     */
    fun setTile(x: Int, y: Int, tileId: Int) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            tiles[y * width + x] = tileId
        }
    }
    
    /**
     * Check if position is valid
     * 
     * @param x X coordinate in tiles
     * @param y Y coordinate in tiles
     * @return true if position is within bounds
     */
    fun isValid(x: Int, y: Int): Boolean {
        return x >= 0 && x < width && y >= 0 && y < height
    }
    
    /**
     * Create a copy of this tile map
     */
    fun copy(): TileMap {
        return TileMap(
            width = width,
            height = height,
            tiles = tiles.copyOf()
        )
    }
    
    companion object {
        /**
         * Create tile map from 2D array
         * 
         * @param data 2D array of tile IDs
         * @return TileMap instance
         */
        fun from2DArray(data: Array<IntArray>): TileMap {
            val height = data.size
            val width = data[0].size
            val tiles = IntArray(height * width)
            
            for (y in 0 until height) {
                for (x in 0 until width) {
                    tiles[y * width + x] = data[y][x]
                }
            }
            
            return TileMap(width, height, tiles)
        }
        
        /**
         * Create empty tile map
         * 
         * @param width Width in tiles
         * @param height Height in tiles
         * @param fillTileId Tile ID to fill with (default: 0)
         * @return Empty TileMap instance
         */
        fun empty(width: Int, height: Int, fillTileId: Int = 0): TileMap {
            val tiles = IntArray(width * height) { fillTileId }
            return TileMap(width, height, tiles)
        }
    }
}
