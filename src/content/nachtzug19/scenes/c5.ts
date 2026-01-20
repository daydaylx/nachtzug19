// ============================================================================
// NACHTZUG 19 - Kapitel 5: Finale Kontrolle
// ============================================================================
// Zielwerte:
// - 22–28 Szenen (erreicht: 25)
// - 5.000–6.500 Wörter (erreicht: ~5.800)
// - 30–45 Choices (erreicht: 42)
// - 8+ Conditions (erreicht: 9)
// Struktur:
// - 5 Interludes (s02, s04, s09, s12, s18)
// - 13 Standard-Szenen
// - 3 Set-Pieces (Abteil 7, Kontrolle 3, Finale Entscheidung)
// ============================================================================

import type { ScenesCollection } from '../../../domain/types';

export const c5Scenes: ScenesCollection = {
  // ==========================================================================
  // OPENING: Vorbereitung auf das Finale
  // ==========================================================================

  'c5_s01_final_preparation': {
    id: 'c5_s01_final_preparation',
    chapter: 5,
    title: 'Letzte Vorbereitung',
    narrative: `Du sitzt wieder in deinem Abteil. Das gleiche Abteil. Die gleiche Fahrt.

Aber etwas hat sich verändert.

Die Luft ist dichter geworden. Schwerer. Als würde der Zug selbst atmen.

Draußen zieht die Dunkelheit vorbei. Keine Lichter mehr. Keine Andeutung von Zivilisation.

Nur die endlose Nacht und das rhythmische Rattern der Räder.

Du denkst an die Station, die du gerade verlassen hast. An die Entscheidungen, die du getroffen hast.

An das, was noch kommt.

Der Zug fährt weiter. Immer weiter.

Und du weißt: Die nächste Kontrolle wird die härteste sein.`,
    choices: [
      {
        id: 'check_recorder',
        label: 'Den Rekorder noch einmal ansehen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s02_corridor_silence'
      },
      {
        id: 'rest_prepare',
        label: 'Ausruhen und sich vorbereiten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s02_corridor_silence'
      },
      {
        id: 'walk_corridor',
        label: 'In den Gang gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s02_corridor_silence'
      }
    ],
    state_notes: [
      'Eröffnungsszene Kapitel 5',
      'CONDITION: check_recorder nur bei has_recorder',
      'walk_corridor erhoeht attention; Vorbereitung auf Kontrolle 3'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // INTERLUDE 1: Stille
  // ==========================================================================

  'c5_s02_corridor_silence': {
    id: 'c5_s02_corridor_silence',
    chapter: 5,
    title: 'Stille im Gang',
    narrative: `Der Gang ist leer.

Kein Schaffner. Keine anderen Passagiere.

Nur das gedämpfte Licht der Notbeleuchtung und das gleichmäßige Schwanken des Zuges.

Du gehst langsam vorwärts. Deine Schritte sind das einzige Geräusch.

Das Notlicht wirft einen schmalen Streifen auf den Boden, der bei jedem Schwanken verrutscht.

Staub tanzt darin, langsam, als hätte die Luft ein eigenes Tempo.

Du ziehst die Finger über die Wand. Der Lack fühlt sich klebrig an, als wäre er frisch gestrichen.

Ein kalter Zug streift deinen Nacken. Du drehst dich, erwartest jemanden, aber der Gang bleibt leer.

Für einen Herzschlag überlegst du, zurück ins Abteil zu gehen. Dann gehst du weiter, nur ein Schritt, dann noch einer.

Der Geruch von Metall und Reinigungsmittel hängt in der Luft, scharf und trocken.

Ein feines Summen der Notbeleuchtung sitzt darin, als würde sie sich gegen das Schweigen stemmen.

Die Notbeleuchtung zeichnet deinen Schatten doppelt, einen klar, einen verschmiert. Du hältst kurz an, prüfst, welcher sich bewegt. Der klare bleibt stehen, der andere rutscht mit dem Zug.

Du schluckst trocken. Die Stille wirkt plötzlich schwerer. Wie eine Decke.

Dann – ein Flackern.

Die Lichter zucken kurz. Erlöschen fast. Kehren zurück.

Für einen Moment hattest du das Gefühl, nicht allein zu sein.

Aber als du dich umdrehst, ist da niemand.

Nur der leere Gang.

Und das Rattern der Räder.`,
    choices: [
      {
        id: 'continue_forward',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s03_comp7_reflection'
      },
      {
        id: 'listen_for_patterns',
        label: 'Nach Mustern im Licht lauschen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 7
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s03_comp7_reflection'
      },
      {
        id: 'retreat_to_safety',
        label: 'Zurück ins Abteil flüchten',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s03_comp7_reflection'
      },
      {
        id: 'challenge_emptiness',
        label: 'Laut in die Stille rufen',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s03_comp7_reflection'
      }
    ],
    state_notes: [
      'Interlude: Atmosphäre aufbauen',
      'memory_drift steigt (Zug wird unheimlicher)',
      'CONDITION: listen_for_patterns (tickets_truth >= 7)',
      'CONDITION: retreat_to_safety (tickets_escape >= 5)',
      'CONDITION: challenge_emptiness (conductor_attention >= 4)'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Gespräch mit Comp7
  // ==========================================================================

  'c5_s03_comp7_reflection': {
    id: 'c5_s03_comp7_reflection',
    chapter: 5,
    title: 'Begegnung mit Comp7',
    narrative: `Du findest Comp7 am Ende des Ganges. Sie steht am Fenster und blickt hinaus in die Dunkelheit.

Als du näher kommst, dreht sie sich um.

„Du bist noch hier," sagt sie leise.

Es klingt nicht überrascht. Eher… traurig.

„Die meisten sind schon ausgestiegen. An einer der Stationen."

Sie blickt wieder hinaus.

„Aber du nicht. Du fährst weiter."

Eine Pause.

„Weißt du, wohin?"

Ihre Stimme ist kaum mehr als ein Flüstern.

„Oder weißt du nur, dass du nicht zurückkannst?"`,
    choices: [
      {
        id: 'ask_about_destination',
        label: '„Wohin fährt dieser Zug?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c5_s04_lights_flicker'
      },
      {
        id: 'ask_about_compartment7',
        label: '„Was ist in Abteil 7?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s04_lights_flicker'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c5_s04_lights_flicker'
      },
      {
        id: 'discuss_silence',
        label: '„Die Stille hier… sie ist nicht normal."',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c5_s04_lights_flicker'
      }
    ],
    state_notes: [
      'Comp7 gibt Hinweise auf Endgame',
      'ask_about_compartment7 erhöht conductor_attention (gefährliche Frage)',
      'CONDITION: discuss_silence nur bei conductor_attention >= 3 (Callback auf s02)'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // INTERLUDE 2: Lichter flackern
  // ==========================================================================

  'c5_s04_lights_flicker': {
    id: 'c5_s04_lights_flicker',
    chapter: 5,
    title: 'Flackerndes Licht',
    narrative: `Die Lichter flackern wieder.

Mit jedem Aus geht auch die Orientierung weg. Du merkst, wie deine Schritte kürzer werden.

In der Dunkelheit hörst du dein eigenes Einatmen, rau, zu laut.

Als das Licht kurz zurückkehrt, ist der Schatten an der Wand einen Schritt näher als du.

Du blinzelst, suchst nach der Quelle, findest nur das zuckende Glas der Lampen.

Ein kühler Luftzug streicht über deine Stirn. Du hebst die Hand, lässt sie wieder sinken.

Das Flackern brennt sich als Nachbild in deine Augen, grüne Punkte, die bleiben, selbst wenn du sie schließt.

Deine Augen brennen kurz, Tränen sammeln sich, aber du blinzelst sie weg.

Im kurzen Licht siehst du die Tür am Ende einen Spalt offen, dann wieder zu. Du blinzelst, unsicher, ob du es dir einbildest.

Der Boden ist kälter geworden, die Haut an deinen Knöcheln zieht sich zusammen. Du bleibst stehen, bis der nächste Lichtimpuls kommt.

Diesmal länger. Intensiver.

Dunkelheit.

Licht.

Dunkelheit.

In den Momenten der Finsternis hörst du… etwas.

Ein Geräusch. Wie Schritte. Oder das Öffnen einer Tür.

Dann kommt das Licht zurück.

Und alles ist still.

Aber du spürst es: Etwas bewegt sich im Zug.

Etwas, das nicht gesehen werden will.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Die Lichter flackern wieder.

Mit jedem Aus geht auch die Orientierung weg. Du merkst, wie deine Schritte kürzer werden.

In der Dunkelheit hörst du dein eigenes Einatmen, rau, zu laut.

Als das Licht kurz zurückkehrt, ist der Schatten an der Wand einen halben Schritt näher als du.

Du blinzelst, suchst nach der Quelle, findest nur das zuckende Glas der Lampen.

Ein kühler Luftzug streicht über deine Stirn. Du hebst die Hand, lässt sie wieder sinken.

Das Flackern brennt sich als Nachbild in deine Augen, blaue Punkte, die bleiben, selbst wenn du sie schließt.

Deine Augen brennen kurz, Tränen sammeln sich, aber du blinzelst sie weg.

Im kurzen Licht siehst du die Tür am Ende einen Spalt offen, dann wieder ganz geschlossen. Du blinzelst, unsicher, ob du es dir einbildest.

Der Boden ist kälter geworden, die Haut an deinen Knöcheln zieht sich zusammen. Du bleibst stehen, bis der nächste Lichtimpuls kommt.

Diesmal länger. Intensiver.

Dunkelheit.

Licht.

Dunkelheit.

In den Momenten der Finsternis hörst du… etwas.

Ein Geräusch. Wie Schritte. Oder das Öffnen einer Tür.

Dann kommt das Licht zurück.

Und alles ist still.

Aber du spürst es: Etwas bewegt sich im Zug.

Etwas, das nicht gesehen werden will.`
      },
      {
        min_drift: 5,
        narrative: `Die Lichter flackern wieder.

Mit jedem Aus geht auch die Orientierung weg. Du merkst, wie deine Schritte kürzer werden.

In der Dunkelheit hörst du dein eigenes Einatmen, rau, zu laut.

Als das Licht kurz zurückkehrt, steht der Schatten an der Wand direkt neben dir.

Du blinzelst, suchst nach der Quelle, findest nur das zuckende Glas der Lampen.

Ein kühler Luftzug streicht über deine Stirn. Du hebst die Hand, lässt sie wieder sinken.

Das Flackern brennt sich als Nachbild in deine Augen, rote Punkte, die bleiben, selbst wenn du sie schließt.

Deine Augen brennen kurz, Tränen sammeln sich, aber du blinzelst sie weg.

Im kurzen Licht siehst du die Tür am Ende offen. Sie bleibt offen. Du blinzelst, unsicher, ob du es dir einbildest.

Der Boden ist kälter geworden, die Haut an deinen Knöcheln zieht sich zusammen. Du bleibst stehen, bis der nächste Lichtimpuls kommt.

Diesmal länger. Intensiver.

Dunkelheit.

Licht.

Dunkelheit.

In den Momenten der Finsternis hörst du… etwas.

Ein Geräusch. Wie Schritte. Oder das Öffnen einer Tür.

Dann kommt das Licht zurück.

Und alles ist still.

Aber du spürst es: Etwas bewegt sich im Zug.

Etwas, das nicht gesehen werden will.`
      }
    ],
    choices: [
      {
        id: 'investigate',
        label: 'Dem Geräusch nachgehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s05_sleepless_final'
      },
      {
        id: 'confront_comp7_questions',
        label: 'An Comp7s Worte denken',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c5_s05_sleepless_final'
      },
      {
        id: 'analyze_abteil7_clue',
        label: 'Die Hinweise auf Abteil 7 deuten',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 8
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s05_sleepless_final'
      },
      {
        id: 'hide_from_presence',
        label: 'Sich vor der Präsenz verstecken',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 6
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s05_sleepless_final'
      }
    ],
    state_notes: [
      'Interlude: Spannung aufbauen',
      'Vorbereitung auf Abteil 7',
      'CONDITION: confront_comp7_questions (rel_comp7 >= 3)',
      'CONDITION: analyze_abteil7_clue (tickets_truth >= 8)',
      'CONDITION: hide_from_presence (tickets_escape >= 6)'
    ],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // STANDARD: Letztes Gespräch mit dem Schlaflosen
  // ==========================================================================

  'c5_s05_sleepless_final': {
    id: 'c5_s05_sleepless_final',
    chapter: 5,
    title: 'Der Schlaflose',
    narrative: `Du findest den schlaflosen Mann in seinem Abteil.

Er sieht noch blasser aus als zuvor. Die Augen tief eingesunken.

„Du… du bist noch da," murmelt er.

„Ich dachte, du wärst schon… weg."

Er starrt an die Wand.

„Sie kommen näher. Die Kontrollen. Jedes Mal härter."

Seine Hände zittern.

„Ich habe… ich habe alles versucht. Alles gesagt. Aber es reicht nie."

Er blickt dich an.

„Was hast du getan? Was hast du ihnen gesagt?"

Seine Stimme bricht.

„Warum bist du noch hier?"`,
    choices: [
      {
        id: 'comfort_him',
        label: '„Wir kommen beide durch."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c5_s06_abteil7_approach'
      },
      {
        id: 'tell_truth',
        label: '„Ich weiß es nicht. Ich erinnere mich nicht."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c5_s06_abteil7_approach'
      },
      {
        id: 'leave_quietly',
        label: 'Ihn allein lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c5_s06_abteil7_approach'
      },
      {
        id: 'warn_about_presence',
        label: '„Da ist etwas im Gang. Sei vorsichtig."',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c5_s06_abteil7_approach'
      }
    ],
    state_notes: [
      'Letztes Gespräch mit Schlaflosem',
      'rel_sleepless beeinflusst spätere Szenen',
      'CONDITION: warn_about_presence nur bei conductor_attention >= 4 (Callback auf s04)'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // SET-PIECE 1: Abteil 7 (Teil 1 - Annäherung)
  // ==========================================================================

  'c5_s06_abteil7_approach': {
    id: 'c5_s06_abteil7_approach',
    chapter: 5,
    title: 'Abteil 7 - Annäherung',
    narrative: `Du gehst den Gang entlang.

Und dann siehst du es:

Abteil 7.

Die Tür ist geschlossen. Kein Licht dringt heraus.

Aber da ist… etwas.

Ein Gefühl. Eine Präsenz.

Du erinnerst dich an die Warnung. An die Andeutungen.

„Geh nicht nach Abteil 7."

Aber niemand hat dir gesagt, warum.

Die Tür ist unverschlossen. Du könntest sie öffnen.

Du könntest weitergehen.

Was tust du?`,
    choices: [
      {
        id: 'open_door',
        label: 'Die Tür öffnen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c5_s07_abteil7_inside'
      },
      {
        id: 'walk_past',
        label: 'Vorbeigehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      },
      {
        id: 'protect_sleepless',
        label: 'Zurück zum Schlaflosen gehen',
        condition: {
          type: 'compare',
          target: 'rel_sleepless',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      },
      {
        id: 'open_door_for_truth',
        label: 'Öffnen – für die Antworten',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 9
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 3 }
        ],
        next: 'c5_s07_abteil7_inside'
      }
    ],
    state_notes: [
      'Set-Piece Teil 1: Abteil 7',
      'open_door erhöht conductor_attention stark (+2)',
      'Wichtige Weichenstellung',
      'CONDITION: protect_sleepless (rel_sleepless >= 2)',
      'CONDITION: open_door_for_truth (tickets_truth >= 9, hohe attention)'
    ],
    tags: ['setup'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 1: Abteil 7 (Teil 2 - Innen)
  // ==========================================================================

  'c5_s07_abteil7_inside': {
    id: 'c5_s07_abteil7_inside',
    chapter: 5,
    title: 'Abteil 7 - Innen',
    narrative: `Du öffnest die Tür.

Das Abteil ist… leer.

Kein Passagier. Keine Sitze. Keine Fenster.

Nur vier kahle Wände.

Und eine Uhr.

Eine alte Bahnhofsuhr, an der Wand. Die Zeiger bewegen sich rückwärts.

Du starrst sie an.

Und dann siehst du es:

Auf dem Boden. Eingraviert.

Namen. Dutzende von Namen.

Du erkennst keinen davon.

Aber da ist… Platz.

Platz für mehr.`,
    choices: [
      {
        id: 'read_names_truth',
        label: 'Die Namen genau ansehen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      },
      {
        id: 'leave_immediately',
        label: 'Sofort das Abteil verlassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      },
      {
        id: 'touch_wall',
        label: 'Die Wand berühren',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 2: Enthüllung Abteil 7',
      'CONDITION: read_names_truth nur bei tickets_truth >= 3',
      'memory_drift steigt (Hinweis auf Natur des Zuges)'
    ],
    tags: ['reveal'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // SET-PIECE 1: Abteil 7 (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c5_s08_abteil7_aftermath': {
    id: 'c5_s08_abteil7_aftermath',
    chapter: 5,
    title: 'Nach Abteil 7',
    narrative: `Du stehst wieder im Gang.

Die Tür von Abteil 7 ist geschlossen.

War sie je offen?

Du versuchst, dich zu erinnern, was du gesehen hast.

Die Namen. Die Uhr. Die leeren Wände.

Aber die Details verschwimmen.

Nur ein Gefühl bleibt:

Etwas Wichtiges ist passiert.

Etwas, das du nicht vergessen solltest.

Aber du weißt nicht mehr genau, was.

Der Zug rattert weiter.`,
    choices: [
      {
        id: 'try_to_remember',
        label: 'Versuchen, sich zu erinnern',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s09_train_shifts'
      },
      {
        id: 'let_it_go',
        label: 'Es loslassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s09_train_shifts'
      },
      {
        id: 'write_down_names',
        label: 'Die Namen aufschreiben',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 10
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c5_s09_train_shifts'
      },
      {
        id: 'ponder_the_wall',
        label: 'Die Kälte der Wand noch spüren',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s09_train_shifts'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen',
      'CONDITION: write_down_names (tickets_truth >= 10)',
      'CONDITION: ponder_the_wall (tickets_guilt >= 1, Callback auf s07)'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // INTERLUDE 3: Zug bewegt sich
  // ==========================================================================

  'c5_s09_train_shifts': {
    id: 'c5_s09_train_shifts',
    chapter: 5,
    title: 'Der Zug bewegt sich',
    narrative: `Der Zug schwankt.

Nicht wie zuvor. Nicht das gleichmäßige Schaukeln.

Diesmal ruckartig. Als würde er… zögern.

Du greifst nach der Wand, um das Gleichgewicht zu halten.

Draußen – war da gerade… etwas?

Ein Licht? Eine Bewegung?

Du presst dein Gesicht ans Fenster.

Nichts. Nur Dunkelheit.

Aber für einen Moment hattest du das Gefühl, etwas zu sehen.

Eine Station, die ihr nicht angefahren habt.

Ein Ort, den ihr übersprungen haben.

Der Zug beschleunigt wieder.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Der Zug schwankt.

Nicht wie zuvor. Nicht das gleichmäßige Schaukeln.

Diesmal ruckartig. Als würde er… bremsen.

Du greifst nach der Wand, um das Gleichgewicht zu halten.

Draußen – war da gerade… etwas?

Ein rotes Licht? Eine Bewegung?

Du presst dein Gesicht ans Fenster.

Nichts. Nur Dunkelheit.

Aber für einen Moment hattest du das Gefühl, etwas zu sehen.

Eine Station, die ihr nicht angefahren habt.

Ein Ort, den ihr ausgelassen habt.

Der Zug beschleunigt wieder.`
      },
      {
        min_drift: 5,
        narrative: `Der Zug schwankt.

Nicht wie zuvor. Nicht das gleichmäßige Schaukeln.

Diesmal seitlich. Als würde er… kippen.

Du greifst nach der Wand, um das Gleichgewicht zu halten.

Draußen – war da gerade… etwas?

Ein Licht? Eine Bewegung?

Du presst dein Gesicht ans Fenster.

Nichts. Nur Dunkelheit.

Aber für einen Moment hattest du das Gefühl, etwas zu sehen.

Einen Bahnsteig mit offenen Türen.

Ein Ort, an dem ihr nie gehalten habt.

Der Zug beschleunigt wieder.`
      }
    ],
    choices: [
      {
        id: 'continue_on',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'station_count', value: 1 }
        ],
        next: 'c5_s10_boy_reunion'
      },
      {
        id: 'press_to_window',
        label: 'Am Fenster bleiben',
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
        next: 'c5_s10_boy_reunion'
      },
      {
        id: 'understand_skip',
        label: 'Die übersprungene Station verstehen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 11
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s10_boy_reunion'
      },
      {
        id: 'use_skip_chance',
        label: 'Den Sprung als Chance nutzen',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 8
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s10_boy_reunion'
      }
    ],
    state_notes: [
      'Interlude: Zug wird unberechenbarer',
      'station_count erhöht sich (übersprungene Station)',
      'CONDITION: understand_skip if tickets_truth >= 11 (c5_s08_abteil7_aftermath remembering)',
      'CONDITION: use_skip_chance if tickets_escape >= 8 (c5_s08_abteil7_aftermath letting go)'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Wiedersehen mit dem Jungen (Recorder/Tag19)
  // ==========================================================================

  'c5_s10_boy_reunion': {
    id: 'c5_s10_boy_reunion',
    chapter: 5,
    title: 'Der Junge',
    narrative: `Du findest den Jungen mit dem Kassettenrekorder.

Er sitzt in einem Abteil, die Kopfhörer auf den Ohren.

Als er dich sieht, nimmt er sie langsam ab.

„Du bist noch da," sagt er leise.

„Ich dachte… ich dachte, du wärst schon weg."

Er blickt auf den Rekorder.

„Die Kassette ist fast zu Ende."

Eine Pause.

„Was passiert, wenn sie zu Ende ist?"

Seine Stimme zittert leicht.

„Muss ich dann… aussteigen?"`,
    choices: [
      {
        id: 'show_recorder_connection',
        label: 'Deinen Rekorder zeigen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c5_s11_corridor_encounter'
      },
      {
        id: 'admit_lost_recorder',
        label: '„Ich habe meinen verloren."',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: false
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c5_s11_corridor_encounter'
      },
      {
        id: 'show_tag19',
        label: 'Das Tag19-Etikett zeigen',
        condition: {
          type: 'bool',
          target: 'has_tag19',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c5_s11_corridor_encounter'
      },
      {
        id: 'reassure_boy',
        label: 'Ihm versichern, dass er nicht allein ist',
        condition: {
          type: 'compare',
          target: 'rel_boy',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c5_s11_corridor_encounter'
      }
    ],
    state_notes: [
      'Recorder/Tag19 Items sind hier relevant',
      'CONDITION: show_recorder_connection nur bei has_recorder',
      'CONDITION: show_tag19 nur bei has_tag19',
      'CONDITION: reassure_boy nur bei rel_boy >= 2',
      'Callback zu Items aus früheren Kapiteln'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Begegnung im Gang
  // ==========================================================================

  'c5_s11_corridor_encounter': {
    id: 'c5_s11_corridor_encounter',
    chapter: 5,
    title: 'Begegnung',
    narrative: `Du gehst zurück in den Gang.

Und dann siehst du ihn:

Den Schaffner.

Er steht am anderen Ende. Reglos.

Seine Silhouette hebt sich gegen das flackernde Licht ab.

Er sieht dich an.

Sagt nichts.

Bewegt sich nicht.

Aber du weißt:

Die nächste Kontrolle kommt bald.

Sehr bald.

Und diesmal wird es anders sein.

Härter.

Finaler.`,
    choices: [
      {
        id: 'approach_conductor',
        label: 'Auf ihn zugehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c5_s12_window_void'
      },
      {
        id: 'retreat_to_compartment',
        label: 'Zurück ins Abteil gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s12_window_void'
      }
    ],
    state_notes: [
      'Vorbereitung auf Kontrolle 3',
      'conductor_attention beeinflusst Härte der Kontrolle',
      'approach_conductor erhöht Attention stark (+2)'
    ],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // INTERLUDE 4: Leere außerhalb
  // ==========================================================================

  'c5_s12_window_void': {
    id: 'c5_s12_window_void',
    chapter: 5,
    title: 'Leere',
    narrative: `Du blickst aus dem Fenster.

Früher war da Dunkelheit. Ein Schwarz, das man mit der Hand greifen konnte.

Jetzt ist da… nichts.

Nicht einmal die Abwesenheit von Licht. Es ist eine Leere, die dein Auge nicht fokussieren kann, ein blinder Fleck in der Realität, der direkt in deinen Verstand schneidet. Ein Vakuum, das hungrig ist.

Du legst die Handfläche an das Fenster. Es gibt keinen Widerstand von Kälte. Nur eine dumpfe, vibrierende Wärme, die deine Haut nicht erreicht, sondern tief in deinen Knochen siedet. Deine Finger verschwinden im Spiegelbild, als würde das Glas dich nicht mehr als feste Materie erkennen. Du ziehst die Hand zurück und starrst auf den feuchten Abdruck, der nicht verblasst, sondern wie Säure in die Scheibe zu ätzen scheint.

Ein leises, hohes Summen zieht dir über die Zähne, ein Ton an der Grenze des Erträglichen. Du fragst dich, ob du fällst, obwohl du vollkommen still stehst. Dein Magen krampft sich zusammen, und du musst dich zwingen, nicht wegzusehen. Der Sog der Leere ist physisch spürbar, ein magnetischer Druck, der dich gegen das Glas ziehen will. Für einen Moment glaubst du, hinter dem Nichts eine Bewegung zu sehen, einen Schatten ohne Körper, ein Auge, das größer ist als der ganze Zug. Du blinzelst, der Eindruck bleibt als glühendes Nachbild auf deiner Netzhaut hängen.

Du presst die Stirn an das Glas. Es fühlt sich glatter an als normal, fast ölig, eine dünne Membran zwischen dir und dem Ende von allem. Ein leiser, dumpfer Druck setzt hinter deinen Augen an, als würdest du in eine Tiefe schauen, die keine Grenzen kennt.

Du ziehst dich keuchend zurück und merkst, dass deine Hand taub geworden ist. Das Rattern des Zuges klingt für einen Atemzug meilenweit entfernt, ein unwichtiges Geräusch aus einer Welt, die bereits hinter dir liegt.

Nur eine absolute Abwesenheit.

Der Zug fährt nicht durch eine Landschaft. Er schält sich durch das Gewebe der Existenz.

Und du fragst dich:

Was war vorher da?

Gab es je eine Welt mit Farben? Mit Wäldern, Städten, Menschen?

Die Erinnerung daran fühlt sich wie eine Lüge an. Oder wie ein Traum, den du vor langer Zeit einmal geträumt hast.

An etwas anderes erinnerst du dich jetzt.

An etwas, das niemals hätte sein dürfen.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du blickst aus dem Fenster.

Früher war da Dunkelheit.

Jetzt ist da… weißes Rauschen.

Wie ein Fernsehsender ohne Signal.

Du legst die Handfläche an das Fenster. Es kribbelt. Statische Ladung.

Ein leises Summen zieht dir über die Zähne. Du fragst dich, ob du fällst, obwohl du still stehst.

Du legst die Stirn an das Glas. Es schmeckt nach Metall.

Der Zug fährt durch das Signal.

Und du fragst dich:

Wer sendet?`
      },
      {
        min_drift: 5,
        narrative: `Du blickst aus dem Fenster.

Früher war da Dunkelheit.

Jetzt ist da… der Code.

Du siehst keine Landschaft. Du siehst Linien. Strukturen. Geometrie.

Der Zug fährt nicht. Er wird berechnet.

Du legst die Handfläche an das Fenster. Deine Hand wird transparent. Du siehst die Knochen. Dann nur noch Drahtgitter.

Ein leises Summen zieht dir über die Zähne.

Du legst die Stirn an das Glas.

Und du hörst die Maschine denken.

„Rendering Sector 5," flüstert sie.

„Subject is becoming aware."`
      }
    ],
    choices: [
      {
        id: 'accept_void',
        label: 'Die Leere akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s13_memory_fragment'
      },
      {
        id: 'search_reflection',
        label: 'Den Schatten des Schaffners im Glas suchen',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s13_memory_fragment'
      }
    ],
    state_notes: [
      'Interlude: Realität löst sich auf',
      'memory_drift steigt weiter',
      'CONDITION: search_reflection nur bei conductor_attention >= 5 (Callback auf s11)'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // STANDARD: Erinnerungsfragment
  // ==========================================================================

  'c5_s13_memory_fragment': {
    id: 'c5_s13_memory_fragment',
    chapter: 5,
    title: 'Fragment',
    narrative: `Plötzlich – eine Erinnerung.

Klar und scharf.

Du bist an einem Bahnhof. Ein normaler Bahnhof.

Menschen um dich herum. Züge, die kommen und gehen.

Du wartest auf jemanden.

Wer?

Das Bild verschwimmt.

Du greifst danach, versuchst es festzuhalten.

Aber es zerrinnt.

Und was bleibt, ist nur:

Ein Name. Ein Gesicht.

Fast greifbar.

Aber nicht ganz.`,
    choices: [
      {
        id: 'chase_memory',
        label: 'Der Erinnerung nachjagen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s14_control3_approach'
      },
      {
        id: 'let_memory_fade',
        label: 'Die Erinnerung loslassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s14_control3_approach'
      },
      {
        id: 'write_down_memory',
        label: 'Versuchen, sie festzuhalten',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s14_control3_approach'
      }
    ],
    state_notes: [
      'Erinnerungsfragment (wichtig für Ending)',
      'memory_drift beeinflusst Klarheit der Erinnerungen',
      'Vorbereitung auf emotionale Kontrolle'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // SET-PIECE 2: Kontrolle 3 (Teil 1 - Annäherung)
  // ==========================================================================

  'c5_s14_control3_approach': {
    id: 'c5_s14_control3_approach',
    chapter: 5,
    title: 'Kontrolle 3 - Annäherung',
    narrative: `Der Schaffner erscheint in deinem Abteil.

Nicht durch die Tür.

Er ist einfach… da.

Als wäre er schon immer dagewesen.

„Dritte Kontrolle," sagt er.

Seine Stimme ist leiser als zuvor. Kälter.

„Fahrkarte."

Du reichst sie ihm.

Er betrachtet sie lange. Sehr lange.

„Interessant," murmelt er schließlich.

Er blickt auf.

Direkt in deine Augen.

„Sie haben viel gesehen. Viel getan."

Eine Pause.

„Aber reicht es?"`,
    choices: [
      {
        id: 'show_confidence',
        label: '„Ich habe ein Recht, hier zu sein."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s15_control3_question'
      },
      {
        id: 'show_uncertainty',
        label: '„Ich… ich weiß nicht."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s15_control3_question'
      },
      {
        id: 'mention_fragment',
        label: 'Ihm von dem Bahnhof erzählen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 12
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c5_s15_control3_question'
      }
    ],
    state_notes: [
      'Set-Piece Teil 1: Kontrolle 3 Beginn',
      'Letzte und härteste Kontrolle',
      'conductor_attention beeinflusst nächste Szene',
      'CONDITION: mention_fragment nur bei tickets_truth >= 12 (Callback auf s13)'
    ],
    tags: ['control', 'setup'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // SET-PIECE 2: Kontrolle 3 (Teil 2 - Kernfrage)
  // ==========================================================================

  'c5_s15_control3_question': {
    id: 'c5_s15_control3_question',
    chapter: 5,
    title: 'Kontrolle 3 - Die Frage',
    narrative: `Der Schaffner legt die Fahrkarte auf den Tisch.

„Letzte Frage," sagt er.

„Und diesmal will ich die Wahrheit."

Er beugt sich vor.

„Warum kannst du dich nicht erinnern?"

Seine Augen bohren sich in deine.

„Nicht an den Anfang. Nicht an das, was vorher war."

„Weil du es vergessen hast?"

Eine Pause.

„Oder weil du es vergessen wolltest?"

Die Luft im Abteil wird dünner.

„Sag mir die Wahrheit."

„Oder steig aus. Jetzt. An der nächsten Station."`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Der Schaffner legt die Fahrkarte auf den Tisch.

Aber es ist keine Fahrkarte. Es ist ein Foto.

Es zeigt dich. Schlafend.

„Letzte Frage," sagt er. Seine Stimme klingt wie zwei Stimmen übereinander.

„Warum wachst du nicht auf?"

Er beugt sich vor. Sein Gesicht flimmert.

„Nicht hier. Nicht dort."

„Weil du es vergessen hast?"

Eine Pause. Das Licht wird rot.

„Oder weil du Angst hast?"

Die Luft im Abteil riecht nach Ozon und verbranntem Haar.

„Sag mir die Wahrheit."

„Oder bleib hier. Für immer."`
      },
      {
        min_drift: 5,
        narrative: `Der Schaffner legt die Hand auf den Tisch.

Er hat keine Fahrkarte. Er hat keine Kelle.

Er hat keine Augen.

Dort, wo sie sein sollten, ist nur Schatten.

„Letzte Frage," sagt die Dunkelheit.

„Wer bist du?"

Er beugt sich vor. Du hörst das Knacken seiner Uniform, als würde sie ihn zerdrücken.

„Nicht der Passagier. Nicht der Träumer."

„Weil du es vergessen hast?"

Eine Pause. Der Zug schreit.

„Oder weil du niemand bist?"

Die Luft im Abteil ist weg. Vakuum.

„Sag mir die Wahrheit."

„Bevor du aufhörst zu existieren."`
      }
    ],
    choices: [
      {
        id: 'admit_truth_high',
        label: '„Ich wollte es vergessen. Ich habe es verdient."',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 3 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c5_s16_control3_aftermath'
      },
      {
        id: 'ask_comp7_help',
        label: 'An Comp7 denken – sie könnte helfen',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s16_control3_aftermath'
      },
      {
        id: 'harsh_response',
        label: '„Ich schulde dir keine Antwort."',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c5_s16_control3_aftermath'
      },
      {
        id: 'deny_everything',
        label: '„Ich weiß es wirklich nicht."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c5_s16_control3_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 2: Kern-Entscheidung Kontrolle 3',
      'CONDITION: admit_truth_high nur bei tickets_truth >= 4',
      'CONDITION: ask_comp7_help nur bei rel_comp7 >= 2',
      'CONDITION: harsh_response nur bei conductor_attention >= 4 (harte Variante)',
      'Wichtigste Callback-Szene (Tickets beeinflussen Optionen)'
    ],
    tags: ['control'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // SET-PIECE 2: Kontrolle 3 (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c5_s16_control3_aftermath': {
    id: 'c5_s16_control3_aftermath',
    chapter: 5,
    title: 'Kontrolle 3 - Danach',
    narrative: `Der Schaffner steht auf.

Langsam. Bedächtig.

Er gibt dir die Fahrkarte zurück.

„Du darfst bleiben," sagt er schließlich.

„Vorerst."

Er dreht sich zur Tür.

„Aber die Fahrt ist fast zu Ende."

Er blickt zurück.

„Bald musst du entscheiden."

„Wirklich entscheiden."

Dann ist er weg.

Und du sitzt allein in deinem Abteil.

Die Fahrkarte in der Hand.

Noch gültig.

Noch.`,
    choices: [
      {
        id: 'examine_ticket',
        label: 'Die Fahrkarte ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s17_aftermath_reflection'
      },
      {
        id: 'rest_after_control',
        label: 'Ausruhen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s17_aftermath_reflection'
      },
      {
        id: 'ponder_words',
        label: 'Über die Worte des Schaffners nachgrübeln',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s17_aftermath_reflection'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen Kontrolle 3',
      'Kontrolle überstanden – nächste Station rückt näher',
      'CONDITION: ponder_words nur bei conductor_attention >= 4 (Callback auf s15)'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Reflexion nach Kontrolle
  // ==========================================================================

  'c5_s17_aftermath_reflection': {
    id: 'c5_s17_aftermath_reflection',
    chapter: 5,
    title: 'Reflexion',
    narrative: `Du sitzt da und denkst nach.

Über die Kontrolle. Über deine Antworten.

Über das, was du gesagt – und nicht gesagt hast.

Der Schaffner hat recht:

Die Fahrt geht zu Ende.

Bald wirst du ankommen. Irgendwo.

Oder aussteigen müssen.

Oder…

Es gibt noch eine dritte Möglichkeit.

Eine, über die niemand spricht.

Einfach weiterfahren.

Für immer.

Im Zug bleiben.

Ist das möglich?`,
    choices: [
      {
        id: 'consider_staying',
        label: 'Den Gedanken zulassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s18_darkness_spreads'
      },
      {
        id: 'reject_staying',
        label: 'Den Gedanken verwerfen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s18_darkness_spreads'
      }
    ],
    state_notes: [
      'Reflexion über Kontrolle und Zukunft',
      'consider_staying deutet Escape-Ending an'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // INTERLUDE 5: Dunkelheit breitet sich aus
  // ==========================================================================

  'c5_s18_darkness_spreads': {
    id: 'c5_s18_darkness_spreads',
    chapter: 5,
    title: 'Ausbreitung',
    narrative: `Die Dunkelheit ist jetzt überall.

Nicht nur draußen.

Auch im Zug.

Die Lichter werden schwächer. Flackern öfter.

Ganze Abschnitte liegen im Dunkeln.

Du gehst durch den Gang.

Und merkst:

Es gibt weniger Abteile als vorher.

Oder… erinnerst du dich falsch?

War Abteil 4 nicht hier?

Oder war es nie da?

Der Zug wird kleiner.

Enger.

Als würde er sich um dich herum zusammenziehen.`,
    choices: [
      {
        id: 'keep_walking',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s19_final_conversation'
      },
      {
        id: 'search_for_door',
        label: 'Nach einer vertrauten Tür suchen',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 6
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s19_final_conversation'
      }
    ],
    state_notes: [
      'Interlude: Zug verändert sich fundamental',
      'Vorbereitung auf Endgame',
      'CONDITION: search_for_door nur bei tickets_escape >= 6 (Callback auf s17)'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // STANDARD: Letzte Unterhaltung (Callback)
  // ==========================================================================

  'c5_s19_final_conversation': {
    id: 'c5_s19_final_conversation',
    chapter: 5,
    title: 'Letzte Worte',
    narrative: `Du findest Comp7 ein letztes Mal.

Sie steht am Fenster. Wie immer.

„Es ist fast vorbei," sagt sie, ohne sich umzudrehen.

„Die Fahrt. Der Zug. Alles."

Sie dreht sich zu dir.

„Du hast deine Wahl getroffen. Mit jedem Schritt. Jeder Entscheidung."

„Jetzt musst du nur noch… ankommen."

Eine Pause.

„Oder gehen."

Sie lächelt traurig.

„Ich hoffe, du findest, was du suchst."

„Falls du überhaupt noch weißt, was das ist."`,
    choices: [
      {
        id: 'love_farewell',
        label: '„Danke. Für alles."',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c5_s20_decision_approach'
      },
      {
        id: 'ask_final_question',
        label: '„Wirst du auch aussteigen?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c5_s20_decision_approach'
      },
      {
        id: 'silent_farewell',
        label: 'Schweigen und gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s20_decision_approach'
      }
    ],
    state_notes: [
      'Letzte Unterhaltung mit Comp7',
      'CONDITION: love_farewell nur bei tickets_love >= 3',
      'Callback zu Beziehung mit Comp7',
      'Vorbereitung auf finale Entscheidung'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // SET-PIECE 3: Finale Entscheidung (Teil 1 - Annäherung)
  // ==========================================================================

  'c5_s20_decision_approach': {
    id: 'c5_s20_decision_approach',
    chapter: 5,
    title: 'Entscheidung - Annäherung',
    narrative: `Du spürst es:

Die nächste Station kommt.

Nicht in Stunden. In Minuten.

Der Zug verlangsamt sich.

Ganz langsam. Fast unmerklich.

Aber du spürst es.

Draußen – da ist etwas.

Kein Licht. Aber… eine Präsenz.

Ein Ort.

Der Zug hält gleich.

Und dann musst du entscheiden:

Aussteigen.

Oder bleiben.

Es gibt kein Zurück mehr.`,
    choices: [
      {
        id: 'prepare_to_decide',
        label: 'Sich vorbereiten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s21_decision_core'
      },
      {
        id: 'resist_arrival',
        label: 'Der Ankunft widerstehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s21_decision_core'
      }
    ],
    state_notes: [
      'Set-Piece Teil 1: Vorbereitung auf finale Entscheidung',
      'Letzte Weichenstellung vor Station'
    ],
    tags: ['setup'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 3: Finale Entscheidung (Teil 2 - Kern)
  // ==========================================================================

  'c5_s21_decision_core': {
    id: 'c5_s21_decision_core',
    chapter: 5,
    title: 'Die Entscheidung',
    narrative: `Der Zug hält.

Vollständig.

Zum ersten Mal seit… du weißt nicht mehr, wie lange.

Die Türen öffnen sich.

Du siehst hinaus.

Da ist… ein Bahnsteig.

Aber er ist anders als die anderen.

Leerer. Stiller.

Finaler.

Du spürst:

Wenn du jetzt aussteigst, kommst du nie zurück.

Wenn du bleibst… was dann?

Der Schaffner erscheint hinter dir.

„Zeit zu gehen," sagt er leise.

„Oder zu bleiben."

„Deine Wahl."`,
    choices: [
      {
        id: 'drift_variant_stay',
        label: 'Im Zug bleiben – alles vergessen',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 3 }
        ],
        next: 'c5_s22_decision_aftermath'
      },
      {
        id: 'guilt_sacrifice',
        label: 'Aussteigen – die Verantwortung tragen',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 3 }
        ],
        next: 'c5_s22_decision_aftermath'
      },
      {
        id: 'step_out_truth',
        label: 'Aussteigen – der Wahrheit begegnen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c5_s22_decision_aftermath'
      },
      {
        id: 'stay_in_train',
        label: 'Im Zug bleiben – weiterfahren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c5_s22_decision_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 2: Kern-Entscheidung für Ending',
      'CONDITION: drift_variant_stay nur bei memory_drift >= 4',
      'CONDITION: guilt_sacrifice nur bei tickets_guilt >= 3',
      'Wichtigste Entscheidung des Spiels'
    ],
    tags: ['reveal'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 3: Finale Entscheidung (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c5_s22_decision_aftermath': {
    id: 'c5_s22_decision_aftermath',
    chapter: 5,
    title: 'Danach',
    narrative: `Deine Entscheidung ist gefallen.

Du spürst sie. Im ganzen Körper.

Das Gewicht dessen, was du gewählt hast.

Der Zug… reagiert.

Die Luft verändert sich.

Das Licht.

Alles.

Es ist, als würde der Zug selbst… verstehen.

Als würde er wissen, was du getan hast.

Und akzeptieren.

Die Türen sind noch offen.

Aber nur noch für einen Moment.

Dann schließen sie sich.

Für immer.`,
    choices: [
      {
        id: 'accept_choice',
        label: 'Die Wahl akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s23_before_station'
      },
      {
        id: 'doubt_choice',
        label: 'Zweifeln',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c5_s23_before_station'
      },
      {
        id: 'embrace_drift',
        label: 'Sich dem Vergessen hingeben',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s23_before_station'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen der finalen Entscheidung',
      'Übergang zur letzten Station',
      'CONDITION: embrace_drift nur bei memory_drift >= 5 (Callback auf s21)'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Vor der Station
  // ==========================================================================

  'c5_s23_before_station': {
    id: 'c5_s23_before_station',
    chapter: 5,
    title: 'Vor der Station',
    narrative: `Der Zug fährt langsam an.

Wieder in Bewegung.

Aber es fühlt sich anders an.

Finaler.

Du weißt: Die nächste Station ist die letzte.

Für dich.

Für diesen Zug.

Für diese Fahrt.

Was auch immer dort wartet –

Es wird Antworten geben.

Oder Fragen.

Oder beides.

Oder nichts.

Aber du wirst es bald wissen.

Sehr bald.`,
    choices: [
      {
        id: 'look_forward',
        label: 'Nach vorn blicken',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s24_platform_arrives'
      },
      {
        id: 'look_back',
        label: 'Zurückblicken',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c5_s24_platform_arrives'
      }
    ],
    state_notes: [
      'Vorbereitung auf letzte Station',
      'Emotionale Transition'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Bahnsteig erscheint
  // ==========================================================================

  'c5_s24_platform_arrives': {
    id: 'c5_s24_platform_arrives',
    chapter: 5,
    title: 'Der Bahnsteig',
    narrative: `Draußen taucht etwas auf.

Langsam. Wie aus dem Nichts.

Ein Bahnsteig.

Der fünfte.

Der letzte.

Er ist… still.

Keine Menschen. Keine Bewegung.

Nur Stille.

Und ein Schild.

Du kannst es fast lesen.

Fast.

Der Zug wird langsamer.

Noch langsamer.

Gleich hält er.

Gleich öffnen sich die Türen.

Und dann…

Dann ist die Fahrt vorbei.`,
    choices: [
      {
        id: 'prepare_to_exit',
        label: 'Bereit machen',
        effects: [
          { type: 'inc', target: 'station_count', value: 1 }
        ],
        next: 'c5_end_station'
      }
    ],
    state_notes: [
      'Letzte Szene vor Station-End',
      'Aufbau maximaler Spannung'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // ENDING: Fünfte Station
  // ==========================================================================

  'c5_end_station': {
    id: 'c5_end_station',
    chapter: 5,
    title: 'Fünfte Station',
    narrative: `Der Zug hält.

Die Türen öffnen sich.

Du stehst auf.

Trittst hinaus auf den Bahnsteig.

Die Luft ist… anders.

Kühler. Klarer.

Sie schmeckt nach Regen, nach altem Stein. Der Bahnsteig ist feucht, eine dünne Schicht, die unter deinen Schuhen schmatzt. Du hörst ein fernes Tropfen, gleichmäßig, wie eine zweite Uhr.

Ein Windzug streicht durch die offenen Türen und zieht an deinem Ärmel. Du drehst den Kopf, suchst eine Ansage, findest nur das Summen der Neonröhre. Für einen Augenblick willst du den Zug nicht loslassen, deine Hand bleibt am Türrahmen hängen.

Die kalte Luft macht deine Haut sofort wach, und du spürst jeden Atemzug. Als du den Blick über das Schild führst, flackern die Buchstaben kurz, als würden sie sich erst entscheiden, wie sie aussehen wollen.

Du spürst kleine Körner unter der Sohle, als wäre der Bahnsteig mit Sand bestreut. Für einen Moment willst du die Augen schließen und einfach nur stehen bleiben, aber das Summen hinter dir zieht dich zurück.

Deine Schultern werden leicht, als hätte der Zug dich losgelassen. Doch die offene Tür bleibt in deinem Blick.

Du drehst dich um.

Der Zug steht noch da. Die Türen offen.

Als würde er warten.

Als würdest du noch einmal einsteigen können.

Aber du weißt: Das ist nicht wahr.

Das Schild am Bahnsteig –

Jetzt kannst du es lesen.

Und was darauf steht, verändert alles.

Du stehst einen Moment da.

Dann hörst du eine Stimme hinter dir.

„Noch nicht fertig."

Du drehst dich um.

Comp7 steht dort. Im Türrahmen des Zuges.

„Noch eine Station," sagt sie leise.

„Nur noch eine."`,
    choices: [
      {
        id: 'enter_wagon_12',
        label: 'Dem verborgenen Pfad folgen (Wagen 12)',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 4 },
            { type: 'bool', target: 'has_tag19', value: true }
          ]
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 6 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c6_s01_awakening'
      },
      {
        id: 'continue_normal',
        label: 'Wieder einsteigen',
        effects: [
          { type: 'set', target: 'chapter_index', value: 6 }
        ],
        next: 'c6_s01_awakening'
      },
      {
        id: 'acknowledge_guilt',
        label: 'Die Namen auf dem Bahnsteig suchen',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'set', target: 'chapter_index', value: 6 }
        ],
        next: 'c6_s01_awakening'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'R1: Engine erhoeht memory_drift/station_count automatisch (keine manuellen station_end-Effects)',
      'Station-End: Übergang zu Kapitel 6',
      'CONDITION: acknowledge_guilt nur bei tickets_guilt >= 4 (Callback auf s08)'
    ],
    atmosphere: 'mystic'
  }
};
