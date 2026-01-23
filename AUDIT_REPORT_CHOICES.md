# NACHTZUG 19 - VOLLSTÄNDIGER CHOICE AUDIT REPORT
**Datum**: 2026-01-23
**Version**: 1.0
**Auditor**: Claude Choice QA Agent

---

## EXECUTIVE SUMMARY (12 Bulletpoints)

✅ **P0 BLOCKERS: 0**
- Alle next/target-Referenzen sind valide
- Keine Dead-Ends gefunden
- Alle Ending-IDs existieren
- Schema-Validierung: 100% pass

⚠️ **P1 HIGH PRIORITY: 4**
- **4 Scenes mit Fake Choices** (8 Choices total betroffen)
- Identische Outcomes (same next + same effects)
- Spieler-Agency wird untergraben
- Betrifft Kapitel 5 & 6

📝 **P2 LOW PRIORITY: 38**
- 21 generische Labels ("Weiter", "Ende")
- 17 Tone-Choices ohne Effects (per Design erlaubt, aber Grauzone)
- Keine kritischen Narrative-Probleme

---

## STATISTIK

| Kategorie | Anzahl |
|-----------|--------|
| **Total Scenes** | 160 |
| **Total Choices** | 402 |
| **Broken Targets** | 0 ✅ |
| **Unreachable Choices** | 0 ✅ |
| **Fake Choices (Scenes)** | 4 ⚠️ |
| **Fake Choices (Total)** | 8 ⚠️ |
| **Loops/Dead Ends** | 0 ✅ |
| **Condition Issues** | 0 ✅ |
| **Effect Issues** | 0 ✅ |
| **Narrative Issues** | 38 📝 |

---

## P0 - BLOCKERS (Critical)

✅ **KEINE P0-BLOCKER GEFUNDEN**

Alle technischen Validierungen bestanden:
- next/ending-Referenzen korrekt
- Schema-konform
- Keine kaputten Pfade

---

## P1 - HIGH PRIORITY (Fake Choices)

### Definition: Fake Choice
Eine Fake Choice ist eine scheinbare Entscheidung, bei der **mehrere Optionen zum identischen Outcome führen** (gleiche Effects UND gleiche next-Scene). Dies untergräbt Player Agency und sollte vermieden werden.

### Gefundene Fake Choices (4 Scenes, 8 Choices)

---

#### 1. **c5_s03_comp7_reflection** (Kapitel 5)

**Problem**: 2 Choices führen zu identischem Outcome

| Choice ID | Label | Condition | Effects | Next |
|-----------|-------|-----------|---------|------|
| `ask_about_destination` | "Wohin fährt dieser Zug?" | none | +truth+1, +rel_comp7+1 | `c5_s04_lights_flicker` |
| `discuss_silence` | "Die Stille hier… sie ist nicht normal." | attention≥3 | +truth+1, +rel_comp7+1 | `c5_s04_lights_flicker` |

**Analyse**:
- Beide Choices haben identische Effects (`+truth+1, +rel_comp7+1`)
- Beide führen zur gleichen Scene (`c5_s04_lights_flicker`)
- Die Condition bei `discuss_silence` (attention≥3) macht die Choice seltener, aber nicht bedeutungsvoller
- **Ergebnis**: Fake Choice (keine echte Konsequenz-Differenz)

**VORSCHLAG (Before/After)**:

**ALT (ask_about_destination)**:
```typescript
{
  id: 'ask_about_destination',
  label: '„Wohin fährt dieser Zug?"',
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 1 },
    { type: 'inc', target: 'rel_comp7', value: 1 }
  ],
  next: 'c5_s04_lights_flicker'
}
```

**NEU (ask_about_destination)**:
```typescript
{
  id: 'ask_about_destination',
  label: '„Wohin fährt dieser Zug?"',
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 2 },  // Mehr truth: direkte Frage
    { type: 'inc', target: 'rel_comp7', value: 1 }
  ],
  next: 'c5_s04_lights_flicker'
}
```

**ALT (discuss_silence)**:
```typescript
{
  id: 'discuss_silence',
  label: '„Die Stille hier… sie ist nicht normal."',
  condition: { type: 'compare', target: 'conductor_attention', operator: '>=', value: 3 },
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 1 },
    { type: 'inc', target: 'rel_comp7', value: 1 }
  ],
  next: 'c5_s04_lights_flicker'
}
```

