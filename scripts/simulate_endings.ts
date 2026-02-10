#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - State Balance Simulation
// ============================================================================
// Simuliert 1000+ zufällige Playthroughs um zu prüfen:
// - Sind alle 5 Endings erreichbar?
// - Welche Ticket-Pfade sind dominant?
// - Gibt es unerreichbare Ticket-Kombinationen?
// ============================================================================

import { nachtzug19Manifest } from '../src/content/nachtzug19/manifest';
import type { GameState, Scene, Effect, Condition } from '../src/domain/types';

// ============================================================================
// Types
// ============================================================================

type SimulationResult = {
  playthrough_id: number;
  ending_id: string;
  ending_type: 'TRUTH' | 'LOVE' | 'GUILT' | 'ESCAPE' | 'LIMBO';
  final_state: {
    tickets_truth: number;
    tickets_love: number;
    tickets_guilt: number;
    tickets_escape: number;
    memory_drift: number;
    conductor_attention: number;
  };
  scenes_visited: number;
  choices_made: number;
  path_summary: string[];
};

type SimulationStats = {
  total_playthroughs: number;
  endings_reached: {
    TRUTH: number;
    LOVE: number;
    GUILT: number;
    ESCAPE: number;
    LIMBO: number;
  };
  ticket_stats: {
    truth: { min: number; max: number; avg: number; median: number };
    love: { min: number; max: number; avg: number; median: number };
    guilt: { min: number; max: number; avg: number; median: number };
    escape: { min: number; max: number; avg: number; median: number };
  };
  unreachable_endings: string[];
  dominant_path: 'TRUTH' | 'LOVE' | 'GUILT' | 'ESCAPE' | 'LIMBO' | null;
};

// ============================================================================
// Simplified Game State (for simulation)
// ============================================================================

function createInitialState(): GameState {
  return {
    current_scene_id: nachtzug19Manifest.start_scene_id,
    stats: { mut: 0, wissen: 0, empathie: 0 },
    tickets: { tickets_truth: 0, tickets_escape: 0, tickets_guilt: 0, tickets_love: 0 },
    pressure: { conductor_attention: 0, memory_drift: 0 },
    relations: { rel_comp7: 0, rel_boy: 0, rel_sleepless: 0 },
    items: {
      has_recorder: false,
      has_tag19: false,
      has_ticket: false,
      photo_anomaly: false,
      played_recorder: false,
      memory_search_active: false,
      emma_memory_unlocked: false
    },
    chapter_index: 1,
    station_count: 0,
    visited_scene_ids: [],
    history: [],
    isGameOver: false,
    save_version: 1
  };
}

// ============================================================================
// Effect Application
// ============================================================================

function applyEffect(state: GameState, effect: Effect): void {
  const { type, target, value } = effect;

  // Map effect targets to state paths
  const stateMap: Record<string, { obj: any; key: string }> = {
    // Tickets
    tickets_truth: { obj: state.tickets, key: 'tickets_truth' },
    tickets_love: { obj: state.tickets, key: 'tickets_love' },
    tickets_guilt: { obj: state.tickets, key: 'tickets_guilt' },
    tickets_escape: { obj: state.tickets, key: 'tickets_escape' },
    // Pressure
    conductor_attention: { obj: state.pressure, key: 'conductor_attention' },
    memory_drift: { obj: state.pressure, key: 'memory_drift' },
    // Relations
    rel_comp7: { obj: state.relations, key: 'rel_comp7' },
    rel_boy: { obj: state.relations, key: 'rel_boy' },
    rel_sleepless: { obj: state.relations, key: 'rel_sleepless' },
    // Items
    has_recorder: { obj: state.items, key: 'has_recorder' },
    has_tag19: { obj: state.items, key: 'has_tag19' },
    has_ticket: { obj: state.items, key: 'has_ticket' },
    photo_anomaly: { obj: state.items, key: 'photo_anomaly' },
    played_recorder: { obj: state.items, key: 'played_recorder' },
    memory_search_active: { obj: state.items, key: 'memory_search_active' },
    emma_memory_unlocked: { obj: state.items, key: 'emma_memory_unlocked' },
    // Meta (directly on state, not state.metadata)
    chapter_index: { obj: state, key: 'chapter_index' },
    station_count: { obj: state, key: 'station_count' },
    // Legacy stats
    mut: { obj: state.stats, key: 'mut' },
    wissen: { obj: state.stats, key: 'wissen' },
    empathie: { obj: state.stats, key: 'empathie' }
  };

  const mapping = stateMap[target];
  if (!mapping) {
    console.warn(`Unknown effect target: ${target}`);
    return;
  }

  const currentValue = mapping.obj[mapping.key];

  if (type === 'inc') {
    mapping.obj[mapping.key] = currentValue + ((value as number) || 1);
  } else if (type === 'dec') {
    mapping.obj[mapping.key] = currentValue - ((value as number) || 1);
  } else if (type === 'set') {
    mapping.obj[mapping.key] = value;
  } else if (type === 'clamp') {
    const min = effect.clamp_min ?? 0;
    const max = effect.clamp_max ?? 10;
    mapping.obj[mapping.key] = Math.max(min, Math.min(max, currentValue));
  }

  // Clamp tickets to 0-50 (game rule)
  if (target.startsWith('tickets_')) {
    const ticketKey = target as 'tickets_truth' | 'tickets_love' | 'tickets_guilt' | 'tickets_escape';
    state.tickets[ticketKey] = Math.max(0, Math.min(50, state.tickets[ticketKey]));
  }

  // Clamp conductor_attention to 0-6
  if (target === 'conductor_attention') {
    state.pressure.conductor_attention = Math.max(0, Math.min(6, state.pressure.conductor_attention));
  }
}

