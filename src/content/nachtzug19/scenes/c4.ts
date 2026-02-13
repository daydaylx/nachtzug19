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

Es lächelt. Du nicht.

Ein Tropfen läuft vom Hahn und trifft das Becken mit einem einzelnen, klaren Ton. Im Spiegel siehst du den Tropfen nicht fallen.

Du hältst den Atem an, nur um zu prüfen, ob auch dein Spiegelbild ihn anhält. Es tut es. Zu spät.

Die Neonröhre über dir flackert kurz, und im Flackern wirkt dein Gesicht um Jahre älter, als hätte der Zug eine künftige Version von dir für einen Augenblick eingeblendet.`,
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

Die zweite Version formt lautlos Worte: „Wir sind viele.“

Die Wärme im Glas pulsiert gegen deine Fingerkuppen, fast wie ein zweiter Herzschlag. Nicht synchron zu deinem.

Du versuchst den Blick auf eine einzige Version zu fixieren, aber die Ränder beginnen zu wandern. Für den Bruchteil einer Sekunde siehst du hinter beiden Gesichtern einen dunklen Bahnsteig und eine Uhr, die auf derselben Minute hängen geblieben ist.

Dann glättet sich die Oberfläche wieder. Nur dein Atem geht zu schnell.`,
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

„Wenn du gehst, bleibe ich hier. Wie die anderen Male.“

Für einen Moment bewegt es den Mund noch, nachdem du aufgehört hast zu blinzeln.`,
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
    narrative_variants: [
      {
        min_drift: 4,
        narrative: `Du verlässt den Waschraum. Der Gang — aber welcher Gang? Du erinnerst dich an den Anfang. Der Bahnsteig. Emma. Nein — war es Emma? Der Name verschwimmt. E... Emilia? Nein. Emma. Emma. Du hältst den Namen fest wie einen Rettungsring.

Die Fenster zur Linken sind Spiegel. Aber die Versionen von dir darin stimmen nicht. Eine trägt eine Uniform — die Uniform des Schaffners. Eine hat keine Augen. Eine bewegt den Mund und formt Worte, die du nicht hören kannst, aber du liest von ihren Lippen: „Du warst nicht im Zug. Du warst der Zug."

Als du vorbeigehst, drehen sie sich gleichzeitig nach dir um.

Und zum ersten Mal bist du dir nicht sicher, welche Version real ist.`
      },
      {
        min_drift: 3,
        narrative: `Du reißt den Blick vom Spiegel los und verlässt den Waschraum.

Der Gang vor dir — warst du schon einmal hier? Ja. In Kapitel 2. Nein — Kapitel 1? Der Gang sah anders aus. Oder sah er genau so aus? Die Fenster zur Linken sind Spiegel. In jedem siehst du eine Version von dir.

Aber etwas stimmt nicht. Die Version, die weint — die hat den Kassettenrekorder. Hast du den Rekorder? Du greifst in deine Tasche. Ja. Nein. Du bist dir nicht sicher. Die Erinnerung daran, wie du ihn bekommen hast, ist verschwommen. War es der Junge? Oder hast du ihn gefunden? Lag er auf einem Sitz?

Die Versionen drehen sich gleichzeitig um.`
      }
    ],
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

Sie kommen aus den Spiegeln. Wie Atem auf Glas. Ein Wort wiederholt sich: „Neunzehn."

Die Scheiben beschlagen von innen, obwohl der Gang kalt ist. Für einen Moment zeichnen sich darin Fingerlinien ab, als hätte jemand direkt hinter dem Glas entlanggetastet.

Du gehst schneller, doch das Flüstern passt sich deinem Tempo an. Kein Chor, eher viele Versionen derselben Stimme, jede leicht verschoben.

Als du kurz stehenbleibst, verstummen sie nicht. Sie rücken nur näher.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'memory_drift', operator: '>=', value: 4 },
            { type: 'bool', target: 'has_tag19', value: true }
          ]
        },
        narrative: `Stimmen aus den Spiegeln. Wie Atem auf Glas.

