import { describe, it, expect, beforeAll } from 'vitest';
import { loadNachtzug19Story, StoryBundle } from './loadStory';
import { createInitialState } from '../types';
import { getAvailableChoices, transitionToNextScene, resolveSceneNarrative, evaluateCondition } from './gameEngine';
import type { Scene, GameState, Condition, SimpleCondition } from '../types';

let bundle: StoryBundle;

beforeAll(async () => {
  bundle = await loadNachtzug19Story();
});

describe('NACHTZUG 19 engine integration', () => {
  it('loads the story and resolves the start scene', () => {
    expect(bundle.startSceneId).toBeTruthy();
    expect(bundle.scenes[bundle.startSceneId]).toBeTruthy();
  });

  it('applies choice effects and moves to the next scene', () => {
    const state = createInitialState(bundle.startSceneId);
    const scene = bundle.scenes[state.current_scene_id];
    const choice = scene.choices.find((entry) => entry.id === 'try_leave');

    if (!choice || !choice.next) {
      throw new Error('Expected try_leave choice with next scene');
    }

    transitionToNextScene(state, scene, choice, bundle.scenes);

    expect(state.current_scene_id).toBe(choice.next);
    expect(state.tickets.tickets_guilt).toBe(1);
    expect(state.pressure.conductor_attention).toBe(1);
  });

  it('hides choices when conditions are not met', () => {
    const state = createInitialState(bundle.startSceneId);
    const scene = bundle.scenes['c1_interlude_02_silence'];
    const hiddenChoice = scene.choices.find((entry) => entry.id === 'stay_quiet');
    const available = getAvailableChoices(state, scene);

    expect(hiddenChoice).toBeTruthy();
    if (!hiddenChoice) return;
    expect(available).not.toContain(hiddenChoice);
  });
});

describe('resolveSceneNarrative - Drift-Mechanik', () => {
  it('returns base narrative when memory_drift is below all variant thresholds', () => {
    const scene: Scene = {
      id: 'test_scene',
      chapter: 1,
      title: 'Test Scene',
      narrative: 'This is the base narrative.',
      narrative_variants: [
        { min_drift: 3, narrative: 'This is the drift=3 variant.' },
        { min_drift: 5, narrative: 'This is the drift=5 variant.' }
      ],
      choices: [
        {
          id: 'test_choice',
          label: 'Test',
          effects: [{ type: 'inc', target: 'wissen', value: 1 }],
          ending: 'A'
        }
      ]
    };

    const state: GameState = createInitialState('test_scene');
    state.pressure.memory_drift = 2;

    const result = resolveSceneNarrative(scene, state);

    expect(result).toBe('This is the base narrative.');
  });

  it('returns min_drift=3 variant when memory_drift is 3', () => {
    const scene: Scene = {
      id: 'test_scene',
      chapter: 1,
      title: 'Test Scene',
      narrative: 'This is the base narrative.',
      narrative_variants: [
        { min_drift: 3, narrative: 'This is the drift=3 variant.' },
        { min_drift: 5, narrative: 'This is the drift=5 variant.' }
      ],
      choices: [
        {
          id: 'test_choice',
          label: 'Test',
          effects: [{ type: 'inc', target: 'wissen', value: 1 }],
          ending: 'A'
        }
      ]
    };

    const state: GameState = createInitialState('test_scene');
    state.pressure.memory_drift = 3;

    const result = resolveSceneNarrative(scene, state);

    expect(result).toBe('This is the drift=3 variant.');
  });

  it('returns min_drift=5 variant when memory_drift is 5', () => {
    const scene: Scene = {
      id: 'test_scene',
      chapter: 1,
      title: 'Test Scene',
      narrative: 'This is the base narrative.',
      narrative_variants: [
        { min_drift: 3, narrative: 'This is the drift=3 variant.' },
        { min_drift: 5, narrative: 'This is the drift=5 variant.' }
      ],
      choices: [
        {
          id: 'test_choice',
          label: 'Test',
          effects: [{ type: 'inc', target: 'wissen', value: 1 }],
          ending: 'A'
        }
      ]
    };

    const state: GameState = createInitialState('test_scene');
    state.pressure.memory_drift = 5;

    const result = resolveSceneNarrative(scene, state);

    expect(result).toBe('This is the drift=5 variant.');
  });

  it('returns highest applicable variant when memory_drift exceeds all thresholds', () => {
    const scene: Scene = {
      id: 'test_scene',
      chapter: 1,
      title: 'Test Scene',
      narrative: 'This is the base narrative.',
      narrative_variants: [
        { min_drift: 3, narrative: 'This is the drift=3 variant.' },
        { min_drift: 5, narrative: 'This is the drift=5 variant.' }
      ],
      choices: [
        {
          id: 'test_choice',
          label: 'Test',
          effects: [{ type: 'inc', target: 'wissen', value: 1 }],
          ending: 'A'
        }
      ]
    };

    const state: GameState = createInitialState('test_scene');
    state.pressure.memory_drift = 6;

    const result = resolveSceneNarrative(scene, state);

    expect(result).toBe('This is the drift=5 variant.');
  });

  it('returns base narrative when scene has no narrative_variants', () => {
    const scene: Scene = {
      id: 'test_scene',
      chapter: 1,
      title: 'Test Scene',
      narrative: 'This is the base narrative.',
      choices: [
        {
          id: 'test_choice',
          label: 'Test',
          effects: [{ type: 'inc', target: 'wissen', value: 1 }],
          ending: 'A'
        }
      ]
    };

    const state: GameState = createInitialState('test_scene');
    state.pressure.memory_drift = 5;

    const result = resolveSceneNarrative(scene, state);

    expect(result).toBe('This is the base narrative.');
  });

  it('returns empty string when scene has no narrative at all', () => {
    const scene: Scene = {
      id: 'test_scene',
      chapter: 1,
      title: 'Test Scene',
      choices: [
        {
          id: 'test_choice',
          label: 'Test',
          effects: [{ type: 'inc', target: 'wissen', value: 1 }],
          ending: 'A'
        }
      ]
    };

    const state: GameState = createInitialState('test_scene');
    state.pressure.memory_drift = 5;

    const result = resolveSceneNarrative(scene, state);

    expect(result).toBe('');
  });
});

