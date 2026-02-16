import { beforeAll, describe, expect, it } from 'vitest';
import { loadNachtzug19Story, StoryBundle } from '../../domain/engine/loadStory';
import { validateContent } from '../../domain/engine/validateContent';

let bundle: StoryBundle;

beforeAll(async () => {
  bundle = await loadNachtzug19Story();
});

describe('NACHTZUG 19 content integrity', () => {
  it('passes full validation with zero errors', () => {
    const result = validateContent(bundle.startSceneId, bundle.scenes, bundle.endings);
    expect(result.errors).toHaveLength(0);
    expect(result.valid).toBe(true);
    // Note: Warnings are expected (unreachable scenes from K2+, hub loop detection)
    // We only care that there are no blocking errors
  });

  it('has exactly one station_end scene per chapter', () => {
    const stationCounts = new Map<number, number>();
    const chapters = new Set<number>();

    Object.values(bundle.scenes).forEach(scene => {
      if (scene.chapter !== undefined) {
        chapters.add(scene.chapter);
        if (scene.tags?.includes('station_end')) {
          stationCounts.set(scene.chapter, (stationCounts.get(scene.chapter) || 0) + 1);
        }
      }
    });

    chapters.forEach(chapter => {
      const count = stationCounts.get(chapter) || 0;
      expect(count).toBe(1);
    });
  });

  it('enforces control scenes only in chapters 2, 3, and 5', () => {
    const controlChapters = new Set<number>();

    Object.values(bundle.scenes).forEach(scene => {
      if (scene.chapter !== undefined && scene.tags?.includes('control')) {
        controlChapters.add(scene.chapter);
      }
    });

    expect([...controlChapters].sort()).toEqual([2, 3, 5]);
  });

  it('has explicit ending choices for each ending id', () => {
    const endingIds = new Set(Object.keys(bundle.endings));
    const referencedEndings = new Set<string>();

    Object.values(bundle.scenes).forEach(scene => {
      scene.choices.forEach(choice => {
        if (choice.ending) {
          referencedEndings.add(choice.ending);
        }
      });
    });

    endingIds.forEach(endingId => {
      expect(referencedEndings.has(endingId)).toBe(true);
    });
  });
});

