package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.model.GameState
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.ui.UiState
import de.daydaylx.nachtzug19.ui.components.LoadingScreen
import de.daydaylx.nachtzug19.ui.components.Microbar
import de.daydaylx.nachtzug19.ui.components.StatusSheet
import de.daydaylx.nachtzug19.ui.components.TypewriterText
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors
import kotlinx.coroutines.delay
import kotlin.math.abs
import kotlin.math.min
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings

/**
 * @deprecated GBA-Pixel-Overworld wurde zugunsten von Reader Noir (PlayerScreen) deprecated.
 * Diese Komponente wird in zukünftigen Versionen entfernt.
 * Verwende stattdessen PlayerScreen für Story-Darstellung.
 *
 * Grund: Reader Noir passt besser zum psychologischen Mystery-Genre von NACHTZUG 19.
 * Overworld war ein Experiment mit GBA-Pokémon-Ästhetik, wurde aber nicht weiter verfolgt.
 *
 * @see de.daydaylx.nachtzug19.ui.PlayerScreen
 */
@Deprecated(
    message = "Use PlayerScreen instead. Overworld does not match the narrative-focused genre.",
    replaceWith = ReplaceWith("PlayerScreen", "de.daydaylx.nachtzug19.ui.PlayerScreen")
)
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OverworldScreen(
  uiState: UiState,
  settingsReduceMotion: Boolean,
  onOpenSettings: () -> Unit,
  onTriggerScene: (String) -> Unit,
  onMoveSceneChoice: (de.daydaylx.nachtzug19.model.Choice) -> Unit,
  onCloseScene: () -> Unit,
  onReset: () -> Unit
) {
  var worldState by remember {
    mutableStateOf(
      OverworldState(
        currentRoomId = OverworldData.ROOM_CORRIDOR_MAIN,
        playerTile = TilePosition(3, 4)
      )
    )
  }
  var showStatus by remember { mutableStateOf(false) }
  val settings = uiState.settings

  val currentRoom = OverworldData.rooms.first { it.id == worldState.currentRoomId }
  val palette = OverworldData.palette
  val scene = if (uiState.isOverlayOpen) uiState.currentScene else null

  Box(modifier = Modifier.fillMaxSize()) {
    when {
      uiState.isLoading -> LoadingScreen()
      uiState.errorMessage != null -> CenteredMessage(uiState.errorMessage)
      uiState.ending != null -> EndingView(
        title = uiState.ending.title,
        narrative = uiState.ending.narrative,
        onReset = onReset
      )
      else -> {
        OverworldRenderer(
          room = currentRoom,
          state = worldState,
          storyState = uiState.state,
          palette = palette,
          reduceMotion = settingsReduceMotion,
          onTileTap = { tile ->
            val hotspot = findHotspotHit(currentRoom, tile)
            if (hotspot != null) {
              worldState = worldState.copy(targetTile = hotspot.tile, isMoving = true, lastHotspotId = hotspot.id)
            } else {
              worldState = worldState.copy(targetTile = tile, isMoving = true, lastHotspotId = null)
            }
          },
          onReachTarget = { reachedTile ->
            val updatedState = worldState.copy(playerTile = reachedTile)
            val target = worldState.targetTile
            if (target != null && reachedTile != target) {
              worldState = updatedState
              return@OverworldRenderer
            }

            val exit = currentRoom.exits.firstOrNull { it.tiles.contains(reachedTile) }
            if (exit != null) {
              worldState = updatedState.copy(
                currentRoomId = exit.targetRoomId,
                playerTile = exit.targetSpawn,
                targetTile = null,
                isMoving = false,
                lastHotspotId = null
              )
              return@OverworldRenderer
            }

            val hotspot = currentRoom.hotspots.firstOrNull { it.id == worldState.lastHotspotId }
            if (hotspot != null && isAdjacent(reachedTile, hotspot.tile, hotspot.interactionRadius)) {
              worldState = updatedState.copy(targetTile = null, isMoving = false)
              onTriggerScene(hotspot.id)
            } else {
              worldState = updatedState.copy(targetTile = null, isMoving = false)
            }
          }
        )

        if (scene != null) {
          StoryOverlay(
            scene = scene,
            uiState = uiState,
            onChoice = onMoveSceneChoice,
            onClose = onCloseScene
          )
        }
      }
    }

    if (!uiState.isLoading && uiState.errorMessage == null) {
      if (settings.showStatus && uiState.state != null) {
        Microbar(
          tickets = uiState.state.tickets,
          drift = uiState.state.pressure.memory_drift,
          attention = uiState.state.pressure.conductor_attention,
          onClick = { showStatus = true },
          modifier = Modifier
            .align(Alignment.TopCenter)
            .padding(top = 12.dp)
        )
      }

      IconButton(
        onClick = onOpenSettings,
        modifier = Modifier
          .align(Alignment.TopEnd)
          .padding(12.dp)
      ) {
        Icon(Icons.Default.Settings, contentDescription = "Einstellungen")
      }
    }

    if (settings.showStatus && showStatus && uiState.state != null) {
      ModalBottomSheet(onDismissRequest = { showStatus = false }) {
        StatusSheet(uiState)
      }
    }
  }

  if (!settings.showStatus && showStatus) {
    showStatus = false
  }
}

