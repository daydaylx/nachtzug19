// ============================================================================
// NACHTZUG 19 - Game Engine
// ============================================================================
// Deterministische Story-Engine mit:
// - applyEffects: Wendet Effect-Arrays auf den State an
// - evaluateCondition: Prüft Conditions (AND/OR/Compare/Bool)
// - transitionToNextScene: Navigiert im Story-Graph
// - Canon Rules: Drift nach station_end, Kontrollen in Kap. 2/3/5
// ============================================================================

import {
  GameState,
  Choice,
  Scene,
  Ending,
  Effect,
  Condition,
  SimpleCondition,
  BooleanCondition,
  AndCondition,
  OrCondition,
  EffectTarget,
  createInitialState,
  ScenesCollection,
  EndingsCollection
} from '../types';

// ============================================================================
// Helper: Get State Value by Target
// ============================================================================

function getStateValue(state: GameState, target: EffectTarget): number | boolean {
  // Legacy Stats
  if (target === 'mut') return state.stats.mut;
  if (target === 'wissen') return state.stats.wissen;
  if (target === 'empathie') return state.stats.empathie;

  // Tickets
  if (target === 'tickets_truth') return state.tickets.tickets_truth;
  if (target === 'tickets_escape') return state.tickets.tickets_escape;
  if (target === 'tickets_guilt') return state.tickets.tickets_guilt;
  if (target === 'tickets_love') return state.tickets.tickets_love;

  // Pressure
  if (target === 'conductor_attention') return state.pressure.conductor_attention;
  if (target === 'memory_drift') return state.pressure.memory_drift;

  // Relations
  if (target === 'rel_comp7') return state.relations.rel_comp7;
  if (target === 'rel_boy') return state.relations.rel_boy;
  if (target === 'rel_sleepless') return state.relations.rel_sleepless;

  // Items
  if (target === 'has_recorder') return state.items.has_recorder;
  if (target === 'has_tag19') return state.items.has_tag19;
  if (target === 'photo_anomaly') return state.items.photo_anomaly;

  // Meta
  if (target === 'chapter_index') return state.chapter_index;
  if (target === 'station_count') return state.station_count;

  throw new Error(`Unknown target: ${target}`);
}

// ============================================================================
// Helper: Set State Value by Target
// ============================================================================

function setStateValue(state: GameState, target: EffectTarget, value: number | boolean): void {
  // Legacy Stats
  if (target === 'mut') { state.stats.mut = value as number; return; }
  if (target === 'wissen') { state.stats.wissen = value as number; return; }
  if (target === 'empathie') { state.stats.empathie = value as number; return; }

  // Tickets
  if (target === 'tickets_truth') { state.tickets.tickets_truth = value as number; return; }
  if (target === 'tickets_escape') { state.tickets.tickets_escape = value as number; return; }
  if (target === 'tickets_guilt') { state.tickets.tickets_guilt = value as number; return; }
  if (target === 'tickets_love') { state.tickets.tickets_love = value as number; return; }

  // Pressure
  if (target === 'conductor_attention') { state.pressure.conductor_attention = value as number; return; }
  if (target === 'memory_drift') { state.pressure.memory_drift = value as number; return; }

  // Relations
  if (target === 'rel_comp7') { state.relations.rel_comp7 = value as number; return; }
  if (target === 'rel_boy') { state.relations.rel_boy = value as number; return; }
  if (target === 'rel_sleepless') { state.relations.rel_sleepless = value as number; return; }

  // Items
  if (target === 'has_recorder') { state.items.has_recorder = value as boolean; return; }
  if (target === 'has_tag19') { state.items.has_tag19 = value as boolean; return; }
  if (target === 'photo_anomaly') { state.items.photo_anomaly = value as boolean; return; }

  // Meta
  if (target === 'chapter_index') { state.chapter_index = value as number; return; }
  if (target === 'station_count') { state.station_count = value as number; return; }

  throw new Error(`Unknown target: ${target}`);
}

// ============================================================================
// Core: Apply Effects
// ============================================================================

/**
 * Wendet ein Array von Effects auf den GameState an.
 * Unterstützt: inc, dec, set, clamp
 */
