// ============================================================================
// NACHTZUG 19 - Interactive Endings
// ============================================================================
// Truth Ending (2 Szenen): ending_truth_01, ending_truth_02
// Love Ending (2 Szenen): ending_love_01, ending_love_02
// Guilt Ending (2 Szenen): ending_guilt_01, ending_guilt_02
// Escape Ending (2 Szenen): ending_escape_01, ending_escape_02
// Limbo Ending (2 Szenen): ending_limbo_01, ending_limbo_02
// ============================================================================

import { ScenesCollection } from '../../../domain/types';

export const endingScenes: ScenesCollection = {
  // ========================================
  // TRUTH ENDING (3 Szenen)
  // ========================================
  'ending_truth_01': {
    id: 'ending_truth_01',
    chapter: 7,
    title: 'Licht',
    narrative: `Du steigst aus.

Der Bahnsteig ist warm. Nicht heiß. Nicht kalt. Genau richtig.

Hinter dir schließt sich die Tür. Ein leises Klicken. Final.

Du drehst dich um. Der Zug – NACHTZUG 19 – steht noch da. Aber er verblasst. Langsam. Als würde er von der Sonne aufgelöst.

Durch die Fenster siehst du sie. Alle.

Der Schlaflose. Er lächelt. Nicht müde. Erleichtert. Er hebt die Hand. Winkt. Dann löst er sich auf. Nicht schmerzhaft. Einfach... weg.

Der Junge. Er steht am Fenster von Wagen 3. Er sieht dich an. Direkt. Seine Augen sind klar. Keine Angst mehr. Er winkt. Einmal. Kurz.

"Danke," formt er stumm mit den Lippen.

Dann ist er weg.

Comp7. Sie steht im Gang von Wagen 7. Ihre Notizbücher liegen auf dem Boden. Verstreut. Nicht mehr wichtig.

Sie legt die Hand ans Fenster.

Du legst deine Hand auf dieselbe Stelle. Das Glas ist warm.

Für einen Moment fühlt es sich an, als würdest du ihre Hand halten.

Dann lässt sie los.

Sie lächelt. Zum ersten Mal.

"Leb wohl," sagst du.

Sie nickt. "Leb."

Dann ist auch sie weg.

Der Schaffner. Er steht ganz hinten. Im letzten Wagen. Seine Uniform ist perfekt. Kein Staub. Keine Falten.

Er sieht dich an. Nickt. Einmal.

Dann zieht er die Mütze. Hält sie in der Hand.

"Gute Reise," sagt er. Seine Stimme ist leise. Aber du hörst sie.

Dann verschwindet auch er.`,
    choices: [
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        next: 'ending_truth_02'
      }
    ],
    tags: ['ending'],
    state_notes: [
      'Truth Ending Part 1',
      'NPCs verabschieden sich',
      'Zug löst sich auf'
    ],
    atmosphere: 'hopeful'
  },

  'ending_truth_02': {
    id: 'ending_truth_02',
    chapter: 7,
    title: 'Leere',
    narrative: `Der Zug ist weg.

Du stehst allein auf dem Bahnsteig. Aber es fühlt sich nicht leer an.

Die Uhr an der Wand zeigt 06:00. Morgen. Zum ersten Mal seit… wie lange? … tickt sie.

Zeit. Echte Zeit.

Die Luft riecht nach frischem Regen. Nach Asphalt. Nach Kaffee aus einem Automaten. Nach Leben.

Ein echter Zug fährt ein. Menschen steigen aus. Müde. Verschlafen. Mit Koffern.

Eine Frau sieht dich an. "Entschuldigung, ist das Gleis 4?"

"Ja. Gleis 4." Deine Stimme funktioniert. Klar. Ohne Echo.

Die Sonne geht auf. Ein orangefarbener Streifen am Horizont. Dann gelb. Dann weiß.

Du verlässt den Bahnhof.

Draußen: Eine Stadt. Modern. Laut. Lebendig.

Du weißt nicht, wo du bist. Du weißt nicht, welches Jahr es ist. Aber du gehst.

Du lebst.

---

**ENDE: WAHRHEIT**

*Du hast die Wahrheit akzeptiert. Den Tod. Das Leben. Dich selbst.*

*Der Nachtzug 19 ist weg.*

*Du bleibst.*

*Und das ist genug.*`,
    choices: [
      {
        id: 'finish',
        label: 'Ende',
        effects: [
          { type: 'inc', target: 'tickets_truth', value: 1 }
        ],
        ending: 'TRUTH'
      }
    ],
    tags: ['ending', 'terminal'],
    state_notes: [
      'Truth Ending Part 2',
      'Zeit läuft wieder',
      'Abschluss in einer Szene'
    ],
    atmosphere: 'peaceful'
  },

  // ========================================
  // LOVE ENDING (2 Szenen)
  // ========================================
  'ending_love_01': {
    id: 'ending_love_01',
    chapter: 7,
    title: 'Wiedersehen',
    narrative: `Du steigst aus.

Und da... steht jemand.

Auf dem Bahnsteig. Wartend.

Nicht Comp7. Nicht der Junge. Nicht der Schlaflose.

Sondern... **Emma**.

Das Gesicht aus deinen Träumen. Die Stimme vom Kassettenrekorder.

Die Person, die du gesucht hast. Die ganze Fahrt lang.

Sie sieht älter aus. Grauere Haare. Fältchen um die Augen. Aber...

Sie lächelt.

Genau wie damals.

"Du bist zu spät," sagt sie. Ihre Stimme bricht. "Fünfzig Jahre zu spät."

Du kannst nicht sprechen. Die Worte bleiben stecken.

"Ich weiß," flüsterst du schließlich.

Sie geht auf dich zu. Langsam. Als hätte sie Angst, dass du verschwindest, wenn sie zu schnell gehst.

Ihre Hand hebt sich. Berührt dein Gesicht. Warm. Real.

"Du bist... wirklich hier," sagt sie. Tränen in den Augen.

"Ich bin hier."

"Ich habe gewartet. So lange. Sie haben gesagt, ich soll aufhören. Sie haben gesagt, du kommst nicht zurück. Aber ich... ich konnte nicht."

Du nimmst ihre Hand. Hältst sie fest.

"Ich bin zurück."

"Nein," sagt sie leise. "Du bist... angekommen."

Hinter dir: Der Zug. Er verblasst. Langsam.

Aber du drehst dich nicht um.

Du siehst nur Emma an.`,
    choices: [
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        next: 'ending_love_02'
      }
    ],
    tags: ['ending'],
    state_notes: [
      'Love Ending Part 1',
      'Wiedersehen mit verlorener Liebe',
      'Emotionaler Peak'
    ],
    atmosphere: 'bittersweet'
  },

  'ending_love_02': {
    id: 'ending_love_02',
    chapter: 7,
    title: 'Verlorene Zeit',
    narrative: `"Fünfzig Jahre," sagst du. "Ich war... weg."

"Ich weiß."

Sie setzt sich auf eine Bank. Du setzt dich neben sie.

"Sie haben deinen Körper nie gefunden," sagt sie. "19 Tote. Aber nur 18 Leichen."

"Verschwunden."

"Ja."

Sie erzählt von ihrem Leben. Von Jahren, die weitergingen, während du stehen geblieben bist.

"Ich liebe dich," sagst du.

"Ich weiß," sagt sie. "Ich dich auch."

Sie steht auf. Reicht dir die Hand.

"Komm."

Ihr Haus ist klein. Gemütlich. Fotos an der Wand. Ein Leben ohne dich.

"Wie lange habe ich?" fragst du.

"Ich weiß es nicht," sagt sie ehrlich. "Aber wir haben jetzt."

---

**ENDE: LIEBE**

*Du hast jemanden gefunden. Oder... sie hat dich gefunden.*

*Die Zeit, die ihr habt, ist vielleicht kurz. Vielleicht lang.*

*Aber sie ist echt.*

*Und manchmal ist das genug.*`,
    choices: [
      {
        id: 'finish',
        label: 'Ende',
        effects: [
          { type: 'inc', target: 'tickets_love', value: 1 }
        ],
        ending: 'LOVE'
      }
    ],
    tags: ['ending', 'terminal'],
    state_notes: [
      'Love Ending Part 2',
      'Verlorene Zeit & Abschlussszene'
    ],
    atmosphere: 'bittersweet'
  },

  // ========================================
  // GUILT ENDING (2 Szenen)
  // ========================================
  'ending_guilt_01': {
    id: 'ending_guilt_01',
    chapter: 7,
    title: 'Schuld',
    narrative: `Du steigst aus.

Aber du kannst nicht weitergehen.

Deine Füße... sie bleiben stehen. Direkt am Rand des Bahnsteigs.

Du siehst zurück zum Zug.

Er verblasst. Langsam. Aber er verblasst.

Und in den Fenstern... siehst du sie.

Die anderen Passagiere.

Die Menschen, die noch im Zug sind.

Der Schlaflose. Er sieht dich an. Seine Augen sind leer.

Der Junge. Er steht am Fenster. Seine Hand liegt auf dem Glas.

"Warum gehst du?" scheint er zu fragen. "Warum lässt du uns hier?"

Comp7. Sie sitzt in Wagen 7. Umgeben von ihren Notizbüchern. Allein.

Sie sieht dich nicht an.

Sie schreibt. Weiter. Immer weiter.

19. 19. 19.

Du hast sie zurückgelassen.

Alle.

Du bist gegangen. Aber sie... sie sind noch da.

Im Zug. In der Schleife. In der Erinnerung.

"Es war nicht deine Schuld," sagt eine Stimme.

Du drehst dich um.

Der Schaffner. Er steht neben dir. Auf dem Bahnsteig.

"Der Unfall. 1973. Es war nicht deine Schuld."

"Ich weiß," flüsterst du.

"Aber du glaubst es nicht."

Du schweigst.

"Du hättest sie nicht retten können," sagt er. "Die 19 Menschen im Zug. Du hättest nichts tun können."

"Ich hätte... nicht einsteigen sollen. An dem Tag. Wenn ich..."

"Dann wärst du nicht gestorben. Aber sie... wären es trotzdem."

Du siehst ihn an.

"Du kannst nicht die Schuld für etwas tragen, das du nicht kontrollieren konntest," sagt er.

"Aber ich kann nicht loslassen."

"Ich weiß," sagt er leise. "Deshalb bist du hier."`,
    choices: [
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        next: 'ending_guilt_02'
      }
    ],
    tags: ['ending'],
    state_notes: [
      'Guilt Ending Part 1',
      'Protagonist fühlt Schuld',
      'NPCs sind noch im Zug',
      'Schaffner konfrontiert'
    ],
    atmosphere: 'somber'
  },

  'ending_guilt_02': {
    id: 'ending_guilt_02',
    chapter: 7,
    title: 'Verantwortung',
    narrative: `"Was soll ich tun?" fragst du.

"Das musst du entscheiden," sagt der Schaffner.

"Du kannst die Toten nicht retten. Aber du kannst sie lebendig halten. In der Erinnerung."

Der Zug verschwindet. Ganz.

Du stehst allein auf dem Bahnsteig. Aber du weißt, was du tun musst.

Du gehst zu einer Bibliothek. Suchst nach Informationen.

Nachtzug 19. 19. September 1973. 19:19 Uhr.

Du liest die Namen. Jeden einzelnen.

Du schreibst sie auf. Nicht um zu vergessen. Sondern um zu erinnern.

---

**ENDE: SCHULD**

*Du trägst die Verantwortung für die Toten.*

*Nicht ihre Schuld. Sondern ihre Erinnerung.*

*Es ist schwer. Es tut weh.*

*Aber es ist... notwendig.*`,
    choices: [
      {
        id: 'finish',
        label: 'Ende',
        effects: [
          { type: 'inc', target: 'tickets_guilt', value: 1 }
        ],
        ending: 'GUILT'
      }
    ],
    tags: ['ending', 'terminal'],
    state_notes: [
      'Guilt Ending Part 2',
      'Verantwortung + Abschluss'
    ],
    atmosphere: 'somber'
  },

  // ========================================
  // ESCAPE ENDING (2 Szenen)
  // ========================================
  'ending_escape_01': {
    id: 'ending_escape_01',
    chapter: 7,
    title: 'Bleiben',
    narrative: `Du steigst nicht aus.

Die Türen sind offen. Der Bahnsteig wartet.

Aber du...

Du drehst dich um.

Gehst zurück in den Zug.

Die Türen schließen sich hinter dir. Leise. Final.

"Bleibst du?" fragt eine Stimme.

Der Schlaflose. Er sitzt auf seinem alten Platz. Sieht müde aus. Wie immer.

"Ja," sagst du.

"Warum?"

"Weil... ich nicht bereit bin."

Er nickt. Als hätte er das erwartet.

"Ich verstehe."

Du setzt dich ihm gegenüber.

Der Zug setzt sich in Bewegung. Sanft. Lautlos.

Draußen: Schwärze. Wie immer.

"Wo fahren wir hin?" fragst du.

"Nirgendwohin," sagt der Schlaflose. "Wir fahren im Kreis."

"Für immer?"

"Bis wir bereit sind."

Du lehnst den Kopf ans Fenster. Das Glas ist kalt.

"Und wenn ich nie bereit bin?"

Er lächelt. Müde. Traurig.

"Dann bleibst du. Wie ich. Wie die anderen."`,
    choices: [
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        next: 'ending_escape_02'
      }
    ],
    tags: ['ending'],
    state_notes: [
      'Escape Ending Part 1',
      'Protagonist bleibt im Zug',
      'Türen schließen sich',
      'Zurück in die Schleife'
    ],
    atmosphere: 'somber'
  },

  'ending_escape_02': {
    id: 'ending_escape_02',
    chapter: 7,
    title: 'Die Schleife',
    narrative: `Der Zug fährt. Weiter. Immer weiter.

Die Durchsage wiederholt sich. Die Uhr zeigt 23:47. Immer.

Der Junge malt den Zug. Comp7 schreibt 19. 19. 19. Der Schlaflose starrt ins Schwarz.

"Bereust du es?" fragt er.

"Nein," lügst du.

Ihr wisst beide, dass es eine Lüge ist.

Der Schaffner kommt. "Ihr Ticket, bitte."

Du gibst ihm das Tag19. Er nickt. "Gültig." 

"Bis wann?" 

"Bis Sie bereit sind auszusteigen." 

Der Zug fährt weiter. 23:47. Immer 23:47.

Du schließt die Augen.

---

**ENDE: FLUCHT**

*Du bist geblieben.*

*Im Zug. In der Schleife. In der Sicherheit.*

*Die Welt wartet draußen.*

*Aber du wirst nie aussteigen.*

*Und vielleicht... ist das okay.*`,
    choices: [
      {
        id: 'finish',
        label: 'Ende',
        effects: [
          { type: 'inc', target: 'tickets_escape', value: 1 }
        ],
        ending: 'ESCAPE'
      }
    ],
    tags: ['ending', 'terminal'],
    state_notes: [
      'Escape Ending Part 2',
      'Schleife + Abschluss'
    ],
    atmosphere: 'dark'
  },

  // ========================================
  // LIMBO ENDING (2 Szenen) - Fallback
  // ========================================
  'ending_limbo_01': {
    id: 'ending_limbo_01',
    chapter: 7,
    title: 'Unentschieden',
    narrative: `Du stehst auf dem Bahnsteig.

Die Türen sind offen.

Vor dir: Die Welt. Hell. Laut. Unbekannt.

Hinter dir: Der Zug. Dunkel. Vertraut. Sicher.

Du kannst dich nicht entscheiden.

Ein Schritt nach vorne?

Ein Schritt zurück?

Du bleibst stehen. Genau in der Mitte.

Auf der Schwelle.

Weder drinnen noch draußen.

Weder tot noch lebendig.

"Was tust du?" fragt der Schaffner. Er steht neben dir.

"Ich... weiß es nicht."

"Du musst entscheiden."

"Kann ich nicht einfach... hier bleiben?"

Er sieht dich an. Lange. Dann schüttelt er den Kopf.

"Nein. Das ist keine Entscheidung. Das ist... Stillstand."

"Aber ich bin nicht bereit."

"Wirst du es jemals sein?"

Du schweigst.

Die Türen beginnen zu piepen. Eine Warnung.

Sie werden sich bald schließen.

"Letzte Chance," sagt der Schaffner.

Du siehst nach vorne. Nach hinten.

Und du...

...kannst dich immer noch nicht entscheiden.`,
    choices: [
      {
        id: 'continue',
        label: 'Weiter',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        next: 'ending_limbo_02'
      }
    ],
    tags: ['ending'],
    state_notes: [
      'Limbo Ending Part 1',
      'Protagonist kann nicht entscheiden',
      'Auf der Schwelle',
      'Weder-Noch'
    ],
    atmosphere: 'tense'
  },

  'ending_limbo_02': {
    id: 'ending_limbo_02',
    chapter: 7,
    title: 'Zwischen',
    narrative: `Die Türen schließen sich.

Halb.

Sie bleiben stecken. Piepen. Versuchen sich zu schließen. Scheitern.

Du stehst genau dazwischen.

Ein Fuß auf dem Bahnsteig. Ein Fuß im Zug.

Der Schaffner seufzt.

"Das habe ich befürchtet."

"Was passiert jetzt?"

"Nichts," sagt er. "Und alles. Du bist... zwischen."

Der Zug fährt nicht weiter. Bleibt stehen.

Der Bahnsteig verschwindet nicht. Bleibt da.

Du bleibst. Genau hier. Auf der Schwelle.

"Für wie lange?" fragst du.

"Bis du entscheidest."

"Und wenn ich nie entscheide?"

Er lächelt nicht. "Dann bleibst du hier. Zwischen. Für immer."

Die Welt um dich herum verblasst. Nicht ganz. Aber... ein bisschen.

Die Farben werden grauer. Die Geräusche leiser. Die Zeit langsamer.

Du bist nicht tot. Aber auch nicht lebendig.

Nicht im Zug. Aber auch nicht draußen.

Du bist... zwischen.

Und vielleicht...

...bleibst du hier für immer.

In der Schwebe.

Wartend auf eine Entscheidung, die nie kommt.

---

**ENDE: LIMBO**

*Du hast nicht gewählt.*

*Weder Wahrheit noch Flucht. Weder Liebe noch Schuld.*

*Du bist... zwischen.*

*Und hier bleibst du.*

*Für immer.*`,
    choices: [
      {
        id: 'finish',
        label: 'Ende',
        effects: [
          { type: 'inc', target: 'memory_drift', value: 1 }
        ],
        ending: 'LIMBO'
      }
    ],
    tags: ['ending', 'terminal'],
    state_notes: [
      'Limbo Ending Part 2',
      'Protagonist bleibt auf Schwelle',
      'Ewiger Limbo',
      'Finale: Indecision'
    ],
    atmosphere: 'dark'
  }
};
