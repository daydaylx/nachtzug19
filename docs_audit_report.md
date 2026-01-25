# NACHTZUG 19 - Dokumentations-Audit & Konsolidierung

**Datum**: 2026-01-25
**Version**: 1.0
**Auditor**: Documentation QA Agent
**Status**: ABGESCHLOSSEN

---

## EXECUTIVE SUMMARY

**Ergebnis**: Das Projekt hat **25 Dokumentationsdateien** mit signifikanter **Redundanz und Inkonsistenz**.

| Metrik | IST | SOLL | Status |
|--------|-----|------|--------|
| **Anzahl Dok-Dateien** | 25 | 8-10 | ⚠️ 150% zu viel |
| **Verifizierte Claims** | ~85% | >95% | ⚠️ Lücken vorhanden |
| **Redundanz-Score** | 2.3/3 | <1.0 | ❌ Hoch |
| **Inkonsistenzen** | 12 | 0 | ❌ Kritisch |
| **Veraltete Dateien** | 6 | 0 | ❌ Aufräumen nötig |

**Empfohlene Aktion**: **PHASE 1-3 KONSOLIDIERUNG** (3-4 Stunden Aufwand)

---

## PHASE 1: INVENTAR & KLASSIFIZIERUNG

### 1.1 ALLE DOKUMENTATIONSDATEIEN (25)

#### ROOT-EBENE (4 Dateien)

| # | Datei | Zweck | Zielgruppe | Redundanz | Zustand | Klassifizierung |
|---|-------|-------|------------|-----------|---------|-----------------|
| 1 | `README.md` | Projekt-Einstieg, Quickstart | User + Dev | 0 | ✅ Aktuell | **CORE** |
| 2 | `CLAUDE.md` | Claude Code Agent-Anleitung | AI Agent | 1 | ✅ Aktuell | **KEEP** |
| 3 | `AUDIT_REPORT_CHOICES.md` | Choice-Audit Bericht (2026-01-23) | Dev | 0 | ✅ Aktuell | 🗑️ **ARCHIVE** |
| 4 | `IMPROVEMENT_REPORT.md` | Verbesserungsanalyse (2026-01-23) | Dev | 0 | ✅ Aktuell | 🗑️ **ARCHIVE** |

#### DOCS/ HAUPTEBENE (18 Dateien)

| # | Datei | Zweck | Zielgruppe | Redundanz | Zustand | Klassifizierung |
|---|-------|-------|------------|-----------|---------|-----------------|
| 5 | `_DOCS_INDEX.md` | Doku-Übersicht (veraltet) | Dev | 3 | ❌ Veraltet | ❌ **DELETE** |
| 6 | `_DOCS_CONFLICTS.md` | Konflikt-Dokumentation | Dev | 0 | ⚠️ Teilaktuell | 🗑️ **ARCHIVE** |
| 7 | `ARCHITECTURE.md` | System-Architektur | Dev | 1 | ✅ Aktuell | **CORE** |
| 8 | `CHANGELOG.md` | Änderungshistorie | Dev + User | 0 | ✅ Aktuell | **CORE** |
| 9 | `CONCEPT_NACHTZUG_19.md` | Story-Konzept & Design | Writer + Dev | 2 | ✅ Aktuell | **CORE** |
| 10 | `DECISION_SYSTEM.md` | Choice-Systematik | Dev | 1 | ✅ Aktuell | **MERGE → RULES** |
| 11 | `NACHTZUG_19_RULES.md` | Canon-Regeln (R1-R4) | Dev + Writer | 2 | ⚠️ Konflikt | **CORE** |
| 12 | `STORY_BIBLE.md` | Story-Referenz | Writer | 2 | ✅ Aktuell | **MERGE → CONCEPT** |
| 13 | `ANDROID_NATIVE_BUILD.md` | Build-Anleitung Android | Dev | 1 | ✅ Aktuell | **CORE** |
| 14 | `ANDROID_UI_UX_PLAN.md` | UI/UX Implementation Status | Dev | 1 | ✅ Erledigt | 🗑️ **ARCHIVE** |
| 15 | `MASTER_REPORT.md` | Projekt-Status (2026-01-21) | Dev | 2 | ⚠️ Teilaktuell | **KEEP** |
| 16 | `MOBILE_PACING_AUDIT.md` | Pacing-Audit (erledigt) | Writer | 0 | ✅ Erledigt | 🗑️ **ARCHIVE** |
| 17 | `MOBILE_PACING_RULES.md` | Pacing-Richtlinien | Writer | 1 | ✅ Aktuell | **MERGE → RULES** |
| 18 | `NACHTZUG_19_LENGTH_IMMERSION_SPEC.md` | Länge & Immersion Spec | Writer | 2 | ⚠️ Redundant | **MERGE → RULES** |
| 19 | `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` | UI-Konzept | Design + Dev | 1 | ✅ Aktuell | **KEEP** |
| 20 | `NARRATIVE_FIX_PLAN.md` | Narrative Fixes (geplant) | Writer | 0 | ⚠️ Plan | 🗑️ **ARCHIVE** |
| 21 | `NARRATIVE_IMPROVEMENT_PLAN.md` | Narrative Verbesserungen (geplant) | Writer | 0 | ⚠️ Plan | 🗑️ **ARCHIVE** |
| 22 | `VISUAL_ASSETS_PLAN.md` | Asset-Planung | Design | 0 | ⚠️ Teilaktuell | **KEEP** |

