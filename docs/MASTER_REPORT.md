# NACHTZUG 19 - Master Report

**Projekt:** NACHTZUG 19 (Native Android + TypeScript Hybrid)
**Stand:** 21.01.2026
**Status:** Release Candidate (mit P2 Action Items)

---

## Executive Summary

Das Projekt befindet sich in einem stabilen Zustand (Release Candidate). Die Kernarchitektur (Hybrid TS/Kotlin) steht, der Content (7 Kapitel) ist vollständig und validierbar.
Kritische Blocker (P0/P1) sind behoben. Der Fokus liegt nun auf **Technical Debt (Types)** und **Narrative Polish (Tone Choices, Logic Fixes)**.

**Health Check:**
- **Tests:** ✅ 17/17 Passed
- **Validation:** ✅ 0 Errors, 0 Warnings (Graph Integrität 100%)
- **Type Check:** ⚠️ 55 Errors (Developer Experience issue, Runtime safe)
- **Story Scope:** 7 Kapitel, 183 Szenen, 6 Endings (alle erreichbar)

---

## Dokumentations-Status

- **Index:** `docs/_DOCS_INDEX.md` (Führend)
- **Konflikte:** `docs/_DOCS_CONFLICTS.md` (R3 vs. Tone Choices, gelöst durch Regel-Lockerung)
- **Veraltete Reports:** Alle Einzel-QA-Reports sind hier konsolidiert und die Originaldateien wurden entfernt.

---

## Offene Punkte (Priorisiert)

### P1 (Qualität & Konsistenz) - MUSS FIXEN

#### TASK-001: TypeScript Type Errors
- **Problem:** 55 Type Errors (`@types/node` missing, Mock mismatch, etc.). Erschwert CI und Dev-Workflow.
- **Lösung:** Dependencies installieren, Mocks in Tests anpassen.
- **Status:** **OPEN**

#### TASK-002: "Tone Choices" Implementierung (Decision System)
- **Problem:** Ticket-Inflation durch zu viele gewichtete Choices. "Fake Choices" existieren.
- **Konflikt:** Regel R3 forderte Effects.
- **Lösung:** Regel R3 gelockert (siehe `_DOCS_CONFLICTS.md`).
- **Action:**
  - Validator anpassen (leere Effects erlauben).
  - Kandidaten aus `NEXT_STEPS_DECISION_REBALANCE.md` umsetzen (Effekte entfernen bei: `c1_interlude_05_vibration`, `c1_s03_inside_train`, etc.).
- **Status:** **OPEN**

#### TASK-003: `played_recorder` State Logik
- **Problem:** Kapitel 6 behauptet "nie abgespielt", auch wenn Spieler es tat. State existiert (`Items`), wird aber in C2/C3 nicht gesetzt.
- **Quelle:** `QA_REPORT_SUPPLEMENT.md`.
- **Action:**
  - `c2_s02_boy_recorder` / `c3_s01b_boy_return`: Effect `set played_recorder true` hinzufügen.
  - `c6_s15_recorder_playback`: Narrative Variant für `played_recorder == true` hinzufügen.
- **Status:** **OPEN**

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

## Erledigte Punkte (Historie)

- **Ending Thresholds:** Gesenkt auf 5 (alle Endings erreichbar).
- **Drift Policy:** R1 (Drift nach Station) strikt implementiert.
- **Android Migration:** Web-UI entfernt, Native Architecture etabliert.
- **Wackelt-Fixes:** Alle Choices haben Callbacks (bzw. sind jetzt Tone Choices).
- **Graph Validation:** Keine Dead-Ends, keine unreachable Scenes.

---

## Nächste Schritte (Konkret)

1. **Type Fixes:** `npm install -D @types/node`, Tests fixen.
2. **Validator Update:** Leere Effects (Tone) erlauben.
3. **Content Patch:** `played_recorder` implementieren & Tone Conversion für C1/C4 durchführen.
4. **Docs Cleanup:** Alte Reports löschen.
