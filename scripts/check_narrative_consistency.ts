#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Narrative Consistency Checker
// ============================================================================
// Prüft Story-Texte auf:
// - Veraltete Referenzen (alte Scene-Namen, gemergete Scenes)
// - Inkonsistente Namen ("Emma" vs. "sie")
// - Item-Referenzen ohne State-Check
// - Tippfehler und Formatierungsprobleme
// ============================================================================

import type { Scene } from '../src/domain/types';

// ============================================================================
// Types
// ============================================================================

type ConsistencyIssue = {
  severity: 'ERROR' | 'WARNING' | 'INFO';
  category: 'NAME' | 'ITEM' | 'SCENE_REF' | 'STATE' | 'TYPO' | 'FORMAT';
  scene_id: string;
  scene_title: string;
  location: 'narrative' | 'choice_label' | 'state_notes';
  issue: string;
  suggestion?: string;
};

// ============================================================================
// Pattern Checks
// ============================================================================

const ITEM_KEYWORDS = {
  recorder: ['Rekorder', 'Kassette', 'Aufnahme', 'Band', 'recorder'],
  tag19: ['Anhänger', 'Schlüsselanhänger', 'Tag 19', 'Etikett'],
  photo: ['Foto', 'Bild', 'Fotografie']
};

const OLD_SCENE_NAMES = [
  'window_void_b',
  'window_void_c',
  'drift_intensifies_b',
  'train_slows',
  'corridor_silence_b',
  'lights_flicker_b'
];

const PRONOUN_PATTERNS = {
  emma: /Emma/g,
  sie_female: /\bsie\b/gi,
  ihr: /\bihr\b/gi
};

// ============================================================================
// Helper Functions
// ============================================================================

function checkNameConsistency(text: string, sceneId: string, sceneTitle: string): ConsistencyIssue[] {
  const issues: ConsistencyIssue[] = [];

  // Check Emma usage
  const emmaMatches = text.match(PRONOUN_PATTERNS.emma);
  const sieMatches = text.match(PRONOUN_PATTERNS.sie_female);

  if (emmaMatches && sieMatches && emmaMatches.length > 0 && sieMatches.length > 0) {
    issues.push({
      severity: 'WARNING',
      category: 'NAME',
      scene_id: sceneId,
      scene_title: sceneTitle,
      location: 'narrative',
      issue: `Mixed usage of "Emma" and "sie" (Emma: ${emmaMatches.length}x, sie: ${sieMatches.length}x)`,
      suggestion: 'Use "Emma" consistently or clarify context'
    });
  }

  return issues;
}

function checkItemReferences(scene: Scene): ConsistencyIssue[] {
  const issues: ConsistencyIssue[] = [];
  const fullText = scene.narrative + ' ' + scene.choices.map(c => c.label).join(' ');

  Object.entries(ITEM_KEYWORDS).forEach(([itemKey, keywords]) => {
    const hasItemRef = keywords.some(kw => fullText.includes(kw));

    if (hasItemRef) {
      // Check if scene or choices check for the item
      const hasItemCondition = scene.choices.some(choice => {
        if (!choice.condition) return false;
        if (typeof choice.condition === 'function') return false;
        if (choice.condition.type === 'bool' && choice.condition.target === `has_${itemKey}`) return true;
        return false;
      });

      if (!hasItemCondition && itemKey !== 'photo') { // photo is often just mentioned
        issues.push({
          severity: 'WARNING',
          category: 'ITEM',
          scene_id: scene.id,
          scene_title: scene.title || scene.id,
          location: 'narrative',
          issue: `References "${itemKey}" but no choice checks for has_${itemKey}`,
          suggestion: `Add condition check for has_${itemKey} if player needs to possess it`
        });
      }
    }
  });

  return issues;
}

function checkOldSceneReferences(text: string, sceneId: string, sceneTitle: string): ConsistencyIssue[] {
  const issues: ConsistencyIssue[] = [];

  OLD_SCENE_NAMES.forEach(oldName => {
    if (text.includes(oldName)) {
      issues.push({
        severity: 'ERROR',
        category: 'SCENE_REF',
        scene_id: sceneId,
        scene_title: sceneTitle,
        location: 'narrative',
        issue: `References old/merged scene name "${oldName}"`,
        suggestion: 'Update to current scene naming after refactoring'
      });
    }
  });

  return issues;
}

