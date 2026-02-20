import { afterEach, describe, expect, it, vi } from 'vitest';
import type { EndingsCollection, ScenesCollection } from '../../domain/types';
import { ContentAuditorMCPServer } from './ContentAuditorMCPServer';

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

describe('ContentAuditorMCPServer', () => {
  it('treats auto_next as graph edge in narrative consistency checks', async () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        choices: [
          {
            id: 'to_hub',
            label: 'Zum Hub',
            effects: [],
            next: 'hub'
          }
        ]
      },
      hub: {
        id: 'hub',
        chapter: 1,
        narrative_variants: [
          {
            condition: { type: 'compare', target: 'tickets_truth', operator: '>=', value: 0 },
            narrative: 'Weiter',
            auto_next: 'auto_target'
          }
        ],
        choices: [
          {
            id: 'end_hub',
            label: 'Beenden',
            effects: [],
            ending: 'E1'
          }
        ]
      },
      auto_target: {
        id: 'auto_target',
        chapter: 1,
        choices: [
          {
            id: 'finish',
            label: 'Finale',
            effects: [],
            ending: 'E1'
          }
        ]
      }
    };

    const server = new ContentAuditorMCPServer({
      projectPath: process.cwd(),
      scenes,
      endings,
      startSceneId: 'start'
    });

    const result = await server.executeTool('checkNarrativeConsistency', { printOutput: false });
    expect(result.success).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([]);
  });

  it('tracks state targets dynamically from effects in report generation', async () => {
    const scenes: ScenesCollection = {
      start: {
        id: 'start',
        chapter: 1,
        choices: [
          {
            id: 'set_stance',
            label: 'Haltung setzen',
            effects: [
              { type: 'set', target: 'prepare_stance', value: 'truth' },
              { type: 'inc', target: 'tickets_truth', value: 1 }
            ],
            ending: 'E1'
          }
        ]
      }
    };

    const server = new ContentAuditorMCPServer({
      projectPath: process.cwd(),
      scenes,
      endings,
      startSceneId: 'start'
    });

    vi.spyOn(console, 'log').mockImplementation(() => {});

    const result = await server.executeTool('generateReport', { format: 'console' });
    expect(result.success).toBe(true);

    const report = result.data as {
      summary: { stateVariablesTracked: number };
      stateFlowAnalysis: Array<{ target: string; totalChanges: number }>;
    };

    expect(report.summary.stateVariablesTracked).toBe(2);
    expect(report.stateFlowAnalysis.find(analysis => analysis.target === 'prepare_stance')?.totalChanges).toBe(1);
    expect(report.stateFlowAnalysis.find(analysis => analysis.target === 'tickets_truth')?.totalChanges).toBe(1);
  });
});