**NEU (discuss_silence)**:
```typescript
{
  id: 'discuss_silence',
  label: '„Die Stille hier… sie ist nicht normal."',
  condition: { type: 'compare', target: 'conductor_attention', operator: '>=', value: 3 },
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 1 },
    { type: 'inc', target: 'rel_comp7', value: 2 },     // Mehr Beziehung: persönliches Teilen
    { type: 'inc', target: 'memory_drift', value: 1 }   // Drift: Awareness der Anomalie
  ],
  next: 'c5_s04_lights_flicker'
}
```

**Begründung**:
- `ask_about_destination`: Direkte Frage = +2 truth (klare Informationssuche)
- `discuss_silence`: Persönliches Teilen einer Beobachtung = +2 rel_comp7 + drift (Awareness von Anomalien führt zu Drift)
- **Differenzierung**: Truth-fokussiert vs. Beziehung+Drift-fokussiert

---

#### 2. **c5_s05_sleepless_final** (Kapitel 5)

**Problem**: 2 Choices führen zu identischem Outcome

| Choice ID | Label | Condition | Effects | Next |
|-----------|-------|-----------|---------|------|
| `comfort_him` | "Wir kommen beide durch." | none | +love+1, +rel_sleepless+1 | `c5_s06_abteil7_approach` |
| `warn_about_presence` | "Da ist etwas im Gang. Sei vorsichtig." | attention≥4 | +love+1, +rel_sleepless+1 | `c5_s06_abteil7_approach` |

**Analyse**:
- Beide Choices haben identische Effects
- Beide führen zur gleichen Scene
- **Ergebnis**: Fake Choice

**VORSCHLAG (Before/After)**:

**ALT (comfort_him)**:
```typescript
{
  id: 'comfort_him',
  label: '„Wir kommen beide durch."',
  effects: [
    { type: 'inc', target: 'tickets_love', value: 1 },
    { type: 'inc', target: 'rel_sleepless', value: 1 }
  ],
  next: 'c5_s06_abteil7_approach'
}
```

**NEU (comfort_him)**:
```typescript
{
  id: 'comfort_him',
  label: '„Wir kommen beide durch."',
  effects: [
    { type: 'inc', target: 'tickets_love', value: 2 },      // Mehr love: starkes emotionales Commitment
    { type: 'inc', target: 'rel_sleepless', value: 1 }
  ],
  next: 'c5_s06_abteil7_approach'
}
```

**ALT (warn_about_presence)**:
```typescript
{
  id: 'warn_about_presence',
  label: '„Da ist etwas im Gang. Sei vorsichtig."',
  condition: { type: 'compare', target: 'conductor_attention', operator: '>=', value: 4 },
  effects: [
    { type: 'inc', target: 'tickets_love', value: 1 },
    { type: 'inc', target: 'rel_sleepless', value: 1 }
  ],
  next: 'c5_s06_abteil7_approach'
}
```

**NEU (warn_about_presence)**:
```typescript
{
  id: 'warn_about_presence',
  label: '„Da ist etwas im Gang. Sei vorsichtig."',
  condition: { type: 'compare', target: 'conductor_attention', operator: '>=', value: 4 },
  effects: [
    { type: 'inc', target: 'tickets_love', value: 1 },
    { type: 'inc', target: 'rel_sleepless', value: 2 },    // Mehr Beziehung: Schutz-Instinkt
    { type: 'inc', target: 'tickets_truth', value: 1 }     // Truth: Information teilen
  ],
  next: 'c5_s06_abteil7_approach'
}
```

**Begründung**:
- `comfort_him`: Emotionales Commitment = +2 love (starke Bindung)
- `warn_about_presence`: Schutz + Information = +2 rel_sleepless + truth
- **Differenzierung**: Love-fokussiert vs. Schutz+Truth-fokussiert

---

#### 3. **c5_s12_window_void_b** (Kapitel 5 Interlude)

**Problem**: 2 Choices ohne jegliche Effects, identisches next

