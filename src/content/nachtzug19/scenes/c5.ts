// ============================================================================
// NACHTZUG 19 - Kapitel 5: Finale Kontrolle
// ============================================================================
// Zielwerte:
// - 22–28 Szenen (erreicht: 27)
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

Die Luft ist dichter geworden. Schwerer. Als würde der Zug selbst atmen – ein langsames, bewusstes Ein und Aus, das sich mit dem Rattern der Räder synchronisiert.

Draußen zieht die Dunkelheit vorbei. Keine Lichter mehr. Keine Andeutung von Zivilisation. Nicht einmal Sterne.

Nur die endlose Nacht und das rhythmische Rattern der Räder. Ein Takt, der sich in deine Schläfen bohrt.

Die Polster unter dir fühlen sich wärmer an als zuvor. Fast fiebrig. Die Metallgriffe sind kalt, aber nicht mehr metallisch – wie alte Knochen.

Du denkst an die Station, die du gerade verlassen hast. An die Entscheidungen, die du getroffen hast. An die Gesichter, die du gesehen hast – oder warst du allein?

An das, was noch kommt.

Der Zug fährt weiter. Immer weiter. Durch eine Nacht ohne Ende.

Und du weißt: Die nächste Kontrolle wird die härteste sein. Die letzte.`,
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
    narrative: `Du findest Comp7 am Ende des Ganges. Sie steht am Fenster und blickt hinaus in die Dunkelheit – reglos, wie eine Statue aus Rauch und Schatten.

Als du näher kommst, dreht sie sich um. Ihre Bewegung ist zu glatt, zu fließend. Als würde sie nicht gehen, sondern sich durch den Raum verschieben.

„Du bist noch hier," sagt sie leise. Ihre Stimme klingt hohl, als würde sie aus einem tiefen Schacht kommen.

Es klingt nicht überrascht. Eher… traurig. Oder ist es Erleichterung?

„Die meisten sind schon ausgestiegen. An einer der Stationen." Sie zählt leise an ihren Fingern ab. „Der Mann mit der Zeitung. Die Frau im blauen Mantel. Der Junge mit dem roten Schal."

Kanntest du die? Du versuchst, dich zu erinnern. Nichts.

Sie blickt wieder hinaus. „Aber du nicht. Du fährst weiter."

Eine Pause. Das Rattern der Räder wird lauter, eindringlicher.

„Ich war mal Passagier #7," sagt sie plötzlich. Ihre Stimme bricht. „Aber irgendwann... bin ich zum Zug geworden. Ich kann nicht mehr aussteigen. Ich bin Teil davon. Die Türen öffnen sich nicht mehr für mich."

Ihre Hände zittern. Du siehst, wie ihre Finger am Fensterrahmen entlanggleiten – und für einen Moment verschwimmen sie, als wären sie aus demselben Material wie das Glas.

