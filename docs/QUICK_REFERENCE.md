# NACHTZUG 19 - Quick Reference

Schnellreferenz für häufige Entwicklungsaufgaben.

---

## 🚀 Projekt Setup

```bash
# Klonen & Dependencies installieren
git clone <repo>
cd Nachtzug19
npm install

# Story exportieren
npm run export:story

# Android APK bauen
cd android-native
./gradlew assembleDebug
```

---

## 🧪 Testing

```bash
# TypeScript Tests
npm test                          # Alle Tests
npm run test:watch               # Watch-Mode

# Android Tests
cd android-native
./gradlew test                   # Unit Tests
./gradlew connectedAndroidTest   # Instrumented Tests (requires device/emulator)

# Story Validierung
npm run export:story             # Validiert + exportiert automatisch
```

---

## 📝 Content Authoring

### Neue Szene erstellen

```typescript
// In src/content/nachtzug19/scenes/cX.ts
'my_scene_id': {
  id: 'my_scene_id',
  chapter: 1,
  title: 'Meine Szene',
  narrative: `Basis-Text der Szene.`,
  
  choices: [
    {
      id: 'choice_1',
      label: 'Option 1',
      effects: [
        { type: 'inc', target: 'tickets_truth', value: 1 }
      ],
      next: 'next_scene_id'
    }
  ],
  
  tags: ['setup'],           // Optional: Tags für Validierung
  atmosphere: 'tense'        // Optional: UI-Hint
}
```

### Hub-Szene erstellen

```typescript
'my_hub': {
  id: 'my_hub',
  narrative: `Hub base text.`,
  
  // Progressive Varianten
  narrative_variants: [
    {
      condition: { type: 'compare', target: 'hub_counter', operator: '>=', value: 3 },
      narrative: `Trigger text.`,
      auto_next: 'next_scene',  // Auto-Transition!
      priority: 20
    }
  ],
  
  choices: [
    {
      id: 'hotspot_1',
      label: 'Untersuche X',
      condition: { type: 'bool', target: 'seen_x', value: false },
      effects: [
        { type: 'inc', target: 'hub_counter', value: 1 },
        { type: 'set', target: 'seen_x', value: true }
      ],
      next: 'investigation_x'
    }
  ],
  
  tags: ['hub']  // Wichtig für Choice-Limit-Exception
}
```

### State-Variablen

**Tickets** (Entscheidungsmuster, 0-20):
```typescript
tickets_truth    // Wahrheit suchen
tickets_escape   // Flucht/Vermeidung
tickets_guilt    // Verantwortung
tickets_love     // Verbindung
```

**Pressure** (System-Variablen, 0-6):
```typescript
conductor_attention  // Schaffner-Aufmerksamkeit
memory_drift        // Memory-Instabilität
hub_investigations  // K1: Bahnsteig-Counter
train_explorations  // K1: Zug-Counter
```

**Relations** (NPC-Vertrauen, -2 bis +4):
```typescript
rel_comp7       // Compartment 7 Person
rel_boy         // Kassettenjunge
rel_sleepless   // Schlaflosen-Mann
```

**Items** (Boolean Flags):
```typescript
has_recorder, has_tag19, has_ticket
investigated_board, explored_compartment, ...
```

---

## 🔧 Effect Types

```typescript
{ type: 'inc', target: 'tickets_truth', value: 1 }      // Inkrementieren
{ type: 'dec', target: 'conductor_attention', value: 1 } // Dekrementieren
{ type: 'set', target: 'has_recorder', value: true }    // Setzen (Boolean/Number)
{ type: 'clamp', target: 'tickets_truth', value: 12, clamp_min: 0, clamp_max: 20 } // Set + Clamp
```

---

## 🎯 Condition Types

```typescript
// Einfacher Vergleich
{ type: 'compare', target: 'tickets_truth', operator: '>=', value: 4 }

// Boolean Check
{ type: 'bool', target: 'has_recorder', value: true }

// AND Kombination
{
  type: 'and',
  conditions: [
    { type: 'compare', target: 'tickets_love', operator: '>=', value: 4 },
    { type: 'bool', target: 'saw_emma_vision', value: true }
  ]
}

// OR Kombination
{
  type: 'or',
  conditions: [
    { type: 'compare', target: 'tickets_truth', operator: '>=', value: 8 },
    { type: 'bool', target: 'has_tag19', value: true }
  ]
}
```

**Operators**: `==`, `!=`, `>`, `<`, `>=`, `<=`

---

## 🏷️ Scene Tags

```typescript
'station_end'    // Kapitelende (auto +1 memory_drift)
'control'        // Kontrolle durch Schaffner (K2, K3, K5 only)
'hub'            // Hub-Szene (max 10 Choices erlaubt)
'investigation'  // Investigation-Hotspot
'event'          // Story-Event
'special_path'   // Optionaler Sonderpfad
'emma_thread'    // Emma-bezogen
'ending'         // Finale Ending-Szene
'terminal'       // Ende des Spiels
```

