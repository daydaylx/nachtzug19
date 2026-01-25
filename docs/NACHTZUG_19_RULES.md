# NACHTZUG 19 - Content Rules & Specifications

**Version**: 2.0 (Konsolidiert)
**Last Updated**: 2026-01-25
**Zusammenführung von**: NACHTZUG_19_RULES.md (v1) + DECISION_SYSTEM.md + MOBILE_PACING_RULES.md + NACHTZUG_19_LENGTH_IMMERSION_SPEC.md

---

## 1. Canon Rules (R1-R4)

Diese Regeln sind **nicht verhandelbar** und definieren die Kern-Mechaniken der Story.

### R1: Drift After Stations
**Regel**: Jedes Kapitel-Ende erhöht `memory_drift` automatisch.

**Implementation**:
- Szenen mit Tag `station_end` triggern `memory_drift +1`
- Dies simuliert die zunehmende Realitäts-Auflösung mit jedem "Loop"

**Warum**: Drift ist kein zufälliges Event, sondern strukturell an den Loop gebunden.

---

### R2: Controls at Chapters 2, 3, 5
**Regel**: Feste Kontrollpunkte (Schaffner) in Kapiteln 2, 3, 5.

**Implementation**:
- Mindestens eine Szene mit Tag `control` pro Kapitel (2, 3, 5)
- Diese Gates erhöhen `conductor_attention` und können State abfragen

**Warum**: Narrative Pressure Points. Der Schaffner ist der Antagonist/Judge.

---

### R3: Every Choice Has Callback
**Regel**: Keine Choice ohne sichtbare Konsequenz später.

**Implementation**:
- Jede Choice mit `effects` MUSS ein Echo in späteren Kapiteln haben
  - Entweder via `narrative_variants` (conditional text)
  - Oder via Choice-Gating (conditional choices)
  - Oder via Ending-Gating
- **Ausnahme**: Tone Choices (siehe Abschnitt 2)

**Warum**: Vermeidet "Fake Choices". Spieler muss spüren, dass Entscheidungen Gewicht haben.

**Validierung**:
- State-Änderungen tracken
- Callbacks dokumentieren in `state_notes`

---

### R4: Train Never Lies Directly
**Regel**: Der Zug (NPCs, Durchsagen, Hinweise) lügt nicht plump, sondern **verschiebt Bedeutung**.

**Implementation**:
- Keine Falschaussagen (z.B. "Der Zug fährt nach Berlin" → tut er dann auch)
- Aber: Ambiguität erlaubt (z.B. "Du erreichst dein Ziel" → welches Ziel?)
- Keine Gaslighting-Mechanik (z.B. NPC sagt "Das hast du nie gesagt", obwohl Spieler es gesagt hat)

**Warum**: Mystery funktioniert durch Mehrdeutigkeit, nicht durch Lügen. Der Spieler soll dem Text vertrauen können.

---

## 2. Choice System (Weighted vs. Tone)

Das System unterscheidet strikt zwischen Entscheidungen, die den Spielzustand (State) verändern, und solchen, die nur die narrative Färbung (Flavor/Atmosphäre) beeinflussen.

### 2.1 GEWICHTETE Entscheidungen (Weighted)

Diese Entscheidungen haben mechanische Konsequenzen. Sie verändern den Status oder den Pfad.

#### Kriterien (ODER)
1.  **Effekte**: Die Choice hat mindestens einen Eintrag im `effects`-Array (z.B. `tickets_truth +1`)
2.  **Verzweigung**: Die Choice führt zu einer *anderen* `next`-Szene als die Alternativen
3.  **Ende**: Die Choice führt direkt zu einem Ending

#### Unter-Typen
*   **Ticket-Choice**: Erhöht einen Ticket-Wert (Wahrheit/Flucht/Schuld/Liebe)
    *   *Beispiel*: `c1_s01_platform` → `look_around` (Gibt `tickets_truth +1`)
*   **Druck-Choice (Pressure)**: Verändert `conductor_attention` oder `memory_drift`
    *   *Beispiel*: `c1_interlude_05_vibration` → `steady_breath` (Senkt `conductor_attention`)
*   **Weichen-Choice (Gate)**: Bestimmt den weiteren Pfad (Next Scene), ohne zwingend Stats zu ändern

---

### 2.2 STIMMUNGS-Entscheidungen (Tone)

Diese Entscheidungen dienen dem Rollenspiel und der Immersion. Sie erlauben dem Spieler, die *Haltung* des Protagonisten auszudrücken, ohne die *Handlung* zu ändern.

