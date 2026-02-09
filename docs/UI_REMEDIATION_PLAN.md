# UI Remediation Plan - Nachtzug 19

Status: aktiv  
Datum: 2026-02-09  
Owner: UI/UX + Android  
Scope: Android Native Reader-Flow (`PlayerScreen`, `SettingsScreen`, UI Components, Background-System)

## 1. Zielbild
Nachtzug 19 soll sich wie ein interaktiver Roman auf Mobile anfühlen: ruhig, erwachsen, noir, lesefokussiert.  
Kein prototypischer Stil-Mix, keine hektischen UI-Impulse, keine immersion-brechenden Platzhalter.

## 2. Problempriorisierung
### P0 - zerstört Spielerlebnis
- Platzhalter- und Black-Backgrounds im aktiven Storyflow
- Instabiler Lesekontrast bei foto-basierten Hintergründen
- Unterbrochener Lesefluss durch Typewriter-Default + frühe Choice-Verfügbarkeit

### P1 - schwächt Immersion
- Inkonsistente Designsprache (Pixel + Material + Reader-Noir)
- Entscheidungen ohne wahrnehmbares Gewicht
- Blockierendes Verarbeitungs-Overlay nach Choice-Klick
- Unvollständige Reduce-Motion-Umsetzung
- Zu hohe UI-Dichte im oberen Screenbereich

### P2 - Feinschliff
- Sprachmix in Settings
- Typografische Inkonsistenzen in Nebenkomponenten
- Dekoration ohne Informationswert

## 3. Delivery-Phasen und Zeitplan (12 Arbeitstage)
## Phase A - Stabilisierung P0 (Tag 1-5)
Aktueller Stand (2026-02-09):
- Tag 1: abgeschlossen (4/4, Screenshot-Baseline aufgenommen)
- Tag 2: abgeschlossen (Mapping-Bereinigung umgesetzt, Build gruen)
- Tag 3: abgeschlossen (Fallback-Hardening + Mapping-Audit + weicherer Crossfade)
- Tag 4: abgeschlossen (Lesekontrast + Scrollindikator reduziert + Kontrastcheck)
- Tag 5: abgeschlossen (4/4 inklusive 20-Minuten-Lesesession)
- Tag 6: abgeschlossen (3/3: Typografie + Text-Hierarchie + Iconographie vereinheitlicht)
- Tag 7: abgeschlossen (3/3: Choice-Gewichtung im Modell + Kernentscheidungen annotiert + Fallback-Regeln aktiv)
- Tag 8: abgeschlossen (3/3: Gewichtstypen sichtbar + dekorative Stempel entfernt + States harmonisiert)
- Tag 9: abgeschlossen (4/4: zentrale Motion-Policy + systemweite Reduce-Motion-Anbindung)
- Tag 10: abgeschlossen (4/4: Top-Zone entschlackt + Microbar default off + Thumb-Zone-Statuszugriff + Small-Height-Test)
- Tag 11: abgeschlossen (3/3: Sprache vereinheitlicht + Settings-Dichte reduziert + präzise Hilfstexte)
- Artefakte:
  - `docs/ui/PHASE_A_DAY1_BASELINE.md`
  - `docs/evidence/ui_phase_a_day1_baseline.json`
  - `docs/evidence/UI_PHASE_A_DAY1_SCREENSHOT_CAPTURE.md`
  - `docs/evidence/UI_PHASE_A_DAY2_BACKGROUND_AUDIT.md`
  - `docs/evidence/ui_phase_a_day2_baseline_preview.json`
  - `docs/evidence/UI_PHASE_A_DAY3_FALLBACK_HARDENING.md`
  - `docs/evidence/ui_phase_a_day3_mapping_audit.json`
  - `docs/evidence/UI_PHASE_A_DAY4_CONTRAST_PATCH.md`
  - `docs/evidence/ui_phase_a_day4_contrast_check.json`
  - `docs/evidence/UI_PHASE_A_DAY5_FLOW_PATCH.md`
  - `docs/evidence/UI_PHASE_B_DAY6_STYLE_ALIGNMENT.md`
  - `docs/evidence/UI_PHASE_B_DAY7_CHOICE_WEIGHTING_MODEL.md`
  - `docs/evidence/UI_PHASE_B_DAY8_CHOICE_UI_WEIGHTING.md`
  - `docs/evidence/UI_PHASE_B_DAY9_MOTION_POLICY.md`
  - `docs/evidence/UI_PHASE_B_DAY10_MOBILE_LAYOUT.md`
  - `docs/evidence/UI_PHASE_C_DAY11_SETTINGS_LANGUAGE.md`
  - `docs/evidence/UI_PHASE_C_DAY12_RELEASE_QA.md`

