# Policy-Fix: R1 (Drift nach Station)

## Problem

**Historisch doppelte Drift-Inkrementierung + inkonsistente Content-Pattern**

### Ursache (historisch)

1. Tag `station_end` → Engine führt R1 automatisch aus: `memory_drift += 1`
2. `exit_effects` mit `memory_drift += 1` → führte zu doppelter Erhöhung

Zusätzlich setzten station_end-Choices teils `memory_drift`/`station_count` manuell, teils nicht. Das erzeugte Doku-Inkonsistenzen, obwohl die Engine manuelle Effekte als Override behandelt.

### Regel R1 (aus NACHTZUG_19_RULES.md)

> R1: Drift steigt nach jeder Station.
> memory_drift: 0-6 (je höher, desto mehr Drift-Textvarianten)

## Lösung

### Option A: station_end-Effects bereinigen (EMPFOHLEN)

1) Entferne alle `exit_effects` mit `memory_drift` aus station_end Szenen.  
2) Entferne manuelle `memory_drift`/`station_count`-Effects aus Standard-Choices (nur explizite Overrides behalten).

**Begründung:**
- R1 ist eine Canon Rule, die von der Engine automatisch ausgeführt werden sollte
- Das Tag `station_end` reicht als Auslöser
- Content sollte nicht manuell Effekte setzen, die Engine-Regeln verdoppeln

**Vorteile:**
- Saubere Trennung: Engine steuert Canon Rules, Content steuert Story
- Vermeidet Doppel-Zählung
- Einfacher für zukünftige Changes (nur an einer Stelle)

**Umsetzung:**
In den betroffenen Dateien (c1.ts–c7.ts), entferne:

```typescript
// Von station_end Szenen entfernen (exit_effects):
exit_effects: [
  { type: 'inc', target: 'memory_drift', value: 1 }
]
```

Zusätzlich: station_end-Choices sollten keine `memory_drift`/`station_count` setzen,
außer wenn eine explizite Abweichung gewollt ist (Override).

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
- memory_drift wird standardmäßig nur einmal pro Station erhöht (+1)
- Engine-R1 bleibt intakt; manuelle Overrides sind explizit
- Content bleibt sauber (keine redundanten station_end-Effects)

## Empfehlung

**Implementiere Option A** - exit_effects entfernen + station_end-Choice-Effects standardisieren.
