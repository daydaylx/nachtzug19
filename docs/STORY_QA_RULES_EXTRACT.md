# STORY QA RULES EXTRACT
**Erstellt**: 2026-01-31
**Zweck**: Kompaktes Regelwerk für Story-QA, extrahiert aus `/docs`
**Autorität**: DOCS-FIRST - Alle Regeln basieren auf offiziellen Dokumenten

---

## P0: CANON RULES (NICHT VERHANDELBAR)

Diese Regeln sind hart codiert und dürfen NIEMALS verletzt werden.

### R1: Drift After Stations
- **Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 1 (Canon Rules)
- **Regel**: Jedes Kapitel-Ende erhöht `memory_drift` automatisch
- **Implementation**: Szenen mit Tag `station_end` triggern `memory_drift +1`
- **Warum**: Drift ist strukturell an den Loop gebunden
- **QA-Check**: Pro Kapitel MUSS genau 1 Szene mit Tag `station_end` existieren

### R2: Controls at Chapters 2, 3, 5
- **Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 1
- **Regel**: Feste Kontrollpunkte (Schaffner) in Kapiteln 2, 3, 5
- **Implementation**: Mindestens eine Szene mit Tag `control` pro Kapitel (2, 3, 5)
- **Warum**: Narrative Pressure Points, Antagonist/Judge
- **QA-Check**: Kapitel 2/3/5 haben mind. 1 `control`-Szene; Kapitel 1/4/6/7 haben KEINE

### R3: Every Choice Has Callback
- **Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 1
- **Regel**: Keine Choice ohne sichtbare Konsequenz später
- **Implementation**:
  - Jede Choice mit `effects` MUSS ein Echo haben:
    - Via `narrative_variants` (conditional text)
    - Via Choice-Gating (conditional choices)
    - Via Ending-Gating
- **Ausnahme**: Tone Choices (siehe P1)
- **QA-Check**: Mind. 60% der State-ändernden Choices haben dokumentierten Callback in `state_notes` oder später sichtbar

### R4: Train Never Lies Directly
- **Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 1
- **Regel**: Der Zug lügt nicht plump, sondern verschiebt Bedeutung
- **Implementation**:
  - Keine Falschaussagen (z.B. "Zug fährt nach Berlin" → tut er dann auch)
  - Ambiguität erlaubt (z.B. "Du erreichst dein Ziel" → welches Ziel?)
  - Kein Gaslighting (NPC sagt "Das hast du nie gesagt", obwohl Spieler es sagte)
- **QA-Check**: Alle NPC-Aussagen, Durchsagen, Hinweise auf Konsistenz prüfen

---

## P1: CHOICE SYSTEM (WEIGHTED vs TONE vs FAKE)

**Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 2 + `DECISION_SYSTEM.md`

### WEIGHTED Choices (Gewichtete Entscheidungen)
**Kriterien (ODER)**:
1. Hat mindestens 1 Effect im `effects`-Array
2. Führt zu anderer `next`-Szene als Alternativen
3. Führt direkt zu einem Ending

**Unter-Typen**:
- **Ticket-Choice**: Erhöht Ticket-Wert (truth/escape/guilt/love)
- **Druck-Choice**: Verändert `conductor_attention` oder `memory_drift`
- **Weichen-Choice**: Bestimmt Pfad (Next Scene), ohne zwingend Stats zu ändern

### TONE Choices (Stimmungs-Entscheidungen)
**Kriterien (UND)**:
1. `effects`-Array ist leer ODER nur triviale Effects
2. Führt zur selben `next`-Szene wie Alternativen
3. Unterschied liegt nur in Button-Text oder kurzer Text-Reaktion

**Status**: Aktuell gibt es wenige reine Tone Choices. Fast jede Choice vergibt Punkte.

**Erlaubt**: Tone Choices (leeres `effects`-Array), wenn sie der Haltung dienen

### FAKE Choices (ANTIPATTERN - VERBOTEN)
**Erkennungsmerkmal**:
- Identische `next`-Szene
- Identische `effects` (oder beide keine)
- Einziger Unterschied: `label`

**Lösung**:
- Entweder zu **Tone** machen (entferne Stats)
- Oder zu **Weighted** machen (unterschiedliche Konsequenzen)

**QA-Check**: Alle Choices mit identischer `next` + identischen `effects` sind Fake Choices und MÜSSEN gefixed werden

---

## P1: MOBILE PACING RULES

**Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 3 + `MOBILE_PACING_RULES.md`

### Beat-Regel (DAS GESETZ)
**Eine Szene = ein Beat = 1 Gefühl + 1 konkrete Aktion**

