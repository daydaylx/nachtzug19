# LEGACY CLEANUP LOG (2026-02-20)

## Ziel

Aktive Verwechslungen durch veraltete Artefakte entfernen, ohne Historie in `docs/_archive` oder `docs/evidence` zu löschen.

## Gelöschte Artefakte

- `src/content/nachtzug19/scenes/c1_backup_original.ts`
  - Grund: veralteter Story-Backupstand, nicht Teil der produktiven Szenenpipeline.

- `scripts/tmp_simulate_all_paths.mjs`
  - Grund: temporäres Alt-Skript mit veralteter Start-ID und nicht mehr repräsentativer Traversal-Logik.

- `reports/path_playthroughs.md`
- `reports/story_coherence.md`
  - Grund: aus einer veralteten Kohärenz-Simulation erzeugt (ignorierte Choice-Conditions).

## Ersetzte / modernisierte Artefakte

- `scripts/simulate_endings.ts`
  - Alt: eigenes, veraltetes State-Mapping mit Unknown-Targets.
  - Neu: nutzt aktuelle Engine-Funktionen (`transitionToNextScene`, `getAvailableChoices`, `checkAutoNext`).

- `scripts/analyze_conditional_coverage.ts`
  - Alt: harte Startszene (`c1_s01_platform`) + unvollständiges State-Mapping.
  - Neu: Startszene aus Story-Bundle, Coverage via aktuelle Conditions/Transitions.

- `scripts/audit_choices.ts`
  - Alt: falscher Manifest-Start, veraltete Clamp-Annahmen.
  - Neu: Audit auf Basis von `loadNachtzug19Story()` und `validateContent()`.

## Konsistenz-Fixes (stale Start-ID)

- `android-native/app/src/main/java/de/daydaylx/nachtzug19/engine/GameEngine.kt`
- `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/GameViewModel.kt`
- `src/domain/engine/gameEngine.targets.test.ts`
- `src/domain/types/index.ts` (Kommentarbeispiel)
- `src/mcp/servers/StoryValidatorMCPServer.ts` (Parameterbeispiel)

## Aktualisierte Referenzdokumente

- `docs/STORY_BIBLE.md` auf 201-Szenen-Stand und aktuelle Kapitelstruktur aktualisiert.
- `docs/STORY_REVISION_BASELINE_2026-02-20.md` neu erstellt.

## Nicht gelöscht (bewusst)

- `docs/_archive/**`
- `docs/evidence/**`

Diese Bereiche bleiben als Historie bestehen, sind aber nicht Quelle für den aktuellen Entwicklungsstand.
