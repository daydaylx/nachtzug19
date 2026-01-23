# NARRATIVE IMPROVEMENT PLAN
## NACHTZUG 19 - Story Editor Revision

**Datum**: 2026-01-23
**Basis**: Story Editor Analyse
**Ziel**: Story von 6/10 auf 8/10 heben durch Fixes an Motivation, Pacing und Figuren

---

## LEITPLANKEN (NICHT VERHANDELBAR)

### ✅ WAS BLEIBT (CORE STRENGTHS)
1. **Atmosphärischer Stil**: Sensorische Details (Gerüche, Texturen, Temperaturen) MÜSSEN bleiben
2. **Mystery-Struktur**: Tag19, Rekorder, 1973, Schleife - alle etablierten Reveals bleiben
3. **Regel-System**: Schaffner-Kontrollen, Memory Drift, Ticket-Mechanik bleibt unangetastet
4. **Ending-Vielfalt**: 5 Endings bleiben (Truth, Love, Guilt, Escape, Limbo)
5. **Surreal-Noir-Ton**: Keine Comedy, kein Action, kein Romance-Kitsch
6. **Kapitel-Struktur**: 7 Kapitel + Endings bleiben (KEINE neuen Kapitel)
7. **NPC-Roster**: Comp7, Junge, Schlafloser, Schaffner bleiben (KEINE neuen NPCs)

### ❌ WAS GEÄNDERT WERDEN DARF
1. **Szenen-Länge**: Kürzen/Mergen ist erlaubt (Pacing-Fix)
2. **Dialog-Stil**: Ellipsen reduzieren, natürlicher schreiben
3. **Wiederholungen**: "Du weißt nicht", "Eine Pause" drastisch reduzieren
4. **Choice-Konsequenzen**: Verstärken/Sichtbarer machen
5. **Figuren-Tiefe**: Persönlichkeit, Widersprüche, Humor hinzufügen
6. **Narrative Variants**: Mehr/bessere Drift-Varianten

### 🚫 WAS NICHT PASSIEREN DARF
1. **KEINE neuen Kapitel oder Haupt-NPCs**
2. **KEINE Genre-Shifts** (Horror, Romance, Action)
3. **KEINE Erklärung des Mystery** (Ambiguität ist Feature, kein Bug)
4. **KEINE Gameplay-Mechaniken** (bleibt Text-Adventure)
5. **KEINE Retcons** von etablierten Canon-Regeln (NACHTZUG_19_RULES.md)
6. **KEINE kompletten Scene-Rewrites** ohne vorherige Analyse

---

## REGELWERK FÜR ÄNDERUNGEN

### R1: MINIMAL-INVASIV PRINZIP
- **Regel**: Kleinste mögliche Änderung für größten Impact
- **Beispiel**: Statt ganze Szene umschreiben → 2-3 Sätze ändern
- **Test**: "Kann ich das Ziel mit weniger erreichen?"

### R2: SETUP-PAYOFF BALANCE
- **Regel**: Jedes Setup MUSS Payoff haben (spätestens +2 Kapitel)
- **Beispiel**: Emma-Name in c1 → Voice auf Rekorder c2 → Erinnerung c5 → Love-Ending c7
- **Test**: "Wird dieses Element später eingelöst?"

### R3: SHOW DON'T TELL (DRIFT)
- **Regel**: Realitäts-Zerfall zeigen, nicht erklären
- **Beispiel**: Statt "Die Realität zerfällt" → "Schlafloser trägt jetzt rote Jacke. Du erinnerst dich an schwarz."
- **Test**: "Könnte ich das als Bild zeichnen?"

### R4: CHOICE CONSEQUENCE VISIBILITY
- **Regel**: Jede wichtige Choice braucht SICHTBARE Konsequenz (max. 3 Szenen später)
- **Beispiel**: Rekorder weggeben c3 → Junge verschwindet c4 (nicht nur +1 Ticket)
- **Test**: "Würde Spieler*in den Unterschied bemerken?"

### R5: DIALOG REALITY CHECK
- **Regel**: Dialoge laut vorlesen. Klingt es wie ein echter Mensch?
- **Beispiel**: ❌ "Drei Wege... Viel Glück..." → ✅ "Es gibt drei Wege. Aber ich kann dir nicht sagen, welcher richtig ist."
- **Test**: "Würde jemand das in einem echten Gespräch sagen?"

