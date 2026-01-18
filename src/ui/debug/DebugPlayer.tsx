import { useEffect, useMemo, useState } from 'react';
import { loadNachtzug19Story, StoryBundle } from '../../domain/engine/loadStory';
import { getAvailableChoices, transitionToNextScene, evaluateCondition } from '../../domain/engine/gameEngine';
import { validateContent } from '../../domain/engine/validateContent';
import {
  Choice,
  GameState,
  Scene,
  ValidationResult
} from '../../domain/types';
import { useDebugSession } from './useDebugSession';
import './debug.css';

type DebugPlayerProps = {
  storyBundle?: StoryBundle | null;
  onExit?: () => void;
};

const STORAGE_KEY = 'nachtzug19_debug_session_v1';

function cloneState(state: GameState): GameState {
  return JSON.parse(JSON.stringify(state)) as GameState;
}

function computeStateDelta(prev: GameState, next: GameState): Partial<GameState> {
  const delta: Partial<GameState> = {};

  if (JSON.stringify(prev.stats) !== JSON.stringify(next.stats)) {
    delta.stats = next.stats;
  }
  if (JSON.stringify(prev.tickets) !== JSON.stringify(next.tickets)) {
    delta.tickets = next.tickets;
  }
  if (JSON.stringify(prev.pressure) !== JSON.stringify(next.pressure)) {
    delta.pressure = next.pressure;
  }
  if (JSON.stringify(prev.relations) !== JSON.stringify(next.relations)) {
    delta.relations = next.relations;
  }
  if (JSON.stringify(prev.items) !== JSON.stringify(next.items)) {
    delta.items = next.items;
  }

  if (prev.current_scene_id !== next.current_scene_id) {
    delta.current_scene_id = next.current_scene_id;
  }
  if (prev.chapter_index !== next.chapter_index) {
    delta.chapter_index = next.chapter_index;
  }
  if (prev.station_count !== next.station_count) {
    delta.station_count = next.station_count;
  }
  if (prev.isGameOver !== next.isGameOver) {
    delta.isGameOver = next.isGameOver;
  }
  if (prev.endingId !== next.endingId) {
    delta.endingId = next.endingId;
  }
  if (JSON.stringify(prev.visited_scene_ids) !== JSON.stringify(next.visited_scene_ids)) {
    delta.visited_scene_ids = next.visited_scene_ids;
  }

  return delta;
}

function getSceneTitle(scene: Scene | null): string {
  return scene?.title || scene?.titel || 'Untitled';
}

function getSceneChapter(scene: Scene | null): string | number {
  return scene?.chapter ?? scene?.kapitel ?? 'n/a';
}

function getSceneNarrative(scene: Scene | null): string {
  return scene?.narrative || scene?.beschreibung || '';
}

function getChoiceLabel(choice: Choice): string {
  return choice.label || choice.text || choice.id || 'Choice';
}