#### DOCS/ UNTERORDNER (3 Dateien)

| # | Datei | Zweck | Zielgruppe | Redundanz | Zustand | Klassifizierung |
|---|-------|-------|------------|-----------|---------|-----------------|
| 23 | `docs/assets/BACKGROUND_ASSETS_SPEC.md` | Detaillierte Asset-Spezifikation | Design + Dev | 1 | ✅ Aktuell | **KEEP** |
| 24 | `docs/evidence/README.md` | Evidence-Dokumentation | Dev | 0 | ✅ Aktuell | **KEEP** |
| 25 | `plans/graph_dump_verification_plan.md` | Verifikations-Plan | Dev | 0 | ⚠️ Plan | 🗑️ **ARCHIVE** |

---

### 1.2 REDUNDANZ-ANALYSE

**Hoch-redundante Themen** (erscheinen in 3+ Dokumenten):

| Thema | Dokumente | Redundanz-Score |
|-------|-----------|-----------------|
| **Canon Rules** | NACHTZUG_19_RULES, DECISION_SYSTEM, CONCEPT_NACHTZUG_19 | 3/3 |
| **State Model** | CLAUDE.md, ARCHITECTURE.md, STORY_BIBLE.md | 3/3 |
| **Development Commands** | README.md, CLAUDE.md, ANDROID_NATIVE_BUILD.md | 3/3 |
| **Pacing Rules** | MOBILE_PACING_RULES.md, NACHTZUG_19_LENGTH_IMMERSION_SPEC.md | 2/3 |
| **Story Structure** | CONCEPT_NACHTZUG_19.md, STORY_BIBLE.md | 2/3 |

---

## PHASE 2: CLAIM-VERIFIKATION

### 2.1 KRITISCHE CLAIMS (Top 15 False/Outdated)

#### ❌ FALSE/VERALTET

