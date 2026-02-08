// ============================================================================
// NACHTZUG 19 - COMPREHENSIVE CHOICE AUDIT
// ============================================================================
// Vollständige technische + narrative Choice-Prüfung
// ============================================================================

import { nachtzug19Scenes } from '../src/content/nachtzug19/scenes/index';
import { endingScenes } from '../src/content/nachtzug19/scenes/endings';
import { nachtzug19Endings } from '../src/content/nachtzug19/manifest';
import { validateContent } from '../src/domain/engine/validateContent';
import type { Scene, Choice, Effect, Condition } from '../src/domain/types';

// ============================================================================
// AUDIT DATA STRUCTURES
// ============================================================================

interface ChoiceAuditEntry {
  sceneId: string;
  chapter: number;
  choiceId: string;
  choiceLabel: string;
  next?: string;
  ending?: string;
  condition?: string;
  effects: string[];
  issues: AuditIssue[];
}

interface AuditIssue {
  severity: 'P0' | 'P1' | 'P2';
  category: 'target' | 'condition' | 'effect' | 'graph' | 'narrative' | 'fake-choice';
  message: string;
  suggestion?: string;
}

interface AuditStats {
  totalScenes: number;
  totalChoices: number;
  brokenTargets: number;
  unreachableChoices: number;
  fakeChoices: number;
  loopsOrDeadEnds: number;
  conditionIssues: number;
  effectIssues: number;
  narrativeIssues: number;
}

interface FakeChoiceGroup {
  sceneId: string;
  choiceIds: string[];
  reason: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatCondition(condition: Condition | ((stats: any, flags: any, inventory: any) => boolean) | undefined): string {
  if (!condition) return 'none';
  if (typeof condition === 'function') return 'legacy-fn';

  if (condition.type === 'compare') {
    return `${condition.target} ${condition.operator} ${condition.value}`;
  } else if (condition.type === 'bool') {
    return `${condition.target} == ${condition.value}`;
  } else if (condition.type === 'and') {
    return `AND[${condition.conditions.map(c => formatCondition(c)).join(', ')}]`;
  } else if (condition.type === 'or') {
    return `OR[${condition.conditions.map(c => formatCondition(c)).join(', ')}]`;
  }
  return 'unknown';
}

function formatEffect(effect: Effect): string {
  let str = `${effect.type}(${effect.target}, ${effect.value})`;
  if (effect.type === 'clamp' && effect.clamp_min !== undefined && effect.clamp_max !== undefined) {
    str += ` [${effect.clamp_min}-${effect.clamp_max}]`;
  }
  return str;
}

function effectsSignature(effects: Effect[] | undefined): string {
  if (!effects || effects.length === 0) return 'NONE';
  return effects.map(e => `${e.target}:${e.type}:${e.value}`).sort().join('|');
}

function nextSignature(next?: string, ending?: string): string {
  return next || ending || 'NOWHERE';
}

// ============================================================================
// FAKE CHOICE DETECTION
// ============================================================================

function detectFakeChoices(scene: Scene): FakeChoiceGroup | null {
  if (scene.choices.length < 2) return null;

  // Group choices by (next/ending + effects signature)
  const groups = new Map<string, string[]>();

  scene.choices.forEach(choice => {
    const sig = `${nextSignature(choice.next, choice.ending)}::${effectsSignature(choice.effects)}`;
    if (!groups.has(sig)) {
      groups.set(sig, []);
    }
    groups.get(sig)!.push(choice.id || choice.label || 'unknown');
  });

  // Find groups with 2+ choices (fake choices)
  for (const [sig, choiceIds] of groups.entries()) {
    if (choiceIds.length >= 2) {
      return {
        sceneId: scene.id,
        choiceIds,
        reason: `Identical outcome: ${sig}`
      };
    }
  }

  return null;
}

// ============================================================================
// UNREACHABLE CHOICE DETECTION
// ============================================================================

function detectUnreachableChoices(scene: Scene, sceneId: string): ChoiceAuditEntry[] {
  const unreachable: ChoiceAuditEntry[] = [];

  scene.choices.forEach(choice => {
    if (!choice.condition || typeof choice.condition === 'function') return;

    // Check for always-false conditions
    const cond = choice.condition;

    // Simple heuristic: compare with impossible values
    if (cond.type === 'compare') {
      // Check for tickets values > 50 (impossible since clamped to 5)
      if (cond.target.startsWith('tickets_') && cond.operator === '>=' && typeof cond.value === 'number' && cond.value > 50) {
        unreachable.push({
          sceneId,
          chapter: scene.chapter || 0,
          choiceId: choice.id || 'unknown',
          choiceLabel: choice.label || 'unknown',
          next: choice.next,
          ending: choice.ending,
          condition: formatCondition(cond),
          effects: (choice.effects || []).map(formatEffect),
          issues: [{
            severity: 'P1',
            category: 'condition',
            message: `Condition '${formatCondition(cond)}' is impossible (tickets are clamped to 5)`,
            suggestion: `Lower threshold to realistic value (≤5)`
          }]
        });
      }

      // Check for memory_drift > 10 (seems high)
      if (cond.target === 'memory_drift' && cond.operator === '>=' && typeof cond.value === 'number' && cond.value > 10) {
        unreachable.push({
          sceneId,
          chapter: scene.chapter || 0,
          choiceId: choice.id || 'unknown',
          choiceLabel: choice.label || 'unknown',
          next: choice.next,
          ending: choice.ending,
          condition: formatCondition(cond),
          effects: (choice.effects || []).map(formatEffect),
          issues: [{
            severity: 'P2',
            category: 'condition',
            message: `Condition '${formatCondition(cond)}' has very high threshold (drift > 10 is rare)`,
            suggestion: `Consider lowering threshold or verifying drift accumulation`
          }]
        });
      }
    }
  });

  return unreachable;
}

// ============================================================================
// NARRATIVE QUALITY CHECKS
// ============================================================================

function checkChoiceQuality(scene: Scene, choice: Choice): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const label = choice.label || '';

