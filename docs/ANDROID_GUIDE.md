# NACHTZUG 19 - Android Native Guide

**Version**: 1.0 (Konsolidiert)
**Last Updated**: 2026-01-25
**Zusammenführung von**: ANDROID_NATIVE_BUILD.md + NACHTZUG_19_READER_NOIR_UI_CONCEPT.md + ANDROID_UI_UX_PLAN.md

---

## 1. Prerequisites & Setup

### 1.1 Required Tools
- **Android Studio**: Hedgehog or newer
- **JDK**: 17
- **Node.js**: 18+

### 1.2 Initial Setup
1. Clone the repository
2. Install Node dependencies: `npm install`
3. Export story content: `npm run export:story`
4. Open `android-native/` in Android Studio
5. Let Gradle sync

---

## 2. Story Content Export & Sync

### 2.1 Export Story (TypeScript → JSON)
From the repository root:

```bash
npm run export:story
```

**What it does**:
- Compiles TypeScript content from `src/content/nachtzug19/scenes/`
- Validates the story graph (checks for broken links, missing scenes, etc.)
- Writes `export/story.json`
- Automatically copies to `android-native/app/src/main/assets/story.json`

### 2.2 Manual Sync (if automatic copy fails)
```bash
cd android-native
./gradlew :app:syncStoryAssets
```

⚠️ **Important**: The Android app reads `story.json` from assets. Changes to TypeScript content are **not visible** until you run `npm run export:story`.

---

## 3. Build Instructions

### 3.1 Run on Device/Emulator (Android Studio)
1. Open `android-native/` in Android Studio
2. Select `app` configuration
3. Choose device or emulator
4. Click Run (green play button)

### 3.2 Debug Build (Command Line)
```bash
cd android-native
./gradlew :app:assembleDebug
```

**Output**: `android-native/app/build/outputs/apk/debug/app-debug.apk`

### 3.3 Release Build (Command Line)
```bash
cd android-native
./gradlew :app:assembleRelease
```

**Signing**:
- Configure signing in `android-native/app/build.gradle.kts` or
- Use `android-native/gradle.properties` (keystore path, passwords)
- Or: Android Studio → Build → Generate Signed Bundle / APK

### 3.4 Unit Tests
```bash
cd android-native
./gradlew :app:testDebugUnitTest
```

---

## 4. UI/UX Concept: "Reader Noir"

### 4.1 Design Philosophy

**Zielgefühl**:
- **Nachtfahrt im Zug**: Ruhige Spannung statt Horror
- **Offiziell vs. falsch**: Alles sieht ordentlich aus, aber Details kippen subtil
- **Lesen fühlt sich gut an**: Wie ein E-Reader, Entscheidungen sind verbindlich (wie Tickets)

**Nicht-Ziele**:
- ❌ Keine Chatblasen / Messenger-Optik
- ❌ Kein 3D-Rumlaufen
- ❌ Keine aggressiven Glitch-Effekte im Text

### 4.2 Visual Design

#### Farbwelt
- **Hintergrund**: Sehr dunkles Blau/Anthrazit (fast schwarz), leicht kühl
- **Textflächen**: Warmes Dunkelgrau (nicht reines Weiß auf Schwarz)
- **Akzent 1 (Stations-Neon)**: Gedämpftes Cyan/Teal für "Zug/Technik"
- **Akzent 2 (Kontroll-Orange)**: Für "Attention/Control"
- **Warnrot**: Nur für echte Fehler/Endings, sehr sparsam

#### Typografie
- **Narrative Text**: Serif oder humanistische Serif (E-Reader Feeling)
  - Zeilenhöhe großzügig
  - Absätze sauber getrennt
  - Maximal ~70 Zeichen pro Zeile
- **UI Labels**: Sans (klar, neutral)
  - Scene Header / "Borddisplay" wirkt technisch
  - Choices: Sans, größer, sehr gut lesbar

