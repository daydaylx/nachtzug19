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
        next: 'c5_s03_comp7_reflection'
      },
      {
        id: 'rest_prepare',
        label: 'Ausruhen und sich vorbereiten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s03_comp7_reflection'
      },
      {
        id: 'walk_corridor',
        label: 'In den Gang gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s03_comp7_reflection'
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

„Ich war mal Passagier #7," sagt sie plötzlich. „Aber irgendwann... bin ich zum Zug geworden. Ich kann nicht mehr aussteigen. Ich bin Teil davon."

Ihre Stimme zittert.

„Ich will, dass du gehst," sagt sie. Pause. „Aber ich will nicht allein bleiben."

Sie lacht bitter. „Widersprüchlich, oder?"

„Weißt du, wohin dieser Zug fährt? Oder weißt du nur, dass du nicht zurückkannst?"`,
    choices: [
      {
        id: 'ask_about_destination',
        label: '„Wohin fährt dieser Zug?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },  // Direkte Frage = mehr truth
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
          { type: 'inc', target: 'rel_comp7', value: 2 },      // Persönliches Teilen = mehr Beziehung
          { type: 'inc', target: 'memory_drift', value: 1 }    // Awareness von Anomalien führt zu Drift
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
  // INTERLUDE 2: Lichter flackern (Split Part 1)
  // ==========================================================================

  'c5_s04_lights_flicker': {
    id: 'c5_s04_lights_flicker',
    chapter: 5,
    title: 'Flackern',
    narrative: `Die Lichter beginnen zu sterben. (Hook)

Mit jedem Flackern verlierst du kurz die Orientierung. In der Dunkelheit hörst du dein eigenes, raues Atmen, und wenn das Licht zurückkehrt, scheint dein Schatten an der Wand einen Schritt näher gerückt zu sein als du selbst. (Detail)

Ein kühler Luftzug streicht über deine Stirn, wie eine unsichtbare Hand. (Konsequenz)`,
    choices: [
      {
        id: 'hold_ground',
        label: 'Stehenbleiben',
        effects: [],
        next: 'c5_s05_sleepless_final'
      },
      {
        id: 'press_on',
        label: 'Weiterdrängen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s05_sleepless_final'
      }
    ],
    state_notes: [
      'Interlude Part 1: Desorientierung',
      'Split für Pacing'
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

Er lacht leise, bitter. „Weißt du, was das Lustige ist? Ich kann immer noch nicht schlafen. Selbst hier nicht."

Seine Hände zittern.

„Ich habe alles versucht. Alles gesagt. Aber es reicht nie."

Er blickt dich an.

„Was hast du ihnen gesagt? Warum bist du noch hier?"`,
    choices: [
      {
        id: 'comfort_him',
        label: '„Wir kommen beide durch."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },      // Emotionales Commitment = mehr love
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c5_s06_abteil7'
      },
      {
        id: 'tell_truth',
        label: '„Ich weiß es nicht. Ich erinnere mich nicht."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c5_s06_abteil7'
      },
      {
        id: 'leave_quietly',
        label: 'Ihn allein lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c5_s06_abteil7'
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
          { type: 'inc', target: 'rel_sleepless', value: 2 },    // Schutz-Instinkt = mehr Beziehung
          { type: 'inc', target: 'tickets_truth', value: 1 }     // Information teilen
        ],
        next: 'c5_s06_abteil7'
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

  'c5_s06_abteil7': {
    id: 'c5_s06_abteil7',
    chapter: 5,
    title: 'Abteil 7',
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
        id: 'walk_past',
        label: 'Vorbeigehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c5_s10_boy_reunion'
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
        next: 'c5_s10_boy_reunion'
      },
      {
        id: 'open_and_examine',
        label: 'Die Tür öffnen und die Namen ansehen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 4 },
          { type: 'inc', target: 'conductor_attention', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      },
      {
        id: 'open_door',
        label: 'Die Tür öffnen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      },
      {
        id: 'open_for_answers',
        label: 'Öffnen – für die Antworten',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 4 },
          { type: 'inc', target: 'conductor_attention', value: 3 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c5_s08_abteil7_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece: Abteil 7 (merged approach + inside)',
      'Entering increases conductor_attention (+2 or +3)',
      'Skip choices route to c5_s09 (bypass aftermath)',
      'CONDITION: open_and_examine (tickets_truth >= 3)',
      'CONDITION: protect_sleepless (rel_sleepless >= 2)',
      'CONDITION: open_for_answers (tickets_truth >= 4, high-truth path)'
    ],
    tags: ['setup', 'reveal'],
    atmosphere: 'tense'
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
        next: 'c5_s10_boy_reunion'
      },
      {
        id: 'let_it_go',
        label: 'Es loslassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s10_boy_reunion'
      },
      {
        id: 'write_down_names',
        label: 'Die Namen aufschreiben',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c5_s10_boy_reunion'
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
        next: 'c5_s10_boy_reunion'
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

Aber für einen Moment siehst du etwas anderes in seinem Gesicht. Keine Kälte. Sondern Erschöpfung.

Er greift in seine Tasche, berührt etwas, zieht die Hand aber sofort wieder zurück.

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
    title: 'Das Nichts',
    narrative: `Du blickst aus dem Fenster.

Aber da ist keine Dunkelheit mehr. Nur eine absolute Leere, die das Auge nicht fokussieren kann.

Ein blinder Fleck in der Realität, der direkt in deinen Verstand schneidet. Ein Vakuum, das hungrig ist.

Der Zug fährt nicht durch eine Landschaft – er schält sich durch das Gewebe der Existenz.

---

Du legst die Handfläche an das Fenster.

Es gibt keinen Widerstand von Kälte, nur eine dumpfe, vibrierende Wärme, die tief in deine Knochen siedet.

Deine Finger verschwinden im Spiegelbild, als würde das Glas dich nicht mehr als feste Materie erkennen.

Ein hohes Summen zieht dir über die Zähne, ein Ton an der Grenze des Erträglichen.

---

Du fragst dich: Was war vorher da?

Gab es je eine Welt mit Farben, Wäldern, Städten? Die Erinnerung daran fühlt sich wie eine Lüge an, ein Traum aus einer anderen Zeit.

An etwas anderes erinnerst du dich jetzt – an etwas, das niemals hätte sein dürfen.

Die Leere draußen ist die einzige Wahrheit, die noch übrig ist.`,
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
        label: 'Den Schatten suchen',
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
      'Interlude: Leere außerhalb (merged 3 parts)',
      'Void sequence - visual, sensory, cognitive dissolution',
      'CONDITION: search_reflection (conductor_attention >= 5)'
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
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'emma_memory_unlocked', value: true },
        narrative: `Plötzlich – eine Erinnerung.

Klar und scharf.

Du bist an einem Bahnhof. Bahnhof Westend. Herbst 1973.

Emma steht vor dir. Braune Augen. Graue Jacke. Sie lächelt, aber ihre Augen sind ängstlich.

„Fahr vorsichtig," sagt sie. „Komm zurück."

Du nimmst ihre Hand. Warm. Real.

„Ich verspreche es."

Dann ein Pfiff. Der Zug – NACHTZUG 19 – fährt ein.

Du steigst ein.

Und dann... nichts.

Die Erinnerung endet. Aber jetzt weißt du: Du hast sie nie wiedergesehen.

Emma. Du warst auf dem Weg zu ihr. Und der Zug... ist nie angekommen.`
      }
    ],
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
          value: 5
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
    title: 'Die Frage',
    narrative: `Der Schaffner legt die Fahrkarte auf den Tisch – sie knistert nicht, sondern liegt schwer wie Blei.

„Letzte Frage," sagt er mit einer Stimme, die direkt in deinem Schädel vibriert. Er beugt sich vor, und der Geruch von Ozon und uraltem Staub schlägt dir entgegen. Die Schatten in seinen Augenhöhlen wirbeln wie Rauch.

„Warum kannst du dich nicht erinnern?"

---

Er wartet nicht auf deine Antwort.

„Weil du es vergessen hast? Oder weil du es vergessen wolltest?"

Die Luft im Abteil wird dünner, sauerstoffarm. Deine Lungen brennen, während er mit einem fingerlosen Handschuh auf den Tisch tippt – ein Geräusch wie ein Hammerschlag.

„Sag mir die Wahrheit," fordert er. „Oder steig aus."`,
    choices: [
      {
        id: 'admit_truth_high',
        label: '„Ich wollte es vergessen."',
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
        label: 'Hilfe bei Comp7 suchen',
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
        label: '„Ich schulde dir nichts."',
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
        label: '„Ich weiß es nicht."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c5_s16_control3_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece: Kontrolle 3 Frage (merged 2a + 2b)',
      'Conductor interrogation - escalating pressure',
      'CONDITION: admit_truth_high (tickets_truth >= 4)',
      'CONDITION: ask_comp7_help (rel_comp7 >= 2)',
      'CONDITION: harsh_response (conductor_attention >= 4)'
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
    title: 'Nach der Kontrolle',
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

---

Du sitzt allein in deinem Abteil. Die Fahrkarte in der Hand. Noch gültig. Noch.

Du denkst nach. Über die Kontrolle. Über deine Antworten.

Der Schaffner hat recht: Die Fahrt geht zu Ende.

Bald wirst du ankommen. Irgendwo. Oder aussteigen müssen.

Oder…

Es gibt noch eine dritte Möglichkeit. Eine, über die niemand spricht.

Einfach weiterfahren. Für immer. Im Zug bleiben.

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
      'Set-Piece: Kontrolle 3 Nachwirkungen (merged aftermath + reflection)',
      'Conductor leaves, protagonist reflects on journey ending',
      'Introduces possibility of staying on train forever (Escape ending foreshadowing)'
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
          value: 5
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
        next: 'c5_s20_decision'
      },
      {
        id: 'ask_final_question',
        label: '„Wirst du auch aussteigen?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c5_s20_decision'
      },
      {
        id: 'silent_farewell',
        label: 'Schweigen und gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s20_decision'
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

  'c5_s20_decision': {
    id: 'c5_s20_decision',
    chapter: 5,
    title: 'Die Entscheidung',
    narrative: `Du spürst es:

Die nächste Station kommt.

Nicht in Stunden. In Minuten.

Der Zug verlangsamt sich. Ganz langsam. Fast unmerklich.

Aber du spürst es.

Draußen – da ist etwas. Kein Licht. Aber… eine Präsenz. Ein Ort.

---

Der Zug hält.

Vollständig.

Zum ersten Mal seit… du weißt nicht mehr, wie lange.

Die Türen öffnen sich.

Du siehst hinaus.

Da ist… ein Bahnsteig.

Aber er ist anders als die anderen. Leerer. Stiller. Finaler.

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
        next: 'c5_s22_before_station'
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
        next: 'c5_s22_before_station'
      },
      {
        id: 'step_out_truth',
        label: 'Aussteigen – der Wahrheit begegnen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c5_s22_before_station'
      },
      {
        id: 'stay_in_train',
        label: 'Im Zug bleiben – weiterfahren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c5_s22_before_station'
      }
    ],
    state_notes: [
      'Set-Piece: Finale Entscheidung (merged approach + core)',
      'Wichtigste Entscheidung des Spiels',
      'CONDITION: drift_variant_stay (memory_drift >= 4)',
      'CONDITION: guilt_sacrifice (tickets_guilt >= 3)'
    ],
    tags: ['setup', 'reveal'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 3: Finale Entscheidung (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c5_s22_before_station': {
    id: 'c5_s22_before_station',
    chapter: 5,
    title: 'Vor der Station',
    narrative: `Deine Entscheidung ist gefallen.

Du spürst sie. Im ganzen Körper. Das Gewicht dessen, was du gewählt hast.

Der Zug… reagiert. Die Luft verändert sich. Das Licht. Alles.

Es ist, als würde der Zug selbst… verstehen. Als würde er wissen, was du getan hast. Und akzeptieren.

Die Türen sind noch offen. Aber nur noch für einen Moment.

Dann schließen sie sich. Für immer.

---

Der Zug fährt langsam an. Wieder in Bewegung.

Aber es fühlt sich anders an. Finaler.

Du weißt: Die nächste Station ist die letzte.

Für dich. Für diesen Zug. Für diese Fahrt.

Was auch immer dort wartet – es wird Antworten geben. Oder Fragen. Oder beides. Oder nichts.

Aber du wirst es bald wissen. Sehr bald.`,
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
        next: 'c5_s24_platform_arrives'
      }
    ],
    state_notes: [
      'Transition: Decision aftermath + approach to final station (merged s22 + s23)',
      'Train reacts to choice, moves toward final station',
      'CONDITION: embrace_drift (memory_drift >= 5)'
    ],
    atmosphere: 'somber'
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
          { type: 'inc', target: 'memory_drift', value: 1 }
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
