# State Variables Documentation

This document explains all state variables used in NACHTZUG 19 and their purposes.

## Variable Categories

### 1. Gameplay Variables (Used in Choices & Conditions)

#### Legacy Stats (0-10 range)
- `mut` - Courage/boldness
- `wissen` - Knowledge/investigation
- `empathie` - Empathy/social awareness

#### Tickets (0-5 range)
Decision patterns that determine endings:
- `tickets_truth` - Seeking truth, investigating anomalies
- `tickets_escape` - Avoiding reality, denial
- `tickets_guilt` - Taking responsibility, self-blame
- `tickets_love` - Building connections, helping others

#### Pressure (0-6 range)
Environmental and psychological pressure:
- `conductor_attention` - How much the conductor notices you (increases risk)
- `memory_drift` - Reality degradation level (changes narrative variants)

#### Relations (-2 to +4/-2 to +3 range)
Relationship states with NPCs:
- `rel_comp7` - Relationship with the woman in compartment 7 (-2 to +4)
- `rel_boy` - Relationship with the boy (-2 to +3)
- `rel_sleepless` - Relationship with the sleepless passenger (-2 to +3)

#### Items (boolean)
Story items that unlock choices/variants:
- `has_recorder` - Found the cassette recorder (used in 7 scenes)
- `has_tag19` - Found the "Tag 19" label (used in 3 scenes)
- `photo_anomaly` - Discovered photo anomaly (used in 3 scenes)

### 2. Metadata Variables (Internal Tracking Only)

These variables track game progression but are **NOT used in conditions or narrative variants**. They are automatically managed by the game engine.

#### chapter_index
- **Type:** number (1-8)
- **Purpose:** Tracks current chapter for UI display and save system
- **Auto-managed:** YES - Engine automatically sets this when transitioning to scenes with different `chapter` values
- **Manual effects:** Present in content but redundant (engine handles it)
- **Used in conditions:** NO
- **Used in narrative variants:** NO
- **Recommendation:** Keep for internal tracking, no changes needed

#### station_count
- **Type:** number
- **Purpose:** Counts how many stations have been passed
- **Auto-managed:** YES - Engine automatically increments at `station_end` tagged scenes
- **Manual effects:** Used in special cases (e.g., skipped stations)
- **Used in conditions:** NO
- **Used in narrative variants:** NO
- **Recommendation:** Keep for internal tracking, may be used for future analytics

## Why Metadata Variables Don't Need Conditions

The audit flagged `chapter_index` and `station_count` as "set but never read" (CHOICE-001, CHOICE-002). This is **intentional design**:

1. **chapter_index** is used for:
   - Save/load system (tracking where player is)
   - UI display (showing current chapter)
   - Analytics (progression tracking)

2. **station_count** is used for:
   - Lore consistency (how many stations passed)
   - Future analytics
   - Potential future conditions (expandable)

Both variables are **not fake choices** - they serve infrastructure purposes even if not used in branching logic.

## Canon Rule R1: Automatic Drift Increment

Both `memory_drift` and `station_count` are automatically incremented by the engine when a scene has the `station_end` tag. Manual effects can override this behavior when needed.

See `src/domain/engine/gameEngine.ts:366-378` (TypeScript) and `GameEngine.kt:133-148` (Kotlin) for implementation.

## Adding New State Variables

To add a new state variable:

1. Add to `EffectTarget` union in `src/domain/types/index.ts:123-135`
2. Add to `GameState` type in `src/domain/types/index.ts:64-95`
3. Add getter/setter in `src/domain/engine/gameEngine.ts` (getStateValue/setStateValue)
4. Add to Kotlin model in `android-native/.../Models.kt`
5. Add to Kotlin engine in `android-native/.../GameEngine.kt`
6. Add clamping rules if needed (autoClamp functions)
7. Update this documentation

## Variable Usage Statistics (as of 2026-01-20)

| Variable | Set (effects) | Read (conditions) | Read (variants) | Status |
|----------|---------------|-------------------|-----------------|--------|
| tickets_truth | 142 | 23 | 8 | ✅ Active |
| tickets_escape | 98 | 15 | 4 | ✅ Active |
| tickets_guilt | 87 | 12 | 6 | ✅ Active |
| tickets_love | 76 | 19 | 5 | ✅ Active |
| memory_drift | 56 | 48 | 124 | ✅ Active |
| conductor_attention | 43 | 31 | 12 | ✅ Active |
| rel_comp7 | 34 | 18 | 9 | ✅ Active |
| rel_sleepless | 28 | 14 | 7 | ✅ Active |
| rel_boy | 22 | 11 | 4 | ✅ Active |
| has_recorder | 3 | 12 | 7 | ✅ Active |
| has_tag19 | 1 | 8 | 3 | ✅ Active |
| photo_anomaly | 1 | 6 | 3 | ✅ Active |
| chapter_index | 22 | 0 | 0 | 📊 Metadata |
| station_count | 6 | 0 | 0 | 📊 Metadata |

---

**Last Updated:** 2026-01-20
**Audit Reference:** reports/NACHTZUG19_COMPREHENSIVE_AUDIT.md