#### Material-Metapher
- **Reader Card**: Matte "Papier/Plastik"-Fläche (wie Fahrkartenpapier)
- **Background**: Zugfenster + Reflexionen, unscharf, langsam bewegte Lichtstreifen
- **Tickets/Choices**: Gelochte Fahrkarten mit Stempeloptik

---

## 5. Screen Layout & Components

### 5.1 Player Screen Structure (Mobile-First)

```
┌─────────────────────────────────────┐
│ Topbar (Zugdisplay)                 │  ← Kapitel, "NACHTZUG 19", Uhrzeit
├─────────────────────────────────────┤
│                                     │
│    Reader Area (Hauptfläche)        │
│    ┌─────────────────────────┐     │
│    │ Reader Card             │     │  ← Narrative, scrollbar
│    │                         │     │
│    │ [Narrative Text...]     │     │
│    │                         │     │
│    └─────────────────────────┘     │
│                                     │
├─────────────────────────────────────┤
│ Choice Tray (Daumenbereich)         │
│ ┌─────────────────────────────┐    │
│ │ [Choice 1: Blick standhalten]│    │  ← "Ticket Cards", 1-4
│ ├─────────────────────────────┤    │
│ │ [Choice 2: In die Taschen...]│    │
│ └─────────────────────────────┘    │
├─────────────────────────────────────┤
│ Microbar (optional)                 │  ← Tickets / Drift / Attention Icons
└─────────────────────────────────────┘
```

#### A) Topbar (Zugdisplay)
- Links: Kapitel-Kürzel (z.B. `K3`)
- Mitte: `NACHTZUG 19` oder Kapitelname/Stationsname
- Rechts: Uhrzeit (kann bei Drift minimal "falsch" wirken)

#### B) Reader Area
- Zentrale Reader Card (abgerundet, soft shadow)
- Narrative Absätze, scrollbar
- Optional: kleiner "Continue"-Hint am unteren Rand bei langem Text

#### C) Choice Tray
- 1–4 "Ticket Cards" gestapelt
- Große Tap-Fläche
- Klare Labels, max 1–2 Zeilen
- Optional: 1 kurze Unterzeile (nur wenn nötig)

#### D) Microbar (optional)
- 3 Icons: Tickets / Drift / Attention
- Tap öffnet Status Drawer
- Standardmäßig kann man Microbar an/aus schalten (Player Build)

### 5.2 Desktop Adaptation
- Reader Card mittig (max width)
- Choice Tray bleibt unten, kann seitlich "pinnen" (optional)
- Status Drawer als rechte Sidebar statt Bottom Sheet

---

## 6. UI Components Detail

### 6.1 Reader Card
- Abgerundete Ecken, "soft depth"
- Sehr feine Textur (Paper/Matte Plastic), kaum sichtbar
- Rand minimal heller als Background (Separation ohne Rahmen-Kitsch)

### 6.2 Ticket Choices
- **Optik**: Schwarze/anthrazit "Fahrkarten" mit Lochmuster am Rand
- **Hover/Active** (Desktop): Leichte Aufhellung
- **Press** (Mobile): Kurzer "Punch" (scale 0.98) + Lochstanzen-Klick-Animation

### 6.3 Stationsschild Overlay (bei `station_end` Tag)
- Schwarzes Schild, weiße Schrift, minimaler Rand
- "Station: <Name>" + optional Unterzeile (Gleis/Wagen)
- Animation: Fade + Slide (200ms)
- Drift-Variante: Ein Detail minimal verschoben (nur Deko)

### 6.4 Durchsage Banner (bei `announcement` Tag)
- Schmaler Banner oben (unter Topbar)
- Text kurz, wirkt wie "Bordansage"
- Drift kann Betonung/Detail verschieben (nicht glitchy)

