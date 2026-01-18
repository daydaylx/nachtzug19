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

  // Helpers to render segments
  const renderSegments = (count: number, max: number, label: string, colorClass: string) => (
    <div className="mb-4">
      <div className="flex justify-between text-xs uppercase tracking-widest text-stone-500 mb-1">
        <span>{label}</span>
        <span>{count}/{max}</span>
      </div>
      <div className="flex gap-1 h-2">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-all duration-300 ${
              i < count ? colorClass : 'bg-stone-800 border border-stone-700'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-stone-900 border-t border-stone-700 shadow-2xl p-6 pb-8 transform transition-transform duration-300 ease-out max-h-[60vh] overflow-y-auto">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-serif text-amber-500 tracking-wide">STATUS</h2>
        <button onClick={onClose} className="text-stone-500 hover:text-amber-500 text-sm uppercase">
          Schließen [X]
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {/* Tickets */}
        <div>
          <h3 className="text-stone-400 text-xs font-bold uppercase mb-3 border-b border-stone-800 pb-1">Tickets</h3>
          {renderSegments(tickets.tickets_truth, 5, "Wahrheit", "bg-emerald-600 shadow-[0_0_5px_rgba(5,150,105,0.4)]")}
          {renderSegments(tickets.tickets_escape, 5, "Flucht", "bg-sky-600 shadow-[0_0_5px_rgba(2,132,199,0.4)]")}
          {renderSegments(tickets.tickets_guilt, 5, "Schuld", "bg-red-900 shadow-[0_0_5px_rgba(127,29,29,0.4)]")}
          {renderSegments(tickets.tickets_love, 5, "Bindung", "bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.4)]")}
        </div>

        {/* Pressure & Items */}
        <div>
          <h3 className="text-stone-400 text-xs font-bold uppercase mb-3 border-b border-stone-800 pb-1">Zustand</h3>
          {renderSegments(pressure.conductor_attention, 6, "Aufmerksamkeit", "bg-orange-600 animate-pulse")}
          {renderSegments(pressure.memory_drift, 6, "Realitäts-Drift", "bg-purple-600")}

          <div className="mt-6 flex gap-4">
            {items.has_recorder && (
              <div className="flex items-center gap-2 text-stone-300 text-sm bg-stone-800 px-3 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Recorder
              </div>
            )}
            {items.has_tag19 && (
              <div className="flex items-center gap-2 text-stone-300 text-sm bg-stone-800 px-3 py-1 rounded">
                <span className="text-amber-500">🏷️</span>
                Tag 19
              </div>
            )}
            {items.photo_anomaly && (
               <div className="flex items-center gap-2 text-stone-300 text-sm bg-stone-800 px-3 py-1 rounded">
                <span className="text-stone-400">📷</span>
                Foto
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
