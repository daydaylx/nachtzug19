# NACHTZUG 19 - Story QA Audit

**Datum:** 20.01.2024
**Prüfer:** QA Agent Jules
**Umfang:** Story-Logik, Choice-Graph, State-Integrität, Engine-Parität

## 1. Executive Summary

**KRITISCHER FUND (P0):** Das Spiel ist in seinem aktuellen Zustand nicht gewinnbar. Die Enden "Wahrheit", "Schuld" und "Liebe" erfordern Ticket-Werte von $\ge 6$, aber die Engine (sowohl TS als auch Kotlin) begrenzt ("clampt") Ticket-Werte strikt auf ein Maximum von `5`. Spieler werden zwangsläufig immer in das "Flucht"-Ende oder einen Fallback-Status gezwungen.

**Status:**
- **Graph-Struktur:** Gesund (Keine Sackgassen, keine Zyklen, erreichbare Enden).
- **State/Logik:** KAPUTT (Clamping-Konflikt).
- **Content:** Generell hohe Qualität, minimal ungenutzte Targets.
- **Parität:** Hoch (TS und Kotlin teilen sich dieselbe Logik, inklusive des kritischen Bugs).

## 2. Projektfakten

- **Source of Truth:** `export/story.json` (Exportiert aus TS-Content)
- **Szenen-Anzahl:** 183
- **Ending-Anzahl:** 6
- **Kapitel:** 7
- **Zentraler State:** Tickets (4 Typen), Pressure (2 Typen), Relations (3 Typen), Items (3 Flags)
- **Engines:** TypeScript (Web/Dev) & Kotlin (Android)

## 3. Graph-Metriken

- **Max Out Degree:** 4 Auswahlmöglichkeiten
- **Unerreichbare Szenen:** 0
- **Sackgassen (Dead Ends):** 0
- **Zyklen:** 0 erkannt
- **Notiz:** Die Graph-Struktur ist außergewöhnlich sauber.

## 4. Top Findings (Priorisiert)

### [P0] ENGINE-001: Enden unerreichbar durch Ticket-Clamping

**Symptom:** Spieler, die perfekt für einen bestimmten Pfad (Wahrheit/Schuld/Liebe) spielen, können im Kapitel 7 das entsprechende Ende nicht auswählen.
**Ursache (Root Cause):**
- Content (`c7.ts`) verlangt `tickets_truth >= 6`.
- Engine (`gameEngine.ts` / `GameEngine.kt`) erzwingt `tickets_truth` auf `Math.min(5, value)`.
**Beleg (Evidence):**
*src/content/nachtzug19/scenes/c7.ts:400*
```typescript
        condition: {
          type: 'compare',
          target: 'tickets_truth',
          operator: '>=',
          value: 6
        },
```
*src/domain/engine/gameEngine.ts:160*
```typescript
  state.tickets.tickets_truth = Math.max(0, Math.min(5, state.tickets.tickets_truth));
```
**Lösung (Fix):** Clamp-Limit in der Engine auf 10+ erhöhen ODER Content-Anforderung auf 5 senken.

### [P2] CHOICE-001: Illusions-Entscheidung in Kapitel 4

**Symptom:** Zwei Entscheidungen führen zum exakt gleichen Ergebnis ohne narrativen Unterschied, wodurch der Spieler das Gefühl hat, seine Wahl sei bedeutungslos.
**Ort:** `c4_s05_comp7_call`
**Beleg (Evidence):**
- Wahl `go_to_wagen7`: `next: 'c4_s05a_wagen7_changed'`, Effekt: `truth+1, rel_comp7+1`
- Wahl `examine_ticket_evidence`: `next: 'c4_s05a_wagen7_changed'`, Effekt: `truth+1, rel_comp7+1` (benötigt `truth>=6`)
**Analyse:** Die zweite Wahl ist eine "Belohnungs"-Option (gesperrt durch Condition), liefert aber exakt dasselbe Ergebnis wie die Standard-Option. Sie sollte idealerweise einen stärkeren Effekt oder eine andere narrative Variante in der Folgeszene haben.

