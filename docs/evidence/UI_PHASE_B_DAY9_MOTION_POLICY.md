# UI Phase B Day 9 - Motion Policy

Datum: 2026-02-09
Status: abgeschlossen

## Ziel
Reduce Motion zentral und konsistent umsetzen, statt komponentenspezifischer Einzelflags.

## Umsetzung

### 1) Zentrale Motion-Policy
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/MotionPolicy.kt`

Enthaelt:
- `MotionPolicy` mit zentralen Parametern fuer Transition/Continuous Effects/Durations
- `ReaderSettings.toMotionPolicy()` als einzige Ableitung aus User-Settings

Reduce-Motion-Verhalten:
- `allowTransitions = false`
- `allowContinuousEffects = false`
- `allowBackgroundDrift = false`
- alle Bewegungsdauern auf `0`

### 2) Policy-Anbindung in Screens
Dateien:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/SettingsScreen.kt`

Aenderungen:
- Screen-level Motion aus `settings.toMotionPolicy()`
- Drift/Noise/Overlay/Feedback laufen nur noch ueber Policy

### 3) Komponenten auf Policy umgestellt

- `BackgroundSystem.kt`
  - `AnimatedBackground(...)` erhaelt `motionPolicy`
  - bei `backgroundCrossfadeDurationMs == 0`: direkter Wechsel ohne Crossfade

- `StationOverlay.kt`
  - Enter/Exit-Dauer aus Policy
  - Pulsieren deaktiviert, sobald Continuous Effects aus sind

- `ChoiceFeedback.kt`
  - Fade-Dauer + Sichtbarkeitsdauer aus Policy
  - bei Reduce Motion: sofortiges Anzeigen/Entfernen ohne Fade

## Verifikation

### Tests
- `android-native/app/src/test/java/de/daydaylx/nachtzug19/ui/MotionPolicyTest.kt` hinzugefuegt.
- Ausgefuehrt:
  - `./gradlew :app:testDebugUnitTest --tests "de.daydaylx.nachtzug19.ui.MotionPolicyTest" --tests "de.daydaylx.nachtzug19.engine.EngineParityTest" :app:assembleDebug`
- Ergebnis: erfolgreich.

### Build
- `./gradlew :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`.

## Ergebnis
- Reduce Motion ist jetzt ein systemweiter Mechanismus statt verstreuter Flags.
- Continuous/pulsierende Effekte lassen sich konsistent abschalten.
- Crossfade und Feedback-Verhalten sind bei Reduce Motion auf minimal/none gestellt.
