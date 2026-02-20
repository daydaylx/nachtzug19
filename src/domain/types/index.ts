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
 * Tickets (0-20) - Entscheidungsmuster, die Endings freischalten
 * Ending-Schwelle: 12, Clamp: 20 (Puffer)
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
  hub_investigations: number;  // K1: Bahnsteig-Hub Counter (0-6)
  train_explorations: number;  // K1: Zug-Hub Counter (0-4)
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
  has_ticket: boolean;      // Ticket in C4 gefunden
  photo_anomaly: boolean;   // Foto mit Anomalie
  played_recorder: boolean; // Ob der Rekorder jemals abgespielt wurde
  memory_search_active: boolean; // P1: Spieler sucht aktiv nach einer Erinnerung/Person
  emma_memory_unlocked: boolean; // Phase 0: Emma memory fragment unlocked (c4 Tag19)
  stance_bold: boolean;     // Tone: Spieler wählt mutige/direkte Haltung
  stance_cautious: boolean; // Tone: Spieler wählt vorsichtige/abwartende Haltung
  
  // Hub 1: Bahnsteig (K1 Redesign)
  investigated_board: boolean;    // Anzeigetafel untersucht
  investigated_poster: boolean;   // Plakat untersucht
  investigated_person: boolean;   // Gestalt mit Zeitung angesprochen
  investigated_device: boolean;   // Gerät aktiviert
  investigated_edge: boolean;     // Gelbe Linie/Schienen geprüft
  called_emma: boolean;          // Emma gerufen (Sonderpfad-Trigger)
  saw_emma_vision: boolean;      // Emma-Vision gesehen
  has_emma_note: boolean;        // Emma's Zettel gefunden
  knows_board_pattern: boolean;  // Anzeigetafel-Muster erkannt
  
  // Hub 2: Zug (K1 Redesign)
  explored_compartment: boolean;  // Eigenes Abteil erkundet
  explored_sleepless: boolean;    // Schlafloser-Dialog geführt
  explored_passengers: boolean;   // Passagiere beobachtet
  explored_comp7: boolean;        // Abteil 7 Tür gelauscht
  knows_sleepless_warning: boolean; // Schlafloser hat gewarnt
  saw_passenger_loop: boolean;    // Passagier-Loop erkannt
  heard_comp7_scratching: boolean; // Kratzen hinter Tür 7 gehört

  // Nuance Flags (keine Tickets, nur narrative Varianten)
  inspected_device: boolean;      // K1: Gerät untersucht (statt Tickets)
  looked_into_void: boolean;      // K1: Schienen-Tiefe angeschaut
  gazed_into_darkness: boolean;   // K1: Fenster im Zug angestarrt
  prepare_stance: string;         // K2: Vorbereitung-Haltung (truth/lie/hide)
  breath_control: string;         // K2: Atem-Kontrolle (steady/shrink)
  conductor_stance: string;       // K2: Haltung vor Schaffner (face/down)
  approach_response: string;      // K2: Antwort-Ton (silent/apologize)
  counted_compartments: boolean;  // K2: Abteile gezählt
  went_to_light: boolean;         // K2: Zum Licht gegangen
  kept_no_ticket_note: boolean;   // K2: Zettel "kein Ticket" behalten
  destroyed_evidence: boolean;    // K2: Zettel zerrissen
  noticed_jacket_change: boolean; // K2: Jackenfarbe-Wechsel bemerkt
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
  | 'conductor_attention' | 'memory_drift' | 'hub_investigations' | 'train_explorations'
  // Relations
  | 'rel_comp7' | 'rel_boy' | 'rel_sleepless'
  // Items (Original)
  | 'has_recorder' | 'has_tag19' | 'has_ticket' | 'photo_anomaly' | 'played_recorder' | 'memory_search_active' | 'emma_memory_unlocked' | 'stance_bold' | 'stance_cautious'
  // Items (Hub 1: Bahnsteig)
  | 'investigated_board' | 'investigated_poster' | 'investigated_person' | 'investigated_device' | 'investigated_edge' | 'called_emma' | 'saw_emma_vision' | 'has_emma_note' | 'knows_board_pattern'
  // Items (Hub 2: Zug)
  | 'explored_compartment' | 'explored_sleepless' | 'explored_passengers' | 'explored_comp7' | 'knows_sleepless_warning' | 'saw_passenger_loop' | 'heard_comp7_scratching'
  // Items (Nuance Flags K1/K2)
  | 'inspected_device' | 'looked_into_void' | 'gazed_into_darkness'
  | 'prepare_stance' | 'breath_control' | 'conductor_stance' | 'approach_response'
  | 'counted_compartments' | 'went_to_light' | 'kept_no_ticket_note' | 'destroyed_evidence' | 'noticed_jacket_change'
  // Meta
  | 'chapter_index' | 'station_count';

