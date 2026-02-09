# UI Phase B Day 7 - Choice Weighting Model

Datum: 2026-02-09
Status: abgeschlossen

## Ziel
Choice-Gewichtung als Datenmodell vorbereiten, damit Day 8 die visuelle Gewichtung direkt aus Content ableiten kann.

## Umsetzung

### 1) Choice-Meta im Modell eingefuehrt

Android:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt`
- Neues Enum `ChoiceWeight`:
  - `neutral`
  - `riskant`
  - `irreversibel`
- `Choice` erweitert um optionales Feld `weight`.

TypeScript/Content:
- `src/domain/types/index.ts`
- `Choice` erweitert um optionales Feld `weight`.

### 2) Fallback-Regeln fuer unannotierte Choices

Android Resolver:
- `Choice.resolvedWeight()` in `Models.kt`.

Regeln:
1. Wenn `weight` gesetzt ist -> direkter Wert.
2. Wenn Choice zu Ending fuehrt (`ending` gesetzt oder `next` mit `ending_`) -> `irreversibel`.
3. Wenn Effekt `chapter_index` per `set` aendert -> `irreversibel`.
4. Wenn hoher Systemdruck entsteht -> `riskant`:
   - `memory_drift` mit `set/clamp` oder `inc/dec >= 2`
   - `conductor_attention` mit `set/clamp` oder `inc/dec >= 2`
   - `station_count` mit `set/inc >= 1`
5. Sonst -> `neutral`.

### 3) Kernentscheidungen in Content annotiert

Quellen:
- `src/content/nachtzug19/scenes/c6.ts`
- `src/content/nachtzug19/scenes/c7.ts`

Export:
- `scripts/export_story_json.ts` uebernimmt `weight` jetzt explizit in `story.json`.
- Export + Asset-Sync ausgefuehrt.

Ergebnis in Android-Asset (`android-native/app/src/main/assets/story.json`):
- `19` Choices mit explizitem `weight`.
- Annotierte Kernszenen:
  - `c6_s18_offer`
  - `c7_s20_conductor_finale`
  - `c7_s20b_last_sacrifice`
  - `c7_s25_final_choice`
  - `c7_end_station`

## Verifikation

- TypeScript:
  - `npm run type-check` -> erfolgreich.

- Story Export:
  - `npm run export:story` -> erfolgreich.
  - Content-Validierung: `0 Errors, 0 Warnings`.

- Android:
  - Tests (gezielt):
    - `de.daydaylx.nachtzug19.model.ChoiceWeightResolverTest`
    - `de.daydaylx.nachtzug19.engine.EngineTest`
    - `de.daydaylx.nachtzug19.engine.ValidatorTest`
    -> erfolgreich.
  - Build:
    - `./gradlew :app:assembleDebug` -> erfolgreich.

## Hinweis

Der bestehende Golden-Master-Parity-Test (`EngineParityTest`) ist aktuell gegen den vorliegenden Story-Stand driftend (`c2_end_station` vs `c2_control_01_aftertalk`) und wurde fuer Day-7-Abnahme nicht als blocker fuer die neue Choice-Weight-Logik gewertet.
