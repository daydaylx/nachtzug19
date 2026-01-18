import { useState, useEffect, useCallback } from 'react';
import { GameEngine } from '../../../domain/engine/gameEngine';
import { GameState, Choice, Scene } from '../../../domain/types';
import { loadNachtzug19Story } from '../../../domain/engine/loadStory';

export interface PlayerSession {
  engine: GameEngine | null;
  gameState: GameState | null;
  currentScene: Scene | null;
  availableChoices: Choice[];
  isLoading: boolean;
  error: string | null;
  makeChoice: (choice: Choice) => void;
  restartGame: () => void;
  continueGame: () => void;
  canContinue: boolean;
}

const SAVE_KEY = 'nachtzug19_save_auto';

export function usePlayerSession() {
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startSceneId, setStartSceneId] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const bundle = await loadNachtzug19Story();

        const newEngine = new GameEngine(
          bundle.scenes,
          bundle.endings,
          bundle.startSceneId
        );

        setEngine(newEngine);
        setStartSceneId(bundle.startSceneId);
        setGameState(newEngine.getState());
      } catch (err: any) {
        setError(`Failed to load story content: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (!engine) return;

    const unsubscribe = engine.subscribe((newState) => {
      setGameState({ ...newState });
    });

    return () => unsubscribe();
  }, [engine]);

  const makeChoice = useCallback((choice: Choice) => {
    if (!engine) return;
    try {
      setError(null);
      engine.makeChoice(choice);
    } catch (err: any) {
      setError(`Engine Error: ${err.message}`);
    }
  }, [engine]);

  const restartGame = useCallback(() => {
    if (!engine) return;
    setError(null);
    engine.startGame(startSceneId || undefined);
  }, [engine, startSceneId]);

  const continueGame = useCallback(() => {
    if (!engine) return;
    setError(null);
    const loaded = engine.loadGame('auto');
    if (!loaded) {
      engine.startGame(startSceneId || undefined);
    }
  }, [engine, startSceneId]);

  const hasSaveGame = useCallback(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (!saved) return false;
      const parsed = JSON.parse(saved) as any;
      if (parsed && typeof parsed.version === 'number') return true;
      if (parsed && parsed.state && typeof parsed.state.save_version === 'number') return true;
      if (parsed && typeof parsed.save_version === 'number') return true;
      return false;
    } catch {
      return false;
    }
  }, []);

  return {
    engine,
    gameState,
    currentScene: engine && gameState ? engine.getCurrentScene() : null,
    availableChoices: engine ? engine.getAvailableChoices() : [],
    isLoading,
    error,
    makeChoice,
    restartGame,
    continueGame,
    canContinue: hasSaveGame()
  };
}
