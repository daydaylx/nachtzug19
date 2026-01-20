// ============================================================================
// NACHTZUG 19 - Type Definitions
// ============================================================================
// Diese Datei definiert das neue State-Modell basierend auf dem Konzept:
// - Tickets (truth/escape/guilt/love)
// - Druck/Chaos (conductor_attention, memory_drift)
// - Beziehungen (rel_comp7, rel_boy, rel_sleepless)
// - Items (has_recorder, has_tag19, photo_anomaly)
// ============================================================================

// ============================================================================
// Stats & State Variables
// ============================================================================

/**
 * Stats (0-10) - Klassische RPG-Stats (für Legacy-Kompatibilität)
 * @deprecated Im NACHTZUG 19 MVP werden diese Stats nicht aktiv genutzt
 */
export type PlayerStats = {
  mut: number;
  wissen: number;
  empathie: number;
};

/**
 * Tickets (0-5) - Entscheidungsmuster, die Zugang zu Wagen gewähren
 */
export type Tickets = {
  tickets_truth: number;   // Wahrheit suchen
  tickets_escape: number;  // Flucht/Vermeidung
  tickets_guilt: number;   // Verantwortung/Schuld
  tickets_love: number;    // Verbindung/Liebe
};

/**
 * Druck/Chaos (0-6) - Systemvariablen die Schwierigkeit und Varianten steuern
 */
export type Pressure = {
  conductor_attention: number;  // Je höher, desto härter die Kontrollen
  memory_drift: number;        // Ab 3: Textvarianten mit falschen Details
};

/**
 * Beziehungen (-2 bis +4) - Vertrauen/Distanz zu NPCs
 */
export type Relations = {
  rel_comp7: number;        // Comp7 (mysteriöser Mitreisender)
  rel_boy: number;          // Kassettenjunge
  rel_sleepless: number;    // Schlaflosen-Mann
};

/**
 * Items/Hinweise (boolean) - Wichtige Gegenstände und Entdeckungen
 */
export type Items = {
  has_recorder: boolean;    // Kassettenrekorder (Comp7)
  has_tag19: boolean;       // Tag19-Etikett gefunden
  photo_anomaly: boolean;   // Foto mit Anomalie
};

/**
 * Meta-State - Interne Engine-Variablen
 */
export type MetaState = {
  current_scene_id: string;
  visited_scene_ids: string[];
  chapter_index: number;
  station_count: number;
  history: HistoryEntry[];
  save_version: number;
};

/**
 * History Entry - Log einer Entscheidung
 */
export type HistoryEntry = {
  scene_id: string;
  choice_id: string;
  timestamp: number;
  state_delta?: Partial<GameState>; // Optional: Was sich geändert hat
};

/**
 * Vollständiger Game State (NACHTZUG 19)
 */
export type GameState = {
  // Legacy Stats (deprecated, aber für Rückwärtskompatibilität)
  stats: PlayerStats;

  // Neues NACHTZUG 19 State-Modell
  tickets: Tickets;
  pressure: Pressure;
  relations: Relations;
  items: Items;

  // Meta
  current_scene_id: string;
  visited_scene_ids: string[];
  chapter_index: number;
  station_count: number;
  history: HistoryEntry[];

  // Spielende
  isGameOver: boolean;
  endingId?: string;

  // Versioning für Save/Load
  save_version: number;
};

// ============================================================================
// Effects System
// ============================================================================

/**
 * Effect Types - Atomare State-Änderungen
 */
export type EffectType = 'inc' | 'dec' | 'set' | 'clamp';

/**
 * Effect Target - Welche Variable wird geändert?
 */
export type EffectTarget =
  // Legacy Stats
  | 'mut' | 'wissen' | 'empathie'
  // Tickets
  | 'tickets_truth' | 'tickets_escape' | 'tickets_guilt' | 'tickets_love'
  // Pressure
  | 'conductor_attention' | 'memory_drift'
  // Relations
  | 'rel_comp7' | 'rel_boy' | 'rel_sleepless'
  // Items
  | 'has_recorder' | 'has_tag19' | 'photo_anomaly'
  // Meta
  | 'chapter_index' | 'station_count';

/**
 * Effect - Eine State-Änderung
 */
export type Effect = {
  type: EffectType;
  target: EffectTarget;
  value: number | boolean;
  clamp_min?: number;  // Für clamp: Minimum
  clamp_max?: number;  // Für clamp: Maximum
  note?: string;       // Optional: Log-Eintrag
};

// ============================================================================
// Conditions System
// ============================================================================

/**
 * Comparison Operators
 */
export type ComparisonOperator = '==' | '!=' | '>' | '<' | '>=' | '<=';

/**
 * Simple Condition - Vergleich einer Variable
 */
export type SimpleCondition = {
  type: 'compare';
  target: EffectTarget;
  operator: ComparisonOperator;
  value: number | boolean;
};

/**
 * Boolean Check - Prüft boolean-Wert
 */
export type BooleanCondition = {
  type: 'bool';
  target: EffectTarget;
  value: boolean;
};

/**
 * AND Condition - Alle Bedingungen müssen erfüllt sein
 */
export type AndCondition = {
  type: 'and';
  conditions: (SimpleCondition | BooleanCondition)[];
};

/**
 * OR Condition - Mindestens eine Bedingung muss erfüllt sein
 */
export type OrCondition = {
  type: 'or';
  conditions: (SimpleCondition | BooleanCondition)[];
};

/**
 * Condition - Union Type für alle Condition-Typen
 */
export type Condition = SimpleCondition | BooleanCondition | AndCondition | OrCondition;

// ============================================================================
// Content Types (Scene & Choice)
// ============================================================================

