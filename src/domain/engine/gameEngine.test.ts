import { describe, it, expect, beforeAll } from 'vitest';
import { loadNachtzug19Story, StoryBundle } from './loadStory';
import { createInitialState } from '../types';
import { getAvailableChoices, transitionToNextScene, resolveSceneNarrative } from './gameEngine';
import type { Scene, GameState } from '../types';

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
