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

Der Bahnsteig ist warm, genau richtig.

Hinter dir klickt die Tür ins Schloss.

Du drehst dich um. Der NACHTZUG 19 steht noch da, verblasst aber langsam, als würde Sonnenlicht ihn auflösen.

Durch die Fenster siehst du sie alle.

Der Schlaflose lächelt erleichtert, hebt die Hand, dann löst er sich still auf.

Der Junge steht am Fenster von Wagen 3, sieht dich direkt an und formt lautlos ein einziges Wort: "Danke."

Dann ist er fort.

Comp7 steht im Gang von Wagen 7. Ihre Notizbücher liegen verstreut auf dem Boden, plötzlich bedeutungslos.

Sie legt die Hand an die Scheibe. Du legst deine auf dieselbe Stelle. Das Glas ist warm, fast wie Haut.

Für einen Atemzug fühlt es sich an, als würdet ihr euch halten.

Dann lässt sie los. Sie lächelt, zum ersten Mal.

"Leb wohl," sagst du.

Sie nickt. "Leb."

Dann verschwindet auch sie.

Ganz hinten im letzten Wagen steht der Schaffner. Seine Uniform sitzt makellos, als hätte es nie Staub gegeben.

Er nickt dir einmal zu, zieht die Mütze und hält sie vor die Brust.

"Gute Reise," sagt er leise.

Dann ist auch er weg.`,
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

Du stehst allein auf dem Bahnsteig, aber es fühlt sich nicht leer an.

Die Uhr an der Wand zeigt 06:00. Sie tickt.

Zeit. Echte Zeit.

Die Luft riecht nach Regen, Asphalt und Kaffee aus einem Automaten.

Ein gewöhnlicher Zug fährt ein. Menschen steigen aus, müde und verschlafen, mit Taschen und Koffern.

Eine Frau sieht dich an. "Entschuldigung, ist das Gleis 4?"

"Ja. Gleis 4." Deine Stimme ist klar. Ohne Echo.

Die Sonne schiebt sich über den Horizont: erst orange, dann gelb, dann weiß.

Du verlässt den Bahnhof.

Draußen liegt eine Stadt, modern, laut, lebendig.

Du weißt nicht, wo du bist. Du weißt nicht, welches Jahr es ist.

Aber du gehst.
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

Und da steht jemand auf dem Bahnsteig.

Nicht Comp7. Nicht der Junge. Nicht der Schlaflose.

Sondern **Emma**.

Der Name, den du seit dem ersten Bahnsteig in dir getragen hast, bekommt endlich wieder ein Gesicht.

Das Gesicht aus deinen Träumen. Die Stimme vom Kassettenrekorder. Die Person, die du die ganze Fahrt gesucht hast.

Emma sieht älter aus. Grauere Haare. Fältchen um die Augen.

Aber sie lächelt.

Genau wie damals.

"Du bist zu spät," sagt sie mit brechender Stimme. "Fünfzig Jahre zu spät."

Du bringst erst kein Wort heraus.

"Ich weiß," flüsterst du schließlich.

Sie geht langsam auf dich zu, als hätte sie Angst, du könntest verschwinden, wenn sie sich zu schnell bewegt.

Ihre Hand berührt dein Gesicht.

Warm. Real.

"Du bist wirklich hier," sagt sie, Tränen in den Augen.

"Ich bin hier."

"Ich habe gewartet. So lange. Alle haben gesagt, ich soll aufhören. Dass du nicht zurückkommst. Aber ich konnte nicht."

Du nimmst ihre Hand und hältst sie fest.

"Ich bin zurück."

"Nein," sagt sie leise. "Du bist angekommen."

Hinter dir verblasst der Zug.

Du drehst dich nicht um.

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
    narrative: `"Fünfzig Jahre," sagst du. "Ich war weg."

"Ich weiß."

Sie setzt sich auf eine Bank. Du setzt dich neben sie. Die Bank ist kalt. Du spürst es kaum.

"Sie haben deinen Körper nie gefunden," sagt sie. "19 Tote. Aber nur 18 Leichen."

"Verschwunden."

"Ja." Sie hält kurz inne. „Ich hab lange geglaubt, du bist absichtlich weg. Dass du... gegangen bist. Freiwillig. Weil ich etwas falsch gemacht habe."

Du siehst sie an. „Nein."

„Ich weiß das jetzt." Sie wischt sich kurz die Augen. „Aber es hat lange gedauert."

Die Jahre, die sie beschreibt, hörst du zwischen den Sätzen. Nicht in dem, was sie sagt — in dem, was sie nicht sagt. In den Pausen, wo die Namen der anderen stehen sollten. In der Art, wie sie deinen Namen nicht ausspricht, als hätte sie ihn aufgespart.

