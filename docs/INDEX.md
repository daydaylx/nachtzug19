# Dokumentations-Übersicht: NACHTZUG 19

Dieser Index gibt einen Überblick über alle Dokumentations-Dateien im Projekt und empfiehlt eine Lesereihenfolge.

---

## 📚 Empfohlene Lesereihenfolge

### 1. Einstieg: Projekt verstehen
**Zielgruppe**: Neue Entwickler, Autoren, Interessierte

1. **[../README.md](../README.md)** – Projektübersicht, Features, Installation, Quick Start
2. **[CONCEPT_NACHTZUG_19.md](CONCEPT_NACHTZUG_19.md)** – Story-Konzept (7 Kapitel, NPCs, Enden, Weltregeln)
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** – System-Architektur (Content/Domain/UI Separation)

### 2. Content-Entwicklung: Szenen schreiben
**Zielgruppe**: Content-Autoren, Story-Designer

1. **[NACHTZUG_19_RULES.md](NACHTZUG_19_RULES.md)** – **Pflichtlektüre**: Content-Format, Canon Rules, Validierung
2. **[NACHTZUG_19_LENGTH_IMMERSION_SPEC.md](NACHTZUG_19_LENGTH_IMMERSION_SPEC.md)** – Spielzeit-Ziele, Szenen-Anforderungen, Qualitätsmetriken
3. **[CONCEPT_NACHTZUG_19.md](CONCEPT_NACHTZUG_19.md)** – Referenz für Charaktere, Plot, Weltregeln

### 3. Engine-Entwicklung: System erweitern
**Zielgruppe**: Engine-Entwickler, Tech-Lead

1. **[ARCHITECTURE.md](ARCHITECTURE.md)** – Layer-Struktur, Dependency Flow, Import-Regeln
2. **[NACHTZUG_19_RULES.md](NACHTZUG_19_RULES.md)** – Graph-Invarianten, Validierungs-Regeln
3. **[CHANGELOG.md](CHANGELOG.md)** – Migrations-Historie, Breaking Changes

### 4. Historie & Wartung
**Zielgruppe**: Alle

1. **[CHANGELOG.md](CHANGELOG.md)** – Migrations-Log, Breaking Changes, Validierungs-Status

---

## 📄 Alle Dokumente im Detail

### [README.md](../README.md)
**Zweck**: Einstiegspunkt für das gesamte Projekt.

**Inhalt**:
- Projekt-Übersicht (Nachtzug 19 Story + Engine)
- Installation & Entwicklungs-Workflow
- Ordnerstruktur (src/, docs/, scripts/)
- Content-Format (Scenes, Choices, State-Modell)
- Testing & Deployment

**Lesezeit**: 5–10 Minuten

---

### [NACHTZUG_19_RULES.md](NACHTZUG_19_RULES.md)
**Zweck**: Verbindliches Content-Format und Projektregeln.

**Inhalt**:
- **Canon Rules** (R1-R4): Drift, Kontrollen, Callbacks, Zug lügt nicht
- Scene/Choice Schema (Pflichtfelder, Validierung)
- State-Modell (Stats, Tickets, Druck, Beziehungen, Items)
- Graph-Invarianten (keine Dead-Ends, fehlende Referenzen, etc.)
- Schreib-Workflow mit KI (Linter, QA, Validator)

**Zielgruppe**: Content-Autoren, QA, Entwickler

**Lesezeit**: 15–20 Minuten

---

### [NACHTZUG_19_LENGTH_IMMERSION_SPEC.md](NACHTZUG_19_LENGTH_IMMERSION_SPEC.md)
**Zweck**: Qualitätsanforderungen für Kapitel (Spielzeit, Szenen, Immersion).

**Inhalt**:
- Zielwerte: 30–35 Minuten Spielzeit pro Kapitel (Minimum 20 Minuten)
- Messmodell: Wörter (~5.000–6.500), Choices (~30–45), Szenen (~22–28)
- Szenen-Typen: Atmosphere/Interlude, Standard, Set-Piece
- "Momente"-Katalog (sensorische Anker, Nachhall, Drift-Symptome)
- Definition of Done pro Kapitel

**Zielgruppe**: Content-Autoren, QA

**Lesezeit**: 10–15 Minuten

---

### [CONCEPT_NACHTZUG_19.md](CONCEPT_NACHTZUG_19.md)
**Zweck**: Vollständiges Story-Konzept (7 Kapitel + Enden).

