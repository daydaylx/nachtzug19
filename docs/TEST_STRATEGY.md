# Test Strategy - NACHTZUG 19

Version: 1.0  
Date: 2026-01-31  
Owner: QA/Test Engineering (Codex)

## Goals
- Increase automated coverage across Domain/Engine, Validator, Content, Simulation, and Persistence.
- Make coverage measurable (statements/branches/functions/lines).
- Encode critical rules from /docs into deterministic tests.
- Keep tests deterministic, isolated, and fast.

## Test Framework & Tooling
- Unit/Integration: Vitest (node environment)
- Coverage: Vitest v8 provider (text + lcov)
- No network access in tests.

## Rules to enforce from docs (MUST / SHOULD)

### MUST (Automated)
1) Canon R1 - Drift after stations  
   - Rule: Each chapter must have station_end; station_end increases memory_drift (+1) unless manual.  
   - Source: docs/NACHTZUG_19_RULES.md (Section 1, R1), docs/STORY_QA_RULES_EXTRACT.md (P0 R1)

2) Canon R2 - Controls at chapters 2, 3, 5  
   - Rule: Each of chapters 2/3/5 must contain at least one control scene.  
   - Source: docs/NACHTZUG_19_RULES.md (Section 1, R2), docs/STORY_QA_RULES_EXTRACT.md (P0 R2)

3) Canon R3 - Choice consequence (no fake choices)  
   - Rule: Choices with effects must have visible callbacks; tone choices allowed.  
   - Source: docs/NACHTZUG_19_RULES.md (Section 1/2), docs/DECISION_SYSTEM.md, docs/_archive/_DOCS_CONFLICTS.md
   - Note: Validator permits empty effects for tone choices; fake-choice detection is a separate check.

4) Canon R4 - Train never lies directly  
   - Rule: No direct contradictions or gaslighting.  
   - Source: docs/NACHTZUG_19_RULES.md (Section 1, R4)
   - Automated coverage: partial (lintable patterns are limited). Primary enforcement remains manual review.

5) Graph invariants  
   - Rule: All next references exist, no dead ends, reachable or secret-only, no unknown keys, no invalid effects.  
   - Source: docs/NACHTZUG_19_RULES.md (Section 7), docs/STORY_QA_RULES_EXTRACT.md (P0 Graph)

6) Conditions & Effects schema  
   - Rule: Only structured compare/bool/and/or; effect types inc/dec/set/clamp; known state keys only.  
   - Source: docs/NACHTZUG_19_RULES.md (Section 6), docs/STORY_QA_RULES_EXTRACT.md (P1 Conditions & Effects)

7) State model keys & ranges  
   - Rule: No unknown state variables, engine clamps to allowed ranges.  
   - Source: docs/NACHTZUG_19_RULES.md (Section 5), docs/STORY_QA_RULES_EXTRACT.md (State Model)
   - Note: Code currently clamps tickets to 0-50 and relations to -2..10 (engine comment). Docs list 0-5 and -2..+4. Tests document current runtime behavior and flag this mismatch in coverage report.

### SHOULD (Mixed: automated + manual)
1) Mobile pacing (beat rule, max 6-10 sentences, no scrolling)  
   - Source: docs/MOBILE_PACING_RULES.md, docs/STORY_QA_RULES_EXTRACT.md
   - Automation: limited (sentence count / length heuristics possible). Manual QA required.

2) Drift quality and variants  
   - Source: docs/STORY_QA_RULES_EXTRACT.md (Drift quality), docs/NACHTZUG_19_RULES.md (Section 4.6)
   - Automation: tests ensure drift variants resolve correctly; qualitative checks remain manual.

3) UI rules (Reader Noir + accessibility)  
   - Source: docs/_archive/NACHTZUG_19_READER_NOIR_UI_CONCEPT.md, docs/_archive/UI_QA_RULES_EXTRACT.md
   - Automation: Android Compose UI tests recommended; out of TS scope.

## Test Matrix (Area -> Risk -> Test Type -> Goal -> Example)

| Area | Risk | Type | Goal | Example |
|------|------|------|------|---------|
| Domain Engine | Incorrect state transitions | Unit | Validate applyEffects/evaluateCondition/transition | applyEffects clamps, transition station_end |
| Domain Engine | Conditions not enforced | Unit | Evaluate compare/bool/and/or correctly | evaluateCondition operators |
| Domain Engine | Drift narrative wrong | Unit | resolveSceneNarrative priority | condition variants > drift variants |
| Validator | Broken graph | Unit | detect missing next/ending | validateContent missing next |
| Validator | Canon rules broken | Unit/Integration | R1/R2 enforced | chapter station_end + control tests |
| Content Integrity | Story regressions | Integration | validateContent on full story | 0 errors, 0 warnings |
| Simulation | Stuck states or loops | Integration | deterministic policy completes | full story deterministic run |
| Persistence | Save/load mismatch | Unit | loadGame returns false on version mismatch | localStorage stub tests |
| UI (Android) | Accessibility / tap targets | Manual/Compose UI | Ensure 44dp targets, labels | Compose UI tests (future) |

## Test Levels
- Unit: Engine functions, validator helpers, loadStory.
- Integration: Full story validation, deterministic simulation, persistence flows.
- Manual/Android: UI rendering, accessibility, pacing visual checks.

## Determinism & Data Control
- No randomness in tests (policy-driven simulation).
- No network access in tests.
- All tests use in-memory fixtures or imported story content.

## Coverage Strategy
- Cover critical branches in engine/validator (conditions, error paths, station_end rule).
- Add targeted tests for persistence and legacy condition behavior.
- Maintain a small number of full-story integration tests (smoke + rules).

