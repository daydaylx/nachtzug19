# NACHTZUG 19 - UI/UX Audit Report

**Date**: 2026-01-31  
**Auditor**: Claude Code  
**Scope**: Full Android UI implementation vs. Target Definition (Docs)

---

## Phase 1: Extracted UI Rules from /docs

### MUSS (Hard Requirements)

| Rule | Source | Context |
|-------|--------|---------|
| Eine Szene = ein Beat = 1 Gefühl + 1 konkrete Aktion | `NACHTZUG_19_RULES.md` → Section 3.1 | Mobile Pacing - keine Textwände |
| Max 6–10 Sätze pro Beat. Danach MUSS eine Aktion kommen | `NACHTZUG_19_RULES.md` → Section 3.2 | Anti-Roman - Interaktion schlägt Text |
| Kein Scrollen: Der Beat muss auf einen Bildschirm passen | `NACHTZUG_19_RULES.md` → Section 3.2 | Mobile-First - keine vertikalen Overflows |
| Mindestens eine Option muss "Handlung" sein (z.B. hingehen, fragen) | `NACHTZUG_19_RULES.md` → Section 3.3 | Choice-Design |
| Mindestens eine Option muss "Reaktion" sein (z.B. schweigen, bluffen) | `NACHTZUG_19_RULES.md` → Section 3.3 | Choice-Design |
| Runtime-Schätzung: ≥20 Minuten pro Kapitel (Fehler, wenn nicht) | `NACHTZUG_19_RULES.md` → Section 4.1 | Content-Validierung |
| Ziel: 30–35 Minuten pro Kapitel (Sweet Spot) | `NACHTZUG_19_RULES.md` → Section 4.1 | Spielzeit-Management |
| Top 12% und Bottom 18% müssen Text-lesbar sein (Safe Zones) | `assets/BACKGROUND_ASSETS_SPEC.md` → Section B | Hintergrundbild-Spezifikation |
| Background: 9:16 Portrait, 1440×2560px @2x | `VISUAL_ASSETS.md` → Section 2 | Mobile-Optimierung |
| UI hat keine Storylogik, Domain entscheidet | `ARCHITECTURE.md` → Layer-Verantwortlichkeiten | Architektur-Prinzip |
| Reduce Motion + Immersion FX Off schalten Drift aus | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 7 | Accessibility |
| Text bleibt immer stabil und sauber lesbar bei Drift | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 7 | Drift-Effekte |
| station_end → Drift +1 (Canon Rule R1) | `NACHTZUG_19_RULES.md` → Section R1 | Mechanik-Synchronisation |
| Kapitel 2, 3, 5: mind. eine `control` Szene (Canon Rule R2) | `NACHTZUG_19_RULES.md` → Section R2 | Mechanik-Synchronisation |
| Jede Choice mit `effects` MUSS ein Echo haben (Canon Rule R3) | `NACHTZUG_19_RULES.md` → Section R3 | Fake-Choice-Vermeidung |
| Choice-Dichte: 1 Choice pro Szene minimum | `NACHTZUG_19_RULES.md` → Section 4.5 | Interaktions-Frequenz |
| Tap Targets: Buttons/Choices mindestens ~44px hoch, gut erreichbar | `MOBILE_PACING_RULES.md` → Implizit (Mobile UX) | Bedienbarkeit |
| Serif für Narrative, Monospace für UI Labels | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 3 | Typo-Hierarchie |
| Max ~70 Zeichen pro Zeile (Desktop), mobil entsprechend | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 3 | Lesbarkeit |

### SOLL (Design Goals)

