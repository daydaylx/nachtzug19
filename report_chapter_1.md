# Nachtzug 19 - Dialog & Choice Analyse (Kapitel 1)

## Phase 0: System-Check
- **Format:** TypeScript (`scenes/c1.ts`), exportiert als `ScenesCollection`.
- **Choices:** Array aus Objekten mit `id`, `label`, `effects`, `condition`, `next`.
- **State:** `tickets` (truth, escape, guilt, love), `relations` (sleepless, etc.), `pressure` (attention, drift).
- **Limitation:** Keine reinen Text-Variablen für "Attitude". Wir nutzen `tickets` und `relations` als Proxy für den Tonfall.

## Phase 1 & 2: Analyse & Vorschläge (Kapitel 1)

Legende:
- **[K]** Kooperativ / Warm (Tickets: Love / Relations +)
- **[N]** Neutral / Sachlich (Tickets: Truth / Escape)
- **[S]** Skeptisch / Testend (Tickets: Truth / Relations -)
- **[C]** Konfrontativ / Kalt (Tickets: Guilt / Attention +)

### 1. `c1_s01_platform` (Der leere Bahnsteig)
*Kontext:* Der Spieler steht auf einem verlassenen, unheimlichen Bahnsteig.
*Status Quo:* 2 Optionen ("Umsehen", "Warten").
*Vorschlag:*
1. **[K]** "Ich warte. Es gibt bestimmt eine Erklärung." (`tickets_love` +1) -> *Hoffnung*
2. **[N]** "Ich sehe mich erst einmal genau um." (`tickets_truth` +1) -> *Analyse*
3. **[S]** "Das stimmt hier alles nicht. Wo sind die anderen?" (`tickets_truth` +1) -> *Zweifel*
4. **[C]** "Hallo? Ist hier irgendjemand verdammt noch mal?" (`tickets_guilt` +1) -> *Aggression*

### 2. `c1_s01_platform_b` (Die Gestalt / Emma)
*Kontext:* Eine Gestalt liest Zeitung. Erinnerung an Emma blitzt auf.
*Status Quo:* 3 Optionen ("Emma rufen", "Handy checken", "Versuchen zu gehen").
*Vorschlag:*
1. **[K]** "„Emma? Bist du das?" (Laut rufen)" (`tickets_love` +1, `memory_search_active` = true)
2. **[N]** "Das Handy prüfen. Irgendein Signal?" (`tickets_escape` +1)
3. **[S]** "Die Zeitung der Gestalt fixieren. Welches Datum?" (`tickets_truth` +1) -> *Neues Detail*
4. **[C]** "„Weg hier." (Zum Ausgang drängen)" (`tickets_guilt` +1, `conductor_attention` +1)

### 3. `c1_s01a_platform_details` (Das Gerät & Die Gleise)
*Kontext:* Das seltsame Gerät in der Tasche. Dunkle Schienen.
*Status Quo:* 3 Optionen ("Zurücktreten", "Schienen fixieren", "Gerät klammern" [Cond]).
*Vorschlag:*
1. **[K]** "Das Gerät fest an mich drücken. (Es fühlt sich wichtig an)" (`tickets_love` +1)
2. **[N]** "Die schwarzen Schienen untersuchen." (`tickets_truth` +1)
3. **[S]** "Das Gerät skeptisch mustern. Was ist das für ein Ding?" (`tickets_truth` +1) -> *Neuer Ansatz*
4. **[C]** "Einen Schritt zurücktreten. Weg von der Kante." (`tickets_escape` +1)

### 4. `c1_s02_train_appears` (Der Zug fährt ein)
*Kontext:* Der alte, unheimliche Zug kommt an.
*Status Quo:* 3 Optionen ("Einsteigen", "Ansehen", "Rufen" [Cond]).
*Vorschlag:*
1. **[K]** "Dem Zug offen entgegentreten. Endlich geht es weiter." (`tickets_love` +1)
2. **[N]** "Den Zug genau mustern. Baureihe, Zustand, Details." (`tickets_truth` +1)
3. **[S]** "„Ist da jemand drin?" (Vorsichtig rufen)" (`tickets_truth` +1, `conductor_attention` +1) -> *Kleine Provokation*
4. **[C]** "Misstrauisch zurückweichen. Der sieht nicht sicher aus." (`tickets_escape` +1)