### 6.5 Status Drawer
- **Bottom Sheet** (mobil) / **Sidebar** (desktop)
- Enthält:
  - **Tickets**: truth/escape/guilt/love als Stempel (0–5)
  - **Attention**: Icon/Segmente (0–6)
  - **Drift**: Icon/Segmente (0–6)
  - **Items**: Recorder/Tag19 Icons
  - Optional: Beziehungen (`rel_*`), per Setting

---

## 7. Status Visualization

### 7.1 Tickets (Stempel)
- Vier Stempel: **Truth / Escape / Guilt / Love**
- Füllung 0–5 Segmente
- Tap: Tooltip mit 1 Satz ("Was bedeutet das im Spiel?")
- Stempel wirkt abgenutzt, leicht rau

### 7.2 Attention (Kontrolle)
- "Badge/Auge"-Icon + 6 Segmente
- Bei hohen Werten: Akzent wird wärmer (Kontroll-Orange)
- Keine Animation außer minimaler Farbshift

### 7.3 Drift
- "Flimmer"-Icon + 6 Segmente
- Drift wirkt über UI-Deko (Card-Rand, Background), **nicht** über Haupttext

---

## 8. Drift Effects (Subtil, Kontrolliert, Abschaltbar)

### Drift Levels

**Drift 0–1**:
- Praktisch neutral

**Drift 2–3**:
- Background minimal kälter
- Leichte Verschiebung von Deko-Elementen (1–2px)
- Station Overlay: Kleiner "falscher" Untertext (nur visuell)

**Drift 4–6**:
- Sehr leichter "Ghost"-Shadow an Card-Rand (nicht am Text)
- Background-Lichtstreifen werden "unlogisch" langsamer/schneller (sehr subtil)
- Microbar Icons bekommen minimalen Double-Shadow

**Wichtig**:
- ✅ "Reduce Motion" + "Immersion FX Off" schaltet alles aus
- ✅ Text bleibt **immer** stabil und sauber lesbar

---

## 9. Animations

### Core Animations (maximal 3)

**A) Background Drift**:
- Langsamer Loop 20–40s
- Nur Deko, kein Fokus

**B) Station Overlay**:
- 200ms rein/raus

**C) Choice Commit**:
- Button kurz disabled + minimal flash 150–250ms
- Danach neue Szene

**Optional**:
- Announcement Banner slide-in (150ms)

---

## 10. Sound (Optional, Später)

Wenn überhaupt, dann minimal:
- Leises Zugrollen (sehr leise)
- Durchsage-"ding" (selten)
- Ticket click (sehr subtil)

**Alles abschaltbar**. Nicht jetzt erzwingen.

---

## 11. Build Variants

### 11.1 Player Build (für Endnutzer)
- ❌ Kein Debug
- ✅ Status Drawer optional (kann komplett ausgeblendet werden)
- ✅ Fokus: Lesen + Entscheiden + Atmosphäre

### 11.2 Dev Build (für Entwicklung)
- ✅ Debug Drawer (Scene Jump, Validate Content, State JSON)
- ✅ Optional Effects Preview bei long-press

---

## 12. Implementation Status

### ✅ Phase 1: Foundation & Theming (COMPLETED)
- [x] **Design System**: `ColorPalette.kt` definiert Noir-Farben
- [x] **Typography**: `Theme.kt` nutzt Serif für Narrative
- [x] **Basis-Layout**: `AppRoot` und `PlayerScreen` implementiert

### ✅ Phase 2: Core Components (COMPLETED)
- [x] **Reader Card**: In `PlayerScreen.kt` als Card implementiert
- [x] **Choice Tray**: `TicketChoice.kt` mit Lochmuster-Effekt implementiert

### ✅ Phase 3: Immersion & Drift (COMPLETED)
- [x] **Visueller Drift**: `BackgroundDrift` animiert Linien basierend auf Drift-Level
- [x] **Noise**: `NoiseLayer` implementiert

