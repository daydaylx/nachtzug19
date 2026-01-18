// ============================================================================
// NACHTZUG 19 - Kapitel 1: Leerer Bahnsteig
// ============================================================================
// Szenen (24):
// Setup: c1_s01_platform, c1_s01a_platform_details
// Interludes: c1_interlude_01_lights, c1_interlude_02_silence, c1_interlude_03_window, c1_interlude_04_clock, c1_interlude_05_vibration
// Train: c1_s02_train_appears, c1_s02a_train_exterior
// Inside: c1_s03_inside_train, c1_s03a_corridor_walk, c1_s03b_find_seat
// Sleepless: c1_s04_sleepless_intro, c1_s04a_sleepless_past, c1_s04b_sleepless_warning
// Anomaly: c1_s05_first_anomaly, c1_s05a_other_passengers, c1_s05b_compartment7_tease, c1_s05c_announcement_repeat, c1_s05d_comp7_listen
// Corridor: c1_s06_corridor_end, c1_s07_stranger_encounter
// End: c1_end_platform_look, c1_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter1Scenes: ScenesCollection = {
  // ============================================================================
  // c1_s01_platform: Einstieg
  // ============================================================================
  'c1_s01_platform': {
    id: 'c1_s01_platform',
    chapter: 1,
    title: 'Leerer Bahnsteig',
    narrative: `Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer.

Keine Werbeplakate. Keine Bänke. Keine Automaten. Nur nackte Wände aus Beton, fleckig von Feuchtigkeit. Eine Neonröhre flackert über dir. Das Licht ist kalt, blaugrün, wirft harte Schatten auf den Boden.

Die Anzeigetafel zeigt: 23:47.

Kein Text. Kein „Nächster Zug". Nur ein blinkendes Feld, leer wie der Bahnsteig.

Du weißt nicht mehr, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt. Es gibt einen Grund – du bist sicher, dass es einen gab – aber er ist weg. Verschluckt.

Aber du weißt: Du wartest auf etwas.

Die Luft riecht nach altem Zigarettenrauch und Maschinenöl. Kalt. Zu kalt für Juni. Du ziehst die Jacke enger, aber es hilft nicht. Die Kälte kommt von innen.

Ein Gefühl von Verlust flackert auf. Ein Name, den du fast greifen kannst, aber der wie Rauch verweht. Du solltest nicht allein hier sein.`,
    narrative_variants: [
      {
        min_drift: 5,
        narrative: `Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer.

Keine Werbeplakate. Keine Bänke. Keine Automaten. Nur nackte Wände aus Beton, fleckig von Feuchtigkeit. Eine Neonröhre flackert über dir. Das Licht ist kalt, grünlich, wirft harte Schatten auf den Boden.

Die Anzeigetafel zeigt: 23:46.

Kein Text. Kein „Nächster Zug". Nur ein blinkendes Feld, leer wie der Bahnsteig.

Du weißt nicht mehr, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt. Es gibt einen Grund – du bist sicher, dass es einen gab – aber er ist weg. Verschluckt.

Aber du weißt: Du wartest auf etwas.

Die Luft riecht nach altem Zigarettenrauch und Maschinenöl. Kalt. Zu kalt für Juli. Du ziehst die Jacke enger, aber es hilft nicht. Die Kälte kommt von innen.`
      },
      {
        min_drift: 7,
        narrative: `Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer.

Keine Werbeplakate. Keine Bänke. Keine Automaten. Nur nackte Wände aus Beton, fleckig von Feuchtigkeit. Zwei Neonröhren flackern über dir. Das Licht ist kalt, grünlich, wirft harte Schatten auf den Boden.

Die Anzeigetafel zeigt: 23:49.

Kein Text. Kein „Nächster Zug". Nur ein blinkendes Feld, leer wie der Bahnsteig.

Du weißt nicht mehr, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt. Es gibt einen Grund – du bist sicher, dass es einen gab – aber er ist weg. Verschluckt.

Aber du weißt: Du wartest auf etwas.

Die Luft riecht nach altem Zigarettenrauch und Maschinenöl. Kalt. Zu kalt für Juli. Du ziehst die Jacke enger, aber es hilft nicht. Die Kälte kommt von innen.`
      }
    ],
    choices: [
      {
        id: 'look_around',
        label: 'Umsehen und warten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'check_phone',
        label: 'Handy checken',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'try_leave',
        label: 'Versuchen zu gehen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Erste Ticket-Verteilung: Truth (beobachten), Escape (ablenken), Guilt (gehen wollen)',
      'try_leave erhöht conductor_attention (wird später relevant)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s01a_platform_details: Bahnsteig genauer untersuchen
  // ============================================================================
  'c1_s01a_platform_details': {
    id: 'c1_s01a_platform_details',
    chapter: 1,
    title: 'Details',
    narrative: `Du setzt dich in Bewegung, unschlüssig ob du suchen oder fliehen willst. Der Beton unter deinen Sohlen klingt hohl. Das Echo verliert sich in der Leere.

Am Rand des Bahnsteigs: Eine gelbe Linie, abgeblättert. Dahinter die Schienen. Sie glänzen nicht. Kein Rost, aber auch kein Metall. Schwarz. Matt. Als wären sie aus etwas anderem gemacht.

Die Uhr tickt nicht. Sie steht still. 23:47.

Du drehst dich um. Am anderen Ende des Bahnsteigs – vielleicht hundert Meter entfernt – flackert eine zweite Neonröhre. Zwischen dir und ihr: Nichts. Keine Schatten. Keine Bewegung. Nur Beton und diese falsche Stille.

Dann, ein Geräusch.

Nicht das Rattern von Schienen. Tiefer. Ein Brummen, das du im Brustkorb spürst. Von unten. Von überall.`,
    choices: [
      {
        id: 'step_back',
        label: 'Einen Schritt zurücktreten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_interlude_01_lights'
      },
      {
        id: 'look_tracks',
        label: 'Die Schienen fixieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_interlude_01_lights'
      },
      {
        id: 'feel_guilty',
        label: 'Denken: „Ich sollte nicht hier sein"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_interlude_01_lights'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Schienen-Detail: schwarz/matt (erste subtile Anomalie)',
      'Uhr steht still (Zeit ist kaputt)',
      'feel_guilty erhöht memory_drift (Unsicherheit manifestiert sich)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_interlude_01_lights: Licht-Interlude
  // ============================================================================
  'c1_interlude_01_lights': {
    id: 'c1_interlude_01_lights',
    chapter: 1,
    title: 'Lichtwechsel',
    narrative: `Die Neonröhre über dir flackert schneller.

Ein, aus, ein, aus.

Im Rhythmus des Brummens. Als wären sie verbunden.

Du siehst deinen Schatten auf dem Boden. Er ist länger geworden. Viel länger. Die Proportionen stimmen nicht.

Dann wird das Licht konstant. Die Röhre hört auf zu flackern. Das Brummen bleibt.`,
    choices: [
      {
        id: 'close_eyes',
        label: 'Augen schliessen und atmen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'continue',
        label: 'Weiter',
        effects: [],
        next: 'c1_s02_train_appears'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Schatten stimmt nicht (erste visuelle Drift)',
      'Interlude: kurz, atmosphärisch, kein Plot',
      'close_eyes senkt attention, wenn bereits aufgebaut'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s02_train_appears: Zug erscheint
  // ============================================================================
  'c1_s02_train_appears': {
    id: 'c1_s02_train_appears',
    chapter: 1,
    title: 'Der Zug',
    narrative: `Das Brummen wird lauter. Es kommt nicht näher – es ist einfach da. Überall. In deinen Knochen.

Dann gleitet der Zug in den Bahnhof. Lautlos.

Er sieht aus wie ein alter Nachtzug. Achtziger Jahre. Abblätternde dunkelrote Farbe, stellenweise schwarz verfärbt. Fenster zu schmal, Rahmen vergilbt. Die Wagen sind lang. Zu lang. Mindestens acht. Vielleicht mehr.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen. Niemand bewegt sich. Als wären sie eingefroren.

Die Türen öffnen sich mit einem Zischen. Warme Luft strömt heraus. Riecht nach altem Polster und etwas Suesslichem, das du nicht benennen kannst. Verbrannter Zucker? Feuchtigkeit? Etwas darunter, das du nicht einordnen willst.

Die Stufen glaenzen feucht. Ein duenner Nebel haengt in der Tuer, als haette der Zug seinen eigenen Atem. Du spuerst die Waerme an den Knoecheln, aber der Griff der Tuere ist kalt, Metall, das zu lange im Schatten lag. Am Rahmen klebt etwas Dunkles, ein Streifen wie getrockneter Oelstaub. Als du ihn beruehrst, bleibt ein grauer Abdruck auf deinem Finger.

Niemand steigt aus.`,
    narrative_variants: [
      {
        min_drift: 5,
        narrative: `Das Brummen wird lauter. Es kommt nicht näher – es ist einfach da. Überall. In deinen Knochen.

Dann gleitet der Zug in den Bahnhof. Lautlos.

Er sieht aus wie ein alter Nachtzug. Siebziger Jahre. Abblätternde dunkelrote Farbe, stellenweise schwarz verfärbt. Fenster zu schmal, Rahmen vergilbt. Die Wagen sind lang. Zu lang. Mindestens neun. Vielleicht mehr.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen. Niemand bewegt sich. Als wären sie eingefroren.

Die Türen öffnen sich mit einem Zischen. Warme Luft strömt heraus. Riecht nach altem Polster und etwas Suesslichem, das du nicht benennen kannst. Verbrannter Zucker? Feuchtigkeit? Etwas darunter, das du nicht einordnen willst.

Die Stufen glaenzen feucht. Ein duenner Nebel haengt in der Tuer, als haette der Zug seinen eigenen Atem. Du spuerst die Waerme an den Knoecheln, aber der Griff der Tuere ist kalt, Metall, das zu lange im Schatten lag. Am Rahmen klebt etwas Dunkles, ein Streifen wie getrockneter Oelstaub. Als du ihn beruehrst, bleibt ein schwarzer Abdruck auf deinem Finger.

Niemand steigt aus.`
      },
      {
        min_drift: 7,
        narrative: `Das Brummen wird lauter. Es kommt nicht näher – es ist einfach da. Überall. In deinen Knochen.

Dann gleitet der Zug in den Bahnhof. Lautlos.

Er sieht aus wie ein alter Nachtzug. Siebziger Jahre. Abblätternde dunkelrote Farbe, stellenweise schwarz verfärbt. Fenster zu schmal, Rahmen vergilbt. Die Wagen sind lang. Zu lang. Mindestens zehn. Vielleicht mehr.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen. Niemand bewegt sich. Als wären sie eingefroren.

Die Türen öffnen sich mit einem Zischen. Kalte Luft strömt heraus. Riecht nach altem Polster und etwas Suesslichem, das du nicht benennen kannst. Verbrannter Zucker? Feuchtigkeit? Etwas darunter, das du nicht einordnen willst.

Die Stufen glaenzen feucht. Ein duenner Nebel haengt in der Tuer, als haette der Zug seinen eigenen Atem. Du spuerst die Kaelte an den Knoecheln, und der Griff der Tuere ist kalt, Metall, das zu lange im Schatten lag. Am Rahmen klebt etwas Dunkles, ein Streifen wie getrockneter Oelstaub. Als du ihn beruehrst, bleibt ein schwarzer Abdruck auf deinem Finger.

Niemand steigt aus.`
      }
    ],
    choices: [
      {
        id: 'board_immediately',
        label: 'Sofort einsteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'inspect_train',
        label: 'Den Zug genauer ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'hesitate',
        label: 'Zögern',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'call_out',
        label: 'In den Zug rufen',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 2 },
            { type: 'compare', target: 'conductor_attention', operator: '>=', value: 1 }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'hesitate erhöht memory_drift, call_out erhöht attention',
      'Süßlicher Geruch (unbenannt = unheimlich)',
      'Niemand steigt aus (erste Regelabweichung)'
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
    narrative: `Du stehst vor der offenen Tür. Die Stufen sind schmal, Metall. Kalt, auch durch die warme Luft, die aus dem Zug strömt.

An der Seite des Wagens: Ein Schriftzug. Verblichen. Du kannst nur Teile lesen: „—CHTZUG 1—". Der Rest fehlt. Abgekratzt oder nie dagewesen.

Durch das nächste Fenster siehst du eine Frau. Sie starrt geradeaus. Ihre Augen bewegen sich nicht. Ihre Hände liegen gefaltet im Schoß. Perfekt symmetrisch.

Du wartest darauf, dass sie blinzelt.

Sie tut es nicht.

Hinter dir: Ein Geräusch. Schritte? Nein. Nur das Brummen, das leiser wird. Der Zug wird gleich weiterfahren. Du weißt es. Nicht denken, wissen.`,
    choices: [
      {
        id: 'board_now',
        label: 'Einsteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_interlude_02_silence'
      },
      {
        id: 'touch_exterior',
        label: 'Die Außenwand berühren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_interlude_02_silence'
      },
      {
        id: 'ask_aloud',
        label: '„Ist da jemand?" rufen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_interlude_02_silence'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Schriftzug unvollständig (NACHTZUG 19 versteckt)',
      'Frau blinzelt nicht (NPC-Anomalie)',
      'ask_aloud erhöht conductor_attention (Lautstärke wird registriert)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_interlude_02_silence: Stille-Interlude
  // ============================================================================
  'c1_interlude_02_silence': {
    id: 'c1_interlude_02_silence',
    chapter: 1,
    title: 'Stille',
    narrative: `Du steigst ein. Die Tür schließt sich hinter dir mit einem finalen Klack.

Und dann: Stille.

Nicht die normale Stille, wenn man in einen Zug einsteigt. Eine zu saubere Stille. Als wäre der Raum schalldicht.

Du schluckst. Das Geräusch bleibt aus. Es fühlt sich an, als hätte jemand den Raum ausgekleidet.

Du hebst die Hand, klopfst leicht gegen das Metall. Kein Echo. Nur ein stumpfer Widerstand, der in deine Finger kriecht.

Du öffnest den Mund, um deinen Namen zu sagen. Luft bewegt sich, aber der Ton bleibt hängen, als hätte er keinen Platz.

Dein eigener Puls drückt von innen gegen die Ohren. Ein dumpfes Pochen, das nicht von außen kommt.

Der Geruch von altem Polster ist plötzlich schärfer, süßlich und staubig, und du merkst, wie du flacher atmest.

Du reibst die Fingerspitzen an der Kante des Sitzes, suchst ein Geräusch, ein Zeichen. Nichts. Die Stille antwortet nicht, sie bleibt.

Du hörst, wie der Stoff deiner Jacke an deinem Hals scheuert, ein Geräusch, das nur in dir stattfindet. Die Stille drückt gegen die Augen, als wäre sie greifbar, und du blinzelst, nur um etwas zu bewegen. Es hilft nicht. Die Luft bleibt fest.

Kein Rattern. Kein Ventilator. Kein Gemurmel.

Nur das Brummen, leise im Hintergrund. Konstant. Wie ein Herzschlag.`,
    choices: [
      {
        id: 'stay_quiet',
        label: 'Ganz still bleiben',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Zu saubere Stille (akustische Anomalie)',
      'Interlude: sensorischer Fokus (Gehör)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s03_inside_train: Im Zug
  // ============================================================================
  'c1_s03_inside_train': {
    id: 'c1_s03_inside_train',
    chapter: 1,
    title: 'Innen',
    narrative: `Der Zug setzt sich in Bewegung – sanft, als würde er schweben. Kein Ruck. Keine Beschleunigung. Er gleitet.

Der Wagen ist ein Gang mit Abteilen. Rote Polstersitze, abgenutzt, mit hellen Flecken an den Armlehnen. Messinglampen, die flackern. Holzverkleidung, die nach altem Rauch riecht. Zigaretten, aber auch etwas anderes. Süßer.

Der Boden vibriert kaum merklich, mehr ein Puls als eine Bewegung. Unter deinen Schuhen ist der Teppich duenn, abgelaufen, an den Kanten hart vom Staub. An den Fenstern klebt ein feiner Film aus Kondenswasser, der kuehl ist, als du kurz mit dem Finger entlangfährst.

Aus den Lampen kommt ein leises Summen, das nicht zum Flackern passt. Es haengt in der Luft wie ein Ton, den nur du hoerst. Irgendwo knackt Holz, als wuerde jemand im nächsten Abteil den Sitz verstellen, aber du siehst niemanden sich bewegen.

Zur Linken: Ein Mann, mittleren Alters, der aus dem Fenster starrt. Seine Augen sind rot umrandet. Als hätte er seit Tagen nicht geschlafen.

Zur Rechten: Ein leeres Abteil mit einem Koffer auf dem Sitz. Leder, verwittert. Niemand in der Nähe. Das Abteil ist unverschlossen.`,
    choices: [
      {
        id: 'talk_to_man',
        label: 'Den Mann ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'examine_suitcase',
        label: 'Den Koffer untersuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03a_corridor_walk'
      },
      {
        id: 'find_seat',
        label: 'Einfach einen Platz suchen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s03a_corridor_walk'
      }
    ],
    tags: [],
    state_notes: [
      'Talk_to_man führt direkt zu Sleepless',
      'Koffer-Hinweis: Wird in Kap. 2 relevant (Comp7-Intro)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s03a_corridor_walk: Gang-Wanderung
  // ============================================================================
  'c1_s03a_corridor_walk': {
    id: 'c1_s03a_corridor_walk',
    chapter: 1,
    title: 'Gang',
    narrative: `Du gehst den Gang entlang. Die Lampen flackern im Rhythmus der Schienen. Aber es gibt kein Schienenrasseln. Nur das Brummen, konstant und tief.

Ein Fenster zur Rechten. Draußen: Schwärze. Keine Lichter. Keine Landschaft. Nur Schwarz, das sich nicht bewegt. Keine Reflexion. Kein Glas zwischen dir und der Schwärze – nur Rahmen.

Im nächsten Abteil sitzt ein Kind. Vielleicht acht Jahre alt. Es malt in ein Heft. Du siehst die Zeichnung: Ein Zug. Viel zu lang. Die Wagen sind verbunden mit Strichen, die nicht gerade sind. Gekrümmt. Als würde der Zug sich biegen.

Das Kind blickt auf. Sieht dich an. Sagt nichts.

Dann zurück zur Zeichnung.`,
    choices: [
      {
        id: 'ask_child',
        label: '„Was malst du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s03b_find_seat'
      },
      {
        id: 'look_at_drawing',
        label: 'Die Zeichnung genauer ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s03b_find_seat'
      },
      {
        id: 'keep_walking_past',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s03b_find_seat'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Kind malt Zug (Meta-Hinweis: Zug ist zu lang und gebogen)',
      'Schwärze draußen (keine Außenwelt sichtbar)',
      'look_at_drawing erhöht memory_drift (zu viel Fokus destabilisiert)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s03b_find_seat: Platz suchen
  // ============================================================================
  'c1_s03b_find_seat': {
    id: 'c1_s03b_find_seat',
    chapter: 1,
    title: 'Sitzplatz',
    narrative: `Du suchst dir ein Abteil. Leer. Du setzt dich ans Fenster.

Die Polster sind weich, aber feucht. Als hätten sie lange in einem kalten Raum gestanden.

Durch das Fenster: Immer noch Schwärze. Aber jetzt siehst du ab und zu einen Lichtpunkt. Weit weg. Dann weg.

Du lehnt den Kopf ans Fenster. Das Glas ist warm. Viel zu warm.

Dann, eine Stimme hinter dir: „Du auch?"`,
    choices: [
      {
        id: 'turn_around',
        label: 'Sich umdrehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'ignore_voice',
        label: 'Ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      }
    ],
    tags: [],
    state_notes: [
      'Warmes Glas (Temperatur-Anomalie)',
      'Lichtpunkte draußen (erste Außenwelt-Andeutung)'
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
    narrative: `Der Mann steht im Gang. Seine Augen sind rot umrandet, als hätte er seit Tagen nicht geschlafen. Seine Kleidung ist ordentlich, aber zerknittert.

„Du auch?" sagt er. Seine Stimme ist rau. Trocken.

Du fragst: „Auch was?"

„Keine Ahnung, wo du eingestiegen bist. Kein Ticket in der Tasche. Keine Erinnerung daran, wie du hier gelandet bist."

Er lächelt müde. „Willkommen im Nachtzug."

Seine Worte treffen wie ein Schlag. Du greifst in deine Tasche. Leer. Kein Ticket. Keine Quittung. Nichts. Nicht mal das Handy, das du vorhin checken wolltest.

„Wo ist mein Handy?"

Er zuckt mit den Schultern. „Hattest du eins?"`,
    choices: [
      {
        id: 'ask_where',
        label: '„Wo fährt der Zug hin?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'ask_how_long',
        label: '„Wie lange bist du schon hier?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'deny',
        label: '„Das kann nicht sein."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Sleepless etabliert die Grundregel: Niemand hat ein Ticket',
      'ask_where/ask_how_long: Unterschied zwischen Truth (Fakten) und Love (Empathie)',
      'deny: Escape-Pattern, verschlechtert Beziehung',
      'Handy ist weg (Item-Loss, Isolation)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s04a_sleepless_past: Tiefere Konversation
  // ============================================================================
  'c1_s04a_sleepless_past': {
    id: 'c1_s04a_sleepless_past',
    chapter: 1,
    title: 'Seine Geschichte',
    narrative: `Der Schlaflose lehnt sich gegen die Wand. „Ich weiß es nicht. Wie lange ich hier bin."

Er zeigt auf seine Uhr. Das Zifferblatt ist leer. Keine Zeiger. Nur ein rundes weißes Feld.

„Es war Nacht, als ich eingestiegen bin. Es ist immer noch Nacht. Vielleicht war es immer Nacht."

Er sieht dich an. Direkt. Seine Augen sind wässrig. „Hast du jemanden gesucht? Bevor du hier warst?"

Du denkst nach. Ein Gesicht blitzt auf. Verschwimmt. Weg. Du kannst es nicht festhalten.

„Ich glaube schon," sagst du.

Er nickt. „Die meisten von uns suchen jemanden. Oder sie laufen weg."

Eine Pause.

„Manchmal beides."`,
    choices: [
      {
        id: 'admit_searching',
        label: '„Ich suche jemanden."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c1_interlude_03_window'
      },
      {
        id: 'admit_running',
        label: '„Ich laufe weg."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_interlude_03_window'
      },
      {
        id: 'ask_about_watch',
        label: '„Was ist mit deiner Uhr passiert?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_interlude_03_window'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Uhr ohne Zeiger (Zeit existiert nicht)',
      'Gesicht blitzt auf (Callback: Memory-Glitch)',
      'admit_searching: Love +1, rel +2 (starke emotionale Öffnung)',
      'admit_running: Guilt-Pattern (Flucht vor Verantwortung)',
      '"Manchmal beides" = Comp7-Foreshadowing'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_interlude_03_window: Fenster-Interlude
  // ============================================================================
  'c1_interlude_03_window': {
    id: 'c1_interlude_03_window',
    chapter: 1,
    title: 'Fenster',
    narrative: `Der Schlaflose geht zurück zu seinem Platz.

Du bleibst am Fenster stehen.

Draußen: Immer noch Schwärze. Aber jetzt siehst du Strukturen. Schatten von Bäumen? Häusern? Oder nur deine Reflexion, die sich bewegt?

Du hebst die Hand. Deine Reflexion hebt die Hand.

Aber eine Sekunde zu spät.`,
    choices: [
      {
        id: 'touch_glass',
        label: 'Die Hand ans Glas legen',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s04b_sleepless_warning'
      },
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s04b_sleepless_warning'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Reflexion verzögert (visueller Drift)',
      'Interlude: subtile Anomalie, kein Plot',
      'touch_glass nur bei memory_drift >= 1'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s04b_sleepless_warning: Warnung
  // ============================================================================
  'c1_s04b_sleepless_warning': {
    id: 'c1_s04b_sleepless_warning',
    chapter: 1,
    title: 'Warnung',
    narrative: `Der Schlaflose ruft von seinem Platz: „Wenn der Schaffner kommt—"

Er zögert.

„Was?" fragst du.

„Sag nicht dein Ziel. Nicht zuerst. Er fragt nach dem Warum, nicht nach dem Wo."

„Was passiert, wenn ich es doch sage?"

Er sieht dich an. „Dann wird es schwieriger. Für dich. Und für die anderen."

Du willst nachfragen, aber er schüttelt den Kopf. „Du wirst es sehen. Jeder sieht es anders."`,
    choices: [
      {
        id: 'thank_him',
        label: '„Danke."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'ask_more',
        label: '„Was meinst du mit anders?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'dismiss',
        label: '„Ich komme schon klar."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Schaffner-Regel etabliert: "Warum", nicht "Wo"',
      'ask_more erhöht conductor_attention (zu viele Fragen = Aufmerksamkeit)',
      '"Jeder sieht es anders" = subjektive Realität'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s05_first_anomaly: Erste Anomalie
  // ============================================================================
  'c1_s05_first_anomaly': {
    id: 'c1_s05_first_anomaly',
    chapter: 1,
    title: 'Durchsage',
    narrative: `Eine Lautsprecherdurchsage knistert durch den Wagen:

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause.

Dann, als würde jemand ein Band zurückspulen:

„—erreichen in Kürze [unverständlich]. Bitte achten Sie auf Ihre persönlichen Gegenstände."

Der Schlaflose zuckt nicht mal. Als hätte er das schon hundertmal gehört.

Du fragst: „Was war das?"

Er seufzt. „Der Name der Station. Er fehlt. Seit drei Halten. Immer dasselbe."

„Warum?"

Er lächelt müde. „Weil sie noch keinen Namen hat. Oder wir ihn vergessen haben. Oder beides."`,
    choices: [
      {
        id: 'write_it_down',
        label: 'Versuche, es aufzuschreiben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_interlude_04_clock'
      },
      {
        id: 'ignore_anomaly',
        label: 'Ignorieren und weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'ask_sleepless',
        label: 'Den Schlaflosen fragen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'analyze_announcement',
        label: 'Die Durchsage aufmerksam analysieren',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_interlude_04_clock'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'write_it_down erhöht conductor_attention (Aufmerksamkeit wird registriert)',
      'Erste Memory-Drift-Manifestation (Stationsname fehlt)',
      'Durchsage wiederholt sich (Loop-Mechanik)',
      'CONDITION: analyze_announcement nur bei memory_drift >= 1'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_interlude_04_clock: Uhr-Interlude
  // ============================================================================
  'c1_interlude_04_clock': {
    id: 'c1_interlude_04_clock',
    chapter: 1,
    title: 'Uhr',
    narrative: `Du siehst auf dein Handgelenk. Keine Uhr.

Hattest du eine? Du erinnerst dich nicht.

Die Anzeigetafel im Wagen zeigt: 23:47.

Dieselbe Zeit wie am Bahnsteig.

Die Ziffern flimmern, nicht flackernd, eher als würden sie müde atmen.

Du streckst den Finger aus und berührst das Plastik unter der Anzeige. Es ist warm, fast weich, und gibt ein wenig nach.

Du hörst ein leises Klicken irgendwo hinter der Wand, als würde ein Relais versuchen, die Minute zu wechseln.

Du zählst weiter. Bei vierunddreißig hältst du den Atem an, bei fünfzig presst du die Lippen zusammen.

Für einen Moment denkst du daran, die Tafel herunterzureißen. Dein Arm hebt sich schon, dann sinkt er wieder.

Die Luft riecht nach staubigem Metall und kalter Elektrik, und das Brummen im Boden legt sich wie eine zweite Uhr auf deinen Brustkorb.

Du tippst mit dem Fingernagel gegen die Anzeige. Der Ton ist stumpf, als würde er in Stoff landen. Ein dünner Film aus Staub bleibt an deinem Finger kleben.

Du wischst ihn an der Hose ab und siehst kurz eine dunkle Spur.

Du wartest. Zählst die Sekunden. Eins, zwei, drei… bis sechzig.

Die Tafel zeigt immer noch: 23:47.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du siehst auf dein Handgelenk. Keine Uhr.

Hattest du eine? Du erinnerst dich nicht.

Die Anzeigetafel im Wagen zeigt: 23:43.

Dieselbe Zeit wie am Bahnsteig.

Die Ziffern flimmern, nicht flackernd, eher als würden sie müde atmen.

Du streckst den Finger aus und berührst das Plastik unter der Anzeige. Es ist warm, fast weich, und gibt ein wenig nach.

Du hörst ein leises Klicken irgendwo hinter der Wand, als würde ein Relais versuchen, die Minute zu wechseln.

Du zählst weiter. Bei vierunddreißig hältst du den Atem an, bei fünfzig presst du die Lippen zusammen.

Für einen Moment denkst du daran, die Tafel herunterzureißen. Dein Arm hebt sich schon, dann sinkt er wieder.

Die Luft riecht nach staubigem Metall und kalter Elektrik, und das Brummen im Boden legt sich wie eine zweite Uhr auf deinen Brustkorb.

Du tippst mit dem Fingernagel gegen die Anzeige. Der Ton ist stumpf, als würde er in Stoff landen. Ein dünner Film aus Staub bleibt an deinem Finger kleben.

Du wischst ihn an der Hose ab und siehst kurz eine rötliche Spur.

Du wartest. Zählst die Sekunden. Eins, zwei, drei… bis sechzig.

Die Tafel zeigt immer noch: 23:43.`
      },
      {
        min_drift: 5,
        narrative: `Du siehst auf dein Handgelenk. Keine Uhr.

Hattest du eine? Du erinnerst dich nicht.

Die Anzeigetafel im Wagen zeigt: 00:12.

Dieselbe Zeit wie am Bahnsteig.

Die Ziffern flimmern, nicht flackernd, eher als würden sie müde atmen.

Du streckst den Finger aus und berührst das Plastik unter der Anzeige. Es ist kalt, fast feucht, und gibt ein wenig nach.

Du hörst ein leises Klicken irgendwo hinter der Wand, als würde ein Relais versuchen, die Minute zu wechseln.

Du zählst weiter. Bei vierunddreißig hältst du den Atem an, bei fünfzig presst du die Lippen zusammen.

Für einen Moment denkst du daran, die Tafel herunterzureißen. Dein Arm hebt sich schon, dann sinkt er wieder.

Die Luft riecht nach staubigem Metall und kalter Elektrik, und das Brummen im Boden legt sich wie eine zweite Uhr auf deinen Brustkorb.

Du tippst mit dem Fingernagel gegen die Anzeige. Der Ton ist stumpf, als würde er in Stoff landen. Ein dünner Film aus Staub bleibt an deinem Finger kleben.

Du wischst ihn an der Hose ab und siehst kurz eine rötliche Spur.

Du wartest. Zählst die Sekunden. Eins, zwei, drei… bis sechzig.

Die Tafel zeigt immer noch: 00:12.`
      }
    ],
    choices: [
      {
        id: 'note_time',
        label: 'Die Anzeige mitzaehlen',
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
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Zeit steht still (Meta-Regel: Zeit existiert nicht)',
      'Condition: Nur sichtbar wenn write_it_down gewählt wurde',
      'note_time nur bei tickets_truth >= 2'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s05a_other_passengers: Andere Passagiere beobachten
  // ============================================================================
  'c1_s05a_other_passengers': {
    id: 'c1_s05a_other_passengers',
    chapter: 1,
    title: 'Die anderen',
    narrative: `Du schaust dich um.

Außer dem Schlaflosen und dem Kind: Vier weitere Passagiere. Alle sitzen allein. Alle starren aus dem Fenster in die Schwärze.

Eine Frau, Ende dreißig. Mantel zugeknöpft, obwohl es warm ist. Ihre Hände sind gefaltet, perfekt symmetrisch.

Ein Mann mit Brille. Er hält ein Buch. Die Seiten sind leer. Aber er blättert um, als würde er lesen.

Ein Teenager mit Kopfhörern. Kein Kabel. Die Kopfhörer sind nicht angeschlossen. Aber er nickt im Rhythmus.

Eine alte Frau. Ihre Lippen bewegen sich stumm. Als würde sie beten. Oder rezitieren.

Niemand spricht. Niemand bewegt sich. Außer diesen kleinen Gesten.`,
    choices: [
      {
        id: 'count_passengers',
        label: 'Die Passagiere zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'approach_woman',
        label: 'Die Frau ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'leave_them_alone',
        label: 'Sie in Ruhe lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'stay_inconspicuous',
        label: 'Unauffällig bleiben',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Leere Buchseiten (Realität löst sich auf)',
      'Kopfhörer ohne Kabel (Details stimmen nicht)',
      'approach_woman erhöht conductor_attention (Interaktion = Risiko)',
      'Frau = Comp7-Foreshadowing',
      'CONDITION: stay_inconspicuous nur bei conductor_attention >= 2'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_s05b_compartment7_tease: Abteil 7 Andeutung
  // ============================================================================
  'c1_s05b_compartment7_tease': {
    id: 'c1_s05b_compartment7_tease',
    chapter: 1,
    title: 'Am Ende',
    narrative: `Du gehst weiter durch den Wagen. Der Gang ist länger als vorhin. Viel länger. Oder bildest du dir das ein?

Am Ende siehst du eine Tür. Massiv. Holz. Mit einer Zahl darauf, eingraviert:

7

Daneben ein Schild, handgeschrieben auf vergilbtem Papier: „Besetzt".

Du hörst Geräusche dahinter. Leises Kratzen. Papier auf Papier. Als würde jemand schreiben. Oder zeichnen.

Der Schlaflose ruft von hinten: „Geh da nicht rein. Noch nicht."

Du drehst dich um. „Warum?"

„Du bist noch nicht bereit."

„Wofür?"

Er antwortet nicht. Starrt dich nur an. Seine Augen sind müde, aber ernst.`,
    choices: [
      {
        id: 'knock_on_door',
        label: 'An die Tür klopfen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05c_announcement_repeat'
      },
      {
        id: 'listen_to_sleepless',
        label: 'Auf den Schlaflosen hören',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05c_announcement_repeat'
      },
      {
        id: 'feel_drawn',
        label: 'Die Hand auf die Tür legen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05c_announcement_repeat'
      },
      {
        id: 'examine_door_quietly',
        label: 'Die Tür untersuchen, ohne zu klopfen',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 2 },
            { type: 'compare', target: 'rel_comp7', operator: '>=', value: 1 }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05c_announcement_repeat'
      }
    ],
    tags: ['reveal', 'setup'],
    state_notes: [
      'Abteil 7 Intro (wird in Kap. 2 wichtig)',
      'Comp7-Beziehung etabliert',
      'knock_on_door: Truth + hohe Attention (riskante Neugier)',
      '"Noch nicht bereit" = Zugangsbedingung für später',
      'CONDITION: examine_door_quietly nur bei tickets_truth >= 2 ODER rel_comp7 >= 1'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s05c_announcement_repeat: Durchsage wiederholt sich
  // ============================================================================
  'c1_s05c_announcement_repeat': {
    id: 'c1_s05c_announcement_repeat',
    chapter: 1,
    title: 'Wiederholung',
    narrative: `Die Durchsage wiederholt sich. Exakt dieselbe:

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause.

„—erreichen in Kürze [unverständlich]. Bitte achten Sie auf Ihre persönlichen Gegenstände."

Aber diesmal hörst du etwas. Ganz schwach. Ein Wort, fast verschluckt:

„—ückf—"

Rückfahrt? Rückkehr? Du bist nicht sicher.

Der Lautsprecher kratzt, als wuerde jemand mit einer Nadel ueber Papier fahren. Das Wort klebt am Metall, halb im Rauschen. Du merkst, wie die Luft im Wagen kuehler wird, obwohl die Lampen warm glimmen.

Neben dir bewegt sich niemand, aber die Sitze geben leise Laute von sich, ein trockenes Knacken, als wuerde das Polster atmen. Du hoerst das Ticken der Anzeige nicht, nur dein eigenes Schlucken.

Die Frau im Mantel steht auf. Langsam. Sie greift nach ihrem Koffer. Geht zur Tür. Wartet.

Der Zug hält noch nicht.`,
    choices: [
      {
        id: 'follow_woman',
        label: 'Der Frau folgen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05d_comp7_listen'
      },
      {
        id: 'repeat_word',
        label: 'Das Wort leise wiederholen',
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
        next: 'c1_s05d_comp7_listen'
      },
      {
        id: 'stay_back',
        label: 'Zurückbleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s06_corridor_end'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Teilwort hörbar: "Rückf-" (Hinweis auf "Rückfahrt" aus Konzept)',
      'Frau bereitet sich vor (Comp7-Setup für Kap. 2)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s05d_comp7_listen: Vor der Tür horchen
  // ============================================================================
  'c1_s05d_comp7_listen': {
    id: 'c1_s05d_comp7_listen',
    chapter: 1,
    title: 'Horchen',
    narrative: `Du gehst zurück zu Abteil 7. Die Frau steht immer noch an der Wagentür, wartet.

Du legst das Ohr an die Tür. Das Holz ist warm.

Von innen: Eine Stimme. Leise. Spricht zu sich selbst.

„—muss stimmen. Muss. Wenn ich nur—"

Eine Pause.

„—nicht vergessen. Darf nicht—"

Das Kratzen wird lauter. Hektischer.

Dann, ein Knall. Als würde etwas umfallen. Die Stimme stoppt.

Stille.`,
    choices: [
      {
        id: 'knock_again',
        label: 'Klopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s06_corridor_end'
      },
      {
        id: 'step_away',
        label: 'Zurücktreten',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_s06_corridor_end'
      },
      {
        id: 'speak_through_door',
        label: 'Leise durch die Tür sprechen',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c1_s06_corridor_end'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Comp7 spricht zu sich selbst ("muss stimmen")',
      'Knall = emotionaler Moment',
      'knock_again: Love +1 (Fürsorge), Attention +1 (Risiko)',
      'CONDITION: speak_through_door nur bei rel_comp7 >= 1'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s06_corridor_end: Ende des Gangs
  // ============================================================================
  'c1_s06_corridor_end': {
    id: 'c1_s06_corridor_end',
    chapter: 1,
    title: 'Gangende',
    narrative: `Du gehst zurück durch den Gang. Er ist kürzer jetzt. Viel kürzer.

Die Lampen flackern nicht mehr. Das Licht ist konstant. Kalt.

Am anderen Ende des Wagens: Eine Tür. Verbindungstür zum nächsten Wagen.

Du gehst hin. Greifst nach dem Griff. Das Metall ist eiskalt.

Du ziehst. Die Tür öffnet sich.

Dahinter: Ein identischer Wagen. Roter Polster. Messinglampen. Holzverkleidung.

Aber leer. Komplett leer. Keine Passagiere.`,
    choices: [
      {
        id: 'enter_next_wagon',
        label: 'Den nächsten Wagen betreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_s07_stranger_encounter'
      },
      {
        id: 'stay_in_wagon',
        label: 'Im Wagen bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_interlude_05_vibration'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Gang-Länge ändert sich (Raumanomalie)',
      'Nächster Wagen leer (Setup für weitere Kapitel)',
      'enter_next_wagon erhöht memory_drift (Exploration = Destabilisierung)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s07_stranger_encounter: Fremder Passagier
  // ============================================================================
  'c1_s07_stranger_encounter': {
    id: 'c1_s07_stranger_encounter',
    chapter: 1,
    title: 'Fremder',
    narrative: `Du gehst in den leeren Wagen. Deine Schritte hallen.

Dann siehst du: Nicht ganz leer.

Ganz hinten, am Fenster, sitzt jemand. Eine Gestalt. Du siehst nur die Silhouette.

Sie dreht sich nicht um.

Du gehst näher. Das Gefühl, dass du das nicht solltest, wird stärker mit jedem Schritt.

Dann, eine Stimme. Nicht die Gestalt. Von überall:

„Nächster Halt: Endstation."

Das ist nicht die Durchsage. Das ist keine Stimme aus dem Lautsprecher.

Die Gestalt steht auf. Dreht sich um.

Ihr Gesicht—

Du blinzelst.

Die Gestalt ist weg.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du gehst in den leeren Wagen. Deine Schritte hallen.

Dann siehst du: Nicht ganz leer.

Ganz vorne, am Fenster, sitzt jemand. Eine Gestalt. Du siehst nur die Silhouette.

Sie dreht sich nicht um.

Du gehst näher. Das Gefühl, dass du das nicht solltest, wird stärker mit jedem Schritt.

Dann, eine Stimme. Nicht die Gestalt. Von überall:

„Nächster Halt: Rückfahrt."

Das ist nicht die Durchsage. Das ist keine Stimme aus dem Lautsprecher.

Die Gestalt steht auf. Dreht sich um.

Ihr Gesicht—

Du blinzelst.

Die Gestalt ist weg.`
      },
      {
        min_drift: 5,
        narrative: `Du gehst in den leeren Wagen. Deine Schritte hallen.

Dann siehst du: Nicht ganz leer.

Ganz vorne, am Fenster, stehen zwei Gestalten. Du siehst nur die Silhouetten.

Sie drehen sich nicht um.

Du gehst näher. Das Gefühl, dass du das nicht solltest, wird stärker mit jedem Schritt.

Dann, eine Stimme. Nicht die Gestalten. Von überall:

„Nächster Halt: Rückfahrt."

Das ist nicht die Durchsage. Das ist keine Stimme aus dem Lautsprecher.

Die Gestalten stehen auf. Drehen sich um.

Ihre Gesichter—

Du blinzelst.

Die Gestalten sind weg.`
      }
    ],
    choices: [
      {
        id: 'search_wagon',
        label: 'Den Wagen durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_interlude_05_vibration'
      },
      {
        id: 'answer_voice',
        label: 'Der Stimme leise antworten',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_interlude_05_vibration'
      },
      {
        id: 'go_back',
        label: 'Zurück in den ersten Wagen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_interlude_05_vibration'
      }
    ],
    tags: ['reveal', 'drift_variant'],
    state_notes: [
      'Condition: Nur sichtbar wenn enter_next_wagon gewählt wurde',
      'Gestalt verschwindet (Halluzination oder Drift)',
      '"Endstation" ohne Durchsage (direkte Stimme)',
      'go_back erhöht memory_drift (Flucht destabilisiert)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c1_interlude_05_vibration: Vibrations-Interlude
  // ============================================================================
  'c1_interlude_05_vibration': {
    id: 'c1_interlude_05_vibration',
    chapter: 1,
    title: 'Vibration',
    narrative: `Der Boden unter dir vibriert. Stärker als vorher.

Das Brummen wird lauter. Nicht im Raum. In deinem Kopf.

Du greifst nach einer Stange. Das Metall pulsiert.

Die Vibration läuft über die Sohlen in die Knie, als würdest du auf einem riesigen Motor stehen.

Deine Zähne klirren leicht, ein feines Zittern, das nicht aufhört.

Du lässt die Stange kurz los, spürst sofort, wie dir der Boden nachgibt, und greifst wieder zu.

Der Geschmack von Metall liegt auf deiner Zunge, als hätte die Luft selbst Leitungen.

Irgendwo im Wagen klappert ein loser Riemen, ein einzelner Ton, der sich im Brummen verliert.

Dein Magen zieht sich zusammen, wie vor einer Bremsung, die noch nicht passiert ist.

Du spürst, wie deine Handgelenke schwer werden, als würde jemand von unten ziehen, und du setzt die Füße breiter, um nicht zu schwanken.

Die Stange fühlt sich an, als würde sie atmen, kurz enger, dann wieder kalt. Du hörst ein Knacken im Holz der Sitze, als würde etwas nachgeben.

Ein metallischer Geschmack legt sich auf deinen Gaumen und bleibt. Du schließt kurz die Augen.

Dann, plötzlich: Stille.

Der Zug hält.`,
    choices: [
      {
        id: 'steady_breath',
        label: 'Festhalten und zählen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_end_platform_look'
      },
      {
        id: 'reflect_on_vibration',
        label: 'Die Vibration analysieren',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_end_platform_look'
      },
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c1_end_platform_look'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Vibration im Kopf (somatische Anomalie)',
      'Interlude: Übergang zu Station',
      'steady_breath senkt attention, wenn bereits aufgebaut'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_end_platform_look: Bahnsteig durch Fenster
  // ============================================================================
  'c1_end_platform_look': {
    id: 'c1_end_platform_look',
    chapter: 1,
    title: 'Station',
    narrative: `Du gehst zurück ans Fenster.

Draußen: Ein Bahnsteig. Leer. Identisch zum ersten. Dieselbe Neonröhre. Dieselbe Uhr.

23:47.

Niemand steigt ein. Niemand steigt aus. Die Türen bleiben geschlossen.

Die Frau im Mantel steht immer noch an der Tür. Wartet. Aber die Tür öffnet sich nicht.

Nach dreißig Sekunden: Der Zug fährt weiter. Die Frau setzt sich wieder hin. Legt den Koffer ab. Als wäre nichts gewesen.`,
    choices: [
      {
        id: 'ask_woman',
        label: 'Die Frau fragen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'observe_silently',
        label: 'Beobachten, nichts sagen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'ask_sleepless',
        label: 'Den Schlaflosen leise fragen',
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
        next: 'c1_end_station'
      },
      {
        id: 'check_clock_again',
        label: 'Die Uhr überprüfen',
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
        next: 'c1_end_station'
      }
    ],
    tags: [],
    state_notes: [
      'Türen öffnen sich nicht (erste Station-Regel: nicht jeder darf raus)',
      'ask_sleepless nur bei rel_sleepless >= 1',
      'CONDITION: check_clock_again nur bei memory_drift >= 2'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c1_end_station: Station Ende (R1: Drift)
  // ============================================================================
  'c1_end_station': {
    id: 'c1_end_station',
    chapter: 1,
    title: 'Halt',
    narrative: `Als du dich umdrehst, fällt dir etwas auf:

Der Schlaflose sieht anders aus. Seine Jacke ist jetzt dunkelblau. Vorher war sie grau. Du bist dir sicher. Du hast sie gesehen. Grau.

Er bemerkt deinen Blick. „Was?"

Du sagst: „Deine Jacke—"

Er sieht runter. „Was ist damit?"

„Sie war grau."

Er lacht trocken. „Sie war immer blau."

Er zeigt auf seinen Sitz. Auf der Armlehne liegt ein Zettel. Handgeschrieben. Er nimmt ihn. Liest.

Du beugst dich vor, als könntest du die Zeilen aus der Entfernung lesen. Die Tinte schimmert dunkel, noch feucht. Für einen Augenblick spiegelt das Fenster hinter ihm deine Hand, und im Spiegel ist seine Jacke wieder grau. Du blinzelst, der Moment ist weg.

Der Zettel riecht nach altem Papier, nach Keller, nach Metallstaub. Du willst ihn nehmen, bevor er ihn zerknüllt, aber er legt den Fuß leicht auf den Rand, als würde er dich daran erinnern, dass er schneller ist.

Seine Finger zittern stärker, als er den Zettel knüllt. Das Papier knistert zu laut in der Stille, als hätte der Zug kurz gelauscht. Du hörst dein eigenes Blut rauschen und spürst den Impuls, etwas zu sagen, schluckst ihn aber hinunter.

Sein Blick geht kurz zum Fenster, als würde er dort etwas prüfen. Du folgst ihm, siehst nur dein eigenes Spiegelbild, das eine Sekunde zu langsam nickt.

Die Neonröhre über euch summt, und das Licht legt einen blassen Rand um seine Schultern.

Dann zerknüllt er ihn. Wirft ihn auf den Boden.

„Was stand da?" fragst du.

„Nichts Wichtiges."

Aber seine Hände zittern.`,
    choices: [
      {
        id: 'continue_to_chapter_2',
        label: 'Weiter',
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'station_count', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s01_ticket_search'
      },
      {
        id: 'confront_jacket_change',
        label: 'Die Jackenfarbe direkt ansprechen',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 3 },
            { type: 'compare', target: 'conductor_attention', operator: '>=', value: 3 }
          ]
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'station_count', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c2_s01_ticket_search'
      },
      {
        id: 'nod_to_conductor',
        label: 'Dem Schaffner zunicken',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'station_count', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c2_s01_ticket_search'
      }
    ],
    tags: ['station_end'],
    exit_effects: [
      { type: 'inc', target: 'memory_drift', value: 1 }
    ],
    state_notes: [
      'Erste station_end-Szene: memory_drift automatisch erhöht (R1)',
      'Jackenfarbe ändert sich (Drift-Effekt), Sleepless reagiert nicht',
      'Zettel = Foreshadowing (später relevant)',
      'CONDITION: confront_jacket_change nur bei tickets_truth >= 3 ODER conductor_attention >= 3'
    ],
    atmosphere: 'somber'
  }
};
