import { useState, useEffect, useCallback, useRef } from 'react';
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

export function usePlayerSession() {
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to avoid effect loops
  const engineRef = useRef<GameEngine | null>(null);

  // Initialize Engine and Content
  useEffect(() => {
    async function init() {
      try {
        const bundle = await loadNachtzug19Story();
        
        // Setup Engine
        const newEngine = new GameEngine(
          bundle.scenes, 
          bundle.endings, 
          bundle.startSceneId
        );
        
        engineRef.current = newEngine;
        setEngine(newEngine);
        
        // Initial state from engine (default start)
        setGameState(newEngine.getState());
        
        // Try to verify if we have a savegame to continue
        // We don't load it yet, just check
        // Logic handled in 'canContinue' derived state below
        
      } catch (err: any) {
        setError(`Failed to load story content: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    
    init();
  }, []);

  // Subscribe to Engine Updates
  useEffect(() => {
    if (!engine) return;

    const unsubscribe = engine.subscribe((newState) => {
      setGameState({ ...newState }); // Spread to trigger re-render
    });

    return () => unsubscribe();
  }, [engine]);

  const makeChoice = useCallback((choice: Choice) => {
    if (!engine) return;
    try {
      engine.makeChoice(choice);
    } catch (err: any) {
      setError(`Engine Error: ${err.message}`);
    }
  }, [engine]);

  const restartGame = useCallback(() => {
    if (!engine) return;
    engine.startGame();
  }, [engine]);

  const continueGame = useCallback(() => {
    if (!engine) return;
    const loaded = engine.loadGame('auto'); // Uses default 'auto' slot
    if (!loaded) {
      // Fallback if load fails (shouldn't happen if button is enabled)
      engine.startGame();
    }
  }, [engine]);

  // Check if save exists
  const hasSaveGame = useCallback(() => {
    // Basic check without actually loading
    try {
      return !!localStorage.getItem('nachtzug19_save_auto');
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
