#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Choice Audit (Current Story Graph)
// ============================================================================

import { loadNachtzug19Story } from '../src/domain/engine/loadStory';
import { validateContent } from '../src/domain/engine/validateContent';
import { Choice, Condition, Effect, Scene } from '../src/domain/types';

type Severity = 'P0' | 'P1' | 'P2';

type AuditIssue = {
  severity: Severity;
  category: 'target' | 'graph' | 'choice-quality' | 'duplicate';
  sceneId: string;
  choiceId?: string;
  message: string;
};

const GENERIC_LABELS = new Set(['weiter', 'ende', 'ok', 'ja', 'nein', 'continue', 'next']);

function normalizeLabel(label: string): string {
  return label.trim().toLowerCase();
}

function conditionSignature(condition: Condition | undefined): string {
  if (!condition) return 'none';

  switch (condition.type) {
    case 'compare':
      return `compare:${condition.target}:${condition.operator}:${condition.value}`;
    case 'bool':
      return `bool:${condition.target}:${condition.value}`;
    case 'and':
      return `and:${condition.conditions.map(conditionSignature).sort().join('|')}`;
    case 'or':
      return `or:${condition.conditions.map(conditionSignature).sort().join('|')}`;
    default:
      return 'unknown';
  }
}

function effectsSignature(effects: Effect[] | undefined): string {
  if (!effects || effects.length === 0) return 'none';

  return effects
    .map((effect) => {
      const clamp = effect.type === 'clamp'
        ? `:${effect.clamp_min ?? ''}:${effect.clamp_max ?? ''}`
        : '';
      return `${effect.type}:${effect.target}:${String(effect.value)}${clamp}`;
    })
    .sort()
    .join('|');
}

function detectStrictDuplicates(scene: Scene): AuditIssue[] {
  if (scene.choices.length < 2) return [];

  const seen = new Map<string, Choice>();
  const issues: AuditIssue[] = [];

  scene.choices.forEach((choice) => {
    const label = choice.label ?? '';
    const signature = [
      normalizeLabel(label),
      choice.next ?? 'none',
      choice.ending ?? 'none',
      conditionSignature(choice.condition as Condition | undefined),
      effectsSignature(choice.effects),
    ].join('::');

    const existing = seen.get(signature);
    if (existing) {
      issues.push({
        severity: 'P1',
        category: 'duplicate',
        sceneId: scene.id,
        choiceId: choice.id,
        message: `Duplicate choice behavior and label (matches '${existing.id ?? existing.label ?? 'unknown'}')`,
      });
      return;
    }

    seen.set(signature, choice);
  });

  return issues;
}

function auditChoiceLabels(scene: Scene): AuditIssue[] {
  const issues: AuditIssue[] = [];

  scene.choices.forEach((choice) => {
    const label = choice.label?.trim() ?? '';

    if (label.length === 0) {
      issues.push({
        severity: 'P0',
        category: 'choice-quality',
        sceneId: scene.id,
        choiceId: choice.id,
        message: 'Choice label is empty',
      });
      return;
    }

    if (GENERIC_LABELS.has(label.toLowerCase())) {
      issues.push({
        severity: 'P2',
        category: 'choice-quality',
        sceneId: scene.id,
        choiceId: choice.id,
        message: `Generic label '${label}' should be contextualized`,
      });
    }
  });

  return issues;
}

async function main(): Promise<void> {
  console.log('🔍 Starting NACHTZUG 19 Choice Audit...');
  console.log('');

  const story = await loadNachtzug19Story();

  const validation = validateContent(story.startSceneId, story.scenes, story.endings);
  const issues: AuditIssue[] = [];

  if (!story.scenes[story.startSceneId]) {
    issues.push({
      severity: 'P0',
      category: 'graph',
      sceneId: 'manifest',
      message: `Start scene '${story.startSceneId}' does not exist`,
    });
  }

  validation.errors.forEach((error) => {
    const sceneId = error.scene_id ?? 'unknown';
    issues.push({
      severity: 'P0',
      category: error.message.includes('verweist auf unbekannte Szene') ? 'target' : 'graph',
      sceneId,
      message: error.message,
    });
  });

  Object.values(story.scenes).forEach((scene) => {
    issues.push(...detectStrictDuplicates(scene));
    issues.push(...auditChoiceLabels(scene));
  });

  const p0 = issues.filter((issue) => issue.severity === 'P0');
  const p1 = issues.filter((issue) => issue.severity === 'P1');
  const p2 = issues.filter((issue) => issue.severity === 'P2');

  const totalChoices = Object.values(story.scenes).reduce((sum, scene) => sum + scene.choices.length, 0);

  console.log('# NACHTZUG 19 - CHOICE AUDIT REPORT');
  console.log('');
  console.log('## Executive Summary');
  console.log('');
  console.log(`- ${p0.length === 0 ? '✅' : '❌'} P0 issues: ${p0.length}`);
  console.log(`- ${p1.length === 0 ? '✅' : '⚠️'} P1 issues: ${p1.length}`);
  console.log(`- ${p2.length === 0 ? '✅' : '📝'} P2 issues: ${p2.length}`);
  console.log(`- Validation warnings: ${validation.warnings.length}`);
  console.log('');

  console.log('## Statistics');
  console.log('');
  console.log(`- **Total Scenes**: ${Object.keys(story.scenes).length}`);
  console.log(`- **Total Choices**: ${totalChoices}`);
  console.log(`- **Start Scene**: ${story.startSceneId}`);
  console.log(`- **Validation Errors**: ${validation.errors.length}`);
  console.log('');

  const printIssues = (title: string, list: AuditIssue[]): void => {
    if (list.length === 0) {
      console.log(`## ${title}`);
      console.log('');
      console.log('✅ None found.');
      console.log('');
      return;
    }

    console.log(`## ${title}`);
    console.log('');
    list.forEach((issue) => {
      const choicePart = issue.choiceId ? ` / ${issue.choiceId}` : '';
      console.log(`- **${issue.sceneId}${choicePart}** (${issue.category})`);
      console.log(`  - ${issue.message}`);
    });
    console.log('');
  };

  printIssues('P0 - Critical', p0);
  printIssues('P1 - High', p1);
  printIssues('P2 - Medium/Low', p2);

  console.log('## Final Summary');
  console.log('');
  console.log(`Total issues: ${issues.length} (P0=${p0.length}, P1=${p1.length}, P2=${p2.length})`);

  if (p0.length > 0) {
    console.log('');
    console.log('❌ Choice audit failed due to P0 issues.');
    process.exit(1);
  }

  console.log('');
  console.log('✅ Choice audit complete.');
}

main().catch((error) => {
  console.error('❌ Choice audit failed');
  console.error(error);
  process.exit(1);
});
