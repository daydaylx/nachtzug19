# NACHTZUG 19 - Documentation Index

**Willkommen!** Diese Seite ist der zentrale Einstiegspunkt für alle Projekt-Dokumentation.

---

## 🚀 Quickstart

- **Neu hier?** → Lies [README.md](../README.md) für Projekt-Übersicht
- **Development Setup?** → Siehe [ANDROID_GUIDE.md](./ANDROID_GUIDE.md)
- **Story schreiben?** → Siehe [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md)
- **AI Agent?** → Siehe [CLAUDE.md](../CLAUDE.md)

---

## 📚 Kern-Dokumentation

| Dokument | Zweck | Zielgruppe |
|----------|-------|------------|
| [README.md](../README.md) | Projekt-Übersicht & Quickstart | User + Dev |
| [CLAUDE.md](../CLAUDE.md) | Anleitung für Claude Code Agent | AI Agent |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System-Architektur (TS/Kotlin Hybrid) | Dev |
| [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md) | Canon Rules, Choice System, Pacing | Writer + Dev |
| [NACHTZUG_19_CONCEPT.md](./NACHTZUG_19_CONCEPT.md) | Story Concept & Figuren-Referenz | Writer + Dev |
| [STORY_BIBLE.md](./STORY_BIBLE.md) | Kapitel-Übersicht, Figuren, State-Index | Writer |
| [ANDROID_GUIDE.md](./ANDROID_GUIDE.md) | Android Build & UI Guide | Dev |
| [VISUAL_ASSETS.md](./VISUAL_ASSETS.md) | Asset Specifications & Prompts | Design + Dev |
| [CHANGELOG.md](./CHANGELOG.md) | Änderungshistorie | Dev + User |
| [MASTER_REPORT.md](./MASTER_REPORT.md) | Projekt-Statusbericht (2026-01-21) | Dev |

---

## 📦 Spezial-Dokumentation

### Assets & Spezifikationen
- [assets/BACKGROUND_ASSETS_SPEC.md](./assets/BACKGROUND_ASSETS_SPEC.md) - Detaillierte Background Asset-Spezifikation
- [VISUAL_ASSETS.md](./VISUAL_ASSETS.md) - Visuelle Asset-Planung & Prompts

### Testing & Evidence
- [evidence/README.md](./evidence/README.md) - Test-Evidence & Validation-Outputs

---

## 🤖 AI Agent Guidance

**Für Claude Code und andere AI Agents:**

- [CLAUDE.md](../CLAUDE.md) - Vollständige Projekt-Anleitung für AI Agents
  - Architektur-Übersicht
  - State Model
  - Workflow für Content-Updates
  - Häufige Fallstricke

---

## 🗂️ Dokumentations-Struktur

```
nachtzug19/
├── README.md                    # Projekt-Einstieg
├── CLAUDE.md                    # AI Agent Guidance
│
├── docs/
│   ├── INDEX.md                 # Diese Seite
│   ├── ARCHITECTURE.md          # System-Architektur
│   ├── CHANGELOG.md             # Änderungshistorie
│   ├── NACHTZUG_19_RULES.md     # Content-Regeln (Canon + Pacing)
│   ├── NACHTZUG_19_CONCEPT.md   # Story Concept & Referenz
│   ├── ANDROID_GUIDE.md         # Android Build & UI
│   ├── VISUAL_ASSETS.md         # Asset-Spezifikationen
│   ├── MASTER_REPORT.md         # Projekt-Status
│   │
│   ├── _archive/                # Historische Dokumente
│   ├── assets/                  # Detaillierte Spezifikationen
│   └── evidence/                # Test-Outputs & Validierung
```

---

## 📜 Archiv

**Historische Dokumente** (nicht mehr aktiv gepflegt):

- [_archive/](./_archive/) - Alte Reports, Plans, Audits
- **Archiv-Policy**: Siehe [_archive/_ARCHIVE_README.md](./_archive/_ARCHIVE_README.md)

Archivierte Dokumente werden nicht mehr aktualisiert und dienen nur als historische Referenz.

---

## 🔍 Wie finde ich Informationen?

### Ich möchte...

**...das Projekt verstehen**
→ [README.md](../README.md) + [ARCHITECTURE.md](./ARCHITECTURE.md)

**...eine Android-App bauen**
→ [ANDROID_GUIDE.md](./ANDROID_GUIDE.md) (Build, UI/UX, Troubleshooting)

**...Story-Content schreiben**
→ [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md) + [NACHTZUG_19_CONCEPT.md](./NACHTZUG_19_CONCEPT.md)

**...das State Model verstehen**
→ [CLAUDE.md](../CLAUDE.md#state-model-nachtzug-19) oder [NACHTZUG_19_CONCEPT.md](./NACHTZUG_19_CONCEPT.md)

**...Assets generieren**
→ [VISUAL_ASSETS.md](./VISUAL_ASSETS.md)

**...die Canon-Regeln nachlesen**
→ [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md#canon-rules)

**...Tests ausführen**
→ [README.md](../README.md#development-commands) oder [evidence/README.md](./evidence/README.md)

---

## 📊 Dokumentations-Qualität

Diese Dokumentation wurde am **2026-01-25** konsolidiert:
- ✅ Redundanz-Reduktion: 25 → 10 Dateien (-60%)
- ✅ Alle internen Links geprüft
- ✅ Alle Script-Referenzen verifiziert
- ✅ Archiv-Policy implementiert

**Audit-Report**: [docs_audit_report.md](../docs_audit_report.md)

---

## ❓ Fragen oder Probleme?

1. **Dokumentation fehlt?** → Prüfe [_archive/](./_archive/) ob es archiviert wurde
2. **Link funktioniert nicht?** → Erstelle ein Issue im Repository
3. **Information veraltet?** → Aktualisiere die entsprechende Datei und committe

**Letzte Aktualisierung**: 2026-01-25