| Choice ID | Label | Condition | Effects | Next |
|-----------|-------|-----------|---------|------|
| `press_forehead` | "Stirn gegen das Glas lehnen" | none | **NONE** | `c5_s12_window_void_c` |
| `pull_back` | "Zurückziehen" | none | **NONE** | `c5_s12_window_void_c` |

**Analyse**:
- **KEINERLEI Effects** bei beiden Choices
- Identisches next
- **Ergebnis**: Pure Fake Choice (komplett bedeutungslos)
- **Schweregrad**: HOCH - dies ist die problematischste Fake-Choice im gesamten Repo

**VORSCHLAG (Before/After)**:

**ALT (press_forehead)**:
```typescript
{
  id: 'press_forehead',
  label: 'Stirn gegen das Glas lehnen',
  effects: [],
  next: 'c5_s12_window_void_c'
}
```

**NEU (press_forehead)**:
```typescript
{
  id: 'press_forehead',
  label: 'Stirn gegen das Glas lehnen',
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 1 },    // Konfrontation mit der Leere
    { type: 'inc', target: 'memory_drift', value: 1 }      // Drift durch Kontakt
  ],
  next: 'c5_s12_window_void_c'
}
```

**ALT (pull_back)**:
```typescript
{
  id: 'pull_back',
  label: 'Zurückziehen',
  effects: [],
  next: 'c5_s12_window_void_c'
}
```

**NEU (pull_back)**:
```typescript
{
  id: 'pull_back',
  label: 'Zurückziehen',
  effects: [
    { type: 'inc', target: 'tickets_escape', value: 1 },   // Vermeidung
    { type: 'inc', target: 'tickets_guilt', value: 1 }     // Schuldgefühl durch Rückzug
  ],
  next: 'c5_s12_window_void_c'
}
```

**Begründung**:
- Dies ist ein **Interlude-Split** (atmosphärischer Moment)
- Aber ZWEI effekt-lose Choices untergraben Agency komplett
- `press_forehead`: Konfrontation = truth + drift (bewusste Auseinandersetzung)
- `pull_back`: Vermeidung = escape + guilt (Selbstschutz mit Kosten)
- **Differenzierung**: Truth/Drift vs. Escape/Guilt - klare philosophische Gegenrichtungen

---

#### 4. **c6_s08_drift_intensifies_b** (Kapitel 6 Interlude)

**Problem**: 2 Choices führen zu identischem Outcome

| Choice ID | Label | Condition | Effects | Next |
|-----------|-------|-----------|---------|------|
| `observe_changes` | "Beobachten" | none | +truth+1, +drift+1 | `c6_s09_boy_final` |
| `analyze_time` | "Muster suchen" | drift≥2 | +truth+1, +drift+1 | `c6_s09_boy_final` |

**Analyse**:
- Beide Choices haben identische Effects
- Beide führen zur gleichen Scene
- **Ergebnis**: Fake Choice

**VORSCHLAG (Before/After)**:

**ALT (observe_changes)**:
```typescript
{
  id: 'observe_changes',
  label: 'Beobachten',
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 1 },
    { type: 'inc', target: 'memory_drift', value: 1 }
  ],
  next: 'c6_s09_boy_final'
}
```

**NEU (observe_changes)**:
```typescript
{
  id: 'observe_changes',
  label: 'Beobachten',
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 1 },
    { type: 'inc', target: 'memory_drift', value: 2 }      // Mehr drift: passive Akzeptanz
  ],
  next: 'c6_s09_boy_final'
}
```

**ALT (analyze_time)**:
```typescript
{
  id: 'analyze_time',
  label: 'Muster suchen',
  condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 2 },
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 1 },
    { type: 'inc', target: 'memory_drift', value: 1 }
  ],
  next: 'c6_s09_boy_final'
}
```

**NEU (analyze_time)**:
```typescript
{
  id: 'analyze_time',
  label: 'Muster suchen',
  condition: { type: 'compare', target: 'memory_drift', operator: '>=', value: 2 },
  effects: [
    { type: 'inc', target: 'tickets_truth', value: 2 },    // Mehr truth: aktive Analyse
    { type: 'inc', target: 'memory_drift', value: 1 }
  ],
  next: 'c6_s09_boy_final'
}
```

