# Story-QA Report NACHTZUG 19

Scope: Kapitel 1-7
Kriterien: Logik/Kontinuitaet, Atmosphaere, Callbacks (R3), Charakter-Konsistenz
Quelle: `src/content/nachtzug19/scenes/c1.ts` bis `src/content/nachtzug19/scenes/c7.ts`

## Kapitel 1-2

### Logik/Kontinuitaet
- `src/content/nachtzug19/scenes/c1.ts` c1_s01a_platform_details: state_notes sagt memory_drift bei `feel_guilty`, Effects setzen keinen Drift -> Inkonsistenz.
- `src/content/nachtzug19/scenes/c2.ts` c2_s03b_comp7_warning vs c2_control_01_question: Comp7 beschreibt 3 Wege (Truth/Escape/Guilt) mit Attention-Deltas, im Control fehlen Guilt-Option und Escape-Delta, zusaetzlich existiert Love-Option.

### Fehlende Callbacks (R3)
- `src/content/nachtzug19/scenes/c1.ts` c1_s03_inside_train: Koffer wird als spaeter relevant angekuendigt, in Kapitel 2 keine erkennbare Rueckwirkung.

### Atmosphaere
- Keine klaren Atmosphaerebrueche identifiziert.

### Charakter-Konsistenz
- Keine harten Brueche in den Kerncharakteren identifiziert.

## Kapitel 3-4

### Logik/Kontinuitaet
- `src/content/nachtzug19/scenes/c3.ts` c3_control_02_question: Schaffner fragt nach Zielort, obwohl frueher die Regel "Warum, nicht Wo" etabliert wurde.
- `src/content/nachtzug19/scenes/c3.ts` c3_control_02_question state_notes nennt `offer_nothing`, Choice existiert nicht.
- `src/content/nachtzug19/scenes/c3.ts` c3_s02a_recorder_listening: Der Junge nimmt den Rekorder, `has_recorder` wird aber nicht angepasst -> Item-Status passt nicht zur Szene.
- `src/content/nachtzug19/scenes/c3.ts` c3_end_station state_notes referenziert truth>=6, Code nutzt truth>=5.
- `src/content/nachtzug19/scenes/c4.ts` c4_s02_recorder_prophecy: Szene erwaehnt Rekorder auch ohne `has_recorder` (nur Choice ist konditional).
- `src/content/nachtzug19/scenes/c4.ts` c4_s05_comp7_call: `examine_ticket_evidence` ohne Nachweis, dass ein Ticket existiert (Ticket ist nur in c4_s04b sichtbar).
- `src/content/nachtzug19/scenes/c4.ts` c4_interlude_02_announcement und c4_s05_comp7_call: state_notes-Thresholds weichen von Code-Conditions ab.

### Fehlende Callbacks (R3)
- `src/content/nachtzug19/scenes/c4.ts` c4_s04b_ticket_appears wird nur in einem optionalen Pfad getriggert, spaeter wird die Fahrkarte aber als gesetzt angenommen (Chapter 5/6) -> Rueckwirkung nicht sauber abgebildet.

### Atmosphaere
- `src/content/nachtzug19/scenes/c3.ts` c3_s03b_inside_comp7 (min_drift 5): explizites Meta-"Text dieses Spiels" koennte Noir-Stil brechen.

### Charakter-Konsistenz
- Keine harten Brueche jenseits der o.g. Regeln identifiziert.

## Kapitel 5-7