**Beat-Formel** (immer gleich):
1. **Hook (1 Satz)**: "Was stimmt hier gerade nicht?" / Auslöser
2. **Detail (1–3 Sätze)**: Ein Sinnesdetail (Ton/Licht/Geruch/Blick)
3. **Konsequenz-Andeutung (1 Satz)**: Was steht auf dem Spiel?
4. **Aktion (Choice)**: 2–4 Optionen, sofort klickbar

### Harte Limits (Anti-Roman)
- **Max 6–10 Sätze pro Beat**. Danach MUSS eine Aktion kommen
- **Kein Scrollen**: Beat muss auf einen Bildschirm passen
- **Info nur mit Aktion**: Wenn du erklärst, musst du gleichzeitig entscheiden lassen

### Choice-Design
- **Handlung vs. Reaktion**:
  - Mind. 1 Option muss "Handlung" sein (hingehen, fragen, verstecken)
  - Mind. 1 Option muss "Reaktion" sein (schweigen, bluffen, nachgeben)
- **Callback**: Wenn Choice Effekte hat, ist späterer Callback verpflichtend
- **Tone Choices**: Erlaubt (leeres `effects`-Array), wenn sie der Haltung dienen

### Micro-Actions (Gameplay Feel)
Statt langer Szenenübergänge nutze Micro-Actions:
- "Horchen" → kurze Mini-Szene → neue Choice
- "Ticket prüfen" → Mini-Reveal → neue Choice
- "Augenkontakt halten" → Beziehungston → neue Choice

---

## P1: LENGTH & IMMERSION SPECS

**Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 4 + `NACHTZUG_19_LENGTH_IMMERSION_SPEC.md`

### Zielwerte: Spielzeit pro Kapitel
- **Minimum**: ≥ 20 Minuten (unter 20 min = **FEHLER**)
- **Ideal**: 30–35 Minuten (Sweet Spot)
- **Spielzeit** = Lesen + Entscheidungen + mentaler Nachhall

### Runtime-Formel
**Kapitel-Minuten ≈ (Wörter / 190) + (Choices_total × 0.15)**
- 190 Wörter/Minute = realistischer Mittelwert für mobilen Text
- 0.15 Minuten pro Choice = 9 Sekunden pro Entscheidung

### Ziel-Bereich als Zahlen
Für **30–35 Minuten**:
- **Wörter pro Kapitel**: ~ **5.000–6.500**
- **Choices pro Kapitel**: ~ **30–45**

### Szenenanzahl pro Kapitel
- **Minimum**: 18 Szenen
- **Ziel**: 22–28 Szenen
- **Maximal**: 32 Szenen (nur wenn sauber)

> Wenn Kapitel nur 10–14 Szenen hat, ist "17 Minuten" praktisch garantiert

### Szene-Typen (Mischung)
Jedes Kapitel soll enthalten:
1. **3–5 Atmosphere/Interlude Szenen**: Kurz, dicht, wenig Plot, viel Gefühl
2. **10–16 Standard Szenen**: Dialog + Entscheidung + Konsequenz
3. **2–4 "Set-Piece"-Szenen**: Länger, zentral (Kontrolle, Abteil 7, Drift/Spiegel)

### Plot-Tempo-Regel (Anti-Express)
- Pro Kapitel **maximal 1 großer Reveal**
- "Erklären" verboten: Max. **3 erklärende Sätze am Stück**
- Mystery bleibt Mystery

### Szenen-Spezifikation (Mindestanforderungen)
- **narrative**: 5–10 Absätze (bei Interludes: 3–6)
- **Mind. 1 sensorischer Anker**: Geräusch / Licht / Geruch / Temperatur / Material / Vibration
- **Mind. 1 "Moment"**: Mini-Konflikt / Mini-Entscheidung / Nachhall / Drift-Symptom / Beziehungssignal
- **choices**: 1–4, jede Choice hat Effects + next/ending
- **state_notes**: max 3, aber mind. 1 Callback-Hinweis

### "Moment"-Katalog (jede Szene muss ≥ 1 haben)
- Mini-Konflikt (Blickkontakt, Unterbrechung, leise Drohung, Unsicherheit)
- Mini-Entscheidung (nicht nur Plot, auch Verhalten/Ton)
- Nachhall (ein Satz/Detail, das später wiederkommt)
- Drift-Symptom (klein, subtil, nicht übertrieben)
- Beziehungssignal (`rel_*` bewegt sich spürbar in Dialog/Reaktion)