// ============================================================================
// Condition Evaluation
// ============================================================================

function evaluateCondition(state: GameState, condition: Condition): boolean {
  if (condition.type === 'compare') {
    const { target, operator, value } = condition;

    // Get current value from state
    let currentValue: number | boolean = 0;

    if (target.startsWith('tickets_')) {
      const ticketKey = target as 'tickets_truth' | 'tickets_love' | 'tickets_guilt' | 'tickets_escape';
      currentValue = state.tickets[ticketKey];
    } else if (target === 'conductor_attention') {
      currentValue = state.pressure.conductor_attention;
    } else if (target === 'memory_drift') {
      currentValue = state.pressure.memory_drift;
    } else if (target.startsWith('rel_')) {
      const relKey = target as 'rel_comp7' | 'rel_boy' | 'rel_sleepless';
      currentValue = state.relations[relKey];
    } else {
      console.warn(`Unknown condition target: ${target}`);
      return false;
    }

    // Evaluate operator
    switch (operator) {
      case '>=':
        return (currentValue as number) >= (value as number);
      case '>':
        return (currentValue as number) > (value as number);
      case '<=':
        return (currentValue as number) <= (value as number);
      case '<':
        return (currentValue as number) < (value as number);
      case '==':
        return currentValue === value;
      case '!=':
        return currentValue !== value;
      default:
        return false;
    }
  } else if (condition.type === 'bool') {
    const { target, value } = condition;
    const itemKey = target as keyof typeof state.items;
    return state.items[itemKey] === value;
  } else if (condition.type === 'and') {
    return condition.conditions.every(c => evaluateCondition(state, c));
  } else if (condition.type === 'or') {
    return condition.conditions.some(c => evaluateCondition(state, c));
  }

  return false;
}

// ============================================================================
// Determine Ending
// ============================================================================

function determineEnding(state: GameState): { id: string; type: 'TRUTH' | 'LOVE' | 'GUILT' | 'ESCAPE' | 'LIMBO' } {
  const { tickets_truth, tickets_love, tickets_guilt, tickets_escape } = state.tickets;

  // Priority: First ticket to reach 12
  if (tickets_truth >= 12) return { id: 'ending_truth_01', type: 'TRUTH' };
  if (tickets_love >= 12) return { id: 'ending_love_01', type: 'LOVE' };
  if (tickets_guilt >= 12) return { id: 'ending_guilt_01', type: 'GUILT' };
  if (tickets_escape >= 12) return { id: 'ending_escape_01', type: 'ESCAPE' };

  // Fallback: LIMBO
  return { id: 'ending_limbo_01', type: 'LIMBO' };
}

// ============================================================================
// Single Playthrough Simulation
// ============================================================================

