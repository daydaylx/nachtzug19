# CLAUDE.md

Diese Datei bietet Anleitung für Claude Code (claude.ai/code) bei der Arbeit mit Code in diesem Repository.

## Projektübersicht

**NACHTZUG 19** ist ein immersives psychologisches Mystery-Adventure als **Native Android App (Kotlin)**.
Das Projekt nutzt eine hybride Architektur:
- **TypeScript**: Definiert den Story-Content, die Spiellogik und Validierungsregeln (`src/`).
- **Kotlin**: Rendert das Spiel auf Android-Geräten (`android-native/`).

## Entwicklungsbefehle

```bash
# Validiere Content-Integrität
npm test

# Exportiere Content als JSON für Android
npm run export:story

# Erstelle Android APK (Debug)
cd android-native && ./gradlew assembleDebug
```

## Architektur: Hybrid

### 1. Content-Quelle (`src/`)
- **Zweck**: Single Source of Truth für den Story-Graphen.
- **Sprache**: TypeScript.
- **Wichtige Dateien**:
  - `src/content/nachtzug19/scenes/*.ts`: Die eigentlichen Story-Szenen.
  - `src/domain/engine/gameEngine.ts`: Logik zur Validierung und Verarbeitung von Content.
  - `scripts/export_story_json.ts`: Kompiliert TS-Content in eine JSON-Datei für Android.

### 2. Android-Laufzeitumgebung (`android-native/`)
- **Zweck**: Führt das Spiel auf dem Gerät aus.
- **Sprache**: Kotlin.
- **Wichtige Dateien**:
  - `app/src/main/assets/story.json`: Die kompilierte Story (nicht manuell bearbeiten).
  - `app/src/main/java/de/daydaylx/nachtzug19/engine/GameEngine.kt`: Die Laufzeit-Engine (spiegelt TS-Logik).
  - `app/src/main/java/de/daydaylx/nachtzug19/ui/*`: Jetpack Compose UI.

## State-Modell (NACHTZUG 19)

Definiert in `src/domain/types/index.ts` und gespiegelt in `Models.kt`:

```typescript
GameState {
  stats: { mut, wissen, empathie }           // Legacy (0-10)
  tickets: { truth, escape, guilt, love }    // Entscheidungsmuster (0-5)
  pressure: { conductor_attention, memory_drift }  // (0-6)
  relations: { rel_comp7, rel_boy, rel_sleepless } // (-2 bis +4)
  items: { has_recorder, has_tag19, photo_anomaly } // boolean
}
```

## Content-Format (Kanonische Regeln)

Alle Story-Inhalte müssen `docs/NACHTZUG_19_RULES.md` befolgen.

### Obligatorische kanonische Regeln
**R1: Drift nach Stationen** - Jedes Kapitelende erhöht `memory_drift`.
**R2: Kontrollen bei Kapiteln 2, 3, 5** - Feste Gatepoints, die den State verändern.
**R3: Jede Wahl hat Konsequenz** - Keine Wahl ohne sichtbare Konsequenz später.
**R4: Der Zug lügt nie direkt** - Bedeutungsverschiebungen, keine falschen Aussagen.

## Arbeitsablauf für Content-Updates

1. **Bearbeite TypeScript**: Modifiziere Szenen in `src/content/nachtzug19/scenes/`.
2. **Validiere**: Führe `npm test` aus, um Graph-Integrität und Logik zu überprüfen.
3. **Exportiere**: Führe `npm run export:story` aus, um `story.json` zu aktualisieren.
4. **Erstelle**: Baue die Android-App, um Änderungen auf Gerät/Emulator zu sehen.

## Häufige Fehler zum Vermeiden

1. **Engine-Divergenz**: Wenn du `gameEngine.ts` (TS) änderst, MUSST du `GameEngine.kt` (Kotlin) anpassen.
2. **Fehlender Export**: Änderungen in `src/content` sind in Android NICHT sichtbar, bis du `npm run export:story` ausführst.
3. **Neue State-Variablen**: Füge keine State-Variablen ohne Update von `domain/types/index.ts` UND `Models.kt` hinzu.

## Aktueller Status

- ✅ Content: Kapitel 1-7 vollständig & validiert.
- ✅ Android Engine: Vollständig implementiert und gepatcht für neue Features (bedingte Varianten).
- ✅ Tests: 100% Pfad-Abdeckung via Simulation.
- ✅ CI: GitHub Actions für Android-Build aktiv.
