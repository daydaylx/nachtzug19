// ============================================================================
// NACHTZUG 19 - Kapitel 1: Leerer Bahnsteig (REDUZED / P1 FIX)
// ============================================================================
// Szenen (14):
// Setup: c1_s01_platform, c1_s01_platform_b, c1_s01a_platform_details
// Train: c1_s02_train_appears, c1_s02a_train_exterior
// Inside: c1_s03_inside_train, c1_s03a_find_seat
// Sleepless: c1_s04_sleepless_intro, c1_s04a_sleepless_past
// Anomaly: c1_s05_first_anomaly, c1_s05a_other_passengers, c1_s05b_compartment7_tease, c1_s05c_comp7_listen
// End: c1_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter1Scenes: ScenesCollection = {
  // ============================================================================
  // c1_s01_platform: Einstieg (Split Part 1)
  // ============================================================================
  'c1_s01_platform': {
    id: 'c1_s01_platform',
    chapter: 1,
    title: 'Leerer Bahnsteig',
    narrative: `Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer.

An der Wand klebt ein einzelnes Plakat. Verblasst. Orange Schrift auf braunem Grund – diese aggressive Typografie aus den Siebzigern. „REISEN SIE MIT UNS", steht da. Keine Webseite. Keine QR-Codes. Nur eine Telefonnummer mit zu wenigen Ziffern.

Keine Bänke. Keine Automaten. Nur nackte Wände aus Beton, fleckig von Feuchtigkeit und… Nikotin? Die Wände sind gelb verfärbt, als hätten hier jahrzehntelang Menschen geraucht. Eine Neonröhre flackert über dir. Das Licht ist kalt, blaugrün, wirft harte Schatten auf den Boden.

Die Anzeigetafel – ein mechanisches Klappmodell – zeigt: 23:47.

Kein Text. Kein „Nächster Zug". Nur leere Fächer, die im Takt klacken, ohne etwas anzuzeigen.

Du weißt nicht mehr, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt.`,
    choices: [
      {
        id: 'wait_hopeful',
        label: 'Ich warte. Es gibt bestimmt eine Erklärung.',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s01_platform_b'
      },
      {
        id: 'look_around',
        label: 'Ich sehe mich erst einmal genau um.',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s01_platform_b'
      },
      {
        id: 'doubting',
        label: 'Das stimmt hier alles nicht. Wo sind die anderen?',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s01_platform_b'
      },
      {
        id: 'aggressive_shout',
        label: 'Hallo? Ist hier irgendjemand verdammt noch mal?',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_s01_platform_b'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Split Part 1: Fokus auf Umgebung',
      'Erste Orientierung'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s01_platform_b: Einstieg (Split Part 2 - AGENCY FIX)
  // ============================================================================
  'c1_s01_platform_b': {
    id: 'c1_s01_platform_b',
    chapter: 1,
    title: 'Atmosphäre',
    narrative: `Aber du weißt: Du wartest auf etwas. Oder jemanden.

Die Luft riecht nach kaltem Zigarettenrauch und Maschinenöl. Nicht nach frischem Rauch – nach altem. Nach Jahrzehnten. Als hätte jemand die Luft eingefroren, als hier noch geraucht werden durfte.

Am Rand – auf einer Bank, die du vorhin nicht gesehen hast – sitzt eine Gestalt. Sie liest eine Zeitung. Du siehst die Schlagzeile, aber das Datum ist verwischt. „ÖLKRISE VERSCHÄRFT SICH", steht da in dieser altmodischen Frakturschrift. Die Gestalt blättert nicht um.

Ein Name brennt sich in deine Gedanken. Emma. Ein Gesicht, das du fast sehen kannst. Braune Augen. Ein Lächeln, das du nie vergessen wolltest. Wo ist sie?`,
    narrative_variants: [
      {
        min_drift: 5,
        narrative: `Die Luft riecht nach kaltem Zigarettenrauch. Die Gestalt mit der Zeitung sitzt näher. Die Schlagzeile: „ENERGIEKRISE—". Der Rest ist verwischt. Die Gestalt blättert nicht um. Emma. Der Name brennt in deinem Kopf. Du musst sie finden.`
      }
    ],
    choices: [
      {
        id: 'search_person',
        label: '„Emma? Bist du das?" (Laut rufen)',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'set', target: 'memory_search_active', value: true }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'check_phone',
        label: 'Das Handy prüfen. Irgendein Signal?',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'check_newspaper',
        label: 'Die Zeitung der Gestalt fixieren. Welches Datum?',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'try_leave',
        label: '„Weg hier." (Zum Ausgang drängen)',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'P1 FIX: Agency durch memory_search_active',
      'Drift-Varianten hier integriert'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s01a_platform_details: Details & Gerät (Merged)
  // ============================================================================
  'c1_s01a_platform_details': {
    id: 'c1_s01a_platform_details',
    chapter: 1,
    title: 'Das Gerät',
    narrative: `Du setzt dich in Bewegung. Der Beton unter deinen Sohlen klingt hohl. Am Rand des Bahnsteigs: Eine gelbe Linie, abgeblättert. Dahinter die Schienen. Schwarz. Matt. Als wären sie aus etwas anderem als Metall gemacht.

Du greifst in deine Tasche. Da ist… etwas. Ein Gerät.

Ein rechteckiges Ding aus Plastik und Glas. Schwer. Der Bildschirm ist schwarz. Du drückst darauf, und für einen Moment flackert das Display auf – nicht mit Icons oder Apps, sondern mit statischem Rauschen, wie bei einem alten Fernseher.

Dann wird es wieder schwarz.

Plötzlich flackert die Neonröhre über dir schneller. Ein, aus, ein, aus. Dein Schatten auf dem Boden streckt sich, wird unnatürlich lang. Ein tiefes Brummen erfüllt die Luft, vibriert in deinem Brustkorb.`,
    choices: [
      {
        id: 'hold_device',
        label: 'Das Gerät fest an mich drücken.',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'examine_tracks',
        label: 'Die schwarzen Schienen untersuchen.',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'inspect_device',
        label: 'Das Gerät skeptisch mustern. Was ist das?',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'step_back',
        label: 'Einen Schritt zurücktreten. Weg von der Kante.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Merged: Details, Device, Lights',
      'Schnellerer Einstieg zum Zug'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s02_train_appears: Zug erscheint
  // ============================================================================
  'c1_s02_train_appears': {
    id: 'c1_s02_train_appears',
    chapter: 1,
    title: 'Der Zug',
    narrative: `Das Brummen wird lauter. Dann gleitet der Zug in den Bahnhof. Lautlos.

Er sieht aus wie ein alter Nachtzug. Achtziger Jahre. Abblätternde dunkelrote Farbe, stellenweise schwarz verfärbt. Fenster zu schmal, Rahmen vergilbt. Die Wagen sind lang. Zu lang.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen. Niemand bewegt sich. Als wären sie eingefroren.

Die Türen öffnen sich mit einem Zischen. Warme Luft strömt heraus. Riecht nach altem Polster und etwas Süßlichem. Verbrannter Zucker?

Die Stufen glänzen feucht. Ein dünner Nebel hängt in der Tür. Niemand steigt aus.`,
    narrative_variants: [
      {
        min_drift: 5,
        narrative: `Das Brummen wird lauter. Der Zug gleitet herein. Lautlos. Dunkelrot, fast schwarz. Die Wagen sind endlos. Durch die Scheiben: Eingefrorene Silhouetten. Warme, süßliche Luft strömt heraus. Die Stufen glänzen schwarz. Niemand steigt aus.`
      }
    ],
    choices: [
      {
        id: 'board_hopeful',
        label: 'Dem Zug offen entgegentreten. Endlich geht es weiter.',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'inspect_train',
        label: 'Den Zug genau mustern. Baureihe, Zustand, Details.',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'call_out',
        label: '„Ist da jemand drin?" (Vorsichtig rufen)',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'retreat_scared',
        label: 'Misstrauisch zurückweichen. Der sieht nicht sicher aus.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'P1 FIX: call_out blocked if attention >= 2'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s02a_train_exterior: Zug von außen betrachten
  // ============================================================================
  'c1_s02a_train_exterior': {
    id: 'c1_s02a_train_exterior',
    chapter: 1,
    title: 'Von außen',
    narrative: `Du stehst vor der offenen Tür.

An der Seite des Wagens: Ein Schriftzug. Verblichen. Du kannst nur Teile lesen: „—CHTZUG 1—". Der Rest fehlt. Abgekratzt.

Durch das nächste Fenster siehst du eine Frau. Sie starrt geradeaus. Ihre Augen bewegen sich nicht. Ihre Hände liegen gefaltet im Schoß. Perfekt symmetrisch. Du wartest darauf, dass sie blinzelt. Sie tut es nicht.

Hinter dir: Das Brummen wird leiser. Der Zug wird gleich weiterfahren. Du weißt es.`,
    choices: [
      {
        id: 'board_now',
        label: 'Einsteigen. Ich muss Emma finden.',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'touch_exterior',
        label: 'Den Schriftzug „—CHTZUG 1—" analysieren.',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'observe_woman',
        label: 'Die starrende Frau im Fenster ansehen. Lebt sie?',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'ask_aloud_aggressive',
        label: '„Hallo? Reagiert hier auch mal jemand?" (Laut werden)',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Shortened narrative',
      'Direct link to c1_s03_inside_train'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s03_inside_train: Im Zug (Merged Silence)
  // ============================================================================
  'c1_s03_inside_train': {
    id: 'c1_s03_inside_train',
    chapter: 1,
    title: 'Innen',
    narrative: `Du steigst ein. Die Tür schließt sich mit einem finalen Klack.

Stille. Eine zu saubere Stille, als hätte jemand den Ton abgedreht. Der Druck auf deinen Ohren wächst, wie unter Wasser.

Der Wagen ist ein Gang mit Abteilen. Orange-braune Polstersitze, abgenutzt, Siebziger-Jahre-Muster. Messinglampen flackern. Es riecht nach altem Rauch und Pfeifentabak.

Der Zug setzt sich in Bewegung – sanft, schwebend. Kein Ruck.

Emma hätte diesen Zug gehasst. Zu alt. Zu kalt. Zu falsch. Aber sie ist nicht hier. Du musst sie finden.

Zur Linken: Ein Mann, mittleren Alters, der aus dem Fenster starrt. Seine Augen sind rot umrandet. Er trägt einen braunen Anzug, der aus der Zeit gefallen wirkt.

Zur Rechten: Ein leeres Abteil.`,
    choices: [
      {
        id: 'greet_man',
        label: 'Den Mann höflich grüßen. Wir sitzen im selben Boot.',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'find_seat_quiet',
        label: 'Still einen freien Platz suchen.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s03a_find_seat'
      },
      {
        id: 'analyze_silence',
        label: 'Die Umgebung prüfen. Warum ist es hier so still?',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03a_find_seat'
      },
      {
        id: 'break_silence_aggressive',
        label: 'Das Schweigen brechen. „Was ist das hier für eine Show?"',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_s03a_find_seat'
      }
    ],
    tags: [],
    state_notes: [
      'Merged Silence Interlude here',
      'Skip Corridor Walk -> Direct to Find Seat or Talk'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s03a_find_seat: Platz suchen (Was s03b)
  // ============================================================================
  'c1_s03a_find_seat': {
    id: 'c1_s03a_find_seat',
    chapter: 1,
    title: 'Sitzplatz',
    narrative: `Du suchst dir ein Abteil. Leer. Du setzt dich ans Fenster.

Die Polster sind weich, aber feucht. Als hätten sie lange in einem kalten Raum gestanden.

Durch das Fenster: Schwärze. Keine Lichter, keine Landschaft. Aber ab und zu ein Lichtpunkt, der sofort wieder verschwindet.

Du lehnst den Kopf ans Fenster. Das Glas ist warm. Viel zu warm.

Dann, eine Stimme hinter dir: „Du auch?"`,
    choices: [
      {
        id: 'turn_around_friendly',
        label: 'Ruhig umdrehen. „Ich auch was?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'turn_around_neutral',
        label: 'Sich langsam umdrehen, ohne ein Wort.',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'stay_with_window',
        label: 'Den Blick stur auf das Fenster gerichtet lassen.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'turn_around_aggressive',
        label: '„Schleich dich nicht so an!" (Scharf umdrehen)',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      }
    ],
    tags: [],
    state_notes: [
      'Shortened path'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s04_sleepless_intro: Der Schlaflose
  // ============================================================================
  'c1_s04_sleepless_intro': {
    id: 'c1_s04_sleepless_intro',
    chapter: 1,
    title: 'Der Schlaflose',
    narrative: `Der Mann steht im Gang. Seine Augen sind rot umrandet.

„Du auch?" sagt er. Seine Stimme ist rau.

„Auch was?"

„Keine Ahnung, wo du eingestiegen bist. Kein Ticket in der Tasche. Keine Erinnerung."

Er lächelt müde. „Willkommen im Nachtzug."

Du greifst in deine Tasche. Leer. Kein Ticket. Dein Handy – oder was es war – ist still.

„Wo sind wir?"

Er zuckt mit den Schultern. „Unterwegs."`,
    choices: [
      {
        id: 'ask_help',
        label: '„Können Sie mir helfen? Ich verstehe das nicht."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'ask_destination',
        label: '„Wohin fährt dieser Zug genau? Haben Sie einen Plan?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'question_knowledge',
        label: '„Woher wollen Sie wissen, dass ich kein Ticket habe?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'demand_answers',
        label: '„Das ist doch Unsinn. Ich will eine klare Antwort."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      }
    ],
    tags: ['reveal'],
    state_notes: [],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s04a_sleepless_past: Tiefere Konversation (Merged Warning)
  // ============================================================================
  'c1_s04a_sleepless_past': {
    id: 'c1_s04a_sleepless_past',
    chapter: 1,
    title: 'Seine Geschichte',
    narrative: `„Es war Nacht, als ich eingestiegen bin. Es ist immer noch Nacht." Er zeigt auf seine Uhr. Das Zifferblatt ist leer. Keine Zeiger.

Er sieht dich an. „Hast du jemanden gesucht? Bevor du hier warst?"

Ein Gesicht blitzt auf. Verschwimmt.

„Die meisten von uns suchen jemanden. Oder sie laufen weg. Manchmal beides."

Er beugt sich vor, senkt die Stimme. „Hör zu. Wenn der Schaffner kommt… Sag nicht dein Ziel. Er fragt nach dem Warum, nicht nach dem Wo. Verstanden?"`,
    choices: [
      {
        id: 'admit_searching',
        label: '„Ich suche jemanden. Emma." (Die Wahrheit sagen)',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'ask_counter',
        label: '„Und was machst du hier? Suchst du auch?" (Gegenfrage)',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'ask_about_conductor',
        label: '„Was hat es mit dem Schaffner auf sich? Warum die Warnung?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'deny_running',
        label: '„Ich laufe vor gar nichts weg. Lass mich in Ruhe."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Merged with warning about conductor',
      'Shortened path'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s05_first_anomaly: Erste Anomalie (Merged Announcement)
  // ============================================================================
  'c1_s05_first_anomaly': {
    id: 'c1_s05_first_anomaly',
    chapter: 1,
    title: 'Durchsage',
    narrative: `Eine Lautsprecherdurchsage knistert durch den Wagen:

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause.

„—[unverständlich]. Bitte achten Sie auf Ihre persönlichen Gegenstände."

Der Schlaflose zuckt nicht mal. „Der Name der Station. Er fehlt. Seit drei Halten."

Die Durchsage wiederholt sich, verzerrt: „—ückf—"

Rückfahrt? Rückkehr?

„Weil sie noch keinen Namen hat," sagt der Schlaflose. „Oder wir ihn vergessen haben."`,
    choices: [
      {
        id: 'ask_sleepless',
        label: '„Hörst du das auch? Was bedeutet das?" (Den Schlaflosen fragen)',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'write_it_down',
        label: 'Versuchen, das Wortfetzen „Rückf-" zu notieren.',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'dismiss_error',
        label: 'Das ist doch eine Aufnahme. Ein Fehler im Band.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'bang_speaker',
        label: 'Gegen den Lautsprecher klopfen. „Funktioniert hier irgendwas?"',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Merged with announcement repeat hint',
      'Shortened path to Other Passengers'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s05a_other_passengers: Andere Passagiere
  // ============================================================================
  'c1_s05a_other_passengers': {
    id: 'c1_s05a_other_passengers',
    chapter: 1,
    title: 'Die anderen',
    narrative: `Du schaust dich um. Außer dem Schlaflosen:

Eine Frau, Ende dreißig. Mantel zugeknöpft. Ihre Hände gefaltet, perfekt symmetrisch.
Ein Mann mit Brille. Er hält ein Buch mit leeren Seiten, blättert aber um.
Ein Teenager mit nicht angeschlossenen Kopfhörern, der im Rhythmus nickt.

Niemand spricht. Niemand bewegt sich. Außer diesen kleinen Gesten.`,
    choices: [
      {
        id: 'approach_woman_gentle',
        label: 'Vorsichtig auf die Frau zugehen. „Alles in Ordnung?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'memorize_scene',
        label: 'Die Anzahl der Passagiere und ihre Positionen merken.',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'observe_breathing',
        label: 'Sie genau beobachten. Atmen sie überhaupt?',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'ignore_extras',
        label: 'Sie ignorieren. Das sind doch nur Statisten.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      }
    ],
    tags: ['setup'],
    state_notes: [],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s05b_compartment7_tease: Abteil 7 Andeutung
  // ============================================================================
  'c1_s05b_compartment7_tease': {
    id: 'c1_s05b_compartment7_tease',
    chapter: 1,
    title: 'Am Ende',
    narrative: `Du gehst weiter durch den Wagen. Am Ende: Eine Tür. Massiv. Holz.

Nummer 7.

Ein handgeschriebenes Schild: „Besetzt".

Du hörst Geräusche dahinter. Leises Kratzen. Papier auf Papier.

Der Schlaflose ruft von hinten: „Geh da nicht rein. Du bist noch nicht bereit."`,
    choices: [
      {
        id: 'feel_connection',
        label: 'Die Hand sanft auf das Holz legen. Eine Verbindung spüren.',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05c_comp7_listen'
      },
      {
        id: 'ask_sleepless_content',
        label: 'Den Schlaflosen fragen: „Was ist da drin?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05c_comp7_listen'
      },
      {
        id: 'listen_to_sleepless',
        label: 'Auf den Schlaflosen hören und Abstand halten. Er weiß mehr.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05c_comp7_listen'
      },
      {
        id: 'knock_defiant',
        label: 'Trotzdem klopfen. Ich lasse mir nichts verbieten.',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05c_comp7_listen'
      }
    ],
    tags: ['reveal', 'setup'],
    state_notes: [],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s05c_comp7_listen: Vor der Tür horchen (Was s05d)
  // ============================================================================
  'c1_s05c_comp7_listen': {
    id: 'c1_s05c_comp7_listen',
    chapter: 1,
    title: 'Horchen',
    narrative: `Du bleibst kurz stehen. Von innen: Eine Stimme. Leise.

„—muss stimmen. Muss. Wenn ich nur—"

Das Kratzen wird lauter. Hektischer.

Dann, ein Knall. Als würde etwas umfallen.

Der Boden unter dir vibriert plötzlich. Nicht vom Zug. Von der Tür.

Dann: Stille. Der Zug wird langsamer.`,
    choices: [
      {
        id: 'whisper_help',
        label: 'Leise flüstern: „Kann ich helfen?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'analyze_sounds',
        label: 'Das Gehörte analysieren. War das ein Streit?',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'step_away_scared',
        label: 'Erschrocken zurückweichen. Das klang gefährlich.',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'bang_door',
        label: '„Hey! Macht auf!" (Gegen die Tür hämmern)',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_end_station'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Skip Corridor End/Stranger -> Direct to Station'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_end_station: Station Ende (Merged Platform Look)
  // ============================================================================
  'c1_end_station': {
    id: 'c1_end_station',
    chapter: 1,
    title: 'Halt',
    narrative: `Der Zug hält. Du schaust aus dem Fenster.

Draußen: Ein Bahnsteig. Identisch zum ersten. Dieselbe Neonröhre. Dieselbe Uhr: 23:47. Niemand steigt ein. Niemand steigt aus.

Du drehst dich zum Schlaflosen um. Er sieht anders aus. Seine Jacke ist jetzt dunkelblau. Vorher war sie grau.

Er bemerkt deinen Blick. „Was?"

„Deine Jacke… Sie war grau."

Er lacht trocken. „Sie war immer blau."

Er zerknüllt einen Zettel, den er in der Hand hält. Seine Finger zittern.

„Was stand da?"

„Nichts Wichtiges."`,
    choices: [
      {
        id: 'accept_confusion',
        label: 'Es akzeptieren. „Vielleicht habe ich mich geirrt. Weiter."',
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s01_ticket_search'
      },
      {
        id: 'register_anomaly',
        label: 'Nichts sagen, aber die Anomalie registrieren.',
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s01_ticket_search'
      },
      {
        id: 'insist_grey',
        label: '„Deine Jacke war grau." (Auf der Wahrheit beharren)',
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c2_s01_ticket_search'
      },
      {
        id: 'leave_games',
        label: '„Spielchen. Alles nur Spielchen." (Kopfschüttelnd aussteigen)',
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c2_s01_ticket_search'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Merged Platform Look + End Scene',
      'Preserves Drift Mechanics'
    ],
    atmosphere: 'somber'
  }
};
