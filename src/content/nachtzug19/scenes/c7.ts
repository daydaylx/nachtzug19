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
    narrative: `Das Rattern der Räder ist weg. Komplett. (Hook)

Der Zug bewegt sich noch, du spürst die Bewegung in den Beinen, aber es gibt kein Geräusch mehr. Du klatschst in die Hände – die Bewegung ist da, aber der Ton fehlt, als würde der Raum ihn schlucken, bevor er entsteht. (Detail)

Ein feiner Schwindel zieht dir durch den Magen: Die Welt ist stumm geworden. (Konsequenz)`,
    choices: [
      {
        id: 'test_voice',
        label: 'Versuchen zu sprechen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s02_interlude_silence_b'
      },
      {
        id: 'touch_wall_silence',
        label: 'Wand berühren',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
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
    narrative: `Deine Lippen bewegen sich, aber kein Ton kommt heraus. (Hook)

Der Boden unter deinen Füßen fühlt sich zu glatt an, ohne jede Reibung. Deine Fingerkuppen suchen die Wand, sie ist kühl und gibt minimal nach, als hätte sie Haut. (Detail)

Du bist allein an einem Ort, wo Geräusche nicht mehr existieren. (Konsequenz)`,
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
    narrative: `Du findest Comp7.

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
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 4 }
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
        label: 'Die Tür öffnen',
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
    narrative: `Der Junge sitzt in seinem Abteil.

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
    narrative: `Der Junge sitzt in seinem Abteil.

Aber… er ist anders.

Älter. Oder jünger.

Du kannst es nicht sagen.

Sein Gesicht verändert sich.

Flackert zwischen verschiedenen Altern.

Kind. Teenager. Erwachsener.

Und dann…

Dann erkennst du es.

Die Nase. Die Augen. Die Art, wie er den Kopf hält.

Das bist du.

Nicht "wie du". Nicht "ähnlich".

**Du.**

Vor dem 19. September 1973.

Vor dem Unfall.

Vor… allem.

„Ich erinnere mich," sagt er.

Aber es ist deine Stimme.

Deine Stimme aus einer anderen Zeit.

„Ich erinnere mich an… danach."

„An das, was du geworden bist."

„An das, was wir… verloren haben."

Er hält den Rekorder hoch.

Das Band dreht sich rückwärts.

„Fünfzig Jahre," flüstert er.

„Hast du nach mir gesucht."

„Nach dem Teil von dir, der… nie erwachsen wurde."

„Der nie… das Blut vergessen konnte."

Seine Augen – deine Augen – füllen sich mit Tränen.

„Ich bin müde."

„So müde."

„Kann ich endlich… nach Hause?"`,
    choices: [
      {
        id: 'integrate_innocence',
        label: '„Komm nach Hause. Zu mir."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 3 },
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'rel_boy', value: 2 }
        ],
        next: 'c7_s05_interlude_timeshift'
      },
      {
        id: 'accept_loss',
        label: '„Ich weiß jetzt, wer du warst. Wer ich war."',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 3 },
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
          { type: 'inc', target: 'tickets_love', value: 4 },
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
    narrative: `Die Uhren an den Wänden zeigen unmöglich Zeiten: 1973, 2024, und ein Jahr, das es noch nicht gibt. (Hook)

Die Ziffern blättern nicht um, sie kippen einfach weg. Wenn du das Glas berührst, ist es feucht von einem kalten Film, und der Sekundenzeiger springt unter deinem Finger rückwärts. (Detail)

Ein leises Summen legt sich über den Gang – der Klang von brechender Zeit. (Konsequenz)`,
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
    narrative: `Der Gang dehnt sich wie Gummi, wird länger, dann wieder kurz. (Hook)

Du machst einen Schritt, und der Boden ist plötzlich da, wo er eben nicht war. Am anderen Ende siehst du dich selbst – du winkst dir zu, aber die Bewegung ist verzögert, wie bei einer schlechten Übertragung. (Detail)

Du bist dir nicht mehr sicher, welches „Du“ das echte ist. (Konsequenz)`,
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
    narrative: `Die Lautsprecher knistern.

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
        min_drift: 3,
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
        min_drift: 5,
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

„Willkommen zuhause.`
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
          { type: 'inc', target: 'tickets_truth', value: 3 },
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
    narrative: `Die Lautsprecher knistern wieder.

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
          { type: 'inc', target: 'tickets_truth', value: 3 },
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
    narrative: `Du stehst im Gang.

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
    narrative: `Du siehst sie.

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
    narrative: `Die Erinnerungen kommen.

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
    narrative: `Du stehst wieder vor Abteil 7.

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
        narrative: `Du stehst wieder vor Abteil 7. Die Tür ist da, massiv und realer als alles andere im Zug.

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
          { type: 'inc', target: 'tickets_truth', value: 3 }
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
    narrative: `Du trittst ein.

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
          { type: 'inc', target: 'tickets_love', value: 3 },
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
          { type: 'inc', target: 'tickets_escape', value: 3 }
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
    narrative: `Du trittst ein.

Das Abteil ist… anders.

Größer. Oder kleiner.

Es verändert sich.

Und da sitzt… du.

Aber nicht nur du.

**Comp7.**

Die Gestalt aus Abteil 7.

Die Gestalt, die niemals wirklich da war.

Die niemals real war.

„Du verstehst es jetzt," sagt sie.

Und du tust es.

Du verstehst.

Comp7 war nie ein Mitreisender.

Nie eine andere Person.

Comp7 war… der Teil von dir, der nicht loslassen konnte.

Der Teil, der an der Liebe festhielt. An der Bindung.

An dem Menschen, der im Unfall starb.

An allem, was du hättest sein können. Hättest tun können.

„Fünfzig Jahre," flüstert die Gestalt.

„Hast du an mich festgehalten."

„An uns."

„An der Liebe, die nicht sterben durfte."

„An der Schuld, nicht genug geliebt zu haben."

Sie steht auf.

Und du erkennst das Gesicht.

Es ist nicht dein Gesicht.

Es ist… ihr Gesicht. Sein Gesicht.

Das Gesicht derjenigen, die du verloren hast.

„Der Preis," sagt die Gestalt, „ist die Liebe selbst."

„Du kannst weitergehen."

„Aber nur, wenn du… mich zurücklässt."

„Diesen Teil von dir, der nie aufgehört hat zu trauern."

„Der nie aufgehört hat zu lieben."

„Oder…"

Die Gestalt lächelt.

Traurig. Liebevoll.

„Du nimmst mich mit."

„Integrierst diesen Teil wieder."

„Und lebst mit der Liebe. Mit der Trauer. Mit allem."

„Für den Rest deines Lebens."`,
    choices: [
      {
        id: 'integrate_love',
        label: '„Komm mit mir. Du gehörst zu mir."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 4 },
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
          { type: 'inc', target: 'tickets_truth', value: 3 },
          { type: 'inc', target: 'tickets_guilt', value: 2 }
        ],
        next: 'c7_s14_seven_decision'
      },
      {
        id: 'accept_both',
        label: '„Liebe und Verlust – beides ist Teil von mir."',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'tickets_truth', value: 3 },
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
    narrative: `Die Gestalt nickt.

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
    narrative: `Du blickst auf den Kassettenrekorder.

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
          { type: 'inc', target: 'tickets_truth', value: 3 },
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
    narrative: `Du drückst Play.

Die Kassette beginnt zu laufen.

Zuerst – nur Rauschen.

Dann – eine Stimme.

Deine Stimme.

Aber… jünger.

Oder älter.

Schwer zu sagen.

„Test. Eins. Zwei. Drei."

„19. September 1973."

„Ich bin im Nachtzug 19."

„Wagen 7, Sitz 19."

„Es ist… 19:19 Uhr."

Eine Pause.

„Ich habe… Angst."

„Etwas stimmt nicht."

„Der Zug… fährt zu schnell."

„Viel zu schnell."

„Die Schienen… ich glaube, da ist…"

Ein Geräusch.

Ein schreckliches, zerreißendes Geräusch.

Dann – Stille.

Dann – deine Stimme wieder:

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

Deine Stimme:

„Ich bin tot."

„Aber ich bin noch hier."

„Im Zug."

„Er fährt weiter."

„Immer weiter."

„Durch… die Zeit."

„Durch… Erinnerungen."

„Ich sehe… andere."

„Andere Passagiere."

„Sind sie auch…?"

Eine andere Stimme. Comp7.

„Ja. Wir alle."

„Wir alle sind… zurückgeblieben."

„Im Moment des Unfalls."

„Gefangen."

„Bis wir… bereit sind."

„Bereit, loszulassen."

„Bereit, zu gehen."

Dann – deine Stimme wieder:

„Ich will gehen."

„Aber ich habe Angst."

„So viel Angst."

Die Kassette endet.

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
          { type: 'inc', target: 'tickets_truth', value: 3 },
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
      'CONDITION: accept_death nur bei tickets_truth >= 6',
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

Deine Hände zittern.

Nicht vor Kälte.

Vor Klarheit.

Vor dem Wissen.

Du bist… tot.

Seit 1973.

Aber auch… nicht.

Nicht ganz.

Nicht vollständig.

Du bist in diesem Zwischenraum.

Diesem Ort zwischen Leben und Tod.

Zwischen Erinnern und Vergessen.

Und jetzt…

Jetzt musst du wählen.

Vollständig.

Endgültig.

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
    narrative: `Der Zug… hält.

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
        min_drift: 3,
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
        min_drift: 5,
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

Jeden Moment.

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
    narrative: `Der Schaffner erscheint.

Zum letzten Mal.

Er sieht… anders aus.

Nicht mehr bedrohlich.

Nicht mehr mysteriös.

Nur… müde.

Alt.

Menschlich.

„Es ist Zeit," sagt er leise.

„Für dich."

„Für alle."

Er reicht dir… deine Fahrkarte.

Sie ist vollständig ausgefüllt jetzt.

Jede Zeile.

Jedes Detail.

Dein Name. Dein Ziel. Deine Zeit.

„Du hast gut gewählt," sagt er.

„Oder… gut genug."

Er lächelt. Schwach.

„Es gibt keine perfekte Wahl."

„Nur… deine Wahl."

Er deutet zur Tür.

„Geh. Und… leb."

„Oder… was auch immer danach kommt."

Dann verschwindet er.

Endgültig.`,
    choices: [
      {
        id: 'thank_conductor_high_attention',
        label: '„Danke. Für alles."',
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
        next: 'c7_s21_photo_revelation'
      },
      {
        id: 'say_nothing',
        label: 'Schweigen',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'c7_s21_photo_revelation'
      },
      {
        id: 'take_ticket',
        label: 'Die Fahrkarte nehmen',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'c7_s21_photo_revelation'
      },
      {
        id: 'last_sacrifice',
        label: 'Ein letztes Opfer bringen',
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
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s21_photo_revelation'
      },
      {
        id: 'sacrifice_for_escape',
        label: 'Identität opfern für Flucht',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s21_photo_revelation'
      },
      {
        id: 'sacrifice_for_guilt',
        label: 'Zukunft opfern für Verantwortung',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s21_photo_revelation'
      },
      {
        id: 'sacrifice_for_love',
        label: 'Selbst opfern für Verbindung',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 2 },
          { type: 'inc', target: 'memory_drift', value: 2 }
        ],
        next: 'c7_s21_photo_revelation'
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
  // STANDARD: Foto Enthüllung (Conditional)
  // ==========================================================================

  'c7_s21_photo_revelation': {
    id: 'c7_s21_photo_revelation',
    chapter: 7,
    title: 'Das Foto',
    narrative: `Du erinnerst dich an das Foto.

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
        next: 'c7_s22_tag19_resonance'
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
        next: 'c7_s22_tag19_resonance'
      },
      {
        id: 'put_away_photo',
        label: 'Das Foto weglegen',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'c7_s22_tag19_resonance'
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
  // STANDARD: Tag19 finale Bedeutung (Conditional)
  // ==========================================================================

  'c7_s22_tag19_resonance': {
    id: 'c7_s22_tag19_resonance',
    chapter: 7,
    title: 'Das Etikett',
    narrative: `Das Tag19-Etikett liegt schwer in deiner Hand.

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
    narrative: `Wagen 7, Sitz 19.

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
            { type: 'compare', target: 'tickets_truth', operator: '>=', value: 5 }
          ]
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 4 },
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
    narrative: `Die Türen…

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

Der Bahnsteig ist… anders.

Nicht wie die anderen Stationen.

Nicht verschwommen oder traumhaft.

Nicht mystisch oder unheimlich.

Einfach… da.

Real. Fest. Wirklich.

Es gibt ein Schild.

Mit dem Namen der Station.

Aber… es ist nicht lesbar.

Die Buchstaben verschwimmen.

Oder… sie ändern sich.

Je nachdem, wie du hinsiehst.

Für jeden Passagier… eine andere Station.

Ein anderes Ziel.

Ein anderes… danach.

Du blickst zurück zum Zug.

Er steht noch da.

Die Türen offen.

Aber… du weißt.

Wenn du jetzt gehst…

Gibt es kein Zurück.

Nie wieder.

Die Frage ist:

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
        effects: [
          { type: 'inc', target: 'station_count', value: 1 }
        ],
        next: 'c7_end_station'
      },
      {
        id: 'look_back_one_last_time',
        label: 'Ein letztes Mal zurückblicken',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 3
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 },
          { type: 'inc', target: 'station_count', value: 1 }
        ],
        next: 'c7_end_station'
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
  // ENDING: Siebte und letzte Station
  // ==========================================================================

  'c7_end_station': {
    id: 'c7_end_station',
    chapter: 7,
    title: 'Endstation',
    narrative: `Du stehst auf dem Bahnsteig.

Vollständig. Endgültig. Real.

Der Zug hinter dir… beginnt zu verblassen.

Nicht plötzlich. Langsam.

Als würde er… zurück in die Zeit sinken.

Zurück zu 1973.

Zurück zu dem Moment, wo alles endete.

Und… neu begann.

Du drehst dich um.

Ein letztes Mal.

Siehst den Zug.

Den Nachtzug 19.

Der dich getragen hat.

Durch Zeit. Durch Erinnerung. Durch Tod.

Bis hierher.

Die Gestalten am Bahnsteig sind jetzt klar.

Gesichter. Menschen. Real.

Manche… erkennst du.

Manche nicht.

Aber alle… warten.

Auf dich.

Oder… mit dir.

Bereit für das, was jetzt kommt.

Die Fahrt ist vorbei.

Die Geschichte… beginnt jetzt.

Wer bist du?

Was hast du gewählt?

Was nimmst du mit… ins Danach?`,
    choices: [
      {
        id: 'truth_path',
        label: 'Der Wahrheit begegnen – koste es, was es wolle',
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'ending_truth_01'
      },
      {
        id: 'love_path',
        label: 'Jemandem folgen – nicht allein sein',
        condition: {
          type: 'compare',
          target: 'tickets_love',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'ending_love_01'
      },
      {
        id: 'guilt_path',
        label: 'Die Verantwortung tragen – und weitergehen',
        condition: {
          type: 'compare',
          target: 'tickets_guilt',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'ending_guilt_01'
      },
      {
        id: 'escape_path',
        label: 'Im Zug bleiben – für immer',
        condition: {
          type: 'compare',
          target: 'tickets_escape',
          operator: '>=',
          value: 5
        },
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'ending_escape_01'
      },
      {
        id: 'limbo_path',
        label: 'Nicht entscheiden – auf der Schwelle bleiben',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'ending_limbo_01'
      }
    ],
    tags: ['station_end'],
    state_notes: [
      'Station-End: Finale - Zug verblasst (1973 aufgelöst)',
      'ENDINGS: Truth, Love, Guilt, Escape (Schwellenwerte 5 = max Clamp)',
      'FALLBACK: Limbo Ending (nicht entscheiden)',
      'Jedes Ending führt zu 2 interaktiven Epilog-Szenen',
      'R1: Engine erhoeht memory_drift/station_count automatisch (keine manuellen station_end-Effects)'
    ],
    atmosphere: 'mystic'
  }
};
