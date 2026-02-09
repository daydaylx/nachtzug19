# UI Phase B Day 8 - Choice UI Weighting

Datum: 2026-02-09
Status: abgeschlossen

## Ziel
Choice-Gewicht im UI sichtbar machen, ohne laut oder spielig zu werden.

## Umsetzung

### 1) Visuelle Sprache pro Gewichtstyp
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/TicketChoice.kt`

Aenderungen:
- Alte dekorative Ticket-Stempel-Optik entfernt.
- Pro Choice eine klare, reduzierte Gewichtscodierung:
  - `neutral` -> Teal-Akzent + Badge `Neutral`
  - `riskant` -> Orange-Akzent + Badge `Riskant`
  - `irreversibel` -> Rot-Akzent + Badge `Final`
- Farbcodierung ueber linke Akzentlinie + Badge statt lauter Vollflaechen.

### 2) Fokus/Pressed/Hover harmonisiert
- Einheitlicher `interactionSource` fuer Focus und Pressed.
- Dezente Skalierung (`0.994`) und konsistente Border-Animation.
- Keine konkurrierenden/altmodischen Effekte mehr.

### 3) Datenanbindung aus Modell
Datei:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`

Aenderung:
- `TicketChoice(weight = choice.resolvedWeight())`
- Damit greifen explizite Weights aus Content plus Day-7-Fallbacks automatisch.

### 4) Alt-Komponente entfernt
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/TicketChoiceEnhanced.kt` geloescht.
- Ziel: kein zweiter, inkonsistenter Choice-Stil im Codebestand.

## Verifikation

### Build/Test
- `./gradlew :app:testDebugUnitTest --tests "de.daydaylx.nachtzug19.engine.EngineParityTest" :app:assembleDebug`
- Ergebnis: `BUILD SUCCESSFUL`

### Device-Check
- APK installiert auf `SM-S931B` (`RFCY210JHMJ`).
- Screenshots:
  - `docs/evidence/ui-phase-b-day8-choice-weighting/2026-02-09/medium/c6_s18_offer__day8_after.png`
  - `docs/evidence/ui-phase-b-day8-choice-weighting/2026-02-09/medium/c7_s20_conductor_finale__day8_after.png`
  - `docs/evidence/ui-phase-b-day8-choice-weighting/2026-02-09/medium/c7_end_station__day8_after.png`

Beobachtung:
- `Riskant` und `Final` sind im Reader klar unterscheidbar.
- Kein dekorativer Stempel ohne Informationswert mehr.
- Choice-Fluss bleibt ruhig und lesefokussiert.
