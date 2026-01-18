import React, { useEffect, useRef } from 'react';
import { Scene } from '../../../domain/types';
import { TextSize } from '../state/settings';

interface ReaderCardProps {
  scene: Scene;
  textSize: TextSize;
  driftEnabled: boolean;
  reduceMotion: boolean;
  bottomPadding?: number;
}

export const ReaderCard: React.FC<ReaderCardProps> = ({
  scene,
  textSize,
  driftEnabled,
  reduceMotion,
  bottomPadding
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll reset
  useEffect(() => {
    if (containerRef.current) {
      if (typeof containerRef.current.scrollTo === 'function') {
        containerRef.current.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      } else {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [scene.id, reduceMotion]);

  const getTextStyles = () => {
    switch (textSize) {
      case 'S': return { fontSize: '1rem', lineHeight: '1.6' };
      case 'L': return { fontSize: '1.25rem', lineHeight: '1.8' };
      default: return { fontSize: '1.125rem', lineHeight: '1.75' };
    }
  };

  const paragraphs = scene.narrative ? scene.narrative.split('\n\n') : [scene.beschreibung || ""];
  const styles = getTextStyles();
  const paddingBottom = typeof bottomPadding === 'number' ? bottomPadding + 32 : 192;

  return (
    <div className="relative flex-1 min-h-0 w-full md:max-w-3xl md:mx-auto z-10">
      
      {/* Top Fade Gradient for Smooth Scroll feel */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-stone-950 to-transparent z-20 pointer-events-none" />

      <div 
        ref={containerRef}
        className="h-full overflow-y-auto noir-scroll px-6 py-8 md:px-12"
      >
        <div className="max-w-prose mx-auto space-y-6" style={{ paddingBottom }}>
           {/* Title as gentle header */}
           {scene.title && (
             <div className="text-center mb-8 opacity-40 font-mono text-xs uppercase tracking-[0.2em] border-b border-stone-800 pb-2">
               {scene.title}
             </div>
           )}

           {paragraphs.map((p, idx) => {
              const isDrift = driftEnabled && (idx % 4 === 3);
              const isFirst = idx === 0;
              
              return (
                  <p 
                      key={`${scene.id}-${idx}`}
                      style={styles}
                      className={`
                        text-stone-300 font-serif transition-all duration-700
                        ${isDrift ? "animate-drift opacity-90" : "opacity-95"}
                        ${isFirst ? "first-letter:text-5xl first-letter:font-bold first-letter:text-amber-600 first-letter:mr-2 first-letter:float-left first-letter:font-serif" : ""}
                      `}
                  >
                      {p}
                  </p>
              );
           })}
           
           {/* Decoration End Mark */}
           <div className="flex justify-center pt-8 opacity-30">
             <span className="text-xl">❖</span>
           </div>
        </div>
      </div>
      
      {/* Bottom Fade is handled by ChoiceTray gradient, but let's add a small one here too just in case */}
    </div>
  );
};
