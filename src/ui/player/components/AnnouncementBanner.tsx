import React from 'react';
import { Scene } from '../../../domain/types';

interface AnnouncementBannerProps {
  scene: Scene;
}

const getFirstSentence = (text: string): string => {
  const firstParagraph = text.split('\n\n')[0]?.trim() || '';
  if (!firstParagraph) return '';
  const sentenceEnd = firstParagraph.search(/[.!?](\s|$)/);
  if (sentenceEnd === -1) return firstParagraph;
  return firstParagraph.slice(0, sentenceEnd + 1);
};

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ scene }) => {
  const isAnnouncement = scene.tags?.includes('announcement');

  if (!isAnnouncement) return null;

  const narrative = scene.narrative || scene.beschreibung || '';
  const text = getFirstSentence(narrative);
  if (!text) return null;

  return (
    <div className="rn-announcement">
      {text}
    </div>
  );
};