Aber der Schlüsselanhänger in deiner Tasche wird heiß. Tag 19. Er vibriert — und die Stimmen werden klarer. Nicht „Neunzehn". Das hörst du jetzt: „Neun-zehn." Zwei Worte. Neun. Zehn. Wie eine Aufzählung, die noch nicht fertig ist.

Und plötzlich weißt du: die Spiegel lügen. Die Versionen von dir — sie sind nicht du. Sie sind die anderen. Die 19, die im Zug gestorben sind. Und der Anhänger hat dir gezeigt, was wirklich dort ist.

Ohne den Anhänger hättest du das nicht erkannt. Die Drift hätte dich überwältigt.`
      },
      {
        min_drift: 4,
        narrative: `Stimmen. Von überall. Aus den Spiegeln, aus dem Boden, aus deinem eigenen Mund — wartest du? Sprichst du gerade? Du bist dir nicht sicher.

Ein Wort. Oder zwei. Oder keines. „Neunzehn." Oder war es „Neun"? Oder „Zehn"? Oder dein Name? Nein — du erinnerst dich nicht an deinen Namen. Du erinnerst dich an Emma. Emilia. E... Der Name verschwimmt.

Die Stimmen werden lauter. Du gehst schneller. Aber der Gang wird nicht kürzer.`
      }
    ],
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

Die Stimme bricht ab. Dann schreit sie.

Der Schrei hält zu lange an, ohne Luft zu holen, bis er ins Bandrauschen kippt. Darunter hörst du einen zweiten Kanal, fast unhörbar: Türen, die auf- und zuschlagen, immer wieder, immer derselbe Abstand.

Du legst die Hand auf das Gehäuse. Das Metall ist warm, als läge der Rekorder seit Stunden in einer Tasche an einem fremden Körper.

In der Fensterscheibe hinter dem Tisch spiegelt sich dein Rücken. Für einen Moment hebt das Spiegelbild die Hand früher als du.`,
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

Im Spiegel hinter dir erscheint eine Silhouette. Comp7.

Die Bandspule dreht sich aus, Millimeter für Millimeter, bis sie mit einem trockenen Klicken stillsteht. Dieses kleine Geräusch wirkt lauter als der Schrei von eben.

Du wartest auf das übliche Zugrasseln im Hintergrund, aber es kommt nicht sofort. Für einen langen Herzschlag klingt der ganze Wagen wie ein luftdichter Raum.

Erst dann kehrt das tiefe Dröhnen zurück, dumpf und fern, als hätte jemand den Ton aus dem Nebenabteil wieder eingeschaltet.

Die Silhouette im Spiegel bewegt sich nicht synchron mit deinem Atem. Sie kippt den Kopf minimal zur Seite. Du weißt, dass es Comp7 ist, bevor du dich umdrehst.`,
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

Sie beugt sich vor. „Wir müssen etwas finden. Etwas Festes. Sonst löst du dich auf wie die anderen im Spiegel.“

Sie legt zwei Finger auf den Tisch zwischen euch, genau auf eine alte Brandspur im Holz. „Ich hab versucht, mir alles zu merken," sagt sie. „Gesichter. Halte. Reihenfolgen. Es reicht nicht."

Ihre Stimme bricht nicht, aber sie wird leiser. „Der Zug liebt Details. Er tauscht sie gegeneinander aus, bis du nicht mehr sagen kannst, was ursprünglich war."

Dann richtet sie sich wieder auf, als hätte sie einen Schalter umgelegt. „Deshalb brauchen wir einen Anker, keinen Beweis. Etwas, das auch dann noch wahr ist, wenn alles andere kippt."`,
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

„Nicht dein Name hält dich hier,“ sagt sie. „Etwas anderes. Etwas, das immer gleich bleibt.“

Sie zeichnet mit dem Fingernagel eine unsichtbare Linie in das Holz, immer wieder dieselbe Bewegung, bis ein leises Kratzen hörbar wird.

