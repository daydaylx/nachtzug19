# Android Native Build

## Voraussetzungen
- Android Studio (Hedgehog oder neuer)
- JDK 17
- Node.js 18+

## Story-Export (story.json)
Vom Repository-Root aus:

```bash
npm run export:story
```

Dies schreibt `export/story.json` und kopiert es, falls verfügbar, nach:
`android-native/app/src/main/assets/story.json`.

Wenn du nach Änderungen manuell synchronisieren möchtest:

```bash
cd android-native
./gradlew :app:syncStoryAssets
```

## Projekt öffnen
1. Öffne `android-native/` in Android Studio.
2. Lasse Gradle synchronisieren.
3. Starte die `app`-Konfiguration auf einem Gerät oder Emulator.

## Debug-Build (CLI)
```bash
cd android-native
./gradlew :app:assembleDebug
```

APK-Ausgabe:
`android-native/app/build/outputs/apk/debug/app-debug.apk`

## Release-Build
```bash
cd android-native
./gradlew :app:assembleRelease
```

Signierung:
- Konfiguriere Signierung in `android-native/app/build.gradle.kts` oder
  `android-native/gradle.properties`.
- Android Studio: Build > Generate Signed Bundle / APK.

## Unit-Tests
```bash
cd android-native
./gradlew :app:testDebugUnitTest
```

## Fehlerbehandlung
- **story.json fehlt**: Führe `npm run export:story` aus und synchronisiere die Assets erneut.
- **JSON-Parse-Fehler**: Stelle sicher, dass `export/story.json` gültig ist und Enden enthält.
- **Gradle/JDK-Konflikt**: Verifiziere, dass JDK 17 in Android Studio ausgewählt ist.
