// ============================================================================
// NACHTZUG 19 - Content Validation Tests
// ============================================================================
// Tests für Graph-Validierung (Teil A)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { validateContent } from './validateContent';
import type { ScenesCollection, EndingsCollection } from '../types';

describe('validateContent - Graph-Validierung', () => {
  it('Valid content returns no errors', () => {
    // Minimal valider Content-Graph
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        title: 'Start Scene',
        narrative: 'You are standing on a platform.',
        choices: [
          {
            id: 'go_left',
            label: 'Go left',
            effects: [{ type: 'inc', target: 'wissen', value: 1 }],
            next: 'left'
          }
        ],
        tags: ['station_end']
      },
      left: {
        id: 'left',
        chapter: 1,
        title: 'Left Room',
        narrative: 'You went left.',
        choices: [
          {
            id: 'finish',
            label: 'Finish',
            effects: [{ type: 'inc', target: 'mut', value: 1 }],
            ending: 'A'
          }
        ]
      }
    };

    const endings: EndingsCollection = {
      A: {
        id: 'A',
        title: 'Ending A',
        narrative: 'You reached ending A.'
      }
    };

    const result = validateContent('start', scenes, endings);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('Missing next is detected', () => {
    // Graph mit ungültiger next-Referenz
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        title: 'Start Scene',
        narrative: 'You are standing on a platform.',
        choices: [
          {
            id: 'go_nowhere',
            label: 'Go to nowhere',
            effects: [{ type: 'inc', target: 'wissen', value: 1 }],
            next: 'nonexistent_scene' // Diese Szene existiert nicht!
          }
        ],
        tags: ['station_end']
      }
    };

    const endings: EndingsCollection = {};

    const result = validateContent('start', scenes, endings);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    // Prüfe, ob die fehlende Referenz erkannt wurde
    const missingNextError = result.errors.find(
      err => err.message.includes('nonexistent_scene')
    );
    expect(missingNextError).toBeDefined();
  });

  it('Unknown key in effect is detected', () => {
    // Graph mit unbekanntem Effect-Target
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        title: 'Start Scene',
        narrative: 'You are standing on a platform.',
        choices: [
          {
            id: 'invalid_effect',
            label: 'Invalid effect',
            effects: [
              // @ts-expect-error - Testing invalid target
              { type: 'inc', target: 'unknown_stat', value: 1 }
            ],
            ending: 'A'
          }
        ],
        tags: ['station_end']
      }
    };

    const endings: EndingsCollection = {
      A: {
        id: 'A',
        title: 'Ending A',
        narrative: 'You reached ending A.'
      }
    };

    const result = validateContent('start', scenes, endings);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    // Prüfe, ob das unbekannte Target erkannt wurde
    const unknownKeyError = result.errors.find(
      err => err.message.includes('unknown_stat') || err.message.includes('Unbekanntes Target')
    );
    expect(unknownKeyError).toBeDefined();
  });

  it('Duplicate scene IDs are detected', () => {
    // Graph mit doppelten Scene IDs
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        title: 'First Start',
        narrative: 'First scene.',
        choices: [
          {
            id: 'go',
            label: 'Go',
            effects: [{ type: 'inc', target: 'wissen', value: 1 }],
            ending: 'A'
          }
        ],
        tags: ['station_end']
      },
      duplicate: {
        id: 'start', // Duplicate ID!
        chapter: 1,
        title: 'Second Start',
        narrative: 'Second scene.',
        choices: [
          {
            id: 'go',
            label: 'Go',
            effects: [{ type: 'inc', target: 'mut', value: 1 }],
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

    const result = validateContent('start', scenes, endings);

    expect(result.valid).toBe(false);
    const duplicateError = result.errors.find(
      err => err.message.includes('Doppelte Scene-ID')
    );
    expect(duplicateError).toBeDefined();
  });

  it('Unknown effect type is detected', () => {
    // Graph mit unbekanntem Effect-Type
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        title: 'Start Scene',
        narrative: 'You are standing on a platform.',
        choices: [
          {
            id: 'invalid_type',
            label: 'Invalid type',
            effects: [
              // @ts-expect-error - Testing invalid type
              { type: 'multiply', target: 'wissen', value: 2 }
            ],
            ending: 'A'
          }
        ],
        tags: ['station_end']
      }
    };

    const endings: EndingsCollection = {
      A: {
        id: 'A',
        title: 'Ending A',
        narrative: 'End.'
      }
    };

    const result = validateContent('start', scenes, endings);

    expect(result.valid).toBe(false);
    const unknownTypeError = result.errors.find(
      err => err.message.includes('Unbekannter Effect-Type') || err.message.includes('multiply')
    );
    expect(unknownTypeError).toBeDefined();
  });

  it('Missing station_end tag in chapter is detected', () => {
    // Kapitel ohne station_end Tag
    const scenes: ScenesCollection = {
      c1_start: {
        id: 'c1_start',
        chapter: 1,
        title: 'Chapter 1 Start',
        narrative: 'Chapter 1.',
        choices: [
          {
            id: 'go',
            label: 'Go',
            effects: [{ type: 'inc', target: 'wissen', value: 1 }],
            next: 'c1_end'
          }
        ]
        // Kein station_end Tag!
      },
      c1_end: {
        id: 'c1_end',
        chapter: 1,
        title: 'Chapter 1 End',
        narrative: 'End of chapter 1.',
        choices: [
          {
            id: 'finish',
            label: 'Finish',
            effects: [{ type: 'inc', target: 'mut', value: 1 }],
            ending: 'A'
          }
        ]
        // Auch kein station_end Tag!
      }
    };

    const endings: EndingsCollection = {
      A: {
        id: 'A',
        title: 'Ending A',
        narrative: 'End.'
      }
    };

    const result = validateContent('c1_start', scenes, endings);

    expect(result.valid).toBe(false);
    const stationEndError = result.errors.find(
      err => err.message.includes('Canon Rule R1') && err.message.includes('station_end')
    );
    expect(stationEndError).toBeDefined();
  });

  it('Choice without effects is detected', () => {
    // Choice ohne Effects
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        title: 'Start Scene',
        narrative: 'You are standing on a platform.',
        choices: [
          {
            id: 'no_effect',
            label: 'No effect choice',
            // effects: [], // Keine Effects!
            ending: 'A'
          }
        ],
        tags: ['station_end']
      }
    };

    const endings: EndingsCollection = {
      A: {
        id: 'A',
        title: 'Ending A',
        narrative: 'End.'
      }
    };

    const result = validateContent('start', scenes, endings);

    expect(result.valid).toBe(false);
    const noEffectError = result.errors.find(
      err => err.message.includes('keine Effekte')
    );
    expect(noEffectError).toBeDefined();
  });

  it('Scene with more than 4 choices is detected', () => {
    // Szene mit >4 Choices
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        title: 'Start Scene',
        narrative: 'Too many choices.',
        choices: [
          {
            id: 'c1',
            label: 'Choice 1',
            effects: [{ type: 'inc', target: 'wissen', value: 1 }],
            ending: 'A'
          },
          {
            id: 'c2',
            label: 'Choice 2',
            effects: [{ type: 'inc', target: 'mut', value: 1 }],
            ending: 'A'
          },
          {
            id: 'c3',
            label: 'Choice 3',
            effects: [{ type: 'inc', target: 'empathie', value: 1 }],
            ending: 'A'
          },
          {
            id: 'c4',
            label: 'Choice 4',
            effects: [{ type: 'inc', target: 'tickets_truth', value: 1 }],
            ending: 'A'
          },
          {
            id: 'c5',
            label: 'Choice 5',
            effects: [{ type: 'inc', target: 'tickets_escape', value: 1 }],
            ending: 'A'
          }
        ],
        tags: ['station_end']
      }
    };

    const endings: EndingsCollection = {
      A: {
        id: 'A',
        title: 'Ending A',
        narrative: 'End.'
      }
    };

    const result = validateContent('start', scenes, endings);

    expect(result.valid).toBe(false);
    const tooManyChoicesError = result.errors.find(
      err => err.message.includes('mehr als 4 Choices')
    );
    expect(tooManyChoicesError).toBeDefined();
  });
});
