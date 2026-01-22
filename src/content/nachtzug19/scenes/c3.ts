// ============================================================================
// NACHTZUG 19 - Kapitel 3: Wagen 7 (REDUCED / P1 FIX)
// ============================================================================
// Szenen (15):
// Entry: c3_s01_wagen7_locked (Merged), c3_s01a_after_station, c3_s01b_boy_return
// Recorder: c3_s02_recorder_anomaly, c3_s02a_recorder_listening
// Drift: c3_s02b_corridor_shift (Merged Sleepless)
// Wagen 7: c3_s03_wagen7_approach (Merged door), c3_s03b_inside_comp7 (Merged with B), c3_s03c_notebooks_explore
// Truth: c3_s04_comp7_truth (Merged with B & Paradox)
// Pre-Control: c3_s04b_third_announcement, c3_control_02_approach
// Control: c3_control_02_question (Merged), c3_control_02_aftermath
// End: c3_end_station (Merged)
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter3Scenes: ScenesCollection = {
  // ============================================================================
  // c3_s01_wagen7_locked: Einstieg (Merged)
  // ============================================================================
  'c3_s01_wagen7_locked': {
    id: 'c3_s01_wagen7_locked',
    chapter: 3,
    title: 'Verschlossen',
    narrative: `Du stehst vor einer Tür am Ende des Gangs. Auf der Tür ist eine 7 handgemalt. Verschlossen.

In deinem Kopf flackert ein Bild dieser Tür auf, aber sie ist offen.

Du lehnst die Stirn gegen das Holz; der Lack riecht süßlich. Als du dich umdrehst, wirkt der Gang unnatürlich lang.`,
    choices: [
      {
        id: 'try_to_open',
        label: 'Daran rütteln',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'knock_on_door',
        label: 'Anklopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'turn_around',
        label: 'Sich umsehen',
        effects: [],
        next: 'c3_s01a_after_station'
      }
    ],
    tags: ['setup'],
    state_notes: ['Wagen 7 Barriere eingeführt'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01a_after_station: Nach Station
  // ============================================================================
  'c3_s01a_after_station': {
    id: 'c3_s01a_after_station',
    chapter: 3,
    title: 'Nach dem Halt',
    narrative: `Der Zug gleitet lautlos weiter.

Der Schlaflose sitzt drei Reihen weiter hinten; seine Jacke ist jetzt tiefschwarz. In Comp7s leerem Abteil liegt ein Notizbuch.

Auf der Seite steht: „Passagier #[UNLESBAR]: Sucht nach [NAME]. Findet Wagen 7.“`,
    choices: [
      {
        id: 'read_notebook',
        label: 'Darin lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      },
      {
        id: 'ignore_notebook',
        label: 'Liegen lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      }
    ],
    tags: ['drift_seed'],
    state_notes: ['Notizbuch Vorhersage'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01b_boy_return: Junge
  // ============================================================================
  'c3_s01b_boy_return': {
    id: 'c3_s01b_boy_return',
    chapter: 3,
    title: 'Rückkehr',
    narrative: `Der Junge sitzt wieder in seinem Abteil, als wäre er nie weg gewesen. Er hält den Kassettenrekorder.

„Manchmal werden Dinge mehr,“ sagt er mit einer Stimme, die viel zu alt klingt. „Wenn man vergisst, dass man sie schon hat.“`,
    choices: [
      {
        id: 'play_own_recorder',
        label: 'Eigenen Rekorder prüfen',
        condition: { type: 'bool', target: 'has_recorder', value: true },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'played_recorder', value: true }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'share_silence',
        label: 'Kurz mit ihm schweigen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'listen_to_his',
        label: '„Was meinst du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Duplizierung von Gegenständen'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s02_recorder_anomaly: Aufnahme
  // ============================================================================
  'c3_s02_recorder_anomaly': {
    id: 'c3_s02_recorder_anomaly',
    chapter: 3,
    title: 'Die Aufnahme',
    narrative: `Du drückst auf Play.

Eine Stimme schält sich aus dem Rauschen – es ist deine eigene. Du hörst Dinge, die du noch nicht ausgesprochen hast.

Der Junge nickt langsam: „Der Zug zeichnet alles auf. Vergangenheit und Zukunft.“`,
    choices: [
      {
        id: 'listen_more',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s02a_recorder_listening'
      },
      {
        id: 'stop_recorder',
        label: 'Stoppen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Kassette ist Meta-Log'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s02a_recorder_listening: Aufnahme Fortsetzung
  // ============================================================================
  'c3_s02a_recorder_listening': {
    id: 'c3_s02a_recorder_listening',
    chapter: 3,
    title: 'Zukunft',
    narrative: `Comp7s Stimme auf dem Band: „Er muss etwas geben. Etwas von sich abspalten.“

Dann ein Geräusch wie brechendes Eis.

Der Junge nimmt dir das Gerät sanft aus der Hand: „Manche Antworten stehen noch nicht drauf.“`,
    choices: [
      {
        id: 'ask_what_answer',
        label: '„Welche Antwort?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'has_recorder', value: false }
        ],
        next: 'c3_s02b_corridor_shift'
      },
      {
        id: 'take_recorder_back',
        label: 'Gerät zurücknehmen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'set', target: 'has_recorder', value: true }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Prophezeiung der Opferung'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s02b_corridor_shift: Gang & Schlafloser (Merged)
  // ============================================================================
  'c3_s02b_corridor_shift': {
    id: 'c3_s02b_corridor_shift',
    chapter: 3,
    title: 'Verschiebung',
    narrative: `Der Gang hat sich verändert. Türennummern stimmen nicht mehr.

Der Schlaflose steht im Gang. Er wirkt blass.

„Du suchst Wagen 7,“ sagt er. „Die Tür ist jetzt offen. Aber du musst etwas opfern, wenn die Kontrolle kommt.“`,
    choices: [
      {
        id: 'ask_what_to_give',
        label: '„Was opfern?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      },
      {
        id: 'ignore_warning',
        label: 'Ignorieren und weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Raum-Reorganisation'],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s03_wagen7_approach: Annäherung (Merged Door)
  // ============================================================================
  'c3_s03_wagen7_approach': {
    id: 'c3_s03_wagen7_approach',
    chapter: 3,
    title: 'Die Sieben',
    narrative: `Der Gang endet an der Tür mit der massiven 7.

Die Zahl flimmert. Die Tür ist einen Spaltbreit angelehnt. Warmes Licht. Geruch nach Papier.

Du hörst Comp7s Stimme: „Komm rein. Ich weiß, dass du da bist.“`,
    choices: [
      {
        id: 'enter_immediately',
        label: 'Eintreten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      },
      {
        id: 'hesitate',
        label: 'Zögern',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      }
    ],
    tags: ['setup'],
    state_notes: ['Wagen 7 Eintritt'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03b_inside_comp7: Drinnen (Merged)
  // ============================================================================
  'c3_s03b_inside_comp7': {
    id: 'c3_s03b_inside_comp7',
    chapter: 3,
    title: 'Wagen 7',
    narrative: `Das Abteil ist eine Kathedrale aus Notizbüchern. Der Raum ist innen größer als der ganze Wagen.

Comp7 sitzt an einem massiven Holztisch und schreibt. Ihr Gesicht ist klarer geworden, eine feine Narbe am Kinn.

„Willkommen,“ sagt sie. „Du bist spät. Oder zu früh.“`,
    choices: [
      {
        id: 'ask_comp7_explain',
        label: '„Was ist das hier?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s03c_notebooks_explore'
      },
      {
        id: 'touch_table',
        label: 'Ehrfürchtig den Tisch berühren',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s03c_notebooks_explore'
      },
      {
        id: 'examine_notebooks',
        label: 'Die Bücher ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03c_notebooks_explore'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Raum-Eindruck & Dialog'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03c_notebooks_explore: Notizbücher
  // ============================================================================
  'c3_s03c_notebooks_explore': {
    id: 'c3_s03c_notebooks_explore',
    chapter: 3,
    title: 'Aufzeichnungen',
    narrative: `Du blätterst in den Aufzeichnungen: „Passagier #7: Opferung abgelehnt. Bleibt.“

Ein Foto zeigt den Bahnsteig. Du erkennst deine eigene Kleidung, aber das Gesicht ist leer.

„Du bist schon mal hier gewesen,“ flüstert Comp7.`,
    choices: [
      {
        id: 'examine_photo',
        label: 'Foto fixieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'photo_anomaly', value: true }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'ask_when',
        label: '„Wann?"',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Loop Beweis'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s04_comp7_truth: Wahrheit & Paradox (Merged)
  // ============================================================================
  'c3_s04_comp7_truth': {
    id: 'c3_s04_comp7_truth',
    chapter: 3,
    title: 'Die Schleife',
    narrative: `„Der NACHTZUG 19 fährt im Kreis,“ sagt sie. „Von A nach A. Weil jemand nicht aussteigen will.“

Sie zeigt aus dem Fenster. Dort, im Gang des Zuges, stehst du selbst und starrst zurück in dieses Abteil. Deine Jacke hat eine andere Farbe.

„Schleife,“ sagt Comp7. „Innen ist außen.“`,
    choices: [
      {
        id: 'accept_truth',
        label: 'Verstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'deny_truth',
        label: '„Unmöglich."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'ask_who_stays',
        label: '„Wer will nicht aussteigen?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Schleifen-Enthüllung & Paradox'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s04b_third_announcement: Durchsage 3
  // ============================================================================
  'c3_s04b_third_announcement': {
    id: 'c3_s04b_third_announcement',
    chapter: 3,
    title: 'Ankündigung',
    narrative: `Die Lautsprecher kreischen: „Kontrolle-Kontrolle-Kontrolle!“

Comp7 steht auf, Hände zitternd. „Sie kommen wieder. Du brauchst die richtige Antwort.“

Schwere Schritte.`,
    choices: [
      {
        id: 'go_to_control',
        label: 'Rausgehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'hide_in_comp7',
        label: 'Verstecken',
        condition: { type: 'compare', target: 'conductor_attention', operator: '<', value: 2 },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_approach'
      }
    ],
    tags: [],
    state_notes: ['Kontrolle 2 Vorbereitung'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_approach: Annäherung
  // ============================================================================
  'c3_control_02_approach': {
    id: 'c3_control_02_approach',
    chapter: 3,
    title: 'Die Ankunft',
    narrative: `Der Schaffner steht vor der Tür. Seine Uniform unnatürlich weiß.

Er schaut direkt zu dir: „Fahrkarten bitte.“`,
    choices: [
      {
        id: 'step_outside',
        label: 'Hinaustreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'trust_comp7',
        label: 'Bei Comp7 bleiben',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_control_02_question'
      }
    ],
    tags: ['control'],
    state_notes: ['Schaffner Präsenz'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_question: Befragung (Merged & Fixed)
  // ============================================================================
  'c3_control_02_question': {
    id: 'c3_control_02_question',
    chapter: 3,
    title: 'Das Verhör',
    narrative: `Auf seiner Kelle steht: „Passagier ohne Ticket. Station 3.“

„Warum sind Sie hier?"

Er deutet auf deine Tasche. „Mit der Wahrheit. Mit dem Gerät. Oder mit jemandem.“

Du musst jetzt etwas geben.`,
    choices: [
      {
        id: 'offer_recorder',
        label: 'Rekorder geben',
        condition: { type: 'bool', target: 'has_recorder', value: true },
        effects: [
          { type: 'set', target: 'has_recorder', value: false },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_truth',
        label: '„Ich will zurück."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_search',
        label: '„Ich suche [NAME]."',
        condition: { type: 'bool', target: 'memory_search_active', value: true },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
        ],
        next: 'c3_control_02_aftermath'
      }
    ],
    tags: ['control'],
    state_notes: [
      'Opfer-Wahl',
      'Added Agency "Search"'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_aftermath: Nachwirkung
  // ============================================================================
  'c3_control_02_aftermath': {
    id: 'c3_control_02_aftermath',
    chapter: 3,
    title: 'Das Urteil',
    narrative: `„Die Antwort ist notiert,“ sagt er monoton. „Aber sie reicht nicht.“

Er geht.

Comp7 tritt neben dich: „Er kann dich nicht rauswerfen, weil wir alle bereits draußen sind.“

Der Wagen um euch herum wird plötzlich leer. Kein Junge, kein Schlafloser. Nur leere Sitze.`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'search_train',
        label: 'Nach den anderen suchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_end_station'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Kontrolle 2 überstanden'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_station: Ende (Merged)
  // ============================================================================
  'c3_end_station': {
    id: 'c3_end_station',
    chapter: 3,
    title: 'Dritter Halt',
    narrative: `Der Zug hält. Draußen steht eine Gestalt, deren Mantel sich bewegt. Sie sieht aus wie du.

Die Tür öffnet sich und die Gestalt steigt ein. Sie geht wortlos an dir vorbei und setzt sich.

„Die Aufnahme ist fertig,“ sagt der Junge, der plötzlich wieder da ist. Er wirkt alt.`,
    choices: [
      {
        id: 'continue_to_chapter_4',
        label: 'Weiter',
        effects: [
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c4_s01_mirror_intro'
      }
    ],
    tags: ['station_end'],
    state_notes: ['Identity Drift: Doppelgänger'],
    atmosphere: 'dark'
  }
};
