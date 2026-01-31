import { describe, expect, it, vi } from 'vitest';
import { loadStory } from './loadStory';
import type { EndingsCollection, Manifest, ScenesCollection } from '../types';

describe('loadStory', () => {
  it('warns on duplicate scene IDs and keeps the latest entry', () => {
    const manifest: Manifest = {
      id: 'test',
      title: 'Test',
      start_scene_id: 'dup',
      chapters: []
    };

    const scenesA: ScenesCollection = {
      dup: {
        id: 'dup',
        chapter: 1,
        choices: [
          { id: 'end', label: 'End', effects: [], ending: 'A' }
        ]
      }
    };

    const scenesB: ScenesCollection = {
      dup: {
        id: 'dup',
        chapter: 2,
        choices: [
          { id: 'end', label: 'End', effects: [], ending: 'A' }
        ]
      }
    };

    const endings: EndingsCollection = {
      A: { id: 'A', title: 'A', narrative: 'A' }
    };

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const bundle = loadStory(manifest, [scenesA, scenesB], endings);

    expect(warnSpy).toHaveBeenCalledWith('[loadStory] Duplicate scene ID: dup');
    expect(bundle.scenes.dup.chapter).toBe(2);

    warnSpy.mockRestore();
  });
});

