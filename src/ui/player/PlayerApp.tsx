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
  const showFx = settings.immersionFx;
  const animateDrift = showFx && !settings.reduceMotion;

  const BackgroundLayers = () => (
    <>
      <div className="rn-layer rn-bg" />
      {animateDrift && <div className="rn-layer rn-bg rn-bg--drift" />}
      {showFx && <div className="rn-layer rn-noise" />}
      <div className="rn-layer rn-vignette" />
    </>
  );

  if (isLoading) {
    return (
      <div className={`rn-root ${rootMotionClass}`}>
        <BackgroundLayers />
        <div className="rn-content rn-start">
          <div className="rn-start-card">
            <div className="rn-start-sub">Zugsystem</div>
            <h1 className="rn-start-title">NACHTZUG 19</h1>
            <div className="rn-link">Verbindung wird aufgebaut...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rn-root ${rootMotionClass}`}>
        <BackgroundLayers />
        <div className="rn-content rn-start">
          <div className="rn-start-card">
            <div className="rn-start-sub">Fehler</div>
            <div className="rn-error-text">{error}</div>
            <button
              type="button"
              className="rn-primary-action"
              onClick={() => {
                restartGame();
                setStarted(true);
              }}
            >
              Neustart
            </button>
            <button type="button" className="rn-secondary-action" onClick={onExit}>
              Zum Launcher
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className={`rn-root ${rootMotionClass}`}>
        <BackgroundLayers />
        <div className="rn-content rn-start">
          <div className="rn-start-card">
            <div className="rn-start-sub">Reader Noir</div>
            <h1 className="rn-start-title">NACHTZUG 19</h1>
            {canContinue && (
              <button
                type="button"
                className="rn-primary-action"
                onClick={() => {
                  continueGame();
                  setStarted(true);
                }}
              >
                Weiterfahren
              </button>
            )}
            <button
              type="button"
              className="rn-secondary-action"
              onClick={() => {
                restartGame();
                setStarted(true);
              }}
            >
              Neues Ticket loesen
            </button>
            <button type="button" className="rn-link" onClick={onExit}>
              Zurueck zum Launcher
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentScene || !gameState) return null;

  if (gameState.isGameOver) {
    return (
      <div className={`rn-root ${rootMotionClass}`}>
        <BackgroundLayers />
        <div className="rn-content rn-start">
          <div className="rn-start-card">
            <div className="rn-start-sub">Endstation</div>
            <h2 className="rn-start-title">Endstation</h2>
            <div className="rn-link">"Alle Fahrgaeste bitte aussteigen."</div>
            <button type="button" className="rn-secondary-action" onClick={() => setStarted(false)}>
              Zum Bahnsteig
            </button>
          </div>
        </div>
      </div>
    );
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