### 5. `c1_s02a_train_exterior` (Vor der Tür)
*Kontext:* Vor der offenen Tür. Schriftzug "—CHTZUG". Frau starrt aus Fenster.
*Status Quo:* 3 Optionen ("Einsteigen", "Berühren", "Rufen" [Cond]).
*Vorschlag:*
1. **[K]** "Einsteigen. Ich muss Emma finden." (`tickets_love` +1, `memory_search_active` Check?) -> *Antrieb*
2. **[N]** "Den Schriftzug „—CHTZUG 1—" analysieren." (`tickets_truth` +1)
3. **[S]** "Die starrende Frau im Fenster ansehen. Lebt sie?" (`tickets_truth` +1)
4. **[C]** "„Hallo? Reagiert hier auch mal jemand?" (Laut werden)" (`conductor_attention` +1, `tickets_guilt` +1)

### 6. `c1_s03_inside_train` (Innenraum)
*Kontext:* Stille. Mann links, leeres Abteil rechts.
*Status Quo:* 3 Optionen ("Mann ansprechen", "Platz suchen", "Flüstern" [Cond]).
*Vorschlag:*
1. **[K]** "Den Mann höflich grüßen. Wir sitzen im selben Boot." (`tickets_love` +1, `rel_sleepless` +1)
2. **[N]** "Still einen freien Platz suchen." (`tickets_escape` +1)
3. **[S]** "Die Umgebung prüfen. Warum ist es hier so still?" (`tickets_truth` +1)
4. **[C]** "Das Schweigen brechen. „Was ist das hier für eine Show?"" (`conductor_attention` +1, `tickets_guilt` +1)

### 7. `c1_s03a_find_seat` (Die Stimme)
*Kontext:* Am Fenster. Stimme hinter dir: "Du auch?"
*Status Quo:* 3 Optionen ("Umdrehen", "Ignorieren", "Fenster" [Cond]).
*Vorschlag:*
1. **[K]** "Ruhig umdrehen. „Ich auch was?"" (`tickets_love` +1)
2. **[N]** "Sich langsam umdrehen, ohne ein Wort." (`tickets_truth` +1)
3. **[S]** "Den Blick stur auf das Fenster gerichtet lassen." (`tickets_escape` +1, `memory_drift` +1)
4. **[C]** "„Schleich dich nicht so an!" (Scharf umdrehen)" (`tickets_guilt` +1)

### 8. `c1_s04_sleepless_intro` (Der Schlaflose: Dialog 1)
*Kontext:* Er sagt: "Kein Ticket. Keine Erinnerung. Willkommen."
*Status Quo:* 3 Optionen ("Wo hin?", "Wie lange?", "Kann nicht sein").
*Vorschlag:*
1. **[K]** "„Können Sie mir helfen? Ich verstehe das nicht."" (`tickets_love` +1, `rel_sleepless` +1)
2. **[N]** "„Wohin fährt dieser Zug genau? Haben Sie einen Plan?"" (`tickets_truth` +1)
3. **[S]** "„Woher wollen Sie wissen, dass ich kein Ticket habe?"" (`tickets_truth` +1)
4. **[C]** "„Das ist doch Unsinn. Ich will eine klare Antwort."" (`tickets_guilt` +1, `rel_sleepless` -1)

### 9. `c1_s04a_sleepless_past` (Der Schlaflose: Dialog 2)
*Kontext:* "Die meisten suchen jemanden oder laufen weg." Warnung vor Schaffner.
*Status Quo:* 3 Optionen ("Suche Emma", "Laufe weg", "Schaffner?" [Cond]).
*Vorschlag:*
1. **[K]** "„Ich suche jemanden. Emma." (Die Wahrheit sagen)" (`tickets_love` +1, `rel_sleepless` +2)
2. **[N]** "„Und was machst du hier? Suchst du auch?" (Gegenfrage)" (`tickets_truth` +1)
3. **[S]** "„Was hat es mit dem Schaffner auf sich? Warum die Warnung?"" (`tickets_truth` +1, `conductor_attention` +1)
4. **[C]** "„Ich laufe vor gar nichts weg. Lass mich in Ruhe."" (`tickets_escape` +1, `rel_sleepless` -1)

