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

function getStateValue(state: GameState, target: EffectTarget): number | boolean | string {
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
  if (target === 'hub_investigations') return state.pressure.hub_investigations;
  if (target === 'train_explorations') return state.pressure.train_explorations;

  // Relations
  if (target === 'rel_comp7') return state.relations.rel_comp7;
  if (target === 'rel_boy') return state.relations.rel_boy;
  if (target === 'rel_sleepless') return state.relations.rel_sleepless;

  // Items
  if (target === 'has_recorder') return state.items.has_recorder;
  if (target === 'has_tag19') return state.items.has_tag19;
  if (target === 'has_ticket') return state.items.has_ticket;
  if (target === 'photo_anomaly') return state.items.photo_anomaly;
  if (target === 'played_recorder') return state.items.played_recorder;
  if (target === 'memory_search_active') return state.items.memory_search_active;
  if (target === 'emma_memory_unlocked') return state.items.emma_memory_unlocked;
  if (target === 'stance_bold') return state.items.stance_bold;
  if (target === 'stance_cautious') return state.items.stance_cautious;

  // Items - Hub 1 (K1 Redesign)
  if (target === 'investigated_board') return state.items.investigated_board;
  if (target === 'investigated_poster') return state.items.investigated_poster;
  if (target === 'investigated_person') return state.items.investigated_person;
  if (target === 'investigated_device') return state.items.investigated_device;
  if (target === 'investigated_edge') return state.items.investigated_edge;
  if (target === 'called_emma') return state.items.called_emma;
  if (target === 'saw_emma_vision') return state.items.saw_emma_vision;
  if (target === 'has_emma_note') return state.items.has_emma_note;
  if (target === 'knows_board_pattern') return state.items.knows_board_pattern;

  // Items - Hub 2 (K1 Redesign)
  if (target === 'explored_compartment') return state.items.explored_compartment;
  if (target === 'explored_sleepless') return state.items.explored_sleepless;
  if (target === 'explored_passengers') return state.items.explored_passengers;
  if (target === 'explored_comp7') return state.items.explored_comp7;
  if (target === 'knows_sleepless_warning') return state.items.knows_sleepless_warning;
  if (target === 'saw_passenger_loop') return state.items.saw_passenger_loop;
  if (target === 'heard_comp7_scratching') return state.items.heard_comp7_scratching;

  // Nuance Flags (narrative variants, no tickets)
  if (target === 'inspected_device') return state.items.inspected_device;
  if (target === 'looked_into_void') return state.items.looked_into_void;
  if (target === 'gazed_into_darkness') return state.items.gazed_into_darkness;
  if (target === 'prepare_stance') return state.items.prepare_stance;
  if (target === 'breath_control') return state.items.breath_control;
  if (target === 'conductor_stance') return state.items.conductor_stance;
  if (target === 'approach_response') return state.items.approach_response;
  if (target === 'counted_compartments') return state.items.counted_compartments;
  if (target === 'went_to_light') return state.items.went_to_light;
  if (target === 'kept_no_ticket_note') return state.items.kept_no_ticket_note;
  if (target === 'destroyed_evidence') return state.items.destroyed_evidence;
  if (target === 'noticed_jacket_change') return state.items.noticed_jacket_change;

  // Meta
  if (target === 'chapter_index') return state.chapter_index;
  if (target === 'station_count') return state.station_count;

  throw new Error(`Unknown target: ${target}`);
}

// ============================================================================
// Helper: Set State Value by Target
// ============================================================================

