// ============================================================================
// NACHTZUG 19 - Kapitel 1: Leerer Bahnsteig (RADICAL REDESIGN v3.0)
// ============================================================================
// STRUKTUR: Hub-basiertes Gameplay mit freier Erkundung
// 
// ACT 1: BAHNSTEIG-HUB (7 Szenen)
//   - c1_hub_platform [Zentrale Hub-Szene, wiederholbar]
//   - c1_inv_board, c1_inv_poster, c1_inv_person, c1_inv_device, c1_inv_edge
//   - c1_trigger_emma [Sonderpfad] → c1_emma_note_read
//
// ACT 2: ZUG-ANNÄHERUNG (3 Szenen)
//   - c1_event_train_arrival [Auto-Trigger nach 3 Investigations]
//   - c1_transit_threshold [Schwelle]
//   - c1_branching_entry [Verzweigung nach State]
//
// ACT 3: ZUG-HUB (5 Szenen)
//   - c1_hub_train [Zweiter Hub, wiederholbar]
//   - c1_train_compartment, c1_train_sleepless, c1_train_passengers, c1_train_comp7_locked
//
// ACT 4: ANOMALIE & COMP7 (3 Szenen)
//   - c1_event_announcement [Auto-Trigger nach 2 Explorations]
//   - c1_comp7_unlocked → c1_comp7_dialog
//
// ACT 5: HALT & KONSEQUENZEN (1 Szene)
//   - c1_end_station [4 Varianten basierend auf dominantem Ticket]
//
// TOTAL: 20 Szenen (aber durch Hubs wiederholbar)
// SPIELZEIT: 30-35 Minuten (durch Variabilität)
// 
// HUB-MECHANIK:
//   1. Hub-Szene hat mehrere Choices mit Condition: item_flag === false
//   2. Jede Choice setzt item_flag = true und erhöht Counter (hub_investigations)
//   3. Bei 3+ Investigations: narrative_variant mit auto_next triggert
//   4. Engine prüft auto_next BEVOR "keine Choices verfügbar" deklariert wird
//   5. Auto-Transition läuft ohne User-Input → nahtloser Übergang
//
// PROGRESSIVE DISCOVERY:
//   - Hub-Narrative ändern sich basierend auf hub_investigations Counter
//   - Beispiel: Bei 0 Investigations: neutral, bei 2: angespannt, bei 3: Trigger
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter1Scenes: ScenesCollection = {
  // ============================================================================
  // ACT 1: BAHNSTEIG-HUB
  // ============================================================================

  'c1_hub_platform': {
    id: 'c1_hub_platform',
    chapter: 1,
    title: 'Leerer Bahnsteig',
    narrative: `Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer. Eine Leere, die sich anfühlt wie ein vergessenes Wort auf der Zungenspitze.

Du stehst da und versuchst dich zu erinnern, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt.

Um dich herum: Details, die darauf warten, untersucht zu werden.`,
    narrative_variants: [
      {
        condition: { type: 'compare', target: 'hub_investigations', operator: '==', value: 1 },
        narrative: `Du kehrst zurück. Die Anzeigetafel klackt schneller.`
      },
      {
        condition: { type: 'compare', target: 'hub_investigations', operator: '==', value: 2 },
        narrative: `Die Gestalt sitzt näher. Ein Name brennt in deinem Kopf: Emma.`
      },
      {
        condition: { type: 'compare', target: 'hub_investigations', operator: '>=', value: 3 },
        narrative: `Ein tiefes Brummen. Dann gleitet der Zug lautlos ein. Die Türen öffnen sich.`,
        auto_next: 'c1_event_train_arrival'
      }
    ],
    choices: [
      {
        id: 'investigate_board',
        label: 'Die Anzeigetafel [23:47, klackend]',
        condition: {
          type: 'bool',
          target: 'investigated_board',
          value: false
        },
        effects: [
          { type: 'inc', target: 'hub_investigations', value: 1 },
          { type: 'set', target: 'investigated_board', value: true }
        ],
        next: 'c1_inv_board'
      },
      {
        id: 'investigate_poster',
        label: 'Das verblasste Plakat [19-19-19]',
        condition: {
          type: 'bool',
          target: 'investigated_poster',
          value: false
        },
        effects: [
          { type: 'inc', target: 'hub_investigations', value: 1 },
          { type: 'set', target: 'investigated_poster', value: true }
        ],
        next: 'c1_inv_poster'
      },
      {
        id: 'investigate_person',
        label: 'Die Gestalt mit der Zeitung',
        condition: {
          type: 'bool',
          target: 'investigated_person',
          value: false
        },
        effects: [
          { type: 'inc', target: 'hub_investigations', value: 1 },
          { type: 'set', target: 'investigated_person', value: true },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_inv_person'
      },
      {
        id: 'investigate_device',
        label: 'Das kalte Gerät in deiner Tasche',
        condition: {
          type: 'bool',
          target: 'investigated_device',
          value: false
        },
        effects: [
          { type: 'inc', target: 'hub_investigations', value: 1 },
          { type: 'set', target: 'investigated_device', value: true }
        ],
        next: 'c1_inv_device'
      },
      {
        id: 'investigate_edge',
        label: 'Die gelbe Linie am Rand des Bahnsteigs',
        condition: {
          type: 'bool',
          target: 'investigated_edge',
          value: false
        },
        effects: [
          { type: 'inc', target: 'hub_investigations', value: 1 },
          { type: 'set', target: 'investigated_edge', value: true },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_inv_edge'
      },
      {
        id: 'call_emma',
        label: '„Emma!" in die Leere rufen',
        condition: {
          type: 'bool',
          target: 'called_emma',
          value: false
        },
        effects: [
          { type: 'set', target: 'called_emma', value: true },
          { type: 'set', target: 'memory_search_active', value: true },
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_trigger_emma'
      }
    ],
    tags: ['hub'],
    state_notes: [
      'Zentrale Hub-Szene - Spieler kehrt nach jeder Investigation zurück',
      'Nach 3 hub_investigations → Auto-Transition zu c1_event_train_arrival',
      'Bis zu 5 Investigation-Pfade + Emma-Sonderpfad (Reihenfolge frei bis Trigger greift)',
      'called_emma führt zu Sonderpfad'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // INVESTIGATION 1: ANZEIGETAFEL
  // ============================================================================

  'c1_inv_board': {
    id: 'c1_inv_board',
    chapter: 1,
    title: 'Die Anzeigetafel',
    narrative: `Die Anzeigetafel zeigt 23:47. Ein altes Klappmodell, das im Takt klackt, ohne etwas anzuzeigen.

Klack. Klack. Klack.

Drei Sekunden Abstand. Exakt. Wie ein Herzschlag, der nicht deiner ist.

Dann flackert ein Wort auf: RÜCK— Und weg.`,
    choices: [
      {
        id: 'count_pattern',
        label: 'Den Takt weiterzählen, das Muster suchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'knows_board_pattern', value: true }
        ],
        next: 'c1_hub_platform'
      },
      {
        id: 'try_touch',
        label: 'Die Tafel berühren',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_hub_platform'
      },
      {
        id: 'step_back',
        label: 'Einen Schritt zurück, bevor es dich anzieht',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_hub_platform'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'knows_board_pattern → Callback in c1_event_announcement'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // INVESTIGATION 2: PLAKAT
  // ============================================================================

  'c1_inv_poster': {
    id: 'c1_inv_poster',
    chapter: 1,
    title: 'Das Plakat',
    narrative: `Ein verblasstes Plakat. Orange auf Braun, Siebziger-Typografie: „REISEN SIE MIT UNS".

Keine Webseite. Nur eine Telefonnummer: 19-19-19.

Du streichst über die Oberfläche. Die Tinte ist rau, fast wie Narbengewebe.`,
    choices: [
      {
        id: 'note_number',
        label: 'Die Nummer einprägen: 19-19-19',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_hub_platform'
      },
      {
        id: 'tear_poster',
        label: 'Versuchen, das Plakat abzureißen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_hub_platform'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      '19-19-19 Pattern - wird in späteren Kapiteln wichtig'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // INVESTIGATION 3: GESTALT
  // ============================================================================

  'c1_inv_person': {
    id: 'c1_inv_person',
    chapter: 1,
    title: 'Die Gestalt',
    narrative: `Eine Gestalt sitzt auf einer Bank und liest eine Zeitung. Die Seiten rascheln nicht.

„Entschuldigung", sagst du. Keine Reaktion.

Du legst deine Hand auf ihre Schulter. Kalt. Hart. Wie Wachs.

Für einen Herzschlag sieht ihr Gesicht aus wie deins.`,
    choices: [
      {
        id: 'take_newspaper',
        label: 'Die Zeitung aus ihren Händen nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_hub_platform'
      },
      {
        id: 'back_away',
        label: 'Langsam zurückweichen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_hub_platform'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'Erste Doppelgänger-Andeutung',
      'Erhöht conductor_attention (bereits in Hub-Choice)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // INVESTIGATION 4: GERÄT
  // ============================================================================

  'c1_inv_device': {
    id: 'c1_inv_device',
    chapter: 1,
    title: 'Das Gerät',
    narrative: `Du greifst in deine Tasche. Ein Gerät. Schwarz, kalt.

Du drückst darauf. Das Display flackert: statisches Rauschen, dann Worte.

NACHTZUG 19 / KEINE VERBINDUNG / WARTEN SIE

Auf der Rückseite ein Aufkleber. Ein Name. Verwischt, unleserlich.`,
    choices: [
      {
        id: 'keep_trying',
        label: 'Weiter versuchen, es zu aktivieren',
        effects: [
          { type: 'set', target: 'inspected_device', value: true }
        ],
        next: 'c1_hub_platform'
      },
      {
        id: 'put_away',
        label: 'Weglegen und vergessen',
        effects: [
          { type: 'set', target: 'inspected_device', value: true }
        ],
        next: 'c1_hub_platform'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'Gerät zeigt "NACHTZUG 19" - erster direkter Name-Drop',
      'Flag inspected_device für narrative Varianten (keine Tickets)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // INVESTIGATION 5: GELBE LINIE
  // ============================================================================

  'c1_inv_edge': {
    id: 'c1_inv_edge',
    chapter: 1,
    title: 'Die Kante',
    narrative: `Du gehst zum Rand. Dahinter die Schienen – schwarz, matt.

Du schaust hinunter. Dunkelheit. Kein Kies. Nur... Nichts.

Ein Lichtpunkt, aus der Tiefe. Näher. Schneller. Das Brummen setzt ein.`,
    choices: [
      {
        id: 'lean_closer',
        label: 'Dich über die Kante lehnen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'set', target: 'looked_into_void', value: true }
        ],
        next: 'c1_hub_platform'
      },
      {
        id: 'pull_back',
        label: 'Sofort zurückspringen',
        effects: [
          { type: 'set', target: 'looked_into_void', value: true }
        ],
        next: 'c1_hub_platform'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'Unendliche Tiefe - Reality-Check',
      'memory_drift bleibt (Mechanik), Tickets entfernt (nur Flag looked_into_void)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // SONDERPFAD: EMMA RUFEN
  // ============================================================================

  'c1_trigger_emma': {
    id: 'c1_trigger_emma',
    chapter: 1,
    title: 'Der Name',
    narrative: `„EMMA!"

Deine Stimme hallt über den leeren Bahnsteig, scharf und verzweifelt.

Für einen Herzschlag: Stille.

Dann—

Am anderen Ende des Bahnsteigs, wo die Neonröhren in Dunkelheit übergehen, bewegt sich etwas.

Eine Gestalt. Klein. Vertraut.

Sie dreht sich um.

Braune Augen. Sommersprossen auf der Nase. Ein Lächeln, das du nie vergessen wolltest.

Emma.

Sie hebt die Hand. Nicht winkend. Wartend. Als würde sie dich einladen zu folgen.

Du machst einen Schritt nach vorn—

—und das Licht flackert.

Als es zurückkommt, ist sie weg.

Aber auf dem Boden, genau wo sie stand, liegt etwas. Ein kleiner Zettel, zusammengefaltet.`,
    choices: [
      {
        id: 'take_note',
        label: 'Den Zettel aufheben',
        effects: [
          { type: 'set', target: 'saw_emma_vision', value: true },
          { type: 'set', target: 'has_emma_note', value: true },
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_emma_note_read'
      },
      {
        id: 'leave_it',
        label: 'Den Zettel liegen lassen - das ist nicht real',
        effects: [
          { type: 'set', target: 'saw_emma_vision', value: true },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_hub_platform'
      }
    ],
    tags: ['special_path', 'emma_thread'],
    state_notes: [
      'Nur erreichbar wenn called_emma in Hub gewählt',
      'saw_emma_vision wird in ALLEN späteren Kapiteln als Callback genutzt'
    ],
    atmosphere: 'mystic'
  },

  'c1_emma_note_read': {
    id: 'c1_emma_note_read',
    chapter: 1,
    title: 'Die Nachricht',
    narrative: `Du faltest den Zettel auseinander.

Deine eigene Handschrift. Aber du erinnerst dich nicht, das geschrieben zu haben:

"Warte am Bahnsteig. Ich komme zurück. Versprochen."

Darunter: Ein Datum. 23.04.2024.

Ist das... heute? Gestern? Oder vor Jahren?

Du drehst den Zettel um. Auf der Rückseite: Ein einzelnes Wort, in anderer Tinte:

"WAGEN 7"`,
    choices: [
      {
        id: 'keep_note',
        label: 'Den Zettel sorgfältig einstecken – und zum Zug',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_event_train_arrival'
      }
    ],
    tags: ['emma_thread'],
    state_notes: [
      'Emma-Note wird in K6 nochmal wichtig',
      'Wagen 7 Hinweis',
      'EXIT FIX: Direkt zu c1_event_train_arrival, nicht zurück zum Hub'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // ACT 2: ZUG-ANNÄHERUNG
  // ============================================================================

  'c1_event_train_arrival': {
    id: 'c1_event_train_arrival',
    chapter: 1,
    title: 'Der Zug',
    narrative: `Der Zug sieht aus wie ein alter Nachtzug. Achtziger Jahre. Vielleicht noch früher. Abblätternde dunkelrote Farbe, stellenweise schwarz verfärbt – oder ist es Ruß?

Fenster zu schmal, die Rahmen vergilbt wie alte Zähne. Die Wagen sind lang. Zu lang. Du zählst: Fünf. Sechs. Sieben. Acht. Sie verschwimmen am Ende in der Dunkelheit.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen. Niemand bewegt sich. Niemand schaut auf. Niemand schaut hinaus.

Warme Luft strömt heraus – zu warm für einen Nachtzug, zu feucht. Riecht nach altem Polster und etwas Süßlichem. Verbrannter Zucker? Oder... verbranntes Plastik?

An der Seite des Wagens: Ein Schriftzug. Verblichen. Du kannst nur Teile lesen: „—CHTZUG 1—". Der Rest fehlt.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'saw_emma_vision', value: true },
            { type: 'bool', target: 'has_emma_note', value: true }
          ]
        },
        narrative: `Der Zug sieht aus wie ein alter Nachtzug. Achtziger Jahre.

Du umklammerst den Zettel in deiner Tasche. „WAGEN 7" steht darauf.

Du suchst die Waggons ab. 1, 2, 3, 4, 5, 6... 7.

Da. Am Ende. Ein Wagen mit einer massiven Holztür. Dunkler als der Rest.

Emma wartet dort. Oder etwas, das aussieht wie Emma.`
      }
    ],
    choices: [
      {
        id: 'board_immediately',
        label: 'Keine Sekunde verlieren und einsteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_transit_threshold'
      },
      {
        id: 'inspect_train',
        label: 'Noch einen prüfenden Blick auf die Außenseite',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_transit_threshold'
      },
      {
        id: 'call_out',
        label: 'In die Fenster hineinrufen',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '<',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_transit_threshold'
      }
    ],
    tags: ['event'],
    state_notes: [
      'Auto-Trigger von c1_hub_platform nach 3 investigations',
      'Emma-Note Callback'
    ],
    atmosphere: 'tense'
  },

  'c1_transit_threshold': {
    id: 'c1_transit_threshold',
    chapter: 1,
    title: 'Schwelle',
    narrative: `Du stellst einen Fuß auf die Stufe.

Das Metall ist feucht, fast glitschig. Nicht nass – aber auch nicht trocken. Eine Feuchtigkeit, die sich anfühlt wie kalter Schweiß.

Ein kurzer Geruch von warmem Staub schlägt dir entgegen, süßlich und alt, als würde der Zug ausatmen – einen langsamen, tiefen Atemzug aus seiner Tiefe.

Hinter dir klackt die Anzeigetafel einmal, laut und final. Du drehst dich um. Die Ziffern haben gewechselt. 23:48.

Eine Minute ist vergangen. Oder sind es zwei? Warst du länger auf dem Bahnsteig, als du dachtest?

Der Nebel kriecht näher. Die Gestalt mit der Zeitung ist verschwunden. War sie jemals da?`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'saw_emma_vision', value: true },
        narrative: `Du stellst einen Fuß auf die Stufe.

In dem Moment, in dem dein Gewicht auf der Kante liegt, denkst du den Namen noch einmal stumm: Emma.

Das Metall ist feucht. Hinter dir klackt die Anzeigetafel. 23:48.

Der Nebel kriecht näher. Am Ende des Bahnsteigs, wo Emma stand, ist nur noch Dunkelheit.

Aber der Zettel in deiner Tasche ist warm geworden. Als hätte er etwas aufgenommen.`
      }
    ],
    choices: [
      {
        id: 'step_in_bold',
        label: 'Die Schwelle bewusst überschreiten',
        effects: [
          { type: 'set', target: 'stance_bold', value: true }
        ],
        next: 'c1_branching_entry'
      },
      {
        id: 'hesitate_step',
        label: 'Noch einmal zurückblicken, dann einsteigen',
        effects: [
          { type: 'set', target: 'stance_cautious', value: true }
        ],
        next: 'c1_branching_entry'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Schwelle zum Zug',
      'stance_bold/cautious wird gesetzt'
    ],
    atmosphere: 'tense'
  },

  'c1_branching_entry': {
    id: 'c1_branching_entry',
    chapter: 1,
    title: 'Innen',
    narrative: `Die Tür schließt sich mit einem finalen Klack.

Stille. Eine zu saubere Stille, als hätte jemand den Ton abgedreht. Der Druck auf deinen Ohren wächst, wie unter Wasser.

Der Wagen ist ein Gang mit Abteilen. Orange-braune Polstersitze, abgenutzt, Siebziger-Jahre-Muster. Messinglampen flackern. Es riecht nach altem Rauch und Pfeifentabak.

Der Zug setzt sich in Bewegung – sanft, schwebend. Kein Ruck.

Um dich herum: Bereiche, die du erkunden kannst.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'stance_bold', value: true },
            { type: 'bool', target: 'saw_emma_vision', value: true }
          ]
        },
        narrative: `Du steigst ein, ohne zu zögern. Die Tür fällt hinter dir ins Schloss.

Stille. Zu sauber.

Der Wagen riecht nach altem Rauch. Deine Hand liegt auf dem Zettel in der Tasche. „WAGEN 7" steht darauf.

Du schaust den Gang entlang. Am Ende: eine Tür. Dunkler als der Rest.

Dort musst du hin. Aber nicht jetzt. Erst musst du verstehen, wo du bist.`
      }
    ],
    choices: [
      {
        id: 'enter_hub_train',
        label: 'Den Zug erkunden',
        effects: [],
        next: 'c1_hub_train'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Verzweigung basierend auf stance + emma_vision',
      'Führt direkt zu Hub 2'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // ACT 3: ZUG-HUB
  // ============================================================================

  'c1_hub_train': {
    id: 'c1_hub_train',
    chapter: 1,
    title: 'Im Zug',
    narrative: `Du stehst im Gang des Zuges.

Um dich herum: drei Bereiche, die du erkunden kannst.`,
    narrative_variants: [
      {
        condition: { type: 'compare', target: 'train_explorations', operator: '==', value: 1 },
        narrative: `Zurück im Gang. Die Lampen flackern synchron.`
      },
      {
        condition: { type: 'compare', target: 'train_explorations', operator: '>=', value: 2 },
        narrative: `Die Lautsprecher knistern. Eine Durchsage bahnt sich an.`,
        auto_next: 'c1_event_announcement'
      }
    ],
    choices: [
      {
        id: 'explore_compartment',
        label: '[A] Dein Abteil - das leere mit dem Fenster',
        condition: {
          type: 'bool',
          target: 'explored_compartment',
          value: false
        },
        effects: [
          { type: 'inc', target: 'train_explorations', value: 1 },
          { type: 'set', target: 'explored_compartment', value: true }
        ],
        next: 'c1_train_compartment'
      },
      {
        id: 'explore_sleepless',
        label: '[B] Der Mann mit den roten Augen',
        condition: {
          type: 'bool',
          target: 'explored_sleepless',
          value: false
        },
        effects: [
          { type: 'inc', target: 'train_explorations', value: 1 },
          { type: 'set', target: 'explored_sleepless', value: true }
        ],
        next: 'c1_train_sleepless'
      },
      {
        id: 'explore_passengers',
        label: '[C] Die reglosen Passagiere',
        condition: {
          type: 'bool',
          target: 'explored_passengers',
          value: false
        },
        effects: [
          { type: 'inc', target: 'train_explorations', value: 1 },
          { type: 'set', target: 'explored_passengers', value: true }
        ],
        next: 'c1_train_passengers'
      },
      {
        id: 'explore_comp7',
        label: '[D] Die Tür mit der 7 (verschlossen)',
        condition: {
          type: 'bool',
          target: 'explored_comp7',
          value: false
        },
        effects: [
          { type: 'inc', target: 'train_explorations', value: 1 },
          { type: 'set', target: 'explored_comp7', value: true },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_train_comp7_locked'
      }
    ],
    tags: ['hub'],
    state_notes: [
      'Zweiter Hub - freie Wahl der Reihenfolge (4 Choices)',
      'Nach 2 Explorations triggert Durchsage automatisch'
    ],
    atmosphere: 'mystic'
  },

  'c1_train_compartment': {
    id: 'c1_train_compartment',
    chapter: 1,
    title: 'Dein Abteil',
    narrative: `Du suchst dir ein Abteil. Leer. Du setzt dich ans Fenster.

Die Polster sind weich, aber feucht. Als hätten sie lange in einem kalten Raum gestanden.

Durch das Fenster: Schwärze. Keine Lichter, keine Landschaft. Aber ab und zu ein Lichtpunkt, der sofort wieder verschwindet.

Du lehnst den Kopf ans Fenster. Das Glas ist warm. Viel zu warm.

Im Spiegelbild des Fensters siehst du dein Gesicht. Für einen Moment ist da noch jemand. Hinter dir. Aber als du dich umdrehst: niemand.

In den anderen Abteilen bewegen sich die Passagiere in kleinen, mechanischen Schleifen. Eine Frau mit gefaltetem Mantel, die Hände perfekt symmetrisch im Schoß. Ein Mann, der ein leeres Buch aufschlägt und umblättert, ohne je zu lesen. Niemand sieht raus. Niemand sieht rein. Als wären sie nicht hier, sondern aufgezeichnet.`,
    choices: [
      {
        id: 'stay_window',
        label: 'Beim Fenster bleiben und hinausstarren',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'set', target: 'gazed_into_darkness', value: true },
          { type: 'set', target: 'saw_passenger_loop', value: true }
        ],
        next: 'c1_hub_train'
      },
      {
        id: 'leave_quickly',
        label: 'Schnell zurück in den Gang',
        effects: [
          { type: 'set', target: 'gazed_into_darkness', value: true },
          { type: 'set', target: 'saw_passenger_loop', value: true }
        ],
        next: 'c1_hub_train'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'Spiegelbild-Anomalie',
      'Vorbereitung auf K4 Mirror-Theme',
      'MERGE: Passagier-Loop-Text integriert, saw_passenger_loop wird hier gesetzt'
    ],
    atmosphere: 'mystic'
  },

  'c1_train_sleepless': {
    id: 'c1_train_sleepless',
    chapter: 1,
    title: 'Der Schlaflose',
    narrative: `Der Mann lehnt im Gang. Nicht lehnt — hängt. Als hätte jemand ihn dort abgestellt und vergessen, ihn wieder mitzunehmen.

Seine Augen sind rot umrandet. Die Haut darunter violett. Er sieht aus wie jemand, der das Schlafen verlernt hat.

„Du auch?" Rau. Brüchig.

„Auch was?"

„Kein Ticket. Keine Erinnerung. Keine Ahnung, wie lange schon." Er wischt sich über die Augen. „Wann war das letzte Mal, dass du geschlafen hast?"

Du greifst in deine Tasche. Leer. Kein Ticket.

„Wo sind wir?"

„Unterwegs." Er sagt es, wie man sagt: das Wetter ist schlecht. „Immer unterwegs. Von Station zu Station. Niemand steigt aus."`,
    choices: [
      {
        id: 'ask_warning',
        label: '„Was soll ich wissen?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 },
          { type: 'set', target: 'knows_sleepless_warning', value: true }
        ],
        next: 'c1_hub_train'
      },
      {
        id: 'comfort_him',
        label: '„Ich bin auch hier. Du bist nicht allein."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c1_hub_train'
      },
      {
        id: 'deny_reality',
        label: '„Das ist Panik, nicht Wahrheit."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_hub_train'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'Schlafloser-Intro',
      'knows_sleepless_warning wird in K2 wichtig'
    ],
    atmosphere: 'somber'
  },

  'c1_train_passengers': {
    id: 'c1_train_passengers',
    chapter: 1,
    title: 'Die Anderen',
    narrative: `Du schaust dich um. Der Wagen ist nicht leer.

Eine Frau, Ende dreißig. Ihr Mantel ist zugeknöpft bis zum Kinn, obwohl es warm ist. Ihre Hände liegen gefaltet im Schoß, perfekt symmetrisch. Sie starrt geradeaus.

Ein Mann mit Brille. Anzug. Er hält ein Buch, dick, ledergebunden. Aber als du näher kommst, siehst du: Die Seiten sind leer. Trotzdem blättert er um, als würde er lesen.

Ein Teenager mit Kopfhörern. Die Kopfhörer sind nicht angeschlossen – das Kabel hängt lose herunter. Aber er nickt im Rhythmus, bewegt lautlos die Lippen.

Niemand spricht. Niemand sieht dich an. Als wären sie alle in einer Schleife gefangen.`,
    choices: [
      {
        id: 'watch_pattern',
        label: 'Das Muster beobachten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'saw_passenger_loop', value: true }
        ],
        next: 'c1_hub_train'
      },
      {
        id: 'leave_them',
        label: 'Im Muster unsichtbar bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_hub_train'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'Passagier-Loop eingeführt',
      'saw_passenger_loop → Callback in späteren Kapiteln'
    ],
    atmosphere: 'somber'
  },

  'c1_train_comp7_locked': {
    id: 'c1_train_comp7_locked',
    chapter: 1,
    title: 'Abteil 7',
    narrative: `Du gehst weiter durch den Wagen. Am Ende: Eine Tür. Massiv. Holz. Dunkler als der Rest.

Nummer 7.

Die Metallplatte ist angelaufen, grünlich. Als wäre sie sehr alt. Oder als hätte sie lange unter Wasser gelegen.

Ein handgeschriebenes Schild, auf vergilbtem Papier, mit Klebeband befestigt: „Besetzt".

Du hörst Geräusche dahinter. Leises Kratzen. Papier auf Papier. Oder... Stift auf Papier? Jemand schreibt. Schnell. Hektisch. Ohne Pause.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_emma_note', value: true },
        narrative: `Am Ende des Gangs: Die Tür mit der 7.

„WAGEN 7" steht auf dem Zettel in deiner Tasche.

Die Tür ist verschlossen. Ein Schild: „Besetzt".

Dahinter hörst du jemanden schreiben. Schnell. Hektisch.

Emma? Oder jemand, der weiß, wo Emma ist?`
      }
    ],
    choices: [
      {
        id: 'knock_door',
        label: 'Klopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'set', target: 'heard_comp7_scratching', value: true }
        ],
        next: 'c1_hub_train'
      },
      {
        id: 'listen_only',
        label: 'Nur horchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'heard_comp7_scratching', value: true }
        ],
        next: 'c1_hub_train'
      }
    ],
    tags: ['investigation'],
    state_notes: [
      'Comp7 Tür - noch verschlossen',
      'Emma-Note Callback',
      'Öffnet sich nach c1_event_announcement'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // ACT 4: ANOMALIE & COMP7
  // ============================================================================

  'c1_event_announcement': {
    id: 'c1_event_announcement',
    chapter: 1,
    title: 'Durchsage',
    narrative: `Eine Lautsprecherdurchsage knistert durch den Wagen. Nicht aus den Lautsprechern – aus den Wänden selbst.

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause. Zu lang. Unnatürlich.

„—[unverständlich]. Bitte achten Sie auf Ihre persönlichen Gegenstände."

Die Stimme ist glatt, emotionslos.

Dann, leiser, fast nicht hörbar:

„—ückf— —kehr—"

Rückfahrt? Rückkehr?`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'knows_board_pattern', value: true },
        narrative: `Eine Lautsprecherdurchsage knistert.

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause.

„—[unverständlich]—"

Dann:

„—ückf— —kehr—"

Du erkennst es. Die Anzeigetafel auf dem Bahnsteig hat dir dasselbe Wort gezeigt. RÜCK—

Das ist kein Zufall. Das ist ein Muster.`
      }
    ],
    choices: [
      {
        id: 'analyze_sound',
        label: 'Das Wort zusammensetzen: RÜCKKEHR',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_comp7_unlocked'
      },
      {
        id: 'ignore_it',
        label: 'So tun, als wäre es normal',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_comp7_unlocked'
      }
    ],
    tags: ['event', 'drift_seed'],
    state_notes: [
      'Auto-Trigger nach 2 train_explorations',
      'Callback zu knows_board_pattern'
    ],
    atmosphere: 'mystic'
  },

  'c1_comp7_unlocked': {
    id: 'c1_comp7_unlocked',
    chapter: 1,
    title: 'Die Tür öffnet sich',
    narrative: `Ein Klicken. Mechanisch. Final.

Die Tür zu Wagen 7 steht einen Spalt offen.

Von innen: Papiergeruch. Und eine Stimme.

„Komm rein. Ich weiß, dass du da bist."`,
    choices: [
      {
        id: 'enter_now',
        label: 'Eintreten',
        effects: [
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_comp7_dialog'
      },
      {
        id: 'hesitate_door',
        label: 'Zögern, dann eintreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_comp7_dialog'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Comp7 Unlock'
    ],
    atmosphere: 'mystic'
  },

  'c1_comp7_dialog': {
    id: 'c1_comp7_dialog',
    chapter: 1,
    title: 'Comp7',
    narrative: `Das Abteil ist voller Notizbücher. Überall. Gestapelt auf Tischen, auf dem Boden, an den Wänden.

Eine Person sitzt am Fenster und schreibt. Schnell. Präzise. Ohne aufzublicken.

„Passagier ohne Ticket. Rekorder-Vermerk. Kein Ausstieg seit Station 1." Sie tippt auf ihr Notizbuch. „Steht alles hier."

Sie sieht dich an. Kurz. Taxierend.

„Ich schreibe. Damit die Drift nicht gewinnt. Verstehst du Drift?"

Sie wartet nicht auf deine Antwort.

„Noch nicht. Wirst du."`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'saw_emma_vision', value: true },
        narrative: `Das Abteil ist voller Notizbücher.

Eine Person sitzt am Fenster und schreibt.

„Passagier ohne Ticket. Kein Ausstieg seit Station 1." Sie blättert eine Seite um. Hält inne.

„Emma. Den Namen hab ich schon gehört. Viele suchen jemanden."

Sie sieht dich an. „Aber nicht alle finden zurück."`
      }
    ],
    choices: [
      {
        id: 'ask_drift',
        label: '„Was ist Drift?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'silent_acknowledge',
        label: 'Ihre Anwesenheit still anerkennen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_end_station'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Comp7 First Contact',
      'Emma-Callback wenn saw_emma_vision=true'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // ACT 5: HALT & KONSEQUENZEN
  // ============================================================================

  'c1_end_station': {
    id: 'c1_end_station',
    chapter: 1,
    title: 'Der erste Halt',
    narrative: `Der Zug hält. 23:47 Uhr. Wieder.

Der Bahnsteig ist leer.`,
    narrative_variants: [
      // TRUTH PATH: Highest Truth ticket (priority 40)
      {
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 5
        },
        narrative: `Der Zug hält. 23:47 Uhr. Wieder.

Du hast es gesehen. Das Muster. Die Wiederholungen. Die Anomalien. Alles passt zusammen wie Puzzleteile, die du noch nicht ordnen kannst.

Comp7 steht am Fenster von Wagen 7 und schreibt. Sie sieht nicht auf, aber du weißt, dass sie dich beobachtet.

Der Bahnsteig ist derselbe wie vorhin. Jedes Detail identisch. Die Anzeigetafel klackt weiter: 23:47. 23:47. 23:47.

Du verstehst langsam: Das hier ist kein Zufall. Das hier ist eine Maschine. Und du bist ein Teil davon.

Die Uhr zeigt 23:47. Du bist seit Stunden unterwegs. Aber die Uhr sagt, du bist gerade erst angekommen.`,
        priority: 40
      },
      // LOVE PATH: Emma vision + Love ticket (priority 35)
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'tickets_love', operator: '>=', value: 4 },
            { type: 'bool', target: 'saw_emma_vision', value: true }
          ]
        },
        narrative: `Der Zug hält. 23:47 Uhr.

Draußen auf dem Bahnsteig, am Ende, wo die Neonröhren in Dunkelheit übergehen: eine Gestalt.

Klein. Vertraut.

Sie steht einfach nur da. Wartet.

Emma.

Oder die Erinnerung an Emma. Oder was der Zug dir zeigen will.

Du legst die Hand an die Scheibe. Das Glas ist warm. Für einen Atemzug glaubst du, dass sie zurückwinkt.

Dann geht das Licht aus.

Als es wieder anspringt, ist sie weg.

Aber der Zettel in deiner Tasche ist schwerer geworden.

Das Datum auf dem Zettel: heute Nacht. Du bist seit Stunden unterwegs. Das Datum sagt, du bist gerade erst angekommen.`,
        priority: 35
      },
      // ESCAPE PATH: High Escape, low Attention (priority 30)
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'tickets_escape', operator: '>=', value: 4 },
            { type: 'compare', target: 'conductor_attention', operator: '<=', value: 1 }
          ]
        },
        narrative: `Der Zug hält. 23:47 Uhr.

Du bist unsichtbar geblieben. Hast dich zurückgehalten. Wenig berührt, wenig gesprochen, wenig gefragt.

Der Bahnsteig ist leer. Die Tür öffnet sich.

Für einen Moment überlegst du: Aussteigen? Jetzt, solange noch niemand schaut?

Aber Comp7s Worte hallen nach: „Kein Ausstieg seit Station 1."

Du weißt nicht, ob das eine Regel ist. Oder eine Warnung. Oder beides.

Die Tür schließt sich wieder.

Du bist geblieben. Weil Bleiben sicherer ist. Oder weil du keine Wahl hattest.

Die Uhr zeigt 23:47. Du bist seit Stunden unterwegs. Aber die Uhr sagt, du bist gerade erst angekommen.`,
        priority: 30
      },
      // GUILT PATH: Fallback for Guilt or mixed paths (priority 25)
      {
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 3
        },
        narrative: `Der Zug hält. 23:47 Uhr.

Der Bahnsteig ist leer. Dieselben Neonröhren. Dieselbe Anzeigetafel.

Du denkst an die Gestalt mit der Zeitung. An den Schlafloser. An Comp7 hinter ihrer Tür.

Alle gefangen. Wie du.

Der Gedanke drückt schwer auf deiner Brust: Wärst du nie eingestiegen, hätte sich irgendetwas geändert? Für sie? Für dich?

Die Tür öffnet sich. Niemand steigt ein. Niemand steigt aus.

Der Zug fährt weiter.

Die Uhr zeigt 23:47. Du bist seit Stunden unterwegs. Aber die Uhr sagt, du bist gerade erst angekommen.`,
        priority: 25
      }
    ],
    exit_effects: [
      { type: 'inc', target: 'memory_drift', value: 1 },
      { type: 'set', target: 'chapter_index', value: 2 }
    ],
    choices: [
      {
        id: 'continue_journey',
        label: 'Der Veränderung folgen',
        effects: [],
        next: 'c2_s01_ticket_search'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      '4 verschiedene Enden basierend auf Spielstil',
      'R1: memory_drift +1 automatisch',
      'Führt zu K2'
    ],
    atmosphere: 'somber'
  }
};