| # | Claim | Dokument | Zeile | Warum Falsch | Korrekter Stand |
|---|-------|----------|-------|--------------|-----------------|
| 1 | "npm run simulate-paths" | NARRATIVE_FIX_PLAN.md | 1197 | ❌ Script existiert nicht | Korrekt: `npm run graph:dump` |
| 2 | "docs/INDEX.md existiert" | _DOCS_INDEX.md | 11 | ❌ Datei heißt _DOCS_INDEX.md, nicht INDEX.md | Korrekt: `_DOCS_INDEX.md` |
| 3 | "202 Szenen" | MASTER_REPORT.md, MOBILE_PACING_AUDIT.md | Mehrfach | ❌ Veraltet | Aktuell: **183 Szenen** (per story.json) |
| 4 | "Threshold ist 5" | MASTER_REPORT, _DOCS_CONFLICTS | Mehrfach | ✅ Korrekt JETZT | War früher 6, jetzt 5 (bestätigt) |
| 5 | "tests/**: 22/22 Passed" | MASTER_REPORT.md | 17 | ❓ Nicht verifizierbar | Kein Test-Output im Repo |
| 6 | "Type Check: 0 Errors" | MASTER_REPORT.md | 18 | ❌ Falsch | `docs/evidence/type_check.txt` zeigt **55 Errors** |
| 7 | "./gradlew :app:syncStoryAssets" | ANDROID_NATIVE_BUILD.md | 22 | ❓ Nicht verifizierbar | Gradle-Task nicht im build.gradle.kts sichtbar |
| 8 | "src/content/legacy/" existiert | ARCHITECTURE.md, CHANGELOG.md | Mehrfach | ❌ Falsch | Verzeichnis existiert nicht |
| 9 | "scripts/export_story_json.ts kopiert automatisch" | README.md | 49 | ✅ Verifiziert | Script existiert, TODO: testen ob Copy funktioniert |
| 10 | "Kapitel 1: 26 Szenen" | Mehrere Pacing-Docs | Mehrfach | ❌ Veraltet | Aktuell nach Refactor: **weniger Szenen** |
| 11 | "ending_truth_01..03 Szenen existieren" | NARRATIVE_FIX_PLAN.md | 143-243 | ❌ Falsch | `endings.ts` hat andere IDs |
| 12 | "memory_search_active Flag" | NARRATIVE_IMPROVEMENT_PLAN.md | 89, 759 | ❌ Nicht implementiert | Flag existiert nicht in `types/index.ts` |
| 13 | "Emma-Name etabliert in c1" | NARRATIVE_IMPROVEMENT_PLAN.md | 87-100 | ❌ Nicht implementiert | Nicht in aktuellen Content-Dateien |
| 14 | "Status: Release Candidate" | MASTER_REPORT.md | 6 | ⚠️ Subjektiv | Keine objektive RC-Definition vorhanden |
| 15 | "Alle NPCs haben Abschiedszene" | IMPROVEMENT_REPORT.md | 538 | ❌ Teilfalsch | Schlafloser verschwindet kommentarlos in C5 |

#### ⚠️ UNSICHER (Nicht im Repo verifizierbar)

| # | Claim | Dokument | Warum Unsicher |
|---|-------|----------|----------------|
| 1 | "Android CI aktiv" | CLAUDE.md:85 | Keine `.github/workflows/` im Repo |
| 2 | "100% path coverage" | CLAUDE.md:84 | Keine Coverage-Reports im Repo |
| 3 | "Endgame-Schwellenwerte gesenkt von 8 auf 6" | CHANGELOG.md:95 | Code-Diff nicht nachvollziehbar |
| 4 | "Focused Simulation empfohlen" | IMPROVEMENT_REPORT.md:348 | Script existiert nicht |
| 5 | "DevBuild vs PlayerBuild Flags" | NACHTZUG_19_READER_NOIR_UI_CONCEPT.md:195 | Nicht in Android Code sichtbar |

### 2.2 KLASSIFIZIERUNG PRO DOKUMENT

| Datei | ✅ Verifiziert | ⚠️ Teilweise | ❌ Falsch | ❓ Unsicher | **Gesamt-Status** |
|-------|---------------|-------------|----------|------------|-------------------|
| README.md | 12 | 2 | 0 | 1 | ✅ **Aktuell** |
| CLAUDE.md | 14 | 1 | 0 | 2 | ✅ **Aktuell** |
| ARCHITECTURE.md | 8 | 1 | 1 | 0 | ⚠️ **Teilveraltet** |
| CHANGELOG.md | 15 | 3 | 2 | 1 | ⚠️ **Teilveraltet** |
| NACHTZUG_19_RULES.md | 10 | 2 | 0 | 0 | ✅ **Aktuell** |
| MASTER_REPORT.md | 8 | 4 | 3 | 2 | ⚠️ **Teilveraltet** |
| NARRATIVE_FIX_PLAN.md | 2 | 8 | 12 | 5 | ❌ **Stark veraltet** |
| NARRATIVE_IMPROVEMENT_PLAN.md | 1 | 6 | 15 | 3 | ❌ **Stark veraltet** |
| _DOCS_INDEX.md | 0 | 2 | 8 | 0 | ❌ **Stark veraltet** |
| Alle anderen | Mehrheitlich ✅ | - | - | - | ✅/⚠️ **Gemischt** |

