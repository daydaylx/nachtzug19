# UI Phase B Day 6 - Iconography Alignment

Datum: 2026-02-09
Status: abgeschlossen

## Ziel
Einheitliches Icon-System im Reader-Hauptfluss (HUD + Microbar) ohne Stilbruch zwischen unterschiedlichen Material-Iconfamilien.

## Code-Aenderungen
Dateien:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/ReaderIcons.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/Microbar.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/PixelHUD.kt`

### 1) Zentrales Icon-Mapping
- Neues Objekt `ReaderIcons` eingefuehrt.
- Reader-Core nutzt jetzt konsistent `Icons.Rounded`:
  - `ConfirmationNumber` (Tickets)
  - `Waves` (Drift)
  - `Visibility` (Attention)
  - `Tune` (Status)
  - `Settings` (Einstellungen)

### 2) HUD-Konsistenz
- `PixelHUD` verwendet jetzt `ReaderIcons.Status` und `ReaderIcons.Settings`.
- Einheitliche Groessenlogik ueber `HudIconButton`.
- Klarere Semantik in Content-Descriptions (`Einstellungen` statt `Settings`).

### 3) Microbar-Konsistenz
- Microbar-Icons auf `ReaderIcons` umgestellt.
- Ticket-Metrik nutzt eigenes Icon statt `Tune`.
- Einheitlicher visuell ruhiger Icon-Container + reduzierte Value-Darstellung.
- Akzentfarben direkt an Reader-Palette gekoppelt (`TicketFilled`, `DriftNeutral`, `ControlOrange`).

## Verifikation
- Build: `./gradlew :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`
- Install: `adb install -r .../app-debug.apk` -> `Success`
- Visueller Nachweis:
  - `docs/evidence/ui-phase-b-day6-icons/2026-02-09/medium/c4_s01_mirror_intro__icons_after.png`

## Ergebnis
- Offener Day-6-Punkt "Iconographie-System vereinheitlichen" ist erledigt.
- Reader-Hauptfluss zeigt keine Icon-Familienmischung mehr in HUD/Microbar.
