#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - Story Export (JSON)
// ============================================================================
// Strategie A: Legacy -> Canonical beim Export
// Schreibt export/story.json für Android (inkl. Endings)
// ============================================================================

import fs from 'node:fs/promises';
import path from 'node:path';
import { loadNachtzug19Story } from '../src/domain/engine/loadStory.js';
import { validateContent, printValidationResult } from '../src/domain/engine/validateContent.js';
import type {
  Choice,
  Effect,
  EffectTarget,
  Ending,
  EndingsCollection,
  PlayerStats,
  Scene,
  ScenesCollection
} from '../src/domain/types/index.js';

type LegacyChoice = Partial<Choice> & {
  text?: string;
  beschreibungFolge?: string;
  werteAenderung?: Partial<PlayerStats>;
  flagsAenderung?: Record<string, boolean>;
  itemBelohnung?: string;
  itemVerlust?: string;
  naechsteSzeneId?: string;
};

type LegacyScene = Omit<Partial<Scene>, 'choices'> & {
  id: string;
  choices?: LegacyChoice[];
  entscheidungen?: LegacyChoice[];
  kapitel?: string | number;
  titel?: string;
  beschreibung?: string;
  effekteBeimBetreten?: Partial<PlayerStats>;
};

type LegacyEnding = Partial<Ending> & {
  id: string;
  titel?: string;
  beschreibung?: string;
};

type StoryExportPayload = {
  manifest: Awaited<ReturnType<typeof loadNachtzug19Story>>['manifest'];
  scenes: Scene[];
  endings: EndingsCollection;
};

const LEGACY_KEYS = new Set([
  'kapitel',
  'titel',
  'beschreibung',
  'entscheidungen',
  'text',
  'beschreibungFolge',
  'werteAenderung',
  'flagsAenderung',
  'itemBelohnung',
  'itemVerlust',
  'naechsteSzeneId',
  'effekteBeimBetreten'
]);

const LEGACY_ITEM_TARGETS: Record<string, EffectTarget> = {
  recorder: 'has_recorder',
  has_recorder: 'has_recorder',
  tag19: 'has_tag19',
  has_tag19: 'has_tag19',
  ticket: 'has_ticket',
  has_ticket: 'has_ticket',
  photo_anomaly: 'photo_anomaly',
  photoanomaly: 'photo_anomaly'
};

const LEGACY_FLAG_TARGETS = new Set<EffectTarget>([
  'has_recorder',
  'has_tag19',
  'has_ticket',
  'photo_anomaly',
  'played_recorder',
  'memory_search_active',
  'emma_memory_unlocked'
]);

function parseLegacyChapter(raw: string | number | undefined): number | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw === 'number' && Number.isInteger(raw)) return raw;
  if (typeof raw === 'string') {
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return undefined;
}

function mapLegacyStatsDelta(delta: Partial<PlayerStats> | undefined, source: string): Effect[] {
  if (!delta) return [];

  const effects: Effect[] = [];
  const statsKeys: (keyof PlayerStats)[] = ['mut', 'wissen', 'empathie'];

  statsKeys.forEach((key) => {
    const raw = delta[key];
    if (raw === undefined || raw === 0) return;
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new Error(`[export] ${source}: Legacy stats delta '${key}' ist kein valider Number-Wert`);
    }
    effects.push({
      type: raw > 0 ? 'inc' : 'dec',
      target: key,
      value: Math.abs(raw)
    });
  });

  return effects;
}

function mapLegacyFlags(flags: Record<string, boolean> | undefined, source: string): Effect[] {
  if (!flags) return [];

  return Object.entries(flags).map(([key, value]) => {
    if (!LEGACY_FLAG_TARGETS.has(key as EffectTarget)) {
      throw new Error(`[export] ${source}: Legacy flag '${key}' kann nicht sicher auf canonical target gemappt werden`);
    }
    return {
      type: 'set',
      target: key as EffectTarget,
      value
    } as Effect;
  });
}

function mapLegacyItem(item: string | undefined, gain: boolean, source: string): Effect[] {
  if (!item) return [];

  const normalized = item.trim().toLowerCase();
  const target = LEGACY_ITEM_TARGETS[normalized];
  if (!target) {
    throw new Error(`[export] ${source}: Legacy item '${item}' ist unbekannt und kann nicht exportiert werden`);
  }

  return [{
    type: 'set',
    target,
    value: gain
  }];
}

function normalizeChoice(choice: LegacyChoice, sceneId: string, index: number): Choice {
  const source = `${sceneId}.choices[${index}]`;

  if (choice.beschreibungFolge !== undefined) {
    throw new Error(`[export] ${source}: Legacy-Feld 'beschreibungFolge' ist nicht mehr unterstützt`);
  }

  if (choice.condition && typeof choice.condition === 'function') {
    throw new Error(`[export] ${source}: Function-Conditions sind nicht JSON-serialisierbar`);
  }

  const mappedLegacyEffects: Effect[] = [
    ...mapLegacyStatsDelta(choice.werteAenderung, source),
    ...mapLegacyFlags(choice.flagsAenderung, source),
    ...mapLegacyItem(choice.itemBelohnung, true, source),
    ...mapLegacyItem(choice.itemVerlust, false, source)
  ];

  const mergedEffects = [...(choice.effects ?? []), ...mappedLegacyEffects];
  const normalized: Choice = {};

  if (choice.id !== undefined) normalized.id = choice.id;
  if (choice.label !== undefined || choice.text !== undefined) {
    normalized.label = choice.label ?? choice.text;
  }
  if (choice.condition !== undefined) normalized.condition = choice.condition;
  if (mergedEffects.length > 0) normalized.effects = mergedEffects;

  const next = choice.next ?? choice.naechsteSzeneId;
  if (next !== undefined) normalized.next = next;
  if (choice.ending !== undefined) normalized.ending = choice.ending;

  return normalized;
}

