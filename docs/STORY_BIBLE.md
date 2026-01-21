# NACHTZUG 19 - Story Bible

## 1. Kapitelübersicht

Zusammenfassung der Struktur basierend auf dem `export/story.json` (Single Source of Truth).

*   **C1: Leerer Bahnsteig (24 Szenen)**
    *   Einstieg am leeren, surrealen Bahnsteig.
    *   Begegnung mit der "Schlaflosen" Gestalt (Sleepless).
    *   Erste Anomalien (Vibration, Zeitstillstand).
    *   Betreten des Zuges.

*   **C2: Die erste Kontrolle (25 Szenen)**
    *   Der Schaffner (Conductor) und die Ticket-Kontrolle.
    *   Begegnung mit dem Kassettenjungen (Boy) und dem Rekorder.
    *   Erste Hinweise auf "Comp7" (Abteil 7).

*   **C3: Wagen 7 (27 Szenen)**
    *   Untersuchung von Wagen 7.
    *   Fund von Notizbüchern und Hinweisen.
    *   Realitätsverschiebungen (Drift).

*   **C4: Spiegelungen (27 Szenen)**
    *   Spiegelbilder, die nicht passen.
    *   Erinnerungsfragmente.
    *   Verstärkter "Memory Drift".

*   **C5: [Titel ausstehend] (25 Szenen)**
    *   Rückkehr zu Abteil 7.
    *   Konfrontation mit der eigenen Rolle.
    *   Entscheidungskern ("Core Decision").

*   **C6: [Titel ausstehend] (26 Szenen)**
    *   Auflösung der Realität.
    *   Spiegel-Choice und das "Angebot".
    *   Finale Fahrt.

*   **C7: [Titel ausstehend] (29 Szenen)**
    *   Ankunft am Ziel (oder Nicht-Ziel).
    *   Finale Konfrontation mit Conductor/Comp7.
    *   Enden.

## 2. Kanon (Canon)

### Figuren (Entities)
*   **The Conductor (Der Schaffner):** Antagonist/Wächter. Reagiert auf `conductor_attention`.
*   **Comp7 (Der Reisende in Abteil 7):** Mysteriöse Schlüsselfigur. Status: `rel_comp7`.
*   **The Boy (Kassettenjunge):** Träger von Erinnerungen. Status: `rel_boy`.
*   **The Sleepless (Der Schlaflose):** Warnende Gestalt am Anfang. Status: `rel_sleepless`.

### Schlüsselgegenstände (Key Items)
*   **Recorder:** Kassettenrekorder, erlaubt das Abspielen von Erinnerungen. (`has_recorder`)
*   **Tag19:** Ein Etikett/Hinweis mit der Aufschrift "19". Wichtiges Indiz. (`has_tag19`)
*   **Photo Anomaly:** Ein Foto, das sich verändert oder etwas Unmögliches zeigt. (`photo_anomaly`)

## 3. Status-Verzeichnis (State Index)

Analyse basierend auf `export/story.json`.

### Status-Kategorien
*   **Tickets (0-5):** Narrative Währung für Enden.
    *   `tickets_truth` (Wahrheit suchen)
    *   `tickets_escape` (Flucht/Vermeidung)
    *   `tickets_guilt` (Schuld/Verantwortung)
    *   `tickets_love` (Verbindung)
*   **Pressure (Druck/Chaos) (0-6):** Systemdruck.
    *   `conductor_attention` (Gefahr durch Schaffner)
    *   `memory_drift` (Realitätsverlust, steuert Textvarianten)
*   **Relations (Beziehungen) (-2 bis +4):** NPC-Beziehungen.
    *   `rel_comp7`
    *   `rel_boy`
    *   `rel_sleepless`

### Verwendungs-Matrix (Usage Matrix)

| Variable | Typ | Orte (Schreiben) | Orte (Lesen) |
| :--- | :--- | :--- | :--- |
| **memory_drift** | Pressure | C1-C7 (div. Choices) | **Hoch** (Narrative Varianten, Bedingungen) |
| **conductor_attention** | Pressure | C1-C7 | Mittel (Events) |
| **tickets_truth** | Ticket | Hoch | Hoch (Schaltet Wahrheits-Pfade frei) |
| **tickets_escape** | Ticket | Hoch | Mittel |
| **tickets_guilt** | Ticket | Hoch | Niedrig |
| **tickets_love** | Ticket | Hoch | Niedrig |
| **rel_comp7** | Relation | C2, C3, C5, C6 | Hoch (Endgame) |
| **rel_boy** | Relation | C2, C3, C5 | Mittel |
| **rel_sleepless** | Relation | C1, C2, C5 | Niedrig |
| **has_tag19** | Item | C4, C6 | C4, C6, C7 |
| **has_recorder** | Item | C2 | C3, C4, C6, C7 |
| **photo_anomaly** | Item | C5 | C7 |

### Auffälligkeiten (Anomalies)
*   **Set-Only Variables:** `chapter_index`, `station_count`. Werden gesetzt, aber im Story-Flow (JSON) nie für Verzweigungen abgefragt. Dienen vermutlich nur der UI/Meta-Logik.
