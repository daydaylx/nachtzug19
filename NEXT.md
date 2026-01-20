# NEXT STEPS - NACHTZUG 19

**Erstellt:** 2026-01-17
**Letztes Update:** 2026-01-18

---

## 📋 Abgeschlossene Aufgaben (Stand 2026-01-18)

### ✅ Alle abgeschlossenen Meilensteine

**Content Complete:**
- ✅ Kapitel 1-7: Alle Szenen geschrieben, verlinkt und poliert
- ✅ Jedes Kapitel erreicht 30-35 Minuten Spielzeit
- ✅ ~24-27 Szenen pro Kapitel (5.000-6.500 Wörter)

**Mechaniken:**
- ✅ Drift-Mechanik: Voll integriert in alle Kapitel (Varianten, Glitches)
- ✅ Items & Gates: Tag 19, Rekorder und Kontrollen funktionieren logisch
- ✅ NPC-Recognition: High-Truth-Spieler erkennen NPCs in Kapitel 7
- ✅ Tag 19 Power-Up: Synästhetische Effekte und Anker-Mechanik

**Qualität:**
- ✅ 0 Validation Errors
- ✅ 0 Warnings (state_notes bereinigt)
- ✅ Alle Tests grün

**UI-Test:**
- ✅ Drift-Mechanik im Browser verifiziert
- ✅ Narrative variants korrekt angezeigt bei verschiedenen Drift-Leveln

**QA-Fixes (2026-01-18):**
- ✅ FAKE-CHOICEs differenziert (c4_s01a_double_reflection, c4_s02_recorder_prophecy, c5_s01_final_preparation)
- ✅ photo_anomaly Payoff in c7_s21_photo_revelation

---

## 🚀 Aktuelle Prioritäten (Post-Launch)

### Option 1: End-to-End Playthrough 🎯 EMPFOHLEN

**Status:** [ ] Nicht gestartet

**Ziel:** Komplettes Spiel von Kapitel 1 bis 7 durchspielen

**Schritte:**
- [ ] Alle 7 Kapitel sequenziell durchspielen
- [ ] Mindestens 3 unterschiedliche Pfade testen (Truth, Escape, Love, Guilt)
- [ ] Alle 4 Enden erreichen und verifizieren:
  - [ ] Ending A (Truth)
  - [ ] Ending B (Escape)
  - [ ] Ending C (Love)
  - [ ] Ending D (Limbo/Fallback)
- [ ] Balance-Ticket-Werte dokumentieren (falls zu schwer/zu leicht)
- [ ] UI-Flow testen (Start Screen → Kapitelwechsel → Endings)
- [ ] Bugs oder Inkonsistenzen dokumentieren

**Notizen:**
```
Datum: [YYYY-MM-DD HH:MM]
Ergebnis:
-
```

---

### Option 2: UI-Polishing und Animationen

**Status:** [ ] Nicht gestartet

**Mögliche Verbesserungen:**
- [ ] Smooth Transitions zwischen Szenen
- [ ] Typewriter-Effekt optimieren (Geschwindigkeit anpassbar?)
- [ ] Atmosphären-Modus-Transitionen (normal → danger → mystic → somber)
- [ ] Choice-Button Hover-Effekte
- [ ] Sound-Design (falls gewünscht)
- [ ] Background-Animationen (Zug-Bewegung, Licht-Effekte)

**Priorität:** Nice-to-have, nicht kritisch

**Notizen:**
```
Datum: [YYYY-MM-DD HH:MM]
Status:
-
```

---

### Option 3: Content-Audit und Feinabstimmung

**Status:** [ ] Nicht gestartet

**Tasks:**
- [ ] Dialoge auf Konsistenz prüfen (NPC-Tonalität)
- [ ] Atmosphärische Szenen auf Stimmigkeit prüfen
- [ ] Story-Pacing prüfen (keine Kapitel zu schnell/zu langsam)
- [ ] Typos und Grammatik-Korrekturen
- [ ] Story-Loops und Dead-Ends final prüfen
- [ ] Callback-Consistency (keine versprochenen Callbacks vergessen)

**Tools:**
- `npm test` (Validation-Tests)
- `node scripts/audit_chapters.mjs` (Content-Audit)

**Notizen:**
```
Datum: [YYYY-MM-DD HH:MM]
Status:
-
```

---

### Option 4: Android-Native Port

**Status:** [ ] Nicht gestartet

**Info:** Siehe `docs/ANDROID_NATIVE_BUILD.md` für technische Details

**Schritte:**
- [ ] Gradle-Projekt Setup verifizieren
- [ ] React-Native Bridge implementieren
- [ ] UI-Komponenten an Android anpassen
- [ ] Game-Engine Port testen
- [ ] Performance-Optimierung
- [ ] Play Store Vorbereitung

**Priorität:** Feature für zukünftige Version

**Notizen:**
```
Datum: [YYYY-MM-DD HH:MM]
Status:
-
```

---

## 📊 Aktuelle Projekt-Status

### ✅ Fertiggestellt (100%)
- Engine & Architektur
- UI-Layout & Komponenten
- Alle 7 Kapitel (Content)
- Drift-Mechanik
- Item-System (Tag 19, Rekorder)
- Kontroll-System (Kap. 2, 3, 5)
- Ending-System (4 Enden)
- NPC-Recognition
- Content-Validierung
- Unit-Tests
- Debug-Tools
- QA-Fixes (FAKE-CHOICEs, photo_anomaly Payoff)

### 🚧 In Entwicklung (0%)
- [ ] End-to-End Playthrough Testing
- [ ] UI-Polishing
- [ ] Content-Feinabstimmung
- [ ] Android-Native Port

---

## 🎯 Empfohlene Reihenfolge

1. **Option 1** (End-to-End Playthrough) - Wichtigster Test vor Release
2. **Option 3** (Content-Audit) - Feinabstimmung basierend auf Playthrough
3. **Option 2** (UI-Polishing) - Nice-to-have für bessere Spielerfahrung
4. **Option 4** (Android-Native) - Feature für zukünftige Version

---

## 📝 Historie

| Datum | Aktion | Details |
|-------|--------|---------|
| 2026-01-17 | Dokument erstellt | Initiale Version mit 4 Optionen |
| 2026-01-17 | Kapitel 3-7 Finalisiert | Content Complete |
| 2026-01-18 | Dokument aktualisiert | Abgeschlossene Aufgaben in History verschoben |
| 2026-01-18 | QA-Fixes abgeschlossen | FAKE-CHOICEs differenziert, photo_anomaly Payoff, Validation clean |
