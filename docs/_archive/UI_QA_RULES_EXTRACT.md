# UI QA Rules Extract

**Version**: 1.0
**Erstellt**: 2026-01-31
**Quellen**: NACHTZUG_19_READER_NOIR_UI_CONCEPT.md, MOBILE_PACING_RULES.md, NACHTZUG_19_RULES.md, VISUAL_ASSETS.md

---

## 1. MUSS-Regeln (Zwingend)

### 1.1 Mobile Pacing (MOBILE_PACING_RULES.md)

| ID | Regel | Quelle |
|----|-------|--------|
| M1 | **Beat-Regel**: Eine Szene = ein Beat = 1 Gefühl + 1 konkrete Aktion | MOBILE_PACING_RULES.md → §1 |
| M2 | **Max 6-10 Sätze pro Beat**, danach MUSS eine Aktion kommen | MOBILE_PACING_RULES.md → §2 |
| M3 | **Kein Scrollen**: Der Beat muss auf einen Bildschirm passen | MOBILE_PACING_RULES.md → §2 |
| M4 | **2-4 Choices pro Szene**, sofort klickbar | MOBILE_PACING_RULES.md → §1 |
| M5 | **Handlung vs. Reaktion**: Mindestens eine Option muss "Handlung", mindestens eine "Reaktion" sein | MOBILE_PACING_RULES.md → §3 |

