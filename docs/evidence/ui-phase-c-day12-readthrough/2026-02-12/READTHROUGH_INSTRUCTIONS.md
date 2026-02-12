# Lesetest-Anleitung - Tag 12 Release QA

Datum: 2026-02-12
APK: `/home/d/Schreibtisch/Nachtzug19/android-native/app/build/outputs/apk/debug/app-debug.apk`
Dauer: 2x 10-20 Minuten (Medium + Small-Height Device)

## Vorbereitung

### APK Installation
```bash
# Gerät per USB verbinden
adb devices

# APK installieren
adb install -r /home/d/Schreibtisch/Nachtzug19/android-native/app/build/outputs/apk/debug/app-debug.apk

# App starten
adb shell am start -n de.daydaylx.nachtzug19/.MainActivity
```

### Gerätekategorien

#### Medium Device (erste Priorität)
- Bildschirmgröße: 6.0" - 6.5"
- Auflösung: ~1080x2340 oder ähnlich
- DPI: 400-440
- Beispiele: Pixel 5, Galaxy S21, OnePlus 9

#### Small-Height Device (zweite Priorität)
- Bildschirmgröße: 5.5" - 6.0"
- Höhe: ≤760dp
- Beispiele: Pixel 4a, Galaxy A52 (kompakt)

---

## Test-Ablauf (pro Device)

### Phase 1: Initialisierung (1-2 Min)

1. **App-Start**
   - App öffnen
   - Ersten Szenenübergang beobachten
   - ✅ Check: Kein Black-Screen oder Platzhalter-Background

2. **Settings prüfen**
   - Settings öffnen (über Menü)
   - Alle Optionen durchsehen
   - ✅ Check: Keine Sprachmix (Deutsch/Englisch)
   - ✅ Check: Hilfstexte präzise und knapp

### Phase 2: Leseflow (10-15 Min)

**Ziel**: Mindestens 3 Kapitel durchspielen

Für jede Szene dokumentieren:
- [ ] Textlesbarkeit (1-5, 5=perfekt)
- [ ] Background-Qualität (kein Platzhalter?)
- [ ] Choice-Verständlichkeit (Gewicht erkennbar?)
- [ ] Immersionsbrüche (ja/nein + Beschreibung)

**Fokuspunkte**:
1. **Textlesbarkeit**
   - Ist Narrative auf **allen** Szenen klar lesbar?
   - Reicht der Kontrast zwischen Text und Background?
   - Ist die Lesefläche dominant (nicht von UI überladen)?

2. **Background-System**
   - Sind alle Backgrounds hochwertige Assets (keine Platzhalter)?
   - Sind Übergänge weich (kein abrupter Farbwechsel)?
   - Passt die Atmosphäre zur Story?

3. **Choice-UI**
   - Ist das Gewicht jeder Choice klar erkennbar?
     - Neutral (standard)
     - Riskant (warning colors)
     - Irreversibel (distinct visual)
   - Gibt es Feedback nach Choice-Auswahl (kurzer Flash)?
   - Blockiert das Feedback nicht den Lesefluss?

4. **Narrative Flow**
   - Typewriter standardmäßig deaktiviert?
   - Choices erst nach Textfreigabe aktiv?
   - Keine hektischen Overlays bei Szenenwechsel?

### Phase 3: Motion & Accessibility (2-3 Min)

1. **Reduce Motion aktivieren**
   - Settings → Bewegung reduzieren: AN
   - Mehrere Szenen durchspielen
   - ✅ Check: Keine dauerhaften Animationen mehr
   - ✅ Check: Background-Drift gestoppt
   - ✅ Check: Crossfade minimal/none

2. **Microbar & Status**
   - Microbar standardmäßig deaktiviert?
   - Status über Button in Thumb-Zone erreichbar?
   - Status-Sheet zeigt alle Werte korrekt?

### Phase 4: Small-Display Test (nur bei Small-Height)

1. **Layout-Optimierung**
   - Top-Zone aufgeräumt (wenig gestapelte Overlays)?
   - Lesefläche bleibt dominant?
   - Choices gut erreichbar (Thumb-Zone)?

2. **Kritische Szenen**
   - Lange Narrative: Scrolling funktioniert?
   - Viele Choices: Alle sichtbar ohne Overlap?

---

## Dokumentation während Test

### Session Log Template
Erstelle: `docs/evidence/ui-phase-c-day12-readthrough/2026-02-12/{medium|small}/session_log.txt`

```
=== READTHROUGH SESSION LOG ===
Datum: 2026-02-12
Device: [Name, Modell, Android-Version]
Display: [Größe, Auflösung, DPI]
Start: [HH:MM]

--- SZENE: [ID] ---
Timestamp: [HH:MM]
Textlesbarkeit: [1-5]
Background: [OK/ISSUE: ...]
Choices: [Anzahl, Gewicht erkennbar? ja/nein]
Immersionsbrüche: [ja/nein + Details]
Notes: [Freitext]

[...weitere Szenen...]

Ende: [HH:MM]
Gesamtdauer: [MM] Minuten
Kapitel abgeschlossen: [Anzahl]

=== ZUSAMMENFASSUNG ===
Schwerwiegende Issues: [Anzahl + Liste]
Kleine Auffälligkeiten: [Anzahl + Liste]
Gate C Kriterien erfüllt: [ja/nein]
```

### Screenshots (optional aber hilfreich)
```bash
# Screenshot während Test
adb exec-out screencap -p > docs/evidence/ui-phase-c-day12-readthrough/2026-02-12/medium/scene_[ID]_[timestamp].png
```

---

## Gate C Kriterien-Checkliste

Nach dem Test evaluieren:

### Lesbarkeit
- [ ] Keine Szene mit unzureichender Textlesbarkeit
- [ ] Narrative-Fläche bleibt dominant auf kleinen Displays

### Motion
- [ ] Bei "Reduce Motion = an" keine dauerhaften Animationen

### Decision UX
- [ ] Jede Choice ist visuell als Typ lesbar
- [ ] Kein blockierendes Vollbild-Feedback nach Klick

### Kohärenz
- [ ] Kein Stilbruch zwischen HUD, Reader, Choices, Settings

### Gesamteindruck
- [ ] 20-Minuten-Lesesession ohne relevante Immersionsbrüche
- [ ] Keine offenen P0/P1-Punkte gefunden

---

## Nächste Schritte nach Test

1. Session Logs in Repo speichern
2. Screenshots (falls erstellt) committen
3. Gate C Evaluation in `docs/UI_REMEDIATION_PLAN.md` updaten
4. Release-Entscheidung in `docs/evidence/UI_PHASE_C_DAY12_RELEASE_QA.md` dokumentieren

---

## Bei Problemen

### App stürzt ab
```bash
# Logs holen
adb logcat -d > crash_log.txt
```

### Device disconnected
```bash
# Reconnect
adb kill-server
adb start-server
adb devices
```

### APK Installation schlägt fehl
```bash
# Alte Version deinstallieren
adb uninstall de.daydaylx.nachtzug19

# Neu installieren
adb install /home/d/Schreibtisch/Nachtzug19/android-native/app/build/outputs/apk/debug/app-debug.apk
```
