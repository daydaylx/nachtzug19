#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Content Validation CLI
// ============================================================================
// Lädt die komplette Story und führt Graph-Validierung durch.
// Exit Code 0: Keine Errors
// Exit Code 1: Errors gefunden
// ============================================================================

import { loadNachtzug19Story } from '../src/domain/engine/loadStory.js';
import { validateContent, printValidationResult } from '../src/domain/engine/validateContent.js';

type WarningKind =
  | 'unreachable_scene'
  | 'potential_infinite_loop'
  | 'multiple_station_end'
  | 'clamp_without_bounds'
  | 'missing_state_notes'
  | 'other';

type ValidationWarning = {
  message: string;
  scene_id?: string;
  location?: string;
};

const EXPECTED_WARNING_ALLOWLIST: Record<WarningKind, Set<string>> = {
  // Bewusst akzeptierte Warnings (aktuell leer halten, um Drift früh zu sehen)
  unreachable_scene: new Set(),
  potential_infinite_loop: new Set(),
  multiple_station_end: new Set(),
  clamp_without_bounds: new Set(),
  missing_state_notes: new Set(),
  other: new Set()
};

function classifyWarning(warning: ValidationWarning): WarningKind {
  if (warning.message.includes('ist vom Start nicht erreichbar')) return 'unreachable_scene';
  if (warning.message.includes('Potenzielle Endlosschleife erkannt')) return 'potential_infinite_loop';
  if (warning.message.includes('station_end-Szenen')) return 'multiple_station_end';
  if (warning.message.includes('clamp ohne clamp_min/clamp_max')) return 'clamp_without_bounds';
  if (warning.message.includes('starke Effects, aber keine state_notes')) return 'missing_state_notes';
  return 'other';
}

function warningId(warning: ValidationWarning, kind: WarningKind): string {
  if (kind === 'unreachable_scene') return warning.scene_id || '';
  if (kind === 'multiple_station_end') return warning.location || warning.message;
  return warning.message;
}

function splitWarnings(warnings: ValidationWarning[]): {
  expected: ValidationWarning[];
  actionable: ValidationWarning[];
  counts: Record<WarningKind, number>;
} {
  const counts: Record<WarningKind, number> = {
    unreachable_scene: 0,
    potential_infinite_loop: 0,
    multiple_station_end: 0,
    clamp_without_bounds: 0,
    missing_state_notes: 0,
    other: 0
  };

  const expected: ValidationWarning[] = [];
  const actionable: ValidationWarning[] = [];

  warnings.forEach((warning) => {
    const kind = classifyWarning(warning);
    counts[kind] += 1;
    const id = warningId(warning, kind);
    const isAllowlisted = EXPECTED_WARNING_ALLOWLIST[kind].has(id);
    if (isAllowlisted) {
      expected.push(warning);
    } else {
      actionable.push(warning);
    }
  });

  return { expected, actionable, counts };
}

async function main(): Promise<void> {
  const strictMode = process.argv.slice(2).includes('--strict');
  if (strictMode) {
    console.log('🛡️  Strict Mode aktiv: Nicht-allowlistete Warnings führen zu Exit Code 1.\n');
  }

  console.log('🔍 Lade NACHTZUG 19 Story...\n');

  try {
    const story = await loadNachtzug19Story();

    console.log(`✅ Story geladen: ${Object.keys(story.scenes).length} Szenen, ${Object.keys(story.endings).length} Endings\n`);
    console.log('🔍 Starte Content-Validierung...\n');

    const result = validateContent(
      story.startSceneId,
      story.scenes,
      story.endings
    );

    printValidationResult(result);

    if (!result.valid) {
      console.error('\n❌ Validierung fehlgeschlagen. Bitte beheben Sie die Errors.');
      process.exit(1);
    } else {
      const { expected, actionable, counts } = splitWarnings(result.warnings as ValidationWarning[]);

      console.log('\n✅ Alle Checks bestanden!');
      if (result.warnings.length > 0) {
        console.log(`\n⚠️  Warnungs-Klassifikation:`);
        console.log(`   - unreachable_scene: ${counts.unreachable_scene}`);
        console.log(`   - potential_infinite_loop: ${counts.potential_infinite_loop}`);
        console.log(`   - multiple_station_end: ${counts.multiple_station_end}`);
        console.log(`   - clamp_without_bounds: ${counts.clamp_without_bounds}`);
        console.log(`   - missing_state_notes: ${counts.missing_state_notes}`);
        console.log(`   - other: ${counts.other}`);
        console.log(`\n   - Allowlist (expected): ${expected.length}`);
        console.log(`   - Actionable (nicht allowlisted): ${actionable.length}`);
      }

      if (actionable.length > 0) {
        console.log('\n🔎 Actionable Warnings:');
        actionable.forEach((warning) => {
          const location = warning.scene_id || warning.location || 'unknown';
          console.log(`   [${location}] ${warning.message}`);
        });
      }

      if (strictMode && actionable.length > 0) {
        console.error('\n❌ Strict Mode: Actionable Warnings gefunden.');
        process.exit(1);
      }

      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Fehler beim Laden der Story:');
    console.error(error);
    process.exit(1);
  }
}

main();