@Composable
private fun OverworldRenderer(
  room: RoomDefinition,
  state: OverworldState,
  storyState: GameState?,
  palette: WorldPalette,
  reduceMotion: Boolean,
  onTileTap: (TilePosition) -> Unit,
  onReachTarget: (TilePosition) -> Unit
) {
  BoxWithConstraints(
    modifier = Modifier
      .fillMaxSize()
      .background(palette.background)
  ) {
    val density = LocalDensity.current
    val tileSize = min(maxWidth.value / room.width, maxHeight.value / room.height)
    val tileSizePx = with(density) { tileSize.dp.toPx() }
    val origin = Offset(
      with(density) { ((maxWidth.value - room.width * tileSize) / 2f).dp.toPx() },
      with(density) { ((maxHeight.value - room.height * tileSize) / 2f).dp.toPx() }
    )

    val renderContext = RenderContext(tileSizePx = tileSizePx, origin = origin)

    Box(
      modifier = Modifier
        .fillMaxSize()
        .pointerInput(room.id) {
          detectTapGestures { tap ->
            val tile = positionToTile(tap, renderContext, room)
            if (tile != null && !room.collision.contains(tile)) {
              onTileTap(tile)
            }
          }
        }
    ) {
      Canvas(modifier = Modifier.fillMaxSize()) {
        drawRoom(room, renderContext, palette)
        drawHotspots(room, renderContext, palette, storyState)
        drawRoomFrame(room, renderContext, palette)
        val playerPos = tileToPosition(state.playerTile, renderContext)
        drawPlayer(playerPos, renderContext.tileSizePx, palette.player)
      }
    }

    if (state.isMoving && state.targetTile != null) {
      LaunchedEffect(state.playerTile, state.targetTile, state.currentRoomId) {
        delay(if (reduceMotion) 16L else 70L)
        val next = stepTowards(state.playerTile, state.targetTile, room)
        if (next == state.playerTile) {
          onReachTarget(state.playerTile)
        } else {
          onReachTarget(next)
        }
      }
    }
  }
}

private fun stepTowards(current: TilePosition, target: TilePosition, room: RoomDefinition): TilePosition {
  val dx = target.x - current.x
  val dy = target.y - current.y
  val stepX = if (dx != 0) dx / abs(dx) else 0
  val stepY = if (dy != 0) dy / abs(dy) else 0
  val next = if (abs(dx) > abs(dy)) {
    TilePosition(current.x + stepX, current.y)
  } else {
    TilePosition(current.x, current.y + stepY)
  }
  return if (room.collision.contains(next)) current else next
}

private fun isAdjacent(a: TilePosition, b: TilePosition, radius: Int): Boolean {
  return abs(a.x - b.x) <= radius && abs(a.y - b.y) <= radius
}

private fun findHotspotHit(room: RoomDefinition, tile: TilePosition): HotspotDefinition? {
  return room.hotspots.firstOrNull { isAdjacent(tile, it.tile, it.interactionRadius) }
}

private fun positionToTile(
  tap: Offset,
  context: RenderContext,
  room: RoomDefinition
): TilePosition? {
  val localX = tap.x - context.origin.x
  val localY = tap.y - context.origin.y
  if (localX < 0 || localY < 0) return null
  val tileX = (localX / context.tileSizePx).toInt()
  val tileY = (localY / context.tileSizePx).toInt()
  if (tileX < 0 || tileX >= room.width || tileY < 0 || tileY >= room.height) return null
  return TilePosition(tileX, tileY)
}

private fun tileToPosition(tile: TilePosition, context: RenderContext): Offset {
  return Offset(
    context.origin.x + tile.x * context.tileSizePx + context.tileSizePx / 2,
    context.origin.y + tile.y * context.tileSizePx + context.tileSizePx / 2
  )
}

