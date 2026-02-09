# UI Phase B Day 10 - Mobile Reader Layout

Datum: 2026-02-09  
Status: abgeschlossen

## Ziel
Top-Zone visuell entschlacken, Microbar nicht mehr als Default erzwingen und den Reader fuer Daumenzonen + kleine Displayhoehen robuster machen.

## Umsetzung

### 1) Top-Zone entschlackt
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`

Aenderungen:
- Status-Icon aus der Top-Bar entfernt (`PixelHUD(showStatusButton = false)`).
- Overlays nicht mehr parallel oben gestapelt:
  - `StationOverlay` hat Prioritaet.
  - `AnnouncementBanner` wird nur gezeigt, wenn kein Station-Overlay aktiv ist.

### 2) Microbar standardmaessig aus
Dateien:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/SettingsScreen.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/Microbar.kt`

Aenderungen:
- Neues Setting `ReaderSettings.showMicrobar` eingefuehrt.
- Default: `false`.
- Settings-Toggle "Microbar anzeigen" unter "Overlay" hinzugefuegt.
- Toggle ist deaktiviert, wenn "Status anzeigen" deaktiviert ist.
- Wenn Microbar aus ist, bleibt Status ueber eine ruhige Bottom-Quick-Aktion erreichbar.

### 3) Daumenzonen optimiert
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`

Aenderungen:
- Statuszugriff in den unteren Interaktionsbereich verlagert (`StatusQuickAction`).
- Microbar bei Aktivierung im Choice-Bereich platziert, nicht oben.

### 4) Kleine Displayhoehe explizit behandelt
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`

Aenderungen:
- Compact-Layout bei `screenHeightDp <= 760`:
  - reduzierte horizontale/vertikale Abstaende,
  - kompaktere Choice-Abstaende,
  - kompaktere Microbar-Dichte (`dense = true`).

## Verifikation

### Tests / Build
- Ausgefuehrt:
  - `./gradlew :app:testDebugUnitTest --tests "de.daydaylx.nachtzug19.ui.MotionPolicyTest" --tests "de.daydaylx.nachtzug19.model.ReaderSettingsTest" --tests "de.daydaylx.nachtzug19.engine.EngineParityTest" :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`.
- Parity-Status:
  - `EngineParityTest` ist gruen, aktuell **kein** Drift zwischen Golden Trace und Engine-Stand.

### Device / Install
- Device: `SM_S931B` (`RFCY210JHMJ`)
- Paket: `de.daydaylx.nachtzug19.dev`
- Install:
  - `adb install -r android-native/app/build/outputs/apk/debug/app-debug.apk`
  - Ergebnis: `Success`

### Screenshot-Evidence
- Normale Hoehe (1080x2340):
  - `docs/evidence/ui-phase-b-day10-mobile-layout/2026-02-09/normal/day10_normal_height.png`
- Kleine Hoehe (erzwungen 1080x1700):
  - `docs/evidence/ui-phase-b-day10-mobile-layout/2026-02-09/small-height/day10_small_height_1080x1700.png`

### Small-Height Testablauf
- `adb shell wm size 1080x1700`
- Screenshot aufgenommen
- `adb shell wm size reset`
- Verifiziert: `Physical size: 1080x2340`

## Ergebnis
- Top-Bereich wirkt ruhiger und weniger ueberfrachtet.
- Microbar ist opt-in statt visuellem Dauer-Element.
- Status bleibt ohne Umweg erreichbar, aber im Daumenbereich.
- Layout bleibt bei kleiner Displayhoehe funktional und lesefokussiert.
