#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Conditional Choice Coverage (Current Engine)
// ============================================================================

import { loadNachtzug19Story } from '../src/domain/engine/loadStory';
import {
  Choice,
  Condition,
  GameState,
  Scene,
  ScenesCollection,
  createInitialState,
} from '../src/domain/types';
import {
  applyEffects,
  checkAutoNext,
  evaluateCondition,
  getAvailableChoices,
  transitionToNextScene,
} from '../src/domain/engine/gameEngine';

type CoverageEntry = {
  sceneId: string;
  sceneTitle: string;
  choiceId: string;
  choiceLabel: string;
  conditionStr: string;
  timesAvailable: number;
  runsAvailable: number;
  timesChosen: number;
};

type CoverageMap = Map<string, CoverageEntry>;

function conditionToString(condition: Condition): string {
  switch (condition.type) {
    case 'compare':
      return `${condition.target} ${condition.operator} ${condition.value}`;
    case 'bool':
      return `${condition.target} == ${condition.value}`;
    case 'and':
      return `(${condition.conditions.map(conditionToString).join(' AND ')})`;
    case 'or':
      return `(${condition.conditions.map(conditionToString).join(' OR ')})`;
    default:
      return 'unknown';
  }
}

function coverageKey(sceneId: string, choice: Choice): string {
  return `${sceneId}::${choice.id ?? choice.label ?? 'unknown'}`;
}

function weightedRandomChoice<T>(items: readonly T[], weights: readonly number[]): T {
  const total = weights.reduce((acc, value) => acc + value, 0);
  let roll = Math.random() * total;

  for (let idx = 0; idx < items.length; idx += 1) {
    roll -= weights[idx];
    if (roll <= 0) return items[idx];
  }

  return items[items.length - 1];
}

function chooseExplorationChoice(
  sceneId: string,
  choices: Choice[],
  sceneVisitCount: Map<string, number>,
  coverage: CoverageMap,
): Choice {
  if (choices.length === 1) return choices[0];

  const weights = choices.map((choice) => {
    let weight = 1;

    if (choice.condition) {
      weight += 2;
      const key = coverageKey(sceneId, choice);
      const entry = coverage.get(key);
      if (entry && entry.timesChosen < 5) {
        weight += 2;
      }
    }

    if (choice.next) {
      const visits = sceneVisitCount.get(choice.next) ?? 0;
      weight += Math.max(0, 3 - Math.min(3, visits));
    }

    if (choice.ending) {
      weight += 4;
    }

    return weight;
  });

  return weightedRandomChoice(choices, weights);
}

function applyAutoTransitionIfNeeded(state: GameState, scenes: ScenesCollection): boolean {
  if (state.isGameOver) return false;

  const scene = scenes[state.current_scene_id];
  if (!scene) return false;

  const availableChoices = getAvailableChoices(state, scene);
  if (availableChoices.length > 0) return false;

  const autoNextSceneId = checkAutoNext(scene, state);
  if (!autoNextSceneId) return false;

  const nextScene = scenes[autoNextSceneId];
  if (!nextScene) {
    throw new Error(`Auto-next scene not found: ${autoNextSceneId}`);
  }

  if (scene.exit_effects && scene.exit_effects.length > 0) {
    applyEffects(state, scene.exit_effects);
  }

  if (!state.visited_scene_ids.includes(autoNextSceneId)) {
    state.visited_scene_ids.push(autoNextSceneId);
  }

  state.current_scene_id = autoNextSceneId;

  if (nextScene.entry_effects && nextScene.entry_effects.length > 0) {
    applyEffects(state, nextScene.entry_effects);
  }

  if (nextScene.chapter !== undefined && nextScene.chapter !== state.chapter_index) {
    state.chapter_index = nextScene.chapter;
  }

  return true;
}

function advanceAutoTransitions(state: GameState, scenes: ScenesCollection, maxSteps: number = 12): void {
  let steps = 0;
  while (steps < maxSteps) {
    const advanced = applyAutoTransitionIfNeeded(state, scenes);
    if (!advanced) return;
    steps += 1;
  }
}

function registerAvailableConditionalChoices(
  scene: Scene,
  state: GameState,
  coverage: CoverageMap,
  runAvailableSet: Set<string>,
): void {
  scene.choices.forEach((choice) => {
    if (!choice.condition) return;
    if (typeof choice.condition === 'function') return;

    const key = coverageKey(scene.id, choice);
    const entry = coverage.get(key);
    if (!entry) return;

    if (evaluateCondition(state, choice.condition)) {
      entry.timesAvailable += 1;
      runAvailableSet.add(key);
    }
  });
}

function simulateCoverageRun(
  startSceneId: string,
  scenes: ScenesCollection,
  coverage: CoverageMap,
  maxSteps: number,
): void {
  const state = createInitialState(startSceneId);
  const sceneVisitCount = new Map<string, number>();
  const runAvailableSet = new Set<string>();

  let steps = 0;

  const markVisit = (sceneId: string): void => {
    sceneVisitCount.set(sceneId, (sceneVisitCount.get(sceneId) ?? 0) + 1);
  };

  markVisit(state.current_scene_id);

  while (!state.isGameOver && steps < maxSteps) {
    steps += 1;

    advanceAutoTransitions(state, scenes);
    markVisit(state.current_scene_id);

    const scene = scenes[state.current_scene_id];
    if (!scene) break;

    registerAvailableConditionalChoices(scene, state, coverage, runAvailableSet);

    const availableChoices = getAvailableChoices(state, scene);
    if (availableChoices.length === 0) break;

    const selectedChoice = chooseExplorationChoice(scene.id, availableChoices, sceneVisitCount, coverage);

    if (selectedChoice.condition) {
      const key = coverageKey(scene.id, selectedChoice);
      const entry = coverage.get(key);
      if (entry) {
        entry.timesChosen += 1;
      }
    }

    transitionToNextScene(state, scene, selectedChoice, scenes);
    markVisit(state.current_scene_id);
  }

  runAvailableSet.forEach((key) => {
    const entry = coverage.get(key);
    if (entry) {
      entry.runsAvailable += 1;
    }
  });
}