  // 1. Empty label
  if (!label || label.trim().length === 0) {
    issues.push({
      severity: 'P0',
      category: 'narrative',
      message: `Choice has empty label`,
      suggestion: `Add descriptive label text`
    });
  }

  // 2. Very short label (< 5 chars, likely placeholder)
  if (label.length > 0 && label.length < 5) {
    issues.push({
      severity: 'P2',
      category: 'narrative',
      message: `Choice label is very short: "${label}"`,
      suggestion: `Consider more descriptive text`
    });
  }

  // 3. Generic labels that appear frequently
  const genericLabels = ['weiter', 'ok', 'ja', 'nein', 'zurück', 'next', 'continue'];
  if (genericLabels.includes(label.toLowerCase())) {
    issues.push({
      severity: 'P2',
      category: 'narrative',
      message: `Choice label is generic: "${label}"`,
      suggestion: `Use more specific, contextual text`
    });
  }

  // 4. Check for tone-only choices (no effects)
  if (!choice.effects || choice.effects.length === 0) {
    // This is allowed per DECISION_SYSTEM.md, but flag if it's not clearly a tone choice
    if (!label.match(/\(.*\)/) && scene.choices.length > 1) {
      issues.push({
        severity: 'P2',
        category: 'narrative',
        message: `Choice has no effects (tone choice?)`,
        suggestion: `Ensure this is intentional tone/flavor choice, or add minimal effect`
      });
    }
  }

  return issues;
}

// ============================================================================
// MAIN AUDIT FUNCTION
// ============================================================================

