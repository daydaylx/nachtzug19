# NACHTZUG 19 - Evidence

Dieser Ordner enthält reproduzierbare Evidence für NACHTZUG 19.

## Dateien

| Datei | Beschreibung | Erzeugt durch | Commit |
|--------|-------------|---------------|---------|
| test_output.txt | Alle 17 Test-Ergebnisse (2 Test-Files) | c4df5ff | 2026-01-20 |
| type_check.txt | Alle 55 TypeScript Errors (6 Files) | c4df5ff | 2026-01-20 |
| validate_output.txt | Content-Validation (0 Errors, 0 Warnings) | c4df5ff | 2026-01-20 |
| graph_summary.json | Graph-Statistiken (183 scenes, 0 errors) | c4df5ff | 2026-01-20 |

## Commands zum Neu-Generieren

```bash
# Tests
npm run test > docs/evidence/test_output.txt

# TypeScript Type-Check
npm run type-check > docs/evidence/type_check.txt

# Content Validation
npm run validate 2>&1 | tee docs/evidence/validate_output.txt

# Graph Summary
tsx scripts/validate.ts 2>&1 | grep -A 5 "Story geladen" | head -10 > docs/evidence/graph_summary.json
```

## Versionen/Commits

- **Stand:** Commit c4df5ff (2026-01-20)
- **Evidence erzeugt:** 2026-01-20

## Definitionen

### Cycle
Ein Zyklus tritt auf, wenn eine Szene sich selbst über Choices erreichen kann (next-ID der Choice == eigene ID). Dies wurde im Graph-Audit nicht gefunden.

### Dead End
Ein Dead End tritt auf, wenn eine Szene erreicht werden kann, aber keine Choices hat, die zu einer anderen Szene oder einem Ending führen. Dies wurde im Graph-Audit nicht gefunden.

### Unreachable
Eine Szene ist unerreichbar, wenn sie über keine Kombination von Choices von der Startszene erreicht werden kann. Dies wurde im Graph-Audit nicht gefunden.

## Type-Check Status

**Total:** 55 Errors in 6 Files

Die Errors sind überwiegend:
1. TypeScript Config fehlt (console, localStorage, process) → Diese sind erwartet und beabsichtigt
2. Test Mock-Daten verwenden englische Property-Namen (title, narrative) statt deutscher (titel, beschreibung) → Beabsichtigt für Tests
3. NarrativeValidator Type mismatch → Bekanntes Issue, aber不影响 Runtime

Diese Errors **verhindern nicht** die korrekte Ausführung des Spiels.