# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**NACHTZUG 19** is an immersive psychological mystery adventure built as a **Native Android App (Kotlin)**.
The project uses a hybrid architecture:
- **TypeScript**: Defines the story content, game logic, and validation rules (`src/`).
- **Kotlin**: Renders the game on Android devices (`android-native/`).

## Development Commands

```bash
# Validate content integrity
npm test

# Export content to JSON for Android
npm run export:story

# Build Android APK (Debug)
cd android-native && ./gradlew assembleDebug
```

## Architecture: Hybrid

### 1. Content Source (`src/`)
- **Purpose**: Single source of truth for the story graph.
- **Language**: TypeScript.
- **Key Files**:
  - `src/content/nachtzug19/scenes/*.ts`: The actual story scenes.
  - `src/domain/engine/gameEngine.ts`: Logic for validating and processing content.
  - `scripts/export_story_json.ts`: Compiles TS content into a JSON file for Android.

### 2. Android Runtime (`android-native/`)
- **Purpose**: Runs the game on the device.
- **Language**: Kotlin.
- **Key Files**:
  - `app/src/main/assets/story.json`: The compiled story (do not edit manually).
  - `app/src/main/java/de/daydaylx/nachtzug19/engine/GameEngine.kt`: The runtime engine (mirrors TS logic).
  - `app/src/main/java/de/daydaylx/nachtzug19/ui/*`: Jetpack Compose UI.

## State Model (NACHTZUG 19)

Defined in `src/domain/types/index.ts` and mirrored in `Models.kt`:

```typescript
GameState {
  stats: { mut, wissen, empathie }           // Legacy (0-10)
  tickets: { truth, escape, guilt, love }    // Decision patterns (0-5)
  pressure: { conductor_attention, memory_drift }  // (0-6)
  relations: { rel_comp7, rel_boy, rel_sleepless } // (-2 to +4)
  items: { has_recorder, has_tag19, photo_anomaly } // boolean
}
```

## Content Format (Canon Rules)

All story content must follow `docs/NACHTZUG_19_RULES.md`.

### Mandatory Canon Rules
**R1: Drift After Stations** - Every chapter end increases `memory_drift`.
**R2: Controls at Chapters 2, 3, 5** - Fixed gatepoints that modify state.
**R3: Every Choice Has Callback** - No choice without visible consequence later.
**R4: Train Never Lies Directly** - Meaning shifts, not false statements.

## Workflow for Content Updates

1. **Edit TypeScript**: Modify scenes in `src/content/nachtzug19/scenes/`.
2. **Validate**: Run `npm test` to check graph integrity and logic.
3. **Export**: Run `npm run export:story` to update `story.json`.
4. **Build**: Build the Android app to see changes on device/emulator.

## Common Pitfalls to Avoid

1. **Engine Divergence**: If you change `gameEngine.ts` (TS), you MUST update `GameEngine.kt` (Kotlin) to match.
2. **Missing Export**: Changes in `src/content` are NOT visible in Android until you run `npm run export:story`.
3. **New State Variables**: Do not add state variables without updating `domain/types/index.ts` AND `Models.kt`.

## Current Status

- ✅ Content: Chapters 1-7 complete & validated.
- ✅ Android Engine: Fully implemented and patched for new features (conditional variants).
- ✅ Tests: 100% path coverage via simulation.
- ✅ CI: GitHub Actions for Android build active.
