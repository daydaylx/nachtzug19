# NACHTZUG 19 - Master Report

**Projekt:** NACHTZUG 19 (Native Android + TypeScript Hybrid)
**Stand:** 21.01.2026 (Abends)
**Status:** Release Candidate (Tone Rebalancing Completed)

---

## Executive Summary

Das Projekt befindet sich in einem stabilen Release Candidate Zustand. Alle kritischen Issues sind behoben.
Das **Tone Choice Rebalancing** (Reduktion der Ticket-Inflation) wurde für die Kapitel 1 und 4 vollständig umgesetzt.
Die Engine und der Validator unterstützen nun explizit entscheidungen ohne mechanische Effekte ("Tone Choices").

**Health Check:**
- **Tests:** ✅ 17/17 Passed
- **Validation:** ✅ 0 Errors, 0 Warnings (Graph Integrität 100%)
- **Type Check:** ✅ 0 Errors
- **Story Scope:** 7 Kapitel, 183 Szenen, 6 Endings

---

## Dokumentations-Status

- **Index:** `docs/_DOCS_INDEX.md` (Führend)
- **Konflikte:** `docs/_DOCS_CONFLICTS.md` (R3 vs. Tone Choices, gelöst)
- **Veraltete Reports:** Konsolidiert und gelöscht.

---

## Erledigte Punkte (Neu)

### ✅ TASK-001: TypeScript Type Errors
- **Was:** 55 Type Errors behoben (`@types/node` installiert, Mocks angepasst).
- **Status:** **COMPLETED**

### ✅ TASK-002: "Tone Choices" Implementierung (Decision System)
- **Was:** Regel R3 gelockert, Validator angepasst.
- **Content:**
  - **C1:** 5 Szenen umgestellt (`echo_tone`, `find_seat`, etc.).
  - **C4:** 3 Szenen umgestellt (`check_doors`, `go_to_wagen7`, `remember_comp7`).
- **Status:** **COMPLETED**

### ✅ TASK-003: `played_recorder` State Logik
- **Was:** `entry_effects` in `c2_s02a_recorder_listening` hinzugefügt.
- **Status:** **COMPLETED**

---

## Offene Punkte (Priorisiert)

### P2 (Polish) - SOLL FIXEN

#### TASK-004: Narrative Inkonsistenzen (QA Report)
- **Punkte:**
  - `c1_s01a_platform_details`: state_notes vs effects Inkonsistenz.
  - `c3_s02a_recorder_listening`: `has_recorder` Logik prüfen.
  - `c4_s05_comp7_call`: Ticket Evidence ohne Ticket-State.
- **Status:** **OPEN**

### P3 (Low / Won't Fix)

- **Metadata usage:** `chapter_index`/`station_count` werden gesetzt aber nicht gelesen -> Akzeptiert (Analytics).
- **Spec Targets:** Wortanzahl/Choice-Count teils unter Target -> Akzeptiert (Qualität > Quantität).

---

## Nächste Schritte

1. **End-to-End Playthrough:** Kompletten Durchlauf simulieren (manuell oder script).
2. **Android Build Verification:** Build auf echter Hardware testen (sobald Netzwerk verfügbar).
3. **P2 Fixes:** Narrative Inkonsistenzen in C1/C3 beheben.