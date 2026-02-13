// ============================================================================
// NACHTZUG 19 - Kapitel 3: Wagen 7 (REDUCED / P1 FIX)
// ============================================================================
// Szenen (18):
// Entry: c3_s01_wagen7_locked, c3_s01c_door_pulse, c3_s01a_after_station, c3_s01b_boy_return
// Recorder: c3_s02_recorder_anomaly, c3_s02a_recorder_listening
// Drift: c3_s02b_corridor_shift, c3_s02c_door_shadow
// Wagen 7: c3_s03_wagen7_approach, c3_s03b_inside_comp7, c3_s03c_notebooks_explore
// Truth: c3_s04_comp7_truth
// Pre-Control: c3_s04b_third_announcement, c3_s04c_lights_cut, c3_control_02_approach
// Control: c3_control_02_question, c3_control_02_aftermath
// End: c3_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter3Scenes: ScenesCollection = {
  // ============================================================================
  // c3_s01_wagen7_locked: Einstieg (Merged)
  // ============================================================================
  'c3_s01_wagen7_locked': {
    id: 'c3_s01_wagen7_locked',
    chapter: 3,
    title: 'Verschlossen',
    narrative: `Du stehst vor einer Tür am Ende des Gangs. Auf der Tür ist eine 7 handgemalt. Verschlossen.

In deinem Kopf flackert ein Bild dieser Tür auf, aber sie ist offen.

Du lehnst die Stirn gegen das Holz; der Lack riecht süßlich. Als du dich umdrehst, wirkt der Gang unnatürlich lang.

Unter deiner Hand ist die Oberfläche nicht glatt. Feine Rillen, als hätte jemand die Zahl immer wieder nachgezogen, tiefer, verzweifelter. Du fährst mit dem Daumen darüber und spürst, wie der Lack an einer Stelle bricht.

Von hinten kommt kein Laut. Keine Schritte, kein Husten, kein Rascheln. Nur dieses leise Summen im Zugkörper, das sich anhört wie ein Satz, den du nicht mehr ganz verstehst.

Für einen Moment bist du sicher: Wenn du jetzt gehst, wird die Tür hinter dir anders aussehen, sobald du dich wieder umdrehst.`,
    choices: [
      {
        id: 'try_to_open',
        label: 'Daran rütteln',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s01c_door_pulse'
      },
      {
        id: 'knock_on_door',
        label: 'Anklopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01c_door_pulse'
      },
      {
        id: 'turn_around',
        label: 'Sich umsehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s01c_door_pulse'
      }
    ],
    tags: ['setup'],
    state_notes: ['Wagen 7 Barriere eingeführt'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // c3_s01c_door_pulse: Puls hinter der Tür (Interlude)
  // ==========================================================================
  'c3_s01c_door_pulse': {
    id: 'c3_s01c_door_pulse',
    chapter: 3,
    title: 'Puls',
    narrative: `Das Holz unter deiner Hand lebt. Ein leises Pochen, das nicht vom Zug stammt.

Aus dem Spalt der Tür weht Papiergeruch. Nicht frisch, eher wie alte Bücher nach Regen.

Der Impuls geht durch deinen Arm bis in den Brustkorb, als würde die Tür deinen Takt mitnehmen.

Dein Name liegt dir auf der Zunge, aber du schluckst ihn herunter.`,
    choices: [
      {
        id: 'keep_hand',
        label: 'Die Hand nicht wegziehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'step_back_door',
        label: 'Einen Schritt zurück',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor dem Gang'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s01a_after_station: Nach Station
  // ============================================================================
  'c3_s01a_after_station': {
    id: 'c3_s01a_after_station',
    chapter: 3,
    title: 'Nach dem Halt',
    narrative: `Der Zug gleitet lautlos weiter.

Der Schlaflose sitzt drei Reihen weiter hinten; seine Jacke ist jetzt tiefschwarz. In Comp7s leerem Abteil liegt ein Notizbuch.

Auf der Seite steht: „Passagier #[UNLESBAR]: Sucht nach Emma. Findet Wagen 7.“`,
    choices: [
      {
        id: 'read_notebook',
        label: 'Darin lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      },
      {
        id: 'ignore_notebook',
        label: 'Liegen lassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      }
    ],
    tags: ['drift_seed'],
    state_notes: ['Notizbuch Vorhersage'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01b_boy_return: Junge
  // ============================================================================
  'c3_s01b_boy_return': {
    id: 'c3_s01b_boy_return',
    chapter: 3,
    title: 'Rückkehr',
    narrative: `Der Junge sitzt wieder in seinem Abteil, als wäre er nie weg gewesen. Er hält den Kassettenrekorder.

Er summt leise. Eine Melodie, die du kennst. Oder... kanntest.

„Das hast du mir beigebracht," sagt er, ohne aufzublicken. „Als ich klein war. Erinnerst du dich?"

Er sieht dich an. Seine Augen sind älter als sein Gesicht.

„Manchmal werden Dinge mehr," sagt er. „Wenn man vergisst, dass man sie schon hat."

Er tippt mit dem Fingernagel auf die Kante des Rekorders. Eins, zwei, drei. Immer gleich. Als müsste er sich selbst an den Takt binden.

„Du glaubst, du sammelst Hinweise," sagt er, und seine Stimme bleibt dabei ruhig, fast sachlich. „Aber der Zug sammelt dich. Stück für Stück."

Zwischen euch liegt der Gang wie eine Grenze, die niemand eingezeichnet hat. Du merkst, dass du automatisch leiser atmest, als dürfte etwas hier nicht aufgeschreckt werden.`,
    choices: [
      {
        id: 'play_own_recorder',
        label: 'Eigenen Rekorder prüfen',
        condition: { type: 'bool', target: 'has_recorder', value: true },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'played_recorder', value: true }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'share_silence',
        label: 'Kurz mit ihm schweigen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'listen_to_his',
        label: '„Was meinst du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Duplizierung von Gegenständen'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s02_recorder_anomaly: Aufnahme
  // ============================================================================
  'c3_s02_recorder_anomaly': {
    id: 'c3_s02_recorder_anomaly',
    chapter: 3,
    title: 'Die Aufnahme',
    narrative: `Nach einem langen Moment des Schweigens drückst du auf Play.

Eine Stimme schält sich aus dem Rauschen – es ist deine eigene. Du hörst Dinge, die du noch nicht ausgesprochen hast.

Der Junge nickt langsam: „Der Zug zeichnet alles auf. Vergangenheit und Zukunft.“

Im Hintergrund der Aufnahme läuft ein zweiter Klang mit: metallische Schläge, weit weg, in einem Rhythmus, der an Kontrollen erinnert. Dann ein kurzes Lachen, das abrupt endet, als hätte jemand den Ton mit einer Schere abgeschnitten.

Deine aufgezeichnete Stimme klingt nicht nur älter. Sie klingt entschlossener, härter, als hätte sie bereits akzeptiert, was du noch abwehrst.

Du spürst Gänsehaut an den Unterarmen. Nicht wegen der Kälte, sondern wegen der Präzision. Diese Sätze sind nicht vage Erinnerungen. Sie sind Botschaften, hinterlassen von einer Version von dir, die wusste, dass du hier stehen würdest.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_recorder', value: false },
        narrative: `Nach eurem Schweigen drückt der Junge auf Play.

Eine Stimme schält sich aus dem Rauschen – es ist deine eigene. Du hörst Dinge, die du noch nicht ausgesprochen hast.

Der Junge nickt langsam: „Der Zug zeichnet alles auf. Vergangenheit und Zukunft.“`
      }
    ],
    choices: [
      {
        id: 'listen_more',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s02a_recorder_listening'
      },
      {
        id: 'stop_recorder',
        label: 'Stoppen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Kassette ist Meta-Log'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s02a_recorder_listening: Aufnahme Fortsetzung
  // ============================================================================
  'c3_s02a_recorder_listening': {
    id: 'c3_s02a_recorder_listening',
    chapter: 3,
    title: 'Zukunft',
    narrative: `Comp7s Stimme auf dem Band: „Er muss etwas geben. Etwas von sich abspalten.“

Dann ein Geräusch wie brechendes Eis.

Der Junge nimmt dir das Gerät sanft aus der Hand: „Manche Antworten stehen noch nicht drauf.“

Das Band läuft noch einen halben Atemzug weiter und zieht ein langes, dünnes Pfeifen hinter sich her, als würde sich ein Satz dagegen wehren zu enden.

Du spürst plötzlich die Stelle an deiner Handfläche, an der der Rekorder eben lag. Warm. Zu warm für kaltes Metall.

Der Junge hält das Gerät jetzt fest an seine Brust gedrückt. Nicht besitzergreifend, eher schützend. Als würde es nicht nur dich, sondern auch ihn verletzen, wenn es zu lange offenbleibt.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_recorder', value: false },
        narrative: `Comp7s Stimme auf dem Band: „Er muss etwas geben. Etwas von sich abspalten.“

Dann ein Geräusch wie brechendes Eis.

Der Junge hält den Rekorder fest, als würde er ihn vor dir schützen: „Manche Antworten stehen noch nicht drauf."

Im Lautsprecher knackt es noch einmal, und du bist sicher, dass da kurz dein eigener Atem zu hören ist, viel schneller als jetzt.

Du willst nach dem Gerät greifen, aber deine Hand stoppt in der Luft, als hätte der Satz auf dem Band dir eine Grenze markiert.

Der Junge schüttelt kaum merklich den Kopf. Kein Verbot, eher eine Warnung, die er selbst schon zu oft ignoriert hat.`
      }
    ],
    choices: [
      {
        id: 'ask_what_answer',
        label: '„Welche Antwort?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'has_recorder', value: false }
        ],
        next: 'c3_s02b_corridor_shift'
      },
      {
        id: 'take_recorder_back',
        label: 'Gerät zurücknehmen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'set', target: 'has_recorder', value: true }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Prophezeiung der Opferung'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s02b_corridor_shift: Gang & Schlafloser (Merged)
  // ============================================================================
  'c3_s02b_corridor_shift': {
    id: 'c3_s02b_corridor_shift',
    chapter: 3,
    title: 'Verschiebung',
    narrative: `Der Gang hat sich verändert. Türennummern stimmen nicht mehr.

Der Schlaflose steht im Gang. Er wirkt blass.

„Du suchst Wagen 7,“ sagt er. „Die Tür ist jetzt offen. Aber du musst etwas opfern, wenn die Kontrolle kommt.“`,
    choices: [
      {
        id: 'ask_what_to_give',
        label: '„Was opfern?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_s02c_door_shadow'
      },
      {
        id: 'ignore_warning',
        label: 'Ignorieren und weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s02c_door_shadow'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Raum-Reorganisation'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // c3_s02c_door_shadow: Schatten vor Wagen 7 (Interlude)
  // ==========================================================================
  'c3_s02c_door_shadow': {
    id: 'c3_s02c_door_shadow',
    chapter: 3,
    title: 'Schatten',
    narrative: `Vor der Tür mit der 7 liegt ein Schatten, der sich gegen das Licht bewegt.

Du hörst einen Bleistift über Papier kratzen. Dann Stille.

Im Fensterglas daneben siehst du deinen eigenen Schatten einen Herzschlag zu spät.

Der Zug wankt leicht, als würde er sich entscheiden.`,
    choices: [
      {
        id: 'knock_softly',
        label: 'Leise anklopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      },
      {
        id: 'wait_shadow',
        label: 'Warten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Wagen 7'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03_wagen7_approach: Annäherung (Merged Door)
  // ============================================================================
  'c3_s03_wagen7_approach': {
    id: 'c3_s03_wagen7_approach',
    chapter: 3,
    title: 'Die Sieben',
    narrative: `Der Gang endet an der Tür mit der massiven 7.

Die Zahl flimmert. Die Tür ist einen Spaltbreit angelehnt. Warmes Licht. Geruch nach Papier.

Du hörst Comp7s Stimme: „Komm rein. Ich weiß, dass du da bist.“

Der Türspalt atmet warm gegen dein Gesicht, als wäre dahinter kein Raum, sondern ein lebender Körper. Du siehst Staub im Licht schweben, langsam, in Spiralen, als würde die Zeit dort drinnen in einem anderen Tempo laufen.

Deine Hand liegt auf der Klinke, ohne dass du dich erinnerst, sie gehoben zu haben. Für einen winzigen Moment hörst du aus dem Raum ein leises Blättern, so regelmäßig wie Regen.

Es fühlt sich nicht an wie ein Eintritt. Eher wie ein Wiederbetreten.`,
    choices: [
      {
        id: 'enter_immediately',
        label: 'Eintreten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      },
      {
        id: 'hesitate',
        label: 'Zögern',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      }
    ],
    tags: ['setup'],
    state_notes: ['Wagen 7 Eintritt'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03b_inside_comp7: Drinnen (Merged)
  // ============================================================================
  'c3_s03b_inside_comp7': {
    id: 'c3_s03b_inside_comp7',
    chapter: 3,
    title: 'Wagen 7',
    narrative: `Das Abteil ist eine Kathedrale aus Notizbüchern. Der Raum ist innen größer als der ganze Wagen.

Comp7 sitzt an einem massiven Holztisch und schreibt. Ihr Gesicht ist klarer geworden, eine feine Narbe am Kinn.

„Willkommen," sagt sie. „Du bist spät. Oder zu früh."

Du siehst die Verzweiflung in ihren Augen. „Ich schreibe," sagt sie, ohne dass du fragst. „Jeden Tag. Jede Fahrt. Weil ich vergesse. Die Schleife löscht mich. Wenn ich nicht schreibe..." Sie stockt. „Dann bin ich nichts. Ich war mal real. Glaube ich."

Über euch hängen Zettel an Bindfäden, hunderte kleine Marker, jeder mit Datum, Uhrzeit, Wagen-Nummer. Manche sind durchgestrichen, manche doppelt markiert, einige nur mit einem Fragezeichen versehen.

Comp7 folgt deinem Blick und nickt knapp. „Versionen. Nicht Wahrheiten."

Sie zieht ein Heft aus dem Stapel und schlägt es auf. Auf der ersten Seite steht in dicker Schrift: "WENN DU DAS LIEST, BIST DU NICHT ZUM ERSTEN MAL HIER."

Der Satz trifft dich nicht wie eine Enthüllung. Er trifft dich wie eine Erinnerung, die zu spät ankommt.`,
    choices: [
      {
        id: 'ask_comp7_explain',
        label: '„Was ist das hier?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s03c_notebooks_explore'
      },
      {
        id: 'touch_table',
        label: 'Ehrfürchtig den Tisch berühren',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s03c_notebooks_explore'
      },
      {
        id: 'examine_notebooks',
        label: 'Die Bücher ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03c_notebooks_explore'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Raum-Eindruck & Dialog'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03c_notebooks_explore: Notizbücher
  // ============================================================================
  'c3_s03c_notebooks_explore': {
    id: 'c3_s03c_notebooks_explore',
    chapter: 3,
    title: 'Aufzeichnungen',
    narrative: `Du blätterst in den Aufzeichnungen: „Passagier #7: Opferung abgelehnt. Bleibt.“

Ein Foto zeigt den Bahnsteig. Du erkennst deine eigene Kleidung, aber das Gesicht ist leer.

„Du bist schon mal hier gewesen,“ flüstert Comp7.

Du blätterst weiter. Seite um Seite taucht dieselbe Handschrift auf, aber der Ton verändert sich. Erst präzise, dann hektischer, dann an manchen Stellen nur noch Pfeile, Kästen, Ausrufezeichen.

Auf einer Seite stehen drei Wörter nebeneinander: "WAHRHEIT", "FLUCHT", "BINDUNG". Darunter: "ALLE FÜHREN ZUR KONTROLLE".

In der Falz des Hefts steckt ein abgerissener Fahrkartenabschnitt. Das Datum fehlt. Nur die Zahl 19 ist noch lesbar.

Du merkst, wie still du geworden bist. Nicht aus Ruhe, sondern aus Angst, die nächste Seite könnte etwas enthalten, das du nicht mehr zurücknehmen kannst.`,
    choices: [
      {
        id: 'examine_photo',
        label: 'Foto fixieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'photo_anomaly', value: true }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'ask_when',
        label: '„Wann?"',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Loop Beweis'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s04_comp7_truth: Wahrheit & Paradox (Merged)
  // ============================================================================
  'c3_s04_comp7_truth': {
    id: 'c3_s04_comp7_truth',
    chapter: 3,
    title: 'Die Schleife',
    narrative: `„Der NACHTZUG 19 fährt im Kreis,“ sagt sie. „Von A nach A. Weil jemand nicht aussteigen will.“

Sie zeigt aus dem Fenster. Dort, im Gang des Zuges, stehst du selbst und starrst zurück in dieses Abteil. Deine Jacke hat eine andere Farbe.

„Schleife,“ sagt Comp7. „Innen ist außen.“

Dein Doppelgänger draußen hebt die Hand, eine ruhige, fast freundliche Geste. Du reagierst nicht, aber er senkt die Hand trotzdem, als hätte er deine Antwort bereits erwartet.

„Jede Runde verschiebt etwas," sagt Comp7. „Ein Detail. Ein Satz. Eine Entscheidung. Irgendwann passt nichts mehr zusammen, außer dem Schmerz."

Sie tippt auf die Scheibe. „Der Trick ist nicht, alles zu erinnern. Der Trick ist, das Richtige nicht loszulassen."

Zum ersten Mal klingt ihre Stimme nicht nur kühl. Sie klingt müde. Und hoffnungsvoll genug, dass es dich mehr erschreckt als der Blick deines Doppelgängers.`,
    choices: [
      {
        id: 'accept_truth',
        label: 'Verstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'deny_truth',
        label: '„Unmöglich."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'ask_who_stays',
        label: '„Wer will nicht aussteigen?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Schleifen-Enthüllung & Paradox'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s04b_third_announcement: Durchsage 3
  // ============================================================================
  'c3_s04b_third_announcement': {
    id: 'c3_s04b_third_announcement',
    chapter: 3,
    title: 'Ankündigung',
    narrative: `Die Lautsprecher kreischen: „Kontrolle-Kontrolle-Kontrolle!"

Comp7 steht auf, Hände zitternd. „Sie kommen wieder. Du brauchst die richtige Antwort."

Schwere Schritte.

Das Licht im Abteil pulsiert im Takt der Schritte, als hätte der Zug einen eigenen Herzschlag. Zwischen zwei Impulsen ist es so still, dass ihr beide den Atem des anderen hört.

Comp7 zieht den Ärmel über ihr Handgelenk. Dort verlaufen dünne Linien aus Tinte, alte Notizen direkt auf der Haut. Manche sind verwischt, als hätte sie versucht, sie abzuwaschen und es dann bereut.

„Egal, was du sagst," murmelt sie, „sie hören immer auch, was du verschweigst."

Dann richtet sie sich auf, schiebt das Zittern beiseite und nickt zur Tür. Es ist kein Mut. Es ist Routine, die wie Mut aussieht.`,
    narrative_variants: [
      {
        condition: { type: 'compare', target: 'tickets_truth', operator: '>=', value: 4 },
        narrative: `Die Lautsprecher kreischen: „Kontrolle-Kontrolle-Kontrolle!"

Die Schleife. Du hast sie verstanden — oder zumindest akzeptiert. Und jetzt, wo du weißt, dass der Zug im Kreis fährt, fühlt sich die Kontrolle anders an. Nicht wie eine Prüfung. Wie ein Test, ob du bereit bist, aus dem Kreis auszubrechen.

Comp7 steht auf. Ihre Hände zittern, aber sie sieht dich an — direkt, zum ersten Mal ohne Ausweichen. „Du hast verstanden. Das macht die nächste Kontrolle gefährlicher. Sie merken es, wenn jemand aufwacht."

Schwere Schritte. Näher.`
      },
      {
        condition: { type: 'compare', target: 'tickets_escape', operator: '>=', value: 3 },
        narrative: `Die Lautsprecher kreischen: „Kontrolle-Kontrolle-Kontrolle!"

Du hast abgelehnt. Unmöglich — das hast du gesagt. Aber das Bild bleibt: du selbst, im Gang, mit einer anderen Jacke. Dein eigenes Gesicht, das zurückstarrt.

Comp7 steht auf. Sie sieht dich an, fast mitleidig. „Du glaubst mir nicht. Das ist in Ordnung. Die Kontrolle kommt trotzdem."

Schwere Schritte.`
      }
    ],
    choices: [
      {
        id: 'go_to_control',
        label: 'Rausgehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s04c_lights_cut'
      },
      {
        id: 'hide_in_comp7',
        label: 'Verstecken',
        condition: { type: 'compare', target: 'conductor_attention', operator: '<', value: 2 },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s04c_lights_cut'
      }
    ],
    tags: [],
    state_notes: ['Kontrolle 2 Vorbereitung'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // c3_s04c_lights_cut: Lichtausfall (Interlude)
  // ==========================================================================
  'c3_s04c_lights_cut': {
    id: 'c3_s04c_lights_cut',
    chapter: 3,
    title: 'Aus',
    narrative: `Das Licht geht aus. Komplett.

Du hörst Schritte, aber du kannst nicht sagen, aus welcher Richtung.

Als das Licht zurückkommt, steht die Tür von Abteil 7 einen Spalt weiter offen.

Der dunkle Moment war zu lang für einen normalen Stromausfall und zu kurz für echte Orientierungslosigkeit. Gerade lang genug, damit dein Kopf beginnt, eigene Bilder dazwischenzusetzen.

Du glaubst, im Schwarz jemanden dicht an deinem Ohr atmen gehört zu haben. Vielleicht nur dein eigenes Blutrauschen. Vielleicht nicht.

An der Wand leuchtet noch ein Nachbild der Neonröhre, ein blasser Streifen, der langsam verblasst. Während er schwindet, wirkt der Gang schmaler, als würde er sich um euch schließen.

Du spürst, wie sehr du dich nach einem klaren Geräusch sehnst: einem Schritt von links nach rechts, einer Tür, die eindeutig auf- oder zugeht. Stattdessen nur dieses diffuse Nah-Sein von etwas, das du nicht siehst.`,
    choices: [
      {
        id: 'step_forward_light',
        label: 'Einen Schritt nach vorn',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'hold_position',
        label: 'Nicht bewegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_control_02_approach'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Kontrolle 2'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_control_02_approach: Annäherung
  // ============================================================================
  'c3_control_02_approach': {
    id: 'c3_control_02_approach',
    chapter: 3,
    title: 'Die Ankunft',
    narrative: `Der Schaffner steht vor der Tür. Seine Uniform unnatürlich weiß.

Er schaut direkt zu dir: „Fahrkarten bitte.“

Das Weiß seiner Jacke wirkt nicht wie Stofffarbe, sondern wie überbelichtetes Licht, zu sauber für diesen Zug. An den Nähten ist kein Staub, kein Faden, nichts, das menschliche Nutzung verraten würde.

Er hebt die Kelle nur minimal. Die Bewegung ist präzise, fast mathematisch, als wäre sie tausendmal einstudiert und nie variiert worden.

Hinter ihm bleibt der Gang leer, aber der Zugboden unter deinen Schuhen vibriert stärker, als würde der gesamte Wagen auf seine nächste Frage warten.

Comp7 ist einen Schritt hinter dir. Du hörst sie nicht sprechen. Du spürst nur ihre Präsenz wie eine Hand im Rücken: kein Drücken, nur ein stilles Nicht-allein.

Der Schaffner neigt den Kopf minimal. Nicht freundlich, nicht neugierig. Eher wie ein Messinstrument, das einen Wert bestätigt.

Dir wird klar, dass er keine Überraschungen mag. Jede unerwartete Regung, jedes zu schnelle Wort, jeder Blick zur Seite wird hier als Abweichung gelesen.

Du ziehst die Schultern bewusst tiefer, als könnte Haltung zu einer Sprache werden, die er akzeptiert.

Im Augenwinkel siehst du die Kante von Abteil 7. Der Spalt ist noch offen. Gerade genug, um dir zu zeigen, dass es einen Ort hinter dir gibt, der nicht Prüfung ist.`,
    choices: [
      {
        id: 'step_outside',
        label: 'Hinaustreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'trust_comp7',
        label: 'Bei Comp7 bleiben',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_control_02_question'
      }
    ],
    tags: ['control'],
    state_notes: ['Schaffner Präsenz'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_question: Befragung (Merged & Fixed)
  // ============================================================================
  'c3_control_02_question': {
    id: 'c3_control_02_question',
    chapter: 3,
    title: 'Das Verhör',
    narrative: `Auf seiner Kelle steht: „Passagier ohne Ticket. Station 3.“

„Warum sind Sie hier?"

Er deutet auf deine Tasche. „Mit der Wahrheit. Mit dem Gerät. Oder mit jemandem.“

Du musst jetzt etwas geben.

Sein Blick bleibt an deinem Gesicht hängen, aber du hast das Gefühl, dass er nicht dich ansieht, sondern die Spuren der letzten Entscheidungen auf dir liest: die zu schnelle Atmung, die verkrampfte Schulter, den kurzen Zögerer vor jedem Wort.

Hinter ihm ist der Gang leer. Nicht menschenleer. Bedeutungsleer. Als hätte der Zug den Hintergrund entfernt, damit nur noch Frage und Antwort übrig bleiben.

Dir wird klar, dass die Kontrolle kein Dialog ist. Sie ist ein Vertrag. Und jede Option hier hat einen Preis, den du erst später exakt verstehst.`,
    choices: [
      {
        id: 'offer_recorder',
        label: 'Rekorder geben',
        condition: { type: 'bool', target: 'has_recorder', value: true },
        effects: [
          { type: 'set', target: 'has_recorder', value: false },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_truth',
        label: '„Ich will zurück."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_search',
        label: '„Ich suche Emma."',
        condition: { type: 'bool', target: 'memory_search_active', value: true },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
        ],
        next: 'c3_control_02_aftermath'
      }
    ],
    tags: ['control'],
    state_notes: [
      'Opfer-Wahl',
      'Added Agency "Search"'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_aftermath: Nachwirkung
  // ============================================================================
  'c3_control_02_aftermath': {
    id: 'c3_control_02_aftermath',
    chapter: 3,
    title: 'Das Urteil',
    narrative: `„Die Antwort ist notiert,“ sagt er monoton. „Aber sie reicht nicht.“

Er geht.

Comp7 tritt neben dich: „Er kann dich nicht rauswerfen, weil wir alle bereits draußen sind.“

Der Wagen um euch herum wird plötzlich leer. Kein Junge, kein Schlafloser. Nur leere Sitze.

Die Polster tragen noch Druckstellen, als wären die anderen nur eben aufgestanden. Ein Becher rollt langsam über den Boden und kippt dann ohne Geräusch um.

Comp7 fährt sich mit zwei Fingern über die Stirn. „Das ist das Schlimmste an den Kontrollen," sagt sie. „Nicht die Fragen. Das Danach. Wenn du nicht mehr sicher bist, wer eben noch hier war."

Du schaust in die Fenster. Für einen Moment siehst du euch doppelt, leicht versetzt, wie zwei übereinandergelegte Filmstreifen.

Der Effekt verschwindet sofort wieder. Das Gefühl bleibt.

Am Ende des Wagens flackert eine Reserviert-Anzeige auf und erlischt wieder, immer derselbe Name, zu schnell zum Lesen. Comp7 folgt deinem Blick, sagt aber nichts.

Zwischen euch hängt der Satz des Schaffners nach wie kalter Dampf. Notiert, aber nicht genug.

Du begreifst langsam, dass dieses "nicht genug" nicht nur eine Drohung ist. Es ist ein Prinzip dieses Ortes.

Comp7 hebt ein leeres Blatt vom Tisch, betrachtet es kurz und legt es dann wieder hin, unbeschrieben. „Manchmal ist das alles, was übrig bleibt," sagt sie. „Ein Platz, an dem etwas hätte stehen sollen."

Du hörst dich selbst ausatmen, lang und unruhig. In der Ausatmung steckt Wut, Erleichterung, Scham, alles gleichzeitig.

Der Zug fährt weiter, als wäre nichts passiert. Genau das macht es schwer zu ertragen.`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'search_train',
        label: 'Nach den anderen suchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_end_station'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Kontrolle 2 überstanden'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_station: Ende (Merged)
  // ============================================================================
  'c3_end_station': {
    id: 'c3_end_station',
    chapter: 3,
    title: 'Dritter Halt',
    narrative: `Der Zug hält. Draußen steht eine Gestalt im Mantel. Sie sieht aus wie du.

Die Tür öffnet sich, die Gestalt steigt ein, geht wortlos an dir vorbei und setzt sich.

„Die Aufnahme ist fertig,“ sagt der Junge, der plötzlich wieder da ist. Er wirkt älter als eben.

Niemand im Wagen reagiert auf die Gestalt. Kein Blick, kein Zucken. Nur du folgst ihr mit den Augen, bis sie still nach draußen schaut, als warte sie auf deinen nächsten Fehler.

Der Junge hält den Rekorder mit beiden Händen, fast feierlich. „Nächste Spur," sagt er. „Wird lauter."

Draußen zeigt die Uhr wieder dieselbe Zeit, aber die Sekunden laufen rückwärts. Langsam. Sichtbar.

Du weißt nicht, ob du aufstehst, weil du willst, oder weil die Schleife dich wieder in Position bringt.

Die Gestalt mit deinem Gesicht legt den Kopf schräg, als lausche sie auf etwas, das nur sie hört. Genau dann zieht der Zug wieder an.

Im Fenster spiegelt sich dein Profil neben ihrem. Zwei Linien, fast deckungsgleich, aber nicht ganz.

Der Junge schiebt dir den Rekorder nicht zu. Er hält ihn fest. „Diesmal passt du besser auf," sagt er, nicht vorwurfsvoll, nur müde.

Als der Halt hinter euch verschwindet, fühlt es sich nicht wie ein Ende an, sondern wie eine Tür, die hinter dir verriegelt.

Die Gestalt zieht einen zerrissenen Fahrkartenschnipsel aus der Tasche, betrachtet ihn lange und steckt ihn wieder ein, ohne dich anzusehen.

„Man wird nicht auf einmal alt hier," murmelt der Junge. „Man wird in Schichten alt."

Du willst fragen, wie viele Schichten er schon trägt, aber die Frage bleibt in deiner Kehle stecken.

Im nächsten Tunnel verschluckt das Dunkel alle Spiegelungen. Für einen Moment gibt es nur Räder, Herzschlag, Takt.

Als das Licht zurückkommt, weißt du: Ab jetzt wird jedes Detail teurer.

Du legst die Stirn an das kalte Fenster und zählst Schienenstöße. Eins. Zwei. Drei.

Beim vierten fängst du wieder bei eins an.

Und trotzdem gehst du weiter, weil Stillstand hier nur eine andere Form von Wiederholung ist.`,
    choices: [
      {
        id: 'continue_to_chapter_4',
        label: 'Die Aufnahme akzeptieren',
        effects: [
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c3_end_station_sideword'
      }
    ],
    tags: ['station_end'],
    state_notes: ['Identity Drift: Doppelgänger'],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_end_station_sideword: Kleiner Neben-Dialog ohne globales Gewicht
  // ============================================================================
  'c3_end_station_sideword': {
    id: 'c3_end_station_sideword',
    chapter: 3,
    title: 'Ein kurzer Ton',
    narrative: `Der Junge hält den Rekorder weiter fest und hebt kurz das Kinn.

„Eine Sache noch," sagt er. „Nur für den Ton. Welche Spur soll ich als Nächstes suchen?"

Er klingt sachlich, aber seine Finger bleiben angespannt um das Gehäuse, als erwartete er eine Antwort, die ihm den Boden gibt.`,
    choices: [
      {
        id: 'sideword_anchor',
        label: '„Die mit den stillen Stellen."',
        next: 'c3_end_station_sideword_anchor'
      },
      {
        id: 'sideword_direct',
        label: '„Die, die weh tut."',
        next: 'c3_end_station_sideword_direct'
      },
      {
        id: 'sideword_dodge',
        label: '„Überrasch mich."',
        next: 'c3_end_station_sideword_dodge'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog: reine Tonwahl',
      'Alle Optionen rekombinieren direkt vor Kapitel 4'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_station_sideword_anchor: Reaktion 1
  // ============================================================================
  'c3_end_station_sideword_anchor': {
    id: 'c3_end_station_sideword_anchor',
    chapter: 3,
    title: 'Stille als Spur',
    narrative: `Der Junge nickt langsam. „Gut. Die stillen Stellen lügen am wenigsten."

Er tippt zweimal auf den Rekorder, als markiere er genau diese Lücke.`,
    choices: [
      {
        id: 'continue_from_sideword_anchor',
        label: 'Weiter',
        next: 'c4_s01_mirror_intro'
      }
    ],
    tags: ['interlude'],
    state_notes: ['Neben-Dialog-Reaktion ohne Systemwirkung'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_station_sideword_direct: Reaktion 2
  // ============================================================================
  'c3_end_station_sideword_direct': {
    id: 'c3_end_station_sideword_direct',
    chapter: 3,
    title: 'Schmerzspur',
    narrative: `Er verzieht kurz den Mund, eher zustimmend als überrascht. „Dann schlafen wir heute nicht."

Er sagt es ohne Drama, nur mit der Müdigkeit von jemandem, der das schon kennt.`,
    choices: [
      {
        id: 'continue_from_sideword_direct',
        label: 'Weiter',
        next: 'c4_s01_mirror_intro'
      }
    ],
    tags: ['interlude'],
    state_notes: ['Neben-Dialog-Reaktion ohne Systemwirkung'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_station_sideword_dodge: Reaktion 3
  // ============================================================================
  'c3_end_station_sideword_dodge': {
    id: 'c3_end_station_sideword_dodge',
    chapter: 3,
    title: 'Offene Spur',
    narrative: `Der Junge schnaubt leise. „Überraschungen kann der Zug. Ich versuche nur mitzuschreiben."

Trotzdem hält er das Gerät fester, als hätte er Angst vor genau dieser Antwort.`,
    choices: [
      {
        id: 'continue_from_sideword_dodge',
        label: 'Weiter',
        next: 'c4_s01_mirror_intro'
      }
    ],
    tags: ['interlude'],
    state_notes: ['Neben-Dialog-Reaktion ohne Systemwirkung'],
    atmosphere: 'somber'
  }
};
