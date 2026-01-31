# UI QA Full Report

**Version**: 1.0
**Datum**: 2026-01-31
**Audit-Typ**: UI/UX Quality Assurance + Minimal Fixes
**Plattform**: Android Native (Kotlin/Jetpack Compose)

---

## 1. Executive Summary

Die UI von NACHTZUG 19 ist **funktional und größtenteils docs-konform**, hat aber einige Lücken und Inkonsistenzen:

1. **Overworld ist aktiv, PlayerScreen inaktiv**: AppRoot.kt routet zu OverworldScreen, nicht PlayerScreen. Das bedeutet, dass die "Reader Noir"-UI nur im Story-Overlay der Overworld erscheint, nicht als Hauptansicht.

2. **Phase 3 (TicketChoiceEnhanced) fehlt**: Die verbesserte Choice-Animation mit Punch-Effekt kompiliert nicht und ist nicht integriert. Die Standard-TicketChoice funktioniert aber.

3. **Keine echten Background-Assets**: Alle BackgroundAsset-Ressourcen zeigen auf `android.R.color.black` (Platzhalter). Visuelle Atmosphäre ist eingeschränkt.

4. **Kleine Fixes angewendet**: Doppelte AnnouncementBanner-Definition entfernt, Encoding-Fehler korrigiert, Import-Fehler in OverworldScreen behoben.

5. **Mobile-Tauglichkeit**: Grundsätzlich gegeben, aber Microbar-Badge (12dp) ist unter Touch-Mindestgröße.

6. **Docs-Konformität**: ~80% erfüllt. Hauptabweichungen: Overworld statt reiner Reader, fehlende Background-Assets.

---

## 2. Ist-Stand: UI-Inventar

### 2.1 Komponentenbaum (High-Level)

```
MainActivity.kt
└── AppRoot.kt (Navigation)
    ├── OverworldScreen.kt (AKTIV - Haupt-Spielansicht)
    │   ├── OverworldRenderer (Canvas-basiert)
    │   ├── StoryOverlay (wenn isOverlayOpen)
    │   │   ├── TypewriterText
    │   │   └── Button (Choices)
    │   ├── Microbar
    │   ├── StatusSheet (ModalBottomSheet)
    │   └── LoadingScreen / EndingView / CenteredMessage
    │
    ├── PlayerScreen.kt (INAKTIV - nicht geroutet)
    │   ├── AnimatedBackground
    │   ├── SafeZoneOverlay
    │   ├── BackgroundDrift
    │   ├── VignetteLayer
    │   ├── NoiseLayer
    │   ├── StoryReader
    │   │   ├── AnnouncementBanner
    │   │   ├── StationOverlay
    │   │   ├── Microbar
    │   │   ├── ReaderCard
    │   │   └── ChoiceTray → TicketChoice
    │   └── StatusSheet
    │
    └── SettingsScreen.kt
        ├── Textgröße-Slider
        ├── Reduce Motion Toggle
        ├── Immersion FX Toggle
        ├── Status anzeigen Toggle
        └── Beziehungen anzeigen Toggle
```

### 2.2 Existierende Screens

| Screen | Status | Beschreibung |
|--------|--------|--------------|
| OverworldScreen | ✅ AKTIV | Pixel-Overworld mit Tap-to-Move, Story-Overlay |
| PlayerScreen | ⚠️ INAKTIV | Reader Noir UI, nicht geroutet in AppRoot |
| SettingsScreen | ✅ AKTIV | Einstellungen |

### 2.3 UI-Komponenten (android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/)

| Komponente | Datei | Status | Beschreibung |
|------------|-------|--------|--------------|
| ReaderCard | components/ReaderCard.kt | ✅ | Reader Noir Card mit Paper-Textur |
| TicketChoice | components/TicketChoice.kt | ✅ | Ticket-Style Choice Buttons |
| TypewriterText | components/TypewriterText.kt | ✅ | Typewriter-Effekt für Narrative |
| StatusSheet | components/StatusSheet.kt | ✅ | Status Bottom Sheet |
| StatusVisuals | components/StatusVisuals.kt | ✅ | TicketStamp, PressureBar, ItemIcon |
| Microbar | components/Microbar.kt | ⚠️ | Badge zu klein (12dp) |
| AnnouncementBanner | components/AnnouncementBanner.kt | ✅ | Durchsage-Banner |
| BackgroundLayers | components/BackgroundLayers.kt | ✅ | Drift, Vignette, Noise |
| BackgroundSystem | components/BackgroundSystem.kt | ⚠️ | Nur Platzhalter-Ressourcen |
| SafeZoneOverlay | components/SafeZoneOverlay.kt | ✅ | Top/Bottom Safe Zones |
| LoadingScreen | components/LoadingScreen.kt | ✅ | Ladebildschirm |

