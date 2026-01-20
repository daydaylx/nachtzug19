// ============================================================================
// NACHTZUG 19 - Kapitel 2: Die erste Kontrolle
// ============================================================================
// Szenen (25):
// Setup: c2_s01_ticket_search, c2_s01a_passenger_examination, c2_s01b_ticket_pocket
// Interludes: c2_interlude_01_toilet, c2_interlude_02_window_dark, c2_interlude_03_announcement_glitch, c2_interlude_04_lights, c2_interlude_05_vibration
// Boy: c2_s02_boy_recorder, c2_s02a_recorder_listening, c2_s02b_corridor_anomaly, c2_s02c_boy_vanish
// Comp7: c2_s03_comp7_intro, c2_s03a_comp7_notebook, c2_s03b_comp7_warning
// Pre-Control: c2_s04_announcement, c2_s04a_conductor_approach, c2_s04b_passengers_shift
// Control: c2_control_01_approach, c2_control_01_question, c2_control_01_aftermath
// Post-Control: c2_s05a_sleepless_talk, c2_s05b_reality_shift
// End: c2_end_platform_watch, c2_end_station
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
    narrative: `Der Zug fährt weiter. Das Brummen ist konstant, tief, in deinem Brustkorb.

Du gehst durch den Wagen. Der Schlaflose bleibt zurück, starrt wieder aus dem Fenster. Seine Jacke ist jetzt schwarz. War sie nicht blau?

Du hast kein Ticket. Das wird zum Problem, wenn Kontrolle kommt. Und du weißt – ohne zu wissen, woher – dass Kontrolle kommt. Bald.

Im nächsten Abteil sitzt ein Junge, vielleicht zwölf, mit Kopfhörern. Er hält einen alten Kassettenrekorder. Das Ding ist antik. Achtziger Jahre. Metallgehäuse, abgenutzte Tasten.

Er bemerkt dich nicht. Oder tut so.

Die Luft riecht nach kaltem Kaffee und Kunststoff. Unter deinen Schuhen ist der Boden klebrig, als haette jemand etwas verschuettet und es sei seit Stunden angetrocknet. Du hoerst das leise Surren des Rekorders unter dem Brummen des Zuges.

Von weiter vorn kommt ein Metallklackern, als wuerde irgendwo eine Tuer einrasten. Kein Schritt, keine Stimme. Nur dieses kleine Geraeusch, das dich daran erinnert, dass Kontrolle nicht nur ein Geruecht ist.`,
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
        label: 'Andere Passagiere beobachten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      },
      {
        id: 'search_self',
        label: 'Die eigenen Taschen durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s01b_ticket_pocket'
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
      'Boy-Intro: Love-Ticket für Kontakt',
      'search_self führt zu Taschen-Szene',
      'keep_walking erhöht conductor_attention (Vermeidung fällt auf)'
    ],
    atmosphere: 'normal'
  },

  // ============================================================================
  // c2_s01a_passenger_examination: Passagiere beobachten
  // ============================================================================
  'c2_s01a_passenger_examination': {
    id: 'c2_s01a_passenger_examination',
    chapter: 2,
    title: 'Die Anderen',
    narrative: `Du bleibst im Gang stehen. Beobachtest die anderen Passagiere.

Eine Frau, mittleren Alters, liest eine Zeitung. Du versuchst, die Schlagzeile zu erkennen. Die Buchstaben sind zu klein, oder zu verschwommen, oder beides. Sie bewegen sich. Nicht viel. Nur genug, um nicht lesbar zu sein.

Ein Mann in Anzug tippt auf seinem Laptop. Der Bildschirm zeigt nur blaues Licht. Keine Zeichen, keine Icons. Nur Blau, das pulsiert im Takt des Zuges.

Niemand redet. Niemand hustet. Niemand bewegt sich, außer in winzigen, mechanischen Gesten.

Du fragst dich: Haben die Tickets? Oder tun sie nur so?

Der Junge mit dem Kassettenrekorder sitzt noch da. Wartet auf etwas.
`,
    choices: [
      {
        id: 'approach_newspaper_woman',
        label: 'Die Frau mit der Zeitung ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_interlude_01_toilet'
      },
      {
        id: 'decipher_headline',
        label: 'Die Schlagzeile erraten',
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
        id: 'watch_laptop_man',
        label: 'Den Mann mit Laptop beobachten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
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
      'Zeitungs-Schlagzeile unlesbar, Buchstaben bewegen sich: Drift-Detail',
      'Laptop zeigt nur pulsierendes Blau: keine Inhalte',
      'approach_newspaper_woman erhöht Attention (fällt auf)',
      'conductor_attention >= 2 zeigt Feedback für keep_walking Choice',
      'decipher_headline nur bei tickets_truth >= 2'
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
    narrative: `Du greifst in deine Jackentasche. Nichts.

Hossentasche. Leer.

Brusttasche. Auch leer.

Aber da ist etwas. Ein Gefühl. Als hättest du etwas gehabt. Ein Ticket. Eine Karte. Etwas Wichtiges.

Du schließt die Augen. Versuchst dich zu erinnern.

Ein Bahnsteig. Kalt. Ein Automat. Du hast— nein. Die Erinnerung kippt. Verschwindet.

Als du die Augen öffnest, liegt etwas in deiner Hand.

Ein Zettel. Zusammengefaltet. Du faltest ihn auf.

Darauf steht, in deiner Handschrift: „Du hattest nie ein Ticket."`,
    choices: [
      {
        id: 'keep_note',
        label: 'Den Zettel behalten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_interlude_01_toilet'
      },
      {
        id: 'throw_away',
        label: 'Den Zettel zerreißen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Zettel erscheint aus dem Nichts (Drift-Manifestation)',
      'Eigene Handschrift: Memory-Glitch (hast du das geschrieben?)',
      'keep_note erhöht memory_drift (Wahrheit destabilisiert)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_interlude_01_toilet: Toilette
  // ============================================================================
  'c2_interlude_01_toilet': {
    id: 'c2_interlude_01_toilet',
    chapter: 2,
    title: 'Toilette',
    narrative: `Du gehst zur Toilette am Ende des Wagens. Die Tür ist angelehnt.

Du öffnest sie. Kein Licht. Du tastst nach dem Schalter.

Klick.

Neonröhre flackert an. Du siehst dich im Spiegel.

Dein Gesicht. Aber etwas stimmt nicht. Die Augen. Sie sind zu dunkel. Oder zu hell. Du bist nicht sicher.

Du blinzelst. Dein Spiegelbild blinzelt eine Sekunde später.

Du hebst die Hand. Dein Spiegelbild wartet. Dann hebt es auch die Hand.

Das Licht flackert. Aus. An. Dein Spiegelbild ist näher. Viel näher.

Dann geht das Licht aus.`,
    choices: [
      {
        id: 'stare_back',
        label: 'Dem Spiegelbild standhalten',
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
      'Spiegelbild verzögert (wie in Kap. 1)',
      'Interlude: sensorisch, kurz, optionaler Spiegel-Choice'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s02_boy_recorder: Kassettenjunge
  // ============================================================================
  'c2_s02_boy_recorder': {
    id: 'c2_s02_boy_recorder',
    chapter: 2,
    title: 'Der Junge',
    narrative: `Der Junge nimmt die Kopfhörer ab. Ohne dass du was gesagt hättest.

„Du suchst ein Ticket," sagt er. Nicht als Frage. Eine Feststellung.

Du nickst.

„Gibt's nicht. Niemand hat eins."

Er drückt auf Play. Die Kassette läuft. Ein Knistern, dann eine Stimme:

„—nächster Halt: [unverständlich]. Bitte—"

Du erkennst die Durchsage von vorhin. Aber die Aufnahme ist älter. Die Stimme klingt verzerrt, metallisch.

„Hörst du das?" fragt der Junge. „Die Station. Sie war mal da. Jetzt fehlt sie."

Er reicht dir den Rekorder. „Behalt ihn. Vielleicht hilft's."

Seine Augen sind ernst. Zu ernst für ein Kind.`,
    choices: [
      {
        id: 'take_recorder',
        label: 'Den Rekorder nehmen',
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
        label: '„Das kann ich nicht annehmen"',
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
      },
      {
        id: 'observe_boy_silently',
        label: 'Den Jungen stumm beobachten',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      }
    ],
    tags: [],
    state_notes: [
      'Rekorder ist Key-Item (hat_recorder wird gesetzt)',
      'ask_why: Stärkere Beziehung (+2), zeigt Empathie',
      'refuse_recorder: Guilt-Pattern, verschlechtert Beziehung',
      'CONDITION: observe_boy_silently nur bei memory_drift >= 2'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s02a_recorder_listening: Kassette abhören
  // ============================================================================
  'c2_s02a_recorder_listening': {
    id: 'c2_s02a_recorder_listening',
    chapter: 2,
    title: 'Aufnahme',
    narrative: `Du nimmst den Rekorder. Schwer. Metall und Plastik, kalt in der Hand.

Du drückst auf Rewind. Die Kassette rattert zurück. Mechanisch. Laut.

Dann Play.

Knistern. Stille. Dann:

„—geehrte Fahrgäste, wir erreichen in Kürze Bahnhof [NAME GELÖSCHT]. Bitte—"

Der Stationenname. Nicht unverständlich. Gelöscht. Als hätte jemand ihn ausradiert, aber nur akustisch. Ein Loch in der Aufnahme.

„—steigen Sie bitte—[FEHLER]—nicht aus. Wiederholen: Nicht—"

Die Kassette springt. Knackt. Dann wieder die Stimme, aber anders. Tiefer. Verzerrt. Nicht menschlich.

„—Sie sind im NACHTZUG 19. Es gibt keinen Ausstieg."

Du drückst auf Stop. Deine Hand zittert.

Als du aufblickst: Der Junge ist weg. Sein Abteil leer. Als wäre er nie da gewesen.`,
    choices: [
      {
        id: 'rewind_again',
        label: 'Noch einmal zurückspulen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'put_away',
        label: 'Den Rekorder weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02c_boy_vanish'
      },
      {
        id: 'keep_listening',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02c_boy_vanish'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kassette enthält gelöschte Stationennamen und Warnung: "kein Ausstieg"',
      'keep_listening/rewind_again erhöhen memory_drift (zu viel Wahrheit)',
      'Junge verschwindet spurlos: Drift-Callback'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s02b_corridor_anomaly: Gang wird länger
  // ============================================================================
  'c2_s02b_corridor_anomaly': {
    id: 'c2_s02b_corridor_anomaly',
    chapter: 2,
    title: 'Der Gang',
    narrative: `Du gehst weiter durch den Gang.

Der Gang ist länger. Viel länger als vorhin. Du zählst die Abteile: Sechs. Sieben. Acht. Neun.

Vorhin waren es vier.

Die Neonröhren flackern. Aus. An. Aus. An. Im Rhythmus des Zuges. Oder ist es umgekehrt? Passt sich der Zug den Lichtern an?

Du bleibst stehen. Drehst dich um.

Der Gang hinter dir: Kürzer. Drei Abteile. Der Schlaflose sitzt noch da, genau wie vorhin. Oder ist es jemand anders?

Seine Jacke ist grün. War sie nicht schwarz?

Du hast das Gefühl, dass du dich verlaufen hast. Aber das ist unmöglich. Es ist ein Zug. Ein linearer Raum.

Am Ende des Gangs vor dir: Ein Abteil. Tür halb offen. Licht brennt.

Jemand sitzt drin.`,
    choices: [
      {
        id: 'count_compartments',
        label: 'Die Abteile zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_interlude_02_window_dark'
      },
      {
        id: 'check_sleepless',
        label: 'Zum Schlaflosen zurückgehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'approach_lit_compartment',
        label: 'Zum beleuchteten Abteil gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'question_reality',
        label: 'Laut fragen: „Was passiert hier?"',
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
        next: 'c2_interlude_02_window_dark'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gang ändert Länge: Kernmechanik von Drift (Raum ist instabil)',
      'Jackenfarbe des Schlaflosen ändert sich erneut (schwarz -> grün)',
      'count_compartments erhöht memory_drift (Realität hinterfragen destabilisiert)',
      'CONDITION: question_reality nur bei memory_drift >= 1'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s02c_boy_vanish: Junge verschwindet
  // ============================================================================
  'c2_s02c_boy_vanish': {
    id: 'c2_s02c_boy_vanish',
    chapter: 2,
    title: 'Verschwunden',
    narrative: `Du gehst zurück zu dem Abteil, wo der Junge saß.

Leer.

Nicht nur „er ist weg" leer. Sondern „nie jemand hier gewesen" leer.

Kein Kopfhörer. Kein Notizbuch. Keine Sitzabnutzung. Der Sitz ist makellos. Als wäre er frisch gereinigt.

Du fragst einen Passagier: „Hast du einen Jungen gesehen?"

Die Frau mit der Zeitung sieht dich an. Schüttelt den Kopf. „Hier war nie ein Junge."

Aber du hältst den Rekorder in der Hand. Schwer. Real. Metallkalt.

Du drückst Play. Die Kassette läuft. Aber jetzt: Nur Stille. Kein Knistern. Keine Stimme. Nichts.

Dann, ganz leise, eine Kinderstimme:

„Du erinnerst dich."`,
    choices: [
      {
        id: 'insist_boy_real',
        label: '„Er war hier. Ich habe ihn gesehen."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_interlude_02_window_dark'
      },
      {
        id: 'doubt_self',
        label: 'An sich selbst zweifeln',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Condition: Nur sichtbar wenn has_recorder && put_away/keep_listening',
      'Junge ist komplett verschwunden, Rekorder bleibt (physischer Beweis)',
      'doubt_self erhöht memory_drift stark (+2)',
      'insist_boy_real erhöht conductor_attention (Lautstärke)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_interlude_02_window_dark: Fenster
  // ============================================================================
  'c2_interlude_02_window_dark': {
    id: 'c2_interlude_02_window_dark',
    chapter: 2,
    title: 'Schwärze',
    narrative: `Du gehst ans Fenster.

Draußen: Schwärze. Keine Landschaft. Keine Lichter. Nur Schwarz.

Aber jetzt siehst du etwas. Strukturen. Formen.

Ein Gebäude? Nein. Zu organisch. Es bewegt sich.

Du drückst dein Gesicht ans Glas. Das Glas ist warm. Feucht.

Die Form draußen bewegt sich. Kommt näher.

Es hat Augen.

Du springst zurück. Dein Herz rast.

Als du wieder hinsiehst: Nur Schwärze. Nichts sonst.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du gehst ans Fenster.

Draußen: Dunkelheit. Keine Landschaft. Keine Lichter. Nur Schwarz.

Aber jetzt siehst du etwas. Strukturen. Formen.

Ein Gebäude? Nein. Zu organisch. Es pulsiert.

Du drückst dein Gesicht ans Glas. Das Glas ist warm. Klamm.

Die Form draußen bewegt sich. Kommt näher.

Es hat ein Auge.

Du springst zurück. Dein Herz rast.

Als du wieder hinsiehst: Nur Schwärze. Nichts sonst.`
      },
      {
        min_drift: 5,
        narrative: `Du gehst ans Fenster.

Draußen: Grau. Kein Schwarz. Keine Lichter. Nur ein milchiger Schimmer.

Aber jetzt siehst du etwas. Strukturen. Formen.

Ein Gebäude? Nein. Zu organisch. Es bewegt sich.

Du drückst dein Gesicht ans Glas. Das Glas ist kalt. Trocken.

Die Form draußen bewegt sich. Kommt sehr nah.

Es hat drei Augen.

Du springst zurück. Dein Herz rast.

Als du wieder hinsiehst: Nur Grau. Und ein heller Streifen.`
      }
    ],
    choices: [
      {
        id: 'keep_staring',
        label: 'Trotzdem hinschauen',
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
        id: 'avoid_window',
        label: 'Vom Fenster wegbleiben',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
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
      'Form mit Augen draußen (Halluzination oder nicht?)',
      'Warmes, feuchtes Glas (sensorische Anomalie)',
      'keep_staring nur bei memory_drift >= 2',
      'avoid_window nur bei tickets_escape >= 2'
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
    narrative: `Du gehst weiter. Der Gang scheint sich zu stabilisieren. Oder du gewöhnst dich daran.

Am Ende: Ein Abteil mit einer Person.

Sie sitzt im Schatten, Gesicht verdeckt. Vor ihr auf dem Tisch: Ein Notizbuch, vollgeschrieben. Kleine, präzise Schrift.

Als du vorbeigehst, spricht sie:

„Du hast den Rekorder."

Nicht als Frage. Als Feststellung.

Sie blickt auf. Gesicht unscharf. Nicht verschwommen – einfach schwer zu fokussieren. Als würde dein Blick abrutschen, wenn du versuchst, ihre Züge zu erfassen.

„Ich bin Comp7," sagt sie. „Oder so nennt mich der Junge. Ich weiß meinen Namen nicht mehr."

Pause.

„Du auch nicht, oder?"`,
    choices: [
      {
        id: 'ask_notebook',
        label: '„Was schreibst du auf?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'ask_name',
        label: '„Du weißt deinen Namen nicht?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'deny_amnesia',
        label: '„Ich weiß meinen Namen."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      }
    ],
    tags: [],
    state_notes: [
      'Comp7 ist zentrale Figur (Wagen 7, Mysterium)',
      'Gesicht unscharf: Drift-Manifestation (nicht fokussierbar)',
      'ask_notebook: Truth-Path (Fakten sammeln)',
      'ask_name: Love-Path (Empathie zeigen)',
      'deny_amnesia erhöht memory_drift (Selbsttäuschung)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03a_comp7_notebook: Notizbuch untersuchen
  // ============================================================================
  'c2_s03a_comp7_notebook': {
    id: 'c2_s03a_comp7_notebook',
    chapter: 2,
    title: 'Das Notizbuch',
    narrative: `Comp7 schiebt das Notizbuch zu dir. „Schau rein. Vielleicht erkennst du was."

Du blätterst. Seite um Seite. Listen. Daten. Namen. Beobachtungen.

„Station 1: Leer. Station 2: Leer. Station 3: [GELÖSCHT]"

„Passagier #7: Schlaflosen-Mann. Jacke wechselt Farbe. Blau -> Schwarz -> Grün -> Rot -> Schwarz."

„Passagier #12: Junge mit Rekorder. Verschwindet nach Übergabe. Immer."

„Passagier #[UNLESBAR]: Du?"

Darunter steht: „Hat Rekorder. Fühlt sich schuldig. Sucht jemanden. Wird kontrolliert."

Du blickst auf. „Woher weißt du das alles?"

Comp7 lächelt. Oder tut so. Ihr Gesicht ist zu unscharf, um sicher zu sein.

„Ich schreibe auf, was passiert. Immer und immer wieder. Damit ich nicht vergesse."

Sie deutet auf eine Seite weiter hinten. „Dort steht, was als Nächstes kommt."`,
    choices: [
      {
        id: 'read_future',
        label: 'Die nächste Seite lesen',
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
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_interlude_03_announcement_glitch'
      },
      {
        id: 'ask_purpose',
        label: '„Warum schreibst du das auf?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c2_s03b_comp7_warning'
      },
      {
        id: 'close_notebook',
        label: 'Das Notizbuch schliessen',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_interlude_03_announcement_glitch'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Notizbuch zeigt Drift-Log: Jackenfarben-Sequenz, verschwindende NPCs',
      'Comp7 hat Infos über Spieler (Metagame-Hinweis)',
      'read_future: Hoher Truth-Gewinn, aber memory_drift steigt',
      'ask_purpose: Stärkste Comp7-Beziehung (+2)'
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
    narrative: `Du liest die nächste Seite:

„Kontrolle 1. Wagen 1-4. Schaffner fragt nach Ticket. Spieler hat keins."

„Drei Wege:"
„1) Wahrheit sagen: Truth +2, Attention -1"
„2) Flucht/Ausweichen: Escape +2"
„3) Jemanden suchen: Love +2"

Du siehst Comp7 an. „Das sind meine Optionen?"

Sie nickt. „Meistens. Manchmal gibt es mehr. Aber nur, wenn—"

Sie stoppt. Hört hin.

„Er kommt."

Schwere Schritte im Gang. Rhythmisch. Kommen näher.

Comp7 schließt das Notizbuch. „Viel Glück."`,
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
        id: 'ask_more_options',
        label: '„Was sind die anderen Optionen?"',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 2 },
            { type: 'compare', target: 'rel_comp7', operator: '>=', value: 2 }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
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
      'CONDITION: ask_more_options nur bei tickets_truth >= 2 ODER rel_comp7 >= 2',
      'Comp7 gibt Meta-Informationen (Optionen der Kontrolle)',
      'Schaffner-Schritte hörbar: Kontrolle nähert sich'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_interlude_03_announcement_glitch: Durchsagen-Glitch
  // ============================================================================
  'c2_interlude_03_announcement_glitch': {
    id: 'c2_interlude_03_announcement_glitch',
    chapter: 2,
    title: 'Glitch',
    narrative: `Die Durchsage knistert:

„Sehr geehrte Fahr—[FEHLER]—geehrte—[FEHLER]—"

Die Stimme springt. Wiederholt sich. Überschlägt sich.

„—erreichen in Kürze—erreichen—erreichen—NACHTZUG 19—NACHTZUG—"

Dann, plötzlich, eine andere Stimme. Deine Stimme.

„—ich kann mich nicht erinnern—kann nicht—"

Die Durchsage bricht ab. Stille.

Alle Passagiere starren nach oben. Zu den Lautsprechern. Reglos.

Dann bewegen sie sich wieder. Als wäre nichts gewesen.`,
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
        id: 'look_for_boy',
        label: 'Nach dem Jungen sehen',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
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
      'Durchsage glitcht mit Spielerstimme (Memory-Echo)',
      'Passagiere frieren ein und bewegen sich wieder',
      'cover_ears senkt attention, wenn bereits aufgebaut',
      'look_for_boy nur bei tickets_love >= 1'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s04_announcement: Zweite Durchsage
  // ============================================================================
  'c2_s04_announcement': {
    id: 'c2_s04_announcement',
    chapter: 2,
    title: 'Durchsage',
    narrative: `Die Lautsprecherdurchsage wieder, diesmal klar:

„Sehr geehrte Fahrgäste—"

Du hörst genau hin.

„—wir erreichen in Kürze [unverständlich]. Die nächste Kontrolle erfolgt in Wagen 1 bis 4."

Kontrolle.

Das Wort bleibt hängen. Du spürst, wie sich etwas in deinem Magen zusammenzieht.

Der Schlaflose dreht sich zu dir. „Hast du eine Geschichte?"

„Welche Geschichte?"

„Für den Schaffner. Er fragt nicht nach Tickets. Er fragt nach Geschichten."

Comp7 nickt. „Warum du hier bist. Das ist alles, was zählt."`,
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
        label: '„Ich erfinde eine Geschichte"',
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
      'Sleepless gibt Hinweis: "Schaffner fragt nach Geschichten"',
      'prepare_lie/hide erhöhen conductor_attention (wird Kontrolle härter)',
      'prepare_hide führt zu passengers_shift (extra Szene bei Flucht)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04a_conductor_approach: Schaffner nähert sich
  // ============================================================================
  'c2_s04a_conductor_approach': {
    id: 'c2_s04a_conductor_approach',
    chapter: 2,
    title: 'Annäherung',
    narrative: `Du stehst im Gang zwischen Abteil 3 und 4. Der Teppich hier ist abgewetzter als anderswo, die Fasern plattgedrückt von unzähligen Schritten, die keine Spuren hinterlassen haben.

Du hörst sie jetzt. Schritte. Schwer. Rhythmisch. Mechanisch. Jeder Schlag ein hohles *Tock*, das nicht nur vom Boden, sondern aus den Wänden zu kommen scheint. Ein Takt, der keine Eile kennt, aber auch kein Innehalten.

Der Schaffner schiebt sich langsam in dein Sichtfeld, erst nur als Spiegelung im dunklen Glas der Fenster. Seine Silhouette ist zu ruhig, zu stabil für die Bewegung des Zuges.

Er ist groß. Die dunkelblaue Uniform wirkt nicht wie Stoff, sondern wie eine zweite Haut, zu perfekt gebügelt, ohne eine einzige Falte, selbst an den Gelenken. Sein Gesicht ist eine Maske aus bleichem Wachs, die Augen starr auf einen Punkt gerichtet, den nur er sieht.

Die Luft vor ihm verändert sich. Sie riecht nach Ozon und scharfem Reinigungsmittel, eine klinische Kälte, die das Atmen schwer macht. Ein leises Summen geht von ihm aus, ein elektrisches Prickeln, das die Härchen auf deinen Armen aufstellt.

Er stoppt bei jedem Abteil. Er sagt nichts, aber du hörst das metallische Klacken seiner Kelle. Die Passagiere reagieren wie Automaten – sie zeigen etwas vor, eine Geste, ein Fragment, und er nickt mit einer Präzision, die dir den Magen umdreht.

Der Schlaflose starrt stumm an ihm vorbei. Die Frau mit der Zeitung rührt sich nicht. Der Schaffner akzeptiert ihr Schweigen, als wäre es Teil eines Protokolls, das du nicht kennst.

Jetzt ist er nur noch zwei Abteile entfernt. Die Luft zwischen euch scheint zu vibrieren, ein unsichtbarer Sog, der dich an den Boden fesselt.

Comp7 flüstert hinter dir, ihre Stimme kaum mehr als ein Hauch kalter Luft: „Er kommt zu dir. Er kommt immer zu dir. Lauf nicht weg. Das macht es nur… lauter.“

Du hast kein Ticket. Nur deine Geschichte. Und die Zeit, sie zu erzählen, rinnt wie Sand durch deine Finger.`,
    choices: [
      {
        id: 'stand_ready',
        label: 'Stehenbleiben und warten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_interlude_04_lights'
      },
      {
        id: 'move_to_next_car',
        label: 'In den nächsten Wagen gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_s04b_passengers_shift'
      },
      {
        id: 'ask_comp7_help',
        label: 'Comp7 um Hilfe bitten',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_interlude_04_lights'
      }
    ],
    tags: [],
    state_notes: [
      'CONDITION: ask_comp7_help nur bei rel_comp7 >= 2',
      'Schaffner akzeptiert fehlende Tickets bei anderen Passagieren (Regel: nur Spieler wird kontrolliert)',
      'move_to_next_car erhöht Attention stark (+2), führt zu Flucht-Path'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s04b_passengers_shift: Passagiere verschieben sich
  // ============================================================================
  'c2_s04b_passengers_shift': {
    id: 'c2_s04b_passengers_shift',
    chapter: 2,
    title: 'Verschiebung',
    narrative: `Du versuchst, dich zu verstecken. Gehst schnell durch den Gang.

Aber etwas stimmt nicht.

Die Passagiere bewegen sich. Nicht wie Menschen. Wie Schachfiguren. Von einem Abteil ins nächste. Lautlos.

Die Frau mit der Zeitung sitzt jetzt da, wo der Mann mit dem Laptop saß. Der Mann sitzt jetzt da, wo die Frau saß.

Der Schlaflose sitzt jetzt drei Reihen weiter vorne. Oder hinten? Du bist nicht sicher.

Comp7 ist verschwunden. Das Abteil 7 ist leer. Oder war es nie besetzt?

Du drehst dich um. Der Schaffner steht direkt hinter dir.

„Fahrkarten bitte."`,
    choices: [
      {
        id: 'face_conductor',
        label: 'Sich umdrehen und ihm gegenüberstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_control_01_approach'
      },
      {
        id: 'try_run',
        label: 'Versuchen wegzulaufen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_approach'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Condition: Nur sichtbar wenn prepare_hide/move_to_next_car gewählt',
      'Passagiere bewegen sich wie Schachfiguren (Raum reorganisiert sich)',
      'Comp7 verschwindet (wird später wieder auftauchen)',
      'try_run erhöht Attention weiter (Flucht wird bemerkt)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_interlude_04_lights: Licht-Interlude
  // ============================================================================
  'c2_interlude_04_lights': {
    id: 'c2_interlude_04_lights',
    chapter: 2,
    title: 'Licht',
    narrative: `Die Lichter gehen aus.

Alle. Auf einmal.

Komplette Dunkelheit.

Du hörst die Schritte des Schaffners. Näher. Näher.

Dann geht das Licht wieder an.

Der Schaffner steht jetzt direkt vor dir.

„Fahrkarten bitte."`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Die Lichter gehen aus.

Alle. Auf einmal.

Komplette Dunkelheit. Nur ein schwacher Notstreifen glimmt.

Du hörst die Schritte des Schaffners. Näher. Näher.

Dann flackert das Licht wieder an.

Der Schaffner steht jetzt direkt vor dir.

„Fahrkarten bitte."`
      },
      {
        min_drift: 5,
        narrative: `Die Lichter gehen aus.

Alle. Auf einmal.

Komplette Dunkelheit.

Du hörst keine Schritte. Nur ein Klacken direkt hinter dir.

Dann geht das Licht wieder an.

Der Schaffner steht nicht vor dir.

Er steht neben dir.

„Fahrkarten bitte."`
      }
    ],
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
        id: 'continue',
        label: 'Kontrolle beginnt',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_control_01_approach'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Lichter gehen aus (Übergang zu Kontrolle)',
      'steady nur bei conductor_attention >= 2'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_approach: Kontrolle 1 - Annäherung (Set-Piece Teil 1)
  // ============================================================================
  'c2_control_01_approach': {
    id: 'c2_control_01_approach',
    chapter: 2,
    title: 'Kontrolle - Teil 1',
    narrative: `Der Schaffner steht vor dir. Groß. Zu groß.

Seine Uniform ist dunkelblau, zu perfekt gebügelt. Keine Falte. Keine Unregelmäßigkeit.

Sein Gesicht ist ausdruckslos. Keine Mimik. Die Augen bewegen sich nicht.

„Fahrkarten bitte."

Seine Stimme ist tief. Monoton. Wie aus einem Lautsprecher.

Du sagst: „Ich habe keine."

Er blickt auf dich herab. Lange. Zu lange. Mindestens zehn Sekunden.

Dann schaut er auf seine Kelle. Als würde er lesen. Aber du siehst: Die Kelle ist leer. Keine Schrift. Nichts.

„Kein Ticket bedeutet keine Berechtigung."

Pause.

„Keine Berechtigung bedeutet—"

Er stoppt. Wartet.`,
    choices: [
      {
        id: 'wait_silent',
        label: 'Schweigend warten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_control_01_question'
      },
      {
        id: 'look_to_sleepless',
        label: 'Kurz zum Schlaflosen blicken',
        condition: {
          type: 'compare',
          target: 'rel_sleepless',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
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
      },
      {
        id: 'notice_voice_distortion',
        label: 'Die Verzerrung in seiner Stimme bemerken',
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
        next: 'c2_control_01_question'
      }
    ],
    tags: ['control'],
    state_notes: [
      'Set-Piece Teil 1: Aufbau der Kontrolle',
      'Kelle ist leer (Schaffner liest nicht ab, improvisiert)',
      'look_to_sleepless nur bei rel_sleepless >= 1',
      'CONDITION: notice_voice_distortion nur bei memory_drift >= 2 (Callback für continue)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_question: Kontrolle 1 - Frage (Set-Piece Teil 2)
  // ============================================================================
  'c2_control_01_question': {
    id: 'c2_control_01_question',
    chapter: 2,
    title: 'Kontrolle - Teil 2',
    narrative: `Der Schaffner spricht weiter:

„—bedeutet, dass Sie an der nächsten Station aussteigen müssen."

Pause. Er wartet. Du spürst, dass er eine Antwort will.

„Es sei denn."

Er beugt sich leicht vor.

„Sie haben einen Grund. Einen guten Grund, hier zu sein."

Seine Augen fixieren dich. Reglos.

Du riechst kaltes Metall und etwas Strenges, als waere die Uniform frisch gereinigt. Seine Handschuhe sind glatt, ohne Falten. Du hoerst hinter dir keinen Atem, aber du spuerst ihn trotzdem.

Die Zeit dehnt sich. Das Brummen des Zuges wird lauter, als wuerde der Wagen in diesem Moment tiefer fahren. Irgendwo klickt eine Lampe, und der Schatten der Kelle wandert ueber deine Haende.

„Warum sind Sie hier?"`,
    choices: [
      {
        id: 'offer_truth',
        label: '„Ich weiß es nicht. Ich kann mich nicht erinnern."',
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
        id: 'offer_escape',
        label: '„Ich musste weg."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c2_control_01_aftermath'
      },
      {
        id: 'use_recorder',
        label: 'Den Rekorder zeigen',
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
      'Set-Piece Teil 2: Kern-Entscheidung der Kontrolle',
      'CONDITION: use_recorder nur bei has_recorder',
      'Jede Antwort gibt +2 Tickets (wichtige Weichenstellung)',
      'offer_truth senkt Attention (-1), use_recorder senkt stark (-2)',
      'Hauptfrage: "Warum bist du hier?" (nicht "Wo willst du hin?")'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_aftermath: Kontrolle 1 - Reaktion (Set-Piece Teil 3)
  // ============================================================================
  'c2_control_01_aftermath': {
    id: 'c2_control_01_aftermath',
    chapter: 2,
    title: 'Kontrolle - Teil 3',
    narrative: `Der Schaffner nickt. Einmal. Kurz. Mechanisch.

„Sie bleiben sitzen," sagt er. „Vorerst."

Er dreht sich um. Geht weiter. Die Schritte entfernen sich.

Du atmest aus. Du hast nicht bemerkt, dass du den Atem angehalten hast.

Comp7 erscheint wieder. Aus dem Nichts. Sitzt wieder in ihrem Abteil, als wäre sie nie weg gewesen.

„Du hast es gesehen," sagt sie.

„Was?"

„Die Kelle. Sie war leer. Keine Schrift. Nichts."

Du erinnerst dich. Sie hat recht. Die Kelle war leer.

„Er liest nicht ab," sagt Comp7. „Er tut nur so. Er erfindet alles."

Der Schlaflose dreht sich zu euch um. „Alles tut nur so. Der Zug. Die Stationen. Die Regeln. Wir."

Seine Jacke ist jetzt rot. War sie nicht grün?`,
    choices: [
      {
        id: 'confront_sleepless',
        label: '„Deine Jacke. Sie ändert sich ständig."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s05a_sleepless_talk'
      },
      {
        id: 'ask_comp7_meaning',
        label: 'Comp7: „Was bedeutet das alles?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s05b_reality_shift'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen und nachdenken',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s05b_reality_shift'
      },
      {
        id: 'look_for_boy',
        label: 'Nach dem Jungen Ausschau halten',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s05b_reality_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Set-Piece Teil 3: Auflösung der Kontrolle',
      'Kelle ist leer: Schaffner folgt keinem Script',
      'Jacke des Schlaflosen ändert erneut Farbe',
      'Comp7 erscheint wieder (war nie weg? Oder Drift?)',
      'CONDITION: look_for_boy nur bei tickets_love >= 4 (Callback für offer_search)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_s05a_sleepless_talk: Gespräch mit Schlaflosem
  // ============================================================================
  'c2_s05a_sleepless_talk': {
    id: 'c2_s05a_sleepless_talk',
    chapter: 2,
    title: 'Der Schlaflose erklärt',
    narrative: `Der Schlaflose sieht dich an. Müde. Seine Augen sind rot umrandet.

„Du siehst es jetzt," sagt er. „Die Jacke. Sie ändert sich. Jedes Mal, wenn der Zug hält."

„Warum?"

Er zuckt mit den Schultern. „Ich weiß es nicht. Vielleicht bin ich nicht mehr konsistent. Vielleicht war ich es nie."

Er zeigt auf die anderen Passagiere. „Sie auch nicht. Niemand hier ist real. Nicht so, wie du denkst."

„Und ich?"

„Du auch nicht."

Er lächelt. Trocken. Ohne Humor.

Seine Stimme ist rau, als haette er zu viel Rauch geschluckt. Er reibt den Daumen ueber den Stoff seiner Jacke, als koenne er die Farbe festhalten. Das Material knistert, als waere es zu trocken.

Er nickt in Richtung der Fenster. Draussen gleitet die Schwärze vorbei wie Wasser, aber ohne Glanz. „Wenn du einmal etwas festhalten willst," sagt er, „nimm ein Detail. Nicht den ganzen Zug. Nur einen Kratzer, einen Geruch."

„Der Zug erfindet uns neu. Jedes Mal. Kleine Änderungen. Große Änderungen. Bis wir vergessen, wer wir waren."

Er lehnt sich zurück. „Aber du kämpfst dagegen an. Deshalb bist du hier."`,
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
        id: 'ask_for_anchor',
        label: '„Sag mir, was sich nicht aendert."',
        condition: {
          type: 'compare',
          target: 'rel_sleepless',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c2_interlude_05_vibration'
      },
      {
        id: 'reject_truth',
        label: '„Das kann nicht sein."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c2_s05b_reality_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Condition: Nur sichtbar wenn confront_sleepless gewählt',
      'Sleepless erklärt Drift-Mechanik ("Zug erfindet uns neu")',
      'accept_truth/ask_for_anchor: Truth-Path, bindet rel_sleepless',
      'reject_truth: Escape-Pattern, Beziehung verschlechtert'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_s05b_reality_shift: Realitätsverschiebung
  // ============================================================================
  'c2_s05b_reality_shift': {
    id: 'c2_s05b_reality_shift',
    chapter: 2,
    title: 'Verschiebung',
    narrative: `Du siehst aus dem Fenster.

Die Schwärze draußen ist anders. Nicht mehr komplett schwarz. Du siehst Strukturen. Gebäude? Bäume? Schatten.

Dann, für einen Moment, siehst du ein Gesicht. Dein Gesicht. Von draußen. Es starrt dich an.

Du springst zurück.

Als du wieder hinsiehst: Nur Schwärze.

Comp7 neben dir: „Du hast es gesehen."

„Was?"

„Dich selbst. Von außen."

Du willst fragen, was das bedeutet, aber sie schüttelt den Kopf.

„Nicht jetzt. Später. Wenn du bereit bist."

Der Zug beginnt zu vibrieren. Stärker als vorhin.`,
    choices: [
      {
        id: 'ask_comp7_more',
        label: '„Wann bin ich bereit?"',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_interlude_05_vibration'
      },
      {
        id: 'ignore_vision',
        label: 'Nicht darüber nachdenken',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_interlude_05_vibration'
      }
    ],
    tags: ['reveal', 'drift_variant'],
    state_notes: [
      'CONDITION: ask_comp7_more nur bei tickets_truth >= 3',
      'Gesicht draußen = Selbst (Meta-Hinweis: Spieler ist Teil des Zuges)',
      'Vibration beginnt (Übergang zu Station)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_interlude_05_vibration: Vibration vor Station
  // ============================================================================
  'c2_interlude_05_vibration': {
    id: 'c2_interlude_05_vibration',
    chapter: 2,
    title: 'Vibration',
    narrative: `Der Boden unter dir vibriert. Stärker als vorher.

Das Brummen wird lauter. Nicht im Raum. In deinem Kopf. In deinen Knochen.

Du greifst nach einer Stange. Das Metall pulsiert. Warm. Lebendig.

Die Lampen flackern. Aus. An. Aus. An.

Dann, plötzlich: Stille.

Der Zug hält.`,
    choices: [
      {
        id: 'steady_breath',
        label: 'Atem zählen',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_end_platform_watch'
      },
      {
        id: 'continue',
        label: 'Zur Station',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_end_platform_watch'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Vibration im Kopf/Knochen (somatische Anomalie)',
      'Metall pulsiert warm (Material lebendig)',
      'steady_breath nur bei memory_drift >= 2'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_end_platform_watch: Station beobachten
  // ============================================================================
  'c2_end_platform_watch': {
    id: 'c2_end_platform_watch',
    chapter: 2,
    title: 'Zweiter Halt',
    narrative: `Du gehst ans Fenster.

Draußen: Ein Bahnsteig. Leer. Identisch zum ersten. Dieselbe Neonröhre. Dieselbe Uhr.

23:47.

Niemand steigt ein. Niemand steigt aus. Die Türen bleiben geschlossen.

Aber diesmal siehst du etwas. Am anderen Ende des Bahnsteigs.

Eine Gestalt. Steht da. Reglos.

Sie dreht sich zu dir. Hebt die Hand.

Als würde sie winken.

Dann geht das Licht aus. Auf dem Bahnsteig. Komplette Dunkelheit.

Als das Licht wieder angeht: Die Gestalt ist weg.

Der Zug fährt weiter.`,
    choices: [
      {
        id: 'tell_others',
        label: 'Den anderen erzählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'keep_silent',
        label: 'Für sich behalten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'lower_gaze',
        label: 'Den Blick senken',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_end_station'
      },
      {
        id: 'recognize_figure',
        label: 'Versuchen, die Gestalt zu erkennen',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'rel_comp7', operator: '>=', value: 2 },
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 4 }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_end_station'
      }
    ],
    tags: [],
    state_notes: [
      'Gestalt auf Bahnsteig (wer? Spieler? Comp7? Schaffner?)',
      'Uhr zeigt wieder 23:47 (Zeit-Loop)',
      'tell_others erhöht conductor_attention (Lautstärke)',
      'CONDITION: lower_gaze nur bei tickets_guilt >= 2',
      'CONDITION: recognize_figure nur bei rel_comp7 >= 2 OR tickets_truth >= 4'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_end_station: Zweite Station (drift)
  // ============================================================================
  'c2_end_station': {
    id: 'c2_end_station',
    chapter: 2,
    title: 'Drift',
    narrative: `Du drehst dich um.

Der Wagen hat sich verändert.

Der Schlaflose sitzt jetzt drei Reihen weiter hinten. Du bist sicher, dass er vorher vorne saß. Seine Jacke ist jetzt schwarz. War sie nicht rot?

Der Junge ist weg. Das Abteil leer. Als wäre er nie da gewesen.

Comp7 sitzt noch da, schreibt in ihr Notizbuch. Ihre Lippen bewegen sich stumm.

Du gehst zu ihr. „Was schreibst du?"

Sie blickt auf. Ihr Gesicht ist klarer jetzt. Du kannst ihre Züge erkennen. Aber du kennst sie nicht.

„Was gerade passiert ist," sagt sie. „Damit ich es nicht vergesse."

Sie zeigt auf eine Zeile:

„Spieler hat Kontrolle 1 überstanden. Geht weiter zu Kapitel 3."`,
    choices: [
      {
        id: 'play_recorder',
        label: 'Die Aufnahme vorspielen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 3 },
          { type: 'set', target: 'played_recorder', value: true },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s01_wagen7_locked'
      },
      {
        id: 'continue_to_chapter_3',
        label: 'Weiter',
        effects: [
          { type: 'set', target: 'chapter_index', value: 3 }
        ],
        next: 'c3_s01_wagen7_locked'
      },
      {
        id: 'think_of_boy',
        label: 'An den Jungen denken',
        condition: {
          type: 'compare',
          target: 'rel_boy',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 3 },
          { type: 'inc', target: 'rel_boy', value: 1 },
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s01_wagen7_locked'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'R1: Engine erhoeht memory_drift/station_count automatisch (keine manuellen station_end-Effects)',
      'Drift-Effects: Sleepless/Jacke verändert, Junge weg, Comp7 klarer',
      'Meta-Hinweis: Comp7 schreibt "Spieler geht zu Kapitel 3"'
    ],
    atmosphere: 'somber'
  }
};
