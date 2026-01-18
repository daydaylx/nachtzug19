import React, { useEffect, useState } from 'react';
import { Scene } from '../../../domain/types';

interface StationOverlayProps {
  scene: Scene;
}

export const StationOverlay: React.FC<StationOverlayProps> = ({ scene }) => {
  const isStation = scene.tags?.includes('station_end');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStation) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000); // 3s display
      return () => clearTimeout(timer);
    }
  }, [scene.id, isStation]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 text-stone-100 transition-opacity duration-500">
      <div className="text-stone-500 uppercase tracking-[0.3em] text-sm mb-4">Halt in</div>
      <h1 className="text-4xl md:text-6xl font-serif text-stone-100 tracking-widest border-y-2 border-stone-800 py-4 px-8">
        {scene.title?.toUpperCase() || "STATION"}
      </h1>
      <div className="mt-8 animate-pulse text-amber-500 text-xs font-mono">
        BITTE NICHT AUSSTEIGEN
      </div>
    </div>
  );
};
