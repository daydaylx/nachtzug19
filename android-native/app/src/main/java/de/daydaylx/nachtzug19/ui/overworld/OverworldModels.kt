package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.ui.geometry.Offset
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

data class TilePosition(val x: Int, val y: Int)

data class RoomExit(
  val id: String,
  val targetRoomId: String,
  val targetSpawn: TilePosition,
  val tiles: List<TilePosition>
)

data class HotspotDefinition(
  val id: String,
  val label: String,
  val tile: TilePosition,
  val interactionRadius: Int = 1
)

data class RoomDefinition(
  val id: String,
  val width: Int,
  val height: Int,
  val tileMap: TileMap,
  val collision: Set<TilePosition>,
  val exits: List<RoomExit>,
  val hotspots: List<HotspotDefinition>,
  val ambienceTag: String
)

data class OverworldState(
  val currentRoomId: String,
  val playerTile: TilePosition,
  val facing: Direction = Direction.DOWN,
  val animationFrame: Int = 0,
  val targetTile: TilePosition? = null,
  val isMoving: Boolean = false,
  val lastHotspotId: String? = null
)

/**
 * GBA-Pokémon-inspirierte Farbpalette für Pixel-Art Overworld
 * Warme, gedämpfte Farben im Stil klassischer 16-Bit RPGs
 */
data class WorldPalette(
  val background: androidx.compose.ui.graphics.Color,
  val floor: androidx.compose.ui.graphics.Color,
  val wall: androidx.compose.ui.graphics.Color,
  val accent: androidx.compose.ui.graphics.Color,
  val player: androidx.compose.ui.graphics.Color,
  val npc: androidx.compose.ui.graphics.Color,
  val hotspot: androidx.compose.ui.graphics.Color,
  // Erweiterte Palette für GBA-Stil
  val window: androidx.compose.ui.graphics.Color = NachtzugColors.OverworldWindow,
  val carpet: androidx.compose.ui.graphics.Color = NachtzugColors.OverworldCarpetAlt,
  val metal: androidx.compose.ui.graphics.Color = NachtzugColors.OverworldMetalAlt,
  val lamp: androidx.compose.ui.graphics.Color = NachtzugColors.OverworldLamp,
  val shadow: androidx.compose.ui.graphics.Color = NachtzugColors.OverworldShadowAlt
)

data class RenderContext(
  val tileSizePx: Float,
  val origin: Offset
)