/**
 * GBA-Pokémon-inspiriertes Room-Rendering
 * Zeichnet Holzboden mit Teppichläufer, Wände mit Paneelen, Fenster-Details
 */
private fun DrawScope.drawRoom(
  room: RoomDefinition,
  context: RenderContext,
  palette: WorldPalette
) {
  val ambience = OverworldData.ambienceTint(room.ambienceTag)

  // Holzboden-Farben mit Ambience-Tint
  val floorLight = Color(
    red = (palette.floor.red * 0.9f + ambience.red * 0.1f),
    green = (palette.floor.green * 0.9f + ambience.green * 0.1f),
    blue = (palette.floor.blue * 0.9f + ambience.blue * 0.1f),
    alpha = 1f
  )
  val floorDark = Color(
    red = (palette.floor.red * 0.75f + ambience.red * 0.1f),
    green = (palette.floor.green * 0.75f + ambience.green * 0.1f),
    blue = (palette.floor.blue * 0.75f + ambience.blue * 0.1f),
    alpha = 1f
  )

  // Wand-Farben (dunkler, mit Paneelen-Effekt)
  val wallBase = palette.wall
  val wallHighlight = Color(
    red = (palette.wall.red * 1.2f).coerceAtMost(1f),
    green = (palette.wall.green * 1.2f).coerceAtMost(1f),
    blue = (palette.wall.blue * 1.2f).coerceAtMost(1f),
    alpha = 1f
  )

  // Teppich-Mittelstreifen (typisch für Zugkorridore)
  val carpetY = room.height / 2

  for (y in 0 until room.height) {
    for (x in 0 until room.width) {
      val tile = TilePosition(x, y)
      val isWall = room.collision.contains(tile)
      val topLeft = Offset(
        context.origin.x + x * context.tileSizePx,
        context.origin.y + y * context.tileSizePx
      )
      val tileSize = androidx.compose.ui.geometry.Size(context.tileSizePx, context.tileSizePx)

      if (isWall) {
        // Wand mit Paneelen-Effekt (GBA-Stil)
        drawRect(color = wallBase, topLeft = topLeft, size = tileSize)

        // Horizontale Paneel-Linie
        if (y == 0 || y == room.height - 1) {
          drawLine(
            color = wallHighlight,
            start = Offset(topLeft.x, topLeft.y + context.tileSizePx * 0.3f),
            end = Offset(topLeft.x + context.tileSizePx, topLeft.y + context.tileSizePx * 0.3f),
            strokeWidth = context.tileSizePx * 0.08f
          )
        }

        // Fenster an oberer Wand (jedes 3. Tile)
        if (y == 0 && x % 3 == 1 && x > 0 && x < room.width - 1) {
          val windowSize = context.tileSizePx * 0.6f
          val windowOffset = (context.tileSizePx - windowSize) / 2
          drawRect(
            color = palette.window,
            topLeft = Offset(topLeft.x + windowOffset, topLeft.y + context.tileSizePx * 0.4f),
            size = androidx.compose.ui.geometry.Size(windowSize, windowSize * 0.7f)
          )
          // Fensterrahmen
          drawRect(
            color = palette.metal,
            topLeft = Offset(topLeft.x + windowOffset, topLeft.y + context.tileSizePx * 0.4f),
            size = androidx.compose.ui.geometry.Size(windowSize, windowSize * 0.7f),
            style = Stroke(width = context.tileSizePx * 0.06f)
          )
        }
      } else {
        // Holzboden mit Schachbrett-Muster
        val floorColor = if ((x + y) % 2 == 0) floorLight else floorDark
        drawRect(color = floorColor, topLeft = topLeft, size = tileSize)

        // Holzmaserung (subtile Linien)
        drawLine(
          color = palette.shadow.copy(alpha = 0.15f),
          start = Offset(topLeft.x + context.tileSizePx * 0.2f, topLeft.y),
          end = Offset(topLeft.x + context.tileSizePx * 0.2f, topLeft.y + context.tileSizePx),
          strokeWidth = context.tileSizePx * 0.02f
        )
        drawLine(
          color = palette.shadow.copy(alpha = 0.1f),
          start = Offset(topLeft.x + context.tileSizePx * 0.7f, topLeft.y),
          end = Offset(topLeft.x + context.tileSizePx * 0.7f, topLeft.y + context.tileSizePx),
          strokeWidth = context.tileSizePx * 0.02f
        )

        // Teppichläufer in der Mitte (typisch für Zugkorridore)
        if (y == carpetY || y == carpetY - 1 || y == carpetY + 1) {
          val carpetColor = if (y == carpetY) palette.carpet else palette.carpet.copy(alpha = 0.7f)
          drawRect(
            color = carpetColor,
            topLeft = Offset(topLeft.x + context.tileSizePx * 0.1f, topLeft.y + context.tileSizePx * 0.1f),
            size = androidx.compose.ui.geometry.Size(context.tileSizePx * 0.8f, context.tileSizePx * 0.8f)
          )
          // Teppich-Muster
          if (x % 2 == 0) {
            drawRect(
              color = palette.carpet.copy(alpha = 0.3f),
              topLeft = Offset(topLeft.x + context.tileSizePx * 0.3f, topLeft.y + context.tileSizePx * 0.3f),
              size = androidx.compose.ui.geometry.Size(context.tileSizePx * 0.4f, context.tileSizePx * 0.4f)
            )
          }
        }

        // Subtile Tile-Umrandung
        drawRect(
          color = Color.White.copy(alpha = 0.02f),
          topLeft = topLeft,
          size = tileSize,
          style = Stroke(width = context.tileSizePx * 0.02f)
        )
      }
    }
  }

  // Lampen an der Decke (warme Lichtpunkte)
  for (x in 2 until room.width - 2 step 4) {
    val lampPos = Offset(
      context.origin.x + x * context.tileSizePx + context.tileSizePx / 2,
      context.origin.y + context.tileSizePx * 0.3f
    )
    // Lichtschein
    drawCircle(
      color = palette.lamp.copy(alpha = 0.15f),
      radius = context.tileSizePx * 0.8f,
      center = lampPos
    )
    // Lampe selbst
    drawCircle(
      color = palette.lamp,
      radius = context.tileSizePx * 0.12f,
      center = lampPos
    )
  }
}