„Namen brechen zuerst," sagt sie. „Dann Gesichter. Dann Gründe. Irgendwann bleiben nur Muster übrig."

Du willst fragen, warum sie das so sicher weiß, aber ihre Augen beantworten es schon: weil sie lange genug hier war, um es mehrfach zu verlieren.

„Wenn du einen festen Punkt hast," fährt sie fort, „kannst du um ihn herum lügen, zweifeln, schreien. Aber du verschwindest nicht vollständig."

Ihre Hand stoppt. „Ohne Punkt bist du nur noch Reaktion."

Sie lehnt sich zurück und schließt kurz die Augen, als würde sie einen Satz auswendig aufsagen. „Ich hab einmal versucht, den Anker zu ignorieren," sagt sie. „Drei Runden später wusste ich nicht mehr, ob ich dich warnen will oder nur meine Notizen wiederholen."

Du hörst den Satz und verstehst: Selbst ihre Klarheit ist geliehen, fragil, immer kurz vor dem Zerfall.

„Frag nicht nur nach der Zahl," sagt sie. „Frag, was sie in dir festhält."`,
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

Zwischen der Asche glänzt etwas.

Der Geruch trifft dich zuerst: nasser Ruß, heißes Öl, ein bitterer Metallton auf der Zunge. Die Luft ist trocken und schneidend, jeder Atemzug kratzt.

Um dich herum stehen Sitzgestelle wie verkohlte Rippen. Auf einem Fensterrahmen klebt geschmolzener Lack in langen Tränen.

Du hörst fernes Rattern, aber es passt nicht zu den Gleisen unter dir. Es klingt, als würden mehrere Fahrten gleichzeitig durch denselben Wagen laufen, übereinander, nicht ganz deckungsgleich.`,
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

Die Luft schmeckt nach Eisen. Deine Finger werden warm, obwohl um dich alles kalt ist.

Du pustest den Staub beiseite. Die Glut darunter ist kein Feuer, eher ein tiefes, rotes Atmen aus dem Schutt.

Jedes Mal, wenn das Glimmen heller wird, flackern um dich herum kurze Bilder auf: ein Bahnsteig im Regen, ein helles Küchenlicht, ein leerer Sitzplatz mit deinem Mantel darüber.

Du kneifst die Augen zusammen, aber die Bilder bleiben für den Bruchteil einer Sekunde hinter den Lidern stehen.

Es fühlt sich an, als hätte der Zug die Erinnerungen nicht gelöscht, sondern unter einer Schicht Asche abgelegt.`,
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

„Tag 19," flüsterst du. Und du weißt, dass es wahr ist.

Das Messing schneidet kalt in deine Handfläche, obwohl es eben noch warm war. Auf der Rückseite sind feine Kratzer, parallel, als hätte jemand mit einem Messer immer wieder dieselbe Stelle bearbeitet.

Mit dem Anhänger im Griff ordnen sich Geräusche im Wagen neu. Das entfernte Dröhnen bekommt Richtung. Das Flackern bekommt Takt. Selbst dein Atem fühlt sich plötzlich in ein Raster gezwungen an.

Es ist kein Trost. Es ist Gewicht. Aber zum ersten Mal seit Langem trägt dieses Gewicht einen Sinn.`,
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

Der Zug bremst.

Du versuchst den Namen ein zweites Mal. Dann ein drittes. Jedes Mal bleibt nur der Anfangslaut, roh und unvollständig, als hätte jemand den Rest aus deinem Hals herausgeschnitten.

Im Fensterglas schreibst du den Buchstaben mit dem Finger in den Beschlag. Nach zwei Sekunden läuft Wasser darüber und zieht ihn wieder aus der Form.