**Inhalt**:
- Elevator Pitch, Genre, Ton, Versprechen
- Weltregeln (Der Zug lügt nie, Kontrollen in Kap. 2/3/5, etc.)
- Spiellogik: Stats, Tickets, Druck, Beziehungen, Items
- Kapitelplan (Kapitel 1–7): Zweck, Szenen, Choices, Regeln
- NPCs: Schlafloser, Kassetten-Junge, Frau Abteil 7, Schaffner
- Enden: A (Wahrheit), B (Flucht), C (Schuld), D (Liebe)

**Zielgruppe**: Content-Autoren, Story-Designer, Neugierige

**Lesezeit**: 30–40 Minuten

---

### [ARCHITECTURE.md](ARCHITECTURE.md)
**Zweck**: Technische Architektur-Dokumentation (Content/Domain/UI Separation).

**Inhalt**:
- Ordnerstruktur (app/, ui/, domain/, content/)
- Layer-Verantwortlichkeiten (was darf was importieren?)
- Dependency Flow (Untere Layer kennen obere Layer nicht)
- Begründung der Struktur (Testbarkeit, Wartbarkeit, Austauschbarkeit)
- Import-Patterns (Do/Don't)
- Testing-Strategie (Unit, Integration, Content-Validierung)

**Zielgruppe**: Entwickler, Tech-Lead

**Lesezeit**: 15–20 Minuten

---

### [CHANGELOG.md](CHANGELOG.md)
**Zweck**: Migrations-Historie, Breaking Changes.

**Inhalt**:
- Datum: 2026-01-18 – Narrative Enhancement Update (NPC-Recognition, Tag19 Power-Up, 70s Foreshadowing)
- Datum: 2026-01-13 – Dokumentation an NACHTZUG 19 angepasst
- Datum: 2026-01-13 – Initiale Migration (Content/Domain/UI Separation)
- Datei-Verschiebungen (Alt → Neu)
- Import-Änderungen (Code-Beispiele)
- Validierungs-Status (Tests, Build)

**Zielgruppe**: Entwickler, Wartung

**Lesezeit**: 10 Minuten

---

## 🔧 Zusätzliche Ressourcen

### Codebase
- **Engine**: `src/domain/engine/gameEngine.ts` (State-Management, Choice Processing)
- **Validierung**: `src/domain/engine/validateContent.ts` (Graph-Invarianten)
- **Content**: `src/content/nachtzug19/scenes/c1.ts` – `c7.ts` (alle Kapitel)
- **Tests**: `src/domain/engine/gameEngine.test.ts`, `src/ui/components/*.test.tsx`

### Scripts
- **Content-Audit**: `scripts/audit_chapters.mjs` (Spielzeit-Analyse, Regeln-Prüfung)

### Debug-Tools
- **Debug Player**: `src/ui/debug/DebugPlayer.tsx` (Content-Entwicklung, State-Inspektion)

---

## ❓ Häufige Fragen

### "Wo fange ich an, wenn ich Szenen schreiben will?"
1. Lies [NACHTZUG_19_RULES.md](NACHTZUG_19_RULES.md) (Pflicht)
2. Lies [NACHTZUG_19_LENGTH_IMMERSION_SPEC.md](NACHTZUG_19_LENGTH_IMMERSION_SPEC.md)
3. Schau dir ein bestehendes Kapitel an (z.B. `src/content/nachtzug19/scenes/c1.ts`)
4. Nutze `scripts/audit_chapters.mjs`, um deine Szenen zu prüfen

### "Wie funktioniert die Engine?"
1. Lies [ARCHITECTURE.md](ARCHITECTURE.md)
2. Schau dir `src/domain/engine/gameEngine.ts` an
3. Lies die Tests: `src/domain/engine/gameEngine.test.ts`

### "Was sind die wichtigsten Regeln für Content?"
Siehe [NACHTZUG_19_RULES.md](NACHTZUG_19_RULES.md), Abschnitt 2 (Canon Rules):
- R1: Drift nach Station
- R2: Kontrollen in Kap. 2, 3, 5
- R3: Jede Choice hat Rückwirkung (Callback)
- R4: Der Zug lügt nicht direkt

### "Welche Dateien darf ich ändern?"
- **Content**: `src/content/nachtzug19/scenes/*.ts` (frei änderbar, solange Format stimmt)
- **Engine**: `src/domain/engine/*.ts` (nur mit Tests und Review)
- **UI**: `src/ui/**/*.tsx` (nur Präsentation, keine Story-Logik)
- **Docs**: Alle Dokumente in `docs/` (mit Konsistenz-Check)

---

**Letzte Aktualisierung**: 2026-01-18
**Maintained by**: Repository-Dokumentations-Agent
