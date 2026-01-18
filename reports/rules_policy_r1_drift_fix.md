# Policy-Fix: R1 (Drift nach Station)

## Problem

**Doppelte Inkrementierung von memory_drift bei jeder Station**

### Ursache

Alle station_end Szenen (c1-c7) haben:
1. Das Tag `station_end` → Engine führt R1 automatisch aus: `memory_drift += 1`
2. `exit_effects` mit `memory_drift += 1` → Führt zu weiterer Erhöhung

**Ergebnis:** memory_drift steigt um +2 pro Station statt +1

### Regel R1 (aus NACHTZUG_19_RULES.md)

> R1: Drift steigt nach jeder Station.
> memory_drift: 0-6 (je höher, desto mehr Drift-Textvarianten)

## Lösung

### Option A: exit_effects entfernen (EMPFOHLEN)

Entferne alle `exit_effects` mit `memory_drift` aus station_end Szenen.

**Begründung:**
- R1 ist eine Canon Rule, die von der Engine automatisch ausgeführt werden sollte
- Das Tag `station_end` reicht als Auslöser
- Content sollte nicht manuell Effekte setzen, die Engine-Regeln verdoppeln

**Vorteile:**
- Saubere Trennung: Engine steuert Canon Rules, Content steuert Story
- Vermeidet Doppel-Zählung
- Einfacher für zukünftige Changes (nur an einer Stelle)

**Umsetzung:**
In den betroffenen Dateien (c1.ts, c2.ts, c3.ts, c4.ts, c5.ts, c6.ts, c7.ts), entferne:

```typescript
// Von station_end Szenen entfernen:
exit_effects: [
  { type: 'inc', target: 'memory_drift', value: 1 }
]
```

### Option B: Engine-R1 deaktivieren (NICHT EMPFOHLEN)

Entferne die automatische Erhöhung in `gameEngine.ts`.

**Nachteil:**
- Zerstört Canon Rule System
- Content-Setter müssten R1 manuell einbauen
- Weniger maintainable

**Begründung gegen Option B:**
- Canon Rules sollten Engine-Logik sein, nicht Content-Logik
- Wenn R1 deaktiviert wird, müssen alle station_end Szenen manuell Effects hinzufügen
- Führt zu Inkonsistenz und Fehleranfälligkeit

## Betroffene Dateien

- src/content/nachtzug19/scenes/c1.ts: `c1_end_station`
- src/content/nachtzug19/scenes/c2.ts: `c2_end_station`
- src/content/nachtzug19/scenes/c3.ts: `c3_end_station`
- src/content/nachtzug19/scenes/c4.ts: `c4_end_station`
- src/content/nachtzug19/scenes/c5.ts: `c5_end_station`
- src/content/nachtzug19/scenes/c6.ts: `c6_end_station`
- src/content/nachtzug19/scenes/c7.ts: `c7_end_station`

## Validierung

Nach Fix:
- memory_drift wird nur einmal pro Station erhöht (+1)
- Engine-R1 bleibt intakt
- Content bleibt sauber (keine redundanten Effects)

## Empfehlung

**Implementiere Option A** - Entferne exit_effects mit memory_drift aus allen station_end Szenen.