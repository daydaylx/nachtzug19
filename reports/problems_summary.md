# NACHTZUG 19 - Problem Summary & Action Plan

**Generated**: 2026-01-18
**Project Status**: Content Complete (7 chapters, 183 scenes)
**Overall Assessment**: 8.5/10 (Production-ready with minor fixes needed)

## Executive Summary

**Total Issues Identified**: 93
- **P0 (Blocker)**: 5 issues - Must fix before release
- **P1 (High Priority)**: 7 issues - Important for quality
- **P2 (Medium Priority)**: 4 issues - Improve long-term maintainability
- **P3 (Low Priority)**: 77 issues - Enhancement opportunities

**Critical Path**: Fix 5 P0 issues → Address P1 quality concerns → Production-ready

---

## P0 - BLOCKER (Must Fix Before Release)

### 1. Content Format Error: c1_interlude_01_lights
**File**: `src/content/nachtzug19/scenes/c1.ts`
**Location**: Scene ID `c1_interlude_01_lights`
**Problem**: Choice 'continue' has empty `effects[]` array
**Violates**: Canon Rule R3 (Every Choice Has Callback)
**Impact**: Breaks validation rules, violates player contract
**Fix**:
```typescript
effects: [
  { type: 'inc', target: 'pressure.memory_drift', value: 1 },
  { type: 'set', target: 'items.noticed_lights', value: true }
]
```
**Status**: ⬜ Not Started

---

### 2. Content Format Error: c3_control_02_question
**File**: `src/content/nachtzug19/scenes/c3.ts`
**Location**: Scene ID `c3_control_02_question`
**Problem**: Scene has 5 choices (exceeds 4-choice limit)
**Violates**: Format Rule CF-2 (Max 4 choices per scene)
**Impact**: UI design assumes max 4 choices, may cause layout issues
**Fix**: Merge "reveal_truth" and "test_limits" into single "challenge" option
**Status**: ⬜ Not Started

---

### 3. Content Format Error: c5_s10_boy_reunion
**File**: `src/content/nachtzug19/scenes/c5.ts`
**Location**: Scene ID `c5_s10_boy_reunion`
**Problem**: Scene has 5 choices (exceeds 4-choice limit)
**Violates**: Format Rule CF-2 (Max 4 choices per scene)
**Impact**: UI design assumes max 4 choices, may cause layout issues
**Fix**: Merge "share_pain" and "acknowledge_loss" into "be_honest" option
**Status**: ⬜ Not Started

---

### 4. Architectural Violation: PlayerScreen.tsx
**File**: `src/ui/player/PlayerScreen.tsx:3`
**Problem**: Direct import from domain/engine layer
```typescript
import { resolveSceneNarrative } from '../../domain/engine/gameEngine';
```
**Violates**: Layer separation (UI should only import from domain/types)
**Impact**: Creates tight coupling, breaks architecture
**Fix**: Export `resolveSceneNarrative` from `domain/types/index.ts` or create UI adapter
**Status**: ⬜ Not Started

---

### 5. React Hooks Violation: App.tsx
**File**: `src/app/App.tsx:102`
**Problem**: `useEffect` inside conditional rendering
```typescript
if (gameMode === 'player') {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { ... }, [engine]);
}
```
**Violates**: React Rules of Hooks
**Impact**: Unpredictable behavior, ESLint disabled
**Fix**: Extract to custom hook or move outside conditional
**Status**: ⬜ Not Started

---

## P1 - HIGH PRIORITY (Quality Impact)

### 6. FAKE-CHOICE Problem (3 scenes)
**Files**:
- `src/content/nachtzug19/scenes/c4.ts` - c4_s01a_waking
- `src/content/nachtzug19/scenes/c4.ts` - c4_s02_disorientation
- `src/content/nachtzug19/scenes/c5.ts` - c5_s01_wake

**Problem**: All choices have identical effects AND identical next scene
**Impact**: Player feels agency is fake, erodes trust
**Example** (c4_s01a):
```typescript
choices: [
  { effects: [{ inc: 'mut', value: 1 }], next: 'c4_s03_corridor' },
  { effects: [{ inc: 'mut', value: 1 }], next: 'c4_s03_corridor' }
]
```
**Fix**: Different stat effects OR branching next scenes OR remove illusion
**Status**: ⬜ Not Started

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
**Status**: ⬜ Not Started

---

### 8. Missing photo_anomaly Payoff
**File**: `src/content/nachtzug19/scenes/c7.ts`
**Problem**: `items.photo_anomaly` set in C4/C5 but never referenced in Chapter 7
**Impact**: Player doesn't see consequence of earlier choice
**Fix**: Add conditional in c7_s15+ that references photo if `state.items.photo_anomaly === true`
**Status**: ⬜ Not Started

---

### 9. Missing Early Ticket Callbacks (C1/C2)
**Problem**: ticket.truth/escape/guilt/love not referenced until C3+
**Impact**: Player unsure if early choices matter
**Fix**: Add 2-3 subtle callbacks in C2 that echo C1 ticket patterns
**Suggestion**:
- C2 NPC dialogue changes if `ticket.truth >= 2`
- C2 station description varies with `ticket.escape >= 2`
**Status**: ⬜ Not Started

---

### 10. Low Choices/Chapter Metric
**Current**: 26 choices/chapter (avg)
**Target**: 30-45 choices/chapter
**Chapters Below Target**: All except C7
**Impact**: Reduced player agency, shorter playtime
**Fix**: Add 5-10 new choice points per chapter (atmosphere scenes → decision scenes)
**Status**: ⬜ Not Started

---

### 11. Low Words/Chapter Metric
**Current**: 4.4k-5.3k words/chapter
**Target**: 5.0k-6.5k words/chapter
**Chapters Below Target**: C1 (4.4k), C2 (4.5k), C4 (4.8k), C5 (4.9k)
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
| P0       | 5     | 0     | 0           | 5           |
| P1       | 7     | 0     | 0           | 7           |
| P2       | 4     | 0     | 0           | 4           |
| P3       | 77    | 0     | 0           | 77          |
| **TOTAL**| **93**| **0** | **0**       | **93**      |

---

## Recommended Fix Order

### Sprint 1: Critical Blockers (1-2 days)
1. Fix 3 content format errors (empty effects, 5-choice scenes)
2. Fix 2 architectural violations (PlayerScreen.tsx, App.tsx)
3. Run validation suite: `npm test -- validateContent.test.ts`
4. Commit: "fix(p0): resolve critical format errors and architectural violations"

### Sprint 2: Quality Improvements (3-5 days)
5. Differentiate 3 FAKE-CHOICE scenes
6. Add photo_anomaly payoff to Chapter 7
7. Add early ticket callbacks to Chapter 2
8. Fix top 10 WACKELT scenes with narrative variants
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