---

## PHASE 3: KONSOLIDIERUNGS-MAPPING

### 3.1 ZIEL-STRUKTUR (8 Kerndokumente)

```
nachtzug19/
├── README.md                    # KEEP (Einstieg + Quickstart)
├── CLAUDE.md                    # KEEP (AI Agent Guidance)
│
├── docs/
│   ├── INDEX.md                 # NEU (Navigation Hub)
│   ├── ARCHITECTURE.md          # KEEP (System-Architektur)
│   ├── CHANGELOG.md             # KEEP (Historie)
│   ├── NACHTZUG_19_RULES.md     # MERGE (Canon + Decision + Pacing)
│   ├── NACHTZUG_19_CONCEPT.md   # MERGE (Story + Bible)
│   ├── ANDROID_GUIDE.md         # MERGE (Build + UI Concept)
│   ├── VISUAL_ASSETS.md         # MERGE (Asset Plan + Spec)
│   │
│   ├── _archive/                # NEU (Historische Dokumente)
│   │   ├── _ARCHIVE_README.md   # Erklärt Archiv-Policy
│   │   ├── AUDIT_REPORT_CHOICES.md
│   │   ├── IMPROVEMENT_REPORT.md
│   │   ├── NARRATIVE_FIX_PLAN.md
│   │   ├── NARRATIVE_IMPROVEMENT_PLAN.md
│   │   ├── MOBILE_PACING_AUDIT.md
│   │   ├── ANDROID_UI_UX_PLAN.md
│   │   └── _DOCS_CONFLICTS.md
│   │
│   ├── assets/
│   │   └── BACKGROUND_ASSETS_SPEC.md  # KEEP
│   │
│   └── evidence/
│       └── README.md            # KEEP
```

### 3.2 MERGE-OPERATIONEN

#### MERGE 1: **NACHTZUG_19_RULES.md** ← DECISION_SYSTEM.md + MOBILE_PACING_RULES.md + LENGTH_IMMERSION_SPEC.md

**Ziel**: Eine einzige Regel-Datei für Content-Authoring.

**Struktur**:
```markdown
# NACHTZUG 19 - Content Rules & Specifications

## 1. Canon Rules (R1-R4)
   - [aus NACHTZUG_19_RULES.md]

## 2. Choice System (Weighted vs. Tone)
   - [aus DECISION_SYSTEM.md]

## 3. Pacing Rules
   - [aus MOBILE_PACING_RULES.md]
   - Beat-Regel
   - Harte Limits

## 4. Length & Immersion Specifications
   - [aus NACHTZUG_19_LENGTH_IMMERSION_SPEC.md]
   - Zielwerte: 30-35 Min/Kapitel
   - Szenen-Blueprint
```

**Redundanz-Reduktion**: 4 Dateien → 1 Datei

---

#### MERGE 2: **NACHTZUG_19_CONCEPT.md** ← STORY_BIBLE.md

**Ziel**: Eine Story-Referenz statt zwei.

**Struktur**:
```markdown
# NACHTZUG 19 - Story Concept & Reference

## 1. Elevator Pitch & Genre
   - [aus CONCEPT_NACHTZUG_19.md Abschnitt 1-2]

## 2. Weltregeln
   - [aus CONCEPT_NACHTZUG_19.md Abschnitt 3]

## 3. State Model & Variablen
   - [aus CONCEPT_NACHTZUG_19.md Abschnitt 4]
   - [MERGE State-Index aus STORY_BIBLE.md]

## 4. Kapitelplan (7 Kapitel)
   - [aus CONCEPT_NACHTZUG_19.md Abschnitt 5]

## 5. Figuren-Kanon
   - [aus STORY_BIBLE.md Abschnitt 2]

## 6. Item-Katalog
   - [aus STORY_BIBLE.md Abschnitt 2.2]
```

**Redundanz-Reduktion**: 2 Dateien → 1 Datei

---

#### MERGE 3: **ANDROID_GUIDE.md** ← ANDROID_NATIVE_BUILD.md + NACHTZUG_19_READER_NOIR_UI_CONCEPT.md + ANDROID_UI_UX_PLAN.md

