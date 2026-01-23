// ============================================================================
// NACHTZUG 19 - Kapitel 2: Die erste Kontrolle (REDUCED / P1 FIX)
// ============================================================================
// Szenen (15):
// Setup: c2_s01_ticket_search, c2_s01a_passenger_examination (Merged with b), c2_s01b_ticket_pocket
// Boy: c2_s02_boy_recorder, c2_s02a_recorder_listening, c2_s02b_corridor_anomaly (Merged), c2_s02c_boy_vanish
// Comp7: c2_s03_comp7_intro, c2_s03a_comp7_notebook (Merged warning)
// Control: c2_s04_announcement (Merged prep), c2_s04a_conductor_approach (Merged lights), c2_control_01_approach
// Control Interaction: c2_control_01_question, c2_control_01_aftermath
// End: c2_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter2Scenes: ScenesCollection = {
  // ============================================================================
  // c2_s01_ticket_search: Ticket-Suche
  // ============================================================================
  'c2_s01_ticket_search': {
    id: 'c2_s01_ticket_search',
    chapter: 2,
    title: 'Ohne Ticket',
    narrative: `Der Zug fährt weiter. Das Brummen ist konstant, tief.

Du gehst durch den Wagen. Der Schlaflose starrt aus dem Fenster. Seine Jacke ist jetzt schwarz. War sie nicht eben noch blau?

Ein kaltes Gefühl kriecht deinen Nacken hoch: Du hast kein Ticket.

Von weiter vorn kommt ein Metallklackern. Rhythmisch. Näher kommend. Kontrolle.`,
    choices: [
      {
        id: 'search_self',
        label: 'Taschen durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s01b_ticket_pocket'
      },
      {
        id: 'look_around',
        label: 'Umsehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      },
      {
        id: 'keep_walking',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      }
    ],
    tags: [],
    state_notes: [
      'Jacke des Schlaflosen wechselt (blau -> schwarz)',
      'Druck aufgebaut: Kontrolle kommt'
    ],
    atmosphere: 'normal'
  },

  // ============================================================================
  // c2_s01a_passenger_examination: Passagiere & Junge (Merged)
  // ============================================================================
  'c2_s01a_passenger_examination': {
    id: 'c2_s01a_passenger_examination',
    chapter: 2,
    title: 'Beobachter',
    narrative: `Du siehst dich um. Die anderen Passagiere bewegen sich in winzigen, mechanischen Gesten. Eine Frau liest eine Zeitung, deren Buchstaben wie Insekten über das Papier krabbeln.

Im nächsten Abteil sitzt ein Junge. Vielleicht zwölf. Er trägt große Kopfhörer und hält einen alten Kassettenrekorder.

Er bemerkt dich nicht. Oder tut so. Du hörst das leise Surren des Rekorders.`,
    choices: [
      {
        id: 'go_to_boy',
        label: 'Den Jungen ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'examine_passengers',
        label: 'Die Frau beobachten',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '<',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s01b_ticket_pocket'
      },
      {
        id: 'ignore_them',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Merged passenger exam with boy intro'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s01b_ticket_pocket: Taschen durchsuchen
  // ============================================================================
  'c2_s01b_ticket_pocket': {
    id: 'c2_s01b_ticket_pocket',
    chapter: 2,
    title: 'Suche',
    narrative: `Du greifst hektisch in deine Taschen. Leer.

Aber da ist ein Gefühl. Als *hättest* du etwas gehabt.

Du schließt kurz die Augen. Ein Bahnsteig blitzt auf. Ein Automat. Hast du…?

Die Erinnerung kippt und verschwindet. Als du die Augen öffnest, liegt ein Zettel in deiner Hand.

Darauf steht in deiner Handschrift: „Du hattest nie ein Ticket."`,
    choices: [
      {
        id: 'keep_note',
        label: 'Zettel behalten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'throw_away',
        label: 'Zettel zerreißen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Memory-Glitch manifestiert sich physisch'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s02_boy_recorder: Kassettenjunge
  // ============================================================================
  'c2_s02_boy_recorder': {
    id: 'c2_s02_boy_recorder',
    chapter: 2,
    title: 'Das Angebot',
    narrative: `Der Junge nimmt die Kopfhörer ab.

„Du suchst ein Ticket," sagt er. „Gibt's nicht. Niemand hat eins."

Er drückt auf Play. Ein Knistern, dann eine verzerrte Stimme: „—nächster Halt: [unverständlich]—"

„Die Station," sagt der Junge ernst. „Sie war mal da. Jetzt fehlt sie."

Er hält dir den Rekorder hin. „Behalt ihn. Vielleicht ist deine Stimme noch drauf."`,
    choices: [
      {
        id: 'take_recorder',
        label: 'Rekorder nehmen',
        effects: [
          { type: 'set', target: 'has_recorder', value: true },
          { type: 'set', target: 'played_recorder', value: true },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02a_recorder_listening'
      },
      {
        id: 'sit_silently',
        label: 'Sich kurz zu ihm setzen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02a_recorder_listening'
      },
      {
        id: 'refuse_recorder',
        label: 'Ablehnen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'ask_why',
        label: '„Warum gibst du mir das?"',
        effects: [
          { type: 'set', target: 'has_recorder', value: true },
          { type: 'set', target: 'played_recorder', value: true },
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c2_s02a_recorder_listening'
      }
    ],
    tags: [],
    state_notes: [
      'Rekorder erhalten (Key Item)',
      'Hinweis auf fehlende Stationen'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s02a_recorder_listening: Kassette abhören (PAYOFF FIX START)
  // ============================================================================
  'c2_s02a_recorder_listening': {
    id: 'c2_s02a_recorder_listening',
    chapter: 2,
    title: 'Die Stimme',
    entry_effects: [
      { type: 'set', target: 'played_recorder', value: true }
    ],
    narrative: `Du nimmst das Gerät. Es ist schwer, kaltes Metall.

Du drückst Play.

Zuerst nur Rauschen. Dann zwei Stimmen. Deine – jünger. Und eine zweite.

Emma.

„Warte am Bahnsteig," sagt sie. Ihre Stimme bricht. „Bitte komm zurück. Ich kann nicht ohne—"

Dann deine Stimme: „Emma, ich verspreche—"

Abbruch. Überschrieben von einem tiefen, mechanischen Brummen: „—NACHTZUG 19. Kein Ausstieg."

Du stoppst das Band. Dein Herz hämmert. Das war... vor dem Unfall.

Als du aufblickst, ist der Junge weg. Das Abteil ist leer.`,
    choices: [
      {
        id: 'rewind_again',
        label: 'Versuchen zurückzuspulen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'clutch_recorder',
        label: 'Das Gerät an dich drücken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s02c_boy_vanish'
      },
      {
        id: 'put_away',
        label: 'Weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02c_boy_vanish'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'FIX: Stimme des Verlorenen statt nur System-Audio',
      'Junge verschwindet plötzlich'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s02b_corridor_anomaly: Gang wird länger (Merged)
  // ============================================================================
  'c2_s02b_corridor_anomaly': {
    id: 'c2_s02b_corridor_anomaly',
    chapter: 2,
    title: 'Der Gang',
    narrative: `Du gehst weiter. Der Gang ist länger. Viel länger als vorhin. Du zählst die Abteile: Sechs. Sieben. Acht. Neun.

Der Schlaflose sitzt noch da. Aber seine Jacke ist jetzt grün. War sie nicht schwarz?

Am Ende des schier endlosen Gangs brennt Licht in einem Abteil. Die Tür steht halb offen. Jemand sitzt drin.`,
    choices: [
      {
        id: 'count_compartments',
        label: 'Abteile zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'approach_lit_compartment',
        label: 'Direkt zum Licht gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Merged corridor length and jacket color anomaly'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s02c_boy_vanish: Junge verschwindet
  // ============================================================================
  'c2_s02c_boy_vanish': {
    id: 'c2_s02c_boy_vanish',
    chapter: 2,
    title: 'Spurlos',
    narrative: `Du drehst dich nochmal um. Das Abteil des Jungen ist leer.

Nicht nur „er ist kurz weg". Sondern „nie benutzt". Kein Kopfhörer. Kein Abdruck auf dem Sitz. Makellos sauber.

Die Frau mit der Zeitung schüttelt den Kopf. „Hier war nie ein Junge."

Aber du hältst den schweren Rekorder in der Hand.`,
    choices: [
      {
        id: 'insist_boy_real',
        label: '„Er war hier!"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'doubt_self',
        label: 'An dir selbst zweifeln',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Realitätsverlust: Beweis (Rekorder) vs Umgebung'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s03_comp7_intro: Comp7
  // ============================================================================
  'c2_s03_comp7_intro': {
    id: 'c2_s03_comp7_intro',
    chapter: 2,
    title: 'Abteil 7',
    narrative: `Am Ende des Gangs sitzt eine Person. Comp7.

Vor ihr ein vollgeschriebenes Notizbuch. Ihr Gesicht ist unscharf – dein Blick rutscht ab.

„Du hast den Rekorder," sagt sie. „Ich bin Comp7. Ich weiß meinen Namen nicht mehr."

Sie deutet auf das Buch. „Ich schreibe alles auf. Damit ich nicht vergesse."`,
    choices: [
      {
        id: 'ask_notebook',
        label: '„Was steht drin?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'acknowledge_presence',
        label: 'Ihre Anwesenheit still anerkennen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'deny_amnesia',
        label: '„Ich weiß wer ich bin."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      }
    ],
    tags: [],
    state_notes: [],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03a_comp7_notebook: Notizbuch & Warnung (Merged)
  // ============================================================================
  'c2_s03a_comp7_notebook': {
    id: 'c2_s03a_comp7_notebook',
    chapter: 2,
    title: 'Das Logbuch',
    narrative: `Comp7 schiebt das Buch zu dir. Listen. Daten.

„Station 1: Leer. Station 2: Leer."
„Passagier #[UNLESBAR]: Du? Hat Rekorder. Wird kontrolliert."

Sie sieht dich an. „Er kommt. Der Schaffner. Er fragt nicht nach Ticket. Er fragt nach dem *Grund*."

Schwere Schritte im Gang. Rhythmisch.

„Drei Wege," flüstert sie. „Ehrlichkeit, Flucht, oder Liebe. Viel Glück."`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s04_announcement'
      },
      {
        id: 'leave_quickly',
        label: 'Schnell gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s04_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Merged intro with warning'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04_announcement: Ankündigung & Vorbereitung (Merged)
  // ============================================================================
  'c2_s04_announcement': {
    id: 'c2_s04_announcement',
    chapter: 2,
    title: 'Kontrolle',
    narrative: `Der Lautsprecher knackt.

„Sehr geehrte Fahrgäste. Wir erreichen in Kürze [unverständlich]. Kontrolle in Wagen 1 bis 4."

Das Wort hängt schwer in der Luft. Kontrolle.

Du musst dich entscheiden. Jetzt. Was sagst du ihm?`,
    choices: [
      {
        id: 'prepare_truth',
        label: 'Die Wahrheit (Erinnerungslücke)',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'prepare_lie',
        label: 'Eine Lüge erfinden',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'prepare_hide',
        label: 'Verstecken',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '<',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_s04a_conductor_approach'
      }
    ],
    tags: [],
    state_notes: [
      'Fixed attention check for hiding'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04a_conductor_approach: Annäherung (Merged Lights)
  // ============================================================================
  'c2_s04a_conductor_approach': {
    id: 'c2_s04a_conductor_approach',
    chapter: 2,
    title: 'Schritte',
    narrative: `Schritte im Gang. Schwer. Rhythmisch. Jeder Schlag ein hohles *Tock*.

Das Licht flackert. Aus. An. Aus.

Die Luft riecht nach Ozon.

Als das Licht wieder angeht, steht er direkt vor dir.

Riesig. Uniform ohne Falten. Gesicht eine Wachsmaske.

„Fahrkarten bitte."`,
    choices: [
      {
        id: 'face_him',
        label: 'Standhalten',
        effects: [
           { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_control_01_approach'
      },
      {
        id: 'look_down',
        label: 'Blick senken',
        effects: [],
        next: 'c2_control_01_approach'
      }
    ],
    tags: [],
    state_notes: [
      'Direct approach'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_approach: Kontrolle 1 Start
  // ============================================================================
  'c2_control_01_approach': {
    id: 'c2_control_01_approach',
    chapter: 2,
    title: 'Der Schaffner',
    narrative: `„Fahrkarten bitte." Stimme wie aus einem Lautsprecher.

„Ich habe keine," sagst du.

Er starrt dich an. Zehn Sekunden. Dann schaut er auf seine Kelle. Sie ist leer.

„Kein Ticket bedeutet keine Berechtigung. Es sei denn, Sie haben einen Grund."`,
    choices: [
      {
        id: 'wait_silent',
        label: 'Schweigen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_control_01_question'
      },
      {
        id: 'apologize',
        label: '„Es tut mir leid."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c2_control_01_question'
      }
    ],
    tags: ['control'],
    state_notes: [],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_question: Kontrolle 1 Frage (ATTENTION FIX)
  // ============================================================================
  'c2_control_01_question': {
    id: 'c2_control_01_question',
    chapter: 2,
    title: 'Das Verhör',
    narrative: `Er beugt sich vor. Du riechst kaltes Metall.

„Warum sind Sie hier?"

Die Zeit dehnt sich.`,
    choices: [
      {
        id: 'offer_truth',
        label: '„Ich erinnere mich nicht."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_aftermath'
      },
      {
        id: 'offer_search',
        label: '„Ich suche [NAME]."',
        condition: {
          type: 'bool',
          target: 'memory_search_active',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
        ],
        next: 'c2_control_01_aftermath'
      },
      {
        id: 'offer_lie',
        label: '„Ich besuche Verwandte."',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '<',
          value: 2
        },
        effects: [
           { type: 'inc', target: 'tickets_escape', value: 1 },
           { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_aftermath'
      },
      {
        id: 'use_recorder',
        label: 'Rekorder zeigen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_control_01_aftermath'
      }
    ],
    tags: ['control'],
    state_notes: [
      'Agency Fix: "Suche [NAME]" option added',
      'Attention Fix: Lie blocked if attention >= 2'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_aftermath: Kontrolle 1 Ende & Schlafloser
  // ============================================================================
  'c2_control_01_aftermath': {
    id: 'c2_control_01_aftermath',
    chapter: 2,
    title: 'Das Urteil',
    narrative: `Er nickt. Mechanisch. „Sie bleiben sitzen. Vorerst."

Er geht weiter.

Der Schlaflose dreht sich um: „Er erfindet alles. Wir auch."

Seine Jacke ist jetzt rot.

„Der Zug erfindet uns neu. Bis wir vergessen, wer wir waren."`,
    choices: [
      {
        id: 'accept_truth',
        label: '„Ich glaube dir."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'confront_jacket',
        label: '„Deine Jacke war eben noch schwarz."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_end_station'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Merged Aftermath with Sleepless Talk'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_end_station: Ende Kapitel 2 (Merged Platform Watch)
  // ============================================================================
  'c2_end_station': {
    id: 'c2_end_station',
    chapter: 2,
    title: 'Veränderung',
    narrative: `Der Zug hält. 23:47 Uhr. Wieder.

Der Bahnsteig ist leer. Aber am Ende steht eine Gestalt. Sie winkt.

Dann geht das Licht aus. Als es wieder anspringt, ist sie weg.

Du drehst dich um. Der Wagen hat sich verändert. Der Junge ist weg. Comp7 schreibt.

„Spieler hat Kontrolle 1 überstanden," sagt sie. „Geht weiter zu Kapitel 3."`,
    choices: [
      {
        id: 'continue_chapter_3',
        label: 'Weiter',
        effects: [
          { type: 'set', target: 'chapter_index', value: 3 }
        ],
        next: 'c3_s01_wagen7_locked'
      },
      {
        id: 'play_recorder_end',
        label: 'Rekorder abspielen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 3 },
          { type: 'set', target: 'played_recorder', value: true }
        ],
        next: 'c3_s01_wagen7_locked'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Kapitelende'
    ],
    atmosphere: 'somber'
  }
};
