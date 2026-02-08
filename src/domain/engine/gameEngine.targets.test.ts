import { describe, expect, it } from 'vitest';
import { applyEffects, evaluateCondition } from './gameEngine';
import { loadNachtzug19Story } from './loadStory';
import type { Condition, EffectTarget, ScenesCollection } from '../types';
import { createInitialState } from '../types';

const ALL_ENGINE_TARGETS: EffectTarget[] = [
  'mut',
  'wissen',
  'empathie',
  'tickets_truth',
  'tickets_escape',
  'tickets_guilt',
  'tickets_love',
  'conductor_attention',
  'memory_drift',
  'rel_comp7',
  'rel_boy',
  'rel_sleepless',
  'has_recorder',
  'has_tag19',
  'has_ticket',
  'photo_anomaly',
  'played_recorder',
  'memory_search_active',
  'emma_memory_unlocked',
  'chapter_index',
  'station_count'
];

const BOOLEAN_TARGETS = new Set<EffectTarget>([
  'has_recorder',
  'has_tag19',
  'has_ticket',
  'photo_anomaly',
  'played_recorder',
  'memory_search_active',
  'emma_memory_unlocked'
]);

function collectConditionTargets(condition: Condition): string[] {
  if (condition.type === 'compare' || condition.type === 'bool') {
    return [condition.target];
  }
  if (condition.type === 'and' || condition.type === 'or') {
    return condition.conditions.flatMap(collectConditionTargets);
  }
  return [];
}

function collectContentTargets(scenes: ScenesCollection): string[] {
  const targets = new Set<string>();

  Object.values(scenes).forEach(scene => {
    scene.entry_effects?.forEach(effect => targets.add(effect.target));
    scene.exit_effects?.forEach(effect => targets.add(effect.target));
    scene.narrative_variants?.forEach(variant => {
      if (variant.condition) {
        collectConditionTargets(variant.condition).forEach(target => targets.add(target));
      }
    });

    scene.choices.forEach(choice => {
      choice.effects?.forEach(effect => targets.add(effect.target));
      if (choice.condition && typeof choice.condition !== 'function') {
        collectConditionTargets(choice.condition).forEach(target => targets.add(target));
      }
    });
  });

  return [...targets].sort();
}

function supportsSetAndRead(target: EffectTarget): boolean {
  const isBooleanTarget = BOOLEAN_TARGETS.has(target);
  const state = createInitialState('c1_s01_platform');
  const value: number | boolean = isBooleanTarget ? true : 1;

  try {
    applyEffects(state, [{ type: 'set', target, value }]);

    if (isBooleanTarget) {
      return evaluateCondition(state, { type: 'bool', target, value: true });
    }

    return evaluateCondition(state, {
      type: 'compare',
      target,
      operator: '==',
      value: 1
    });
  } catch {
    return false;
  }
}

describe('gameEngine target support', () => {
  it('can set and read every engine target exactly once', () => {
    const unsupported = ALL_ENGINE_TARGETS.filter(target => !supportsSetAndRead(target));
    expect(unsupported).toEqual([]);
  });

  it('fails if any target used in content is not supported by engine', async () => {
    const story = await loadNachtzug19Story();
    const contentTargets = collectContentTargets(story.scenes);
    const unsupported = contentTargets.filter(target => !supportsSetAndRead(target as EffectTarget));

    expect(contentTargets.length).toBeGreaterThan(0);
    expect(unsupported).toEqual([]);
  });
});
