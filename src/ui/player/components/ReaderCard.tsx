import React, { useEffect, useRef } from 'react';
import { Scene } from '../../../domain/types';
import { TextSize } from '../state/settings';

interface ReaderCardProps {
  scene: Scene;
  textSize: TextSize;
  driftEnabled: boolean;
  bottomPadding?: number;
}

export const ReaderCard: React.FC<ReaderCardProps> = ({
  scene,
  textSize,
  driftEnabled,
  bottomPadding
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof containerRef.current.scrollTo === 'function') {
      containerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      containerRef.current.scrollTop = 0;
    }
  }, [scene.id]);

  const getTextStyles = () => {
    switch (textSize) {
      case 'S':
        return { fontSize: '1rem', lineHeight: '1.6' };
      case 'L':
        return { fontSize: '1.25rem', lineHeight: '1.8' };
      default:
        return { fontSize: '1.125rem', lineHeight: '1.75' };
    }
  };

  const paragraphs = scene.narrative
    ? scene.narrative.split(/\n\s*\n/)
    : [scene.beschreibung || ''];
  const styles = getTextStyles();
  const paddingBottom = typeof bottomPadding === 'number' ? bottomPadding + 32 : 192;
  const cardClass = driftEnabled ? 'rn-reader-card rn-reader-card--drift' : 'rn-reader-card';

  return (
    <div className="rn-reader-shell">
      <div className={cardClass}>
        <div ref={containerRef} className="rn-reader-scroll rn-scroll">
          <div className="rn-narrative" style={{ paddingBottom }}>
            {(scene.title || scene.titel) && (
              <div className="rn-reader-title">{scene.title || scene.titel}</div>
            )}
            {paragraphs.map((paragraph, idx) => (
              <p key={`${scene.id}-${idx}`} style={styles}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
