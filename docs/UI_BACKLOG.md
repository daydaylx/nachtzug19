# NACHTZUG 19 - UI Backlog

**Date**: 2026-01-31  
**Scope**: Prioritisierte Liste aller UI-Probleme basierend auf Audit Report

---

## Priority Levels

- **P0**: Gamebreaker / Mobile-Unbedienbar / Regelbruch
- **P1**: Zielbild-Verstöße / Pacing-Probleme / A11y / Critical UX
- **P2**: Polish / Nice-to-have / Performance Optimizations

---

## P0 (Gamebreaker / Critical A11y)

### P0-1: WindowInsets Handling - Choice Tray Clipped
**Problem**: Choice tray may be partially hidden behind system gesture bar on devices with gesture navigation.  
**Source**: `docs/MOBILE_PACING_RULES.md` → "Choice Tray darf nie abgeschnitten sein"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`  
**Current**: `Modifier.padding(padding)` from Scaffold doesn't account for system bars.  
**Impact**: On gesture navigation devices, user must awkwardly reach for bottom choices.  

**Reproduction**:
1. Run app on device with gesture navigation (Android 10+)
2. Navigate to any scene with choices
3. Try to tap lowest choice - may be obscured

**Solution**: Add `WindowInsets` handling to ensure Choice Tray is always visible.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 1.1  
**Estimated Effort**: 2-3 hours  

---

### P0-2: Missing Content Descriptions for Choices
**Problem**: Screen reader users cannot hear choice content.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → "Accessibility Testing with screen reader"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/TicketChoice.kt` lines 104-109  

**Current**: 
```kotlin
.clickable(enabled = !isProcessing)
```

**Impact**: TalkBack users cannot access choice buttons - complete game blocker for accessibility.  

**Reproduction**:
1. Enable TalkBack on Android device
2. Start app
3. Try to interact with choices - nothing announced

**Solution**: Add `semantics { contentDescription = label }` modifier.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 1.2  
**Estimated Effort**: 1-2 hours  

---

### P0-3: Missing Focus States
**Problem**: Keyboard users and screen readers cannot track focus.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → "Accessibility Testing with screen reader"  
**Location**: All clickable components (TicketChoice, Microbar, etc.)  

**Current**: No visual feedback for focused state (border highlight, outline, etc.).

**Impact**: Keyboard navigation impossible, screen reader tracking broken.  

**Reproduction**:
1. Connect Bluetooth keyboard
2. Use Tab to navigate
3. No visual indication of focused element

**Solution**: Add `indication` and `collectIsFocusedAsState()` handlers.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 1.3  
**Estimated Effort**: 2-3 hours  

---

## P1 (Zielbild-Verstöße / UX Issues)

### P1-1: No Actual Background Images
**Problem**: Using placeholder colors instead of real background assets.  
**Source**: `docs/VISUAL_ASSETS.md` → 22 Assets defined  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundSystem.kt`  

**Current**: `BackgroundAsset` sealed class uses placeholder `Color` values instead of `@DrawableRes`.

**Impact**: UI looks incomplete, atmosphere is missing.  

**Reproduction**:
1. Start app
2. Navigate to any scene
3. Background is solid color, not image

**Solution**: Generate and add background assets to `drawable-nodpi/`. Update `BackgroundAsset` resource IDs.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 6  
**Estimated Effort**: 0.5 hours (integration only, asset generation external)  

---

### P1-2: Microbar onClick Not Wired
**Problem**: Tap on Microbar doesn't open Status Drawer.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → "Microbar: Tap offnet Status Drawer"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt` → `StoryReader()` → `Microbar()` call  

**Current**: Microbar `onClick` handler is empty or missing.

**Impact**: Confusing UX - visible microbar doesn't work as expected.  

**Reproduction**:
1. Start app with showStatus enabled
2. Tap on microbar icons
3. No reaction

**Solution**: Wire up `onClick = { showStatus = true }`.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 2  
**Estimated Effort**: 0.25 hours  

---

### P1-3: Status Visuals Incomplete
**Problem**: Missing tooltips, warning colors, glow effects.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.4, 6  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/StatusVisuals.kt`  

**Current**: Basic implementation without:
- Ticket tooltips
- Attention warning colors (Orange at 3+, Red at 5)
- Drift warning colors (Teal at 3+, Purple at 5)
- Item glow effects

**Impact**: Less informative UI, missing visual feedback for high pressure/drift.  

**Reproduction**:
1. Open Status Sheet
2. Tap on ticket stamps - no tooltip
3. Advance to high drift/attention - colors don't change
4. Acquire item - no glow effect

**Solution**: Add tooltips, warning colors, glow effects.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 3  
**Estimated Effort**: 2-3 hours  

---

### P1-4: Reduce Motion Not Fully Implemented
**Problem**: Some animations still run when Reduce Motion is enabled.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 7  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt` lines 55-60, 145-150  

**Current**: 
```kotlin
val animationsEnabled = !settings.reduceMotion && settings.immersionFx

// Later...
if (animationsEnabled && uiState.state != null) {
  BackgroundDrift(...)
}

// But AnimatedBackground has its own `enabled` parameter that may not check reduceMotion
```

**Impact**: Users with motion sensitivity still see some animations.  

**Reproduction**:
1. Enable "Reduce Motion" in settings
2. Navigate through scenes
3. Observe animations still running

**Solution**: Add reduceMotion check to all animation states.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 4  
**Estimated Effort**: 1-2 hours  