Der Anhänger liegt schwer in deiner Faust. Der Preis ist nicht abstrakt. Er sitzt jetzt in jedem Satz, den du beginnst und nicht beenden kannst.`,
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

Das Tag19 liegt schwer in deiner Hand. Ein Gewicht, das dich nach vorne zieht.

Du fährst mit dem Daumen über die eingravierte Zahl, wieder und wieder, bis die Haut an der Kuppe taub wird. Die Kontur der Neunzehn ist klarer als jeder Buchstabe deines eigenen Namens.

Im Fenster versucht dein Spiegelbild kurz den Mund zu formen. Derselbe Anfangslaut wie eben. Dann verwischt es im Vorbeiziehen der Tunnellichter.

Der Zug nimmt Fahrt auf. Mit jedem Schienenstoß rutscht etwas in dir einen Millimeter weiter, als müsste dein Inneres sich neu einsortieren.

Du beschließt, den Laut nicht mehr zu jagen. Noch nicht. Erst den Halt erreichen. Erst den nächsten festen Punkt.

Das ist kein Aufgeben. Es ist Überleben in einer Sprache, die dir gerade entzogen wird.

In der Fensterscheibe laufen Lichter über dein Gesicht wie fremde Finger. Jeder Lichtstreifen macht dich kurz zu jemand anderem, dann wieder zu dir, dann zu einer dritten Version dazwischen.

Du legst den Anhänger an dein Brustbein, genau dort, wo der Schienenstoß am stärksten nachhallt.

Wenn schon der Name fällt, dann bleibt wenigstens der Takt. Wenigstens diese Zahl. Wenigstens ein Punkt, von dem aus du dich wieder zusammensetzen kannst.`,
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

Die Türen öffnen sich.

Keine der Kopien blinzelt. Einige tragen Verletzungen, die du nicht hast. Andere lächeln mit einer Ruhe, die dir fremd ist. Eine hält etwas in der Hand, das wie dein Rekorder aussieht, aber mit geschmolzenem Gehäuse.

Als die Türdichtung zischend nachgibt, bewegen sie sich nicht auf den Zug zu. Sie kippen nur minimal nach vorn, als würde dieselbe Entscheidung hundertfach in derselben Sekunde vorbereitet.

Du spürst, wie dein Magen hart wird. Nicht aus Schreck allein, sondern aus Wiedererkennen.`,
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
    narrative: `Eine der Kopien tritt vor und legt die Hand an die Scheibe, genau dort, wo deine ist.

Sie formt ein Wort mit den Lippen: „Bald.“

Dann schlagen die Türen zu. Das Licht flackert aus.

Als es zurückkommt, ist der Bahnsteig leer.

Du bist allein mit der 19 in deiner Hand.

Für einen Moment bleibt ein Handabdruck außen auf der Scheibe zurück, zu groß und zu klar für bloßen Beschlag. Dann zerfließt auch er.

Der Wagen setzt sich ruckfrei in Bewegung, als hätte es den Halt nie gegeben. Nur das Ziehen in deinem Arm verrät, wie fest du den Anhänger gehalten hast.

Im Lautsprecher knackt es einmal, ohne Durchsage. Du wartest trotzdem auf Worte.

Es kommen keine. Nur der Schienentakt und das Gefühl, dass etwas im Zug jetzt deinen neuen Namen kennt, auch wenn du ihn nicht mehr sagen kannst.

Du lässt den Blick durch den Wagen gleiten. Sitze, Gepäckablagen, matte Lampen - alles normal. Und darunter ein zweiter Zustand, dünn und gespannt wie Draht.

Du verstehst plötzlich, warum Comp7 schreibt und nicht aufhört: nicht, um zu beweisen, dass etwas passiert ist, sondern um eine Spur zu haben, wenn wieder alles so tut, als wäre nichts gewesen.

Der Zug nimmt eine lange Kurve. Metall singt gegen Metall.

Du schließt die Hand um die 19, bis die Kanten drücken.

Wenn Kapitel 5 beginnt, fragst du nicht mehr, ob die Schleife echt ist. Nur noch, was sie von dir will.

Die Lampen dimmen für einen Herzschlag und springen zurück. Im Scheibenglas siehst du mehrere Schichten deines Spiegelbilds, leicht zeitversetzt.