function setStateValue(state: GameState, target: EffectTarget, value: number | boolean | string): void {
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
  if (target === 'hub_investigations') { state.pressure.hub_investigations = value as number; return; }
  if (target === 'train_explorations') { state.pressure.train_explorations = value as number; return; }

  // Relations
  if (target === 'rel_comp7') { state.relations.rel_comp7 = value as number; return; }
  if (target === 'rel_boy') { state.relations.rel_boy = value as number; return; }
  if (target === 'rel_sleepless') { state.relations.rel_sleepless = value as number; return; }

  // Items
  if (target === 'has_recorder') { state.items.has_recorder = value as boolean; return; }
  if (target === 'has_tag19') { state.items.has_tag19 = value as boolean; return; }
  if (target === 'has_ticket') { state.items.has_ticket = value as boolean; return; }
  if (target === 'photo_anomaly') { state.items.photo_anomaly = value as boolean; return; }
  if (target === 'played_recorder') { state.items.played_recorder = value as boolean; return; }
  if (target === 'memory_search_active') { state.items.memory_search_active = value as boolean; return; }
  if (target === 'emma_memory_unlocked') { state.items.emma_memory_unlocked = value as boolean; return; }
  if (target === 'stance_bold') { state.items.stance_bold = value as boolean; return; }
  if (target === 'stance_cautious') { state.items.stance_cautious = value as boolean; return; }

  // Items - Hub 1 (K1 Redesign)
  if (target === 'investigated_board') { state.items.investigated_board = value as boolean; return; }
  if (target === 'investigated_poster') { state.items.investigated_poster = value as boolean; return; }
  if (target === 'investigated_person') { state.items.investigated_person = value as boolean; return; }
  if (target === 'investigated_device') { state.items.investigated_device = value as boolean; return; }
  if (target === 'investigated_edge') { state.items.investigated_edge = value as boolean; return; }
  if (target === 'called_emma') { state.items.called_emma = value as boolean; return; }
  if (target === 'saw_emma_vision') { state.items.saw_emma_vision = value as boolean; return; }
  if (target === 'has_emma_note') { state.items.has_emma_note = value as boolean; return; }
  if (target === 'knows_board_pattern') { state.items.knows_board_pattern = value as boolean; return; }

  // Items - Hub 2 (K1 Redesign)
  if (target === 'explored_compartment') { state.items.explored_compartment = value as boolean; return; }
  if (target === 'explored_sleepless') { state.items.explored_sleepless = value as boolean; return; }
  if (target === 'explored_passengers') { state.items.explored_passengers = value as boolean; return; }
  if (target === 'explored_comp7') { state.items.explored_comp7 = value as boolean; return; }
  if (target === 'knows_sleepless_warning') { state.items.knows_sleepless_warning = value as boolean; return; }
  if (target === 'saw_passenger_loop') { state.items.saw_passenger_loop = value as boolean; return; }
  if (target === 'heard_comp7_scratching') { state.items.heard_comp7_scratching = value as boolean; return; }

  // Nuance Flags (narrative variants, no tickets)
  if (target === 'inspected_device') { state.items.inspected_device = value as boolean; return; }
  if (target === 'looked_into_void') { state.items.looked_into_void = value as boolean; return; }
  if (target === 'gazed_into_darkness') { state.items.gazed_into_darkness = value as boolean; return; }
  if (target === 'prepare_stance') { state.items.prepare_stance = value as string; return; }
  if (target === 'breath_control') { state.items.breath_control = value as string; return; }
  if (target === 'conductor_stance') { state.items.conductor_stance = value as string; return; }
  if (target === 'approach_response') { state.items.approach_response = value as string; return; }
  if (target === 'counted_compartments') { state.items.counted_compartments = value as boolean; return; }
  if (target === 'went_to_light') { state.items.went_to_light = value as boolean; return; }
  if (target === 'kept_no_ticket_note') { state.items.kept_no_ticket_note = value as boolean; return; }
  if (target === 'destroyed_evidence') { state.items.destroyed_evidence = value as boolean; return; }
  if (target === 'noticed_jacket_change') { state.items.noticed_jacket_change = value as boolean; return; }

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

    let newValue: number | boolean | string;

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

    // Stance mutual exclusion: setting one clears the other
    if (effect.target === 'stance_bold' && newValue === true) {
      setStateValue(state, 'stance_cautious', false);
    } else if (effect.target === 'stance_cautious' && newValue === true) {
      setStateValue(state, 'stance_bold', false);
    }

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

  // Tickets (0-20) - Endings bei 12, Clamp bei 20 für Puffer
  state.tickets.tickets_truth = Math.max(0, Math.min(20, state.tickets.tickets_truth));
  state.tickets.tickets_escape = Math.max(0, Math.min(20, state.tickets.tickets_escape));
  state.tickets.tickets_guilt = Math.max(0, Math.min(20, state.tickets.tickets_guilt));
  state.tickets.tickets_love = Math.max(0, Math.min(20, state.tickets.tickets_love));

  // Pressure (0-6)
  state.pressure.conductor_attention = Math.max(0, Math.min(6, state.pressure.conductor_attention));
  state.pressure.memory_drift = Math.max(0, Math.min(6, state.pressure.memory_drift));

  // Relations (-2 bis +10) - Erhöht für Puffer
  state.relations.rel_comp7 = Math.max(-2, Math.min(10, state.relations.rel_comp7));
  state.relations.rel_boy = Math.max(-2, Math.min(10, state.relations.rel_boy));
  state.relations.rel_sleepless = Math.max(-2, Math.min(10, state.relations.rel_sleepless));
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
  if (!scene.narrative) {
    return '';
  }

  const baseNarrative = scene.narrative;

  if (!scene.narrative_variants || scene.narrative_variants.length === 0) {
    return baseNarrative;
  }

  // Evaluate all matching variants, assign effective priority, pick highest
  let bestVariant: { narrative: string; effectivePriority: number } | null = null;
  const currentDrift = state.pressure.memory_drift;

  for (const variant of scene.narrative_variants) {
    let matches = false;
    let effectivePriority: number;

    if (variant.condition) {
      // Condition-based variant
      matches = evaluateCondition(state, variant.condition);
      // Also check min_drift if both are set
      if (matches && variant.min_drift !== undefined) {
        matches = currentDrift >= variant.min_drift;
      }
      effectivePriority = variant.priority ?? 10;
    } else if (variant.min_drift !== undefined) {
      // Drift-only variant
      matches = currentDrift >= variant.min_drift;
      // For drift-only, higher min_drift = more specific = tiebreaker via drift value
      effectivePriority = variant.priority ?? 0;
    } else {
      continue;
    }

    if (matches) {
      // Tiebreaker for same priority: higher min_drift wins
      const driftTiebreaker = (variant.min_drift ?? 0) * 0.01;
      const score = effectivePriority + driftTiebreaker;
      const bestScore = bestVariant
        ? (bestVariant as any)._score ?? 0
        : -Infinity;

      if (score > bestScore) {
        bestVariant = { narrative: variant.narrative, effectivePriority };
        (bestVariant as any)._score = score;
      }
    }
  }

  return bestVariant ? bestVariant.narrative : baseNarrative;
}

