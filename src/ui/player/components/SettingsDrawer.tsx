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
    <div className="rn-drawer" role="dialog" aria-modal="true">
      <div className="rn-drawer-scrim" onClick={onClose} />
      <div className="rn-drawer-panel rn-drawer-panel--settings">
        <div className="flex items-center justify-between">
          <div className="rn-drawer-title">Einstellungen</div>
          <button type="button" className="rn-drawer-close" onClick={onClose}>
            Schliessen
          </button>
        </div>

        <div className="rn-settings-group">
          <div>
            <div className="rn-stamp-label">Textgroesse</div>
            <div className="flex gap-2 mt-2">
              {TEXT_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onUpdateSettings('textSize', size)}
                  aria-pressed={settings.textSize === size}
                  className={settings.textSize === size ? 'rn-toggle is-active' : 'rn-toggle'}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="rn-settings-row">
            <div className="rn-stamp-label">Reduce Motion</div>
            <button
              type="button"
              onClick={() => onUpdateSettings('reduceMotion', !settings.reduceMotion)}
              aria-pressed={settings.reduceMotion}
              className={settings.reduceMotion ? 'rn-toggle is-active' : 'rn-toggle'}
            >
              {settings.reduceMotion ? 'An' : 'Aus'}
            </button>
          </div>

          <div className="rn-settings-row">
            <div className="rn-stamp-label">Immersion FX</div>
            <button
              type="button"
              onClick={() => onUpdateSettings('immersionFx', !settings.immersionFx)}
              aria-pressed={settings.immersionFx}
              className={settings.immersionFx ? 'rn-toggle is-active' : 'rn-toggle'}
            >
              {settings.immersionFx ? 'An' : 'Aus'}
            </button>
          </div>

          <div className="rn-settings-row">
            <div className="rn-stamp-label">Statusanzeige</div>
            <button
              type="button"
              onClick={() => onUpdateSettings('showStatus', !settings.showStatus)}
              aria-pressed={settings.showStatus}
              className={settings.showStatus ? 'rn-toggle is-active' : 'rn-toggle'}
            >
              {settings.showStatus ? 'An' : 'Aus'}
            </button>
          </div>
        </div>

        <div className="rn-settings-group">
          <button type="button" className="rn-secondary-action" onClick={onExit}>
            Zurueck zum Launcher
          </button>
        </div>
      </div>
    </div>
  );
};