/**
 * Effect - Eine State-Änderung
 */
export type Effect = {
  type: EffectType;
  target: EffectTarget;
  value: number | boolean | string;
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
  value: number | boolean | string;
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
export type SceneTag = 'station_end' | 'control' | 'reveal' | 'drift_variant' | 'drift_seed' | 'interlude' | 'secret' | 'setup' | 'announcement' | 'ending' | 'terminal' | 'hub' | 'investigation' | 'event' | 'special_path' | 'emma_thread';

/**
 * Choice - Eine Entscheidungsmöglichkeit
 */
export type ChoiceWeight = 'neutral' | 'riskant' | 'irreversibel';

/**
 * Choice - Eine Entscheidungsmöglichkeit
 */
export type Choice = {
  // Kanonische Felder (NACHTZUG 19)
  id?: string;                   // Lokal eindeutig in Szene
  label?: string;                // Button-Text
  weight?: ChoiceWeight;         // Optional: Entscheidungsgewicht für UI/UX-Semantik
  condition?: Condition | ((stats: PlayerStats, flags: Record<string, boolean | undefined>, inventory: string[]) => boolean);  // Condition-Object oder Legacy-Funktion
  effects?: Effect[];            // R3: Tone Choices ohne Effects sind erlaubt
  next?: string;                 // Nächste Szene-ID
  ending?: string;               // Oder: Ending-ID (A/B/C)
};

/**
 * Narrative Variant - Bedingte Textvariante (z.B. Drift oder Items)
 */
export type NarrativeVariant = {
  min_drift?: number;             // Optional: Ab welchem memory_drift diese Variante gilt
  condition?: Condition;          // Optional: Generische Condition (z.B. has_tag19)
  narrative: string;              // Alternative Narrative
  priority?: number;              // Höherer Wert gewinnt. Default: 10 (condition), 0 (drift-only)
  auto_next?: string;             // Optional: Auto-Transition zur nächsten Szene (für Hub-Trigger)
};

/**
 * Scene - Eine Szene im Spiel
 */
export type Scene = {
  id: string;                    // Eindeutige ID (z.B. "c1_hub_platform")
  chapter?: number;              // Kapitel 1-7
  title?: string;                // Kurztitel
  narrative?: string;            // Haupt-Text (3-12 Absätze)
  choices: Choice[];             // 1-4 Choices
  atmosphere?: 'normal' | 'danger' | 'mystic' | 'dream' | 'tense' | 'somber' | 'dark' | 'hopeful' | 'peaceful' | 'bittersweet';
  narrative_variants?: NarrativeVariant[];  // Drift-basierte Textvarianten
  tags?: SceneTag[];             // Optional: station_end, control, reveal, etc.
  state_notes?: string[];        // Max 3 Callback-Hinweise
  entry_effects?: Effect[];      // Effects beim Betreten
  exit_effects?: Effect[];       // Effects beim Verlassen
};

/**
 * Ending - Ein Spielende
 */
export type Ending = {
  id: string;                    // z.B. "A", "B", "C"
  title: string;                 // Kurztitel
  narrative: string;             // End-Text
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
export function createInitialState(start_scene_id: string = 'c1_hub_platform'): GameState {
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
      memory_drift: 0,
      hub_investigations: 0,
      train_explorations: 0
    },
    relations: {
      rel_comp7: 0,
      rel_boy: 0,
      rel_sleepless: 0
    },
    items: {
      has_recorder: false,
      has_tag19: false,
      has_ticket: false,
      photo_anomaly: false,
      played_recorder: false,
      memory_search_active: false,
      emma_memory_unlocked: false,
      stance_bold: false,
      stance_cautious: false,
      
      // Hub 1: Bahnsteig (K1 Redesign)
      investigated_board: false,
      investigated_poster: false,
      investigated_person: false,
      investigated_device: false,
      investigated_edge: false,
      called_emma: false,
      saw_emma_vision: false,
      has_emma_note: false,
      knows_board_pattern: false,
      
      // Hub 2: Zug (K1 Redesign)
      explored_compartment: false,
      explored_sleepless: false,
      explored_passengers: false,
      explored_comp7: false,
      knows_sleepless_warning: false,
      saw_passenger_loop: false,
      heard_comp7_scratching: false,

      // Nuance Flags (keine Tickets, nur narrative Varianten)
      inspected_device: false,
      looked_into_void: false,
      gazed_into_darkness: false,
      prepare_stance: '',
      breath_control: '',
      conductor_stance: '',
      approach_response: '',
      counted_compartments: false,
      went_to_light: false,
      kept_no_ticket_note: false,
      destroyed_evidence: false,
      noticed_jacket_change: false
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