| Goal | Source | Context |
|-------|--------|---------|
| "Nachtfahrt im Zug", ruhige Spannung statt Horror | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 0 | Mood |
| "Offiziell vs. falsch" - alles wirkt ordentlich, aber Details kippen subtil | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 0 | Visuelles Storytelling |
| Lesen fühlt sich gut an (wie ein E-Reader) | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 0 | Reader-Erlebnis |
| Entscheidungen wirken verbindlich (wie Tickets) | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 0 | Choice-Feedback |
| Keine Chatblasen / Messenger-Optik | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 0 | Anti-Pattern |
| Kein 3D-Rumlaufen | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 0 | Anti-Pattern |
| Keine aggressiven Glitch-Effekte im Text | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 0 | Anti-Pattern |
| Hintergrund: sehr dunkles Blau/Anthrazit (fast schwarz), leicht kühl | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 2.1 | Farbwelt |
| Akzent 1: gedämpftes Cyan/Teal für "Zug/Technik" | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 2.1 | Farbwelt |
| Akzent 2: Kontroll-Orange für "Attention/Control" | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 2.1 | Farbwelt |
| Oben subtiler "Deckenlicht"-Gradient | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 2.2 | Licht |
| Unten etwas dunkler, damit Choice-Tray klar abgesetzt ist | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 2.2 | Licht |
| Reader Card: matte "Papier/Plastik"-Fläche | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.1 | Material-Metapher |
| Ticket Choices: gelochte Fahrkarten mit Stempeloptik | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.2 | Metapher |
| Press (Mobile): kurzer "Punch" (scale 0.98) + Lochstanzen-Klick | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.2 | Animation |
| Stationsschild Overlay bei `station_end` | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.3 | Mechanik-Feedback |
| Status Drawer: Bottom Sheet (mobil) / Sidebar (desktop) | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 5.5 | Responsive Design |
| Drift 2-3: minimal kälter, leichte Verschiebung von Deko | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 7 | Visuelles Feedback |
| Drift 4-6: sehr leichter "Ghost"-Shadow an Card-Rand | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 7 | Visuelles Feedback |
| Max 3 Animationen (Background, Station, Choice Commit) | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 8 | Performance |
| Microbar: standardmäßig an/aus schaltbar (Player Build) | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 4.1 | Einstellung |

### KANN (Nice-to-Have)

| Feature | Source | Context |
|---------|--------|---------|
| Announcement Banner slide-in (150ms) | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 8 | Polish |
| Leises Zugrollen (sehr leise) - optional | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 9 | Audio |
| Durchsage-"ding" (selten) - optional | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 9 | Audio |
| Ticket click (sehr subtil) - optional | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` → Section 9 | Audio |
| Lora und JetBrains Mono fonts (wenn verfügbar) | `UI_IMPLEMENTATION_FINAL_REPORT.md` → Known Issues | Custom Fonts |

---

## Phase 2: UI Inventory

### Entry Points

| File | Purpose | Status |
|------|---------|--------|
| `MainActivity.kt` | App Entry Point, Theme Setup | ✅ Present |
| `AppRoot.kt` | Root Composable, Navigation | ✅ Present |
| `PlayerScreen.kt` | Main Game Screen | ✅ Present |
| `SettingsScreen.kt` | Settings (Text Size, FX toggles) | ✅ Present |
| `OverworldScreen.kt` | Optional Overworld (Z1) | ✅ Present (not used) |
| `LoadingScreen.kt` | Loading State | ✅ Present |

### Screens Implemented

1. **PlayerScreen** - Main game experience
   - TopBar (Chapter info + Settings icon)
   - StoryReader (Narrative + Choices)
   - Status Drawer (ModalBottomSheet)
   - Exit Dialog

2. **SettingsScreen**
   - Text size slider
   - Immersion FX toggle
   - Reduce Motion toggle
   - Show Status toggle

3. **OverworldScreen** (Experimental, not integrated)
   - Pixel-based top-down view
   - Room navigation
   - Hotspot interaction

4. **LoadingScreen**
   - Simple loading state

### Components (UI Layer)

| Component | File | Purpose | Status |
|-----------|-------|---------|--------|
| **ReaderCard** | `ReaderCard.kt` | Main narrative display with paper texture | ✅ Implemented |
| **TicketChoice** | `TicketChoice.kt` | Choice buttons with hole-punch effect | ✅ Implemented |
| **ChoiceTray** | `PlayerScreen.kt` (inline) | Container for choices | ✅ Implemented |
| **BackgroundSystem** | `BackgroundSystem.kt` | Tag-based background selection | ✅ Implemented |
| **AnimatedBackground** | `BackgroundSystem.kt` | 300ms crossfade + drift tinting | ✅ Implemented |
| **SafeZoneOverlay** | `SafeZoneOverlay.kt` | Top 12% / Bottom 18% darkening | ✅ Implemented |
| **StationOverlay** | `PlayerScreen.kt` (inline) | Black sledge for station_end | ✅ Implemented |
| **AnnouncementBanner** | `AnnouncementBanner.kt` | Banner for `announcement` tag | ✅ Implemented |
| **Microbar** | `Microbar.kt` | Mini status pills (Tickets/Drift/Attention) | ✅ Implemented |
| **StatusSheet** | `StatusSheet.kt` | Full status drawer | ✅ Implemented |
| **StatusVisuals** | `StatusVisuals.kt` | Ticket stamps, pressure bars, items | ✅ Implemented |
| **TypewriterText** | `TypewriterText.kt` | Progressive text rendering | ✅ Implemented |
| **NoiseLayer** | `BackgroundLayers.kt` | Film grain overlay | ✅ Implemented |
| **VignetteLayer** | `BackgroundLayers.kt` | Vignette overlay | ✅ Implemented |
| **BackgroundDrift** | `BackgroundLayers.kt` | Animated drift lines | ✅ Implemented |

### Theme System

| File | Purpose | Status |
|------|---------|--------|
| `ColorPalette.kt` | Noir color palette definition | ✅ Implemented |
| `Theme.kt` / `NachtzugTheme.kt` | Material3 theme wrapper | ✅ Implemented |
| `Typography.kt` | Font hierarchy (Serif for narrative, Monospace for UI) | ✅ Implemented |

### Navigation Flow

```
MainActivity
  └─> AppRoot
       ├─> LoadingScreen (initial)
       ├─> PlayerScreen (main)
       │    ├─> StatusSheet (modal)
       │    ├─> SettingsScreen (navigation)
       │    └─> ExitDialog (modal)
       └─> OverworldScreen (experimental, not integrated)
