# Plan: Graph-Claims Verifizierung im Master Report

## Ziel
Verifiziere die Graph-Claims im Master Report und korrigiere sie ggf. durch Erstellung eines Graph-Dump-Skripts.

## Definitionen

### Dead End
Eine Szene ist ein **Dead End**, wenn:
- Sie keine ausgehenden Choices hat (leeres `choices`-Array)
- UND sie kein Ending ist (nicht in der `endings`-Liste des Manifests)

### Cycle
Ein **Cycle** liegt vor, wenn:
- Eine Szene über eine Kette von Choices wieder zu sich selbst zurückkehren kann
- SCC (Strongly Connected Component) mit Größe > 1
- Self-Loops (Scene → Scene direkt) werden ebenfalls als Cycles erfasst

### Unreachable Scene
Eine Szene ist **unreachable**, wenn sie von der Startszene (`c1_s01_platform`) aus über keine Kombination von Choices erreicht werden kann.

## Aufgaben

### 1. Skript `scripts/graph_dump.mjs` erstellen

**Technologie**: Node.js mit nativen Modulen (`fs`, `path`)

**Funktionalität**:
- `story.json` laden aus `android-native/app/src/main/assets/story.json`
- Alle Szenen und Choices analysieren
- Graph-Struktur aufbauen:
  - Nodes = Szenen (Scene IDs)
  - Edges = Choices (next-Referenzen)
- Unreachable scenes finden (BFS/DFS von Startszene)
- Dead ends finden (Scene ohne ausgehende Choices UND kein Ending)
- Cycles finden (SCC Detection mit Tarjan-Algorithmus)
- Ergebnisse als JSON speichern

**Algorithmus für SCC Detection (Tarjan)**:
1. Index-Array initialisieren
2. Lowlink-Array initialisieren
3. Stack für DFS initialisieren
4. Für jeden unbesuchten Knoten:
   - Strongconnect ausführen
   - SCCs mit Größe > 1 als Cycles speichern

**Output-Format**:
```json
{
  "generated_at": "2026-01-20",
  "source_file": "android-native/app/src/main/assets/story.json",
  "graph_stats": {
    "total_scenes": 183,
    "total_endings": 6,
    "total_choices": <Anzahl aller Choices>,
    "total_edges": <Anzahl aller Edges>,
    "reachable_scenes": <Anzahl erreichbarer Szenen>,
    "unreachable_scenes": [<Liste unerreichbarer Szenen>],
    "dead_ends": [<Liste von Dead End Szenen>],
    "cycles": [
      {
        "size": <Größe>,
        "scenes": [<Liste der Szenen im Cycle>]
      }
    ]
  },
  "definitions": {
    "dead_end": "Eine Szene ist ein Dead End, wenn sie keine ausgehenden Choices hat UND kein Ending ist.",
    "cycle": "Ein Cycle liegt vor, wenn eine Szene über eine Kette von Choices wieder zu sich selbst zurückkehren kann (SCC mit Größe > 1).",
    "unreachable": "Eine Szene ist unreachable, wenn sie von der Startszene aus nicht erreicht werden kann."
  }
}
```

### 2. `graph_dump.json` in `docs/evidence/` schreiben

- Die existierende `graph_summary.json` wird ersetzt
- Pfad: `docs/evidence/graph_dump.json`

### 3. `docs/MASTER_REPORT.md` aktualisieren

**Änderungen**:

#### A. "Graph Metrics" Sektion aktualisieren (Zeile ~20-23)

Aktuell:
```markdown
- **Content Validation:** ✅ PASS — 0 Errors, 0 Warnings
  - 183 Scenes geladen
  - 6 Endings defined
  - Graph integrity: Alle Szenen erreichbar (Validator bestätigt 0 Errors, 0 Warnings)
```

Neu (mit Inline-Snippet):
```markdown
- **Content Validation:** ✅ PASS — 0 Errors, 0 Warnings
  - 183 Scenes geladen
  - 6 Endings defined
  - Graph integrity: Alle Szenen erreichbar (Validator bestätigt 0 Errors, 0 Warnings)
  
  **Graph Metrics** (aus `docs/evidence/graph_dump.json`):
  - Total Scenes: 183
  - Total Choices: <Anzahl>
  - Total Edges: <Anzahl>
  - Reachable Scenes: <Anzahl>
  - Unreachable Scenes: <Anzahl>
  - Dead Ends: <Anzahl>
  - Cycles: <Anzahl>
```

#### B. Definitionen hinzufügen (neue Sektion nach "Graph Metrics")

```markdown
### Definitionen

**Dead End**: Eine Szene ist ein Dead End, wenn sie keine ausgehenden Choices hat UND kein Ending ist. Der Spieler kann nicht weitermachen.

**Cycle**: Ein Cycle liegt vor, wenn eine Szene über eine Kette von Choices wieder zu sich selbst zurückkehren kann (Strongly Connected Component mit Größe > 1). Dies kann zu Endlosschleifen führen.
```

#### C. Top 5 SCCs auflisten (falls Cycles existieren)

```markdown
**Gefundene Cycles** (Top 5 nach Größe):
1. SCC mit <N> Szenen: [<Liste der Scene IDs>]
2. SCC mit <N> Szenen: [<Liste der Scene IDs>]
3. SCC mit <N> Szenen: [<Liste der Scene IDs>]
4. SCC mit <N> Szenen: [<Liste der Scene IDs>]
5. SCC mit <N> Szenen: [<Liste der Scene IDs>]
```

Wenn keine Cycles gefunden wurden:
```markdown
**Gefundene Cycles**: Keine Cycles gefunden.
```

#### D. Hinweis in Zeile 389 aktualisieren

Aktuell:
```markdown
Anmerkung: Dead-Ends/Cycles sind im aktuellen Validator nicht implementiert. Aussage "0 dead ends" ist daher ohne detaillierten Graph-Dump nicht verifizierbar.
```

Neu:
```markdown
Anmerkung: Graph-Dump wurde mit `scripts/graph_dump.mjs` generiert. Siehe `docs/evidence/graph_dump.json` für detaillierte Metriken.
```

### 4. Testlauf des Skripts durchführen

```bash
node scripts/graph_dump.mjs
```

Überprüfen:
- JSON ist gültig
- Alle Werte sind plausibel
- Datei wurde korrekt erstellt

## Ausführung

1. Skript erstellen (Code Mode)
2. Testlauf durchführen
3. Master Report aktualisieren
4. Ergebnisse verifizieren

## Erwartete Ergebnisse

Basierend auf der Analyse der `story.json`:
- **Total Scenes**: 183 (bestätigt)
- **Total Endings**: 6 (bestätigt)
- **Total Choices**: ~400-500 (geschätzt basierend auf durchschnittlich 2-3 Choices pro Scene)
- **Total Edges**: ~400-500 (jede Choice ist eine Edge)
- **Reachable Scenes**: Sollte 183 sein (alle Szenen erreichbar)
- **Unreachable Scenes**: Sollte 0 sein (Validator bestätigt 0 Errors)
- **Dead Ends**: Sollte 0 sein (alle Szenen haben Choices oder sind Endings)
- **Cycles**: Unbekannt (muss durch Skript ermittelt werden)

## Abhängigkeiten

- Node.js installiert
- `android-native/app/src/main/assets/story.json` existiert
- `docs/evidence/` Verzeichnis existiert