export function applyEffects(state: GameState, effects: Effect[]): void {
  for (const effect of effects) {
    const currentValue = getStateValue(state, effect.target);

    let newValue: number | boolean;

    switch (effect.type) {
      case 'inc':
        if (typeof currentValue !== 'number') {
          throw new Error(`Cannot increment non-numeric target: ${effect.target}`);
        }
        newValue = currentValue + (effect.value as number);
        break;

      case 'dec':
        if (typeof currentValue !== 'number') {
          throw new Error(`Cannot decrement non-numeric target: ${effect.target}`);
        }
        newValue = currentValue - (effect.value as number);
        break;

      case 'set':
        newValue = effect.value;
        break;

      case 'clamp':
        if (typeof currentValue !== 'number') {
          throw new Error(`Cannot clamp non-numeric target: ${effect.target}`);
        }
        newValue = currentValue;
        if (effect.clamp_min !== undefined && newValue < effect.clamp_min) {
          newValue = effect.clamp_min;
        }
        if (effect.clamp_max !== undefined && newValue > effect.clamp_max) {
          newValue = effect.clamp_max;
        }
        break;

      default:
        throw new Error(`Unknown effect type: ${(effect as any).type}`);
    }

    setStateValue(state, effect.target, newValue);

    // Optional: Log-Eintrag
    if (effect.note) {
      console.log(`[Effect] ${effect.note}: ${effect.target} = ${newValue}`);
    }
  }

  // Auto-Clamp: Sicherstellen, dass Werte in erlaubten Ranges bleiben
  autoClamp(state);
}

/**
 * Automatisches Clamping für alle State-Variablen
 */
function autoClamp(state: GameState): void {
  // Legacy Stats (0-10)
  state.stats.mut = Math.max(0, Math.min(10, state.stats.mut));
  state.stats.wissen = Math.max(0, Math.min(10, state.stats.wissen));
  state.stats.empathie = Math.max(0, Math.min(10, state.stats.empathie));

  // Tickets (0-5)
  state.tickets.tickets_truth = Math.max(0, Math.min(5, state.tickets.tickets_truth));
  state.tickets.tickets_escape = Math.max(0, Math.min(5, state.tickets.tickets_escape));
  state.tickets.tickets_guilt = Math.max(0, Math.min(5, state.tickets.tickets_guilt));
  state.tickets.tickets_love = Math.max(0, Math.min(5, state.tickets.tickets_love));

  // Pressure (0-6)
  state.pressure.conductor_attention = Math.max(0, Math.min(6, state.pressure.conductor_attention));
  state.pressure.memory_drift = Math.max(0, Math.min(6, state.pressure.memory_drift));

  // Relations (-2 bis +4)
  state.relations.rel_comp7 = Math.max(-2, Math.min(4, state.relations.rel_comp7));
  state.relations.rel_boy = Math.max(-2, Math.min(3, state.relations.rel_boy));
  state.relations.rel_sleepless = Math.max(-2, Math.min(3, state.relations.rel_sleepless));
}

// ============================================================================
// Core: Evaluate Condition
// ============================================================================

/**
 * Prüft eine Condition gegen den aktuellen GameState.
 * Unterstützt: compare, bool, and, or
 */
export function evaluateCondition(state: GameState, condition: Condition): boolean {
  switch (condition.type) {
    case 'compare':
      return evaluateSimpleCondition(state, condition);

    case 'bool':
      return evaluateBooleanCondition(state, condition);

    case 'and':
      return evaluateAndCondition(state, condition);

    case 'or':
      return evaluateOrCondition(state, condition);

    default:
      throw new Error(`Unknown condition type: ${(condition as any).type}`);
  }
}

function evaluateSimpleCondition(state: GameState, condition: SimpleCondition): boolean {
  const currentValue = getStateValue(state, condition.target);
  const targetValue = condition.value;

  switch (condition.operator) {
    case '==':
      return currentValue === targetValue;
    case '!=':
      return currentValue !== targetValue;
    case '>':
      return (currentValue as number) > (targetValue as number);
    case '<':
      return (currentValue as number) < (targetValue as number);
    case '>=':
      return (currentValue as number) >= (targetValue as number);
    case '<=':
      return (currentValue as number) <= (targetValue as number);
    default:
      throw new Error(`Unknown operator: ${condition.operator}`);
  }
}

function evaluateBooleanCondition(state: GameState, condition: BooleanCondition): boolean {
  const currentValue = getStateValue(state, condition.target);
  return currentValue === condition.value;
}

function evaluateAndCondition(state: GameState, condition: AndCondition): boolean {
  return condition.conditions.every(c => evaluateCondition(state, c));
}

function evaluateOrCondition(state: GameState, condition: OrCondition): boolean {
  return condition.conditions.some(c => evaluateCondition(state, c));
}

// ============================================================================
// Core: Get Available Choices
// ============================================================================

/**
 * Filtert Choices basierend auf ihren Conditions.
 * Nur Choices ohne Condition oder mit erfüllter Condition werden zurückgegeben.
 */
