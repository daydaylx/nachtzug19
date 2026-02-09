# Phase A - Day 1 Baseline (P0 Stabilisierung)

Datum: 2026-02-09  
Status: abgeschlossen

## 1. Ziel von Day 1
- Abnahmekriterien scharf machen (DoD + messbare Quality Gates)
- Kernszenen für Vorher/Nachher-Vergleich festlegen
- Testgeräteklassen definieren
- Baseline-Capture-Protokoll festlegen

## 2. Device-Status
- ADB erreichbar: ja
- Verbundene Devices: ja (`RFCY210JHMJ`, `SM-S931B`)
- Screenshot-Baseline erfasst unter: `docs/evidence/ui-baseline/2026-02-09/medium/`

## 3. Testgeräteklassen (verbindlich)
1. `Small`:
- 360 x 640 dp (typische kleinere Android-Geräte)
- Fokus: vertikale Enge, Lesefläche, Choice-Stacking

2. `Medium`:
- 393 x 851 dp (aktueller Android-Mid/Flagship-Standard)
- Fokus: Primärziel für UI-Balance

3. `Large`:
- 412 x 915 dp
- Fokus: typografische Wirkung, Abstandssystem, Edge-Dichte

## 4. Baseline-Kernszenen (8, Stand vor Day-2-Mapping-Fix)
Quelle: `docs/evidence/ui_phase_a_day1_baseline.json`

| Szene | Kapitel | Titel | Mapping vor Fix | Asset |
|---|---:|---|---|---|
| `c1_s01_platform` | 1 | Leerer Bahnsteig | `Platform` | `bg_loc_platform_v1.png` |
| `c1_s03_inside_train` | 1 | Innen | `Window` | `bg_loc_window_v1.png` |
| `c2_control_01_approach` | 2 | Der Schaffner | `Control` | `bg_scene_control_v1.png` |
| `c3_s03b_inside_comp7` | 3 | Wagen 7 | `Comp7` | `bg_loc_comp7_v1.png` |
| `c4_s01_mirror_intro` | 4 | Spiegel | `Mirror` | `bg_scene_mirror_v1.png` |
| `c6_s11_announcement` | 6 | Durchsage | `NightGeneral` | `bg_scene_night_general_v1.png` |
| `c7_end_station` | 7 | Endstation | `Platform` | `bg_loc_platform_v1.png` |
| `ending_truth_01` | 7 | Licht | `Window` | `bg_loc_window_v1.png` |

## 5. Durchgefuehrtes Capture-Protokoll (2026-02-09)
1. Debug-Build installieren:
```bash
cd android-native
./gradlew :app:assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

2. Pro Szene direkt in die Zielszene starten (`debug_scene_id`):
```bash
adb shell am start -W \
  -n de.daydaylx.nachtzug19.dev/de.daydaylx.nachtzug19.MainActivity \
  --es debug_scene_id <scene_id>
```

3. Screenshot erfassen:
```bash
adb exec-out screencap -p > docs/evidence/ui-baseline/2026-02-09/medium/<scene_id>__before.png
```

4. Ablage:
- `docs/evidence/ui-baseline/<date>/<device_class>/`

5. Namenskonvention:
- `<scene_id>__before.png`
- `<scene_id>__after.png`

## 6. Baseline-Bewertungskriterien pro Screenshot
- Lesbarkeit:
  - Fließtext ohne visuelles Rauschen klar lesbar
  - Keine Konkurrenz durch dominante Overlay-Elemente
- Immersion:
  - Keine offenkundigen Placeholder/Black-Flächen
  - Keine Stilbrüche zwischen Background, HUD, Choice-Bereich
- Mobile:
  - Choices in Daumenzone erreichbar
  - Lesefläche bleibt dominant trotz Top-UI

## 7. Day-1-Ergebnis
- Erledigt:
  - DoD/Quality-Gates sind im Master-Plan festgelegt
  - Geräteklassen definiert
  - 8 Kernszenen + aktuelles Background-Mapping fixiert
  - JSON-Artefakt erzeugt (`docs/evidence/ui_phase_a_day1_baseline.json`)
  - Screenshot-Baseline fuer alle 8 Kernszenen aufgenommen (`docs/evidence/ui-baseline/2026-02-09/medium/`)

## 8. Nächster Schritt (Day 2)
- Background-Audit starten:
  - Placeholder-Assets aus aktivem Mapping entfernen
  - Kapitel-Fallbacks bereinigen
  - Mapping-Änderungen dokumentieren
