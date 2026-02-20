#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Ending Reachability Simulation (Current Engine)
// ============================================================================

import { loadNachtzug19Story } from '../src/domain/engine/loadStory';
import {
  GameState,
  Scene,
  ScenesCollection,
  Choice,
  createInitialState,
} from '../src/domain/types';
import {
  applyEffects,
  checkAutoNext,
  getAvailableChoices,
  transitionToNextScene,
} from '../src/domain/engine/gameEngine';

type EndingType = 'TRUTH' | 'LOVE' | 'GUILT' | 'ESCAPE' | 'LIMBO' | 'UNKNOWN';

type PlaythroughResult = {
  endingId: string | null;
  endingType: EndingType;
  choicesMade: number;
  scenesVisited: number;
  finalTickets: {
    truth: number;
    love: number;
    guilt: number;
    escape: number;
  };
  maxStepsReached: boolean;
};

type EndingCounter = Record<Exclude<EndingType, 'UNKNOWN'>, number>;

type TicketBucket = {
  truth: number[];
  love: number[];
  guilt: number[];
  escape: number[];
};

const ENDING_TYPES: Exclude<EndingType, 'UNKNOWN'>[] = ['TRUTH', 'LOVE', 'GUILT', 'ESCAPE', 'LIMBO'];

function normalizeEndingType(endingId: string | undefined): EndingType {
  if (!endingId) return 'UNKNOWN';
  const upper = endingId.toUpperCase();
  if (upper.includes('TRUTH')) return 'TRUTH';
  if (upper.includes('LOVE')) return 'LOVE';
  if (upper.includes('GUILT')) return 'GUILT';
  if (upper.includes('ESCAPE')) return 'ESCAPE';
  if (upper.includes('LIMBO')) return 'LIMBO';
  return 'UNKNOWN';
}

function weightedRandomChoice<T>(items: readonly T[], weights: readonly number[]): T {
  const total = weights.reduce((acc, value) => acc + value, 0);
  let roll = Math.random() * total;

  for (let idx = 0; idx < items.length; idx += 1) {
    roll -= weights[idx];
    if (roll <= 0) {
      return items[idx];
    }
  }

  return items[items.length - 1];
}