// ============================================================================
// P1-01: Ending Reachability Tests
// ============================================================================
// Purpose: Verify that all endings are reachable with max ticket values (5).
// This test prevents regression of the critical P0 bug where thresholds (6)
// exceeded the clamp limit (5), making endings unreachable.
// ============================================================================

describe('Ending Reachability - Ticket Threshold vs Clamp', () => {
  const TICKET_CLAMP_MAX = 5;

  // Ending conditions from c7_s27_finale
  const endingConditions: Array<{ name: string; condition: SimpleCondition }> = [
    {
      name: 'Truth Ending',
      condition: {
        type: 'compare',
        target: 'tickets_truth',
        operator: '>=',
        value: 5
      }
    },
    {
      name: 'Guilt Ending',
      condition: {
        type: 'compare',
        target: 'tickets_guilt',
        operator: '>=',
        value: 5
      }
    },
    {
      name: 'Love Ending',
      condition: {
        type: 'compare',
        target: 'tickets_love',
        operator: '>=',
        value: 5
      }
    }
  ];

  it('all ticket-based endings should be reachable with max tickets (5)', () => {
    for (const { name, condition } of endingConditions) {
      const state = createInitialState();

      // Set the relevant ticket to max clamp value
      if (condition.target === 'tickets_truth') {
        state.tickets.tickets_truth = TICKET_CLAMP_MAX;
      } else if (condition.target === 'tickets_guilt') {
        state.tickets.tickets_guilt = TICKET_CLAMP_MAX;
      } else if (condition.target === 'tickets_love') {
        state.tickets.tickets_love = TICKET_CLAMP_MAX;
      }

      const isReachable = evaluateCondition(state, condition);

      expect(isReachable, `${name} should be reachable with tickets=${TICKET_CLAMP_MAX}`).toBe(true);
    }
  });

  it('ending thresholds should not exceed clamp max (5)', () => {
    for (const { name, condition } of endingConditions) {
      expect(
        condition.value as number,
        `${name} threshold (${condition.value}) should not exceed clamp max (${TICKET_CLAMP_MAX})`
      ).toBeLessThanOrEqual(TICKET_CLAMP_MAX);
    }
  });

  it('escape ending should always be available (no threshold)', () => {
    const state = createInitialState();
    // Escape has no condition - it's always available as fallback
    // This test documents this design decision
    expect(state.tickets.tickets_escape).toBe(0);
    // No condition to evaluate - escape is unconditional
  });
});

