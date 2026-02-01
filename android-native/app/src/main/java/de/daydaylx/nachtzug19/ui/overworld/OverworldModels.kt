package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.ui.geometry.Offset

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
  val window: androidx.compose.ui.graphics.Color = androidx.compose.ui.graphics.Color(0xFF1A2A3A),
  val carpet: androidx.compose.ui.graphics.Color = androidx.compose.ui.graphics.Color(0xFF8B3A3A),
  val metal: androidx.compose.ui.graphics.Color = androidx.compose.ui.graphics.Color(0xFF6B7B8C),
  val lamp: androidx.compose.ui.graphics.Color = androidx.compose.ui.graphics.Color(0xFFFFD93D),
  val shadow: androidx.compose.ui.graphics.Color = androidx.compose.ui.graphics.Color(0xFF1A1A1A)
)

data class RenderContext(
  val tileSizePx: Float,
  val origin: Offset
)