### Logik/Kontinuitaet
- `src/content/nachtzug19/scenes/c5.ts` c5_s09_train_shifts: `station_count` wird mitten im Kapitel inkrementiert (R1 erwartet Station-Ende).
- `src/content/nachtzug19/scenes/c6.ts` c6_s25_final_moment: `station_count` vor Station-Ende inkrementiert.
- `src/content/nachtzug19/scenes/c7.ts` c7_s25_final_choice: `station_count` vor Station-Ende inkrementiert.
- `src/content/nachtzug19/scenes/c5.ts` c5_s14_control3_approach: Fahrkarte wird vorausgesetzt, ohne Item-State.
- `src/content/nachtzug19/scenes/c6.ts` c6_s09_boy_final: Dialog setzt Rekorder beim Spieler voraus, obwohl `has_recorder` false moeglich ist.
- `src/content/nachtzug19/scenes/c6.ts` c6_s15_recorder_playback: Text sagt "nie abgespielt", obwohl in Kap. 2/3 bereits gespielt werden kann.
- `src/content/nachtzug19/scenes/c6.ts` c6_s16_tag19_discovery: Text setzt Tag19 voraus, Choice ist nur konditional.
- `src/content/nachtzug19/scenes/c7.ts` c7_s15_recorder_trigger: Text setzt Rekorder voraus, obwohl `has_recorder` false moeglich ist.
- `src/content/nachtzug19/scenes/c7.ts` c7_s21_photo_revelation: Foto wird vorausgesetzt, ohne Item-State oder Choice-Check.
- `src/content/nachtzug19/scenes/c7.ts` c7_s22_tag19_final: Text setzt Tag19 voraus, obwohl `has_tag19` false moeglich ist.
- `src/content/nachtzug19/scenes/c7.ts` c7_s12_seven_offer: Condition `tickets_truth >= 5` UND `< 4` macht `enter_seven` unerreichbar.
- `src/content/nachtzug19/scenes/c7.ts` c7_s17_recorder_truth state_notes referenziert truth>=6, Code nutzt truth>=5.
- `src/content/nachtzug19/scenes/c5.ts` c5_s04_lights_flicker und c5_s18_darkness_spreads: state_notes-Thresholds weichen von Code-Conditions ab.

### Fehlende Callbacks (R3)
- `src/content/nachtzug19/scenes/c6.ts` c6_s10_sleepless_gone: Foto wird als Choice eingefuehrt, aber spaeter nicht als Item nachgehalten (c7_s21 setzt Foto voraus).
- `src/content/nachtzug19/scenes/c5.ts` c5_end_station: "Wagen 12" Choice suggeriert getrennten Pfad, fuehrt aber in denselben Einstieg (nur kleiner Truth-Delta).

### Atmosphaere
- `src/content/nachtzug19/scenes/c5.ts` c5_s12_window_void (min_drift 5): "Rendering Sector 5 / Subject is becoming aware" wirkt wie Tech-Meta und kann den Noir-Ton brechen.

### Charakter-Konsistenz
- `src/content/nachtzug19/scenes/c6.ts` c6_s15_recorder_playback: "Du hast ihn noch nie gedrueckt" widerspricht frueheren Recorder-Uses ohne klaren Drift-Frame.

## Todos (aktualisiert)

1) Comp7s Kontrolle-1-Preview an echte Optionen und Attention-Deltas anpassen oder Kontrolle 1 an die Vorschau angleichen.
2) `enter_seven`-Conditions in `c7_s12_seven_offer` korrigieren, damit der nicht-erkannt-Pfad erreichbar ist.
3) Item-States konsistent machen: Ticket, Foto, Rekorder, Tag19 jeweils als State setzen/abfragen oder Szenen mit Variants/Conditions absichern.
4) Manuelle `station_count`-Increments ausserhalb von `station_end` entfernen oder bewusst als Ausnahme dokumentieren.
5) Recorder-Narrative in Kapitel 6/7 an fruehere Nutzung anpassen (z.B. Variant wenn bereits abgespielt).
6) `has_recorder` in c3_s02a_recorder_listening anpassen, wenn der Junge den Rekorder nimmt (oder narrativ klarstellen).
7) state_notes-Thresholds an Code-Conditions angleichen (c1/c3/c4/c5/c7).
8) Koffer-Callback aus c1_s03_inside_train in Kapitel 2 ergaenzen oder Foreshadowing entfernen.
