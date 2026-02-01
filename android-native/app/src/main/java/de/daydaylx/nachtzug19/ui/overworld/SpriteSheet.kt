package de.daydaylx.nachtzug19.ui.overworld

import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.IntSize

enum class Direction {
  DOWN,
  LEFT,
  RIGHT,
  UP
}

data class SpriteSheet(
  val resId: Int,
  val frameWidth: Int,
  val frameHeight: Int,
  val framesPerDirection: Int,
  val directions: Int = 4
) {
  fun sourceRect(direction: Direction, frameIndex: Int): Pair<IntOffset, IntSize> {
    val clampedFrame = frameIndex % framesPerDirection
    val x = clampedFrame * frameWidth
    val y = direction.ordinal * frameHeight
    return Pair(IntOffset(x, y), IntSize(frameWidth, frameHeight))
  }
}