async function main(): Promise<void> {
  const playthroughs = Number.parseInt(process.argv[2] ?? '1000', 10);
  const maxSteps = Number.parseInt(process.argv[3] ?? '350', 10);

  if (!Number.isFinite(playthroughs) || playthroughs <= 0) {
    throw new Error('Invalid playthrough count. Usage: tsx scripts/analyze_conditional_coverage.ts [playthroughs] [maxSteps]');
  }

  if (!Number.isFinite(maxSteps) || maxSteps <= 0) {
    throw new Error('Invalid maxSteps. Usage: tsx scripts/analyze_conditional_coverage.ts [playthroughs] [maxSteps]');
  }

  console.log('🔍 Starting Conditional Choice Coverage Analysis...');
  console.log('');

  const story = await loadNachtzug19Story();
  const scenes = story.scenes;

  console.log(`📚 Loaded ${Object.keys(scenes).length} scenes`);

  const coverage: CoverageMap = new Map();

  Object.values(scenes).forEach((scene) => {
    scene.choices.forEach((choice) => {
      if (!choice.condition) return;
      if (typeof choice.condition === 'function') return;

      const key = coverageKey(scene.id, choice);
      coverage.set(key, {
        sceneId: scene.id,
        sceneTitle: scene.title ?? scene.id,
        choiceId: choice.id ?? 'unknown',
        choiceLabel: choice.label ?? 'unknown',
        conditionStr: conditionToString(choice.condition),
        timesAvailable: 0,
        runsAvailable: 0,
        timesChosen: 0,
      });
    });
  });

  console.log(`🎯 Found ${coverage.size} conditional choices`);
  console.log(`🎮 Running ${playthroughs} simulations...`);
  console.log('');

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    for (let idx = 0; idx < playthroughs; idx += 1) {
      simulateCoverageRun(story.startSceneId, scenes, coverage, maxSteps);

      const checkpoint = (idx + 1) % 100 === 0 || idx + 1 === playthroughs;
      if (checkpoint) {
        process.stdout.write(`\rProgress: ${idx + 1}/${playthroughs}`);
      }
    }
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
  }

  console.log('\n✅ Simulation complete!');
  console.log('');
  console.log('# CONDITIONAL CHOICE COVERAGE REPORT');
  console.log('');
  console.log(`**Total Conditional Choices**: ${coverage.size}`);
  console.log(`**Playthroughs**: ${playthroughs}`);
  console.log('');

  const entries = [...coverage.values()].map((entry) => ({
    ...entry,
    availabilityRate: (entry.runsAvailable / playthroughs) * 100,
    chosenWhenAvailable: entry.timesAvailable > 0
      ? (entry.timesChosen / entry.timesAvailable) * 100
      : 0,
  }));

  const neverAvailable = entries.filter((entry) => entry.runsAvailable === 0);
  const rare = entries.filter((entry) => entry.runsAvailable > 0 && entry.availabilityRate < 10);
  const uncommon = entries.filter((entry) => entry.availabilityRate >= 10 && entry.availabilityRate < 30);
  const common = entries.filter((entry) => entry.availabilityRate >= 30);

  console.log('## Summary');
  console.log('');
  console.log(`- **Never Available**: ${neverAvailable.length} (${((neverAvailable.length / entries.length) * 100).toFixed(1)}%)`);
  console.log(`- **Rare** (< 10% runs): ${rare.length}`);
  console.log(`- **Uncommon** (10-30% runs): ${uncommon.length}`);
  console.log(`- **Common** (> 30% runs): ${common.length}`);
  console.log('');

  if (neverAvailable.length > 0) {
    console.log('## ⚠️ Orphan Choices (Never Available)');
    console.log('');
    console.log('| Scene | Choice | Condition | Recommendation |');
    console.log('|-------|--------|-----------|----------------|');
    neverAvailable
      .sort((a, b) => a.sceneId.localeCompare(b.sceneId))
      .forEach((entry) => {
        console.log(`| ${entry.sceneId} | ${entry.choiceLabel.substring(0, 26)} | ${entry.conditionStr.substring(0, 42)} | Rebalance threshold/path |`);
      });
    console.log('');
  }

  console.log('## Bottom 20 by Availability');
  console.log('');
  console.log('| Scene | Choice | Condition | Avail % | Chosen/Avail % |');
  console.log('|-------|--------|-----------|---------|----------------|');

  entries
    .sort((a, b) => a.availabilityRate - b.availabilityRate)
    .slice(0, 20)
    .forEach((entry) => {
      console.log(`| ${entry.sceneId.padEnd(18, ' ')} | ${entry.choiceLabel.substring(0, 24).padEnd(24, ' ')} | ${entry.conditionStr.substring(0, 25).padEnd(25, ' ')} | ${entry.availabilityRate.toFixed(1).padStart(6, ' ')}% | ${entry.chosenWhenAvailable.toFixed(1).padStart(14, ' ')}% |`);
    });

  console.log('');
  console.log('✅ Analysis complete!');
}

main().catch((error) => {
  console.error('❌ Coverage analysis failed');
  console.error(error);
  process.exit(1);
});
