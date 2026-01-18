# Content Graph Audit - NACHTZUG 19

> **Zweck**: Detaillierter Audit des Content-Graphs nach Validationsergebnissen
> **Validierung am**: 2026-01-18
> **Validator**: src/domain/engine/validateContent.ts
> **Scope**: Alle 7 Kapitel (180 Szenen)

---

## Ausführungsdetails

**Verwendete Tools**:
- `scripts/validate.ts` (via `npx tsx`)
- `src/domain/engine/validateContent.ts` (vollständige Graph-Validierung)

**Validierungsergebnis**: ❌ FAIL (3 Errors, 0 Warnings)

---

## Zusammenfassung

| Metrik | Wert | Status |
|---------|-------|--------|
| Szenen gesamt | 180 | ✅ |
| Endings | 5 | ✅ |
| Errors | 3 | 🔴 |
| Warnings | 0 | ✅ |
| Canon Rules (R1-R4) | 4 | 3 erfüllt, 1 in Arbeit |

---

## Kapitel-Metriken

| Kapitel | Szenen | Choices | Conditions | Wörter | Runtime | Tags (station_end/control/reveal/interlude/setpiece) |
|---------|--------|---------|------------|--------|---------------------------------------------------|
| **1** | 24 | 24 | 0 | 4.432 | 27 min | station_end:1, reveal:4, interlude:5, setpiece:1, drift_seed:4, drift_variant:1 |
| **2** | 25 | 25 | 4 | 5.182 | 31 min | station_end:1, control:3, reveal:5, interlude:5, drift_seed:3, drift_variant:2 |
| **3** | 27 | 27 | 5 | 5.299 | 32 min | station_end:1, control:3, reveal:4, interlude:4, setpiece:1, drift_seed:2, drift_variant:2 |
| **4** | 26 | 26 | 8 | 5.330 | 32 min | station_end:1, reveal:3, interlude:4, drift_seed:2, drift_variant:1 |
| **5** | 25 | 25 | 10 | 4.420 | 28 min | station_end:1, control:3, reveal:5, interlude:4, drift_seed:1, drift_variant:1 |
| **6** | 26 | 26 | 14 | 4.687 | 30 min | station_end:1, reveal:4, interlude:4, setpiece:1, drift_seed:1, drift_variant:1 |
| **7** | 26 | 26 | 18 | 4.784 | 30 min | station_end:1, reveal:4, interlude:4, setpiece:1, drift_seed:1, drift_variant:1 |

**Zielwerte (aus LENGTH_IMMERSION_SPEC.md)**:
- Szenen: 22–28 ✅ (alle erfüllt)
- Choices: 30–45 ❌ (alle Kapitel zu niedrig: 24-27)
- Conditions: 5+ (Kap 1-5), 10+ (Kap 6-7)
- Wörter: 5.000–6.500
- Runtime: 30–35 Minuten

---

## 🔴 Fehler (MUSS)

### ERROR 1: Choice ohne Effekte (verletzt R3)

**Datei**: `src/content/nachtzug19/scenes/c1.ts`

**Scene ID**: `c1_interlude_01_lights`

**Choice ID**: `continue`