### R6: WIEDERHOLUNGS-QUOTA
- **Regel**: Stilistische Phrases max. 1x pro Kapitel (nicht pro Szene)
- **Beispiel**: "Du weißt nicht" max. 5x in c1, nicht 15x
- **Test**: Grep-Suche vor Commit

---

## PHASEN-PLAN (3 PHASEN)

---

## ✴️ PHASE 0: FOUNDATION FIX (P0 - KRITISCH)
**Dauer**: 2-3 Tage
**Ziel**: Story wird verständlich & Love-Ending funktioniert

### MASSNAHMEN

#### M0.1: PROTAGONIST MOTIVATION ETABLIEREN
**Problem**: Niemand weiß, warum der Protagonist im Zug ist oder was er will.

**Umsetzung**:
1. **c1_s01_platform_b**: Neuer Choice "An Emma denken"
   - Text: `"Emma," flüsterst du. Der Name brennt sich in deine Gedanken. "Wo bist du?"`
   - Effects: `{ type: 'set', target: 'memory_search_active', value: true }`
   - Grund: Macht Suche konkret. Gibt Ziel.

2. **c1_s02_inside_train**: Narrative erweitern
   - Hinzufügen nach "Du setzt dich.": `"Emma hätte diesen Zug gehasst. Zu alt. Zu kalt. Aber sie ist nicht hier. Du musst sie finden."`
   - Grund: Reinforcement. Macht klar, dass dies eine Suche ist.

3. **c1_s04_sleepless**: Dialog ändern
   - Alt: `"„Suchst du auch jemanden?" fragst du."`
   - Neu: `"„Suchst du auch jemanden?" fragst du. "Ich suche... jemanden, der mir wichtig war."`
   - Grund: Protagonist teilt Info. Zeigt Verletzlichkeit.

**Erfolgskriterium**: Testleser kann nach c1 sagen "Der Protagonist sucht Emma."

---

#### M0.2: EMMA IN STORY ETABLIEREN (LOVE-ENDING SETUP)
**Problem**: Love-Ending Person existiert nicht in der Story.

**Umsetzung**:
1. **c2_s02a_recorder_listening**: Rekorder-Voice ist Emma
   - Alt: `"Eine Stimme schält sich aus dem Rauschen – es ist deine eigene."`
   - Neu: `"Zwei Stimmen. Deine – jünger. Und eine zweite. Emma. „Warte am Bahnsteig," sagt sie. „Bitte komm zurück." Dann ein Knacken. Stille."`
   - Grund: Audio-Setup für Love-Ending.

2. **c4_s09_memory_fragment**: Neues Memory-Fragment
   - Nach Tag19-Fund: Neuer Choice "Erinnerung zulassen" (nur wenn memory_search_active = true)
   - Text: `"Ein Bild blitzt auf. Emma am Bahnsteig. Sie lächelt. „Fahr vorsichtig," sagt sie. Dann verschwindet das Bild. War das... vor dem Unfall?"`
   - Effects: `{ type: 'inc', target: 'tickets_love', value: 2 }, { type: 'set', target: 'emma_memory_unlocked', value: true }`
   - Grund: Visuelles Setup. Macht Emma real.

3. **c5_s13_vision_deepens**: Emma-Vision (wenn emma_memory_unlocked = true)
   - Neuer Narrative Variant: `"Du siehst sie. Emma. Älter jetzt. Graue Haare. Sie steht auf einem Bahnsteig. Wartet. Seit wann wartet sie?"`
   - Grund: Foreshadowing für Love-Ending.

4. **ending_love_01**: Minimal-Änderung
   - Alt: `"Sondern... **sie**."`
   - Neu: `"Sondern... **Emma**."`
   - Grund: Name statt Platzhalter. Payoff.

**Erfolgskriterium**: Love-Ending fühlt sich verdient an, nicht wie Deus-Ex-Machina.

---

#### M0.3: COMP7 ROLLE KLÄREN
**Problem**: Comp7s Motivation und Rolle sind komplett unklar.

