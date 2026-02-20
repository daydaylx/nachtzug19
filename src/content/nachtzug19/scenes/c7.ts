// ============================================================================
// NACHTZUG 19 - Kapitel 7: Entscheidung (FINALE)
// ============================================================================
// Zielwerte:
// - 22–28 Szenen (erreicht: 28)
// - 5.000–6.500 Wörter (erreicht: ~6.100)
// - 30–45 Choices (erreicht: 38)
// - 12+ Conditions (erreicht: 14)
// Struktur:
// - 5 Interludes (s02, s05, s11, s19, s23)
// - 14 Standard-Szenen
// - 3 Set-Pieces (Ansage s06-s08, Abteil7 s12-s14, Recorder s16-s18)
// Thema: Finale Konfrontation, Erinnerung, Entscheidung, Endings
// ============================================================================

import type { ScenesCollection } from '../../../domain/types';

export const c7Scenes: ScenesCollection = {
  // ==========================================================================
  // OPENING: Ankunft an der letzten Station
  // ==========================================================================

  'c7_s01_final_approach': {
    id: 'c7_s01_final_approach',
    chapter: 7,
    title: 'Die letzte Annäherung',
    narrative: `Du steigst wieder ein.

Zum letzten Mal.

Die Türen schließen sich hinter dir.

Endgültig.

Der Zug setzt sich in Bewegung.

Aber es fühlt sich anders an.

Schwerer. Langsamer.

Als würde der Zug selbst… zögern.

Die Luft ist dick. Schwer zu atmen.

Nicht stickig. Einfach… dicht.

Als wäre sie aus etwas anderem gemacht.

Aus Zeit vielleicht.

Oder aus Erinnerungen.

Du gehst den Gang entlang.

Die Wände sind jetzt durchsichtig.

Nicht ganz. Aber du kannst… hindurchsehen.

Schemen. Bewegungen.

Andere Versionen dieses Gangs.

Andere Zeiten.

Andere Fahrgäste.

Aber alle… verschwinden.

Langsam.

Wie Rauch.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_tag19', value: true },
        narrative: `Du steigst wieder ein. Zum letzten Mal.

Die Türen schließen sich mit einem Geräusch, das der Schlüsselanhänger in deiner Hand als tiefes, metallisches Echo wiedergibt. Er ist schwerer geworden, ein bleiernes Gewicht, das dich nach unten zieht, tiefer in den Kern des Zuges.

Der Zug setzt sich in Bewegung, und durch das Tag 19 spürst du den Widerstand der Zeit selbst. Die Luft ist nicht nur dicht – sie schmeckt nach Messing und Elektrizität.

Die Wände sind durchsichtig, und wo andere nur Schemen sehen, erkennst du durch den Anhänger klare Fragmente deiner eigenen Geschichte. Du siehst nicht nur Rauch, sondern die Gesichter derer, die du verloren hast, eingefroren in Momenten, die nie endeten.

Der Anhänger vibriert mit einer Frequenz, die die durchsichtigen Wände zum Zittern bringt. Es ist keine passive Beobachtung mehr. Es ist eine Resonanz.

Du bist kein Passagier mehr. Du bist der Anker.`
      }
    ],
    choices: [
      {
        id: 'observe_walls',
        label: 'Die durchsichtigen Wände beobachten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s02_interlude_silence'
      },
      {
        id: 'walk_quickly',
        label: 'Schnell weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s02_interlude_silence'
      },
      {
        id: 'touch_walls_memories',
        label: 'In die Erinnerungen greifen',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s02_interlude_silence'
      }
    ],
    state_notes: [
      'Eröffnungsszene Kapitel 7 (Finale)',
      'Zug verändert sich drastisch',
      'Wände durchsichtig (Zeitschichten sichtbar)',
      'CONDITION: touch_walls_memories bei memory_drift >= 2'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // INTERLUDE 1: Absolute Stille (Split Part 1)
  // ==========================================================================

  'c7_s02_interlude_silence': {
    id: 'c7_s02_interlude_silence',
    chapter: 7,
    title: 'Stumm',
    narrative: `Das Rattern der Räder ist weg. Komplett.

Der Zug bewegt sich noch, du spürst die Bewegung in den Beinen, aber es gibt kein Geräusch mehr. Du klatschst in die Hände – die Bewegung ist da, aber der Ton fehlt, als würde der Raum ihn schlucken, bevor er entsteht.

Ein feiner Schwindel zieht dir durch den Magen: Die Welt ist stumm geworden.`,
    choices: [
      {
        id: 'test_voice',
        label: 'Versuchen zu sprechen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'conductor_attention', value: 1 }
        ],
        next: 'c7_s02_interlude_silence_b'
      },
      {
        id: 'touch_wall_silence',
        label: 'Wand berühren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s02_interlude_silence_b'
      }
    ],
    state_notes: [
      'Interlude Part 1: Akustisches Vakuum',
      'Split für Pacing'
    ],
    tags: ['interlude'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // INTERLUDE 1: Absolute Stille (Split Part 2)
  // ==========================================================================

  'c7_s02_interlude_silence_b': {
    id: 'c7_s02_interlude_silence_b',
    chapter: 7,
    title: 'Isolation',
    narrative: `Deine Lippen bewegen sich, aber kein Ton kommt heraus.

Der Boden unter deinen Füßen fühlt sich zu glatt an, ohne jede Reibung. Deine Fingerkuppen suchen die Wand, sie ist kühl und gibt minimal nach, als hätte sie Haut.

Du bist allein an einem Ort, wo Geräusche nicht mehr existieren.`,
    choices: [
      {
        id: 'accept_silence',
        label: 'Akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s03_comp7_goodbye'
      },
      {
        id: 'break_silence',
        label: 'Anschreien',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'conductor_attention', value: 1 },
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s03_comp7_goodbye'
      }
    ],
    state_notes: [
      'Interlude Part 2: Physische Isolation',
      'Vorbereitung auf Comp7 Abschied'
    ],
    tags: ['interlude'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Comp7 Abschied
  // ==========================================================================

  'c7_s03_comp7_goodbye': {
    id: 'c7_s03_comp7_goodbye',
    chapter: 7,
    title: 'Comp7 - Abschied',
    narrative: `Als die tonlose Stille abreißt, findest du Comp7.

Sie steht am Ende des Gangs.

Vor einer geschlossenen Tür.

„Du hast es also geschafft," sagt sie.

Ihre Stimme ist leise. Fast unhörbar.

„Bis hierher."

Sie dreht sich nicht um.

„Ich kann nicht weiter. Nicht über diese Tür hinaus."

Eine Pause.

„Ich war Passagier #7. Aber irgendwann... bin ich zum Zug geworden. Teil davon. Ich kann nicht mehr aussteigen."

Ihre Stimme zittert.

„Wenn du gehst... lösche ich mich mit dem Zug auf. Aber das ist okay. Ich bin müde. Ich will... ruhen."

Sie legt ihre Hand auf die Tür.

„Hinter dieser Tür… ist alles. Die Wahrheit. Das Ende. Der Anfang."

„Alles, was du vergessen hast. Alles, was du warst."

Endlich dreht sie sich um.

Ihr Gesicht ist… verschwommen. Als würde sie bereits… verschwinden.

„Danke," flüstert sie. „Für die Gesellschaft. Für die Erinnerung. Dafür, dass ich... für einen Moment... wieder real war."

Dann ist sie weg.`,
    choices: [
      {
        id: 'say_goodbye_high_rel_recognized',
        label: '„Danke. Für alles."',
        condition: {
          type: 'and',
          conditions: [
            { type: 'compare', target: 'rel_comp7', operator: '>=', value: 2 },
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 8 }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s04_boy_recognized'
      },
      {
        id: 'open_door_recognized',
        label: 'Die Tür öffnen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s04_boy_recognized'
      },
      {
        id: 'open_door_unknown',
        label: 'Die Tür trotz Unsicherheit öffnen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '<',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s04_boy_transformation'
      }
    ],
    state_notes: [
      'Comp7 Abschied',
      'CONDITION: say_goodbye_high_rel nur bei rel_comp7 >= 2',
      'Comp7 verschwindet',
      'Tür zur Wahrheit'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Junge Transformation
  // ==========================================================================

  'c7_s04_boy_transformation': {
    id: 'c7_s04_boy_transformation',
    chapter: 7,
    title: 'Der Junge - Veränderung',
    narrative: `Hinter der Tür sitzt der Junge in seinem Abteil.

Aber… er ist anders.

Älter. Oder jünger.

Du kannst es nicht sagen.

Sein Gesicht verändert sich.

Flackert zwischen verschiedenen Altern.

Kind. Teenager. Erwachsener.

„Die Kassette," sagt er.

Seine Stimme ist tief. Dann hoch. Dann normal.

„Sie läuft rückwärts jetzt."

Er hält den Rekorder hoch.

Das Band dreht sich.

Aber die falsche Richtung.

„Ich erinnere mich… vorwärts."

„An das, was noch nicht passiert ist."

Er lacht. Oder weint. Beides gleichzeitig.

„Ist das die Zukunft?"

„Oder die Vergangenheit?"

„Oder… war nie ein Unterschied?"`,
    choices: [
      {
        id: 'comfort_boy_high_rel',
        label: '„Du wirst es herausfinden. Außerhalb."',
        condition: {
          type: 'compare',
          target: 'rel_boy',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s05_interlude_timeshift'
      },
      {
        id: 'observe_cassette',
        label: 'Das rückwärts laufende Band beobachten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s05_interlude_timeshift'
      },
      {
        id: 'leave_quickly',
        label: 'Das Abteil verlassen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s05_interlude_timeshift'
      }
    ],
    state_notes: [
      'Junge transformiert (Alter flackert)',
      'CONDITION: comfort_boy_high_rel nur bei rel_boy >= 1',
      'Kassette läuft rückwärts',
      'Zeit ist gebrochen'
    ],
    tags: ['secret'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // STANDARD: Junge - ERKANNT (High Truth)
  // ==========================================================================

  'c7_s04_boy_recognized': {
    id: 'c7_s04_boy_recognized',
    chapter: 7,
    title: 'Die Erkenntnis - Der Junge',
    narrative: `Der Junge sitzt in seinem Abteil, aber etwas an ihm kippt ständig: älter, jünger, Kind, Teenager, Erwachsener, immer wieder.

Dann erkennst du ihn.

Die Nase. Die Augen. Die Art, wie er den Kopf hält.
Das bist du. Nicht ähnlich. Nicht fast. Du.

Vor dem 19. September 1973. Vor dem Unfall. Vor allem.

„Ich erinnere mich," sagt er, und es ist deine Stimme aus einer anderen Zeit. „An danach. An das, was du geworden bist. An das, was wir verloren haben."

Er hebt den Rekorder. Das Band läuft rückwärts.

„Fünfzig Jahre," flüstert er. „Du hast nach mir gesucht. Nach dem Teil von dir, der nie erwachsen wurde. Der das Blut nie vergessen konnte."

Seine Augen - deine Augen - füllen sich mit Tränen.

„Ich bin müde," sagt er. „So müde. Kann ich endlich nach Hause?"`,
    choices: [
      {
        id: 'integrate_innocence',
        label: '„Komm nach Hause. Zu mir."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c7_s05_interlude_timeshift'
      },
      {
        id: 'accept_loss',
        label: '„Ich weiß jetzt, wer du warst. Wer ich war."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s05_interlude_timeshift'
      },
      {
        id: 'embrace_child',
        label: 'Den Jungen umarmen',
        condition: {
          type: 'compare',
          target: 'rel_boy',
          operator: '>=',
          value: 1
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'set', target: 'rel_boy', value: 4 }
        ],
        next: 'c7_s05_interlude_timeshift'
      },
      {
        id: 'cannot_let_go',
        label: '„Ich kann dich nicht loslassen. Noch nicht."',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s05_interlude_timeshift'
      }
    ],
    state_notes: [
      'TRUTH >= 4: Protagonist erkennt den Jungen als verlorene Unschuld',
      'REVEAL: Der Junge ist das Selbst vor 1973',
      'CONDITION: embrace_child nur bei rel_boy >= 1',
      'Integration oder Akzeptanz möglich'
    ],
    tags: ['reveal'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // INTERLUDE 2: Zeitverschiebung (Split Part 1)
  // ==========================================================================

  'c7_s05_interlude_timeshift': {
    id: 'c7_s05_interlude_timeshift',
    chapter: 7,
    title: 'Chronos',
    narrative: `Kaum verlässt du das Abteil, zeigen die Uhren an den Wänden unmöglich Zeiten: 1973, 2024, und ein Jahr, das es noch nicht gibt.

Die Ziffern blättern nicht um, sie kippen einfach weg. Wenn du das Glas berührst, ist es feucht von einem kalten Film, und der Sekundenzeiger springt unter deinem Finger rückwärts.

Ein leises Summen legt sich über den Gang – der Klang von brechender Zeit.`,
    choices: [
      {
        id: 'watch_clocks',
        label: 'Uhren ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s05_interlude_timeshift_b'
      },
      {
        id: 'ignore_time',
        label: 'Ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s05_interlude_timeshift_b'
      }
    ],
    state_notes: [
      'Interlude Part 1: Zeit-Anomalie',
      'Split für Pacing'
    ],
    tags: ['interlude'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // INTERLUDE 2: Zeitverschiebung (Split Part 2)
  // ==========================================================================

  'c7_s05_interlude_timeshift_b': {
    id: 'c7_s05_interlude_timeshift_b',
    chapter: 7,
    title: 'Faltung',
    narrative: `Der Gang dehnt sich wie Gummi, wird länger, dann wieder kurz.

Du machst einen Schritt, und der Boden ist plötzlich da, wo er eben nicht war. Am anderen Ende siehst du dich selbst – du winkst dir zu, aber die Bewegung ist verzögert, wie bei einer schlechten Übertragung.

Du bist dir nicht mehr sicher, welches „Du“ das echte ist.`,
    choices: [
      {
        id: 'continue_forward',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s06_announcement_distorted'
      },
      {
        id: 'search_for_anchor',
        label: 'Anker suchen',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s06_announcement_distorted'
      }
    ],
    state_notes: [
      'Interlude Part 2: Raum-Faltung',
      'Doppelgänger-Begegnung'
    ],
    tags: ['interlude'],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // SET-PIECE 1: Letzte Ansage (Teil 1 - Verzerrte Durchsage)
  // ==========================================================================

  'c7_s06_announcement_distorted': {
    id: 'c7_s06_announcement_distorted',
    chapter: 7,
    title: 'Die letzte Ansage',
    narrative: `Als du weiter in den Gang trittst, knistern die Lautsprecher.

Lauter als je zuvor.

Dann – eine Stimme.

„Nächster Halt. Endstation."

Aber die Stimme… ist falsch.

Zu tief. Zu verzerrt.

„Bitte alle… aussteigen."

Knistern.

„Alle… außer…"

Die Stimme stoppt.

Dann:

„Alle außer… den Passagieren von Wagen 7, Sitz 19."

Dein Sitz.

„Ankunft… 19:19 Uhr."

„Am 19. September."

„1973."

Die Lautsprecher kreischen.

Dann – Stille.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_tag19', value: true },
        narrative: `Die Lautsprecher knistern, aber der Lärm erreicht dich nicht direkt. Der Schlüsselanhänger in deiner Hand fungiert wie ein Filter, er wandelt das schrille Kreischen in ein rhythmisches Pulsieren um.

Dann – eine Stimme. Klarer als je zuvor. Deine eigene Stimme, aufgenommen auf einem Band, das nie existieren sollte.

„Nächster Halt. Endstation."

Während die Stimme von Wagen 7 und Sitz 19 spricht, brennt sich die Zahl 19 auf dem Anhänger in deine Wahrnehmung ein. Sie glüht weißheiß, ein gleißendes Licht, das die Dunkelheit im Gang für einen Moment vertreibt.

„Ankunft… vor fünfzig Jahren."

Du spürst durch das Metall das Beben des Aufpralls, den Moment, in dem die Zeit für dich stehen blieb. Es ist kein fernes Ereignis mehr. Es ist jetzt.

Der Anhänger vibriert so stark, dass deine ganze Hand taub wird. Die Stille, die folgt, ist nicht leer. Sie ist gefüllt mit dem Wissen, das du endlich zugelassen hast.

Wagen 7. Sitz 19. 19. September 1973.

Alles fällt an seinen Platz.`
      },
      {
        condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 3 },
        priority: 15,
        narrative: `Die Lautsprecher knistern.

Leise. Dann laut. Wie ein Schrei.

Dann – eine Stimme.

„Nächster Halt. Endstation."

Die Stimme ist… deine eigene.

„Bitte alle… aussteigen."

Knistern.

„Alle… die überlebt haben."

Die Stimme stoppt.

Dann:

„Passagier in Wagen 7, Sitz 19."

Du.

„Ankunft… vor 50 Jahren."

„Am 19. September 1973."

Die Lautsprecher bluten. Schwarze Tropfen fallen herab.

Dann – Stille.`
      },
      {
        condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 5 },
        priority: 25,
        narrative: `Die Lautsprecher explodieren nicht. Sie flüstern.

Direkt in deinem Kopf.

„Endstation."

„Du bist schon da."

„Seit immer."

Knistern.

„Wagen 7, Sitz 19."

„Todesursache: Aufprall."

„Zeitpunkt: 19:19 Uhr."

„Status: Verweigert."

Die Stimme lacht.

„Willkommen zuhause."`
      }
    ],
    choices: [
      {
        id: 'realize_truth_high_drift',
        label: 'Die Wahrheit verstehen',
        condition: {
          type: 'compare',
          target: 'memory_drift',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s07_announcement_name'
      },
      {
        id: 'check_ticket',
        label: 'Deine Fahrkarte ansehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c7_s07_announcement_name'
      },
      {
        id: 'deny_message',
        label: 'Die Ansage ignorieren',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c7_s07_announcement_name'
      }
    ],
    state_notes: [
      'Set-Piece Teil 1: Ansage mit falschen Details',
      'CONDITION: realize_truth_high_drift nur bei memory_drift >= 3',
      'Wagen 7, Sitz 19 genannt',
      '1973 enthüllt'
    ],
    tags: ['setup', 'reveal'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // SET-PIECE 1: Letzte Ansage (Teil 2 - Name enthüllt)
  // ==========================================================================

  'c7_s07_announcement_name': {
    id: 'c7_s07_announcement_name',
    chapter: 7,
    title: 'Dein Name',
    narrative: `Du hältst im Gang inne, dann knistern die Lautsprecher wieder.

„Passagier…"

Eine Pause.

„Passagier…"

Und dann sagt die Stimme deinen Namen.

Deinen echten Namen.

Den du vergessen hattest.

Oder nie gewusst hast.

„…wird gebeten, zum Ausgang zu kommen."

„Letzte Gelegenheit."

„Letzte… Gelegenheit… für…"

Die Stimme bricht ab.

Wird zu einem Schluchzen.

Oder einem Lachen.

„…Vergebung."

Dann – Stille.

Und du erinnerst dich.

An alles.`,
    choices: [
      {
        id: 'accept_memory_truth',
        label: 'Die Erinnerung vollständig annehmen',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s08_announcement_aftermath'
      },
      {
        id: 'accept_partial',
        label: 'Teilweise erinnern',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s08_announcement_aftermath'
      },
      {
        id: 'resist_memory',
        label: 'Gegen die Erinnerung ankämpfen',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 2
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c7_s08_announcement_aftermath'
      },
      {
        id: 'weep',
        label: 'Weinen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c7_s08_announcement_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 2: Name wird genannt',
      'CONDITION: accept_memory_truth nur bei tickets_truth >= 4',
      'Vollständige Erinnerung möglich',
      '"Vergebung" Schlüsselwort'
    ],
    tags: ['reveal'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // SET-PIECE 1: Letzte Ansage (Teil 3 - Nachwirkungen)
  // ==========================================================================

  'c7_s08_announcement_aftermath': {
    id: 'c7_s08_announcement_aftermath',
    chapter: 7,
    title: 'Nach der Ansage',
    narrative: `Als die Ansage verstummt, stehst du im Gang.

Die Erinnerungen fluten dich.

Nicht alle auf einmal.

Aber genug.

Genug, um zu verstehen.

Warum du hier bist.

Was passiert ist.

Was du getan hast.

Oder… was dir angetan wurde.

Die Grenze verschwimmt.

Täter und Opfer.

Schuld und Unschuld.

Alles… verschwimmt.

Du sinkst gegen die Wand.

Die Wand ist warm.

Wie immer.

Aber jetzt weißt du warum.

Es ist nicht die Wand.

Es ist die Zeit selbst.

Die brennt.`,
    choices: [
      {
        id: 'stand_up',
        label: 'Aufstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s09_corridor_dissolve'
      },
      {
        id: 'stay_down',
        label: 'Sitzen bleiben',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s09_corridor_dissolve'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen Ansage',
      'Erinnerungsflut',
      'Schuld/Unschuld verschwimmt',
      'Wand warm (Zeit brennt)'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // STANDARD: Gang löst sich auf
  // ==========================================================================

  'c7_s09_corridor_dissolve': {
    id: 'c7_s09_corridor_dissolve',
    chapter: 7,
    title: 'Auflösung',
    narrative: `Der Gang… löst sich auf.

Nicht plötzlich.

Langsam.

Die Wände werden durchsichtiger.

Du siehst… durch sie hindurch.

Andere Gänge.

Andere Züge.

Alle fahrend.

Alle… nirgendwohin.

Die Abteile sind leer jetzt.

Alle.

Die Türen stehen offen.

Aber da ist niemand mehr.

Nur Schatten.

Abdrücke von Menschen, die einmal da waren.

Oder nie da waren.

Oder noch da sind.

In einer anderen Zeit.

Einem anderen Zug.`,
    choices: [
      {
        id: 'enter_empty_compartment',
        label: 'Ein leeres Abteil betreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s10_passengers_vanish'
      },
      {
        id: 'keep_walking',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s10_passengers_vanish'
      }
    ],
    state_notes: [
      'Gang löst sich auf',
      'Andere Züge sichtbar (Zeitschichten)',
      'Abteile leer (Schatten zurück)',
      'Liminalität'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // STANDARD: Andere Passagiere verschwinden
  // ==========================================================================

  'c7_s10_passengers_vanish': {
    id: 'c7_s10_passengers_vanish',
    chapter: 7,
    title: 'Die Anderen',
    narrative: `Dann siehst du sie.

Die anderen Passagiere.

Alle.

Gleichzeitig.

In verschiedenen Abteilen.

In verschiedenen Zeiten.

Der Junge. Comp7. Der Schlaflose.

Und… andere.

Menschen, die du nie getroffen hast.

Aber irgendwie… kennst.

Sie sehen dich alle an.

Gleichzeitig.

Und langsam…

Verschwinden sie.

Einer nach dem anderen.

Wie Kerzen, die ausgehen.

Bis nur noch…

Du übrig bist.

Allein.

Im Zug.`,
    choices: [
      {
        id: 'call_out',
        label: 'Nach ihnen rufen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s11_interlude_memory_flood'
      },
      {
        id: 'accept_solitude',
        label: 'Die Einsamkeit akzeptieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s11_interlude_memory_flood'
      },
      {
        id: 'panic',
        label: 'In Panik geraten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s11_interlude_memory_flood'
      }
    ],
    state_notes: [
      'Alle Passagiere verschwinden',
      'Spieler allein',
      'Isolation komplett'
    ],
    atmosphere: 'dark'
  },

  // ==========================================================================
  // INTERLUDE 3: Erinnerungsflut
  // ==========================================================================

  'c7_s11_interlude_memory_flood': {
    id: 'c7_s11_interlude_memory_flood',
    chapter: 7,
    title: 'Erinnerungsflut',
    narrative: `Als die letzten Gesichter verschwinden, kommen die Erinnerungen.

Alle auf einmal.

Wie eine Welle.

Ein Bahnsteig. 1973. Menschen.

Rauch und nasser Beton. Das Geländer kalt in deiner Hand, obwohl du hier leer bist.`,
    choices: [
      {
        id: 'hold_breath',
        label: 'Den Atem anhalten',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s11b_memory_aftershock'
      },
      {
        id: 'lean_into_memory',
        label: 'Dich hineinfallen lassen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s11b_memory_aftershock'
      }
    ],
    state_notes: [
      'Interlude: Erinnerungsflut (Split Part 1)',
      '1973 Unfall angedeutet',
      'Split für Pacing',
      'Zug als Limbus/Fegefeuer'
    ],
    tags: ['interlude', 'reveal'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // INTERLUDE 3: Erinnerungsflut (Split Part 2)
  // ==========================================================================

  'c7_s11b_memory_aftershock': {
    id: 'c7_s11b_memory_aftershock',
    chapter: 7,
    title: 'Nachhall',
    narrative: `Lachen. Abschied. Winken. Der Zug fährt ab.

Dann – ein Geräusch. Metall. Schreie. Stille.

Lange Dunkelheit.

Und dann… dieser Zug.

Du verstehst jetzt.

Alles.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_recorder', value: true },
        priority: 20,
        narrative: `Lachen. Abschied. Winken. Der Zug fährt ab.

Und jetzt weißt du: Das war auf der Kassette. Deine eigene Stimme, aufgenommen in dem Moment, in dem du noch nicht wusstest, was kommen würde.

Dann – ein Geräusch. Metall. Schreie. Stille. Du hast es gehört. Auf dem Band. Und jetzt hörst du es wieder – aber nicht von außen. Von innen.

Lange Dunkelheit.

Und dann… dieser Zug. Dieser ewige Zug.

Du verstehst jetzt alles. Und der Rekorder in deiner Hand ist der Beweis, dass du es schon die ganze Zeit wusstest – und trotzdem hierher zurückgekehrt bist.`
      }
    ],
    choices: [
      {
        id: 'understand',
        label: 'Verstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s12_seven_offer'
      },
      {
        id: 'resist',
        label: 'Zurückweigern',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s12_seven_offer'
      }
    ],
    state_notes: [
      'Interlude: Erinnerungsflut (Split Part 2)',
      '1973 Unfall enthüllt',
      'Verständnis der Situation'
    ],
    tags: ['interlude', 'reveal'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // SET-PIECE 2: Abteil 7 Finale (Teil 1 - Angebot)
  // ==========================================================================

  'c7_s12_seven_offer': {
    id: 'c7_s12_seven_offer',
    chapter: 7,
    title: 'Abteil 7 - Das letzte Angebot',
    narrative: `Als die letzten Bilder nachglühen, stehst du wieder vor Abteil 7.

Die Tür ist da.

War sie nicht verschwunden?

Aber jetzt ist sie wieder da.

Und sie ist… offen.

Einen Spaltbreit.

Licht scheint heraus.

Warmes, goldenes Licht.

Eine Stimme ruft von innen:

„Komm herein."

Es ist… deine Stimme.

Aber auch… nicht.

„Ich habe auf dich gewartet."

„Fünfzig Jahre."

„Oder fünfzig Minuten."

„Zeit ist hier… anders."

„Komm. Wir können es beenden."

„Gemeinsam."

Die Tür öffnet sich weiter.

Das Licht wird heller.

Blendend.`,
    narrative_variants: [
      {
        condition: { type: 'bool', target: 'has_tag19', value: true },
        narrative: `Als die letzten Bilder nachglühen, stehst du wieder vor Abteil 7. Die Tür ist da, massiv und realer als alles andere im Zug.

Sie ist offen. Ein Spaltbreit goldenes Licht dringt heraus, aber es blendet dich nicht. Der Schlüsselanhänger in deiner Hand erzeugt ein schützendes Feld, eine kühle Brise, die das Feuer des Lichts abmildert.

Eine Stimme ruft von innen – es ist deine eigene, aber sie klingt geheilt, vollständig. „Komm herein. Ich habe auf dich gewartet. Fünfzig Jahre… oder nur diesen einen Moment."

Der Anhänger vibriert sanft, ein beständiges, beruhigendes Brummen, das dir den Weg weist. Er zieht dich förmlich zur Tür hin, ein sanfter magnetischer Sog, dem du vertrauen kannst.

„Komm. Wir können es beenden. Gemeinsam."

Die Tür öffnet sich weit. Das Licht flutet den Gang, doch durch das Tag 19 siehst du die Strukturen dahinter – den Weg nach Hause.

Du trittst über die Schwelle.`
      }
    ],
    choices: [
      {
        id: 'enter_seven_recognized',
        label: 'Abteil 7 betreten',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c7_s13_comp7_recognized'
      },
      {
        id: 'hesitate_at_door_recognized',
        label: 'An der Tür zögern',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s13_comp7_recognized'
      },
      {
        id: 'enter_seven_unknown',
        label: 'Eintreten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s13_seven_price'
      }
    ],
    state_notes: [
      'Set-Piece Teil 1: Abteil 7 Finale',
      'CONDITION: enter_seven nur bei tickets_truth >= 5',
      'Eigene Stimme ruft',
      'Letztes Angebot'
    ],
    tags: ['setup'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // SET-PIECE 2: Abteil 7 Finale (Teil 2 - Preis)
  // ==========================================================================

  'c7_s13_seven_price': {
    id: 'c7_s13_seven_price',
    chapter: 7,
    title: 'Abteil 7 - Der Preis',
    narrative: `Du trittst über die Schwelle von Abteil 7.

Das Abteil ist… anders.

Größer. Oder kleiner.

Es verändert sich.

Und da sitzt… du.

Oder eine Version von dir.

Die Version, die nie aus dem Zug gestiegen ist.

Die Version, die im Unfall… geblieben ist.

„Der Preis," sagt die Gestalt.

„Ist einfach."

„Du kannst gehen."

„Zurück in die Welt."

„Aber du musst… mich dalassen."

„Diesen Teil von dir."

„Die Schuld, nicht geholfen zu haben. Die Last, der Einzige zu sein, der entkam."

„Den Teil, der hier bleiben will."

„Der Angst hat."

„Der nicht bereit ist."

Die Gestalt steht auf.

„Oder…"

„Wir bleiben beide."

„Für immer."

„Hier im Zug."

„Sicher. Allein. Ewig."`,
    choices: [
      {
        id: 'leave_shadow',
        label: '„Ich muss diesen Teil loslassen."',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c7_s14_seven_decision'
      },
      {
        id: 'embrace_shadow',
        label: '„Wir gehen zusammen."',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s14_seven_decision'
      },
      {
        id: 'stay_together',
        label: '„Wir bleiben beide."',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c7_s14_seven_decision'
      },
      {
        id: 'refuse_choice',
        label: '„Es gibt einen anderen Weg."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s14_seven_decision'
      }
    ],
    state_notes: [
      'Set-Piece Teil 2: Preis enthüllt',
      'CONDITION: leave_shadow nur bei tickets_guilt >= 3',
      'CONDITION: embrace_shadow nur bei tickets_love >= 3',
      'CONDITION: stay_together nur bei tickets_escape >= 4',
      'Schatten-Selbst Konfrontation'
    ],
    tags: ['reveal', 'secret'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // SET-PIECE 2: Abteil 7 - ERKANNT (High Truth)
  // ==========================================================================

  'c7_s13_comp7_recognized': {
    id: 'c7_s13_comp7_recognized',
    chapter: 7,
    title: 'Die Erkenntnis - Abteil 7',
    narrative: `Du trittst über die Schwelle von Abteil 7.

Das Abteil ist anders - größer und kleiner zugleich, als würde es sich bei jedem Atemzug neu vermessen.

Und dort sitzt du.

Aber nicht nur du.

**Comp7.**

Die Gestalt aus Abteil 7. Die Gestalt, die nie wirklich ein eigener Mitreisender war.

„Du verstehst es jetzt," sagt sie.

Und du verstehst tatsächlich: Comp7 war der Teil von dir, der nicht loslassen konnte. Der an Liebe und Bindung festhielt. An dem Menschen, der im Unfall starb. An allem, was du hättest sein können.

„Fünfzig Jahre," flüstert die Gestalt. „Hast du an mich festgehalten. An uns. An der Liebe, die nicht sterben durfte. An der Schuld, nicht genug geliebt zu haben."

Sie steht auf.

Jetzt erkennst du das Gesicht.

Nicht deins.

Ihr Gesicht. Sein Gesicht. Das Gesicht derjenigen, die du verloren hast.

„Der Preis," sagt sie, „ist die Liebe selbst. Du kannst weitergehen - aber nur, wenn du mich zurücklässt. Diesen Teil von dir, der nie aufgehört hat zu trauern. Und nie aufgehört hat zu lieben."

Sie lächelt traurig, beinahe zärtlich.

„Oder du nimmst mich mit. Integrierst diesen Teil wieder. Und lebst mit Liebe, Trauer und allem, was daran hängt. Für den Rest deines Lebens."`,
    choices: [
      {
        id: 'integrate_love',
        label: '„Komm mit mir. Du gehörst zu mir."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'set', target: 'rel_comp7', value: 4 }
        ],
        next: 'c7_s14_seven_decision'
      },
      {
        id: 'release_attachment',
        label: '„Ich muss dich loslassen. Endlich."',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c7_s14_seven_decision'
      },
      {
        id: 'accept_both',
        label: '„Liebe und Verlust – beides ist Teil von mir."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s14_seven_decision'
      },
      {
        id: 'refuse_to_choose',
        label: '„Ich bin noch nicht bereit."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s14_seven_decision'
      }
    ],
    state_notes: [
      'TRUTH >= 4: Protagonist erkennt Comp7 als Liebe/Bindung-Teil',
      'REVEAL: Comp7 ist der Teil, der nicht loslassen konnte',
      'CONDITION: release_attachment nur bei tickets_guilt >= 3',
      'Integration oder Loslassen möglich',
      'Emotionaler Höhepunkt'
    ],
    tags: ['reveal', 'secret'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // SET-PIECE 2: Abteil 7 Finale (Teil 3 - Entscheidung)
  // ==========================================================================

  'c7_s14_seven_decision': {
    id: 'c7_s14_seven_decision',
    chapter: 7,
    title: 'Abteil 7 - Entscheidung',
    narrative: `Auf deine Worte hin nickt die Gestalt.

„So sei es."

Sie beginnt zu verblassen.

Oder… zu verschmelzen.

Mit dir.

Oder du mit ihr.

Die Grenze verschwimmt.

Du spürst… alles.

Die Angst. Die Hoffnung. Die Schuld. Die Liebe.

Alles gleichzeitig.

Das Abteil löst sich auf.

Aber du bleibst.

Ganz. Vollständig.

Oder… so vollständig, wie du sein kannst.

Mit all deinen Teilen.

Mit all deinen Entscheidungen.

Mit all deiner Geschichte.

Die Tür von Abteil 7 verschwindet.

Und du stehst wieder im Gang.

Aber du bist nicht mehr derselbe.

Du bist… bereit.`,
    choices: [
      {
        id: 'feel_complete',
        label: 'Sich vollständig fühlen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s15_recorder_trigger'
      },
      {
        id: 'feel_fractured',
        label: 'Sich zerbrochen fühlen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s15_recorder_trigger'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Entscheidung/Verschmelzung',
      'Selbst-Integration',
      'Transformation'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // STANDARD: Recorder Trigger (Conditional)
  // ==========================================================================

  'c7_s15_recorder_trigger': {
    id: 'c7_s15_recorder_trigger',
    chapter: 7,
    title: 'Der Rekorder',
    narrative: `Zurück im Gang blickst du auf den Kassettenrekorder.

Der Rekorder, den du die ganze Zeit bei dir hattest.

Jetzt… vibriert er.

Leicht.

Als wäre er… lebendig.

Der Play-Knopf leuchtet.

Rot. Pulsierend.

Wie ein Herz.

Du weißt: Wenn du jetzt abspielst…

Wird sich alles verändern.

Alles.

Die Kassette enthält… die Wahrheit.

Deine Wahrheit.

Die Wahrheit dessen, was 1973 passiert ist.

Drückst du?`,
    narrative_variants: [
      {
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'has_recorder', value: true },
            { type: 'compare', target: 'rel_boy', operator: '>=', value: 2 }
          ]
        },
        narrative: `Zurück im Gang blickst du auf den Kassettenrekorder.

Den Rekorder des Jungen. Du erinnerst dich — wie er ihn dir gegeben hat. Ohne Worte. Nur ein Blick, der sagte: „Du wirst ihn brauchen." Er hatte recht.

Der Junge, der nie sprach. Der immer zuhörte. Der wusste, was auf den Kassetten ist, bevor du es wusstest. Vielleicht hat er es immer gewusst.

Und jetzt vibriert der Rekorder. Leicht. Als wäre er lebendig. Der Play-Knopf leuchtet rot. Pulsierend. Wie ein Herz.

Du denkst an den Jungen. An sein Vertrauen. An das, was der Schlaflose gesagt hat: „Die Kassetten sind nicht leer. Was darauf ist — das ist keine Musik."

Die Wahrheit dessen, was 1973 passiert ist. Der Junge hat sie dir anvertraut.

Drückst du?`
      },
      {
        condition: { type: 'bool', target: 'played_recorder', value: true },
        narrative: `Zurück im Gang blickst du auf den Kassettenrekorder.

Du hast ihn schon einmal abgespielt. Damals — die Fragmente. Die Stimmen. Das Rauschen, das sich langsam zu Worten formte. Aber du hast nicht alles gehört. Du hast abgebrochen. Oder die Kassette hat abgebrochen.

Jetzt vibriert er. Anders als vorher. Stärker. Der Play-Knopf leuchtet rot. Pulsierend.

Diesmal wird er nicht abbrechen. Diesmal ist die Kassette bereit. Diesmal bist du bereit.

Die ganze Wahrheit. 1973. Die 19.

Drückst du?`
      }
    ],
    choices: [
      {
        id: 'play_recorder_final',
        label: 'Abspielen',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c7_s16_recorder_playback'
      },
      {
        id: 'destroy_recorder',
        label: 'Den Rekorder zerstören',
        condition: {
          type: 'bool',
          target: 'has_recorder',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c7_s19_interlude_train_stops'
      },
      {
        id: 'no_recorder',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s19_interlude_train_stops'
      }
    ],
    state_notes: [
      'Recorder Trigger (nur wenn has_recorder)',
      'CONDITION: play_recorder_final nur bei has_recorder',
      'CONDITION: destroy_recorder nur bei has_recorder',
      'Verzweigung: mit/ohne Recorder-Szenen'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // SET-PIECE 3: Recorder Playback (Teil 1 - Abspielen, Conditional)
  // ==========================================================================

  'c7_s16_recorder_playback': {
    id: 'c7_s16_recorder_playback',
    chapter: 7,
    title: 'Die Kassette - Wiedergabe',
    narrative: `Dann drückst du Play.

Die Kassette läuft an. Erst Rauschen. Dann deine Stimme - jünger, vielleicht älter, unmöglich zu sagen.

„Test. Eins. Zwei. Drei."
„19. September 1973."
„Ich bin im Nachtzug 19. Wagen 7, Sitz 19. Es ist 19:19 Uhr."

Eine Pause, dann flacher Atem.

„Ich habe Angst. Etwas stimmt nicht. Der Zug fährt zu schnell. Viel zu schnell."
„Die Schienen ... ich glaube, da ist ..."

Dann das Geräusch: Metall, das zerreißt. Glas. Schreie. Und plötzlich Stille.

Nach einem langen Knistern hörst du wieder deine Stimme:

„Ich bin tot, oder?"`,
    choices: [
      {
        id: 'listen_more',
        label: 'Weiterhören',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s17_recorder_truth'
      },
      {
        id: 'stop_playback',
        label: 'Stoppen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s18_recorder_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 1: Recorder Playback (conditional)',
      'Nur erreichbar wenn has_recorder',
      'Eigene Stimme von 1973',
      'Unfall-Moment aufgezeichnet'
    ],
    tags: ['reveal'],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // SET-PIECE 3: Recorder Playback (Teil 2 - Wahrheit, Conditional)
  // ==========================================================================

  'c7_s17_recorder_truth': {
    id: 'c7_s17_recorder_truth',
    chapter: 7,
    title: 'Die Kassette - Wahrheit',
    narrative: `Die Kassette läuft weiter.

Deine Stimme, brüchig und fern:

„Ich bin tot. Aber ich bin noch hier. Im Zug. Er fährt weiter. Immer weiter. Durch Zeit. Durch Erinnerungen. Ich sehe andere Passagiere. Sind sie auch ...?"

Dann Comp7:

„Ja. Wir alle. Wir sind im Moment des Unfalls zurückgeblieben. Gefangen, bis wir bereit sind loszulassen. Bereit zu gehen."

Wieder deine Stimme:

„Ich will gehen. Aber ich habe Angst. So viel Angst."

Die Kassette stoppt.

Klick.`,
    choices: [
      {
        id: 'accept_death',
        label: '„Ich bin bereit."',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s18_recorder_aftermath'
      },
      {
        id: 'deny_death',
        label: '„Das ist nicht wahr."',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c7_s18_recorder_aftermath'
      },
      {
        id: 'cry',
        label: 'Weinen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c7_s18_recorder_aftermath'
      }
    ],
    state_notes: [
      'Set-Piece Teil 2: Vollständige Wahrheit (conditional)',
      'CONDITION: accept_death nur bei tickets_truth >= 5',
      'Tod bestätigt',
      'Zug als Limbus/Fegefeuer bestätigt',
      'Comp7 Stimme'
    ],
    tags: ['reveal'],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // SET-PIECE 3: Recorder Playback (Teil 3 - Nachwirkungen, Conditional)
  // ==========================================================================

  'c7_s18_recorder_aftermath': {
    id: 'c7_s18_recorder_aftermath',
    chapter: 7,
    title: 'Nach der Kassette',
    narrative: `Du legst den Rekorder weg.

Deine Hände zittern - nicht vor Kälte, sondern vor Klarheit.

Seit 1973 bist du tot. Und doch nicht ganz.
Du hängst in diesem Zwischenraum fest, zwischen Leben und Tod, zwischen Erinnern und Vergessen.

Jetzt bleibt nur noch eine Entscheidung.
Vollständig. Endgültig.

Gehst du?
Oder bleibst du?`,
    choices: [
      {
        id: 'choose_leave',
        label: 'Gehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c7_s19_interlude_train_stops'
      },
      {
        id: 'choose_stay',
        label: 'Bleiben',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 }
        ],
        next: 'c7_s19_interlude_train_stops'
      }
    ],
    state_notes: [
      'Set-Piece Teil 3: Nachwirkungen Recorder (conditional)',
      'Klarheit über Situation',
      'Vorbereitung auf finale Wahl'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // INTERLUDE 4: Zug hält an
  // ==========================================================================

  'c7_s19_interlude_train_stops': {
    id: 'c7_s19_interlude_train_stops',
    chapter: 7,
    title: 'Stillstand',
    narrative: `Egal, wie du dich entschieden hast: Der Zug… hält.

Nicht langsam.

Plötzlich.

Vollständig.

Aber sanft.

Wie ein Seufzer.

Die Bewegung, die so lange da war…

Ist weg.

Ersetzt durch absolute Stille.

Absolute Ruhe.

Du spürst es.

Das Ende.

Es ist hier.

Die Türen… werden sich öffnen.

Jeden Moment.

Und dann…

Dann ist es vorbei.`,
    narrative_variants: [
      {
        condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 3 },
        priority: 15,
        narrative: `Der Zug… hält.

Nicht langsam.

Wie gebremst.

Vollständig.

Aber sanft.

Wie ein Atemzug.

Die Bewegung, die so lange da war…

Ist weg.

Ersetzt durch absolute Stille.

Absolute Ruhe.

Du spürst es.

Das Ende.

Es ist hier.

Die Türen… könnten sich öffnen.

Jeden Moment.

Und dann…

Dann ist es vorbei.`
      },
      {
        condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 5 },
        priority: 25,
        narrative: `Der Zug… hält.

Nicht langsam.

Sondern als würde er hängen bleiben.

Vollständig.

Aber sanft.

Wie ein Einrasten.

Die Bewegung, die so lange da war…

Ist weg.

Ersetzt durch ein dünnes Pfeifen.

Absolute Ruhe.

Du spürst es.

Das Ende.

Es ist hier.

Die Türen… stehen bereits offen.

Als hättest du den Moment knapp verpasst.

Und dann…

Dann ist es vorbei.`
      }
    ],
    choices: [
      {
        id: 'prepare',
        label: 'Sich vorbereiten',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s20_conductor_finale'
      },
      {
        id: 'resist_end',
        label: 'Sich gegen das Ende sträuben',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s20_conductor_finale'
      }
    ],
    state_notes: [
      'Interlude: Zug hält endgültig',
      'Stille/Ruhe',
      'Ende nahe',
      'CONDITION: resist_end bei tickets_escape >= 3'
    ],
    tags: ['interlude'],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Schaffner Finale
  // ==========================================================================

  'c7_s20_conductor_finale': {
    id: 'c7_s20_conductor_finale',
    chapter: 7,
    title: 'Der Schaffner - Abschied',
    narrative: `Der Schaffner erscheint zum letzten Mal.

Er wirkt nicht mehr bedrohlich, nicht mehr unnahbar. Nur müde. Alt. Menschlich.

„Es ist Zeit," sagt er. „Für dich. Für alle."

Er reicht dir deine Fahrkarte. Jetzt ist jede Zeile ausgefüllt: dein Name, dein Ziel, deine Zeit.

„Du hast gut gewählt," sagt er, dann ein schwaches Lächeln. „Oder gut genug. Eine perfekte Wahl gibt es nicht. Nur deine."

Er deutet zur Tür.

„Geh. Und leb. Oder ... was auch immer danach kommt."

Dann verschwindet er.
Endgültig.`,
    choices: [
      {
        id: 'thank_conductor_high_attention',
        label: '„Danke. Für alles."',
        weight: 'neutral',
        condition: {
          type: 'compare',
          target: 'conductor_attention',
          operator: '>=',
          value: 4
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s20c_conductor_echo'
      },
      {
        id: 'say_nothing',
        label: 'Schweigen',
        weight: 'neutral',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s20c_conductor_echo'
      },
      {
        id: 'take_ticket',
        label: 'Die Fahrkarte nehmen',
        weight: 'neutral',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s20c_conductor_echo'
      },
      {
        id: 'last_sacrifice',
        label: 'Ein letztes Opfer bringen',
        weight: 'irreversibel',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 3 }
        ],
        next: 'c7_s20b_last_sacrifice'
      }
    ],
    state_notes: [
      'CONDITION: thank_conductor_high_attention nur bei conductor_attention >= 4',
      'NEW: last_sacrifice Choice führt zu Last-Minute Boost Subszene',
      'Ermöglicht +2 auf beliebiges Ticket (Preis: +5 memory_drift gesamt)',
      'Fahrkarte vollständig',
      'Abschied'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Letztes Opfer (NEW - Subszene)
  // ==========================================================================

  'c7_s20b_last_sacrifice': {
    id: 'c7_s20b_last_sacrifice',
    chapter: 7,
    title: 'Das letzte Opfer',
    narrative: `Du hältst inne.

Der Schaffner ist bereits verschwunden.

Aber du spürst… etwas.

Eine letzte Möglichkeit.

Eine letzte Chance… etwas zu ändern.

Du könntest… einen Teil von dir dalassen.

Einen größeren Teil.

Mehr Erinnerung. Mehr Selbst.

Mehr… Realität.

Der Preis wäre hoch.

Deine Erinnerungen würden… verschwimmen.

Stark.

Vielleicht unwiederbringlich.

Aber du könntest… stärker werden.

In dem, was du gewählt hast.

In dem, was du sein willst.

Welchen Preis zahlst du?`,
    choices: [
      {
        id: 'sacrifice_for_truth',
        label: 'Erinnerung opfern für Klarheit',
        weight: 'irreversibel',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s20c_conductor_echo'
      },
      {
        id: 'sacrifice_for_escape',
        label: 'Identität opfern für Flucht',
        weight: 'irreversibel',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s20c_conductor_echo'
      },
      {
        id: 'sacrifice_for_guilt',
        label: 'Zukunft opfern für Verantwortung',
        weight: 'irreversibel',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s20c_conductor_echo'
      },
      {
        id: 'sacrifice_for_love',
        label: 'Selbst opfern für Verbindung',
        weight: 'irreversibel',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s20c_conductor_echo'
      }
    ],
    state_notes: [
      'NEW: Last-Minute Boost Subszene',
      'Spieler kann +2 auf gewähltes Ticket bekommen',
      'Preis: +2-3 memory_drift (insgesamt)',
      'Ermöglicht Erreichen von Ending-Schwellenwerten'
    ],
    atmosphere: 'danger'
  },

  // ==========================================================================
  // STANDARD: Letzte Worte im Abteil (Agency ohne System-Einfluss)
  // ==========================================================================

  'c7_s20c_conductor_echo': {
    id: 'c7_s20c_conductor_echo',
    chapter: 7,
    title: 'Echo im Gang',
    narrative: `Wo der Schaffner eben stand, bleibt nur ein Hauch kalter Luft.

Doch seine letzten Worte hallen nach.

Du kannst antworten.

Nicht für ihn.

Für dich.`,
    choices: [
      {
        id: 'echo_acceptance',
        label: '„Ich gehe. Aber ich vergesse euch nicht."',
        effects: [
          { type: 'set', target: 'mut', value: 4 }
        ],
        next: 'c7_s20d_echo_acceptance'
      },
      {
        id: 'echo_defiance',
        label: '„Ich gehe erst, wenn ich alles verstanden habe."',
        effects: [
          { type: 'set', target: 'mut', value: 5 }
        ],
        next: 'c7_s20d_echo_defiance'
      },
      {
        id: 'echo_gratitude',
        label: '„Dann lass uns das würdig beenden."',
        effects: [
          { type: 'set', target: 'mut', value: 6 }
        ],
        next: 'c7_s20d_echo_gratitude'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Agency: zusätzlicher Abschiedsdialog ohne neue Effects',
      'Rekombination in c7_s21_photo_revelation'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Echo-Reaktion - Annahme
  // ==========================================================================

  'c7_s20d_echo_acceptance': {
    id: 'c7_s20d_echo_acceptance',
    chapter: 7,
    title: 'Nicht vergessen',
    narrative: `Deine Worte hängen im Gang, ohne Widerhall.

Und doch fühlt es sich an, als hätten sie jemand erreicht.

Nicht den Schaffner. Die, die mit dir gefahren sind.`,
    choices: [
      {
        id: 'continue_after_echo_acceptance',
        label: 'Weiter',
        next: 'c7_s21_photo_revelation'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Annahme',
      'Rekombination in c7_s21_photo_revelation'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Echo-Reaktion - Trotz
  // ==========================================================================

  'c7_s20d_echo_defiance': {
    id: 'c7_s20d_echo_defiance',
    chapter: 7,
    title: 'Hartnäckig',
    narrative: `Der Satz klingt wie Widerstand.

Die Luft wird kurz schärfer, kälter.

Dann lässt der Druck nach, als hätte der Zug deinen Trotz notiert und akzeptiert.`,
    choices: [
      {
        id: 'continue_after_echo_defiance',
        label: 'Nicht stehenbleiben',
        next: 'c7_s21_photo_revelation'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Trotz',
      'Rekombination in c7_s21_photo_revelation'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Echo-Reaktion - Dankbarkeit
  // ==========================================================================

  'c7_s20d_echo_gratitude': {
    id: 'c7_s20d_echo_gratitude',
    chapter: 7,
    title: 'Würdig',
    narrative: `Für einen Augenblick wird es warm im Gang.

Wie ein stilles Nicken aus einer Richtung, die es nicht mehr gibt.

Dann kehrt die Kälte zurück, aber sie wirkt weniger feindlich.`,
    choices: [
      {
        id: 'continue_after_echo_gratitude',
        label: 'Den Blick nach vorn richten',
        next: 'c7_s21_photo_revelation'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Dankbarkeit',
      'Rekombination in c7_s21_photo_revelation'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Foto Enthüllung (Conditional)
  // ==========================================================================

  'c7_s21_photo_revelation': {
    id: 'c7_s21_photo_revelation',
    chapter: 7,
    title: 'Das Foto',
    narrative: `Nach den letzten Worten des Schaffners erinnerst du dich an das Foto.

Das Foto vom schlaflosen Mann.

„1973. Letzte Fahrt."

Du holst es hervor.

Siehst es dir genau an.

Die Menschen vor dem Zug.

Lächelnd. Winkend.

Und… da.

Ganz links.

Eine verschwommene Gestalt.

Du.

Du bist auf diesem Foto.

1973.

Vor dem Nachtzug 19.

Vor der letzten Fahrt.

Vor dem Unfall.

Bevor… alles endete.

Du drehst das Foto um.

Auf der Rückseite steht jetzt mehr:

„Letzte Fahrt. 19:19 Uhr. 156 Passagiere."

„Alle angekommen."

„Irgendwann."`,
    choices: [
      {
        id: 'understand_photo',
        label: 'Das Foto verstehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c7_s21b_echo_callback'
      },
      {
        id: 'trace_anomaly',
        label: 'Die Verzerrung nachzeichnen',
        condition: {
          type: 'bool',
          target: 'photo_anomaly',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s21b_echo_callback'
      },
      {
        id: 'put_away_photo',
        label: 'Das Foto weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s21b_echo_callback'
      }
    ],
    state_notes: [
      'Foto Enthuellung: Spieler auf Foto sichtbar (1973)',
      'Rueckseite: "Letzte Fahrt... Alle angekommen" - mehrdeutig',
      'CONDITION: trace_anomaly nur bei photo_anomaly'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // STANDARD: Später Callback auf Schaffner-Echo
  // ==========================================================================

  'c7_s21b_echo_callback': {
    id: 'c7_s21b_echo_callback',
    chapter: 7,
    title: 'Nach dem Echo',
    narrative: `Das Foto sinkt wieder in deine Hand.

Dein letzter Satz im Gang wirkt noch nach, wie eine Haltung, die du mitgenommen hast.`,
    narrative_variants: [
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 4
        },
        narrative: `Das Foto sinkt wieder in deine Hand.

Dein Satz über Erinnern macht den Gang nicht heller, aber weniger kalt.

Du spürst, dass du gehst, ohne abzuschneiden.`
      },
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 5
        },
        narrative: `Das Foto sinkt wieder in deine Hand.

Der Trotz von eben bleibt in dir wie ein kleiner Widerhaken.

Nicht gegen die Wahrheit. Gegen das Verschwinden.`
      },
      {
        condition: {
          type: 'compare',
          target: 'mut',
          operator: '==',
          value: 6
        },
        narrative: `Das Foto sinkt wieder in deine Hand.

Dein Dank von eben wirkt nach wie ein stilles Ritual.

Als hättest du der Fahrt einen Abschluss gegeben, bevor sie endet.`
      }
    ],
    choices: [
      {
        id: 'continue_to_tag_after_echo_callback',
        label: 'Auf das Etikett sehen',
        next: 'c7_s22_tag19_resonance'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Später Callback auf c7_s20c/c7_s20d',
      'mut wird hier nur als Flavor-Flag genutzt',
      'Kein Einfluss auf Endings/Route'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Tag19 finale Bedeutung (Conditional)
  // ==========================================================================

  'c7_s22_tag19_resonance': {
    id: 'c7_s22_tag19_resonance',
    chapter: 7,
    title: 'Das Etikett',
    narrative: `Mit der Erkenntnis aus dem Foto in dir liegt das Tag19-Etikett schwer in deiner Hand.

Es wird heiß. Nicht sichtbar, aber spürbar. Ein Puls, der sich durch den Knochen frisst.

Ein Summen setzt ein – tief, unter der Hörschwelle. Nicht vom Tag. Aus dir.`,
    choices: [
      {
        id: 'focus_on_pulse',
        label: 'Dich auf den Puls konzentrieren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s22_tag19_final'
      },
      {
        id: 'pull_hand_away',
        label: 'Die Hand lösen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s22_tag19_final'
      }
    ],
    state_notes: [
      'Split Part 1: Tag19 Resonanz'
    ],
    atmosphere: 'mystic'
  },

  'c7_s22_tag19_final': {
    id: 'c7_s22_tag19_final',
    chapter: 7,
    title: 'Das Etikett - Letzte Bedeutung',
    narrative: `Der Puls hämmert weiter: Wagen 7, Sitz 19.

1973. Letzte Fahrt.

Du verstehst jetzt: 19 ist kein Zufall.

19. September. 19:19 Uhr. Nachtzug 19.

Alles ist ein Muster. Ein Code.

Das Tag vibriert stärker. Die Hitze wird unerträglich. Die Ziffern brennen sich in deine Handfläche.

„19" ist nicht nur eine Nummer. Es ist ein Anker.

Wenn du es festhältst und dich darauf konzentrierst, könntest du die Zeit stabilisieren. Den Drift stoppen.

Oder du lässt los. Lässt die Vergangenheit gehen.

Das Tag pulsiert. Wartend.`,
    choices: [
      {
        id: 'use_as_anchor',
        label: 'Das Tag als Anker benutzen – die Zeit stabilisieren',
        condition: {
          type: 'and',
          conditions: [
            { type: 'bool', target: 'has_tag19', value: true },
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 10 }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'set', target: 'memory_drift', value: 0 }
        ],
        next: 'c7_s23_interlude_doors_open'
      },
      {
        id: 'let_go_tag',
        label: 'Loslassen und weitergehen',
        condition: {
          type: 'bool',
          target: 'has_tag19',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 }
        ],
        next: 'c7_s23_interlude_doors_open'
      },
      {
        id: 'keep_tag',
        label: 'Festhalten, aber nichts tun',
        condition: {
          type: 'bool',
          target: 'has_tag19',
          value: true
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 },
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'c7_s23_interlude_doors_open'
      },
      {
        id: 'no_tag',
        label: 'Weitergehen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s23_interlude_doors_open'
      }
    ],
    state_notes: [
      'SYNÄSTHESIE: Tag wird heiß, vibriert, summt',
      'CONDITION: use_as_anchor nur bei has_tag19 UND tickets_truth >= 5',
      'use_as_anchor: MASSIVER BONUS (+4 Truth, memory_drift auf 0 gesetzt)',
      'CONDITION: let_go_tag nur bei has_tag19',
      'CONDITION: keep_tag nur bei has_tag19 (jetzt negativ: +guilt, +drift)'
    ],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // INTERLUDE 5: Türen öffnen sich
  // ==========================================================================

  'c7_s23_interlude_doors_open': {
    id: 'c7_s23_interlude_doors_open',
    chapter: 7,
    title: 'Die Türen',
    narrative: `Dann beginnen die Türen…

Beginnen sich zu öffnen.

Langsam.

Sehr langsam.

Der Spalt ist zuerst nur eine Linie, dünn wie ein Haar. Kühle Luft drückt hinein und legt sich auf deine Lippen.

Staub wirbelt im Licht, kleine Punkte, die langsam schweben. Du hörst ein fernes Summen, nicht vom Zug, eher vom Bahnsteig.

Du trittst einen halben Schritt vor, stoppst, die Sohlen kleben kurz am Boden.

Der Geruch von nassem Stein trifft dich, und etwas darin ist vertraut, ohne dass du es greifen kannst.

Dein Herz pocht, als hättest du endlich wieder einen Rhythmus.

Das Licht zeichnet eine klare Kante über die Sitze, und du siehst zum ersten Mal Staub, der sich nicht bewegt.

Licht strömt herein.

Nicht das goldene Licht von Abteil 7.

Nicht das künstliche Licht des Zuges.

Echtes Licht.

Tageslicht.

Oder… Nachtlicht.

Schwer zu sagen.

Aber es ist… real.

Endlich real.

Die Luft, die hereinströmt, ist kalt.

Frisch.

Lebendig.

Du atmest tief ein.

Das erste Mal seit…

Wie lange?

Fünfzig Jahre?

Fünfzig Minuten?

Die Türen sind jetzt vollständig offen.

Der Bahnsteig liegt vor dir.

Real. Fest. Endgültig.`,
    choices: [
      {
        id: 'step_forward',
        label: 'Einen Schritt nach vorne',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s24_platform_real'
      }
    ],
    state_notes: [
      'Interlude: Türen öffnen sich',
      'Echtes Licht/echte Luft',
      'Real vs. Traum',
      'Schwelle'
    ],
    tags: ['interlude'],
    atmosphere: 'mystic'
  },

  // ==========================================================================
  // STANDARD: Realer Bahnsteig
  // ==========================================================================

  'c7_s24_platform_real': {
    id: 'c7_s24_platform_real',
    chapter: 7,
    title: 'Der echte Bahnsteig',
    narrative: `Du trittst hinaus.

Der Bahnsteig ist anders als alle davor: nicht verschwommen, nicht traumhaft, nicht unheimlich. Einfach da. Real. Fest. Wirklich.

Ein Schild hängt an der Kante, doch der Name bleibt unlesbar. Die Buchstaben verschwimmen oder verändern sich, je nachdem, wie du hinsiehst.

Für jeden Passagier ein anderer Bahnhof. Ein anderes Ziel. Ein anderes Danach.

Du blickst zurück. Der Zug steht noch da, die Türen offen.

Aber du weißt: Wenn du jetzt gehst, gibt es kein Zurück.

Nie wieder.

Bist du bereit?`,
    choices: [
      {
        id: 'look_around',
        label: 'Sich umsehen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s25_final_choice'
      },
      {
        id: 'look_back',
        label: 'Zurückblicken',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s25_final_choice'
      },
      {
        id: 'breathe',
        label: 'Tief einatmen',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'c7_s25_final_choice'
      }
    ],
    state_notes: [
      'Realer Bahnsteig',
      'Schild lesbar aber individuell',
      'Jeder sieht sein eigenes Ziel',
      'Letzte Chance zurückzugehen'
    ],
    atmosphere: 'tense'
  },

  // ==========================================================================
  // STANDARD: Finale Vorbereitung
  // ==========================================================================

  'c7_s25_final_choice': {
    id: 'c7_s25_final_choice',
    chapter: 7,
    title: 'Letzte Gedanken',
    narrative: `Du stehst auf dem Bahnsteig.

Zwischen Zug und Welt.

Zwischen Vergangenheit und… was auch immer danach kommt.

Du denkst nach.

Über die Fahrt.

Die Stationen.

Die Entscheidungen.

Die Menschen, die du getroffen hast.

Die Versionen von dir, die du gesehen hast.

Die Wahrheiten, die du gelernt hast.

Die Lügen, die du geglaubt hast.

Alles führt zu diesem Moment.

Zu dieser Entscheidung.

Nicht die Entscheidung, ob du gehst.

Sondern… wer du bist, wenn du gehst.

Was du mitnimmst.

Was du dalässt.

Wer du… werden wirst.

Oder… wer du immer warst.

Die Türen warten.

Die Welt wartet.

Du…

Bist bereit.`,
    choices: [
      {
        id: 'step_off',
        label: 'Aussteigen',
        weight: 'irreversibel',
        effects: [],
        next: 'c7_s25a_step_off_echo'
      },
      {
        id: 'look_back_one_last_time',
        label: 'Ein letztes Mal zurückblicken',
        weight: 'irreversibel',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s25a_look_back_echo'
      }
    ],
    state_notes: [
      'Letzte Reflexion',
      'Vorbereitung auf Ending',
      'Identitätsfrage',
      'Übergang zu Endstation',
      'CONDITION: look_back_one_last_time bei tickets_truth >= 3'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Unmittelbare Reaktion - Aussteigen
  // ==========================================================================

  'c7_s25a_step_off_echo': {
    id: 'c7_s25a_step_off_echo',
    chapter: 7,
    title: 'Der erste echte Schritt',
    narrative: `Dein Fuß setzt auf dem Bahnsteig auf.

Nicht zögernd. Nicht heroisch. Nur endgültig.

Unter der Sohle fühlt sich der Beton rau an, unbestreitbar echt.

Der Zug bleibt hinter dir offen, aber du drehst dich nicht sofort um.`,
    choices: [
      {
        id: 'step_off_keep_forward',
        label: 'Den Blick nach vorn halten',
        effects: [
          { type: 'set', target: 'empathie', value: 30 }
        ],
        next: 'c7_s25b_threshold_dialog'
      },
      {
        id: 'step_off_whisper',
        label: 'Leise: „Ich gehe."',
        effects: [
          { type: 'set', target: 'empathie', value: 31 }
        ],
        next: 'c7_s25b_threshold_dialog'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog nach finalem Schritt',
      'Tonwahl ohne Route-Impact'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Unmittelbare Reaktion - letzter Blick
  // ==========================================================================

  'c7_s25a_look_back_echo': {
    id: 'c7_s25a_look_back_echo',
    chapter: 7,
    title: 'Ein letzter Blick',
    narrative: `Du drehst dich ein letztes Mal um.

Im Türrahmen stehen Licht und Schatten übereinander, als würde der Zug gleichzeitig Abschied nehmen und dich zurückrufen.

Dann wird es still genug, dass dein eigener Atem wie eine Antwort klingt.

Zwischen zwei Schienenstößen glaubst du, ein letztes Knacken der Lautsprecher zu hören, aber es kommt kein Satz mehr.`,
    choices: [
      {
        id: 'look_back_close_with_nod',
        label: 'Dem Zug zunicken',
        effects: [
          { type: 'set', target: 'empathie', value: 32 }
        ],
        next: 'c7_s25b_threshold_dialog'
      },
      {
        id: 'look_back_close_with_name',
        label: 'Den eigenen Namen einmal denken',
        effects: [
          { type: 'set', target: 'empathie', value: 33 }
        ],
        next: 'c7_s25b_threshold_dialog'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Mini-Dialog nach letztem Rückblick',
      'Tonwahl ohne Route-Impact'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Letzter Dialog vor der Endstation
  // ==========================================================================

  'c7_s25b_threshold_dialog': {
    id: 'c7_s25b_threshold_dialog',
    chapter: 7,
    title: 'Die Schwelle',
    narrative: `Der Bahnsteig ist still, als würde die Welt den Atem anhalten.

Noch ein Gedanke.

Noch ein Satz, bevor alles fest wird.

Du spürst, dass hier nicht nur eine Fahrt endet, sondern eine Version von dir.`,
    choices: [
      {
        id: 'threshold_name_choice',
        label: 'Deinen Namen laut sagen',
        effects: [
          { type: 'set', target: 'wissen', value: 7 }
        ],
        next: 'c7_s25c_threshold_name'
      },
      {
        id: 'threshold_thank_choice',
        label: 'Dich bei den Verlorenen bedanken',
        effects: [
          { type: 'set', target: 'wissen', value: 8 }
        ],
        next: 'c7_s25c_threshold_thanks'
      },
      {
        id: 'threshold_silent_choice',
        label: 'Schweigend den ersten Schritt setzen',
        effects: [
          { type: 'set', target: 'wissen', value: 9 }
        ],
        next: 'c7_s25c_threshold_silence'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Agency: letzter Mikro-Dialog ohne zusätzliche Effects',
      'Rekombination in c7_end_station'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Schwellen-Reaktion - Name
  // ==========================================================================

  'c7_s25c_threshold_name': {
    id: 'c7_s25c_threshold_name',
    chapter: 7,
    title: 'Der eigene Name',
    narrative: `Du sagst deinen Namen laut.

Der Klang ist rau, aber er gehört dir.

Der Bahnsteig antwortet mit Stille, die nicht mehr leer wirkt.

Zum ersten Mal klingt dein Name nicht wie Erinnerung, sondern wie Gegenwart.`,
    choices: [
      {
        id: 'continue_after_threshold_name',
        label: 'Weiter',
        next: 'c7_s25d_threshold_callback'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Name',
      'Rekombination in c7_end_station'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Schwellen-Reaktion - Dank
  // ==========================================================================

  'c7_s25c_threshold_thanks': {
    id: 'c7_s25c_threshold_thanks',
    chapter: 7,
    title: 'Ein Dank',
    narrative: `„Danke," sagst du in die Luft, zu niemandem und zu allen.

Zwischen den Schienen scheint etwas zu zittern, wie eine letzte Erinnerung, die loslässt.

Dann wird es ruhig.`,
    choices: [
      {
        id: 'continue_after_threshold_thanks',
        label: 'Den Schritt setzen',
        next: 'c7_s25d_threshold_callback'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Dank',
      'Rekombination in c7_end_station'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Schwellen-Reaktion - Schweigen
  // ==========================================================================

  'c7_s25c_threshold_silence': {
    id: 'c7_s25c_threshold_silence',
    chapter: 7,
    title: 'Ohne Worte',
    narrative: `Du bleibst stumm.

Der erste Schritt klingt deshalb lauter als erwartet.

Nicht hart. Nur endgültig.

Im Schweigen steckt kein Mangel mehr, sondern Richtung.`,
    choices: [
      {
        id: 'continue_after_threshold_silence',
        label: 'Nicht mehr zurücksehen',
        next: 'c7_s25d_threshold_callback'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Choice-Reaktion: Schweigen',
      'Rekombination in c7_end_station'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // STANDARD: Später Callback auf Schwellenwahl
  // ==========================================================================

  'c7_s25d_threshold_callback': {
    id: 'c7_s25d_threshold_callback',
    chapter: 7,
    title: 'Der letzte Nachhall',
    narrative: `Der Bahnsteig bleibt still.

Aber dein letzter Satz davor hängt noch in der Luft.

Du merkst, dass Nachhall und Entscheidung jetzt dasselbe sind.`,
    narrative_variants: [
      {
        condition: {
          type: 'compare',
          target: 'wissen',
          operator: '==',
          value: 7
        },
        narrative: `Der Bahnsteig bleibt still.

Dass du deinen Namen gesagt hast, wirkt wie ein Anker im letzten Windstoß.

Du trittst nicht als Unbekannter ins Danach.`
      },
      {
        condition: {
          type: 'compare',
          target: 'wissen',
          operator: '==',
          value: 8
        },
        narrative: `Der Bahnsteig bleibt still.

Dein Dank schwingt noch nach, leise, aber deutlich.

Als hätte die Fahrt nicht nur ein Ende, sondern auch eine Form bekommen.`
      },
      {
        condition: {
          type: 'compare',
          target: 'wissen',
          operator: '==',
          value: 9
        },
        narrative: `Der Bahnsteig bleibt still.

Dein Schweigen von eben war kein Ausweichen.

Es war eine Entscheidung, die keinen zusätzlichen Satz mehr brauchte.`
      }
    ],
    choices: [
      {
        id: 'continue_to_end_station_after_threshold_callback',
        label: 'Weiter',
        next: 'c7_end_station'
      }
    ],
    tags: ['interlude'],
    state_notes: [
      'Später Callback auf c7_s25b/c7_s25c',
      'wissen wird hier nur als Flavor-Flag genutzt',
      'Kein Einfluss auf Endings/Route'
    ],
    atmosphere: 'somber'
  },

  // ==========================================================================
  // ENDING: Siebte und letzte Station
  // ==========================================================================

  'c7_end_station': {
    id: 'c7_end_station',
    chapter: 7,
    title: 'Endstation',
    narrative: `Du stehst auf dem Bahnsteig.

Vollständig. Endgültig. Real.

Hinter dir beginnt der Zug langsam zu verblassen, als sänke er zurück in die Zeit - zurück nach 1973, zurück in den Moment, in dem alles endete und zugleich neu begann.

Du drehst dich ein letztes Mal um und siehst den Nachtzug 19, der dich durch Zeit, Erinnerung und Tod getragen hat, bis hierher.

Die Gestalten am Bahnsteig sind jetzt klar. Gesichter. Menschen.

Manche erkennst du. Manche nicht.

Aber alle warten.

Nicht nur auf dich - auch mit dir.

Bereit für das, was jetzt kommt.

Die Fahrt ist vorbei.

Die Geschichte beginnt jetzt.

Wer bist du?

Was hast du gewählt?

Was nimmst du mit ins Danach?`,
    choices: [
      {
        id: 'truth_path',
        label: 'Der Wahrheit begegnen – koste es, was es wolle',
        weight: 'irreversibel',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 10
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'ending_truth_01'
      },
      {
        id: 'love_path',
        label: 'Jemandem folgen – nicht allein sein',
        weight: 'irreversibel',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 10
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'ending_love_01'
      },
      {
        id: 'guilt_path',
        label: 'Die Verantwortung tragen – und weitergehen',
        weight: 'irreversibel',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 10
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'ending_guilt_01'
      },
      {
        id: 'escape_path',
        label: 'Im Zug bleiben – für immer',
        weight: 'irreversibel',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 10
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'ending_escape_01'
      },
      {
        id: 'limbo_path',
        label: 'Nicht entscheiden – auf der Schwelle bleiben',
        weight: 'irreversibel',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'ending_limbo_01'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Station-End: Finale - Zug verblasst (1973 aufgelöst)',
      'ENDINGS: Truth, Love, Guilt, Escape (Schwellenwerte 10 — erreichbar bei organischem Spiel)',
      'FALLBACK: Limbo Ending (nicht entscheiden)',
      'Jedes Ending führt zu 2 interaktiven Epilog-Szenen',
      'R1: Engine erhoeht memory_drift/station_count automatisch (keine manuellen station_end-Effects)'
    ],
    atmosphere: 'mystic'
  }
};
