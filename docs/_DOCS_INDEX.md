# Dokumentations-Index

| Datei | Zweck | Normative Regeln | Codepfade | Status |
|---|---|---|---|---|
| `ANDROID_NATIVE_BUILD.md` | Build-Anleitung für Android | Setup, Build-Commands | `android-native/`, `scripts/export_story_json.ts` | Aktuell |
| `ANDROID_UI_UX_PLAN.md` | UI/UX Plan für Android Implementation | Phasen 1-5 (alle erledigt) | `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/` | Erledigt |
| `ARCHITECTURE.md` | System-Architektur Übersicht | Layer-Trennung (Content/Domain/UI), Single Source of Truth | `src/domain/`, `src/content/`, `android-native/` | Aktuell |
| `CHANGELOG.md` | Historie & Versionierung | Keine | - | Aktuell |
| `CONCEPT_NACHTZUG_19.md` | Story-Bibel & Konzept | Canon Rules, Kapitelstruktur, Charaktere | `src/content/` | Aktuell |
| `DECISION_SYSTEM.md` | Definition von Choice-Typen (Weighted vs. Tone) | Definition Tone Choices (keine Effects), Fake Choices vermeiden | `src/content/`, Validator | WICHTIG (Definiert Tone) |
| `INDEX.md` | Alter Index | - | - | Veraltet -> Löschen |
| `MASTER_REPORT.md` | Status-Bericht & Aggregator | Release Candidate Status, Type Check Errors | Alle | Aktuell (Source of Truth für Status) |
| `NACHTZUG_19_LENGTH_IMMERSION_SPEC.md` | Qualitäts-Metriken | 30-35 Min/Kapitel, Szenenzahl, Callback-Dichte | `src/content/` | Aktuell |
| `NACHTZUG_19_READER_NOIR_UI_CONCEPT.md` | UI Konzept | Noir Style, Drift Visualisierung | `android-native/ui/` | Aktuell |
| `NACHTZUG_19_RULES.md` | Harte Regeln für Content & Engine | R1-R4, Format-Vorgaben | `src/domain/engine/validateContent.ts` | **KONFLIKT MIT DECISION_SYSTEM** (R3) |
| `NEXT_STEPS_DECISION_REBALANCE.md` | Rebalancing Plan | Tone Conversion Kandidaten | `src/content/` | Aktuell (Action Plan) |
| `QA_REPORT_NACHTZUG19.md` | Detaillierter QA Bericht | Logik-Fehler, Inkonsistenzen | `src/content/` | Konsolidiert in Master |
| `QA_REPORT_SUPPLEMENT.md` | Ergänzender QA Bericht | `played_recorder` Issue | `src/content/c6.ts` | Offen (Fix nötig) |
| `STORY_BIBLE.md` | Zusammenfassung Story & State | State Matrix, Kapitelübersicht | `src/content/` | Aktuell |

## Status-Legende
- **Aktuell**: Gültige Referenz.
- **Erledigt**: Inhalte sind implementiert.
- **Veraltet**: Sollte archiviert/gelöscht werden.
- **WICHTIG**: Enthält kritische Definitionen für nächste Schritte.
- [Visual Assets Plan](VISUAL_ASSETS_PLAN.md)