function normalizeScene(scene: LegacyScene): Scene {
  const chapter = scene.chapter ?? parseLegacyChapter(scene.kapitel);
  const title = scene.title ?? scene.titel;
  const narrative = scene.narrative ?? scene.beschreibung;
  const rawChoices = scene.choices ?? scene.entscheidungen;

  if (chapter === undefined) {
    throw new Error(`[export] ${scene.id}: chapter fehlt (auch kein Legacy 'kapitel' vorhanden)`);
  }
  if (!title || title.trim().length === 0) {
    throw new Error(`[export] ${scene.id}: title fehlt (auch kein Legacy 'titel' vorhanden)`);
  }
  if (!narrative || narrative.trim().length === 0) {
    throw new Error(`[export] ${scene.id}: narrative fehlt (auch kein Legacy 'beschreibung' vorhanden)`);
  }
  if (!rawChoices || rawChoices.length === 0) {
    throw new Error(`[export] ${scene.id}: choices fehlt/leer (auch kein Legacy 'entscheidungen' vorhanden)`);
  }

  const entryEffects = [
    ...(scene.entry_effects ?? []),
    ...mapLegacyStatsDelta(scene.effekteBeimBetreten, `${scene.id}.effekteBeimBetreten`)
  ];

  const normalized: Scene = {
    id: scene.id,
    chapter,
    title,
    narrative,
    choices: rawChoices.map((choice, index) => normalizeChoice(choice, scene.id, index))
  };

  if (scene.atmosphere !== undefined) normalized.atmosphere = scene.atmosphere;
  if (scene.narrative_variants !== undefined) normalized.narrative_variants = scene.narrative_variants;
  if (scene.tags !== undefined) normalized.tags = scene.tags;
  if (scene.state_notes !== undefined) normalized.state_notes = scene.state_notes;
  if (entryEffects.length > 0) normalized.entry_effects = entryEffects;
  if (scene.exit_effects !== undefined) normalized.exit_effects = scene.exit_effects;

  return normalized;
}

function normalizeEndings(endings: Record<string, LegacyEnding>): EndingsCollection {
  const normalized: EndingsCollection = {};

  Object.entries(endings).forEach(([id, ending]) => {
    const title = ending.title ?? ending.titel;
    const narrative = ending.narrative ?? ending.beschreibung;
    if (!title || !narrative) {
      throw new Error(`[export] ending '${id}' ist unvollständig (title/narrative fehlen)`);
    }

    normalized[id] = {
      id: ending.id || id,
      title,
      narrative
    };
  });

  return normalized;
}

function assertNoLegacyKeys(value: unknown, pointer: string = '$'): void {
  if (!value || typeof value !== 'object') return;

  if (Array.isArray(value)) {
    value.forEach((entry, index) => assertNoLegacyKeys(entry, `${pointer}[${index}]`));
    return;
  }

  Object.entries(value as Record<string, unknown>).forEach(([key, child]) => {
    if (LEGACY_KEYS.has(key)) {
      throw new Error(`[export] Canonical-Only verletzt: Legacy-Key '${key}' gefunden an ${pointer}.${key}`);
    }
    assertNoLegacyKeys(child, `${pointer}.${key}`);
  });
}

function assertCanonicalPayload(payload: StoryExportPayload): void {
  assertNoLegacyKeys(payload);

  payload.scenes.forEach((scene) => {
    if (!Number.isInteger(scene.chapter)) {
      throw new Error(`[export] ${scene.id}: chapter muss integer sein`);
    }
    if (!scene.title || !scene.narrative) {
      throw new Error(`[export] ${scene.id}: title und narrative sind Pflichtfelder`);
    }
    if (!Array.isArray(scene.choices)) {
      throw new Error(`[export] ${scene.id}: choices muss ein Array sein`);
    }
  });
}

async function main(): Promise<void> {
  console.log('📦 Exportiere NACHTZUG 19 Story...\n');

  try {
    const story = await loadNachtzug19Story();
    const normalizedScenes = Object.values(story.scenes).map(scene =>
      normalizeScene(scene as unknown as LegacyScene)
    );
    const normalizedScenesById: ScenesCollection = Object.fromEntries(
      normalizedScenes.map(scene => [scene.id, scene])
    );
    const normalizedEndings = normalizeEndings(story.endings as Record<string, LegacyEnding>);

    const result = validateContent(
      story.startSceneId,
      normalizedScenesById,
      normalizedEndings
    );
    printValidationResult(result);

    if (!result.valid) {
      console.error('\n❌ Content-Validierung fehlgeschlagen. Export wird trotzdem geschrieben.');
    }

    const scenes = normalizedScenes.sort((a, b) => {
      const chapterA = a.chapter ?? 0;
      const chapterB = b.chapter ?? 0;
      if (chapterA !== chapterB) return chapterA - chapterB;
      return a.id.localeCompare(b.id);
    });

    const exportPayload: StoryExportPayload = {
      manifest: story.manifest,
      scenes,
      endings: normalizedEndings
    };
    assertCanonicalPayload(exportPayload);

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
