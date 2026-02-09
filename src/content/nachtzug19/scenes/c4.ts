// ============================================================================
// NACHTZUG 19 - Kapitel 4: Spiegelungen (REDUCED / P2 FIX)
// ============================================================================
// Szenen (18):
// Entry: c4_s01_mirror_intro
// Reflection: c4_s02_double_reflection, c4_s02a_reflection_speaks
// Interludes: c4_interlude_01_corridor_mirror, c4_interlude_01b_mirror_whisper
// Recorder: c4_s03_recorder_loop_discovery, c4_s03b_tape_silence
// Comp7: c4_s04_comp7_mirror_truth, c4_s04b_anchor_hint, c4_s04a_comp7_identity
// Artifact: c4_s05_reality_fracture, c4_s05b_ash_heat, c4_s05a_tag19_found
// Identity: c4_s06_name_loss, c4_s06b_name_echo
// End: c4_end_platform_copies, c4_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter4Scenes: ScenesCollection = {
  // ============================================================================
  // c4_s01_mirror_intro: Einstieg
  // ============================================================================
  'c4_s01_mirror_intro': {
    id: 'c4_s01_mirror_intro',
    chapter: 4,
    title: 'Spiegel',
    narrative: `Du stehst im Waschraum. Das Wasser läuft kalt über deine Hände, aber du spürst es kaum.

Der Spiegel vor dir ist beschlagen. Du wischst ihn frei.

Dein Spiegelbild starrt dich an.

Du hebst die linke Hand. Es hebt die rechte. Ein perfektes Abbild.

Doch als du blinzelst, bleiben seine Augen weit offen.

Es lächelt. Du nicht.`,
    choices: [
      {
        id: 'touch_mirror',
        label: 'Das Glas berühren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s02_double_reflection'
      },
      {
        id: 'speak_to_it',
        label: '„Was bist du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s02a_reflection_speaks'
      },
      {
        id: 'look_away',
        label: 'Wegsehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_01_corridor_mirror'
      }
    ],
    tags: ['drift_variant', 'reveal'],
    state_notes: ['Spiegelbild autonom'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s02_double_reflection: Doppeltes Bild
  // ============================================================================
  'c4_s02_double_reflection': {
    id: 'c4_s02_double_reflection',
    chapter: 4,
    title: 'Verdopplung',
    narrative: `Deine Fingerspitzen berühren das Glas – und treffen auf Wärme.

Hinter deinem Spiegelbild schält sich eine zweite Gestalt aus dem Dampf. Sie sieht aus wie du, aber ihre Kleidung ist anders. Älter.

Zwei Versionen von dir. Eine im Hier. Eine im Dort.

Die zweite Version formt lautlos Worte: „Wir sind viele.“`,
    choices: [
      {
        id: 'press_hand',
        label: 'Hand gegen die Hand der Kopie drücken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s03_recorder_loop_discovery'
      },
      {
        id: 'break_contact',
        label: 'Zurückweichen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_01_corridor_mirror'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Begegnung mit anderem Self'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s02a_reflection_speaks: Spiegel spricht
  // ============================================================================
  'c4_s02a_reflection_speaks': {
    id: 'c4_s02a_reflection_speaks',
    chapter: 4,
    title: 'Antwort',
    narrative: `Dein Spiegelbild hört auf zu lächeln. Es kommt näher an das Glas, bis sein Atem es von innen beschlägt.

„Ich bin das, was übrig bleibt,“ flüstert es. Du hörst es nicht mit den Ohren, sondern direkt im Kopf.

„Wenn du gehst, bleibe ich hier. Wie die anderen Male.“`,
    choices: [
      {
        id: 'ask_how_many',
        label: '„Wie oft war ich hier?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s03_recorder_loop_discovery'
      },
      {
        id: 'deny_loop',
        label: '„Das ist das erste Mal."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_interlude_01_corridor_mirror'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Loop-Andeutung'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_interlude_01_corridor_mirror: Gang-Spiegelung
  // ============================================================================
  'c4_interlude_01_corridor_mirror': {
    id: 'c4_interlude_01_corridor_mirror',
    chapter: 4,
    title: 'Korridor',
    narrative: `Du reißt den Blick vom Spiegel los und verlässt den Waschraum.

Der Gang vor dir wirkt endlos. Die Fenster zur Linken sind jetzt Spiegel.

Du gehst an ihnen vorbei. In jedem Fenster siehst du eine andere Version von dir: eine weint, eine lacht, eine ist blutverschmiert, eine ist alt.

Als du vorbeigehst, drehen sie sich gleichzeitig nach dir um.`,
    choices: [
      {
        id: 'run',
        label: 'Rennen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c4_interlude_01b_mirror_whisper'
      },
      {
        id: 'walk_slowly',
        label: 'Jede Version ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_interlude_01b_mirror_whisper'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Identity Drift visualisiert'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // c4_interlude_01b_mirror_whisper: Flüstern im Glas
  // ==========================================================================
  'c4_interlude_01b_mirror_whisper': {
    id: 'c4_interlude_01b_mirror_whisper',
    chapter: 4,
    title: 'Flüstern',
    narrative: `Noch während du weitergehst, hörst du Stimmen, aber sie kommen nicht von den Türen.

Sie kommen aus den Spiegeln. Wie Atem auf Glas. Ein Wort wiederholt sich: „Neunzehn.“`,
    choices: [
      {
        id: 'answer_whisper',
        label: 'Antworten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s03_recorder_loop_discovery'
      },
      {
        id: 'cover_ears',
        label: 'Ohren zuhalten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s03_recorder_loop_discovery'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Recorder-Loop'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s03_recorder_loop_discovery: Recorder Loop
  // ============================================================================
  'c4_s03_recorder_loop_discovery': {
    id: 'c4_s03_recorder_loop_discovery',
    chapter: 4,
    title: 'Die Aufnahme',
    narrative: `Du findest dich in deinem Abteil wieder. Der Rekorder liegt auf dem Tisch. Er läuft.

Du hast ihn nicht eingeschaltet.

Die Kassette dreht sich langsam. Ein hypnotisches Klicken.

Aus dem Lautsprecher kommt deine eigene Stimme:

„—Vierter Durchlauf. Wieder hier. Ich weiß jetzt, was der Spiegel ist. Er zeigt nicht mich. Er zeigt die, die es nicht geschafft haben.—"

Die Stimme bricht ab. Dann schreit sie.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_recorder', value: false },
        narrative: `Du findest dich in deinem Abteil wieder. Auf dem Tisch liegt ein Rekorder.

Du besitzt keinen Rekorder. Aber dieser hier… er sieht aus, als hätte er im Feuer gelegen.

Er läuft.

Aus dem Lautsprecher kommt deine eigene Stimme:

„—Vierter Durchlauf. Wieder hier. Ich weiß jetzt, was der Spiegel ist. Er zeigt nicht mich. Er zeigt die, die es nicht geschafft haben.—"

Die Stimme bricht ab. Dann schreit sie.`
      }
    ],
    choices: [
      {
        id: 'stop_tape',
        label: 'Das Band stoppen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_s03b_tape_silence'
      },
      {
        id: 'listen_loop',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s03b_tape_silence'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Loop-Bestätigung durch Audio'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // c4_s03b_tape_silence: Band-Stille (Interlude)
  // ==========================================================================
  'c4_s03b_tape_silence': {
    id: 'c4_s03b_tape_silence',
    chapter: 4,
    title: 'Nachhall',
    narrative: `Das Band läuft noch einen Moment nach.

Dann Stille. So sauber, dass du dein Blut in den Ohren hörst.

Im Spiegel hinter dir erscheint eine Silhouette. Comp7.`,
    choices: [
      {
        id: 'turn_to_comp7',
        label: 'Zu ihr drehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s04_comp7_mirror_truth'
      },
      {
        id: 'stay_facing_tape',
        label: 'Den Blick auf dem Rekorder halten',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c4_s04_comp7_mirror_truth'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Comp7 Erklärung'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c4_s04_comp7_mirror_truth: Comp7 Erklärung
  // ============================================================================
  'c4_s04_comp7_mirror_truth': {
    id: 'c4_s04_comp7_mirror_truth',
    chapter: 4,
    title: 'Erklärung',
    narrative: `Comp7 sitzt plötzlich dir gegenüber. Ihre Augen sind verschiedenfarbig – eins grün, eins blau.

„Du hast es gehört," sagt sie. „Das Echo."

„Bin ich das?" fragst du.

„Du warst es. In einer anderen Runde. Der Zug fährt im Kreis, aber er vergisst nichts. Die Spiegel, die Bänder… sie sind das Gedächtnis des Zuges.“

Sie beugt sich vor. „Wir müssen etwas finden. Etwas Festes. Sonst löst du dich auf wie die anderen im Spiegel.“`,
    choices: [
      {
        id: 'ask_what_to_find',
        label: '„Was meinst du mit fest?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c4_s04b_anchor_hint'
      },
      {
        id: 'panic_identity',
        label: '„Ich löse mich auf?"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s04b_anchor_hint'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Comp7 erklärt Drift-Gefahr'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // c4_s04b_anchor_hint: Anker-Hinweis (Interlude)
  // ==========================================================================
  'c4_s04b_anchor_hint': {
    id: 'c4_s04b_anchor_hint',
    chapter: 4,
    title: 'Hinweis',
    narrative: `Comp7 tippt mit dem Finger auf den Tisch, als würde sie eine Zahl markieren.

„Nicht dein Name hält dich hier,“ sagt sie. „Etwas anderes. Etwas, das immer gleich bleibt.“`,
    choices: [
      {
        id: 'press_for_number',
        label: '„Welche Zahl?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s04a_comp7_identity'
      },
      {
        id: 'accept_hint',
        label: 'Nicken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c4_s04a_comp7_identity'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat: Zahl als Anker'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_s04a_comp7_identity: Identität
  // ============================================================================
  'c4_s04a_comp7_identity': {
    id: 'c4_s04a_comp7_identity',
    chapter: 4,
    title: 'Anker',
    narrative: `„Ein Anker," sagt Comp7. „Ein Gegenstand, der durch alle Zyklen überlebt hat. Etwas mit einer Nummer.“

Sie greift nach deinem Arm. Ihr Griff ist fest, fast schmerzhaft.

„Der Zug versucht, sich neu zu ordnen. Er wird gleich brechen. Wenn das passiert… such nach der 19.“

„Warum 19?“

„Weil es das Einzige ist, was sich nie ändert.“

Der Boden unter euch sackt plötzlich weg.`,
    choices: [
      {
        id: 'hold_on',
        label: 'Festhalten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s05_reality_fracture'
      }
    ],
    tags: ['setup'],
    state_notes: ['Vorbereitung auf Reality Fracture'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_s05_reality_fracture: Bruch
  // ============================================================================
  'c4_s05_reality_fracture': {
    id: 'c4_s05_reality_fracture',
    chapter: 4,
    title: 'Bruch',
    narrative: `Die Welt zersplittert.

Nicht wie Glas. Wie ein digitales Bild, das einfriert und verzerrt.

Wände werden transparent. Du siehst Gleise, Feuer, Regen, Schnee – alles gleichzeitig.

Der Lärm ist ohrenbetäubend. Tausend Stimmen, die durcheinander reden.

Du fällst. Nicht tief. Nur… aus der Ordnung.

Du landest auf etwas Hartem. Der Boden eines Abteils. Aber es ist verbrannt. Alt.

Zwischen der Asche glänzt etwas.`,
    choices: [
      {
        id: 'search_ashes',
        label: 'In der Asche suchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_s05b_ash_heat'
      },
      {
        id: 'look_for_comp7',
        label: 'Nach Comp7 rufen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c4_s05b_ash_heat'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Reality Fracture Event'],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // c4_s05b_ash_heat: Glut im Schutt (Interlude)
  // ==========================================================================
  'c4_s05b_ash_heat': {
    id: 'c4_s05b_ash_heat',
    chapter: 4,
    title: 'Glut',
    narrative: `Zwischen der Asche glimmt etwas wie ein langsamer Puls.

Die Luft schmeckt nach Eisen. Deine Finger werden warm, obwohl um dich alles kalt ist.`,
    choices: [
      {
        id: 'reach_in',
        label: 'Hineingreifen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_s05a_tag19_found'
      },
      {
        id: 'call_for_comp7',
        label: 'Nochmal nach Comp7 rufen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c4_s05a_tag19_found'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Tag19 Fund'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s05a_tag19_found: Tag 19 Fund (Mid-Story Beat)
  // ============================================================================
  'c4_s05a_tag19_found': {
    id: 'c4_s05a_tag19_found',
    chapter: 4,
    title: 'Fundstück',
    narrative: `Du ziehst es aus dem Schutt.

Ein Schlüsselanhänger. Messing. Schwer.

Die Zahl ist tief eingraviert: **19**.

Als deine Haut das Metall berührt, stoppt der Lärm. Die Welt friert ein.

Eine einzige Erinnerung schießt durch deinen Kopf. Klar. Scharf.

Du hast diesen Anhänger schon einmal gefunden. Und verloren. Und wiedergefunden.

Du bist nicht nur ein Passagier. Du bist Teil des Wracks.

„Tag 19," flüsterst du. Und du weißt, dass es wahr ist.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'memory_search_active', value: true },
        narrative: `Du ziehst es aus dem Schutt.

Ein Schlüsselanhänger. Messing. Schwer.

Die Zahl ist tief eingraviert: **19**.

Als deine Haut das Metall berührt, stoppt der Lärm. Die Welt friert ein.

Ein Bild blitzt auf. Emma. Am Bahnsteig. Sie lächelt. „Fahr vorsichtig," sagt sie. „Komm zurück."

Dann das Datum. 19. September. 1973.

Du hast diesen Anhänger schon einmal gefunden. Und verloren. Und wiedergefunden.

„Tag 19," flüsterst du. Das war... vor dem Unfall.`
      }
    ],
    choices: [
      {
        id: 'take_tag',
        label: 'Den Anhänger nehmen',
        effects: [
          { type: 'set', target: 'has_tag19', value: true },
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'set', target: 'emma_memory_unlocked', value: true }
        ],
        next: 'c4_s06_name_loss'
      }
    ],
    tags: ['reveal', 'secret'],
    state_notes: [
      'KEY ITEM: has_tag19 = true',
      'Mid-Story Point of No Return'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c4_s06_name_loss: Namensverlust
  // ============================================================================
  'c4_s06_name_loss': {
    id: 'c4_s06_name_loss',
    chapter: 4,
    title: 'Der Preis',
    narrative: `Die Realität setzt sich wieder zusammen. Der Zug ist wieder heil. Das Abteil ist sauber.

Du hältst den Anhänger in der Hand.

Aber etwas fehlt.

Du versuchst, deinen Namen zu sagen.

Der erste Buchstabe ist da. Aber der Rest… ist weg.

Wie ausradiert.

Du hast etwas gefunden (die 19). Aber du hast etwas verloren (dich selbst).

Der Zug bremst.`,
    choices: [
      {
        id: 'accept_exchange',
        label: 'Das Tauschgeschäft akzeptieren',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c4_s06b_name_echo'
      },
      {
        id: 'fight_for_name',
        label: 'Versuchen, den Namen zu rufen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c4_s06b_name_echo'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Identitätsverlust als Preis für Wahrheit'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // c4_s06b_name_echo: Nachhall des Namens (Interlude)
  // ==========================================================================
  'c4_s06b_name_echo': {
    id: 'c4_s06b_name_echo',
    chapter: 4,
    title: 'Nachhall',
    narrative: `Du hörst deinen Namen nicht, aber du spürst seine Form – wie eine Narbe ohne Schmerz.

Das Tag19 liegt schwer in deiner Hand. Ein Gewicht, das dich nach vorne zieht.`,
    choices: [
      {
        id: 'hold_tag_tight',
        label: 'Das Tag19 festhalten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c4_end_platform_copies'
      },
      {
        id: 'exhale_name',
        label: 'Den Namen ausatmen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c4_end_platform_copies'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Bahnsteig-Kopien'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_end_platform_copies: Bahnsteig voller Kopien
  // ============================================================================
  'c4_end_platform_copies': {
    id: 'c4_end_platform_copies',
    chapter: 4,
    title: 'Ankunft',
    narrative: `Der Zug hält. Du schaust aus dem Fenster.

Der Bahnsteig ist voll.

Hunderte Menschen stehen dort. Schulter an Schulter.

Sie schauen alle zum Zug.

Du suchst nach einem Gesicht, das du kennst.

Und du findest es.

Sie haben alle dein Gesicht.

Hunderte Versionen von dir. Alte, junge, verletzte, lachende.

Sie warten auf den Zug. Sie warten auf dich.

Die Türen öffnen sich.`,
    choices: [
      {
        id: 'close_eyes',
        label: 'Augen schließen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c4_end_station'
      },
      {
        id: 'look_back',
        label: 'Hinstarren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c4_end_station'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Visueller Höhepunkt Identity Drift'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c4_end_station: Ende Kapitel 4
  // ============================================================================
  'c4_end_station': {
    id: 'c4_end_station',
    chapter: 4,
    title: 'Ende 4',
    narrative: `Eine der Kopien tritt vor. Sie legt die Hand an die Scheibe, genau dort, wo deine ist.

Sie formt ein Wort mit den Lippen: „Bald.“

Dann schlagen die Türen zu. Das Licht flackert aus.

Als es wieder angeht, ist der Bahnsteig leer.

Du bist allein mit der 19 in deiner Hand.

Der nächste Halt wartet schon.`,
    choices: [
      {
        id: 'continue_to_c5',
        label: 'Die 19 betrachten',
        effects: [
          { type: 'set', target: 'chapter_index', value: 5 }
        ],
        next: 'c5_s01_final_preparation'
      }
    ],
    tags: ['station_end'],
    state_notes: ['Übergang zu Kapitel 5'],
    atmosphere: 'dark'
  }
};
