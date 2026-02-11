#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Conditional Choice Coverage Analyzer
// ============================================================================
// Analysiert welche conditional Choices selten/nie erreicht werden:
// - Simuliert 1000 Playthroughs
// - Trackt wie oft jede conditional Choice sichtbar ist
// - Identifiziert "Orphan Choices" (zu hohe Schwellen)
// - Empfiehlt Threshold-Anpassungen
// ============================================================================

import type { GameState, Scene, Condition, Effect } from '../src/domain/types';

// ============================================================================
// Types
// ============================================================================

type ChoiceCoverage = {
  scene_id: string;
  scene_title: string;
  choice_id: string;
  choice_label: string;
  condition?: Condition;
  condition_str: string;
  times_available: number;
  times_chosen: number;
  availability_rate: number; // % of playthroughs where choice was available
  selection_rate: number;    // % of times it was chosen when available
};

// ============================================================================
// State Management (copied from simulate_endings.ts)
// ============================================================================

function createInitialState(startSceneId: string): GameState {
  return {
    current_scene_id: startSceneId,
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
      emma_memory_unlocked: false,
      stance_bold: false,
      stance_cautious: false
    },
    chapter_index: 1,
    station_count: 0,
    visited_scene_ids: [],
    history: [],
    isGameOver: false,
    save_version: 1
  };
}

function applyEffect(state: GameState, effect: Effect): void {
  const { type, target, value } = effect;

  const stateMap: Record<string, { obj: any; key: string }> = {
    tickets_truth: { obj: state.tickets, key: 'tickets_truth' },
    tickets_love: { obj: state.tickets, key: 'tickets_love' },
    tickets_guilt: { obj: state.tickets, key: 'tickets_guilt' },
    tickets_escape: { obj: state.tickets, key: 'tickets_escape' },
    conductor_attention: { obj: state.pressure, key: 'conductor_attention' },
    memory_drift: { obj: state.pressure, key: 'memory_drift' },
    rel_comp7: { obj: state.relations, key: 'rel_comp7' },
    rel_boy: { obj: state.relations, key: 'rel_boy' },
    rel_sleepless: { obj: state.relations, key: 'rel_sleepless' },
    has_recorder: { obj: state.items, key: 'has_recorder' },
    has_tag19: { obj: state.items, key: 'has_tag19' },
    has_ticket: { obj: state.items, key: 'has_ticket' },
    photo_anomaly: { obj: state.items, key: 'photo_anomaly' },
    played_recorder: { obj: state.items, key: 'played_recorder' },
    memory_search_active: { obj: state.items, key: 'memory_search_active' },
    emma_memory_unlocked: { obj: state.items, key: 'emma_memory_unlocked' },
    chapter_index: { obj: state, key: 'chapter_index' },
    station_count: { obj: state, key: 'station_count' },
    mut: { obj: state.stats, key: 'mut' },
    wissen: { obj: state.stats, key: 'wissen' },
    empathie: { obj: state.stats, key: 'empathie' }
  };

  const mapping = stateMap[target];
  if (!mapping) return;

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

  // Clamp tickets to 0-50
  if (target.startsWith('tickets_')) {
    const ticketKey = target as 'tickets_truth' | 'tickets_love' | 'tickets_guilt' | 'tickets_escape';
    state.tickets[ticketKey] = Math.max(0, Math.min(50, state.tickets[ticketKey]));
  }

  // Clamp conductor_attention to 0-6
  if (target === 'conductor_attention') {
    state.pressure.conductor_attention = Math.max(0, Math.min(6, state.pressure.conductor_attention));
  }
}