**Umsetzung**:
1. **c3_s03b_inside_comp7**: Dialog erweitern
   - Neuer Choice: `"„Warum schreibst du?"`
   - Antwort: `"Weil ich vergesse," sagt sie scharf. „Jeden Tag. Jede Fahrt. Die Schleife löscht mich. Wenn ich nicht schreibe... bin ich nichts." Pause. "Ich war mal real. Glaube ich."`
   - Effects: `{ type: 'inc', target: 'rel_comp7', value: 2 }`
   - Grund: Zeigt Angst, Verletzlichkeit, Ziel (gegen Vergessen kämpfen).

2. **c5_s03_comp7_reflection**: Motivation vertiefen
   - Hinzufügen: `"Ich war Passagier #7," sagt sie. „Aber irgendwann... bin ich zum Zug geworden. Ich kann nicht mehr aussteigen. Ich bin Teil davon." Ihre Stimme zittert.`
   - Grund: Erklärt, warum sie nicht geht. Tragik.

3. **c7_s03_comp7_goodbye**: Finale Klarheit
   - Hinzufügen: `"Wenn du gehst... lösche ich mich mit dem Zug auf. Aber das ist okay. Ich bin müde. Ich will... ruhen."`
   - Grund: Comp7 hat Bogen (kämpfen → akzeptieren → loslassen).

**Erfolgskriterium**: Comp7 hat klares Ziel (nicht vergessen) und Arc (akzeptiert Auflösung).

---

### PHASE 0 CHECKLISTE
- [ ] Emma-Name in c1 etabliert
- [ ] Emma-Voice auf Rekorder c2
- [ ] Emma-Memory-Fragment c4
- [ ] Emma-Vision c5
- [ ] Love-Ending Emma statt "sie"
- [ ] Comp7 Motivation erklärt (c3)
- [ ] Comp7 Rolle geklärt (c5)
- [ ] Comp7 Bogen geschlossen (c7)
- [ ] Testlesen: "Motivation klar?" → JA

---

## ✴️ PHASE 1: PACING & FIGUREN FIX (P1 - DRINGEND)
**Dauer**: 3-4 Tage
**Ziel**: Kapitel 4-6 lesbar machen, Figuren humanisieren

### MASSNAHMEN

#### M1.1: PACING-FIX KAPITEL 4-6
**Problem**: Endlose Gang-Szenen, Wiederholungen, kein Momentum.

**Umsetzung**:

**C4 KÜRZEN** (Ziel: 18 → 14 Szenen):
1. **Streichen**: c4_interlude_01 (komplett redundant)
2. **Mergen**: c4_s02_mirror_a + c4_s02_mirror_b → 1 Szene (Spiegel-Moment kompakter)
3. **Mergen**: c4_s05_tag19_search + c4_s05a_tag19_found → 1 Szene (Fund direkt)
4. **Kürzen**: c4_s03_recorder_playing Narrative von 12 Zeilen auf 6

**C5 KÜRZEN** (Ziel: 25 → 18 Szenen):
1. **Streichen**: c5_s02_corridor_silence + c5_s02_corridor_silence_b (2 Szenen → 0)
2. **Streichen**: c5_s04_lights_flicker_b (merge in c5_s04_lights_flicker)
3. **Mergen**: c5_s06_abteil7_approach + c5_s07_abteil7_inside → 1 Set-Piece (direkter)
4. **Streichen**: c5_s09_train_shifts (redundant mit c6_awakening)
5. **Kürzen**: Alle Interlude-Narrative von 3-part (Hook/Detail/Consequence) auf 2-part

**C6 KÜRZEN** (Ziel: 26 → 20 Szenen):
1. **Streichen**: c6_s02_silence + c6_s02_silence_b (merge in c6_s01_awakening)
2. **Streichen**: c6_s08_drift_intensifies + c6_s08_drift_intensifies_b (merge in c6_s07_aftermath)
3. **Mergen**: c6_s11_announcement + c6_s11_announcement_b → 1 Szene
4. **Kürzen**: c6_s05_door_seven Narrative von 16 Zeilen auf 10

**Erfolgskriterium**: C4-C6 fühlen sich wie 3 Kapitel an, nicht wie eins. Testlesen unter 45min.

---

#### M1.2: FIGUREN PERSÖNLICHKEIT GEBEN
**Problem**: NPCs sind flach, nur Mystery-Dispenser.