export function getAvailableChoices(state: GameState, scene: Scene): Choice[] {
  return scene.choices.filter(choice => {
    if (!choice.condition) return true;

    // Legacy: Condition als Funktion
    if (typeof choice.condition === 'function') {
      // Legacy-Funktion aufrufen
      const flags: Record<string, boolean | undefined> = {};
      const inventory: string[] = [];
      return choice.condition(state.stats, flags, inventory);
    }

    // Neue Conditions
    return evaluateCondition(state, choice.condition);
  });
}

// ============================================================================
// Core: Resolve Scene Narrative (Drift-Mechanik)
// ============================================================================

/**
 * Wählt die passende Narrative für eine Szene basierend auf memory_drift.
 *
 * Logik:
 * - Wenn keine narrative_variants vorhanden: Basis-Narrative zurückgeben
 * - Sortiere Varianten nach min_drift (absteigend)
 * - Wähle erste Variante, wo state.memory_drift >= min_drift
 * - Fallback: Basis-Narrative
 *
 * @param scene - Die Szene mit optionalen Drift-Varianten
 * @param state - Der aktuelle GameState (für memory_drift)
 * @returns Die passende Narrative als String
 */
export function resolveSceneNarrative(scene: Scene, state: GameState): string {
  // Fallback: Keine Narrative vorhanden
  if (!scene.narrative && !scene.beschreibung) {
    return '';
  }

  // Basis-Narrative (ohne Drift-Varianten)
  const baseNarrative = scene.narrative || scene.beschreibung || '';

  // Keine Varianten vorhanden -> Basis zurückgeben
  if (!scene.narrative_variants || scene.narrative_variants.length === 0) {
    return baseNarrative;
  }

  // Aktueller memory_drift Wert
  const currentDrift = state.pressure.memory_drift;

  // Sortiere Varianten nach min_drift (absteigend), um höchste passende Variante zu finden
  const sortedVariants = [...scene.narrative_variants]
    .sort((a, b) => b.min_drift - a.min_drift);

  // Finde erste Variante, die erfüllt ist (memory_drift >= min_drift)
  const matchingVariant = sortedVariants.find(
    variant => currentDrift >= variant.min_drift
  );

  // Wenn passende Variante gefunden: verwende diese
  if (matchingVariant) {
    // Für jetzt: Nur "full" Replacement (replace_mode "overlay" wird später implementiert)
    const mode = matchingVariant.replace_mode || 'full';
    if (mode === 'full') {
      return matchingVariant.narrative;
    }
    // 'overlay' mode: Kombiniere Basis + Variante (für jetzt: nur Variante)
    return matchingVariant.narrative;
  }

  // Kein Match: Basis-Narrative zurückgeben
  return baseNarrative;
}

// ============================================================================
// Core: Transition to Next Scene
// ============================================================================

/**
 * Führt eine Transition zu einer neuen Szene durch.
 * Wendet Choice-Effects an, prüft Canon Rules (station_end -> drift),
 * und aktualisiert den State.
 */
export function transitionToNextScene(
  state: GameState,
  currentScene: Scene,
  choice: Choice,
  scenes: ScenesCollection
): void {
  // 1. Wende Choice-Effects an
  if (choice.effects && choice.effects.length > 0) {
    applyEffects(state, choice.effects);
  }

  // 2. Prüfe, ob aktuelle Szene station_end ist (R1: Drift nach Station)
  if (currentScene.tags?.includes('station_end')) {
    // Erhöhe memory_drift automatisch
    state.pressure.memory_drift += 1;
    state.station_count += 1;
    console.log(`[Canon Rule R1] Station-Ende erkannt: memory_drift +1, station_count=${state.station_count}`);
  }

  // 3. Wende Exit-Effects der aktuellen Szene an
  if (currentScene.exit_effects && currentScene.exit_effects.length > 0) {
    applyEffects(state, currentScene.exit_effects);
  }

  // 4. History aktualisieren
  state.history.push({
    scene_id: state.current_scene_id,
    choice_id: choice.id || choice.text || 'unknown',
    timestamp: Date.now()
  });

  // 5. Transition
  if (choice.ending) {
    // Spielende
    state.isGameOver = true;
    state.endingId = choice.ending;
    console.log(`[Transition] Game Over: Ending ${choice.ending}`);
  } else if (choice.next) {
    // Nächste Szene
    const nextScene = scenes[choice.next];
    if (!nextScene) {
      throw new Error(`Scene not found: ${choice.next}`);
    }

    // Visited Scenes aktualisieren
    if (!state.visited_scene_ids.includes(choice.next)) {
      state.visited_scene_ids.push(choice.next);
    }

    state.current_scene_id = choice.next;

    // 6. Wende Entry-Effects der neuen Szene an
    if (nextScene.entry_effects && nextScene.entry_effects.length > 0) {
      applyEffects(state, nextScene.entry_effects);
    }

    // 7. Prüfe chapter_index
    if (nextScene.chapter !== undefined && nextScene.chapter !== state.chapter_index) {
      state.chapter_index = nextScene.chapter;
      console.log(`[Transition] Neues Kapitel: ${nextScene.chapter}`);
    }

    console.log(`[Transition] ${currentScene.id} -> ${nextScene.id}`);
  } else {
    throw new Error(`Choice has neither 'next' nor 'ending': ${choice.id}`);
  }
}