function simulatePlaythrough(
  playthroughId: number,
  scenesMap: Record<string, Scene>,
  maxChoices: number = 200
): SimulationResult {
  const state = createInitialState();
  const pathSummary: string[] = [];
  let currentSceneId = state.current_scene_id;
  let choicesMade = 0;
  let scenesVisited = 0;

  while (choicesMade < maxChoices) {
    const scene = scenesMap[currentSceneId];
    if (!scene) {
      console.warn(`Scene not found: ${currentSceneId}`);
      break;
    }

    scenesVisited++;

    // Apply entry effects
    if (scene.entry_effects) {
      scene.entry_effects.forEach(effect => applyEffect(state, effect));
    }

    // Filter available choices (check conditions)
    const availableChoices = scene.choices.filter(choice => {
      if (!choice.condition) return true;
      if (typeof choice.condition === 'function') return true; // Skip function conditions
      return evaluateCondition(state, choice.condition);
    });

    if (availableChoices.length === 0) {
      console.warn(`No available choices in scene: ${currentSceneId}`);
      break;
    }

    // Randomly select a choice
    const selectedChoice = availableChoices[Math.floor(Math.random() * availableChoices.length)];

    // Apply choice effects
    if (selectedChoice.effects) {
      selectedChoice.effects.forEach(effect => applyEffect(state, effect));
    }

    // Track path
    pathSummary.push(`${scene.id}→${selectedChoice.id || selectedChoice.label}`);

    choicesMade++;

    // Apply exit effects
    if (scene.exit_effects) {
      scene.exit_effects.forEach(effect => applyEffect(state, effect));
    }

    // Move to next scene or ending
    if (selectedChoice.ending || (selectedChoice.next && selectedChoice.next.startsWith('ending_'))) {
      // Reached an ending - determine type from the next scene ID
      let endingType: 'TRUTH' | 'LOVE' | 'GUILT' | 'ESCAPE' | 'LIMBO' = 'LIMBO';
      const nextId = selectedChoice.next || selectedChoice.ending || '';

      if (nextId.includes('truth')) endingType = 'TRUTH';
      else if (nextId.includes('love')) endingType = 'LOVE';
      else if (nextId.includes('guilt')) endingType = 'GUILT';
      else if (nextId.includes('escape')) endingType = 'ESCAPE';
      else endingType = 'LIMBO';

      return {
        playthrough_id: playthroughId,
        ending_id: nextId,
        ending_type: endingType,
        final_state: {
          tickets_truth: state.tickets.tickets_truth,
          tickets_love: state.tickets.tickets_love,
          tickets_guilt: state.tickets.tickets_guilt,
          tickets_escape: state.tickets.tickets_escape,
          memory_drift: state.pressure.memory_drift,
          conductor_attention: state.pressure.conductor_attention
        },
        scenes_visited: scenesVisited,
        choices_made: choicesMade,
        path_summary: pathSummary.slice(-10) // Last 10 choices only
      };
    } else if (selectedChoice.next) {
      currentSceneId = selectedChoice.next;
    } else {
      console.warn(`Choice has no next/ending: ${selectedChoice.id || selectedChoice.label}`);
      break;
    }
  }

  // If we exit the loop (max choices or error), determine ending based on current state
  const ending = determineEnding(state);
  return {
    playthrough_id: playthroughId,
    ending_id: ending.id,
    ending_type: ending.type,
    final_state: {
      tickets_truth: state.tickets.tickets_truth,
      tickets_love: state.tickets.tickets_love,
      tickets_guilt: state.tickets.tickets_guilt,
      tickets_escape: state.tickets.tickets_escape,
      memory_drift: state.pressure.memory_drift,
      conductor_attention: state.pressure.conductor_attention
    },
    scenes_visited: scenesVisited,
    choices_made: choicesMade,
    path_summary: pathSummary.slice(-10)
  };
}

// ============================================================================
// Run Multiple Simulations
// ============================================================================

function runSimulations(scenesMap: Record<string, Scene>, numPlaythroughs: number = 1000): SimulationResult[] {
  const results: SimulationResult[] = [];

  console.log(`\n🎮 Running ${numPlaythroughs} simulated playthroughs...\n`);

  for (let i = 1; i <= numPlaythroughs; i++) {
    if (i % 100 === 0) {
      process.stdout.write(`\rProgress: ${i}/${numPlaythroughs}`);
    }
    const result = simulatePlaythrough(i, scenesMap);
    results.push(result);
  }

  console.log(`\n✅ Simulation complete!\n`);

  return results;
}

// ============================================================================
// Calculate Statistics
// ============================================================================

function calculateStats(results: SimulationResult[]): SimulationStats {
  const endingCounts = {
    TRUTH: 0,
    LOVE: 0,
    GUILT: 0,
    ESCAPE: 0,
    LIMBO: 0
  };

  const ticketValues = {
    truth: [] as number[],
    love: [] as number[],
    guilt: [] as number[],
    escape: [] as number[]
  };

  // Collect data
  results.forEach(result => {
    endingCounts[result.ending_type]++;
    ticketValues.truth.push(result.final_state.tickets_truth);
    ticketValues.love.push(result.final_state.tickets_love);
    ticketValues.guilt.push(result.final_state.tickets_guilt);
    ticketValues.escape.push(result.final_state.tickets_escape);
  });

  // Calculate stats
  const calcStats = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      median: sorted[Math.floor(sorted.length / 2)]
    };
  };

  const ticket_stats = {
    truth: calcStats(ticketValues.truth),
    love: calcStats(ticketValues.love),
    guilt: calcStats(ticketValues.guilt),
    escape: calcStats(ticketValues.escape)
  };

  // Find unreachable endings
  const unreachable_endings = Object.entries(endingCounts)
    .filter(([_, count]) => count === 0)
    .map(([ending]) => ending);

  // Find dominant path
  const maxCount = Math.max(...Object.values(endingCounts));
  const dominant = Object.entries(endingCounts).find(([_, count]) => count === maxCount);
  const dominant_path = dominant ? (dominant[0] as any) : null;

  return {
    total_playthroughs: results.length,
    endings_reached: endingCounts,
    ticket_stats,
    unreachable_endings,
    dominant_path
  };
}