function evaluateCondition(state: GameState, condition: Condition): boolean {
  if (condition.type === 'compare') {
    const { target, operator, value } = condition;

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
      return false;
    }

    switch (operator) {
      case '>=': return (currentValue as number) >= (value as number);
      case '>': return (currentValue as number) > (value as number);
      case '<=': return (currentValue as number) <= (value as number);
      case '<': return (currentValue as number) < (value as number);
      case '==': return currentValue === value;
      case '!=': return currentValue !== value;
      default: return false;
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
// Condition to String
// ============================================================================

function conditionToString(condition: Condition): string {
  if (condition.type === 'compare') {
    return `${condition.target} ${condition.operator} ${condition.value}`;
  } else if (condition.type === 'bool') {
    return `${condition.target} == ${condition.value}`;
  } else if (condition.type === 'and') {
    return `(${condition.conditions.map(conditionToString).join(' AND ')})`;
  } else if (condition.type === 'or') {
    return `(${condition.conditions.map(conditionToString).join(' OR ')})`;
  }
  return 'unknown';
}

// ============================================================================
// Simulation with Coverage Tracking
// ============================================================================

function simulateWithCoverage(
  startSceneId: string,
  scenesMap: Record<string, Scene>,
  coverageMap: Map<string, ChoiceCoverage>,
  maxChoices: number = 200
): void {
  const state = createInitialState(startSceneId);
  let currentSceneId = state.current_scene_id;
  let choicesMade = 0;

  while (choicesMade < maxChoices) {
    const scene = scenesMap[currentSceneId];
    if (!scene) break;

    // Apply entry effects
    if (scene.entry_effects) {
      scene.entry_effects.forEach(effect => applyEffect(state, effect));
    }

    // Check all choices for availability
    scene.choices.forEach(choice => {
      const choiceKey = `${scene.id}::${choice.id || choice.label}`;
      const coverage = coverageMap.get(choiceKey);

      if (coverage) {
        // Check if choice is available (condition met)
        const isAvailable = !choice.condition ||
                           typeof choice.condition === 'function' ||
                           evaluateCondition(state, choice.condition);

        if (isAvailable) {
          coverage.times_available++;
        }
      }
    });

    // Filter available choices
    const availableChoices = scene.choices.filter(choice => {
      if (!choice.condition) return true;
      if (typeof choice.condition === 'function') return true;
      return evaluateCondition(state, choice.condition);
    });

    if (availableChoices.length === 0) break;

    // Randomly select a choice
    const selectedChoice = availableChoices[Math.floor(Math.random() * availableChoices.length)];

    // Track selection
    const choiceKey = `${scene.id}::${selectedChoice.id || selectedChoice.label}`;
    const coverage = coverageMap.get(choiceKey);
    if (coverage) {
      coverage.times_chosen++;
    }

    // Apply choice effects
    if (selectedChoice.effects) {
      selectedChoice.effects.forEach(effect => applyEffect(state, effect));
    }

    choicesMade++;

    // Apply exit effects
    if (scene.exit_effects) {
      scene.exit_effects.forEach(effect => applyEffect(state, effect));
    }

    // Move to next scene or ending
    if (selectedChoice.ending || (selectedChoice.next && selectedChoice.next.startsWith('ending_'))) {
      break; // End playthrough
    } else if (selectedChoice.next) {
      currentSceneId = selectedChoice.next;
    } else {
      break;
    }
  }
}

// ============================================================================
// Main Analysis
// ============================================================================

async function main() {
  console.log('🔍 Starting Conditional Choice Coverage Analysis...\n');

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

  // Initialize coverage map
  const coverageMap = new Map<string, ChoiceCoverage>();

  Object.values(allScenes).forEach(scene => {
    scene.choices.forEach(choice => {
      if (choice.condition && typeof choice.condition !== 'function') {
        const choiceKey = `${scene.id}::${choice.id || choice.label}`;
        coverageMap.set(choiceKey, {
          scene_id: scene.id,
          scene_title: scene.title || scene.id,
          choice_id: choice.id || '',
          choice_label: choice.label || '',
          condition: choice.condition,
          condition_str: conditionToString(choice.condition),
          times_available: 0,
          times_chosen: 0,
          availability_rate: 0,
          selection_rate: 0
        });
      }
    });
  });

  console.log(`🎯 Found ${coverageMap.size} conditional choices\n`);

  // Run simulations
  const numPlaythroughs = 1000;
  console.log(`🎮 Running ${numPlaythroughs} simulations...\n`);

  for (let i = 1; i <= numPlaythroughs; i++) {
    if (i % 100 === 0) {
      process.stdout.write(`\rProgress: ${i}/${numPlaythroughs}`);
    }
    simulateWithCoverage('c1_s01_platform', allScenes, coverageMap);
  }

  console.log(`\n✅ Simulation complete!\n`);

  // Calculate rates
  coverageMap.forEach(coverage => {
    coverage.availability_rate = (coverage.times_available / numPlaythroughs) * 100;
    coverage.selection_rate = coverage.times_available > 0
      ? (coverage.times_chosen / coverage.times_available) * 100
      : 0;
  });

  // Sort by availability rate (ascending)
  const sortedCoverage = Array.from(coverageMap.values()).sort((a, b) => a.availability_rate - b.availability_rate);

  // Print report
  console.log('# CONDITIONAL CHOICE COVERAGE REPORT\n');
  console.log(`**Total Conditional Choices**: ${coverageMap.size}`);
  console.log(`**Playthroughs**: ${numPlaythroughs}\n`);

  // Identify orphan choices (never or rarely available)
  const orphans = sortedCoverage.filter(c => c.availability_rate === 0);
  const rare = sortedCoverage.filter(c => c.availability_rate > 0 && c.availability_rate < 10);
  const uncommon = sortedCoverage.filter(c => c.availability_rate >= 10 && c.availability_rate < 30);

  console.log('## Summary\n');
  console.log(`- **Never Available**: ${orphans.length} (${((orphans.length / coverageMap.size) * 100).toFixed(1)}%)`);
  console.log(`- **Rare** (< 10%): ${rare.length}`);
  console.log(`- **Uncommon** (10-30%): ${uncommon.length}`);
  console.log(`- **Common** (> 30%): ${sortedCoverage.length - orphans.length - rare.length - uncommon.length}\n`);

  // Orphan Choices (P0 - Never Available)
  if (orphans.length > 0) {
    console.log('## ⚠️ ORPHAN CHOICES (Never Available)\n');
    console.log('| Scene | Choice | Condition | Recommendation |');
    console.log('|-------|--------|-----------|----------------|');
    orphans.forEach(c => {
      const condShort = c.condition_str.length > 40 ? c.condition_str.substring(0, 37) + '...' : c.condition_str;
      console.log(`| ${c.scene_id} | ${c.choice_label.substring(0, 20)} | ${condShort} | Lower threshold or add path |`);
    });
    console.log('');
  }

  // Rare Choices (P1 - Seen < 10%)
  if (rare.length > 0) {
    console.log('## ⚠️ RARE CHOICES (< 10% Availability)\n');
    console.log('| Scene | Choice | Condition | Availability | Recommendation |');
    console.log('|-------|--------|-----------|--------------|----------------|');
    rare.forEach(c => {
      const condShort = c.condition_str.length > 30 ? c.condition_str.substring(0, 27) + '...' : c.condition_str;
      console.log(`| ${c.scene_id} | ${c.choice_label.substring(0, 20)} | ${condShort} | ${c.availability_rate.toFixed(1)}% | Consider lowering threshold |`);
    });
    console.log('');
  }

  // Uncommon Choices (P2 - 10-30%)
  if (uncommon.length > 0) {
    console.log('## 📝 UNCOMMON CHOICES (10-30% Availability)\n');
    console.log('| Scene | Choice | Condition | Availability |');
    console.log('|-------|--------|-----------|--------------|');
    uncommon.forEach(c => {
      const condShort = c.condition_str.length > 40 ? c.condition_str.substring(0, 37) + '...' : c.condition_str;
      console.log(`| ${c.scene_id} | ${c.choice_label.substring(0, 25)} | ${condShort} | ${c.availability_rate.toFixed(1)}% |`);
    });
    console.log('');
  }

  // Full table (sorted by availability, lowest first)
  console.log('## Complete Coverage Table (Bottom 20)\n');
  console.log('| Scene | Choice | Condition | Avail % | Chosen % |');
  console.log('|-------|--------|-----------|---------|----------|');
  sortedCoverage.slice(0, 20).forEach(c => {
    const condShort = c.condition_str.length > 35 ? c.condition_str.substring(0, 32) + '...' : c.condition_str;
    const label = c.choice_label.length > 25 ? c.choice_label.substring(0, 22) + '...' : c.choice_label;
    console.log(
      `| ${c.scene_id.padEnd(20)} | ${label.padEnd(25)} | ${condShort.padEnd(35)} | ${c.availability_rate.toFixed(1).padStart(5)}% | ${c.selection_rate.toFixed(1).padStart(6)}% |`
    );
  });

  console.log('\n✅ Analysis complete!\n');
}

main().catch(console.error);