### Tag 1 - Baseline und DoD
- [x] `docs/UI_REMEDIATION_PLAN.md` final abstimmen
- [x] Zielmetriken und Quality Gates fixieren
- [x] Screenshot-Baseline fuer 8 Kernszenen erfassen
- [x] Testgeräteklassen festlegen (klein, mittel, groß)
Ergebnis: messbare, verbindliche Abnahmekriterien.

### Tag 2 - Background-Audit
- [x] Alle aktiven `BackgroundAsset`-Mappings prüfen
- [x] Platzhalterbilder aus aktivem Mapping entfernen
- [x] Fallback auf hochwertige Assets pro Kapitel definieren
- [x] Mapping-Liste dokumentieren
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundSystem.kt`
- `android-native/app/src/main/res/drawable-nodpi/*`
Ergebnis: kein Immersionsbruch durch leere/schwarze Hintergründe.

### Tag 3 - Background-Fallback-Hardening
- [x] Szenen ohne explizites Mapping auf kontrollierte Chapter-Fallbacks legen
- [x] Abrupte visuelle Sprünge zwischen Szenen minimieren
- [x] Kontrast-Test auf 8 Kernszenen wiederholen
Ergebnis: konsistente Atmosphäre über gesamten Storyflow.

### Tag 4 - Lesefläche/Lesekontrast
- [x] Narrative-Container opaker machen
- [x] Optionales Backdrop-Dimming lokal hinter Textbereich einführen
- [x] Scrollindikator visuell zurücknehmen (nicht dominant)
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/PixelDialogBox.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
Ergebnis: Fließtext ist in jeder Szene klar lesbar.

### Tag 5 - Narrative Flow
- [x] Typewriter nicht mehr default
- [x] Choices erst nach Textfreigabe oder explizitem Continue aktivieren
- [x] Scene-Wechsel ohne hektische Überlagerungen
- [x] 20-Minuten-Lesesession intern durchführen
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/PixelDialogBox.kt`
Ergebnis: kontrollierter, romanartiger Lesefluss.

## Phase B - Immersion/Interaktion P1 (Tag 6-10)
### Tag 6 - Visuelle Sprache vereinheitlichen
- [x] Pixel-Typografie aus Reader-Hauptfluss entfernen
- [x] Iconographie-System vereinheitlichen
- [x] Text-Hierarchie für HUD/Banner/Status konsolidieren
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/theme/Typography.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/PixelHUD.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/AnnouncementBanner.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/Microbar.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/ReaderIcons.kt`
Ergebnis: ein klarer, erwachsener visueller Stil.

### Tag 7 - Choice-Semantik ins Datenmodell
- [x] Choice-Meta für Gewicht einführen (`neutral`, `riskant`, `irreversibel`)
- [x] Story-JSON für Kernentscheidungen annotieren
- [x] Fallback-Regeln für nicht annotierte Choices definieren
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt`
- `android-native/app/src/main/assets/story.json`
- `src/domain/types/index.ts`
- `src/content/nachtzug19/scenes/c6.ts`
- `src/content/nachtzug19/scenes/c7.ts`
- `scripts/export_story_json.ts`
Ergebnis: Entscheidungstyp ist technisch verfügbar.

### Tag 8 - Choice-UI mit Gewicht
- [x] Visual Language pro Gewichtstyp umsetzen (dezent, aber eindeutig)
- [x] Dekorative Stempel ohne Informationswert entfernen oder minimieren
- [x] Focus/Pressed/Hover Zustände harmonisieren
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/TicketChoice.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
Ergebnis: Entscheidungen fühlen sich bedeutungsvoll und klar an.

### Tag 9 - Reduce Motion konsolidieren
- [x] Zentrale Motion-Policy einführen
- [x] Alle kontinuierlichen/pulsierenden Effekte an Policy anbinden
- [x] Crossfade-Dauer bei Reduce Motion auf minimal oder none
- [x] Choice-Feedback-Animation nicht blockierend und motion-arm
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/SettingsScreen.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/MotionPolicy.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundSystem.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundLayers.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/StationOverlay.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/ChoiceFeedback.kt`
Ergebnis: echte Zugänglichkeit ohne Restanimationen.

### Tag 10 - Mobile Reader Layout
- [x] Top-Zone entschlacken (weniger gestapelte Overlays)
- [x] Microbar standardmäßig deaktivieren, bei Bedarf aufrufbar
- [x] Daumenzonen für primäre Interaktion optimieren
- [x] Kleine Displayhöhe explizit testen
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/Microbar.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt`
Ergebnis: längere Sessions ohne UI-Fatigue.

## Phase C - Feinschliff/Abnahme P2 (Tag 11-12)
### Tag 11 - Settings und Sprache
- [x] Begriffe vollständig lokalisieren und vereinheitlichen
- [x] Settings-Information priorisieren, visuelle Dichte reduzieren
- [x] Hilfstexte präzise und knapp
Betroffene Bereiche:
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/SettingsScreen.kt`
Ergebnis: professionelle, klare Einstellungsseite.

### Tag 12 - Abschluss-QA und Freigabe
- [ ] P0/P1/P2-Checklist final abhaken
- [x] Regression über Storypfade (inkl. Endings) durchführen
- [ ] 10-20 Minuten Lesetest auf 2 Gerätekategorien wiederholen
- [ ] Release-Entscheidung dokumentieren
Ergebnis: releasefähiger Reader-Noir-Flow.

## 4. Definition of Done pro Arbeitspaket
Ein Paket gilt nur als erledigt, wenn alle Punkte erfüllt sind:
- [ ] Code implementiert
- [ ] Build grün (`:app:assembleDebug`)
- [ ] Visueller Vorher/Nachher-Nachweis dokumentiert
- [ ] Keine neue Inkonsistenz gegen Zielbild
- [ ] QA-Check des Pakets bestanden

## 5. Verbindliche Quality Gates
### Gate A (nach Tag 5)
- [x] Keine Platzhalter/Black-Backgrounds im Hauptpfad
- [x] Lesekontrast stabil auf allen Kernszenen
- [x] Typewriter nicht mehr als Default-Lesemodus
- [x] Choices unterbrechen nicht mehr den Erstlesefluss

### Gate B (nach Tag 10)
- [x] Einheitliche visuelle Sprache
- [x] Choice-Gewicht klar erkennbar
- [x] Reduce Motion wirkt systemweit
- [x] Mobile Layout priorisiert Lesefläche

### Gate C (Tag 12)
- [ ] 20-Minuten-Lesesession ohne relevante Immersionsbrüche
- [ ] Keine offenen P0/P1-Punkte
- [ ] Endgültige Freigabe dokumentiert

## 6. Messkriterien
- Lesbarkeit:
  - [ ] Keine Szene mit unzureichender Textlesbarkeit
  - [ ] Narrative-Fläche bleibt dominant auf kleinen Displays
- Motion:
  - [ ] Bei `Reduce Motion = an` keine dauerhaften Animationen
- Decision UX:
  - [ ] Jede Choice ist visuell als Typ lesbar
  - [ ] Kein blockierendes Vollbild-Feedback nach Klick
- Kohärenz:
  - [ ] Kein Stilbruch zwischen HUD, Reader, Choices, Settings

## 7. Risiko- und Abhängigkeitsmatrix
### Risiken
- Asset-Lücke bei Hintergründen kann Phase A verzögern
- Story-JSON-Anpassungen für Choice-Gewichtung können Content-QA triggern
- Motion-Hardening kann unbeabsichtigt dramaturgische Effekte entfernen

### Gegenmaßnahmen
- Fallback-Strategie pro Kapitel zuerst fixieren
- Choice-Meta als additive Felder einführen (abwärtskompatibel)
- Motion-Policy mit klaren Ausnahmen definieren und testen

## 8. Arbeitsmodus und Reporting
- Täglich:
  - [ ] Kurzstatus mit erledigten Punkten und offenen Blockern
- Pro Phase:
  - [ ] Vorher/Nachher-Screens und Gate-Check dokumentieren
- Bei Blockern:
  - [ ] Entscheidung innerhalb 24h treffen (Scope, Ersatzlösung oder Verschiebung)

## 9. Start-Backlog (nächste 48h)
- [x] Tag 1 abschließen (DoD + Baseline + Szenenliste)
- [x] Tag 2 starten (Background-Mapping-Bereinigung)
- [ ] Erste P0-PR vorbereiten (nur Background- und Leseflächen-Themen)
