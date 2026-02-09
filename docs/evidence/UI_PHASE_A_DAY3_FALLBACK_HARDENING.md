# UI Phase A Day 3 - Fallback Hardening

Datum: 2026-02-08  
Status: abgeschlossen (technisch), visuelle Device-QA ausstehend

## 1. Ziel
- Szenen ohne explizites Mapping auf kontrollierte Kapitel-Fallbacks legen
- abrupte visuelle Spruenge reduzieren
- 8-Kernszenen-Check nach Mapping-Hardening nachvollziehbar machen

## 2. Umgesetzte Aenderungen
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundSystem.kt`

Kernpunkte:
1. Zentrale Fallback-Helfer eingefuehrt
- `chapterFallbackBackground(...)`
- `revealBackground(...)`
- `endingBackground(...)`

2. Reveal-Mapping kapitelabhaengig gemacht
- CH1 -> `PlatformAlt`
- CH2 -> `Corridor`
- CH3 -> `Comp7`
- CH4 -> `Window`
- sonst Kapitel-Fallback

3. Recorder/Listening kontextabhaengig
- ab Kapitel 3 -> `Comp7`, davor -> `Window`

4. Transition-Smoothing
- Hintergrund-Crossfade auf 420ms erhoeht

## 3. Vollabdeckung ueber Story
Artefakt:
- `docs/evidence/ui_phase_a_day3_mapping_audit.json`

Befund:
- 181/181 Szenen auf robuste Asset-Menge gemappt
- Placeholder-prone Assets im aktiven Mapping: keine

## 4. Kernszenen-Check
Im Audit enthalten:
- `c1_s01_platform`
- `c1_s03_inside_train`
- `c2_control_01_approach`
- `c3_s03b_inside_comp7`
- `c4_s01_mirror_intro`
- `c6_s11_announcement`
- `c7_end_station`
- `ending_truth_01`

## 5. Verifikation
- Build: `./gradlew :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`

