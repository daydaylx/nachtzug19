import { Choice, EffectTarget, GameState, Scene, ScenesCollection } from '../../src/domain/types';
import { createInitialState } from '../../src/domain/types';
import { getAvailableChoices, transitionToNextScene } from '../../src/domain/engine/gameEngine';

export type ChoicePolicy = (state: GameState, scene: Scene, choices: Choice[]) => Choice;

export type SimulationResult = {
  state: GameState;
  steps: number;
  stuck: boolean;
  lastSceneId: string;
};

const ORDER_KEY_FALLBACK = 'zzzz';

function choiceOrderKey(choice: Choice): string {
  return (
    choice.id ||
    choice.label ||
    ORDER_KEY_FALLBACK
  );
}

function scoreChoice(choice: Choice, target: EffectTarget): number {
  if (!choice.effects || choice.effects.length === 0) return 0;

  return choice.effects.reduce((total, effect) => {
    if (effect.target !== target) return total;
    if (effect.type === 'inc') return total + (Number(effect.value) || 1);
    if (effect.type === 'dec') return total - (Number(effect.value) || 1);
    if (effect.type === 'set' && typeof effect.value === 'number') return total + effect.value;
    return total;
  }, 0);
}

export function makeTicketPolicy(target: EffectTarget): ChoicePolicy {
  return (_state, _scene, choices) => {
    const endingChoice = choices.find(choice => choice.ending);
    if (endingChoice) return endingChoice;

    const endingNextChoice = choices.find(choice => choice.next && choice.next.startsWith('ending_'));
    if (endingNextChoice) return endingNextChoice;

    const scored = choices.map(choice => ({
      choice,
      score: scoreChoice(choice, target)
    }));

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return choiceOrderKey(a.choice).localeCompare(choiceOrderKey(b.choice));
    });

    return scored[0]?.choice || choices[0];
  };
}

export function simulateWithPolicy(options: {
  scenes: ScenesCollection;
  startSceneId: string;
  policy: ChoicePolicy;
  maxSteps?: number;
}): SimulationResult {
  const { scenes, startSceneId, policy, maxSteps = 300 } = options;
  const state = createInitialState(startSceneId);

  let steps = 0;
  let stuck = false;
  let lastSceneId = state.current_scene_id;

  while (!state.isGameOver && steps < maxSteps) {
    const scene = scenes[state.current_scene_id];
    if (!scene) {
      stuck = true;
      break;
    }

    const available = getAvailableChoices(state, scene);
    if (available.length === 0) {
      stuck = true;
      lastSceneId = scene.id;
      break;
    }

    const selected = policy(state, scene, available);
    transitionToNextScene(state, scene, selected, scenes);

    steps += 1;
    lastSceneId = state.current_scene_id;
  }

  if (steps >= maxSteps) {
    stuck = true;
  }

  return { state, steps, stuck, lastSceneId };
}
