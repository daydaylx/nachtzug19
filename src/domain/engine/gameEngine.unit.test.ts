import { describe, expect, it } from 'vitest';
import {
  applyEffects,
  evaluateCondition,
  getAvailableChoices,
  resolveSceneNarrative,
  transitionToNextScene
} from './gameEngine';
import { createInitialState } from '../types';
import type { Scene, ScenesCollection } from '../types';
import { createTestState } from '../../../tests/helpers/testUtils';

describe('applyEffects', () => {
  it('clamps values to engine ranges', () => {
    const state = createInitialState('start');

    applyEffects(state, [
      { type: 'inc', target: 'tickets_truth', value: 999 },
      { type: 'dec', target: 'rel_comp7', value: 999 },
      { type: 'inc', target: 'memory_drift', value: 999 }
    ]);

    expect(state.tickets.tickets_truth).toBe(20);
    expect(state.relations.rel_comp7).toBe(-2);
    expect(state.pressure.memory_drift).toBe(6);
  });

  it('sets boolean values via set effects', () => {
    const state = createInitialState('start');
    applyEffects(state, [{ type: 'set', target: 'has_recorder', value: true }]);
    expect(state.items.has_recorder).toBe(true);
  });

  it('stance flags are mutually exclusive', () => {
    const state = createInitialState('start');

    // Set bold
    applyEffects(state, [{ type: 'set', target: 'stance_bold', value: true }]);
    expect(state.items.stance_bold).toBe(true);
    expect(state.items.stance_cautious).toBe(false);

    // Set cautious — bold should be cleared
    applyEffects(state, [{ type: 'set', target: 'stance_cautious', value: true }]);
    expect(state.items.stance_cautious).toBe(true);
    expect(state.items.stance_bold).toBe(false);

    // Set bold again — cautious should be cleared
    applyEffects(state, [{ type: 'set', target: 'stance_bold', value: true }]);
    expect(state.items.stance_bold).toBe(true);
    expect(state.items.stance_cautious).toBe(false);
  });

  it('supports has_ticket in effects and conditions', () => {
    const state = createInitialState('start');

    applyEffects(state, [{ type: 'set', target: 'has_ticket', value: true }]);

    expect(state.items.has_ticket).toBe(true);
    expect(
      evaluateCondition(state, { type: 'bool', target: 'has_ticket', value: true })
    ).toBe(true);
  });

  it('applies clamp effect with bounds', () => {
    const state = createTestState({ stats: { wissen: 8 } }, 'start');
    applyEffects(state, [
      { type: 'clamp', target: 'wissen', value: 0, clamp_min: 1, clamp_max: 4 }
    ]);
    expect(state.stats.wissen).toBe(4);
  });

  it('throws when incrementing a non-numeric target', () => {
    const state = createInitialState('start');
    expect(() =>
      applyEffects(state, [{ type: 'inc', target: 'has_recorder', value: 1 }])
    ).toThrow('Cannot increment non-numeric target');
  });
});

describe('evaluateCondition', () => {
  it('evaluates numeric comparisons', () => {
    const state = createTestState({ tickets: { tickets_truth: 3 } }, 'start');

    expect(
      evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '>=', value: 3 })
    ).toBe(true);
    expect(
      evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '>', value: 3 })
    ).toBe(false);
    expect(
      evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '<=', value: 3 })
    ).toBe(true);
    expect(
      evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '!=', value: 2 })
    ).toBe(true);
  });

  it('evaluates boolean conditions and logical operators', () => {
    const state = createTestState(
      { items: { has_tag19: true }, pressure: { memory_drift: 2 } },
      'start'
    );

    expect(
      evaluateCondition(state, { type: 'bool', target: 'has_tag19', value: true })
    ).toBe(true);

    expect(
      evaluateCondition(state, {
        type: 'and',
        conditions: [
          { type: 'bool', target: 'has_tag19', value: true },
          { type: 'compare', target: 'memory_drift', operator: '>=', value: 2 }
        ]
      })
    ).toBe(true);

    expect(
      evaluateCondition(state, {
        type: 'or',
        conditions: [
          { type: 'compare', target: 'memory_drift', operator: '>=', value: 5 },
          { type: 'bool', target: 'has_tag19', value: true }
        ]
      })
    ).toBe(true);
  });
});

