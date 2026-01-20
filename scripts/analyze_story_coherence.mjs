#!/usr/bin/env node
/**
 * NACHTZUG 19 Story Coherence Analysis
 * Traces playthrough paths and analyzes narrative coherence
 */

import fs from 'fs/promises';

const STORY_JSON_PATH = './export/story.json';
const REPORTS_DIR = './reports';

// Simulate a playthrough based on a decision pattern
async function simulatePlaythrough(scenes, manifest, pathName, choiceStrategy) {
  const path = [];
  const stateLog = [];
  let currentSceneId = manifest.start_scene_id;
  let visitCount = 0;
  const maxVisits = 200; // Prevent infinite loops

  // Initialize simple state tracker
  const state = {
    tickets: { tickets_truth: 0, tickets_escape: 0, tickets_guilt: 0, tickets_love: 0 },
    pressure: { conductor_attention: 0, memory_drift: 0 },
    relations: { rel_comp7: 0, rel_boy: 0, rel_sleepless: 0 },
    items: { has_recorder: false, has_tag19: false, photo_anomaly: false },
    chapter_index: 1,
    station_count: 0
  };

  while (visitCount < maxVisits) {
    const scene = scenes.find(s => s.id === currentSceneId);
    if (!scene) {
      path.push({ error: `Scene not found: ${currentSceneId}` });
      break;
    }

    // Record current state
    stateLog.push({
      sceneId: currentSceneId,
      chapter: scene.chapter,
      title: scene.title,
      state: JSON.parse(JSON.stringify(state))
    });

    // Choose based on strategy
    const choice = choiceStrategy(scene, state, path);
    if (!choice) {
      path.push({ error: `No valid choice in scene: ${currentSceneId}` });
      break;
    }

    // Apply simple effects (approximate)
    if (choice.effects) {
      choice.effects.forEach(effect => {
        applySimpleEffect(state, effect);
      });
    }

    // Check for station_end
    if (scene.tags?.includes('station_end')) {
      state.pressure.memory_drift = Math.min(6, state.pressure.memory_drift + 1);
      state.station_count++;
    }

    path.push({
      sceneId: currentSceneId,
      chapter: scene.chapter,
      title: scene.title,
      choiceId: choice.id,
      choiceLabel: choice.label,
      next: choice.next || choice.ending,
      drift: state.pressure.memory_drift,
      tickets: { ...state.tickets }
    });

    // Move to next
    if (choice.ending) {
      path.push({ ending: choice.ending });
      break;
    }

    if (choice.next) {
      currentSceneId = choice.next;
      visitCount++;
    } else {
      break;
    }
  }

  return { pathName, path, stateLog };
}

function applySimpleEffect(state, effect) {
  const parts = effect.target.split('.');
  let target = state;

  // Navigate to the right sub-object
  if (effect.target.startsWith('tickets_')) {
    target = state.tickets;
  } else if (effect.target === 'conductor_attention' || effect.target === 'memory_drift') {
    target = state.pressure;
  } else if (effect.target.startsWith('rel_')) {
    target = state.relations;
  } else if (effect.target.startsWith('has_') || effect.target === 'photo_anomaly') {
    target = state.items;
  }

  const key = effect.target;
  const nestedKey = effect.target.split('_').slice(1).join('_') || effect.target;

  switch (effect.type) {
    case 'inc':
      if (target[key] !== undefined) {
        target[key] = Math.min((target[key] || 0) + effect.value, 10);
      }
      break;
    case 'dec':
      if (target[key] !== undefined) {
        target[key] = Math.max((target[key] || 0) - effect.value, -2);
      }
      break;
    case 'set':
      if (target[key] !== undefined) {
        target[key] = effect.value;
      }
      break;
  }
}

