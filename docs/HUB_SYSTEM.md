# Hub-System - Entwickler-Dokumentation

## Übersicht

Das **Hub-System** ermöglicht freie Exploration innerhalb einer Szene mit automatischen Übergängen basierend auf Spieler-Fortschritt. Implementiert in Kapitel 1 (Bahnsteig & Zug).

## Konzept

Ein **Hub** ist eine Szene, die:
1. Mehrere interaktive "Hotspots" als Choices anbietet
2. Nach jeder Interaction zum Hub zurückkehrt
3. Progressive Narrative-Änderungen basierend auf einem Counter zeigt
4. Automatisch zur nächsten Szene übergeht, wenn eine Schwelle erreicht wird

## Implementierung

### 1. State-Variablen

Jeder Hub benötigt:
- **Counter** (Pressure): Zählt Interaktionen (z.B. `hub_investigations`, `train_explorations`)
- **Flags** (Items): Trackt welche Hotspots bereits besucht wurden (z.B. `investigated_board`)

```typescript
// In types/index.ts
export type Pressure = {
  hub_investigations: number;  // 0-6
  train_explorations: number;  // 0-4
  // ...
};

export type Items = {
  investigated_board: boolean;
  investigated_poster: boolean;
  // ... eine Flag pro Hotspot
};
```

### 2. Hub-Szene Struktur

```typescript
'c1_hub_platform': {
  id: 'c1_hub_platform',
  chapter: 1,
  title: 'Bahnsteig',
  
  // Base narrative (wird überschrieben durch Varianten)
  narrative: `Leerer Bahnsteig. 23:47 Uhr.`,
  
  // Progressive Varianten basierend auf Counter
  narrative_variants: [
    {
      condition: { type: 'compare', target: 'hub_investigations', operator: '>=', value: 2 },
      narrative: `Der Bahnsteig fühlt sich anders an. Enger. Beobachtet.`,
      priority: 10
    },
    // AUTO-TRANSITION: Trigger nach 3 Investigations
    {
      condition: { type: 'compare', target: 'hub_investigations', operator: '>=', value: 3 },
      narrative: `Ein tiefes Brummen. Der Zug gleitet in den Bahnhof.`,
      auto_next: 'c1_event_train_arrival',  // ← Automatischer Übergang!
      priority: 20  // Höchste Priorität
    }
  ],
  
  // Hotspot-Choices
  choices: [
    {
      id: 'investigate_board',
      label: 'Die Anzeigetafel',
      // Nur anzeigen wenn noch nicht untersucht
      condition: { type: 'bool', target: 'investigated_board', value: false },
      effects: [
        { type: 'inc', target: 'hub_investigations', value: 1 },
        { type: 'set', target: 'investigated_board', value: true }
      ],
      next: 'c1_inv_board'  // → Investigation-Szene
    },
    // ... weitere Hotspots
  ],
  
  tags: ['hub']  // Markiert als Hub (erlaubt mehr als 5 Choices)
}
```

### 3. Investigation-Szene Struktur

Jede Investigation-Szene folgt dem Pattern:
1. **Hook** - Ziehe Aufmerksamkeit
2. **Detail** - Beschreibe was der Spieler sieht
3. **Discovery** - Enthülle etwas Neues
4. **Return** - Kehre zum Hub zurück

```typescript
'c1_inv_board': {
  id: 'c1_inv_board',
  chapter: 1,
  title: 'Anzeigetafel',
  narrative: `Die Anzeigetafel klackt mechanisch. 23:47. 23:47. 23:47.
  
Immer wieder dieselbe Uhrzeit. Die Ziffern sind scharf, aber die Bedeutung verschwimmt.`,
  
  choices: [
    {
      id: 'analyze_pattern',
      label: 'Das Muster beobachten',
      effects: [
        { type: 'inc', target: 'tickets_truth', value: 1 },
        { type: 'set', target: 'knows_board_pattern', value: true }
      ],
      next: 'c1_hub_platform'  // ← Zurück zum Hub
    },
    // ... weitere Choices
  ],
  tags: ['investigation']
}
```

### 4. Engine-Unterstützung

#### TypeScript (`gameEngine.ts`)

```typescript
export function checkAutoNext(scene: Scene, state: GameState): string | null {
  const variants = scene.narrative_variants || [];
  
  // Finde beste Variante mit auto_next
  let bestAutoNext: string | null = null;
  let bestScore = -Infinity;
  
  for (const variant of variants) {
    if (!variant.auto_next) continue;
    
    // Prüfe Condition
    if (variant.condition && !evaluateCondition(state, variant.condition)) {
      continue;
    }
    
    // Berechne Score (Priorität + Drift-Tiebreaker)
    const score = (variant.priority ?? 10) + (variant.min_drift ?? 0) * 0.01;
    
    if (score > bestScore) {
      bestScore = score;
      bestAutoNext = variant.auto_next;
    }
  }
  
  return bestAutoNext;
}
```

