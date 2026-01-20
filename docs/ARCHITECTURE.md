# Projekt-Architektur: Hybrid (TS/Kotlin)

## Überblick

NACHTZUG 19 verwendet eine hybride Architektur, die **TypeScript für Content-Definition & Logik-Validierung** und **Kotlin für die Runtime auf Android** nutzt.

## Ordnerstruktur

```
.
├── src/                    # TypeScript Source (Content & Validation)
│   ├── content/            # Story Content (Single Source of Truth)
│   │   └── nachtzug19/     # Die 7 Kapitel
│   │       ├── manifest.ts
│   │       └── scenes/*.ts
│   │
│   └── domain/             # Business Logic & Types
│       ├── engine/         # TS-Engine (für Validierung & Export)
│       └── types/          # Typ-Definitionen
│
├── android-native/         # Native Android App (Runtime)
│   ├── app/src/main/java/  # Kotlin Source Code
│   │   ├── engine/         # Kotlin-Engine (spiegelt TS-Logic)
│   │   ├── model/          # Datenmodelle (spiegeln TS-Types)
│   │   └── ui/             # Jetpack Compose UI
│   │
│   └── app/src/main/assets # Zielort für story.json
│
└── scripts/                # Build-Tools
    └── export_story_json.ts # Kompiliert TS -> JSON
```

## Layer-Verantwortlichkeiten

### 1. Content Layer (`src/content/`)
**Zweck**: Definition der Story.
- **Format**: TypeScript (typensicher).
- **Inhalt**: Szenen, Choices, Conditions, Effects.
- **Regel**: Keine UI-Logik, keine Imports aus Runtime.

### 2. Domain Layer (`src/domain/`)
**Zweck**: Logik-Definition und Validierung.
- **`gameEngine.ts`**: Definiert, wie Choices und Conditions funktionieren.
- **`validateContent.ts`**: Stellt sicher, dass der Content valide ist (keine Dead-Ends).
- **`types/index.ts`**: Definiert das Schema (GameState, Scene, Choice).

### 3. Build Layer (`scripts/`)
**Zweck**: Brücke zwischen TS und Android.
- `export_story_json.ts`:
    1. Lädt Content.
    2. Validiert Content (`validateContent.ts`).
    3. Exportiert als `story.json`.
    4. Kopiert nach `android-native/.../assets`.

### 4. Runtime Layer (`android-native/`)
**Zweck**: Ausführung auf dem Gerät.
- **`GameEngine.kt`**: Implementiert die Logik aus `gameEngine.ts` in Kotlin nach.
- **`Models.kt`**: Kotlin-Datenklassen, die den TS-Typen entsprechen (via `kotlinx.serialization`).
- **UI**: Native Android Views (keine WebView).

---

## Datenfluss

1.  **Edit**: Autor bearbeitet `src/content/nachtzug19/scenes/c1.ts`.
2.  **Validate**: `npm test` führt TS-Tests aus.
3.  **Export**: `npm run export:story` generiert `story.json`.
4.  **Build**: Gradle baut APK, inkludiert `story.json` als Asset.
5.  **Run**: Android-App lädt JSON beim Start und initialisiert `GameEngine.kt`.

---

## Synchronisation (WICHTIG)

Da die Logik doppelt implementiert ist (TS und Kotlin), muss bei Änderungen an `src/domain/engine/gameEngine.ts` (z.B. neue Condition-Typen) zwingend auch `android-native/.../engine/GameEngine.kt` angepasst werden!

Die Datenstrukturen in `src/domain/types/index.ts` müssen exakt zu `android-native/.../model/Models.kt` passen.

---

**Architektur-Version**: 2.0 (Android Native)
**Letzte Änderung**: 2026-01-19