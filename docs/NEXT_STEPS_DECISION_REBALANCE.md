# Umbauplan: Entscheidungs-Neubalancierung

Basierend auf der Analyse von `export/story.json` (Stand: C1-C7 implementiert, aber "überladen" mit Effekten).

## Problem
Derzeit sind 100% der Choices "Gewichtet" (haben Effekte). Es gibt keine reinen "Stimmungs"-Choices (Tone). Dies führt zu einer Inflation von Stats (`tickets_truth` etc.) und entwertet wichtige Entscheidungen, da selbst banale Handlungen (z.B. "Uhrzeit nennen") Punkte geben. Zudem gibt es "Fake Choices", die mechanisch Klone sind.

---

## 1. Top-Kandidaten für "Stimmungs"-Umwandlung (Tone Conversion)

Diese Choices sollten ihre Stats (`effects`) verlieren und reine Flavor-Buttons werden. Sie beeinflussen die Story nur durch die Haltung des Spielers, nicht durch Werte.

**Kriterium:** Choices, die aktuell Teil einer "Fake Group" sind (gleiches Ziel, gleiche Effekte wie Nachbar). Wir degradieren eine davon zu Tone oder entfernen Effekte bei beiden, wenn die Szene nur Übergang ist.

### C1 (Bahnsteig & Zug)
1.  **Szene:** `c1_interlude_05_vibration`
    *   **Kandidat:** `echo_tone` ("Den Ton nachsprechen")
    *   *Aktion:* Entferne `inc tickets_truth` und `inc memory_drift`. Mache es zur reinen "Verrückt werden"-Flavor-Option ohne mechanischen Vorteil.
2.  **Szene:** `c1_s03_inside_train`
    *   **Kandidat:** `find_seat` ("Einfach einen Platz suchen")
    *   *Aktion:* Entferne alle Effekte. Das ist die "Standard"-Aktion. Nur `choose_door_seat` (spezifisch) sollte evtl. einen Effekt haben (z.B. Escape).
3.  **Szene:** `c1_s03a_corridor_walk`
    *   **Kandidat:** `follow_hum` ("Dem Summen folgen")
    *   *Aktion:* Entferne Effekte, falls `look_at_drawing` die "Investigative" Option ist.
4.  **Szene:** `c1_s04_sleepless_intro`
    *   **Kandidat:** `stay_silent` ("Nichts sagen")
    *   *Aktion:* Schweigen sollte oft "Stimmung/Tone" sein (neutral), statt Punkte zu geben.
5.  **Szene:** `c1_s05c_announcement_repeat`
    *   **Kandidat:** `repeat_word` vs `name_the_time`
    *   *Aktion:* Beide scheinen nur Flavor zu sein. Beide zu Tone machen.

### C4 (Spiegelungen / Glitch)
6.  **Szene:** `c4_interlude_02_announcement`
    *   **Kandidat:** `check_doors` ("Zu den Türen gehen")
    *   *Aktion:* Entferne Effekte. Reine Bewegung.
7.  **Szene:** `c4_s05_comp7_call`
    *   **Kandidat:** `go_to_wagen7`
    *   *Aktion:* Wenn das Ziel eh Wagen 7 ist, ist das hingehen der Standard (Tone). Nur `examine_ticket_evidence` (Zögern/Untersuchen) sollte Gewichtet sein.
8.  **Szene:** `c4_s07_reality_fracture`
    *   **Kandidat:** `remember_comp7`
    *   *Aktion:* Nur Flavor-Erinnerung? Wenn es keine Relation ändert, dann Tone.

---

## 2. Top "Fake Choices" zum Beheben (Differenzieren oder Entfernen)

Diese Gruppen sind technisch identisch (Gleiches Ziel, Gleiche Effekte).

| Szene ID | Choice A (Behalten/Gewichten) | Choice B (Ändern zu Tone/Diff) | Grund |
| :--- | :--- | :--- | :--- |
| `c1_interlude_05_vibration` | `reflect_on_vibration` | `echo_tone` | Identischer Output. |
| `c1_s03_inside_train` | `choose_door_seat` | `find_seat` | Sitzplatzwahl sollte neutral sein oder Escape vs. Neutral. |
| `c1_s03a_corridor_walk` | `look_at_drawing` | `follow_hum` | Visuell vs. Auditiv. Sollte unterschiedliche Stats geben oder eins Tone. |
| `c1_s04_sleepless_intro` | `deny` | `stay_silent` | Verleugnung vs. Stille. `deny` könnte `escape` geben, `silent` neutral. |
| `c1_s05c_announcement_repeat` | `name_the_time` | `repeat_word` | Beide geben vermutlich Truth/Drift. Redundant. |
| `c4_interlude_02_announcement` | `resist_temporal_shift` | `check_doors` | Widerstand (Wille/Wahrheit?) vs. Aktion. Sind derzeit gleich. |
| `c4_s05_comp7_call` | `examine_ticket_evidence` | `go_to_wagen7` | Untersuchen vs. Gehen. Untersuchen sollte Zeit kosten oder Info geben. |

---

## 3. Allgemeine Regeln für die Umstrukturierung

1.  **Die "Schweigen"-Regel:** Optionen wie "Schweigen", "Warten", "Zusehen" sollten standardmäßig **Tone** (keine Effekte) sein, es sei denn, Passivität ist explizit fatal oder hilfreich.
2.  **Die "Bewegungs"-Regel:** Entscheidungen, die nur den Raum wechseln ("Gehe zu X"), sollten keine Punkte geben, wenn es der einzige Weg ist.
3.  **Inflations-Kontrolle:** Reduziere die Anzahl der Choices, die `tickets_truth` geben. Wahrheit sollte man sich verdienen (durch investigative Choices), nicht durch bloßes "Weiterklicken".