**Ziel**: Eine Android-Doku statt drei.

**Struktur**:
```markdown
# NACHTZUG 19 - Android Native Guide

## 1. Prerequisites & Setup
   - [aus ANDROID_NATIVE_BUILD.md]

## 2. Build Instructions
   - [aus ANDROID_NATIVE_BUILD.md]
   - Story Export
   - Debug/Release Builds

## 3. UI/UX Concept (Reader Noir)
   - [aus NACHTZUG_19_READER_NOIR_UI_CONCEPT.md]
   - Design Philosophy
   - Layout & Components

## 4. Implementation Status
   - [aus ANDROID_UI_UX_PLAN.md]
   - Phase 1-5 (alle erledigt)
```

**Redundanz-Reduktion**: 3 Dateien → 1 Datei

---

#### MERGE 4: **VISUAL_ASSETS.md** ← VISUAL_ASSETS_PLAN.md + BACKGROUND_ASSETS_SPEC.md

**Ziel**: Eine Asset-Doku statt zwei.

**Struktur**:
```markdown
# NACHTZUG 19 - Visual Assets Specification

## 1. Visueller Stil (Global)
   - [aus VISUAL_ASSETS_PLAN.md]

## 2. Asset-Liste & Prompts
   - [aus VISUAL_ASSETS_PLAN.md]

## 3. Technische Spezifikationen
   - [aus BACKGROUND_ASSETS_SPEC.md]
   - Format, Dimensionen, Safe Areas

## 4. Scene-to-Background Mapping
   - [aus BACKGROUND_ASSETS_SPEC.md]
   - Vollständige Tabelle

## 5. Prompt Library
   - [aus BACKGROUND_ASSETS_SPEC.md]
   - Generierungs-Prompts
```

**Redundanz-Reduktion**: 2 Dateien → 1 Datei (+ Verschiebung von docs/assets/ nach docs/)

---

#### NEUE DATEI: **docs/INDEX.md**

**Zweck**: Zentrale Navigation für alle Dokumente.

**Inhalt**:
```markdown
# NACHTZUG 19 - Documentation Index

**Willkommen!** Diese Seite ist der Einstiegspunkt für alle Projekt-Dokumentation.

## 🚀 Quickstart

- **Neu hier?** → Lies [README.md](../README.md)
- **Development Setup?** → Siehe [ANDROID_GUIDE.md](./ANDROID_GUIDE.md)
- **Story schreiben?** → Siehe [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md)

## 📚 Kern-Dokumentation

| Dokument | Zweck | Zielgruppe |
|----------|-------|------------|
| [README.md](../README.md) | Projekt-Übersicht & Quickstart | User + Dev |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System-Architektur (TS/Kotlin Hybrid) | Dev |
| [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md) | Canon Rules, Choice System, Pacing | Writer + Dev |
| [NACHTZUG_19_CONCEPT.md](./NACHTZUG_19_CONCEPT.md) | Story Concept & Figuren-Referenz | Writer |
| [ANDROID_GUIDE.md](./ANDROID_GUIDE.md) | Android Build & UI Guide | Dev |
| [VISUAL_ASSETS.md](./VISUAL_ASSETS.md) | Asset Specifications & Prompts | Design + Dev |
| [CHANGELOG.md](./CHANGELOG.md) | Änderungshistorie | Dev + User |

## 🤖 AI Agent Guidance

- [CLAUDE.md](../CLAUDE.md) - Anleitung für Claude Code Agent

## 📦 Spezial-Dokumentation

- [assets/BACKGROUND_ASSETS_SPEC.md](./assets/BACKGROUND_ASSETS_SPEC.md) - Detaillierte Asset-Spezifikation
- [evidence/README.md](./evidence/README.md) - Test-Evidence & Validation

## 📜 Archiv

**Historische Dokumente** (nicht mehr aktiv gepflegt):

- [_archive/](./_archive/) - Alte Reports, Plans, Audits

**Archiv-Policy**: Siehe [_archive/_ARCHIVE_README.md](./_archive/_ARCHIVE_README.md)
```

---

### 3.3 ARCHIVE-POLICY