#### Kriterien (UND)
1.  **Keine Effekte**: Das `effects`-Array ist leer
2.  **Keine Verzweigung**: Führt zur selben `next`-Szene wie die Alternativen
3.  **Lokales Flair**: Der Unterschied liegt nur im Button-Text oder in einer kurzen Text-Reaktion

#### Aktueller Status
*   **Ist-Zustand**: Aktuell gibt es **wenige** reine Tone Choices. Fast jede Choice vergibt Punkte
*   **Soll-Zustand**: Flavor-Entscheidungen sollen von mechanischem Ballast befreit werden

**Erlaubt**: Tone Choices (leeres `effects`-Array), wenn sie der Haltung dienen

---

### 2.3 FAKE-Entscheidungen (Antipattern)

Entscheidungen, die suggerieren, unterschiedlich zu sein, aber technisch identisch sind.

#### Erkennungsmerkmal
*   Identische `next`-Szene
*   Identische `effects` (oder beide keine)
*   Einziger Unterschied: `label`

#### Lösung
- Entweder zu **Tone** machen (entferne Stats)
- Oder zu **Weighted** machen (unterschiedliche Konsequenzen)

---

## 3. Mobile Pacing Rules

> **Oberste Prämisse**: Interaktion schlägt Text. Der Spieler ist kein Leser, er ist ein Teilnehmer.

### 3.1 Die Beat-Regel (Das Gesetz)

**Eine Szene = ein Beat = 1 Gefühl + 1 konkrete Aktion**

#### Definition "Beat"
Ein Beat ist die kleinste spielbare Einheit, die sich abgeschlossen anfühlt.
*   **Gefühl**: Spannung / Neugier / Unsicherheit / Erleichterung / Schuld / Nähe
*   **Aktion**: Du entscheidest **jetzt** etwas (Choice/Micro-Action), nicht "später"

#### Die Beat-Formel (Immer gleich)
1.  **Hook (1 Satz)**: "Was stimmt hier gerade nicht?" / Auslöser
2.  **Detail (1–3 Sätze)**: Ein Sinnesdetail (Ton/Licht/Geruch/Blick)
3.  **Konsequenz-Andeutung (1 Satz)**: Was steht auf dem Spiel?
4.  **Aktion (Choice)**: 2–4 Optionen, sofort klickbar

---

### 3.2 Harte Limits (Anti-Roman)

*   **Max 6–10 Sätze pro Beat.** Danach MUSS eine Aktion kommen
*   **Kein Scrollen**: Der Beat muss auf einen Bildschirm passen
*   **Info nur mit Aktion**: Wenn du erklärst, musst du gleichzeitig entscheiden lassen

---

### 3.3 Choice-Design

**Handlung vs. Reaktion**:
*   Mindestens eine Option muss "Handlung" sein (z.B. hingehen, fragen, verstecken)
*   Mindestens eine Option muss "Reaktion" sein (z.B. schweigen, bluffen, nachgeben)

**Callback**: Wenn eine Choice Effekte hat, ist ein späterer Callback verpflichtend

**Tone Choices**: Erlaubt (leeres `effects`-Array), wenn sie der Haltung dienen

---

### 3.4 Micro-Actions (Gameplay Feel)

Statt langer Szenenübergänge nutze Micro-Actions:
*   "Horchen" → kurze Mini-Szene → neue Choice
*   "Ticket prüfen" → Mini-Reveal → neue Choice
*   "Augenkontakt halten" → Beziehungston → neue Choice

---

### 3.5 Beispiele

#### ❌ SCHLECHT (E-Book Mode)
> Der Schaffner nähert sich. Er sieht bedrohlich aus. Du hast kein Ticket und erinnerst dich nicht, wo es ist. Du überlegst, was du tun sollst, während er näher kommt. [Weiter]

#### ✅ GUT (Game Mode)
> Schritte. Schwer. Rhythmisch. (Hook)
>
> Der Schaffner schiebt sich in dein Sichtfeld. Seine Uniform wirkt wie eine zweite Haut, zu perfekt. Er starrt dich an. (Detail)
>
> Du hast kein Ticket. Und er weiß es. (Konsequenz)
>
> *[CHOICE: Blick standhalten]* (Reaktion)
> *[CHOICE: In die Taschen greifen]* (Handlung)

---

## 4. Length & Immersion Specifications

### 4.1 Zielwerte: Spielzeit pro Kapitel

#### Mindestziel
- **≥ 20 Minuten pro Kapitel** (unter 20 min gilt als **Fehler**)

#### Idealziel
- **30–35 Minuten pro Kapitel** (Sweet Spot)

#### Was "Spielzeit" bedeutet
Spielzeit = **Lesen + Entscheidungen treffen + kurzer mentaler Nachhall**

---

### 4.2 Messmodell

