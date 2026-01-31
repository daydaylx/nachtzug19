import { GameState, createInitialState } from '../../src/domain/types';

type PartialGameState = Partial<GameState> & {
  stats?: Partial<GameState['stats']>;
  tickets?: Partial<GameState['tickets']>;
  pressure?: Partial<GameState['pressure']>;
  relations?: Partial<GameState['relations']>;
  items?: Partial<GameState['items']>;
};

export function createTestState(
  overrides: PartialGameState = {},
  startSceneId: string = 'c1_s01_platform'
): GameState {
  const base = createInitialState(startSceneId);
  return {
    ...base,
    ...overrides,
    stats: { ...base.stats, ...overrides.stats },
    tickets: { ...base.tickets, ...overrides.tickets },
    pressure: { ...base.pressure, ...overrides.pressure },
    relations: { ...base.relations, ...overrides.relations },
    items: { ...base.items, ...overrides.items }
  };
}

export function createLocalStorageMock(initial: Record<string, string> = {}) {
  let store: Record<string, string> = { ...initial };

  const storage = {
    getItem(key: string) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem(key: string, value: string) {
      store[key] = String(value);
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    key(index: number) {
      const keys = Object.keys(store);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(store).length;
    },
    _getStore() {
      return { ...store };
    }
  };

  return storage;
}

