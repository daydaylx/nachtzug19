import React, { useLayoutEffect, useRef } from 'react';
import { Choice } from '../../../domain/types';

interface ChoiceTrayProps {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
  isProcessing: boolean;
  onHeightChange?: (height: number) => void;
}

export const ChoiceTray: React.FC<ChoiceTrayProps> = ({
  choices,
  onChoose,
  isProcessing,
  onHeightChange
}) => {
  if (choices.length === 0) return null;

  const trayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!onHeightChange) return;
    const node = trayRef.current;
    if (!node) return;

    const update = () => onHeightChange(node.offsetHeight);
    update();

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [choices.length, onHeightChange]);

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none flex flex-col items-center">
      {/* Gradient Fade from Content to Tray */}
      <div className="w-full h-24 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent absolute bottom-0 inset-x-0" />

      <div ref={trayRef} className="w-full max-w-lg px-4 pb-6 space-y-3 pointer-events-auto relative z-10">
        {choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => !isProcessing && onChoose(choice)}
            disabled={isProcessing}
            className={`
              w-full group relative overflow-hidden
              transition-all duration-300 ease-out
              ${isProcessing ? 'opacity-50 scale-95 cursor-not-allowed grayscale' : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/10'}
            `}
          >
            {/* Ticket Background */}
            <div className={`
              absolute inset-0 
              bg-[#e5e0d8] /* Papyrus/Ticket Paper Color */
              border-l-4 border-amber-600
              punch-hole-both
              shadow-lg
            `}>
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] mix-blend-multiply" />
            </div>

            {/* Content Container */}
            <div className="relative py-4 px-8 flex items-center justify-between">
              {/* Label Left */}
              <div className="flex flex-col items-start text-stone-800">
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                  TICKET NO. 00{idx + 1}
                </span>
                <span className="font-serif font-bold text-lg leading-tight tracking-wide group-hover:text-amber-900 transition-colors text-left">
                  {choice.label || choice.text}
                </span>
              </div>

              {/* Punch Mark (Hidden until hover/active logic if we wanted, but let's show an icon) */}
              <div className="text-amber-800/20 group-hover:text-amber-600/60 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>

            {/* Perforation Line Visualization */}
            <div className="absolute right-12 top-0 bottom-0 w-px border-r border-dashed border-stone-400/40" />
            
          </button>
        ))}
      </div>
    </div>
  );
};