„Ich liebe dich," sagst du. Und du weißt, dass es unvollständig ist. Dass diese drei Wörter fünfzig Jahre nicht überbrücken, dass sie keine Schuld nehmen und keine Zeit zurückbringen. Aber sie sind wahr.

„Ich weiß," sagt sie. „Ich dich auch."

Sie steht auf. Reicht dir die Hand.

Ihr Haus ist klein. Gemütlich. Fotos an der Wand — Kinder, Enkel, Momente, die ohne dich waren. Du schaust sie alle an. Du kommst in keinem vor. Das schmerzt sauber und präzise.

„Wie lange habe ich?" fragst du.

„Ich weiß es nicht," sagt sie ehrlich. „Aber wir haben jetzt. Das ist mehr, als ich gedacht hatte."

Es ist nicht das Wiedersehen aus deinen Träumen. Es ist etwas Raueres, Echtes.

Durch das Fenster siehst du, wie der letzte Lichtschein des Nachtzuges hinter dem Horizont erlischt.

Du wendest dich Emma zu.

---

**ENDE: LIEBE**

*Du hast fünfzig Jahre verpasst.*

*Aber du bist angekommen.*

*Das Leben, das ihr jetzt habt, ist kein ganzes Leben mehr.*

*Aber es ist eures.*

