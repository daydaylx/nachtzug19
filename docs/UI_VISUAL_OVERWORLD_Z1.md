# UI Visual Overworld (Z1) - Technical Specification

**Version:** 1.0
**Date:** 2026-02-01
**Status:** Implementation

## 1. Goal & Aesthetic
To implement a "Zelda 1 / Pokémon Gen 1" style Overworld for "Nachtzug 19".
- **Style:** Reader Noir (Monochrome/High Contrast).
- **Resolution:** 240x160 (Internal, GBA-style) -> Scaled to viewport (Integer Scaling).
- **Technology:** HTML Canvas (2D Context).
  - **Android Compose Adaptation:** gleiche 240×160-Internal-Resolution im `GameViewport`, skaliert per Integer-Scaling (Android UI-Implementierung).

## 2. Technical Decisions

### Rendering Engine: HTML Canvas 2D
**Reasoning:**
- **Lightweight:** No heavy framework overhead (unlike PixiJS/Phaser).
- **Control:** Direct control over the render loop and pixel manipulation.
- **Pixel Art Support:** Native `image-rendering: pixelated` support in CSS.
- **Sufficiency:** The requirements (tile movement, simple sprites, Z-ordering) are well within the capabilities of the native 2D API.

### Coordinate System
- **Tile Size:** 16x16 pixels.
- **World Coordinates:** X, Y (in tiles).
- **Pixel Coordinates:** X * 16, Y * 16.

### Z-Order / Layering
1.  **Floor Layer:** Tilemap background.
2.  **Object/Entity Layer:** Sorted by Y-coordinate (Painter's Algorithm) to handle depth (sprites overlapping when "behind" each other).
3.  **Overlay/Indicator Layer:** Interaction bubbles, UI elements.

## 3. Asset Management
**Structure:**
```
src/assets/
  sprites/
    player/      (idle.png, walk.png)
    npcs/        (conductor.png, boy.png)
    indicators/  (exclaim.png, interact.png)
  tiles/
    train/       (floor.png, wall.png, door.png)
```

**Placeholder Strategy (for prototype):**
- Procedural generation of sprites using an offscreen canvas.
- "Noir" Palette:
  - **Black (#0d0d0d):** Background/Outline
  - **White (#f0f0f0):** Highlights/Text
  - **Amber (#ffb000):** Indicators/Active Elements
  - **Gray (#4a4a4a):** Floor/Passive details

## 4. Architecture (Web/World Layer)

### `WorldState`
- Manages `currentRoom`, `playerPos`, `entities`.
- Handles movement logic (collision detection).

### `WorldRenderer`
- Owns the `<canvas>` element.
- `render(dt)` loop.
- Handles scaling and centering.

### `InputHandler`
- Maps Touch/Mouse clicks to World Coordinates.
- Pathfinding (simple A* or Manhattan distance) for "Tap to Move".

## 5. Integration
The Overworld acts as a selector for the Story Engine.
- **Interaction:** Player touches an entity with `interactionId`.
- **Event:** Dispatches `PLAYER_INTERACT` event with the ID (e.g., `npc_conductor`).
- **Response:** The main app listens to this and triggers the corresponding Scene in the Story Engine.
