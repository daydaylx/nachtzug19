import React from 'react';
import { PlayerSettings, TextSize } from '../state/settings';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PlayerSettings;
  onUpdateSettings: <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => void;
  onExit: () => void;
}

const TEXT_SIZES: TextSize[] = ['S', 'M', 'L'];

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onExit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-stone-900 border-t border-stone-700 shadow-2xl p-6 pb-8 max-h-[70vh] overflow-y-auto"
      >
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-serif text-amber-500 tracking-wide">Einstellungen</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-amber-500 text-sm uppercase">
            Schließen [X]
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">Textgröße</div>
            <div className="flex gap-2">
              {TEXT_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => onUpdateSettings('textSize', size)}
                  aria-pressed={settings.textSize === size}
                  className={`px-3 py-2 text-xs font-mono tracking-widest border ${
                    settings.textSize === size
                      ? 'bg-amber-600/80 text-stone-950 border-amber-500'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-700/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-stone-300">Reduce Motion</div>
              <button
                onClick={() => onUpdateSettings('reduceMotion', !settings.reduceMotion)}
                aria-pressed={settings.reduceMotion}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border ${
                  settings.reduceMotion
                    ? 'bg-amber-600/80 text-stone-950 border-amber-500'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-700/50'
                }`}
              >
                {settings.reduceMotion ? 'AN' : 'AUS'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-stone-300">Immersion FX</div>
              <button
                onClick={() => onUpdateSettings('immersionFx', !settings.immersionFx)}
                aria-pressed={settings.immersionFx}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border ${
                  settings.immersionFx
                    ? 'bg-amber-600/80 text-stone-950 border-amber-500'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-700/50'
                }`}
              >
                {settings.immersionFx ? 'AN' : 'AUS'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-stone-300">Statusanzeige</div>
              <button
                onClick={() => onUpdateSettings('showStatus', !settings.showStatus)}
                aria-pressed={settings.showStatus}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border ${
                  settings.showStatus
                    ? 'bg-amber-600/80 text-stone-950 border-amber-500'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-700/50'
                }`}
              >
                {settings.showStatus ? 'AN' : 'AUS'}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800">
            <button
              onClick={onExit}
              className="w-full px-4 py-3 text-xs font-mono uppercase tracking-widest border border-stone-700 text-stone-300 hover:text-amber-400 hover:border-amber-700/60 transition-colors"
            >
              Zurück zum Launcher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
