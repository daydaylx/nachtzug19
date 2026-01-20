import fs from 'fs';
import path from 'path';

const storyPath = 'export/story.json';
const outputPath = 'reports/graph_dump.json';

try {
  const storyData = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
  const scenes = storyData.scenes;
  const endings = storyData.endings;

  const nodes = [];
  const edges = [];

  // Create nodes map for quick lookup
  const sceneIds = new Set(scenes.map(s => s.id));
  const endingIds = new Set(Object.keys(endings)); // story.json endings is object not array? Wait, check format.

  // Check format of endings in json
  // Based on manifest.ts export, endings is an object.
  // In story.json, let's verify.

  const endingsKeys = Object.keys(endings || {});

  scenes.forEach(scene => {
    const node = {
      id: scene.id,
      chapter: scene.chapter,
      tags: scene.tags || [],
      choiceIds: scene.choices ? scene.choices.map(c => c.id || 'unknown') : []
    };
    nodes.push(node);

    if (scene.choices) {
      scene.choices.forEach(choice => {
        const edge = {
          from: scene.id,
          choiceId: choice.id,
          text: choice.text || choice.label,
        };

        if (choice.next) {
          edge.to = choice.next;
          edge.type = 'scene';
        } else if (choice.ending) {
          edge.to = choice.ending;
          edge.type = 'ending';
        } else if (choice.naechsteSzeneId) { // legacy
          edge.to = choice.naechsteSzeneId;
          edge.type = 'scene';
        } else {
           edge.to = 'DEAD_END';
           edge.type = 'dead_end';
        }

        edges.push(edge);
      });
    }
  });

  // Graph Analysis
  const visited = new Set();
  const unreachable = new Set(sceneIds);
  const deadEnds = [];
  const cycles = [];

  // Start traversal from start_scene_id
  const startSceneId = storyData.manifest.start_scene_id;
  const queue = [startSceneId];
  visited.add(startSceneId);
  unreachable.delete(startSceneId);

  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentScene = scenes.find(s => s.id === currentId);

    if (!currentScene) continue;

    if (currentScene.choices) {
      currentScene.choices.forEach(c => {
        const nextId = c.next || c.naechsteSzeneId;
        if (nextId && sceneIds.has(nextId)) {
          if (!visited.has(nextId)) {
            visited.add(nextId);
            unreachable.delete(nextId);
            queue.push(nextId);
          }
        }
      });
    }
  }

  // Find dead ends (scenes with no choices and not an ending?)
  // Actually, scenes leading to endings are not dead ends.
  scenes.forEach(scene => {
    if ((!scene.choices || scene.choices.length === 0) && !endingIds.has(scene.id)) {
       // Check if it really is a dead end or just an end of content block
       // If it has no choices, it's a dead end unless it's an ending scene (which are usually separate entities)
       // But wait, scenes have choices that lead to endings.
       // If a scene has NO choices, the player is stuck.
       deadEnds.push(scene.id);
    }
  });

  // Simple cycle detection (DFS)
  const recursionStack = new Set();
  const visitedCycle = new Set();

  function detectCycle(sceneId, path = []) {
    visitedCycle.add(sceneId);
    recursionStack.add(sceneId);

    const scene = scenes.find(s => s.id === sceneId);
    if (scene && scene.choices) {
      for (const choice of scene.choices) {
        const nextId = choice.next || choice.naechsteSzeneId;
        if (nextId && sceneIds.has(nextId)) {
          if (!visitedCycle.has(nextId)) {
            if (detectCycle(nextId, [...path, sceneId])) return true;
          } else if (recursionStack.has(nextId)) {
            cycles.push([...path, sceneId, nextId]);
             // Don't return true, find all? No, just some.
          }
        }
      }
    }

    recursionStack.delete(sceneId);
    return false;
  }

  detectCycle(startSceneId);

  const meta = {
    sceneCount: scenes.length,
    endingCount: endingsKeys.length,
    unreachableScenes: Array.from(unreachable),
    deadEnds: deadEnds,
    cycles: cycles.slice(0, 10), // Limit output
    maxOutDegree: Math.max(...scenes.map(s => s.choices ? s.choices.length : 0))
  };

  const report = {
    nodes,
    edges,
    meta
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log('Graph dump created at ' + outputPath);
  console.log('Meta:', JSON.stringify(meta, null, 2));

} catch (e) {
  console.error('Error generating graph dump:', e);
}
