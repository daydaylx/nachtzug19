# MCP Server - Praxisbeispiele

Dieses Dokument enthält konkrete Beispiele für die Verwendung der MCP-Server bei der Entwicklung von NACHTZUG 19.

## Inhalt

1. [Kapitel-Entwicklung Workflow](#kapitel-entwicklung-workflow)
2. [Pacing-Optimierung](#pacing-optimierung)
3. [Callback-Implementierung](#callback-implementierung)
4. [Fake-Choice-Fix](#fake-choice-fix)
5. [State-Flow-Analyse](#state-flow-analyse)
6. [Komplettes Audit](#komplettes-audit)

---

## Kapitel-Entwicklung Workflow

Du beginnst mit einem neuen Kapitel. Hier ist der vollständige Workflow:

### Schritt 1: Kapitel schreiben

Erstelle `src/content/nachtzug19/scenes/c5.ts` und schreibe deine Szenen.

### Schritt 2: Canon Rules prüfen

```bash
# Prüfe alle Canon Rules für Kapitel 5
npm run mcp:validate-chapter 5
```

**Beispiel-Output:**
```
🔍 === Story Validator: Kapitel 5 (21 Szenen) ===

✅ Content-Validierung erfolgreich

Zusammenfassung: 0 Errors, 1 Warnings

⚠️  Warnings:
   [c5_s01_station_end] Szene hat keine 'control' Markierung (R2: Kontrollen in Kap. 2, 3, 5)
```

**Aktion**: Füge eine control-Szene hinzu (R2 verlangt Kontrolle in Kapitel 5).

### Schritt 3: Länge prüfen

```bash
npm run mcp:check-length 5
```

**Beispiel-Output:**
```
🔍 === Kapitel 5: Längen-Check ===

Ziel: 20+ Minuten
Geschätzt: 17.7 Minuten
Szenen: 21
Choices: 61
Wörter: 3275

❌ Kapitel ist um 2.3 Minuten zu kurz.

Empfehlung: Füge ca. 437 Wörter oder 15 Choices hinzu.
```

**Aktion**: Erweitere Narrative oder füge Choices hinzu.

### Schritt 4: Choice-Dichte prüfen

```bash
npm run mcp:analyze-choices 5
```

**Beispiel-Output:**
```
🔍 === Choice Density Analyse: Kapitel 5 ===

✅ Kapitel 5: 61 Choices in 21 Szenen (Ø 2.90 Choices/Scene)

Durchschnitt: 2.90 Choices/Scene

✅ Choice-Density ist im Zielbereich
```

### Schritt 5: Callbacks prüfen

```bash
npm run mcp:check-callbacks 5
```

**Beispiel-Output:**
```
🔍 === Callback Check: Kapitel 5 ===

⚠️  3 Callback-Probleme:

⚠️  [c5_s10_corridor] Choice "Nach links": hat starke Effects aber kein state_notes Callback-Hinweis.
⚠️  [c5_s12_abteil7] Choice "Rekorder anschauen": hat starke Effects aber kein state_notes Callback-Hinweis.
⚠️  [c5_s15_corridor] Choice "Nach rechts": hat starke Effects aber kein state_notes Callback-Hinweis.
```

**Aktion**: Füge `state_notes` zu den Szenen hinzu.

```typescript
// Beispiel:
export const c5_s10_corridor: Scene = {
  id: 'c5_s10_corridor',
  chapter: 5,
  title: 'Flur',
  narrative: '...',
  choices: [
    {
      id: 'go_left',
      label: 'Nach links',
      next: 'c5_s11_corridor',
      effects: [
        { type: 'inc', target: 'tickets_truth', value: 1 }
      ]
    }
  ],
  state_notes: [
    'Callback: "Nach links" Entscheidung → späterer Dialog mit Comp7'  // HINZUFÜGEN
  ]
};
```

### Schritt 6: Fake-Choices prüfen

```bash
npm run mcp:detect-fake-choices 5
```

**Beispiel-Output:**
```
🔍 === Fake Choice Detection: Kapitel 5 ===

Total Choices: 61
Potenzielle Fake-Choices: 0 (0.0%)

✅ Keine Fake-Choices gefunden
```

### Schritt 7: Exportieren

```bash
npm run export:story
```

---

## Pacing-Optimierung

### Problem: Kapitel ist zu kurz

Du hast ein Kapitel geschrieben, das nur 11.4 Minuten hat (Ziel: 20+).

#### Option A: Narrative erweitern

```bash
# Word-Density prüfen
npm run mcp:analyze-pacing | grep "Kapitel 2"
```

**Output:**
```
❌ Kapitel 2: 11.4 min (18 Szenen, 45 Choices)
💡 Word-Density: 50 Wörter/Scene (zu niedrig)
```

**Aktion**: Erweitere Narrative in Szenen auf ~100+ Wörter/Scene.

```typescript
// VORHER (zu kurz):
export const c2_s01_platform: Scene = {
  id: 'c2_s01_platform',
  chapter: 2,
  title: 'Bahnsteig',
  narrative: 'Du stehst auf dem Bahnsteig. Der Zug ist gekommen.',
  choices: [...]
};

// NACHHER (erweitert):
export const c2_s01_platform: Scene = {
  id: 'c2_s01_platform',
  chapter: 2,
  title: 'Bahnsteig',
  narrative: 'Der Bahnsteig liegt im Zwielicht der rötlich-violetten Lampe. '
             + 'Der Zug ist gekommen, mit einem leisen Zischen in den Gleisbett. '
             + 'Ein warmer Hauch strömt aus den offenen Türen, '
             + 'trägt den Geruch von Ozon und altem Holz. '
             + 'Drei Schritte vor dir biegt der Gang um die Ecke, '
             + 'und irgendwo fern poltert ein Koffer.',
  choices: [...]
};
```

#### Option B: Choices hinzufügen

```bash
# Choice-Density prüfen
npm run mcp:analyze-choices 2
```

**Output:**
```
⚠️  Kapitel 2: 45 Choices in 18 Szenen (Ø 2.50 Choices/Scene)
💡 Choice-Density ist gut, kann aber höher sein
```

**Aktion**: Füge eine Choice zu Szenen mit nur 1-2 Choices hinzu.

```typescript
// VORHER:
choices: [
  { id: 'continue', label: 'Weitergehen', next: 'c2_s02_corridor' }
]

// NACHHER:
choices: [
  { id: 'wait', label: 'Warten und beobachten', next: 'c2_s02_corridor_wait' },
  { id: 'continue', label: 'Weitergehen', next: 'c2_s02_corridor' }
]
```

---

## Callback-Implementierung

### Problem: State-Änderungen ohne Echo

Du hast Choices mit Effects, aber keine Callbacks.

```bash
npm run mcp:check-callbacks
```

**Output:**
```
🔍 === Callback Check: alle Kapitel ===

Choices mit Effects: 173
Choices mit Callback-Dokumentation: 45
Callback-Rate: 26.0%

⚠️  128 Callback-Probleme:

⚠️  [c3_s05_interlude] Choice "Rekorder ausschalten": hat starke Effects aber kein state_notes Callback-Hinweis.
```

### Lösung: Callbacks hinzufügen

```typescript
export const c3_s05_interlude: Scene = {
  id: 'c3_s05_interlude',
  chapter: 3,
  title: 'Stille',
  narrative: 'Der Gang ist still. Nur das Rauschen des Zuges dringt gedämpft durch die Wände.',
  choices: [
    {
      id: 'turn_off_recorder',
      label: 'Rekorder ausschalten',
      next: 'c3_s06_corridor',
      effects: [
        { type: 'set', target: 'has_recorder', value: false },
        { type: 'inc', target: 'tickets_truth', value: 1 }
      ]
    }
  ],
  state_notes: [  // HINZUFÜGEN
    'Callback: Rekorder ausschalten → Comp7 erwähnt später, dass der Rekorder stumm ist',
    'Callback: tickets_truth +1 → Späterer Dialog über Wahrheitssuche'
  ]
};
```

### Prüfen: Wurde Callback implementiert?

```bash
npm run mcp:check-callbacks 3
```

**Output:**
```
🔍 === Callback Check: Kapitel 3 ===

✅ Alle State-Änderungen haben Callbacks oder sind dokumentiert
```

---

## Fake-Choice-Fix

### Problem: Identische Choices

Du hast Choices, die technisch identisch sind.

```bash
npm run mcp:detect-fake-choices
```

**Output:**
```
🔍 === Fake Choice Detection: alle Kapitel ===

Total Choices: 387
Potenzielle Fake-Choices: 5 (1.3%)

⚠️  5 Probleme gefunden:

⚠️  [c7_s02_interlude_silence] test_voice: Choice ist identisch mit "Wand berühren" (gleicher next/ending/effects).
⚠️  [c7_s02_interlude_silence] touch_wall_silence: Choice ist identisch mit "Versuchen zu sprechen" (gleicher next/ending/effects).
```

### Lösung 1: Tone Choice (empfohlen)

Wenn die Choices nur die Haltung ändern (Tone Choice):

```typescript
// FAKE-CHOICE (beide identisch):
choices: [
  { 
    id: 'touch_wall', 
    label: 'Wand berühren', 
    next: 'c7_s03_corridor'  // Gleicher next, keine Effects
  },
  { 
    id: 'test_voice', 
    label: 'Stimme testen', 
    next: 'c7_s03_corridor'  // Gleicher next, keine Effects
  }
]

// LÖSUNG: Tone Choice (kein next, nur Text-Variation):
choices: [
  { 
    id: 'touch_wall', 
    label: 'Wand berühren', 
    next: 'c7_s03_corridor'
  }
]
// In narrative_variants Text-Variation implementieren
```

### Lösung 2: Konsequenzen hinzufügen

Wenn die Choices echte Entscheidungsmöglichkeiten sein sollen:

```typescript
// FAKE-CHOICE (beide identisch):
choices: [
  { 
    id: 'go_left', 
    label: 'Nach links', 
    next: 'c7_s03_corridor' 
  },
  { 
    id: 'go_right', 
    label: 'Nach rechts', 
    next: 'c7_s03_corridor' 
  }
]

// LÖSUNG: Unterschiedliche next Szenen:
choices: [
  { 
    id: 'go_left', 
    label: 'Nach links', 
    next: 'c7_s03_corridor_left' 
  },
  { 
    id: 'go_right', 
    label: 'Nach rechts', 
    next: 'c7_s03_corridor_right' 
  }
]
```

Oder mit Effects:

```typescript
// LÖSUNG: Unterschiedliche Effects:
choices: [
  { 
    id: 'go_left', 
    label: 'Nach links', 
    next: 'c7_s03_corridor',
    effects: [
      { type: 'inc', target: 'tickets_truth', value: 1 }
    ]
  },
  { 
    id: 'go_right', 
    label: 'Nach rechts', 
    next: 'c7_s03_corridor',
    effects: [
      { type: 'inc', target: 'tickets_escape', value: 1 }
    ]
  }
]
```

---

## State-Flow-Analyse

### Problem: Tickets haben keine Callbacks

Du möchtest sehen, wie `tickets_truth` durch die Story fließt.

```bash
npm run mcp:analyze-state tickets_truth
```

**Output:**
```
📊 State Flow Analysis: tickets_truth
   Total Changes: 173
   Scenes: 131
   Chapters: 1, 2, 3, 4, 5, 6, 7
   Callbacks: 0/173 (0.0%)
   ⚠️  Warnung: Callback-Rate ist niedrig - viele Änderungen haben kein Echo!
```

### Analyse der Flows

Prüfe, in welchen Kapiteln die State-Variable verändert wird:

```bash
npm run mcp:analyze-state memory_drift
```

**Output:**
```
📊 State Flow Analysis: memory_drift
   Total Changes: 7
   Scenes: 7
   Chapters: 1, 2, 3, 4, 5, 6, 7
   Callbacks: 0/7 (0.0%)
```

**Beobachtung**: `memory_drift` wird nur 7x verändert (erwartet: 1x pro Kapitel für station_end).

### Lösung: Callbacks implementieren

Für jede Scene mit `memory_drift`-Effect:

```typescript
export const c1_s15_station_end: Scene = {
  id: 'c1_s15_station_end',
  chapter: 1,
  title: 'Station Ende',
  narrative: '...',
  choices: [
    {
      id: 'continue',
      label: 'Weiterfahren',
      next: 'c2_s01_platform',
      effects: [
        { type: 'inc', target: 'memory_drift', value: 1 }
      ]
    }
  ],
  exit_effects: [
    { type: 'inc', target: 'memory_drift', value: 1 }
  ],
  state_notes: [  // HINZUFÜGEN
    'Callback: memory_drift +1 → Narrative-Varianten in Kapitel 2 zeigen falsche Details',
    'R1: Drift nach Stationen - memory_drift wird hier erhöht'
  ]
};
```

---

## Komplettes Audit

Bevor du ein PR (Pull Request) erstellst, führe ein komplettes Audit durch:

```bash
# 1. Alle Server testen
npm run mcp:smoke-test

# 2. Validierung
npm run mcp:validate

# 3. Pacing
npm run mcp:analyze-pacing

# 4. Fake-Choices
npm run mcp:detect-fake-choices

# 5. Callbacks
npm run mcp:check-callbacks

# 6. Choices validieren
npm run mcp:analyze-choices

# 7. Generiere Reports
npm run mcp:report json > reports/mcp-audit.json
npm run mcp:report markdown > reports/mcp-audit.md
```

**Zusammenfassung des Audits:**

- ✅ Alle 4 MCP-Server funktionieren
- ✅ 0 Errors in Validierung
- ⚠️ 3 Kapitel unter 20 Minuten
- ⚠️ 5 potenzielle Fake-Choices
- ⚠️ 12 Callbacks fehlen

**Aktionen vor PR:**
1. Kapitel 1-3 auf 20+ Minuten erweitern
2. Fake-Choices fixen
3. Callbacks implementieren

---

## Tipps & Tricks

### Tipp 1: Regelmäßige Checks

Führe MCP-Checks regelmäßig während der Entwicklung aus, nicht erst am Ende:

```bash
# Nach jedem Kapitel
npm run mcp:validate-chapter X
npm run mcp:check-length X
```

### Tipp 2: Reports speichern

Speichere Reports für die Dokumentation:

```bash
npm run mcp:report json pacing > reports/pacing-report.json
npm run mcp:report markdown choice > reports/choice-report.md
```

### Tipp 3: Diff nutzen

Vergleiche Reports vor und nach Änderungen:

```bash
# VORHER
npm run mcp:report json > before.json

# Änderungen machen...

# NACHHER
npm run mcp:report json > after.json

# Diff
diff before.json after.json
```

### Tipp 4: Automatisierung in CI

Füge MCP-Checks zu CI hinzu (siehe `.github/workflows/`):

```yaml
- name: MCP Smoke Test
  run: npm run mcp:smoke-test

- name: Validate Story
  run: npm run mcp:validate
```

---

## Weiterführende Ressourcen

- **[MCP_GUIDE.md](MCP_GUIDE.md)** - Schnellstart-Guide
- **[MCP_SERVERS.md](MCP_SERVERS.md)** - Vollständige Dokumentation
- **[NACHTZUG_19_RULES.md](NACHTZUG_19_RULES.md)** - Canon Rules
- **[../README.md](../README.md)** - Projektübersicht
