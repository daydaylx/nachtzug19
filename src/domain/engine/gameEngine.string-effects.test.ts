// ============================================================================
// NACHTZUG 19 – String Effects Tests
// ============================================================================
// Verifies that string-typed Effect targets are correctly handled by:
//   - applyEffects (set + read via evaluateCondition)
//   - validateContent (inc/dec/clamp rejected, set accepted)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { applyEffects, evaluateCondition } from './gameEngine';
import { createInitialState } from '../types';
import { validateContent } from './validateContent';
import type { ScenesCollection, EndingsCollection, Effect, Scene } from '../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeMinimalScene(id: string, effects: Effect[]): Scene {
  return {
    id,
    chapter: 1,
    choices: [
      {
        id: 'go',
        label: 'Weiter',
        effects,
        next: 'end'
      }
    ]
  };
}

function makeSceneCollection(scenes: Scene[]): ScenesCollection {
  return Object.fromEntries(scenes.map(s => [s.id, s]));
}

const MINIMAL_ENDINGS: EndingsCollection = {
  A: { id: 'A', title: 'Ende A', narrative: 'Das Ende.' }
};

// A reachable terminal scene so graph validation passes.
const endScene: Scene = {
  id: 'end',
  chapter: 1,
  tags: ['station_end', 'control'],
  choices: [{ id: 'finish', label: 'Fertig', ending: 'A' }]
};

// ---------------------------------------------------------------------------
// applyEffects – string targets set and read
// ---------------------------------------------------------------------------

describe('string effects – applyEffects', () => {
  const STRING_TARGETS = [
    'prepare_stance',
    'breath_control',
    'conductor_stance',
    'approach_response'
  ] as const;

  it.each(STRING_TARGETS)('can set and read string target "%s"', (target) => {
    const state = createInitialState('start');
    applyEffects(state, [{ type: 'set', target, value: 'truth' }]);

    const result = evaluateCondition(state, {
      type: 'compare',
      target,
      operator: '==',
      value: 'truth'
    });
    expect(result).toBe(true);
  });

  it('string target compare != works correctly', () => {
    const state = createInitialState('start');
    applyEffects(state, [{ type: 'set', target: 'prepare_stance', value: 'lie' }]);

    expect(
      evaluateCondition(state, { type: 'compare', target: 'prepare_stance', operator: '==', value: 'truth' })
    ).toBe(false);

    expect(
      evaluateCondition(state, { type: 'compare', target: 'prepare_stance', operator: '!=', value: 'truth' })
    ).toBe(true);
  });

  it('set can overwrite a string target multiple times', () => {
    const state = createInitialState('start');
    applyEffects(state, [{ type: 'set', target: 'conductor_stance', value: 'face' }]);
    expect(state.items.conductor_stance).toBe('face');

    applyEffects(state, [{ type: 'set', target: 'conductor_stance', value: 'down' }]);
    expect(state.items.conductor_stance).toBe('down');
  });

  it('inc on string target throws at runtime', () => {
    const state = createInitialState('start');
    expect(() =>
      applyEffects(state, [{ type: 'inc', target: 'prepare_stance', value: 1 }])
    ).toThrow(/Cannot increment non-numeric target/);
  });

  it('dec on string target throws at runtime', () => {
    const state = createInitialState('start');
    expect(() =>
      applyEffects(state, [{ type: 'dec', target: 'breath_control', value: 1 }])
    ).toThrow(/Cannot decrement non-numeric target/);
  });

  it('set with wrong value type on string target throws at runtime', () => {
    const state = createInitialState('start');
    expect(() =>
      applyEffects(state, [{ type: 'set', target: 'prepare_stance', value: 42 }])
    ).toThrow(/requires a string value/);
  });
});

// ---------------------------------------------------------------------------
// validateContent – type-rule enforcement
// ---------------------------------------------------------------------------

describe('string effects – validateContent', () => {
  it('accepts set on string targets', () => {
    const scenes = makeSceneCollection([
      makeMinimalScene('start', [
        { type: 'set', target: 'prepare_stance', value: 'truth' },
        { type: 'set', target: 'breath_control', value: 'steady' },
        { type: 'set', target: 'conductor_stance', value: 'face' },
        { type: 'set', target: 'approach_response', value: 'silent' }
      ]),
      endScene
    ]);

    const result = validateContent('start', scenes, MINIMAL_ENDINGS);
    const stringTargetErrors = result.errors.filter(e =>
      e.message.includes('prepare_stance') ||
      e.message.includes('breath_control') ||
      e.message.includes('conductor_stance') ||
      e.message.includes('approach_response')
    );
    expect(stringTargetErrors).toEqual([]);
  });

  it('rejects inc on string target', () => {
    const scenes = makeSceneCollection([
      makeMinimalScene('start', [
        { type: 'inc', target: 'prepare_stance', value: 1 }
      ]),
      endScene
    ]);

    const result = validateContent('start', scenes, MINIMAL_ENDINGS);
    const relevant = result.errors.filter(e => e.message.includes('prepare_stance'));
    expect(relevant.length).toBeGreaterThan(0);
    expect(relevant[0].message).toMatch(/nur für numerische Targets|String-Target/);
  });

  it('rejects dec on string target', () => {
    const scenes = makeSceneCollection([
      makeMinimalScene('start', [
        { type: 'dec', target: 'breath_control', value: 1 }
      ]),
      endScene
    ]);

    const result = validateContent('start', scenes, MINIMAL_ENDINGS);
    const relevant = result.errors.filter(e => e.message.includes('breath_control'));
    expect(relevant.length).toBeGreaterThan(0);
  });

  it('rejects clamp on string target', () => {
    const scenes = makeSceneCollection([
      makeMinimalScene('start', [
        { type: 'clamp', target: 'conductor_stance', value: 0, clamp_min: 0, clamp_max: 5 }
      ]),
      endScene
    ]);

    const result = validateContent('start', scenes, MINIMAL_ENDINGS);
    const relevant = result.errors.filter(e => e.message.includes('conductor_stance'));
    expect(relevant.length).toBeGreaterThan(0);
  });

  it('accepts inc/dec/clamp only on numeric targets', () => {
    const scenes = makeSceneCollection([
      makeMinimalScene('start', [
        { type: 'inc', target: 'conductor_attention', value: 1 },
        { type: 'dec', target: 'memory_drift', value: 1 },
        { type: 'clamp', target: 'tickets_truth', value: 0, clamp_min: 0, clamp_max: 20 }
      ]),
      endScene
    ]);

    const result = validateContent('start', scenes, MINIMAL_ENDINGS);
    const numericErrors = result.errors.filter(e =>
      e.message.includes('conductor_attention') ||
      e.message.includes('memory_drift') ||
      e.message.includes('tickets_truth')
    );
    expect(numericErrors).toEqual([]);
  });
});