### 1.2 Reader Noir UI (NACHTZUG_19_READER_NOIR_UI_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| U1 | **Mobile-first Layout**: Optimiert für Portrait-Screens (9:16) | UI_CONCEPT → §4 |
| U2 | **TopBar**: Kapitel-Kürzel links, "NACHTZUG 19" Mitte, Uhrzeit rechts (optional) | UI_CONCEPT → §4.1A |
| U3 | **Reader Card**: Zentrale Lesefläche, abgerundet, soft shadow, warm dark gray (#1A1F26) | UI_CONCEPT → §5.1 |
| U4 | **Choice Tray**: 1-4 Ticket Cards im Daumenbereich, große Tap-Fläche, max 2 Zeilen | UI_CONCEPT → §4.1C |
| U5 | **Microbar**: Optional, 3 Icons (Tickets/Drift/Attention), Tap öffnet Status Drawer | UI_CONCEPT → §4.1D |
| U6 | **Status Drawer**: Bottom Sheet (mobil), enthält Tickets, Attention, Drift, Items | UI_CONCEPT → §5.5 |

### 1.3 Typografie (NACHTZUG_19_READER_NOIR_UI_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| T1 | **Narrative Text**: Serif-Font, großzügige Zeilenhöhe, max ~70 Zeichen/Zeile | UI_CONCEPT → §3.1 |
| T2 | **UI Labels**: Sans-Font, klar, neutral, klein, präzise | UI_CONCEPT → §3.2 |
| T3 | **Choices**: Sans, größer, sehr gut lesbar | UI_CONCEPT → §3.2 |

### 1.4 Farbwelt (NACHTZUG_19_READER_NOIR_UI_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| C1 | **Hintergrund**: Sehr dunkles Blau/Anthrazit (#0A0F16), fast schwarz | UI_CONCEPT → §2.1 |
| C2 | **Textflächen**: Warmes Dunkelgrau (#1A1E24), nicht reines Weiß auf Schwarz | UI_CONCEPT → §2.1 |
| C3 | **Akzent 1 (StationNeon)**: Gedämpftes Cyan/Teal (#5BC0BE) für "Zug/Technik" | UI_CONCEPT → §2.1 |
| C4 | **Akzent 2 (ControlOrange)**: (#E07856) für "Attention/Control" | UI_CONCEPT → §2.1 |
| C5 | **Warnrot**: Nur für echte Fehler/Endings, sehr sparsam | UI_CONCEPT → §2.1 |

### 1.5 Tap Targets & Accessibility

| ID | Regel | Quelle |
|----|-------|--------|
| A1 | **Tap-Targets**: Buttons mind. ~44dp Höhe | Android Material Guidelines |
| A2 | **Choices**: Große Tap-Fläche, gut erreichbar im Daumenbereich | UI_CONCEPT → §4.1C |
| A3 | **Kontrast**: Text auf Hintergrund muss lesbar sein | Accessibility Best Practice |
| A4 | **Reduce Motion**: Animationen abschaltbar via Setting | UI_CONCEPT → §7 |

---

## 2. SOLL-Regeln (Empfohlen)

### 2.1 Animationen (NACHTZUG_19_READER_NOIR_UI_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| S1 | **Maximal 3 Animationen + optional Banner** | UI_CONCEPT → §8 |
| S2 | **Background drift**: Langsamer Loop 20-40s, nur Deko | UI_CONCEPT → §8A |
| S3 | **Station Overlay**: 200ms rein/raus | UI_CONCEPT → §8B |
| S4 | **Choice Commit**: Button kurz disabled + minimal flash 150-250ms | UI_CONCEPT → §8C |

### 2.2 Drift-Effekte (NACHTZUG_19_READER_NOIR_UI_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| S5 | **Drift 0-1**: Praktisch neutral | UI_CONCEPT → §7 |
| S6 | **Drift 2-3**: Background minimal kälter, leichte Verschiebung (1-2px) | UI_CONCEPT → §7 |
| S7 | **Drift 4-6**: Ghost-Shadow an Card-Rand, nicht am Text | UI_CONCEPT → §7 |
| S8 | **Text bleibt immer stabil und sauber lesbar** | UI_CONCEPT → §7 |

### 2.3 Ticket Choices (NACHTZUG_19_READER_NOIR_UI_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| S9 | **Optik**: Schwarze/anthrazit "Fahrkarten" mit Lochmuster am Rand | UI_CONCEPT → §5.2 |
| S10 | **Press (Mobile)**: Kurzer "Punch" (scale 0.98) + Lochstanzen-Animation | UI_CONCEPT → §5.2 |

---

## 3. KANN-Regeln (Optional)

### 3.1 Overworld (OVERWORLD_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| K1 | **Pixel Overworld**: Top-Down, Pokémon-Style, optional | OVERWORLD_CONCEPT → §1 |
| K2 | **Tap-to-move**: Tap auf Tile/Position → Player läuft dorthin | OVERWORLD_CONCEPT → §3 |
| K3 | **5 Rooms**: corridor_main, compartment, transition, wagon7, platform_station | OVERWORLD_CONCEPT → §2 |

### 3.2 Sound (NACHTZUG_19_READER_NOIR_UI_CONCEPT.md)

| ID | Regel | Quelle |
|----|-------|--------|
| K4 | **Sound optional**: Leises Zugrollen, Durchsage-ding, Ticket click | UI_CONCEPT → §9 |
| K5 | **Alles abschaltbar** | UI_CONCEPT → §9 |

---

## 4. Anti-Patterns (VERBOTEN)

| ID | Anti-Pattern | Quelle |
|----|--------------|--------|
| X1 | **E-Book Mode**: Lange Textblöcke ohne Interaktion | MOBILE_PACING_RULES.md → §5 |
| X2 | **Chatblasen / Messenger-Optik** | UI_CONCEPT → §0 |
| X3 | **3D-Rumlaufen** | UI_CONCEPT → §0 |
| X4 | **Aggressive Glitch-Effekte im Text** | UI_CONCEPT → §0 |
| X5 | **Text durch Drift-Effekte unlesbar machen** | UI_CONCEPT → §7 |
| X6 | **UI enthält Storylogik** (UI darf nur rendern, nicht entscheiden) | ARCHITECTURE.md |

---

## 5. Architektur-Trennung

### 5.1 UI vs Domain (ARCHITECTURE.md)

| Schicht | Verantwortung |
|---------|---------------|
| **UI (Kotlin/Compose)** | Nur Rendering, keine Story-Logik, kein State-Manipulation |
| **ViewModel** | Bindet UI an Engine, verwaltet UiState |
| **Engine (GameEngine.kt)** | Story-Logik, State-Transitions, Choice-Handling |
| **Repository** | Story-Laden, Persistenz |

### 5.2 Datenfluss

```
Story.json → Repository → GameEngine → GameViewModel → UI (Compose)
              ↑                              ↓
              └────── GameDataStore ←────────┘
```

---

## 6. Validierungs-Checkliste für UI

- [ ] Beat passt auf einen Bildschirm (kein Scrollen erforderlich)
- [ ] Choices sind im Daumenbereich erreichbar
- [ ] Tap-Targets ≥ 44dp
- [ ] Text ist lesbar (Kontrast)
- [ ] Drift-Effekte beeinträchtigen Text nicht
- [ ] Reduce Motion respektiert
- [ ] Keine UI-Logik für Story-Entscheidungen
- [ ] Status Drawer zeigt korrekte Werte
- [ ] Animationen < 300ms für Übergänge

---

**Ende des Dokuments**
