# Android Release Checklist (NACHTZUG 19)

Datum: 2026-02-20

## 1) Prerequisites

- [ ] Aktueller Branch ist `main` und sauber (`git status`)
- [ ] Aktuelle Story exportiert (`npm run -s export:story`)
- [ ] Alle Tests gruen:
  - [ ] `npm run -s type-check`
  - [ ] `npm test -- --run`
  - [ ] `npm run -s mcp:smoke-test`
  - [ ] `cd android-native && ./gradlew :app:testDebugUnitTest`

## 2) Release Signing konfigurieren

Release-Signing kann ueber `android-native/local.properties` oder ENV gesetzt werden.

### local.properties (nicht committen)

```properties
RELEASE_STORE_FILE=/absolute/or/relative/path/to/release-keystore.jks
RELEASE_STORE_PASSWORD=your_store_password
RELEASE_KEY_ALIAS=your_key_alias
RELEASE_KEY_PASSWORD=your_key_password
```

### Alternative ENV Variablen

- `NACHTZUG_RELEASE_STORE_FILE`
- `NACHTZUG_RELEASE_STORE_PASSWORD`
- `NACHTZUG_RELEASE_KEY_ALIAS`
- `NACHTZUG_RELEASE_KEY_PASSWORD`

Validierung:

- [ ] `cd android-native && ./gradlew :app:printReleaseSigningStatus`
- [ ] `cd android-native && ./gradlew :app:assertReleaseSigningConfigured`

Hinweis:
- Ohne produktives Release-Signing faellt `assertReleaseSigningConfigured` absichtlich.
- `assembleRelease`/`bundleRelease` koennen lokal mit Debug-Signing laufen, sind dann aber nicht store-ready.

## 3) Release-Artefakte bauen

### Play Store (empfohlen)

- [ ] `cd android-native && ./gradlew :app:bundleRelease`
- [ ] Erwartetes Artefakt:
  - `android-native/app/build/outputs/bundle/release/app-release.aab`

### Optional APK (internes QA-Sideloading)

- [ ] `cd android-native && ./gradlew :app:assembleRelease`
- [ ] Erwartetes Artefakt:
  - `android-native/app/build/outputs/apk/release/app-release-unsigned.apk` (oder signed, falls Signing konfiguriert)

## 4) Manuelle Release-Gates

- [ ] Starten frischer Install
- [ ] Laden alter Spielstand (falls vorhanden)
- [ ] Mindestens 1 kompletter Durchlauf pro Ticket-Fokus (Truth/Escape/Guilt/Love)
- [ ] Accessibility-Check (Textgroesse, Kontrast, Motion)
- [ ] Crash-freier Resume/Background/Foreground Zyklus
- [ ] Audio/Animation/Touch-Responsiveness auf Zielgeraeten

## 5) Store-Readiness

- [ ] Privacy Policy URL final
- [ ] App-Listing Texte final (DE/EN)
- [ ] Screenshots/Feature Graphic final
- [ ] VersionCode/VersionName erhoeht
- [ ] Release Notes final
- [ ] Rollout-Plan (z. B. 10% staged rollout)

## 6) Go/No-Go

Release nur freigeben, wenn:

- [ ] `assertReleaseSigningConfigured` gruener Build
- [ ] alle automatisierten Checks gruen
- [ ] manuelle Release-Gates bestanden
- [ ] Store-Metadaten final
