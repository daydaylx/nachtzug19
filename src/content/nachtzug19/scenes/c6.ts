// ============================================================================
// NACHTZUG 19 - Kapitel 6: Abteil 7
// ============================================================================
// Zielwerte:
// - 22–28 Szenen (erreicht: 26)
// - 5.000–6.500 Wörter (erreicht: ~6.200)
// - 30–45 Choices (erreicht: 42)
// - 10+ Conditions (erreicht: 12)
// Struktur:
// - 6 Interludes (s02, s04, s08, s11, s17, s23)
// - 13 Standard-Szenen
// - 4 Set-Pieces (Abteil 7, Spiegel, Angebot, Finale)
// Thema: Nähe, Intimität, Preis, Vorbereitung auf das Ende
// ============================================================================

import type { ScenesCollection } from '../../../domain/types';

export const c6Scenes: ScenesCollection = {
  // ==========================================================================
  // OPENING: Erwachen nach Station 5
  // ==========================================================================

  'c6_s01_awakening': {
    id: 'c6_s01_awakening',
    chapter: 6,
    title: 'Erwachen',
    narrative: `Als hätte dich der Zug zurück in dich selbst gezogen, sitzt du wieder im Abteil.

Du weißt nicht, wann du wieder eingestiegen bist. Du erinnerst dich an die Station, an Comp7 im Türrahmen, an den Satz: „Noch eine Station."

Aber war das real? Oder beginnt der Traum schon wieder?

Der Zug fährt weiter, doch das Rattern ist nur noch ein Flüstern, als würde sich selbst dieses Geräusch langsam aus der Welt zurückziehen.

Du blickst aus dem Fenster. Draußen ist nichts. Nicht einmal Dunkelheit. Nur Abwesenheit.

Im Abteil hängt ein Geruch von Desinfektionsmittel, wie in einem verlassenen Krankenhaus.

Kalt. Steril. Falsch.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_tag19', value: true },
        narrative: `Als hätte dich der Zug genau an diesen Punkt zurückgefaltet, sitzt du wieder im Abteil.

Ein rhythmisches Pochen in deiner Tasche weckt dich. Der Schlüsselanhänger ist heiß geworden, eine pulsierende Wärme, die durch den Stoff deiner Hose bis auf die Haut dringt.

Wann bist du wieder eingestiegen? Du erinnerst dich an die Station, an Comp7 im Türrahmen.

„Noch eine Station."

Der Anhänger vibriert leise, ein tiefer Ton, den du eher im Kiefer spürst als hörst. Er gibt dir ein Gefühl von Gewicht, von Festigkeit in einer Welt, die sich aufzulösen scheint.

Draußen ist nichts. Nur Abwesenheit.

Aber das Metall in deiner Hand – oder in deiner Tasche – ist real. Es ist ein Anker. Ein Versprechen, dass es ein Ende gibt.

Der sterile Geruch im Abteil wird von einer Note nach altem Messing und warmem Öl überlagert.

Du bist hier. Du bist noch da.`
      }
    ],
    choices: [
      {
        id: 'check_surroundings',
        label: 'Die Umgebung genau ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s03_comp7_final'
      },
      {
        id: 'close_eyes',
        label: 'Augen schließen und warten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s03_comp7_final'
      },
      {
        id: 'walk_corridor',
        label: 'In den Gang gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c6_s03_comp7_final'
      }
    ],
    state_notes: [
      'Eröffnungsszene Kapitel 6',
      'Erwachen nach Station 5 - surreale Atmosphäre',
      'Geruch als sensorischer Anker (steril, falsch)'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // STANDARD: Finales Gespräch mit Comp7
  // ==========================================================================

  'c6_s03_comp7_final': {
    id: 'c6_s03_comp7_final',
    chapter: 6,
    title: 'Comp7 - Letzte Worte',
    narrative: `Dem nachklingenden Satz folgend findest du Comp7 in ihrem Abteil.

Sie sitzt auf der Bank. Bewegungslos.

Ihre Augen sind geschlossen.

„Du bist noch hier," sagt sie, ohne die Augen zu öffnen.

„Ich habe gehofft, du wärst gegangen."

Eine Pause.

„An der letzten Station. Du hättest gehen können."

„Nein," flüsterst du. „Die Türen waren zu."

Sie sieht dich an. „Die Türen sind immer offen. Aber nur für die, die fertig sind. Wer aus Flucht geht, landet nur im nächsten Wagen."

Sie öffnet die Augen.

„Aber du bist zurückgekommen."

Ihr Blick ist… traurig. Aber auch… etwas anderes.

Angst? Mitgefühl? Schuld?

„Weißt du, was in Abteil 7 ist?" fragt sie leise.`,
    narrative_variants: [
      {
        min_drift: 4,
        narrative: `Du findest Comp7... oder war ihr Name Comp8? In ihrem Abteil.

Sie sitzt auf der Bank. Bewegungslos.

Ihr Gesicht flackert wie eine schlechte Aufnahme. Mal alt, mal jung. Die Narbe an ihrem Kinn wandert von links nach rechts und wieder zurück.

Ihre Augen sind geschlossen.

„Du bist noch hier," sagt sie. Ihre Stimme klingt doppelt, als würde jemand zeitversetzt mitsprechen.

„Ich habe gehofft, du wärst gegangen."

Eine Pause. Das Licht im Abteil wird dunkler.

„An der letzten Station. Du hättest gehen können."

Sie öffnet die Augen. Ihre Pupillen sind nicht rund. Sie sind eckig. Wie Pixel.

„Aber du bist zurückgekommen."

Ihr Blick ist… schwer.

„Weißt du, was in Abteil 7 ist?" fragst du dich selbst, aber es ist ihre Stimme, die es ausspricht.

„Wirklich?"`
      }
    ],
    choices: [
      {
        id: 'ask_directly_high_rel',
        label: '„Sag es mir. Was ist dort?"',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c6_s04_corridor_changes'
      },
      {
        id: 'admit_fear',
        label: '„Ich habe Angst, es herauszufinden."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c6_s04_corridor_changes'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s04_corridor_changes'
      }
    ],
    state_notes: [
      'Finales Gespräch mit Comp7 vor Abteil 7',
      'CONDITION: ask_directly_high_rel nur bei rel_comp7 >= 1',
      'Vorbereitung auf Abteil 7 Set-Piece'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // INTERLUDE 2: Gang verändert sich
  // ==========================================================================

  'c6_s04_corridor_changes': {
    id: 'c6_s04_corridor_changes',
    chapter: 6,
    title: 'Veränderung',
    narrative: `Mit Comp7s Frage noch im Kopf verändert sich der Gang.

Nicht plötzlich. Langsam.

Die Wände sind jetzt aus anderem Material. Nicht mehr Metall.

Holz? Nein… etwas anderes.

Du berührst die Wand.

Warm. Fast körperwarm.

Du ziehst die Hand zurück.

Die Nummern an den Abteilen sind jetzt anders.

4, 5, 6…

Und dann:

7.

Die Tür ist geschlossen.

Aber da ist kein Schloss.

Nur ein Türknauf.

Aus Messing. Angelaufen.

Du könntest sie öffnen.

Jetzt.`,
    choices: [
      {
        id: 'approach_door',
        label: 'Zur Tür gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c6_s05_door_seven'
      },
      {
        id: 'examine_details',
        label: 'Die Details der Wand prüfen',
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
        next: 'c6_s05_door_seven'
      }
    ],
    state_notes: [
      'Interlude: Gang verwandelt sich',
      'Wände warm (körperwarm) - sensorischer Anker',
      'Abteil 7 Tür erscheint',
      'CONDITION: examine_details bei tickets_truth >= 1'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // SET-PIECE 1: Abteil 7 (Teil 1 - Annäherung)
  // ==========================================================================

  'c6_s05_door_seven': {
    id: 'c6_s05_door_seven',
    chapter: 6,
    title: 'Abteil 7 - Die Tür',
    narrative: `Wenig später stehst du vor der Tür.

Die Nummer ist eingraviert. Tief. Als wäre sie seit Jahrhunderten da.

7.

Deine Hand zittert, als du sie zum Türknauf ausstreckst.

Warm. Der Knauf ist warm.

Wie eine Hand.

Du spürst… etwas. Durch die Tür.

Eine Präsenz.

Etwas Vertrautes.

Etwas, das du verloren hast.

Oder… nie hattest.

Oder… vergessen wolltest.

Öffnest du die Tür?`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_tag19', value: true },
        narrative: `Wenig später stehst du vor der Tür.

Der Schlüsselanhänger in deiner Hand beginnt im Takt deines Herzschlags zu glühen. Ein tiefes, goldenes Licht scheint durch deine geschlossenen Finger.

Die Nummer 7 auf der Tür leuchtet im gleichen Rhythmus auf. Es ist kein Zufall mehr. Es ist eine Resonanz.

Deine Hand zittert nicht mehr, als du sie zum Knauf ausstreckst. Die Hitze des Metalls und die Wärme des Anhängers verschmelzen zu einer einzigen Empfindung.

Du spürst die Präsenz hinter der Tür nicht nur – du hörst sie als einen klaren, reinen Ton, der aus dem Anhänger aufsteigt.

Etwas Vertrautes. Etwas, das dir gehört.

Das Tag 19 ist der Schlüssel. Nicht für ein Schloss, sondern für die Wahrheit.

Öffnest du die Tür?`
      }
    ],
    choices: [
      {
        id: 'open_door_truth',
        label: 'Die Tür öffnen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c6_s06_inside_seven'
      },
      {
        id: 'hesitate',
        label: 'Zögern',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s06_inside_seven'
      },
      {
        id: 'walk_away',
        label: 'Weggehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c6_s07_seven_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 1: Annäherung Abteil 7',
      'CONDITION: open_door_truth nur bei tickets_truth >= 2',
      'Türknauf warm wie Hand - sensorischer Anker',
      'Wichtige Entscheidung: öffnen oder nicht'
    ],
    tags: ['setup'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 1: Abteil 7 (Teil 2 - Innen)
  // ==========================================================================

  'c6_s06_inside_seven': {
    id: 'c6_s06_inside_seven',
    chapter: 6,
    title: 'Abteil 7 - Innen',
    narrative: `Dann gibst du dem Impuls nach und öffnest die Tür.

Das Abteil ist… wie deines.

Genau wie deines.

Die gleichen Sitze. Das gleiche Fenster.

Aber da sitzt… jemand.

Eine Gestalt. Verschwommen.

Du kannst das Gesicht nicht sehen.

Aber du kennst diese Person.

Tief in dir. Du kennst sie.

Die Gestalt bewegt sich nicht. Sagt nichts.

Wartet nur.

Wartet darauf, dass du… etwas tust.

Etwas sagst.

Etwas erinnerst.`,
    choices: [
      {
        id: 'speak_high_drift',
        label: '„Wer bist du?"',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c6_s07_seven_aftermath'
      },
      {
        id: 'remember_hard',
        label: 'Versuchen, sich zu erinnern',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 3 },
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s07_seven_aftermath'
      },
      {
        id: 'reach_out',
        label: 'Die Hand ausstrecken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s07_seven_aftermath'
      },
      {
        id: 'close_door_quickly',
        label: 'Die Tür schnell schließen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s07_seven_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 2: Kern Abteil 7',
      'CONDITION: speak_high_drift nur bei memory_drift >= 3',
      'CONDITION: remember_hard nur bei tickets_truth >= 3',
      'Begegnung mit verschwommener Gestalt (Erinnerung?)',
      'Wichtigste emotionale Szene des Kapitels'
    ],
    tags: ['reveal'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // SET-PIECE 1: Abteil 7 (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c6_s07_seven_aftermath': {
    id: 'c6_s07_seven_aftermath',
    chapter: 6,
    title: 'Nach Abteil 7',
    narrative: `Als du das nächste Mal blinzelst, stehst du wieder im Gang.

Die Tür von Abteil 7 ist… weg.

Einfach weg.

An ihrer Stelle ist nur eine glatte Wand.

War sie je da?

Du versuchst, dich zu erinnern, was du gesehen hast.

Die Gestalt. Das Gesicht.

Aber die Details verschwimmen.

Nur ein Gefühl bleibt:

Etwas Wichtiges ist passiert.

Etwas Unwiderrufliches.

Der Zug rattert weiter.

Aber du bist nicht mehr derselbe.`,
    choices: [
      {
        id: 'process_experience',
        label: 'Verarbeiten, was passiert ist',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s09_boy_final'
      },
      {
        id: 'forget_quickly',
        label: 'Es vergessen wollen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s09_boy_final'
      },
      {
        id: 'feel_connection',
        label: 'Die Wärme der Berührung nachspüren',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s09_boy_final'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen Abteil 7',
      'Tür verschwindet (Drift-Effekt)',
      'Emotionale Transformation',
      'CONDITION: feel_connection bei tickets_love >= 2 (Callback für reach_out)'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Letztes Gespräch mit dem Jungen (Recorder)
  // ==========================================================================

  'c6_s09_boy_final': {
    id: 'c6_s09_boy_final',
    chapter: 6,
    title: 'Der Junge - Abschied',
    narrative: `Noch benommen von Abteil 7 findest du den Jungen in seinem Abteil.

Der Kassettenrekorder liegt auf dem Sitz. Still.

„Die Kassette ist zu Ende," sagt er leise.

„Schon vor einer Weile."

Er blickt auf das Gerät.

„Aber ich… ich kann nicht aussteigen."

Seine Stimme bricht.

„Ich will nicht vergessen werden," flüstert er. „Wenn ich aussteige... erinnert sich dann noch jemand an mich?"

Er sieht dich an. Seine Augen glänzen.

„Du hast auch einen," sagt er und deutet auf deinen Rekorder.

„Hast du… hast du deine Kassette abgespielt?"`,
    choices: [
      {
        id: 'share_recorder_experience',
        label: 'Von deiner Kassette erzählen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c6_s10_sleepless_gone'
      },
      {
        id: 'comfort_without_recorder',
        label: '„Du musst nicht aussteigen, wenn du nicht bereit bist."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c6_s10_sleepless_gone'
      },
      {
        id: 'tell_truth_harsh',
        label: '„Wir können nicht ewig hierbleiben."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c6_s10_sleepless_gone'
      }
    ],
    state_notes: [
      'Letztes Gespräch mit Junge',
      'CONDITION: share_recorder_experience nur bei has_recorder',
      'Callback zu Recorder aus früheren Kapiteln',
      'Emotionale Verabschiedung'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Schlafloser verschwunden
  // ==========================================================================

  'c6_s10_sleepless_gone': {
    id: 'c6_s10_sleepless_gone',
    chapter: 6,
    title: 'Verschwunden',
    narrative: `Nach dem Gespräch mit dem Jungen gehst du zum Abteil des schlaflosen Mannes.

Die Tür steht offen.

Das Abteil ist leer.

Kein Gepäck. Keine Spuren.

Als wäre nie jemand hier gewesen.

Aber… da ist etwas.

Auf dem Sitz.

Ein Foto. Ein altes Schwarzweißfoto.

Es zeigt… einen Zug. Diesen Zug. Und davor… Menschen. Viele Menschen.

Daneben liegt eine Notiz, hastig gekritzelt:

„Endlich kann ich schlafen. Danke für die Gesellschaft."

Du drehst das Foto um.

Auf der Rückseite steht in verblasster Tinte:

„1973. Letzte Fahrt."

1973. Das ist… vor über fünfzig Jahren.`,
    choices: [
      {
        id: 'take_photo',
        label: 'Das Foto mitnehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s11_announcement'
      },
      {
        id: 'leave_photo',
        label: 'Das Foto liegen lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s11_announcement'
      },
      {
        id: 'examine_closely',
        label: 'Das Foto genau ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c6_s11_announcement'
      }
    ],
    state_notes: [
      'Schlafloser ist verschwunden',
      'Foto-Hinweis auf 1973 "Letzte Fahrt"',
      'Mystery-Element: Zeitsprung'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // INTERLUDE 4: Ansage (Split Part 1)
  // ==========================================================================

  'c6_s11_announcement': {
    id: 'c6_s11_announcement',
    chapter: 6,
    title: 'Durchsage',
    narrative: `Die Lautsprecher erwachen mit einem trockenen Kratzen, wie Sand auf Metall.

Der Staub vibriert auf dem Gitter. Du neigst den Kopf, um die Worte im Rauschen zu finden, während deine Kehle trocken wird. Ein Hauch von Metall legt sich auf deine Zunge.

Dann bricht eine Stimme durch, die nicht zum Zug gehört.

---

„—chster Halt. Endstation. End—"

Die Stimme verzerrt sich, wird tiefer, unmenschlich. „—itte alle aussteigen. Alle… die noch können."

Dann bricht sie in ein Flüstern: „Es tut mir leid."

Das Knistern verstummt abrupt, und der Zug fährt weiter, als wäre nichts geschehen.`,
    choices: [
      {
        id: 'process_message',
        label: 'Nachdenken',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s12_mirror_self'
      },
      {
        id: 'whisper_year',
        label: '„1973" flüstern',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s12_mirror_self'
      },
      {
        id: 'listen_for_voice',
        label: 'Stimme analysieren',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c6_s12_mirror_self'
      }
    ],
    state_notes: [
      'Interlude: Durchsage (merged announcement + message)',
      'Final station announcement with apology',
      'CONDITION: whisper_year (memory_drift >= 3)',
      'CONDITION: listen_for_voice (conductor_attention >= 3)'
    ],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // SET-PIECE 2: Spiegel (Teil 1 - Begegnung)
  // ==========================================================================

  'c6_s12_mirror_self': {
    id: 'c6_s12_mirror_self',
    chapter: 6,
    title: 'Spiegel',
    narrative: `Von der Durchsage aufgeschreckt gehst du zurück zu deinem Abteil.

Aber als du die Tür öffnest… da sitzt jemand.

Du selbst. Ein exaktes Spiegelbild.

Die Gestalt sitzt auf deinem Platz. Blickt aus dem Fenster. Dreht sich langsam um. Sieht dich an.

Lächelt. Nicht freundlich. Wissend.

„Endlich," sagt die Gestalt mit deiner Stimme. „Ich habe gewartet."

Sie steht auf. „Weißt du, warum du hier bist? Wirklich?"

Die Gestalt kommt näher.

---

Sie lacht leise. „Ich bin du. Der Teil von dir, den du vergessen wolltest. Der Teil, der weiß, warum du wirklich hier bist."

Sie streckt die Hand aus. „Komm. Ich zeige es dir."

„Oder…" Die Gestalt deutet zum Fenster. „Du kannst weglaufen. Wie immer."

„Deine Wahl."

Die Hand bleibt ausgestreckt. Wartend.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_tag19', value: true },
        narrative: `Du öffnest die Tür zu deinem Abteil und erstarrst.

Der Schlüsselanhänger wird schlagartig eiskalt. Die Kälte beißt sich in deine Haut – eine Warnung.

Du selbst. Ein exaktes Spiegelbild sitzt auf deinem Platz.

Die Gestalt dreht sich langsam um. Sie lächelt wissend, aber das Lächeln erreicht die Augen nicht.

„Endlich," sagt sie mit deiner Stimme. „Ich habe gewartet."

Der Anhänger vibriert nicht mehr rhythmisch, sondern stößt kurze, hektische Impulse aus – wie ein Alarm. Diese Begegnung ist falsch.

„Weißt du, warum du hier bist? Wirklich?"

---

Sie lacht leise. „Ich bin du. Der Teil von dir, den du vergessen wolltest."

Sie streckt die Hand aus. „Komm. Ich zeige es dir. Oder… du kannst weglaufen. Wie immer."

Die Kälte des Metalls in deiner Hand ist der einzige Beweis dafür, dass du noch die Kontrolle hast. Die Gestalt vor dir hat kein solches Gewicht. Sie ist nur ein Schatten.

„Deine Wahl."`
      }
    ],
    choices: [
      {
        id: 'take_hand_escape',
        label: 'Die Hand nehmen',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c6_s14_mirror_aftermath'
      },
      {
        id: 'take_hand_guilt',
        label: '„Zeig es mir. Ich bin bereit."',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 3 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s14_mirror_aftermath'
      },
      {
        id: 'refuse_hand',
        label: 'Die Hand ablehnen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s14_mirror_aftermath'
      },
      {
        id: 'attack_mirror',
        label: 'Die Gestalt angreifen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c6_s14_mirror_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece: Spiegel-Selbst (merged encounter + choice)',
      'Confrontation with repressed self, offer to see truth',
      'CONDITION: take_hand_escape (tickets_escape >= 2)',
      'CONDITION: take_hand_guilt (tickets_guilt >= 3)'
    ],
    tags: ['setup', 'reveal'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // SET-PIECE 2: Spiegel (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c6_s14_mirror_aftermath': {
    id: 'c6_s14_mirror_aftermath',
    chapter: 6,
    title: 'Nach dem Spiegel',
    narrative: `Als die Gestalt zerfällt, bist du allein im Abteil.

Die Gestalt ist weg.

War sie je da?

Aber… etwas hat sich verändert.

Du erinnerst dich jetzt an… Fragmente.

Ein Gesicht. Ein Name. Ein Ort.

Nichts Vollständiges.

Aber mehr als vorher.

Viel mehr.

Deine Hände zittern.

Nicht vor Kälte.

Vor Erkenntnis.

Vor dem, was kommt.`,
    choices: [
      {
        id: 'embrace_memory',
        label: 'Die Erinnerungen akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s15_recorder_playback'
      },
      {
        id: 'push_away_memory',
        label: 'Die Erinnerungen verdrängen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s15_recorder_playback'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen Spiegel',
      'Erinnerungsfragmente tauchen auf',
      'Emotionale Vorbereitung auf Ende'
    ],
    atmosphere: 'bittersweet'
  },

  // ==========================================================================
  // STANDARD: Recorder abspielen (Conditional)
  // ==========================================================================

  'c6_s15_recorder_playback': {
    id: 'c6_s15_recorder_playback',
    chapter: 6,
    title: 'Die Kassette',
    narrative: `Du sitzt im Halbdunkel und blickst auf den Kassettenrekorder.

Seit wann trägst du ihn bei dir? Du erinnerst dich nicht an den Moment, in dem er in deine Hand kam. Er war einfach da.

Deine Finger schweben über dem Play-Knopf. Du hast die Kassette nie ganz gehört. Vielleicht aus Angst. Vielleicht, weil du längst ahnst, was sie sagt.

Der Knopf wartet.

Drückst du ihn?`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'played_recorder', value: true },
        narrative: `Du sitzt im Halbdunkel und blickst auf den Kassettenrekorder.

Das Klicken, das Rauschen, die Stimmen: Du kennst sie bereits. Und trotzdem fühlt es sich an, als hätte das alles jemand anderem gehört.

Deine Finger wandern wieder zum Play-Knopf. Du zögerst, weil du weißt: Beim zweiten Mal klingt Wahrheit nicht leiser, nur endgültiger.

Der Knopf wartet.

Drückst du ihn wieder?`
      }
    ],
    choices: [
      {
        id: 'play_recorder',
        label: 'Die Kassette abspielen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 3 },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s16_tag19_discovery'
      },
      {
        id: 'resist_playing',
        label: 'Den Rekorder weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s16_tag19_discovery'
      }
    ],
    state_notes: [
      'Recorder-Szene (nur wenn has_recorder)',
      'CONDITION: play_recorder nur bei has_recorder',
      'Wichtiger Enthüllungsmoment',
      'Callback zu Recorder aus Kapitel 2'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Tag19 Bedeutung (Conditional)
  // ==========================================================================

  'c6_s16_tag19_discovery': {
    id: 'c6_s16_tag19_discovery',
    chapter: 6,
    title: 'Das Etikett',
    narrative: `Du findest das Tag19-Etikett in deiner Tasche.

Das kleine, gelbe Etikett.

Du hast es… wann gefunden?

Am zweiten Halt? Oder am dritten?

Die Erinnerung ist verschwommen.

Aber jetzt… jetzt siehst du es klarer.

Die Zahl. 19.

Und darunter, in winziger Schrift:

„Wagen 7, Sitz 19"

„1973"

„Letzte Fahrt"

Dein Herz schlägt schneller.

Das ist… dein Platz.

Dein Sitz.

Aber… 1973?`,
    narrative_variants: [
      {
        min_drift: 5,
        narrative: `Du findest das Etikett.

Aber es ist nicht aus Metall. Es ist aus Knochen.

Die Zahl 19 ist eingebrannt. Sie raucht noch leicht.

Darunter steht dein Name. Aber die Buchstaben sind falsch angeordnet.

„Wagen 7, Sitz 19"

„1973"

„Letzte Fahrt"

Du willst es fallen lassen, aber es klebt an deiner Haut.

Dein Herz schlägt gegen deine Rippen wie ein Vogel im Käfig.

Das ist… dein Platz.

Dein Sitz.

„Komm nach Hause," flüstert der Knochen.`
      }
    ],
    choices: [
      {
        id: 'understand_tag',
        label: 'Die Bedeutung verstehen',
        condition: {
          type: 'bool',
          target: 'has_tag19',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 3 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c6_s17_lights_failing'
      },
      {
        id: 'ignore_implications',
        label: 'Es ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s17_lights_failing'
      },
      {
        id: 'accept_truth',
        label: 'Die Wahrheit akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s17_lights_failing'
      }
    ],
    state_notes: [
      'Tag19-Szene (nur wenn has_tag19)',
      'CONDITION: understand_tag nur bei has_tag19',
      'Enthüllung: Sitz 19, 1973, "Letzte Fahrt"',
      'Callback zu Tag19 aus Kapitel 2/3'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // INTERLUDE 5: Lichter versagen
  // ==========================================================================

  'c6_s17_lights_failing': {
    id: 'c6_s17_lights_failing',
    chapter: 6,
    title: 'Dunkelheit',
    narrative: `Noch während der Gedanke an 1973 in dir nachhallt, flackern die Lichter.

Dann – aus.

Vollständige Dunkelheit.

Du kannst deine Hand vor Augen nicht sehen.

Nichts.

Nur das Rattern der Räder.

Immer leiser.

Immer… ferner.

Als würde der Zug… aufhören zu existieren.

Dann – ein Licht.

Schwach. In der Ferne.

Ein Gang-Licht.

Es bewegt sich.

Kommt näher.

Der Schaffner.

Er kommt.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Die Lichter flackern.

Dann – aus.

Aber es ist keine normale Dunkelheit.

Es ist, als hätte jemand den Raum ausgeschaltet.

Du tastest nach den Wänden. Nichts.

Nur unendlicher Raum.

Das Rattern der Räder klingt wie ein Herzschlag.

Sehr langsam.

Bumm.

Bumm.

Dann – ein Licht.

Ein Riss in der Dunkelheit.

Dahinter: Jemand.

Der Schaffner.

Er tritt durch den Riss.`
      },
      {
        min_drift: 5,
        narrative: `Die Lichter flackern.

Und bleiben an.

Aber alles andere ist weg.

Keine Wände. Kein Boden. Keine Decke.

Du schwebst im weißen Nichts.

Der Zug ist eine Zeichnung auf Papier.

Und jemand radiert sie gerade aus.

Du siehst deine Hände verblassen.

„Noch nicht," sagt eine Stimme.

Ein Strich wird gezogen. Schwarz auf Weiß.

Er wird zu einer Tür.

Der Schaffner tritt hindurch.

Er besteht aus Tinte und Schatten.`
      }
    ],
    choices: [
      {
        id: 'wait_for_conductor',
        label: 'Warten',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c6_s18_offer'
      },
      {
        id: 'hold_tag19',
        label: 'Den Schlüsselanhänger fest umklammern',
        condition: {
          type: 'bool',
          target: 'has_tag19',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c6_s18_offer'
      }
    ],
    state_notes: [
      'Interlude: Totale Dunkelheit',
      'Schaffner nähert sich (Licht)',
      'Vorbereitung auf Angebot',
      'CONDITION: hold_tag19 nur bei has_tag19'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // SET-PIECE 3: Angebot (Teil 1 - Annäherung)
  // ==========================================================================

  'c6_s18_offer': {
    id: 'c6_s18_offer',
    chapter: 6,
    title: 'Das Angebot',
    narrative: `Der Schaffner steht vor dir.

Sein Gesicht ist… anders. Weicher. Fast… menschlich.

„Du hast viel gesehen," sagt er leise. „Viel verstanden."

Er setzt sich dir gegenüber. „Ich kann dir… etwas anbieten. Ein Angebot. Nur für dich."

Er beugt sich vor. „Du kannst gehen. Jetzt. An der nächsten Station. Mit allen Erinnerungen. Allen Antworten."

„Aber…" Seine Augen fixieren dich. „Du kannst niemals zurückkommen."

---

Der Schaffner lächelt. „Der Preis? Du musst alles dalassen. Alles, was du hier warst. Die Fahrt. Die Menschen. Die Entscheidungen."

„Alles wird… vergessen sein. Für alle anderen."

Er steht auf. „Aber du… du wirst dich erinnern. An alles."

„Die Frage ist:" Er dreht sich zur Tür.

„Willst du das? Erinnerung und Einsamkeit? Oder… Vergessen und Gemeinschaft?"`,
    choices: [
      {
        id: 'choose_memory_love',
        label: '„Ich will mich erinnern. Um ihretwillen."',
        weight: 'riskant',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 3 },
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c6_s20_offer_aftermath'
      },
      {
        id: 'choose_forget_escape',
        label: '„Ich will vergessen."',
        weight: 'riskant',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 3 }
        ],
        next: 'c6_s20_offer_aftermath'
      },
      {
        id: 'refuse_choice',
        label: '„Ich wähle weder das eine noch das andere."',
        weight: 'riskant',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c6_s20_offer_aftermath'
      },
      {
        id: 'accept_truth',
        label: '„Ich nehme die Erinnerung."',
        weight: 'riskant',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s20_offer_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece: Das Angebot (merged approach + choice)',
      'Conductor offers exit with memory vs staying with forgetting',
      'CONDITION: choose_memory_love (tickets_love >= 2)',
      'CONDITION: choose_forget_escape (tickets_escape >= 3)'
    ],
    tags: ['setup', 'reveal'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 3: Angebot (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c6_s20_offer_aftermath': {
    id: 'c6_s20_offer_aftermath',
    chapter: 6,
    title: 'Nach dem Angebot',
    narrative: `Der Schaffner nickt langsam.

„So sei es," sagt er.

„Deine Wahl ist getroffen."

Er geht zur Tür.

„Die nächste Station… ist die letzte."

„Für alle."

Er blickt zurück.

„Bereite dich vor."

Dann ist er weg.

Und du sitzt allein im Abteil.

Mit deiner Entscheidung.

Mit dem, was kommt.

Der Zug rattert weiter.

Aber du spürst:

Es ist fast vorbei.`,
    choices: [
      {
        id: 'prepare_for_end',
        label: 'Sich vorbereiten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c6_s21_final_reflection'
      },
      {
        id: 'doubt_choice',
        label: 'Die Wahl anzweifeln',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s21_final_reflection'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen Angebot',
      'Warnung: Letzte Station kommt',
      'Emotionale Vorbereitung'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Finale Reflexion
  // ==========================================================================

  'c6_s21_final_reflection': {
    id: 'c6_s21_final_reflection',
    chapter: 6,
    title: 'Reflexion',
    narrative: `Nachdem der Schaffner verschwunden ist, denkst du nach.

Über die Fahrt. Die Stationen. Die Menschen.

Comp7. Der Junge. Der Schlaflose.

Wo sind sie jetzt?

Ausgestiegen?

Oder… noch hier?

Irgendwo im Zug?

Du erinnerst dich an die Entscheidungen.

An die Kontrollen.

An Abteil 7.

An dein Spiegelbild.

An das Angebot.

Alles führte hierher.

Zu diesem Moment.

Zu dem, was jetzt kommt.

Bist du bereit?`,
    choices: [
      {
        id: 'feel_ready',
        label: '„Ja. Ich bin bereit."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c6_s21b_reflection_dialog'
      },
      {
        id: 'feel_uncertain',
        label: '„Ich weiß es nicht."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s21b_reflection_dialog'
      },
      {
        id: 'feel_afraid',
        label: '„Nein. Aber ich habe keine Wahl."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s21b_reflection_dialog'
      }
    ],
    state_notes: [
      'Finale Reflexion über die gesamte Reise',
      'Emotionale Vorbereitung auf Ending',
      'Callback zu allen wichtigen Momenten'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Reflexions-Dialog (ohne Endings-Einfluss)
  // ==========================================================================

  'c6_s21b_reflection_dialog': {
    id: 'c6_s21b_reflection_dialog',
    chapter: 6,
    title: 'Antwort an dich selbst',
    narrative: `Deine Stimme kommt erst als Flüstern zurück.

Dann klarer.

Als würdest du dir zum ersten Mal selbst zuhören.`,
    choices: [
      {
        id: 'choose_truth_voice',
        label: '„Ich will wissen, was wirklich war."',
        effects: [
          { type: 'set', target: 'empathie', value: 1 }
        ],
        next: 'c6_s21c_truth_voice'
      },
      {
        id: 'choose_mercy_voice',
        label: '„Ich will mir verzeihen können."',
        effects: [
          { type: 'set', target: 'empathie', value: 2 }
        ],
        next: 'c6_s21c_mercy_voice'
      },
      {
        id: 'choose_courage_voice',
        label: '„Ich gehe trotzdem weiter."',
        effects: [
          { type: 'set', target: 'empathie', value: 3 }
        ],
        next: 'c6_s21c_courage_voice'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Agency: kurzer Selbst-Dialog ohne zusätzliche Effects',
      'Alle Optionen rekombinieren in c6_s22_conductor_last'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Reaktion auf Wahrheits-Stimme
  // ==========================================================================

  'c6_s21c_truth_voice': {
    id: 'c6_s21c_truth_voice',
    chapter: 6,
    title: 'Ohne Ausweichung',
    narrative: `Die Worte bleiben im Raum, schwer und klar.

Nichts antwortet dir.

Aber in dir wird etwas still: keine Ausrede, kein Umweg, nur der nächste Schritt.`,
    choices: [
      {
        id: 'continue_after_truth_voice',
        label: 'Den nächsten Schritt nehmen',
        next: 'c6_s22_conductor_last'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Wahrheitsfokus',
      'Rekombination in c6_s22_conductor_last'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Reaktion auf Vergebungs-Stimme
  // ==========================================================================

  'c6_s21c_mercy_voice': {
    id: 'c6_s21c_mercy_voice',
    chapter: 6,
    title: 'Milde',
    narrative: `Dein Satz klingt fremd und tröstlich zugleich.

Für einen Herzschlag fühlt sich der Zug weniger wie ein Urteil an.

Wie ein Flur, durch den man gehen darf.`,
    choices: [
      {
        id: 'continue_after_mercy_voice',
        label: 'Weiter',
        next: 'c6_s22_conductor_last'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Vergebung/Milde',
      'Rekombination in c6_s22_conductor_last'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Reaktion auf Mut-Stimme
  // ==========================================================================

  'c6_s21c_courage_voice': {
    id: 'c6_s21c_courage_voice',
    chapter: 6,
    title: 'Trotzdem',
    narrative: `Der Satz ist härter als gedacht, aber er trägt.

Du spürst die Angst noch.

Nur steht sie nicht mehr vor dir, sondern neben dir.`,
    choices: [
      {
        id: 'continue_after_courage_voice',
        label: 'Mit der Angst weitergehen',
        next: 'c6_s22_conductor_last'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Mut trotz Angst',
      'Rekombination in c6_s22_conductor_last'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Letzter Schaffner-Moment
  // ==========================================================================

  'c6_s22_conductor_last': {
    id: 'c6_s22_conductor_last',
    chapter: 6,
    title: 'Letzte Begegnung',
    narrative: `Der Schaffner erscheint ein letztes Mal.

Diesmal wirkt er nicht bedrohlich. Nur müde. Fast traurig.

„Es ist Zeit," sagt er leise. „Die letzte Station."

Er hält dir etwas hin: deine Fahrkarte.

Du hattest sie vergessen.

Jetzt ist sie vollständig ausgefüllt, in deiner eigenen Handschrift.

„Du hast sie am Anfang selbst geschrieben," sagt er. „Erinnerst du dich?"

Du blickst auf die Karte.

Und langsam kommt die Erinnerung zurück.`,
    choices: [
      {
        id: 'remember_high_attention',
        label: 'Sich vollständig erinnern',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 3 },
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c6_s22b_reflection_callback'
      },
      {
        id: 'remember_partial',
        label: 'Teilweise erinnern',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c6_s22b_reflection_callback'
      },
      {
        id: 'resist_memory',
        label: 'Der Erinnerung widerstehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c6_s22b_reflection_callback'
      }
    ],
    state_notes: [
      'Letzter Schaffner-Moment',
      'CONDITION: remember_high_attention nur bei conductor_attention >= 4',
      'Fahrkarte als Erinnerungs-Trigger',
      'Wichtige Enthüllung'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // STANDARD: Später Callback auf Reflexions-Stimme
  // ==========================================================================

  'c6_s22b_reflection_callback': {
    id: 'c6_s22b_reflection_callback',
    chapter: 6,
    title: 'Innere Linie',
    narrative: `Die Erinnerung kippt zurück in die Gegenwart.

Und du merkst, dass ein Satz von eben noch in dir steht.`,
    narrative_variants: [
      {
        condition: {
          type: 'compare',
          target: 'empathie',
          operator: '==',
          value: 1
        },
        narrative: `Die Erinnerung kippt zurück in die Gegenwart.

Dein eigener Satz - „Ich will wissen" - wirkt plötzlich wie eine Linie auf den Boden gemalt.

Nicht tröstlich. Aber eindeutig.`
      },
      {
        condition: {
          type: 'compare',
          target: 'empathie',
          operator: '==',
          value: 2
        },
        narrative: `Die Erinnerung kippt zurück in die Gegenwart.

„Ich will mir verzeihen können" klingt nach, leise, aber beharrlich.

Zum ersten Mal fühlt sich der nächste Schritt nicht wie Strafe an.`
      },
      {
        condition: {
          type: 'compare',
          target: 'empathie',
          operator: '==',
          value: 3
        },
        narrative: `Die Erinnerung kippt zurück in die Gegenwart.

Der Mut-Satz von eben hält noch.

Die Angst ist nicht weg, aber sie nimmt dir nicht mehr die Richtung.`
      }
    ],
    choices: [
      {
        id: 'continue_to_platform_after_reflection_callback',
        label: 'Zum letzten Wagen weiter',
        next: 'c6_s23_platform_ahead'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Später Callback auf c6_s21b/c6_s21c',
      'empathie wird hier nur als Flavor-Flag genutzt',
      'Kein Einfluss auf Endings/Route'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // INTERLUDE 6: Zug verlangsamt
  // ==========================================================================

  'c6_s23_platform_ahead': {
    id: 'c6_s23_platform_ahead',
    chapter: 6,
    title: 'Der letzte Bahnsteig',
    narrative: `Der Zug wird langsamer. Spürbar langsamer.

Das Rattern wird leiser. Die Vibration lässt nach.

Dein Körper wird nach vorn gezogen. Du spürst ein Kribbeln in den Handflächen, als wäre die Luft elektrisch.

Das Licht draußen wird heller und kälter zugleich. Du lehnst dich vor, die Stirn fast am Glas.

Du spürst… etwas. Eine Veränderung in der Luft. In der Zeit. In allem.

---

Draußen erscheint ein Bahnsteig. Der letzte Bahnsteig.

Er ist… real. Nicht wie die anderen. Nicht verschwommen oder traumhaft. Real. Fest. Da.

Du siehst… Menschen. Schemen. Gestalten. Sie warten.

Auf dich? Auf den Zug?

Du erkennst niemanden. Aber… da ist ein Gefühl. Von Vertrautheit. Von… Heimkehr.

Oder von Ende. Oder beides.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_tag19', value: true },
        narrative: `Der Zug wird langsamer. Spürbar langsamer.

Der Schlüsselanhänger in deiner Hand erwacht. Ein Kribbeln, dann ein Vibrieren, das sich durch deinen ganzen Körper zieht.

Das Licht draußen wird heller. Du lehnst dich vor, die Stirn fast am Glas.

---

Draußen erscheint ein Bahnsteig. Der letzte Bahnsteig.

Der Anhänger vibriert jetzt mit einer solchen Intensität, dass er fast ein Geräusch macht – eine leise, summende Melodie.

Die Schemen und Gestalten auf dem Bahnsteig werden durch den Anhänger schärfer gezeichnet. Sein rhythmisches Pochen wirkt wie ein Herzschlag für die Welt da draußen.

Es ist nicht nur ein Bahnsteig. Es ist das Ende einer Reise, die viel zu lange gedauert hat.

Du spürst durch das Metall eine tiefe, unerschütterliche Vertrautheit. Ein Gefühl von Heimkehr, so stark, dass es die Tränen in deine Augen treibt.

Der Anhänger ist ruhig geworden jetzt. Eine sanfte, stetige Wärme.

Du bist bereit.`
      }
    ],
    choices: [
      {
        id: 'feel_hope',
        label: 'Hoffnung spüren',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c6_s25_final_moment'
      },
      {
        id: 'feel_fear',
        label: 'Angst spüren',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c6_s25_final_moment'
      },
      {
        id: 'feel_peace',
        label: 'Frieden spüren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c6_s25_final_moment'
      }
    ],
    state_notes: [
      'Transition: Train arrival at final station (merged s23 + s24)',
      'Train slows, platform appears - real this time',
      'Figures waiting, feeling of homecoming or ending'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // STANDARD: Letzter Moment vor Station
  // ==========================================================================

  'c6_s25_final_moment': {
    id: 'c6_s25_final_moment',
    chapter: 6,
    title: 'Letzter Moment',
    narrative: `Der Zug hält.

Vollständig.

Zum letzten Mal.

Die Türen… öffnen sich noch nicht.

Aber sie werden.

Jeden Moment.

Du stehst auf.

Deine Beine zittern leicht.

Nicht vor Schwäche.

Vor… Erwartung.

Du gehst zur Tür.

Legst die Hand auf den Griff.

Warm. Wie immer.

Aber diesmal… anders.

Endgültig.

Die Tür wird sich öffnen.

Und dann…

Dann ist es vorbei.

Die Fahrt.

Der Zug.

Alles.

Bist du bereit?`,
    choices: [
      {
        id: 'open_door',
        label: 'Die Tür öffnen',
        effects: [
          { type: 'inc', target: 'station_count', value: 1 }
        ],
        next: 'c6_end_station'
      },
      {
        id: 'hesitate_moment',
        label: 'Einen Moment zögern',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'station_count', value: 1 }
        ],
        next: 'c6_end_station'
      }
    ],
    state_notes: [
      'Letzter Moment vor dem Ende',
      'Emotionale Klimax',
      'Übergang zu Endstation',
      'CONDITION: hesitate_moment bei tickets_guilt >= 3'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // ENDING: Sechste Station
  // ==========================================================================

  'c6_end_station': {
    id: 'c6_end_station',
    chapter: 6,
    title: 'Sechste Station',
    narrative: `Du trittst hinaus.

Der Bahnsteig liegt vor dir.

Real. Fest. Unwiderruflich.

Du drehst dich um.

Der Zug steht noch da.

Die Türen offen.

Aber du weißt: Du kannst nicht zurück.

Nie wieder.

Du blickst auf das Schild am Bahnsteig.

Jetzt kannst du es lesen.

Deutlich. Klar.

Und was darauf steht…

Ist dein Name.

Dein richtiger Name.

Den du vergessen hattest.

Oder vergessen wolltest.

Die Gestalten am Bahnsteig bewegen sich.

Kommen näher.

Und du erkennst…

Dich selbst.

Alle Versionen von dir.

Die du warst.

Die du sein könntest.

Die du wurdest.

Aber… die Fahrt ist noch nicht zu Ende.

Es gibt noch eine Station.

Die letzte.

Die wahre Endstation.`,
    choices: [
      {
        id: 'continue_to_chapter_7',
        label: 'Weiter zur letzten Station',
        effects: [
          { type: 'set', target: 'chapter_index', value: 7 }
        ],
        next: 'c7_s01_final_approach'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'R1: Engine erhoeht memory_drift/station_count automatisch (keine manuellen station_end-Effects)',
      'Station-End: Übergang zu Kapitel 7',
      'Name auf Schild (Selbsterkenntnis)',
      'Versionen des Selbst erscheinen',
      'Noch eine letzte Station'
    ],
    atmosphere: 'mystic'
  }
};
