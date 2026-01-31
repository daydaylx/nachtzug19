# Audit Fix Report - 2026-01-28

## 1. Übersicht
Dieser Report dokumentiert die durchgeführten Maßnahmen basierend auf dem Audit vom 28. Januar 2026. Fokus lag auf kritischen Typ-Fehlern, Build-Stabilität und Logik-Lücken.

## 2. Durchgeführte Maßnahmen

### A. Typ-Sicherheit & Build (Tech Findings)
- **Problem:** Inkonsistente Definition des `Ending`-Typs (Deutsch `titel` vs. Englisch `title`) führte zu 55+ Fehlern im Type-Check.
- **Lösung:** `Ending`-Typ in `src/domain/types/index.ts` auf Englisch (`title`/`narrative`) standardisiert.
- **Anpassung:** `android-native/.../Models.kt` aktualisiert, um kompatibel zu bleiben (Legacy-Felder optional).
- **Anpassung:** `validateContent.test.ts` und `manifest.ts` auf das neue Schema migriert.
- **Ergebnis:** `npm run type-check` läuft jetzt **fehlerfrei** durch.

### B. Story-Logik (Logic Findings)
- **Problem:** 2 nicht erreichbare Szenen in Kapitel 7 (`c7_s04_boy_transformation`, `c7_s13_seven_price`).
- **Risiko:** Spieler mit niedrigen Stats (`tickets_truth < 4`) wären in `c7_s03` und `c7_s12` in einer Sackgasse gelandet (keine verfügbare Choice).
- **Lösung:** Fallback-Choices ("Notausgänge") hinzugefügt, die zu den bisher unerreichbaren Szenen führen.
- **Ergebnis:** `npm run graph:dump` bestätigt 0 Dead Ends und 0 Unreachable Scenes.

### C. Engine-Stabilität
- **Problem:** Trace-Generator stürzte ab wegen fehlendem `played_recorder` Mapping und `localStorage` Zugriff in Node-Umgebung.
- **Lösung:** `gameEngine.ts` gehärtet (`typeof localStorage` Check) und fehlende State-Mappings ergänzt.
- **Neues Tool:** `scripts/generate_test_trace.ts` erstellt. Generiert 20 zufällige Playthroughs inkl. State-Snapshots als "Golden Master".
- **Artefakt:** `docs/evidence/trace_golden_master.json` erstellt. Dies dient als Referenz für die Android-Implementation.

## 3. Nächste Schritte (Empfehlung)

1.  **Kotlin-Verifikation:**
    - Einen JUnit-Test in `android-native` schreiben, der `trace_golden_master.json` lädt.
    - Der Test muss die gleichen Inputs (Choices) in die Kotlin-Engine füttern und nach jedem Schritt den State mit dem Snapshot vergleichen.
    - Dies garantiert Parität zwischen TypeScript-Design und Android-Runtime.

2.  **Canon-Rules Refactoring (Optional):**
    - Die hartcodierte "Canon Rule R1" (Drift am Bahnhof) aus `gameEngine.ts` entfernen und durch ein generisches Tag-System (`tags: ['station_end']` -> Config) ersetzen.

## 4. Status
- **Build:** ✅ Grün
- **Validierung:** ✅ Grün
- **Content:** ✅ Konsistent (Kapitel 1-7 + Endings erreichbar)