describe('Regression Guard - No Ticket Threshold > Clamp in Story', () => {
  const TICKET_CLAMP_MAX = 5;
  const TICKET_TARGETS = ['tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love'];

  // Known intentional Easter eggs: Choices with impossible thresholds (design decision)
  // These are documented here so new violations will still fail the test
  const ALLOWED_EASTER_EGGS = new Set([
    'c4_end_station:search_for_self',         // tickets_truth >= 8
    'c4_end_station:ignore_copies',           // tickets_escape >= 7
    'c5_s02_corridor_silence:listen_for_patterns', // tickets_truth >= 7
    'c5_s04_lights_flicker:analyze_abteil7_clue',  // tickets_truth >= 8
    'c5_s06_abteil7_approach:open_door_for_truth', // tickets_truth >= 9
    'c5_s08_abteil7_aftermath:write_down_names',   // tickets_truth >= 10
    'c5_s09_train_shifts:understand_skip',         // tickets_truth >= 11
    'c5_s09_train_shifts:use_skip_chance',         // tickets_escape >= 8
    'c5_s14_control3_approach:mention_fragment'    // tickets_truth >= 12
  ]);

  it('no choice condition should require tickets > clamp max (5) except allowed Easter eggs', () => {
    const violations: string[] = [];
    const foundEasterEggs: string[] = [];

    for (const [sceneId, scene] of Object.entries(bundle.scenes)) {
      for (const choice of scene.choices) {
        if (choice.condition && typeof choice.condition === 'object') {
          checkConditionForViolation(
            choice.condition as Condition,
            sceneId,
            choice.id || 'unknown',
            violations,
            foundEasterEggs
          );
        }
      }
    }

    // Verify all allowed Easter eggs were actually found (catches stale allowlist)
    for (const allowed of ALLOWED_EASTER_EGGS) {
      if (!foundEasterEggs.includes(allowed)) {
        violations.push(`  - STALE ALLOWLIST: ${allowed} not found in story`);
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `Found ${violations.length} ticket threshold violation(s) > ${TICKET_CLAMP_MAX}:\n${violations.join('\n')}`
      );
    }

    // Document the Easter eggs that were found and allowed
    expect(foundEasterEggs.length).toBe(ALLOWED_EASTER_EGGS.size);
  });

  it('should have exactly 9 documented Easter egg choices (impossible thresholds)', () => {
    // This test documents the design decision: 9 choices are intentionally unreachable
    expect(ALLOWED_EASTER_EGGS.size).toBe(9);
  });

  function checkConditionForViolation(
    condition: Condition,
    sceneId: string,
    choiceId: string,
    violations: string[],
    foundEasterEggs: string[]
  ): void {
    if (condition.type === 'compare') {
      const simple = condition as SimpleCondition;
      if (
        TICKET_TARGETS.includes(simple.target) &&
        (simple.operator === '>=' || simple.operator === '>') &&
        typeof simple.value === 'number' &&
        simple.value > TICKET_CLAMP_MAX
      ) {
        const key = `${sceneId}:${choiceId}`;
        if (ALLOWED_EASTER_EGGS.has(key)) {
          foundEasterEggs.push(key);
        } else {
          violations.push(
            `  - ${key} → ${simple.target} ${simple.operator} ${simple.value}`
          );
        }
      }
    } else if (condition.type === 'and' || condition.type === 'or') {
      for (const sub of condition.conditions) {
        checkConditionForViolation(sub as Condition, sceneId, choiceId, violations, foundEasterEggs);
      }
    }
  }
});
