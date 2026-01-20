# QA Supplement Report - 2026-01-20

## Neue Probleme Identifiziert

### P2: Narrative Inkonsistenz (Recorder)

**Problem:**
Kapitel 6 behauptet in Szene `c6_s15_recorder_playback`, der Spieler habe den Rekorder "noch nie gedrückt", obwohl dies in Kapitel 3 (`c3_s02a_recorder_listening`) möglich ist.

**Beweis:**

1. **Kapitel 3 (c3.ts):** Spieler kann Rekorder abspielen.
   ```typescript
   // c3_s01b_boy_return
   {
     id: 'play_own_recorder',
     label: 'Den eigenen Rekorder abspielen',
     effects: [
       // Kein 'played_recorder' Flag gesetzt!
       { type: 'inc', target: 'tickets_truth', value: 1 },
       // ...
     ]
   }
   ```

2. **Kapitel 6 (c6.ts):** Text behauptet das Gegenteil (ohne Condition).
   ```typescript
   // c6_s15_recorder_playback
   narrative: `...
   Du hast ihn noch nie gedrückt.
   Noch nie die Kassette abgespielt.
   ...`
   ```

3. **Fehlender State:**
   Eine Suche nach `played_recorder` oder ähnlichen State-Variablen im gesamten Projekt lieferte 0 Treffer. Das Spiel *weiß* nicht, ob der Rekorder abgespielt wurde.

**Lösungsvorschlag:**
1. Neue State-Variable `played_recorder` (boolean) in `src/domain/types/index.ts` definieren.
2. In `c3.ts` (und `c2.ts` falls relevant) `played_recorder = true` setzen bei Abspielen.
3. In `c6.ts` eine `narrative_variant` hinzufügen, die den Text anpasst, wenn `played_recorder == true`.

---

### Verifizierte "False Positives" (Keine Fehler)

- **`rel_sleepless` Usage:** Variable wird in `c1.ts` (`ask_sleepless`), `c2.ts` (`ask_for_anchor`) und `c5.ts` (`protect_sleepless`) korrekt abgefragt. Kein "Dead State".
- **`station_count` Increments:** Dienen dem Analytics-Tracking (R1 Policy), kein Game-Logic-Fehler.

