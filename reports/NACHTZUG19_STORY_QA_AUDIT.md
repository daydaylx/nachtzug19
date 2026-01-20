# NACHTZUG 19 - Story QA Audit

**Date:** 2024-01-20
**Auditor:** QA Agent Jules
**Scope:** Story Logic, Choice Graph, State Integrity, Engine Parity

## 1. Executive Summary

**CRITICAL FINDING (P0):** The game is unwinnable in its current state. The "Truth", "Guilt", and "Love" endings require ticket values $\ge 6$, but the Engine (both TS and Kotlin) strictly clamps ticket values to a maximum of `5`. Players will always be forced into the "Escape" ending or a fallback state.

**Status:**
- **Graph Structure:** Healthy (No dead ends, no cycles, reachable endings).
- **State/Logic:** BROKEN (Clamping conflict).
- **Content:** Generally high quality, minimal unused targets.
- **Parity:** High (TS and Kotlin share the same logic logic, including the critical bug).

## 2. Project Facts

- **Source of Truth:** `export/story.json` (Exported from TS content)
- **Scene Count:** 183
- **Ending Count:** 6
- **Chapters:** 7
- **Central State:** Tickets (4 types), Pressure (2 types), Relations (3 types), Items (3 flags)
- **Engines:** TypeScript (Web/Dev) & Kotlin (Android)

## 3. Graph Metrics

- **Max Out Degree:** 4 choices
- **Unreachable Scenes:** 0
- **Dead Ends:** 0
- **Cycles:** 0 detected
- **Note:** The graph structure is exceptionally clean.

## 4. Top Findings (Prioritized)

### [P0] ENGINE-001: Endings Unreachable due to Ticket Clamping

**Symptom:** Players who play perfectly for a specific path (Truth/Guilt/Love) cannot select the corresponding ending in Chapter 7.
**Root Cause:**
- Content (`c7.ts`) requires `tickets_truth >= 6`.
- Engine (`gameEngine.ts` / `GameEngine.kt`) forces `tickets_truth` to be `Math.min(5, value)`.
**Evidence:**
*src/content/nachtzug19/scenes/c7.ts:400*
```typescript
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 6
        },
```
*src/domain/engine/gameEngine.ts:160*
```typescript
  state.tickets.tickets_truth = Math.max(0, Math.min(5, state.tickets.tickets_truth));
```
**Fix:** Increase clamp limit in Engine to 10+ OR reduce content requirement to 5.

### [P2] CHOICE-001: Illusion Choice in Chapter 4

**Symptom:** Two choices lead to the exact same outcome with no narrative difference, making the player feel their choice didn't matter.
**Location:** `c4_s05_comp7_call`
**Evidence:**
- Choice `go_to_wagen7`: `next: 'c4_s05a_wagen7_changed'`, Effect: `truth+1, rel_comp7+1`
- Choice `examine_ticket_evidence`: `next: 'c4_s05a_wagen7_changed'`, Effect: `truth+1, rel_comp7+1` (requires `truth>=6`)
**Analysis:** The second choice is a "reward" option (locked by condition), but it yields the exact same result as the standard option. It should ideally have a stronger effect or a different narrative variant in the next scene.

### [P3] STATE-001: Ticket Inflation

**Symptom:** Ticket counts in a typical playthrough reach 100-200 (if unclamped), trivializing any threshold check of 6.
**Root Cause:** Loops or repeated granting of tickets without caps, or simply high frequency of rewards.
**Evidence:** Simulator run "Truth Path" reached 201 Truth Tickets (unclamped).
**Fix:** Rebalance ticket economy. If checks are for specific thresholds, ensure the maximum reachable is reasonable (e.g. 20-30), not 200.

## 5. Issues List

| ID | Severity | Category | Description |
|----|----------|----------|-------------|
| **ENGINE-001** | **P0** | Logic | **Ticket Clamping prevents Endings.** Engine caps tickets at 5, Content asks for 6. |
| **CHOICE-001** | P2 | Content | **Illusion Choice in C4.** `c4_s05_comp7_call` offers identical outcomes. |
| **STATE-001** | P3 | Balance | **Ticket Inflation.** Unclamped values reach 200+, making thresholds trivial or meaningless if clamping is fixed. |
| **STATE-002** | P3 | Cleanliness| **Unused Engine Meta.** `chapter_index`, `station_count` are written but not read in content conditions (Engine internal use only). Acceptable. |

## 6. Fix Roadmap

### Phase 1: Critical Fixes (Immediate)

**1. Fix Ticket Clamping (ENGINE-001)**
- **File:** `src/domain/engine/gameEngine.ts` AND `android-native/.../GameEngine.kt`
- **Action:** Change `.min(5, ...)` to `.min(100, ...)` or appropriate max.
- **Verify:** Run a test case where tickets go above 6.

### Phase 2: Polish (Next Release)

**2. Resolve Illusion Choice (CHOICE-001)**
- **File:** `src/content/nachtzug19/scenes/c4.ts`
- **Action:** Add a `narrative_variant` in `c4_s05a_wagen7_changed` that checks for `history` or a specific flag if the player chose `examine_ticket_evidence`. Or add a significant bonus effect (e.g. `wissen + 1`).

**3. Balance Review**
- **Action:** Review ticket economy. If 200 tickets are possible, are the thresholds of 6 meaningful? Consider scaling thresholds or reducing ticket sources.

## Appendix

### Evidence Files
- `reports/evidence/05_test.txt`: Unit tests pass (but don't cover high ticket counts integration).
- `reports/evidence/06_export_story.txt`: Export successful.
- `reports/graph_dump.json`: Full graph analysis.
- `reports/path_playthroughs.md`: Simulated playthrough logs (revealing the inflation issue).
- `reports/state_audit.json`: State usage analysis.

### Limitierungen
- Der Simulator (`scripts/simulate_playthrough.mjs`) nutzte **nicht** die Engine-Logik (`autoClamp`), weshalb die "Inflation" sichtbar wurde, aber der "Unreachable Ending" Bug erst durch Code-Review entdeckt wurde. Das unterstreicht die Wichtigkeit von Code-Audits neben Blackbox-Testing.