#### Annahmen
- Durchschnittliche Lesegeschwindigkeit (mobil): **160–220 Wörter/Minute**
- Entscheidung (Choice) inkl. Nachdenken: **6–12 Sekunden**
- Mini-Interaktion (Hotspot/Overlay) zählt wie Choice

#### Runtime-Formel (Schätzung)
**Kapitel-Minuten ≈ (Wörter / 190) + (Choices_total × 0.15)**

- 190 Wörter/Minute = realistischer Mittelwert für mobilen, atmosphärischen Text
- 0.15 Minuten pro Choice = 9 Sekunden pro Entscheidung

#### Ziel-Bereich als Zahlen
Für **30–35 Minuten** brauchst du grob:
- **Wörter pro Kapitel**: ~ **5.000–6.500**
- **Choices pro Kapitel**: ~ **30–45**

---

### 4.3 Kapitel-Blueprint (wie du Länge erzeugst)

#### Szenenanzahl pro Kapitel
- Minimum: **18 Szenen**
- Ziel: **22–28 Szenen**
- Maximal (nur wenn sauber): **32 Szenen**

> Wenn ein Kapitel nur 10–14 Szenen hat, ist "17 Minuten" praktisch garantiert.

#### Szene-Typen (Mischung)
Jedes Kapitel soll enthalten:
1. **3–5 Atmosphere/Interlude Szenen**
   - Kurz, dicht, wenig Plot, viel Gefühl (Gang, Geräusche, Durchsage, Lichtwechsel)
2. **10–16 Standard Szenen**
   - Dialog + Entscheidung + Konsequenz
3. **2–4 "Set-Piece"-Szenen**
   - Länger, zentral (Kontrolle, Abteil 7 Moment, Drift/Spiegel)

#### Plot-Tempo-Regel (Anti-Express)
- Pro Kapitel wird **maximal 1 großer Reveal** geliefert
- "Erklären" ist verboten: Max. **3 erklärende Sätze am Stück**
- Mystery bleibt Mystery. Der Zug lügt nicht plump, er **verschiebt Bedeutung**

---

### 4.4 Szenen-Spezifikation (für Immersion)

#### Mindestanforderungen pro Szene
- **narrative**: 5–10 Absätze (bei Interludes: 3–6)
- **Mindestens 1 sensorischer Anker**:
  - Geräusch / Licht / Geruch / Temperatur / Material / Vibration
- **Mindestens 1 "Moment"** (siehe unten)
- **choices**: 1–4, jede Choice hat Effects + next/ending
- **state_notes**: max 3, aber mindestens 1 Callback-Hinweis

#### Der "Moment"-Katalog (jede Szene muss ≥ 1 haben)
- Mini-Konflikt (Blickkontakt, Unterbrechung, leise Drohung, Unsicherheit)
- Mini-Entscheidung (nicht nur Plot, auch Verhalten/Ton)
- Nachhall (ein Satz/Detail, das später wiederkommt)
- Drift-Symptom (klein, subtil, nicht übertrieben)
- Beziehungssignal (`rel_*` bewegt sich spürbar in Dialog/Reaktion)

---

### 4.5 Entscheidungen (damit Spielzeit echt ist)

#### Jede Choice muss spürbar sein
- Jede Choice:
  - **Mindestens 1 Effect**
  - Und ein **sichtbares Echo später** (Callback)

Wenn eine Choice "nur Text variiert", ist das Fake-Interaktivität und zählt nicht als Spielzeit.

#### Choice-Dichte
- Ziel: **1 Choice pro Szene** mindestens
- In Set-Pieces: gerne **2 Choices** (Interaktions-Sandwich)

#### Interaktions-Sandwich (für große Szenen)
Für zentrale Szenen:
1. Einstieg (kurz)
2. Choice 1
3. Konsequenz sichtbar
4. Choice 2
5. Ausklang / Hook

Ergebnis: mehr Spielzeit **und** mehr Immersion, ohne Fülltext.

---

### 4.6 Drift & Kontrolle (Canonical Timing)

- **station_end** pro Kapitel: Pflicht
- **Kontrolle**: Kapitel **2, 3, 5** (mindestens eine `control` Szene)
- Drift soll nicht "random weird" sein:
  - Pro Kapitel 1–2 klare Drift-Symptome
  - Steigerung über Kapitel hinweg

---

### 4.7 "Keine Füllwörter"-Regeln

#### Verbotene Füllmuster
- "Du spürst ein seltsames Gefühl" ohne konkreten Sinneseindruck
- "Alles wirkt anders" ohne konkretes Detail
- "Plötzlich erinnerst du dich" ohne Trigger / Konsequenz

