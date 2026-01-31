# UI Inventar NACHTZUG 19

**Version**: 2.0 (GBA-Pokémon-Stil)
**Datum**: 2026-01-31
**Plattform**: Android Native (Kotlin/Jetpack Compose)

---

## 1. Screens

| Screen | Datei | Status | Beschreibung |
|--------|-------|--------|--------------|
| AppRoot | ui/AppRoot.kt | ✅ | Navigation Controller (NavHost) |
| OverworldScreen | ui/overworld/OverworldScreen.kt | ✅ AKTIV | GBA-Pixel Overworld mit Tap-to-Move |
| SettingsScreen | ui/SettingsScreen.kt | ✅ | Einstellungen |

---

## 2. Komponenten

### 2.1 Core

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| TypewriterText | components/TypewriterText.kt | Typewriter-Effekt für Narrative Text |
| StatusSheet | components/StatusSheet.kt | Status Bottom Sheet (ModalBottomSheet) |
| StatusVisuals | components/StatusVisuals.kt | TicketStamp, PressureBar, ItemIcon |
| Microbar | components/Microbar.kt | Mini-Status Bar mit 3 Icons |
| LoadingScreen | components/LoadingScreen.kt | Ladebildschirm "NACHTZUG 19" |

### 2.2 Overworld (GBA-Stil)

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| OverworldScreen | overworld/OverworldScreen.kt | Haupt-Screen mit Canvas-Rendering |
| OverworldData | overworld/OverworldData.kt | Room-Definitionen, GBA-Farbpalette, Hotspots |
| OverworldModels | overworld/OverworldModels.kt | WorldPalette, TilePosition, RoomDefinition |

### 2.3 Rendering-Funktionen (in OverworldScreen.kt)

| Funktion | Beschreibung |
|----------|--------------|
| drawRoom() | Holzboden, Wände, Fenster, Teppich, Lampen |
| drawPlayer() | GBA-Sprite-artiger Spieler |
| drawNpcHotspot() | NPC-Sprites im GBA-Stil |
| drawObjectHotspot() | Objekt-Sprites |
| drawDoorHotspot() | Tür-Sprites |
| drawWindowHotspot() | Fenster-Hotspots |

---

## 3. Theme

| Datei | Beschreibung |
|-------|--------------|
| theme/NachtzugTheme.kt | MaterialTheme Setup |
| theme/ColorPalette.kt | NachtzugColors Object |
| theme/Typography.kt | Typografie |

---

## 4. ViewModel & State

| Datei | Beschreibung |
|-------|--------------|
| ui/GameViewModel.kt | StateFlow<UiState>, Engine-Binding, Hotspot-Mapping |
| ui/UiState | isLoading, errorMessage, story, state, currentScene, availableChoices, resolvedNarrative, ending, settings |

---

## 5. Datenfluss

```
story.json (Assets)
    ↓
StoryRepository.loadStory()
    ↓
GameEngine (State Machine)
    ↓
GameViewModel (UiState Flow)
    ↓
OverworldScreen / SettingsScreen (Compose UI)
    ↓
User Interaction → ViewModel.makeChoice() → Engine → UI Update
```

---

## 6. GBA-Farbpalette

| Element | Hex | Beschreibung |
|---------|-----|--------------|
| background | `#0D1117` | Tiefes Nachtblau |
| floor | `#5C4A3D` | Warmes Holzbraun |
| wall | `#3D3229` | Dunkles Holz |
| accent | `#D4A574` | Warmes Amber |
| player | `#E8D4B8` | Helle Spielerfigur |
| npc | `#7EB88C` | Gedämpftes Grün |
| hotspot | `#E07856` | Orange |
| window | `#1A2A3A` | Dunkles Fenster |
| carpet | `#8B4A4A` | Burgunder |
| lamp | `#FFD93D` | Lampenlicht |

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
    ├── SettingsScreen.kt
    ├── components/
    │   ├── LoadingScreen.kt
    │   ├── Microbar.kt
    │   ├── StatusSheet.kt
    │   ├── StatusVisuals.kt
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
