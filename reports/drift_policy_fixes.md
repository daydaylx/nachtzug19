# NACHTZUG 19 - Drift Policy Fixes

## Executive Summary

**Problem**: Historisch doppelte drift-Inkremente + gemischte station_end-Overrides (Docs vs Code).
**Solution**: exit_effects entfernt, station_end-Choice-Effects standardisiert (Default via Engine, Overrides explizit).
**Result**: Default +1 pro Station, keine Doppelzaehlung; Overrides bleiben bewusst sichtbar.

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
Historisch: station_end-Szenen hatten **exit_effects** fuer memory_drift, obwohl die Engine bereits auto-incrementiert.  
Zusaetzlich: station_end-Choices setzten drift/station_count teils manuell, teils nicht, was die Doku inkonsistent machte.

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

**Impact**: Default-Inkrement erfolgt nur ueber Engine-R1.

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

**Impact**: station_count wird ueber Engine-R1 konsistent erhoeht

### Fix 3: Standardize station_end choice effects (c1-c6)
**Change**: Entfernt manuelle `memory_drift`/`station_count` Effekte aus Standard-Choices;  
**Exception**: Explizite Overrides bleiben (z.B. c1_end_station/confront_jacket_change mit memory_drift +2).

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
- ✅ **R1 (Drift nach Station)**: Default +1 pro Station, Overrides explizit und bewusst
- ✅ **R2 (Kontrollen)**: All control scenes properly modify required state variables
- ✅ **Engine Integration**: Automatic R1 rule remains intact and functional
- ✅ **Content Cleanup**: No redundant effects, cleaner state management

## Technical Impact

### Before Fix
- memory_drift progression: +2 pro Station durch exit_effects (WRONG)
- station_count progression: c7 hatte +2 (WRONG)

### After Fix  
- memory_drift progression: Default +1 pro Station (Overrides moeglich)
- station_count progression: Default +1 pro Station (Engine)

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
✅ **Minimal content changes** - nur Effects/State Notes standardisiert
✅ **All validation tests pass** - 0 errors, 0 warnings
✅ **Minimal invasive approach** - only removed redundant code

The drift policy is now exactly as specified in the documentation, with clean separation between engine rules and content storytelling.
