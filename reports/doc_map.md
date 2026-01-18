# NACHTZUG 19 - Dokumentation Map

> Kurzübersicht aller Dokumentation im Projekt
> Zweck: Schnelle Orientierung für Developer und Editoren

---

## docs/ (Hauptdokumentation)

### CONCEPT_NACHTZUG_19.md
**Zweck:** Story-Konzept und Kernidee
**Inhalt:**
- Story-Premisse: Nachtzug 19 als Limbus-Ort für Verlorene
- 1973 Unfall: Historischer Kontext (letzte Fahrt)
- Protagonist: Passenger #19 ohne Erinnerung
- Themen: Schleife, Verlust, Identität, Schuld
- NPCs: Comp7 (Mysteriös), Boy (Verletzlich), Sleepless (Erschöpft)

**Für wen:** Writer, Developer, Story-Designer

---

### ARCHITECTURE.md
**Zweck:** Architekturübersicht des Story-Engine Systems
**Inhalt:**
- Domain Layer (Types, Game Engine)
- Content Layer (Scenes, Choices)
- UI Layer (Player, Components)
- Rules System (Canon Rules, Content Rules)
- State Management (Tickets, Pressure, Relations, Items)

**Für wen:** Developer, Architekten, Tech-Leads

---

### NACHTZUG_19_RULES.md
**Zweck:** Explizite Regeln für Content und Engine
**Inhalt:**
- R1: Drift nach Station (memory_drift += 1)
- R2: Schaffner-Kontrolle (Härte basierend auf conductor_attention)
- C1: Callback-Regel (Choices haben Effects)
- C2: Tags-System (setup, drift_seed, reveal, control, station_end)
- C3: Narrative-Varianten (Drift-basiert)
- C4: Conditions-System (Simple, Bool, And, Or)
- C5: Entry/Exit Effects
- C6: Effects-System (inc, dec, set, clamp)
- C7: State Notes (max 3 pro Scene)
- C8: Auto-Clamp (automatische Begrenzung)
- C9: History-System
- C10: Save/Load
- C11: Ending-System
- C12: Chapter-System
- C13: Station-Count
- C14: Visited Scenes
- C15: Atmosphere
- C16: Interludes
- C17: Set-Pieces
- C18: Conditional Scenes
- C19-C40: Weitere Content- und Quality-Regeln

**Für wen:** Content-Writer, Developer, QA

---

### NACHTZUG_19_READER_NOIR_UI_CONCEPT.md
**Zweck:** UI-Konzept für Player-App
**Inhalt:**
- Noir-Ästhetik: Dunkle Farben, minimalistisches Layout
- Komponenten: StoryView, ChoiceList, StatsBar, HeaderBar
- Atmosphere-Effekte: Lichter, Vibrationen, Überblendungen
- Accessibility: Screen Reader, a11y Farben

**Für wen:** UI-Designer, Frontend-Developer

---

### NACHTZUG_19_LENGTH_IMMERSION_SPEC.md
**Zweck:** Spezifikation für Länge und Immersion
**Inhalt:**
- Szenen-Länge: 3-12 Absätze
- Interludes: 1-3 Absätze (kürzer)
- Choices: 1-4 pro Szene
- Kapitel-Länge: 22-28 Szenen
- Gesamt: ~40.000-50.000 Wörter

**Für wen:** Content-Writer, Editors

---

## src/ (Implementierung)

### src/domain/types/index.ts
**Zweck:** Type-Definitionen für State, Effects, Conditions
**Inhalt:**
- Tickets, Pressure, Relations, Items
- GameState, History, Effect, Condition
- Scene, Choice, Ending
- Validation Types

**Für wen:** Developer

---

### src/domain/engine/gameEngine.ts
**Zweck:** Core Game Engine Logic
**Inhalt:**
- applyEffects: Wendet Effects auf State an
- evaluateCondition: Prüft Conditions
- transitionToNextScene: Navigiert Story-Graph
- resolveSceneNarrative: Wählt Drift-basierte Narrative
- R1: Automatische Drift-Erhöhung bei station_end
- GameEngine Klasse: Save/Load, State Management

**Für wen:** Developer

---

