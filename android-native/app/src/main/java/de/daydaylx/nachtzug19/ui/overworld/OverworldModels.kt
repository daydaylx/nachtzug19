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
  val collision: Set<TilePosition>,
  val exits: List<RoomExit>,
  val hotspots: List<HotspotDefinition>,
  val ambienceTag: String
)

data class OverworldState(
  val currentRoomId: String,
  val playerTile: TilePosition,
  val targetTile: TilePosition? = null,
  val isMoving: Boolean = false,
  val lastHotspotId: String? = null
)

data class WorldPalette(
  val background: androidx.compose.ui.graphics.Color,
  val floor: androidx.compose.ui.graphics.Color,
  val wall: androidx.compose.ui.graphics.Color,
  val accent: androidx.compose.ui.graphics.Color,
  val player: androidx.compose.ui.graphics.Color,
  val npc: androidx.compose.ui.graphics.Color,
  val hotspot: androidx.compose.ui.graphics.Color
)

data class RenderContext(
  val tileSizePx: Float,
  val origin: Offset
)