#### Stattdessen
**Konkrete Dinge**: Metallkälte am Griff, fluoreszierendes Flackern, Ozongeruch, Schienenstoß, zu saubere Stille, falscher Name in Durchsage.

---

## 5. State Model (Unified)

Alle Variablen existieren von Anfang an mit Defaults. Keine plötzlich auftauchenden Flags.

### 5.1 Legacy Stats (numerisch 0-10)
- `mut` (Mut)
- `wissen`
- `empathie`

### 5.2 Tickets (0-5)
- `tickets_truth`
- `tickets_escape`
- `tickets_guilt`
- `tickets_love`

### 5.3 Pressure (0-6)
- `conductor_attention`
- `memory_drift`

### 5.4 Beziehungen (-2 to +4)
- `rel_comp7`
- `rel_boy`
- `rel_sleepless`

### 5.5 Items / Hinweise (boolean)
- `has_recorder`
- `has_tag19`
- `photo_anomaly`
- `has_ticket`
- `played_recorder`
- `examined_suitcase`

### 5.6 Meta
- `current_scene_id`
- `visited_scene_ids[]`
- `chapter_index`
- `history[]`

**Regel**: Engine clamp't alle Werte auf erlaubte Ranges automatisch.

---

## 6. Conditions & Effects (Mini-Sprache)

### 6.1 Conditions
- Vergleiche: `compare` (target, operator, value)
- Boolean: `bool` (target, value)
- Kombinationen: `and` / `or` (max 2 Ebenen verschachtelt)

**Regel**: Keine freien Text-Conditions.

### 6.2 Effects
- `inc` / `dec` (z.B. `memory_drift +1`)
- `set` (boolean oder feste Zahl)

**Regel**: Engine clamp't alles auf erlaubte Ranges.

---

## 7. Graph-Invarianten (Content Validation)

Der Validator muss prüfen:

1. Jede `next`-Referenz existiert
2. Jede Szene ist vom Start erreichbar (oder als `secret` markiert)
3. Keine Dead-Ends ohne `ending`
4. Keine Choice ohne `effects`
5. Keine unbekannten Variablen in Conditions/Effects
6. Station-Ende-Regel: `station_end` → Drift/Korrektur
7. Kontrollen-Regel: Kapitel 2/3/5 enthalten `control`

Wenn einer davon bricht, ist das ein **Bug**, keine "kreative Freiheit".

---

## 8. Definition of Done pro Kapitel

Ein Kapitel gilt als **fertig**, wenn:

1. **Runtime-Schätzung** nach Formel:
   - ≥ 20 Minuten (Fehler, wenn nicht)
   - Ziel: 30–35 Minuten
2. **Szenenanzahl** im Zielbereich (22–28 empfohlen)
3. **Choice-Integrität**:
   - Keine Choice ohne Effect
   - Keine next-Links ins Nichts
4. **Callbacks vorhanden**:
   - Mind. 60% der State-ändernden Choices haben ein späteres Echo
5. **Canon-Regeln** eingehalten:
   - station_end vorhanden
   - control in Kap. 2/3/5
6. **Validator + Tests grün**

---

## 9. Agenten-Aufgabenstellung (Kurzform)

Wenn ein Agent ein Kapitel schreibt/erweitert:
- Erhöhe Szenenanzahl auf Zielbereich
- Erhöhe Choice-Dichte
- Erzeuge Immersion über sensorische Anker + Momente
- Halte Canon Rules ein
- Keine neuen State-Keys, keine Engine/UI-Änderungen
- Danach QA/Validator-Lauf

---

## 10. Do / Don't Kurzliste

### Do
- Wenige Figuren, starke Funktion
- Konkrete Details pro Absatz
- Foreshadowing statt Twist-Orgie
- Jede Choice hat spürbaren Preis

### Don't
- "Mystery" als Ausrede für fehlende Logik
- Choices, die nur den Text variieren
- Neue Variablen erfinden, weil es gerade passt
- 7 Kapitel schreiben, bevor Kapitel 1–2 Spaß machen

---

## Referenzen

- **Story Concept**: [NACHTZUG_19_CONCEPT.md](./NACHTZUG_19_CONCEPT.md)
- **State Model Details**: [CLAUDE.md](../CLAUDE.md#state-model-nachtzug-19)
- **Android Implementation**: [ANDROID_GUIDE.md](./ANDROID_GUIDE.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Version 2.0** | Konsolidiert: 2026-01-25

**Ersetzt**:
- NACHTZUG_19_RULES.md (v1)
- DECISION_SYSTEM.md
- MOBILE_PACING_RULES.md
- NACHTZUG_19_LENGTH_IMMERSION_SPEC.md