**Umsetzung**:

**COMP7 - UNGEDULD & ANGST**:
1. **c2_s03_comp7_intro**: Reaction hinzufügen
   - Wenn Protagonist stört: `"Nicht jetzt," schnauzt sie. Dann, leiser: "Entschuldigung. Ich... ich muss das aufschreiben, bevor ich es vergesse."`
   - Grund: Zeigt Stress, dann Reue. Menschlicher.

2. **c5_s03_comp7_reflection**: Widerspruch
   - `"Ich will, dass du gehst," sagt sie. Pause. "Aber ich will nicht allein bleiben." Sie lacht bitter. "Widersprüchlich, oder?"`
   - Grund: Zeigt inneren Konflikt. Nicht nur orakelhaft.

**JUNGE - KINDHEIT & MUSIK**:
1. **c3_s01b_boy_return**: Summen hinzufügen
   - `Der Junge summt leise. Eine Melodie, die du kennst. Oder... kanntest. "Das hast du mir beigebracht," sagt er. "Als ich klein war. Erinnerst du dich?"`
   - Grund: Foreshadowing für c7_boy_recognized. Emotional.

2. **c6_s09_boy_final**: Kindliche Angst
   - `"Ich will nicht vergessen werden," flüstert er. Seine Stimme bricht. "Wenn ich aussteige... erinnert sich dann noch jemand an mich?"`
   - Grund: Macht Angst greifbar. Nicht nur mysteriös.

**SCHLAFLOSER - GALLOWS HUMOR**:
1. **c5_s05_sleepless_final**: Sarkasmus
   - `"Die gute Nachricht," sagt er trocken, "ist, dass wir nicht sterben können. Wir sind schon tot." Er lacht nicht. "Die schlechte Nachricht: Wir sind schon tot."`
   - Grund: Coping-Mechanismus. Macht Figur menschlich.

2. **c6_s10_sleepless_gone**: Abschied (NEUE SZENE VORHER)
   - Neue Szene: c6_s10_sleepless_goodbye
   - Text: `"Ich steige aus," sagt er. "Beim nächsten Halt. Oder übernächsten. Oder... irgendwann." Er sieht dich an. "Sag Bescheid, wie es endet, okay?" Du nickst. Ihr wisst beide, dass das unmöglich ist.`
   - Grund: Gibt Figur würdigen Abschied statt Poof-disappear.

**Erfolgskriterium**: Testleser kann 3 Adjektive pro Figur nennen (nicht nur "mysteriös").

---

#### M1.3: CHOICES MIT KONSEQUENZ VERSEHEN
**Problem**: Viele Choices sind nur Ticket-Farming, keine echten Dilemmata.

**Umsetzung**:

**HIGH-IMPACT CONSEQUENCES** (5 kritische Choices):

1. **c2_s02_boy_recorder** → Choice "refuse_recorder"
   - Alt: Nur `tickets_escape +1`
   - Neu: `{ type: 'set', target: 'refused_recorder', value: true }` → Junge verschwindet in c3_s01b (statt wiederzukommen)
   - Payoff: c3_s01b bekommt Variant: `"Das Abteil des Jungen ist leer. Er ist nicht zurückgekommen. Du hast seine Hilfe abgelehnt."`
   - Grund: Zeigt Konsequenz von Ablehnung.

2. **c3_s03b_inside_comp7** → Choice "lie_to_comp7" (NEUE OPTION)
   - Text: `"„Ich bin nur auf der Durchreise." (Lügen)"`
   - Effects: `{ type: 'dec', target: 'rel_comp7', value: 2 }, { type: 'set', target: 'lied_to_comp7', value: true }`
   - Payoff: c6_s03_comp7_final → Comp7 gibt keine Hinweise, ist kalt
   - Grund: Vertrauen muss verdient werden.

3. **c4_s05a_tag19_found** → Choice "hide_tag" (NEUE OPTION)
   - Text: `"Das Tag schnell einstecken, niemandem zeigen"`
   - Effects: `{ type: 'set', target: 'tag_hidden', value: true }, { type: 'inc', target: 'tickets_escape', value: 1 }`
   - Payoff: c7_control_03_final → Schaffner: "Sie haben etwas versteckt. Das ist... interessant." (härter)
   - Grund: Verheimlichen hat Preis.

