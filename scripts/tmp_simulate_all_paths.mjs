#!/usr/bin/env node
/**
 * TMP_SIMULATE_ALL_PATHS.mjs
 *
 * Temporary simulation script for Story QA - Phase 2
 * Traverses all reachable scenes using BFS
 *
 * Usage: node scripts/tmp_simulate_all_paths.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ============================================================================
// SCENE EXTRACTION
// ============================================================================

function extractScenes(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const scenes = {};

  // Find all scene blocks by matching 'cX_sXX_name': { ... }
  // Use a state machine approach to handle nested braces
  const sceneStartRegex = /'(c\d+_[a-z0-9_]+)'\s*:\s*\{/g;
  let match;

  while ((match = sceneStartRegex.exec(content)) !== null) {
    const sceneId = match[1];
    const startPos = content.indexOf('{', match.index);

    // Find matching closing brace
    let depth = 0;
    let endPos = startPos;
    let inString = false;
    let stringChar = null;
    let escaped = false;

    for (let i = startPos; i < content.length; i++) {
      const char = content[i];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (!inString) {
        if (char === '"' || char === "'" || char === '`') {
          inString = true;
          stringChar = char;
        } else if (char === '{') {
          depth++;
        } else if (char === '}') {
          depth--;
          if (depth === 0) {
            endPos = i + 1;
            break;
          }
        }
      } else {
        if (char === stringChar) {
          inString = false;
          stringChar = null;
        }
      }
    }

    const sceneBlock = content.substring(startPos, endPos);

    // Extract all 'next' references
    const nextRefs = [];
    const nextRegex = /next:\s*['"]([^'"]+)['"]/g;
    let nextMatch;
    while ((nextMatch = nextRegex.exec(sceneBlock)) !== null) {
      nextRefs.push(nextMatch[1]);
    }

    // Extract all 'ending' references
    const endingRefs = [];
    const endingRegex = /ending:\s*['"]([^'"]+)['"]/g;
    let endingMatch;
    while ((endingMatch = endingRegex.exec(sceneBlock)) !== null) {
      endingRefs.push(endingMatch[1]);
    }

    // Extract choice IDs
    const choiceIds = [];
    // Match "id:" within choices array
    const choicesStart = sceneBlock.indexOf('choices:');
    if (choicesStart !== -1) {
      const choicesSection = sceneBlock.substring(choicesStart);
      const choiceIdRegex = /id:\s*['"]([^'"]+)['"]/g;
      let choiceIdMatch;
      while ((choiceIdMatch = choiceIdRegex.exec(choicesSection)) !== null) {
        choiceIds.push(choiceIdMatch[1]);
      }
    }

    // Check for narrative variants
    const hasVariants = sceneBlock.includes('narrative_variants');

    // Check for tags
    const tags = [];
    const tagsMatch = sceneBlock.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch) {
      const tagRegex = /['"]([^'"]+)['"]/g;
      let tagMatch;
      while ((tagMatch = tagRegex.exec(tagsMatch[1])) !== null) {
        tags.push(tagMatch[1]);
      }
    }

    scenes[sceneId] = {
      id: sceneId,
      nextRefs: nextRefs,
      endingRefs: endingRefs,
      choiceIds: choiceIds,
      hasVariants: hasVariants,
      tags: tags
    };
  }

  return scenes;
}

// ============================================================================
// LOAD ALL CHAPTERS
// ============================================================================

function loadAllScenes() {
  const scenesDir = join(projectRoot, 'src/content/nachtzug19/scenes');
  const allScenes = {};

  for (let i = 1; i <= 7; i++) {
    const filePath = join(scenesDir, `c${i}.ts`);
    try {
      const chapterScenes = extractScenes(filePath);
      Object.assign(allScenes, chapterScenes);
      console.log(`  Loaded c${i}.ts: ${Object.keys(chapterScenes).length} scenes`);
    } catch (err) {
      console.error(`  Error loading c${i}.ts:`, err.message);
    }
  }

  return allScenes;
}

// ============================================================================
// BFS TRAVERSAL
// ============================================================================

function traverseAllPaths(scenes, startScene) {
  const visited = {
    scenes: new Set(),
    choices: new Set(),
    endings: new Set(),
    deadEnds: [],
    brokenLinks: [],
    scenesWithVariants: []
  };

  const queue = [startScene];

  while (queue.length > 0) {
    const currentId = queue.shift();

    if (visited.scenes.has(currentId)) continue;

    const scene = scenes[currentId];
    if (!scene) {
      visited.brokenLinks.push({ from: 'traversal', to: currentId });
      continue;
    }

    visited.scenes.add(currentId);

    if (scene.hasVariants) {
      visited.scenesWithVariants.push(currentId);
    }

    // Track choice IDs
    for (const choiceId of scene.choiceIds) {
      visited.choices.add(`${currentId}::${choiceId}`);
    }

    // Check for dead-ends (no next refs and no ending refs)
    if (scene.nextRefs.length === 0 && scene.endingRefs.length === 0) {
      visited.deadEnds.push(currentId);
    }

    // Process next references
    for (const nextRef of scene.nextRefs) {
      if (!scenes[nextRef]) {
        visited.brokenLinks.push({ from: currentId, to: nextRef });
      } else if (!visited.scenes.has(nextRef)) {
        queue.push(nextRef);
      }
    }

    // Collect endings
    for (const ending of scene.endingRefs) {
      visited.endings.add(ending);
    }
  }

  // Find orphan scenes
  const orphanScenes = [];
  for (const sceneId of Object.keys(scenes)) {
    if (!visited.scenes.has(sceneId)) {
      orphanScenes.push(sceneId);
    }
  }

  return { ...visited, orphanScenes };
}

// ============================================================================
// MAIN
// ============================================================================

console.log('='.repeat(70));
console.log('NACHTZUG 19 - Path Simulation (Phase 2)');
console.log('='.repeat(70));
console.log('');

console.log('Loading scenes...');
const scenes = loadAllScenes();
const totalScenes = Object.keys(scenes).length;
console.log(`\nTotal scenes loaded: ${totalScenes}`);
console.log('');

console.log('Traversing all reachable paths from c1_s01_platform...');
const results = traverseAllPaths(scenes, 'c1_s01_platform');

console.log('');
console.log('='.repeat(70));
console.log('SIMULATION RESULTS');
console.log('='.repeat(70));
console.log('');

console.log(`Scenes visited:        ${results.scenes.size} / ${totalScenes}`);
console.log(`Choices executed:      ${results.choices.size}`);
console.log(`Endings reached:       ${results.endings.size}`);
if (results.endings.size > 0) {
  console.log(`  Endings: ${Array.from(results.endings).join(', ')}`);
}
console.log(`Scenes with variants:  ${results.scenesWithVariants.length}`);
console.log('');

if (results.deadEnds.length > 0) {
  console.log(`Dead-end scenes: ${results.deadEnds.length}`);
  results.deadEnds.forEach(s => console.log(`  - ${s}`));
  console.log('');
}

if (results.orphanScenes.length > 0) {
  console.log(`Orphan scenes (unreachable): ${results.orphanScenes.length}`);
  results.orphanScenes.slice(0, 15).forEach(s => console.log(`  - ${s}`));
  if (results.orphanScenes.length > 15) {
    console.log(`  ... and ${results.orphanScenes.length - 15} more`);
  }
  console.log('');
}

if (results.brokenLinks.length > 0) {
  console.log(`Broken links: ${results.brokenLinks.length}`);
  results.brokenLinks.forEach(l => {
    console.log(`  - ${l.from} -> ${l.to}`);
  });
  console.log('');
}

// Calculate coverage
const coverage = ((results.scenes.size / totalScenes) * 100).toFixed(1);
console.log('='.repeat(70));
console.log(`COVERAGE: ${coverage}% of scenes reachable`);
console.log('='.repeat(70));

// Check for expected endings
const expectedEndings = ['truth_ending', 'escape_ending', 'love_ending', 'guilt_ending'];
const missingEndings = expectedEndings.filter(e => !results.endings.has(e));
if (missingEndings.length > 0) {
  console.log('');
  console.log('WARNING: Missing expected endings:');
  missingEndings.forEach(e => console.log(`  - ${e}`));
}

// Scene distribution by chapter
console.log('');
console.log('Scene distribution by chapter:');
const chapterCounts = {};
const chapterTotals = {};
for (const sceneId of Object.keys(scenes)) {
  const chapter = sceneId.match(/c(\d+)_/)?.[1] || '?';
  chapterTotals[chapter] = (chapterTotals[chapter] || 0) + 1;
}
for (const sceneId of results.scenes) {
  const chapter = sceneId.match(/c(\d+)_/)?.[1] || '?';
  chapterCounts[chapter] = (chapterCounts[chapter] || 0) + 1;
}
for (let i = 1; i <= 7; i++) {
  const count = chapterCounts[i] || 0;
  const total = chapterTotals[i] || 0;
  const pct = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
  console.log(`  Chapter ${i}: ${count}/${total} scenes (${pct}%)`);
}

// Narrative variants by chapter
console.log('');
console.log('Narrative variants by chapter:');
const variantsByChapter = {};
for (const sceneId of results.scenesWithVariants) {
  const chapter = sceneId.match(/c(\d+)_/)?.[1] || '?';
  variantsByChapter[chapter] = (variantsByChapter[chapter] || 0) + 1;
}
for (let i = 1; i <= 7; i++) {
  const count = variantsByChapter[i] || 0;
  console.log(`  Chapter ${i}: ${count} scenes with drift variants`);
}

console.log('');
console.log('Simulation complete.');
