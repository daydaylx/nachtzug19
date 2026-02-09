# UI Phase A Day 4 - Contrast Patch

Datum: 2026-02-08  
Status: abgeschlossen (3/3 Tasks umgesetzt)

## Umgesetzt
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/PixelDialogBox.kt`

Änderungen:
1. Dialogbox-Opazität deutlich erhöht
- Border und Container von stark transparent auf hoch-opak gestellt

2. Lokales Readability-Dimming im Lesebereich ergänzt
- Vertikales Dark-Gradient im Textcontainer
- Zusätzliche radiale Abschattung zur Hintergrundberuhigung

3. Scrollindikator visuell zurückgenommen
- Progress-Bar dünner und kürzer
- Continue-Hinweis dezenter formuliert
- Indikator nur solange weiterer Scroll möglich ist

Erwarteter UX-Effekt:
- Stabilerer Lesekontrast über fotografischen Hintergründen
- Weniger visuelle Konkurrenz im Textbereich

## Kontrast-Check
Artefakt:
- `docs/evidence/ui_phase_a_day4_contrast_check.json`

Ergebnis (worst-case über hellem Hintergrund):
- Kontrast Text vs Container: 8.54:1
- Kontrast Text vs Mid-Gradient: 13.86:1
- Kontrast Text vs Edge-Dim: 14.81:1
- Referenz: WCAG AA Normaltext 4.5:1

## Verifikation
- Build: `./gradlew :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`