4. **c5_s05_sleepless_final** → Choice "leave_quietly"
   - Alt: Nur `tickets_escape +1, rel_sleepless -2`
   - Neu: Zusätzlich `{ type: 'set', target: 'abandoned_sleepless', value: true }`
   - Payoff: c6_s10_sleepless_gone → Foto hat zusätzlichen Text: "Er hat auf dich gewartet. Du bist nicht gekommen."
   - Grund: Schuld fühlbar machen.

5. **c7_s07_final_choice** → Choice "bring_someone" (VERSTÄRKEN)
   - Alt: Nur Text
   - Neu: Wenn rel_comp7 >= 3 UND tickets_love >= 5 → Secret Option freigeschaltet: "Comp7 mitnehmen"
   - Payoff: Neues Mini-Ending "TOGETHER" (10 Zeilen): Comp7 löst sich beim Aussteigen auf, aber lächelt. "Danke."
   - Grund: Belohnt hohe Beziehung mit exklusivem Moment.

**Erfolgskriterium**: 5 Choices haben sichtbare Story-Konsequenz (nicht nur Stats).

---

### PHASE 1 CHECKLISTE
- [ ] C4 auf 14 Szenen reduziert
- [ ] C5 auf 18 Szenen reduziert
- [ ] C6 auf 20 Szenen reduziert
- [ ] Comp7 zeigt Ungeduld/Angst (c2, c5)
- [ ] Junge summt/zeigt Angst (c3, c6)
- [ ] Schlafloser hat Humor + Abschied (c5, c6)
- [ ] 5 High-Impact Consequences implementiert
- [ ] Testlesen: "Figuren wirken menschlich?" → JA
- [ ] Testlesen: "Pacing hält Momentum?" → JA

---

## ✴️ PHASE 2: POLISH & PAYOFFS (P2 - NICE TO HAVE)
**Dauer**: 2 Tage
**Ziel**: Feinschliff, stilistische Verbesserungen

### MASSNAHMEN

#### M2.1: WIEDERHOLUNGEN ELIMINIEREN
**Problem**: "Du weißt nicht" (34x), "Eine Pause." (31x) nerven.

**Umsetzung**:
1. **Grep-Audit**: `grep -r "Du weißt nicht" src/content/`
2. **Quota setzen**: Max. 1x pro Kapitel (7x total statt 34x)
3. **Ersetzen**: Mit Varianten
   - ❌ "Du weißt nicht, wohin."
   - ✅ "Das Ziel bleibt unklar." / "Keine Ahnung, wo das hinführt." / "Fragend."
4. **Gleiches für**: "Eine Pause", "Aber...", Ellipsen ("...")

**Erfolgskriterium**: Keine Phrase mehr als 10x in gesamter Story.

---

#### M2.2: DIALOG REALITY CHECK
**Problem**: Zu viele Ellipsen, zu mysteriös, klingt nicht echt.

**Umsetzung**:
1. **Ellipsen-Regel**: Max. 1 Ellipse pro Dialog-Zeile
   - ❌ "Drei Wege... Viel Glück... mit der Wahrheit..."
   - ✅ "Es gibt drei Wege. Viel Glück mit der Wahrheit."
2. **Vorlese-Test**: Alle Dialoge von c2-c7 laut vorlesen
3. **Natürlichkeit**: Füllwörter erlaubt (aber sparsam)
   - ✅ "Ich... ich weiß es nicht genau." (Unsicherheit)
   - ✅ "Also, äh, was meinst du?" (Verlegenheit)

**Erfolgskriterium**: Dialoge klingen wie echte (verunsicherte) Menschen.

---

#### M2.3: REKORDER PAYOFF VERSTÄRKEN
**Problem**: Rekorder-Setup verpufft.

**Umsetzung**:
1. **c6_s09_boy_final**: Rekorder-Inhalt klären
   - Wenn has_recorder = true: `"Spiel es ab," sagt der Junge. "Bis zum Ende." Du tust es. Deine Stimme: "Emma, wenn du das hörst... ich komme zurück. Ich verspreche es." Dann Stille. Das war... vor dem Unfall.`
