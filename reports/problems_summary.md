# NACHTZUG 19 - Problem Summary & Action Plan

**Generated**: 2026-01-18
**Project Status**: Content Complete (7 chapters, 183 scenes)
**Overall Assessment**: 8.5/10 (Production-ready with minor fixes needed)

## Executive Summary

**Total Issues Identified**: 93
- **P0 (Blocker)**: 5 issues - Fixed
- **P1 (High Priority)**: 7 issues - 3 fixed, 4 open
- **P2 (Medium Priority)**: 4 issues - Improve long-term maintainability
- **P3 (Low Priority)**: 77 issues - Enhancement opportunities

**Critical Path**: P0 fixed → Address P1 quality concerns → Production-ready

---

## P0 - BLOCKER (Must Fix Before Release)

### 1. Content Format Error: c1_interlude_01_lights
**File**: `src/content/nachtzug19/scenes/c1.ts`
**Location**: Scene ID `c1_interlude_01_lights`
**Problem**: Resolved; choice now has a `memory_drift` effect
**Violates**: Canon Rule R3 (Every Choice Has Callback)
**Impact**: Breaks validation rules, violates player contract
**Fix**:
```typescript
effects: [
  { type: 'inc', target: 'memory_drift', value: 1 }
]
```
**Status**: ✅ Fixed

---

### 2. Content Format Error: c3_control_02_question
**File**: `src/content/nachtzug19/scenes/c3.ts`
**Location**: Scene ID `c3_control_02_question`
**Problem**: Resolved; scene now has 4 choices
**Violates**: Format Rule CF-2 (Max 4 choices per scene)
**Impact**: UI design assumes max 4 choices, may cause layout issues
**Fix**: Reduced to 4 choices (removed redundant option)
**Status**: ✅ Fixed

---

### 3. Content Format Error: c5_s10_boy_reunion
**File**: `src/content/nachtzug19/scenes/c5.ts`
**Location**: Scene ID `c5_s10_boy_reunion`
**Problem**: Resolved; scene now has 3 conditional choices
**Violates**: Format Rule CF-2 (Max 4 choices per scene)
**Impact**: UI design assumes max 4 choices, may cause layout issues
**Fix**: Reduced to <= 4 choices (removed redundant option)
**Status**: ✅ Fixed

---

### 4. Architectural Violation: PlayerScreen.tsx
**File**: `src/ui/player/PlayerScreen.tsx:3`
**Problem**: Resolved; UI now imports from domain/types
```typescript
import { Scene, Choice, GameState, resolveSceneNarrative } from '../../domain/types';
```
**Violates**: Layer separation (UI should only import from domain/types)
**Impact**: Creates tight coupling, breaks architecture
**Fix**: Re-exported `resolveSceneNarrative` from `domain/types` and updated UI import
**Status**: ✅ Fixed

---

### 5. React Hooks Violation: App.tsx
**File**: `src/app/App.tsx:102`
**Problem**: Resolved; `useEffect` now runs at top level
```typescript
useEffect(() => {
  if (appMode !== 'legacy' || !engine) return;
  // ... rest of logic
}, [appMode, engine]);
```
**Violates**: React Rules of Hooks
**Impact**: Unpredictable behavior, ESLint disabled
**Fix**: Moved hook outside conditional; removed ESLint disable
**Status**: ✅ Fixed

---

## P1 - HIGH PRIORITY (Quality Impact)

### 6. FAKE-CHOICE Problem (3 scenes)
**Files**:
- `src/content/nachtzug19/scenes/c4.ts` - c4_s01a_double_reflection
- `src/content/nachtzug19/scenes/c4.ts` - c4_s02_recorder_prophecy
- `src/content/nachtzug19/scenes/c5.ts` - c5_s01_final_preparation

**Problem**: Resolved; effects now differ across choices (no identical outcomes)
**Impact**: Player feels agency is fake, erodes trust
**Example** (c4_s01a_double_reflection, jetzt differenziert):
```typescript
choices: [
  { id: 'try_to_understand', effects: [{ type: 'inc', target: 'tickets_truth', value: 2 }], next: 'c4_s01b_wrong_memory' },
  { id: 'ask_when', effects: [{ type: 'inc', target: 'tickets_truth', value: 2 }, { type: 'inc', target: 'memory_drift', value: 1 }], next: 'c4_s01b_wrong_memory' }
]
```
**Fix**: Applied distinct effects in all three scenes (memory_drift/attention changes)
**Status**: ✅ Fixed

---