*Und das zählt mehr als jeder Takt, den der Zug dir gestohlen hat.*`,
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

Aber du bleibst stehen.

Der Zug verblasst hinter dir, und in seinen Fenstern siehst du sie noch: den Schlaflosen mit leeren Augen. Den Jungen, die Hand gegen das Glas gedrückt, auf der Suche nach jemandem, der ihn sieht. Comp7 in Wagen 7, allein zwischen ihren Notizbüchern, schreibend ohne aufzuhören — 19. 19. 19. — als könnte die Zahl irgendwann eine andere Bedeutung annehmen.

Du bist raus. Sie nicht.

Das ist kein neutraler Fakt.

Der Tag-19-Anhänger liegt schwer in deiner Faust. Auf der Rückseite, die du nicht siehst, sind 18 Kratzer. Du hast sie nie gezählt, aber du weißt, dass es 18 sind.

Du bist #19. Der letzte. Der, der gegangen ist.

Der Schaffner steht am Ende des Bahnsteigs. Er kommt nicht zu dir. Er wartet nur.

Als du auf ihn zugehst, sieht er dich ohne Überraschung an. Als hätte er gewusst, dass genau du kommen würdest.

„Sie haben einen Namen," sagst du. „Jeder von ihnen."

„Ja."

„Ich kenne keinen einzigen."

Er sieht dich lange an. „Nein. Aber du könntest."

Hinter dir erlischt das letzte Licht im letzten Wagen des Zuges.

Du drehst dich nicht um. Du weißt bereits, was du dort gesehen hättest: einen leeren Gang. Kein Flackern. Keine Stimmen.

Nur die Abwesenheit von 18 Menschen, die niemand vermisst, weil niemand mehr weiß, dass er sie vermissen sollte.

Du öffnest die Hand. Schaust auf den Anhänger.

„Ich werde nicht gut schlafen," sagst du.

„Nein," sagt er. „Das wirst du nicht."`,
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
      'Protagonist trägt Schuld, nicht Heilung',
      'NPCs sind noch im Zug',
      'Schaffner kein Trost - nur Zeuge'
    ],
    atmosphere: 'somber'
  },

  'ending_guilt_02': {
    id: 'ending_guilt_02',
    chapter: 7,
    title: 'Die Namen',
    narrative: `Du verlässt den Bahnhof allein.

Keine Emma wartet auf dich. Keine Hand im Rücken. Keine Stimme, die sagt, es sei in Ordnung.

Es ist nicht in Ordnung.

Das weißt du. Das ist der Unterschied.

In einer Stadtbibliothek, die nach altem Papier und Neonlicht riecht, sitzt du vor einem Mikrofilmleser.

*Nachtzug 19. Unglück. 19. September 1973.*

Die Zeitungsmeldungen sind kurz. „Betriebsunfall." „Bremsenversagen." „19 Tote." Die Namen stehen in einer Liste, alphabetisch geordnet, als wäre Alphabetisierung ein Akt der Würde.

Du liest sie einzeln.

Jeden. Einzelnen.

Du sprichst sie lautlos vor dich hin, damit sie nicht nur Zeichen auf Mikrofilm sind, sondern Laute, die jemand geformt hat.

Es dauert länger, als du dachtest.

Manche Namen stocken dir im Mund. Du weißt nicht warum. Vielleicht waren sie jung. Vielleicht hatten sie Kinder. Vielleicht haben sie genau wie du in jenem Moment an nichts Schlimmes gedacht.

Draußen wird es Abend. Dann Nacht.

Du bist der letzte Leser in der Bibliothek, als der Bibliothekar die Lampen dimmt.

„Wir schließen in zehn Minuten."

„Ich weiß," sagst du. „Noch einen Moment."

Du nimmst ein Blatt Papier aus deiner Tasche und schreibst die 18 Namen auf. Nicht um sie zu archivieren. Nicht um sie irgendwo einzureichen.

Nur damit jemand sie in der Hand hält.

Du rollst das Papier zusammen und steckst es in deine Jackentasche, neben den Anhänger.

Dann stehst du auf und gehst.

Draußen ist die Luft kalt und klar. Du weißt noch immer nicht, wo du bist, oder was das Leben für dich bedeutet, jetzt, nach allem.

Aber du weißt die 18 Namen.

Und das zählt. Nicht als Genugtuung. Nicht als Vergebung.

Nur als das, was übrig bleibt, wenn man alles andere loslässt.

---

**ENDE: SCHULD**

*Du hast keine Ruhe gefunden.*

*Du wirst keine finden.*

*Aber du hast ihre Namen.*

*Und du wirst sie nicht vergessen.*

*Das ist nicht Heilung.*

*Das ist Verantwortung.*`,
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
      'Einsam + Namen als Last, nicht Heilung',
      'Kein Frieden - nur Zweck'
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

Die Türen sind offen, der Bahnsteig wartet - aber du drehst dich um und gehst zurück in den Zug.

Hinter dir schließen sich die Türen, leise und endgültig.

"Bleibst du?" fragt eine Stimme.

Der Schlaflose sitzt auf seinem alten Platz. Müde wie immer.

"Ja," sagst du.

"Warum?"

"Weil ich nicht bereit bin."

Er nickt, als hätte er nichts anderes erwartet.

"Ich verstehe."

Du setzt dich ihm gegenüber.

Der Zug setzt sich lautlos in Bewegung. Draußen nur Schwärze.

"Wo fahren wir hin?" fragst du.

"Nirgendwohin," sagt er. "Wir fahren im Kreis."

"Für immer?"

"Bis wir bereit sind."

Du lehnst den Kopf ans kalte Fenster.

"Und wenn ich nie bereit bin?"

Er lächelt müde, traurig.

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
    narrative: `Der Zug fährt weiter. Immer weiter.

Die Durchsage wiederholt sich. Die Uhr zeigt 23:47.

Immer.

Der Junge malt den Zug. Comp7 schreibt 19. 19. 19. Der Schlaflose starrt ins Schwarz.

"Bereust du es?" fragt er.

"Nein," lügst du.

Ihr wisst beide, dass es eine Lüge ist.

Der Schaffner kommt. "Ihr Ticket, bitte."

Du gibst ihm das Tag19. Er nickt. "Gültig."

"Bis wann?"

"Bis Sie bereit sind auszusteigen."

Der Zug fährt weiter. 23:47.

Immer 23:47.

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

Vor dir liegt die Welt: hell, laut, unbekannt.

Hinter dir der Zug: dunkel, vertraut, sicher.

Du kannst dich nicht entscheiden.

Ein Schritt nach vorn?
Ein Schritt zurück?

Du bleibst genau in der Mitte stehen.

Auf der Schwelle.

Weder drinnen noch draußen.
Weder tot noch lebendig.

"Was tust du?" fragt der Schaffner neben dir.

"Ich weiß es nicht."

"Du musst entscheiden."

"Kann ich nicht einfach hier bleiben?"

Er sieht dich lange an und schüttelt dann den Kopf.

"Nein. Das ist keine Entscheidung. Das ist Stillstand."

"Aber ich bin nicht bereit."

"Wirst du es jemals sein?"

Du schweigst.

Die Türen beginnen zu piepen. Eine Warnung.

Sie werden sich gleich schließen.

"Letzte Chance," sagt der Schaffner.

Du siehst nach vorn. Nach hinten.

Und kannst dich immer noch nicht entscheiden.`,
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

Dann bleiben sie stecken. Sie piepen, rucken, versuchen es erneut - und scheitern.

Du stehst genau dazwischen.

Ein Fuß auf dem Bahnsteig. Ein Fuß im Zug.

Der Schaffner seufzt.

"Das habe ich befürchtet."

"Was passiert jetzt?"

"Nichts," sagt er. "Und alles. Du bist zwischen."

Der Zug fährt nicht weiter.
Der Bahnsteig verschwindet nicht.

Beides bleibt.

Und du bleibst mit.

Genau hier. Auf der Schwelle.

"Für wie lange?" fragst du.

"Bis du entscheidest."

"Und wenn ich nie entscheide?"

Er lächelt nicht. "Dann bleibst du hier. Zwischen. Für immer."

Die Welt um dich herum verblasst ein wenig. Die Farben werden grauer, die Geräusche leiser, die Zeit langsamer.

Du bist nicht tot. Aber auch nicht lebendig.
Nicht im Zug. Aber auch nicht draußen.

Du bist zwischen.

Vielleicht bleibst du es für immer.

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