// ============================================================================
// Print Report
// ============================================================================

function printReport(stats: SimulationStats): void {
  console.log('# NACHTZUG 19 - STATE BALANCE SIMULATION REPORT\n');
  console.log(`**Total Playthroughs**: ${stats.total_playthroughs}\n`);

  console.log('## Ending Distribution\n');
  const total = stats.total_playthroughs;
  Object.entries(stats.endings_reached).forEach(([ending, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const bar = '█'.repeat(Math.floor(count / total * 50));
    console.log(`- **${ending.padEnd(7)}**: ${count.toString().padStart(4)} (${percentage.padStart(5)}%) ${bar}`);
  });

  console.log('\n## Ticket Statistics (Final Values)\n');
  console.log('| Ticket | Min | Max | Avg  | Median |');
  console.log('|--------|-----|-----|------|--------|');
  Object.entries(stats.ticket_stats).forEach(([ticket, stat]) => {
    console.log(
      `| ${ticket.padEnd(6)} | ${stat.min}   | ${stat.max}   | ${stat.avg.toFixed(2)} | ${stat.median}      |`
    );
  });

  console.log('\n## Analysis\n');

  if (stats.unreachable_endings.length > 0) {
    console.log(`⚠️ **UNREACHABLE ENDINGS**: ${stats.unreachable_endings.join(', ')}`);
    console.log('   → These endings were never reached in simulation!\n');
  } else {
    console.log('✅ **All endings are reachable**\n');
  }

  if (stats.dominant_path) {
    const dominantCount = stats.endings_reached[stats.dominant_path];
    const dominantPct = ((dominantCount / total) * 100).toFixed(1);
    if (dominantCount > total * 0.4) {
      console.log(`⚠️ **DOMINANT PATH DETECTED**: ${stats.dominant_path} (${dominantPct}%)`);
      console.log('   → One ending is reached >40% of the time. Consider rebalancing.\n');
    } else {
      console.log(`✅ **Balanced distribution** (largest: ${stats.dominant_path} at ${dominantPct}%)\n`);
    }
  }

  // Check if any ticket is hard to max
  console.log('## Ticket Reachability\n');
  Object.entries(stats.ticket_stats).forEach(([ticket, stat]) => {
    if (stat.max < 5) {
      console.log(`⚠️ **${ticket.toUpperCase()}**: Max value = ${stat.max} (never reaches 5!)`);
      console.log(`   → Players cannot unlock ${ticket.toUpperCase()} ending!\n`);
    } else if (stat.avg < 2.5) {
      console.log(`⚠️ **${ticket.toUpperCase()}**: Average = ${stat.avg.toFixed(2)} (hard to accumulate)`);
      console.log(`   → Consider adding more ${ticket.toUpperCase()}-boosting choices\n`);
    }
  });
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('🔍 Starting NACHTZUG 19 State Balance Simulation...\n');

  // Load all chapters
  const [c1, c2, c3, c4, c5, c6, c7, endings] = await Promise.all([
    import('../src/content/nachtzug19/scenes/c1'),
    import('../src/content/nachtzug19/scenes/c2'),
    import('../src/content/nachtzug19/scenes/c3'),
    import('../src/content/nachtzug19/scenes/c4'),
    import('../src/content/nachtzug19/scenes/c5'),
    import('../src/content/nachtzug19/scenes/c6'),
    import('../src/content/nachtzug19/scenes/c7'),
    import('../src/content/nachtzug19/scenes/endings')
  ]);

  const allScenes = {
    ...c1.chapter1Scenes,
    ...c2.chapter2Scenes,
    ...c3.chapter3Scenes,
    ...c4.chapter4Scenes,
    ...c5.c5Scenes,
    ...c6.c6Scenes,
    ...c7.c7Scenes,
    ...endings.endingScenes
  };

  console.log(`📚 Loaded ${Object.keys(allScenes).length} scenes\n`);

  // Run simulations
  const results = runSimulations(allScenes, 1000);

  // Calculate statistics
  const stats = calculateStats(results);

  // Print report
  printReport(stats);

  console.log('\n✅ Simulation complete! Results saved to console.\n');
}

main().catch(console.error);
