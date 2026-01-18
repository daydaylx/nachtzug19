# NACHTZUG 19 - Drift Policy Fixes

## Executive Summary

**Problem**: Duplicate memory_drift increments causing +2 per station instead of +1 as per Canon Rule R1.
**Solution**: Removed redundant exit_effects from all station_end scenes.
**Result**: memory_drift now increases by exactly +1 per station as specified in policy.

## Policy Reference

### Canon Rule R1 (from docs/NACHTZUG_19_RULES.md)
> **R1: Stationen verursachen Drift**
> Nach jedem Kapitelabschluss (Station):
> - entweder `memory_drift += 1`
> - oder es passiert eine definierte "Korrektur"
> **Niemals:** Station ohne Konsequenz.

### Implementation (from src/domain/engine/gameEngine.ts)
The engine automatically implements R1 when a scene has the `station_end` tag:
```typescript
// Lines 354-358
if (currentScene.tags?.includes('station_end')) {
  // Erhöhe memory_drift automatisch
  state.pressure.memory_drift += 1;
  state.station_count += 1;
  console.log(`[Canon Rule R1] Station-Ende erkannt: memory_drift +1, station_count=${state.station_count}`);
}
```

## Problem Analysis

### Root Cause
All station_end scenes (c1-c7) had **duplicate** memory_drift increments:
1. **Engine automatic**: `memory_drift += 1` (via station_end tag detection)
2. **Manual exit_effects**: `memory_drift += 1` (in scene definition)

**Result**: `memory_drift += 2` per station instead of `memory_drift += 1`

### Affected Scenes
- `c1_end_station` (c1.ts)
- `c2_end_station` (c2.ts)  
- `c3_end_station` (c3.ts)
- `c4_end_station` (c4.ts)
- `c5_end_station` (c5.ts)
- `c6_end_station` (c6.ts)
- `c7_end_station` (c7.ts) - also had duplicate station_count increment

## Fixes Applied

### Fix 1: Remove duplicate memory_drift exit_effects (c1-c6)
**Files Modified**: `src/content/nachtzug19/scenes/c1.ts` through `c6.ts`

**Before**:
```typescript
tags: ['station_end'],
exit_effects: [
  { type: 'inc', target: 'memory_drift', value: 1 }
],
state_notes: [
  'Station-End: memory_drift +1 (R1)',
  // ... other notes
]
```

**After**:
```typescript
tags: ['station_end'],
state_notes: [
  'Station-End: memory_drift automatisch erhöht durch Engine-R1 (keine manuellen exit_effects)',
  // ... other notes
]
```

**Impact**: memory_drift now increases by exactly +1 per station (chapters 1-6)

### Fix 2: Remove duplicate station_count exit_effect (c7)
**File Modified**: `src/content/nachtzug19/scenes/c7.ts`

**Before**:
```typescript
tags: ['station_end'],
exit_effects: [
  { type: 'inc', target: 'station_count', value: 1 }
],
state_notes: [
  'Station-End: Finale - Zug verblasst (1973 aufgelöst)',
  'ENDINGS: Truth, Escape, Guilt, Love (je nach Tickets)'
]
```

**After**:
```typescript
tags: ['station_end'],
state_notes: [
  'Station-End: Finale - Zug verblasst (1973 aufgelöst)',
  'ENDINGS: Truth, Escape, Guilt, Love (je nach Tickets)',
  'station_count automatisch erhöht durch Engine (keine manuellen exit_effects)'
]
```

**Impact**: station_count now increases by exactly +1 for final station

## Control Rules Verification (R2)

### Canon Rule R2 (from docs/NACHTZUG_19_RULES.md)
> **R2: Kontrollen sind feste Gatepoints**
> Kontrollen passieren immer in:
> - Kapitel 2 (Kontrolle 1)
> - Kapitel 3 (Kontrolle 2)  
> - Kapitel 5 (Kontrolle 3 final)
> 
> Kontrollen müssen mindestens eine dieser Größen verändern:
> - `tickets_*`
> - `conductor_attention`
> - eine Beziehung

### Verification Results
✅ **All control scenes properly implemented**

**Chapter 2 Control** (`c2_control_01_question`):
- Modifies: `tickets_truth`, `tickets_love`, `tickets_escape`, `conductor_attention`
- Compliant with R2

**Chapter 3 Control** (`c3_control_02_question`):
- Modifies: `tickets_guilt`, `tickets_truth`, `conductor_attention`, `has_recorder`
- Compliant with R2

**Chapter 5 Control** (verified in audit reports):
- Modifies: `tickets_*` and `conductor_attention`
- Compliant with R2

**No changes needed** - control scenes were already properly implemented.

## Validation Results

### Content Validation
```
✅ Story geladen: 180 Szenen, 5 Endings
✅ Content-Validierung erfolgreich
Zusammenfassung: 0 Errors, 0 Warnings
✅ Alle Checks bestanden!
```

### Policy Compliance
- ✅ **R1 (Drift nach Station)**: Now correctly implements +1 memory_drift per station
- ✅ **R2 (Kontrollen)**: All control scenes properly modify required state variables
- ✅ **Engine Integration**: Automatic R1 rule remains intact and functional
- ✅ **Content Cleanup**: No redundant effects, cleaner state management

## Technical Impact

### Before Fix
- memory_drift progression: 0 → 2 → 4 → 6 → 8 → 10 → 12 (WRONG)
- station_count progression: 0 → 1 → 2 → 3 → 4 → 5 → 7 (c7 had +2)

### After Fix  
- memory_drift progression: 0 → 1 → 2 → 3 → 4 → 5 → 6 (CORRECT)
- station_count progression: 0 → 1 → 2 → 3 → 4 → 5 → 6 (CORRECT)

### Benefits
1. **Policy Compliance**: Exact implementation of R1 as documented
2. **Clean Architecture**: Engine handles canon rules, content handles story
3. **Maintainability**: Single source of truth for drift logic
4. **Predictability**: Consistent state progression across all stations
5. **Testability**: Easier to validate and debug drift-related issues

## Files Modified

### Scene Files (7 total)
- `src/content/nachtzug19/scenes/c1.ts` - Removed memory_drift exit_effect
- `src/content/nachtzug19/scenes/c2.ts` - Removed memory_drift exit_effect
- `src/content/nachtzug19/scenes/c3.ts` - Removed memory_drift exit_effect
- `src/content/nachtzug19/scenes/c4.ts` - Removed memory_drift exit_effect
- `src/content/nachtzug19/scenes/c5.ts` - Removed memory_drift exit_effect
- `src/content/nachtzug19/scenes/c6.ts` - Removed memory_drift exit_effect
- `src/content/nachtzug19/scenes/c7.ts` - Removed station_count exit_effect

### Documentation
- `reports/drift_policy_fixes.md` - This comprehensive fix report

## Conclusion

✅ **Policy R1 fully implemented** - memory_drift increases by exactly +1 per station
✅ **Policy R2 verified compliant** - all control scenes properly implemented  
✅ **No story content changed** - only technical cleanup
✅ **All validation tests pass** - 0 errors, 0 warnings
✅ **Minimal invasive approach** - only removed redundant code

The drift policy is now exactly as specified in the documentation, with clean separation between engine rules and content storytelling.