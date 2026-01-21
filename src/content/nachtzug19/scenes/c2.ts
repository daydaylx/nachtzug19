// ============================================================================
// NACHTZUG 19 - Kapitel 2: Die erste Kontrolle
// ============================================================================
// Szenen (29):
// Setup: c2_s01_ticket_search, c2_s01_ticket_search_b, c2_s01a_passenger_examination, c2_s01b_ticket_pocket
// Interludes: c2_interlude_01_toilet, c2_interlude_02_window_dark, c2_interlude_03_announcement_glitch, c2_interlude_04_lights, c2_interlude_05_vibration
// Boy: c2_s02_boy_recorder, c2_s02a_recorder_listening, c2_s02b_corridor_anomaly, c2_s02b_corridor_anomaly_b, c2_s02c_boy_vanish
// Comp7: c2_s03_comp7_intro, c2_s03a_comp7_notebook, c2_s03b_comp7_warning
// Pre-Control: c2_s04_announcement, c2_s04_announcement_b, c2_s04a_conductor_approach, c2_s04a_conductor_approach_b, c2_s04b_passengers_shift
// Control: c2_control_01_approach, c2_control_01_question, c2_control_01_aftermath
// Post-Control: c2_s05a_sleepless_talk, c2_s05b_reality_shift
// End: c2_end_platform_watch, c2_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter2Scenes: ScenesCollection = {
  // ============================================================================
  // c2_s01_ticket_search: Ticket-Suche (Beat 1: Der Druck)
  // ============================================================================
  'c2_s01_ticket_search': {
    id: 'c2_s01_ticket_search',
    chapter: 2,
    title: 'Ohne Ticket',
    narrative: `Der Zug fährt weiter. Das Brummen ist konstant, tief, direkt in deinem Brustkorb.

Du gehst durch den Wagen. Der Schlaflose bleibt zurück, starrt wieder aus dem Fenster.

Seine Jacke ist jetzt schwarz. War sie nicht eben noch blau?

Ein kaltes Gefühl kriecht deinen Nacken hoch: Du hast kein Ticket.

Von weiter vorn kommt ein Metallklackern. Rhythmisch. Näher kommend.

Du weißt – ohne zu wissen woher – dass Kontrolle kommt. Bald.`,
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
        next: 'c2_s01_ticket_search_b'
      },
      {
        id: 'keep_walking',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s01_ticket_search_b'
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
  // c2_s01_ticket_search_b: Ticket-Suche (Beat 2: Der Junge)
  // ============================================================================
  'c2_s01_ticket_search_b': {
    id: 'c2_s01_ticket_search_b',
    chapter: 2,
    title: 'Beobachter',
    narrative: `Im nächsten Abteil sitzt ein Junge. Vielleicht zwölf Jahre alt.

Er trägt große Kopfhörer und hält einen alten Kassettenrekorder. Ein massives Ding aus den Achtzigern, Metallgehäuse, abgenutzte Tasten.

Er bemerkt dich nicht. Oder tut so.

Die Luft riecht nach kaltem Kaffee und Kunststoff. Der Boden klebt leicht unter deinen Sohlen.

Du hörst das leise Surren des Rekorders unter dem Brummen des Zuges.

Er wartet auf etwas.`,
    choices: [
      {
        id: 'ask_boy',
        label: 'Den Jungen ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'examine_passengers',
        label: 'Andere Passagiere ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      }
    ],
    tags: [],
    state_notes: [
      'Boy-Intro: Love-Ticket für Kontakt'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s01a_passenger_examination: Passagiere beobachten
  // ============================================================================
  'c2_s01a_passenger_examination': {
    id: 'c2_s01a_passenger_examination',
    chapter: 2,
    title: 'Die Anderen',
    narrative: `Du bleibst im Gang stehen und beobachtest die anderen.

Eine Frau liest eine Zeitung. Die Schlagzeile ist verschwommen – die Buchstaben bewegen sich wie Insekten auf dem Papier.

Ein Mann im Anzug tippt auf einem Laptop. Der Bildschirm zeigt nur pulsierendes, blaues Licht. Keine Zeichen.

Niemand redet. Niemand hustet. Sie bewegen sich in winzigen, mechanischen Gesten.

Haben sie Tickets? Oder tun sie nur so?`,
    choices: [
      {
        id: 'approach_newspaper_woman',
        label: 'Die Frau ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_interlude_01_toilet'
      },
      {
        id: 'decipher_headline',
        label: 'Die Schlagzeile fixieren',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_interlude_01_toilet'
      },
      {
        id: 'go_to_boy',
        label: 'Zum Jungen gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Drift-Detail: Bewegliche Buchstaben, leerer Screen'
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
    narrative: `Du greifst hektisch in deine Taschen.

Jackentasche: Leer.
Hosentasche: Leer.

Aber da ist ein Gefühl. Als *hättest* du etwas gehabt.

Du schließt kurz die Augen. Ein Bahnsteig blitzt auf. Kalt. Ein Automat. Hast du…?

Die Erinnerung kippt und verschwindet.

Als du die Augen öffnest, liegt ein Zettel in deiner Hand.

Darauf steht in deiner Handschrift: „Du hattest nie ein Ticket."`,
    choices: [
      {
        id: 'keep_note',
        label: 'Zettel behalten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_interlude_01_toilet'
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
      'Zettel erscheint aus dem Nichts',
      'Memory-Glitch manifestiert sich physisch'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_interlude_01_toilet: Toilette
  // ============================================================================
  'c2_interlude_01_toilet': {
    id: 'c2_interlude_01_toilet',
    chapter: 2,
    title: 'Spiegel',
    narrative: `Du flüchtest kurz in die Toilette am Gangende. Neonlicht flackert an.

Du siehst dich im Spiegel. Dein Gesicht.

Aber etwas stimmt nicht. Die Augen… zu dunkel?

Du blinzelst. Dein Spiegelbild blinzelt eine Sekunde später.

Du hebst die Hand. Das Spiegelbild wartet, dann hebt es sie auch.

Das Licht flackert. Aus. An. Dein Spiegelbild ist jetzt näher. Viel näher.

Dann geht das Licht aus.`,
    choices: [
      {
        id: 'stare_back',
        label: 'Standhalten',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'continue',
        label: 'Rausgehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Spiegelbild verzögert (Zeit/Identität Drift)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s02_boy_recorder: Kassettenjunge
  // ============================================================================
  'c2_s02_boy_recorder': {
    id: 'c2_s02_boy_recorder',
    chapter: 2,
    title: 'Das Angebot',
    narrative: `Der Junge nimmt die Kopfhörer ab.

„Du suchst ein Ticket," sagt er. Es ist keine Frage.

Du nickst stumm.

„Gibt's nicht. Niemand hat eins."

Er drückt auf Play. Ein Knistern, dann eine verzerrte Stimme: „—nächster Halt: [unverständlich]—"

„Die Station," sagt der Junge ernst. „Sie war mal da. Jetzt fehlt sie."

Er hält dir den Rekorder hin. „Behalt ihn. Vielleicht hilft's."`,
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
  // c2_s02a_recorder_listening: Kassette abhören
  // ============================================================================
  'c2_s02a_recorder_listening': {
    id: 'c2_s02a_recorder_listening',
    chapter: 2,
    title: 'Die Aufnahme',
    entry_effects: [
      { type: 'set', target: 'played_recorder', value: true }
    ],
    narrative: `Du nimmst das Gerät. Es ist schwer, kaltes Metall.

Du drückst Play.

„—erreichen in Kürze Bahnhof [NAME GELÖSCHT]—"

Der Name ist akustisch ausradiert. Ein Loch im Band.

„—steigen Sie bitte—[FEHLER]—nicht aus. Wiederholen: Nicht—"

Die Stimme wird tiefer, unmenschlich: „—Sie sind im NACHTZUG 19. Es gibt keinen Ausstieg."

Du stoppst das Band. Deine Hand zittert.

Als du aufblickst, ist der Junge weg. Das Abteil ist leer.`,
    choices: [
      {
        id: 'rewind_again',
        label: 'Zurückspulen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
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
      'Warnung: "Kein Ausstieg"',
      'Junge verschwindet plötzlich'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s02b_corridor_anomaly: Gang wird länger (Beat 1: Länge)
  // ============================================================================
  'c2_s02b_corridor_anomaly': {
    id: 'c2_s02b_corridor_anomaly',
    chapter: 2,
    title: 'Der Gang',
    narrative: `Du gehst weiter.

Der Gang ist länger. Viel länger als vorhin. Du zählst die Abteile: Sechs. Sieben. Acht. Neun.

Vorhin waren es vier.

Die Neonröhren flackern im Rhythmus des Zuges. Oder passt sich der Zug dem Licht an?

Du bleibst stehen. Drehst dich um. Hinter dir ist der Gang kurz.

Du hast das Gefühl, dass du dich in einer Geraden verlaufen hast.`,
    choices: [
      {
        id: 'count_compartments',
        label: 'Abteile zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly_b' // Changed next
      },
      {
        id: 'question_reality',
        label: '„Was passiert hier?"',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly_b' // Changed next
      },
      {
        id: 'ignore_geometry',
        label: 'Einfach weitergehen',
        effects: [],
        next: 'c2_s02b_corridor_anomaly_b'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Raumanomalie: Gang wächst'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s02b_corridor_anomaly_b: Gang (Beat 2: Anomalien)
  // ============================================================================
  'c2_s02b_corridor_anomaly_b': {
    id: 'c2_s02b_corridor_anomaly_b',
    chapter: 2,
    title: 'Veränderungen',
    narrative: `Der Schlaflose sitzt noch da.

Aber seine Jacke ist jetzt grün. War sie nicht schwarz?

Am Ende des schier endlosen Gangs brennt Licht in einem Abteil.

Die Tür steht halb offen.

Jemand sitzt drin.`,
    choices: [
      {
        id: 'check_sleepless',
        label: 'Zum Schlaflosen gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'approach_lit_compartment',
        label: 'Zum Licht gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Jackenfarbe ändert sich erneut',
      'Ziel: Abteil 7 (Licht)'
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

Nicht nur „er ist kurz weg". Sondern „nie benutzt".

Kein Kopfhörer. Kein Abdruck auf dem Sitz. Makellos sauber.

Die Frau mit der Zeitung schüttelt den Kopf, als du fragst. „Hier war nie ein Junge."

Aber du hältst den schweren Rekorder in der Hand.

Du drückst Play. Stille.

Dann, ganz leise, eine Kinderstimme: „Du erinnerst dich."`,
    choices: [
      {
        id: 'insist_boy_real',
        label: '„Er war hier!"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_interlude_02_window_dark'
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
  // c2_interlude_02_window_dark: Fenster
  // ============================================================================
  'c2_interlude_02_window_dark': {
    id: 'c2_interlude_02_window_dark',
    chapter: 2,
    title: 'Draußen',
    narrative: `Du gehst ans Fenster.

Draußen: Schwärze.

Aber jetzt… Strukturen. Organische Formen, die sich bewegen.

Du drückst dein Gesicht ans warme, feuchte Glas.

Die Form draußen kommt näher.

Es hat Augen.

Du springst zurück. Als du wieder hinsiehst: Nur Schwärze.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du gehst ans Fenster. Draußen: Dunkelheit.

Aber jetzt… Strukturen. Es pulsiert.

Du drückst dein Gesicht ans klamme Glas.

Die Form draußen kommt näher.

Es hat ein riesiges Auge.

Du springst zurück. Als du wieder hinsiehst: Nur Schwärze.`
      }
    ],
    choices: [
      {
        id: 'keep_staring',
        label: 'Hinschauen',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Halluzination oder Realität?'
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
    narrative: `Am Ende des Gangs sitzt eine Person.

Schatten über dem Gesicht. Vor ihr ein vollgeschriebenes Notizbuch.

„Du hast den Rekorder," sagt sie, ohne aufzublicken.

Sie hebt den Kopf. Ihr Gesicht ist unscharf – dein Blick rutscht ab, wenn du versuchst, sie zu fokussieren.

„Ich bin Comp7. Ich weiß meinen Namen nicht mehr."

Sie deutet auf den Rekorder.

„Du weißt deinen auch nicht, oder?"`,
    choices: [
      {
        id: 'ask_notebook',
        label: '„Was schreibst du?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'ask_name',
        label: '„Du hast ihn vergessen?"',
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
    state_notes: [
      'Comp7 eingeführt',
      'Gesicht nicht fokussierbar (Drift)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03a_comp7_notebook: Notizbuch untersuchen
  // ============================================================================
  'c2_s03a_comp7_notebook': {
    id: 'c2_s03a_comp7_notebook',
    chapter: 2,
    title: 'Das Logbuch',
    narrative: `Comp7 schiebt das Buch zu dir. „Lies."

Listen. Daten.

„Station 1: Leer. Station 2: Leer."
„Passagier #7: Jacke wechselt Farbe."
„Passagier #12: Junge verschwindet."

Und ganz unten:
„Passagier #[UNLESBAR]: Du? Hat Rekorder. Fühlt sich schuldig. Wird kontrolliert."

„Ich schreibe alles auf," sagt sie. „Damit ich nicht vergesse."

Sie blättert um. „Hier steht, was gleich passiert."`,
    choices: [
      {
        id: 'read_future',
        label: 'Nächste Seite lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03b_comp7_warning'
      },
      {
        id: 'refuse_knowledge',
        label: '„Ich will es nicht wissen"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_interlude_03_announcement_glitch'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Comp7 kennt die Zukunft/Loops'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03b_comp7_warning: Comp7 Warnung
  // ============================================================================
  'c2_s03b_comp7_warning': {
    id: 'c2_s03b_comp7_warning',
    chapter: 2,
    title: 'Warnung',
    narrative: `Du liest:

„Kontrolle 1. Schaffner fragt nicht nach Ticket. Er fragt nach dem *Grund*."

„Drei Wege: Ehrlichkeit, Flucht, oder Liebe."

Comp7 sieht dich an. „Er kommt."

Schwere Schritte im Gang. Rhythmisch.

„Viel Glück," flüstert sie und nimmt das Buch zurück.`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_interlude_03_announcement_glitch'
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
      'Hinweis auf Kontroll-Mechanik'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_interlude_03_announcement_glitch: Glitch
  // ============================================================================
  'c2_interlude_03_announcement_glitch': {
    id: 'c2_interlude_03_announcement_glitch',
    chapter: 2,
    title: 'Fehler',
    narrative: `Die Lautsprecher knacken.

„Sehr geehrte Fahr—[FEHLER]—"

Die Stimme überschlägt sich. „—erreichen—NACHTZUG 19—"

Dann deine eigene Stimme aus dem Lautsprecher: „—kann mich nicht erinnern—"

Stille.

Alle Passagiere starren nach oben. Reglos.

Dann bewegen sie sich wieder, als wäre nichts gewesen.`,
    choices: [
      {
        id: 'cover_ears',
        label: 'Ohren zuhalten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s04_announcement'
      },
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s04_announcement'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Audio-Glitch mit eigener Stimme'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s04_announcement: Zweite Durchsage (Beat 1: Die Nachricht)
  // ============================================================================
  'c2_s04_announcement': {
    id: 'c2_s04_announcement',
    chapter: 2,
    title: 'Kontrolle',
    narrative: `„Sehr geehrte Fahrgäste. Wir erreichen in Kürze [unverständlich]."

„Die nächste Kontrolle erfolgt in Wagen 1 bis 4."

Kontrolle.

Das Wort hängt schwer in der Luft. Dein Magen zieht sich zusammen.

Der Schlaflose dreht sich zu dir. „Hast du eine Geschichte?"`,
    choices: [
      {
        id: 'ask_story',
        label: '„Welche Geschichte?"',
        effects: [],
        next: 'c2_s04_announcement_b'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen',
        effects: [],
        next: 'c2_s04_announcement_b'
      }
    ],
    tags: [],
    state_notes: [
      'Split Part 1: Ankündigung'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04_announcement_b: Zweite Durchsage (Beat 2: Vorbereitung)
  // ============================================================================
  'c2_s04_announcement_b': {
    id: 'c2_s04_announcement_b',
    chapter: 2,
    title: 'Vorbereitung',
    narrative: `„Für den Schaffner," sagt der Schlaflose. „Er fragt nicht nach Tickets. Er fragt nach Geschichten."

Comp7 nickt von hinten. „Warum du hier bist. Das ist alles, was zählt."

Du musst dich entscheiden. Jetzt.`,
    choices: [
      {
        id: 'prepare_truth',
        label: '„Ich sage die Wahrheit"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'prepare_lie',
        label: '„Ich erfinde etwas"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'prepare_hide',
        label: '„Ich verstecke mich"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_s04b_passengers_shift'
      }
    ],
    tags: [],
    state_notes: [
      'Split Part 2: Strategie wählen'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04a_conductor_approach: Annäherung (Beat 1: Schritte)
  // ============================================================================
  'c2_s04a_conductor_approach': {
    id: 'c2_s04a_conductor_approach',
    chapter: 2,
    title: 'Schritte',
    narrative: `Schritte im Gang. Schwer. Rhythmisch.

Jeder Schlag ein hohles *Tock*.

Der Schaffner schiebt sich in dein Sichtfeld. Erst als Spiegelung im Fenster.

Er ist groß. Zu ruhig.

Er stoppt bei jedem Abteil. Kurzes Klacken der Kelle. Die anderen Passagiere reagieren wie Automaten.

Noch zwei Abteile.`,
    choices: [
      {
        id: 'stand_ready',
        label: 'Warten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach_b'
      },
      {
        id: 'move_back',
        label: 'Zurückweichen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach_b'
      }
    ],
    tags: [],
    state_notes: [
      'Split Part 1: Physische Bedrohung'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s04a_conductor_approach_b: Annäherung (Beat 2: Kontakt)
  // ============================================================================
  'c2_s04a_conductor_approach_b': {
    id: 'c2_s04a_conductor_approach_b',
    chapter: 2,
    title: 'Kontakt',
    narrative: `Die Luft riecht plötzlich nach Ozon und scharfem Reinigungsmittel.

Ein elektrisches Summen geht von ihm aus.

Comp7 flüstert: „Lauf nicht weg. Das macht es nur schlimmer."

Er ist da.

Du hast kein Ticket. Nur deine Geschichte.`,
    choices: [
      {
        id: 'face_him',
        label: 'Ihm entgegensehen',
        effects: [],
        next: 'c2_interlude_04_lights'
      },
      {
        id: 'look_down',
        label: 'Blick senken',
        effects: [],
        next: 'c2_interlude_04_lights'
      }
    ],
    tags: [],
    state_notes: [
      'Split Part 2: Unmittelbar vor Kontrolle'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s04b_passengers_shift: Verschiebung
  // ============================================================================
  'c2_s04b_passengers_shift': {
    id: 'c2_s04b_passengers_shift',
    chapter: 2,
    title: 'Verschiebung',
    narrative: `Du willst dich verstecken, aber die Passagiere… verschieben sich.

Wie Schachfiguren. Lautlos.

Der Mann sitzt jetzt dort, wo die Frau saß. Der Schlaflose ist drei Reihen weiter.

Comp7 ist weg. Abteil 7 ist leer.

Du drehst dich um. Der Schaffner steht direkt hinter dir.`,
    choices: [
      {
        id: 'face_conductor_forced',
        label: 'Umdrehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_control_01_approach'
      },
      {
        id: 'panic',
        label: 'Panik',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_approach'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Strafe für Fluchtversuch: Raumlogik bricht'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_interlude_04_lights: Licht
  // ============================================================================
  'c2_interlude_04_lights': {
    id: 'c2_interlude_04_lights',
    chapter: 2,
    title: 'Dunkelheit',
    narrative: `Licht aus. Alles schwarz.

Schritte. Nah.

Licht an.

Der Schaffner steht direkt vor dir.

„Fahrkarten bitte."`,
    choices: [
      {
        id: 'steady',
        label: 'Ruhig bleiben',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_approach'
      },
      {
        id: 'start_control',
        label: 'Beginnen',
        effects: [],
        next: 'c2_control_01_approach'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Übergang zur Kontrolle'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_approach: Kontrolle 1 (Beat 1: Status)
  // ============================================================================
  'c2_control_01_approach': {
    id: 'c2_control_01_approach',
    chapter: 2,
    title: 'Der Schaffner',
    narrative: `Er ist riesig. Die Uniform ohne Falten. Das Gesicht eine Wachsmaske.

„Fahrkarten bitte." Stimme wie aus einem Lautsprecher.

„Ich habe keine," sagst du.

Er starrt dich an. Zehn Sekunden.

Dann schaut er auf seine Kelle. Sie ist leer.

„Kein Ticket bedeutet keine Berechtigung."`,
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
    state_notes: [
      'Tension Loop Start'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_question: Kontrolle 1 (Beat 2: Die Frage)
  // ============================================================================
  'c2_control_01_question': {
    id: 'c2_control_01_question',
    chapter: 2,
    title: 'Das Verhör',
    narrative: `„Keine Berechtigung bedeutet Ausstieg," sagt er.

Er beugt sich vor. Du riechst kaltes Metall.

„Es sei denn, Sie haben einen Grund."

Die Zeit dehnt sich.

„Warum sind Sie hier?"`,
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
        label: '„Ich suche jemanden."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
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
      'Kern-Entscheidung des Kapitels'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_aftermath: Kontrolle 1 (Beat 3: Urteil)
  // ============================================================================
  'c2_control_01_aftermath': {
    id: 'c2_control_01_aftermath',
    chapter: 2,
    title: 'Das Urteil',
    narrative: `Er nickt. Mechanisch.

„Sie bleiben sitzen. Vorerst."

Er geht weiter.

Comp7 ist plötzlich wieder da. „Du hast es gesehen," flüstert sie. „Die Kelle war leer. Er erfindet alles."

Der Schlaflose dreht sich um: „Alles tut nur so. Wir auch."

Seine Jacke ist jetzt rot.`,
    choices: [
      {
        id: 'confront_sleepless',
        label: '„Deine Jacke… die Farbe."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s05a_sleepless_talk'
      },
      {
        id: 'ask_comp7_meaning',
        label: 'Comp7 ansehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s05b_reality_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kontrolle überstanden',
      'Drift wird offensichtlich (Jacke)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_s05a_sleepless_talk: Der Schlaflose
  // ============================================================================
  'c2_s05a_sleepless_talk': {
    id: 'c2_s05a_sleepless_talk',
    chapter: 2,
    title: 'Drift',
    narrative: `„Ja," sagt er müde. „Die Jacke ändert sich. Jedes Mal, wenn der Zug hält."

Er reibt den Stoff. „Vielleicht bin ich nicht mehr echt."

Er zeigt auf die Fenster.

„Der Zug erfindet uns neu. Bis wir vergessen, wer wir waren."`,
    choices: [
      {
        id: 'accept_truth',
        label: '„Ich glaube dir."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c2_interlude_05_vibration'
      },
      {
        id: 'reject_truth',
        label: '„Das ist unmöglich."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s05b_reality_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Drift-Erklärung'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_s05b_reality_shift: Draußen
  // ============================================================================
  'c2_s05b_reality_shift': {
    id: 'c2_s05b_reality_shift',
    chapter: 2,
    title: 'Spiegelung',
    narrative: `Du siehst aus dem Fenster.

Die Schwärze hat jetzt Strukturen.

Dann: Ein Gesicht. Dein Gesicht. Von draußen.

Es starrt dich an.

„Du hast es gesehen," sagt Comp7. „Dich selbst. Von außen."

Der Zug beginnt zu vibrieren. Stark.`,
    choices: [
      {
        id: 'ask_more',
        label: '„Was bedeutet das?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_interlude_05_vibration'
      },
      {
        id: 'ignore',
        label: 'Wegsehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_interlude_05_vibration'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Identity Drift'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_interlude_05_vibration: Vibration
  // ============================================================================
  'c2_interlude_05_vibration': {
    id: 'c2_interlude_05_vibration',
    chapter: 2,
    title: 'Bremse',
    narrative: `Der Boden vibriert in deinen Knochen.

Das Brummen wird lauter. Metall pulsiert unter deiner Hand.

Die Lampen flackern. An. Aus.

Dann: Stille.

Der Zug hält.`,
    choices: [
      {
        id: 'steady_breath',
        label: 'Durchatmen',
        effects: [
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_end_platform_watch'
      },
      {
        id: 'look_out',
        label: 'Hinaussehen',
        effects: [],
        next: 'c2_end_platform_watch'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Übergang zur Station'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_end_platform_watch: Station 2
  // ============================================================================
  'c2_end_platform_watch': {
    id: 'c2_end_platform_watch',
    chapter: 2,
    title: 'Der Bahnsteig',
    narrative: `23:47 Uhr. Wieder.

Der Bahnsteig ist leer.

Aber am Ende steht eine Gestalt.

Sie dreht sich zu dir. Hebt die Hand.

Winkt.

Dann geht das Licht aus. Als es wieder anspringt, ist sie weg.`,
    choices: [
      {
        id: 'tell_others',
        label: '„Da war jemand!"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'keep_silent',
        label: 'Schweigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_end_station'
      }
    ],
    tags: [],
    state_notes: [
      'Zeit-Loop: Immer 23:47',
      'Gestalt auf Bahnsteig'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_end_station: Ende Kapitel 2
  // ============================================================================
  'c2_end_station': {
    id: 'c2_end_station',
    chapter: 2,
    title: 'Veränderung',
    narrative: `Du drehst dich um.

Der Wagen hat sich verändert. Der Schlaflose sitzt weiter hinten.

Der Junge ist weg. Sein Abteil leer.

Comp7 schreibt. Sie blickt auf.

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
      'Kapitelende',
      'Meta-Kommentar von Comp7'
    ],
    atmosphere: 'somber'
  }
};