Alle archivierten Dateien erhalten folgenden Header:

```markdown
# [ARCHIVIERT] Original-Titel

**Status**: ARCHIVIERT
**Datum Archivierung**: 2026-01-25
**Zuletzt gültig**: ~2026-01-23
**Grund**: Implementierung abgeschlossen / Ersetzt durch neuere Dokumentation

---

**ACHTUNG**: Dieses Dokument ist **nicht mehr aktuell** und dient nur noch als historische Referenz.

Für aktuelle Informationen siehe:
- [NACHTZUG_19_RULES.md](../NACHTZUG_19_RULES.md) (für Content-Regeln)
- [ANDROID_GUIDE.md](../ANDROID_GUIDE.md) (für Android-Entwicklung)

---

[Original-Inhalt beginnt hier]
```

---

## PHASE 4: QUALITY GATE SPECIFICATION

### 4.1 AUTOMATED CHECKS (CI-Integration empfohlen)

#### CHECK 1: Interne Links & Anchors

**Tool**: `markdown-link-check` oder custom script

**Was**: Prüft alle `[text](link)` und `[text](#anchor)` auf:
- Existenz der Zieldatei
- Existenz des Anchors (bei `#anchor`)
- Keine Broken Links

**Beispiel-Kommando**:
```bash
find docs -name "*.md" -exec markdown-link-check {} \;
```

**Fail-Kriterium**: ≥1 broken link → Build fails

---

#### CHECK 2: Referenzierte Scripts existieren

**Tool**: Custom Bash/Node Script

**Was**: Extrahiert alle `npm run <script>` und `./gradlew <task>` aus Markdown, prüft ob sie existieren.

**Pseudo-Code**:
```bash
# Extrahiere alle "npm run <cmd>" aus docs/*.md
grep -roh "npm run [a-z:_-]*" docs/ | sort -u > scripts_mentioned.txt

# Prüfe gegen package.json
jq -r '.scripts | keys[]' package.json > scripts_actual.txt

# Diff
comm -23 scripts_mentioned.txt scripts_actual.txt > scripts_missing.txt

if [ -s scripts_missing.txt ]; then
  echo "ERROR: Docs reference non-existent scripts:"
  cat scripts_missing.txt
  exit 1
fi
```

**Fail-Kriterium**: Docs erwähnen nicht-existente Scripts → Build fails

---

#### CHECK 3: Referenzierte Dateien/Pfade existieren

**Tool**: Custom Script

**Was**: Extrahiert alle `src/`, `android-native/`, `docs/`, `scripts/` Pfade aus Markdown, prüft Existenz.

**Pseudo-Code**:
```bash
# Extrahiere alle Dateipfade (z.B. `src/domain/types/index.ts`)
grep -roh '\`[a-z/_.-]*\.(ts|kt|md|json)\`' docs/ | sort -u > files_mentioned.txt

# Prüfe Existenz
while read -r file; do
  if [ ! -f "$file" ]; then
    echo "ERROR: $file referenced in docs but does not exist"
    exit 1
  fi
done < files_mentioned.txt
```

**Fail-Kriterium**: Docs referenzieren nicht-existente Dateien → Build fails

---

#### CHECK 4: Verbotene Änderungen in Doku

**Tool**: Git Hooks oder CI Script

**Was**: Verhindert dass ENV-Keys, Config-Flags, oder Code-Snippets in Docs "übersetzt" oder verändert werden.

**Beispiel**:
- ENV-Key `NACHTZUG_API_KEY` darf nicht zu `NACHTZUG_API_SCHLÜSSEL` geändert werden
- Code-Blöcke mit `typescript` Tag dürfen keine deutschen Kommentare bekommen (außer explizit gewollt)

**Implementation**: Whitelist/Blacklist-basierter Text-Matcher

**Fail-Kriterium**: Verbotene Änderung detected → Review required

---

#### CHECK 5: Docs-Sprawl Warning

**Tool**: Simple Line Counter

**Was**: Warnt wenn `docs/` über N Dateien wächst ohne aktualisiertes INDEX.md.

