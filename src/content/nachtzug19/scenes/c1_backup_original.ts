// ============================================================================
// NACHTZUG 19 - Kapitel 1: Leerer Bahnsteig (REDUZED / P1 FIX)
// ============================================================================
// Szenen (20):
// Setup: c1_s01_platform, c1_s01_platform_b, c1_s01a_platform_details
// Train: c1_s02_train_appears, c1_s02a_train_exterior, c1_s02b_threshold
// Inside: c1_s03_inside_train, c1_s03a_find_seat, c1_s03b_window_vibration
// Sleepless: c1_s04_sleepless_intro, c1_s04a_sleepless_past, c1_s04b_corridor_breath
// Anomaly: c1_s05_first_anomaly, c1_s05a_other_passengers, c1_s05a2_passenger_rhythm, c1_s05b_compartment7_tease, c1_s05c_comp7_listen, c1_s05d_comp7_exchange
// End: c1_end_station, c1_end_station_sideword
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
    narrative: `Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer. Eine Leere, die sich anfühlt wie ein vergessenes Wort auf der Zungenspitze.

An der Wand klebt ein einzelnes Plakat. Verblasst. Orange Schrift auf braunem Grund – diese aggressive Typografie aus den Siebzigern, die schmerzt, wenn man zu lange hinschaut. „REISEN SIE MIT UNS", steht da in versetzten Großbuchstaben. Keine Webseite. Keine QR-Codes. Nur eine Telefonnummer mit zu wenigen Ziffern. Das Papier ist an den Ecken eingerissen, als hätte jemand versucht, es abzureißen, und aufgegeben.

Keine Bänke. Keine Automaten. Keine Hinweisschilder. Nur nackte Wände aus Beton, fleckig von Feuchtigkeit und… Nikotin? Die Wände sind gelb verfärbt, als hätten hier jahrzehntelang Menschen geraucht, obwohl die Luft kalt und steril ist. Eine Neonröhre flackert über dir mit einem leisen, nagenden Surren. Das Licht ist kalt, blaugrün, wirft harte Schatten auf den Boden. Deine Schatten sind zwei, drei – zu viele für eine Lichtquelle.

Die Anzeigetafel – ein mechanisches Klappmodell aus einer Zeit vor LED-Displays – zeigt: 23:47. Die Ziffern sind groß, altmodisch, haben Serifen.

Kein Text. Kein „Nächster Zug". Kein „Verspätung". Nur leere Fächer, die im Takt klacken, ohne etwas anzuzeigen. Klack. Klack. Klack. Ein Rhythmus wie ein langsamer Herzschlag.

Du weißt nicht mehr, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt. Warst du verabredet? Solltest du jemanden treffen? Der Gedanke zerrinnt, bevor du ihn fassen kannst.`,
    choices: [
      {
        id: 'look_around',
        label: 'Den Bahnsteig systematisch abtasten',
        effects: [
          { type: 'set', target: 'stance_bold', value: true }
        ],
        next: 'c1_s01_platform_b'
      },
      {
        id: 'wait_patiently',
        label: 'Still bleiben und auf ein Zeichen warten',
        effects: [
          { type: 'set', target: 'stance_cautious', value: true }
        ],
        next: 'c1_s01_platform_b'
      },
      {
        id: 'count_clacks',
        label: 'Den Takt der Anzeigetafel mitzählen',
        effects: [
          { type: 'set', target: 'stance_cautious', value: true },
          { type: 'inc', target: 'tickets_truth', value: 1 }
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
    narrative: `Aber du weißt: Du wartest auf etwas. Oder jemanden. Die Gewissheit sitzt in deinem Brustkorb wie ein Stein.

Die Luft riecht nach kaltem Zigarettenrauch und Maschinenöl. Nicht nach frischem Rauch – nach altem. Nach Jahrzehnten. Als hätte jemand die Luft eingefroren, als hier noch geraucht werden durfte, und sie nie wieder aufgetaut. Der Geruch ist so dicht, dass du ihn auf der Zunge schmeckst. Bitter. Metallisch.

Am Rand – auf einer Bank, die du vorhin nicht gesehen hast, schwörst du es – sitzt eine Gestalt. Sie liest eine Zeitung. Die Seiten rascheln nicht. Sie hält sie vollkommen still. Du siehst die Schlagzeile, aber das Datum ist verwischt, verschmiert, als hätte jemand darüber gewischt, bevor die Tinte trocken war. „ÖLKRISE VERSCHÄRFT SICH", steht da in dieser altmodischen Frakturschrift, die an Grabsteine erinnert. Die Gestalt blättert nicht um. Nicht einmal, als der Wind durch den Bahnsteig fegt.

Welcher Wind? Es gibt keine Fenster hier.

Ein Name brennt sich in deine Gedanken. Emma. Nicht wie eine Erinnerung – wie eine Narbe. Ein Gesicht, das du fast sehen kannst. Braune Augen. Sommersprossen auf der Nase. Ein Lächeln, das du nie vergessen wolltest. Aber die Details verschwimmen, je mehr du versuchst, das Bild festzuhalten.

Wo ist Emma? Warum ist Emma nicht hier? Oder… war Emma hier? Warst du zu spät?`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'stance_bold', value: true },
        narrative: `Du hast dich umgesehen. Bewusst. Jedes Detail aufgesogen.

Und jetzt siehst du mehr: Am Rand — auf einer Bank, die du vorhin nicht gesehen hast — sitzt eine Gestalt. Sie liest eine Zeitung. Die Seiten rascheln nicht. „ÖLKRISE VERSCHÄRFT SICH", steht da in altmodischer Frakturschrift. Die Gestalt blättert nicht um.

Du hast nach Antworten gesucht. Die Antwort, die du findest, ist ein Name. Emma. Er brennt sich in deine Gedanken. Nicht wie eine Erinnerung — wie eine Narbe. Ein Gesicht, das du fast sehen kannst. Braune Augen. Sommersprossen.

Wo ist Emma? Du hast das Gefühl, dass das Umschauen dir geholfen hat — aber die wichtigste Frage bleibt offen.`
      },
      {
        condition: { type: 'bool', target: 'stance_cautious', value: true },
        narrative: `Du hast gewartet. Stillgestanden. Die Leere an dir vorbeiziehen lassen.

Und sie hat geantwortet: Am Rand — auf einer Bank, die vorher nicht da war, du schwörst es — sitzt eine Gestalt. Sie liest eine Zeitung. Die Seiten rascheln nicht. „ÖLKRISE VERSCHÄRFT SICH", steht da. Die Gestalt blättert nicht um. Nicht einmal, als der Wind durch den Bahnsteig fegt.

Welcher Wind? Es gibt keine Fenster hier.

Ein Name taucht auf, ungefiltert, wie etwas, das du unterdrückt hast. Emma. Ein Gesicht, das du fast sehen kannst. Braune Augen. Sommersprossen auf der Nase. Aber je länger du wartest, desto mehr verschwimmt es.`
      },
      {
        min_drift: 5,
        narrative: `Die Luft riecht nach kaltem Zigarettenrauch. Die Gestalt mit der Zeitung sitzt näher. Die Schlagzeile: „ENERGIEKRISE—". Der Rest ist verwischt. Die Gestalt blättert nicht um. Emma. Der Name brennt in deinem Kopf. Du musst Emma finden.`
      }
    ],
    choices: [
      {
        id: 'search_person',
        label: 'Den aufsteigenden Namen laut machen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'set', target: 'memory_search_active', value: true }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'check_phone',
        label: 'Im Handy nach einem Anker suchen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s01a_platform_details'
      },
      {
        id: 'try_leave',
        label: 'Zum Ausgang gehen und testen, ob du wegkommst',
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
    narrative: `Du reißt dich von der Frage los und setzt dich in Bewegung. Der Beton unter deinen Sohlen klingt hohl. Am Rand des Bahnsteigs: Eine gelbe Linie, abgeblättert. Dahinter die Schienen. Schwarz. Matt. Als wären sie aus etwas anderem als Metall gemacht.

Der Name Emma sitzt dir noch im Hals, als hättest du ihn gerade laut gesagt.

Du greifst in deine Tasche. Da ist… etwas. Ein Gerät.

Ein rechteckiges Ding aus Plastik und Glas. Schwer. Der Bildschirm ist schwarz. Du drückst darauf, und für einen Moment flackert das Display auf – nicht mit Icons oder Apps, sondern mit statischem Rauschen, wie bei einem alten Fernseher.

Dann wird es wieder schwarz.

Plötzlich flackert die Neonröhre über dir schneller. Ein, aus, ein, aus. Dein Schatten auf dem Boden streckt sich, wird unnatürlich lang. Ein tiefes Brummen erfüllt die Luft, vibriert in deinem Brustkorb.`,
    choices: [
      {
        id: 'step_back',
        label: 'Abstand nehmen und die Lage lesen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'examine_tracks',
        label: 'An der Kante nach Spuren suchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02_train_appears'
      },
      {
        id: 'hold_device',
        label: 'Den Namen festhalten und das Gerät umklammern',
        condition: {
          type: 'bool',
          target: 'memory_search_active',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
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
    narrative: `Das Brummen wird lauter. Tiefer. Ein Beben, das du nicht hörst, sondern spürst – in den Knochen, in den Zähnen. Dann gleitet der Zug in den Bahnhof. Lautlos. Keine quietschenden Bremsen. Kein Rattern. Nur das Brummen, das langsam verstummt.

Er sieht aus wie ein alter Nachtzug. Achtziger Jahre. Vielleicht noch früher. Abblätternde dunkelrote Farbe, stellenweise schwarz verfärbt – oder ist es Ruß? Fenster zu schmal, die Rahmen vergilbt wie alte Zähne. Die Wagen sind lang. Zu lang. Du zählst: Fünf. Sechs. Sieben. Acht. Sie verschwimmen am Ende in der Dunkelheit.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen. Niemand bewegt sich. Niemand schaut auf. Niemand schaut hinaus. Als wären sie eingefroren. Oder gemalt. Flache Figuren auf Glas.

Die Türen öffnen sich mit einem Zischen. Nicht mechanisch. Organisch. Wie ein Ausatmen. Warme Luft strömt heraus – zu warm für einen Nachtzug, zu feucht. Riecht nach altem Polster und etwas Süßlichem. Verbrannter Zucker? Oder... verbranntes Plastik? Nein. Etwas anderes. Etwas, das du nicht benennen kannst.

Die Stufen glänzen feucht, schwarz wie nasses Holz. Ein dünner Nebel hängt in der Tür, rollt sich über die Kante, kriecht auf den Bahnsteig. Niemand steigt aus. Niemand ruft. Nur die offene Tür. Wartend.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'memory_search_active', value: true },
            { type: 'compare', target: 'tickets_love', operator: '>=', value: 2 }
          ]
        },
        narrative: `Das Brummen wird lauter. Tiefer. Ein Beben in den Knochen, in den Zähnen. Dann gleitet der Zug in den Bahnhof. Lautlos.

Du umklammerst das Gerät so fest, dass die Kanten in die Hand schneiden. Das Display bleibt schwarz — aber es pulsiert warm gegen deine Haut, als hätte es einen eigenen Herzschlag.

Der Zug sieht aus wie ein alter Nachtzug. Achtziger Jahre. Abblätternde dunkelrote Farbe. Die Wagen verschwimmen am Ende in der Dunkelheit. Durch die Scheiben siehst du Silhouetten — und für einen Moment, nur einen Moment, glaubst du, eine davon zu erkennen. Das Gesicht. Die Sommersprossen.

Emma?

Die Türen öffnen sich. Warme Luft strömt heraus. Das Gerät vibriert einmal kurz, wie eine knappe Antwort.`
      },
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'memory_search_active', value: false },
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 2 }
          ]
        },
        narrative: `Das Brummen wird lauter. Tiefer. Der Zug gleitet in den Bahnhof. Lautlos.

Du stehst noch nah an der Kante und suchst die Schienen nach Spuren ab. Für einen Wimpernschlag siehst du winzige Funken, die nicht nach außen springen, sondern nach innen gezogen werden — zurück unter den Zug.

Der Waggon wirkt alt, dunkelrot, an den Kanten schwarz. Hinter den Fenstern sitzen starre Silhouetten.

Als die Türen aufgehen, schlägt dir warme Luft entgegen. Auf den nassen Stufen liegt ein dünner Film, in dem sich das Neonlicht bricht wie Öl auf Wasser.`
      },
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'memory_search_active', value: false },
            { type: 'compare', target: 'tickets_escape', operator: '>=', value: 2 }
          ]
        },
        narrative: `Das Brummen schwillt an und du bleibst bewusst einen Schritt zurück.

Der Zug läuft lautlos ein, als würde er nicht bremsen, sondern nur auftauchen. Dunkelrot. Zu lang. Hinter den Scheiben sitzen reglose Menschen, flach wie ausgeschnittene Figuren.

Die Türen öffnen sich mit einem langen Ausatmen. Warme, süßliche Luft rollt über den Bahnsteig.

Du merkst, dass Abstand hier nichts erklärt. Er verschafft dir nur einen Moment mehr, bevor du dich entscheiden musst.`
      },
      {
        condition: { type: 'bool', target: 'memory_search_active', value: true },
        narrative: `Das Brummen wird lauter. Tiefer. Ein Beben in den Knochen, in den Zähnen. Dann gleitet der Zug in den Bahnhof. Lautlos.

Du umklammerst das Gerät. Das Display bleibt schwarz — aber es ist warm. Wärmer, als es sein sollte. Als hätte jemand es gerade erst benutzt.

Der Zug sieht aus wie ein alter Nachtzug. Achtziger Jahre. Abblätternde dunkelrote Farbe. Die Wagen verschwimmen am Ende in der Dunkelheit. Durch die Scheiben siehst du Silhouetten — und für einen Moment, nur einen Moment, glaubst du, eine davon zu erkennen. Das Gesicht. Die Sommersprossen.

Emma?

Die Türen öffnen sich. Warme Luft strömt heraus. Das Gerät vibriert kurz in deiner Hand. Einmal. Als hätte es eine Nachricht empfangen.`
      },
      {
        min_drift: 5,
        narrative: `Das Brummen wird lauter. Der Zug gleitet herein. Lautlos. Dunkelrot, fast schwarz. Die Wagen sind endlos. Durch die Scheiben: Eingefrorene Silhouetten. Warme, süßliche Luft strömt heraus. Die Stufen glänzen schwarz. Niemand steigt aus.`
      }
    ],
    choices: [
      {
        id: 'board_immediately',
        label: 'Keine Sekunde verlieren und einsteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'inspect_train',
        label: 'Noch einen letzten prüfenden Blick riskieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02a_train_exterior'
      },
      {
        id: 'call_out',
        label: 'In die Fenster hineinrufen',
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

Hinter dir: Das Brummen wird leiser. Der Zug wird gleich weiterfahren. Du weißt es.

Ein Windstoß trägt kalten Metallgeruch über den Bahnsteig. Für eine Sekunde hörst du aus dem Wageninneren ein leises Klirren, als hätten sich Gläser berührt, obwohl niemand sich bewegt.

Über der Tür hängt eine Lampe, die nicht flackert, sondern pulsiert. Sehr langsam. Wie ein ruhiger Herzschlag, der nicht zu dir gehört.

Du merkst, dass dein Zögern nicht aus Unsicherheit kommt, sondern aus einem seltsamen Wiedererkennen: als hättest du genau diese Schwelle schon einmal gespürt und damals zu spät reagiert.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'conductor_attention', operator: '>=', value: 1 },
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 3 }
          ]
        },
        narrative: `Du stehst vor der offenen Tür.

Dein Ruf von eben hängt noch in der Luft, dünn und peinlich klar. Niemand antwortet.

Am Wagenblech, knapp unterhalb des Fensters, findest du feine Schrammen, die aussehen wie eingeritzte Striche. Keine Buchstaben. Eher Zählspuren.

Durch das nächste Fenster siehst du die Frau mit den gefalteten Händen. Als du länger hinsiehst, bist du nicht mehr sicher, ob sie atmet.

Der Zug wird gleich weiterfahren. Du weißt es, weil dir der Moment nicht gehört - nur die Entscheidung davor.`
      },
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'tickets_escape', operator: '>=', value: 3 },
            { type: 'bool', target: 'memory_search_active', value: false }
          ]
        },
        narrative: `Du bleibst vor der offenen Tür stehen und merkst, dass dein Körper schon zurückweicht, bevor du bewusst darüber nachdenkst.

Der Wagen sieht aus wie ein Nachtzug aus einer Zeit, in die du nicht zurückwillst: dunkelrot, zu lang, zu still.

Durch das Fenster schaut niemand zurück. Das macht es schlimmer.

Ein Windstoß trägt kalten Metallgeruch über den Bahnsteig. Du weißt, dass Weggehen hier nicht dasselbe ist wie Entkommen.`
      }
    ],
    choices: [
      {
        id: 'board_now',
        label: 'Einsteigen, bevor die Chance wieder verschwindet',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s02b_threshold'
      },
      {
        id: 'touch_exterior',
        label: 'Mit der Hand prüfen, ob das hier wirklich ist',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s02b_threshold'
      },
      {
        id: 'ask_aloud',
        label: 'Die Stille noch einmal herausfordern',
        condition: {
           type: 'compare',
           target: 'conductor_attention',
           operator: '<',
           value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s02b_threshold'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Shortened narrative',
      'Direct link to c1_s03_inside_train'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // c1_s02b_threshold: Schwelle zum Zug (Interlude)
  // ==========================================================================
  'c1_s02b_threshold': {
    id: 'c1_s02b_threshold',
    chapter: 1,
    title: 'Schwelle',
    narrative: `Du stellst einen Fuß auf die Stufe.

Das Metall ist feucht, fast glitschig. Nicht nass – aber auch nicht trocken. Eine Feuchtigkeit, die sich anfühlt wie kalter Schweiß. Ein kurzer Geruch von warmem Staub schlägt dir entgegen, süßlich und alt, als würde der Zug ausatmen – einen langsamen, tiefen Atemzug aus seiner Tiefe.

Hinter dir klackt die Anzeigetafel einmal, laut und final. Du drehst dich um. Die Ziffern haben gewechselt. 23:48. Eine Minute ist vergangen. Oder sind es zwei? Warst du länger auf dem Bahnsteig, als du dachtest?

Der Nebel kriecht näher. Die Gestalt mit der Zeitung ist verschwunden. War sie jemals da?`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'memory_search_active', value: true },
        narrative: `Du stellst einen Fuß auf die Stufe.

Das Metall ist feucht, fast glitschig. Nicht nass – aber auch nicht trocken.

In dem Moment, in dem dein Gewicht auf der Kante liegt, sagst du den Namen in dir noch einmal stumm mit: Emma.

Hinter dir klackt die Anzeigetafel einmal, laut und final. 23:48.

Der Nebel kriecht näher. Die Gestalt mit der Zeitung ist verschwunden. War sie jemals da?`
      }
    ],
    choices: [
      {
        id: 'step_in',
        label: 'Die Schwelle bewusst überschreiten',
        effects: [
          { type: 'set', target: 'stance_bold', value: true }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'hesitate_step',
        label: 'Noch einmal zurückblicken, dann einsteigen',
        effects: [
          { type: 'set', target: 'stance_cautious', value: true }
        ],
        next: 'c1_s03_inside_train'
      },
      {
        id: 'name_before_step',
        label: 'Leise „Emma" sagen und dann einsteigen',
        condition: {
          type: 'bool',
          target: 'memory_search_active',
          value: true
        },
        effects: [
          { type: 'set', target: 'stance_bold', value: true },
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s03_inside_train'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Interlude: Schwelle zum Zug'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s03_inside_train: Im Zug (Merged Silence)
  // ============================================================================
  'c1_s03_inside_train': {
    id: 'c1_s03_inside_train',
    chapter: 1,
    title: 'Innen',
    narrative: `Du antwortest dir nicht, sondern steigst ein. Die Tür schließt sich mit einem finalen Klack.

Stille. Eine zu saubere Stille, als hätte jemand den Ton abgedreht. Der Druck auf deinen Ohren wächst, wie unter Wasser.

Der Wagen ist ein Gang mit Abteilen. Orange-braune Polstersitze, abgenutzt, Siebziger-Jahre-Muster. Messinglampen flackern. Es riecht nach altem Rauch und Pfeifentabak.

Der Zug setzt sich in Bewegung – sanft, schwebend. Kein Ruck.

Der Name, der seit dem Bahnsteig in dir kreist, drängt sich wieder nach vorn: Emma.

Emma hätte diesen Zug gehasst. Zu alt. Zu kalt. Zu falsch. Und genau deshalb trifft dich die Leere neben dir wie ein Beweis: Sie ist nicht hier. Noch nicht.

Zur Linken: Ein Mann, mittleren Alters, der aus dem Fenster starrt. Seine Augen sind rot umrandet. Er trägt einen braunen Anzug, der aus der Zeit gefallen wirkt.

Zur Rechten: Ein leeres Abteil.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'stance_bold', value: true },
            { type: 'bool', target: 'memory_search_active', value: true }
          ]
        },
        narrative: `Du steigst ein, ohne noch einmal auf den Bahnsteig zurückzusehen. Die Tür fällt hinter dir mit einem harten Klack ins Schloss.

Stille. Zu sauber. Der Druck auf den Ohren wächst.

Der Wagen ist ein Gang mit Abteilen, orange-braune Sitze, flackernde Messinglampen.

Der Name Emma sitzt nicht mehr nur im Kopf. Er gibt Richtung.

Zur Linken der Mann mit den roten Augen. Zur Rechten ein leeres Abteil.

Du merkst, dass „vorwärts" hier vielleicht nur ein anderes Wort für „tiefer hinein" ist.`
      },
      {
        condition: { type: 'bool', target: 'stance_cautious', value: true },
        narrative: `Du steigst ein, aber erst nachdem du den Blick nach draußen erzwungen hast.

Die Tür schließt sich mit einem finalen Klack. Zu spät für Zweifel.

Stille. Zu sauber. Unter Wasser in einem fahrenden Raum.

Der Wagen riecht nach altem Rauch und Pfeifentabak. Alles wirkt vorbereitet, als hättest nicht du den Schritt gemacht, sondern der Zug für dich.

Der Name Emma bleibt da, aber er wirkt fragiler als auf dem Bahnsteig.

Zur Linken sitzt ein Mann und starrt aus dem Fenster. Zur Rechten wartet ein leeres Abteil.`
      }
    ],
    choices: [
      {
        id: 'talk_to_man',
        label: 'Das Schweigen brechen und den Mann ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'find_seat',
        label: 'Erst Distanz schaffen und den Wagen lesen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s03a_find_seat'
      },
      {
        id: 'test_silence',
        label: 'Den Zug testen: ein Wort ins Nichts flüstern',
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

Dann, eine Stimme hinter dir: „Du auch?"

Die Stimme kommt dir seltsam vertraut vor.

Du drehst dich noch nicht um. Stattdessen hörst du auf die Art, wie die Worte fallen: nicht neugierig, nicht freundlich, eher erschöpft solidarisch.

Unter dem Sitz vibriert es kurz, als würde der Zug über eine Weiche fahren, aber draußen bleibt die Dunkelheit unverändert. Keine Kurve, kein Lichtwechsel, nur dieser kurze Schock im Körper.

Du legst die Finger an die Fensterkante und spürst eine feine Feuchtigkeit, die dort nicht sein dürfte. Wie Kondenswasser von innen.`,
    choices: [
      {
        id: 'turn_around',
        label: 'Dich der Stimme stellen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03b_window_vibration'
      },
      {
        id: 'ignore_voice',
        label: 'So tun, als hättest du nichts gehört',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s03b_window_vibration'
      },
      {
        id: 'stay_with_window',
        label: 'Im Spiegelbild nach einem Hinweis suchen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s03b_window_vibration'
      }
    ],
    tags: [],
    state_notes: [
      'Shortened path'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // c1_s03b_window_vibration: Fensterpuls (Interlude)
  // ==========================================================================
  'c1_s03b_window_vibration': {
    id: 'c1_s03b_window_vibration',
    chapter: 1,
    title: 'Fensterpuls',
    narrative: `Noch bevor du auf die Stimme reagieren kannst, vibriert das Glas. Ein Puls fährt durch deine Schläfe, schmerzhaft und präzise.

Für einen Augenblick siehst du nicht die Dunkelheit draußen, sondern Bahnsteige, die sich überlagern – wie Doppelbelichtungen, wie Bilder, die nicht richtig übereinanderliegen. Drei, vier, fünf Bahnsteige gleichzeitig, alle leer.

Dann ist alles wieder still. Dein Herzschlag zu laut.`,
    choices: [
      {
        id: 'call_back',
        label: 'Den Satz aufnehmen: „Du auch was?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      },
      {
        id: 'steady_self',
        label: 'Atem zählen, dann kontrolliert antworten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s04_sleepless_intro'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat zwischen Sitzplatz und Gespräch'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c1_s04_sleepless_intro: Der Schlaflose
  // ============================================================================
  'c1_s04_sleepless_intro': {
    id: 'c1_s04_sleepless_intro',
    chapter: 1,
    title: 'Der Schlaflose',
    narrative: `Der Mann lehnt im Gang. Nicht lehnt — hängt. Als hätte jemand ihn dort abgestellt und vergessen, ihn wieder mitzunehmen. Seine Augen sind rot umrandet. Die Haut darunter violett. Er sieht aus wie jemand, der das Schlafen verlernt hat und seitdem alles andere auch.

Es ist die Stimme von eben.

„Du auch?" Rau. Brüchig. Wie jemand, der so lange nicht gesprochen hat, dass seine Stimme Staub ansetzt.

„Auch was?"

„Kein Ticket. Keine Erinnerung. Keine Ahnung, wie lange schon." Er wischt sich über die Augen, eine Bewegung, die er schon tausendmal gemacht hat. „Der lustige Teil ist, ich weiß auch nicht mehr, ob das der lustige Teil ist. Vielleicht war der lustige Teil gestern. Oder... letztes Jahr. Keine Ahnung." Er lacht. Ein trockenes, kaputtes Geräusch. „Wann war das letzte Mal, dass du geschlafen hast? Nein, sag's nicht. Du weißt es nicht. Willkommen im Club."

Du greifst in deine Tasche. Leer. Kein Ticket. Kein Ausweis.

„Wo sind wir?"

„Unterwegs." Er sagt es, wie man sagt: das Wetter ist schlecht. Eine Tatsache, die niemanden mehr aufregt. „Immer unterwegs. Von Station zu Station. Niemand steigt aus. Niemand kommt an. Ich hab aufgehört zu zählen. Dann hab ich wieder angefangen. Dann hab ich die Zählung verloren. Dann..." Er bricht ab. Starrt an die Wand.

„Wie lange fährst du schon mit?"

Du öffnest den Mund. Keine Antwort.`,
    choices: [
      {
        id: 'ask_where',
        label: 'Eine klare Regel verlangen: „Wohin fährt dieser Zug wirklich?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'ask_how_long',
        label: 'Ihn führen lassen: „Erzähl den ersten Tag, den du noch weißt."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      },
      {
        id: 'deny',
        label: 'Gegenhalten: „Das ist Panik, nicht Wahrheit."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04a_sleepless_past'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Schlafloser-Dialog vertieft Zugregeln',
      'Beziehungsaufbau vor Compartment-7-Beat'
    ],
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

Ein Gesicht blitzt auf: braune Augen, Sommersprossen, dann Rauschen.

„Die meisten von uns suchen jemanden. Oder sie laufen weg. Manchmal beides."

Er beugt sich vor, senkt die Stimme. „Hör zu. Wenn der Schaffner kommt… Sag nicht dein Ziel. Er fragt nach dem Warum, nicht nach dem Wo. Verstanden?"`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'rel_sleepless', operator: '>=', value: 2 },
            { type: 'bool', target: 'memory_search_active', value: true }
          ]
        },
        narrative: `„Es war Nacht, als ich eingestiegen bin. Es ist immer noch Nacht." Er zeigt auf seine Uhr. Das Zifferblatt ist leer.

Er mustert dich länger, diesmal ohne Spott. „Du suchst wirklich jemanden, oder?"

Ein Gesicht blitzt auf: braune Augen, Sommersprossen, dann Rauschen.

„Wenn du hier einen Namen behältst, behältst du vielleicht auch den Rest," sagt er leise. „Aber der Schaffner merkt so was."

Er beugt sich vor. „Sag ihm nicht dein Ziel. Er fragt nach dem Warum, nicht nach dem Wo."`
      },
      {
        condition: { type: 'compare', target: 'rel_sleepless', operator: '<=', value: 0 },
        narrative: `„Es war Nacht, als ich eingestiegen bin. Es ist immer noch Nacht." Er zeigt auf seine Uhr. Das Zifferblatt ist leer.

Er wirkt verschlossener als eben, als hätte dein letzter Satz eine Tür zwischen euch zugeschoben.

„Die meisten suchen jemanden. Oder laufen weg. Manche tun beides und nennen es später Schicksal."

Er sieht an dir vorbei in den Gang. „Wenn der Schaffner kommt, sag nicht dein Ziel. Er fragt nach dem Warum, nicht nach dem Wo."`
      }
    ],
    choices: [
      {
        id: 'admit_searching',
        label: '„Ich suche Emma."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c1_s04b_corridor_breath'
      },
      {
        id: 'admit_running',
        label: '„Ich laufe vor etwas weg."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s04b_corridor_breath'
      },
      {
        id: 'ask_about_conductor',
        label: 'Nach dem Risiko beim Schaffner fragen',
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
        next: 'c1_s04b_corridor_breath'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Merged with warning about conductor',
      'Shortened path'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // c1_s04b_corridor_breath: Gang-Atem (Interlude)
  // ==========================================================================
  'c1_s04b_corridor_breath': {
    id: 'c1_s04b_corridor_breath',
    chapter: 1,
    title: 'Der Atem des Zuges',
    narrative: `Ohne dass ihr es merkt, steht ihr schon im Gang. Einen Moment lang scheint der Zug den Atem anzuhalten.

Dann ein leises Ausströmen, wie ein Ventil. Die Lampen flackern, und im Glas der Tür siehst du dein Gesicht für einen Wimpernschlag älter.

Der Schlaflose tippt mit dem Finger gegen die Wand. „Hörst du das?"

Du legst ebenfalls die Hand an das Metall. Unter der kalten Oberfläche arbeitet ein tiefer Ton, fast zu niedrig, um ihn wirklich zu hören, eher ein Druck hinter den Zähnen.

Für einen Augenblick seid ihr beide still und dieselbe Stille fühlt sich bei ihm routiniert an, bei dir neu und bedrohlich.

Er zieht die Hand zurück, als hätte er sich verbrannt, obwohl das Metall kalt ist. „So fängt es an," murmelt er.

Dann schaut er dich direkt an. „Wenn du am Halt nicht leer sein willst, entscheide jetzt: verstehen oder stabil bleiben."`,
    choices: [
      {
        id: 'listen_closer',
        label: 'Ihn bitten, den ersten Halt Schritt für Schritt zu erklären',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      },
      {
        id: 'avoid_topic',
        label: 'Ihn bitten, dich bis zum Halt nur zu erden',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05_first_anomaly'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor der Durchsage'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s05_first_anomaly: Erste Anomalie (Merged Announcement)
  // ============================================================================
  'c1_s05_first_anomaly': {
    id: 'c1_s05_first_anomaly',
    chapter: 1,
    title: 'Durchsage',
    narrative: `Eine Lautsprecherdurchsage knistert durch den Wagen. Nicht aus den Lautsprechern – aus den Wänden selbst. Überall gleichzeitig.

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause. Zu lang. Unnatürlich. Als hätte der Sprecher vergessen, was er sagen wollte.

„—[unverständlich]. Bitte achten Sie auf Ihre persönlichen Gegenstände."

Die Stimme ist glatt, emotionslos. Eine Stimme aus einer anderen Zeit. Du versuchst, dich zu konzentrieren, aber das, was zwischen den Worten war, ist schon verblasst. Ein Loch im Satz. Eine Lücke, wo ein Name sein sollte.

Der Schlaflose zuckt nicht mal. Er starrt nur an die Decke. „Der Name der Station. Er fehlt. Seit drei Halten. Immer die gleiche Durchsage. Immer die gleiche Lücke."

Die Durchsage wiederholt sich, verzerrt, als würde das Band rückwärtslaufen: „—ückf—" Knistern. „—kehr—"

Rückfahrt? Rückkehr?

Du versuchst, die Silben festzuhalten, aber sie rutschen dir weg wie Eis.

„Weil sie noch keinen Namen hat," sagt der Schlaflose leise. „Oder wir ihn vergessen haben. Sobald wir anhalten." Er sieht dich an. „Du wirst es merken. Nach der ersten Station. Etwas... fällt weg."`,
    choices: [
      {
        id: 'write_it_down',
        label: 'Die fehlenden Wörter notieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'ignore_anomaly',
        label: 'So tun, als wäre es normal',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05a_other_passengers'
      },
      {
        id: 'analyze_fragment',
        label: '„Rückf-" und „-kehr" zusammensetzen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
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
    narrative: `Du schaust dich um. Der Wagen ist nicht leer. Außer dem Schlaflosen sind da:

Eine Frau, Ende dreißig, vielleicht älter. Ihr Mantel ist zugeknöpft bis zum Kinn, obwohl es warm ist hier drin. Ihre Hände liegen gefaltet im Schoß, perfekt symmetrisch. Sie starrt geradeaus. Ihr Blick ist starr, fokussiert auf einen Punkt an der Wand, der nicht da ist.

Ein Mann mit Brille. Anzug. Er hält ein Buch, dick, ledergebunden. Aber als du näher kommst, siehst du: Die Seiten sind leer. Nur weiße Flächen. Kein Wort. Keine Zeile. Trotzdem blättert er um, als würde er lesen. Sein Finger gleitet über das Papier, als folgte er einem Text.

Ein Teenager mit Kopfhörern. Die Kopfhörer sind nicht angeschlossen – das Kabel hängt lose herunter. Aber er nickt im Rhythmus, wippt mit dem Kopf, bewegt lautlos die Lippen. Als würde er einen Song hören, den nur er kennt.

Niemand spricht. Niemand sieht dich an. Niemand bewegt sich – außer diesen kleinen, mechanischen Gesten. Umblättern. Nicken. Starren.

Als wären sie alle in einer Schleife gefangen. Als würden sie dieselbe Bewegung wiederholen, immer wieder, für immer.`,
    choices: [
      {
        id: 'approach_woman',
        label: 'Die starrende Frau direkt ansprechen',
        condition: {
           type: 'compare',
           target: 'conductor_attention',
           operator: '<',
           value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c1_s05a2_passenger_rhythm'
      },
      {
        id: 'leave_them_alone',
        label: 'Im Muster unsichtbar bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05a2_passenger_rhythm'
      },
      {
        id: 'count_passengers',
        label: 'Gesichter zählen, nicht Sitze',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05a2_passenger_rhythm'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Passagier-Loop als Spannungsaufbau',
      'Alle Optionen rekombinieren in den Rhythmus-Beat'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // c1_s05a2_passenger_rhythm: Rhythmus der Fahrt (Interlude)
  // ==========================================================================
  'c1_s05a2_passenger_rhythm': {
    id: 'c1_s05a2_passenger_rhythm',
    chapter: 1,
    title: 'Rhythmus',
    narrative: `Der Zug rattert. Nicht laut, aber präzise, wie ein Metronom.

Der Teenager mit den Kopfhörern nickt im Takt – ein winziger Widerhaken im Muster. Für einen Moment glaubst du, dass jemand deinen Namen flüstert.

Du versuchst, die Quelle zu finden, aber der Ton scheint nicht aus einer Richtung zu kommen. Eher aus den Zwischenräumen: zwischen zwei Waggonstößen, zwischen zwei Atemzügen, zwischen einem Gedanken und dem nächsten.

Als der Teenager kurz den Kopf hebt, bist du sicher, dass seine Lippen ein Wort formen. Vielleicht deinen Namen. Vielleicht nur den Takt.

Dann schaut er wieder ins Leere und der Rhythmus nimmt dich mit, ob du willst oder nicht.`,
    choices: [
      {
        id: 'follow_rhythm',
        label: 'Dich auf den Takt einlassen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      },
      {
        id: 'break_pattern',
        label: 'Bewusst gegen den Takt atmen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c1_s05b_compartment7_tease'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Abteil 7'
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
    narrative: `Du gehst weiter durch den Wagen, an den eingefrorenen Passagieren vorbei. Der Gang ist schmal, die Wände zu nah. Am Ende: Eine Tür. Massiv. Holz. Dunkler als der Rest.

Nummer 7.

Die Metallplatte ist angelaufen, grünlich. Als wäre sie sehr alt. Oder als hätte sie lange unter Wasser gelegen.

Ein handgeschriebenes Schild, auf vergilbtem Papier, mit Klebeband befestigt: „Besetzt". Die Handschrift ist altmodisch, mit Füller geschrieben. Die Tinte ist verwischt.

Du hörst Geräusche dahinter. Leises Kratzen. Papier auf Papier. Oder... Stift auf Papier? Jemand schreibt. Schnell. Hektisch. Ohne Pause.

Der Schlaflose ruft von hinten, seine Stimme angespannt: „Geh da nicht rein. Nicht jetzt. Du bist noch nicht stabil genug." Er kommt näher, greift nach deinem Arm, zieht dich weg. „Glaub mir. Wart bis nach der ersten Station. Erst wenn du merkst, was der Halt mit Namen und Farben macht. Sonst..."

Er verstummt. Schüttelt den Kopf.

„Sonst was?"

„Sonst nimmst du den falschen Satz mit rein. Und dann verlierst du dich."`,
    choices: [
      {
        id: 'knock_on_door',
        label: 'Die Stille brechen und klopfen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05c_comp7_listen'
      },
      {
        id: 'listen_to_sleepless',
        label: 'Dem Schlaflosen vertrauen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05c_comp7_listen'
      },
      {
        id: 'feel_drawn',
        label: 'Der Anziehung nachgeben und die Tür berühren',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05c_comp7_listen'
      }
    ],
    tags: ['reveal', 'setup'],
    state_notes: [
      'Klopfen triggert früh erhöhte Schaffner-Aufmerksamkeit',
      'Callback: frühe Initiative kann später als Risiko gespiegelt werden'
    ],
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

Du merkst erst jetzt, dass du den Atem angehalten hast.

Als du wieder Luft holst, schmeckt sie nach Staub und Tinte.

Dann: Stille. Kein Kratzen mehr. Nur die Bremsen des Zuges.

Der Halt kommt.`,
    choices: [
      {
        id: 'ask_voice_direct',
        label: 'Die Stimme direkt fragen, was sie von dir will',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_s05d_comp7_exchange'
      },
      {
        id: 'ask_sleepless_rule',
        label: 'Den Schlaflosen um eine klare Regel bitten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_s05d_comp7_exchange'
      },
      {
        id: 'set_boundary',
        label: 'Eine Grenze setzen: „Keine Namen, bis der Halt vorbei ist."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_s05d_comp7_exchange'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Führbarer Dialog-Setup vor dem ersten Halt'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c1_s05d_comp7_exchange: Geleiteter Dialog vor Abteil 7
  // ============================================================================
  'c1_s05d_comp7_exchange': {
    id: 'c1_s05d_comp7_exchange',
    chapter: 1,
    title: 'Zwei Stimmen',
    narrative: `„Wer ist da drin?", fragst du.

Hinter der Tür raschelt es. Dann antwortet die gleiche leise Stimme: „Falsche Frage. Sag zuerst, was du behalten willst."

Der Schlaflose stellt sich halb zwischen dich und die Tür. „Das ist der Punkt, an dem viele sich verzetteln", sagt er. „Nicht Wahrheit gegen Lüge. Nur: Wem gibst du dein erstes klares Wort?"

Die Bremsen greifen fester. Der Halt ist nur Sekunden entfernt.`,
    narrative_variants: [
      {
        condition: {
          type: 'compare',
          target: 'rel_sleepless',
          operator: '>=',
          value: 2
        },
        narrative: `„Wer ist da drin?", fragst du.

Hinter der Tür: „Falsche Frage. Sag zuerst, was du behalten willst."

Der Schlaflose reagiert sofort, als hätte er genau diesen Satz erwartet. „Hör auf den Aufbau, nicht auf die Worte", sagt er leise. „Erst bindet sie dich an einen Begriff, dann zieht sie den Boden darunter weg."

Die Bremsen greifen. Ihr habt nur noch einen Versuch, bevor der Halt euch unterbricht.`
      }
    ],
    choices: [
      {
        id: 'anchor_with_emma',
        label: 'Den Namen „Emma" als Anker setzen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'follow_sleepless_method',
        label: 'Der Methode des Schlaflosen folgen: erst beobachten, dann reden',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_end_station'
      },
      {
        id: 'trade_with_voice',
        label: 'Mit der Tür verhandeln: „Ein Hinweis gegen eine Antwort."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c1_end_station'
      }
    ],
    tags: ['reveal', 'interlude'],
    state_notes: [
      'Geführter NPC-Dialog mit klarer Haltung',
      'Verdichtet Konsequenzen ohne extra Schleifen'
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
    narrative: `Der Zug hält sanft, ohne jeden Ruck, als würde er nicht bremsen, sondern einfach aufhören zu existieren.

Du schaust aus dem Fenster. Draußen liegt ein Bahnsteig, identisch zum ersten: dieselbe Neonröhre, dieselbe Anzeigetafel, dieselbe Uhr auf 23:47. Als hätte sich die Zeit keinen Millimeter bewegt.

Niemand steigt ein, niemand steigt aus. Die Türen öffnen sich mit einem langen Zischen, aber der Bahnsteig bleibt leer und wartend.

Du drehst dich zum Schlaflosen um. Er steht am Fenster, starrt hinaus. Aber irgendetwas ist anders. Seine Haltung? Seine Kleidung?

Seine Jacke ist jetzt dunkelblau. Vorher war sie grau. Du bist sicher. Grau. Ein verwaschenes Grau.

Er bemerkt deinen Blick. „Was?"

„Deine Jacke…" Du zögerst. „Sie war grau."

Er lacht trocken, ein Geräusch ohne Humor. „Sie war immer blau." Er sagt es so selbstverständlich, dass deine Erinnerung plötzlich wie ein Fehler klingt.

Er zerknüllt einen Zettel, den er in der Hand hält. Du hast ihn vorher nicht gesehen. Wo kam er her? Seine Finger zittern, als er ihn zu einem harten Ball presst.

„Was stand da?"

„Nichts Wichtiges." Er wirft den Zettel weg. Er landet im Gang, rollt unter einen Sitz. „Nur... ein Name. Aber ich weiß nicht mehr, wessen."

Für einen Moment willst du „Emma?" fragen, aber das Wort bleibt hängen, als hätte es Kanten.

Er reibt sich die Augen. „Das ist das erste Zeichen. Wenn die Details anfangen zu rutschen. Farben. Namen. Gesichter." Er blickt dich an. „Bei mir hat es drei Stationen gedauert. Bei dir ist es schon nach einer angefangen."

Die Türen schließen sich. Der Zug fährt an.

Du prüfst den Namen in dir wie einen lockeren Zahn mit der Zunge. Emma ist noch da. Aber weiter weg als eben.

Du spürst sofort, dass etwas fehlt - etwas Kleines, aber Zentrales.

Nur was genau, kannst du nicht mehr sagen.

Im Gang beginnt wieder dieses metallische Klacken, weit weg und doch auf dem Weg zu dir.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'rel_sleepless', operator: '>=', value: 2 },
            { type: 'compare', target: 'tickets_love', operator: '>=', value: 3 }
          ]
        },
        narrative: `Der Zug hält sanft, ohne Ruck.

Der Bahnsteig draußen ist identisch zum ersten: dieselbe Uhr, dieselbe Leere.

Du drehst dich zum Schlaflosen. Seine Jacke ist jetzt dunkelblau.

Als du ihn darauf ansprichst, lächelt er kurz, müde. „Dann merkst du es also auch."

Er zerknüllt einen Zettel in der Hand. „Nur ein Name stand da. Ich krieg ihn nicht mehr zusammen."

Du willst sofort „Emma" sagen und zögerst trotzdem, als müsste das Wort erst durch einen enger gewordenen Raum.

Die Türen schließen sich.

Du prüfst den Namen in dir wie einen lockeren Zahn mit der Zunge. Emma ist noch da. Aber weiter weg als eben.

Im Gang beginnt wieder dieses metallische Klacken, weit weg und doch auf dem Weg zu dir.`
      }
    ],
    choices: [
      {
        id: 'continue_to_chapter_2',
        label: 'Weiterfahren, obwohl etwas fehlt',
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 }
        ],
        next: 'c1_end_station_sideword'
      },
      {
        id: 'confront_jacket_change',
        label: 'Auf der verschobenen Erinnerung bestehen',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 3 },
            { type: 'compare', target: 'conductor_attention', operator: '>=', value: 3 }
          ]
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c1_end_station_sideword'
      },
      {
        id: 'nod_to_conductor',
        label: 'Dem unsichtbaren Schaffner antworten',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'set', target: 'chapter_index', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c1_end_station_sideword'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Merged Platform Look + End Scene',
      'Preserves Drift Mechanics'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Kleiner Abschlussdialog ohne Gewicht
  // ==========================================================================

  'c1_end_station_sideword': {
    id: 'c1_end_station_sideword',
    chapter: 1,
    title: 'Noch ein Satz',
    narrative: `Der Schlaflose bleibt kurz an der Tür stehen, bevor ihr beide weitergeht.

Seine Finger trommeln einmal gegen den Rahmen, als müsste er prüfen, ob der Takt noch stimmt.

„Nur damit ich weiß, dass du noch da bist," sagt er. „Sag noch etwas."

In seinem Blick liegt keine Neugier, eher eine Bitte, die er nicht oft ausspricht.`,
    choices: [
      {
        id: 'sideword_brief',
        label: '„Ich bin noch da."',
        effects: [
          { type: 'set', target: 'empathie', value: 40 }
        ],
        next: 'c2_s01_ticket_search'
      },
      {
        id: 'sideword_name',
        label: '„Emma. Der Name bleibt."',
        effects: [
          { type: 'set', target: 'empathie', value: 41 }
        ],
        next: 'c2_s01_ticket_search'
      },
      {
        id: 'sideword_silence',
        label: 'Nur einmal deutlich nicken',
        effects: [
          { type: 'set', target: 'empathie', value: 42 }
        ],
        next: 'c2_s01_ticket_search'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog: Tonwahl ohne Route-Impact',
      'empathie-Wert ist nur Flavor und wird später überschrieben'
    ],
    atmosphere: 'somber'
  }
};
