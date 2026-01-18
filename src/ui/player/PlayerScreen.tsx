import React, { useEffect, useRef, useState } from 'react';
import { Scene, Choice, GameState, resolveSceneNarrative } from '../../domain/types';
import { PlayerSettings } from './state/settings';
import { Topbar } from './components/Topbar';
import { ReaderCard } from './components/ReaderCard';
import { ChoiceTray } from './components/ChoiceTray';
import { StatusDrawer } from './components/StatusDrawer';
import { SettingsDrawer } from './components/SettingsDrawer';
import { StationOverlay } from './components/StationOverlay';
import { AnnouncementBanner } from './components/AnnouncementBanner';

interface PlayerScreenProps {
  scene: Scene;
  choices: Choice[];
  gameState: GameState;
  onChoice: (c: Choice) => void;
  settings: PlayerSettings;
  onUpdateSettings: <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => void;
  onExit: () => void;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
  scene,
  choices,
  gameState,
  onChoice,
  settings,
  onUpdateSettings,
  onExit
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [trayHeight, setTrayHeight] = useState(0);
  const [committedIndex, setCommittedIndex] = useState<number | null>(null);
  const processingRef = useRef(false);
  const resolvedNarrative = resolveSceneNarrative(scene, gameState);
  const renderScene = resolvedNarrative ? { ...scene, narrative: resolvedNarrative } : scene;
  const chapter = renderScene.chapter ?? gameState.chapter_index;
  const showFx = settings.immersionFx;
  const animateDrift = showFx && !settings.reduceMotion;

  useEffect(() => {
    if (!settings.showStatus && isDrawerOpen) {
      setDrawerOpen(false);
    }
  }, [settings.showStatus, isDrawerOpen]);

  const handleChoice = (choice: Choice, index: number) => {
    if (processingRef.current) return;
    processingRef.current = true;
    setProcessing(true);

    if (!settings.reduceMotion) {
      setCommittedIndex(index);
    }

    const delay = settings.reduceMotion ? 0 : 200;
    window.setTimeout(() => {
      onChoice(choice);
      setProcessing(false);
      processingRef.current = false;
      setCommittedIndex(null);
    }, delay);
  };

  const handleToggleStatus = () => {
    if (!settings.showStatus) return;
    setDrawerOpen((open) => !open);
    setSettingsOpen(false);
  };

  const handleToggleSettings = () => {
    setSettingsOpen((open) => !open);
    setDrawerOpen(false);
  };

  return (
    <div className={`rn-root ${settings.reduceMotion ? 'reduce-motion' : ''}`}>
      <div className="rn-layer rn-bg" />
      {animateDrift && <div className="rn-layer rn-bg rn-bg--drift" />}
      {showFx && <div className="rn-layer rn-noise" />}
      <div className="rn-layer rn-vignette" />

      <div className="rn-content">
        <Topbar chapter={chapter} />

        <div className="rn-main">
          <AnnouncementBanner scene={renderScene} />

          <ReaderCard
            scene={renderScene}
            textSize={settings.textSize}
            driftEnabled={showFx && !settings.reduceMotion && gameState.pressure.memory_drift > 2}
            bottomPadding={trayHeight}
          />

          <ChoiceTray
            choices={choices}
            onChoose={handleChoice}
            isProcessing={isProcessing}
            onHeightChange={setTrayHeight}
            onToggleStatus={handleToggleStatus}
            onToggleSettings={handleToggleSettings}
            showStatusToggle={settings.showStatus}
            committedIndex={committedIndex}
          />
        </div>

        {settings.showStatus && (
          <StatusDrawer
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
            gameState={gameState}
          />
        )}

        <SettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={onUpdateSettings}
          onExit={onExit}
        />

        <StationOverlay scene={scene} reduceMotion={settings.reduceMotion} />
      </div>
    </div>
  );
};
