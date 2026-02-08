# Archiv - Historische Dokumentation

Status: ARCHIV  
Letzte Aktualisierung: 2026-02-07

## Zweck
Dieses Verzeichnis enthält Dokumente mit historischem Wert, die nicht mehr aktiv gepflegt werden.

## Archivierungs-Policy
Dokumente werden archiviert, wenn mindestens einer der Punkte zutrifft:
- Umsetzung abgeschlossen, Dokument dient nur noch als Projekt-Historie.
- Inhalt wurde durch neuere Spezifikation ersetzt.
- Audit/Report war ein einmaliger Snapshot.
- Explorative oder verworfene Ansätze (z.B. Overworld-/UI-Experimente).

## Unterstruktur
- `plans/`: veraltete oder abgeschlossene Planungsdokumente
- `reports/`: abgeschlossene Audits und Statusreports
- `ui/`: veraltete UI-/Overworld-Konzepte
- Root (`_archive/*.md`): ältere, vor der Unterstruktur archivierte Dateien

## Referenzen auf aktive Dokumente
- Hauptnavigation: [docs/INDEX.md](../INDEX.md)
- Content-Regeln: [docs/NACHTZUG_19_RULES.md](../NACHTZUG_19_RULES.md)
- Android Build: [docs/ANDROID_NATIVE_BUILD.md](../ANDROID_NATIVE_BUILD.md)
- Story-Konzept: [docs/CONCEPT_NACHTZUG_19.md](../CONCEPT_NACHTZUG_19.md)

## Hinweise für Maintainer
- Archiv-Dateien nicht stillschweigend „reaktivieren“.
- Bei Wiederverwendung Inhalte in neue aktive Datei übertragen und im Commit referenzieren.
- Größere Verschiebungen immer zusammen mit `docs/INDEX.md` aktualisieren.