### 7. WACKELT Problem (75+ scenes)
**Reference**: See `reports/qa_issues_list.md` for full list
**Problem**: All choices → same next scene with only minimal stat changes
**Impact**: Player frustration, "why did I choose?"
**Top 10 Offenders**:
1. c1_s03_carriage_choice (4 choices → c1_s04, only stat diffs)
2. c2_s02_recorder_decision (3 choices → c2_s03, only stat diffs)
3. c3_s04_comp7_exchange (4 choices → c3_s05, only stat diffs)
4. c4_s06_recorder_listen (3 choices → c4_s07, only stat diffs)
5. c5_s08_tag_discovery (3 choices → c5_s09, only stat diffs)
6. c6_s05_truth_moment (4 choices → c6_s06, only stat diffs)
7. c7_s12_final_choice (3 choices → c7_s13, only stat diffs)

**Fix**: Add narrative variants OR branch paths OR defer callbacks to +2 scenes
**Status**: 🟨 In Progress (23 scenes now have conditional follow-up choices)
**Progress**: c1_s01_platform, c1_s01a_platform_details, c1_interlude_01_lights, c1_s02_train_appears, c1_s02a_train_exterior, c1_interlude_02_silence, c1_s03a_corridor_walk, c1_s03b_find_seat, c1_interlude_03_window, c1_interlude_04_clock, c1_s05a_other_passengers, c1_s07_stranger_encounter, c2_interlude_02_window_dark, c2_interlude_03_announcement_glitch, c2_s03_comp7_intro, c2_end_platform_watch, c3_s02a_recorder_listening, c3_s04a_paradox_window, c4_s02b_recorder_loop, c4_s07a_drift_peak, c5_s08_abteil7_aftermath, c6_s10_sleepless_gone, c7_s06_announcement_distorted

---

### 8. Missing photo_anomaly Payoff
**File**: `src/content/nachtzug19/scenes/c7.ts`
**Problem**: Resolved; photo_anomaly now gates a conditional choice in Chapter 7
**Impact**: Player doesn't see consequence of earlier choice
**Fix**: Added `trace_anomaly` choice in `c7_s21_photo_revelation` (condition on `photo_anomaly`)
**Status**: ✅ Fixed

---

### 9. Missing Early Ticket Callbacks (C1/C2)
**Problem**: ticket.truth/escape/guilt/love not referenced until C3+
**Impact**: Player unsure if early choices matter
**Fix**: Added conditional choices in C2 tied to early tickets
**Details**:
- `c2_s01a_passenger_examination`: `decipher_headline` (tickets_truth >= 2)
- `c2_interlude_02_window_dark`: `avoid_window` (tickets_escape >= 2)
- `c2_interlude_03_announcement_glitch`: `look_for_boy` (tickets_love >= 1)
- `c2_end_platform_watch`: `lower_gaze` (tickets_guilt >= 2)
**Status**: ✅ Fixed

---

### 10. Low Choices/Chapter Metric
**Current**: 55-79 choices/chapter (audit_chapters.mjs; counts conditional choices)
**Target**: 30-45 choices/chapter
**Status**: ⚠️ Metric mismatch
**Impact**: Spec vs measurement is inconsistent; no clear deficit confirmed
**Fix**: Define metric (player-visible choices per run) and update audit pipeline

---

### 11. Low Words/Chapter Metric
**Current**: 2.1k-4.9k words/chapter (audit_chapters.mjs; narrative only)
**Target**: 5.0k-6.5k words/chapter
**Chapters Below Target**: C1 (3.1k), C2 (2.4k), C3 (4.9k), C4 (2.4k), C5 (2.3k), C6 (2.1k), C7 (3.0k)
**Impact**: Playtime below 30-35 minute target
**Fix**: Expand 3-5 scenes per chapter by 100-150 words (atmosphere, not plot)
**Status**: ⬜ Not Started

---

### 12. Missing has_tag19 Synesthetic Effects
**File**: `src/content/nachtzug19/scenes/c6.ts`, `c7.ts`
**Problem**: Tag 19 power-up described but not implemented in narrative variants
**Impact**: Player doesn't experience promised sensory enhancement
**Fix**: Add `has_tag19` conditional variants in 5-8 C6/C7 scenes with synesthetic prose
**Status**: ⬜ Not Started

---

## P2 - MEDIUM PRIORITY (Maintainability)

### 13. Low UI Test Coverage (18%)
**File**: `src/ui/player/PlayerIntegration.test.tsx` (only 84 lines)
**Problem**: Most UI components untested (ChoiceTray, ReaderCard, StatusDrawer)
**Impact**: Regressions not caught, refactoring risky
**Fix**: Add React Testing Library tests for core components
**Target**: 40%+ coverage
**Status**: ⬜ Not Started

