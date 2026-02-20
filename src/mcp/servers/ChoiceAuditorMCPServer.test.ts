import { afterEach, describe, expect, it, vi } from 'vitest';
import type { EndingsCollection, ScenesCollection } from '../../domain/types';
import { ChoiceAuditorMCPServer } from './ChoiceAuditorMCPServer';

const endings: EndingsCollection = {
  E1: {
    id: 'E1',
    title: 'Ende',
    narrative: 'Finale'
  }
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ChoiceAuditorMCPServer', () => {
  it('builds a complete choice report summary without undefined density fields', async () => {
    const scenes: ScenesCollection = {
      s1: {
        id: 's1',
        chapter: 1,
        state_notes: ['tickets_truth callback documented'],
        choices: [
          {
            id: 'to_s2',
            label: 'Weiter',
            effects: [{ type: 'inc', target: 'tickets_truth', value: 1 }],
            next: 's2'
          }
        ]
      },
      s2: {
        id: 's2',
        chapter: 1,
        choices: [
          {
            id: 'finish',
            label: 'Ende',
            effects: [],
            ending: 'E1'
          }
        ]
      }
    };

    const server = new ChoiceAuditorMCPServer({
      projectPath: process.cwd(),
      scenes,
      endings,
      startSceneId: 's1'
    });

    vi.spyOn(console, 'log').mockImplementation(() => {});

    const result = await server.executeTool('generateChoiceReport', { format: 'console' });
    expect(result.success).toBe(true);
    expect(result.errors).toBeUndefined();

    const report = result.data as {
      summary: {
        totalScenes: number;
        totalChoices: number;
        avgChoicesPerScene: number;
        avgChoiceDensity: number;
      };
    };

    expect(report.summary.totalScenes).toBe(2);
    expect(report.summary.totalChoices).toBe(2);
    expect(report.summary.avgChoicesPerScene).toBeCloseTo(1);
    expect(report.summary.avgChoiceDensity).toBeCloseTo(1);
  });

  it('does not count missing callback documentation as documented callback', async () => {
    const scenes: ScenesCollection = {
      s1: {
        id: 's1',
        chapter: 1,
        choices: [
          {
            id: 'set_flag',
            label: 'Setze Flag',
            effects: [{ type: 'set', target: 'has_recorder', value: true }],
            ending: 'E1'
          }
        ]
      }
    };

    const server = new ChoiceAuditorMCPServer({
      projectPath: process.cwd(),
      scenes,
      endings,
      startSceneId: 's1'
    });

    const result = await server.executeTool('checkCallbackIntegrity', { chapter: null, printOutput: false });
    expect(result.success).toBe(false);

    const analysis = result.data as {
      choicesWithEffects: number;
      choicesWithCallbacks: number;
      callbackRate: number;
      issues: Array<{ type: string }>;
    };

    expect(analysis.choicesWithEffects).toBe(1);
    expect(analysis.choicesWithCallbacks).toBe(0);
    expect(analysis.callbackRate).toBe(0);
    expect(analysis.issues.some(issue => issue.type === 'missing_callback_documentation')).toBe(true);
  });
});
