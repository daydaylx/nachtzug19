import React from 'react';
import { Scene } from '../../../domain/types';

interface AnnouncementBannerProps {
  scene: Scene;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ scene }) => {
  const isAnnouncement = scene.tags?.includes('reveal') || scene.tags?.includes('control');
  
  // Try to find an announcement text. 
  // Convention: If it's an announcement scene, use the first line of narrative if short.
  // Or hardcode a generic one if not found.
  // Since we can't edit content, we do our best.
  
  if (!isAnnouncement) return null;

  const lines = scene.narrative?.split('\n').filter(l => l.trim().length > 0) || [];
  const text = lines.length > 0 && lines[0].length < 100 ? lines[0] : "ACHTUNG: KONTROLLE IM ZUG";

  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/30 py-2 px-4 text-center animate-pulse">
      <span className="text-amber-500 font-mono text-xs md:text-sm tracking-widest uppercase">
        ⚠ {text} ⚠
      </span>
    </div>
  );
};