private fun DrawScope.drawRoomFrame(
  room: RoomDefinition,
  context: RenderContext,
  palette: WorldPalette
) {
  val widthPx = room.width * context.tileSizePx
  val heightPx = room.height * context.tileSizePx
  val topLeft = Offset(context.origin.x, context.origin.y)
  drawRect(
    color = palette.accent.copy(alpha = 0.25f),
    topLeft = topLeft,
    size = androidx.compose.ui.geometry.Size(widthPx, heightPx),
    style = Stroke(width = context.tileSizePx * 0.08f)
  )
}

private fun DrawScope.drawHotspots(
  room: RoomDefinition,
  context: RenderContext,
  palette: WorldPalette,
  storyState: GameState?
) {
  room.hotspots.forEach { hotspot ->
    if (!isHotspotVisible(hotspot.id, storyState)) return@forEach
    val pos = tileToPosition(hotspot.tile, context)
    when (hotspotKind(hotspot.id)) {
      HotspotKind.DOOR -> drawDoorHotspot(pos, context, isDoorUnlocked(storyState))
      HotspotKind.WINDOW -> drawWindowHotspot(pos, context, palette)
      HotspotKind.OBJECT -> drawObjectHotspot(pos, context, palette)
      HotspotKind.NPC -> drawNpcHotspot(pos, context, palette)
    }
  }
}

/**
 * GBA-Pokémon-inspirierter Spieler-Sprite
 * Einfache aber erkennbare Figur im 16-Bit-Stil
 */