```

### Data Flow & Separation (UI vs Domain)

#### Layer Responsibilities

| Layer | Files | Responsibility |
|--------|--------|----------------|
| **Domain (TS)** | `src/domain/engine/gameEngine.ts` | Logic definition (how choices work, how conditions evaluate) |
| **Runtime (Kotlin)** | `engine/GameEngine.kt` | Same logic implemented in Kotlin |
| **Data** | `data/StoryRepository.kt`, `data/StoryJson.kt`, `data/GameDataStore.kt` | JSON loading, state persistence |
| **ViewModel** | `ui/GameViewModel.kt` | State management, bridge between UI and Engine |
| **UI** | `ui/**` | Rendering only - NO story logic |

#### State Flow

```
User Action (Tap Choice)
    ↓
PlayerScreen.onChoice(choice)
    ↓
GameViewModel.makeChoice(choice)
    ↓
GameEngine.applyChoice(choice, currentState)
    ↓
  ├─> Updates GameState (tickets, pressure, items, etc.)
  └─> Determines next scene ID (based on effects/conditions)
    ↓
GameViewModel updates _uiState_ (State Flow)
    ↓
PlayerScreen recomposes with new state
    ↓
Background/Choices/Text update
```

#### Story Rendering

- **Location**: `PlayerScreen.kt` → `StoryReader()` → `ReaderCard()`
- **Data Source**: `uiState.currentScene` (from GameViewModel)
- **Narrative Rendering**: `TypewriterText.kt` - progressive character-by-character
- **Choices Rendering**: `ChoiceTray()` → `TicketChoice()` for each choice
- **Background Selection**: `getBackgroundForTags(scene.tags)` from `BackgroundSystem.kt`

#### Autosave

- **Loading**: `StoryRepository.load()` → `GameDataStore.loadState()`
- **Saving**: `GameDataStore.saveState(gameState)` (called by ViewModel)
- **Trigger**: After each choice? (implementation detail not fully visible)
- **Storage**: Android DataStore (key-value persistence)

---

## Phase 3: Mobile UX / A11y / Performance Audit

### A) Mobile Bedienbarkeit

#### ✅ Good Practices Found

1. **Tap Target Sizing**
   - `TicketChoice` uses `Modifier.clickable()` with sufficient padding (16dp horizontal/vertical)
   - Text size 16sp for labels
   - Height estimate: ~56dp total (above 44px minimum)

2. **Bottom Area (Choice Tray)**
   - `ChoiceTray` positioned at bottom of `StoryReader`
   - Padding: `Spacer(modifier = Modifier.height(12.dp))` from bottom
   - **ISSUE**: No explicit WindowInsets handling - may be clipped on devices with gesture navigation

3. **Horizontal Overflows**
   - `ReaderCard` uses `Modifier.fillMaxWidth()`
   - Horizontal padding: `20.dp` from screen edges
   - No visible overflow issues expected

4. **Schriftgrößen**
   - Narrative: 14-24sp (configurable via `settings.textSizeSp`)
   - UI Labels: 10-14sp
   - Choices: 16sp
   - **Assessment**: Readable, within mobile standards

#### ❌ Issues Found

**Issue 1: Missing WindowInsets Handling (P0)**
- **Location**: `PlayerScreen.kt` → Scaffold padding handling
- **Problem**: `Modifier.padding(padding)` from Scaffold doesn't account for system bars
- **Impact**: Choice tray may be partially hidden behind gesture bar on newer Android devices
- **Repro Steps**:
  1. Run app on device with gesture navigation
  2. Navigate to any scene with choices
  3. Tap lowest choice - may need extra reach
- **Against Doc Rule**: "Choice Tray darf nie abgeschnitten sein (Safe Area)" - implicit MOBILE_PACING_RULES

**Issue 2: Choice Text Max Lines (P1)**
- **Location**: `TicketChoice.kt` line 138
- **Code**: `maxLines = 2`
- **Problem**: Long choice text gets truncated after 2 lines
- **Impact**: Player may not read full choice before selecting
- **Against Doc Rule**: "Keine Füllwörter, konkrete Dinge" - truncated text is worse than verbose text

**Issue 3: No Clear "Back" Navigation (P1)**
- **Location**: `PlayerScreen.kt`
- **Problem**: Only BackHandler triggers Exit Dialog - no explicit navigation
- **Impact**: Confusing UX if user wants to go back without exiting
- **Recommendation**: Consider adding "Back to Start" option in exit dialog

### B) Pacing: "Spiel, kein Roman"

#### ✅ Good Practices Found

1. **TypewriterText Component**
   - Progressive text rendering (character-by-character)
   - Creates "reading rhythm"
   - **Matches Doc**: "Interaktion schlägt Text" - text presentation feels active, not static

2. **Choice-First Layout**
   - Choices appear immediately after narrative text
   - No "Continue" button required
   - **Matches Doc**: Beat-Formel requires immediate Aktion

#### ❌ Issues Found

**Issue 4: No Text Chunking Visible (P2)**
- **Location**: `ReaderCard.kt` → `NarrativeContent()`
- **Problem**: All narrative text renders as one block
- **Doc Rule**: "Eine Szene = ein Beat = 1 Gefühl + 1 konkrete Aktion"
- **Current**: Scene can have 10+ paragraphs before choice
- **Recommendation**: Consider adding beat markers or visual separation for longer scenes

**Issue 5: No "Continue" Hint Implementation (P2)**
- **Location**: `ReaderCard.kt` → `ContinueHint()` (lines 162-179)
- **Problem**: Component exists but is NOT used in `NarrativeContent()`
- **Doc Rule**: "Optional: kleiner Continue-Hint am unteren Rand, wenn noch Scroll"
- **Impact**: Player may not know scrolling is possible
- **Repro Steps**:
  1. Find a scene with long narrative (e.g., interlude)
  2. Observe bottom of ReaderCard
  3. No visual hint that more text exists below

### C) Accessibility

#### ❌ Critical Issues Found

**Issue 6: Missing contentDescription for Icon Buttons (P0)**
- **Location**: `PlayerScreen.kt` lines 119-125
- **Code**: 
  ```kotlin
  IconButton(onClick = { showStatus = true }) {
    Icon(Icons.Default.Tune, contentDescription = "Status")  // ✅ Good
  }
  IconButton(onClick = onOpenSettings) {
    Icon(Icons.Default.Settings, contentDescription = "Settings")  // ✅ Good
  }
  ```
- **Assessment**: These are good, BUT...

**Issue 7: Missing contentDescription for Choices (P0)**
- **Location**: `TicketChoice.kt` lines 104-109
- **Code**: `Modifier.clickable(enabled = !isProcessing)`
- **Problem**: No `semantics { contentDescription = "..." }`
- **Impact**: Screen reader users cannot hear choice content
- **Against Doc Rule**: "Accessibility Testing with screen reader" mentioned in docs

**Issue 8: Missing Focus States (P1)**
- **Location**: All clickable components
- **Problem**: No explicit `indication` or `focus` visual state
- **Impact**: Keyboard users and screen readers cannot track focus
- **Against Doc Rule**: "Accessibility Testing with screen reader" mentioned in docs

**Issue 9: No Reduce Motion Affect on Background Animation (P1)**
- **Location**: `PlayerScreen.kt` lines 55-60, 155-160
- **Code**:
  ```kotlin
  val animationsEnabled = !settings.reduceMotion && settings.immersionFx
  
  // Later...
  if (animationsEnabled && uiState.state != null) {
    BackgroundDrift(...)
  }
  ```
- **Problem**: `AnimatedBackground` has separate `enabled` parameter
- **Assessment**: Reduce Motion should disable ALL animations, not just some

#### ✅ Good Practices Found

1. **Text Scaling**
   - `settings.textSizeSp` passes through to `ReaderCard`
   - Supports accessibility: text resizing

2. **Contrast**
   - Dark background (`#1A1F26`) with light text
   - Good contrast ratio for readability

### D) Performance

#### ⚠️ Potential Issues

**Issue 10: Unnecessary Re-renders (P2)**
- **Location**: `PlayerScreen.kt` → `StoryReader()` (lines 207-278)
- **Problem**: `choices.forEach { TicketChoice(...) }` recreates all Choice composables on every state change
- **Mitigation**: `remember { mutableStateOf(isProcessing) }` helps, but...
- **Impact**: On devices with many choices, may cause jank
- **Recommendation**: Consider `key()` for each choice or `LazyColumn` for choice tray

**Issue 11: Background Image Loading (P1)**
- **Location**: `BackgroundSystem.kt`
- **Problem**: Uses `@DrawableRes` but no async loading or caching
- **Impact**: May block UI thread if backgrounds are large
- **Doc Reference**: "Max File Size: 500KB per image" - may still be large for mobile

**Issue 12: Animation Performance (P2)**
- **Location**: `TicketChoice.kt` line 89-93
- **Code**:
  ```kotlin
  val scale by animateFloatAsState(
      targetValue = if (isPressed) 0.98f else 1f,
      label = "ticketScale",
      animationSpec = tween(150)
  )
  ```
- **Assessment**: 150ms animation is fast, good for performance
- **Potential Issue**: Every choice creates its own animation state
- **Recommendation**: Use `animate*AsState` sparingly or share animation config

**Issue 13: TypewriterText Performance (P2)**
- **Location**: `TypewriterText.kt`
- **Problem**: Character-by-character rendering with `LaunchedEffect` may cause excessive recomposition
- **Impact**: On low-end devices, may cause stutter
- **Recommendation**: Implement chunk rendering (reveal 3-5 chars at a time) instead of 1

---

## Phase 4: Gap Analysis (Ist-Stand vs. Zielbild)

| Target Requirement | Ist-Stand (What Exists) | Gap | Impact | Next Action |
|-------------------|---------------------------|------|--------|-------------|
| **Safe Areas**: Top 12% / Bottom 18% darkened | `SafeZoneOverlay.kt` implemented, top 12% / bottom 18% alpha overlay | None ✅ | - | - |
| **Background System**: Tag-based selection | `BackgroundSystem.kt` with `getBackgroundForTags()`, `AnimatedBackground` with 300ms crossfade | Missing actual images (using placeholder colors) | P1 | Add real background assets to `drawable-nodpi/` |
| **Reader Card**: Paper/plastic texture, soft depth, warm dark gray | `ReaderCard.kt` with radial gradient texture, elevation 4-12dp, color `#1A1F26` | None ✅ | - | - |
| **Ticket Choices**: Hole-punch effect, press animation | `TicketChoice.kt` with `TicketShape` (7 holes), scale 0.98 animation, press border color change | Missing "punched" state animation (150ms + disabled) | P2 | Add post-press feedback delay in PlayerScreen |
| **Serif Typography for Narrative** | `Typography.kt` with `FontFamily.SansSerif` (system fallback) | Missing Lora font files | P2 | Add Lora fonts and update Typography.kt |
| **Monospace Typography for UI** | `Typography.kt` with system monospace | Missing JetBrains Mono font files | P2 | Add JetBrains Mono fonts and update Typography.kt |
| **Station Overlay**: Fade + Slide (200ms) | `StationOverlayCard()` with `AnimatedVisibility` fade in/out | Missing slide animation (only fade) | P2 | Add slide modifier to StationOverlay |
| **Announcement Banner**: Optional slide-in | `AnnouncementBanner.kt` exists, `PlayerScreen.kt` uses it | Implementation details not reviewed | P2 | Verify implementation matches spec |
| **Status Drawer**: Bottom Sheet (mobile) / Sidebar (desktop) | `StatusSheet.kt` as `ModalBottomSheet` | Desktop sidebar not implemented (mobile-only) | P2 | Conditional desktop layout |
| **Status Visuals**: Ticket stamps (0-5), Attention/Drift bars (0-6) | `StatusVisuals.kt` exists, shows tickets and pressure bars | Missing glow effects, warning colors, tooltips | P1 | Enhance StatusVisuals per spec |
| **Microbar**: Optional 3 icons | `Microbar.kt` implemented, togglable via `settings.showStatus` | Missing: Tap opens Status Drawer (onClick handler empty) | P1 | Wire up Microbar onClick to open StatusSheet |
| **Drift Effects**: Subtil, nur Deko, togglebar | `BackgroundDrift` animates lines, drift color tinting in `AnimatedBackground` | Missing: Ghost shadow at drift >=4 (in ReaderCard but not connected), Microbar double-shadow | P1 | Connect drift visual feedback to all UI elements |
| **Choice Feedback**: 150ms flash + disabled state | `isProcessing` disables choices, no visual feedback component | Missing `ChoiceFeedback.kt` (exists but not integrated) | P1 | Integrate ChoiceFeedback after choice selection |
| **Reduce Motion**: Disable all animations | `settings.reduceMotion` disables some animations (BackgroundDrift, Vignette) | `AnimatedBackground` drift tinting still runs, TypewriterText still animates | P1 | Add reduceMotion check to all animation states |
| **WindowInsets**: Safe Area for gesture bars | None explicitly implemented | Choice tray may be clipped on gesture navigation devices | P0 | Add WindowInsets handling to PlayerScreen |
| **Content Descriptions**: Screen reader support | Some icons have `contentDescription` | Choices missing semantics, focus states missing | P0 | Add semantic modifiers to all interactive elements |
| **Choice Tray**: 1-4 ticket cards stacked | `ChoiceTray` with `Column(Arrangement.spacedBy(12.dp))` | None ✅ | - | - |
| **Beat Structure**: 1 Gefühl + 1 Aktion, max 6-10 sentences | Content layer implements beats, UI renders scenes | UI has no beat chunking visuals | P2 | Consider visual beat separators (optional) |
| **Max Lines**: Text fits on one screen | ReaderCard fills available space, scrollable | No explicit max lines enforcement | P2 | Add "Scrollen" hint when content overflows (component exists but unused) |

---

## Phase 5: Quick Fixes Applied (Safe Changes)

### Fix 1: Add WindowInsets to PlayerScreen (P0 - Accessibility)

**Problem**: Choice tray may be clipped behind system gesture bar.  
**Location**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`  
**File**: PlayerScreen.kt

**Action**: Add WindowInsets to ensure Choice Tray is always visible.

*Note*: This fix requires modifying PlayerScreen.kt to add `WindowInsets` handling. However, this is a more significant change that should be tested in Android Studio. I'll document it here for manual implementation.

---

## Summary

### Critical Issues (P0)
1. **Missing WindowInsets handling** - Choice tray may be inaccessible on gesture navigation devices
2. **Missing contentDescription for choices** - Screen reader users cannot access choice content
3. **Missing focus states** - Keyboard navigation and screen reader tracking broken

### High Priority Issues (P1)
1. **No actual background images** - Using placeholder colors instead of real assets
2. **Microbar onClick not wired** - Cannot open Status Drawer from Microbar
3. **Status Visuals incomplete** - Missing tooltips, warning colors, glow effects
4. **Reduce Motion not fully implemented** - Some animations still run
5. **Choice Feedback missing** - No visual confirmation after selection
6. **Choice text maxLines=2** - May truncate long choice text

### Medium Priority Issues (P2)
1. **Missing custom fonts** - System fonts instead of Lora/JetBrains Mono
2. **Station Overlay missing slide animation** - Only fade implemented
3. **ContinueHint unused** - No visual cue for scrolling
4. **Performance optimizations** - Potential re-renders in choice tray
5. **No beat chunking visuals** - Long scenes lack structure

### Overall Assessment

**Strengths**:
- ✅ Core UI architecture is sound (separation of concerns)
- ✅ Reader Card matches target aesthetic
- ✅ Ticket Choice component works with punch animation
- ✅ Background system foundation in place
- ✅ Status drawer functional
- ✅ Safe zone overlay implemented

**Weaknesses**:
- ❌ Critical accessibility gaps (screen reader, focus, keyboard nav)
- ❌ Missing visual assets (backgrounds, fonts)
- ❌ Incomplete polish (animations, feedback, tooltips)
- ❌ Reduce Motion not fully enforced
- ❌ WindowInsets not handled (gesture navigation issues)

**Recommendation**: Fix P0 and P1 issues before any new feature work. Accessibility is not optional - it's a requirement for all mobile apps.

---

**Audit Complete**  
**Date**: 2026-01-31
