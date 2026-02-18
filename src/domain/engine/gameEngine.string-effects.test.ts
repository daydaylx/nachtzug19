// ============================================================================
// NACHTZUG 19 - String-Effects Tests
// ============================================================================
// Prüft, dass String-Nuance-Targets (prepare_stance, breath_control,
// conductor_stance, approach_response) korrekt gesetzt, gelesen und
// validiert werden.
// ============================================================================

import { describe, expect, it } from 'vitest';
import { applyEffects, evaluateCondition } from './gameEngine';
import { validateContent } from './validateContent';
import type { EffectTarget, ScenesCollection, EndingsCollection } from '../types';
import { createInitialState } from '../types';

// ============================================================================
// Hilfsfunktionen
// ============================================================================

const STRING_TARGETS: EffectTarget[] = [
  'prepare_stance',
  'breath_control',
  'conductor_stance',
  'approach_response'
];

const endings: EndingsCollection = {
  A: { id: 'A', title: 'Ende A', narrative: 'Ende.' }
};

function makeMinimalScene(sceneId: string, effects: { type: string; target: string; value: unknown }[]): ScenesCollection {
  return {
    [sceneId]: {
      id: sceneId,
      chapter: 1,
      tags: ['station_end'],
      choices: [
        {
          id: 'go',
          label: 'Weiter',
          effects: effects as never,
          ending: 'A'
        }
      ]
    }
  };
}

// ============================================================================
// Tests
// ============================================================================

describe('String-Effects: set/read', () => {
  it('setzt alle 4 String-Targets per set und liest den Wert korrekt zurück', () => {
    const testValues: Record<string, string> = {
      prepare_stance: 'truth',
      breath_control: 'steady',
      conductor_stance: 'face',
      approach_response: 'silent'
    };

    for (const target of STRING_TARGETS) {
      const state = createInitialState('start');
      const testValue = testValues[target];

      applyEffects(state, [{ type: 'set', target, value: testValue }]);

      // Wert via compare-Condition abrufen
      const isEqual = evaluateCondition(state, {
        type: 'compare',
        target,
        operator: '==',
        value: testValue
      });

      expect(isEqual, `Target '${target}' sollte nach set('${testValue}') den Wert '${testValue}' haben`).toBe(true);

      // Abgrenzung: anderer Wert liefert false
      const isOther = evaluateCondition(state, {
        type: 'compare',
        target,
        operator: '==',
        value: 'other_value'
      });
      expect(isOther, `Target '${target}' sollte nicht 'other_value' sein`).toBe(false);
    }
  });
});

describe('String-Effects: Engine-Guard (inc/dec/clamp auf String-Target)', () => {
  it('wirft einen Fehler bei inc auf prepare_stance', () => {
    const state = createInitialState('start');
    // Zunächst einen String setzen
    applyEffects(state, [{ type: 'set', target: 'prepare_stance', value: 'truth' }]);

    // inc auf String-Target muss einen Fehler werfen
    expect(() => {
      applyEffects(state, [{ type: 'inc', target: 'prepare_stance', value: 1 }]);
    }).toThrow('Cannot increment non-numeric target: prepare_stance');
  });

  it('wirft einen Fehler bei dec auf conductor_stance', () => {
    const state = createInitialState('start');
    expect(() => {
      applyEffects(state, [{ type: 'dec', target: 'conductor_stance', value: 1 }]);
    }).toThrow('Cannot decrement non-numeric target: conductor_stance');
  });

  it('wirft einen Fehler bei clamp auf breath_control', () => {
    const state = createInitialState('start');
    expect(() => {
      applyEffects(state, [{
        type: 'clamp',
        target: 'breath_control',
        value: 0,
        clamp_min: 0,
        clamp_max: 1
      }]);
    }).toThrow('Cannot clamp non-numeric target: breath_control');
  });
});

describe('String-Effects: Validator-Guard', () => {
  it('lehnt inc auf prepare_stance als Fehler ab', () => {
    const scenes = makeMinimalScene('start', [
      { type: 'inc', target: 'prepare_stance', value: 1 }
    ]);

    const result = validateContent('start', scenes, endings);
    const semanticError = result.errors.find(
      err => err.message.includes("'inc'") && err.message.includes('prepare_stance')
    );
    expect(semanticError, 'Validator sollte inc auf String-Target ablehnen').toBeDefined();
  });

  it('lehnt dec auf conductor_stance als Fehler ab', () => {
    const scenes = makeMinimalScene('start', [
      { type: 'dec', target: 'conductor_stance', value: 1 }
    ]);

    const result = validateContent('start', scenes, endings);
    const semanticError = result.errors.find(
      err => err.message.includes("'dec'") && err.message.includes('conductor_stance')
    );
    expect(semanticError, 'Validator sollte dec auf String-Target ablehnen').toBeDefined();
  });

  it('akzeptiert set auf approach_response ohne Fehler', () => {
    const scenes = makeMinimalScene('start', [
      { type: 'set', target: 'approach_response', value: 'apologize' }
    ]);

    const result = validateContent('start', scenes, endings);
    const semanticError = result.errors.find(
      err => err.message.includes('approach_response')
        && (err.message.includes("'inc'") || err.message.includes("'dec'") || err.message.includes("'clamp'"))
    );
    expect(semanticError, "Validator sollte 'set' auf String-Target erlauben").toBeUndefined();
  });

  it('akzeptiert set auf alle 4 String-Targets in einer Szene ohne Typ-Fehler', () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        tags: ['station_end'],
        choices: [
          {
            id: 'stance',
            label: 'Haltung wählen',
            effects: [
              { type: 'set', target: 'prepare_stance', value: 'truth' },
              { type: 'set', target: 'breath_control', value: 'steady' },
              { type: 'set', target: 'conductor_stance', value: 'face' },
              { type: 'set', target: 'approach_response', value: 'silent' }
            ],
            ending: 'A'
          }
        ]
      }
    };

    const result = validateContent('start', scenes, endings);
    const typeErrors = result.errors.filter(
      err => STRING_TARGETS.some(t => err.message.includes(t))
        && (err.message.includes("'inc'") || err.message.includes("'dec'") || err.message.includes("'clamp'"))
    );
    expect(typeErrors, 'set auf String-Targets soll keine Typ-Fehler erzeugen').toEqual([]);
  });
});
