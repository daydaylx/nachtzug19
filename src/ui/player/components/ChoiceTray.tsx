import React, { useLayoutEffect, useRef } from 'react';
import { Choice } from '../../../domain/types';

interface ChoiceTrayProps {
  choices: Choice[];
  onChoose: (choice: Choice, index: number) => void;
  isProcessing: boolean;
  onHeightChange?: (height: number) => void;
  onToggleStatus: () => void;
  onToggleSettings: () => void;
  showStatusToggle: boolean;
  committedIndex: number | null;
}

export const ChoiceTray: React.FC<ChoiceTrayProps> = ({
  choices,
  onChoose,
  isProcessing,
  onHeightChange,
  onToggleStatus,
  onToggleSettings,
  showStatusToggle,
  committedIndex
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
    <div className="rn-tray">
      <div className="rn-tray-fade" />
      <div ref={trayRef} className="rn-tray-content">
        <div className="rn-tray-controls">
          {showStatusToggle && (
            <button
              type="button"
              className="rn-control"
              onClick={onToggleStatus}
              aria-label="Status öffnen"
            >
              Status
            </button>
          )}
          <button
            type="button"
            className="rn-control"
            onClick={onToggleSettings}
            aria-label="Einstellungen öffnen"
          >
            Optionen
          </button>
        </div>

        {choices.map((choice, idx) => {
          const label = choice.label || choice.text || 'Weiter';
          const isCommitted = committedIndex === idx;
          const className = [
            'rn-ticket',
            isProcessing ? 'rn-ticket--disabled' : '',
            isCommitted ? 'rn-choice-commit' : ''
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={choice.id || `${idx}`}
              onClick={() => !isProcessing && onChoose(choice, idx)}
              disabled={isProcessing}
              className={className}
            >
              <div className="rn-ticket__row">
                <div className="rn-ticket__meta">Ticket 0{idx + 1}</div>
                <div className="rn-ticket__stamp">19</div>
              </div>
              <div className="rn-ticket__label">{label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
