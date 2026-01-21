// ============================================================================
// NACHTZUG 19 - Kapitel 3: Wagen 7
// ============================================================================
// Szenen (31):
// Entry: c3_s01_wagen7_locked, c3_s01_wagen7_locked_b, c3_s01a_after_station, c3_s01b_boy_return
// Interludes: c3_interlude_01_lights, c3_interlude_02_announcement, c3_interlude_03_window, c3_interlude_04_corridor, c3_interlude_05_mirror
// Recorder: c3_s02_recorder_anomaly, c3_s02a_recorder_listening, c3_s02b_corridor_shift, c3_s02c_sleepless_talk
// Wagen 7: c3_s03_wagen7_approach, c3_s03a_compartment7_door, c3_s03b_inside_comp7, c3_s03b_inside_comp7_b, c3_s03c_notebooks_explore
// Truth: c3_s04_comp7_truth, c3_s04_comp7_truth_b, c3_s04a_paradox_window, c3_s04b_third_announcement
// Kontrolle 2: c3_control_02_approach, c3_control_02_question, c3_control_02_question_b, c3_control_02_aftermath
// Pre-End: c3_s06_passengers_vanish, c3_s06a_drift_intensifies, c3_s06b_boy_final
// End: c3_end_platform_watch, c3_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter3Scenes: ScenesCollection = {
  // ============================================================================
  // c3_s01_wagen7_locked: Einstieg (Beat 1: Die Barriere)
  // ============================================================================
  'c3_s01_wagen7_locked': {
    id: 'c3_s01_wagen7_locked',
    chapter: 3,
    title: 'Verschlossen',
    narrative: `Du stehst vor einer Tür am Ende des Gangs. (Hook)

Auf der Tür ist eine 7 handgemalt, mit kleinen, präzisen Strichen. Der Griff ist eiskaltes Metall und lässt sich keinen Millimeter drehen. (Detail)

Die Tür ist verschlossen und rührt sich nicht. (Konsequenz)

Du erinnerst dich nicht, sie gesucht zu haben – aber du bist sicher, dass du hier sein musst.`,
    choices: [
      {
        id: 'try_to_open',
        label: 'Daran rütteln',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s01_wagen7_locked_b'
      },
      {
        id: 'knock_on_door',
        label: 'Anklopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01_wagen7_locked_b'
      }
    ],
    tags: ['setup'],
    state_notes: ['Wagen 7 Barriere eingeführt'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01_wagen7_locked_b: Einstieg (Beat 2: Das Bild)
  // ============================================================================
  'c3_s01_wagen7_locked_b': {
    id: 'c3_s01_wagen7_locked_b',
    chapter: 3,
    title: 'Erinnerung',
    narrative: `In deinem Kopf flackert plötzlich ein Bild dieser Tür auf, aber sie ist offen. (Hook)

Du lehnst die Stirn gegen das Holz; der Lack riecht süßlich, fast frisch. Als du dich umdrehst, wirkt der Gang unnatürlich lang, als würde die Notbeleuchtung im Boden kein Ende finden. (Detail)

Ein leises Atmen scheint aus den Wänden zu kommen. (Konsequenz)`,
    choices: [
      {
        id: 'wait_at_door',
        label: 'Warten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'turn_around',
        label: 'Sich umsehen',
        effects: [],
        next: 'c3_s01a_after_station'
      }
    ],
    tags: ['drift_seed'],
    state_notes: ['Raumanomalie deutet sich an'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01a_after_station: Nach Station
  // ============================================================================
  'c3_s01a_after_station': {
    id: 'c3_s01a_after_station',
    chapter: 3,
    title: 'Nach dem Halt',
    narrative: `Der Zug gleitet lautlos weiter in die Nacht. (Hook)

Der Schlaflose sitzt drei Reihen weiter hinten als zuvor; seine Jacke ist jetzt tiefschwarz. In Comp7s leerem Abteil liegt ein Notizbuch, dessen Seiten im Luftzug wild zittern. (Detail)

Auf der Seite steht: „Passagier #[UNLESBAR]: Sucht nach Jungen. Findet Wagen 7.“ (Konsequenz)`,
    choices: [
      {
        id: 'take_notebook',
        label: 'Buch nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_interlude_01_lights'
      },
      {
        id: 'read_notebook',
        label: 'Darin lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      }
    ],
    tags: ['drift_seed'],
    state_notes: ['Notizbuch Vorhersage'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_interlude_01_lights: Lichter
  // ============================================================================
  'c3_interlude_01_lights': {
    id: 'c3_interlude_01_lights',
    chapter: 3,
    title: 'Lichter',
    narrative: `Die Neonröhren flackern in einem neuen, hektischen Rhythmus. (Hook)

Jedes Mal, wenn das Licht zurückkehrt, hat sich ein Detail im Gang verschoben: Ein Schatten zu viel, eine Tür zu wenig. Dein eigener Schatten hinkt dir hinterher, als wäre er eine eigenständige Person. (Detail)

Die Orientierung gleitet dir durch die Finger. (Konsequenz)`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Identity Drift Schatten'],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s01b_boy_return: Junge
  // ============================================================================
  'c3_s01b_boy_return': {
    id: 'c3_s01b_boy_return',
    chapter: 3,
    title: 'Rückkehr',
    narrative: `Der Junge sitzt wieder in seinem Abteil, als wäre er nie weg gewesen. (Hook)

Er hält den gleichen Kassettenrekorder in den Händen, den er dir gegeben hat. Du greifst in deine Tasche – das Gerät ist noch da, schwer und kalt. (Detail)

„Es gibt zwei jetzt,“ sagt er mit einer Stimme, die viel zu alt klingt. „Manchmal werden Dinge mehr.“ (Konsequenz)`,
    choices: [
      {
        id: 'play_own_recorder',
        label: 'Eigenen Rekorder prüfen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'played_recorder', value: true }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'ask_about_duplication',
        label: '„Was meinst du mit mehr?"',
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
    narrative: `Du drückst auf Play und das Band zieht mit einem mechanischen Klick an. (Hook)

Eine Stimme schält sich aus dem Rauschen – es ist deine eigene Stimme, die Dinge sagt, die du noch nicht ausgesprochen hast. Du hörst den Schlaflosen über seine wechselnde Jackenfarbe klagen und Comp7 über den fehlenden Ausstieg flüstern. (Detail)

Der Junge nickt langsam: „Der Zug zeichnet alles auf.“ (Konsequenz)`,
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
        next: 'c3_interlude_02_announcement'
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
    narrative: `Das Metall des Rekorders wird fiebrig heiß in deiner Hand. (Hook)

Comp7s Stimme auf dem Band sagt: „Er muss etwas geben. Etwas von sich abspalten.“ Dann bricht ein Rauschen los, das wie brechendes Eis klingt, unterlegt von der tiefen Stimme des Schaffners. (Detail)

Der Junge nimmt dir das Gerät sanft aus der Hand: „Manche Antworten stehen noch nicht drauf.“ (Konsequenz)`,
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
  // c3_interlude_02_announcement: Durchsage
  // ============================================================================
  'c3_interlude_02_announcement': {
    id: 'c3_interlude_02_announcement',
    chapter: 3,
    title: 'Warnung',
    narrative: `Die Lautsprecher knacken und spucken warmen Staub aus. (Hook)

Eine Stimme, tief wie eine zu langsam laufende Schallplatte, wiederholt das Wort „Ticket“ siebenmal, achtmal, bis es jeden Sinn verliert. Dazwischen glaubst du, deinen Namen zu hören – falsch ausgesprochen, als suchte der Zug nach der passenden Version von dir. (Detail)

Das Rauschen schabt schmerzhaft an deinen Ohren. (Konsequenz)`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Attention steigt'],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s02b_corridor_shift: Gang
  // ============================================================================
  'c3_s02b_corridor_shift': {
    id: 'c3_s02b_corridor_shift',
    chapter: 3,
    title: 'Verschiebung',
    narrative: `Die Abteile im Gang haben ihre Reihenfolge gewechselt. (Hook)

Du zählst acht Türen, aber die Nummern darauf wirken wie frisch aufgeklebt und nicht ganz passend. Ein Feuerlöscher, der eben noch links war, hängt nun auf der rechten Seite. (Detail)

Ein Kribbeln läuft dir den Nacken hoch, als würde der Gang dich neu einsortieren. (Konsequenz)`,
    choices: [
      {
        id: 'talk_to_sleepless',
        label: 'Zum Schlaflosen gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_s02c_sleepless_talk'
      },
      {
        id: 'ignore_sleepless',
        label: 'Ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Raum-Reorganisation'],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s02c_sleepless_talk: Schlafloser
  // ============================================================================
  'c3_s02c_sleepless_talk': {
    id: 'c3_s02c_sleepless_talk',
    chapter: 3,
    title: 'Warnung',
    narrative: `Der Schlaflose reibt sich die Schläfen; ein blasser Ringabdruck zieht sich um seinen Finger. (Hook)

„Du suchst Wagen 7,“ sagt er müde. „Die Tür ist jetzt offen. Sie wird es zumindest sein – Zeit funktioniert hier nicht linear.“ (Detail)

Er blickt dich ernst an: „Du musst etwas opfern, wenn die Kontrolle kommt. Ich hatte nichts mehr.“ (Konsequenz)`,
    choices: [
      {
        id: 'ask_what_to_give',
        label: '„Was opfern?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      },
      {
        id: 'refuse_advice',
        label: 'Ablehnen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Hinweis auf Opfergabe'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_interlude_03_window: Fenster
  // ============================================================================
  'c3_interlude_03_window': {
    id: 'c3_interlude_03_window',
    chapter: 3,
    title: 'Nebenan',
    narrative: `Draußen fährt ein zweiter Zug parallel zu eurem. (Hook)

In den beleuchteten Fenstern siehst du Menschen, die exakt so aussehen wie du – sie heben die Hand, wenn du es tust. Aber der andere Zug fährt in die entgegengesetzte Richtung. (Detail)

Du bist dir nicht mehr sicher, welcher Zug sich wirklich bewegt. (Konsequenz)`,
    choices: [
      {
        id: 'continue',
        label: 'Wegsehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      },
      {
        id: 'search_for_exit',
        label: 'Ausstieg suchen',
        condition: { type: 'compare', target: 'tickets_escape', operator: '>=', value: 3 },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Paradoxon am Fenster'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03_wagen7_approach: Annäherung
  // ============================================================================
  'c3_s03_wagen7_approach': {
    id: 'c3_s03_wagen7_approach',
    chapter: 3,
    title: 'Die Sieben',
    narrative: `Der Gang endet an der Tür mit der massiven 7. (Hook)

Die Zahl flimmert am Rand, als wäre sie nicht ganz fest. Die Tür ist einen Spaltbreit angelehnt und warmes Licht dringt in den kalten Korridor. (Detail)

Du hörst Comp7s Stimme von innen: „Komm rein. Ich weiß, dass du da bist.“ (Konsequenz)`,
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
        id: 'examine_door',
        label: 'Tür untersuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03a_compartment7_door'
      }
    ],
    tags: ['setup'],
    state_notes: ['Wagen 7 Eintritt'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03a_compartment7_door: Die Tür
  // ============================================================================
  'c3_s03a_compartment7_door': {
    id: 'c3_s03a_compartment7_door',
    chapter: 3,
    title: 'Schwelle',
    narrative: `Der Türknauf ist warm, fast pulsierend unter deiner Hand. (Hook)

Die Tinte auf dem „Besetzt“-Schild wirkt feucht, als wäre sie gerade erst aufgetragen worden. Die Tür schwingt lautlos auf und gibt den Blick auf einen unmöglich großen Raum frei. (Detail)

Der Geruch nach Papier und Bleistiftstaub ist überwältigend. (Konsequenz)`,
    choices: [
      {
        id: 'enter_cautiously',
        label: 'Vorsichtig eintreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Raum-Paradoxon'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03b_inside_comp7: Drinnen (Beat 1: Raum)
  // ============================================================================
  'c3_s03b_inside_comp7': {
    id: 'c3_s03b_inside_comp7',
    chapter: 3,
    title: 'Wagen 7',
    narrative: `Das Abteil ist eine Kathedrale aus Notizbüchern. (Hook)

An den Wänden stapeln sich hunderte Bücher, deren Seiten sich von selbst umblättern. Aus dem Fenster siehst du nicht die Gleise, sondern den Gang des eigenen Zuges von außen – eine unmögliche Schleife. (Detail)

Der Raum ist innen größer als der ganze Wagen. (Konsequenz)`,
    choices: [
      {
        id: 'look_around',
        label: 'Umsehen',
        effects: [],
        next: 'c3_s03b_inside_comp7_b'
      },
      {
        id: 'examine_notebooks',
        label: 'Bücher ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03c_notebooks_explore'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Split Part 1: Raum-Eindruck'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03b_inside_comp7_b: Drinnen (Beat 2: Comp7)
  // ============================================================================
  'c3_s03b_inside_comp7_b': {
    id: 'c3_s03b_inside_comp7_b',
    chapter: 3,
    title: 'Begegnung',
    narrative: `Comp7 sitzt an einem massiven Holztisch und schreibt ohne Pause. (Hook)

Ihr Gesicht ist klarer geworden; du erkennst eine feine Narbe an ihrem Kinn, die bei jedem Flackern des Lichts zu wandern scheint. Sie hält inne, der Stift schwebt über dem Papier. (Detail)

„Willkommen,“ sagt sie. „Du bist spät. Oder zu früh.“ (Konsequenz)`,
    choices: [
      {
        id: 'ask_comp7_explain',
        label: '„Was ist das?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen',
        effects: [],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Split Part 2: Dialog Comp7'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03c_notebooks_explore: Notizbücher
  // ============================================================================
  'c3_s03c_notebooks_explore': {
    id: 'c3_s03c_notebooks_explore',
    chapter: 3,
    title: 'Aufzeichnungen',
    narrative: `Du blätterst in den Aufzeichnungen: „Passagier #7: Opferung abgelehnt. Bleibt.“ (Hook)

Ein Notizbuch zeigt ein Foto vom Bahnsteig aus Kapitel 1 – du erkennst deine eigene Kleidung auf dem Bild, aber das Gesicht ist eine leere Fläche. Die Tinte unter dem Bild ist noch feucht. (Detail)

„Du bist schon mal hier gewesen,“ flüstert Comp7. (Konsequenz)`,
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
  // c3_s04_comp7_truth: Wahrheit (Beat 1: Die Schleife)
  // ============================================================================
  'c3_s04_comp7_truth': {
    id: 'c3_s04_comp7_truth',
    chapter: 3,
    title: 'Die Schleife',
    narrative: `Comp7 tastet die Seiten ab, als hätten sie ein Gewicht. (Hook)

„Der NACHTZUG 19 fährt nicht von A nach B,“ sagt sie leise. „Wir fahren im Kreis. Von A nach A.“ (Detail)

Sie zeigt dir eine kreisförmige Karte mit sieben Stationen – alle sind identisch leer. (Konsequenz)`,
    choices: [
      {
        id: 'accept_truth',
        label: 'Verstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04_comp7_truth_b'
      },
      {
        id: 'deny_truth',
        label: '„Unmöglich."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_interlude_05_mirror'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Schleifen-Enthüllung'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_s04_comp7_truth_b: Wahrheit (Beat 2: Der Grund)
  // ============================================================================
  'c3_s04_comp7_truth_b': {
    id: 'c3_s04_comp7_truth_b',
    chapter: 3,
    title: 'Der Halt',
    narrative: `„Warum bleiben wir hier?" fragst du. (Hook)

„Weil jemand nicht aussteigen will,“ antwortet sie. „Weil jemand denkt, dass die nächste Runde die Vergangenheit heilt.“ (Detail)

Sie schlägt eine Seite auf, auf der dein Name steht – falsch geschrieben, aber unverkennbar du. (Konsequenz)`,
    choices: [
      {
        id: 'ask_who',
        label: '„Wer?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_s04a_paradox_window'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen',
        effects: [],
        next: 'c3_s04a_paradox_window'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Schuldfrage'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_s04a_paradox_window: Paradoxon
  // ============================================================================
  'c3_s04a_paradox_window': {
    id: 'c3_s04a_paradox_window',
    chapter: 3,
    title: 'Paradox',
    narrative: `Du blickst aus dem Fenster von Wagen 7 direkt in den Gang des Zuges. (Hook)

Dort stehst du selbst und starrst aus einem Fenster zurück in dieses Abteil. Deine Jacke hat eine andere Farbe und deine Lippen bewegen sich, als würdest du dir selbst etwas zurufen. (Detail)

„Schleife,“ sagt Comp7. „Innen ist außen.“ (Konsequenz)`,
    choices: [
      {
        id: 'accept_paradox',
        label: 'Akzeptieren',
        condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 2 },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'look_away',
        label: 'Wegsehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Visuelles Paradoxon'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_interlude_05_mirror: Spiegel
  // ============================================================================
  'c3_interlude_05_mirror': {
    id: 'c3_interlude_05_mirror',
    chapter: 3,
    title: 'Reflektion',
    narrative: `An der Gangwand hängt ein Spiegel, der vorher nicht da war. (Hook)

Dein Gesicht darin ist doppelt – zwei Gesichter überlagert, eines lächelt, das andere starrt leer. Wenn du die Hand hebst, reagiert das Spiegelbild einen Herzschlag zu spät. (Detail)

Hinter dir zeigt der Spiegel einen Gang, der nach links abknickt, obwohl der reale Gang geradeaus geht. (Konsequenz)`,
    choices: [
      {
        id: 'continue',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Identitätsverlust'],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s04b_third_announcement: Durchsage 3
  // ============================================================================
  'c3_s04b_third_announcement': {
    id: 'c3_s04b_third_announcement',
    chapter: 3,
    title: 'Ankündigung',
    narrative: `Die Lautsprecher kreischen: „Kontrolle-Kontrolle-Kontrolle!“ (Hook)

Das Wort wiederholt sich in wahnsinnigem Tempo, während die Lichter mit jedem Takt dunkler werden. Comp7 steht auf, ihre Hände zittern heftig: „Sie kommen wieder.“ (Detail)

Schwere, rhythmische Schritte hallen bereits durch den Boden. (Konsequenz)`,
    choices: [
      {
        id: 'go_to_control',
        label: 'Rausgehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'hide_in_comp7',
        label: 'Verstecken',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'ask_comp7_help',
        label: 'Hilfe suchen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_control_02_approach'
      }
    ],
    tags: [],
    state_notes: ['Kontrolle 2 Vorbereitung'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_approach: Annäherung
  // ============================================================================
  'c3_control_02_approach': {
    id: 'c3_control_02_approach',
    chapter: 3,
    title: 'Die Ankunft',
    narrative: `Der Schaffner erscheint vor der Tür von Wagen 7. (Hook)

Er wirkt größer als bei der ersten Kontrolle, seine Uniform ist unnatürlich weiß und makellos. Die Kelle in seiner Hand glänzt kalt und wirft einen Schatten, der sich über den gesamten Boden zieht. (Detail)

Er schaut direkt zu dir: „Fahrkarten bitte.“ (Konsequenz)`,
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
        id: 'stay_inside',
        label: 'Drinnen bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'trust_comp7_protection',
        label: 'Comp7 vertrauen',
        condition: { type: 'compare', target: 'rel_comp7', operator: '>=', value: 3 },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_question'
      }
    ],
    tags: ['control'],
    state_notes: ['Schaffner Präsenz'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_question: Befragung (Beat 1: Die Frage)
  // ============================================================================
  'c3_control_02_question': {
    id: 'c3_control_02_question',
    chapter: 3,
    title: 'Das Verhör',
    narrative: `Auf seiner Kelle steht nun: „Passagier ohne Ticket. Station 3.“ (Hook)

„Warum sind Sie hier?" fragt er mit einer Stimme, die keinen Zweifel zulässt. Die Zeit scheint zwischen seinen Worten einzufrieren, während du das ferne Bandrauschen des Rekorders hörst. (Detail)

„Sie können aussteigen oder ein Ticket kaufen,“ sagt er eiskalt. (Konsequenz)`,
    choices: [
      {
        id: 'ask_how',
        label: '„Womit?"',
        effects: [],
        next: 'c3_control_02_question_b'
      },
      {
        id: 'stay_silent',
        label: 'Schweigen',
        effects: [],
        next: 'c3_control_02_question_b'
      }
    ],
    tags: ['control'],
    state_notes: ['Split Part 1: Die Wahl'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_question_b: Befragung (Beat 2: Der Preis)
  // ============================================================================
  'c3_control_02_question_b': {
    id: 'c3_control_02_question_b',
    chapter: 3,
    title: 'Der Preis',
    narrative: `Er deutet auf deine Tasche. „Mit der Wahrheit. Mit dem Gerät. Oder mit jemandem.“ (Hook)

Sein Blick streift kurz Comp7, die hinter dir im Schatten steht. Die Luft riecht nach altem Eisen und der Moment dehnt sich ins Unerträgliche. (Detail)

Du musst jetzt etwas geben. (Konsequenz)`,
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
        id: 'offer_someone',
        label: '„Was meinst du?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
        ],
        next: 'c3_control_02_aftermath'
      }
    ],
    tags: ['control'],
    state_notes: ['Opfer-Wahl'],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_aftermath: Nachwirkung
  // ============================================================================
  'c3_control_02_aftermath': {
    id: 'c3_control_02_aftermath',
    chapter: 3,
    title: 'Das Urteil',
    narrative: `„Die Antwort ist notiert,“ sagt er monoton. „Aber sie reicht nicht.“ (Hook)

Comp7 tritt schützend neben dich: „Er kann dich nicht rauswerfen, weil wir alle bereits draußen sind.“ Der Schaffner macht eine letzte Notiz auf seiner Kelle und entfernt sich langsam. (Detail)

„Er kommt wieder,“ flüstert Comp7. „Bis du die richtige Antwort gibst.“ (Konsequenz)`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s06_passengers_vanish'
      },
      {
        id: 'walk_away',
        label: 'Weggehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s06_passengers_vanish'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Kontrolle 2 überstanden'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_s06_passengers_vanish: Leere
  // ============================================================================
  'c3_s06_passengers_vanish': {
    id: 'c3_s06_passengers_vanish',
    chapter: 3,
    title: 'Leere',
    narrative: `Der gesamte Wagen ist plötzlich vollkommen leer. (Hook)

Kein Junge, kein Schlafloser, keine Frau mit Zeitung – nur leere Sitze und wehende Vorhänge. Deine Schritte hallen viel zu laut im stillen Wagen, als wäre der Zug nur noch eine Kulisse. (Detail)

Nur Comp7 steht noch in der Tür von Wagen 7 und blickt dir nach. (Konsequenz)`,
    choices: [
      {
        id: 'search_train',
        label: 'Zug durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      },
      {
        id: 'go_to_comp7',
        label: 'Zu Comp7 gehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Alle NPCs weg'],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s06a_drift_intensifies: Drift
  // ============================================================================
  'c3_s06a_drift_intensifies': {
    id: 'c3_s06a_drift_intensifies',
    chapter: 3,
    title: 'Auflösung',
    narrative: `Die Fenster zeigen nicht mehr nach draußen, sondern spiegeln andere Gänge desselben Zuges. (Hook)

Du zählst die Abteile, aber nach der sieben kommt wieder die eins, eine endlose Schleife aus Holz und Polster. Ein leichter Schwindel sitzt hinter deinen Augen, während die Luft nach heißem Metall schmeckt. (Detail)

Plötzlich sitzt der Junge wieder in seinem Abteil. (Konsequenz)`,
    choices: [
      {
        id: 'talk_to_boy',
        label: 'Mit ihm reden',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s06b_boy_final'
      },
      {
        id: 'ignore_boy',
        label: 'Ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_end_platform_watch'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Gang-Schleife'],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s06b_boy_final: Finale
  // ============================================================================
  'c3_s06b_boy_final': {
    id: 'c3_s06b_boy_final',
    chapter: 3,
    title: 'Der Junge',
    narrative: `Der Junge wirkt älter jetzt, seine Haut ist papierdünn. (Hook)

Er spielt eine Aufnahme ab: Deine eigene Stimme flüstert „—ich bin bereit—“. Auf dem Etikett der Kassette steht ein Name, der fast deiner ist, aber ein Buchstabe fehlt. (Detail)

„Die Aufnahme ist fertig,“ sagt er müde. (Konsequenz)`,
    choices: [
      {
        id: 'take_boys_recorder',
        label: 'Rekorder nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'has_recorder', value: true }
        ],
        next: 'c3_end_platform_watch'
      },
      {
        id: 'leave_recorder',
        label: 'Ihm lassen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_end_platform_watch'
      }
    ],
    tags: ['reveal'],
    state_notes: ['Rekorder Finale'],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_platform_watch: Halt
  // ============================================================================
  'c3_end_platform_watch': {
    id: 'c3_end_platform_watch',
    chapter: 3,
    title: 'Beobachtung',
    narrative: `Der Zug bremst und hält an einem weiteren leeren Bahnsteig. (Hook)

Draußen steht eine Gestalt, deren Mantel sich bewegt, obwohl kein Wind weht. Sie hebt den Blick und starrt direkt in dein Fenster – ihr Gesicht mischt sich mit deinem Spiegelbild. (Detail)

Du spürst die Kälte der Station durch das Glas. (Konsequenz)`,
    choices: [
      {
        id: 'try_to_exit',
        label: 'Aussteigen?',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'stay_on_train',
        label: 'Bleiben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_end_station'
      }
    ],
    tags: ['drift_variant'],
    state_notes: ['Doppelgänger-Sichtung'],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_end_station: Ende
  // ============================================================================
  'c3_end_station': {
    id: 'c3_end_station',
    chapter: 3,
    title: 'Dritter Halt',
    narrative: `Die Tür öffnet sich und eine Gestalt steigt ein, die genau deine Haltung hat. (Hook)

Sie geht wortlos an dir vorbei; ein kalter Luftzug zieht an deiner Haut, als würde ein Teil von dir mit ihr gehen. Sie setzt sich in dein Abteil und beginnt in ein Notizbuch zu schreiben. (Detail)

Der Zug fährt weiter ins nächste Kapitel. (Konsequenz)`,
    choices: [
      {
        id: 'continue_to_chapter_4',
        label: 'Weiter',
        effects: [
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c4_s01_mirror'
      }
    ],
    tags: ['station_end'],
    state_notes: ['Identity Drift: Doppelgänger'],
    atmosphere: 'dark'
  }
};