/**
 * Prüft, ob eine Szene eine auto_next-Transition basierend auf narrative_variants hat.
 * Wird für Hub-Szenen verwendet, die automatisch weiterleiten, wenn Bedingungen erfüllt sind.
 * 
 * @param scene - Die Szene
 * @param state - Der aktuelle GameState
 * @returns Scene-ID für auto_next oder null
 */
export function checkAutoNext(scene: Scene, state: GameState): string | null {
  if (!scene.narrative_variants || scene.narrative_variants.length === 0) {
    return null;
  }

  // Check all variants in priority order
  let bestVariant: { auto_next: string; priority: number } | null = null;
  const currentDrift = state.pressure.memory_drift;

  for (const variant of scene.narrative_variants) {
    if (!variant.auto_next) continue;

    let matches = false;
    let effectivePriority: number;

    if (variant.condition) {
      matches = evaluateCondition(state, variant.condition);
      if (matches && variant.min_drift !== undefined) {
        matches = currentDrift >= variant.min_drift;
      }
      effectivePriority = variant.priority ?? 10;
    } else if (variant.min_drift !== undefined) {
      matches = currentDrift >= variant.min_drift;
      effectivePriority = variant.priority ?? 0;
    } else {
      continue;
    }

    if (matches) {
      const driftTiebreaker = (variant.min_drift ?? 0) * 0.01;
      const score = effectivePriority + driftTiebreaker;
      const bestScore = bestVariant ? bestVariant.priority : -Infinity;

      if (score > bestScore) {
        bestVariant = { auto_next: variant.auto_next, priority: score };
      }
    }
  }

  return bestVariant ? bestVariant.auto_next : null;
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
    const hasManualDrift = (choice.effects ?? []).some((effect) => effect.target === 'memory_drift')
      || (currentScene.exit_effects ?? []).some((effect) => effect.target === 'memory_drift');
    const hasManualStation = (choice.effects ?? []).some((effect) => effect.target === 'station_count')
      || (currentScene.exit_effects ?? []).some((effect) => effect.target === 'station_count');

    if (!hasManualDrift) {
      state.pressure.memory_drift += 1;
    }
    if (!hasManualStation) {
      state.station_count += 1;
    }
    console.log(`[Canon Rule R1] Station-Ende erkannt: memory_drift ${hasManualDrift ? 'manual' : '+1'}, station_count ${hasManualStation ? 'manual' : state.station_count}`);
  }

  // 3. Wende Exit-Effects der aktuellen Szene an
  if (currentScene.exit_effects && currentScene.exit_effects.length > 0) {
    applyEffects(state, currentScene.exit_effects);
  }

  // 4. History aktualisieren
  state.history.push({
    scene_id: state.current_scene_id,
    choice_id: choice.id || choice.label || 'unknown',
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
    if (typeof localStorage === 'undefined') return;
    try {
      const key = this.STORAGE_KEY_PREFIX + slot;
      const payload = {
        version: this.state.save_version,
        current_scene_id: this.state.current_scene_id,
        history: this.state.history,
        state: this.state
      };
      localStorage.setItem(key, JSON.stringify(payload));
      console.log(`[Save] Spielstand gespeichert: ${key}`);
    } catch (e) {
      console.error('[Save] Fehler beim Speichern:', e);
    }
  }

  /**
   * Lädt einen Spielstand
   */
  loadGame(slot: string = 'auto'): boolean {
    if (typeof localStorage === 'undefined') return false;
    try {
      const key = this.STORAGE_KEY_PREFIX + slot;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved) as any;
        const savedState: GameState | null = parsed && parsed.state ? parsed.state : parsed;
        const version = typeof parsed?.version === 'number'
          ? parsed.version
          : savedState?.save_version;

        if (!savedState || typeof version !== 'number' || version !== this.state.save_version) {
          console.warn(`[Load] Save version mismatch: ${key}`);
          return false;
        }
        // Deep merge against defaults so old saves get new fields
        const defaults = createInitialState(savedState.current_scene_id);
        const hydratedState: GameState = {
          ...defaults,
          ...savedState,
          stats: { ...defaults.stats, ...savedState.stats },
          tickets: { ...defaults.tickets, ...savedState.tickets },
          pressure: { ...defaults.pressure, ...savedState.pressure },
          relations: { ...defaults.relations, ...savedState.relations },
          items: { ...defaults.items, ...savedState.items },
          visited_scene_ids: savedState.visited_scene_ids ?? defaults.visited_scene_ids,
          history: savedState.history ?? defaults.history,
        };
        if (parsed && typeof parsed.current_scene_id === 'string') {
          hydratedState.current_scene_id = parsed.current_scene_id;
        }
        if (parsed && Array.isArray(parsed.history)) {
          hydratedState.history = parsed.history;
        }
        if (typeof parsed?.version === 'number') {
          hydratedState.save_version = parsed.version;
        }

        this.state = hydratedState;
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
