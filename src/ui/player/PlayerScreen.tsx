import React, { useRef, useState } from 'react';
import { Scene, Choice, GameState } from '../../domain/types';
import { resolveSceneNarrative } from '../../domain/engine/gameEngine';
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
  const processingRef = useRef(false);
  const resolvedNarrative = resolveSceneNarrative(scene, gameState);
  const renderScene = resolvedNarrative ? { ...scene, narrative: resolvedNarrative } : scene;

  const handleChoice = (c: Choice) => {
    if (processingRef.current) return;
    processingRef.current = true;
    setProcessing(true);
    const delay = settings.reduceMotion ? 0 : 250;
    // Visual delay for "punching" ticket
    setTimeout(() => {
      onChoice(c);
      setProcessing(false);
      processingRef.current = false;
    }, delay);
  };

  return (
    <div className={`relative w-full h-full flex flex-col bg-stone-950 text-stone-200 overflow-hidden ${settings.reduceMotion ? 'reduce-motion' : ''}`}>
      {/* Noise Overlay */}
      {settings.immersionFx && !settings.reduceMotion && <div className="noise-overlay" />}

      <Topbar 
        gameState={gameState} 
        onToggleStatus={() => {
          setDrawerOpen(!isDrawerOpen);
          setSettingsOpen(false);
        }}
        onToggleSettings={() => {
          setSettingsOpen(!isSettingsOpen);
          setDrawerOpen(false);
        }}
        showStatus={settings.showStatus}
      />

      <div className="flex-1 flex flex-col pt-14 relative">
        <AnnouncementBanner scene={renderScene} />
        
        <ReaderCard 
          scene={renderScene} 
          textSize={settings.textSize} 
          driftEnabled={settings.immersionFx && !settings.reduceMotion && gameState.pressure.memory_drift > 2}
          reduceMotion={settings.reduceMotion}
          bottomPadding={trayHeight}
        />

        <ChoiceTray 
          choices={choices} 
          onChoose={handleChoice} 
          isProcessing={isProcessing}
          onHeightChange={setTrayHeight}
        />
      </div>

      <StatusDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        gameState={gameState} 
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        onExit={onExit}
      />

      <StationOverlay scene={scene} />
      
    </div>
  );
};