function chooseNextChoice(
  choices: Choice[],
  sceneVisitCount: Map<string, number>,
): Choice {
  if (choices.length === 1) return choices[0];

  const weights = choices.map((choice) => {
    let weight = 1;

    if (choice.ending) {
      weight += 5;
    }

    if (choice.next) {
      const visits = sceneVisitCount.get(choice.next) ?? 0;
      weight += Math.max(0, 3 - Math.min(3, visits));
    }

    if (choice.condition) {
      weight += 1;
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

function advanceAutoTransitions(state: GameState, scenes: ScenesCollection, maxSteps: number = 12): number {
  let steps = 0;
  while (steps < maxSteps) {
    const advanced = applyAutoTransitionIfNeeded(state, scenes);
    if (!advanced) break;
    steps += 1;
  }
  return steps;
}

function simulateSingleRun(startSceneId: string, scenes: ScenesCollection, maxSteps: number): PlaythroughResult {
  const state = createInitialState(startSceneId);
  const sceneVisitCount = new Map<string, number>();

  let choicesMade = 0;
  let stepCount = 0;

  const markVisit = (sceneId: string): void => {
    sceneVisitCount.set(sceneId, (sceneVisitCount.get(sceneId) ?? 0) + 1);
  };

  markVisit(state.current_scene_id);

  while (!state.isGameOver && stepCount < maxSteps) {
    stepCount += 1;

    advanceAutoTransitions(state, scenes);
    markVisit(state.current_scene_id);

    const scene: Scene | undefined = scenes[state.current_scene_id];
    if (!scene) break;

    const availableChoices = getAvailableChoices(state, scene);
    if (availableChoices.length === 0) break;

    const selectedChoice = chooseNextChoice(availableChoices, sceneVisitCount);
    transitionToNextScene(state, scene, selectedChoice, scenes);
    choicesMade += 1;

    markVisit(state.current_scene_id);
  }

  const endingType = normalizeEndingType(state.endingId);

  return {
    endingId: state.endingId ?? null,
    endingType,
    choicesMade,
    scenesVisited: sceneVisitCount.size,
    finalTickets: {
      truth: state.tickets.tickets_truth,
      love: state.tickets.tickets_love,
      guilt: state.tickets.tickets_guilt,
      escape: state.tickets.tickets_escape,
    },
    maxStepsReached: !state.isGameOver && stepCount >= maxSteps,
  };
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function summarizeTickets(values: number[]): { min: number; max: number; avg: number; median: number } {
  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0, median: 0 };
  }

  const sum = values.reduce((acc, value) => acc + value, 0);

  return {
    min: Math.min(...values),
    max: Math.max(...values),
    avg: sum / values.length,
    median: median(values),
  };
}

async function main(): Promise<void> {
  const playthroughs = Number.parseInt(process.argv[2] ?? '1000', 10);
  const maxSteps = Number.parseInt(process.argv[3] ?? '350', 10);

  if (!Number.isFinite(playthroughs) || playthroughs <= 0) {
    throw new Error('Invalid playthrough count. Usage: tsx scripts/simulate_endings.ts [playthroughs] [maxSteps]');
  }

  if (!Number.isFinite(maxSteps) || maxSteps <= 0) {
    throw new Error('Invalid maxSteps. Usage: tsx scripts/simulate_endings.ts [playthroughs] [maxSteps]');
  }

  console.log('🔍 Starting NACHTZUG 19 Ending Reachability Simulation...');
  console.log('');

  const story = await loadNachtzug19Story();

  console.log(`📚 Loaded ${Object.keys(story.scenes).length} scenes`);
  console.log(`🎮 Running ${playthroughs} simulated playthroughs (maxSteps=${maxSteps})...`);
  console.log('');

  const endingCounter: EndingCounter = {
    TRUTH: 0,
    LOVE: 0,
    GUILT: 0,
    ESCAPE: 0,
    LIMBO: 0,
  };

  const ticketBucket: TicketBucket = {
    truth: [],
    love: [],
    guilt: [],
    escape: [],
  };

  let unknownEndings = 0;
  let maxStepAbortCount = 0;
  let totalChoices = 0;
  let totalScenesVisited = 0;

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    for (let idx = 0; idx < playthroughs; idx += 1) {
      const result = simulateSingleRun(story.startSceneId, story.scenes, maxSteps);

      if (result.endingType === 'UNKNOWN') {
        unknownEndings += 1;
      } else {
        endingCounter[result.endingType] += 1;
      }

      ticketBucket.truth.push(result.finalTickets.truth);
      ticketBucket.love.push(result.finalTickets.love);
      ticketBucket.guilt.push(result.finalTickets.guilt);
      ticketBucket.escape.push(result.finalTickets.escape);

      totalChoices += result.choicesMade;
      totalScenesVisited += result.scenesVisited;

      if (result.maxStepsReached) {
        maxStepAbortCount += 1;
      }
    }
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
  }

  const unreachable = ENDING_TYPES.filter((ending) => endingCounter[ending] === 0);

  const rankedEndings = ENDING_TYPES
    .map((ending) => ({ ending, count: endingCounter[ending] }))
    .sort((a, b) => b.count - a.count);

  const dominant = rankedEndings[0];
  const dominantRate = dominant.count / playthroughs;

  const truthStats = summarizeTickets(ticketBucket.truth);
  const loveStats = summarizeTickets(ticketBucket.love);
  const guiltStats = summarizeTickets(ticketBucket.guilt);
  const escapeStats = summarizeTickets(ticketBucket.escape);

  console.log('✅ Simulation complete!');
  console.log('');
  console.log('# NACHTZUG 19 - ENDING REACHABILITY REPORT');
  console.log('');
  console.log(`**Total Playthroughs**: ${playthroughs}`);
  console.log(`**Average Choices / Run**: ${(totalChoices / playthroughs).toFixed(1)}`);
  console.log(`**Average Unique Scenes / Run**: ${(totalScenesVisited / playthroughs).toFixed(1)}`);
  console.log(`**Runs hitting maxSteps**: ${maxStepAbortCount}`);
  console.log('');
  console.log('## Ending Distribution');
  console.log('');

  ENDING_TYPES.forEach((ending) => {
    const count = endingCounter[ending];
    const pct = ((count / playthroughs) * 100).toFixed(1).padStart(5, ' ');
    console.log(`- **${ending.padEnd(6, ' ')}**: ${String(count).padStart(4, ' ')} (${pct}%)`);
  });

  if (unknownEndings > 0) {
    const pct = ((unknownEndings / playthroughs) * 100).toFixed(1).padStart(5, ' ');
    console.log(`- **UNKNOWN**: ${String(unknownEndings).padStart(4, ' ')} (${pct}%)`);
  }

  console.log('');
  console.log('## Ticket Statistics (Final Values)');
  console.log('');
  console.log('| Ticket | Min | Max | Avg | Median |');
  console.log('|--------|-----|-----|-----|--------|');
  console.log(`| truth  | ${truthStats.min.toString().padStart(3, ' ')} | ${truthStats.max.toString().padStart(3, ' ')} | ${truthStats.avg.toFixed(2).padStart(4, ' ')} | ${truthStats.median.toFixed(2).padStart(6, ' ')} |`);
  console.log(`| love   | ${loveStats.min.toString().padStart(3, ' ')} | ${loveStats.max.toString().padStart(3, ' ')} | ${loveStats.avg.toFixed(2).padStart(4, ' ')} | ${loveStats.median.toFixed(2).padStart(6, ' ')} |`);
  console.log(`| guilt  | ${guiltStats.min.toString().padStart(3, ' ')} | ${guiltStats.max.toString().padStart(3, ' ')} | ${guiltStats.avg.toFixed(2).padStart(4, ' ')} | ${guiltStats.median.toFixed(2).padStart(6, ' ')} |`);
  console.log(`| escape | ${escapeStats.min.toString().padStart(3, ' ')} | ${escapeStats.max.toString().padStart(3, ' ')} | ${escapeStats.avg.toFixed(2).padStart(4, ' ')} | ${escapeStats.median.toFixed(2).padStart(6, ' ')} |`);

  console.log('');
  console.log('## Analysis');
  console.log('');

  if (unreachable.length > 0) {
    console.log(`⚠️ **UNREACHABLE ENDINGS**: ${unreachable.join(', ')}`);
  } else {
    console.log('✅ All canonical endings were reached in simulation.');
  }

  if (dominantRate >= 0.4) {
    console.log(`⚠️ **DOMINANT PATH**: ${dominant.ending} (${(dominantRate * 100).toFixed(1)}%)`);
  } else {
    console.log('✅ No single ending dominates >40% of all simulated runs.');
  }

  if (maxStepAbortCount > 0) {
    console.log(`⚠️ ${maxStepAbortCount} runs hit maxSteps before ending (possible pacing/loop friction).`);
  }

  console.log('');
}

main().catch((error) => {
  console.error('❌ Simulation failed');
  console.error(error);
  process.exit(1);
});