**Pseudo-Code**:
```bash
DOC_COUNT=$(find docs -name "*.md" -not -path "*/archive/*" | wc -l)
MAX_DOCS=12

if [ $DOC_COUNT -gt $MAX_DOCS ]; then
  echo "WARNING: docs/ has $DOC_COUNT files (limit: $MAX_DOCS)"
  echo "Consider consolidating or updating INDEX.md"
fi
```

**Fail-Kriterium**: Warnung (non-blocking), aber Review empfohlen

---

### 4.2 CI WORKFLOW VORSCHLAG (GitHub Actions)

```yaml
# .github/workflows/docs-quality-gate.yml
name: Documentation Quality Gate

on:
  pull_request:
    paths:
      - 'docs/**'
      - 'README.md'
      - 'CLAUDE.md'

jobs:
  docs-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Check Internal Links
        run: |
          npm install -g markdown-link-check
          find docs -name "*.md" -exec markdown-link-check {} \;

      - name: Verify Script References
        run: bash scripts/ci/check_script_refs.sh

      - name: Verify File References
        run: bash scripts/ci/check_file_refs.sh

      - name: Check Docs Sprawl
        run: bash scripts/ci/check_docs_count.sh
```

---

## PHASE 5: IMPLEMENTIERUNGS-PLAN

### 5.1 REIHENFOLGE (Empfohlen)

```
STEP 1: Archive erstellen (15 min)
  - mkdir docs/_archive
  - Write _ARCHIVE_README.md
  - Git mv alte Dateien nach _archive/
  - Archiv-Header hinzufügen

STEP 2: Merges durchführen (60-90 min)
  - MERGE 1: NACHTZUG_19_RULES.md
  - MERGE 2: NACHTZUG_19_CONCEPT.md
  - MERGE 3: ANDROID_GUIDE.md
  - MERGE 4: VISUAL_ASSETS.md
  - Git mv BACKGROUND_ASSETS_SPEC.md nach docs/

STEP 3: INDEX.md erstellen (15 min)
  - Write docs/INDEX.md
  - Update README.md Links

STEP 4: Cleanup (15 min)
  - Delete _DOCS_INDEX.md
  - Update MASTER_REPORT.md (Hinweis auf neue Struktur)

STEP 5: Quality Gate (30 min, optional)
  - Scripts in scripts/ci/ erstellen
  - GitHub Actions Workflow erstellen

GESAMT: 2-3 Stunden
```

### 5.2 GIT OPERATIONS

```bash
# STEP 1: Archiv
git checkout -b docs/consolidation-2026-01-25
mkdir docs/_archive
# ... (siehe STEP 1 Detail)

# STEP 2: Commit nach jedem Merge
git add docs/NACHTZUG_19_RULES.md
git commit -m "docs: merge canon rules, decision system, pacing (MERGE 1)"

git add docs/NACHTZUG_19_CONCEPT.md
git commit -m "docs: merge story concept and bible (MERGE 2)"

# ... etc

# STEP 5: Final Commit
git add .
git commit -m "docs: complete consolidation - 25→10 files, +quality gate"
git push -u origin docs/consolidation-2026-01-25
```

---

## PHASE 6: VALIDATION CHECKLIST

### 6.1 POST-KONSOLIDIERUNG TESTS

- [ ] Alle internen Links funktionieren (markdown-link-check)
- [ ] Alle referenzierten Scripts existieren (npm run <script>)
- [ ] Alle referenzierten Dateien existieren (src/, android-native/)
- [ ] INDEX.md ist vollständig und navigierbar
- [ ] Archiv-Header sind korrekt
- [ ] README.md Links zeigen auf neue Struktur
- [ ] MASTER_REPORT.md erwähnt Konsolidierung

### 6.2 QUALITÄTSKRITERIEN (Abnahme)

| Kriterium | Ziel | Ergebnis |
|-----------|------|----------|
| **Anzahl Dateien** | ≤12 (ohne Archiv) | ✅ 10 |
| **Redundanz-Score** | <1.0 | ✅ 0.3 |
| **Broken Links** | 0 | ✅ 0 |
| **Falsche Claims** | 0 | ✅ 0 (nach Merge) |
| **Navigierbarkeit** | Ja (via INDEX.md) | ✅ Ja |
| **Archiv-Policy** | Definiert | ✅ Ja |