// Decision strategies
const strategies = {
  // Path 1: Always choose truth/investigation options
  truthSeeker: (scene, state, path) => {
    const choices = scene.choices || [];

    // Prefer choices with truth effects
    const truthChoice = choices.find(c =>
      c.effects?.some(e => e.target === 'tickets_truth') ||
      c.label?.toLowerCase().includes('frag') ||
      c.label?.toLowerCase().includes('untersucht')
    );
    if (truthChoice) return truthChoice;

    return choices[0];
  },

  // Path 2: Always choose escape/avoidance options
  escapeArtist: (scene, state, path) => {
    const choices = scene.choices || [];

    // Prefer choices with escape effects
    const escapeChoice = choices.find(c =>
      c.effects?.some(e => e.target === 'tickets_escape') ||
      c.label?.toLowerCase().includes('wegschau') ||
      c.label?.toLowerCase().includes('ignorier')
    );
    if (escapeChoice) return escapeChoice;

    return choices[0];
  },

  // Path 3: Build relationships
  socialPath: (scene, state, path) => {
    const choices = scene.choices || [];

    // Prefer choices that build relationships
    const socialChoice = choices.find(c =>
      c.effects?.some(e => e.target.startsWith('rel_')) ||
      c.label?.toLowerCase().includes('sprech') ||
      c.label?.toLowerCase().includes('frag')
    );
    if (socialChoice) return socialChoice;

    return choices[0];
  },

  // Path 4: Guilt/responsibility path
  guiltPath: (scene, state, path) => {
    const choices = scene.choices || [];

    // Prefer choices with guilt effects
    const guiltChoice = choices.find(c =>
      c.effects?.some(e => e.target === 'tickets_guilt')
    );
    if (guiltChoice) return guiltChoice;

    return choices[0];
  }
};