function checkTypos(text: string, sceneId: string, sceneTitle: string): ConsistencyIssue[] {
  const issues: ConsistencyIssue[] = [];

  // Common typos
  const typoPatterns = [
    { pattern: /\s{2,}/g, issue: 'Multiple consecutive spaces' },
    { pattern: /\n{3,}/g, issue: 'Multiple consecutive newlines (>2)' },
    { pattern: /[.]{2,}(?!\.)/g, issue: 'Multiple dots (not ellipsis)' },
    { pattern: /„[^"]*$/g, issue: 'Opening quote without closing' },
    { pattern: /^[^„]*"/g, issue: 'Closing quote without opening' }
  ];

  typoPatterns.forEach(({ pattern, issue: issueText }) => {
    if (pattern.test(text)) {
      issues.push({
        severity: 'INFO',
        category: 'TYPO',
        scene_id: sceneId,
        scene_title: sceneTitle,
        location: 'narrative',
        issue: issueText
      });
    }
  });

  return issues;
}

function checkStateNotes(scene: Scene): ConsistencyIssue[] {
  const issues: ConsistencyIssue[] = [];

  if (!scene.state_notes || scene.state_notes.length === 0) {
    // Only warn if scene has multiple effects
    const totalEffects = [
      ...(scene.entry_effects || []),
      ...(scene.exit_effects || []),
      ...scene.choices.flatMap(c => c.effects || [])
    ];

    if (totalEffects.length > 3) {
      issues.push({
        severity: 'INFO',
        category: 'STATE',
        scene_id: scene.id,
        scene_title: scene.title || scene.id,
        location: 'state_notes',
        issue: `Scene has ${totalEffects.length} effects but no state_notes`,
        suggestion: 'Add state_notes to document state changes'
      });
    }
  }

  return issues;
}

// ============================================================================
// Main Analysis
// ============================================================================

async function main() {
  console.log('🔍 Starting Narrative Consistency Check...\n');

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

  // Collect all issues
  const allIssues: ConsistencyIssue[] = [];

  Object.values(allScenes).forEach(scene => {
    // Check narrative
    if (scene.narrative) {
      allIssues.push(...checkNameConsistency(scene.narrative, scene.id, scene.title || scene.id));
      allIssues.push(...checkOldSceneReferences(scene.narrative, scene.id, scene.title || scene.id));
      allIssues.push(...checkTypos(scene.narrative, scene.id, scene.title || scene.id));
    }

    // Check item references
    allIssues.push(...checkItemReferences(scene));

    // Check state notes
    allIssues.push(...checkStateNotes(scene));

    // Check choice labels
    scene.choices.forEach(choice => {
      if (choice.label) {
        allIssues.push(...checkOldSceneReferences(choice.label, scene.id, scene.title || scene.id));
      }
    });
  });

  console.log(`✅ Analysis complete! Found ${allIssues.length} issues.\n`);

  // Group by severity
  const errors = allIssues.filter(i => i.severity === 'ERROR');
  const warnings = allIssues.filter(i => i.severity === 'WARNING');
  const infos = allIssues.filter(i => i.severity === 'INFO');

  console.log('# NARRATIVE CONSISTENCY REPORT\n');
  console.log(`**Total Issues**: ${allIssues.length}`);
  console.log(`- **Errors**: ${errors.length}`);
  console.log(`- **Warnings**: ${warnings.length}`);
  console.log(`- **Info**: ${infos.length}\n`);

  // Print errors
  if (errors.length > 0) {
    console.log('## ❌ ERRORS (Critical)\n');
    console.log('| Scene | Category | Issue | Suggestion |');
    console.log('|-------|----------|-------|------------|');
    errors.forEach(e => {
      const suggestionShort = e.suggestion ? e.suggestion.substring(0, 40) : 'N/A';
      console.log(`| ${e.scene_id} | ${e.category} | ${e.issue.substring(0, 40)} | ${suggestionShort} |`);
    });
    console.log('');
  } else {
    console.log('## ✅ NO ERRORS FOUND\n');
  }

  // Print warnings
  if (warnings.length > 0) {
    console.log('## ⚠️ WARNINGS (Review Recommended)\n');
    console.log('| Scene | Category | Issue | Suggestion |');
    console.log('|-------|----------|-------|------------|');
    warnings.slice(0, 20).forEach(w => {
      const suggestionShort = w.suggestion ? w.suggestion.substring(0, 35) : 'N/A';
      console.log(`| ${w.scene_id} | ${w.category} | ${w.issue.substring(0, 35)} | ${suggestionShort} |`);
    });
    if (warnings.length > 20) {
      console.log(`\n... and ${warnings.length - 20} more warnings\n`);
    }
    console.log('');
  }

  // Summary by category
  console.log('## Issues by Category\n');
  const byCategory = allIssues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`- **${cat}**: ${count}`);
  });

  console.log('\n✅ Narrative Consistency Check complete!\n');
}

main().catch(console.error);