---

### 14. Outdated Vitest Dependency
**File**: `package.json`
**Current**: `vitest: ^0.32.0` (June 2023)
**Latest**: `vitest: ^1.0.0+` (December 2023+)
**Impact**: Missing performance improvements, security patches
**Fix**: `npm install -D vitest@latest @vitest/ui@latest`
**Breaking Changes**: Minimal (check migration guide)
**Status**: ⬜ Not Started

---

### 15. Missing Android Build CI/CD
**File**: `docs/ANDROID_NATIVE_BUILD.md` (incomplete)
**Problem**: No automated build pipeline for Android APK
**Impact**: Manual release process, prone to errors
**Fix**: Add GitHub Actions workflow for Gradle builds
**Status**: ⬜ Not Started

---

### 16. Performance Optimization Opportunities
**File**: `src/domain/engine/gameEngine.ts:311`
**Problem**: Narrative variant sorting happens on every scene render
```typescript
const sortedVariants = [...scene.narrative_variants]
  .sort((a, b) => b.min_drift - a.min_drift);
```
**Impact**: Minor performance cost (not critical)
**Fix**: Memoize sorted variants or cache during content load
**Status**: ⬜ Not Started

---

## P3 - LOW PRIORITY (Quality of Life)

### 17. QA Report SHOULD-FIX Issues (77 items)
**Reference**: `reports/qa_issues_list.md`
**Categories**:
- **WACKELT scenes**: 75 scenes with same-next convergence
- **Sensory detail gaps**: 12 scenes missing atmosphere
- **Canon compliance**: 5 minor R3/R4 edge cases

**Impact**: Gradual quality improvements
**Fix**: Address incrementally over time
**Status**: ⬜ Not Started

---

## Progress Tracking

| Priority | Total | Fixed | In Progress | Not Started |
|----------|-------|-------|-------------|-------------|
| P0       | 5     | 5     | 0           | 0           |
| P1       | 7     | 3     | 0           | 4           |
| P2       | 4     | 0     | 0           | 4           |
| P3       | 77    | 0     | 0           | 77          |
| **TOTAL**| **93**| **8** | **0**       | **85**      |

---

## Recommended Fix Order

### Sprint 1: Critical Blockers (completed)
1. DONE: Fix 3 content format errors (empty effects, 5-choice scenes)
2. DONE: Fix 2 architectural violations (PlayerScreen.tsx, App.tsx)
3. DONE: Run validation suite: `npm test -- validateContent.test.ts`
4. DONE: Commit: "fix(p0): resolve critical format errors and architectural violations"

### Sprint 2: Quality Improvements (3-5 days)
5. DONE: Differentiate 3 FAKE-CHOICE scenes
6. DONE: Add photo_anomaly payoff to Chapter 7
7. DONE: Add early ticket callbacks to Chapter 2
8. Fix next 10 WACKELT scenes with conditional callbacks
9. Commit: "feat(p1): improve choice consequences and narrative branching"

### Sprint 3: Content Expansion (5-7 days)
10. Expand C1, C2, C4, C5 by 100-150 words/chapter
11. Add 5-10 new choice points per chapter
12. Implement has_tag19 synesthetic effects in C6/C7
13. Commit: "feat(p1): expand content to meet playtime targets"

### Sprint 4: Technical Debt (2-3 days)
14. Upgrade Vitest to 1.0+
15. Add UI component tests (target 40% coverage)
16. Document Android build process
17. Commit: "chore(p2): improve test coverage and update dependencies"

---

## Validation Commands

After fixes, run:
```bash
# Type checking
npm run type-check

# All tests
npm test

# Content validation
npm test -- validateContent.test.ts

# Integration test
npm test -- PlayerIntegration.test.tsx

# Build verification
npm run build
```

---

## Notes

- **Architecture Score**: 8.5/10 (excellent foundation)
- **Content Quality Score**: 8/10 (strong writing, needs consequence tuning)
- **Testing Score**: 6.5/10 (domain excellent, UI needs work)
- **Overall**: Production-ready with P0 fixes + selective P1 improvements

**Estimated Effort**:
- P0 fixes: 8-12 hours
- P1 improvements: 20-30 hours
- P2 technical debt: 10-15 hours
- P3 polish: Ongoing maintenance

**Risk Assessment**: Low - No fundamental architecture issues, all problems have clear solutions

---

*This document is automatically generated based on comprehensive analysis. Update status as issues are resolved.*
