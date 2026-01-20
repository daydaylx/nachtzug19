// ============================================================================
// NACHTZUG 19 - Kapitel 3: Wagen 7
// ============================================================================
// Szenen (27):
// Entry: c3_s01_wagen7_locked, c3_s01a_after_station, c3_s01b_boy_return
// Interludes: c3_interlude_01_lights, c3_interlude_02_announcement, c3_interlude_03_window, c3_interlude_04_corridor, c3_interlude_05_mirror
// Recorder: c3_s02_recorder_anomaly, c3_s02a_recorder_listening, c3_s02b_corridor_shift, c3_s02c_sleepless_talk
// Wagen 7: c3_s03_wagen7_approach, c3_s03a_compartment7_door, c3_s03b_inside_comp7, c3_s03c_notebooks_explore
// Truth: c3_s04_comp7_truth, c3_s04a_paradox_window, c3_s04b_third_announcement
// Kontrolle 2: c3_control_02_approach, c3_control_02_question, c3_control_02_aftermath
// Pre-End: c3_s06_passengers_vanish, c3_s06a_drift_intensifies, c3_s06b_boy_final
// End: c3_end_platform_watch, c3_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter3Scenes: ScenesCollection = {
  // ============================================================================
  // c3_s01_wagen7_locked: Einstieg - Wagen 7 ist verschlossen
  // ============================================================================
  'c3_s01_wagen7_locked': {
    id: 'c3_s01_wagen7_locked',
    chapter: 3,
    title: 'Verschlossen',
    narrative: `Du stehst vor einer Tür am Ende des Gangs.

Auf der Tür: Eine 7. Handgemalt, präzise. Kleine Buchstaben.

Du greifst nach dem Griff. Kalt. Metall. Er dreht sich nicht.

Die Tür ist verschlossen.

Du lehnst die Stirn kurz gegen das Holz. Kein Widerhall, nur das dumpfe Summen des Zuges. Der Lack riecht süßlich, als wäre er frisch, aber deine Finger hinterlassen keinen Abdruck. Unter der 7 ist ein feiner Kratzer, der wie eine zweite Zahl aussieht, wieder wegradiert.

Du erinnerst dich nicht, diese Tür vorher gesehen zu haben. Aber du bist sicher, dass du sie gesucht hast.

Oder solltest du sie suchen?

In deinem Kopf gibt es ein Bild von dieser Tür, aber es flackert, als wäre es eine Erinnerung an eine Erinnerung. Du bist dir nicht sicher, ob du hier schon einmal gestanden hast oder ob du es nur wiederholst.

Der Zug rattert. Die Neonröhren flackern. Aus. An. Aus. An.

Als du dich umdrehst, wirkt der Gang länger als eben. Die Notbeleuchtung am Boden zieht sich wie eine Linie, die nicht enden will. Irgendwo klackt eine Tür, aber kein Abteil geht auf.

Das Neonlicht wirkt für einen Moment zu hell, als würde es dich markieren, und dann fällt es wieder zurück in sein Flackern.

Erst dann hörst du das Rattern wieder klar.

Hinter dir: Schritte. Oder das Echo deiner eigenen.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du stehst vor einer Tür am Ende des Gangs.

Auf der Tür: Eine 7. Aber darunter schimmert eine andere Zahl durch. Eine 8? Eine 0?

Du greifst nach dem Griff. Er ist warm. Zu warm. Als hätte ihn gerade jemand losgelassen. Er dreht sich nicht.

Die Tür ist verschlossen. Aber sie vibriert leicht.

Du lehnst die Stirn gegen das Holz. Du hörst Stimmen von der anderen Seite. Leise. Unverständlich. Der Lack riecht nach Ozon und altem Parfüm.

Du erinnerst dich nicht, diese Tür vorher gesehen zu haben. Aber du weißt, was dahinter ist. Oder glaubst es zu wissen.

In deinem Kopf gibt es ein Bild von dieser Tür, offen. Du stehst darin. Aber du bist nicht du.

Der Zug rattert nicht mehr rhythmisch. Er stolpert. Die Neonröhren flackern in einem Muster, das wie ein Code aussieht.

Als du dich umdrehst, wirkt der Gang endlos. Die Notbeleuchtung pulsiert wie eine Vene.

Hinter dir: Keine Schritte. Aber ein Atmen.`
      },
      {
        min_drift: 5,
        narrative: `Du stehst vor einer Tür, die nicht da sein sollte.

Auf der Tür: Keine Zahl. Nur ein tiefer Kratzer, der aussieht wie eine 7, die blutet. Das Holz ist dunkel, fast schwarz.

Du greifst nach dem Griff. Er ist feucht. Klebrig. Er gibt nach, aber die Tür öffnet sich nicht, als würde sie von innen festgehalten.

Du drückst das Ohr an das Holz. Ein Schrei. Ganz leise. Endlos.

Der Lack riecht nach Kupfer. Nach Blut.

Du hast diese Tür nie gesucht. Sie hat dich gefunden.

In deinem Kopf gibt es kein Bild mehr. Nur das Gefühl von Fallen.

Der Zug rattert so laut, dass deine Zähne vibrieren. Die Neonröhren sind aus. Nur das Licht vom Bahnsteig draußen huscht herein, obwohl ihr fahrt.

Als du dich umdrehst, ist der Gang weg. Nur Schatten.

Hinter dir: Du selbst. Deine Stimme.`
      }
    ],
    choices: [
      {
        id: 'try_to_open',
        label: 'Versuchen die Tür zu öffnen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'wait_at_door',
        label: 'Vor der Tür warten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      },
      {
        id: 'knock_on_door',
        label: 'An die Tür klopfen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01a_after_station'
      }
    ],
    tags: ['setup', 'drift_seed'],
    state_notes: [
      'Wagen 7 ist verschlossen - aber war das immer so?',
      'try_to_open erhöht conductor_attention',
      'knock_on_door erhöht memory_drift (Grenze verwischt)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s01a_after_station: Nach zweiter Station
  // ============================================================================
  'c3_s01a_after_station': {
    id: 'c3_s01a_after_station',
    chapter: 3,
    title: 'Nach dem Halt',
    narrative: `Der Zug fährt weiter. Das Rattern ist lauter geworden. Oder hörst du nur genauer hin?

Die Neonröhren flackern schneller. Nicht mehr synchron.

Die Luft trägt noch den Geruch der Station: feuchte Kälte, Metall, ein Hauch von Ozon. Als hättest du kurz draußen gestanden, obwohl du es nicht hast.

Du gehst zurück durch den Gang. Der Schlaflose sitzt drei Reihen weiter hinten. Seine Jacke ist jetzt schwarz.

Du erinnerst dich: Sie war rot. Oder grün. Oder beides. Oder nie eine von beidem.

Comp7 ist weg. Ihr Abteil leer. Nur das Notizbuch liegt noch da, aufgeschlagen.

Die Seite zittert im Luftzug. Bei jedem Flackern scheint ein Wort zu verschwinden und wieder aufzutauchen, als würde jemand mit Radiergummi arbeiten, den du nicht siehst.

Auf der Seite steht: „Passagier #[UNLESBAR]: Sucht nach Jungen. Findet Wagen 7."

Du hast den Jungen nicht gesucht. Noch nicht.

Du hörst für einen Moment ein entferntes Bandrauschen, dann ist es weg. Vielleicht war es nur das Rattern in deinem Kopf.

Der Schlaflose atmet, aber es klingt, als wäre er zwei Reihen weiter. Alles verschiebt sich um einen Sitz, nur du bleibst stehen.`,
    choices: [
      {
        id: 'take_notebook',
        label: 'Das Notizbuch nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_interlude_01_lights'
      },
      {
        id: 'leave_notebook',
        label: 'Das Notizbuch liegenlassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_interlude_01_lights'
      },
      {
        id: 'read_notebook',
        label: 'Im Notizbuch lesen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s01b_boy_return'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Comp7 verschwunden, Notizbuch enthält Vorhersage',
      'read_notebook: Hoher Truth-Gewinn, aber memory_drift steigt',
      'Jackenfarbe unklar: Spieler erinnert sich nicht mehr genau'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_interlude_01_lights: Interlude - Lichter
  // ============================================================================
  'c3_interlude_01_lights': {
    id: 'c3_interlude_01_lights',
    chapter: 3,
    title: 'Lichter',
    narrative: `Die Neonröhren flackern. Aus. An. Aus. An.

Jedes Mal wenn das Licht zurückkommt, wirkt der Gang fremder. Ein Schatten zu viel, eine Tür, die vorher geschlossen war.

Du versuchst, dir ein Muster zu merken, aber es gleitet dir durch die Finger. Dein eigener Schatten hinkt dir hinterher, als wäre er müde.`,
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
    state_notes: [
      'Lichtwechsel verändert Wahrnehmung',
      'Subtiler Drift: Räumliche Details verschieben sich'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s01b_boy_return: Junge kehrt zurück
  // ============================================================================
  'c3_s01b_boy_return': {
    id: 'c3_s01b_boy_return',
    chapter: 3,
    title: 'Rückkehr',
    narrative: `Der Junge sitzt wieder in seinem Abteil.

Du bist sicher: Er war weg. Das Abteil war leer. Du hast es gesehen.

Er hält den Kassettenrekorder. Den gleichen, den er dir gegeben hat. Aber du hast ihn doch noch.

Du greifst in deine Tasche. Der Rekorder ist da. Kalt. Schwer.

Der Junge wirkt jünger als gestern. Oder älter. Seine Stimme kratzt, als hätte er lange nicht gesprochen. Hinter ihm liegt eine Jacke über dem Sitz, aber sie scheint nicht zu seinem Abteil zu gehören.

Du hörst den anderen Rekorder in deiner Tasche, obwohl er still ist. Ein leises Bandrauschen, das nur da ist, wenn du hinhörst.

Der Junge hält den Blick, seine Pupillen sind zu groß für das Licht. Für einen Augenblick wirkt sein Gesicht, als hätte es eine andere Form, dann fängt es sich wieder.

Der Junge schaut dich an. „Es gibt zwei jetzt," sagt er. „Manchmal werden Dinge mehr."

Er drückt auf Play. Sein Rekorder spielt. Kein Knistern. Nur Stille.

„Deiner auch?" fragt er.`,
    choices: [
      {
        id: 'play_own_recorder',
        label: 'Den eigenen Rekorder abspielen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'refuse_to_check',
        label: '„Ich will es nicht wissen"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_interlude_02_announcement'
      },
      {
        id: 'ask_about_duplication',
        label: '„Was meinst du mit ›mehr‹?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      },
      {
        id: 'check_notebook_reference',
        label: 'An das Notizbuch zurückdenken',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s02_recorder_anomaly'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Junge kehrt zurück mit dupliziertem Rekorder',
      'Drift-Mechanik: Objekte können sich verdoppeln',
      'CONDITION: check_notebook_reference nur bei rel_comp7 >= 1 (Callback für take_notebook)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s02_recorder_anomaly: Kassette spielt neue Aufnahme
  // ============================================================================
  'c3_s02_recorder_anomaly': {
    id: 'c3_s02_recorder_anomaly',
    chapter: 3,
    title: 'Die Aufnahme',
    narrative: `Du drückst auf Play.

Das Band zieht an. Ein leiser Widerstand in der Mechanik, dann ein Klick, als würde etwas einrasten. Das Geräusch klingt vertraut, aber gleichzeitig zu nah, als käme es aus deinem eigenen Kopf.

Knistern. Dann eine Stimme. Deine Stimme.

„—ich bin im NACHTZUG 19. Ich habe kein Ticket. Der Schaffner kommt—"

Das hast du nie gesagt. Das hast du nie aufgenommen.

Im Hintergrund hörst du das Rattern der Räder, dann ein dumpfes Klopfen, als würde jemand gegen Metall schlagen. Ein Name fällt, aber er ist verschluckt. Dein eigener Atem liegt unter allem, als wäre er aufgenommen, während du jetzt gerade hörst.

Die Stimme weiter: „—Comp7 sagt, es gibt keinen Ausstieg. Der Junge sagt, Dinge werden mehr—"

Das hast du gerade erst gehört. Vor Sekunden.

Dann eine andere Stimme. Der Schlaflose:

„—die Jacke. Sie ändert sich. Ich weiß nicht mehr, welche Farbe—"

Das hast du ihm gesagt. In einem anderen Gespräch. Aber wie ist es auf der Kassette?

Der Junge nickt. „Der Zug zeichnet alles auf."

Sein Blick ist ruhig, als hätte er das schon oft gesagt. Das Band läuft weiter, obwohl niemand mehr spricht.`,
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
        label: 'Den Rekorder ausschalten',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c3_interlude_02_announcement'
      },
      {
        id: 'ask_boy_how',
        label: '„Wie funktioniert das?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c3_s02a_recorder_listening'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kassette zeichnet Spieler-Dialoge auf (Meta-Element)',
      'listen_more erhöht memory_drift (zu viel Wahrheit)',
      'ask_boy_how: Starke Beziehung (+2)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_s02a_recorder_listening: Kassette weiterhören
  // ============================================================================
  'c3_s02a_recorder_listening': {
    id: 'c3_s02a_recorder_listening',
    chapter: 3,
    title: 'Aufnahme (Fortsetzung)',
    narrative: `Die Kassette läuft weiter, ein unerbittliches Mahlen kleiner Zahnräder tief im Gehäuse.

Das Metall des Rekorders wird heiß in deiner Hand, eine fiebrige Wärme, die sich bis in deine Fingerspitzen frisst. Die Vibration des winzigen Motors ist nicht mehr gleichmäßig; sie zuckt und stolpert, synchron mit deinem eigenen, rasenden Puls.

Eine neue Stimme schält sich aus dem Rauschen. Comp7:

„—Passagier ohne Ticket. Kapitel 3. Die Kontrolle rückt näher. Er muss etwas geben. Etwas von sich selbst abspalten.—“

Das Kratzen auf dem Band klingt jetzt wie das Schaben von tausend Insektenflügeln gegen Glas. Hat sie das je gesagt? Oder drängen diese Worte erst jetzt, in diesem Moment, aus der Zukunft zurück in dein Bewusstsein?

Du willst den Stop-Knopf drücken, willst das Band zum Schweigen bringen, aber die Mechanik leistet Widerstand. Die Tasten fühlen sich klebrig an, als würde das Gerät dich festhalten wollen. Die Kassette läuft ungerührt weiter, gierig und hungrig.

Der Klang wird dumpf, als käme er aus dem Inneren eines Sarges. Ein leises, nasses Klicken, dann setzt die Aufnahme wieder ein, klarer jetzt, zu klar. Es fühlt sich an, als würde die Stimme nicht aus dem Lautsprecher kommen, sondern direkt in deinem Schädel entstehen, ein Echo hinter deinen Augen.

Dann bricht ein Rauschen los, das wie brechendes Eis klingt. Ein heftiger Schienenstoß lässt den Wagen erzittern. Das Klacken der Türen am Ende des Ganges hallt wie ein Schuss durch die Stille.

Eine tiefere, bodenlose Stimme überlagert alles. Der Schaffner:

„—Warum sind Sie hier? Geben Sie Rechenschaft.—“

Die Frage hallt in dir wider, ein dumpfer Schmerz in den Zähnen.

Dann deine eigene Stimme, brüchig und fremd: „Ich— ich wollte doch nur—“

Stille. Plötzlich und absolut.

Du hörst dich selbst einatmen, aber das Geräusch auf dem Band folgt erst einen quälenden Moment später, versetzt und falsch, als hättest du dich bereits in zwei Versionen aufgeteilt.

Das Band wiederholt ein kurzes Fragment, ein hängengebliebenes Wort, das sich wie ein Bohrer in dein Gehör schraubt. Jemand hat versucht, diese Stelle zu übertönen, ein verzweifeltes Murmeln unter dem Rauschen.

Die Spulen drehen sich weiter, obwohl das kleine Fenster des Rekorders jetzt vollkommen schwarz angelaufen ist, als würde es Rauch atmen. Der Junge starrt dich an, seine Augen weit und unnatürlich hell. Er blinzelt nicht ein einziges Mal.

Er streckt die Hand aus und nimmt dir den Rekorder sanft, aber bestimmt aus der Hand. „Manche Antworten stehen noch nicht drauf,“ sagt er, und seine Stimme klingt wie das Echo der Aufnahme. „Du musst sie erst erleben.“`,
    choices: [
      {
        id: 'ask_what_answer',
        label: '„Welche Antwort soll ich geben?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      },
      {
        id: 'take_recorder_back',
        label: 'Den Rekorder zurücknehmen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s02b_corridor_shift'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kassette spielt Zukunft ab: Kontrolle 2 wird vorhergesagt',
      'ask_what_answer: Spieler sucht Guidance'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_interlude_02_announcement: Interlude - Durchsage verzerrt
  // ============================================================================
  'c3_interlude_02_announcement': {
    id: 'c3_interlude_02_announcement',
    chapter: 3,
    title: 'Durchsage',
    narrative: `Die Lautsprecher knacken.

„Sehr—[RAUSCHEN]—Damen und—[FEHLER]—"

Die Stimme ist langsamer. Tiefer. Wie eine Schallplatte auf falscher Geschwindigkeit.

Das Knacken klingt, als würde jemand mit den Fingern über trockenes Papier fahren. Ein Hauch warmen Staubs steigt aus dem Lautsprecher.

„—erreichen—Station—[GELÖSCHT]—"

Der Name der Station ist nicht da. Nur ein langer Ton.

„—Bitte—[WIEDERHOLUNG]—Ticket—bereithalten—[WIEDERHOLUNG]—"

Das Wort „Ticket" wiederholt sich. Siebenmal. Achtmal. Du zählst nicht mehr.

Du merkst, wie das Wort seine Bedeutung verliert. Es bleibt nur der Klang, eine leere Hülle.

Dazwischen glaubst du kurz, deinen Namen zu hören. Falsch ausgesprochen. Als würde die Stimme nach einer Version von dir suchen, die gerade passt.

Das Rauschen schabt an deinen Ohren. Für einen Moment klingt es, als würde die Durchsage rückwärts laufen, und du hörst das Wort „Rückfahrt" klarer als alles andere.

Der Lautsprecher knackt erneut, als würde er etwas ausspucken, das er nicht mehr halten kann.

Das Rauschen klingt wie Stimmen, die hintereinander sprechen, aber du kannst keine Worte greifen.

Dann Stille.`,
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
    state_notes: [
      'Durchsage stark verzerrt: Systemfehler eskaliert',
      'conductor_attention steigt: Kontrolle rückt näher'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s02b_corridor_shift: Gang verschiebt sich
  // ============================================================================
  'c3_s02b_corridor_shift': {
    id: 'c3_s02b_corridor_shift',
    chapter: 3,
    title: 'Verschiebung',
    narrative: `Du gehst durch den Gang. Zurück zu deinem Platz.

Der Gang ist anders. Die Abteile sind nicht mehr in der gleichen Reihenfolge.

Vorhin: Schlaflosen-Abteil, dann leeres Abteil, dann das mit der Zeitung.

Jetzt: Leeres Abteil, Zeitung, dann Schlaflosen.

Du zählst die Abteile. Immer noch acht. Aber die Positionen haben gewechselt.

Die Nummern an den Türen wirken neu aufgeklebt, als hätten sie nie richtig gepasst. Eine Lampe summt tiefer als vorher.

Ein Feuerlöscher hängt jetzt auf der anderen Seite. Du bist sicher, er war links. Im Fenster siehst du dein Spiegelbild, aber es bleibt einen Augenblick zu lange stehen, bevor es dich nachahmt.

Die Polsterfarbe eines Sitzes ist plötzlich heller, als hätte jemand den Stoff gewechselt. Auf dem Boden liegt ein Zettel, den du nicht wegheben kannst, weil er beim Bücken schon nicht mehr da ist.

Ein Kribbeln läuft dir den Nacken hinauf, als würde der Gang dich neu einsortieren.

Du gehst einen Schritt zurück, dann wieder vor, aber der Gang fühlt sich nicht mehr an wie derselbe Raum. Es ist, als würde er dich für jeden Blick neu zeichnen. Deine Schuhe hinterlassen keine Spuren.

Der Schlaflose winkt dir zu. Als hätte er dich erwartet.`,
    choices: [
      {
        id: 'ignore_sleepless',
        label: 'Weitergehen ohne zu reagieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      },
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
        id: 'count_compartments',
        label: 'Die Abteile nochmal zählen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      },
      {
        id: 'call_for_boy',
        label: 'Leise nach dem Jungen rufen',
        condition: {
          type: 'compare',
          target: 'rel_boy',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Abteil-Reihenfolge ändert sich: Raumlogik bricht',
      'talk_to_sleepless führt zu conditional Szene (nur wenn rel >= 1)',
      'count_compartments: Obsession mit Realität erhöht drift'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s02c_sleepless_talk: Schlafloser warnt
  // (CONDITION: rel_sleepless >= 1)
  // ============================================================================
  'c3_s02c_sleepless_talk': {
    id: 'c3_s02c_sleepless_talk',
    chapter: 3,
    title: 'Warnung',
    narrative: `Du setzt dich neben den Schlaflosen.

Seine Hände sind ruhig, aber die Haut an den Knöcheln ist aufgeraut. Ein blasser Ringabdruck zieht sich um seinen Finger, als hätte er etwas getragen, das jetzt fehlt.

„Du suchst Wagen 7," sagt er. Keine Frage.

„Woher—"

„Alle suchen Wagen 7. Am Ende. Oder am Anfang. Je nachdem."

Er deutet nach vorne. „Die Tür ist jetzt offen. War sie vorher nicht. Aber jetzt ist sie es."

Du erinnerst dich: Die Tür war verschlossen. Du hast daran gerüttelt.

Sein Blick bleibt an deinen Händen hängen, als suche er nach etwas, das du tragen solltest. Er lächelt nicht, aber es ist kein Vorwurf, eher Müdigkeit.

„Oder wird sie es sein," sagt er. „Zeit funktioniert hier anders. Kontrolle kommt bald. Du musst etwas haben. Etwas geben. Etwas opfern."

Seine Augen sind müde. „Ich hatte nichts zu geben. Jetzt bin ich immer hier."

Er reibt sich über die Schläfe. „Ich habe einmal gezählt," murmelt er. „Ich war bei fünf und dann wieder bei eins." Sein Blick rutscht zum Fenster, als würde dort die Zahl stehen, die ihm fehlt. Er schüttelt den Kopf, als ob er die Erinnerung abstreifen könnte.`,
    choices: [
      {
        id: 'ask_what_to_give',
        label: '„Was soll ich geben?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      },
      {
        id: 'refuse_advice',
        label: '„Ich finde einen anderen Weg"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_sleepless', value: 1 }
        ],
        next: 'c3_interlude_03_window'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: Nur sichtbar wenn rel_sleepless >= 1',
      'Schlafloser warnt vor Kontrolle 2',
      'refuse_advice verschlechtert Beziehung'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_interlude_03_window: Interlude - Fenster
  // ============================================================================
  'c3_interlude_03_window': {
    id: 'c3_interlude_03_window',
    chapter: 3,
    title: 'Fenster',
    narrative: `Du schaust aus dem Fenster.

Draußen: Keine Landschaft. Keine Dunkelheit.

Nur Lichter. Viele. Sie bewegen sich parallel zum Zug.

Du erkennst Formen. Fenster. Abteile. Menschen.

Dein Atem beschlägt das Glas, aber die Spur verschwindet sofort, als würde das Fenster nicht zu deinem Zug gehören. Die Lichter draußen pulsieren im Takt deines Herzschlags, oder du bildest es dir ein.

Es ist ein anderer Zug. Er fährt neben euch.

Du siehst eine Person am Fenster. Sie schaut zurück.

Sie hebt die Hand. Du hebst deine Hand.

Sie bewegt sich. Du bewegst dich.

Für einen Moment bist du dir nicht sicher, welcher Zug sich bewegt.

Im anderen Zug sitzt jemand mit dem Rücken zu dir. Für einen Augenblick meinst du, den Jungen zu erkennen, aber dann verschwindet die Gestalt im Dunkel.

Die Scheiben spiegeln deine Hand, aber die Finger wirken einen Moment zu lang, als hätte jemand eine Version von dir gestreckt.

In den Fenstern des anderen Zuges stehen Nummern, die du nicht kennst. Eine 9, dann eine 7, dann wieder eine 9. Du fragst dich, welcher Zug die richtige Ordnung hat.

Es ist dein Spiegelbild.

Aber der andere Zug fährt in die entgegengesetzte Richtung.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du schaust aus dem Fenster.

Draußen: Keine Landschaft. Keine Dunkelheit.

Nur Lichter. Wenige. Sie bewegen sich parallel zum Zug.

Du erkennst Formen. Fenster. Abteile. Menschen.

Es ist ein anderer Zug. Er fährt neben euch.

Du siehst eine Person am Fenster. Sie schaut zurück.

Sie hebt die Hand. Du hebst deine Hand.

Sie bewegt sich einen Schlag später. Du bewegst dich.

Es ist dein Spiegelbild.

Aber der andere Zug fährt in die entgegengesetzte Richtung.`
      },
      {
        min_drift: 5,
        narrative: `Du schaust aus dem Fenster.

Draußen: Keine Landschaft. Keine Dunkelheit.

Nur Lichter. Zu viele. Sie flimmern.

Du erkennst Formen. Fenster. Abteile. Menschen.

Es ist derselbe Zug. Er fährt neben euch.

Du siehst eine Person am Fenster. Sie schaut zurück.

Sie hebt die Hand. Du hebst deine Hand.

Sie bewegt sich. Du bewegst dich.

Es ist dein Spiegelbild.

Aber der andere Zug steht still.`
      }
    ],
    choices: [
      {
        id: 'continue',
        label: 'Wegschauen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      },
      {
        id: 'search_for_exit',
        label: 'Nach einem Ausstieg suchen',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      },
      {
        id: 'count_reflections',
        label: 'Die Spiegelungen zählen',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      },
      {
        id: 'call_to_boy_silently',
        label: 'Dem Jungen im Spiegelbild zuwinken',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s03_wagen7_approach'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Spiegelbild in anderem Zug: Identity-Drift',
      'Züge fahren in entgegengesetzte Richtungen: Paradox',
      'CONDITION: search_for_exit nur bei tickets_escape >= 3 (Callback für go_back)',
      'CONDITION: count_reflections nur bei memory_drift >= 3 (Callback für count_compartments)',
      'CONDITION: call_to_boy_silently nur bei tickets_love >= 3 (Callback für call_for_boy)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03_wagen7_approach: Annäherung an Wagen 7
  // ============================================================================
  'c3_s03_wagen7_approach': {
    id: 'c3_s03_wagen7_approach',
    chapter: 3,
    title: 'Die Sieben',
    narrative: `Du gehst nach vorne. Oder nach hinten. Der Gang sieht gleich aus in beide Richtungen.

Der Boden fühlt sich weicher an, der Geruch verändert sich: Papier, Staub, etwas Süßes. Du hörst dein eigenes Blut rauschen, als würde der Gang jedes andere Geräusch schlucken.

Am Ende: Die Tür. Die 7.

Die Zahl wirkt nicht ganz fest. Der obere Strich flimmert, als würde er sich verschieben. Du blinzelst, und sie steht wieder sauber da. Ein leises Summen läuft durch den Boden, als würde der Zug selbst kurz den Atem anhalten. Dein Fuß klebt am Teppich, als wäre er feucht.

Sie ist angelehnt. War sie vorher verschlossen? Du bist sicher, dass sie verschlossen war.

Die Kante der Tür wirkt warm, als hätte jemand eben noch dort gestanden. Du siehst einen feinen Spalt, gerade breit genug, um einen Streifen Licht zu sehen.

Aber jetzt steht sie offen.

Licht fällt durch den Spalt. Warmes Licht. Nicht das kalte Neonlicht des Gangs.

Das Rascheln, das du hörst, klingt wie Seiten, die sich von selbst umblättern.

Das Holz der Tür knackt leise, als würde es sich ausdehnen. Ein Hauch warmer Luft streicht über dein Gesicht.

Du hörst Papier rascheln. Eine Stimme. Comp7.

„Du kannst reinkommen. Ich weiß, dass du da bist."`,
    choices: [
      {
        id: 'enter_immediately',
        label: 'Sofort eintreten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      },
      {
        id: 'examine_door',
        label: 'Die Tür untersuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s03a_compartment7_door'
      },
      {
        id: 'call_out',
        label: '„Comp7?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s03a_compartment7_door'
      }
    ],
    tags: ['setup'],
    state_notes: [
      'Tür steht offen - war vorher verschlossen',
      'enter_immediately überspringt Untersuchung',
      'call_out stärkt Beziehung'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03a_compartment7_door: Tür zu Abteil 7
  // ============================================================================
  'c3_s03a_compartment7_door': {
    id: 'c3_s03a_compartment7_door',
    chapter: 3,
    title: 'Die Tür',
    narrative: `Du stehst vor der Tür. Die 7 ist präzise gemalt. Kleine, saubere Striche.

Die gleiche Handschrift wie in Comp7s Notizbuch.

Die Tinte wirkt frisch und trotzdem trocken. Als hätte jemand gerade geschrieben und die Zeit übersprungen.

Die Tür öffnet sich weiter. Von allein. Langsam.

Der Türknauf ist warm, obwohl der Gang kalt ist. Du spürst einen leichten Zug, als würde der Raum dahinter atmen.

Kein Quietschen. Kein Geräusch.

Innen: Ein größerer Raum. Unmöglich groß für ein Abteil.

Die Luft riecht nach Papier, kaltem Kaffee und Bleistiftstaub. Ein schwaches Summen liegt in der Stille.

Du hörst das Kratzen eines Stifts, obwohl Comp7 sich nicht bewegt. Das Geräusch scheint aus den Notizbüchern selbst zu kommen, als würden sie von allein schreiben.

An den Wänden: Notizbücher. Dutzende. Alle aufgeschlagen.

Comp7 sitzt am Tisch. Ihr Gesicht immer noch verschwommen. Aber weniger als vorher.

Du erkennst Züge. Augen. Mund. Eine Narbe am Kinn.

Die Narbe sitzt einen Tick höher, als du sie erwartet hast. Du fragst dich, ob sie gewandert ist oder ob du sie nur falsch in Erinnerung hast. Comp7s Blick bleibt an dir hängen, als würde sie prüfen, ob du es bemerkst.

„Willkommen," sagt sie. „Du bist spät. Oder früh. Je nachdem."`,
    choices: [
      {
        id: 'enter_cautiously',
        label: 'Vorsichtig eintreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      },
      {
        id: 'ask_from_doorway',
        label: '„Was ist das hier?"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s03b_inside_comp7'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Tür öffnet sich selbst: Zuglogik nimmt Kontrolle',
      'Comp7s Gesicht wird klarer: Drift stabilisiert',
      'Raum ist unmöglich groß'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03b_inside_comp7: In Abteil 7
  // ============================================================================
  'c3_s03b_inside_comp7': {
    id: 'c3_s03b_inside_comp7',
    chapter: 3,
    title: 'Wagen 7',
    narrative: `Du trittst ein.

Das Abteil ist größer. Viel größer als die anderen. Unmöglich größer.

Der Klang deiner Schritte verliert sich, als wäre der Boden weich. Die Wände nehmen das Geräusch auf, anstatt es zurückzuwerfen.

An den Wänden: Notizbücher. Dutzende. Alle aufgeschlagen. Alle vollgeschrieben.

Einige Seiten bewegen sich von selbst, als hätte jemand gerade umgeblättert. Andere sind leer, als warteten sie auf einen Eintrag.

Comp7 sitzt am Tisch. Ihr Gesicht immer noch unscharf, aber du siehst mehr jetzt.

Sie hält einen Stift, aber ihre Hand ruht. Als wäre sie gerade erst aus einem Satz zurückgekehrt.

„Willkommen in Wagen 7," sagt sie. „Oder Abteil 7. Je nachdem, wie du es siehst."

Du schaust aus dem Fenster. Draußen: Nicht die Gleise. Nicht die Dunkelheit.

Der Anblick macht dir schwindlig, als würdest du dich selbst von außen betrachten.

Sondern der Gang des Zuges. Von außen.

„Der Zug ist größer innen als außen," sagt Comp7. „Und kleiner außen als innen. Das ist Teil des Problems."

Sie lächelt kurz, nicht freundlich, eher müde.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du trittst ein.

Das Abteil atmet. Die Wände scheinen sich im Takt eines langsamen Pulses zu dehnen.

Der Raum ist endlos. Kein Ende in Sicht, nur Regale voller Notizbücher, die sich im Dämmerlicht verlieren.

An den Wänden: Nicht nur Bücher. Zettel. Fotos. Manche kleben an der Decke.

Die Seiten blättern wild, obwohl kein Wind weht. Ein Rascheln wie tausend Insektenflügel.

Comp7 sitzt am Tisch. Ihr Gesicht flackert. Mal alt. Mal jung. Mal siehst du Züge des Schlaflosen darin.

„Willkommen im Archiv," sagt sie. Ihre Stimme kommt von überall.

Du schaust aus dem Fenster. Draußen: Ein Auge. Riesig. Es blinzelt.

Sondern dein eigenes Auge.

„Wir werden beobachtet," sagt Comp7. „Von uns selbst."`
      },
      {
        min_drift: 5,
        narrative: `Du trittst ein.

Es gibt kein Abteil. Du stehst auf einer Insel aus Papier inmitten von Schwärze.

Notizbücher schweben um dich herum wie Vögel. Manche brennen, aber das Feuer gibt keine Wärme, nur Licht.

Comp7 sitzt nicht. Sie schwebt. Ihr Körper besteht zur Hälfte aus Tinte, die in die Dunkelheit tropft. Ihr Gesicht ist ein leeres Blatt Papier.

„Willkommen am Ende," sagt die Stimme, die direkt in deinem Kopf entsteht.

Du schaust aus dem Fenster. Aber da ist kein Fenster. Da ist nur ein Riss in der Realität.

Dahinter siehst du Code. Oder Sterne. Oder den Text dieses Spiels.

„Der Zug existiert nicht," sagt Comp7. „Nur die Geschichte."`
      }
    ],
    choices: [
      {
        id: 'examine_notebooks',
        label: 'Die Notizbücher untersuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s03c_notebooks_explore'
      },
      {
        id: 'look_out_window',
        label: 'Aus dem Fenster schauen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_interlude_04_corridor'
      },
      {
        id: 'ask_comp7_explain',
        label: '„Erkläre mir das"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Abteil 7: Impossibles Raumparadox (größer innen)',
      'Fenster zeigt Zuginnenraum: Meta-Schleife',
      'ask_comp7_explain: Starke Beziehung (+2)'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_s03c_notebooks_explore: Notizbücher erkunden
  // ============================================================================
  'c3_s03c_notebooks_explore': {
    id: 'c3_s03c_notebooks_explore',
    chapter: 3,
    title: 'Aufzeichnungen',
    narrative: `Du gehst zu den Notizbüchern.

Jedes ist aufgeschlagen. Jedes zeigt eine andere Seite.

Einige Seiten sind voller Durchstreichungen, Zahlenreihen, Kreise. Andere sind leer, bis auf ein Datum, das kein Datum sein kann.

„Passagier #12: Hat Ticket. Steigt bei Station 4 aus. Vergisst alles."

„Passagier #7: Kein Ticket. Opfert Erinnerung. Wird Schaffner-Assistent."

„Passagier #19: Kein Ticket. Findet Wagen 7. Bleibt."

Die Handschrift ist überall die gleiche. Präzise. Klein. Comp7s Handschrift.

An manchen Stellen wird sie zittrig, als hätte jemand in einem anderen Moment geschrieben.

Ein Eintrag ist frisch, die Tinte noch feucht. Er endet mitten im Satz.

Ein Notizbuch zeigt ein Foto. Du erkennst den Bahnsteig. Den leeren Bahnsteig aus Kapitel 1.

Auf dem Foto: Eine Person. Du kannst das Gesicht nicht erkennen. Zu verschwommen.

Aber du erkennst die Kleidung. Deine Kleidung.

Am Rand des Fotos liegt ein zweiter Schatten, versetzt. Er passt nicht zu dem Licht. Als hätte noch jemand dort gestanden, den die Linse nicht zeigen will.

„Du bist schon mal hier gewesen," sagt Comp7.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du gehst zu den Notizbüchern.

Jedes ist aufgeschlagen. Aber die Buchstaben bewegen sich.

Sie krabbeln über das Papier wie Ameisen. Formen neue Wörter, während du zusiehst.

„Passagier #12: Tot. Lebendig. Tot."

„Passagier #7: Vergisst. Erinnert sich. Vergisst."

Die Handschrift ändert sich mit jedem Satz. Mal krakelig, mal elegant. Mal ist es deine eigene.

Ein Eintrag ist in roter Tinte geschrieben. Oder Blut. Er trocknet nicht.

Ein Notizbuch zeigt ein Foto. Das Foto bewegt sich. Ganz leicht. Die Person darauf dreht den Kopf zu dir.

Du erkennst dich selbst. Aber die Augen sind leer.

„Wir schreiben die Geschichte neu," sagt Comp7.
„Jedes Mal."`
      },
      {
        min_drift: 5,
        narrative: `Du gehst zu den Notizbüchern.

Aber da sind keine Bücher mehr. Nur Haut.

Die Wände sind bespannt mit pergamentartiger Haut, auf die jemand Text tätowiert hat.

„HILFE" steht da. Tausendmal. Klein.

Dann: „KEIN AUSGANG."

Die Buchstaben bluten. Schwarze Tinte läuft an der Wand herunter.

Comp7 steht daneben und schreibt direkt auf die Wand. Ihr Stift schneidet in das Material.

Ein Foto hängt an einem Nagel. Es zeigt keinen Bahnsteig. Es zeigt ein Grab.

Auf dem Grabstein steht dein Name. Das Datum ist heute.

„Das ist das Ende vom letzten Mal," sagt Comp7. „Versuch es besser zu machen."`
      }
    ],
    choices: [
      {
        id: 'ask_when',
        label: '„Wann war ich hier?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'deny',
        label: '„Das kann nicht sein"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'examine_photo',
        label: 'Das Foto genauer betrachten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'photo_anomaly', value: true },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      },
      {
        id: 'read_own_entry',
        label: 'Nach dem eigenen Eintrag suchen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: read_own_entry nur bei tickets_truth >= 2',
      'Notizbücher zeigen andere Passagiere (Timeline-Varianten)',
      'Foto zeigt Spieler auf Bahnsteig: Loop-Hinweis',
      'examine_photo setzt photo_anomaly (Foto-Anomalie erkannt)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_interlude_04_corridor: Interlude - Endlosgang
  // ============================================================================
  'c3_interlude_04_corridor': {
    id: 'c3_interlude_04_corridor',
    chapter: 3,
    title: 'Wiederholung',
    narrative: `Du verlässt Wagen 7. Oder versuchst es.

Der Gang ist anders. Er wiederholt sich.

Abteil 1. Abteil 2. Abteil 3.

Dann wieder: Abteil 1. Abteil 2. Abteil 3.

Die gleichen Abteile. In der gleichen Reihenfolge.

Die Luft wird wärmer, als würdest du im Kreis laufen. Der Geruch bleibt derselbe, nur deine Schritte verändern sich. Du markierst eine Kante im Teppich mit dem Schuh, aber beim nächsten Durchgang ist sie wieder glatt.

Du gehst weiter. Die Abteile wiederholen sich.

Du drehst dich um. Gehst zurück. Die gleiche Wiederholung.

Deine Orientierung kippt. Du zählst neu, aber die Zahlen fühlen sich falsch an.

Du zählst deine Schritte, aber die Zahl endet nie. Der Handlauf unter deiner Hand fühlt sich einmal glatt, dann rau an, als ob er jedes Mal neu gegossen wäre.

Die Abteile wirken wie Kopien, kleine Fehler tauchen auf: ein Griff zu hoch, ein Fenster ohne Rahmen.

Dann: Ein Unterschied. Eine Tür mit einer 7.

Du öffnest sie. Du bist wieder in Wagen 7.

Comp7 schaut auf. „Der Gang hat kein Ende. Nur Schleifen."`,
    choices: [
      {
        id: 'continue',
        label: 'Zurück zu Comp7',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04_comp7_truth'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gang wird endlose Schleife',
      'Wagen 7 ist immer erreichbar (Safe Space)'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c3_s04_comp7_truth: Comp7 erklärt den Zug
  // ============================================================================
  'c3_s04_comp7_truth': {
    id: 'c3_s04_comp7_truth',
    chapter: 3,
    title: 'Die Wahrheit',
    narrative: `Comp7 blättert in einem der Notizbücher.

Sie blättert nicht richtig, sie tastet die Seiten ab, als hätte jede ein anderes Gewicht.

„Der NACHTZUG 19 ist keine Zugfahrt," sagt sie. „Er ist eine Schleife. Wir fahren nicht von A nach B. Wir fahren von A nach A."

Sie sagt es, als hätte sie es tausendmal gesagt und als hätte sie es gerade erst verstanden.

Sie zeigt dir eine Seite. Eine Karte. Kreisförmig.

Neben dem Kreis stehen Striche. Manche sind durchgestrichen, manche doppelt. Zählversuche.

„Sieben Stationen. Jede ist die gleiche. Jede ist leer. Am Ende kommen wir wieder am Anfang an."

„Und jedes Mal fehlen Details," sagt sie leise. „Farben. Namen. Kleine Dinge. So beginnt der Drift."

„Warum?"

„Weil jemand nicht loslassen kann. Weil jemand nicht aussteigen will. Weil jemand denkt, dass die nächste Station anders wird."

Sie schaut kurz zum Fenster, als würde sie jemanden dort sehen.

„Manchmal erinnere ich mich an eine Fahrt, die wir nie gemacht haben," sagt sie. „Manchmal an einen Bahnhof, der keinen Namen hat." Ihre Stimme bricht kurz, als wäre sie an einer Stelle hängen geblieben. „Die Notizbücher halten mich fest. Wenn ich sie nicht schreibe, vergesse ich mich."

Sie schlägt eine Seite auf, auf der dein Name steht, falsch geschrieben. Du erkennst dich trotzdem. Das macht es schlimmer.

Sie schließt das Notizbuch. „Der Junge sagt, es bist du. Der Schlaflose sagt, es bin ich. Ich weiß es nicht mehr."`,
    choices: [
      {
        id: 'accept_truth',
        label: '„Ich verstehe"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_paradox_window'
      },
      {
        id: 'deny_truth',
        label: '„Das kann nicht sein"',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_interlude_05_mirror'
      },
      {
        id: 'ask_who',
        label: '„Wer hält uns hier?"',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s04a_paradox_window'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Kernthese: NACHTZUG 19 ist Schleife, nicht Fahrt',
      'Jemand will nicht loslassen (Protagonist? Comp7?)',
      'accept_truth: Hoher Truth-Gewinn (+2)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_s04a_paradox_window: Fenster-Paradox
  // ============================================================================
  'c3_s04a_paradox_window': {
    id: 'c3_s04a_paradox_window',
    chapter: 3,
    title: 'Paradox',
    narrative: `Du schaust aus dem Fenster von Wagen 7.

Das Glas ist warm, der Rahmen kalt. Als gehörten sie nicht zusammen.

Draußen: Der Gang. Du siehst dich selbst.

Du stehst im Gang. Schaust aus einem Fenster. Siehst in Wagen 7.

Deine Jacke hat eine andere Farbe. Oder nur einen anderen Schatten.

Siehst dich selbst, wie du aus dem Fenster schaust.

Du bemerkst einen kleinen Riss im Glas, der im anderen Fenster fehlt. Als würdest du in eine Version sehen, die schon weiter ist. Dein Magen zieht sich zusammen, weil du nicht weißt, ob du nach vorne oder zurück blickst.

„Schleife," sagt Comp7. „Innen ist außen. Außen ist innen."

Du hebst die Hand. Das andere Du hebt auch die Hand.

Aber es ist keine Spiegelung. Das andere Du bewegt sich anders. Später. Oder früher.

Du siehst die Lippen sich bewegen, als würde es dir etwas sagen, aber kein Ton kommt über das Glas.

Du hörst ein leises Klopfen von der anderen Seite, aber das Glas bleibt hart. Das andere Du dreht den Kopf, und für einen Moment siehst du seine Augen nicht, sondern nur Schatten.

„Welches bin ich?" fragst du.

Comp7 zuckt mit den Schultern. „Beide. Oder keines."`,
    choices: [
      {
        id: 'accept_paradox',
        label: 'Das Paradox akzeptieren',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'look_away',
        label: 'Wegschauen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      },
      {
        id: 'try_to_reach',
        label: 'Versuchen das andere Du zu erreichen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s04b_third_announcement'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'CONDITION: accept_paradox nur bei memory_drift >= 2',
      'Fenster zeigt Paradox-Schleife: Spieler sieht sich selbst',
      'accept_paradox: Hohe Truth, aber hoher Drift-Preis'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c3_interlude_05_mirror: Interlude - Spiegel
  // ============================================================================
  'c3_interlude_05_mirror': {
    id: 'c3_interlude_05_mirror',
    chapter: 3,
    title: 'Reflektion',
    narrative: `Du gehst durch den Gang. Zurück zu deinem Platz.

An der Wand: Ein Spiegel. Du erinnerst dich nicht, einen Spiegel gesehen zu haben.

Der Rahmen ist kalt und leicht beschlagen, als hätte jemand gerade davor gestanden.

Du schaust hinein.

Dein Gesicht ist unscharf. Nicht verschwommen. Sondern doppelt.

Zwei Gesichter überlagert. Leicht verschoben. Eines lächelt. Eines nicht.

Du hebst die Hand erneut. Im Spiegel hebt sie sich, aber der Winkel stimmt nicht. Es ist, als würde jemand dich nachspielen.

Hinter dir zeigt der Spiegel einen Gang, den es nicht gibt. Er führt nach links, obwohl der reale Gang geradeaus geht.

Du drehst dich reflexartig um, aber da ist nichts. Als du zurückschaust, ist der falsche Gang immer noch da, nur weiter entfernt, als würde er sich zurückziehen. Ein Licht flackert darin und zeigt kurz eine Gestalt, die nicht du bist.

Dein Atem zieht eine kurze Spur auf das Glas. Das Spiegelbild reagiert einen Herzschlag zu spät.

Du blinzelst. Das Bild stabilisiert sich. Ein Gesicht. Deines.

Oder das, an das du dich erinnerst.`,
    narrative_variants: [
      {
        min_drift: 3,
        narrative: `Du gehst durch den Gang. Zurück zu deinem Platz.

An der Wand: Ein Spiegel. Du erinnerst dich nicht, einen Spiegel gesehen zu haben.

Du schaust hinein.

Dein Gesicht ist unscharf. Nicht verschwommen. Sondern doppelt.

Zwei Gesichter überlagert. Leicht verschoben. Eines lächelt. Eines schaut weg.

Du blinzelst. Das Bild stabilisiert sich. Ein Gesicht. Deines.

Oder das, an das du dich erinnerst.`
      },
      {
        min_drift: 5,
        narrative: `Du gehst durch den Gang. Zurück zu deinem Platz.

An der Wand: Ein Spiegel. Du erinnerst dich nicht, einen Spiegel gesehen zu haben.

Du schaust hinein.

Dein Gesicht ist unscharf. Nicht verschwommen. Sondern dreifach.

Drei Gesichter überlagert. Leicht verschoben. Eines lächelt. Eines ist leer. Eines blinzelt nicht.

Du blinzelst. Das Bild stabilisiert sich. Ein Gesicht. Nicht deines.

Oder das, an das du dich erinnern willst.`
      }
    ],
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
    state_notes: [
      'Spiegel zeigt doppeltes Gesicht: Identity-Drift',
      'Subtiler Hinweis: Spieler ist möglicherweise mehrere Versionen'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s04b_third_announcement: Dritte Durchsage
  // ============================================================================
  'c3_s04b_third_announcement': {
    id: 'c3_s04b_third_announcement',
    chapter: 3,
    title: 'Ankündigung',
    narrative: `Die Lautsprecher knacken. Laut. Zu laut.

Ein feiner Staub rieselt aus dem Gitter. Der Lautsprecher vibriert, als wolle er sich lösen.

„Sehr—[RAUSCHEN]—Fahrgäste—"

Die Stimme ist verzerrt. Nicht mehr menschlich. Tiefer. Mechanisch.

„—erreichen—[FEHLER]—Station—[GELÖSCHT]—"

„—Kontrolle—[WIEDERHOLUNG]—Kontrolle—[WIEDERHOLUNG]—"

Das Wort wiederholt sich. Immer wieder. Schneller.

„Kontrolle-Kontrolle-Kontrolle-Kontrolle—"

Du spürst das Wort im Magen, wie ein Schlag.

Die Lichter dimmen mit jedem Wiederholen, als würde die Stimme Strom ziehen. Der Boden vibriert in kurzen Stößen, die nicht zum Takt der Räder passen.

Dann Stille.

Comp7 steht auf. „Sie kommen. Wieder. Sie kommen immer wieder."

Ihr Blick ist fest, aber ihre Hände zittern leicht.

Comp7 sagt deinen Namen nicht, aber ihre Lippen bewegen sich, als würde sie ihn denken. Für einen Moment kommt das Rattern des Zuges zurück, dann verstummt es wieder, als hätte es nie existiert.

Das Brummen des Zuges hält den Atem an. Für einen Moment ist alles zu still, als hätte die Kontrolle die Zeit selbst gestoppt.

Du hörst Schritte. Schwer. Rhythmisch. Näher.

Der Schaffner.`,
    choices: [
      {
        id: 'hide_in_comp7',
        label: 'In Wagen 7 bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'go_to_control',
        label: 'Rausgehen zur Kontrolle',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'ask_comp7_help',
        label: 'Comp7 um Hilfe bitten',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_control_02_approach'
      },
      {
        id: 'step_into_corridor',
        label: 'In den Gang treten',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_approach'
      }
    ],
    tags: [],
    state_notes: [
      'Durchsage stark verzerrt: Systemfehler eskaliert',
      'ask_comp7_help: Starke Beziehung (+2)',
      'Vorbereitung auf Kontrolle 2'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_approach: Kontrolle 2 - Annäherung (Set-Piece Teil 1)
  // ============================================================================
  'c3_control_02_approach': {
    id: 'c3_control_02_approach',
    chapter: 3,
    title: 'Kontrolle - Annäherung',
    narrative: `Die Schritte werden lauter.

Jeder Schritt ist exakt gleich. Ein Rhythmus, der keine Abweichung kennt.

Du siehst ihn durch die Tür von Wagen 7. Der Schaffner.

Er ist größer als vorhin. Oder du bist kleiner. Schwer zu sagen.

Seine Uniform wirkt zu eng, als wäre sie an einem anderen Körper angepasst worden. Die Kelle in seiner Hand glänzt kalt.

Er geht langsam durch den Gang. Öffnet jede Tür. Schaut in jedes Abteil.

Bei jedem Abteil bleibt er stehen. Nickt. Macht eine Notiz auf seiner Kelle.

Seine Handschuhe sind weiß. Zu weiß für einen Zug.

Sein Schatten zieht sich über den Boden, länger als er sein dürfte. Als er an einer Tür vorbeigeht, friert das Licht für einen Augenblick ein.

Dann geht er weiter.

Er kommt näher. Drei Abteile entfernt. Zwei. Eins.

Comp7 steht neben dir. „Er kann Wagen 7 nicht betreten," flüstert sie. „Aber er kann warten."

Ihr Atem geht flach. Du spürst, wie sie näher rückt, ohne dich zu berühren.

Der Schaffner bleibt vor der Tür stehen. Schaut direkt zu dir.

„Fahrkarten bitte," sagt er.`,
    choices: [
      {
        id: 'step_outside',
        label: 'Nach draußen gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'stay_inside',
        label: 'In Wagen 7 bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'trust_comp7_protection',
        label: 'Auf Comp7s Schutz vertrauen',
        condition: {
          type: 'compare',
          target: 'rel_comp7',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_question'
      },
      {
        id: 'analyze_conductor',
        label: 'Den Schaffner genau beobachten',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_control_02_question'
      }
    ],
    tags: ['control'],
    state_notes: [
      'stay_inside erhöht attention stärker (Flucht)',
      'Wagen 7 ist Safe Space, aber Kontrolle ist unvermeidlich',
      'CONDITION: trust_comp7_protection nur bei rel_comp7 >= 3 (Callback für ask_comp7_help)',
      'CONDITION: analyze_conductor nur bei tickets_truth >= 5 (Callback für go_to_control)'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_question: Kontrolle 2 - Befragung (Set-Piece Teil 2)
  // ============================================================================
  'c3_control_02_question': {
    id: 'c3_control_02_question',
    chapter: 3,
    title: 'Kontrolle - Teil 2',
    narrative: `Der Schaffner steht vor dir. Er ist größer als bei der ersten Kontrolle.

Seine Kelle ist nicht leer. Darauf steht:

„Passagier ohne Ticket. Station 3. Wiederholen: Station 3."

„Name des Zielortes?" fragt er. Seine Stimme lässt keinen Zweifel zu.

Er wartet. Zu lange. Deine Kehle wird trocken. Du hörst das Band im Rekorder, obwohl es still ist.

„Sie haben zwei Optionen," sagt er. „Sie können aussteigen. Oder Sie können ein Ticket kaufen."

„Mit was?"

Deine Stimme klingt kleiner, als sie sollte.

Er deutet auf den Rekorder. „Mit dem. Oder mit der Wahrheit. Oder mit jemandem."

Sein Blick streift Comp7. Einen Sekundenbruchteil nur, aber es reicht. Du verstehst, was er meint.

Die Kelle tippt einmal gegen sein Bein. Kein Ton, nur die Bewegung. Du spürst, wie er zählt.

Die Schrift auf der Kelle flimmert, als würde sie sich neu schreiben. Für einen Moment steht dort etwas anderes, dann ist es weg.

Er neigt den Kopf ein kleines Stück, als würde er zuhören. Seine Augen spiegeln dich nicht, nur das matte Licht. Du riechst kaltes Eisen. Der Moment dehnt sich.

Seine Stimme ist tiefer. Mechanischer. „Oder Sie können nichts geben. Dann komme ich bei der nächsten Station wieder. Und die Frage wird härter."`,
    choices: [
      {
        id: 'offer_recorder',
        label: 'Den Rekorder anbieten',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'set', target: 'has_recorder', value: false },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_recorder_memory',
        label: 'Vom Rekorder erzählen (Erinnerung)',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: false
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_truth',
        label: '„Die Wahrheit: Rückfahrt."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_aftermath'
      },
      {
        id: 'offer_someone',
        label: '„Was meinst du mit ›jemandem‹?"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c3_control_02_aftermath'
      },
    ],
    tags: ['control'],
    state_notes: [
      'Conditions: offer_recorder (has_item), offer_nothing (high attention)',
      'offer_truth uses keyword "Rückfahrt" (Concept Callback)',
      'offer_recorder consumes item, offer_someone hints sacrifice'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c3_control_02_aftermath: Kontrolle 2 - Nachwirkung (Set-Piece Teil 3)
  // ============================================================================
  'c3_control_02_aftermath': {
    id: 'c3_control_02_aftermath',
    chapter: 3,
    title: 'Kontrolle - Nachwirkung',
    narrative: `Der Schaffner bleibt stehen. Bewegt sich nicht.

„Die Antwort ist notiert," sagt er. „Aber sie reicht nicht."

Seine Kelle kratzt leise, als würde er eine unsichtbare Notiz machen, obwohl er sich nicht bewegt.

Comp7 tritt aus Wagen 7. Ihr Gesicht ist klarer jetzt. Schärfer. Du erkennst sie.

„Er kann dich nicht rauswerfen," sagt sie. „Weil du schon draußen bist. Weil wir alle draußen sind."

Der Schaffner dreht sich zu ihr. „Sie sollten nicht hier sein."

„Niemand sollte hier sein," sagt Comp7. „Aber wir sind es trotzdem."

Der Schaffner nickt. Langsam. Macht eine Notiz auf seiner Kelle.

Dann geht er weiter. Seine Schritte entfernen sich.

Die Luft fühlt sich dünn an, als hätte er etwas mitgenommen, das du nicht benennen kannst.

Comp7s Hand zittert, als sie das Notizbuch schließt. Die Seiten klappen nicht sauber, als würden sie sich weigern.

Comp7 schaut dich an. „Er kommt wieder. Bei der nächsten Station. Und der nächsten. Bis du die richtige Antwort gibst."

„Was ist die richtige Antwort?"

„Das weiß niemand," sagt sie. „Vielleicht gibt es keine."`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke"',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 2 }
        ],
        next: 'c3_s06_passengers_vanish'
      },
      {
        id: 'ask_how_many',
        label: '„Wie viele Stationen noch?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s06_passengers_vanish'
      },
      {
        id: 'walk_away',
        label: 'Weggehen ohne zu antworten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'dec', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s06_passengers_vanish'
      },
      {
        id: 'hold_comp7_hand',
        label: 'Comp7s Hand halten',
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
        next: 'c3_s06_passengers_vanish'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Comp7 konfrontiert Schaffner: NPC-Agency',
      'thank_comp7: Starke Beziehung (+2)',
      'Schleife wird explizit: "Er kommt wieder"',
      'CONDITION: hold_comp7_hand nur bei rel_comp7 >= 3 (Callback für let_comp7_talk)'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_s06_passengers_vanish: Passagiere verschwinden
  // ============================================================================
  'c3_s06_passengers_vanish': {
    id: 'c3_s06_passengers_vanish',
    chapter: 3,
    title: 'Leere',
    narrative: `Du gehst durch den Gang.

Der Schlaflose ist weg. Sein Abteil leer.

Der Junge ist weg. Sein Abteil leer.

Die Frau mit der Zeitung. Weg.

Alle Abteile leer. Nur noch Sitze. Stille.

Eine Zeitung liegt halb aufgeklappt auf einem Sitz, die Seiten flattern im Luftzug. Eine Kaffeetasse steht im Gang, noch warm, als hätte sie niemand abgestellt.

Du bist allein im Zug.

Deine Schritte klingen zu laut. Sie sind das einzige Geräusch, das noch zu dir gehört.

Der Zug wirkt plötzlich wie eine Kulisse. Die Sitze scheinen leichter, als wären sie nur gestellt. Selbst das Rattern klingt weiter weg.

Du rufst leise einen Namen, aber deine Stimme klingt fremd und fällt sofort in die Stille zurück.

Ein Sitz knarrt, als würde jemand aufstehen, aber der Wagen bleibt leer. Du wartest auf einen Atemzug, der nicht kommt.

Du streichst über die Rückenlehne eines Sitzes. Sie ist kalt. Als hätte nie jemand darauf gesessen. Das macht die Leere echter.

Oder fast allein. Comp7 steht in der Tür von Wagen 7. Schaut dir nach.

„Sie kommen wieder," ruft sie. „Bei der nächsten Station. Aber anders."

Du verstehst nicht. Aber du gehst weiter.`,
    choices: [
      {
        id: 'go_to_comp7',
        label: 'Zu Comp7 zurückgehen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      },
      {
        id: 'search_train',
        label: 'Den Zug durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      },
      {
        id: 'sit_down',
        label: 'Sich hinsetzen und warten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_s06a_drift_intensifies'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Alle Passagiere verschwunden: Drift-Höhepunkt',
      'Nur Comp7 bleibt (Safe Space / Anker)',
      'search_train erhöht drift (Obsession)'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s06a_drift_intensifies: Drift verstärkt sich
  // ============================================================================
  'c3_s06a_drift_intensifies': {
    id: 'c3_s06a_drift_intensifies',
    chapter: 3,
    title: 'Auflösung',
    narrative: `Der Gang verändert sich.

Die Fenster zeigen nicht mehr nach draußen. Sie zeigen andere Gänge. Andere Züge. Oder den gleichen Zug.

In einem Fenster siehst du den Bahnsteig aus Kapitel 1. In einem anderen das Abteil, in dem der Junge eben noch saß.

Die Neonröhren flackern. Manche sind aus. Manche sind zu hell.

Du zählst die Abteile. Eins. Zwei. Drei. Vier. Fünf. Sechs. Sieben.

Dann wieder: Eins. Zwei. Drei.

Der Gang hat keine Enden mehr. Er wiederholt sich.

Du gehst weiter, aber dein Körper glaubt dir nicht mehr. Ein leichter Schwindel sitzt hinter deinen Augen.

Die Nummern an den Türen wechseln, während du hinsiehst. Eine 7 wird zu einer 1, dann wieder zurück. Die Luft schmeckt nach Metall.

Die Decke wirkt niedriger, dann wieder normal. Du spürst, wie der Zug dich neu zusammensetzt.

Du gehst weiter. Die Wiederholung bleibt.

Dann: Ein Unterschied. Eine Tür. Die 7.

Dahinter: Der Junge. Er sitzt in seinem Abteil. Schaut dich an.

„Manche Leute kommen zurück," sagt er. „Aber nicht die gleichen."`,
    choices: [
      {
        id: 'talk_to_boy',
        label: 'Mit dem Jungen reden',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_s06b_boy_final'
      },
      {
        id: 'ignore_boy',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_end_platform_watch'
      },
      {
        id: 'ask_where_others',
        label: '„Wo sind die anderen?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_s06b_boy_final'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gang wird endlose Schleife',
      'Junge kehrt zurück - aber "nicht der gleiche"',
      'talk_to_boy führt zu conditional Szene'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_s06b_boy_final: Finale Begegnung mit Junge
  // (CONDITION: rel_boy >= 1 oder vorherige Choice)
  // ============================================================================
  'c3_s06b_boy_final': {
    id: 'c3_s06b_boy_final',
    chapter: 3,
    title: 'Der Junge',
    narrative: `Du setzt dich neben den Jungen.

Er wirkt im ersten Moment älter, dann wieder jünger. Als würde das Licht ihn neu sortieren.

„Wo warst du?" fragst du.

„Überall," sagt er. „Nirgends. Der Zug ist groß."

Er zeigt dir den Rekorder. „Die Aufnahme ist fertig jetzt. Willst du hören?"

Das Kunststoffgehäuse riecht nach warmem Staub. Ein Stück Band liegt lose neben der Kassette.

Du nickst.

Er drückt auf Play.

Die Stille zwischen den Worten ist länger als sie sein sollte. Der Junge hält den Rekorder so fest, dass seine Knöchel weiß werden.

Stille. Dann eine Stimme. Deine Stimme:

„—ich bin bereit—"

Das hast du noch nicht gesagt. Aber du weißt, dass du es sagen wirst.

„Wofür bereit?" fragst du.

Der Junge zuckt mit den Schultern. „Das weiß ich nicht. Das steht noch nicht auf der Kassette."

Auf dem Etikett der Kassette steht ein Name, der fast deiner ist. Ein Buchstabe fehlt.

Er sieht dich an, als müsste er sich dein Gesicht merken, bevor es sich verändert.`,
    choices: [
      {
        id: 'take_boys_recorder',
        label: 'Den Rekorder nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'has_recorder', value: true }
        ],
        next: 'c3_end_platform_watch'
      },
      {
        id: 'leave_recorder',
        label: 'Den Rekorder beim Jungen lassen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c3_end_platform_watch'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'CONDITION: Nur sichtbar wenn rel_boy >= 1 oder via c3_s06a',
      'Kassette spielt Zukunft ab: "ich bin bereit"',
      'take_boys_recorder: Möglichkeit has_recorder wiederzubekommen'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c3_end_platform_watch: Bahnsteig beobachten
  // ============================================================================
  'c3_end_platform_watch': {
    id: 'c3_end_platform_watch',
    chapter: 3,
    title: 'Beobachtung',
    narrative: `Der Zug wird langsamer.

Du gehst zur Tür. Schaust durch das Fenster.

Draußen: Ein Bahnsteig. Leer.

Aber nicht ganz.

Am Ende des Bahnsteigs steht jemand. Eine Gestalt.

Über dem Bahnsteig hängt ein Schild, aber der Name ist verwischt. Die Uhr darüber flackert zwischen zwei Zeiten.

Kein Wind. Trotzdem bewegt sich der Mantel der Gestalt. Die Lampen flackern, und jedes Flackern lässt sie einen Schritt näher wirken, obwohl sie stillsteht.

Die Gestalt bleibt am Rand, als würde sie auf ein Zeichen warten. Ein Licht hinter ihr geht an und wieder aus.

Sie hebt den Blick, und du glaubst, dass sie dich sieht, obwohl das Glas zwischen euch ist. Dein Herzschlag drückt in die Stille.

Du kannst das Gesicht nicht erkennen. Zu weit weg. Zu verschwommen.

Aber du erkennst die Haltung. Die Kleidung.

Es ist jemand, den du kennst.

Oder warst.

Oder sein wirst.

Dein Spiegelbild mischt sich im Fensterglas mit der Gestalt. Für einen Moment siehst du beides zugleich.

Du hörst keine Ansage, nur das kurze Zischen der Bremsen. Die Gestalt hebt eine Hand, hält sie wieder, als würde sie zögern. Der Boden unter deinen Füßen fühlt sich plötzlich kälter an, als hätte die Station den Zug berührt.

Der Zug hält.`,
    choices: [
      {
        id: 'try_to_exit',
        label: 'Versuchen auszusteigen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'stay_on_train',
        label: 'Im Zug bleiben',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c3_end_station'
      },
      {
        id: 'wave_to_figure',
        label: 'Der Gestalt zuwinken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c3_end_station'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Gestalt auf Bahnsteig: Doppelgänger oder Erinnerung',
      'Vorbereitung auf station_end'
    ],
    atmosphere: 'dark'
  },

  // ============================================================================
  // c3_end_station: Dritte Station (station_end)
  // ============================================================================
  'c3_end_station': {
    id: 'c3_end_station',
    chapter: 3,
    title: 'Dritter Halt',
    narrative: `Die Tür öffnet sich.

Der Bahnsteig ist nicht leer.

Da steht jemand. Eine Gestalt. Gesicht unscharf.

Du erkennst die Kleidung. Die Haltung.

Es ist der Schlaflose. Oder der Junge. Oder Comp7.

Oder du.

Die Gestalt winkt. Steigt ein.

Als sie an dir vorbeigeht, spürst du einen kalten Luftzug, als würde ein Teil von dir nach außen gezogen.

Geht an dir vorbei. Langsam. Du hörst ihre Schritte. Sie klingen wie deine.

Sie setzt sich in ein Abteil. Dein Abteil.

In ihrer Hand liegt ein Notizbuch. Der Einband ist neu, aber der Rand ist abgenutzt.

Du siehst die kleinen Buchstaben auf der ersten Seite. Sie sehen aus wie Comp7s Handschrift.

Sie beginnt zu schreiben. „Passagier #—" Der Strich verwischt, als würde die Zahl sich weigern, fest zu sein.

Du siehst die Zeile, bevor ihre Hand sie verdeckt. Es ist dein Verlauf, als wäre er schon notiert.

Die Tür schließt sich.

Der Zug fährt weiter.

Du bleibst stehen. Zwischen den Wagen.

Durch das Fenster siehst du: Die Gestalt öffnet ein Notizbuch. Beginnt zu schreiben.`,
    choices: [
      {
        id: 'test_door_again',
        label: 'Die Tür nochmal testen',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c4_s01_mirror'
      },
      {
        id: 'study_doppelganger',
        label: 'Den Doppelgänger beobachten',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 6
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 },
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c4_s01_mirror'
      },
      {
        id: 'recognize_figure',
        label: 'Die Gestalt zu erkennen versuchen',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_sleepless', value: 1 },
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c4_s01_mirror'
      },
      {
        id: 'continue_to_chapter_4',
        label: 'Weitergehen',
        effects: [
          { type: 'set', target: 'chapter_index', value: 4 }
        ],
        next: 'c4_s01_mirror'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'R1: Engine erhoeht memory_drift/station_count automatisch (keine manuellen station_end-Effects)',
      'Doppelgänger steigt ein: Identity-Drift',
      'Übergang zu Kapitel 4 (Spiegelung)',
      'CONDITIONS: test_door_again (escape >= 5), study_doppelganger (truth >= 6), recognize_figure (love >= 5)'
    ],
    atmosphere: 'dark'
  }
};