private fun DrawScope.drawPlayer(center: Offset, tileSize: Float, color: Color) {
  val unit = tileSize * 0.06f  // Basis-Einheit für Pixel-Look

  // Schatten unter dem Spieler
  drawOval(
    color = Color.Black.copy(alpha = 0.3f),
    topLeft = Offset(center.x - unit * 3, center.y + unit * 2),
    size = androidx.compose.ui.geometry.Size(unit * 6, unit * 2)
  )

  // Körper (Oberteil - dunkler)
  val bodyColor = Color(
    red = (color.red * 0.7f),
    green = (color.green * 0.7f),
    blue = (color.blue * 0.8f),
    alpha = 1f
  )
  drawRect(
    color = bodyColor,
    topLeft = Offset(center.x - unit * 2.5f, center.y - unit * 1),
    size = androidx.compose.ui.geometry.Size(unit * 5, unit * 4)
  )

  // Kopf (heller)
  drawOval(
    color = color,
    topLeft = Offset(center.x - unit * 2, center.y - unit * 4),
    size = androidx.compose.ui.geometry.Size(unit * 4, unit * 3.5f)
  )

  // Haare (dunkel)
  drawArc(
    color = NachtzugColors.OverworldWall,
    startAngle = 180f,
    sweepAngle = 180f,
    useCenter = true,
    topLeft = Offset(center.x - unit * 2.2f, center.y - unit * 4.5f),
    size = androidx.compose.ui.geometry.Size(unit * 4.4f, unit * 2.5f)
  )

  // Augen (zwei kleine Punkte)
  drawCircle(
    color = Color.Black,
    radius = unit * 0.4f,
    center = Offset(center.x - unit * 0.8f, center.y - unit * 2.2f)
  )
  drawCircle(
    color = Color.Black,
    radius = unit * 0.4f,
    center = Offset(center.x + unit * 0.8f, center.y - unit * 2.2f)
  )

  // Highlight auf Kopf (GBA-typischer Glanz)
  drawCircle(
    color = Color.White.copy(alpha = 0.3f),
    radius = unit * 0.6f,
    center = Offset(center.x - unit * 0.5f, center.y - unit * 3.5f)
  )
}

private enum class HotspotKind {
  NPC,
  OBJECT,
  DOOR,
  WINDOW
}

private fun hotspotKind(id: String): HotspotKind {
  return when (id) {
    "door_wagon7" -> HotspotKind.DOOR
    "obj_window" -> HotspotKind.WINDOW
    "obj_recorder" -> HotspotKind.OBJECT
    else -> HotspotKind.NPC
  }
}

private fun isHotspotVisible(id: String, state: GameState?): Boolean {
  val snapshot = state ?: return true
  return when (id) {
    "obj_recorder" -> !snapshot.items.has_recorder
    "npc_sleepless" -> snapshot.relations.rel_sleepless >= 0
    else -> true
  }
}

private fun isDoorUnlocked(state: GameState?): Boolean {
  val snapshot = state ?: return true
  return snapshot.chapter_index >= 3 ||
    snapshot.relations.rel_comp7 >= 1 ||
    snapshot.tickets.tickets_truth >= 2
}

/**
 * GBA-Pokémon-inspirierter NPC-Sprite
 */
private fun DrawScope.drawNpcHotspot(
  pos: Offset,
  context: RenderContext,
  palette: WorldPalette
) {
  val unit = context.tileSizePx * 0.06f

  // Schatten
  drawOval(
    color = Color.Black.copy(alpha = 0.25f),
    topLeft = Offset(pos.x - unit * 3, pos.y + unit * 2),
    size = androidx.compose.ui.geometry.Size(unit * 6, unit * 2)
  )

  // Körper (NPC-Farbe)
  drawRect(
    color = palette.npc,
    topLeft = Offset(pos.x - unit * 2.5f, pos.y - unit * 1),
    size = androidx.compose.ui.geometry.Size(unit * 5, unit * 4)
  )

  // Kopf
  val skinColor = NachtzugColors.OverworldNpcSkin
  drawOval(
    color = skinColor,
    topLeft = Offset(pos.x - unit * 2, pos.y - unit * 4),
    size = androidx.compose.ui.geometry.Size(unit * 4, unit * 3.5f)
  )

  // Haare (variiert je nach NPC, hier dunkel)
  drawArc(
    color = NachtzugColors.OverworldNpcHair,
    startAngle = 180f,
    sweepAngle = 180f,
    useCenter = true,
    topLeft = Offset(pos.x - unit * 2.2f, pos.y - unit * 4.5f),
    size = androidx.compose.ui.geometry.Size(unit * 4.4f, unit * 2.5f)
  )

  // Augen
  drawCircle(color = Color.Black, radius = unit * 0.4f, center = Offset(pos.x - unit * 0.8f, pos.y - unit * 2.2f))
  drawCircle(color = Color.Black, radius = unit * 0.4f, center = Offset(pos.x + unit * 0.8f, pos.y - unit * 2.2f))

  // Interaktions-Indikator (pulsierender Ring)
  drawCircle(
    color = palette.hotspot.copy(alpha = 0.4f),
    radius = context.tileSizePx * 0.35f,
    center = pos,
    style = Stroke(width = context.tileSizePx * 0.04f)
  )
}