/**
 * Scene Tags - Markierungen für spezielle Szenen
 */
export type SceneTag = 'station_end' | 'control' | 'reveal' | 'drift_variant' | 'drift_seed' | 'interlude' | 'secret' | 'setup' | 'announcement';

/**
 * Choice - Eine Entscheidungsmöglichkeit
 */
export type Choice = {
  // Neue Felder (NACHTZUG 19)
  id?: string;                   // Lokal eindeutig in Szene
  label?: string;                // Button-Text
  condition?: Condition | ((stats: PlayerStats, flags: Record<string, boolean | undefined>, inventory: string[]) => boolean);  // Condition-Object oder Legacy-Funktion
  effects?: Effect[];            // Mindestens 1 Effect (R3: Callback-Regel) - optional für Legacy
  next?: string;                 // Nächste Szene-ID
  ending?: string;               // Oder: Ending-ID (A/B/C)

  // Legacy-Felder (für Rückwärtskompatibilität)
  text?: string;
  beschreibungFolge?: string;
  werteAenderung?: Partial<PlayerStats>;
  flagsAenderung?: Record<string, boolean>;
  itemBelohnung?: string;
  itemVerlust?: string;
  naechsteSzeneId?: string;
};

/**
 * Narrative Variant - Bedingte Textvariante (z.B. Drift oder Items)
 */
export type NarrativeVariant = {
  min_drift?: number;             // Optional: Ab welchem memory_drift diese Variante gilt
  condition?: Condition;          // Optional: Generische Condition (z.B. has_tag19)
  narrative: string;              // Alternative Narrative
  replace_mode?: 'full' | 'overlay';  // Default: 'full' (komplette Ersetzung)
};

/**
 * Scene - Eine Szene im Spiel
 */
export type Scene = {
  id: string;                    // Eindeutige ID (z.B. "c1_s01_platform")
  choices: Choice[];             // 1-4 Choices
  atmosphere?: 'normal' | 'danger' | 'mystic' | 'dream' | 'tense' | 'somber' | 'dark';

  // Neue Felder (NACHTZUG 19) - optional für Legacy
  chapter?: number;              // Kapitel 1-7
  title?: string;                // Kurztitel
  narrative?: string;            // Haupt-Text (3-12 Absätze)
  narrative_variants?: NarrativeVariant[];  // Drift-basierte Textvarianten
  tags?: SceneTag[];             // Optional: station_end, control, reveal, etc.
  state_notes?: string[];        // Max 3 Callback-Hinweise
  entry_effects?: Effect[];      // Effects beim Betreten
  exit_effects?: Effect[];       // Effects beim Verlassen

  // Legacy-Felder (für Rückwärtskompatibilität)
  kapitel?: string;
  titel?: string;
  beschreibung?: string;
  effekteBeimBetreten?: {
    mut?: number;
    wissen?: number;
    empathie?: number;
    flagsAenderung?: Record<string, boolean>;
    itemBelohnung?: string;
  };
};

/**
 * Ending - Ein Spielende
 */
export type Ending = {
  id: string;                    // z.B. "A", "B", "C"
  titel: string;                 // Kurztitel
  beschreibung: string;          // End-Text
  title?: string;                // Alias für titel
  narrative?: string;            // Alias für beschreibung
};

// ============================================================================
// Content Collections
// ============================================================================

/**
 * Story Manifest - Einstiegspunkt und Kapitelübersicht
 */
export type Manifest = {
  id: string;                    // z.B. "nachtzug19"
  title: string;                 // Story-Titel
  start_scene_id: string;        // Einstiegsszene
  chapters: ChapterInfo[];       // Kapitelübersicht
};

/**
 * Chapter Info - Metadaten zu einem Kapitel
 */
export type ChapterInfo = {
  number: number;
  title: string;
  scene_count?: number;
};

/**
 * Scenes Collection - Map von Scene-IDs zu Scenes
 */
export type ScenesCollection = Record<string, Scene>;

/**
 * Endings Collection - Map von Ending-IDs zu Endings
 */
export type EndingsCollection = Record<string, Ending>;

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Validation Error - Fehler bei Content-Validierung
 */
export type ValidationError = {
  type: 'error' | 'warning';
  message: string;
  scene_id?: string;
  choice_id?: string;
  location?: string;
};

/**
 * Validation Result - Ergebnis der Content-Validierung
 */
export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
};

// ============================================================================
// Legacy Types (Deprecated)
// ============================================================================

/**
 * @deprecated Use Items type instead
 */
export type Flags = Record<string, boolean | undefined>;

// ============================================================================
// Initial State Factory
// ============================================================================

/**
 * Erstellt einen initialen GameState
 */
export function createInitialState(start_scene_id: string = 'c1_s01_platform'): GameState {
  return {
    // Legacy Stats (deprecated)
    stats: {
      mut: 5,
      wissen: 3,
      empathie: 4
    },

    // NACHTZUG 19 State
    tickets: {
      tickets_truth: 0,
      tickets_escape: 0,
      tickets_guilt: 0,
      tickets_love: 0
    },
    pressure: {
      conductor_attention: 0,
      memory_drift: 0
    },
    relations: {
      rel_comp7: 0,
      rel_boy: 0,
      rel_sleepless: 0
    },
    items: {
      has_recorder: false,
      has_tag19: false,
      photo_anomaly: false
    },

    // Meta
    current_scene_id: start_scene_id,
    visited_scene_ids: [],
    chapter_index: 1,
    station_count: 0,
    history: [],

    // Spielende
    isGameOver: false,
    save_version: 1
  };
}

// ============================================================================
// Utility Functions (Re-exported for UI layer)
// ============================================================================

export { resolveSceneNarrative } from '../engine/gameEngine';
