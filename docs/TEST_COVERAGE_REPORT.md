# Test Coverage Report - NACHTZUG 19

Date: 2026-01-31  
Tooling: Vitest v4 + v8 coverage  
Command: `npm run test:coverage`

## Baseline (Phase 0)
- Tests: 22 passing (2 files)
- Coverage script: **missing** (`npm run test:coverage` failed)
- Measured coverage: **not available**
- Lint script: missing

## Current Coverage (Phase 4 run)
Overall (all included src/**/*.ts):
- Statements: **84.60%**
- Branches: **80.95%**
- Functions: **83.13%**
- Lines: **84.05%**

Key directories:
- src/domain/engine: **84.44%** statements, **80.90%** branches
- src/domain/types: **100%**
- src/content/nachtzug19 (manifest + scenes): **~100%**

Report artifacts:
- `coverage/lcov.info`
- `coverage/lcov-report/index.html`

## Top 20 Uncovered Lines/Branches (Domain/Engine/Validator)
Based on `coverage/lcov.info` (DA:line,0).

### src/domain/engine/gameEngine.ts (10)
1. Line 65: `getStateValue` unknown target error path
2. Line 105: `setStateValue` unknown target error path
3. Line 132: decrement non-numeric target guard
4. Line 143: clamp non-numeric target guard
5. Line 147: clamp min branch (unused boundary condition)
6. Line 155: unknown effect type error path
7. Line 162: `effect.note` logging branch
8. Line 218: unknown condition type error path
9. Line 228: `compare` operator `==` branch
10. Line 240: unknown comparison operator error path

### src/domain/engine/validateContent.ts (10)
1. Line 109: choice missing both `next` and `ending`
2. Line 129: choice refers to unknown ending id
3. Line 193: unknown condition target in `choice.condition`
4. Line 216: scene with zero choices
5. Line 221: early return after "no choices" error
6. Line 242: entry effect unknown type
7. Line 249: entry effect unknown target
8. Line 259: exit effect unknown type
9. Line 267: exit effect unknown target
10. Line 279: state_notes > 5 warning

## Notable Gaps / Risks
- Engine `index.ts` re-export file is currently uncovered (0%).
- `resolveSceneNarrative` replace_mode behavior is untested (overlay vs full).
- Validator `printValidationResult` remains untested (console output).
- Some error paths intentionally untested (e.g., unknown targets/operators).

## Doc vs Runtime Mismatch (Tracking)
- Docs list ticket range 0–5 and relations -2..+4.
- Runtime clamps tickets to 0–50 and relations to -2..10 (engine comment).
- Tests document current behavior; consider aligning docs or adjusting clamps.

## Next Steps
1. Add targeted tests for remaining error branches (optional).
2. Consider excluding pure re-export files from coverage (engine/index.ts).
3. Add Android UI test harness if Kotlin tests are in scope.