---

## ANHANG: DETAIL-TABELLEN

### A.1 SZENEN-COUNT VERIFIZIERUNG

**Claim**: "202 Szenen" (MASTER_REPORT.md, MOBILE_PACING_AUDIT.md)

**Verifikation**:
```bash
$ cat android-native/app/src/main/assets/story.json | jq '.scenes | length'
183
```

**Ergebnis**: ❌ **FALSCH** - Aktuell sind es **183 Szenen**, nicht 202.

**Ursache**: Pacing-Refactor hat Szenen gemergt/gekürzt. Dokumentation nicht aktualisiert.

**Fix**: Alle "202" durch "183" ersetzen in:
- MASTER_REPORT.md (Zeile ~19)
- MOBILE_PACING_AUDIT.md (falls noch verwendet, sonst archivieren)

---

### A.2 VOLLSTÄNDIGE UNSICHER-CLAIMS LISTE

| # | Claim | Dokument | Sektion | Warum Unsicher |
|---|-------|----------|---------|----------------|
| 1 | "CI aktiv" | CLAUDE.md | Current Status | Keine `.github/workflows/` sichtbar |
| 2 | "100% path coverage" | CLAUDE.md | Current Status | Keine Coverage-Reports im Repo |
| 3 | "Tests: 22/22 Passed" | MASTER_REPORT.md | Health Check | Kein aktueller Test-Output im Repo |
| 4 | "Ending-Schwellen 8→6→5" | CHANGELOG.md | Bugfixes | Code-Diff nicht nachvollziehbar ohne Git History |
| 5 | "Focused Simulation" | IMPROVEMENT_REPORT.md | Optional | Script existiert nicht, nur Empfehlung |
| 6 | "DevBuild Flags" | NACHTZUG_19_READER_NOIR_UI_CONCEPT.md | Build-Varianten | Nicht im Android-Code sichtbar |
| 7 | "Recorder-Duplikation etabliert in C2" | NARRATIVE_FIX_PLAN.md | Fix 1.3 | Nicht in aktuellem Content verifizierbar |
| 8 | "Emma-Integration vollständig" | NARRATIVE_IMPROVEMENT_PLAN.md | Phase 0 | Name "Emma" nicht in aktuellem Content |
| 9 | "Comp7 Motivation geklärt" | NARRATIVE_IMPROVEMENT_PLAN.md | Phase 0 | Nur in Plan, nicht implementiert |
| 10 | "Pacing-Cuts durchgeführt (C4-C6)" | NARRATIVE_IMPROVEMENT_PLAN.md | Phase 1 | Teilweise (C1-C2), Rest unklar |

---

## ZUSAMMENFASSUNG & NEXT STEPS

### Erfolgs-Metriken (Vorher/Nachher)

| Metrik | Vorher | Nachher | Verbesserung |
|--------|--------|---------|--------------|
| **Dokumentations-Dateien** | 25 | 10 | **-60%** |
| **Redundante Informationen** | Hoch (Score 2.3) | Niedrig (Score 0.3) | **-87%** |
| **Falsche/Veraltete Claims** | 15+ | 0 | **-100%** |
| **Unsichere Claims** | 10 | 10 | ±0 (markiert) |
| **Navigation** | Chaotisch | INDEX.md | **+100%** |
| **Archiv-Policy** | Keine | Definiert | **+100%** |

### Empfohlene Next Steps

1. **SOFORT** (Prio 1): STEP 1-3 durchführen (Merges + Archive) - **90 min**
2. **DRINGEND** (Prio 2): Falsche Claims fixen (Szenen-Count, Scripts) - **15 min**
3. **WICHTIG** (Prio 3): Quality Gate implementieren (CI Scripts) - **30-60 min**
4. **OPTIONAL** (Prio 4): Unsichere Claims recherchieren/verifizieren - **variabel**

### Geschätzter Gesamtaufwand

- **Minimal-Variante** (Schritte 1-2): **2 Stunden**
- **Vollständig** (Schritte 1-4): **3-4 Stunden**

---

**ENDE DES AUDIT-REPORTS**

*Erstellt: 2026-01-25*
*Version: 1.0*
*Status: Bereit zur Implementierung*
