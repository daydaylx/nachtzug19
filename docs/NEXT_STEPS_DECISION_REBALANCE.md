# Umbauplan: Decision Rebalance

Basierend auf der Analyse von `export/story.json` (Stand: C1-C7 implementiert, aber "überladen" mit Effekten).

## Problem
Derzeit sind 100% der Choices "Weighted" (haben Effekte). Es gibt keine reinen "Tone"-Choices. Dies führt zu einer Inflation von Stats (`tickets_truth` etc.) und entwertet wichtige Entscheidungen, da selbst banale Handlungen (z.B. "Uhrzeit nennen") Punkte geben. Zudem gibt es "Fake Choices", die mechanisch Klone sind.

---

## 1. Top Candidates for "Tone" Conversion (Remove Effects)

Diese Choices sollten ihre Stats (`effects`) verlieren und reine Flavor-Buttons werden. Sie beeinflussen die Story nur durch die Haltung des Spielers, nicht durch Werte.

**Kriterium:** Choices, die aktuell Teil einer "Fake Group" sind (gleiches Ziel, gleiche Effekte wie Nachbar). Wir degradieren eine davon zu Tone oder entfernen Effekte bei beiden, wenn die Szene nur Übergang ist.

### C1 (Platform & Train)
1.  **Scene:** `c1_interlude_05_vibration`
    *   **Candidate:** `echo_tone` ("Den Ton nachsprechen")
    *   *Action:* Entferne `inc tickets_truth` und `inc memory_drift`. Mache es zur reinen "Verrückt werden"-Flavor-Option ohne mechanischen Vorteil.
2.  **Scene:** `c1_s03_inside_train`
    *   **Candidate:** `find_seat` ("Einfach einen Platz suchen")
    *   *Action:* Entferne alle Effekte. Das ist die "Standard"-Aktion. Nur `choose_door_seat` (spezifisch) sollte evtl. einen Effekt haben (z.B. Escape).
3.  **Scene:** `c1_s03a_corridor_walk`
    *   **Candidate:** `follow_hum` ("Dem Summen folgen")
    *   *Action:* Entferne Effekte, falls `look_at_drawing` die "Investigative" Option ist.
4.  **Scene:** `c1_s04_sleepless_intro`
    *   **Candidate:** `stay_silent` ("Nichts sagen")
    *   *Action:* Schweigen sollte oft "Tone" sein (neutral), statt Punkte zu geben.
5.  **Scene:** `c1_s05c_announcement_repeat`
    *   **Candidate:** `repeat_word` vs `name_the_time`
    *   *Action:* Beide scheinen nur Flavor zu sein. Beide zu Tone machen.

### C4 (Spiegelungen / Glitch)
6.  **Scene:** `c4_interlude_02_announcement`
    *   **Candidate:** `check_doors` ("Zu den Türen gehen")
    *   *Action:* Entferne Effekte. Reine Bewegung.
7.  **Scene:** `c4_s05_comp7_call`
    *   **Candidate:** `go_to_wagen7`
    *   *Action:* Wenn das Ziel eh Wagen 7 ist, ist das hingehen der Standard (Tone). Nur `examine_ticket_evidence` (Zögern/Untersuchen) sollte Weighted sein.
8.  **Scene:** `c4_s07_reality_fracture`
    *   **Candidate:** `remember_comp7`
    *   *Action:* Nur Flavor-Erinnerung? Wenn es keine Relation ändert, dann Tone.

---

## 2. Top "Fake Choices" to Fix (Differentiate or Prune)

Diese Gruppen sind technisch identisch (Same Next, Same Effects).

| Scene ID | Choice A (Keep/Weight) | Choice B (Change to Tone/Diff) | Grund |
| :--- | :--- | :--- | :--- |
| `c1_interlude_05_vibration` | `reflect_on_vibration` | `echo_tone` | Identischer Output. |
| `c1_s03_inside_train` | `choose_door_seat` | `find_seat` | Sitzplatzwahl sollte neutral sein oder Escape vs. Neutral. |
| `c1_s03a_corridor_walk` | `look_at_drawing` | `follow_hum` | Visuell vs. Auditiv. Sollte unterschiedliche Stats geben oder eins Tone. |
| `c1_s04_sleepless_intro` | `deny` | `stay_silent` | Verleugnung vs. Stille. `deny` könnte `escape` geben, `silent` neutral. |
| `c1_s05c_announcement_repeat` | `name_the_time` | `repeat_word` | Beide geben vermutlich Truth/Drift. Redundant. |
| `c4_interlude_02_announcement` | `resist_temporal_shift` | `check_doors` | Widerstand (Willpower/Truth?) vs. Action. Sind derzeit gleich. |
| `c4_s05_comp7_call` | `examine_ticket_evidence` | `go_to_wagen7` | Untersuchen vs. Gehen. Untersuchen sollte Zeit kosten oder Info geben. |

---

## 3. General Rules for Restructuring

1.  **The "Silence" Rule:** Optionen wie "Schweigen", "Warten", "Zusehen" sollten standardmäßig **Tone** (keine Effekte) sein, es sei denn, Passivität ist explizit fatal oder hilfreich.
2.  **The "Move" Rule:** Entscheidungen, die nur den Raum wechseln ("Gehe zu X"), sollten keine Punkte geben, wenn es der einzige Weg ist.
3.  **Inflation Control:** Reduziere die Anzahl der Choices, die `tickets_truth` geben. Truth sollte man sich verdienen (durch investigative Choices), nicht durch bloßes "Weiterklicken".