### Verbotene Füllmuster
- "Du spürst ein seltsames Gefühl" ohne konkreten Sinneseindruck
- "Alles wirkt anders" ohne konkretes Detail
- "Plötzlich erinnerst du dich" ohne Trigger / Konsequenz

**Stattdessen**: Konkrete Dinge (Metallkälte am Griff, fluoreszierendes Flackern, Ozongeruch, Schienenstoß, zu saubere Stille, falscher Name in Durchsage)

---

## P1: STATE MODEL (UNIFIED)

**Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 5 + `CLAUDE.md` + `STORY_BIBLE.md`

### Legacy Stats (0-10)
- `mut` (Mut)
- `wissen` (Wissen)
- `empathie` (Empathie)

### Tickets (0-5)
- `tickets_truth` (Wahrheit suchen)
- `tickets_escape` (Flucht/Vermeidung)
- `tickets_guilt` (Schuld/Verantwortung)
- `tickets_love` (Verbindung)

### Pressure (0-6)
- `conductor_attention` (Gefahr durch Schaffner)
- `memory_drift` (Realitätsverlust, steuert Textvarianten)

### Relations (-2 to +4)
- `rel_comp7` (Frau Abteil 7)
- `rel_boy` (Kassetten-Junge)
- `rel_sleepless` (Schlafloser)

### Items / Hinweise (boolean)
- `has_recorder` (Kassettenrekorder)
- `has_tag19` (Etikett "19")
- `photo_anomaly` (Foto-Hinweis erkannt)
- `has_ticket`
- `played_recorder`
- `examined_suitcase`

### Meta
- `current_scene_id`
- `visited_scene_ids[]`
- `chapter_index`
- `history[]`

**REGEL**: Engine clamp't alle Werte auf erlaubte Ranges automatisch.

**QA-Check**: KEINE neuen State-Variablen erfinden. Nur existierende nutzen.

---

## P1: CONDITIONS & EFFECTS (Mini-Sprache)

**Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 6

### Conditions
- Vergleiche: `compare` (target, operator, value)
- Boolean: `bool` (target, value)
- Kombinationen: `and` / `or` (max 2 Ebenen verschachtelt)

**REGEL**: Keine freien Text-Conditions.

### Effects
- `inc` / `dec` (z.B. `memory_drift +1`)
- `set` (boolean oder feste Zahl)

**REGEL**: Engine clamp't alles auf erlaubte Ranges.

**QA-Check**: Alle Conditions/Effects müssen bekannte State-Variablen nutzen. Keine unknown keys.

---

## P0: GRAPH-INVARIANTEN (Content Validation)

**Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 7

Der Validator MUSS prüfen:

1. Jede `next`-Referenz existiert
2. Jede Szene ist vom Start erreichbar (oder als `secret` markiert)
3. Keine Dead-Ends ohne `ending`
4. Keine Choice ohne `effects` (außer deklarierte Tone Choices)
5. Keine unbekannten Variablen in Conditions/Effects
6. Station-Ende-Regel: `station_end` → Drift/Korrektur
7. Kontrollen-Regel: Kapitel 2/3/5 enthalten `control`

**REGEL**: Wenn einer davon bricht, ist das ein **BUG**, keine "kreative Freiheit".

---

## P1: DEFINITION OF DONE PRO KAPITEL

**Quelle**: `NACHTZUG_19_RULES.md` → Abschnitt 8

Ein Kapitel gilt als **fertig**, wenn:

1. **Runtime-Schätzung** nach Formel:
   - ≥ 20 Minuten (Fehler, wenn nicht)
   - Ziel: 30–35 Minuten
2. **Szenenanzahl** im Zielbereich (22–28 empfohlen)
3. **Choice-Integrität**:
   - Keine Choice ohne Effect (außer Tone)
   - Keine next-Links ins Nichts
4. **Callbacks vorhanden**:
   - Mind. 60% der State-ändernden Choices haben ein späteres Echo
5. **Canon-Regeln** eingehalten:
   - `station_end` vorhanden
   - `control` in Kap. 2/3/5
6. **Validator + Tests grün**

---

## P2: ATMOSPHÄRE & KONTINUITÄT

**Quelle**: `NACHTZUG_19_RULES.md` + `CONCEPT_NACHTZUG_19.md`

### Genre / Ton
- **Genre**: Mystery / Psycho-Thriller / leise Romance (optional)
- **Ton**: spannend, melancholisch, konkret, wenig Pathos, keine Fantasy-Schulklischees
- **Versprechen**: klare Regeln, spürbare Konsequenzen, faire Hinweise statt Twist-Gewitter

