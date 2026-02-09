# UI/Engine Parity Recovery

Datum: 2026-02-09
Status: behoben

## Problem
`EngineParityTest` war rot mit:
- erwartete Szene: `c2_end_station`
- aktuelle Szene: `c2_control_01_aftertalk`

Ursache:
- Golden-Master-Trace (`docs/evidence/trace_golden_master.json`) war nicht mehr im Sync mit dem aktuellen Story-Stand.

## Behebung
1. Golden-Traces neu generiert auf Basis des aktuellen Story-Bundles:
- `npx tsx scripts/generate_test_trace.ts`
2. `docs/evidence/trace_golden_master.json` aktualisiert.
3. Parity-Test erneut ausgefuehrt.

## Verifikation
- `./gradlew :app:testDebugUnitTest --tests "de.daydaylx.nachtzug19.engine.EngineParityTest"`
- Ergebnis: erfolgreich.

## Bewertung
Ja, der Drift war problematisch, weil er CI/Regression-Checks unzuverlaessig macht.
Er ist jetzt konkret behoben und wieder als harter Regression-Check nutzbar.