### [P3] STATE-001: Ticket-Inflation

**Symptom:** Ticket-Anzahl erreicht in einem typischen Durchlauf 100-200 (wenn ungeclampt), was jede Prüfung auf 6 trivialisiert.
**Ursache (Root Cause):** Loops oder wiederholtes Gewähren von Tickets ohne Obergrenzen (Caps), oder einfach zu hohe Frequenz an Belohnungen.
**Beleg (Evidence):** Simulator-Lauf "Wahrheit-Pfad" erreichte 201 Wahrheit-Tickets (ungeclampt).
**Lösung (Fix):** Ticket-Ökonomie rebalancieren. Wenn Prüfungen auf spezifische Schwellenwerte erfolgen, sicherstellen, dass das erreichbare Maximum vernünftig ist (z.B. 20-30), nicht 200.

## 5. Issues Liste

| ID | Schweregrad | Kategorie | Beschreibung |
|----|-------------|-----------|--------------|
| **ENGINE-001** | **P0** | Logik | **Ticket-Clamping verhindert Enden.** Engine deckelt Tickets bei 5, Content verlangt 6. |
| **CHOICE-001** | P2 | Content | **Illusions-Wahl in C4.** `c4_s05_comp7_call` bietet identische Ergebnisse. |
| **STATE-001** | P3 | Balance | **Ticket-Inflation.** Ungeclampte Werte erreichen 200+, was Schwellenwerte trivial macht, falls Clamping korrigiert wird. |
| **STATE-002** | P3 | Sauberkeit| **Ungenutzte Engine-Meta.** `chapter_index`, `station_count` werden geschrieben aber in Content-Conditions nicht gelesen (nur intern genutzt). Akzeptabel. |

## 6. Fix Roadmap

### Phase 1: Kritische Fixes (Sofort)

**1. Fix Ticket-Clamping (ENGINE-001)**
- **Datei:** `src/domain/engine/gameEngine.ts` UND `android-native/.../GameEngine.kt`
- **Aktion:** `.min(5, ...)` ändern zu `.min(100, ...)` oder passendem Max-Wert.
- **Verifizieren:** Testfall ausführen, bei dem Tickets über 6 steigen.

### Phase 2: Feinschliff (Nächstes Release)

**2. Illusions-Wahl auflösen (CHOICE-001)**
- **Datei:** `src/content/nachtzug19/scenes/c4.ts`
- **Aktion:** Eine `narrative_variant` in `c4_s05a_wagen7_changed` hinzufügen, die `history` oder ein Flag prüft, falls der Spieler `examine_ticket_evidence` gewählt hat. Oder einen signifikanten Bonus-Effekt hinzufügen (z.B. `wissen + 1`).

**3. Balance Review**
- **Aktion:** Ticket-Ökonomie überprüfen. Wenn 200 Tickets möglich sind, sind Schwellenwerte von 6 sinnvoll? Schwellenwerte skalieren oder Ticket-Quellen reduzieren.

## Anhang

### Beleg-Dateien (Evidence)
- `reports/evidence/05_test.txt`: Unit-Tests bestehen (decken aber Integration hoher Ticket-Zahlen nicht ab).
- `reports/evidence/06_export_story.txt`: Export erfolgreich.
- `reports/graph_dump.json`: Vollständige Graph-Analyse.
- `reports/path_playthroughs.md`: Simulierte Durchlauf-Logs (zeigen das Inflations-Problem).
- `reports/state_audit.json`: Analyse der State-Nutzung.

### Limitierungen
- Der Simulator (`scripts/simulate_playthrough.mjs`) nutzte **nicht** die Engine-Logik (`autoClamp`), weshalb die "Inflation" sichtbar wurde, aber der "Unreachable Ending" Bug erst durch Code-Review entdeckt wurde. Das unterstreicht die Wichtigkeit von Code-Audits neben Blackbox-Testing.
