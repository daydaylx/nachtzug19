package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.toIntRect
import kotlin.math.min
import kotlin.math.roundToInt

/**
 * Game Viewport with integer scaling for Pokemon-style UI
 * 
 * Renders the game at a fixed internal resolution (240x160) and scales it
 * using integer scaling to maintain crisp pixels. Letterboxing is applied
 * when the screen aspect ratio doesn't match the game aspect ratio.
 */
@Composable
fun GameViewport(
    modifier: Modifier = Modifier,
    backgroundColor: Color = Color.Black,
    content: @Composable GameViewportScope.() -> Unit
) {
    val density = LocalDensity.current
    
    // Track viewport dimensions and scale
    var viewportSize by remember { mutableStateOf(IntSize.Zero) }
    var scale by remember { mutableStateOf(1) }
    var letterboxSize by remember { mutableStateOf(IntSize.Zero) }
    
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(backgroundColor)
            .onGloballyPositioned { coordinates ->
                val screenWidth = coordinates.size.width
                val screenHeight = coordinates.size.height
                
                // Calculate integer scale factor
                // Scale = min(screenWidth/240, screenHeight/160) rounded down
                val scaleX = screenWidth / GameResolution.WIDTH
                val scaleY = screenHeight / GameResolution.HEIGHT
                val rawScale = min(scaleX, scaleY)
                
                // Clamp scale to reasonable bounds
                scale = rawScale.coerceIn(
                    GameResolution.MIN_SCALE,
                    GameResolution.MAX_SCALE
                ).roundToInt()
                
                // Calculate viewport size after scaling
                viewportSize = IntSize(
                    width = GameResolution.WIDTH * scale,
                    height = GameResolution.HEIGHT * scale
                )
                
                // Calculate letterbox size (black bars)
                letterboxSize = IntSize(
                    width = (screenWidth - viewportSize.width) / 2,
                    height = (screenHeight - viewportSize.height) / 2
                )
            }
    ) {
        // Center the game viewport with letterboxing
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(
                    start = letterboxSize.width.dp,
                    end = letterboxSize.width.dp,
                    top = letterboxSize.height.dp,
                    bottom = letterboxSize.height.dp
                ),
            contentAlignment = Alignment.Center
        ) {
            content(GameViewportScope(viewportSize, scale))
        }
    }
}

/**
 * Scope for game viewport content
 * Provides access to viewport dimensions and scale factor
 */
class GameViewportScope(
    val viewportSize: IntSize,
    val scale: Int
)

/**
 * Convert screen coordinates to game coordinates
 * 
 * @param screenOffset Touch position in screen coordinates
 * @param viewportSize Size of the scaled viewport
 * @param scale Current scale factor
 * @return Tile position in game coordinates
 */
fun screenToTile(
    screenOffset: Offset,
    viewportSize: IntSize,
    scale: Int
): Pair<Int, Int>? {
    // Calculate offset within the viewport
    val viewportOffsetX = screenOffset.x - (viewportSize.width / 2f)
    val viewportOffsetY = screenOffset.y - (viewportSize.height / 2f)
    
    // Convert to game coordinates
    val gameX = (viewportOffsetX / scale).toInt()
    val gameY = (viewportOffsetY / scale).toInt()
    
    // Convert to tile coordinates
    val tileX = gameX / GameResolution.TILE_SIZE
    val tileY = gameY / GameResolution.TILE_SIZE
    
    // Check bounds
    if (tileX < 0 || tileX >= GameResolution.TILES_X ||
        tileY < 0 || tileY >= GameResolution.TILES_Y) {
        return null
    }
    
    return Pair(tileX, tileY)
}

/**
 * Convert game coordinates to screen coordinates
 * 
 * @param tileX Tile X position
 * @param tileY Tile Y position
 * @param viewportSize Size of the scaled viewport
 * @param scale Current scale factor
 * @return Screen position centered in viewport
 */
fun tileToScreen(
    tileX: Int,
    tileY: Int,
    viewportSize: IntSize,
    scale: Int
): Offset {
    // Convert to pixel coordinates in game space
    val gameX = tileX * GameResolution.TILE_SIZE + GameResolution.TILE_SIZE / 2f
    val gameY = tileY * GameResolution.TILE_SIZE + GameResolution.TILE_SIZE / 2f
    
    // Scale to screen coordinates
    val screenX = gameX * scale
    val screenY = gameY * scale
    
    // Center in viewport
    return Offset(
        x = screenX + viewportSize.width / 2f,
        y = screenY + viewportSize.height / 2f
    )
}
