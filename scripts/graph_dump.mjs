#!/usr/bin/env node
// ============================================================================
// NACHTZUG 19 - Graph Dump Script
// ============================================================================
// Analysiert die story.json und extrahiert Graph-Metriken:
// - Unreachable scenes (nicht von Start erreichbar)
// - Dead ends (keine ausgehenden Choices und kein Ending)
// - Cycles (Strongly Connected Components mit Tarjan)
// ============================================================================

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORY_PATH = join(__dirname, '../android-native/app/src/main/assets/story.json');
const OUTPUT_PATH = join(__dirname, '../docs/evidence/graph_dump.json');

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('📊 NACHTZUG 19 Graph Dump');
  console.log('='.repeat(50));

  // 1. Load story.json
  console.log('\n1. Loading story.json...');
  const storyRaw = await readFile(STORY_PATH, 'utf-8');
  const story = JSON.parse(storyRaw);

  const { manifest, scenes: scenesArray, endings } = story;
  const startSceneId = manifest.start_scene_id;

  // Convert scenes array to map for O(1) lookup
  const scenes = new Map();
  for (const scene of scenesArray) {
    scenes.set(scene.id, scene);
  }

  // Get ending IDs
  const endingIds = new Set(Object.keys(endings || {}));

  console.log(`   - Start scene: ${startSceneId}`);
  console.log(`   - Total scenes: ${scenes.size}`);
  console.log(`   - Total endings: ${endingIds.size}`);

  // 2. Build adjacency list (graph)
  console.log('\n2. Building graph...');
  const graph = buildGraph(scenes);
  const totalChoices = countTotalChoices(scenes);
  const totalEdges = countTotalEdges(graph);

  console.log(`   - Total choices: ${totalChoices}`);
  console.log(`   - Total edges: ${totalEdges}`);

  // 3. Find reachable scenes (BFS from start)
  console.log('\n3. Finding reachable scenes (BFS)...');
  const reachable = findReachableScenes(graph, startSceneId);
  const unreachable = [];
  for (const sceneId of scenes.keys()) {
    if (!reachable.has(sceneId)) {
      unreachable.push(sceneId);
    }
  }
  console.log(`   - Reachable: ${reachable.size}`);
  console.log(`   - Unreachable: ${unreachable.length}`);

  // 4. Find dead ends
  console.log('\n4. Finding dead ends...');
  const deadEnds = findDeadEnds(scenes, graph, endingIds);
  console.log(`   - Dead ends: ${deadEnds.length}`);

  // 5. Find cycles (SCCs with Tarjan)
  console.log('\n5. Finding cycles (Tarjan SCC)...');
  const sccs = findSCCs(graph, scenes);
  const cycles = sccs.filter(scc => scc.length > 1);
  const selfLoops = findSelfLoops(scenes);
  console.log(`   - SCCs with size > 1: ${cycles.length}`);
  console.log(`   - Self-loops: ${selfLoops.length}`);

  // 6. Chapter breakdown
  console.log('\n6. Chapter breakdown...');
  const chapterBreakdown = getChapterBreakdown(scenes, endingIds);

  // 7. Build output
  const output = {
    generated_at: new Date().toISOString().split('T')[0],
    source_file: 'android-native/app/src/main/assets/story.json',
    command: 'node scripts/graph_dump.mjs',
    graph_stats: {
      total_scenes: scenes.size,
      total_endings: endingIds.size,
      total_choices: totalChoices,
      total_edges: totalEdges,
      reachable_scenes: reachable.size,
      unreachable_scenes: unreachable.length,
      unreachable_list: unreachable,
      dead_ends: deadEnds.length,
      dead_ends_list: deadEnds,
      cycles: cycles.length,
      cycles_list: cycles.map(scc => ({
        size: scc.length,
        scenes: scc
      })),
      self_loops: selfLoops.length,
      self_loops_list: selfLoops
    },
    chapter_breakdown: chapterBreakdown,
    definitions: {
      dead_end: 'Eine Szene ist ein Dead End, wenn sie keine ausgehenden Choices hat (leeres choices-Array oder alle Choices ohne next/ending) UND nicht selbst ein Ending-Target ist.',
      cycle: 'Ein Cycle (SCC mit Größe > 1) liegt vor, wenn eine Gruppe von Szenen sich gegenseitig erreichen kann. Self-Loops sind Szenen, die direkt auf sich selbst verweisen.',
      unreachable: 'Eine Szene ist unreachable, wenn sie von der Startszene aus über keine Kombination von Choices erreicht werden kann.'
    }
  };

  // 8. Write output
  console.log('\n7. Writing output...');
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`   - Output: ${OUTPUT_PATH}`);

  // 9. Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   ✓ Scenes: ${scenes.size}`);
  console.log(`   ✓ Endings: ${endingIds.size}`);
  console.log(`   ✓ Choices: ${totalChoices}`);
  console.log(`   ✓ Reachable: ${reachable.size}/${scenes.size}`);
  console.log(`   ${unreachable.length === 0 ? '✓' : '⚠'} Unreachable: ${unreachable.length}`);
  console.log(`   ${deadEnds.length === 0 ? '✓' : '⚠'} Dead Ends: ${deadEnds.length}`);
  console.log(`   ${cycles.length === 0 ? '✓' : 'ℹ'} Cycles: ${cycles.length}`);
  console.log(`   ${selfLoops.length === 0 ? '✓' : 'ℹ'} Self-Loops: ${selfLoops.length}`);

  if (unreachable.length > 0) {
    console.log('\n⚠ Unreachable scenes:');
    unreachable.slice(0, 10).forEach(id => console.log(`   - ${id}`));
    if (unreachable.length > 10) {
      console.log(`   ... and ${unreachable.length - 10} more`);
    }
  }

  if (deadEnds.length > 0) {
    console.log('\n⚠ Dead ends:');
    deadEnds.slice(0, 10).forEach(id => console.log(`   - ${id}`));
    if (deadEnds.length > 10) {
      console.log(`   ... and ${deadEnds.length - 10} more`);
    }
  }

  console.log('\n✅ Done!');
}

