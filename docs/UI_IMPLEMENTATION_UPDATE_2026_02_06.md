# UI Implementation Update - 2026-02-06

## Summary
Completed the transition from "Pixel/Retro" UI to "Reader Noir" style for the main player interface. Key focus was on accessibility parity and fixing layout issues on modern Android devices.

## Changes Implemented

### 1. Component Upgrade: `TicketChoice`
The `TicketChoice` component has been upgraded to replace `PixelMenu`.
- **Accessibility**: Added `semantics`, `role = Role.Button`, and `contentDescription`.
- **Focus Handling**: Implemented `MutableInteractionSource` to track and visualize focus states (border glow, elevation lift) for keyboard/controller navigation.
- **Layout**: Increased `maxLines` from 2 to 4 to prevent text truncation, with `TextOverflow.Ellipsis`.

### 2. Screen Integration: `PlayerScreen`
- **UI Transition**: Replaced `PixelMenu` with a list of `TicketChoice` components in `StoryReader`.
- **Microbar**: Wired up the `onClick` event to correctly open the Status Sheet (previously non-functional).
- **WindowInsets**: Fixed "Safe Area" handling.
    - `Scaffold` now uses `WindowInsets.systemBars`.
    - Removed redundant `systemBarsPadding()` from the inner `Box` to prevent double-padding and ensure the choice tray is not clipped by gesture bars.

## Verification
- **Visuals**: Choices now appear as "Hole Punch" tickets instead of pixelated menu items.
- **Interaction**: Press animations (scale down) and focus states work.
- **Navigation**: Status sheet can be opened from both the top HUD and the bottom Microbar.

## Next Steps
- Verify visual assets loading performance (Backgrounds).
- Consider deprecating/removing `PixelMenu` in future cleanups.
