import { beforeAll, describe, expect, it } from 'vitest';
import { loadNachtzug19Story, StoryBundle } from '../../src/domain/engine/loadStory';
import { makeTicketPolicy, simulateWithPolicy } from '../helpers/simRunner';

let bundle: StoryBundle;

beforeAll(async () => {
  bundle = await loadNachtzug19Story();
});

describe('deterministic story simulation (full story smoke)', () => {
  it('completes a truth-focused run without getting stuck', () => {
    const result = simulateWithPolicy({
      scenes: bundle.scenes,
      startSceneId: bundle.startSceneId,
      policy: makeTicketPolicy('tickets_truth'),
      maxSteps: 400
    });

    expect(result.stuck).toBe(false);
    expect(result.state.isGameOver).toBe(true);
    expect(result.steps).toBeLessThan(400);
  });

  it('completes a love-focused run without getting stuck', () => {
    const result = simulateWithPolicy({
      scenes: bundle.scenes,
      startSceneId: bundle.startSceneId,
      policy: makeTicketPolicy('tickets_love'),
      maxSteps: 400
    });

    expect(result.stuck).toBe(false);
    expect(result.state.isGameOver).toBe(true);
    expect(result.steps).toBeLessThan(400);
  });
});