// ============================================================================
// Graph Building
// ============================================================================

function buildGraph(scenes) {
  const graph = new Map();

  for (const [sceneId, scene] of scenes) {
    const neighbors = new Set();

    for (const choice of scene.choices || []) {
      if (choice.next) {
        neighbors.add(choice.next);
      }
      // Note: choices with 'ending' don't add edges to scenes
    }

    graph.set(sceneId, neighbors);
  }

  return graph;
}

function countTotalChoices(scenes) {
  let count = 0;
  for (const scene of scenes.values()) {
    count += (scene.choices || []).length;
  }
  return count;
}

function countTotalEdges(graph) {
  let count = 0;
  for (const neighbors of graph.values()) {
    count += neighbors.size;
  }
  return count;
}

// ============================================================================
// Reachability (BFS)
// ============================================================================

function findReachableScenes(graph, startSceneId) {
  const visited = new Set();
  const queue = [startSceneId];

  while (queue.length > 0) {
    const current = queue.shift();

    if (visited.has(current)) continue;
    visited.add(current);

    const neighbors = graph.get(current);
    if (neighbors) {
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }

  return visited;
}

// ============================================================================
// Dead Ends
// ============================================================================

function findDeadEnds(scenes, graph, endingIds) {
  const deadEnds = [];

  for (const [sceneId, scene] of scenes) {
    const choices = scene.choices || [];

    // Check if scene has any valid exit
    const hasExit = choices.some(choice => choice.next || choice.ending);

    if (!hasExit) {
      // Scene has no exits - it's a dead end unless it's an ending target
      // (But scenes aren't endings themselves, choices point to endings)
      deadEnds.push(sceneId);
    }
  }

  return deadEnds;
}

// ============================================================================
// Self-Loops
// ============================================================================

function findSelfLoops(scenes) {
  const selfLoops = [];

  for (const [sceneId, scene] of scenes) {
    for (const choice of scene.choices || []) {
      if (choice.next === sceneId) {
        selfLoops.push({
          scene: sceneId,
          choice: choice.id || 'unknown'
        });
      }
    }
  }

  return selfLoops;
}

// ============================================================================
// Strongly Connected Components (Tarjan's Algorithm)
// ============================================================================

function findSCCs(graph, scenes) {
  let index = 0;
  const indices = new Map();
  const lowlinks = new Map();
  const onStack = new Set();
  const stack = [];
  const sccs = [];

  function strongConnect(v) {
    indices.set(v, index);
    lowlinks.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    const neighbors = graph.get(v) || new Set();
    for (const w of neighbors) {
      if (!scenes.has(w)) continue; // Skip edges to non-existent scenes

      if (!indices.has(w)) {
        // Successor w has not yet been visited
        strongConnect(w);
        lowlinks.set(v, Math.min(lowlinks.get(v), lowlinks.get(w)));
      } else if (onStack.has(w)) {
        // Successor w is on stack and hence in the current SCC
        lowlinks.set(v, Math.min(lowlinks.get(v), indices.get(w)));
      }
    }

    // If v is a root node, pop the stack and generate an SCC
    if (lowlinks.get(v) === indices.get(v)) {
      const scc = [];
      let w;
      do {
        w = stack.pop();
        onStack.delete(w);
        scc.push(w);
      } while (w !== v);

      sccs.push(scc);
    }
  }

  // Run Tarjan on all nodes
  for (const v of scenes.keys()) {
    if (!indices.has(v)) {
      strongConnect(v);
    }
  }

  return sccs;
}

// ============================================================================
// Chapter Breakdown
// ============================================================================

function getChapterBreakdown(scenes, endingIds) {
  const chapters = new Map();

  for (const scene of scenes.values()) {
    const chapter = scene.chapter || 0;
    if (!chapters.has(chapter)) {
      chapters.set(chapter, { scenes: 0, endings: 0 });
    }
    chapters.get(chapter).scenes++;

    // Check if any choice leads to an ending
    for (const choice of scene.choices || []) {
      if (choice.ending && endingIds.has(choice.ending)) {
        chapters.get(chapter).endings++;
      }
    }
  }

  // Convert to sorted array
  return Array.from(chapters.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([chapter, data]) => ({
      chapter,
      scenes: data.scenes,
      endings_in_chapter: data.endings
    }));
}

// ============================================================================
// Run
// ============================================================================

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