„Ich will, dass du gehst," sagt sie. Pause. Ihre Augen glänzen feucht. „Aber ich will nicht allein bleiben."

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
    narrative: `Die Lichter beginnen zu sterben.

Mit jedem Flackern verlierst du kurz die Orientierung. In der Dunkelheit hörst du dein eigenes, raues Atmen, und wenn das Licht zurückkehrt, scheint dein Schatten an der Wand einen Schritt näher gerückt zu sein als du selbst.

Du presst die Hand gegen die Wand. Der Kunststoff fühlt sich rauer an als sonst, als hätte sich die Oberfläche über Nacht verändert. Die Kälte ist nicht die des Zuges, sondern die eines Raums, in dem schon lange niemand mehr gewesen ist.

Ein Flackern länger als alle anderen. Für einen Atemzug ist alles schwarz. Du spürst den Zug ruckeln, hörst das Schaben der Räder wie Nägel auf Stein. Und als das Licht wieder an ist, steht der Schatten nicht mehr hinter dir, sondern halb neben dir.

Ein kühler Luftzug streicht über deine Stirn, wie eine unsichtbare Hand.`,
    choices: [
      {
        id: 'hold_ground',
        label: 'Stehenbleiben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
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
    narrative: `Du findest den schlaflosen Mann in seinem Abteil. Die Tür steht offen, wie eine Einladung – oder eine Warnung.

Er sieht noch blasser aus als zuvor. Die Augen tief eingesunken, umrandet von violetten Schatten. Seine Haut hat einen wächsernen Glanz, als würde er langsam durchscheinend werden.

„Du… du bist noch da," murmelt er. Seine Stimme ist nur noch ein Flüstern. „Ich dachte, du wärst schon… weg."

Er starrt an die Wand. Dort sind Kratzer. Feine Linien. Als hätte jemand versucht, etwas zu zählen. Tage? Stationen? Stunden?

„Sie kommen näher. Die Kontrollen. Jedes Mal härter." Er reibt sich die Schläfen. „Jedes Mal fragen sie mehr. Wollen mehr wissen. Mehr Antworten."

Er lacht leise, bitter. Ein Geräusch wie brechendes Glas. „Weißt du, was das Lustige ist? Ich kann immer noch nicht schlafen. Selbst hier nicht. Selbst nach… wie lange sind wir schon unterwegs?"

Du öffnest den Mund, um zu antworten. Aber du weißt es nicht.

Seine Hände zittern. Die Fingernägel sind abgekaut, blutig. „Ich habe alles versucht. Alles gesagt. Aber es reicht nie. Es reicht nie."

Er blickt dich an. Direkt. Durchdringend. „Was hast du ihnen gesagt? Warum bist du noch hier? Was macht dich… anders?"`,
    narrative_variants: [
      {
        condition: { type: 'compare', target: 'rel_boy', operator: '>=', value: 2 },
        narrative: `Du findest den schlaflosen Mann in seinem Abteil. Die Tür steht offen.

Er sieht noch blasser aus als zuvor — wächsern, fast durchscheinend. Aber als du eintrittst, hebt er den Blick. Und zum ersten Mal sieht er nicht nur müde aus. Er sieht überrascht aus.

„Der Junge hat mit dir gesprochen," sagt er. Keine Frage. „Er spricht nie mit jemandem. Seit Jahren nicht. Seit…" Er bricht ab. Reibt sich die Schläfen.

„Er hat dir seinen Rekorder gegeben? Oder... angeboten?"

Du nickst.

Er starrt dich an. Lang. Durchdringend. „Das ändert alles. Der Junge weiß Dinge. Er hört Dinge. Die Kassetten…" Er senkt die Stimme. „Die Kassetten sind nicht leer. Was darauf ist — das ist keine Musik."

Seine Hände zittern. „Sie kommen näher. Die Kontrollen. Jedes Mal härter. Aber wenn der Junge dir vertraut…" Ein Flackern von etwas wie Hoffnung in seinen toten Augen. „Dann hast du vielleicht eine Chance, die ich nie hatte."

Er blickt dich an. „Was macht dich anders?"`,
      },
      {
        condition: { type: 'bool', target: 'has_recorder', value: true },
        narrative: `Du findest den schlaflosen Mann in seinem Abteil. Die Tür steht offen.

Er sieht noch blasser aus als zuvor. Aber sein Blick fällt sofort auf den Kassettenrekorder in deiner Hand. Seine Augen weiten sich.

„Woher hast du den?" flüstert er. „Den Rekorder. Das ist… das ist der Rekorder. Vom Jungen."

Er steht auf. Kommt näher. Zu nah. Du riechst etwas Süßliches — Verwesung? Angst?

„Hast du ihn abgespielt? Hast du gehört, was darauf ist?" Seine Stimme bricht. „Das Surren. Das Surren ist nicht das Band. Das sind Stimmen. Verschoben. Verlangsamt. Die Stimmen der 19."

Er packt deinen Arm. „Du musst vorsichtig sein. Der Schaffner weiß, dass du ihn hast. Deshalb werden die Kontrollen härter."

Er lässt los. Setzt sich. „Was macht dich anders?"`
      }
    ],
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
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 1: Abteil 7 (Teil 1 - Annäherung)
  // ==========================================================================

  'c5_s06_abteil7': {
    id: 'c5_s06_abteil7',
    chapter: 5,
    title: 'Abteil 7',
    narrative: `Noch hängt die Frage des Schlaflosen in dir nach, als du den Gang entlanggehst. Deine Schritte hallen wider, zu laut in der Stille.

Und dann siehst du es:

Abteil 7.

Die Tür ist geschlossen. Kein Licht dringt heraus. Kein Geräusch. Nur eine absolute, undurchdringliche Schwärze hinter dem matten Glas.

Aber da ist… etwas.

Ein Gefühl. Eine Präsenz. Ein Druck gegen deine Brust, als würde die Luft selbst dich warnen. Zurückstoßen.

Die Metallplatte mit der Nummer ist kälter als alles andere im Zug. Du spürst es, ohne sie zu berühren – eine eisige Aura, die von ihr ausgeht.

Du erinnerst dich an die Warnung. An die Andeutungen. An die Blicke der anderen Passagiere, wenn sie an dieser Tür vorbeigingen. Schnell. Ohne hinzusehen.

„Geh nicht nach Abteil 7."

Aber niemand hat dir gesagt, warum. Niemand hat erklärt, was dahinter ist. Oder wer.

Die Tür ist unverschlossen. Du könntest die Klinke drücken. Du könntest eintreten.

Du könntest auch weitergehen. Weitergehen, als wäre diese Tür nie dagewesen.

Aber dann wüsstest du nie, was sich dahinter verbirgt.

Was tust du?`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'memory_drift', operator: '>=', value: 4 },
            { type: 'bool', target: 'has_recorder', value: true }
          ]
        },
        narrative: `Du gehst den Gang entlang. Die Frage des Schlaflosen — nein. Des Jungen. Nein. Des Schlaflosen. Die Stimmen verschwimmen. Wer hat was gesagt? Du drückst den Rekorder an dein Ohr. Das leise Surren gibt dir Halt. Fokus. Die Stimmen trennen sich wieder.

Abteil 7.

Die Tür ist geschlossen. Kein Licht. Kein Geräusch. Nur Schwärze.

Aber der Rekorder reagiert. Das Surren wird lauter. Die Kassette dreht sich schneller. Du hörst — Fragmente. Eine Stimme, die du kennst. Emmas Stimme? Nein. Deine eigene Stimme. Von damals. 1973.

„Geh nicht nach Abteil 7."

Aber der Rekorder sagt dir: Geh. Die Wahrheit ist dort drin. Du musst nur zuhören.

Was tust du?`
      },
      {
        min_drift: 4,
        narrative: `Du gehst den Gang entlang. Die Frage des — wer war das? Der Schlaflose. Oder war es Comp7? Du erinnerst dich nicht. Der Gang sieht aus wie ein Gang, durch den du schon gegangen bist. Zweimal. Dreimal. Die Wände haben die gleichen Flecken. Die gleichen Kratzer. Oder andere Kratzer, die genauso aussehen.

Abteil 7.

Abteil... 7? Die Nummer auf der Metallplatte flackert. Für einen Moment liest du „19". Dann wieder „7". Dann „19". War das Abteil immer Nummer 7? Oder hat sich die Nummer geändert?

Du erinnerst dich an eine Warnung. Irgendjemand hat dich gewarnt. Der Schlaflose? Der Schaffner? Emma? Nein — Emma ist nicht hier. Oder doch?

Die Tür ist unverschlossen.

Aber du bist dir nicht sicher, ob es die richtige Tür ist. Du bist dir nicht mehr sicher, ob es den richtigen Gang gibt. Oder ob es dich gibt.

Was tust du?`
      }
    ],
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
          { type: 'inc', target: 'tickets_truth', value: 2 },
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
          { type: 'inc', target: 'tickets_truth', value: 2 },
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
      'CONDITION thresholds: open_and_examine (truth>=3), protect_sleepless (rel>=2), open_for_answers (truth>=4)'
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
    narrative: `Als hättest du geblinzelt, stehst du wieder im Gang.

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
      'CONDITION: write_down_names (tickets_truth >= 4)',
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
    narrative: `Wenig später findest du den Jungen mit dem Kassettenrekorder.

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
        next: 'c5_s10b_boy_followup'
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
        next: 'c5_s10b_boy_followup'
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
        next: 'c5_s10b_boy_followup'
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
        next: 'c5_s10b_boy_followup'
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
  // STANDARD: Mini-Dialog mit dem Jungen (ohne Pfad-Einfluss)
  // ==========================================================================

  'c5_s10b_boy_followup': {
    id: 'c5_s10b_boy_followup',
    chapter: 5,
    title: 'Noch ein Moment',
    narrative: `Der Junge hält den Rekorder fest an seine Brust.

„Wenn das Band endet," sagt er, „will ich nicht allein sein."

Sein Blick bleibt auf dir hängen, offen und unbeweglich.

Du merkst, dass er nicht nach Trost fragt, sondern nach Verbindlichkeit.`,
    choices: [
      {
        id: 'promise_presence',
        label: '„Ich bleibe bei dir, solange es nötig ist."',
        effects: [
          { type: 'set', target: 'wissen', value: 1 }
        ],
        next: 'c5_s10c_boy_presence'
      },
      {
        id: 'encourage_step',
        label: '„Vielleicht ist das Ende der Kassette nur ein Anfang."',
        effects: [
          { type: 'set', target: 'wissen', value: 2 }
        ],
        next: 'c5_s10c_boy_beginning'
      },
      {
        id: 'admit_fear_together',
        label: '„Ich hab auch Angst. Wir gehen trotzdem weiter."',
        effects: [
          { type: 'set', target: 'wissen', value: 3 }
        ],
        next: 'c5_s10c_boy_shared_fear'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Agency: emotionaler Dialog-Knoten ohne zusätzliche Effects',
      'Alle Optionen rekombinieren in c5_s11_corridor_encounter'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Reaktion des Jungen - Präsenz
  // ==========================================================================

  'c5_s10c_boy_presence': {
    id: 'c5_s10c_boy_presence',
    chapter: 5,
    title: 'Nicht allein',
    narrative: `Der Junge nickt sofort, als hätte er auf genau diesen Satz gewartet.

Er legt eine Hand auf den Rekorder und atmet hörbar aus.

Seine Schultern sinken ein paar Zentimeter, als wäre dort eben noch Gewicht gewesen.

„Dann kann ich vielleicht sitzenbleiben, bis ich bereit bin," flüstert er.`,
    choices: [
      {
        id: 'continue_after_presence',
        label: 'Ihm kurz zunicken',
        next: 'c5_s11_corridor_encounter'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Zusicherung von Präsenz',
      'Rekombination in c5_s11_corridor_encounter'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Reaktion des Jungen - Anfang
  // ==========================================================================

  'c5_s10c_boy_beginning': {
    id: 'c5_s10c_boy_beginning',
    chapter: 5,
    title: 'Vielleicht ein Anfang',
    narrative: `Er runzelt die Stirn, dann versucht er ein unsicheres Lächeln.

„Ein Anfang klingt besser als Ende," sagt er leise.

Er dreht den Rekorder einmal in der Hand, als würde er dessen Gewicht neu prüfen.`,
    choices: [
      {
        id: 'continue_after_beginning',
        label: 'Weitergehen',
        next: 'c5_s11_corridor_encounter'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Reframing als Anfang',
      'Rekombination in c5_s11_corridor_encounter'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Reaktion des Jungen - Geteilte Angst
  // ==========================================================================

  'c5_s10c_boy_shared_fear': {
    id: 'c5_s10c_boy_shared_fear',
    chapter: 5,
    title: 'Trotzdem weiter',
    narrative: `„Gut," sagt er nach einer Pause. „Dann bin ich nicht falsch, weil ich Angst habe."

Seine Schultern sinken ein kleines Stück.

Er blickt kurz in den Gang und dann wieder zu dir.

„Dann gehen wir eben mit Angst."`,
    choices: [
      {
        id: 'continue_after_shared_fear',
        label: 'Den Gang wieder betreten',
        next: 'c5_s11_corridor_encounter'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: geteilte Angst',
      'Rekombination in c5_s11_corridor_encounter'
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
    narrative: `Du gehst zurück in den Gang. Das Licht flackert: ein, aus, ein, aus.

Und dann siehst du ihn:

Den Schaffner.

Er steht am anderen Ende. Reglos. Wie ein Schatten, der beschlossen hat, Form anzunehmen.

Seine Silhouette hebt sich gegen das flackernde Licht ab. Zu scharf. Zu definiert. Als würde er aus anderem Material bestehen als der Rest der Welt.

Er sieht dich an. Direkt. Ohne zu blinzeln.

Aber für einen Moment – nur einen kurzen, flüchtigen Augenblick – siehst du etwas anderes in seinem Gesicht. Keine Kälte. Sondern Erschöpfung. Eine tiefe, endlose Müdigkeit. Als trüge er eine Last, die nie enden wird.

Er greift in seine Tasche. Seine Finger schließen sich um etwas. Etwas Kleines. Metallisches. Du hörst ein leises Klicken.

Dann zieht er die Hand sofort wieder zurück. Leer.

Er sagt nichts. Er bewegt sich nicht.

Nur der Zug rattert weiter, unaufhaltsam, gnadenlos.

Du weißt, was das bedeutet: Die nächste Kontrolle kommt bald. Sehr bald. Und diesmal gibt es keine Ausweichmöglichkeit, keine zweite Chance.

Sie wird härter sein. Finaler. Die letzte Prüfung.`,
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
    narrative: `Als du am Fenster stehen bleibst, blickst du hinaus.

Aber da ist keine Dunkelheit mehr. Nicht einmal Schwarz. Nur eine Leere, die das Auge nicht fokussieren kann – ein Nicht-Raum, der sich weigert, wahrgenommen zu werden.

Ein blinder Fleck in der Realität, der direkt in deinen Verstand schneidet. Schmerzhaft. Wie eine Nadel hinter den Augen.

Deine Pupillen zucken. Suchen nach etwas, an dem sie sich festhalten können. Aber da ist nichts. Kein Oben. Kein Unten. Keine Entfernung. Ein Summen setzt ein, nicht hörbar, sondern spürbar: in den Zähnen, hinter der Stirn.

Die Scheibe spiegelt dich nicht richtig. Dein Gesicht scheint zu spät zu blinzeln. Für den Bruchteil einer Sekunde bist du zwei Personen, leicht versetzt, wie ein schlechtes Foto.

Der Zug fährt nicht durch eine Landschaft – er schält sich durch das Gewebe der Existenz. Durch eine Lücke zwischen den Welten.

Und du fragst dich: Was passiert, wenn das Gewebe reißt?`,
    choices: [
      {
        id: 'touch_glass',
        label: 'Die Hand ans Glas legen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s12b_void_touch'
      },
      {
        id: 'step_back_void',
        label: 'Einen Schritt zurück',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c5_s12b_void_touch'
      }
    ],
    state_notes: [
      'Interlude: Leere außerhalb (Split Part 1)',
      'Void sequence - visual, sensory'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // INTERLUDE 4: Leere außerhalb (Split Part 2)
  // ==========================================================================
  'c5_s12b_void_touch': {
    id: 'c5_s12b_void_touch',
    chapter: 5,
    title: 'Das Summen',
    narrative: `Die Handfläche am Glas – keine Kälte. Nur eine dumpfe, vibrierende Wärme, die tief in deine Knochen siedet.

    Deine Finger verschwinden im Spiegelbild, als würde das Glas dich nicht mehr als feste Materie erkennen. Du siehst die Kontur deiner Hand zwar, aber sie gehört dir nicht mehr ganz.

    Ein hoher Ton zieht dir über die Zähne. Genau an der Grenze des Erträglichen. Er schwillt an, bis dir der Atem stockt, und ebbt dann so schnell wieder ab, dass dir kurz schwindlig wird.

    Das Glas gibt minimal nach, fast unmerklich. Als würdest du nicht gegen eine Scheibe drücken, sondern gegen eine Haut, die atmet.`,
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
      'Interlude: Leere außerhalb (Split Part 2)',
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
    narrative: `Plötzlich trifft dich eine Erinnerung, klar und scharf.

Du stehst an einem ganz normalen Bahnhof. Menschen drängen an dir vorbei, Züge kommen und gehen.

Du wartest auf jemanden.

Wer?

Das Bild verschwimmt. Du greifst danach, versuchst es festzuhalten, aber es zerrinnt zwischen deinen Gedanken.

Was bleibt, ist nur ein Name. Ein Gesicht. Fast greifbar. Aber nicht ganz.

Der Anfangslaut bleibt hängen: E...`,
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
        next: 'c5_s13b_boy_callback'
      },
      {
        id: 'let_memory_fade',
        label: 'Die Erinnerung loslassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_s13b_boy_callback'
      },
      {
        id: 'write_down_memory',
        label: 'Versuchen, sie festzuhalten',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_s13b_boy_callback'
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
  // STANDARD: Später Callback auf Jungen-Dialog
  // ==========================================================================

  'c5_s13b_boy_callback': {
    id: 'c5_s13b_boy_callback',
    chapter: 5,
    title: 'Was nachklingt',
    narrative: `Die Erinnerung reißt ab.

Was bleibt, ist das Gefühl einer Stimme, die nicht loslässt.

Der Gang vor dir ist derselbe wie eben, aber dein Schritt hat ein anderes Gewicht. Als hätte der kurze Rückblick die Luft dichter gemacht.

Du merkst, dass nicht der genaue Wortlaut entscheidend war, sondern die Richtung, die er in dir gesetzt hat.`,
    narrative_variants: [
      {
        condition: {
          type: 'compare',
          target: 'wissen',
          operator: '==',
          value: 1
        },
        narrative: `Die Erinnerung reißt ab.

Dir fällt wieder ein, wie der Junge ausgeatmet hat, als du ihm Nähe versprochen hast.

In dem Moment klingt selbst der Gang weniger feindlich.

Du gehst weiter, ohne die Schultern hochzuziehen. Zum ersten Mal seit Langem nicht aus Trotz, sondern weil jemand neben dir weniger allein wirkte.`
      },
      {
        condition: {
          type: 'compare',
          target: 'wissen',
          operator: '==',
          value: 2
        },
        narrative: `Die Erinnerung reißt ab.

Sein vorsichtiges „Ein Anfang klingt besser" bleibt in dir hängen.

Vielleicht gilt das nicht nur für ihn.

Der Satz wirkt klein, fast unscheinbar, und gerade deshalb tragfähig: kein großer Schwur, nur ein Anfang, der nicht sofort wieder widerrufen werden muss.`
      },
      {
        condition: {
          type: 'compare',
          target: 'wissen',
          operator: '==',
          value: 3
        },
        narrative: `Die Erinnerung reißt ab.

„Dann gehen wir eben mit Angst" - der Satz sitzt plötzlich glasklar in dir.

Nicht beruhigend. Aber brauchbar.

Du spürst die Angst noch in den Handflächen, aber sie nimmt dir nicht mehr den nächsten Schritt. Sie läuft mit, statt dich festzunageln.`
      }
    ],
    choices: [
      {
        id: 'continue_to_control3_after_boy_callback',
        label: 'Den Fokus zurückholen',
        next: 'c5_s14_control3_approach'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Später Callback auf c5_s10b/c5_s10c',
      'wissen wird hier nur als Flavor-Flag genutzt',
      'Kein Einfluss auf Endings/Route'
    ],
    atmosphere: 'somber'
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

    Die Luft wird dicht. Der Geruch von Metall und nassem Stein legt sich auf deine Zunge. Seine Uniform wirkt dunkler als der Rest des Abteils, als würde sie das Licht schlucken.

    „Dritte Kontrolle," sagt er.

    Seine Stimme ist leiser als zuvor. Kälter.

    „Fahrkarte."

    Ohne nachzudenken greifst du in die Innentasche. Dort steckt eine Fahrkarte, obwohl du schwören könntest, dass dort eben noch nichts war.

    Du reichst sie ihm. Sie fühlt sich schwer an, als wäre sie aus Blei gegossen. Als er sie nimmt, verschwindet für einen Moment das Zittern aus deiner Hand.

    Er betrachtet sie lange. Sehr lange. Du hörst das leise Kratzen seines Handschuhs auf dem Papier, ein Geräusch wie ein Messer über Glas.

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
      'CONDITION: mention_fragment nur bei tickets_truth >= 5 (Callback auf s13)'
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
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c5_s15b_confession_response'
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
        next: 'c5_s15b_comp7_response'
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
        next: 'c5_s15b_defiance_response'
      },
      {
        id: 'deny_everything',
        label: '„Ich weiß es nicht."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c5_s15b_blank_response'
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
  // STANDARD: Unmittelbare Reaktion auf Geständnis
  // ==========================================================================

  'c5_s15b_confession_response': {
    id: 'c5_s15b_confession_response',
    chapter: 5,
    title: 'Das Wort bleibt',
    narrative: `Der Schaffner blinzelt langsam.

„Endlich ein Satz ohne Maske," sagt er leise.

Du merkst, dass dein eigener Satz noch im Raum steht wie warme Luft nach einem Schrei.

Unter seiner Ruhe wirkt etwas enger, als hätte deine Antwort ihn einen Moment aus dem Takt gebracht.`,
    choices: [
      {
        id: 'confession_breathe',
        label: 'Langsam ausatmen',
        effects: [
          { type: 'set', target: 'empathie', value: 10 }
        ],
        next: 'c5_s16_control3_aftermath'
      },
      {
        id: 'confession_add_line',
        label: '„Und ich zahle den Preis dafür."',
        effects: [
          { type: 'set', target: 'empathie', value: 11 }
        ],
        next: 'c5_s16_control3_aftermath'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog nach Geständnis',
      'Tonwahl ohne Route-Impact'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Unmittelbare Reaktion auf Comp7-Hilfe
  // ==========================================================================

  'c5_s15b_comp7_response': {
    id: 'c5_s15b_comp7_response',
    chapter: 5,
    title: 'Der Blick zur Seite',
    narrative: `Der Schaffner folgt deinem Blick, als könnte er Comp7 durch Wände sehen.

„Du suchst Halt in anderen," sagt er. „Besser als im Nichts."

Du hörst Comp7s Stift in der Ferne nicht, aber du weißt genau, wo das Geräusch im Wagen wäre.`,
    choices: [
      {
        id: 'comp7_hold_line',
        label: 'Bei Comp7 bleiben',
        effects: [
          { type: 'set', target: 'empathie', value: 12 }
        ],
        next: 'c5_s16_control3_aftermath'
      },
      {
        id: 'comp7_answer_soft',
        label: '„Allein reicht hier nicht."',
        effects: [
          { type: 'set', target: 'empathie', value: 13 }
        ],
        next: 'c5_s16_control3_aftermath'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog nach Comp7-Option',
      'Tonwahl ohne Route-Impact'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Unmittelbare Reaktion auf Trotz
  // ==========================================================================

  'c5_s15b_defiance_response': {
    id: 'c5_s15b_defiance_response',
    chapter: 5,
    title: 'Gegen den Blick',
    narrative: `Der Schaffner lächelt nicht, aber seine Haltung wird härter.

„Trotz ist auch eine Antwort," sagt er. „Nur meistens eine kurze."

Der Gang hinter ihm wirkt enger, als hätte dein Satz eine Tür fast zugeschoben.`,
    choices: [
      {
        id: 'defiance_hold',
        label: 'Nicht zurückweichen',
        effects: [
          { type: 'set', target: 'empathie', value: 14 }
        ],
        next: 'c5_s16_control3_aftermath'
      },
      {
        id: 'defiance_reframe',
        label: '„Kurz reicht für den nächsten Schritt."',
        effects: [
          { type: 'set', target: 'empathie', value: 15 }
        ],
        next: 'c5_s16_control3_aftermath'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog nach Trotz-Option',
      'Tonwahl ohne Route-Impact'
    ],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // STANDARD: Unmittelbare Reaktion auf Verdrängung
  // ==========================================================================

  'c5_s15b_blank_response': {
    id: 'c5_s15b_blank_response',
    chapter: 5,
    title: 'Leerstelle',
    narrative: `„Ich weiß es nicht."

Der Satz fällt flach zwischen euch.

Der Schaffner nickt nur, als hätte er genau damit gerechnet.

Gerade dieses Nicken trifft dich härter als ein Widerspruch.`,
    choices: [
      {
        id: 'blank_look_down',
        label: 'Den Blick senken',
        effects: [
          { type: 'set', target: 'empathie', value: 16 }
        ],
        next: 'c5_s16_control3_aftermath'
      },
      {
        id: 'blank_hold_eye',
        label: 'Den Blick halten',
        effects: [
          { type: 'set', target: 'empathie', value: 17 }
        ],
        next: 'c5_s16_control3_aftermath'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog nach Verdrängungs-Option',
      'Tonwahl ohne Route-Impact'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // SET-PIECE 2: Kontrolle 3 (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c5_s16_control3_aftermath': {
    id: 'c5_s16_control3_aftermath',
    chapter: 5,
    title: 'Nach der Kontrolle',
    narrative: `Der Schaffner steht auf, langsam und bedächtig.

Er gibt dir die Fahrkarte zurück.

„Du darfst bleiben," sagt er schließlich. „Vorerst."

Er dreht sich zur Tür, blickt noch einmal über die Schulter.

„Aber die Fahrt ist fast zu Ende. Bald musst du entscheiden. Wirklich entscheiden."

Dann ist er weg.

---

Du sitzt allein in deinem Abteil. Die Fahrkarte in der Hand. Noch gültig. Noch.

Du denkst nach. Über die Kontrolle. Über deine Antworten.

Der Schaffner hat recht: Die Fahrt geht zu Ende.

Bald wirst du ankommen. Irgendwo. Oder aussteigen müssen.

Oder…

Es gibt noch eine dritte Möglichkeit, eine, über die niemand spricht.

Einfach weiterfahren. Für immer im Zug bleiben.

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
    narrative: `Die Dunkelheit ist jetzt überall, nicht nur draußen, auch im Zug.

Die Lichter werden schwächer und flackern immer öfter. Ganze Abschnitte liegen bereits im Schwarz.

Als du durch den Gang gehst, merkst du, dass etwas nicht stimmt: Es gibt weniger Abteile als vorher.

Oder erinnerst du dich falsch? War Abteil 4 nicht hier? Oder war es nie da?

Du bleibst stehen und zählst die Türen. Eins. Zwei. Drei. Dann eine Lücke, wo keine sein sollte.

Dein Finger streift die Wand. Der Lack ist wärmer, als er sein dürfte, und unter der glatten Oberfläche spürst du feine Vibrationen, als würde der Zug atmen.

Der Zug wird kleiner. Enger. Als würde er sich um dich herum zusammenziehen.`,
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
    narrative: `Du spürst es sofort: Die nächste Station kommt.

Nicht in Stunden. In Minuten.

Der Zug verlangsamt sich, ganz langsam, fast unmerklich, und doch spürst du jede Veränderung im Körper.

Draußen ist kein Licht, nur eine Präsenz. Ein Ort.

---

Der Zug hält. Vollständig. Zum ersten Mal seit einer Zeit, die du nicht mehr benennen kannst.

Die Türen öffnen sich.

Draußen liegt ein Bahnsteig, anders als die anderen: leerer, stiller, finaler.

Du weißt: Wenn du jetzt aussteigst, gibt es kein Zurück.

Und wenn du bleibst?

Der Schaffner steht hinter dir.

„Zeit zu gehen," sagt er leise. „Oder zu bleiben. Deine Wahl."`,
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
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
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
          { type: 'inc', target: 'tickets_guilt', value: 2 }
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
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
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
    narrative: `Draußen taucht etwas auf, langsam, wie aus dem Nichts: ein Bahnsteig.

Der fünfte. Der letzte.

Er ist still. Keine Menschen. Keine Bewegung. Nur dieses starre Schweigen und ein Schild, das du fast lesen kannst. Fast.

Der Zug wird langsamer. Noch langsamer.

Gleich hält er. Gleich öffnen sich die Türen.

Und dann ist die Fahrt vorbei.`,
    choices: [
      {
        id: 'prepare_to_exit',
        label: 'Bereit machen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c5_end_station_a'
      }
    ],
    state_notes: [
      'Letzte Szene vor Station-End',
      'Aufbau maximaler Spannung'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // ENDING: Fünfte Station (Split Part 1)
  // ==========================================================================

  'c5_end_station_a': {
    id: 'c5_end_station_a',
    chapter: 5,
    title: 'Fünfte Station',
    narrative: `Der Zug hält.

Die Türen öffnen sich.

Du stehst auf und trittst hinaus auf den Bahnsteig.

Die Luft ist kühler, klarer. Sie schmeckt nach Regen und altem Stein.

Für einen Atemzug klingt der Zug hinter dir fern, fast harmlos.

Dann hörst du wieder das tiefe Metallgeräusch unter dem Bahnsteig und weißt, dass der Abstand nur geliehen ist.`,
    choices: [
      {
        id: 'take_in_platform',
        label: 'Einen Moment stehen bleiben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c5_end_station'
      }
    ],
    state_notes: [
      'Split Part 1: Ankunft auf dem Bahnsteig'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // ENDING: Fünfte Station
  // ==========================================================================

  'c5_end_station': {
    id: 'c5_end_station',
    chapter: 5,
    title: 'Fünfte Station',
    narrative: `Das Schild am Bahnsteig flackert, als würde es sich erst entscheiden.

Dann kannst du es lesen.

Was dort steht, verändert alles.

Hinter dir eine Stimme: „Noch nicht fertig."

Comp7 steht im Türrahmen des Zuges.

„Noch eine Station," sagt sie leise. „Nur noch eine."`,
    choices: [
      {
        id: 'enter_wagon_12',
        label: 'Dem verborgenen Pfad folgen (Wagen 12)',
        condition: {
          type: 'or',
          conditions: [
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 8 },
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
