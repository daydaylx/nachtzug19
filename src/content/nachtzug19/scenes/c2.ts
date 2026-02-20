// ============================================================================
// NACHTZUG 19 - Kapitel 2: Die erste Kontrolle (REDUCED / P1 FIX)
// ============================================================================
// Szenen (18):
// Setup: c2_s01_ticket_search, c2_s01a_passenger_examination, c2_s01b_ticket_pocket, c2_s01c_corridor_chill
// Boy: c2_s02_boy_recorder, c2_s02a_recorder_listening, c2_s02b_corridor_anomaly, c2_s02c_boy_vanish, c2_s02b1_door_numbers
// Comp7: c2_s03_comp7_intro, c2_s03a_comp7_notebook
// Control: c2_s04_announcement, c2_s04b_breath_control, c2_s04a_conductor_approach, c2_control_01_approach
// Control Interaction: c2_control_01_question, c2_control_01_aftermath
// End: c2_end_station
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const chapter2Scenes: ScenesCollection = {
  // ============================================================================
  // c2_s01_ticket_search: Ticket-Suche
  // ============================================================================
  'c2_s01_ticket_search': {
    id: 'c2_s01_ticket_search',
    chapter: 2,
    title: 'Ohne Ticket',
    narrative: `23:47. Und du fährst noch.

Der Zug fährt weiter. Das Brummen ist konstant, tief.

Du gehst durch den Wagen. Der Schlaflose starrt aus dem Fenster. Seine Jacke ist jetzt schwarz. War sie nicht eben noch blau?

Ein kaltes Gefühl kriecht deinen Nacken hoch: Du hast kein Ticket.

Von weiter vorn kommt ein Metallklackern. Rhythmisch. Näher kommend. Kontrolle.

Du drückst die Finger gegen den Stoff deiner Jacke, als könnte dort doch noch irgendwo ein Papierrand zu spüren sein. Nichts. Nur der eigene Puls, hart und unregelmäßig.

Im Fenster wandert dein Spiegelbild mit, einen halben Schritt zu langsam. Für einen Atemzug sieht es aus, als würde es dich nicht nachahmen, sondern prüfen.

Das Klackern wird lauter. Nicht schnell, nicht hektisch. Sicher. So geht jemand, der weiß, dass er immer gefunden wird.`,
    narrative_variants: [
      {
        // Truth-Pfad: Analytischer Geist, erkennt Muster sofort
        condition: { type: 'compare', target: 'tickets_truth', operator: '>=', value: 5 },
        narrative: `Der Zug fährt weiter. Das Brummen ist konstant, tief – und du hast es schon katalogisiert: 87 Hertz, ein leichtes Flackern alle achtzehn Sekunden.

Du gehst durch den Wagen. Der Schlaflose starrt aus dem Fenster. Seine Jacke ist schwarz. Du weißt noch genau: Sie war blau. Du hast beides gesehen. Das bedeutet etwas.

Dann die Erkenntnis, klar wie ein Schnitt: Du hast kein Ticket. Nicht verloren. Nie gehabt. Hast du das hier schon einmal gedacht?

Von weiter vorn kommt ein Metallklackern. Rhythmisch, mit konstantem Intervall. Kontrolle – und du hast keine Antwort auf die einzige Frage, die sie stellen werden.

Du drückst die Finger in den Jackenstoff, aber du suchst nicht wirklich. Du beobachtest dich beim Suchen. Als würdest du einem Fremden zusehen, der verzweifelt tut.

Im Fenster wandert dein Spiegelbild einen halben Schritt zu langsam. Es hat aufgehört, deine Gesten zu kopieren. Es prüft dich.

*Wann war ich hier zuletzt?* Die Frage bildet sich, bevor du entscheiden kannst, sie zu stellen. Das Klackern wird lauter.`,
        priority: 40
      },
      {
        // Love-Pfad: Emma-Vision prägt alles, der Zettel brennt in der Tasche
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'saw_emma_vision', value: true },
            { type: 'bool', target: 'has_emma_note', value: true }
          ]
        },
        narrative: `Der Zug fährt weiter. Das Brummen fühlt sich an wie ein Atem, der auf dich wartet.

Du gehst durch den Wagen. Der Schlaflose starrt aus dem Fenster. Seine Jacke ist schwarz, aber du siehst kurz etwas anderes – ein Muster, ein Gesicht, das du nicht festhalten kannst. Emma.

*Sie war hier.* Das weißt du, ohne zu wissen, wie.

Dann der Griff an die Jacke, und deine Finger finden den gefalteten Zettel. Sie ist noch bei dir. Irgendwie. Du liest die Zeilen nicht nochmal – du kennst sie bereits auswendig, obwohl du sie kaum einmal gelesen hast.

Von weiter vorn kommt ein Metallklackern. Kontrolle. Und du hast kein Ticket – aber das ist nicht das, was dich aufhält.

Du suchst zwischen den Passagieren nach einem bestimmten Gesicht. Weißt du, wen du eigentlich suchst? Hast du sie je von vorne gesehen?

Im Fenster wandert dein Spiegelbild mit, einen halben Schritt zu langsam. Es schaut dorthin, wo du nicht schaust. Das Klackern wird lauter.`,
        priority: 35
      },
      {
        // Escape-Pfad: Unsichtbar bleiben, kein Aufsehen erregen
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'tickets_escape', operator: '>=', value: 4 },
            { type: 'compare', target: 'conductor_attention', operator: '<=', value: 1 }
          ]
        },
        narrative: `Der Zug fährt weiter. Du hörst jeden Schritt, der nicht dein eigener ist.

Du gehst durch den Wagen, dicht an der Wand, Schulter leicht eingezogen. Sitz niedrig. Kein Augenkontakt. Du weißt, wie man nicht gesehen wird – du übst das schon eine Weile.

Der Schlaflose starrt aus dem Fenster. Seine Jacke ist schwarz. Du schaust weg, bevor er sich drehen kann.

Dann der kalte Griff: kein Ticket. Du tastest ruhig, methodisch, ohne Panik. Panik macht laut. Du bist nicht laut.

Von weiter vorn kommt ein Metallklackern. Kontrolle, noch drei Wagen entfernt, schätzt du. Zeit genug – wenn du jetzt richtig handelst.

Du drückst dich in eine Ecke, Rücken zur Wand, und wartest ab. Dein Spiegelbild im Fenster starrt zurück. Du weichst seinem Blick aus. Es weicht nicht aus.

Das Klackern wird lauter. Du zählst die Schritte.`,
        priority: 30
      },
      {
        // Guilt-Pfad: Etwas Unerledigtes lastet, Schuld färbt alles
        condition: { type: 'compare', target: 'tickets_guilt', operator: '>=', value: 3 },
        narrative: `Der Zug fährt weiter. Das Brummen klingt wie eine Frage, auf die du keine Antwort hast.

Du gehst durch den Wagen. Der Schlaflose starrt aus dem Fenster. Seine Jacke ist schwarz. Du fragst dich, ob er dich kennt. Ob irgendjemand hier dich kennt. Ob du das verdient hättest.

Das Ticket. Du hast keins. Natürlich nicht. Irgendwie fühlt sich das richtig an – als dürftest du gar keins haben.

Von weiter vorn kommt ein Metallklackern. Kontrolleur. Dein Magen zieht sich zusammen, aber nicht vor Angst. Vor etwas Älterem.

Du steckst die Hände in die Jacke. Leer. Deine Finger kennen diese Leere schon. Sie sind schon früher hier gewesen und haben nichts gefunden. Du weißt nicht, was du gesucht hättest.

Im Fenster wandert dein Spiegelbild mit, einen halben Schritt zu langsam. Es sieht dich mit einem Ausdruck an, den du nicht aushalten willst.

Das Klackern wird lauter. Du verdienst das, denkt ein Teil von dir. Ein anderer Teil schreit, dass das nicht stimmt.`,
        priority: 25
      }
    ],
    choices: [

      {
        id: 'search_self',
        label: 'Taschen durchsuchen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s01b_ticket_pocket'
      },
      {
        id: 'look_around',
        label: 'Umsehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      },
      {
        id: 'keep_walking',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s01a_passenger_examination'
      }
    ],
    tags: [],
    state_notes: [
      'Jacke des Schlaflosen wechselt (blau -> schwarz)',
      'Druck aufgebaut: Kontrolle kommt'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s01a_passenger_examination: Passagiere & Junge (Merged)
  // ============================================================================
  'c2_s01a_passenger_examination': {
    id: 'c2_s01a_passenger_examination',
    chapter: 2,
    title: 'Beobachter',
    narrative: `Du siehst dich um. Die anderen Passagiere bewegen sich in winzigen, mechanischen Gesten. Eine Frau liest eine Zeitung, deren Buchstaben wie Insekten über das Papier krabbeln.

Im nächsten Abteil sitzt ein Junge. Vielleicht zwölf. Er trägt große Kopfhörer und hält einen alten Kassettenrekorder.

Er bemerkt dich nicht. Oder tut so. Du hörst das leise Surren des Rekorders.

Der Wagen riecht nach nasser Wolle und Metallstaub. Niemand spricht. Selbst das Rascheln der Zeitung klingt gedämpft, als würde jede Bewegung in Watte passieren.

Du bleibst einen Moment stehen, länger als nötig. Niemand hebt den Blick. Diese Gleichgültigkeit fühlt sich nicht wie Ruhe an, eher wie eine Übereinkunft, an der du nicht teilnimmst.

Nur der Junge hat einen eigenen Rhythmus. Sein Fuß wippt genau im Takt des Bandlaufs, als würde er einer Musik folgen, die nur er hören kann.`,
    choices: [
      {
        id: 'go_to_boy',
        label: 'Den Jungen ansprechen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s01c_corridor_chill'
      },
      {
        id: 'examine_passengers',
        label: 'Die Frau beobachten',
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
        next: 'c2_s01b_ticket_pocket'
      },
      {
        id: 'ignore_them',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s01c_corridor_chill'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Merged passenger exam with boy intro'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s01b_ticket_pocket: Taschen durchsuchen
  // ============================================================================
  'c2_s01b_ticket_pocket': {
    id: 'c2_s01b_ticket_pocket',
    chapter: 2,
    title: 'Suche',
    narrative: `Du greifst hektisch in deine Taschen. Leer.

Aber da ist ein Gefühl. Als *hättest* du etwas gehabt.

Du schließt kurz die Augen. Ein Bahnsteig blitzt auf. Ein Automat. Hast du…?

Die Erinnerung kippt und verschwindet. Als du die Augen öffnest, liegt ein Zettel in deiner Hand.

Darauf steht in deiner Handschrift: „Du hattest nie ein Ticket."`,
    choices: [
      {
        id: 'keep_note',
        label: 'Zettel behalten',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s01c_corridor_chill'
      },
      {
        id: 'throw_away',
        label: 'Zettel zerreißen',
        effects: [],
        next: 'c2_s01c_corridor_chill'
      }
    ],
    tags: ['drift_seed'],
    state_notes: [
      'Memory-Glitch manifestiert sich physisch'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // c2_s01c_corridor_chill: Kälte im Gang (Interlude)
  // ==========================================================================
  'c2_s01c_corridor_chill': {
    id: 'c2_s01c_corridor_chill',
    chapter: 2,
    title: 'Kältezug',
    narrative: `Du gehst in den Gang. Das Metall unter deinen Schuhen wirkt kälter als zuvor.

Ein Zugwind streicht an dir vorbei, obwohl keine Tür offen ist. Die Fenster spiegeln dich nur halb – als wäre der Rest deines Gesichts noch unterwegs.

Aus der Ferne hörst du das Surren des Kassettenrekorders wieder.`,
    narrative_variants: [
      {
        condition: { type: 'compare', target: 'rel_boy', operator: '>=', value: 1 },
        narrative: `Du gehst in den Gang. Das Metall unter deinen Schuhen wirkt kälter als zuvor.

Der Junge. Du hast ihn angesprochen — und jetzt trägst du sein Schweigen mit dir. Seine großen Augen, die dich nicht angesehen haben, die durch dich hindurch gesehen haben. Er weiß etwas. Oder er ist etwas. Die Kopfhörer. Das Surren.

Ein Zugwind streicht an dir vorbei. Die Fenster spiegeln dich nur halb. Und für einen Moment, ganz kurz, spiegeln sie auch den Jungen — obwohl er nicht hinter dir steht.

Das Surren des Kassettenrekorders. Näher jetzt. Als würde es dich rufen.`
      },
      {
        condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 1 },
        narrative: `Du gehst in den Gang. Der Zettel in deiner Tasche — „Du hattest nie ein Ticket" — fühlt sich schwerer an, als Papier sein sollte. Deine eigene Handschrift. Wann hast du das geschrieben?

Das Metall unter deinen Schuhen ist kalt. Ein Zugwind streicht vorbei. Die Fenster spiegeln dich nur halb — und der fehlende Teil deines Gesichts sieht aus wie jemand anderes.

Du greifst nach dem Zettel. Er ist noch da. Beweis, dass etwas nicht stimmt. Beweis, den du behalten hast.

Aus der Ferne: das Surren des Kassettenrekorders.`
      }
    ],
    choices: [
      {
        id: 'follow_sound',
        label: 'Dem Surren folgen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      },
      {
        id: 'steady_breath',
        label: 'Tief durchatmen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s02_boy_recorder'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Interlude: Kälte & Spiegelbild-Anomalie'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s02_boy_recorder: Kassettenjunge
  // ============================================================================
  'c2_s02_boy_recorder': {
    id: 'c2_s02_boy_recorder',
    chapter: 2,
    title: 'Das Angebot',
    narrative: `Dem Surren folgend bleibst du vor dem Jungen stehen. Er nimmt die Kopfhörer ab. Langsam. Als wäre es ein Ritual.

Er sieht dich an. Große Augen. Zu alt für sein Gesicht.

„Ticket." Ein Wort. Kein Fragezeichen. „Gibt's nicht."

Er drückt Play. Knistern. Dann eine Stimme, verzerrt, tief: „—nächster Halt: [unverständlich]—"

„Weg." Er zeigt auf den Rekorder. „Die Station. War da. Ist weg." Jedes Wort wie ein Stein, den er vorsichtig ablegt. Keine Erklärung. Keine Entschuldigung. Nur Fakten, so wie ein Kind Fakten sieht — ohne Zweifel.

Er hält dir den Rekorder hin. Kein Zögern.

„Für dich. Deine Stimme. Ist noch drauf." Und dann, leiser, fast unhörbar: „Du klingst traurig darauf."

Er dreht das Gehäuse kurz zu dir. Unter alten Kleberesten erkennst du in verblasster Schrift zwei Worte: „Nicht löschen."

Seine Hand bleibt ausgestreckt, regungslos. Nicht bittend, nicht drängend. Nur offen. Hinter ihm flackert das Licht einmal kurz auf, und für den Bruchteil einer Sekunde wirkt sein Schatten viel größer als sein Körper.

Du hörst wieder das Klacken der Kontrolle im Nachbarwagen. Zwei Welten, die gleichzeitig näher kommen: der Schaffner von vorn, der Junge vor dir.

Der Rekorder ist plötzlich mehr als ein Gegenstand. Er ist ein Beweis, dass du schon vor dir selbst hier warst. Oder dass etwas von dir nie aufgehört hat, hier zu sein.`,
    choices: [
      {
        id: 'take_recorder',
        label: 'Rekorder nehmen',
        effects: [
          { type: 'set', target: 'has_recorder', value: true },
          { type: 'set', target: 'played_recorder', value: true },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02a_recorder_listening'
      },
      {
        id: 'sit_silently',
        label: 'Sich kurz zu ihm setzen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02a_recorder_listening'
      },
      {
        id: 'refuse_recorder',
        label: 'Ablehnen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'dec', target: 'rel_boy', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'ask_why',
        label: '„Warum gibst du mir das?"',
        effects: [
          { type: 'set', target: 'has_recorder', value: true },
          { type: 'set', target: 'played_recorder', value: true },
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c2_s02a_recorder_listening'
      }
    ],
    tags: [],
    state_notes: [
      'Rekorder erhalten (Key Item)',
      'Hinweis auf fehlende Stationen'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s02a_recorder_listening: Kassette abhören (PAYOFF FIX START)
  // ============================================================================
  'c2_s02a_recorder_listening': {
    id: 'c2_s02a_recorder_listening',
    chapter: 2,
    title: 'Die Stimme',
    entry_effects: [
      { type: 'set', target: 'has_recorder', value: true },
      { type: 'set', target: 'played_recorder', value: true }
    ],
    narrative: `Du nimmst das Gerät. Es ist schwer, kaltes Metall.

Du drückst Play.

Zuerst nur Rauschen. Dann zwei Stimmen. Deine – jünger, atemlos. Und eine zweite, die dir vom Bahnsteig her schon im Nacken sitzt.

Nicht neu. Nur plötzlich scharf: Emma.

„Warte am Bahnsteig," sagt Emma. Ihre Stimme bricht. „Bitte komm zurück. Ich kann nicht ohne dich—"

Dann deine Stimme: „Emma, ich verspreche, ich bin gleich bei dir—"

Abbruch. Überschrieben von einem tiefen, mechanischen Brummen: „—NACHTZUG 19. Kein Ausstieg."

Du stoppst das Band. Dein Herz hämmert. Das war... vor etwas. Vor dem Unfall, denkt ein Teil von dir, und du weißt nicht, woher diese Sicherheit kommt.

Als du aufblickst, ist der Junge weg. Das Abteil ist leer.`,
    choices: [
      {
        id: 'rewind_again',
        label: 'Versuchen zurückzuspulen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b_corridor_anomaly'
      },
      {
        id: 'clutch_recorder',
        label: 'Das Gerät an dich drücken',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c2_s02c_boy_vanish'
      },
      {
        id: 'put_away',
        label: 'Weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s02c_boy_vanish'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'FIX: Stimme des Verlorenen statt nur System-Audio',
      'Junge verschwindet plötzlich'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_s02b_corridor_anomaly: Gang wird länger (Merged)
  // ============================================================================
  'c2_s02b_corridor_anomaly': {
    id: 'c2_s02b_corridor_anomaly',
    chapter: 2,
    title: 'Der Gang',
    narrative: `Du gehst weiter. Der Gang ist länger. Viel länger als vorhin. Du zählst die Abteile: Sechs. Sieben. Acht. Neun.

Der Schlaflose sitzt noch da. Aber seine Jacke ist jetzt grün. War sie nicht schwarz?

Am Ende des schier endlosen Gangs brennt Licht in einem Abteil. Die Tür steht halb offen. Jemand sitzt drin.`,
    choices: [
      {
        id: 'count_compartments',
        label: 'Abteile zählen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s02b1_door_numbers'
      },
      {
        id: 'approach_lit_compartment',
        label: 'Direkt zum Licht gehen',
        effects: [],
        next: 'c2_s02b1_door_numbers'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Tickets entfernt - nur Flags für Nuancen, memory_drift bleibt',
      'Merged corridor length and jacket color anomaly'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s02c_boy_vanish: Junge verschwindet
  // ============================================================================
  'c2_s02c_boy_vanish': {
    id: 'c2_s02c_boy_vanish',
    chapter: 2,
    title: 'Spurlos',
    narrative: `Du drehst dich nochmal um. Das Abteil des Jungen ist leer.

Nicht nur „er ist kurz weg". Sondern „nie benutzt". Kein Kopfhörer. Kein Abdruck auf dem Sitz. Makellos sauber.

Die Frau mit der Zeitung schüttelt den Kopf. „Hier *sollte* keiner gewesen sein."

Aber du hältst den schweren Rekorder in der Hand.`,
    choices: [
      {
        id: 'insist_boy_real',
        label: '„Er war hier!"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s02b1_door_numbers'
      },
      {
        id: 'doubt_self',
        label: 'An dir selbst zweifeln',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c2_s02b1_door_numbers'
      }
    ],
    tags: ['drift_variant'],
    state_notes: [
      'Realitätsverlust: Beweis (Rekorder) vs Umgebung'
    ],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // c2_s02b1_door_numbers: Nummern rutschen (Interlude)
  // ==========================================================================
  'c2_s02b1_door_numbers': {
    id: 'c2_s02b1_door_numbers',
    chapter: 2,
    title: 'Verrutscht',
    narrative: `Die Wagennummern stimmen nicht mehr. Aus einer 3 wird eine 8, aus einer 6 eine 9.

Die Zahlen klirren leise, als wären sie aus Glas.

Für einen Augenblick bist du sicher, dass auch deine eigene Sitznummer nicht mehr zu dir gehört.

Du blinzelst - und alles sitzt wieder fest.`,
    choices: [
      {
        id: 'trace_numbers',
        label: 'Mit dem Finger nachzeichnen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      },
      {
        id: 'ignore_shift',
        label: 'Ignorieren und weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s03_comp7_intro'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Drift-Symptom: Nummern verschieben sich'
    ],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03_comp7_intro: Comp7
  // ============================================================================
  'c2_s03_comp7_intro': {
    id: 'c2_s03_comp7_intro',
    chapter: 2,
    title: 'Abteil 7',
    narrative: `Ende des Gangs. Dort sitzt eine Person. Nicht „sitzt" — arbeitet. Ihre Hände bewegen sich über ein Notizbuch wie ein Chirurg über einen Patienten. Schnell. Präzise. Kein Zögern.

Du öffnest den Mund.

„Nicht." Ein Wort. Wie eine Tür, die zuschlägt. Sie schreibt weiter. Drei Sekunden. Fünf. Dann der Stift, abgelegt. Genau parallel zur Buchkante.

Sie sieht dich an. Kurz. Taxierend. Wie jemand, der Daten sammelt, nicht Blicke.

„Comp7. Kein Name. Irrelevant." Stakkato. Jedes Wort einzeln, als würde sie es wiegen. „Du. Rekorder-Vermerk. Passagier seit Station eins. Kein Ticket." Sie tippt auf das Notizbuch. „Steht alles hier."

Ihr Gesicht ist merkwürdig unscharf — dein Blick rutscht ab, als wäre er geölt. Aber ihre Stimme ist das Schärfste in diesem Zug.

„Ich schreibe. Damit die Drift nicht gewinnt. Verstehst du Drift?" Sie wartet nicht auf deine Antwort. „Noch nicht. Wirst du."

Der Tisch zwischen euch ist voller Kerben, als wären dort über Jahre Namen eingeritzt und wieder herausgekratzt worden. Neben dem Notizbuch liegt ein zweiter Stift, unbenutzt, exakt ausgerichtet.

Comp7 folgt deinem Blick. „Nicht anfassen." Wieder dieses kurze, harte Stakkato. Dann weicher, fast erschöpft: „Ordnung ist das Einzige, was bleibt, wenn Erinnerungen anfangen zu rutschen."

Du merkst, dass sie nicht nur dich beobachtet. Sie beobachtet den Moment. Als würde sie prüfen, ob er sich diesmal anders verhält als sonst.`,
    choices: [
      {
        id: 'ask_notebook',
        label: '„Was steht drin?"',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'acknowledge_presence',
        label: 'Ihre Anwesenheit still anerkennen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      },
      {
        id: 'deny_amnesia',
        label: '„Ich weiß wer ich bin."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_s03a_comp7_notebook'
      }
    ],
    tags: [],
    state_notes: ['M1.2: Comp7 zeigt Ungeduld/Angst → menschlicher'],
    atmosphere: 'mystic'
  },

  // ============================================================================
  // c2_s03a_comp7_notebook: Notizbuch & Warnung (Merged)
  // ============================================================================
  'c2_s03a_comp7_notebook': {
    id: 'c2_s03a_comp7_notebook',
    chapter: 2,
    title: 'Das Logbuch',
    narrative: `Comp7 schiebt das Buch zu dir. Kein Angebot — ein Befehl.

Listen. Tabellen. Zahlenkolonnen. Ihre Handschrift ist winzig, geometrisch, jeder Buchstabe gleich hoch.

„Station 1: 0 Passagiere ausgestiegen. Station 2: 0." Sie tippt auf die Einträge. „19 Stationen. 19 Passagiere. Kein Zufall. Muster."

Unten auf der Seite, in einer anderen Tinte: „Passagier #[UNLESERLICH]: Rekorder. Wird kontrolliert. Überlebenswahrscheinlichkeit: gering."

„Er kommt." Kein Flüstern — sachlich, wie eine Durchsage. „Der Schaffner. Fragt nicht nach Ticket. Fragt nach dem Grund."

Schwere Schritte. Rhythmisch. 2-Sekunden-Intervall.

„Drei Antworten funktionieren." Sie zählt an den Fingern ab. „Wahrheit. Flucht. Verbindung." Dann, fast beiläufig: „Ich habe alle drei versucht. Bin immer noch hier."`,
    choices: [
      {
        id: 'thank_comp7',
        label: '„Danke."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'rel_comp7', value: 1 }
        ],
        next: 'c2_s04_announcement'
      },
      {
        id: 'leave_quickly',
        label: 'Schnell gehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s04_announcement'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Merged intro with warning'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04_announcement: Ankündigung & Vorbereitung (Merged)
  // ============================================================================
  'c2_s04_announcement': {
    id: 'c2_s04_announcement',
    chapter: 2,
    title: 'Kontrolle',
    narrative: `Kaum hast du dich von Comp7 gelöst, knackt der Lautsprecher.

„Sehr geehrte Fahrgäste. Wir erreichen in Kürze [unverständlich]. Kontrolle in Wagen 1 bis 4."

Das Wort hängt schwer in der Luft. Kontrolle.

Du musst dich entscheiden. Jetzt. Was sagst du ihm?

Ein Mann zwei Reihen weiter klappt sein Buch zu, ohne eine Seite zu markieren. Eine Frau zieht den Kragen hoch, als würde die Temperatur plötzlich fallen. Niemand rennt. Niemand diskutiert. Alle nehmen dieselbe Haltung ein: warten und kleiner werden.

Der Zug schlingert leicht, dann wieder nicht. Für einen Moment glaubst du, dass ihr steht, obwohl die Schienen unter dir noch vibrieren.

Du spürst, wie deine Zunge am Gaumen klebt. Wahrheit, Lüge, Flucht: Es sind nicht nur Antworten. Es sind Rollen. Und gleich entscheidest du, welche Version von dir den Schaffner ansehen wird.`,
    choices: [
      {
        id: 'prepare_truth',
        label: 'Die Wahrheit (Erinnerungslücke)',
        effects: [],
        next: 'c2_s04b_breath_control'
      },
      {
        id: 'prepare_lie',
        label: 'Eine Lüge erfinden',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_s04b_breath_control'
      },
      {
        id: 'prepare_hide',
        label: 'Verstecken',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '<',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_s04b_breath_control'
      }
    ],
    tags: [],
    state_notes: [
      'Fixed attention check for hiding',
      'Vorbereitung wirkt direkt über conductor_attention'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // c2_s04b_breath_control: Zwischen Moment (Interlude)
  // ==========================================================================
  'c2_s04b_breath_control': {
    id: 'c2_s04b_breath_control',
    chapter: 2,
    title: 'Ein Atemzug',
    narrative: `Der Gang scheint enger zu werden. Du hörst das Klacken der Kelle - näher, näher.

Dein Atem beschlägt die Luft vor dir. Für einen Moment siehst du den Abdruck deiner Lippen darin.

Im Beschlag liegt kurz eine zweite Kontur, als würde jemand direkt hinter dir mitatmen.

Als du den Kopf drehst, ist da nur der leere Gang.`,
    choices: [
      {
        id: 'steady_posture',
        label: 'Haltung annehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      },
      {
        id: 'shrink_back',
        label: 'Einen Schritt zurück',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_s04a_conductor_approach'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Micro-Beat vor Kontrolle 1',
      'Haltungswahl wirkt auf Truth/Escape-Balance'
    ],
    atmosphere: 'tense'
  },

  // ============================================================================
  // c2_s04a_conductor_approach: Annäherung (Merged Lights)
  // ============================================================================
  'c2_s04a_conductor_approach': {
    id: 'c2_s04a_conductor_approach',
    chapter: 2,
    title: 'Schritte',
    narrative: `Schwere Schritte im Gang. Rhythmisch. Jeder Schlag ein hohles *Tock*.

Das Licht flackert: aus, an, aus.

Die Luft riecht nach Ozon, und für einen Moment glaubst du, dass der ganze Wagen stillhält, nur um ihn durchzulassen.

Als das Licht wieder angeht, steht er direkt vor dir: riesig, Uniform ohne Falten, Gesicht wie eine Wachsmaske.

„Fahrkarten bitte."`,
    choices: [
      {
        id: 'face_him',
        label: 'Standhalten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c2_control_01_approach'
      },
      {
        id: 'look_down',
        label: 'Blick senken',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c2_control_01_approach'
      }
    ],
    tags: [],
    state_notes: [
      'Direct approach',
      'Standhalten vs. Blick senken wirkt auf Truth/Escape-Balance'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_approach: Kontrolle 1 Start
  // ============================================================================
  'c2_control_01_approach': {
    id: 'c2_control_01_approach',
    chapter: 2,
    title: 'Der Schaffner',
    narrative: `„Fahrkarten bitte." Seine Stimme klingt, als käme sie aus einem Lautsprecher in der Decke.

„Ich habe keine," sagst du.

Er starrt dich an. Zehn Sekunden lang. Dann senkt er den Blick auf seine Kelle - sie ist leer.

„Kein Ticket bedeutet keine Berechtigung. Es sei denn, Sie haben einen Grund."

Der Satz bleibt zwischen euch hängen wie ein Urteil, das noch nicht gesprochen ist.`,
    choices: [
      {
        id: 'wait_silent',
        label: 'Schweigen',
        effects: [
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_question'
      },
      {
        id: 'apologize',
        label: '„Es tut mir leid."',
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_question'
      }
    ],
    tags: ['control'],
    state_notes: [
      'Reaktions-Ton wirkt direkt auf conductor_attention'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_question: Kontrolle 1 Frage (ATTENTION FIX)
  // ============================================================================
  'c2_control_01_question': {
    id: 'c2_control_01_question',
    chapter: 2,
    title: 'Das Verhör',
    narrative: `Er beugt sich vor. Du riechst kaltes Metall.

„Warum sind Sie hier?"

Die Zeit dehnt sich.

Hinter ihm summt der Wagen, dumpf und fern, als hättest du den Kopf unter Wasser. Deine Finger verkrampfen sich an der Sitzkante, bis die Knöchel weiß werden.

Du denkst an den Jungen mit dem Rekorder. An Comp7s Listen. An den Namen Emma, den du dir im Kopf immer wieder vorsagst, damit er nicht verrutscht.

Der Schaffner blinzelt nicht. In seinem Blick liegt nichts Menschliches und trotzdem etwas Erwartendes: als würde er nicht prüfen, ob du lügst, sondern welche Geschichte du bereit bist zu tragen.`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'has_recorder', value: true },
            { type: 'bool', target: 'memory_search_active', value: true }
          ]
        },
        priority: 30,
        narrative: `Er beugt sich vor. Du riechst kaltes Metall.

„Warum sind Sie hier?"

Deine Finger liegen auf dem Rekorder in deiner Tasche. Das Gehäuse ist warm, als hätte jemand kurz vorher auf Play gedrückt.

Hinter ihm summt der Wagen dumpf. In deinem Kopf bleibt nur ein Name stabil: Emma.

Der Schaffner sieht nicht auf deine Hände. Er sieht auf den Bruchteil einer Sekunde, in dem du überlegst, welche Wahrheit du ihm gibst.

In seinem Blick liegt nichts Menschliches und trotzdem etwas Erwartendes: als würde er nicht prüfen, ob du lügst, sondern welche Geschichte du bereit bist zu tragen.`
      },
      {
        condition: { type: 'bool', target: 'has_recorder', value: false },
        priority: 20,
        narrative: `Er beugt sich vor. Du riechst kaltes Metall.

„Warum sind Sie hier?"

Automatisch tastest du nach der Tasche, in der der Rekorder gewesen ist. Nichts. Nur Stoff.

Hinter ihm summt der Wagen dumpf und fern, als hättest du den Kopf unter Wasser. Deine Finger verkrampfen sich an der Sitzkante.

Der Schaffner blinzelt nicht. In seinem Blick liegt nichts Menschliches und trotzdem etwas Erwartendes: als würde er nicht prüfen, ob du lügst, sondern welche Geschichte du bereit bist zu tragen.`
      }
    ],
    choices: [
      {
        id: 'offer_truth',
        label: '„Ich erinnere mich nicht."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'dec', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_aftermath'
      },
      {
        id: 'offer_search',
        label: '„Ich suche Emma."',
        condition: {
          type: 'or',
          conditions: [
            { type: 'bool', target: 'memory_search_active', value: true },
            { type: 'bool', target: 'played_recorder', value: true }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 }
        ],
        next: 'c2_control_01_aftermath'
      },
      {
        id: 'offer_lie',
        label: '„Ich muss am nächsten Halt zu jemandem."',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '<',
          value: 2
        },
        effects: [
           { type: 'inc', target: 'tickets_escape', value: 1 },
           { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c2_control_01_aftermath'
      },
      {
        id: 'use_recorder',
        label: 'Rekorder zeigen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'dec', target: 'conductor_attention', value: 2 }
        ],
        next: 'c2_control_01_aftermath'
      }
    ],
    tags: ['control'],
    state_notes: [
      'Agency Fix: "Suche Emma" option added',
      'Attention Fix: Lie blocked if attention >= 2',
      'Callback sichtbar: has_recorder / memory_search_active ändern den Verhörtext'
    ],
    atmosphere: 'danger'
  },

  // ============================================================================
  // c2_control_01_aftermath: Kontrolle 1 Ende & Schlafloser
  // ============================================================================
  'c2_control_01_aftermath': {
    id: 'c2_control_01_aftermath',
    chapter: 2,
    title: 'Das Urteil',
    narrative: `Er nickt. Mechanisch. „Sie bleiben sitzen. Vorerst."

Er geht weiter.

Der Schlaflose dreht sich um: „Er erfindet alles. Wir auch."

Seine Jacke ist jetzt rot.

„Der Zug erfindet uns neu. Bis wir vergessen, wer wir waren."

Er streicht über den Ärmel, als müsste er sich selbst von der Farbe überzeugen. Seine Hand zittert, kaum sichtbar.

„Früher hab ich mich jedes Mal gewehrt," sagt er, jetzt leiser. „Hab mir Namen auf den Unterarm geschrieben. Hab sie laut gesagt, bis die Stimme weg war."

Er sieht dich an, müde und klar zugleich. „Heute reicht manchmal ein Blick von jemand anderem. Einer, der noch weiß, dass ich da bin."

Der Zug macht einen langen, tiefen Ton, wie ein Atemzug, den niemand von euch genommen hat.`,
    choices: [
      {
        id: 'accept_truth',
        label: '„Ich glaube dir."',
        effects: [
          { type: 'inc', target: 'rel_sleepless', value: 2 }
        ],
        next: 'c2_control_01_aftertalk'
      },
      {
        id: 'confront_jacket',
        label: '„Deine Jacke war eben noch schwarz."',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c2_control_01_aftertalk'
      }
    ],
    tags: ['reveal'],
    state_notes: [
      'Merged Aftermath with Sleepless Talk',
      'Truth-Tickets entfernt (Nachbesprechung), rel_sleepless & memory_drift bleiben'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk: Optionaler Mini-Dialog nach Kontrolle 1
  // ============================================================================
  'c2_control_01_aftertalk': {
    id: 'c2_control_01_aftertalk',
    chapter: 2,
    title: 'Ein Satz im Gang',
    narrative: `Der Schlaflose bleibt neben dir im Gang stehen.

Das Rattern wirkt für einen Moment fern, als würde der Zug euch zuhören.

„Bevor wir weiterfahren," sagt er leise, „sag irgendwas Echtes. Etwas, das auch noch stimmt, wenn der Rest verrutscht."

Er sieht nicht zu dir, sondern auf seine Hände, als müsste er erst prüfen, ob sie noch zu ihm gehören. Unter den Nägeln sitzt dunkler Staub, als hätte er an Metall gekratzt.

Du merkst, dass diese Bitte keine Floskel ist. Für ihn ist „etwas Echtes" kein Gefühlston, sondern ein Halteseil.

In dir taucht sofort ein Wort auf, das seit dem Bahnsteig nicht verschwunden ist.

Hinter euch läuft die Durchsage erneut an und bricht nach zwei Wörtern ab. Keiner von euch dreht sich um.`,
    choices: [
      {
        id: 'ask_his_name',
        label: '„Wie hießest du, bevor das alles anfing?"',
        effects: [
          { type: 'set', target: 'mut', value: 1 }
        ],
        next: 'c2_control_01_aftertalk_name'
      },
      {
        id: 'say_emma_name',
        label: '„Seit dem Bahnsteig bleibt nur ein Name klar: Emma."',
        effects: [
          { type: 'set', target: 'mut', value: 2 }
        ],
        next: 'c2_control_01_aftertalk_emma'
      },
      {
        id: 'share_silence',
        label: 'Nichts sagen und nur neben ihm stehen',
        effects: [
          { type: 'set', target: 'mut', value: 3 }
        ],
        next: 'c2_control_01_aftertalk_silence'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Agency: optionaler Mini-Dialog ohne System-Einfluss',
      'Alle Optionen rekombinieren in c2_end_station'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk_name: Reaktion auf Namensfrage
  // ============================================================================
  'c2_control_01_aftertalk_name': {
    id: 'c2_control_01_aftertalk_name',
    chapter: 2,
    title: 'Ein verlorener Name',
    narrative: `Der Schlaflose blinzelt, als hättest du ihn geweckt.

„Ich hatte mal einen," sagt er nach einer Weile. „Er lag mir immer auf der Zunge. Jetzt ist da nur Metallgeschmack."

Er reibt Daumen und Zeigefinger aneinander, als suche er dort Buchstaben.

Dann nickt er Richtung Fenster. „Wenn deiner noch da ist, halt ihn fest."`,
    choices: [
      {
        id: 'move_on_after_name',
        label: 'Seinen Rat mitnehmen',
        next: 'c2_end_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Namensfrage',
      'Rekombination in c2_end_station'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk_emma: Reaktion auf Emma-Bekenntnis
  // ============================================================================
  'c2_control_01_aftertalk_emma': {
    id: 'c2_control_01_aftertalk_emma',
    chapter: 2,
    title: 'Ein Name bleibt',
    narrative: `Bei „Emma" zuckt etwas in seinem Gesicht, kaum sichtbar.

„Gut," murmelt er. „Dann gibt es wenigstens einen Punkt, der nicht verrutscht."

Für einen Atemzug wird seine Stimme ruhiger, als hätte auch er kurz Halt.

Er tippt dir kurz gegen den Ärmel. „Nicht wie ein Ruf. Wie ein Anker. Einmal laut, dann weiter innen."

Du wiederholst den Namen leise. Nicht, um sie herbeizuzaubern. Nur, um nicht wieder im Rattern zu verschwinden.

Er nickt knapp. „Genau so. Sonst nimmt ihn der Zug."`,
    choices: [
      {
        id: 'move_on_after_emma',
        label: 'Den Namen im Kopf wiederholen',
        next: 'c2_end_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Emma-Bekenntnis',
      'Rekombination in c2_end_station'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_control_01_aftertalk_silence: Reaktion auf Schweigen
  // ============================================================================
  'c2_control_01_aftertalk_silence': {
    id: 'c2_control_01_aftertalk_silence',
    chapter: 2,
    title: 'Geteilte Stille',
    narrative: `Du sagst nichts.

Der Schlaflose sagt auch nichts. Ihr steht nur da, während der Zug durch euch hindurch zu fahren scheint.

Das Neonlicht summt über euch wie eine Leitung, die gerade noch hält.

Nach ein paar Atemzügen flüstert er: „Vielleicht reicht das schon. Nicht allein zu schweigen."`,
    choices: [
      {
        id: 'move_on_after_silence',
        label: 'Gemeinsam weiteratmen',
        next: 'c2_end_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: geteiltes Schweigen',
      'Rekombination in c2_end_station'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_end_station: Ende Kapitel 2 (Merged Platform Watch)
  // ============================================================================
  'c2_end_station': {
    id: 'c2_end_station',
    chapter: 2,
    title: 'Veränderung',
    narrative: `Der Zug hält. 23:47 Uhr. Wieder.

Der Bahnsteig ist leer. Aber am Ende steht eine Gestalt. Sie winkt.

Dann geht das Licht aus. Als es wieder anspringt, ist sie weg.

Du drehst dich um. Der Wagen hat sich verändert. Der Junge ist weg. Comp7 schreibt.

Ohne aufzublicken sagt sie: „Du hast die erste Kontrolle überstanden. Beim nächsten Halt wird es enger.“

Der Bahnsteig draußen trägt kein Schild. Nur eine nackte Betonwand, auf der Wasser in dünnen Linien nach unten läuft. Jede Linie sieht aus wie eine Uhr, deren Zeiger fehlen.

Du legst die Hand an die Scheibe. Das Glas ist warm, als stünde dort draußen Sommer, obwohl im Wagen Winterluft hängt.

Comp7s Stift kratzt weiter über Papier, in gleichmäßigem Takt. Das Geräusch beruhigt nicht. Es erinnert dich nur daran, dass hier jemand gegen das Vergessen anschreibt, Zeile für Zeile, Halt für Halt.`,
    choices: [
      {
        id: 'continue_chapter_3',
        label: 'Der Veränderung folgen',
        effects: [],
        next: 'c2_end_station_callback'
      },
      {
        id: 'play_recorder_end',
        label: 'Rekorder abspielen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'set', target: 'played_recorder', value: true }
        ],
        next: 'c2_end_station_callback'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Kapitelende'
    ],
    atmosphere: 'somber'
  },

  // ============================================================================
  // c2_end_station_callback: Später Callback auf Kontrolle-Dialog
  // ============================================================================
  'c2_end_station_callback': {
    id: 'c2_end_station_callback',
    chapter: 2,
    title: 'Nachhall',
    narrative: `Der Zug setzt sich wieder in Bewegung.

Für einen Moment denkst du an das, was gerade im Gang zwischen euch stand.

Nicht als Information.

Als Haltung.

Du sitzt wieder auf deinem Platz, aber dein Körper bleibt angespannt, als müsste er noch auf eine zweite Frage antworten. Die Fensterscheibe vibriert leicht an deiner Stirn.

Im Wagen verteilt sich das normale Geräuschbild wieder: ein Husten, das Scharnier einer Tür, fernes Schienenklacken. Trotzdem wirkt alles dünner, als läge über jedem Ton ein feiner Filter.

Du merkst, dass dich die Kontrolle nicht nur erschöpft hat. Sie hat etwas sortiert. Nicht die Fakten. Die Richtung.

Der nächste Halt ist noch nicht da, aber du bist ihm schon näher als eben.

Du presst den Rücken gegen die Lehne und merkst erst dann, wie kalt der Stoff geworden ist. In deinem Kopf wiederholt sich die Frage des Schaffners, aber sie klingt jetzt weniger wie ein Angriff und mehr wie ein Spiegel.

Wenn der Zug dich schon neu zusammensetzt, dann vielleicht nicht völlig ohne dich.`,
    narrative_variants: [
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 1
        },
        narrative: `Der Zug setzt sich wieder in Bewegung.

Dir bleibt sein Blick, als du nach seinem Namen gefragt hast.

Als hättet ihr beide gemerkt, dass Erinnern nicht mit Fakten beginnt, sondern mit der Frage, ob man noch jemand sein darf.

Dann rattert der Wagen weiter.`
      },
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 2
        },
        narrative: `Der Zug setzt sich wieder in Bewegung.

„Emma" hallt in dir nach wie ein kleiner fester Punkt in einem verrutschenden Raum.

Du merkst: Solange ein Name bleibt, bleibt auch Richtung.

Dann schluckt das Rattern den Rest.`
      },
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 3
        },
        narrative: `Der Zug setzt sich wieder in Bewegung.

Die gemeinsame Stille aus dem Gang wirkt noch nach.

Kein Trost, eher etwas Nüchternes: Dass man selbst im Schweigen nicht ganz allein sein muss.

Der nächste Wagen kommt näher.`
      }
    ],
    choices: [
      {
        id: 'continue_to_ch3_after_callback',
        label: 'Weiter zum nächsten Wagen',
        next: 'c3_s01_wagen7_locked'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Später Callback auf c2_control_01_aftertalk',
      'mut wird hier nur als Flavor-Flag genutzt',
      'Kein Einfluss auf Endings/Route'
    ],
    atmosphere: 'somber'
  }
};