function isChoiceAvailable(state: GameState, choice: Choice): boolean {
  if (!choice.condition) return true;
  try {
    if (typeof choice.condition === 'function') {
      const flags: Record<string, boolean | undefined> = {};
      const inventory: string[] = [];
      return choice.condition(state.stats, flags, inventory);
    }
    return evaluateCondition(state, choice.condition);
  } catch (error) {
    console.warn('[DebugPlayer] Condition evaluation failed:', error);
    return false;
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Unknown error';
}

export default function DebugPlayer({ storyBundle, onExit }: DebugPlayerProps) {
  const [bundle, setBundle] = useState<StoryBundle | null>(storyBundle ?? null);
  const [isLoading, setIsLoading] = useState(!storyBundle);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showStatePanel, setShowStatePanel] = useState(false);
  const [showDisabledChoices, setShowDisabledChoices] = useState(false);
  const [jumpTarget, setJumpTarget] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (storyBundle) {
      setBundle(storyBundle);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    loadNachtzug19Story()
      .then((loaded) => {
        if (!isMounted) return;
        setBundle(loaded);
        setLoadError(null);
      })
      .catch((error) => {
        if (!isMounted) return;
        setLoadError(getErrorMessage(error));
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [storyBundle]);

  useEffect(() => {
    if (!bundle) return;
    try {
      const result = validateContent(bundle.startSceneId, bundle.scenes, bundle.endings);
      setValidation(result);
    } catch (error) {
      setValidation({
        valid: false,
        errors: [{ type: 'error', message: getErrorMessage(error) }],
        warnings: []
      });
    }
  }, [bundle]);

  const {
    state,
    setState,
    persistSession,
    setPersistSession,
    restart,
    resetStorage
  } = useDebugSession(bundle, STORAGE_KEY);

  const scenes = bundle?.scenes ?? {};
  const endings = bundle?.endings ?? {};

  const currentScene = state ? scenes[state.current_scene_id] ?? null : null;
  const currentEnding = state?.endingId ? endings[state.endingId] ?? null : null;

  const availableChoices = useMemo(() => {
    if (!state || !currentScene) return [];
    try {
      return getAvailableChoices(state, currentScene);
    } catch (error) {
      console.warn('[DebugPlayer] Failed to resolve available choices:', error);
      return [];
    }
  }, [currentScene, state]);

  const visibleChoices = useMemo(() => {
    if (!state || !currentScene) return [];
    if (!showDisabledChoices) return availableChoices;
    return currentScene.choices;
  }, [availableChoices, currentScene, showDisabledChoices, state]);

  const sceneIds = useMemo(() => Object.keys(scenes).sort(), [scenes]);

  const narrativeParagraphs = useMemo(() => {
    if (!currentScene) return [];
    const raw = getSceneNarrative(currentScene);
    if (!raw) return [];
    return raw
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [currentScene]);

  const endingParagraphs = useMemo(() => {
    if (!currentEnding) return [];
    const raw = currentEnding.narrative || currentEnding.beschreibung || '';
    if (!raw) return [];
    return raw
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [currentEnding]);

  useEffect(() => {
    if (!actionMessage) return;
    const timer = window.setTimeout(() => setActionMessage(null), 2000);
    return () => window.clearTimeout(timer);
  }, [actionMessage]);

  const handleRestart = () => {
    restart();
    setActionError(null);
    setActionMessage('Restarted');
  };

  const handleChoice = (choice: Choice) => {
    if (!state || !currentScene || isTransitioning) return;
    if (state.isGameOver) return;

    setIsTransitioning(true);
    setActionError(null);

    try {
      const prevState = cloneState(state);
      const nextState = cloneState(state);

      transitionToNextScene(nextState, currentScene, choice, scenes);

      const delta = computeStateDelta(prevState, nextState);
      const lastEntry = nextState.history[nextState.history.length - 1];
      if (lastEntry) {
        lastEntry.state_delta = delta;
      }

      setState(nextState);
    } catch (error) {
      setActionError(getErrorMessage(error));
    } finally {
      setIsTransitioning(false);
    }
  };

  const handleJump = () => {
    if (!state || !jumpTarget) return;
    const targetId = jumpTarget.trim();
    if (!targetId) return;
    if (!scenes[targetId]) {
      setActionError(`Scene not found: ${targetId}`);
      return;
    }

    const prevState = cloneState(state);
    const nextState = cloneState(state);
    const fromSceneId = nextState.current_scene_id;

    nextState.current_scene_id = targetId;
    if (!nextState.visited_scene_ids.includes(targetId)) {
      nextState.visited_scene_ids.push(targetId);
    }

    const targetScene = scenes[targetId];
    if (targetScene?.chapter !== undefined) {
      nextState.chapter_index = targetScene.chapter;
    }

    nextState.isGameOver = false;
    nextState.endingId = undefined;

    nextState.history.push({
      scene_id: fromSceneId,
      choice_id: 'debug_jump',
      timestamp: Date.now()
    });

    const delta = computeStateDelta(prevState, nextState);
    const lastEntry = nextState.history[nextState.history.length - 1];
    if (lastEntry) {
      lastEntry.state_delta = delta;
    }

    setState(nextState);
    setActionError(null);
    setActionMessage(`Jumped to ${targetId}`);
  };

  const copyToClipboard = async (payload: unknown, label: string) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setActionMessage(`${label} copied`);
    } catch (error) {
      setActionError(`Copy failed: ${getErrorMessage(error)}`);
    }
  };

  const handleClearStorage = () => {
    resetStorage();
    setPersistSession(false);
    setActionMessage('Storage cleared');
  };

  if (isLoading) {
    return (
      <div className="debug-player">
        <div className="debug-loading">Loading debug player...</div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="debug-player">
        <div className="debug-error">Failed to load story: {loadError}</div>
      </div>
    );
  }

  if (!bundle || !state) {
    return (
      <div className="debug-player">
        <div className="debug-error">Story bundle not available.</div>
      </div>
    );
  }

  const showChoices = !state.isGameOver && currentScene;

  return (
    <div className="debug-player">
      <header className="debug-header">
        <div>
          <div className="debug-title">NACHTZUG 19 - Debug Player</div>
          <div className="debug-subtitle">
            Scene: {currentScene?.id || state.current_scene_id} | Chapter: {getSceneChapter(currentScene)} | Tags:{' '}
            {currentScene?.tags?.length ? currentScene.tags.join(', ') : 'none'}
          </div>
        </div>
        <div className="debug-header-actions">
          {onExit && (
            <button className="debug-button" onClick={onExit} disabled={isTransitioning}>
              Exit Debug
            </button>
          )}
          <button className="debug-button" onClick={handleRestart} disabled={isTransitioning}>
            Restart
          </button>
        </div>
      </header>

      <div className="debug-body">
        <section className="debug-main">
          <div className="debug-section">
            <div className="debug-section-title">Scene</div>
            <div className="debug-meta">
              <div><span className="debug-label">ID</span> {currentScene?.id || 'Unknown'}</div>
              <div><span className="debug-label">Title</span> {getSceneTitle(currentScene)}</div>
              <div><span className="debug-label">Chapter</span> {getSceneChapter(currentScene)}</div>
            </div>
          </div>

          {actionMessage && <div className="debug-message">{actionMessage}</div>}
          {actionError && <div className="debug-error">{actionError}</div>}

          {state.isGameOver ? (
            <div className="debug-section">
              <div className="debug-section-title">Ending</div>
              <div className="debug-ending">
                <div className="debug-ending-title">
                  {currentEnding?.title || currentEnding?.titel || `ENDING: ${state.endingId}`}
                </div>
                <div className="debug-ending-text">
                  {endingParagraphs.length > 0 ? (
                    endingParagraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                  ) : (
                    <div className="debug-muted">No ending text.</div>
                  )}
                </div>
                <button className="debug-button" onClick={handleRestart}>
                  Restart
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="debug-section">
                <div className="debug-section-title">Narrative</div>
                <div className="debug-narrative">
                  {narrativeParagraphs.length > 0 ? (
                    narrativeParagraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                  ) : (
                    <div className="debug-muted">No narrative text.</div>
                  )}
                </div>
              </div>

              <div className="debug-section">
                <div className="debug-section-title">Choices</div>
                <label className="debug-toggle">
                  <input
                    type="checkbox"
                    checked={showDisabledChoices}
                    onChange={(event) => setShowDisabledChoices(event.target.checked)}
                    disabled={isTransitioning}
                  />
                  <span>Show disabled choices</span>
                </label>
                <div className="debug-choices">
                  {showChoices && visibleChoices.map((choice, idx) => {
                    const available = state ? isChoiceAvailable(state, choice) : false;
                    const label = getChoiceLabel(choice);
                    return (
                      <button
                        key={`${choice.id || choice.text || idx}`}
                        className={`debug-choice ${available ? '' : 'is-disabled'}`}
                        onClick={() => handleChoice(choice)}
                        disabled={!available || isTransitioning}
                      >
                        <div className="debug-choice-label">{label}</div>
                        <div className="debug-choice-meta">
                          {choice.id && <span>ID: {choice.id}</span>}
                          {choice.next && <span>Next: {choice.next}</span>}
                          {choice.ending && <span>Ending: {choice.ending}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {!showChoices && (
                  <div className="debug-muted">No choices available.</div>
                )}
              </div>
            </>
          )}
        </section>

        <aside className="debug-panel">
          <div className="debug-panel-section">
            <div className="debug-panel-title">State Panel</div>
            <label className="debug-toggle">
              <input
                type="checkbox"
                checked={showStatePanel}
                onChange={(event) => setShowStatePanel(event.target.checked)}
              />
              <span>Show state</span>
            </label>
            {showStatePanel && (
              <>
                <div className="debug-state-list">
                  <div><span className="debug-label">memory_drift</span> {state.pressure.memory_drift}</div>
                  <div><span className="debug-label">conductor_attention</span> {state.pressure.conductor_attention}</div>
                  <div><span className="debug-label">tickets_truth</span> {state.tickets.tickets_truth}</div>
                  <div><span className="debug-label">tickets_escape</span> {state.tickets.tickets_escape}</div>
                  <div><span className="debug-label">tickets_guilt</span> {state.tickets.tickets_guilt}</div>
                  <div><span className="debug-label">tickets_love</span> {state.tickets.tickets_love}</div>
                  <div><span className="debug-label">rel_comp7</span> {state.relations.rel_comp7}</div>
                  <div><span className="debug-label">rel_boy</span> {state.relations.rel_boy}</div>
                  <div><span className="debug-label">rel_sleepless</span> {state.relations.rel_sleepless}</div>
                  <div><span className="debug-label">has_recorder</span> {String(state.items.has_recorder)}</div>
                  <div><span className="debug-label">has_tag19</span> {String(state.items.has_tag19)}</div>
                </div>
                <button
                  className="debug-button"
                  onClick={() => copyToClipboard(state, 'State JSON')}
                >
                  Copy State JSON
                </button>
                <pre className="debug-json">{JSON.stringify(state, null, 2)}</pre>
              </>
            )}
          </div>

          <div className="debug-panel-section">
            <div className="debug-panel-title">Scene Jump</div>
            <input
              className="debug-input"
              list="scene-ids"
              value={jumpTarget}
              onChange={(event) => setJumpTarget(event.target.value)}
              placeholder="Scene id"
            />
            <datalist id="scene-ids">
              {sceneIds.map((id) => (
                <option key={id} value={id} />
              ))}
            </datalist>
            <button className="debug-button" onClick={handleJump} disabled={isTransitioning}>
              Jump
            </button>
          </div>

          <div className="debug-panel-section">
            <div className="debug-panel-title">History</div>
            <div className="debug-history">
              {state.history.length === 0 && <div className="debug-muted">No history yet.</div>}
              {state.history.slice(-10).map((entry, idx) => (
                <div key={`${entry.timestamp}-${idx}`} className="debug-history-entry">
                  <div>{entry.scene_id} {'->'} {entry.choice_id}</div>
                  {entry.state_delta && (
                    <div className="debug-history-delta">
                      {JSON.stringify(entry.state_delta)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="debug-panel-section">
            <div className="debug-panel-title">Validation</div>
            {!validation && <div className="debug-muted">No validation data.</div>}
            {validation && (
              <>
                <div className={`debug-validation ${validation.valid ? 'is-ok' : 'is-error'}`}>
                  {validation.valid ? 'Content valid' : 'Content errors detected'}
                </div>
                {validation.errors.length > 0 && (
                  <ul className="debug-list">
                    {validation.errors.map((error, idx) => (
                      <li key={`err-${idx}`}>
                        {error.scene_id ? `${error.scene_id}: ` : ''}{error.message}
                      </li>
                    ))}
                  </ul>
                )}
                {validation.warnings.length > 0 && (
                  <ul className="debug-list">
                    {validation.warnings.map((warn, idx) => (
                      <li key={`warn-${idx}`}>
                        {warn.scene_id ? `${warn.scene_id}: ` : ''}{warn.message}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          <div className="debug-panel-section">
            <div className="debug-panel-title">Session</div>
            <label className="debug-toggle">
              <input
                type="checkbox"
                checked={persistSession}
                onChange={(event) => setPersistSession(event.target.checked)}
              />
              <span>Persist session</span>
            </label>
            <button
              className="debug-button"
              onClick={handleClearStorage}
            >
              Clear storage
            </button>
            <button
              className="debug-button"
              onClick={() => copyToClipboard({ state, history: state.history }, 'Debug report')}
            >
              Copy debug report
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
