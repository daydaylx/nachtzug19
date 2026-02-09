# UI Phase A Day 2 - Background Audit

Datum: 2026-02-08  
Status: abgeschlossen (technisch), visuelles QA-Capture ausstehend (kein Device)

## 1. Ziel
P0-Risiko reduzieren, indem placeholder- oder low-detail Assets aus dem aktiven Story-Mapping entfernt werden.

## 2. Technischer Befund vor Fix
Asset-Analyse zeigte mehrere problematische Hintergründe:
- `bg_ending_home_v1.png` (325 Bytes, effektiv schwarz)
- `bg_ending_library_v1.png` (325 Bytes, effektiv schwarz)
- `bg_scene_announcement_v1.png` (flat)
- `bg_scene_mirror_v1.png` (nahezu schwarz)
- `bg_scene_void_v1.png` (nahezu schwarz)
- `bg_loc_compartment_v1.png` (nahezu schwarz)
- `bg_scene_control_v1.png`, `bg_ending_city_v1.png`, `bg_ending_reunion_v1.png` (sehr geringe Detailtiefe)

## 3. Umgesetzte Mapping-Änderungen
Datei: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundSystem.kt`

1. Scene-ID Mapping
- `anomaly`/`passenger`: `Compartment` -> `Corridor`

2. Tag Mapping
- `Ending`: auf robuste Assets umgestellt (`NightGeneral`, `Window`, `Corridor`, `PlatformAlt`) statt spezieller Ending-Placeholder
- `Control`: `Control` -> `Corridor`
- `Announcement`: `Announcement` -> `Transition`
- `Reveal` (ab Kapitel 2): `Mirror` -> `Window`
- `Secret`: `Compartment` -> `Corridor`
- `Setup` Kapitel 4: `Mirror` -> `Window`

3. Kapitel-Fallback
- Kapitel 3 Fallback: `Compartment` -> `Comp7`

## 4. Verifikation über alle 181 Szenen
Nach dem Patch sind im aktuellen Storyflow aktiv:
- `bg_loc_window_v1.png`: 36 Szenen
- `bg_loc_transition_v1.png`: 34 Szenen
- `bg_scene_night_general_v1.png`: 34 Szenen
- `bg_loc_corridor_v1.png`: 32 Szenen
- `bg_loc_platform_v1.png`: 19 Szenen
- `bg_loc_comp7_v1.png`: 15 Szenen
- `bg_loc_platform_alt_v1.png`: 11 Szenen

Placeholder-prone Assets aktiv genutzt:
- keine

## 5. Baseline-Preview nach Patch
Artefakt:
- `docs/evidence/ui_phase_a_day2_baseline_preview.json`

Kernwirkung:
- `c2_control_01_approach`: jetzt `Corridor` statt `Control`
- `c4_s01_mirror_intro`: jetzt `Window` statt `Mirror`
- `ending_truth_01`: jetzt `NightGeneral` statt `Window`

## 6. Build-Status
Verifiziert mit:
- `./gradlew :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`

## 7. Offene Punkte
- Visuelle Vorher/Nachher-Screenshots auf Device fehlen weiterhin
- Announcement-Szenen im Content sollten konsistent mit `SceneTag.Announcement` annotiert werden (separater Content-Task)