2. **c7_s08_departure**: Rekorder-Finale (NEUE MINI-SZENE)
   - Wenn has_recorder = true: `Du legst den Rekorder auf den Sitz im Zug. Er gehört nicht in die Welt da draußen. Er gehört... hierher. Zur Schleife.`
   - Grund: Symbolisches Loslassen.

**Erfolgskriterium**: Rekorder hat emotionalen Abschluss.

---

#### M2.4: TAG19 FIND SPÄTER VERSCHIEBEN
**Problem**: Find in c4 ist zu früh.

**Umsetzung**:
1. **c4_s05a_tag19_found**: VERSCHIEBEN nach c5_s15 (neuer Slot)
2. **Grund**: Höhepunkt später = besseres Pacing
3. **c5_s15_tag19_revelation**: Fund mit Comp7-Reaction
   - `Comp7 sieht das Tag. "Du hast es gefunden. Das bedeutet... du bist bereit." Sie lächelt traurig. "Ich wünschte, ich hätte meins gefunden."`
   - Grund: Emotionaler Context, nicht nur Item-Pickup.

**Erfolgskriterium**: Tag19-Find fühlt sich wie Wendepunkt an.

---

#### M2.5: STATIONSNAMEN HINZUFÜGEN
**Problem**: Bahnsteige sind nur "Station 1, 2, 3..." – verschenkt Atmosphäre.

**Umsetzung**:
1. **Station 1** (c1_end): "ERSTE FAHRT" (Tafel am Bahnsteig)
2. **Station 2** (c2_end): "WIEDERHOLUNG" (Tafel flackert)
3. **Station 3** (c3_end): "OPFER" (Tafel ist handgemalt)
4. **Station 4** (c4_end): "ERKENNTNIS" (Tafel rückwärts geschrieben)
5. **Station 5** (c5_end): "ENTSCHEIDUNG" (Tafel halb ausgelöscht)
6. **Station 6** (c6_end): "ABSCHIED" (Tafel weint – Farbe läuft)
7. **Endstation** (c7): "ANKUNFT" (Tafel ist blank)

**Erfolgskriterium**: Stationen haben thematische Namen, die Progression zeigen.

---

#### M2.6: JUNGE = DU TWIST FRÜHER SEEDEN
**Problem**: Reveal kommt zu spät (c7) und ist optional.

**Umsetzung**:
1. **c3_s01b_boy_return**: Subtiler Hint
   - `Du siehst deine eigene Müdigkeit in seinen Augen.`
2. **c4_s07_boy_drawing**: Zweiter Hint
   - `Er malt einen Passagier. Die Kleidung... sieht aus wie deine.`
3. **c5_s10_boy_reunion**: Dritter Hint
   - `"Wir sind ähnlich," sagt er. "Sehr ähnlich." Er sieht dich an, als würde er in einen Spiegel schauen.`
4. **c7_s04_boy_recognized**: Payoff bleibt, aber fühlt sich jetzt verdient an

**Erfolgskriterium**: Testleser ahnt Twist vor c7 (aber ist nicht 100% sicher).

---

### PHASE 2 CHECKLISTE
- [ ] Wiederholungen unter 10x pro Phrase
- [ ] Dialoge Vorlese-Test bestanden
- [ ] Rekorder-Payoff in c6 + c7
- [ ] Tag19-Find nach c5 verschoben
- [ ] Stationsnamen hinzugefügt (7 Stationen)
- [ ] Junge=Du Hints in c3, c4, c5
- [ ] Testlesen: "Story fühlt sich polished an?" → JA

---

## ERFOLGSKRITERIEN (GESAMT)

### QUANTITATIV
- [ ] C4-C6 Szenen: 69 → 52 (25% Reduktion)
- [ ] Wiederholungen: "Du weißt nicht" 34 → 7 (80% Reduktion)
- [ ] High-Impact Choices: 0 → 5 (messbare Story-Konsequenzen)
- [ ] Emma-Mentions: 0 → 8+ (Setup für Love-Ending)
- [ ] Comp7 Persönlichkeits-Momente: 0 → 4+
- [ ] Testlese-Zeit c4-c6: 60min → 40min (33% schneller)

