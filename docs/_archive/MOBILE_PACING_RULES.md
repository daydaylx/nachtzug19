# Mobile Pacing Rules (Nachtzug 19)

> **Oberste Prämisse:** Interaktion schlägt Text. Der Spieler ist kein Leser, er ist ein Teilnehmer.

## 1. Die Beat-Regel (Das Gesetz)
Eine Szene = ein Beat = **1 Gefühl + 1 konkrete Aktion**.

### Definition “Beat”
Ein Beat ist die kleinste spielbare Einheit, die sich abgeschlossen anfühlt.
*   **Gefühl:** Spannung / Neugier / Unsicherheit / Erleichterung / Schuld / Nähe
*   **Aktion:** Du entscheidest **jetzt** etwas (Choice/Micro-Action), nicht “später”.

### Die Beat-Formel (Immer gleich)
1.  **Hook (1 Satz):** “Was stimmt hier gerade nicht?” / Auslöser.
2.  **Detail (1–3 Sätze):** Ein Sinnesdetail (Ton/Licht/Geruch/Blick).
3.  **Konsequenz-Andeutung (1 Satz):** Was steht auf dem Spiel?
4.  **Aktion (Choice):** 2–4 Optionen, sofort klickbar.

## 2. Harte Limits (Anti-Roman)
*   **Max 6–10 Sätze pro Beat.** Danach MUSS eine Aktion kommen.
*   **Kein Scrollen:** Der Beat muss auf einen Bildschirm passen.
*   **Info nur mit Aktion:** Wenn du erklärst, musst du gleichzeitig entscheiden lassen.

## 3. Choice-Design
*   **Handlung vs. Reaktion:**
    *   Mindestens eine Option muss “Handlung” sein (z.B. hingehen, fragen, verstecken).
    *   Mindestens eine Option muss “Reaktion” sein (z.B. schweigen, bluffen, nachgeben).
*   **Callback:** Wenn eine Choice Effekte hat, ist ein späterer Callback verpflichtend.
*   **Tone Choices:** Erlaubt (leeres effects Array), wenn sie der Haltung dienen.

## 4. Micro-Actions (Gameplay Feel)
Statt langer Szenenübergänge nutze Micro-Actions:
*   “Horchen” → kurze Mini-Szene → neue Choice
*   “Ticket prüfen” → Mini-Reveal → neue Choice
*   “Augenkontakt halten” → Beziehungston → neue Choice

## 5. Beispiele

### ❌ SCHLECHT (E-Book Mode)
> Der Schaffner nähert sich. Er sieht bedrohlich aus. Du hast kein Ticket und erinnerst dich nicht, wo es ist. Du überlegst, was du tun sollst, während er näher kommt. [Weiter]

### ✅ GUT (Game Mode)
> Schritte. Schwer. Rhythmisch. (Hook)
>
> Der Schaffner schiebt sich in dein Sichtfeld. Seine Uniform wirkt wie eine zweite Haut, zu perfekt. Er starrt dich an. (Detail)
>
> Du hast kein Ticket. Und er weiß es. (Konsequenz)
>
> *[CHOICE: Blick standhalten]* (Reaktion)
> *[CHOICE: In die Taschen greifen]* (Handlung)