private fun DrawScope.drawObjectHotspot(
  pos: Offset,
  context: RenderContext,
  palette: WorldPalette
) {
  val size = context.tileSizePx * 0.32f
  val topLeft = Offset(pos.x - size / 2, pos.y - size / 2)
  drawRect(color = palette.hotspot.copy(alpha = 0.9f), topLeft = topLeft, size = androidx.compose.ui.geometry.Size(size, size))
  drawRect(
    color = Color.White.copy(alpha = 0.4f),
    topLeft = topLeft,
    size = androidx.compose.ui.geometry.Size(size, size),
    style = Stroke(width = context.tileSizePx * 0.05f)
  )
}

private fun DrawScope.drawWindowHotspot(
  pos: Offset,
  context: RenderContext,
  palette: WorldPalette
) {
  val width = context.tileSizePx * 0.4f
  val height = context.tileSizePx * 0.28f
  val topLeft = Offset(pos.x - width / 2, pos.y - height / 2)
  drawRect(color = NachtzugColors.StationNeon.copy(alpha = 0.25f), topLeft = topLeft, size = androidx.compose.ui.geometry.Size(width, height))
  drawRect(
    color = palette.hotspot.copy(alpha = 0.7f),
    topLeft = topLeft,
    size = androidx.compose.ui.geometry.Size(width, height),
    style = Stroke(width = context.tileSizePx * 0.04f)
  )
}

private fun DrawScope.drawDoorHotspot(
  pos: Offset,
  context: RenderContext,
  unlocked: Boolean
) {
  val width = context.tileSizePx * 0.32f
  val height = context.tileSizePx * 0.5f
  val topLeft = Offset(pos.x - width / 2, pos.y - height / 2)
  val base = if (unlocked) NachtzugColors.StationNeon else NachtzugColors.WarningRed
  drawRect(color = base.copy(alpha = 0.9f), topLeft = topLeft, size = androidx.compose.ui.geometry.Size(width, height))
  drawRect(
    color = Color.Black.copy(alpha = 0.35f),
    topLeft = topLeft,
    size = androidx.compose.ui.geometry.Size(width, height),
    style = Stroke(width = context.tileSizePx * 0.05f)
  )
}

@Composable
private fun StoryOverlay(
  scene: Scene,
  uiState: UiState,
  onChoice: (de.daydaylx.nachtzug19.model.Choice) -> Unit,
  onClose: () -> Unit
) {
  Surface(
    tonalElevation = 8.dp,
    modifier = Modifier
      .fillMaxSize()
      .padding(16.dp),
    color = MaterialTheme.colorScheme.surface.copy(alpha = 0.95f)
  ) {
    Box(
      modifier = Modifier
        .fillMaxSize()
        .padding(16.dp)
    ) {
      val title = scene.title
      val narrative = uiState.resolvedNarrative
      Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        Text(
          text = title,
          style = MaterialTheme.typography.titleMedium,
          color = MaterialTheme.colorScheme.onSurface
        )
        Box(
          modifier = Modifier
            .weight(1f)
            .padding(top = 12.dp)
        ) {
          TypewriterText(
            text = narrative,
            textSizeSp = uiState.settings.textSizeSp,
            enabled = !uiState.settings.reduceMotion
          )
        }
        Column(modifier = Modifier.fillMaxWidth()) {
          uiState.availableChoices.forEach { choice ->
            Button(
              onClick = { onChoice(choice) },
              modifier = Modifier
                .padding(vertical = 6.dp)
                .fillMaxWidth()
            ) {
              Text(
                text = choice.label ?: "Weiter",
                textAlign = TextAlign.Center
              )
            }
          }
          OutlinedButton(
            onClick = onClose,
            modifier = Modifier
              .padding(top = 6.dp)
              .fillMaxWidth()
          ) {
            Text("Zurück zur Karte")
          }
        }
      }
    }
  }
}

@Composable
private fun EndingView(title: String, narrative: String, onReset: () -> Unit) {
  Column(
    modifier = Modifier
      .fillMaxSize()
      .padding(24.dp),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Text(title, style = MaterialTheme.typography.titleLarge)
    Text(narrative, style = MaterialTheme.typography.bodyLarge, textAlign = TextAlign.Center)
    Button(onClick = onReset, modifier = Modifier.padding(top = 16.dp)) {
      Text("Neustart")
    }
  }
}

@Composable
private fun CenteredMessage(text: String) {
  Surface(
    modifier = Modifier.fillMaxSize(),
    color = MaterialTheme.colorScheme.background
  ) {
    Box(contentAlignment = Alignment.Center) {
      Text(text = text, style = MaterialTheme.typography.bodyLarge)
    }
  }
}