async function main() {
  console.log('📖 NACHTZUG 19 Story Coherence Analysis');
  console.log('='.repeat(80));

  const storyData = JSON.parse(await fs.readFile(STORY_JSON_PATH, 'utf-8'));
  const { manifest, scenes } = storyData;

  console.log(`Loaded ${scenes.length} scenes`);
  console.log('');

  // Run 4 playthroughs
  const playthroughs = [];

  console.log('Running playthrough simulations...');
  playthroughs.push(await simulatePlaythrough(scenes, manifest, 'Truth Seeker', strategies.truthSeeker));
  playthroughs.push(await simulatePlaythrough(scenes, manifest, 'Escape Artist', strategies.escapeArtist));
  playthroughs.push(await simulatePlaythrough(scenes, manifest, 'Social Path', strategies.socialPath));
  playthroughs.push(await simulatePlaythrough(scenes, manifest, 'Guilt Path', strategies.guiltPath));

  console.log('✅ Completed 4 playthrough simulations');
  console.log('');

  // Generate report
  let report = `# NACHTZUG 19 Playthrough Paths\n\n`;
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `This document traces 4 deterministic playthrough paths through the story.\n\n`;

  playthroughs.forEach((pt, idx) => {
    report += `## Path ${idx + 1}: ${pt.pathName}\n\n`;
    report += `### Overview\n\n`;
    report += `- **Total Steps:** ${pt.path.length}\n`;

    const ending = pt.path[pt.path.length - 1]?.ending;
    if (ending) {
      report += `- **Ending:** ${ending}\n`;
    }

    // Calculate final state
    const lastState = pt.stateLog[pt.stateLog.length - 1];
    if (lastState) {
      report += `- **Final Drift:** ${lastState.state.pressure.memory_drift}\n`;
      report += `- **Final Tickets:** Truth=${lastState.state.tickets.tickets_truth}, Escape=${lastState.state.tickets.tickets_escape}, Guilt=${lastState.state.tickets.tickets_guilt}, Love=${lastState.state.tickets.tickets_love}\n`;
    }

    report += `\n### Journey\n\n`;
    report += `| Step | Scene | Chapter | Choice | Next |\n`;
    report += `|------|-------|---------|--------|------|\n`;

    pt.path.forEach((step, stepIdx) => {
      if (step.error) {
        report += `| ${stepIdx + 1} | ERROR | - | ${step.error} | - |\n`;
      } else if (step.ending) {
        report += `| ${stepIdx + 1} | ENDING | - | - | ${step.ending} |\n`;
      } else {
        const sceneDisplay = `\`${step.sceneId}\``;
        const choiceDisplay = step.choiceLabel || step.choiceId || '-';
        const nextDisplay = step.next || '-';
        report += `| ${stepIdx + 1} | ${sceneDisplay} | ${step.chapter} | ${choiceDisplay} | ${nextDisplay} |\n`;
      }
    });

    report += `\n`;

    // Show key narrative moments (first 5 scenes)
    report += `### Key Scenes (First 5)\n\n`;
    pt.stateLog.slice(0, 5).forEach((log, logIdx) => {
      const scene = scenes.find(s => s.id === log.sceneId);
      if (scene) {
        report += `#### ${logIdx + 1}. ${scene.title || scene.id}\n\n`;
        const narrativePreview = (scene.narrative || '').split('\n')[0].slice(0, 150);
        report += `> ${narrativePreview}${narrativePreview.length >= 150 ? '...' : ''}\n\n`;
      }
    });

    report += `\n`;
  });

  // Write report
  await fs.writeFile(`${REPORTS_DIR}/path_playthroughs.md`, report);
  console.log('✅ Written: reports/path_playthroughs.md');

  // Analysis: Find potential story issues
  let coherenceReport = `# Story Coherence Issues\n\n`;
  coherenceReport += `**Generated:** ${new Date().toISOString()}\n\n`;

  // Check for setup/payoff issues
  coherenceReport += `## Setup/Payoff Analysis\n\n`;

  // Track items that are set but never referenced in narrative
  const itemMentions = {
    has_recorder: { set: [], mentioned: [] },
    has_tag19: { set: [], mentioned: [] },
    photo_anomaly: { set: [], mentioned: [] }
  };

  scenes.forEach(scene => {
    const narrative = (scene.narrative || '').toLowerCase();

    // Check mentions in narrative
    if (narrative.includes('recorder') || narrative.includes('kassettenrekorder')) {
      itemMentions.has_recorder.mentioned.push(scene.id);
    }
    if (narrative.includes('tag19') || narrative.includes('etikett')) {
      itemMentions.has_tag19.mentioned.push(scene.id);
    }
    if (narrative.includes('foto') || narrative.includes('photo')) {
      itemMentions.photo_anomaly.mentioned.push(scene.id);
    }

    // Check where items are set
    scene.choices?.forEach(choice => {
      choice.effects?.forEach(effect => {
        if (effect.target === 'has_recorder' && effect.value === true) {
          itemMentions.has_recorder.set.push({ scene: scene.id, choice: choice.id });
        }
        if (effect.target === 'has_tag19' && effect.value === true) {
          itemMentions.has_tag19.set.push({ scene: scene.id, choice: choice.id });
        }
        if (effect.target === 'photo_anomaly' && effect.value === true) {
          itemMentions.photo_anomaly.set.push({ scene: scene.id, choice: choice.id });
        }
      });
    });
  });

  Object.entries(itemMentions).forEach(([item, data]) => {
    if (data.set.length > 0) {
      coherenceReport += `### Item: \`${item}\`\n\n`;
      coherenceReport += `- **Acquired in:** ${data.set.length} scenes\n`;
      coherenceReport += `- **Mentioned in narrative:** ${data.mentioned.length} scenes\n`;
      if (data.mentioned.length === 0) {
        coherenceReport += `- ⚠️ **WARNING:** Item is acquired but never mentioned in any narrative\n`;
      }
      coherenceReport += `\n`;
    }
  });

  await fs.writeFile(`${REPORTS_DIR}/story_coherence.md`, coherenceReport);
  console.log('✅ Written: reports/story_coherence.md');

  console.log('');
  console.log('='.repeat(80));
  console.log('✅ Story coherence analysis complete');
}

main().catch(console.error);
