import React from 'react';
import { GameState } from '../../../domain/types';

interface StatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
}

export const StatusDrawer: React.FC<StatusDrawerProps> = ({ isOpen, onClose, gameState }) => {
  if (!isOpen) return null;

  const { tickets, pressure, items } = gameState;

  const renderStamp = (label: string, count: number, max: number, color: string) => (
    <div className="rn-stamp" style={{ '--stamp-color': color } as React.CSSProperties}>
      <div className="rn-stamp-label">{label}</div>
      <div className="rn-stamp-meter">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < count ? 'is-active' : ''} />
        ))}
      </div>
    </div>
  );

  const renderMeter = (label: string, count: number, max: number, color: string) => (
    <div className="rn-meter" style={{ '--meter-color': color } as React.CSSProperties}>
      <div className="rn-meter-header">
        <span>{label}</span>
        <span>{count}/{max}</span>
      </div>
      <div className="rn-meter-bars">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < count ? 'is-active' : ''} />
        ))}
      </div>
    </div>
  );

  const hasItems = items.has_recorder || items.has_tag19 || items.photo_anomaly;

  return (
    <div className="rn-drawer" role="dialog" aria-modal="true">
      <div className="rn-drawer-scrim" onClick={onClose} />
      <div className="rn-drawer-panel rn-drawer-panel--status">
        <div className="flex items-center justify-between">
          <div className="rn-drawer-title">Status</div>
          <button type="button" className="rn-drawer-close" onClick={onClose}>
            Schliessen
          </button>
        </div>

        <div className="rn-status-grid">
          {renderStamp('Truth', tickets.tickets_truth, 5, '#4fb3a2')}
          {renderStamp('Escape', tickets.tickets_escape, 5, '#5c7ecb')}
          {renderStamp('Guilt', tickets.tickets_guilt, 5, '#b35245')}
          {renderStamp('Love', tickets.tickets_love, 5, '#c96e87')}

          {renderMeter('Attention', pressure.conductor_attention, 6, '#c8843c')}
          {renderMeter('Drift', pressure.memory_drift, 6, '#6c7aa7')}

          <div className="rn-stamp">
            <div className="rn-stamp-label">Items</div>
            <div className="rn-items">
              {items.has_recorder && <div className="rn-item">Recorder</div>}
              {items.has_tag19 && <div className="rn-item">Tag19</div>}
              {items.photo_anomaly && <div className="rn-item">Foto</div>}
              {!hasItems && <div className="rn-item rn-item--empty">Keine</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