Du hältst die Hand still auf dem Anhänger und wartest auf den nächsten Schienenstoß.

Er trifft dich wie ein Startsignal.

Vor dem dunklen Fenster nickst du dir kaum merklich zu.

Der Zug antwortet mit einem langen, tiefen Knurren aus dem Unterboden.`,
    choices: [
      {
        id: 'continue_to_c5',
        label: 'Die 19 betrachten',
        effects: [
          { type: 'set', target: 'chapter_index', value: 5 }
        ],
        next: 'c4_end_station_sideword'
      }
    ],
    tags: ['station_end'],
    state_notes: ['Übergang zu Kapitel 5'],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c4_end_station_sideword: Kleiner Neben-Dialog ohne globales Gewicht
  // ============================================================================
  'c4_end_station_sideword': {
    id: 'c4_end_station_sideword',
    chapter: 4,
    title: 'Ein kurzer Blick',
    narrative: `Comp7 steht plötzlich neben dir, den Stift noch in der Hand.

Sie schreibt nicht, sie wartet nur.

„Nur ein Satz," sagt sie. „Was bleibt dir von diesem Halt zuerst hängen?"`,
    choices: [
      {
        id: 'sideword_copies',
        label: '„Dass sie alle gewartet haben."',
        next: 'c4_end_station_sideword_copies'
      },
      {
        id: 'sideword_refuse',
        label: '„Ich will darüber nicht reden."',
        next: 'c4_end_station_sideword_refuse'
      },
      {
        id: 'sideword_tag19',
        label: '„Nur die 19 bleibt."',
        next: 'c4_end_station_sideword_tag19'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog: Atmosphäre und Ton',
      'Alle Antworten führen ohne Systemwirkung zu Kapitel 5'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_end_station_sideword_copies: Reaktion 1
  // ============================================================================
  'c4_end_station_sideword_copies': {
    id: 'c4_end_station_sideword_copies',
    chapter: 4,
    title: 'Sie warten',
    narrative: `Comp7 nickt knapp. „Dann weißt du wenigstens, dass du gesehen wurdest."

Sie notiert nichts, als müsste dieser Satz ungeschrieben bleiben.`,
    choices: [
      {
        id: 'continue_from_c4_sideword_copies',
        label: 'Weiter',
        next: 'c5_s01_final_preparation'
      }
    ],
    tags: ['interlude'],
    state_notes: ['Neben-Dialog-Reaktion ohne Systemwirkung'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_end_station_sideword_refuse: Reaktion 2
  // ============================================================================
  'c4_end_station_sideword_refuse': {
    id: 'c4_end_station_sideword_refuse',
    chapter: 4,
    title: 'Nicht jetzt',
    narrative: `„Okay," sagt sie. „Dann schreiben wir es später. Aber wir schreiben es."

Sie klappt das Notizbuch nicht auf, aber ihr Daumen bleibt auf der Kante liegen.`,
    choices: [
      {
        id: 'continue_from_c4_sideword_refuse',
        label: 'Weiter',
        next: 'c5_s01_final_preparation'
      }
    ],
    tags: ['interlude'],
    state_notes: ['Neben-Dialog-Reaktion ohne Systemwirkung'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c4_end_station_sideword_tag19: Reaktion 3
  // ============================================================================
  'c4_end_station_sideword_tag19': {
    id: 'c4_end_station_sideword_tag19',
    chapter: 4,
    title: 'Nur die Zahl',
    narrative: `Comp7 betrachtet den Anhänger kurz. „Manchmal reicht eine Zahl als Geländer."

Der Metallrand drückt in deine Haut, und der Schmerz wirkt für einen Moment ordentlich.`,
    choices: [
      {
        id: 'continue_from_c4_sideword_tag19',
        label: 'Weiter',
        next: 'c5_s01_final_preparation'
      }
    ],
    tags: ['interlude'],
    state_notes: ['Neben-Dialog-Reaktion ohne Systemwirkung'],
    atmosphere: 'somber'
  }
};
