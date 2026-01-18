#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Story Export (JSON)
// ============================================================================
// Schreibt export/story.json für Android (inkl. Endings)
// ============================================================================

import fs from 'node:fs/promises';
import path from 'node:path';
import { loadNachtzug19Story } from '../src/domain/engine/loadStory.js';
import { validateContent, printValidationResult } from '../src/domain/engine/validateContent.js';

async function main(): Promise<void> {
  console.log('📦 Exportiere NACHTZUG 19 Story...\n');

  try {
    const story = await loadNachtzug19Story();

    const result = validateContent(
      story.startSceneId,
      story.scenes,
      story.endings
    );
    printValidationResult(result);

    if (!result.valid) {
      console.error('\n❌ Content-Validierung fehlgeschlagen. Export wird trotzdem geschrieben.');
    }

    const scenes = Object.values(story.scenes).sort((a, b) => {
      const chapterA = a.chapter ?? 0;
      const chapterB = b.chapter ?? 0;
      if (chapterA !== chapterB) return chapterA - chapterB;
      return a.id.localeCompare(b.id);
    });

    const exportPayload = {
      manifest: story.manifest,
      scenes,
      endings: story.endings
    };

    const exportDir = path.resolve('export');
    const exportPath = path.join(exportDir, 'story.json');
    await fs.mkdir(exportDir, { recursive: true });
    await fs.writeFile(exportPath, JSON.stringify(exportPayload, null, 2), 'utf8');
    console.log(`✅ Story exportiert: ${exportPath}`);

    const androidAssetsDir = path.resolve('android-native/app/src/main/assets');
    const androidAssetsPath = path.join(androidAssetsDir, 'story.json');
    try {
      await fs.access(androidAssetsDir);
      await fs.copyFile(exportPath, androidAssetsPath);
      console.log(`✅ Kopiert nach Android Assets: ${androidAssetsPath}`);
    } catch {
      console.log('ℹ️  Android Assets nicht gefunden, Copy übersprungen.');
    }

    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    console.error('❌ Fehler beim Export:');
    console.error(error);
    process.exit(1);
  }
}

main();
