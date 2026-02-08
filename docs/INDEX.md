# NACHTZUG 19 - Documentation Index

Diese Datei ist der Einstiegspunkt für die **aktive** Dokumentation.

## Quickstart
- Projektüberblick: [README.md](../README.md)
- Architektur: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Android Build: [ANDROID_NATIVE_BUILD.md](./ANDROID_NATIVE_BUILD.md)
- Content-Regeln: [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md)

## Aktiv gepflegte Kern-Dokumente
- [ARCHITECTURE.md](./ARCHITECTURE.md): TS/Kotlin-Systemüberblick
- [CONCEPT_NACHTZUG_19.md](./CONCEPT_NACHTZUG_19.md): Story-Konzept, Figuren, Motivik
- [NACHTZUG_19_RULES.md](./NACHTZUG_19_RULES.md): Canon Rules + Content-Invarianten
- [DECISION_SYSTEM.md](./DECISION_SYSTEM.md): Entscheidungslogik
- [ANDROID_NATIVE_BUILD.md](./ANDROID_NATIVE_BUILD.md): Android Build/Run
- [CHANGELOG.md](./CHANGELOG.md): Historie

## Tooling / MCP
- [MCP_GUIDE.md](./MCP_GUIDE.md): Einstieg in MCP-Workflows
- [MCP_SERVERS.md](./MCP_SERVERS.md): Server- und Tool-Referenz
- [MCP_EXAMPLES.md](./MCP_EXAMPLES.md): Beispielaufrufe

## Assets und Evidence
- [assets/BACKGROUND_ASSETS_SPEC.md](./assets/BACKGROUND_ASSETS_SPEC.md)
- [VISUAL_ASSETS.md](./VISUAL_ASSETS.md)
- [evidence/README.md](./evidence/README.md)

## Archiv
- Archiv-Wurzel: [docs/_archive](./_archive/)
- Archiv-Policy: [docs/_archive/_ARCHIVE_README.md](./_archive/_ARCHIVE_README.md)

### Archivierte Themenbereiche
- Historische UI/Overworld-Planung
- Abgeschlossene Audit-Reports
- Einmalige Zwischenstände und Migrationsnotizen
- Veraltete Plan-Dateien (inkl. `plans/`-Inhalte)

## Struktur (Soll)
```text
docs/
  INDEX.md
  ARCHITECTURE.md
  CONCEPT_NACHTZUG_19.md
  NACHTZUG_19_RULES.md
  DECISION_SYSTEM.md
  ANDROID_NATIVE_BUILD.md
  CHANGELOG.md
  MCP_GUIDE.md
  MCP_SERVERS.md
  MCP_EXAMPLES.md
  assets/
  evidence/
  _archive/
    plans/
    reports/
    ui/
```

## Pflege-Regeln
- Neue dauerhafte Spezifikationen in `docs/`.
- Einmalige Reports/Audits nach Abschluss nach `docs/_archive/reports/`.
- Experimentelle Pläne nach `docs/_archive/plans/`.
- Veraltete UI/Overworld-Unterlagen nach `docs/_archive/ui/`.

Letzte Aktualisierung: 2026-02-07
