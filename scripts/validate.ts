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

async function main(): Promise<void> {
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
      console.log('\n✅ Alle Checks bestanden!');
      if (result.warnings.length > 0) {
        console.log(`\n⚠️  Hinweis: Es gibt ${result.warnings.length} Warnings, die geprüft werden sollten.`);
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