### ✅ Phase 4: Engine Integration & State (COMPLETED)
- [x] **ViewModel**: `GameViewModel` verbindet UI und Engine
- [x] **Persistenz**: `GameDataStore` speichert Spielstand
- [x] **Validation**: Debug-Builds validieren Content beim Start

### ✅ Phase 5: HUD & Meta (COMPLETED)
- [x] **Status Drawer**: `StatusSheet` zeigt Tickets und Items an
- [x] **Settings**: `SettingsScreen` vorhanden

**Fazit**: Die Android-App ist **vollständig** gemäß dem "Reader Noir"-Konzept implementiert.

---

## 13. Troubleshooting

### story.json missing
**Symptom**: App startet, aber zeigt keine Szenen oder crasht beim Start

**Lösung**:
```bash
npm run export:story
```
Stelle sicher, dass `android-native/app/src/main/assets/story.json` existiert und aktuell ist.

### JSON parse error
**Symptom**: Runtime-Fehler beim Parsen von story.json

**Lösung**:
- Prüfe `export/story.json` auf Gültigkeit (valider JSON?)
- Stelle sicher, dass alle Endings definiert sind
- Laufe `npm run validate` um Content-Fehler zu finden

### Gradle/JDK mismatch
**Symptom**: Gradle sync schlägt fehl, Build-Fehler

**Lösung**:
- Verifiziere dass JDK 17 in Android Studio ausgewählt ist
- File → Project Structure → SDK Location → JDK location
- Oder: `JAVA_HOME` Umgebungsvariable auf JDK 17 setzen

### Story changes not visible
**Symptom**: TypeScript-Änderungen erscheinen nicht in der App

**Lösung**:
1. `npm run export:story` (exportiert story.json)
2. Android Studio → Build → Clean Project
3. Android Studio → Build → Rebuild Project
4. App neu starten

### Drift effects not working
**Symptom**: Drift-Level steigt, aber UI ändert sich nicht

**Lösung**:
- Prüfe Settings → "Immersion FX" ist aktiviert
- Prüfe Settings → "Reduce Motion" ist deaktiviert
- Im Dev-Build: Check Status Drawer ob `memory_drift` tatsächlich steigt

---

## 14. Development Workflow

### Typical Content Update Cycle

1. **Edit TypeScript**: Modify scenes in `src/content/nachtzug19/scenes/`
2. **Validate**: Run `npm test` to check graph integrity
3. **Export**: Run `npm run export:story` to update `story.json`
4. **Build**: Rebuild Android app in Android Studio
5. **Test**: Run on device/emulator

### Common Pitfalls
- ❌ **Engine Divergence**: If you change `gameEngine.ts` (TS), you **MUST** update `GameEngine.kt` (Kotlin) to match
- ❌ **Missing Export**: Changes in `src/content` are NOT visible until you run `npm run export:story`
- ❌ **New State Variables**: Do not add state variables without updating `domain/types/index.ts` AND `Models.kt`

---

## 15. Success Criteria (Design Check)

Das UI wirkt richtig, wenn:

- ✅ Lesen fühlt sich an wie "im Zug", nicht wie "Chat"
- ✅ Entscheidungen sind groß, klar, schnell
- ✅ Drift ist spürbar, aber nie nervig
- ✅ Die UI steht der Story nicht im Weg

---

## Referenzen

- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Content Rules**: [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md)
- **Story Concept**: [NACHTZUG_19_CONCEPT.md](./NACHTZUG_19_CONCEPT.md)
- **Visual Assets**: [VISUAL_ASSETS.md](./VISUAL_ASSETS.md)
- **Project Setup**: [README.md](../README.md)

---

**Version 1.0** | Konsolidiert: 2026-01-25

**Ersetzt**:
- ANDROID_NATIVE_BUILD.md
- NACHTZUG_19_READER_NOIR_UI_CONCEPT.md
- ANDROID_UI_UX_PLAN.md (archiviert)
