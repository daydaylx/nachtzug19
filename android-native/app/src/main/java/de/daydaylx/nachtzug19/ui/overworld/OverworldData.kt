package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.ui.graphics.Color
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

object OverworldData {
  const val ROOM_CORRIDOR_MAIN = "room_corridor_main"
  const val ROOM_COMPARTMENT = "room_compartment"
  const val ROOM_TRANSITION = "room_transition"
  const val ROOM_WAGON7 = "room_wagon7"
  const val ROOM_PLATFORM = "room_platform_station"

  /**
   * GBA-Pokémon-inspirierte Farbpalette für Nachtzug-Atmosphäre
   * Warme Holztöne für Zuginterieur, gedämpfte aber lebendige Farben
   * Orientiert an klassischen 16-Bit RPG-Ästhetiken (Pokémon Ruby/Sapphire)
   */
  val palette = WorldPalette(
    background = Color(0xFF0D1117),      // Tiefes Nachtblau (außerhalb)
    floor = Color(0xFF5C4A3D),           // Warmes Holzbraun (Zugboden)
    wall = Color(0xFF3D3229),            // Dunkles Holz (Wände/Paneele)
    accent = Color(0xFFD4A574),          // Warmes Amber (Lampen/Akzente)
    player = Color(0xFFE8D4B8),          // Helle Spielerfigur
    npc = Color(0xFF7EB88C),             // Gedämpftes Grün für NPCs
    hotspot = Color(0xFFE07856),         // Orange für Interaktionen
    window = Color(0xFF1A2A3A),          // Dunkles Fenster (Nacht draußen)
    carpet = Color(0xFF8B4A4A),          // Burgunder Teppich (Zugläufer)
    metal = Color(0xFF7B8B9C),           // Metall-Akzente (Griffe, Rahmen)
    lamp = Color(0xFFFFD93D),            // Warmes Lampenlicht
    shadow = Color(0xFF1A1510)           // Warmer Schatten
  )

  fun ambienceTint(tag: String): Color {
    return when (tag) {
      "corridor" -> NachtzugColors.DriftCold
      "compartment" -> NachtzugColors.DriftNeutral
      "transition" -> NachtzugColors.ControlOrange
      "wagon7" -> NachtzugColors.StationNeon
      "platform" -> NachtzugColors.DriftWarm
      else -> NachtzugColors.DriftNeutral
    }
  }

  private fun corridorCollision(): Set<TilePosition> {
    val blocked = mutableSetOf<TilePosition>()
    for (x in 0 until 20) {
      blocked.add(TilePosition(x, 0))
      blocked.add(TilePosition(x, 8))
    }
    for (y in 0 until 9) {
      blocked.add(TilePosition(0, y))
      blocked.add(TilePosition(19, y))
    }
    return blocked
  }

  private fun compartmentCollision(): Set<TilePosition> {
    val blocked = mutableSetOf<TilePosition>()
    for (x in 0 until 16) {
      blocked.add(TilePosition(x, 0))
      blocked.add(TilePosition(x, 8))
    }
    for (y in 0 until 9) {
      blocked.add(TilePosition(0, y))
      blocked.add(TilePosition(15, y))
    }
    blocked.add(TilePosition(7, 4))
    return blocked
  }

  private fun transitionCollision(): Set<TilePosition> {
    val blocked = mutableSetOf<TilePosition>()
    for (x in 0 until 14) {
      blocked.add(TilePosition(x, 0))
      blocked.add(TilePosition(x, 8))
    }
    for (y in 0 until 9) {
      blocked.add(TilePosition(0, y))
      blocked.add(TilePosition(13, y))
    }
    return blocked
  }

  private fun wagon7Collision(): Set<TilePosition> {
    val blocked = mutableSetOf<TilePosition>()
    for (x in 0 until 14) {
      blocked.add(TilePosition(x, 0))
      blocked.add(TilePosition(x, 8))
    }
    for (y in 0 until 9) {
      blocked.add(TilePosition(0, y))
      blocked.add(TilePosition(13, y))
    }
    blocked.add(TilePosition(6, 3))
    return blocked
  }