---

### P1-5: Choice Feedback Missing
**Problem**: No visual confirmation after choice selection.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.2 "Choice Commit: Button kurz disabled + minimal flash 150-250ms"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/ChoiceFeedback.kt` (exists but not integrated)  

**Current**: `ChoiceFeedback` component exists but is never used in `PlayerScreen`.

**Impact**: User doesn't see confirmation that choice was registered.  

**Reproduction**:
1. Tap on any choice
2. Immediate scene transition with no feedback

**Solution**: Integrate `ChoiceFeedback` after choice selection.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 5  
**Estimated Effort**: 1-2 hours  

---

### P1-6: Choice Text Max Lines = 2
**Problem**: Long choice text gets truncated after 2 lines.  
**Source**: `docs/MOBILE_PACING_RULES.md` → "Keine Füllwörter, konkrete Dinge"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/TicketChoice.kt` line 138  

**Current**: `maxLines = 2` in Text component.

**Impact**: Player may not read full choice before selecting.  

**Reproduction**:
1. Find scene with long choice text
2. Observe text is truncated with "..."

**Solution**: Increase maxLines to 3 or remove limit entirely.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 7  
**Estimated Effort**: 0.25 hours  

---

## P2 (Polish / Nice-to-Have)

### P2-1: Missing Custom Fonts
**Problem**: Using system fonts instead of Lora/JetBrains Mono.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 3  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/theme/Typography.kt`  

**Current**: Uses `FontFamily.SansSerif` and `FontFamily.Monospace` (system defaults).

**Impact**: Typography doesn't match target aesthetic.  

**Reproduction**:
1. Start app
2. Compare to design mockups - fonts look different

**Solution**: Add Lora and JetBrains Mono font files, update Typography.kt.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 8  
**Estimated Effort**: 0.5 hours (integration only, font loading external)  

---

### P2-2: Station Overlay Missing Slide Animation
**Problem**: Only fade in/out, missing slide component.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.3 "Animation: Fade + Slide (200ms)"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt` → `StationOverlay()`  

**Current**: `AnimatedVisibility` with only `fadeIn()` and `fadeOut()`.

**Impact**: Station overlay doesn't match spec exactly (slide required).  

**Reproduction**:
1. Navigate to station_end scene
2. Observe overlay animation - only fades, doesn't slide

**Solution**: Add `slideInVertically()` and `slideOutVertically()`.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 9  
**Estimated Effort**: 0.5 hours  

---

### P2-3: ContinueHint Unused
**Problem**: ContinueHint component exists but is never shown.  
**Source**: `docs/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 4.1 "Optional: kleiner Continue-Hint am unteren Rand, wenn noch Scroll"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/ReaderCard.kt` → `NarrativeContent()`  

**Current**: `ContinueHint()` component exists but is not called in `NarrativeContent()`.

**Impact**: Player may not know scrolling is possible.  

**Reproduction**:
1. Find scene with long narrative
2. Scroll to bottom
3. No hint that more text exists

**Solution**: Integrate ContinueHint with scroll state tracking.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 10  
**Estimated Effort**: 1 hour  

---

### P2-4: Performance: Choice Re-renders
**Problem**: All choice composables recreated on every state change.  
**Source**: Performance best practice (Compose)  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt` → `ChoiceTray()`  

**Current**: `choices.forEach { TicketChoice(...) }` without keys.

**Impact**: May cause jank on low-end devices.  

**Reproduction**:
1. Use Android Profiler
2. Navigate through scenes
3. Observe Choice Tray recomposing unnecessarily

**Solution**: Add `key(choice.id)` to stabilize composition.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 11.1  
**Estimated Effort**: 0.5 hours  

---

### P2-5: Performance: TypewriterText
**Problem**: Character-by-character may cause excessive recomposition.  
**Source**: Performance best practice (Compose)  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/TypewriterText.kt`  

**Current**: Reveals one character at a time with `LaunchedEffect`.

**Impact**: May stutter on low-end devices.  

**Reproduction**:
1. Use Android Profiler
2. Navigate to scene
3. Observe frame drops during typewriter effect

**Solution**: Implement chunk rendering (3-5 chars at a time).  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 11.2  
**Estimated Effort**: 1-2 hours  

---

### P2-6: No Beat Chunking Visuals
**Problem**: Long scenes lack visual beat structure.  
**Source**: `docs/NACHTZUG_19_RULES.md` → "Eine Szene = ein Beat = 1 Gefühl + 1 konkrete Aktion"  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/ReaderCard.kt`  

**Current**: All narrative renders as one continuous block.

**Impact**: Long scenes feel overwhelming, not structured as beats.  

**Reproduction**:
1. Navigate to interlude or long scene
2. Observe text - no visual breaks

**Solution**: Optional: Add visual beat separators or chunk text by scenes.  
**Action**: See `UI_TARGET_ALIGNMENT_PLAN.md` Step 12 (Optional)  
**Estimated Effort**: 4+ hours (with content work)  

---

## Summary Statistics

**Total Issues**: 12 (3 P0, 6 P1, 3 P2)  

**Total Estimated Effort**:
- P0: 5-8 hours
- P1: 7-11.5 hours
- P2: 7-9 hours
- **Grand Total**: 19-28.5 hours

**MVP (P0 + P1)**: 12-19.5 hours  
**Full Polish (All)**: 19-28.5 hours  

---

**Backlog Version**: 1.0  
**Last Updated**: 2026-01-31
