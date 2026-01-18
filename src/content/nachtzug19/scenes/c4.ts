// ============================================================================
// NACHTZUG 19 - Kapitel 4: Spiegelung
// ============================================================================
// Szenen (27):
// Entry: c4_s01_mirror, c4_s01a_double_reflection, c4_s01b_wrong_memory
// Interludes: c4_interlude_01_lights, c4_interlude_02_announcement, c4_interlude_03_window, c4_interlude_04_corridor, c4_interlude_05_time
// Recorder: c4_s02_recorder_prophecy, c4_s02a_recording_self, c4_s02b_recorder_loop
// Passengers: c4_s03_passengers_return, c4_s03a_sleepless_changed, c4_s03b_boy_paradox
// Announcement: c4_s04_announcement_glitch, c4_s04a_name_confusion, c4_s04b_ticket_appears
// Comp7: c4_s05_comp7_call, c4_s05a_wagen7_changed, c4_s06_comp7_memory, c4_s06a_shared_memory
// Pre-End: c4_s07_reality_fracture, c4_s07a_drift_peak, c4_s07b_stabilization
// End: c4_end_platform_watch, c4_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter4Scenes: ScenesCollection = {
  // ============================================================================
  // c4_s01_mirror: Spiegelbild
  // ============================================================================
  'c4_s01_mirror': {
    id: 'c4_s01_mirror',
    chapter: 4,
    title: 'Spiegel',
    narrative: `Du stehst vor dem Waschbecken. Das Wasser läuft. Kalt.

Der Spiegel über dem Becken ist beschlagen. Du wischst ihn mit der Hand ab.

Dein Spiegelbild schaut dich an.

Aber es bewegt sich nicht richtig. Du hebst die linke Hand. Das Spiegelbild hebt die rechte.

Das ist normal. Spiegel funktionieren so.

Aber dann blinzelst du. Das Spiegelbild blinzelt nicht.

Du hältst inne. Das Spiegelbild bewegt sich weiter. Es lächelt.

Du lächelst nicht.`,
    choices: [
      {
        id: 'touch_mirror',
        label: 'Den Spiegel berühren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s01a_double_reflection'
      },
      {
        id: 'back_away',
        label: 'Zurückweichen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_01_lights'
      },
      {
        id: 'talk_to_reflection',
        label: '„Wer bist du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s01a_double_reflection'
      }
    ],
    tags: ['drift_variant', 'reveal'],
    state_notes: [
      'Spiegelbild verhält sich autonom',
      'touch_mirror und talk_to_reflection führen zu tieferer Szene',
      'Erstes Signal: Identity ist nicht mehr stabil'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s01a_double_reflection: Doppeltes Spiegelbild
  // ============================================================================
  'c4_s01a_double_reflection': {
    id: 'c4_s01a_double_reflection',
    chapter: 4,
    title: 'Verdopplung',
    narrative: `Du berührst den Spiegel. Das Glas ist kalt. Zu kalt.

Dein Spiegelbild berührt die andere Seite. Fingerspitzen treffen Fingerspitzen.

Dann siehst du es: Hinter deinem Spiegelbild steht noch jemand.

Eine zweite Gestalt. Sie sieht genauso aus wie du.

Aber sie schaut in eine andere Richtung.

Du drehst dich um. Niemand hinter dir.

Im Spiegel: Zwei Versionen von dir. Beide bewegen sich anders als du.

Eine flüstert etwas. Du hörst es nicht. Aber du liest es von ihren Lippen:

„Ich war hier. Du wirst hier sein. Wir sind hier."`,
    choices: [
      {
        id: 'try_to_understand',
        label: 'Versuchen zu verstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c4_s01b_wrong_memory'
      },
      {
        id: 'leave_quickly',
        label: 'Schnell weggehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_01_lights'
      },
      {
        id: 'ask_when',
        label: '„Wann war ich hier?"',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c4_s01b_wrong_memory'
      }
    ],
    tags: ['drift_variant', 'reveal'],
    state_notes: [
      'CONDITION: ask_when nur bei memory_drift >= 3',
      'Zwei Spiegelbilder: Zeitschichten überlagert',
      'Flüstertext: "Ich war / Du wirst / Wir sind"'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s01b_wrong_memory: Falsche Erinnerung
  // ============================================================================
  'c4_s01b_wrong_memory': {
    id: 'c4_s01b_wrong_memory',
    chapter: 4,
    title: 'Erinnerung',
    narrative: `Du erinnerst dich an etwas.

An den Bahnsteig. Den leeren Bahnsteig aus Kapitel 1.

Aber die Erinnerung ist falsch.

In deiner Erinnerung stand jemand neben dir. Hat mit dir geredet.

„Du wirst den Zug nehmen," hat die Person gesagt. „Du hast keine Wahl."

Aber da war niemand. Du warst allein.

Oder?

Du versuchst dich zu erinnern. Das Bild wechselt. Einmal mit Person. Einmal ohne.

Beide Versionen fühlen sich echt an.

„Memory Drift," flüstert eine Stimme. Du drehst dich um.

Niemand da.`,
    choices: [
      {
        id: 'accept_false_memory',
        label: 'Die falsche Erinnerung akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_interlude_01_lights'
      },
      {
        id: 'fight_memory',
        label: 'Gegen die Erinnerung ankämpfen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c4_interlude_01_lights'
      },
      {
        id: 'ask_who_spoke',
        label: '„Wer hat das gesagt?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c4_interlude_01_lights'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Falsche Erinnerung eingepflanzt: Bahnsteig-Szene verändert sich',
      'accept_false_memory: Hoher Drift-Preis',
      'fight_memory: Erhöht conductor_attention (System bemerkt Widerstand)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_interlude_01_lights: Interlude - Lichter
  // ============================================================================
  'c4_interlude_01_lights': {
    id: 'c4_interlude_01_lights',
    chapter: 4,
    title: 'Lichter',
    narrative: `Die Neonröhren flackern.

Aber anders als vorher.

Sie flackern nicht zufällig. Sie flackern in einem Muster.

An. Aus. An-An. Aus. An-An-An.

Du zählst. Eins. Zwei. Drei. Vier.

Wie ein Code. Oder eine Nachricht.

Dann stoppt es. Die Lichter bleiben an.

Du schaust nach unten. Dein Schatten zeigt in die falsche Richtung.

Das Licht kommt von oben. Der Schatten sollte unter dir sein.

Aber er zeigt zur Seite. Als käme das Licht von woanders.`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s02_recorder_prophecy'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Lichter flackern in Muster (1-2-3-4)',
      'Schatten zeigt falsche Richtung: Raumlogik bricht'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s02_recorder_prophecy: Rekorder spielt Zukunft
  // (CONDITION: has_recorder == true)
  // ============================================================================
  'c4_s02_recorder_prophecy': {
    id: 'c4_s02_recorder_prophecy',
    chapter: 4,
    title: 'Prophezeiung',
    narrative: `Du sitzt in deinem Abteil. Der Rekorder liegt vor dir auf dem Tisch.

Er schaltet sich von selbst ein.

Du hast nichts gedrückt.

Die Kassette läuft. Knistern. Dann eine Stimme.

Deine Stimme:

„—Kapitel 4. Station 4. Ich erinnere mich nicht mehr genau. War es Station 4? Oder Station 3 nochmal?—"

Du hast das nicht gesagt. Noch nicht.

Die Aufnahme geht weiter:

„—Der Schaffner fragt wieder. Diesmal anders. Härter. Ich habe keine Antwort. Oder zu viele.—"

Du greifst nach dem Rekorder. Willst ihn ausschalten.

Deine Stimme: „—Nicht ausschalten. Du musst hören.—"`,
    choices: [
      {
        id: 'listen_to_prophecy',
        label: 'Weiterhören',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s02a_recording_self'
      },
      {
        id: 'turn_off_recorder',
        label: 'Den Rekorder ausschalten',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_02_announcement'
      },
      {
        id: 'no_recorder',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_02_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: listen_to_prophecy und turn_off_recorder nur wenn has_recorder == true',
      'Rekorder schaltet sich selbst ein',
      'Spieler hört eigene Zukunft'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s02a_recording_self: Aufnahme der eigenen Stimme
  // ============================================================================
  'c4_s02a_recording_self': {
    id: 'c4_s02a_recording_self',
    chapter: 4,
    title: 'Selbstgespräch',
    narrative: `Die Aufnahme läuft weiter.

Deine Stimme, aber anders. Müder. Älter.

„—Comp7 sagt, es ist eine Schleife. Der Junge sagt, Dinge werden mehr. Der Schlaflose sagt, er kann nicht mehr aussteigen.—"

„—Und ich? Was sage ich?—"

Pause. Knistern.

Dann: „—Ich sage: Ich will mich erinnern. Aber je mehr ich mich erinnere, desto weniger weiß ich.—"

„—Memory Drift. Ab 5 ist es nicht mehr umkehrbar, sagt Comp7. Ich bin bei—"

Rauschen. Die Zahl ist nicht zu hören.

Dann deine Stimme wieder, klarer: „—Wenn du das hörst: Vertrau nicht den Durchsagen. Sie lügen nicht, aber sie verschieben die Zeit.—"

Die Kassette stoppt.`,
    choices: [
      {
        id: 'rewind_and_listen',
        label: 'Zurückspulen und nochmal hören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s02b_recorder_loop'
      },
      {
        id: 'put_recorder_away',
        label: 'Den Rekorder weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_02_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Zukünftige Spieler-Stimme warnt vor Durchsagen',
      'Memory_drift >= 5 nicht mehr umkehrbar',
      'rewind_and_listen führt zu Loop-Erkenntnis'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s02b_recorder_loop: Zeitschleife erkannt
  // ============================================================================
  'c4_s02b_recorder_loop': {
    id: 'c4_s02b_recorder_loop',
    chapter: 4,
    title: 'Schleife',
    narrative: `Du spulst zurück. Drückst Play.

Die Aufnahme ist anders.

Nicht deine Stimme. Der Junge:

„—Er hört sich selbst zu. Immer wieder. Jede Schleife.—"

Comp7s Stimme: „—Das ist das Problem. Die Kassette zeichnet alles auf. Auch das Abhören. Auch das Zurückspulen.—"

Der Schlaflose: „—Wie oft haben wir das schon gemacht?—"

Stille.

Dann alle drei zusammen: „—Zu oft.—"

Du schaust auf den Rekorder. Die Kassette dreht sich.

Auf dem Label steht: „SCHLEIFE #[UNLESBAR]"

Die Zahl ist durchgestrichen. Mehrfach. Als hätte jemand versucht, sie zu korrigieren.`,
    choices: [
      {
        id: 'accept_loop',
        label: 'Die Schleife akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c4_interlude_02_announcement'
      },
      {
        id: 'try_to_break',
        label: 'Versuchen die Schleife zu brechen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c4_interlude_02_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kassette zeichnet auch Abhören auf (Meta-Loop)',
      'Schleife #[UNLESBAR] - Zahl nicht mehr lesbar',
      'try_to_break erhöht conductor_attention (System registriert Widerstand)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_interlude_02_announcement: Interlude - Zeitverschobene Durchsage
  // ============================================================================
  'c4_interlude_02_announcement': {
    id: 'c4_interlude_02_announcement',
    chapter: 4,
    title: 'Verschobene Zeit',
    narrative: `Die Lautsprecher knacken.

„—Sehr geehrte Fahrgäste, wir haben soeben Station [GELÖSCHT] verlassen—"

Aber der Zug fährt noch. Du hörst das Rattern. Siehst die Dunkelheit draußen.

„—In wenigen Minuten erreichen wir [FEHLER]—"

Der Zug wird langsamer.

„—Wir bitten um Entschuldigung für die Verspätung von [UNLESBAR] Minuten—"

Der Zug hält.

„—Wir wünschen Ihnen eine angenehme Weiterfahrt—"

Die Durchsage endet. Die Türen öffnen sich.

Draußen: Ein Bahnsteig. Leer.

Die Durchsage kam vor dem Halt. Oder nach dem Halt. Oder während.`,
    choices: [
      {
        id: 'continue',
        label: 'Im Zug bleiben',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s03_passengers_return'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Durchsage zeitlich verschoben: "verlassen" vor dem Halt',
      'Kausalität bricht zusammen'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s03_passengers_return: Passagiere kehren zurück
  // ============================================================================
  'c4_s03_passengers_return': {
    id: 'c4_s03_passengers_return',
    chapter: 4,
    title: 'Rückkehr',
    narrative: `Die Türen schließen sich. Der Zug fährt weiter.

Du gehst durch den Gang.

Die Abteile sind nicht mehr leer.

Der Schlaflose sitzt in seinem Abteil. Schaut aus dem Fenster.

Der Junge sitzt in seinem Abteil. Spielt mit dem Rekorder.

Die Frau mit der Zeitung sitzt in ihrem Abteil. Liest.

Sie sind zurück.

Aber etwas ist anders.

Ihre Kleidung ist die gleiche. Ihre Haltung ist die gleiche.

Aber wenn du genau hinschaust: Ihre Gesichter sind leicht verschwommen.

Wie bei Comp7.`,
    choices: [
      {
        id: 'talk_to_sleepless',
        label: 'Den Schlaflosen ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c4_s03a_sleepless_changed'
      },
      {
        id: 'talk_to_boy',
        label: 'Den Jungen ansprechen',
        condition: {
          type: 'compare',
          target: 'rel_boy',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c4_s03b_boy_paradox'
      },
      {
        id: 'ignore_all',
        label: 'Alle ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_03_window'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'CONDITION: talk_to_boy nur bei rel_boy >= 1',
      'Passagiere zurück, aber Gesichter verschwommen',
      'Drift-Symptom: Identität der NPCs wird unklar'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s03a_sleepless_changed: Schlafloser erinnert sich anders
  // ============================================================================
  'c4_s03a_sleepless_changed': {
    id: 'c4_s03a_sleepless_changed',
    chapter: 4,
    title: 'Verändert',
    narrative: `Du setzt dich neben den Schlaflosen.

„Hallo," sagst du.

Er dreht sich zu dir. Langsam. „Du wieder," sagt er.

„Wir haben schon geredet," sagst du.

„Nein," sagt er. „Wir reden zum ersten Mal. Ich erinnere mich nicht an dich."

Du bist sicher: Ihr habt in Kapitel 1 geredet. Oder war es Kapitel 2?

„Du hast mir von deiner Jacke erzählt," sagst du. „Die Farbe ändert sich."

Er schaut an sich herunter. „Meine Jacke ist grau. War sie immer."

Seine Jacke ist nicht grau. Sie ist rot. Oder war sie schwarz?

„Was war Station 3?" fragst du.

Er zuckt mit den Schultern. „Es gibt keine Station 3. Nur 1, 2, und 4. Immer."`,
    choices: [
      {
        id: 'correct_him',
        label: '„Aber wir hatten drei Stationen"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_interlude_03_window'
      },
      {
        id: 'accept_his_memory',
        label: '„Du hast recht"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_interlude_03_window'
      },
      {
        id: 'ask_about_loop',
        label: '„Wie oft sind wir schon gefahren?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c4_interlude_03_window'
      }
    ],
    tags: ['drift_variant', 'reveal'],
    state_notes: [
      'Schlafloser erinnert sich anders: Station 3 existiert nicht in seiner Erinnerung',
      'accept_his_memory: Hoher Drift-Preis (Spieler akzeptiert falsche Realität)',
      'Jackenfarbe ändert sich während des Gesprächs'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s03b_boy_paradox: Junge ist älter/jünger
  // (CONDITION: rel_boy >= 1)
  // ============================================================================
  'c4_s03b_boy_paradox': {
    id: 'c4_s03b_boy_paradox',
    chapter: 4,
    title: 'Paradox',
    narrative: `Du gehst zum Jungen.

Er schaut auf. Lächelt.

Aber er ist anders. Älter. Oder jünger. Schwer zu sagen.

Seine Stimme ist tiefer. „Du kommst immer zurück," sagt er.

„Ich bin nicht weggegangen," sagst du.

„Doch. Jedes Mal. Bei jeder Station. Du steigst aus. Dann steigst du wieder ein. Aber du erinnerst dich nicht."

Er zeigt dir den Rekorder. „Hör mal."

Er drückt auf Play.

Deine Stimme: „—Ich steige jetzt aus. Ich kann nicht mehr. Ich muss—"

Rauschen. Dann wieder deine Stimme: „—Warum bin ich wieder im Zug? Ich war doch draußen. Ich—"

Du hast das nicht gesagt. Oder doch?

„Manchmal erinnerst du dich," sagt der Junge. „Aber nie lange."`,
    choices: [
      {
        id: 'believe_boy',
        label: '„Wie oft habe ich das gemacht?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c4_interlude_03_window'
      },
      {
        id: 'deny',
        label: '„Das kann nicht sein"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c4_interlude_03_window'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: Nur sichtbar bei rel_boy >= 1',
      'Junge altert/verjüngt sich: Zeitparadox',
      'Kassette zeigt: Spieler ist mehrfach aus-/eingestiegen'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_interlude_03_window: Interlude - Fenster zeigt Vergangenheit
  // ============================================================================
  'c4_interlude_03_window': {
    id: 'c4_interlude_03_window',
    chapter: 4,
    title: 'Vergangenheit',
    narrative: `Du schaust aus dem Fenster.

Draußen: Nicht die Dunkelheit. Nicht die Gleise.

Sondern ein Bahnsteig. Der Bahnsteig aus Kapitel 1.

Du siehst dich selbst. Stehend. Wartend.

Der Zug kommt. Der Zug, in dem du jetzt sitzt.

Du siehst dich einsteigen.

Dann fährt der Zug weiter.

Das Bild wechselt.

Wieder der Bahnsteig. Wieder du. Wieder der gleiche Moment.

Aber diesmal steigst du nicht ein. Du drehst dich um. Gehst weg.

Das Bild wechselt wieder.

Du zählst. Wie oft siehst du dich?

Fünfmal. Zehnmal. Du verlierst den Überblick.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du schaust aus dem Fenster.

Draußen: Nicht die Dunkelheit. Nicht die Gleise.

Sondern ein Bahnsteig. Der Bahnsteig aus Kapitel 1, nur heller.

Du siehst dich selbst. Stehend. Wartend.

Der Zug kommt. Der Zug, in dem du jetzt sitzt.

Du siehst dich einsteigen.

Dann fährt der Zug weiter.

Das Bild wechselt.

Wieder der Bahnsteig. Wieder du. Wieder der gleiche Moment.

Aber diesmal steigst du nicht ein. Du drehst dich um. Gehst weg.

Das Bild wechselt wieder.

Du zählst. Wie oft siehst du dich?

Viermal. Neunmal. Du verlierst den Überblick.`
      },
      {
        min_drift: 5,
        narrative: `Du schaust aus dem Fenster.

Draußen: Nicht die Dunkelheit. Nicht die Gleise.

Sondern ein Bahnsteig. Der Bahnsteig aus Kapitel 1, aber die Uhr zeigt 00:13.

Du siehst dich selbst. Stehend. Wartend.

Der Zug kommt. Der Zug, in dem du jetzt sitzt.

Du siehst dich einsteigen. Rückwärts.

Dann fährt der Zug weiter.

Das Bild wechselt.

Wieder der Bahnsteig. Wieder du. Wieder der gleiche Moment.

Aber diesmal steigst du nicht ein. Du gehst rückwärts vom Rand weg.

Das Bild wechselt wieder.

Du zählst. Wie oft siehst du dich?

Zehnmal. Zwölfmal. Du verlierst den Überblick.`
      }
    ],
    choices: [
      {
        id: 'continue',
        label: 'Wegschauen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s04_announcement_glitch'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Fenster zeigt Bahnsteig-Loop: Spieler steigt mehrfach ein/nicht ein',
      'Hinweis: Schleife läuft schon lange'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c4_s04_announcement_glitch: Durchsage nennt falschen Namen
  // ============================================================================
  'c4_s04_announcement_glitch': {
    id: 'c4_s04_announcement_glitch',
    chapter: 4,
    title: 'Falsche Namen',
    narrative: `Die Lautsprecher knacken.

„Sehr geehrte Fahrgäste—"

Die Stimme ist anders. Nicht die automatische Stimme. Eine menschliche.

„—wir möchten Passagier [DEIN NAME] bitten—"

Dein Name. Die Durchsage nennt deinen Namen.

Aber es ist nicht dein Name. Es klingt ähnlich. Aber falsch.

Ein Buchstabe vertauscht. Oder zwei.

„—sich bei der nächsten Station zur Kontrolle zu melden—"

Kontrolle. Wieder Kontrolle.

„—Passagier [ANDERER NAME] ebenfalls—"

Ein zweiter Name. Du kennst ihn nicht.

„—Danke für Ihre Mitarbeit—"

Die Durchsage endet.

Du schaust dich um. Niemand reagiert. Als hätten sie nichts gehört.`,
    choices: [
      {
        id: 'check_own_name',
        label: 'Versuchen sich an den eigenen Namen zu erinnern',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s04a_name_confusion'
      },
      {
        id: 'ignore_announcement',
        label: 'Die Durchsage ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c4_interlude_04_corridor'
      },
      {
        id: 'go_to_control',
        label: 'Zur Kontrolle gehen',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c4_s04b_ticket_appears'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'CONDITION: go_to_control nur bei conductor_attention >= 4',
      'Durchsage nennt fast-richtigen Namen (Identity-Drift)',
      'ignore_announcement erhöht attention (System registriert Ignoranz)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s04a_name_confusion: Name ist nicht mehr sicher
  // ============================================================================
  'c4_s04a_name_confusion': {
    id: 'c4_s04a_name_confusion',
    chapter: 4,
    title: 'Identität',
    narrative: `Du versuchst dich an deinen Namen zu erinnern.

Er ist da. Ganz klar.

Oder?

Du sprichst ihn laut aus. Aber es hört sich falsch an.

Die Silben passen nicht zusammen. Als würdest du einen fremden Namen aussprechen.

Du versuchst es nochmal. Diesmal klingt er anders. Aber auch falsch.

„Du kannst ihn nicht mehr finden," sagt eine Stimme.

Du drehst dich um. Comp7 steht im Gang.

„Memory Drift," sagt sie. „Ab einem gewissen Punkt vergisst du, wer du warst. Dann bist du nur noch: Passagier."

Sie zeigt auf deine Brust. Dort, wo ein Namensschild wäre.

Du schaust hin. Nichts da.

„Manche tragen noch ihren Namen," sagt Comp7. „Andere nicht mehr. Du gehörst zu den anderen."`,
    choices: [
      {
        id: 'accept_loss',
        label: 'Den Verlust akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_s05_comp7_call'
      },
      {
        id: 'insist_on_name',
        label: '„Ich weiß noch, wer ich bin"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s05_comp7_call'
      },
      {
        id: 'ask_comp7_name',
        label: '„Wie heißt du wirklich?"',
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
        next: 'c4_s05_comp7_call'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: ask_comp7_name nur bei rel_comp7 >= 2',
      'Spieler kann sich nicht mehr an eigenen Namen erinnern',
      'accept_loss: Sehr hoher Drift-Preis (Identity aufgegeben)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_s04b_ticket_appears: Ticket erscheint
  // ============================================================================
  'c4_s04b_ticket_appears': {
    id: 'c4_s04b_ticket_appears',
    chapter: 4,
    title: 'Ticket',
    narrative: `Du gehst durch den Gang. Suchst nach dem Schaffner.

Aber er ist nicht da.

Du schaust in deine Tasche. Suchst nach etwas. Nach was?

Deine Hand findet etwas. Papier.

Du ziehst es heraus.

Ein Ticket.

Du hast kein Ticket. Du hattest nie ein Ticket.

Aber jetzt ist es da.

Du liest:

„NACHTZUG 19
Von: [GELÖSCHT]
Nach: RÜCKFAHRT
Passagier: [DEIN NAME - durchgestrichen]
Gültig bis: [KEINE ANGABE]"

Das Ticket ist abgestempelt. Mehrfach. Zu oft.

Siebenmal. Oder achtmal. Die Stempel überlagern sich.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du ziehst es heraus.

Ein Ticket. Es fühlt sich feucht an, wie frisch gedruckt.

Die Tinte ist verschmiert.

„NACHTZUG 19
Von: NIRGENDWO
Nach: NIRGENDWO
Passagier: NIEMAND"

Die Buchstaben bewegen sich. Sie ordnen sich neu.

„HILFE" steht kurz da. Dann wieder „TICKET".

Das Papier wird heiß in deiner Hand.`
      },
      {
        min_drift: 5,
        narrative: `Du ziehst es heraus.

Es ist kein Ticket. Es ist ein Stück Haut.

Darauf eingebrannt: Eine Nummer. Deine Nummer.

Die Ränder sind versengt und riechen nach Rauch.

Du willst es fallen lassen, aber es klebt an deinen Fingern.

Schwarze Tinte tropft auf den Boden. Jeder Tropfen macht ein Geräusch wie ein Schrei.

„Gültig für eine einfache Fahrt," flüstert das Ticket.`
      }
    ],
    choices: [
      {
        id: 'keep_ticket',
        label: 'Das Ticket behalten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s05_comp7_call'
      },
      {
        id: 'destroy_ticket',
        label: 'Das Ticket zerreißen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c4_s05_comp7_call'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Ticket erscheint plötzlich (Drift-Artefakt)',
      'Zu viele Stempel: Spieler ist mehrfach gefahren',
      'destroy_ticket: Hohe attention (System bemerkt Widerstand)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_interlude_04_corridor: Interlude - Gang verdoppelt sich
  // ============================================================================
  'c4_interlude_04_corridor': {
    id: 'c4_interlude_04_corridor',
    chapter: 4,
    title: 'Verdopplung',
    narrative: `Du gehst durch den Gang.

Plötzlich siehst du zwei Gänge.

Nicht nebeneinander. Sondern überlagert.

Wie ein Doppelbild.

Im ersten Gang: Die Abteile sind leer. Wie in Kapitel 3.

Im zweiten Gang: Die Abteile sind voll. Passagiere sitzen darin.

Du blinzelst. Versuchst dich auf einen zu konzentrieren.

Das Bild wechselt. Leer. Voll. Leer. Voll.

Du gehst weiter. Die beiden Gänge verschmelzen.

Jetzt ist da nur noch einer.

Aber du bist nicht sicher, welcher.`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s05_comp7_call'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gang verdoppelt sich: Zwei Zeitschichten überlagert',
      'Leerer/voller Gang gleichzeitig sichtbar'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s05_comp7_call: Comp7 ruft
  // ============================================================================
  'c4_s05_comp7_call': {
    id: 'c4_s05_comp7_call',
    chapter: 4,
    title: 'Ruf',
    narrative: `Du hörst eine Stimme. Comp7.

„Komm nach Wagen 7."

Du siehst dich um. Sie ist nicht da.

„Komm nach Wagen 7. Jetzt."

Die Stimme kommt von überall. Aus den Lautsprechern? Aus den Wänden?

Du gehst nach vorne. Oder nach hinten. Der Gang sieht gleich aus in beide Richtungen.

Am Ende: Die Tür. Die 7.

Sie steht offen. Weit offen.

Warmes Licht fällt heraus. Aber es flackert.

„Schnell," sagt Comp7s Stimme. „Es passiert wieder."

„Was passiert?"

„Drift. Starker Drift. Wenn du jetzt nicht kommst, findest du den Weg nicht mehr."`,
    choices: [
      {
        id: 'go_to_wagen7',
        label: 'Nach Wagen 7 gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s05a_wagen7_changed'
      },
      {
        id: 'refuse_call',
        label: 'Nicht hingehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_interlude_05_time'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Comp7 ruft dringend',
      'refuse_call: Hoher Drift-Preis (Spieler verliert Orientierung)',
      'Wagen 7 als Safe Space wird wichtiger'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s05a_wagen7_changed: Wagen 7 ist anders
  // ============================================================================
  'c4_s05a_wagen7_changed': {
    id: 'c4_s05a_wagen7_changed',
    chapter: 4,
    title: 'Veränderung',
    narrative: `Du trittst in Wagen 7.

Der Raum ist anders. Größer als vorher. Oder kleiner. Schwer zu sagen.

Die Notizbücher an den Wänden sind mehr geworden. Hunderte.

Comp7 sitzt am Tisch. Ihr Gesicht ist klarer. Du erkennst sie jetzt.

Aber etwas stimmt nicht.

Ihre Augen. Sie sind anders. Eine ist grün. Eine ist blau.

„Du bemerkst es," sagt sie. „Gut. Das bedeutet, du bist noch nicht ganz verloren."

„Was ist mit dir passiert?"

„Das Gleiche wie mit dir. Memory Drift. Ab einem gewissen Punkt vergesse ich, wie ich aussah. Dann bin ich, wie ich gerade bin."

Sie zeigt auf die Notizbücher. „Ich habe mich aufgeschrieben. Immer wieder. Damit ich weiß, wer ich war."

Du gehst zu einem Notizbuch. Liest:

„Tag 1: Braune Augen. Narbe am Kinn.
Tag 7: Grüne Augen. Keine Narbe.
Tag 14: Blaue Augen. Narbe wieder da.
Tag 21: [UNLESBAR]"`,
    choices: [
      {
        id: 'ask_how_long',
        label: '„Wie lange bist du schon hier?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s06_comp7_memory'
      },
      {
        id: 'ask_about_escape',
        label: '„Kann man noch raus?"',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s06_comp7_memory'
      },
      {
        id: 'comfort_comp7',
        label: 'Comp7 trösten',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c4_s06_comp7_memory'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: ask_about_escape nur bei tickets_escape >= 3',
      'Comp7 verändert sich: Augenfarbe wechselt',
      'Notizbücher dokumentieren Drift-Fortschritt',
      'comfort_comp7: Starke Beziehung (+2)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_interlude_05_time: Interlude - Zeit läuft rückwärts
  // ============================================================================
  'c4_interlude_05_time': {
    id: 'c4_interlude_05_time',
    chapter: 4,
    title: 'Rückwärts',
    narrative: `Du bleibst im Gang stehen.

Etwas ist falsch.

Das Rattern des Zuges. Es klingt anders.

Rückwärts.

Der Zug fährt rückwärts.

Du schaust aus dem Fenster. Die Landschaft zieht vorbei. In die falsche Richtung.

Nein. Nicht rückwärts.

Sondern die Zeit läuft rückwärts.

Du siehst deine Hand. Sie bewegt sich normal. Du hast Kontrolle.

Aber um dich herum: Alles läuft rückwärts.

Ein Passagier geht durch den Gang. Rückwärts.

Die Neonröhren flackern. Rückwärts.

Dann stoppt es. Die Zeit läuft wieder normal.

Oder war das normal?`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du bleibst im Gang stehen.

Etwas ist falsch.

Das Rattern des Zuges. Es klingt anders.

Rückwärts. Nur für einen Takt.

Der Zug fährt rückwärts.

Du schaust aus dem Fenster. Die Landschaft zieht vorbei. In die falsche Richtung.

Nein. Nicht rückwärts.

Sondern die Zeit läuft rückwärts.

Du siehst deine Hand. Sie bewegt sich normal. Du hast Kontrolle.

Aber um dich herum: Alles läuft rückwärts.

Ein Passagier geht durch den Gang. Rückwärts.

Die Neonröhren flackern. Rückwärts.

Dann stoppt es. Die Zeit läuft wieder normal.

Oder war das normal?`
      },
      {
        min_drift: 5,
        narrative: `Du bleibst im Gang stehen.

Etwas ist falsch.

Das Rattern des Zuges. Es klingt anders.

Still. Dann rückwärts.

Der Zug steht.

Du schaust aus dem Fenster. Die Landschaft steht. Nur du bewegst dich.

Nein. Nicht rückwärts.

Sondern die Zeit läuft rückwärts.

Du siehst deine Hand. Sie bewegt sich verzögert. Du hast nicht mehr Kontrolle.

Aber um dich herum: Alles läuft rückwärts.

Ein Passagier geht durch den Gang. Rückwärts.

Die Neonröhren flackern. Rückwärts.

Dann stoppt es. Die Zeit läuft wieder normal.

Oder war das normal?`
      }
    ],
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_s06_comp7_memory'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Zeit läuft rückwärts: Temporale Drift',
      'Spieler behält Kontrolle, aber Umgebung ist asynchron',
      'Hoher Drift-Preis für refuse_call Konsequenz'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s06_comp7_memory: Comp7 erinnert sich anders
  // ============================================================================
  'c4_s06_comp7_memory': {
    id: 'c4_s06_comp7_memory',
    chapter: 4,
    title: 'Erinnerung',
    narrative: `Comp7 blättert in einem der Notizbücher.

„Du fragst, wie lange ich hier bin," sagt sie. „Ich weiß es nicht mehr."

Sie zeigt dir eine Seite. Zahlen. Durchgestrichen. Korrigiert. Wieder durchgestrichen.

„Ich habe versucht zu zählen. Aber Memory Drift macht das schwer. Manchmal erinnere ich mich an 10 Tage. Manchmal an 100."

„Und was stimmt?"

„Vielleicht beides. Vielleicht keines."

Sie schließt das Notizbuch. „Ich erinnere mich an dich. Aber anders."

„Wie anders?"

„In meiner Erinnerung sind wir schon länger befreundet. Wir haben zusammen versucht auszusteigen. Es hat nicht funktioniert."

Du erinnerst dich nicht daran.

„Oder," sagt Comp7, „du erinnerst dich noch nicht. Zeitlinien hier... sie überlappen."`,
    choices: [
      {
        id: 'believe_her',
        label: '„Vielleicht hast du recht"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s06a_shared_memory'
      },
      {
        id: 'doubt_her',
        label: '„Ich glaube, du verwechselst mich"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s07_reality_fracture'
      },
      {
        id: 'ask_about_future',
        label: '„Was passiert als Nächstes?"',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s06a_shared_memory'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: ask_about_future nur bei tickets_truth >= 3',
      'Comp7 hat Erinnerungen an gemeinsame Zukunft/Vergangenheit',
      'Zeitlinien überlappen: Non-lineare Narrative',
      'doubt_her verschlechtert Beziehung'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_s06a_shared_memory: Geteilte/falsche Erinnerung
  // ============================================================================
  'c4_s06a_shared_memory': {
    id: 'c4_s06a_shared_memory',
    chapter: 4,
    title: 'Gemeinsam',
    narrative: `Comp7 nimmt deine Hand.

„Schließ die Augen," sagt sie.

Du schließt sie.

Ein Bild erscheint. Klar. Scharf.

Der Bahnsteig. Du stehst dort. Neben dir: Comp7.

„Wir müssen einsteigen," sagt sie in der Erinnerung.

„Warum?" fragst du.

„Weil wir es müssen. Immer."

Der Zug kommt. Ihr steigt ein. Zusammen.

Das Bild wechselt.

Wagen 7. Ihr sitzt am Tisch. Notizbücher überall.

„Es gibt keinen Ausweg," sagst du in der Erinnerung.

„Noch nicht," sagt Comp7.

Das Bild verschwindet.

Du öffnest die Augen. Comp7 schaut dich an.

„War das echt?" fragst du.

„Für mich schon. Für dich noch nicht. Aber es wird echt sein."`,
    choices: [
      {
        id: 'accept_memory',
        label: 'Die Erinnerung als echt akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s07_reality_fracture'
      },
      {
        id: 'reject_memory',
        label: '„Das ist nicht meine Erinnerung"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s07_reality_fracture'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Geteilte Erinnerung: Comp7 zeigt Zukunft/Vergangenheit',
      'accept_memory: Hohe Love/Beziehung, aber Drift-Preis',
      'Vision zeigt: Spieler und Comp7 suchen gemeinsam Ausweg'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s07_reality_fracture: Realität bricht
  // ============================================================================
  'c4_s07_reality_fracture': {
    id: 'c4_s07_reality_fracture',
    chapter: 4,
    title: 'Bruch',
    narrative: `Der Zug schüttelt. Stark.

Nicht wie ein Schienenstoß. Sondern wie ein Erdbeben.

Die Notizbücher fallen von den Wänden. Flattern durch die Luft.

Comp7 greift nach dem Tisch. „Es passiert," sagt sie.

„Was?"

„Reality Fracture. Wenn Memory Drift zu stark wird. Wenn zu viele Zeitlinien kollidieren."

Der Raum flackert. Wie ein Fernseher mit schlechtem Empfang.

Einmal ist der Raum groß. Dann klein. Dann groß.

Die Notizbücher sind da. Dann weg. Dann wieder da.

Comp7s Gesicht wechselt. Klare Züge. Verschwommen. Klar.

„Halt dich fest," sagt sie. „An einer Erinnerung. Einer echten. Sonst verlierst du dich komplett."`,
    choices: [
      {
        id: 'remember_platform',
        label: 'An den Bahnsteig denken',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s07a_drift_peak'
      },
      {
        id: 'remember_comp7',
        label: 'An Comp7 denken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s07a_drift_peak'
      },
      {
        id: 'let_go',
        label: 'Loslassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_s07a_drift_peak'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Reality Fracture: Raum flackert zwischen Zuständen',
      'let_go: Hoher Drift-Preis (Spieler gibt Kontrolle auf)',
      'remember_comp7 stärkt Beziehung in kritischem Moment'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s07a_drift_peak: Drift-Höhepunkt
  // ============================================================================
  'c4_s07a_drift_peak': {
    id: 'c4_s07a_drift_peak',
    chapter: 4,
    title: 'Höhepunkt',
    narrative: `Alles stoppt.

Das Schütteln. Das Flackern. Die Geräusche.

Totale Stille.

Du stehst im Gang. Nicht in Wagen 7. Im normalen Gang.

Alle Abteile sind leer.

Die Lichter sind aus. Nur schwaches Notlicht.

Du bist allein.

Nein. Nicht ganz.

Am Ende des Gangs steht jemand.

Eine Gestalt. Im Gegenlicht. Du kannst das Gesicht nicht erkennen.

„Endlich," sagt die Gestalt. Mit deiner Stimme.

Sie kommt näher.

Mit jedem Schritt wird sie klarer.

Es ist nicht Comp7. Nicht der Junge. Nicht der Schlaflose.

Es bist du.`,
    choices: [
      {
        id: 'confront_self',
        label: '„Wer bist du?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c4_s07b_stabilization'
      },
      {
        id: 'run_away',
        label: 'Weglaufen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s07b_stabilization'
      },
      {
        id: 'accept_double',
        label: '„Ich weiß"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c4_s07b_stabilization'
      }
    ],
    tags: ['reveal', 'drift_variant'],
    state_notes: [
      'Doppelgänger erscheint: Identity-Drift-Höhepunkt',
      'Alle Passagiere verschwunden: Totale Isolation',
      'accept_double: Spieler akzeptiert Fragmentierung'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c4_s07b_stabilization: Kurze Stabilisierung
  // ============================================================================
  'c4_s07b_stabilization': {
    id: 'c4_s07b_stabilization',
    chapter: 4,
    title: 'Stabilität',
    narrative: `Das Doppel löst sich auf. Wie Rauch.

Die Lichter gehen wieder an.

Die Passagiere sind zurück. In ihren Abteilen.

Alles ist normal. Oder so normal, wie es hier sein kann.

Du atmest aus. Das Gefühl von Drift lässt nach.

Comp7 steht plötzlich neben dir. „Es ist vorbei," sagt sie. „Für jetzt."

„Was war das?"

„Peak Drift. Wenn Memory Drift zu stark wird. Es passiert manchmal. Zwischen den Stationen."

„Wird es wieder passieren?"

Sie nickt. „Bei jeder Station wird es stärker. Bis—"

„Bis was?"

Sie antwortet nicht. Schaut aus dem Fenster.

Der Zug wird langsamer.

Dort, wo das Doppel stand, liegt etwas auf dem Boden. Ein kleiner Gegenstand aus Metall.`,
    choices: [
      {
        id: 'examine_object',
        label: 'Den Gegenstand aufheben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s07c_tag19_found'
      },
      {
        id: 'ignore_object',
        label: 'Liegenlassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_end_platform_watch'
      }
    ],
    tags: [],
    state_notes: [
      'Peak Drift endet: Kurze Stabilisierung',
      'Doppel hat Gegenstand hinterlassen (Tag 19 Setup)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_s07c_tag19_found: Fund des Schlüsselanhängers
  // ============================================================================
  'c4_s07c_tag19_found': {
    id: 'c4_s07c_tag19_found',
    chapter: 4,
    title: 'Fundstück',
    narrative: `Du hebst es auf.

Es ist ein Schlüsselanhänger. Alt. Messing, abgegriffen an den Rändern.

Eingraviert ist eine Zahl:

19

Er fühlt sich warm an, als hätte ihn jemand lange in der Hand gehalten.

Comp7 sieht ihn. Ihre Augen weiten sich kurz.

„Der Schlüssel," flüstert sie. „Oder der halbe Schlüssel."

„Wofür?"

„Für das Ende. Oder den Anfang. Behalt ihn. Verlier ihn nicht."

Der Zug bremst. Die Station kommt in Sicht.`,
    choices: [
      {
        id: 'take_tag19',
        label: 'Den Anhänger einstecken',
        effects: [
          { type: 'set', target: 'has_tag19', value: true },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c4_end_platform_watch'
      },
      {
        id: 'give_to_comp7',
        label: 'Ihn Comp7 geben',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_end_platform_watch'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Key-Item gefunden: has_tag19',
      'Wichtig für Kapitel 6A (Unlock)',
      'conductor_attention steigt (Diebstahl aus der Logik)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_end_platform_watch: Bahnsteig beobachten
  // ============================================================================
  'c4_end_platform_watch': {
    id: 'c4_end_platform_watch',
    chapter: 4,
    title: 'Ankunft',
    narrative: `Der Zug hält.

Du gehst zur Tür. Schaust durch das Fenster.

Draußen: Ein Bahnsteig.

Aber er ist anders als die vorherigen.

Auf dem Bahnsteig stehen Menschen. Viele.

Alle regungslos. Alle schauen zum Zug.

Ihre Gesichter sind verschwommen. Wie bei Comp7.

Du suchst nach einem Detail. Etwas, das sie unterscheidet.

Aber sie sehen alle gleich aus.

Nein. Nicht gleich.

Sie sehen alle aus wie du.

Hunderte. Tausende.

Alle du.

Die Tür öffnet sich.`,
    choices: [
      {
        id: 'observe_copies',
        label: 'Die Kopien beobachten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_end_station'
      },
      {
        id: 'close_eyes',
        label: 'Die Augen schließen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_end_station'
      },
      {
        id: 'wave_to_copies',
        label: 'Den Kopien zuwinken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c4_end_station'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Bahnsteig voller Kopien: Identity-Drift sichtbar gemacht',
      'Hunderte Versionen des Spielers',
      'Vorbereitung auf station_end'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c4_end_station: Vierte Station (station_end)
  // ============================================================================
  'c4_end_station': {
    id: 'c4_end_station',
    chapter: 4,
    title: 'Vierter Halt',
    narrative: `Niemand steigt ein. Niemand steigt aus.

Die Kopien stehen nur da. Schauen.

Dann, langsam, beginnen sie sich zu bewegen.

Alle gleichzeitig. Alle in Synchronisation.

Sie heben die Hand. Du hebst deine Hand nicht.

Sie lächeln. Du lächelst nicht.

Sie drehen sich um. Alle. Gleichzeitig.

Gehen weg. Verschwinden in der Dunkelheit am Ende des Bahnsteigs.

Die Tür schließt sich.

Der Zug fährt weiter.

Comp7 steht neben dir. „Station 4," sagt sie.

„Wie viele noch?"

„Drei," sagt sie. „Oder unendlich. Je nachdem, ob wir aussteigen."`,
    choices: [
      {
        id: 'continue_to_chapter_5',
        label: 'Im Zug bleiben',
        effects: [
          { type: 'set', target: 'chapter_index', value: 5 },
          { type: 'inc', target: 'station_count', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s01_final_preparation'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Vierte station_end: memory_drift automatisch erhöht durch Engine-R1 (keine manuellen exit_effects)',
      'Kopien verschwinden synchron',
      'Comp7: "Drei Stationen oder unendlich"',
      'Übergang zu Kapitel 5 (Finale Kontrolle)'
    ],
    atmosphere: 'dark'
  }
};
