# Dokumentations-Konflikte

## 1. R3 (Rules) vs. Tone Choices (Decision System)

**Konflikt:**
- `NACHTZUG_19_RULES.md` (Abschnitt 2, R3): "Jede Choice muss: 1. mindestens **eine** State-Änderung haben (Effect)..." und "Keine Choice ohne `effects`." (Abschnitt 7).
- `DECISION_SYSTEM.md` (Abschnitt B): "STIMMUNGS-Entscheidungen (Tone)... Kriterien: 1. **Keine Effekte:** Das `effects`-Array ist leer."

**Analyse:**
Das `DECISION_SYSTEM` führt explizit "Tone Choices" ein, um Ticket-Inflation zu verhindern und reines Rollenspiel zu ermöglichen. Die alte Regel R3 ("Jede Choice muss Konsequenzen haben") ist zu strikt und verhindert dies.

**Lösungsvorschlag:**
Regel R3 lockern.
- **Neu:** "Jede Choice muss ENTWEDER mindestens einen Effect haben (Weighted) ODER explizit als Tone-Choice (leeres Array) markiert sein, darf dann aber keine Verzweigung haben (Micro-Branching via Narrative Variants erlaubt)."
- Validator muss leere Effects erlauben, WENN next-Szene identisch mit anderen Choices (oder Single Choice) -> Das ist schwer zu prüfen.
- Einfacher: Validator erlaubt leere Effects, warnt aber (Info), damit man prüft, ob es Absicht (Tone) oder Vergessen ist. Oder wir führen ein explizites Flag `type: 'tone'` ein (nicht im aktuellen Schema).
- **Pragmatisch:** Validator erlaubt leere Effects Liste. R3 wird umformuliert zu "Keine *Weighted* Choice ohne Konsequenz".

## 2. Ending Thresholds

**Konflikt:**
- Code (`c7.ts`, `gameEngine.ts`) und `MASTER_REPORT.md` (seit 20.01.26): Threshold ist **5**.
- Ältere Docs/Kommentare könnten noch **6** erwähnen.

**Lösung:**
Code und Master Report sind führend. Threshold ist 5. Alle Docs, die 6 sagen, sind veraltet.

## 3. `played_recorder` State

**Konflikt:**
- `QA_REPORT_SUPPLEMENT.md` behauptet, `played_recorder` würde fehlen und müsse definiert werden.
- `src/domain/types/index.ts` enthält `played_recorder` bereits in `Items` und `EffectTarget`.

**Analyse:**
Der Key existiert im Type-System, wird aber laut Report im Content (`c2`, `c3`) nicht gesetzt.

**Lösung:**
Implementierung im Content nachziehen (Phase 3).
