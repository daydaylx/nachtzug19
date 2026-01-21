# Decision System: Weighted vs. Tone

## Zielsetzung
Das System unterscheidet strikt zwischen Entscheidungen, die den Spielzustand (State) verändern, und solchen, die nur die narrative Färbung (Flavor) beeinflussen. Dies verhindert "Fake Choices", bei denen der Spieler Einfluss vermutet, aber technisch keiner existiert.

---

## A) WEIGHTED Decisions (Gewichtet)

Diese Entscheidungen haben mechanische Konsequenzen. Sie verändern den State oder den Pfad.

### Kriterien (OR)
1.  **Effects:** Die Choice hat mindestens einen Eintrag im `effects`-Array (z.B. `tickets_truth +1`).
2.  **Branching:** Die Choice führt zu einer *anderen* `next`-Szene als die Alternativen in derselben Szene.
3.  **Ending:** Die Choice führt direkt zu einem Ending.

### Sub-Typen
*   **Ticket-Choice:** Erhöht einen Ticket-Wert (Truth/Escape/Guilt/Love).
    *   *Beispiel:* `c1_s01_platform` -> `look_around` (Gibt `tickets_truth +1`).
*   **Pressure-Choice:** Verändert `conductor_attention` oder `memory_drift`.
    *   *Beispiel:* `c1_interlude_05_vibration` -> `steady_breath` (Senkt `conductor_attention`).
*   **Gate-Choice:** Bestimmt den weiteren Pfad (Next Scene), ohne zwingend Stats zu ändern (reine Weiche).

---

## B) TONE Decisions (Flavor/Atmosphäre)

Diese Entscheidungen dienen dem Roleplay und der Immersion. Sie erlauben dem Spieler, die *Haltung* des Protagonisten auszudrücken, ohne die *Handlung* zu ändern.

### Kriterien (AND)
1.  **No Effects:** Das `effects`-Array ist leer.
2.  **No Branching:** Führt zur selben `next`-Szene wie die Alternativen (oder ist die einzige Option).
3.  **Local Flavor:** Der Unterschied liegt nur im Button-Text oder (zukünftig) in einer kurzen Text-Reaktion ("Micro-Branching", aktuell via `narrative_variants` im Folgeschritt möglich, wenn auf History zugegriffen würde – aktuell im JSON aber meist über State gelöst).

### Aktueller Status
*   **Ist-Zustand:** Aktuell gibt es **0** reine Tone-Decisions im Export. Fast jede Choice, selbst reine Flavor-Texte, vergeben Punkte (z.B. `tickets_truth`).
*   **Soll-Zustand:** Flavor-Entscheidungen sollen von mechanischem Ballast befreit werden.

---

## C) FAKE Decisions (Antipattern)

Entscheidungen, die suggerieren, unterschiedlich zu sein, aber technisch identisch sind. Diese müssen aufgelöst werden: Entweder zu **Tone** (entferne Stats) oder zu echt **Weighted** (unterschiedliche Konsequenzen).

### Erkennungsmerkmal
*   Identische `next`-Szene.
*   Identische `effects` (oder beide keine).
*   Einziger Unterschied: `label` und evtl. `condition` (Sichtbarkeit).

### Beispiel (aus C1 Interlude 05)
*   Choice A: `reflect_on_vibration` -> Next: `c1_end_platform_look`, Effect: `truth+1, drift+1`
*   Choice B: `echo_tone` -> Next: `c1_end_platform_look`, Effect: `truth+1, drift+1`
*   **Diagnose:** Technisch identisch. Der Spieler wählt basierend auf Text, bekommt aber dasselbe Ergebnis.
*   **Lösung:** Eine der beiden zu "Tone" machen (keine Stats) oder differenzieren (z.B. Echo erhöht `drift` stärker, Reflect erhöht `truth` stärker).