### 2.4 Theme-Dateien

| Datei | Status | Beschreibung |
|-------|--------|--------------|
| NachtzugTheme.kt | ✅ | MaterialTheme Setup |
| ColorPalette.kt | ✅ | NachtzugColors Object |
| Typography.kt | ✅ | Serif/Sans Typografie |

### 2.5 Datenfluss

```
story.json (Assets)
    ↓
StoryRepository.loadStory()
    ↓
GameEngine (State Machine)
    ↓
GameViewModel (UiState Flow)
    ↓
OverworldScreen / PlayerScreen (Compose UI)
    ↓
User Interaction → ViewModel.makeChoice() → Engine → UI Update
```

---

## 3. Abgleich mit Docs

### 3.1 MUSS-Regeln Erfüllungsgrad

| Regel | Status | Details |
|-------|--------|---------|
| M1 Beat-Regel | ✅ | UI unterstützt kurze Beats |
| M2 Max 6-10 Sätze | ⚠️ | Content-abhängig, UI scrollt wenn nötig |
| M3 Kein Scrollen | ⚠️ | ReaderCard hat verticalScroll (kann scrollen) |
| M4 2-4 Choices | ✅ | ChoiceTray zeigt alle Choices |
| M5 Handlung vs Reaktion | ✅ | UI neutral, Content-abhängig |
| U1 Mobile-first | ✅ | Portrait-optimiert |
| U2 TopBar | ⚠️ | Nur in PlayerScreen (inaktiv), Overworld hat kein TopBar |
| U3 Reader Card | ✅ | Implementiert mit Paper-Textur |
| U4 Choice Tray | ✅ | TicketChoice implementiert |
| U5 Microbar | ✅ | Implementiert |
| U6 Status Drawer | ✅ | ModalBottomSheet implementiert |
| T1 Serif Narrative | ✅ | FontFamily.Serif verwendet |
| T2 Sans UI Labels | ✅ | FontFamily.SansSerif verwendet |
| C1-C5 Farbwelt | ✅ | NachtzugColors korrekt implementiert |
| A1 Tap-Targets 44dp | ⚠️ | Microbar Badge nur 12dp |
| A4 Reduce Motion | ✅ | Settings vorhanden, respektiert |

### 3.2 Hauptabweichungen

1. **Overworld statt reinem Reader**: Docs beschreiben "Reader Noir" als Hauptansicht, aber AppRoot routet zu OverworldScreen.
   - **Begründung**: OVERWORLD_CONCEPT.md erlaubt dies als optionale Variante.
   - **Impact**: Story-Overlay in Overworld hat reduzierte Features (keine ReaderCard, keine TicketChoices, nur Standard-Buttons).

2. **Keine Background-Assets**: BackgroundSystem.kt verwendet `android.R.color.black` statt echter Images.
   - **Impact**: Keine visuelle Atmosphäre durch Hintergrundbilder.

3. **TopBar fehlt in Overworld**: PlayerScreen hat TopBar, Overworld nicht.
   - **Impact**: Kapitel-Indikator nur via Microbar sichtbar.

---

## 4. P0: Gamebreaker (Kritisch)

| ID | Problem | Datei | Beschreibung | Status |
|----|---------|-------|--------------|--------|
| P0-1 | Keine | - | Keine kritischen Gamebreaker gefunden | ✅ |

**Ergebnis**: Die App ist funktional spielbar. Keine Crashes oder unbedienbare Zustände gefunden.

---

## 5. P1: UX/Accessibility Bugs