  private fun platformCollision(): Set<TilePosition> {
    val blocked = mutableSetOf<TilePosition>()
    for (x in 0 until 18) {
      blocked.add(TilePosition(x, 0))
      blocked.add(TilePosition(x, 8))
    }
    for (y in 0 until 9) {
      blocked.add(TilePosition(0, y))
      blocked.add(TilePosition(17, y))
    }
    return blocked
  }

  val rooms = listOf(
    RoomDefinition(
      id = ROOM_CORRIDOR_MAIN,
      width = 20,
      height = 9,
      collision = corridorCollision(),
      exits = listOf(
        RoomExit(
          id = "to_compartment",
          targetRoomId = ROOM_COMPARTMENT,
          targetSpawn = TilePosition(2, 4),
          tiles = listOf(TilePosition(2, 4))
        ),
        RoomExit(
          id = "to_transition",
          targetRoomId = ROOM_TRANSITION,
          targetSpawn = TilePosition(1, 4),
          tiles = listOf(TilePosition(18, 4))
        )
      ),
      hotspots = listOf(
        HotspotDefinition("npc_boy", "Junge", TilePosition(6, 4)),
        HotspotDefinition("npc_conductor", "Schaffner", TilePosition(12, 4)),
        HotspotDefinition("obj_window", "Fenster", TilePosition(9, 2))
      ),
      ambienceTag = "corridor"
    ),
    RoomDefinition(
      id = ROOM_COMPARTMENT,
      width = 16,
      height = 9,
      collision = compartmentCollision(),
      exits = listOf(
        RoomExit(
          id = "to_corridor",
          targetRoomId = ROOM_CORRIDOR_MAIN,
          targetSpawn = TilePosition(3, 4),
          tiles = listOf(TilePosition(14, 4))
        )
      ),
      hotspots = listOf(
        HotspotDefinition("obj_recorder", "Rekorder", TilePosition(5, 5)),
        HotspotDefinition("npc_sleepless", "Schlafloser", TilePosition(10, 4))
      ),
      ambienceTag = "compartment"
    ),
    RoomDefinition(
      id = ROOM_TRANSITION,
      width = 14,
      height = 9,
      collision = transitionCollision(),
      exits = listOf(
        RoomExit(
          id = "to_corridor",
          targetRoomId = ROOM_CORRIDOR_MAIN,
          targetSpawn = TilePosition(17, 4),
          tiles = listOf(TilePosition(1, 4))
        ),
        RoomExit(
          id = "to_wagon7",
          targetRoomId = ROOM_WAGON7,
          targetSpawn = TilePosition(2, 4),
          tiles = listOf(TilePosition(12, 4))
        )
      ),
      hotspots = listOf(
        HotspotDefinition("door_wagon7", "Tür", TilePosition(12, 4))
      ),
      ambienceTag = "transition"
    ),
    RoomDefinition(
      id = ROOM_WAGON7,
      width = 14,
      height = 9,
      collision = wagon7Collision(),
      exits = listOf(
        RoomExit(
          id = "to_transition",
          targetRoomId = ROOM_TRANSITION,
          targetSpawn = TilePosition(11, 4),
          tiles = listOf(TilePosition(1, 4))
        )
      ),
      hotspots = listOf(
        HotspotDefinition("npc_comp7", "Comp7", TilePosition(8, 4))
      ),
      ambienceTag = "wagon7"
    ),
    RoomDefinition(
      id = ROOM_PLATFORM,
      width = 18,
      height = 9,
      collision = platformCollision(),
      exits = listOf(
        RoomExit(
          id = "to_corridor",
          targetRoomId = ROOM_CORRIDOR_MAIN,
          targetSpawn = TilePosition(10, 4),
          tiles = listOf(TilePosition(16, 4))
        )
      ),
      hotspots = emptyList(),
      ambienceTag = "platform"
    )
  )
}