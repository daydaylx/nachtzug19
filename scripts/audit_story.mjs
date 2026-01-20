#!/usr/bin/env node
/**
 * NACHTZUG 19 Story QA Audit Script
 * Ruthless Story-QA + Tech auditor
 * Zero hallucinations: every claim backed by evidence
 */

import fs from 'fs/promises';
import path from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const STORY_JSON_PATH = './export/story.json';
const REPORTS_DIR = './reports';
const EVIDENCE_DIR = './reports/evidence';

// Valid state keys from types/index.ts
const VALID_STATE_KEYS = new Set([
  // Legacy Stats
  'mut', 'wissen', 'empathie',
  // Tickets
  'tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love',
  // Pressure
  'conductor_attention', 'memory_drift',
  // Relations
  'rel_comp7', 'rel_boy', 'rel_sleepless',
  // Items
  'has_recorder', 'has_tag19', 'photo_anomaly',
  // Meta
  'chapter_index', 'station_count'
]);

// ============================================================================
// DATA STRUCTURES
// ============================================================================

class AuditIssue {
  constructor(id, severity, category, symptom, rootCause, evidence, repro, minimalFix) {
    this.id = id;
    this.severity = severity; // P0, P1, P2, P3
    this.category = category; // GRAPH, CHOICE, STORY, STATE, PARITY
    this.symptom = symptom;
    this.rootCause = rootCause;
    this.evidence = evidence;
    this.repro = repro;
    this.minimalFix = minimalFix;
  }
}

// ============================================================================
// MAIN AUDIT LOGIC
// ============================================================================