---

## 🎨 Narrative Variants

### Drift-basiert (Memory Instability)

```typescript
narrative_variants: [
  {
    min_drift: 3,
    narrative: `Leicht veränderte Wahrnehmung...`,
    priority: 10
  },
  {
    min_drift: 5,
    narrative: `Stark veränderte Wahrnehmung...`,
    priority: 20  // Höhere Priorität = bevorzugt bei min_drift >= 5
  }
]
```

### Condition-basiert (Items/State)

```typescript
narrative_variants: [
  {
    condition: { type: 'bool', target: 'has_tag19', value: true },
    narrative: `Du siehst das Tag 19 Etikett überall...`,
    priority: 15
  }
]
```

### Auto-Transition (Hub Exit)

```typescript
narrative_variants: [
  {
    condition: { type: 'compare', target: 'hub_investigations', operator: '>=', value: 3 },
    narrative: `Der Zug kommt.`,
    auto_next: 'c1_event_train_arrival',  // Automatischer Übergang!
    priority: 20
  }
]
```

---

## 📊 Validation Rules (Canon)

**R1: Drift nach Stationen**
- Szenen mit Tag `station_end` erhöhen `memory_drift` +1 automatisch
- Außer: Exit-Effects oder Choice-Effects setzen `memory_drift` manuell

**R2: Kontrollen nur in K2, K3, K5**
- Tag `control` nur in Kapiteln 2, 3, 5 erlaubt

**R3: Jede Wahl hat Konsequenz**
- Choices MÜSSEN Effects haben (außer: Tone-Choices oder Hub-Navigation)

**R4: Keine direkte Lüge**
- Narrative darf nie faktisch falsch sein (nur Bedeutungsverschiebung)

---

## 🔍 Common Commands

```bash
# Story validieren & exportieren
npm run export:story

# TypeScript type-check
npm run type-check

# Alle Tests
npm test

# Android APK (Debug)
cd android-native && ./gradlew assembleDebug

# Android APK (Release)
cd android-native && ./gradlew assembleRelease

# Cleanup
npm run clean
cd android-native && ./gradlew clean
```

---

## 🐛 Debugging

### Story lädt nicht in Android

1. **JSON-Export gecheckt?** `npm run export:story`
2. **Gradle Sync?** Android Studio → "Sync Project with Gradle Files"
3. **Asset-Pfad korrekt?** Muss in `android-native/app/src/main/assets/story.json` liegen

### Infinite Loop in Hub

1. **Counter wird inkrementiert?** Prüfe Choice-Effects
2. **Auto-next Condition korrekt?** Schwelle erreichbar?
3. **Priorität hoch genug?** Auto-next Variante sollte höchste Priorität haben

### Validation Errors

```bash
npm run export:story
# Schau auf Errors (rot), nicht Warnings (gelb)
# Errors müssen gefixt werden, Warnings sind oft harmlos
```

### Tests schlagen fehl

```bash
# TypeScript Tests
npm test -- --reporter=verbose

# Spezifischen Test laufen lassen
npm test -- src/domain/engine/gameEngine.test.ts
```

---

## 📚 Weitere Dokumentation

- **Canon Rules**: `/docs/NACHTZUG_19_RULES.md`
- **Hub System**: `/docs/HUB_SYSTEM.md`
- **TypeScript Types**: `/src/domain/types/index.ts`
- **Android Models**: `/android-native/app/src/main/java/.../model/Models.kt`

---

## 🎯 Typische Workflows

### Neue Szene hinzufügen

1. Edit `src/content/nachtzug19/scenes/cX.ts`
2. Add scene to scenes collection
3. Run `npm test` (validates links)
4. Run `npm run export:story` (exports JSON)
5. Build Android APK & test

### Neues State-Item hinzufügen

1. Add to `Items` type in `src/domain/types/index.ts`
2. Add to `Items` data class in `android-native/.../model/Models.kt`
3. Add getter/setter in `src/domain/engine/gameEngine.ts`
4. Add getter/setter in `android-native/.../engine/GameEngine.kt`
5. Add to `EffectTarget` enum in both TS & Kotlin
6. Add to validation whitelist in `validateContent.ts`
7. Add to test lists in `gameEngine.targets.test.ts`
8. Update `createInitialState()` with default value

### Neuen Scene Tag hinzufügen

1. Add to `SceneTag` type in `src/domain/types/index.ts`
2. Add to `SceneTag` enum in `android-native/.../model/Models.kt`
3. Document usage in this file & `NACHTZUG_19_RULES.md`