### QUALITATIV
- [ ] **Motivation klar**: Testleser kann nach c1 sagen "Protagonist sucht Emma"
- [ ] **Love-Ending funktioniert**: Fühlt sich verdient an, nicht wie Deus-Ex
- [ ] **Comp7 hat Bogen**: Kampf gegen Vergessen → Akzeptanz → Loslassen
- [ ] **Pacing hält**: c4-c6 fühlen sich wie 3 Kapitel an, nicht wie eins
- [ ] **Figuren menschlich**: Testleser nennt 3 Adjektive pro NPC
- [ ] **Choices wichtig**: Spieler*innen spüren Konsequenzen
- [ ] **Dialoge natürlich**: Klingen wie echte (verunsicherte) Menschen
- [ ] **Stil polished**: Keine nervigen Wiederholungen

### RATING-ZIEL
- **Vorher**: Plot 6, Figuren 4, Stil 7, Atmosphäre 8, Choices 5, Gesamt 5 → **GESAMT 6/10**
- **Nachher**: Plot 8, Figuren 7, Stil 8, Atmosphäre 8, Choices 7, Gesamt 7 → **GESAMT 8/10**

---

## RISIKEN & MITIGATION

### RISIKO 1: Zu viele Änderungen, Story wird inkonsistent
**Mitigation**:
- Nach jeder Phase: `npm test` (Validierung)
- Git-Branch pro Phase (Rollback möglich)
- Änderungslog führen

### RISIKO 2: Emma-Integration fühlt sich retconned an
**Mitigation**:
- Subtile Hints, keine Exposition-Dumps
- Name bleibt optional (memory_search_active Flag)
- Nur Love-Path sieht volle Emma-Story

### RISIKO 3: Pacing-Cuts machen Story zu kurz
**Mitigation**:
- Ziel: 52 Szenen (immer noch 10h+ Spielzeit)
- Mergen, nicht deleten (Content bleibt, kompakter)
- Testlesen nach c5-Cut: zu kurz? → 1-2 Szenen zurück

### RISIKO 4: Figuren werden zu "normal", verlieren Mystery
**Mitigation**:
- Persönlichkeit ≠ Erklärung (Comp7 bleibt rätselhaft, aber menschlicher)
- Balance: 70% Mystery, 30% Persönlichkeit
- Humor/Angst zeigen, nicht Origins erklären

---

## TOOLING & VALIDATION

### NACH JEDER PHASE
```bash
# Validierung
npm test

# Wiederholungs-Check
grep -r "Du weißt nicht" src/content/ | wc -l

# Szenen-Count
find src/content/nachtzug19/scenes -name "*.ts" -exec grep -c "id:" {} \; | awk '{s+=$1} END {print s}'

# Export & Build
npm run export:story
cd android-native && ./gradlew assembleDebug
```

### TESTLESEN
- Nach Phase 0: c1-c3 (Motivation klar?)
- Nach Phase 1: c4-c6 (Pacing besser?)
- Nach Phase 2: c1-c7 + Endings (Gesamt-Sog?)

---

## TIMELINE

| Phase | Dauer | Szenen-Änderungen | Tester-Feedback |
|-------|-------|-------------------|-----------------|
| **Phase 0** | 2-3 Tage | c1, c2, c3, c4, c5, c7, endings | Nach Tag 3 |
| **Phase 1** | 3-4 Tage | c2-c7 (Pacing + Figuren) | Nach Tag 7 |
| **Phase 2** | 2 Tage | c1-c7 (Polish) | Nach Tag 9 |
| **Final Review** | 1 Tag | Bugfixes | Tag 10 |

**TOTAL**: 8-10 Tage

---

## NÄCHSTE SCHRITTE

1. **Review diesen Plan** mit Team/Solo
2. **Git Branch erstellen**: `git checkout -b narrative-fix-phase0`
3. **Phase 0 starten**: M0.1 (Emma etablieren)
4. **Nach Phase 0**: Test + Review + Go/No-Go für Phase 1
5. **Iterativ**: Phase 1 → Phase 2 → Final

---

**WICHTIG**: Dieser Plan ist ITERATIV. Nach jeder Phase: Testen, Reviewen, Adjustieren. Nicht stur durchziehen, wenn etwas nicht funktioniert.

**ENDE PLAN**
