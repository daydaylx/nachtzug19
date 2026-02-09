# UI Phase C Day 11 - Settings-Sprache vereinheitlicht

Datum: 2026-02-09  
Status: abgeschlossen

## Ziel
Alle sichtbaren Reader-/Settings-Begriffe konsistent auf Deutsch bringen, ohne neue Stilbrüche.

## Umsetzung

### Settings
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/SettingsScreen.kt`

Aenderungen:
- Abschnitt `Reader` -> `Lesen`
- Abschnitt `Overlay` -> `Einblendungen`
- `Reduce Motion` -> `Bewegung reduzieren`
- `Immersion FX` -> `Atmosphäreneffekte`
- `Microbar anzeigen` -> `Mini-Statusleiste anzeigen`

### Statussheet
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/StatusSheet.kt`

Aenderungen:
- `Attention (Schaffner)` -> `Aufmerksamkeit (Schaffner)`
- `Memory Drift` -> `Erinnerungsdrift`
- `Items` -> `Gegenstände`
- `Compartment 7` -> `Abteil 7`
- `The Boy` -> `Der Junge`
- `Sleepless` -> `Der Schlaflose`

### Choice-Badge
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/TicketChoice.kt`

Aenderung:
- `Final` -> `Endgültig`

### Reststelle ausserhalb Reader-Flow
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/overworld/OverworldScreen.kt`

Aenderung:
- Icon-ContentDescription `Settings` -> `Einstellungen`
- `Zurück zur Overworld` -> `Zurück zur Karte`

## Verifikation

### Build/Test
- Ausgefuehrt:
  - `./gradlew :app:testDebugUnitTest --tests "de.daydaylx.nachtzug19.engine.EngineParityTest" --tests "de.daydaylx.nachtzug19.ui.MotionPolicyTest" :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`

### Install
- `adb install -r android-native/app/build/outputs/apk/debug/app-debug.apk`
- Ergebnis: `Success`

### Konsistenz-Check
- String-Scan auf gemischte Reader-/Settings-Terminologie durchgefuehrt.
- Keine sichtbaren englischen Restbegriffe im Reader-/Settings-Flow gefunden.

### Visueller Nachweis (Dichte + Hilfstexte)
- Screenshot:
  - `docs/evidence/ui-phase-c-day11-settings-language/2026-02-09/settings_de_after_density.png`
- Ergebnis:
  - klarere Priorisierung (Bereichsbeschreibung + kurze Hilfstexte pro Option)
  - reduzierte visuelle Last durch ruhigere Header-/Section-Gewichtung
