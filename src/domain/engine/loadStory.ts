// ============================================================================
// NACHTZUG 19 - Story Loader
// ============================================================================
// Lädt Story-Content dynamisch aus Manifest + Kapitel-Dateien
// ============================================================================

import {
  Manifest,
  ScenesCollection,
  EndingsCollection
} from '../types';

/**
 * Story Bundle - Geladene Story mit allen Szenen und Endings
 */
export type StoryBundle = {
  manifest: Manifest;
  scenes: ScenesCollection;
  endings: EndingsCollection;
  startSceneId: string;
};

/**
 * Lädt eine Story basierend auf einem Manifest
 *
 * @param manifest - Das Story-Manifest
 * @param sceneCollections - Array von Szenen-Collections (aus Kapiteldateien)
 * @param endings - Endings-Collection
 * @returns StoryBundle mit allen geladenen Daten
 */
export function loadStory(
  manifest: Manifest,
  sceneCollections: ScenesCollection[],
  endings: EndingsCollection
): StoryBundle {
  // Merge alle Szenen-Collections zu einer
  const scenes: ScenesCollection = {};

  sceneCollections.forEach(collection => {
    Object.entries(collection).forEach(([id, scene]) => {
      if (scenes[id]) {
        console.warn(`[loadStory] Duplicate scene ID: ${id}`);
      }
      scenes[id] = scene;
    });
  });

  return {
    manifest,
    scenes,
    endings,
    startSceneId: manifest.start_scene_id
  };
}

/**
 * Lädt die NACHTZUG 19 Story
 */
export async function loadNachtzug19Story(): Promise<StoryBundle> {
  // Dynamische Imports
  const { nachtzug19Manifest, nachtzug19Endings } = await import('../../content/nachtzug19/manifest');
  const { chapter1Scenes } = await import('../../content/nachtzug19/scenes/c1');
  const { chapter2Scenes } = await import('../../content/nachtzug19/scenes/c2');
  const { chapter3Scenes } = await import('../../content/nachtzug19/scenes/c3');
  const { chapter4Scenes } = await import('../../content/nachtzug19/scenes/c4');
  const { c5Scenes } = await import('../../content/nachtzug19/scenes/c5');
  const { c6Scenes } = await import('../../content/nachtzug19/scenes/c6');
  const { c7Scenes } = await import('../../content/nachtzug19/scenes/c7');
  const { endingScenes } = await import('../../content/nachtzug19/scenes/endings');

  return loadStory(
    nachtzug19Manifest,
    [chapter1Scenes, chapter2Scenes, chapter3Scenes, chapter4Scenes, c5Scenes, c6Scenes, c7Scenes, endingScenes],
    nachtzug19Endings
  );
}

