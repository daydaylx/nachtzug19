import { describe, expect, it } from 'vitest';
import { validateContent } from './validateContent';
import type { EndingsCollection, ScenesCollection } from '../types';

const endings: EndingsCollection = {
  A: { id: 'A', title: 'A', narrative: 'A' }
};

describe('validateContent - canonical rules and graph guards', () => {
  it('detects missing control tag in required chapters (R2)', () => {
    const scenes: ScenesCollection = {
      c2_start: {
        id: 'c2_start',
        chapter: 2,
        tags: ['station_end'],
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

    const result = validateContent('c2_start', scenes, endings);
    const controlError = result.errors.find(
      err => err.message.includes('Canon Rule R2') && err.message.includes('Kapitel 2')
    );
    expect(controlError).toBeDefined();
  });

  it('warns about unreachable non-secret scenes', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        choices: [
          {
            id: 'finish',
            label: 'Finish',
            effects: [],
            ending: 'A'
          }
        ]
      },
      unreachable: {
        id: 'unreachable',
        chapter: 1,
        choices: [
          {
            id: 'finish',
            label: 'Finish',
            effects: [],
            ending: 'A'
          }
        ]
      },
      secret: {
        id: 'secret',
        chapter: 1,
        tags: ['secret'],
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

    const result = validateContent('start', scenes, endings);
    const unreachableWarn = result.warnings.find(
      warn => warn.message.includes('nicht erreichbar') && warn.scene_id === 'unreachable'
    );
    const secretWarn = result.warnings.find(
      warn => warn.scene_id === 'secret'
    );

    expect(unreachableWarn).toBeDefined();
    expect(secretWarn).toBeUndefined();
  });

  it('detects dead ends with no valid exits', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        choices: [
          {
            id: 'broken',
            label: 'Broken',
            effects: [],
            next: 'missing'
          }
        ]
      }
    };

    const result = validateContent('start', scenes, endings);
    const deadEndError = result.errors.find(err => err.message.includes('Dead-End'));
    expect(deadEndError).toBeDefined();
  });

  it('detects infinite loops without exits', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        choices: [
          {
            id: 'to_b',
            label: 'To B',
            effects: [],
            next: 'b'
          }
        ]
      },
      b: {
        id: 'b',
        chapter: 1,
        choices: [
          {
            id: 'to_start',
            label: 'Back',
            effects: [],
            next: 'start'
          }
        ]
      }
    };

    const result = validateContent('start', scenes, endings);
    const loopWarn = result.warnings.find(
      warn => warn.message.includes('Endlosschleife')
    );
    expect(loopWarn).toBeDefined();
  });

  it('flags invalid narrative variants', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        narrative_variants: [
          { min_drift: 0, narrative: 'invalid drift' },
          { min_drift: 1, narrative: 'ok' },
          { min_drift: 1, narrative: 'duplicate drift' },
          // @ts-expect-error - intentional empty variant
          { narrative: '' }
        ],
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

    const result = validateContent('start', scenes, endings);
    const errors = result.errors.map(err => err.message);

    expect(errors.some(message => message.includes('min_drift muss >= 1'))).toBe(true);
    expect(errors.some(message => message.includes('Doppelter min_drift'))).toBe(true);
    expect(errors.some(message => message.includes('Variante braucht min_drift oder condition'))).toBe(true);
    expect(errors.some(message => message.includes('narrative darf nicht leer'))).toBe(true);
  });

  it('warns on clamp effects without bounds', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        choices: [
          {
            id: 'clamp',
            label: 'Clamp',
            effects: [
              { type: 'clamp', target: 'wissen', value: 0 }
            ],
            ending: 'A'
          }
        ]
      }
    };

    const result = validateContent('start', scenes, endings);
    const clampWarn = result.warnings.find(warn => warn.message.includes('clamp ohne'));
    expect(clampWarn).toBeDefined();
  });

  it('errors when a scene has more than 5 choices', () => {
    const choices = Array.from({ length: 6 }, (_, idx) => ({
      id: `c${idx + 1}`,
      label: `Choice ${idx + 1}`,
      effects: [],
      ending: 'A'
    }));

    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        choices
      }
    };

    const result = validateContent('start', scenes, endings);
    const tooManyError = result.errors.find(
      err => err.message.includes('mehr als 5 Choices')
    );
    expect(tooManyError).toBeDefined();
  });
});

