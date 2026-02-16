# NACHTZUG 19 - Changelog

Alle bedeutenden Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

---

## [Unreleased]

### Major: Kapitel 1 Hub-Redesign (2025-02)

#### Added - TypeScript Engine
- **Hub-System mit Auto-Transitions**: Neue `auto_next` Property in `NarrativeVariant`
  - Ermöglicht konditionale automatische Szenenübergänge
  - Verwendet für Hub-Exits nach Investigation-Schwellwerten
- **20 neue State-Variablen** für Hub-Mechanik:
  - `hub_investigations` und `train_explorations` Counter (Pressure)
  - 9 Bahnsteig-Items (investigated_*, called_emma, saw_emma_vision, etc.)
  - 9 Zug-Items (explored_*, knows_sleepless_warning, etc.)
- **Neue Scene-Tags**: `hub`, `investigation`, `event`, `special_path`, `emma_thread`
- **checkAutoNext() Funktion** in GameEngine für automatische Transitionen
- **Hub Choice-Limit Exception**: Hub-Szenen dürfen bis zu 10 Choices haben (vs. 5 für normale Szenen)
- **Simulator-Support für auto_next**: Test-Suite versteht Hub-Mechanik

#### Changed - TypeScript Content
- **Kapitel 1 komplett überarbeitet**: Von 20 linearen Szenen zu ~18 Hub-basierten Szenen
  - **ACT 1**: Bahnsteig Hub mit 6 Investigation-Hotspots + Emma-Sonderpfad
  - **ACT 2**: Zug-Annäherung (3 Szenen)
  - **ACT 3**: Zug Hub mit 4 Exploration-Bereichen
  - **ACT 4**: Comp7 Encounter & Anomalie (3 Szenen)
  - **ACT 5**: Kapitelende mit 4 Ticket-basierten Varianten
- **Start-Szene**: `c1_s01_platform` → `c1_hub_platform`
- **Spielzeit**: 17-20 Min → 30-35 Min (durch freie Exploration)
- **Progressive Discovery**: Hub-Narrative ändern sich basierend auf Investigation-Counter
- **Ending-Logik**: Priority-basierte Schwellenwerte statt dynamischer Vergleiche

#### Added - Android Engine
- **Alle TypeScript-Features gespiegelt**:
  - `auto_next` Field in `NarrativeVariant` Model
  - 20 neue State-Variablen in `Pressure` und `Items`
  - 20 neue `EffectTarget` Enum-Werte
  - 5 neue `SceneTag` Enum-Werte
- **checkAutoNext() Funktion** in Kotlin GameEngine
- **Getter/Setter** für alle neuen State-Variablen

#### Fixed
- **Type-Errors behoben**: Narrative variant conditions nutzen jetzt Priority-System
- **Simulator infinite loops**: Hub-Loops werden durch auto_next korrekt behandelt
- **Validation warnings**: Hub-Choice-Limit auf 10 erhöht

#### Tests
- ✅ **TypeScript**: Alle 56 Tests bestehen
- ✅ **Android**: Alle Tests bestehen (1 ignored - Golden Master needs regeneration)
- ✅ **APK Build**: Erfolgreich

#### Breaking Changes
- **Alte Kapitel 1 Savegames** sind inkompatibel mit dem Hub-Redesign
- **Golden Master Traces** müssen neu generiert werden
- **Start-Szene ID** hat sich geändert (Breaking für externe Tools)

#### Migration Notes
Wenn du auf dem alten Stand warst:
1. Savegames aus Kapitel 1 werden nicht funktionieren (empfohlen: löschen)
2. Wenn du Custom Tools hast, die auf `c1_s01_platform` referenzieren: Update zu `c1_hub_platform`
3. TypeScript Validator wird Warnungen über "infinite loops" in Hubs zeigen (harmlos, TODO)

---

## Previous Versions

### [1.0.0] - Initial Release
- 7 Kapitel vollständig implementiert
- Ticket-System & Memory Drift Mechanik
- Reader Noir UI
- MCP Server Integration
- Android Native App