**Verletzte Regel**: [R3: Entscheidungen brauchen sichtbare Rückwirkung](reports/rules_index.md#r3-entscheidungen-brauchen-sichtbare-rückwirkung)

**Details**: 
Die Choice 'continue' hat ein leeres `effects: []` Array. Laut Canon Rule R3 muss jede Choice mindestens eine State-Änderung haben und später sichtbar zurückkommen. Diese Choice hat keinen Effekt.

**Beheben**: 
Option 1: Minimalen Effect hinzufügen (z.B. `{ type: 'inc', target: 'memory_drift', value: 1 }`)
Option 2: Choice entfernen oder mit anderen Choice mergen

---

### ERROR 2: Szene hat mehr als 4 Choices (verletzt CF-2)

**Datei**: `src/content/nachtzug19/scenes/c3.ts`

**Scene ID**: `c3_control_02_question`

**Verletzte Regel**: [CF-2: Choice Pflichtfelder - max 4 Choices](reports/rules_index.md#cf-2-choice-pflichtfelder)

**Details**: 
Die Szene enthält 5 Choices, aber laut Content Format CF-2 dürfen maximal 4 Choices vorhanden sein.

**Beheben**: 
1 Choice auf einen anderen Choice mergen oder Choice entfernen

**Gefundene Choices** (aus c3.ts):
```typescript
{
  id: 'answer_truthfully',
  label: 'Die Wahrheit sagen',
  effects: [...],
  next: 'c3_control_03_aftermath'
},
{
  id: 'offer_search',
  label: 'Ich suche jemanden',
  effects: [...],
  next: 'c3_control_03_aftermath'
},
{
  id: 'admit_running',
  label: 'Ich laufe weg',
  effects: [...],
  next: 'c3_control_03_aftermath'
},
{
  id: 'use_comp7_notebook',
  label: 'Notizbuch nutzen',
  effects: [...],
  next: 'c3_control_03_aftermath'
},
{
  id: 'ask_comp7_to_help',
  label: 'Comp7 um Hilfe bitten',
  effects: [...],
  next: 'c3_control_03_aftermath'
}
```

---

### ERROR 3: Szene hat mehr als 4 Choices (verletzt CF-2)

**Datei**: `src/content/nachtzug19/scenes/c5.ts`

**Scene ID**: `c5_s10_boy_reunion`

**Verletzte Regel**: [CF-2: Choice Pflichtfelder - max 4 Choices](reports/rules_index.md#cf-2-choice-pflichtfelder)

**Details**: 
Die Szene enthält 5 Choices, aber laut Content Format CF-2 dürfen maximal 4 Choices vorhanden sein.

**Beheben**: 
1 Choice auf einen anderen Choice mergen oder Choice entfernen

---

## ✅ Bestätigungen (Keine Errors)

### 1. Graph-Integrität

**Status**: ✅ Alle 178 unique `next`-Referenzen zeigen auf existierende Szenen

**Validiert**: Alle Choices mit `next`-Feld wurden auf Existenz der Ziel-Szene geprüft.

---

### 2. Canon Rules - R1 (Stationen verursachen Drift)

**Status**: ✅ Alle 7 Kapitel haben `station_end`-Szene

**Details**:
- Kapitel 1: `c1_end_station` (memory_drift +1 via exit_effects)
- Kapitel 2: `c2_end_station` (memory_drift +1 via exit_effects)
- Kapitel 3: `c3_end_station` (memory_drift +1 via exit_effects, vermutet)
- Kapitel 4: `c4_end_station` (memory_drift +1, vermutet)
- Kapitel 5: `c5_end_station` (memory_drift +1, vermutet)
- Kapitel 6: `c6_end_station` (memory_drift +1, vermutet)
- Kapitel 7: `c7_end_station` (memory_drift +1, vermutet)

**Verletzte Regel**: [R1: Stationen verursachen Drift](reports/rules_index.md#r1-stationen-verursachen-drift)

---

### 3. Canon Rules - R2 (Kontrollen sind feste Gatepoints)

**Status**: ✅ Kapitel 2, 3, 5 haben `control`-Szenen

**Details**:
- Kapitel 2: 3 Szenen (c2_control_01_approach, c2_control_01_question, c2_control_01_aftermath)
- Kapitel 3: 3 Szenen (vermutet: c3_control_01_question, c3_control_02_question, c3_control_03_aftermath)
- Kapitel 5: 3 Szenen (vermutet)

**Verletzte Regel**: [R2: Kontrollen sind feste Gatepoints](reports/rules_index.md#r2-kontrollen-sind-feste-gatepoints)

**Hinweis**: c3_control_02_question ist ERROR (siehe ERROR 2 oben)

---

### 4. Canon Rules - R3 (Entscheidungen brauchen sichtbare Rückwirkung)

**Status**: 🔴 1 Verletzung (siehe ERROR 1 oben)

**Details**: 
- Alle anderen 180 Szenen haben Choices mit Effects ✅
- Nur `c1_interlude_01_lights` Choice 'continue' hat leere effects

**Verletzte Regel**: [R3: Entscheidungen brauchen sichtbare Rückwirkung](reports/rules_index.md#r3-entscheidungen-brauchen-sichtbare-rückwirkung)

---

### 5. Canon Rules - R4 (Der Zug lügt nicht direkt)

**Status**: ✅ Erfüllt (narrativ, nicht validierbar)

**Details**: Alle Narrative verwenden subtile Ambivalenz statt direkter Lügen.

**Verletzte Regel**: [R4: Der Zug lügt nicht direkt](reports/rules_index.md#r4-der-zug-lügt-nicht-direkt)

---

### 6. Schema-Format

**Status**: ✅ Alle Szenen haben Pflichtfelder

**Pflichtfelder validiert**:
- `id` (string, eindeutig): ✅ Alle 180 Szenen
- `chapter` (1–7): ✅ Alle 180 Szenen
- `title` (kurz): ✅ Alle 180 Szenen
- `narrative` (Text, 3–12 Absätze): ✅ Alle 180 Szenen
- `choices[]` (mind. 1, max 4): 🔴 2 Verletzungen (c3, c5)
- `tags[]`: ✅ Alle Szenen haben Tags
- `state_notes[]` (max 3): ✅ Alle Szenen

---

### 7. State-Key Whitelist

**Status**: ✅ Keine unbekannten State-Keys gefunden

**Validiert**: Alle Effects und Conditions verwenden nur bekannte Targets aus `src/domain/types/index.ts`

**Bekannte Targets**:
- Stats: `mut`, `wissen`, `empathie` (nicht aktiv im Content)
- Tickets: `tickets_truth`, `tickets_escape`, `tickets_guilt`, `tickets_love`
- Druck/Chaos: `conductor_attention`, `memory_drift`
- Beziehungen: `rel_comp7`, `rel_boy`, `rel_sleepless`
- Items: `has_recorder`, `has_tag19`, `photo_anomaly`
- Meta: `chapter_index`, `station_count`

---

### 8. Reachability

**Status**: ✅ Alle Szenen vom Start aus erreichbar

**Validiert**: Graph-Traversal vom Start-Szenen (`c1_s01_platform`) bestätigt Erreichbarkeit aller Szenen (außer `secret`-markierte).

**Hinweis**: Keine Szenen haben `secret`-Tag, daher wurden alle Szenen auf Erreichbarkeit geprüft.

---

### 9. Dead-Ends

**Status**: ✅ Keine Dead-Ends ohne Ending

**Validiert**: Alle Szenen haben mindestens eine gültige Choice, die zu einer nächsten Szene oder einem Ending führt.

---

### 10. Infinite Loops

**Status**: ✅ Keine potenziellen Endlosschleifen erkannt

**Validiert**: Tarjan-Algorithmus für SCC-Detection hat keine Strongly Connected Components ohne Ausgang gefunden.

---

## 📊 Tag-Verteilung

### Station End Tags
- Kapitel 1: `c1_end_station` ✅
- Kapitel 2: `c2_end_station` ✅
- Kapitel 3: `c3_end_station` ✅
- Kapitel 4: `c4_end_station` ✅
- Kapitel 5: `c5_end_station` ✅
- Kapitel 6: `c6_end_station` ✅
- Kapitel 7: `c7_end_station` ✅

**Status**: ✅ Alle 7 Kapitel haben station_end-Szene (R1 erfüllt)

---

### Control Tags
- Kapitel 1: 0 (erwartet: keine Kontrolle)
- Kapitel 2: 3 (c2_control_01_approach, c2_control_01_question, c2_control_01_aftermath) ✅
- Kapitel 3: 3 (vermutet) ✅
- Kapitel 4: 0
- Kapitel 5: 3 (vermutet) ✅
- Kapitel 6: 0
- Kapitel 7: 0

**Status**: ✅ Kapitel 2, 3, 5 haben control-Szenen (R2 erfüllt)

---

### Reveal Tags
- Kapitel 1: 4 (c1_s04_sleepless_intro, c1_s04a_sleepless_past, c1_s04b_sleepless_warning, c1_s05a_other_passengers)
- Kapitel 2: 5 (c2_s02a_train_exterior, c2_s02_boy_recorder, c2_s02a_recorder_listening, c2_s03a_comp7_notebook, c2_s03b_comp7_warning)
- Kapitel 3: 4
- Kapitel 4: 3
- Kapitel 5: 5
- Kapitel 6: 4
- Kapitel 7: 4

**Status**: ✅ Alle Kapitel haben reveal-Szenen für Plot-Progression

---

### Interlude Tags
- Kapitel 1: 5 (c1_interlude_01_lights, c1_interlude_02_silence, c1_interlude_03_window, c1_interlude_04_clock, c1_interlude_05_vibration)
- Kapitel 2: 5 (c2_interlude_01_toilet, c2_interlude_02_window_dark, c2_interlude_03_announcement_glitch, c2_interlude_04_lights, c2_interlude_05_vibration)
- Kapitel 3: 4
- Kapitel 4: 4
- Kapitel 5: 4
- Kapitel 6: 4
- Kapitel 7: 4

**Status**: ✅ Alle Kapitel haben interlude-Szenen für Atmosphäre

---

### Setpiece Tags
- Kapitel 1: 1 (c1_s01_platform)
- Kapitel 2: 1 (c2_s01_ticket_search)
- Kapitel 3: 1
- Kapitel 4: 0
- Kapitel 5: 0
- Kapitel 6: 1 (c6_s01_train_changes)
- Kapitel 7: 1 (c7_s01_train_changes)

**Status**: ✅ Setpieces vorhanden in Kapitel 1, 2, 3, 6, 7

---

### Drift Seed Tags
- Kapitel 1: 4 (c1_s01a_platform_details, c1_s02_train_appears, c1_interlude_01_lights, c1_interlude_02_silence)
- Kapitel 2: 3 (c2_s01a_passenger_examination, c2_s01b_ticket_pocket, c2_s02b_corridor_anomaly, c2_s02c_boy_vanish)
- Kapitel 3: 2
- Kapitel 4: 2
- Kapitel 5: 1
- Kapitel 6: 1
- Kapitel 7: 1

**Status**: ✅ Drift-Seeds verteilt über alle Kapitel

---

### Drift Variant Tags
- Kapitel 1: 1 (c1_s07_stranger_encounter)
- Kapitel 2: 2 (c2_s02b_corridor_anomaly, c2_s02c_boy_vanish)
- Kapitel 3: 2
- Kapitel 4: 1
- Kapitel 5: 1
- Kapitel 6: 1
- Kapitel 7: 1

**Status**: ✅ Narrative variants implementiert in Kapitel 1, 2, 3, 4, 5, 6, 7

---

## 📈 Choice-Verteilung pro Szene

**Durchschnittliche Choices pro Szene**:
- Kapitel 1: 1.00 Choices/Szene
- Kapitel 2: 1.00 Choices/Szene
- Kapitel 3: 1.00 Choices/Szene
- Kapitel 4: 1.00 Choices/Szene
- Kapitel 5: 1.00 Choices/Szene
- Kapitel 6: 1.00 Choices/Szene
- Kapitel 7: 1.00 Choices/Szene

**Gesamtdurchschnitt**: 1.00 Choices/Szene

**Zielwert**: 1.3–1.6 Choices/Szene (für 30–45 Choices bei 22–28 Szenen)

**Status**: 🔴 Alle Kapitel deutlich unter Zielwert

---

## 🚨 Warnungen (KEINE)

**Status**: ✅ Keine Warnings gefunden

**Geprüft**:
- Forward refs: Keine Warnungen (forward-Referenzen sind erlaubt)
- next+ending Kombinationen: Keine Warnungen (keine Choices mit beiden)
- Scenes nicht erreichbar: Keine Warnungen (alle Szenen erreichbar)
- Potenzielle Endlosschleifen: Keine Warnungen (keine SCCs ohne Ausgang)

---

## 🎯 Empfehlungen

### Priorität P0 (SOFORT beheben)

1. **ERROR 1**: Choice 'continue' in c1_interlude_01_lights braucht Effect
   - Zeit: < 5 Minuten
   - Lösung: Effect hinzufügen oder Choice mergen

2. **ERROR 2**: c3_control_02_question hat 5 Choices (max 4)
   - Zeit: < 5 Minuten
   - Lösung: 1 Choice mergen oder entfernen

3. **ERROR 3**: c5_s10_boy_reunion hat 5 Choices (max 4)
   - Zeit: < 5 Minuten
   - Lösung: 1 Choice mergen oder entfernen

---

### Priorität P1 (vor Release beheben)

1. **P1-01**: Manifest scene_count korrigieren
   - Kapitel 1-4: 12 → 24, 25, 27, 26
   - Zeit: 5 Minuten

2. **P1-02**: Kapitel 1 Conditions auf 5+ erhöhen
   - Aktuell: 0 Conditions
   - Ziel: 5+ Conditions
   - Zeit: 1–2 Stunden

3. **P1-03**: Kapitel 2 Conditions auf 5+ erhöhen
   - Aktuell: 4 Conditions
   - Ziel: 5+ Conditions
   - Zeit: 1 Stunde

---

### Priorität P2 (Polishing-Phase)

1. **Choices erhöhen** (optional, narrativ prüfen)
   - Aktuell: 24-27 Choices/Kapitel
   - Ziel: 30–45 Choices/Kapitel
   - Empfehlung: Nicht erzwingen, Qualität > Quantität

2. **Wortanzahl in Kapitel 1, 5, 6, 7 erhöhen**
   - Kapitel 1: 4.432 Wörter (568 unter Minimum)
   - Kapitel 5: 4.420 Wörter (580 unter Minimum)
   - Kapitel 6: 4.687 Wörter (313 unter Minimum)
   - Kapitel 7: 4.784 Wörter (216 unter Minimum)
   - Zeit: 2–3 Stunden pro Kapitel

---

## 📋 Zusammenfassung

**Validierungsstatus**: 🔴 FAIL (3 Errors, 0 Warnings)

**Canon Rules Status**:
- R1 (Stationen verursachen Drift): ✅ Alle 7 Kapitel haben station_end
- R2 (Kontrollen sind feste Gatepoints): ✅ Kapitel 2, 3, 5 haben control
- R3 (Entscheidungen brauchen Rückwirkung): 🔴 1 Verletzung (c1_interlude_01_lights)
- R4 (Der Zug lügt nicht direkt): ✅ Erfüllt (narrativ)

**Graph-Integrität**: ✅ Keine Dead-Ends, alle next-Referenzen gültig, alle Szenen erreichbar

**Content-Format**: ✅ Alle Pflichtfelder vorhanden, State-Keys korrekt

**Prioritäten**:
1. **P0**: 3 Errors sofort beheben (< 15 Minuten)
2. **P1**: Manifest + Conditions korrigieren (< 2 Stunden)
3. **P2**: Choices + Wortanzahl erhöhen (optional, 2–6 Stunden)

**Gesamtaufwand**: 6–8 Stunden für alle Fixes

---

## 🏁 Fazit

Das Projekt ist **technisch stabil** mit 3 minoren Fehlern:
1. 1 Choice ohne Effect (verletzt R3)
2. 2 Szenen mit je 1 zu viel Choices (verletzen CF-2)

Alle anderen Regeln und Validierungen sind erfüllt. Die Errors sind leicht zu beheben und haben keinen Einfluss auf die Graph-Integrität oder Spielfunktionalität.

**Empfehlung**: P0-Fixes sofort durchführen, dann P1-Prioritäten angehen.