function auditAllChoices(): {
  entries: ChoiceAuditEntry[];
  fakeChoices: FakeChoiceGroup[];
  stats: AuditStats;
  validationResult: any;
} {
  const entries: ChoiceAuditEntry[] = [];
  const fakeChoices: FakeChoiceGroup[] = [];

  const stats: AuditStats = {
    totalScenes: 0,
    totalChoices: 0,
    brokenTargets: 0,
    unreachableChoices: 0,
    fakeChoices: 0,
    loopsOrDeadEnds: 0,
    conditionIssues: 0,
    effectIssues: 0,
    narrativeIssues: 0
  };

  const allScenes = { ...nachtzug19Scenes, ...endingScenes };

  // Run existing validation (with actual endings from manifest)
  const validationResult = validateContent('c1_s01_platform', allScenes, nachtzug19Endings);

  // Extract errors into stats
  validationResult.errors.forEach((err: any) => {
    if (err.message.includes('verweist auf unbekannte') || err.message.includes('existiert nicht')) {
      stats.brokenTargets++;
    }
    if (err.message.includes('Dead-End')) {
      stats.loopsOrDeadEnds++;
    }
  });

  // Audit each scene
  Object.values(allScenes).forEach(scene => {
    stats.totalScenes++;

    // Detect fake choices
    const fakeGroup = detectFakeChoices(scene);
    if (fakeGroup) {
      fakeChoices.push(fakeGroup);
      stats.fakeChoices += fakeGroup.choiceIds.length;
    }

    // Detect unreachable choices
    const unreachable = detectUnreachableChoices(scene, scene.id);
    unreachable.forEach(entry => {
      entries.push(entry);
      stats.unreachableChoices++;
      stats.conditionIssues++;
    });

    // Audit each choice
    scene.choices.forEach(choice => {
      stats.totalChoices++;

      const issues: AuditIssue[] = [];

      // Quality checks
      const qualityIssues = checkChoiceQuality(scene, choice);
      issues.push(...qualityIssues);
      qualityIssues.forEach(iss => {
        if (iss.category === 'narrative') stats.narrativeIssues++;
        if (iss.category === 'condition') stats.conditionIssues++;
        if (iss.category === 'effect') stats.effectIssues++;
      });

      // Only add entry if there are issues
      if (issues.length > 0) {
        entries.push({
          sceneId: scene.id,
          chapter: scene.chapter || 0,
          choiceId: choice.id || 'unknown',
          choiceLabel: choice.label || 'unknown',
          next: choice.next,
          ending: choice.ending,
          condition: formatCondition(choice.condition),
          effects: (choice.effects || []).map(formatEffect),
          issues
        });
      }
    });
  });

  return { entries, fakeChoices, stats, validationResult };
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

function generateReport(): string {
  console.log('🔍 Starting NACHTZUG 19 Choice Audit...\n');

  const { entries, fakeChoices, stats, validationResult } = auditAllChoices();

  let report = '';

  // ============================================================================
  // EXECUTIVE SUMMARY
  // ============================================================================
  report += '# NACHTZUG 19 - CHOICE AUDIT REPORT\n\n';
  report += '## Executive Summary\n\n';

  const summary: string[] = [];

  if (stats.brokenTargets > 0) {
    summary.push(`❌ ${stats.brokenTargets} broken next/targets found (P0 BLOCKER)`);
  } else {
    summary.push(`✅ All next/targets are valid`);
  }

  if (stats.loopsOrDeadEnds > 0) {
    summary.push(`⚠️ ${stats.loopsOrDeadEnds} dead-ends detected`);
  } else {
    summary.push(`✅ No dead-ends found`);
  }

  if (stats.unreachableChoices > 0) {
    summary.push(`⚠️ ${stats.unreachableChoices} choices with impossible/suspicious conditions`);
  }

  if (stats.fakeChoices > 0) {
    summary.push(`⚠️ ${fakeChoices.length} scenes have fake choices (${stats.fakeChoices} total choices affected)`);
  } else {
    summary.push(`✅ No fake choices detected`);
  }

  if (stats.narrativeIssues > 0) {
    summary.push(`📝 ${stats.narrativeIssues} narrative/UX quality issues (mostly minor)`);
  }

  summary.forEach(item => report += `- ${item}\n`);

  // ============================================================================
  // STATISTICS
  // ============================================================================
  report += '\n## Statistics\n\n';
  report += `- **Total Scenes**: ${stats.totalScenes}\n`;
  report += `- **Total Choices**: ${stats.totalChoices}\n`;
  report += `- **Broken Targets**: ${stats.brokenTargets}\n`;
  report += `- **Unreachable Choices**: ${stats.unreachableChoices}\n`;
  report += `- **Fake Choices (scenes)**: ${fakeChoices.length}\n`;
  report += `- **Fake Choices (total)**: ${stats.fakeChoices}\n`;
  report += `- **Loops/Dead Ends**: ${stats.loopsOrDeadEnds}\n`;
  report += `- **Condition Issues**: ${stats.conditionIssues}\n`;
  report += `- **Effect Issues**: ${stats.effectIssues}\n`;
  report += `- **Narrative Issues**: ${stats.narrativeIssues}\n`;

  // ============================================================================
  // P0 BLOCKERS (from validation)
  // ============================================================================
  report += '\n## P0 - BLOCKERS (Critical)\n\n';
  const p0Errors = validationResult.errors.filter((e: any) =>
    e.message.includes('verweist auf unbekannte') ||
    e.message.includes('existiert nicht') ||
    e.message.includes('Dead-End') ||
    e.message.includes('hat keine Choices')
  );

  if (p0Errors.length === 0) {
    report += '✅ No P0 blockers found.\n';
  } else {
    p0Errors.forEach((err: any) => {
      report += `- **[${err.scene_id || err.location || 'unknown'}]** ${err.message}\n`;
    });
  }

  // ============================================================================
  // P1 HIGH (Fake Choices, Unreachable)
  // ============================================================================
  report += '\n## P1 - HIGH PRIORITY\n\n';

  // Fake Choices
  if (fakeChoices.length > 0) {
    report += '### Fake Choices (Identical Outcomes)\n\n';
    fakeChoices.forEach(group => {
      report += `- **${group.sceneId}**: Choices [${group.choiceIds.join(', ')}] have ${group.reason}\n`;
    });
    report += '\n';
  }

  // Unreachable/Suspicious Conditions
  const unreachableEntries = entries.filter(e => e.issues.some(i => i.category === 'condition' && i.severity === 'P1'));
  if (unreachableEntries.length > 0) {
    report += '### Unreachable/Suspicious Conditions\n\n';
    unreachableEntries.forEach(entry => {
      report += `- **${entry.sceneId}** / Choice: "${entry.choiceLabel}"\n`;
      entry.issues.forEach(issue => {
        report += `  - ${issue.message}\n`;
        if (issue.suggestion) report += `  - **Fix**: ${issue.suggestion}\n`;
      });
    });
    report += '\n';
  }

  if (fakeChoices.length === 0 && unreachableEntries.length === 0) {
    report += '✅ No P1 issues found.\n\n';
  }

  // ============================================================================
  // P2 MEDIUM/LOW (Narrative Quality)
  // ============================================================================
  report += '## P2 - MEDIUM/LOW (Narrative Quality)\n\n';

  const narrativeEntries = entries.filter(e => e.issues.some(i => i.category === 'narrative' || i.severity === 'P2'));

  if (narrativeEntries.length === 0) {
    report += '✅ No P2 narrative issues found.\n\n';
  } else {
    // Group by chapter
    const byChapter = new Map<number, typeof narrativeEntries>();
    narrativeEntries.forEach(entry => {
      const ch = entry.chapter || 0;
      if (!byChapter.has(ch)) byChapter.set(ch, []);
      byChapter.get(ch)!.push(entry);
    });

    Array.from(byChapter.keys()).sort().forEach(ch => {
      const chEntries = byChapter.get(ch)!;
      report += `### Chapter ${ch} (${chEntries.length} issues)\n\n`;
      chEntries.slice(0, 10).forEach(entry => {
        report += `- **${entry.sceneId}** / "${entry.choiceLabel}"\n`;
        entry.issues.forEach(issue => {
          if (issue.severity === 'P2' || issue.category === 'narrative') {
            report += `  - ${issue.message}\n`;
          }
        });
      });
      if (chEntries.length > 10) {
        report += `  - ... and ${chEntries.length - 10} more\n`;
      }
      report += '\n';
    });
  }

  // ============================================================================
  // VALIDATION WARNINGS
  // ============================================================================
  if (validationResult.warnings.length > 0) {
    report += '## Validation Warnings\n\n';
    validationResult.warnings.slice(0, 20).forEach((warn: any) => {
      report += `- **[${warn.scene_id || warn.location || 'unknown'}]** ${warn.message}\n`;
    });
    if (validationResult.warnings.length > 20) {
      report += `- ... and ${validationResult.warnings.length - 20} more warnings\n`;
    }
    report += '\n';
  }

  // ============================================================================
  // SUMMARY
  // ============================================================================
  report += '## Final Summary\n\n';
  report += `**Total Issues Found**: ${validationResult.errors.length} errors, ${validationResult.warnings.length} warnings, ${entries.length} choice-specific issues\n\n`;

  if (validationResult.errors.length === 0 && fakeChoices.length === 0 && unreachableEntries.length === 0) {
    report += '✅ **NACHTZUG 19 Choice Audit: PASSED**\n';
    report += 'All critical and high-priority issues resolved. Minor narrative quality suggestions available.\n';
  } else {
    report += '⚠️ **NACHTZUG 19 Choice Audit: ISSUES FOUND**\n';
    report += `- P0 Blockers: ${p0Errors.length}\n`;
    report += `- P1 High Priority: ${fakeChoices.length + unreachableEntries.length}\n`;
    report += `- P2 Low Priority: ${narrativeEntries.length}\n`;
  }

  return report;
}

// ============================================================================
// EXECUTE
// ============================================================================

const report = generateReport();
console.log(report);
