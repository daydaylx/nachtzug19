# UI Inventar NACHTZUG 19

**Version**: 1.0
**Datum**: 2026-01-31
**Plattform**: Android Native (Kotlin/Jetpack Compose)

---

## 1. Screens

| Screen | Datei | Status | Beschreibung |
|--------|-------|--------|--------------|
| AppRoot | ui/AppRoot.kt | ✅ | Navigation Controller (NavHost) |
| OverworldScreen | ui/overworld/OverworldScreen.kt | ✅ AKTIV | Pixel Overworld mit Tap-to-Move |
| PlayerScreen | ui/PlayerScreen.kt | ⚠️ INAKTIV | Reader Noir UI (nicht geroutet) |
| SettingsScreen | ui/SettingsScreen.kt | ✅ | Einstellungen |

---

## 2. Komponenten

### 2.1 Core

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| ReaderCard | components/ReaderCard.kt | Lesekarte mit Paper-Textur, Drift-Schatten |
| TicketChoice | components/TicketChoice.kt | Choice Buttons im Ticket-Stil mit Lochmuster |
| TypewriterText | components/TypewriterText.kt | Typewriter-Effekt für Narrative Text |
| StatusSheet | components/StatusSheet.kt | Status Bottom Sheet (ModalBottomSheet) |
| StatusVisuals | components/StatusVisuals.kt | TicketStamp, PressureBar, ItemIcon |
| Microbar | components/Microbar.kt | Mini-Status Bar mit 3 Icons |

### 2.2 Background

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| BackgroundLayers | components/BackgroundLayers.kt | BackgroundBase, BackgroundDrift, VignetteLayer, NoiseLayer |
| BackgroundSystem | components/BackgroundSystem.kt | Background Asset Selection (aktuell Platzhalter) |
| SafeZoneOverlay | components/SafeZoneOverlay.kt | Top 12% / Bottom 18% Darkening |

### 2.3 Overlays

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| AnnouncementBanner | components/AnnouncementBanner.kt | Durchsage-Banner mit Slide-Animation |
| LoadingScreen | components/LoadingScreen.kt | Ladebildschirm "NACHTZUG 19" |
| StationOverlay | ui/PlayerScreen.kt (privat) | Station-erreicht Overlay |

### 2.4 Overworld

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| OverworldRenderer | overworld/OverworldScreen.kt | Canvas-basiertes Tile-Rendering |
| StoryOverlay | overworld/OverworldScreen.kt | Story-Popup im Overworld |
| OverworldData | overworld/OverworldData.kt | Room-Definitionen, Palette, Hotspots |
| OverworldModels | overworld/OverworldModels.kt | TilePosition, RoomDefinition, etc. |

---

## 3. Theme

| Datei | Beschreibung |
|-------|--------------|
| theme/NachtzugTheme.kt | MaterialTheme Setup, Dark/Light ColorScheme |
| theme/ColorPalette.kt | NachtzugColors Object (Background, StationNeon, ControlOrange, etc.) |
| theme/Typography.kt | NachtzugTypography (Serif Narrative, Sans UI) |

---

## 4. ViewModel & State

| Datei | Beschreibung |
|-------|--------------|
| ui/GameViewModel.kt | StateFlow<UiState>, Engine-Binding, Hotspot-Mapping |
| ui/UiState | isLoading, errorMessage, story, state, currentScene, availableChoices, resolvedNarrative, ending, settings |

---

## 5. Datenfluss

```
┌─────────────────────────────────────────────────────────────┐
│                        story.json                           │
│                     (Assets-Ordner)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   StoryRepository                           │
│                  loadStory(): StoryContent                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     GameEngine                              │
│    setStory() → makeChoice() → getCurrentScene()           │
│            resolveSceneNarrative(), getAvailableChoices()   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   GameViewModel                             │
│               StateFlow<UiState>                            │
│   makeChoice(), openSceneForHotspot(), updateSettings()     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Compose UI                               │
│       OverworldScreen / PlayerScreen / SettingsScreen       │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Fehlende Komponenten (vs. Docs)

| Komponente | Docs-Referenz | Status |
|------------|---------------|--------|
| Background Images | VISUAL_ASSETS.md | ❌ Nur Platzhalter |
| TicketChoiceEnhanced | UI_IMPLEMENTATION_STATUS.md | ⚠️ Kompiliert nicht |
| Tooltip für Tickets | UI_CONCEPT §6.1 | ❌ Nicht implementiert |
| Warning Colors für Pressure | UI_IMPLEMENTATION_STATUS.md Phase 4 | ❌ Pending |
| Item Glow Effect | UI_IMPLEMENTATION_STATUS.md Phase 4 | ❌ Pending |
| Relationship Visualization | UI_IMPLEMENTATION_STATUS.md Phase 4 | ❌ Pending |

---

## 7. Dateistruktur

```
android-native/app/src/main/java/de/daydaylx/nachtzug19/
├── MainActivity.kt
├── data/
│   ├── GameDataStore.kt
│   ├── StoryJson.kt
│   └── StoryRepository.kt
├── engine/
│   ├── ContentValidator.kt
│   └── GameEngine.kt
├── model/
│   └── Models.kt
└── ui/
    ├── AppRoot.kt
    ├── GameViewModel.kt
    ├── PlayerScreen.kt
    ├── SettingsScreen.kt
    ├── UiState (in GameViewModel.kt)
    ├── components/
    │   ├── AnnouncementBanner.kt
    │   ├── BackgroundLayers.kt
    │   ├── BackgroundSystem.kt
    │   ├── LoadingScreen.kt
    │   ├── Microbar.kt
    │   ├── ReaderCard.kt
    │   ├── SafeZoneOverlay.kt
    │   ├── StatusSheet.kt
    │   ├── StatusVisuals.kt
    │   ├── TicketChoice.kt
    │   └── TypewriterText.kt
    ├── overworld/
    │   ├── OverworldData.kt
    │   ├── OverworldModels.kt
    │   └── OverworldScreen.kt
    └── theme/
        ├── ColorPalette.kt
        ├── NachtzugTheme.kt
        ├── Theme.kt
        └── Typography.kt
```

---

**Ende des Inventars**