async function main() {
  console.log('🔍 NACHTZUG 19 Story QA Audit');
  console.log('=' .repeat(80));

  // Load story.json
  const storyData = JSON.parse(await fs.readFile(STORY_JSON_PATH, 'utf-8'));
  const { manifest, scenes: scenesArray, endings } = storyData;

  // Convert scenes array to map
  const scenes = {};
  scenesArray.forEach(scene => {
    scenes[scene.id] = scene;
  });

  console.log(`📊 Loaded ${scenesArray.length} scenes, ${endings?.length || 0} endings`);
  console.log('');

  // Initialize audit results
  const issues = [];
  const graphData = {
    totalScenes: scenesArray.length,
    totalChoices: 0,
    totalEdges: 0,
    chapters: {},
    unreachableScenes: [],
    deadEndScenes: [],
    cycles: [],
    maxOutdegree: { sceneId: null, degree: 0 }
  };

  // ============================================================================
  // A) GRAPH ANALYSIS
  // ============================================================================

  console.log('📊 PHASE A: Graph Analysis');
  console.log('-'.repeat(80));

  // Build adjacency list
  const adjacencyList = {};
  const inDegree = {};
  const allSceneIds = new Set(Object.keys(scenes));

  Object.keys(scenes).forEach(sceneId => {
    adjacencyList[sceneId] = new Set();
    inDegree[sceneId] = 0;
  });

  // Populate adjacency list and count degrees
  Object.entries(scenes).forEach(([sceneId, scene]) => {
    const chapter = scene.chapter || 1;
    if (!graphData.chapters[chapter]) {
      graphData.chapters[chapter] = { sceneCount: 0, choiceCount: 0 };
    }
    graphData.chapters[chapter].sceneCount++;

    scene.choices?.forEach(choice => {
      graphData.totalChoices++;
      graphData.chapters[chapter].choiceCount++;

      const target = choice.next || choice.ending;
      if (target && !target.match(/^[A-Z]$/)) { // Not an ending
        adjacencyList[sceneId].add(target);
        if (inDegree[target] !== undefined) {
          inDegree[target]++;
        }
        graphData.totalEdges++;
      }
    });

    // Track max outdegree
    if (adjacencyList[sceneId].size > graphData.maxOutdegree.degree) {
      graphData.maxOutdegree.sceneId = sceneId;
      graphData.maxOutdegree.degree = adjacencyList[sceneId].size;
    }
  });

  // Find unreachable scenes (BFS from start)
  const reachable = new Set();
  const queue = [manifest.start_scene_id];
  reachable.add(manifest.start_scene_id);

  while (queue.length > 0) {
    const current = queue.shift();
    if (adjacencyList[current]) {
      adjacencyList[current].forEach(next => {
        if (!reachable.has(next) && scenes[next]) {
          reachable.add(next);
          queue.push(next);
        }
      });
    }
  }

  allSceneIds.forEach(sceneId => {
    if (!reachable.has(sceneId)) {
      graphData.unreachableScenes.push(sceneId);
      issues.push(new AuditIssue(
        `GRAPH-${String(issues.filter(i => i.category === 'GRAPH').length + 1).padStart(3, '0')}`,
        'P1',
        'GRAPH',
        `Scene "${sceneId}" is unreachable from start_scene`,
        'No path exists from manifest.start_scene_id to this scene',
        { file: STORY_JSON_PATH, sceneId, inDegree: inDegree[sceneId] },
        `Start game, try to reach ${sceneId} - impossible`,
        'Add a choice from a reachable scene that leads to this scene, or remove if unused'
      ));
    }
  });

  // Find dead ends (scenes with no outgoing edges except endings)
  Object.entries(scenes).forEach(([sceneId, scene]) => {
    const hasNonEndingChoice = scene.choices?.some(c => c.next && !c.ending);
    const hasEndingChoice = scene.choices?.some(c => c.ending);

    if (!hasNonEndingChoice && !hasEndingChoice && !scene.tags?.includes('station_end')) {
      graphData.deadEndScenes.push(sceneId);
      issues.push(new AuditIssue(
        `GRAPH-${String(issues.filter(i => i.category === 'GRAPH').length + 1).padStart(3, '0')}`,
        'P0',
        'GRAPH',
        `Scene "${sceneId}" is a dead-end (no next scenes or endings)`,
        'All choices lack both .next and .ending fields',
        { file: STORY_JSON_PATH, sceneId, choiceIds: scene.choices?.map(c => c.id) },
        `Reach scene ${sceneId} - player gets stuck`,
        'Add .next or .ending to at least one choice'
      ));
    }
  });

  // Find simple cycles (self-loops)
  Object.entries(adjacencyList).forEach(([sceneId, targets]) => {
    if (targets.has(sceneId)) {
      graphData.cycles.push([sceneId]);
      issues.push(new AuditIssue(
        `GRAPH-${String(issues.filter(i => i.category === 'GRAPH').length + 1).padStart(3, '0')}`,
        'P2',
        'GRAPH',
        `Scene "${sceneId}" has a self-loop`,
        'A choice leads back to the same scene without progression',
        { file: STORY_JSON_PATH, sceneId },
        `In scene ${sceneId}, select the choice that loops back`,
        'Ensure state changes (effects) or remove loop if unintentional'
      ));
    }
  });

  console.log(`✅ Graph analysis complete:`);
  console.log(`   - ${graphData.totalScenes} scenes, ${graphData.totalChoices} choices, ${graphData.totalEdges} edges`);
  console.log(`   - ${graphData.unreachableScenes.length} unreachable scenes`);
  console.log(`   - ${graphData.deadEndScenes.length} dead-end scenes`);
  console.log(`   - ${graphData.cycles.length} self-loops`);
  console.log('');

  // ============================================================================
  // B) CHOICE ANALYSIS
  // ============================================================================

  console.log('🎯 PHASE B: Choice Analysis');
  console.log('-'.repeat(80));

  const illusionChoices = [];
  const fakeChoices = [];

  // Track all state keys that are SET by effects
  const setStateKeys = new Set();
  Object.values(scenes).forEach(scene => {
    scene.choices?.forEach(choice => {
      choice.effects?.forEach(effect => {
        setStateKeys.add(effect.target);
      });
      scene.entry_effects?.forEach(effect => {
        setStateKeys.add(effect.target);
      });
    });
  });

  // Track all state keys that are READ by conditions
  const readStateKeys = new Set();
  function extractConditionKeys(condition) {
    if (!condition) return;
    if (condition.type === 'compare' || condition.type === 'bool') {
      readStateKeys.add(condition.target);
    } else if (condition.type === 'and' || condition.type === 'or') {
      condition.conditions?.forEach(extractConditionKeys);
    }
  }

  Object.values(scenes).forEach(scene => {
    scene.choices?.forEach(choice => {
      extractConditionKeys(choice.condition);
    });
    scene.narrative_variants?.forEach(variant => {
      extractConditionKeys(variant.condition);
    });
  });

  // Detect illusion choices: same next + no differing effects
  Object.entries(scenes).forEach(([sceneId, scene]) => {
    const choices = scene.choices || [];
    if (choices.length < 2) return;

    // Group choices by their target
    const targetGroups = {};
    choices.forEach(choice => {
      const target = choice.next || choice.ending || 'NONE';
      if (!targetGroups[target]) targetGroups[target] = [];
      targetGroups[target].push(choice);
    });

    // Check each group for illusion choices
    Object.entries(targetGroups).forEach(([target, groupChoices]) => {
      if (groupChoices.length < 2) return;

      // Check if effects are identical or all missing
      const hasEffects = groupChoices.some(c => c.effects && c.effects.length > 0);
      if (!hasEffects) {
        // All choices have no effects and same target = illusion
        illusionChoices.push({ sceneId, target, choices: groupChoices });
        issues.push(new AuditIssue(
          `CHOICE-${String(issues.filter(i => i.category === 'CHOICE').length + 1).padStart(3, '0')}`,
          'P2',
          'CHOICE',
          `Scene "${sceneId}" has ${groupChoices.length} choices with same target "${target}" and no effects`,
          'Multiple choices lead to same outcome without any state changes (illusion of choice)',
          {
            file: STORY_JSON_PATH,
            sceneId,
            choiceIds: groupChoices.map(c => c.id),
            target
          },
          `In scene ${sceneId}, try choices ${groupChoices.map(c => c.id).join(', ')} - identical outcome`,
          'Add distinct effects to each choice, or merge into single choice with different narrative'
        ));
      }
    });
  });

  // Detect fake choices: effects set but never read
  const unusedKeys = new Set([...setStateKeys].filter(key => !readStateKeys.has(key)));
  unusedKeys.forEach(key => {
    // Find all scenes/choices that set this key
    const setters = [];
    Object.entries(scenes).forEach(([sceneId, scene]) => {
      scene.choices?.forEach(choice => {
        if (choice.effects?.some(e => e.target === key)) {
          setters.push({ sceneId, choiceId: choice.id });
        }
      });
    });

    if (setters.length > 0) {
      fakeChoices.push({ key, setters });
      issues.push(new AuditIssue(
        `CHOICE-${String(issues.filter(i => i.category === 'CHOICE').length + 1).padStart(3, '0')}`,
        'P3',
        'CHOICE',
        `State key "${key}" is set by ${setters.length} effects but never read`,
        'Effects modify state that is never checked in conditions or variants (potential fake choice)',
        {
          file: STORY_JSON_PATH,
          key,
          setters: setters.slice(0, 5) // First 5 examples
        },
        `Make choices that modify ${key} - observe no narrative consequences`,
        'Add conditions/variants that read this key, or remove unused effects'
      ));
    }
  });

  console.log(`✅ Choice analysis complete:`);
  console.log(`   - ${illusionChoices.length} illusion choice groups`);
  console.log(`   - ${unusedKeys.size} potentially unused state keys`);
  console.log('');

  // ============================================================================
  // C) STATE VALIDATION
  // ============================================================================

  console.log('🔧 PHASE C: State Validation');
  console.log('-'.repeat(80));

  const unknownKeys = new Set();

  function validateStateKey(key, location) {
    if (!VALID_STATE_KEYS.has(key)) {
      unknownKeys.add(key);
      issues.push(new AuditIssue(
        `STATE-${String(issues.filter(i => i.category === 'STATE').length + 1).padStart(3, '0')}`,
        'P0',
        'STATE',
        `Unknown state key "${key}" in ${location}`,
        'Key not defined in EffectTarget union (types/index.ts:123-135)',
        {
          file: STORY_JSON_PATH,
          location,
          key,
          validKeys: Array.from(VALID_STATE_KEYS).slice(0, 10)
        },
        `Effect/condition using "${key}" will fail at runtime`,
        'Fix typo or add key to EffectTarget union in types/index.ts'
      ));
    }
  }

  Object.entries(scenes).forEach(([sceneId, scene]) => {
    scene.choices?.forEach((choice, idx) => {
      choice.effects?.forEach((effect, eidx) => {
        validateStateKey(effect.target, `${sceneId}.choices[${idx}].effects[${eidx}]`);
      });
      extractConditionKeysForValidation(choice.condition, `${sceneId}.choices[${idx}].condition`);
    });
    scene.entry_effects?.forEach((effect, eidx) => {
      validateStateKey(effect.target, `${sceneId}.entry_effects[${eidx}]`);
    });
    scene.narrative_variants?.forEach((variant, vidx) => {
      extractConditionKeysForValidation(variant.condition, `${sceneId}.narrative_variants[${vidx}].condition`);
    });
  });

  function extractConditionKeysForValidation(condition, location) {
    if (!condition) return;
    if (condition.type === 'compare' || condition.type === 'bool') {
      validateStateKey(condition.target, location);
    } else if (condition.type === 'and' || condition.type === 'or') {
      condition.conditions?.forEach((c, idx) => extractConditionKeysForValidation(c, `${location}.conditions[${idx}]`));
    }
  }

  console.log(`✅ State validation complete:`);
  console.log(`   - ${unknownKeys.size} unknown state keys`);
  console.log('');

  // ============================================================================
  // D) BROKEN REFERENCES
  // ============================================================================

  console.log('🔗 PHASE D: Reference Validation');
  console.log('-'.repeat(80));

  const brokenRefs = [];
  Object.entries(scenes).forEach(([sceneId, scene]) => {
    scene.choices?.forEach((choice, idx) => {
      if (choice.next && !scenes[choice.next] && !choice.next.match(/^[A-Z]$/)) {
        brokenRefs.push({ sceneId, choiceId: choice.id, target: choice.next });
        issues.push(new AuditIssue(
          `GRAPH-${String(issues.filter(i => i.category === 'GRAPH').length + 1).padStart(3, '0')}`,
          'P0',
          'GRAPH',
          `Scene "${sceneId}" choice "${choice.id}" references non-existent scene "${choice.next}"`,
          'choice.next points to scene that does not exist in scenes collection',
          {
            file: STORY_JSON_PATH,
            sceneId,
            choiceId: choice.id,
            brokenRef: choice.next
          },
          `In scene ${sceneId}, select choice ${choice.id} - crash or undefined behavior`,
          `Fix scene ID to point to existing scene, or create scene "${choice.next}"`
        ));
      }
    });
  });

  console.log(`✅ Reference validation complete:`);
  console.log(`   - ${brokenRefs.length} broken scene references`);
  console.log('');

  // ============================================================================
  // E) OUTPUT REPORTS
  // ============================================================================

  console.log('📝 PHASE E: Writing Reports');
  console.log('-'.repeat(80));

  // Ensure directories exist
  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.mkdir(EVIDENCE_DIR, { recursive: true });

  // 1. Write graph_dump.json
  await fs.writeFile(
    path.join(REPORTS_DIR, 'graph_dump.json'),
    JSON.stringify(graphData, null, 2)
  );
  console.log('✅ Written: reports/graph_dump.json');

  // 2. Write issues by severity
  const issuesBySeverity = {
    P0: issues.filter(i => i.severity === 'P0'),
    P1: issues.filter(i => i.severity === 'P1'),
    P2: issues.filter(i => i.severity === 'P2'),
    P3: issues.filter(i => i.severity === 'P3')
  };

  // 3. Generate markdown audit report
  let report = `# NACHTZUG 19 Story QA Audit Report\n\n`;
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `## Executive Summary\n\n`;
  report += `- **Total Scenes:** ${graphData.totalScenes}\n`;
  report += `- **Total Choices:** ${graphData.totalChoices}\n`;
  report += `- **Total Issues:** ${issues.length}\n`;
  report += `  - P0 (Critical): ${issuesBySeverity.P0.length}\n`;
  report += `  - P1 (High): ${issuesBySeverity.P1.length}\n`;
  report += `  - P2 (Medium): ${issuesBySeverity.P2.length}\n`;
  report += `  - P3 (Low): ${issuesBySeverity.P3.length}\n\n`;

  report += `## Graph Metrics\n\n`;
  report += `- **Total Edges:** ${graphData.totalEdges}\n`;
  report += `- **Unreachable Scenes:** ${graphData.unreachableScenes.length}\n`;
  report += `- **Dead-End Scenes:** ${graphData.deadEndScenes.length}\n`;
  report += `- **Self-Loops:** ${graphData.cycles.length}\n`;
  report += `- **Max Outdegree:** ${graphData.maxOutdegree.degree} (${graphData.maxOutdegree.sceneId})\n\n`;

  report += `## Issues by Severity\n\n`;

  ['P0', 'P1', 'P2', 'P3'].forEach(severity => {
    const severityIssues = issuesBySeverity[severity];
    if (severityIssues.length === 0) return;

    report += `### ${severity} Issues (${severityIssues.length})\n\n`;
    severityIssues.forEach(issue => {
      report += `#### ${issue.id}: ${issue.symptom}\n\n`;
      report += `- **Category:** ${issue.category}\n`;
      report += `- **Root Cause:** ${issue.rootCause}\n`;
      report += `- **Evidence:**\n`;
      report += `  \`\`\`json\n`;
      report += `  ${JSON.stringify(issue.evidence, null, 2)}\n`;
      report += `  \`\`\`\n`;
      report += `- **Repro:** ${issue.repro}\n`;
      report += `- **Minimal Fix:** ${issue.minimalFix}\n\n`;
    });
  });

  await fs.writeFile(path.join(REPORTS_DIR, 'NACHTZUG19_STORY_QA_AUDIT.md'), report);
  console.log('✅ Written: reports/NACHTZUG19_STORY_QA_AUDIT.md');

  // 4. Summary stats
  await fs.writeFile(
    path.join(EVIDENCE_DIR, 'audit_summary.txt'),
    `NACHTZUG 19 Audit Summary
========================

Total Scenes: ${graphData.totalScenes}
Total Choices: ${graphData.totalChoices}
Total Edges: ${graphData.totalEdges}

Issues Found: ${issues.length}
- P0 (Critical): ${issuesBySeverity.P0.length}
- P1 (High): ${issuesBySeverity.P1.length}
- P2 (Medium): ${issuesBySeverity.P2.length}
- P3 (Low): ${issuesBySeverity.P3.length}

Graph Issues:
- Unreachable Scenes: ${graphData.unreachableScenes.length}
- Dead-End Scenes: ${graphData.deadEndScenes.length}
- Self-Loops: ${graphData.cycles.length}

Choice Issues:
- Illusion Choice Groups: ${illusionChoices.length}
- Unused State Keys: ${unusedKeys.size}

State Issues:
- Unknown State Keys: ${unknownKeys.size}

Reference Issues:
- Broken Scene References: ${brokenRefs.length}
`
  );
  console.log('✅ Written: reports/evidence/audit_summary.txt');

  console.log('');
  console.log('=' .repeat(80));
  console.log('✅ Audit Complete');
  console.log(`📊 Found ${issues.length} issues across ${graphData.totalScenes} scenes`);
  console.log('');
}

main().catch(console.error);