#### Kotlin (`GameEngine.kt`)

Identische Logik in Kotlin implementiert (siehe `android-native/app/src/main/java/de/daydaylx/nachtzug19/engine/GameEngine.kt`).

### 5. Simulator-Integration

Der Test-Simulator muss `checkAutoNext()` prüfen BEVOR er "stuck" deklariert:

```typescript
// In simRunner.ts
const available = getAvailableChoices(state, scene);

if (available.length === 0) {
  const autoNext = checkAutoNext(scene, state);
  if (autoNext) {
    // Auto-transition!
    applyExitEffects(state, scene);
    state.current_scene_id = autoNext;
    applyEntryEffects(state, nextScene);
    continue;
  } else {
    stuck = true; // Kein Ausweg
  }
}
```

## Best Practices

### ✅ Do's

1. **Klare Counter-Semantik**: Counter-Name sollte Zweck beschreiben (`hub_investigations`, nicht `counter1`)
2. **Progressive Narrative**: Mindestens 2-3 Varianten für verschiedene Counter-Stufen
3. **Hohe Priorität für Trigger**: Auto-Next Variante sollte höchste Priorität haben
4. **Eindeutige Flags**: Jeder Hotspot braucht eine eigene Flag (z.B. `investigated_X`)
5. **Return to Hub**: Investigation-Szenen IMMER zurück zum Hub führen

### ❌ Don'ts

1. **Kein auto_next ohne Condition**: Sonst triggert es sofort beim ersten Hub-Besuch
2. **Kein Vergessen der Counter-Increments**: Sonst stuck in Hub-Loop
3. **Kein Überspringen von Flags**: Sonst können Choices mehrfach gewählt werden
4. **Keine niedrigen Prioritäten für Trigger**: Sonst wird falsche Variante gewählt

## Debugging

### Problem: Hub-Loop (infinite loop)

**Symptom:** Spieler ist im Hub gefangen, keine Choices verfügbar, kein auto_next triggert

**Lösung:**
1. Prüfe Counter-Wert: `console.log(state.pressure.hub_investigations)`
2. Prüfe auto_next Condition: Ist Schwelle richtig gesetzt?
3. Prüfe Priorität: Hat auto_next Variante höchste Priorität?

### Problem: Auto-Next triggert zu früh

**Symptom:** Spieler wird aus Hub gerissen bevor alle Hotspots untersucht wurden

**Lösung:**
1. Erhöhe Schwelle im auto_next Condition (z.B. `>= 3` → `>= 4`)
2. Prüfe ob Counter korrekt inkrementiert wird

### Problem: Choices verschwinden nicht

**Symptom:** Hotspot kann mehrfach untersucht werden

**Lösung:**
1. Prüfe ob Flag in Choice.effects gesetzt wird: `{ type: 'set', target: 'investigated_X', value: true }`
2. Prüfe ob Choice.condition die Flag prüft: `{ type: 'bool', target: 'investigated_X', value: false }`

## Validator-Warnung

Der Content-Validator wird Warnungen über "potenzielle Endlosschleife" in Hubs anzeigen:

```
warning: Potenzielle Endlosschleife erkannt: c1_hub_platform, c1_inv_board, ...
```

**Das ist harmlos!** Der Validator versteht `auto_next` noch nicht. Die Hub-Loops sind beabsichtigt und haben valide Exits via auto_next.

## Beispiel: Kompakter Hub

```typescript
'my_hub': {
  id: 'my_hub',
  narrative: `Base text.`,
  narrative_variants: [
    {
      condition: { type: 'compare', target: 'my_counter', operator: '>=', value: 2 },
      narrative: `You've explored ${state.pressure.my_counter} things.`,
      auto_next: 'next_scene',
      priority: 20
    }
  ],
  choices: [
    {
      id: 'hotspot_1',
      label: 'Thing 1',
      condition: { type: 'bool', target: 'seen_thing1', value: false },
      effects: [
        { type: 'inc', target: 'my_counter', value: 1 },
        { type: 'set', target: 'seen_thing1', value: true }
      ],
      next: 'thing1_investigation'
    },
    {
      id: 'hotspot_2',
      label: 'Thing 2',
      condition: { type: 'bool', target: 'seen_thing2', value: false },
      effects: [
        { type: 'inc', target: 'my_counter', value: 1 },
        { type: 'set', target: 'seen_thing2', value: true }
      ],
      next: 'thing2_investigation'
    }
  ],
  tags: ['hub']
}
```

## Weitere Ressourcen

- Vollständiges Beispiel: `/src/content/nachtzug19/scenes/c1.ts`
- Engine-Implementierung: `/src/domain/engine/gameEngine.ts` (TS) & `GameEngine.kt` (Kotlin)
- Tests: `/tests/helpers/simRunner.ts`
- Type-Definitionen: `/src/domain/types/index.ts`