### src/content/nachtzug19/scenes/*.ts
**Zweck:** Story-Content für alle Kapitel
**Inhalt:**
- c1.ts: Kapitel 1 - Leerer Bahnsteig (24 Szenen)
- c2.ts: Kapitel 2 - Die erste Kontrolle (25 Szenen)
- c3.ts: Kapitel 3 - Wagen 7 (27 Szenen)
- c4.ts: Kapitel 4 - Spiegelung (27 Szenen)
- c5.ts: Kapitel 5 - Finale Kontrolle (25 Szenen)
- c6.ts: Kapitel 6 - Abteil 7 (26 Szenen)
- c7.ts: Kapitel 7 - Entscheidung (26 Szenen)

**Für wen:** Content-Writer

---

## scripts/ (Tools)

### scripts/audit_chapters.mjs
**Zweck:** QA-Tool für Content-Validierung
**Inhalt:**
- Prüft Kapitel gegen Specs
- Validiert Regeln (C1-C40)
- Erzeugt QA-Berichte

**Für wen:** QA, Content-Editoren

---

## reports/ (Analyse und Policy)

### QA_REPORT_NACHTZUG19.md
**Zweck:** Externes QA-Bericht
**Inhalt:**
- Gefundene Issues und Bugs
- Validierungsergebnisse

**Für wen:** Developer, Project-Management

---

### reports/rules_policy_r1_drift_fix.md
**Zweck:** Policy-Dokument für R1-Fix
**Inhalt:**
- Problem: Doppelte memory_drift-Erhöhung (+2 statt +1)
- Ursache: exit_effects in station_end Szenen duplizieren Engine-R1
- Lösung: Option A (empfohlen) = exit_effects entfernen
- Betroffene Dateien: c1.ts, c2.ts, c3.ts, c4.ts, c5.ts, c6.ts, c7.ts

**Für wen:** Developer, Content-Writer

---

### reports/rules_index.md
**Zweck:** Index aller Regeln aus NACHTZUG_19_RULES.md
**Inhalt:**
- Alle 42 Regeln (R1-R2, T1-T40, C1-C40)
- Kurzbeschreibung, betroffene Teile, Umsetzung
- Zusammenfassung: 2 explizite Canon Rules, ~40 System/Content-Rules
- Problem-Verweis zu rules_policy_r1_drift_fix.md

**Für wen:** Content-Writer, Developer, Rule Librarian

---

### reports/doc_map.md (diese Datei)
**Zweck:** Map aller Dokumentation
**Inhalt:**
- Übersicht aller Docs, Source, Scripts, Reports
- Zweck und Zielgruppe jedes Dokuments

**Für wen:** Alle Projektmitglieder (Schnellreferenz)

---

## CLAUDE.md
**Zweck:** AI-Assistent Konfiguration und Guidelines
**Inhalt:**
- System-Prompt für Claude AI
- Project-Kontext und Working Directory
- Custom Instructions

**Für wen:** Claude AI

---

## README.md
**Zweck:** Projekt-Übersicht und Getting Started
**Inhalt:**
- Projekt-Beschreibung
- Installation
- Development Workflow
- Credits

**Für wen:** Neue Entwickler, Contributors

---

## NEXT.md
**Zweck:** Next Steps und Roadmap
**Inhalt:**
- Offene Tasks
- Zukünftige Features
- Prioritäten

**Für wen:** Project-Management, Developer

---

## Lizenz und Rechtliches

### LICENSE
**Zweck:** Lizenzbedingungen
**Inhalt:** Open-Source Lizenz (wird noch definiert)

**Für wen:** Alle Projektmitglieder

---

## Zusammenfassung

**Total: 15 Hauptdokumente**
- Konzept: 1 (CONCEPT)
- Architektur: 1 (ARCHITECTURE)
- Regeln: 1 (RULES)
- UI-Konzept: 1 (UI CONCEPT)
- Specs: 1 (LENGTH SPEC)
- Types: 1 (types/index.ts)
- Engine: 1 (gameEngine.ts)
- Content: 7 (c1.ts - c7.ts)
- Tools: 1 (audit_chapters.mjs)
- Reports: 3 (QA, Policy, Rules Index, Doc Map)
- Projekt-Docs: 4 (CLAUDE, README, NEXT, LICENSE)

**Verwendung:**
- Für schnelle Orientierung: doc_map.md
- Für Content-Regeln: NACHTZUG_19_RULES.md + rules_index.md
- Für Architektur: ARCHITECTURE.md + types/index.ts
- Für Engine-Logic: gameEngine.ts
- Für Story: CONCEPT + Content-Dateien
- Für UI: UI CONCEPT
- Für QA: audit_chapters.mjs + QA_REPORT
- Für Issues: Policy-Dokumente in reports/