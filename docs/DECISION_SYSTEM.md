# Entscheidungs-System: Gewichtet vs. Stimmung (Weighted vs. Tone)

## Zielsetzung
Das System unterscheidet strikt zwischen Entscheidungen, die den Spielzustand (State) verändern, und solchen, die nur die narrative Färbung (Flavor/Atmosphäre) beeinflussen. Dies verhindert "Fake Choices" (Schein-Entscheidungen), bei denen der Spieler Einfluss vermutet, aber technisch keiner existiert.

---

## A) GEWICHTETE Entscheidungen (Weighted)

Diese Entscheidungen haben mechanische Konsequenzen. Sie verändern den Status oder den Pfad.

### Kriterien (ODER)
1.  **Effekte:** Die Choice hat mindestens einen Eintrag im `effects`-Array (z.B. `tickets_truth +1`).
2.  **Verzweigung:** Die Choice führt zu einer *anderen* `next`-Szene als die Alternativen in derselben Szene.
3.  **Ende:** Die Choice führt direkt zu einem Ending.

### Unter-Typen
*   **Ticket-Choice:** Erhöht einen Ticket-Wert (Wahrheit/Flucht/Schuld/Liebe).
    *   *Beispiel:* `c1_s01_platform` -> `look_around` (Gibt `tickets_truth +1`).
*   **Druck-Choice (Pressure):** Verändert `conductor_attention` oder `memory_drift`.
    *   *Beispiel:* `c1_interlude_05_vibration` -> `steady_breath` (Senkt `conductor_attention`).
*   **Weichen-Choice (Gate):** Bestimmt den weiteren Pfad (Next Scene), ohne zwingend Stats zu ändern.

---

## B) STIMMUNGS-Entscheidungen (Tone)

Diese Entscheidungen dienen dem Rollenspiel und der Immersion. Sie erlauben dem Spieler, die *Haltung* des Protagonisten auszudrücken, ohne die *Handlung* zu ändern.

### Kriterien (UND)
1.  **Keine Effekte:** Das `effects`-Array ist leer.
2.  **Keine Verzweigung:** Führt zur selben `next`-Szene wie die Alternativen (oder ist die einzige Option).
3.  **Lokales Flair:** Der Unterschied liegt nur im Button-Text oder (zukünftig) in einer kurzen Text-Reaktion ("Micro-Branching", aktuell via `narrative_variants` im Folgeschritt möglich).

### Aktueller Status
*   **Ist-Zustand:** Aktuell gibt es **0** reine Stimmungs-Entscheidungen im Export. Fast jede Choice, selbst reine Flavor-Texte, vergeben Punkte (z.B. `tickets_truth`).
*   **Soll-Zustand:** Flavor-Entscheidungen sollen von mechanischem Ballast befreit werden.

---

## C) FAKE-Entscheidungen (Antipattern)

Entscheidungen, die suggerieren, unterschiedlich zu sein, aber technisch identisch sind. Diese müssen aufgelöst werden: Entweder zu **Stimmung/Tone** (entferne Stats) oder zu echt **Gewichtet/Weighted** (unterschiedliche Konsequenzen).

### Erkennungsmerkmal
*   Identische `next`-Szene.
*   Identische `effects` (oder beide keine).
*   Einziger Unterschied: `label` und evtl. `condition` (Sichtbarkeit).

### Beispiel (aus C1 Interlude 05)
*   Choice A: `reflect_on_vibration` -> Next: `c1_end_platform_look`, Effekt: `truth+1, drift+1`
*   Choice B: `echo_tone` -> Next: `c1_end_platform_look`, Effekt: `truth+1, drift+1`
*   **Diagnose:** Technisch identisch. Der Spieler wählt basierend auf Text, bekommt aber dasselbe Ergebnis.
*   **Lösung:** Eine der beiden zu "Stimmung/Tone" machen (keine Stats) oder differenzieren (z.B. Echo erhöht `drift` stärker, Reflect erhöht `truth` stärker).
