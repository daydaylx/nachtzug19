# STORY REVISION BASELINE (2026-02-20)

## Scope

Große Story-Revision mit Priorität **Spielbarkeit zuerst**, ohne Canon-Bruch (R1-R4).

## Objektiver Ist-Stand

- `npm run validate`: **0 Errors, 0 Warnings**
- Aktueller Umfang: **201 Szenen, 5 Endings**
- Startszene: `c1_hub_platform`
- Kapitelzählung (Szenen): C1=20, C2=23, C3=22, C4=21, C5=31, C6=29, C7=55

## Hauptprobleme vor Revision

1. Veraltete Tools erzeugen falsche Diagnosen
- Stale Start-ID (`c1_s01_platform`) in älteren Audit-/Simulation-Skripten
- Veraltete Heuristiken (z.B. Ticket-Clamp-Annahmen), dadurch irreführende Coverage-/Ending-Berichte

2. Flow-Risiko in Hub-Sequenzen
- K1-Hubs waren stark auf Auto-Transitions angewiesen
- In nicht-kanonischen Tools/Clients führte das zu Loop-Eindruck statt klarer Progression

3. Choice-UX in Endings
- Mehrere finale Choices waren generisch beschriftet (`Weiter`, `Ende`) statt inhaltlich konkret

## Revisionsziele (Abnahme)

1. Tooling
- Simulation/Audit nutzt aktuellen Engine-State und aktuelle Startszene.
- Keine Falschmeldungen durch alte IDs oder unvollständige Target-Mappings.

2. K1-Spielbarkeit
- Hub-Progression hat explizite Vorwärts-Optionen zusätzlich zu Auto-Transitions.
- Cautious/Bold-Haltung ist zeitnah im Narrativ sichtbar.

3. Finale Lesbarkeit
- Ending-Choices sind kontextuell benannt und nicht nur generisch.

4. Konsistenz
- Android-Fallback, Tests und Beispiele zeigen die aktuelle Startszene.