**Begründung**:
- `observe_changes`: Passive Beobachtung = +1 truth, +2 drift (Drift durch Akzeptanz)
- `analyze_time`: Aktive Analyse = +2 truth, +1 drift (Verstehen reduziert Drift-Effekt)
- **Differenzierung**: Passiv (mehr drift) vs. Aktiv (mehr truth)

---

## P2 - MEDIUM/LOW (Narrative Quality)

### Zusammenfassung (38 Issues)

Die P2-Issues sind **überwiegend akzeptabel**, da sie entweder:
1. **Tone Choices** sind (keine Effects, aber per DECISION_SYSTEM.md erlaubt)
2. **Generische Continue-Labels** in Ending-Sequenzen (vertretbar)

**Breakdown nach Typ**:

| Typ | Anzahl | Bewertung |
|-----|--------|-----------|
| **Generische Labels** ("Weiter", "Ende") | 21 | P2 - Akzeptabel für Interludes/Endings |
| **Tone Choices ohne Effects** | 17 | P2 - Per Design erlaubt, aber Grauzone |

### Generische Labels (21 Fälle)

**Beispiele**:
- `c1_end_station` / "Weiter"
- `c2_end_station` / "Weiter"
- `ending_truth_01` / "Weiter"
- `ending_truth_03` / "Ende"

**Bewertung**: ✅ **AKZEPTABEL**
**Begründung**: In Interlude- und Ending-Szenen sind generische Continue-Labels Standard-Practice. Sie dienen der Pacing-Kontrolle, nicht der Agency. **Kein Fix nötig.**

### Tone Choices ohne Effects (17 Fälle)

**Beispiele**:
- `c1_s01_platform` / "Warten" (keine effects)
- `c5_s02_corridor_silence` / "Der Stille nachgehen" (keine effects)
- `c7_end_station` / "Der Wahrheit begegnen – koste es, was es wolle" (keine effects)

**Bewertung**: ⚠️ **GRAUZONE**
**Begründung**: Per DECISION_SYSTEM.md sind Tone Choices erlaubt. ABER: Sie sollten sparsam eingesetzt werden und nicht die Mehrheit der Choices ausmachen.

**Statistik**:
- Total Choices: 402
- Tone Choices (0 effects): 17
- **Anteil**: 4.2% ✅ (vertretbar, unter 10%)

**Empfehlung**: **KEIN FIX NÖTIG**
Die Tone-Choices sind gezielt in atmosphärischen Interlude-Szenen platziert und machen nur 4.2% aller Choices aus. Dies ist akzeptabel.

---

## FINALE ZUSAMMENFASSUNG

### Status
⚠️ **NACHTZUG 19 Choice Audit: ISSUES FOUND**

### Breakdown

| Priorität | Anzahl | Status | Action Required |
|-----------|--------|--------|-----------------|
| **P0 (Blocker)** | 0 | ✅ PASSED | None |
| **P1 (High)** | 4 scenes (8 choices) | ⚠️ FOUND | **FIX RECOMMENDED** |
| **P2 (Low)** | 38 | 📝 NOTED | Optional (mostly acceptable) |

### Empfohlene Actions

#### MUST FIX (P1 - 4 Scenes)

1. **c5_s03_comp7_reflection**
   → Differentiate `ask_about_destination` vs. `discuss_silence`
   → **Impact**: Medium (endgame choice differentiation)

2. **c5_s05_sleepless_final**
   → Differentiate `comfort_him` vs. `warn_about_presence`
   → **Impact**: Medium (relationship dynamics)

3. **c5_s12_window_void_b** ⚡ **HIGHEST PRIORITY**
   → Add effects to `press_forehead` and `pull_back`
   → **Impact**: HIGH (pure fake choice, 0 effects both)

4. **c6_s08_drift_intensifies_b**
   → Differentiate `observe_changes` vs. `analyze_time`
   → **Impact**: Medium (drift/truth balance)

#### OPTIONAL (P2 - 38 Items)

- ✅ **KEIN FIX NÖTIG** (Tone Choices per Design, generische Labels in Endings akzeptabel)

---

## DETAIL-TABELLE (Before/After)

