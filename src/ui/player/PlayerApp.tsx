import React, { useState } from 'react';
import { usePlayerSession } from './state/usePlayerSession';
import { usePlayerSettings } from './state/settings';
import { PlayerScreen } from './PlayerScreen';
import './styles/player.css';

interface PlayerAppProps {
  onExit: () => void;
}

export const PlayerApp: React.FC<PlayerAppProps> = ({ onExit }) => {
  const { 
    gameState, 
    currentScene, 
    availableChoices, 
    makeChoice, 
    isLoading, 
    error,
    continueGame,
    canContinue,
    restartGame
  } = usePlayerSession();
  
  const { settings, updateSetting } = usePlayerSettings();
  const [started, setStarted] = useState(false);
  const rootMotionClass = settings.reduceMotion ? 'reduce-motion' : '';

  // Loading Screen
  if (isLoading) {
    return (
      <div className={`w-full h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden ${rootMotionClass}`}>
        {settings.immersionFx && !settings.reduceMotion && <div className="noise-overlay" />}
        <div className="text-amber-600/60 font-mono animate-pulse tracking-[0.5em] text-sm uppercase">
          Verbindung zum Zugsystem...
        </div>
      </div>
    );
  }

  // Error Screen
  if (error) {
    return (
      <div className={`w-full h-screen bg-stone-950 flex flex-col items-center justify-center text-red-400 p-8 text-center relative font-mono ${rootMotionClass}`}>
        {settings.immersionFx && !settings.reduceMotion && <div className="noise-overlay opacity-20" />}
        <div className="border border-red-900/50 bg-red-950/10 p-8 max-w-md backdrop-blur-sm relative z-10">
          <h1 className="text-xl font-bold mb-4 tracking-widest uppercase border-b border-red-900/50 pb-2">Fatal Error</h1>
          <p className="mb-8 text-sm opacity-80">{error}</p>
          <button 
            onClick={onExit} 
            className="px-6 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-800 transition-colors uppercase text-xs tracking-widest"
          >
            Notausstieg
          </button>
        </div>
      </div>
    );
  }

  // Start / Menu Screen
  if (!started) {
    return (
      <div className={`w-full h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-200 relative overflow-hidden ${rootMotionClass}`}>
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black" />
        {settings.immersionFx && !settings.reduceMotion && <div className="noise-overlay" />}
        <div className="vignette fixed inset-0 pointer-events-none" />
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center space-y-12 animate-fade-in-up">
          
          {/* Logo / Title Area */}
          <div className="text-center space-y-4">
             <div className="text-amber-700/50 font-mono text-xs uppercase tracking-[0.4em] mb-2">
               Psychological Mystery
             </div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-100 tracking-tighter drop-shadow-2xl">
              NACHTZUG 19
             </h1>
             <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto opacity-70"></div>
          </div>

          {/* Menu Buttons */}
          <div className="w-64 space-y-4">
            {canContinue && (
              <button 
                onClick={() => { continueGame(); setStarted(true); }}
                className="
                  w-full py-4 relative group overflow-hidden
                  bg-amber-700 hover:bg-amber-600 text-stone-950
                  font-mono font-bold tracking-widest uppercase text-sm
                  transition-all duration-300 shadow-lg hover:shadow-amber-900/40
                  clip-path-ticket
                "
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>▶</span> Weiterfahren
                </span>
              </button>
            )}

            <button 
              onClick={() => { restartGame(); setStarted(true); }}
              className={`
                w-full py-4 relative group
                border border-stone-800 hover:border-amber-700/50 hover:bg-stone-900
                text-stone-400 hover:text-stone-200
                font-mono uppercase text-xs tracking-[0.2em]
                transition-all duration-300
              `}
            >
              Neues Ticket lösen
            </button>
          </div>
          
          {/* Footer / Exit */}
          <div className="absolute bottom-8 text-center">
             <button 
                onClick={onExit}
                className="text-stone-700 hover:text-stone-500 text-[10px] uppercase tracking-widest transition-colors font-mono"
             >
                Development Mode
             </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentScene || !gameState) return null;

  // Game Over
  if (gameState.isGameOver) {
      return (
          <div className={`w-full h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-200 p-8 text-center animate-in fade-in duration-1000 relative ${rootMotionClass}`}>
               {settings.immersionFx && !settings.reduceMotion && <div className="noise-overlay" />}
               <h2 className="text-4xl font-serif text-amber-600 mb-6 tracking-widest uppercase drop-shadow-lg">Endstation</h2>
               <div className="h-px w-16 bg-stone-700 mx-auto mb-8"></div>
               <p className="max-w-prose mb-12 font-serif leading-loose text-lg text-stone-300/80 italic">
                   "Alle Fahrgäste bitte aussteigen."
               </p>
               <button 
                onClick={() => setStarted(false)}
                className="text-amber-500/80 hover:text-amber-400 border-b border-transparent hover:border-amber-500 transition-all pb-1 font-mono text-xs uppercase tracking-widest"
               >
                   Zurück zum Bahnsteig
               </button>
          </div>
      )
  }

  return (
    <PlayerScreen
      scene={currentScene}
      choices={availableChoices}
      gameState={gameState}
      onChoice={makeChoice}
      settings={settings}
      onUpdateSettings={updateSetting}
      onExit={onExit}
    />
  );
};