### 10. `c1_s05_first_anomaly` (Die Durchsage)
*Kontext:* Durchsage bricht ab ("Rückf-"). Schlaflose kommentiert.
*Status Quo:* 3 Optionen ("Aufschreiben", "Ignorieren", "Analysieren" [Cond]).
*Vorschlag:*
1. **[K]** "„Hörst du das auch? Was bedeutet das?" (Den Schlaflosen fragen)" (`tickets_love` +1)
2. **[N]** "Versuchen, das Wortfetzen „Rückf-" zu notieren." (`tickets_truth` +1)
3. **[S]** "Das ist doch eine Aufnahme. Ein Fehler im Band." (`tickets_escape` +1)
4. **[C]** "Gegen den Lautsprecher klopfen. „Funktioniert hier irgendwas?"" (`conductor_attention` +1, `tickets_guilt` +1)

### 11. `c1_s05a_other_passengers` (Die Anderen)
*Kontext:* Starrende Passagiere (Frau, Mann, Teenager).
*Status Quo:* 3 Optionen ("Ansprechen" [Cond], "Ruhe lassen", "Zählen" [Cond]).
*Vorschlag:*
1. **[K]** "Vorsichtig auf die Frau zugehen. „Alles in Ordnung?"" (`tickets_love` +1, `conductor_attention` +1)
2. **[N]** "Die Anzahl der Passagiere und ihre Positionen merken." (`tickets_truth` +1)
3. **[S]** "Sie genau beobachten. Atmen sie überhaupt?" (`tickets_truth` +1, `memory_drift` +1)
4. **[C]** "Sie ignorieren. Das sind doch nur Statisten." (`tickets_escape` +1)

### 12. `c1_s05b_compartment7_tease` (Abteil 7)
*Kontext:* Verschlossene Tür 7. Geräusche. Schlafloser warnt.
*Status Quo:* 3 Optionen ("Klopfen", "Hören auf Schlaflosen", "Hand auflegen").
*Vorschlag:*
1. **[K]** "Die Hand sanft auf das Holz legen. Eine Verbindung spüren." (`tickets_love` +1, `rel_comp7` +1)
2. **[N]** "Den Schlaflosen fragen: „Was ist da drin?"" (`tickets_truth` +1, `rel_sleepless` +1)
3. **[S]** "Auf den Schlaflosen hören und Abstand halten. Er weiß mehr." (`tickets_escape` +1)
4. **[C]** "Trotzdem klopfen. Ich lasse mir nichts verbieten." (`conductor_attention` +2, `rel_comp7` +1)

### 13. `c1_s05c_comp7_listen` (An der Tür)
*Kontext:* Stimme innen ("...muss stimmen"). Knall.
*Status Quo:* 3 Optionen ("Nochmal klopfen", "Zurücktreten", "Sprechen" [Cond]).
*Vorschlag:*
1. **[K]** "Leise flüstern: „Kann ich helfen?"" (`tickets_love` +1, `rel_comp7` +2)
2. **[N]** "Das Gehörte analysieren. War das ein Streit?" (`tickets_truth` +1)
3. **[S]** "Erschrocken zurückweichen. Das klang gefährlich." (`tickets_escape` +1)
4. **[C]** "„Hey! Macht auf!" (Gegen die Tür hämmern)" (`conductor_attention` +2, `tickets_guilt` +1)

### 14. `c1_end_station` (Das Ende / Jacke)
*Kontext:* Zug hält. Schlafloser hat plötzlich blaue Jacke (statt grau).
*Status Quo:* 3 Optionen ("Weiter", "Beharren" [Cond], "Zunicken" [Cond]).
*Vorschlag:*
1. **[K]** "Es akzeptieren. „Vielleicht habe ich mich geirrt. Weiter."" (`tickets_love` +1)
2. **[N]** "Nichts sagen, aber die Anomalie registrieren." (`tickets_truth` +1, `memory_drift` +1)
3. **[S]** "„Deine Jacke war grau." (Auf der Wahrheit beharren)" (`tickets_truth` +1, `rel_sleepless` +1)
4. **[C]** "„Spielchen. Alles nur Spielchen." (Kopfschüttelnd aussteigen)" (`tickets_guilt` +1)

---
Diese Struktur garantiert dem Spieler immer 4 Handlungsoptionen mit klarer emotionaler Färbung, auch wenn sie oft zum gleichen nächsten Knoten führen. Die "Konsequenz" ist meist ein inkrementeller State-Change (`tickets` oder `relations`), der sich erst langfristig auswirkt.
