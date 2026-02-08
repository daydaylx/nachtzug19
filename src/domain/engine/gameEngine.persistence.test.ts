import { afterEach, describe, expect, it } from 'vitest';
import { GameEngine } from './gameEngine';
import type { EndingsCollection, ScenesCollection } from '../types';
import { createInitialState } from '../types';
import { createLocalStorageMock } from '../../../tests/helpers/testUtils';

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

const endings: EndingsCollection = {
  A: {
    id: 'A',
    title: 'Ending A',
    narrative: 'End.'
  }
};

const globalAny = globalThis as unknown as { localStorage?: Storage };
const originalLocalStorage = globalAny.localStorage;

afterEach(() => {
  if (originalLocalStorage === undefined) {
    delete globalAny.localStorage;
  } else {
    globalAny.localStorage = originalLocalStorage;
  }
});

describe('GameEngine persistence', () => {
  it('saves and loads state via localStorage', () => {
    const storage = createLocalStorageMock();
    globalAny.localStorage = storage as Storage;

    const engine = new GameEngine(scenes, endings, 'start');
    engine.saveGame('slot1');

    const key = 'nachtzug19_save_slot1';
    const saved = storage.getItem(key);
    expect(saved).toBeTruthy();

    const result = engine.loadGame('slot1');
    expect(result).toBe(true);
    expect(engine.getState().current_scene_id).toBe('start');
  });

  it('returns false on version mismatch', () => {
    const storage = createLocalStorageMock();
    globalAny.localStorage = storage as Storage;

    const engine = new GameEngine(scenes, endings, 'start');
    const key = 'nachtzug19_save_slot1';
    const badPayload = {
      version: 999,
      current_scene_id: 'start',
      history: [],
      state: createInitialState('start')
    };
    storage.setItem(key, JSON.stringify(badPayload));

    const result = engine.loadGame('slot1');
    expect(result).toBe(false);
  });

  it('gracefully handles missing localStorage', () => {
    delete globalAny.localStorage;
    const engine = new GameEngine(scenes, endings, 'start');

    expect(() => engine.saveGame('slot1')).not.toThrow();
    expect(engine.loadGame('slot1')).toBe(false);
  });

  it('does not advance when game is already over', () => {
    const engine = new GameEngine(scenes, endings, 'start');
    engine.getState().isGameOver = true;

    const choice = scenes.start.choices[0];
    engine.makeChoice(choice);

    expect(engine.getState().current_scene_id).toBe('start');
    expect(engine.getState().endingId).toBeUndefined();
  });
});