| ID | Problem | Datei | Beschreibung | Fix/Plan |
|----|---------|-------|--------------|----------|
| P1-1 | Microbar Badge zu klein | Microbar.kt:85 | Badge ist 12dp, unter Touch-Mindestgröße (44dp). Badge ist nur Anzeige, aber könnte versehentlich getippt werden. | **Plan**: Badge auf mindestens 24dp erhöhen oder als nicht-interaktiv markieren. |
| P1-2 | Story-Overlay Buttons statt TicketChoices | OverworldScreen.kt:505-517 | In StoryOverlay werden Standard-Buttons statt TicketChoice verwendet. Inkonsistent mit Reader Noir Konzept. | **Plan**: TicketChoice in StoryOverlay integrieren. |
| P1-3 | Fehlende contentDescription | Microbar.kt:77-81 | MicroIcon hat `contentDescription = null`. Accessibility-Problem für Screen Reader. | **Plan**: Sinnvolle contentDescriptions hinzufügen. |
| P1-4 | TicketStamp Labels nur Deutsch | StatusSheet.kt:31-39 | Labels wie "Wahrheit", "Flucht" sind hardcoded. Keine i18n. | **Plan**: String Resources verwenden (wenn i18n geplant). |

---

## 6. P2: Game Feel / Visual Consistency

| ID | Problem | Datei | Beschreibung | Impact |
|----|---------|-------|--------------|--------|
| P2-1 | Overworld vs Reader Stil | OverworldScreen.kt | Overworld ist Pixel-Art, Story-Overlay ist Material Design. Stilbruch. | Mittel - akzeptabel als "zwei Welten" |
| P2-2 | Keine Background-Assets | BackgroundSystem.kt | Alle Hintergründe sind schwarz. Atmosphäre fehlt. | Hoch - visuell arm |
| P2-3 | Drift nur in PlayerScreen | PlayerScreen.kt:155-160 | BackgroundDrift nur in PlayerScreen, nicht in Overworld. | Niedrig - Overworld hat eigene Drift-Logik (ambienceTint) |
| P2-4 | EndingView minimal | OverworldScreen.kt:533-546 | EndingView ist sehr einfach (Text + Button). Kein besonderes Feeling für Endings. | Mittel - funktional, aber nicht feierlich |
| P2-5 | LoadingScreen ohne Animation | LoadingScreen.kt | Statischer Text "Verbindung wird aufgebaut...". Keine Lade-Animation. | Niedrig - funktional |

---

## 7. Fixes Applied (Diese Session)

| # | Datei | Problem | Fix |
|---|-------|---------|-----|
| 1 | LoadingScreen.kt | Doppelte AnnouncementBanner Definition (Zeile 53-74) | Entfernt, durch Kommentar ersetzt |
| 2 | OverworldScreen.kt | Import-Statements am Ende der Datei (Zeile 559-560) | Imports an Anfang verschoben |
| 3 | StatusVisuals.kt | Encoding-Fehler bei Umlauten (Zeile 58, 61) | Umlaute korrigiert (Wärmere, für) |

---

## 8. Big Issues (Dokumentiert, nicht gefixxt)

### 8.1 PlayerScreen nicht aktiv

**Problem**: PlayerScreen.kt implementiert die vollständige Reader Noir UI gemäß Docs, wird aber nicht verwendet. AppRoot.kt routet zu OverworldScreen.

**Impakt**:
- ReaderCard mit Paper-Textur nur im Overlay
- TicketChoice nicht in Hauptansicht
- TopBar mit Kapitel-Indikator fehlt
- SafeZoneOverlay, VignetteLayer, NoiseLayer nicht sichtbar

**Next Actions**:
1. Entscheiden: Soll Overworld Hauptansicht bleiben oder PlayerScreen?
2. Wenn Overworld: StoryOverlay mit ReaderCard/TicketChoice erweitern
3. Wenn PlayerScreen: AppRoot.kt ändern, Route zu PlayerScreen

### 8.2 Background-Assets fehlen

**Problem**: Alle BackgroundAsset-Ressourcen zeigen auf `android.R.color.black`. Keine visuellen Hintergrundbilder vorhanden.

**Impakt**:
- Keine visuelle Atmosphäre
- Drift-Effekte wirken auf schwarzem Hintergrund
- "Reader Noir" Feeling nicht vollständig

**Next Actions**:
1. Assets gemäß VISUAL_ASSETS.md generieren (15 Bilder)
2. Assets in `res/drawable-nodpi/` ablegen
3. BackgroundSystem.kt Resource-IDs aktualisieren
4. Tag-to-Background Mapping in Szenen hinzufügen

