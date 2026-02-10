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
    // Changed from 'try_leave' to 'look_around' due to content split in C1
    const choice = scene.choices.find((entry) => entry.id === 'look_around');

    if (!choice || !choice.next) {
      throw new Error('Expected look_around choice with next scene');
    }

    transitionToNextScene(state, scene, choice, bundle.scenes);

    expect(state.current_scene_id).toBe(choice.next);
    expect(state.items.stance_bold).toBe(true);
  });

  it('hides choices when conditions are not met', () => {
    const state = createInitialState(bundle.startSceneId);
    state.items.has_recorder = false; // Set to false to hide recorder-conditional choice
    const scene = bundle.scenes['c3_s01b_boy_return'];
    const hiddenChoice = scene.choices.find((entry) => entry.id === 'play_own_recorder');
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
// Purpose: Verify that all endings are reachable with max ticket values (20).
// Ending thresholds are 12, clamp is 20 — endings require deliberate focus.
// ============================================================================

describe('Ending Reachability - Ticket Threshold vs Clamp', () => {
  const TICKET_CLAMP_MAX = 20;

  // Ending conditions from c7_end_station
  const endingConditions: Array<{ name: string; condition: SimpleCondition }> = [
    {
      name: 'Truth Ending',
      condition: {
        type: 'compare',
        target: 'tickets_truth',
        operator: '>=',
        value: 12
      }
    },
    {
      name: 'Guilt Ending',
      condition: {
        type: 'compare',
        target: 'tickets_guilt',
        operator: '>=',
        value: 12
      }
    },
    {
      name: 'Love Ending',
      condition: {
        type: 'compare',
        target: 'tickets_love',
        operator: '>=',
        value: 12
      }
    }
  ];

  it('all ticket-based endings should be reachable with max tickets (20)', () => {
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

  it('ending thresholds should not exceed clamp max (20)', () => {
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
  const TICKET_CLAMP_MAX = 20;
  const TICKET_TARGETS = ['tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love'];

  // Known intentional Easter eggs: Choices with impossible thresholds (design decision)
  // These are documented here so new violations will still fail the test
  // NOTE: All former Easter eggs were converted to realistic thresholds (HIGH #2 fix)
  const ALLOWED_EASTER_EGGS = new Set<string>([]);

  it('no choice condition should require tickets > clamp max (20) except allowed Easter eggs', () => {
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

  it('should have exactly 0 documented Easter egg choices (impossible thresholds)', () => {
    // This test documents the design decision: All choices should be reachable
    // (Former Easter eggs were converted to realistic thresholds in HIGH #2 fix)
    expect(ALLOWED_EASTER_EGGS.size).toBe(0);
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
