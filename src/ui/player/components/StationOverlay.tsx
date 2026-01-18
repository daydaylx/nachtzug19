import React, { useEffect, useState } from 'react';
import { Scene } from '../../../domain/types';

interface StationOverlayProps {
  scene: Scene;
  reduceMotion?: boolean;
}

export const StationOverlay: React.FC<StationOverlayProps> = ({ scene, reduceMotion }) => {
  const isStation = scene.tags?.includes('station_end');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isStation) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(timer);
  }, [scene.id, isStation]);

  if (!visible) return null;

  const title = scene.title || scene.titel || 'Station';
  const overlayClass = reduceMotion ? 'rn-station-overlay' : 'rn-station-overlay rn-station-overlay--animate';

  return (
    <div className={overlayClass}>
      <div className="rn-station-board">Station: {title}</div>
    </div>
  );
};