describe('getAvailableChoices', () => {
  it('filters by structured and legacy conditions', () => {
    const scene: Scene = {
      id: 'start',
      choices: [
        {
          id: 'always',
          label: 'Always',
          effects: [],
          next: 'next'
        },
        {
          id: 'needs_truth',
          label: 'Needs truth',
          condition: { type: 'compare', target: 'tickets_truth', operator: '>=', value: 2 },
          effects: [],
          next: 'next'
        },
        {
          id: 'legacy',
          label: 'Legacy',
          condition: (stats) => stats.mut >= 5,
          effects: [],
          next: 'next'
        }
      ]
    };

    const state = createTestState(
      { stats: { mut: 4 }, tickets: { tickets_truth: 1 } },
      'start'
    );

    const available = getAvailableChoices(state, scene);
    expect(available.map(choice => choice.id)).toEqual(['always']);

    state.stats.mut = 5;
    state.tickets.tickets_truth = 2;
    const availableAfter = getAvailableChoices(state, scene);
    expect(availableAfter.map(choice => choice.id)).toEqual(['always', 'needs_truth', 'legacy']);
  });
});

describe('resolveSceneNarrative', () => {
  it('prioritizes conditional variants over drift variants', () => {
    const scene: Scene = {
      id: 's1',
      narrative: 'base',
      narrative_variants: [
        {
          condition: { type: 'bool', target: 'has_tag19', value: true },
          narrative: 'tag19'
        },
        {
          min_drift: 3,
          narrative: 'drift3'
        }
      ],
      choices: [
        {
          id: 'c1',
          label: 'c1',
          effects: [],
          ending: 'A'
        }
      ]
    };

    const state = createTestState(
      { items: { has_tag19: true }, pressure: { memory_drift: 5 } },
      's1'
    );

    expect(resolveSceneNarrative(scene, state)).toBe('tag19');
  });
});

describe('transitionToNextScene', () => {
  it('applies station_end rule, entry/exit effects, and history', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        exit_effects: [{ type: 'inc', target: 'tickets_truth', value: 1 }],
        choices: [
          {
            id: 'go',
            label: 'Go',
            effects: [],
            next: 'next'
          }
        ]
      },
      next: {
        id: 'next',
        chapter: 2,
        entry_effects: [{ type: 'inc', target: 'tickets_escape', value: 1 }],
        choices: [
          {
            id: 'end',
            label: 'End',
            effects: [],
            ending: 'A'
          }
        ]
      }
    };

    const state = createInitialState('start');
    const choice = scenes.start.choices[0];
    transitionToNextScene(state, scenes.start, choice, scenes);

    expect(state.pressure.memory_drift).toBe(1);
    expect(state.station_count).toBe(1);
    expect(state.tickets.tickets_truth).toBe(1);
    expect(state.tickets.tickets_escape).toBe(1);
    expect(state.current_scene_id).toBe('next');
    expect(state.chapter_index).toBe(2);
    expect(state.history).toHaveLength(1);
    expect(state.history[0].scene_id).toBe('start');
  });

  it('does not auto-increment drift when manual drift effect exists', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        tags: ['station_end'],
        choices: [
          {
            id: 'go',
            label: 'Go',
            effects: [{ type: 'inc', target: 'memory_drift', value: 1 }],
            next: 'next'
          }
        ]
      },
      next: {
        id: 'next',
        choices: [
          {
            id: 'end',
            label: 'End',
            effects: [],
            ending: 'A'
          }
        ]
      }
    };

    const state = createInitialState('start');
    transitionToNextScene(state, scenes.start, scenes.start.choices[0], scenes);

    expect(state.pressure.memory_drift).toBe(1);
    expect(state.station_count).toBe(1);
  });

  it('sets game over when ending is chosen', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        choices: [
          {
            id: 'finish',
            label: 'Finish',
            effects: [],
            ending: 'A'
          }
        ]
      }
    };

    const state = createInitialState('start');
    transitionToNextScene(state, scenes.start, scenes.start.choices[0], scenes);

    expect(state.isGameOver).toBe(true);
    expect(state.endingId).toBe('A');
  });

  it('throws when next scene is missing', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        choices: [
          {
            id: 'bad',
            label: 'Bad',
            effects: [],
            next: 'missing'
          }
        ]
      }
    };

    const state = createInitialState('start');
    const choice = scenes.start.choices[0];

    expect(() => transitionToNextScene(state, scenes.start, choice, scenes)).toThrow(
      'Scene not found'
    );
  });
});
