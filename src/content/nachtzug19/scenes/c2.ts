// ============================================================================
// NACHTZUG 19 - Kapitel 2: Die erste Kontrolle (REDUCED / P1 FIX)
// ============================================================================
// Szenen (18):
// Setup: c2_s01_ticket_search, c2_s01a_passenger_examination, c2_s01b_ticket_pocket, c2_s01c_corridor_chill
// Boy: c2_s02_boy_recorder, c2_s02a_recorder_listening, c2_s02b_corridor_anomaly, c2_s02c_boy_vanish, c2_s02b1_door_numbers
// Comp7: c2_s03_comp7_intro, c2_s03a_comp7_notebook
// Control: c2_s04_announcement, c2_s04b_breath_control, c2_s04a_conductor_approach, c2_control_01_approach
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
    atmosphere: 'tense'
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
        next: 'c2_s01c_corridor_chill'
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
        next: 'c2_s01c_corridor_chill'
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
        next: 'c2_s01c_corridor_chill'
      },
      {
        id: 'throw_away',
        label: 'Zettel zerreißen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s01c_corridor_chill'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Memory-Glitch manifestiert sich physisch'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // c2_s01c_corridor_chill: Kälte im Gang (Interlude)
  // ==========================================================================
  'c2_s01c_corridor_chill': {
    id: 'c2_s01c_corridor_chill',
    chapter: 2,
    title: 'Kältezug',
    narrative: `Du gehst in den Gang. Das Metall unter deinen Schuhen wirkt kälter als zuvor.

Ein Zugwind streicht an dir vorbei, obwohl keine Tür offen ist. Die Fenster spiegeln dich nur halb – als wäre der Rest deines Gesichts noch unterwegs.

Aus der Ferne hörst du das Surren des Kassettenrekorders wieder.`,
    narrative_variants: [
      {
        condition: { type: 'compare', target: 'rel_boy', operator: '>=', value: 1 },
        narrative: `Du gehst in den Gang. Das Metall unter deinen Schuhen wirkt kälter als zuvor.

Der Junge. Du hast ihn angesprochen — und jetzt trägst du sein Schweigen mit dir. Seine großen Augen, die dich nicht angesehen haben, die durch dich hindurch gesehen haben. Er weiß etwas. Oder er ist etwas. Die Kopfhörer. Das Surren.

Ein Zugwind streicht an dir vorbei. Die Fenster spiegeln dich nur halb. Und für einen Moment, ganz kurz, spiegeln sie auch den Jungen — obwohl er nicht hinter dir steht.

Das Surren des Kassettenrekorders. Näher jetzt. Als würde es dich rufen.`
      },
      {
        condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 1 },
        narrative: `Du gehst in den Gang. Der Zettel in deiner Tasche — „Du hattest nie ein Ticket" — fühlt sich schwerer an, als Papier sein sollte. Deine eigene Handschrift. Wann hast du das geschrieben?

Das Metall unter deinen Schuhen ist kalt. Ein Zugwind streicht vorbei. Die Fenster spiegeln dich nur halb — und der fehlende Teil deines Gesichts sieht aus wie jemand anderes.

Du greifst nach dem Zettel. Er ist noch da. Beweis, dass etwas nicht stimmt. Beweis, den du behalten hast.

Aus der Ferne: das Surren des Kassettenrekorders.`
      }
    ],
    choices: [
      {
        id: 'follow_sound',
        label: 'Dem Surren folgen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'steady_breath',
        label: 'Tief durchatmen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Interlude: Kälte & Spiegelbild-Anomalie'
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
    narrative: `Dem Surren folgend bleibst du vor dem Jungen stehen. Er nimmt die Kopfhörer ab. Langsam. Als wäre es ein Ritual.

Er sieht dich an. Große Augen. Zu alt für sein Gesicht.

„Ticket." Ein Wort. Kein Fragezeichen. „Gibt's nicht."

Er drückt Play. Knistern. Dann eine Stimme, verzerrt, tief: „—nächster Halt: [unverständlich]—"

„Weg." Er zeigt auf den Rekorder. „Die Station. War da. Ist weg." Jedes Wort wie ein Stein, den er vorsichtig ablegt. Keine Erklärung. Keine Entschuldigung. Nur Fakten, so wie ein Kind Fakten sieht — ohne Zweifel.

Er hält dir den Rekorder hin. Kein Zögern.

„Für dich. Deine Stimme. Ist noch drauf." Und dann, leiser, fast unhörbar: „Du klingst traurig darauf."`,
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
      { type: 'set', target: 'has_recorder', value: true },
      { type: 'set', target: 'played_recorder', value: true }
    ],
    narrative: `Du nimmst das Gerät. Es ist schwer, kaltes Metall.

Du drückst Play.

Zuerst nur Rauschen. Dann zwei Stimmen. Deine – jünger. Und eine zweite.

Emma.

„Warte am Bahnsteig," sagt Emma. Emmas Stimme bricht. „Bitte komm zurück. Ich kann nicht ohne—"

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
        next: 'c2_s02b1_door_numbers'
      },
      {
        id: 'approach_lit_compartment',
        label: 'Direkt zum Licht gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s02b1_door_numbers'
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

Die Frau mit der Zeitung schüttelt den Kopf. „Hier *sollte* keiner gewesen sein."

Aber du hältst den schweren Rekorder in der Hand.`,
    choices: [
      {
        id: 'insist_boy_real',
        label: '„Er war hier!"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s02b1_door_numbers'
      },
      {
        id: 'doubt_self',
        label: 'An dir selbst zweifeln',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c2_s02b1_door_numbers'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Realitätsverlust: Beweis (Rekorder) vs Umgebung'
    ],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // c2_s02b1_door_numbers: Nummern rutschen (Interlude)
  // ==========================================================================
  'c2_s02b1_door_numbers': {
    id: 'c2_s02b1_door_numbers',
    chapter: 2,
    title: 'Verrutscht',
    narrative: `Die Wagennummern stimmen nicht mehr. Aus einer 3 wird eine 8, aus einer 6 eine 9.

Die Zahlen klirren leise, als wären sie aus Glas. Du blinzelst – und sie sitzen wieder fest.`,
    choices: [
      {
        id: 'trace_numbers',
        label: 'Mit dem Finger nachzeichnen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'ignore_shift',
        label: 'Ignorieren und weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Drift-Symptom: Nummern verschieben sich'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03_comp7_intro: Comp7
  // ============================================================================
  'c2_s03_comp7_intro': {
    id: 'c2_s03_comp7_intro',
    chapter: 2,
    title: 'Abteil 7',
    narrative: `Ende des Gangs. Dort sitzt eine Person. Nicht „sitzt" — arbeitet. Ihre Hände bewegen sich über ein Notizbuch wie ein Chirurg über einen Patienten. Schnell. Präzise. Kein Zögern.

Du öffnest den Mund.

„Nicht." Ein Wort. Wie eine Tür, die zuschlägt. Sie schreibt weiter. Drei Sekunden. Fünf. Dann der Stift, abgelegt. Genau parallel zur Buchkante.

Sie sieht dich an. Kurz. Taxierend. Wie jemand, der Daten sammelt, nicht Blicke.

„Comp7. Kein Name. Irrelevant." Stakkato. Jedes Wort einzeln, als würde sie es wiegen. „Du. Rekorder. Passagier seit Station eins. Kein Ticket." Sie tippt auf das Notizbuch. „Steht alles hier."

Ihr Gesicht ist merkwürdig unscharf — dein Blick rutscht ab, als wäre er geölt. Aber ihre Stimme ist das Schärfste in diesem Zug.

„Ich schreibe. Damit die Drift nicht gewinnt. Verstehst du Drift?" Sie wartet nicht auf deine Antwort. „Noch nicht. Wirst du."`,
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
    state_notes: ['M1.2: Comp7 zeigt Ungeduld/Angst → menschlicher'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03a_comp7_notebook: Notizbuch & Warnung (Merged)
  // ============================================================================
  'c2_s03a_comp7_notebook': {
    id: 'c2_s03a_comp7_notebook',
    chapter: 2,
    title: 'Das Logbuch',
    narrative: `Comp7 schiebt das Buch zu dir. Kein Angebot — ein Befehl.

Listen. Tabellen. Zahlenkolonnen. Ihre Handschrift ist winzig, geometrisch, jeder Buchstabe gleich hoch.

„Station 1: 0 Passagiere ausgestiegen. Station 2: 0." Sie tippt auf die Einträge. „19 Stationen. 19 Passagiere. Kein Zufall. Muster."

Unten auf der Seite, in einer anderen Tinte: „Passagier #[UNLESERLICH]: Rekorder. Wird kontrolliert. Überlebenswahrscheinlichkeit: gering."

„Er kommt." Kein Flüstern — sachlich, wie eine Durchsage. „Der Schaffner. Fragt nicht nach Ticket. Fragt nach dem Grund."

Schwere Schritte. Rhythmisch. 2-Sekunden-Intervall.

„Drei Antworten funktionieren." Sie zählt an den Fingern ab. „Wahrheit. Flucht. Verbindung." Dann, fast beiläufig: „Ich habe alle drei versucht. Bin immer noch hier."`,
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
    narrative: `Kaum hast du dich von Comp7 gelöst, knackt der Lautsprecher.

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
        next: 'c2_s04b_breath_control'
      },
      {
        id: 'prepare_lie',
        label: 'Eine Lüge erfinden',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s04b_breath_control'
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
        next: 'c2_s04b_breath_control'
      }
    ],
    tags: [],
    state_notes: [
      'Fixed attention check for hiding'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // c2_s04b_breath_control: Zwischen Moment (Interlude)
  // ==========================================================================
  'c2_s04b_breath_control': {
    id: 'c2_s04b_breath_control',
    chapter: 2,
    title: 'Ein Atemzug',
    narrative: `Der Gang scheint enger zu werden. Du hörst das Klacken der Kelle – näher, näher.

Dein Atem beschlägt die Luft vor dir. Für einen Moment siehst du den Abdruck deiner Lippen darin.`,
    choices: [
      {
        id: 'steady_posture',
        label: 'Haltung annehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'shrink_back',
        label: 'Einen Schritt zurück',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Kontrolle 1'
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
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
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
        label: '„Ich suche Emma."',
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
      'Agency Fix: "Suche Emma" option added',
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
        next: 'c2_control_01_aftertalk'
      },
      {
        id: 'confront_jacket',
        label: '„Deine Jacke war eben noch schwarz."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_control_01_aftertalk'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Merged Aftermath with Sleepless Talk'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk: Optionaler Mini-Dialog nach Kontrolle 1
  // ============================================================================
  'c2_control_01_aftertalk': {
    id: 'c2_control_01_aftertalk',
    chapter: 2,
    title: 'Ein Satz im Gang',
    narrative: `Der Schlaflose bleibt neben dir im Gang stehen.

Das Rattern wirkt für einen Moment fern, als würde der Zug euch zuhören.

„Bevor wir weiterfahren," sagt er leise, „sag irgendwas Echtes."`,
    choices: [
      {
        id: 'ask_his_name',
        label: '„Wie hießest du, bevor das alles anfing?"',
        effects: [
          { type: 'set', target: 'mut', value: 1 }
        ],
        next: 'c2_control_01_aftertalk_name'
      },
      {
        id: 'say_emma_name',
        label: '„Ich suche Emma. Das ist das Einzige, das noch klar ist."',
        effects: [
          { type: 'set', target: 'mut', value: 2 }
        ],
        next: 'c2_control_01_aftertalk_emma'
      },
      {
        id: 'share_silence',
        label: 'Nichts sagen und nur neben ihm stehen',
        effects: [
          { type: 'set', target: 'mut', value: 3 }
        ],
        next: 'c2_control_01_aftertalk_silence'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Agency: optionaler Mini-Dialog ohne System-Einfluss',
      'Alle Optionen rekombinieren in c2_end_station'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk_name: Reaktion auf Namensfrage
  // ============================================================================
  'c2_control_01_aftertalk_name': {
    id: 'c2_control_01_aftertalk_name',
    chapter: 2,
    title: 'Ein verlorener Name',
    narrative: `Der Schlaflose blinzelt, als hättest du ihn geweckt.

„Ich hatte mal einen," sagt er nach einer Weile. „Er lag mir immer auf der Zunge. Jetzt ist da nur Metallgeschmack."

Dann nickt er Richtung Fenster. „Wenn deiner noch da ist, halt ihn fest."`,
    choices: [
      {
        id: 'move_on_after_name',
        label: 'Weiter',
        next: 'c2_end_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Namensfrage',
      'Rekombination in c2_end_station'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk_emma: Reaktion auf Emma-Bekenntnis
  // ============================================================================
  'c2_control_01_aftertalk_emma': {
    id: 'c2_control_01_aftertalk_emma',
    chapter: 2,
    title: 'Ein Name bleibt',
    narrative: `Bei „Emma" zuckt etwas in seinem Gesicht, kaum sichtbar.

„Gut," murmelt er. „Dann gibt es wenigstens einen Punkt, der nicht verrutscht."

Er tippt dir kurz gegen den Ärmel. „Sprich den Namen weiter. Sonst nimmt ihn der Zug."`,
    choices: [
      {
        id: 'move_on_after_emma',
        label: 'Den Namen im Kopf wiederholen',
        next: 'c2_end_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Emma-Bekenntnis',
      'Rekombination in c2_end_station'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk_silence: Reaktion auf Schweigen
  // ============================================================================
  'c2_control_01_aftertalk_silence': {
    id: 'c2_control_01_aftertalk_silence',
    chapter: 2,
    title: 'Geteilte Stille',
    narrative: `Du sagst nichts.

Der Schlaflose sagt auch nichts. Ihr steht nur da, während der Zug durch euch hindurch zu fahren scheint.

Nach ein paar Atemzügen flüstert er: „Vielleicht reicht das schon. Nicht allein zu schweigen."`,
    choices: [
      {
        id: 'move_on_after_silence',
        label: 'Weiter',
        next: 'c2_end_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: geteiltes Schweigen',
      'Rekombination in c2_end_station'
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

Ohne aufzublicken sagt sie: „Du hast die erste Kontrolle überstanden. Beim nächsten Halt wird es enger.“`,
    choices: [
      {
        id: 'continue_chapter_3',
        label: 'Der Veränderung folgen',
        effects: [
          { type: 'set', target: 'chapter_index', value: 3 }
        ],
        next: 'c2_end_station_callback'
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
        next: 'c2_end_station_callback'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Kapitelende'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_end_station_callback: Später Callback auf Kontrolle-Dialog
  // ============================================================================
  'c2_end_station_callback': {
    id: 'c2_end_station_callback',
    chapter: 2,
    title: 'Nachhall',
    narrative: `Der Zug setzt sich wieder in Bewegung.

Für einen Moment denkst du an das, was gerade im Gang zwischen euch stand.

Nicht als Information.

Als Haltung.`,
    narrative_variants: [
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 1
        },
        narrative: `Der Zug setzt sich wieder in Bewegung.

Dir bleibt sein Blick, als du nach seinem Namen gefragt hast.

Als hättet ihr beide gemerkt, dass Erinnern nicht mit Fakten beginnt, sondern mit der Frage, ob man noch jemand sein darf.

Dann rattert der Wagen weiter.`
      },
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 2
        },
        narrative: `Der Zug setzt sich wieder in Bewegung.

„Emma" hallt in dir nach wie ein kleiner fester Punkt in einem verrutschenden Raum.

Du merkst: Solange ein Name bleibt, bleibt auch Richtung.

Dann schluckt das Rattern den Rest.`
      },
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 3
        },
        narrative: `Der Zug setzt sich wieder in Bewegung.

Die gemeinsame Stille aus dem Gang wirkt noch nach.

Kein Trost, eher etwas Nüchternes: Dass man selbst im Schweigen nicht ganz allein sein muss.

Der nächste Wagen kommt näher.`
      }
    ],
    choices: [
      {
        id: 'continue_to_ch3_after_callback',
        label: 'Weiter zum nächsten Wagen',
        next: 'c3_s01_wagen7_locked'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Später Callback auf c2_control_01_aftertalk',
      'mut wird hier nur als Flavor-Flag genutzt',
      'Kein Einfluss auf Endings/Route'
    ],
    atmosphere: 'somber'
  }
};