| Scene | Choice ID | Problem | ALT (Before) | NEU (After) | Begründung |
|-------|-----------|---------|--------------|-------------|------------|
| **c5_s03_comp7_reflection** | `ask_about_destination` | Fake choice | +truth+1, +rel_comp7+1 | +truth+**2**, +rel_comp7+1 | Direkte Frage = mehr truth |
| **c5_s03_comp7_reflection** | `discuss_silence` | Fake choice | +truth+1, +rel_comp7+1 | +truth+1, +rel_comp7+**2**, +drift+1 | Persönliches Teilen = mehr Beziehung + Drift |
| **c5_s05_sleepless_final** | `comfort_him` | Fake choice | +love+1, +rel_sleepless+1 | +love+**2**, +rel_sleepless+1 | Emotionales Commitment = mehr love |
| **c5_s05_sleepless_final** | `warn_about_presence` | Fake choice | +love+1, +rel_sleepless+1 | +love+1, +rel_sleepless+**2**, +truth+1 | Schutz = mehr Beziehung + Info |
| **c5_s12_window_void_b** | `press_forehead` | **Pure fake** | **NO EFFECTS** | +truth+1, +drift+1 | Konfrontation = truth + drift |
| **c5_s12_window_void_b** | `pull_back` | **Pure fake** | **NO EFFECTS** | +escape+1, +guilt+1 | Vermeidung = escape + guilt |
| **c6_s08_drift_intensifies_b** | `observe_changes` | Fake choice | +truth+1, +drift+1 | +truth+1, +drift+**2** | Passive Beobachtung = mehr drift |
| **c6_s08_drift_intensifies_b** | `analyze_time` | Fake choice | +truth+1, +drift+1 | +truth+**2**, +drift+1 | Aktive Analyse = mehr truth |

---

## IMPLEMENTIERUNGS-PLAN (Optional)

Falls die Fixes umgesetzt werden sollen:

### Phase 1: P1 Fixes (MUST)
1. Edit `src/content/nachtzug19/scenes/c5.ts` (3 Scenes: c5_s03, c5_s05, c5_s12)
2. Edit `src/content/nachtzug19/scenes/c6.ts` (1 Scene: c6_s08)
3. Run validation: `npx tsx scripts/audit_choices.ts`
4. Verify: 0 P1 issues remaining

### Phase 2: Testing
1. Run full content validation: `npm test` (wenn Tests verfügbar)
2. Export story: `npm run export:story`
3. Spot-check betroffene Pfade im Android-Build

### Phase 3: Commit
```bash
git add src/content/nachtzug19/scenes/c5.ts src/content/nachtzug19/scenes/c6.ts
git commit -m "fix: differentiate fake choices in c5/c6 (audit P1 issues)

- c5_s03_comp7_reflection: differentiate ask_about_destination vs discuss_silence
- c5_s05_sleepless_final: differentiate comfort_him vs warn_about_presence
- c5_s12_window_void_b: add effects to press_forehead and pull_back (CRITICAL)
- c6_s08_drift_intensifies_b: differentiate observe_changes vs analyze_time

Fixes 4 P1 fake-choice issues identified in comprehensive choice audit."
```

---

## ANHANG: TEST-COVERAGE

### Szenen getestet
- ✅ 160 Scenes (100%)
- ✅ 402 Choices (100%)
- ✅ 7 Kapitel + 5 Endings

### Validierungen durchgeführt
1. ✅ Target-Integrität (next/ending existieren)
2. ✅ Condition-Logik (syntaktisch korrekt, erreichbar)
3. ✅ Effect-Schema (bekannte targets/types)
4. ✅ Graph-Integrität (keine Dead-Ends, keine Loops ohne Exit)
5. ✅ Fake-Choice-Detection (identical outcomes)
6. ✅ Narrative Quality (labels, tone choices)

### Tools verwendet
- `validateContent()` (domain/engine/validateContent.ts)
- Custom Audit Script (`scripts/audit_choices.ts`)
- Fake-Choice-Detection Algorithmus (signature matching)

---

**ENDE DES REPORTS**

*Für Fragen oder Implementierungs-Support: siehe Before/After-Tabelle oben.*