### Narrative Design-Prinzipien
1. **Show, don't tell**: Regeln durch Beobachtung erkennbar, nicht durch Exposition
2. **Jede Entscheidung zählt**: Keine falschen Choices, alle öffnen/schließen Wege
3. **Mystery ohne Willkür**: Alle Hinweise fair platziert
4. **Emotionale Resonanz**: NPCs sind Menschen mit eigener Agenda, nicht Questgeber

### Typische Fehler vermeiden
1. Widersprüche in Regeln (Drift/Station/Kontrolle)
2. Entscheidungen ohne Folgen
3. Zu viele Figuren (Fokus verwässert)
4. Zu frühe Erklärung oder nie Erklärung
5. Twist-Overkill statt Foreshadowing

---

## P2: DRIFT-QUALITÄT

**Quelle**: `NACHTZUG_19_RULES.md` + `CONCEPT_NACHTZUG_19.md`

### Drift-Implementierung
- Ab `memory_drift >= 3`: Textvarianten mit falschen Namen/Details
- Ab `memory_drift >= 5`: UI-Glitches (flackernde Buttons, vertauschte Labels)

### Drift-Regeln
- Pro Kapitel 1–2 klare Drift-Symptome
- Steigerung über Kapitel hinweg
- Drift soll nicht "random weird" sein
- Drift verändert Bedeutung/Betonung, nicht plump "alles ist falsch"

**QA-Check**:
- Drift-Varianten subtil, konsistent, nicht "random glitch"
- Drift verschiebt Bedeutung, lügt nicht direkt (siehe R4)

---

## KAPITELÜBERSICHT (Story Bible)

**Quelle**: `STORY_BIBLE.md`

- **C1: Leerer Bahnsteig** (24 Szenen)
- **C2: Die erste Kontrolle** (25 Szenen)
- **C3: Wagen 7** (27 Szenen)
- **C4: Spiegelungen** (27 Szenen)
- **C5: [Titel ausstehend]** (25 Szenen)
- **C6: [Titel ausstehend]** (26 Szenen)
- **C7: [Titel ausstehend]** (29 Szenen)

**Gesamt**: 156 Szenen, 5 Endings

---

## FIGUREN (ENTITIES)

**Quelle**: `STORY_BIBLE.md`

- **The Conductor (Der Schaffner)**: Antagonist/Wächter. Reagiert auf `conductor_attention`
- **Comp7 (Reisende Abteil 7)**: Mysteriöse Schlüsselfigur. Status: `rel_comp7`
- **The Boy (Kassettenjunge)**: Träger von Erinnerungen. Status: `rel_boy`
- **The Sleepless (Schlafloser)**: Warnende Gestalt am Anfang. Status: `rel_sleepless`

---

## QA-PRIORITÄTEN (Zusammenfassung)

### P0 (GAMEBREAKER - SOFORT)
- Canon Rules (R1-R4) verletzt
- Kaputte `next`-Referenzen
- Dead-Ends ohne Ending
- Unknown State-Variablen in Conditions/Effects
- Fehlende `station_end` pro Kapitel
- Fehlende `control` in Kap. 2/3/5

### P1 (REGEL-/LOGIKFEHLER - KLEIN FIXEN)
- Fake Choices (identische next + effects)
- Choices ohne Effects (nicht als Tone deklariert)
- Fehlende Callbacks (< 60% Coverage)
- Conditions nutzen falschen Key / falschen Operator
- Drift-Varianten triggern nicht bei korrektem drift-Level
- Kapitel < 20 Minuten (Runtime-Formel)

### P2 (STORY-SINN & ATMOSPHÄRE - KLEIN FIXEN WENN MÖGLICH)
- Wiederholte Phrasen / KI-Symptome
- Fehlende sensorische Anker
- Fehlende "Momente" pro Szene
- Pacing-Probleme (zu lange Szenen ohne Choice)
- Atmosphären-Brüche (Ton, Rhythmus)
- Kontinuitäts-Probleme (Ort/Zeit/Figuren)

### P3 (POLISH - NUR DOKUMENTIEREN)
- Optimierungen
- Zusätzliche Varianten
- Erweiterte Callbacks

---

**Version**: 1.0
**Erstellt**: 2026-01-31
**Basis**: NACHTZUG_19_RULES.md (v2.0) + STORY_BIBLE.md + DECISION_SYSTEM.md + MOBILE_PACING_RULES.md + NACHTZUG_19_LENGTH_IMMERSION_SPEC.md + CONCEPT_NACHTZUG_19.md