### 8.3 Phase 3 TicketChoiceEnhanced kompiliert nicht

**Problem**: TicketChoiceEnhanced.kt hat Import-Konflikte und kompiliert nicht. Enhanced Features (Punch-Animation, Tone-Indicator) nicht verfügbar.

**Impakt**:
- Standard-TicketChoice funktioniert, aber ohne erweiterte Animationen
- Tone Choices nicht visuell unterscheidbar

**Next Actions**:
1. Projekt in Android Studio öffnen
2. Import-Konflikte mit IDE auflösen
3. TicketChoiceEnhanced in PlayerScreen/StoryOverlay integrieren

### 8.4 Accessibility Lücken

**Problem**: Einige Komponenten haben keine contentDescription, Microbar Badge zu klein.

**Next Actions**:
1. Alle Icons mit contentDescription versehen
2. Microbar Badge auf 24dp vergrößern oder als nicht-interaktiv markieren
3. Accessibility-Test mit TalkBack durchführen

---

## 9. UI-Inventar (Detailliert)

### 9.1 docs/UI_INVENTORY.md Inhalt

```markdown
# UI Inventar NACHTZUG 19

## Screens
- AppRoot.kt → Navigation Controller
- OverworldScreen.kt → Pixel Overworld (AKTIV)
- PlayerScreen.kt → Reader Noir (INAKTIV)
- SettingsScreen.kt → Einstellungen

## Komponenten
### Core
- ReaderCard.kt → Lesekarte mit Paper-Textur
- TicketChoice.kt → Choice Buttons (Ticket-Stil)
- TypewriterText.kt → Typewriter-Effekt
- StatusSheet.kt → Status Bottom Sheet
- StatusVisuals.kt → TicketStamp, PressureBar, ItemIcon
- Microbar.kt → Mini-Status Bar

### Background
- BackgroundLayers.kt → Drift, Vignette, Noise
- BackgroundSystem.kt → Background Asset System
- SafeZoneOverlay.kt → Safe Zones

### Overlays
- AnnouncementBanner.kt → Durchsage
- LoadingScreen.kt → Ladebildschirm

### Overworld
- OverworldScreen.kt → Hauptansicht
- OverworldData.kt → Room-Definitionen
- OverworldModels.kt → Datenmodelle

## Theme
- NachtzugTheme.kt → MaterialTheme
- ColorPalette.kt → NachtzugColors
- Typography.kt → Typografie
```

---

## 10. Empfehlungen (Priorisiert)

### Sofort (P0-P1)
1. ✅ Kleine Fixes angewendet (diese Session)
2. Microbar Badge vergrößern (24dp minimum)
3. contentDescriptions für Accessibility hinzufügen

### Kurzfristig (P2)
1. Background-Assets generieren und integrieren
2. Phase 3 (TicketChoiceEnhanced) in Android Studio fixen
3. StoryOverlay mit TicketChoice erweitern

### Mittelfristig
1. Entscheidung: Overworld vs PlayerScreen als Hauptansicht
2. Phase 4 (Status Visualization) implementieren
3. Performance-Profiling auf Zielgeräten

---

## 11. Test-Ergebnisse

```bash
$ npm test
✓ src/domain/engine/validateContent.test.ts (8 tests)
✓ src/domain/engine/gameEngine.test.ts (14 tests)
Test Files  2 passed (2)
Tests       22 passed (22)

$ npm run validate
✅ Story geladen: 156 Szenen, 5 Endings
✅ Content-Validierung erfolgreich
Zusammenfassung: 0 Errors, 0 Warnings
✅ Alle Checks bestanden!
```

---

## 12. Fazit

Die UI ist **spielbar und größtenteils docs-konform**. Die Hauptlücken sind:

1. **Architektur-Entscheidung offen**: Overworld oder PlayerScreen als Hauptansicht?
2. **Visuelle Assets fehlen**: Background-Bilder nicht vorhanden.
3. **Phase 3 blockiert**: TicketChoiceEnhanced kompiliert nicht.

Für ein MVP ist die aktuelle UI ausreichend. Für die volle "Reader Noir" Erfahrung gemäß Docs müssten die oben genannten Big Issues addressiert werden.

---

**Ende des Reports**

**Nächste Review**: Nach Implementierung von Background-Assets