// ============================================================================
// Game Engine Class
// ============================================================================

export class GameEngine {
  private state: GameState;
  private listeners: ((state: GameState) => void)[] = [];
  private scenes: ScenesCollection = {};
  private endings: EndingsCollection = {};
  private readonly STORAGE_KEY_PREFIX = 'nachtzug19_save_';

  constructor(scenes: ScenesCollection = {}, endings: EndingsCollection = {}, startSceneId?: string) {
    this.scenes = scenes;
    this.endings = endings;
    this.state = createInitialState(startSceneId);
  }

  /**
   * Setzt die Scenes-Collection (für dynamisches Laden)
   */
  setScenes(scenes: ScenesCollection): void {
    this.scenes = scenes;
  }

  /**
   * Setzt die Endings-Collection (für dynamisches Laden)
   */
  setEndings(endings: EndingsCollection): void {
    this.endings = endings;
  }

  /**
   * Gibt den aktuellen GameState zurück
   */
  getState(): GameState {
    return this.state;
  }

  /**
   * Gibt die aktuelle Szene zurück
   */
  getCurrentScene(): Scene | null {
    return this.scenes[this.state.current_scene_id] || null;
  }

  /**
   * Gibt das aktuelle Ending zurück (falls Game Over)
   */
  getEnding(): Ending | null {
    if (this.state.endingId) {
      return this.endings[this.state.endingId] || null;
    }
    return null;
  }

  /**
   * Gibt verfügbare Choices der aktuellen Szene zurück
   */
  getAvailableChoices(): Choice[] {
    const scene = this.getCurrentScene();
    if (!scene) return [];
    return getAvailableChoices(this.state, scene);
  }

  /**
   * Subscribe zu State-Änderungen
   */
  subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(l => l(this.state));
  }

  /**
   * Startet ein neues Spiel
   */
  startGame(startSceneId?: string): void {
    this.state = createInitialState(startSceneId);
    this.notify();
  }

  /**
   * Speichert den aktuellen Spielstand
   */
  saveGame(slot: string = 'auto'): void {
    try {
      const key = this.STORAGE_KEY_PREFIX + slot;
      localStorage.setItem(key, JSON.stringify(this.state));
      console.log(`[Save] Spielstand gespeichert: ${key}`);
    } catch (e) {
      console.error('[Save] Fehler beim Speichern:', e);
    }
  }

  /**
   * Lädt einen Spielstand
   */
  loadGame(slot: string = 'auto'): boolean {
    try {
      const key = this.STORAGE_KEY_PREFIX + slot;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved) as GameState;
        if (
          !parsed ||
          typeof parsed.save_version !== 'number' ||
          parsed.save_version !== this.state.save_version
        ) {
          console.warn(`[Load] Save version mismatch: ${key}`);
          return false;
        }
        this.state = parsed;
        this.notify();
        console.log(`[Load] Spielstand geladen: ${key}`);
        return true;
      } else {
        console.warn(`[Load] Kein Spielstand gefunden: ${key}`);
        return false;
      }
    } catch (e) {
      console.error('[Load] Fehler beim Laden:', e);
      return false;
    }
  }

  /**
   * Führt eine Choice aus und navigiert zur nächsten Szene
   */
  makeChoice(choice: Choice): void {
    if (this.state.isGameOver) {
      console.warn('[Engine] Spiel ist bereits beendet');
      return;
    }

    const currentScene = this.getCurrentScene();
    if (!currentScene) {
      console.error('[Engine] Keine aktuelle Szene gefunden');
      return;
    }

    // Transition durchführen
    transitionToNextScene(this.state, currentScene, choice, this.scenes);

    // Auto-Save (optional)
    this.saveGame('auto');

    // Listeners benachrichtigen
    this.notify();
  }
}

// ============================================================================
// Singleton Instance (für Legacy-Kompatibilität)
// ============================================================================

export const gameEngine = new GameEngine();
