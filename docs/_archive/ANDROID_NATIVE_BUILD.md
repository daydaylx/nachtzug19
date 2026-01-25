# Android Native Build

## Prerequisites
- Android Studio (Hedgehog or newer)
- JDK 17
- Node.js 18+

## Story Export (story.json)
From the repo root:

```bash
npm run export:story
```

This writes `export/story.json` and, when available, copies it to:
`android-native/app/src/main/assets/story.json`.

If you want to manually sync after changes:

```bash
cd android-native
./gradlew :app:syncStoryAssets
```

## Open Project
1. Open `android-native/` in Android Studio.
2. Let Gradle sync.
3. Run the `app` configuration on a device or emulator.

## Debug Build (CLI)
```bash
cd android-native
./gradlew :app:assembleDebug
```

APK output:
`android-native/app/build/outputs/apk/debug/app-debug.apk`

## Release Build
```bash
cd android-native
./gradlew :app:assembleRelease
```

Signing:
- Configure signing in `android-native/app/build.gradle.kts` or
  `android-native/gradle.properties`.
- Android Studio: Build > Generate Signed Bundle / APK.

## Unit Tests
```bash
cd android-native
./gradlew :app:testDebugUnitTest
```

## Troubleshooting
- **story.json missing**: run `npm run export:story` and re-sync assets.
- **JSON parse error**: ensure `export/story.json` is valid and includes endings.
- **Gradle/JDK mismatch**: verify JDK 17 is selected in Android Studio.
