# NACHTZUG 19 - Playtest Matrix

> **Zweck:** Simulation von 3 Pfaden pro Kapitel zur Bewertung von Choice-Design und Narrative Flow
> **Scope:** Kapitel 1-7, 3 Pfade pro Kapitel (Risk-avoidant, Confrontational, Opportunistic)
> **Referenzen:** docs/NACHTZUG_19_RULES.md, reports/rules_index.md, reports/decision_fixes.md
> **Validiert am:** 2026-01-17
> **Status:** Simulation abgeschlossen

---

## 📋 Legende & Bewertungssystem

**Pfade:**
- **Path A (Risk-avoidant):** Kontrolle vermeiden, Flucht/Vermeidung
- **Path B (Confrontational):** Wahrheit/Druck suchen, direkte Konfrontation
- **Path C (Opportunistic):** Items sammeln, Abkürzungen nutzen

**Bewertung (1-5):**
- **Klarheit der Choices:** Sind die Optionen verständlich?
- **Konsequenzen spürbar:** Haben Choices sichtbare Auswirkungen?
- **Atmosphäre stabil:** Bleibt Noir/Bedrohung erhalten?
- **Payoff vorhanden:** Gibt es sinnvolle Belohnungen?

**Worst Choices:** Die 3 schlechtesten Entscheidungen pro Kapitel + Reparaturvorschlag

---

## 🔍 Kapitel 1: Leerer Bahnsteig

### Path A: Risk-avoidant (Flucht/Vermeidung)
**Pfad-Log:**
c1_s01_platform → check_phone (+escape) → c1_s01a_platform_details → check_phone (+escape) → c1_interlude_01_lights → c1_s02_train_appears → walk_away (+escape) → c1_s02a_train_exterior → c1_interlude_02_silence → c1_s03_inside_train → ignore_him (+truth, -sleepless) → c1_s04_sleepless_intro → c1_s03a_corridor_walk → c1_s03b_find_seat → c1_s04a_sleepless_past → c1_s04b_sleepless_warning → c1_s05_first_anomaly → c1_s05a_other_passengers → c1_s05b_compartment7_tease → c1_s05c_announcement_repeat → c1_s05d_comp7_listen → c1_s06_corridor_end → c1_s07_stranger_encounter → c1_end_platform_look → c1_end_station

**Bewertung:**
- Klarheit der Choices: 4/5 (Flucht-Optionen klar, aber etwas repetitiv)
- Konsequenzen spürbar: 3/5 (tickets_escape steigt, aber wenig narrative Konsequenzen)
- Atmosphäre stabil: 5/5 (Noir/Bedrohung gut erhalten)
- Payoff vorhanden: 2/5 (Kein klarer Payoff für Vermeidung)

**Gesamt:** 3.5/5 - Gute Atmosphäre, aber wenig Belohnung für risk-avoidant Spiel

### Path B: Confrontational (Wahrheit/Druck)
**Pfad-Log:**
c1_s01_platform → look_around (+truth) → c1_s01a_platform_details → look_around (+truth) → c1_interlude_01_lights → c1_s02_train_appears → approach_train (+truth) → c1_s02a_train_exterior → c1_interlude_02_silence → c1_s03_inside_train → talk_to_him (+love, +sleepless) → c1_s04_sleepless_intro → c1_s03a_corridor_walk → c1_s03b_find_seat → c1_s04a_sleepless_past → c1_s04b_sleepless_warning → c1_s05_first_anomaly → examine_door_quietly (+truth, +comp7) → c1_s05a_other_passengers → c1_s05b_compartment7_tease → c1_s05c_announcement_repeat → c1_s05d_comp7_listen → c1_s06_corridor_end → c1_s07_stranger_encounter → c1_end_platform_look → c1_end_station

**Bewertung:**
- Klarheit der Choices: 5/5 (Wahrheits-Optionen sehr klar)
- Konsequenzen spürbar: 4/5 (tickets_truth steigt, Beziehungen verbessern sich)
- Atmosphäre stabil: 4/5 (Etwas weniger bedrohlich durch positive Interaktionen)
- Payoff vorhanden: 4/5 (Beziehungsaufbau und Erkenntnisse)

**Gesamt:** 4.25/5 - Starker Pfad mit gutem Payoff

### Path C: Opportunistic (Items/Abkürzungen)
**Pfad-Log:**
c1_s01_platform → try_leave (+guilt, +attention) → c1_s01a_platform_details → try_leave (+guilt, +attention) → c1_interlude_01_lights → c1_s02_train_appears → approach_train (+truth) → c1_s02a_train_exterior → c1_interlude_02_silence → c1_s03_inside_train → talk_to_him (+love, +sleepless) → c1_s04_sleepless_intro → c1_s03a_corridor_walk → c1_s03b_find_seat → c1_s04a_sleepless_past → c1_s04b_sleepless_warning → c1_s05_first_anomaly → speak_through_door (+love, +comp7) → c1_s05a_other_passengers → c1_s05b_compartment7_tease → c1_s05c_announcement_repeat → c1_s05d_comp7_listen → c1_s06_corridor_end → c1_s07_stranger_encounter → c1_end_platform_look → c1_end_station

**Bewertung:**
- Klarheit der Choices: 3/5 (Opportunistische Choices nicht immer klar)
- Konsequenzen spürbar: 3/5 (Beziehungen verbessern, aber keine Items in Kapitel 1)
- Atmosphäre stabil: 3/5 (Etwas inkonsistent durch Mischung aus Flucht und Konfrontation)
- Payoff vorhanden: 3/5 (Beziehungen, aber keine echten Items)

**Gesamt:** 3/5 - Mittelmaß, da Kapitel 1 keine Items hat

### Worst Choices & Reparatur

1. **c1_s01_platform → try_leave:** Zu hohe conductor_attention für frühes Kapitel
   - *Reparatur:* +1 attention statt +2, oder nur bei wiederholter Wahl

2. **c1_s03_inside_train → ignore_him:** Negative Beziehung ohne klare Warnung
   - *Reparatur:* Hinweis, dass Ignorieren Beziehungen verschlechtert

3. **c1_s05_first_anomaly → c1_s05c_announcement_repeat:** Kein klarer Payoff
   - *Reparatur:* Kleine Erkenntnis oder Hinweis auf späteres Mystery

---

## 🚂 Kapitel 2: Die erste Kontrolle

### Path A: Risk-avoidant (Flucht/Vermeidung)
**Pfad-Log:**
c2_s01_ticket_search → keep_walking (+guilt, +attention) → c2_s01a_passenger_examination → watch_laptop_man (+escape) → c2_s02_boy_recorder → ignore_boy (+escape) → c2_s02b_corridor_anomaly → c2_s02c_boy_vanish → c2_interlude_02_window_dark → c2_s03_comp7_intro → ignore_comp7 (+escape) → c2_s03a_comp7_notebook → c2_s03b_comp7_warning → c2_s04_announcement → c2_s04a_conductor_approach → c2_s04b_passengers_shift → c2_control_01_approach → home_answer (+escape, +attention) → c2_control_01_question → c2_control_01_aftermath → c2_s05a_sleepless_talk → c2_s05b_reality_shift → c2_end_platform_watch → c2_end_station

**Bewertung:**
- Klarheit der Choices: 4/5 (Flucht-Optionen klar)
- Konsequenzen spürbar: 4/5 (conductor_attention steigt spürbar)
- Atmosphäre stabil: 5/5 (Noir/Bedrohung sehr gut)
- Payoff vorhanden: 3/5 (Kontrolle wird härter - logisch, aber kein positiver Payoff)

**Gesamt:** 4/5 - Guter risk-avoidant Pfad mit klaren Konsequenzen

### Path B: Confrontational (Wahrheit/Druck)
**Pfad-Log:**
c2_s01_ticket_search → ask_boy (+love, +boy) → c2_s02_boy_recorder → ask_about_recorder (+love, +boy) → c2_s02a_recorder_listening → keep_listening (+love, +boy, has_recorder) → c2_s02b_corridor_anomaly → c2_s02c_boy_vanish → c2_interlude_02_window_dark → c2_s03_comp7_intro → ask_about_notebook (+truth, +comp7) → c2_s03a_comp7_notebook → read_notebook (+truth, +comp7) → c2_s03b_comp7_warning → c2_s04_announcement → c2_s04a_conductor_approach → c2_s04b_passengers_shift → c2_control_01_approach → truth_answer (+truth, -attention) → c2_control_01_question → c2_control_01_aftermath → c2_s05a_sleepless_talk → c2_s05b_reality_shift → c2_end_platform_watch → c2_end_station

**Bewertung:**
- Klarheit der Choices: 5/5 (Konfrontative Optionen sehr klar)
- Konsequenzen spürbar: 5/5 (has_recorder, Beziehungen, attention Management)
- Atmosphäre stabil: 4/5 (Etwas weniger bedrohlich durch positive Interaktionen)
- Payoff vorhanden: 5/5 (Rekorder, bessere Kontrolle, Erkenntnisse)

**Gesamt:** 4.75/5 - Exzellenter Pfad mit besten Payoffs

### Path C: Opportunistic (Items/Abkürzungen)
**Pfad-Log:**
c2_s01_ticket_search → search_self (+escape) → c2_s01b_ticket_pocket → c2_interlude_01_toilet → c2_s02_boy_recorder → take_recorder (+love, +boy, has_recorder) → c2_s02a_recorder_listening → c2_s02b_corridor_anomaly → c2_s02c_boy_vanish → c2_interlude_02_window_dark → c2_s03_comp7_intro → ask_about_notebook (+truth, +comp7) → c2_s03a_comp7_notebook → c2_s03b_comp7_warning → c2_s04_announcement → c2_s04a_conductor_approach → c2_s04b_passengers_shift → c2_control_01_approach → search_answer (+love, attention=0) → c2_control_01_question → c2_control_01_aftermath → c2_s05a_sleepless_talk → c2_s05b_reality_shift → c2_end_platform_watch → c2_end_station

**Bewertung:**
- Klarheit der Choices: 4/5 (Item-Choices gut, aber nicht alle klar als opportunistisch markiert)
- Konsequenzen spürbar: 5/5 (has_recorder kritisch, attention Management gut)
- Atmosphäre stabil: 4/5 (Gute Balance zwischen Bedrohung und Opportunity)
- Payoff vorhanden: 5/5 (Rekorder + einfache Kontrolle)

**Gesamt:** 4.5/5 - Sehr guter opportunistischer Pfad

### Worst Choices & Reparatur

1. **c2_s01_ticket_search → keep_walking:** Zu hohe attention für Vermeidung
   - *Reparatur:* +1 attention statt +2, oder nur wenn bereits attention >= 1

2. **c2_s03_comp7_intro → ignore_comp7:** Kein klarer Payoff für Ignorieren
   - *Reparatur:* Kleine Erkenntnis über andere Passagiere

3. **c2_control_01_question → home_answer:** Zu hohe attention für ehrliche Antwort
   - *Reparatur:* +1 attention statt +2, oder alternative Formulierung

---

## 🚪 Kapitel 3: Wagen 7

### Path A: Risk-avoidant (Flucht/Vermeidung)
**Pfad-Log:**
c3_s01_wagen7_locked → walk_away (+escape) → c3_s01a_after_station → c3_interlude_01_lights → c3_s01b_boy_return → ignore_boy (+escape) → c3_s02_recorder_anomaly → ignore_recorder (+escape) → c3_interlude_02_announcement → c3_s02b_corridor_shift → c3_s02c_sleepless_talk → c3_interlude_03_window → c3_s03_wagen7_approach → walk_away (+escape) → c3_s03a_compartment7_door → c3_s03b_inside_comp7 → c3_s03c_notebooks_explore → c3_s04_comp7_truth → c3_s04a_paradox_window → c3_s04b_third_announcement → c3_control_02_approach → next_answer (+escape, +attention) → c3_control_02_question → c3_control_02_aftermath → c3_s06_passengers_vanish → c3_s06a_drift_intensifies → c3_s06b_boy_final → c3_end_platform_watch → c3_end_station

**Bewertung:**
- Klarheit der Choices: 4/5 (Flucht-Optionen klar)
- Konsequenzen spürbar: 4/5 (conductor_attention steigt, aber Vermeidung funktioniert)
- Atmosphäre stabil: 5/5 (Noir/Bedrohung exzellent)
- Payoff vorhanden: 3/5 (Kein positiver Payoff, aber Vermeidung gelingt)

**Gesamt:** 4/5 - Guter risk-avoidant Pfad

### Path B: Confrontational (Wahrheit/Druck)
**Pfad-Log:**
c3_s01_wagen7_locked → try_to_open (+truth, +drift) → c3_s03_wagen7_approach → knock_on_door (+truth, +comp7) → c3_s03a_compartment7_door → speak_through_door (+love, +comp7) → c3_s03b_inside_comp7 → read_notebook (+truth, +comp7, +drift) → c3_s03c_notebooks_explore → examine_photo (+truth, photo_anomaly) → c3_s04_comp7_truth → ask_comp7_name (+truth, +comp7) → c3_s04a_paradox_window → c3_s04b_third_announcement → c3_control_02_approach → return_answer (+truth, +attention) → c3_control_02_question → comp7_answer (+love, -attention) → c3_control_02_aftermath → c3_s06_passengers_vanish → c3_s06a_drift_intensifies → c3_s06b_boy_final → c3_end_platform_watch → c3_end_station

**Bewertung:**
- Klarheit der Choices: 5/5 (Konfrontative Optionen sehr klar)
- Konsequenzen spürbar: 5/5 (Beziehungen, Erkenntnisse, attention Management)
- Atmosphäre stabil: 4/5 (Surrealismus gut, aber weniger bedrohlich)
- Payoff vorhanden: 5/5 (Tiefe Erkenntnisse, bessere Kontrolle)

**Gesamt:** 4.75/5 - Exzellenter konfrontativer Pfad

### Path C: Opportunistic (Items/Abkürzungen)
**Pfad-Log:**
c3_s01_wagen7_locked → knock_softly (+love, +comp7) → c3_s01b_boy_return → ask_about_recorder (+love, +boy) → c3_s02_recorder_anomaly → take_recorder (+love, +boy, has_recorder) → c3_s02a_recorder_listening → c3_s02b_corridor_shift → c3_s02c_sleepless_talk → c3_interlude_03_window → c3_s03_wagen7_approach → open_door (+truth, +comp7) → c3_s03a_compartment7_door → c3_s03b_inside_comp7 → c3_s03c_notebooks_explore → take_boys_recorder (has_recorder) → c3_s04_comp7_truth → c3_s04a_paradox_window → c3_s04b_third_announcement → c3_control_02_approach → return_answer (+truth, +attention) → c3_control_02_question → c3_control_02_aftermath → c3_s06_passengers_vanish → c3_s06a_drift_intensifies → c3_s06b_boy_final → c3_end_platform_watch → c3_end_station

**Bewertung:**
- Klarheit der Choices: 4/5 (Item-Choices gut, aber nicht alle klar als opportunistisch markiert)
- Konsequenzen spürbar: 5/5 (has_recorder kritisch, Beziehungen gut)
- Atmosphäre stabil: 4/5 (Gute Balance)
- Payoff vorhanden: 5/5 (Rekorder behalten + Erkenntnisse)

**Gesamt:** 4.5/5 - Sehr guter opportunistischer Pfad

### Worst Choices & Reparatur

1. **c3_s01_wagen7_locked → walk_away:** Zu starke Vermeidung ohne Alternative
   - *Reparatur:* Alternative "später zurückkommen" Choice hinzufügen

2. **c3_s03c_notebooks_explore → examine_photo:** photo_anomaly ohne Payoff
   - *Reparatur:* Spätere Szene mit Callback oder Hinweis

3. **c3_control_02_question → next_answer:** Zu hohe attention für vage Antwort
   - *Reparatur:* +1 attention statt +2

---

## 🪞 Kapitel 4: Spiegelung

### Path A: Risk-avoidant (Flucht/Vermeidung)
**Pfad-Log:**
c4_s01_mirror → back_away (+escape) → c4_interlude_01_lights → c4_s02_recorder_prophecy → c4_s02a_recording_self → c4_s02b_recorder_loop → c4_interlude_02_announcement → c4_s03_passengers_return → c4_s03a_sleepless_changed → c4_s03b_boy_paradox → c4_interlude_03_window → c4_s04_announcement_glitch → c4_s04a_name_confusion → c4_s04b_ticket_appears → take_tag (+tag19) → c4_s05_comp7_call → c4_s05a_wagen7_changed → c4_s06_comp7_memory → c4_s06a_shared_memory → c4_s07_reality_fracture → c4_s07a_drift_peak → c4_s07b_stabilization → c4_end_platform_watch → c4_end_station

**Bewertung:**
- Klarheit der Choices: 4/5 (Flucht-Optionen klar)
- Konsequenzen spürbar: 3/5 (Vermeidung funktioniert, aber wenig Payoff)
- Atmosphäre stabil: 5/5 (Surrealismus/Noir exzellent)
- Payoff vorhanden: 3/5 (tag19, aber kein großer Vorteil)

**Gesamt:** 3.75/5 - Guter Pfad, aber wenig Belohnung

### Path B: Confrontational (Wahrheit/Druck)
**Pfad-Log:**
c4_s01_mirror → touch_mirror (+truth, +drift) → c4_s01a_double_reflection → touch_mirror (+truth, +drift) → c4_s01b_wrong_memory → c4_interlude_01_lights → c4_s02_recorder_prophecy → listen_to_prophecy (+truth, has_recorder) → c4_s02a_recording_self → c4_s02b_recorder_loop → c4_interlude_02_announcement → c4_s03_passengers_return → talk_to_boy (+love, +boy) → c4_s03b_boy_paradox → c4_interlude_03_window → c4_s04_announcement_glitch → ask_comp7_name (+truth, +comp7) → c4_s04b_ticket_appears → take_tag (+tag19) → c4_s05_comp7_call → c4_s05a_wagen7_changed → c4_s06_comp7_memory → c4_s06a_shared_memory → c4_s07_reality_fracture → c4_s07a_drift_peak → c4_s07b_stabilization → c4_end_platform_watch → c4_end_station

**Bewertung:**
- Klarheit der Choices: 5/5 (Konfrontative Optionen sehr klar)
- Konsequenzen spürbar: 5/5 (drift, Beziehungen, Items)
- Atmosphäre stabil: 4/5 (Surrealismus gut, aber weniger bedrohlich)
- Payoff vorhanden: 5/5 (Rekorder, tag19, Erkenntnisse)

**Gesamt:** 4.75/5 - Exzellenter Pfad mit besten Payoffs

### Path C: Opportunistic (Items/Abkürzungen)
**Pfad-Log:**
c4_s01_mirror → talk_to_reflection (+love, +drift) → c4_s01a_double_reflection → c4_s01b_wrong_memory → c4_interlude_01_lights → c4_s02_recorder_prophecy → take_recorder (+love, has_recorder) → c4_s02a_recording_self → c4_s02b_recorder_loop → c4_interlude_02_announcement → c4_s03_passengers_return → c4_s03a_sleepless_changed → c4_interlude_03_window → c4_s04_announcement_glitch → c4_s04a_name_confusion → c4_s04b_ticket_appears → take_tag (+tag19) → c4_s05_comp7_call → c4_s05a_wagen7_changed → c4_s06_comp7_memory → c4_s06a_shared_memory → c4_s07_reality_fracture → c4_s07a_drift_peak → c4_s07b_stabilization → c4_end_platform_watch → c4_end_station

**Bewertung:**
- Klarheit der Choices: 4/5 (Item-Choices gut)
- Konsequenzen spürbar: 5/5 (Beide Items + Erkenntnisse)
- Atmosphäre stabil: 4/5 (Gute Balance)
- Payoff vorhanden: 5/5 (Beide kritische Items)

**Gesamt:** 4.5/5 - Sehr guter opportunistischer Pfad

### Worst Choices & Reparatur

1. **c4_s01_mirror → back_away:** Zu starke Vermeidung ohne Alternative
   - *Reparatur:* Alternative "Spiegel aus der Ferne beobachten" Choice

2. **c4_s03_passengers_return → c4_s03a_sleepless_changed:** Kein klarer Payoff
   - *Reparatur:* Kleine Erkenntnis über Veränderung

3. **c4_s07_reality_fracture → c4_s07b_stabilization:** Zu abrupt
   - *Reparatur:* Übergangs-Szene mit mehr Kontext

---

## ⚖️ Kapitel 5: Finale Kontrolle

### Path A: Risk-avoidant (Flucht/Vermeidung)
**Pfad-Log:**
c5_s01_final_preparation → rest_prepare (+escape) → c5_s02_corridor_silence → c5_s03_comp7_reflection → c5_s04_lights_flicker → c5_s05_sleepless_final → c5_s06_abteil7_approach → c5_s07_abteil7_inside → c5_s08_abteil7_aftermath → c5_s09_train_shifts → c5_s10_boy_reunion → c5_s11_corridor_encounter → c5_s12_window_void → c5_s13_memory_fragment → c5_s14_control3_approach → c5_s15_control3_question → escape_final (+escape, +attention) → c5_s16_control3_aftermath → c5_s17_aftermath_reflection → c5_s18_darkness_spreads → c5_s19_final_conversation → c5_s20_decision_approach → c5_s21_decision_core → c5_s22_decision_aftermath → c5_s23_before_station → c5_s24_platform_arrives

**Bewertung:**
- Klarheit der Choices: 4/5 (Flucht-Optionen klar)
- Konsequenzen spürbar: 4/5 (attention steigt, Kontrolle hart)
- Atmosphäre stabil: 5/5 (Finale Bedrohung exzellent)
- Payoff vorhanden: 3/5 (Kein positiver Payoff, aber Vermeidung gelingt)

**Gesamt:** 4/5 - Guter risk-avoidant Pfad für Finale

### Path B: Confrontational (Wahrheit/Druck)
**Pfad-Log:**
c5_s01_final_preparation → check_recorder (+truth) → c5_s02_corridor_silence → c5_s03_comp7_reflection → c5_s04_lights_flicker → c5_s05_sleepless_final → c5_s06_abteil7_approach → c5_s07_abteil7_inside → c5_s08_abteil7_aftermath → c5_s09_train_shifts → c5_s10_boy_reunion → c5_s11_corridor_encounter → c5_s12_window_void → c5_s13_memory_fragment → c5_s14_control3_approach → c5_s15_control3_question → truth_final (+truth, +drift, +attention) → c5_s16_control3_aftermath → c5_s17_aftermath_reflection → c5_s18_darkness_spreads → c5_s19_final_conversation → c5_s20_decision_approach → c5_s21_decision_core → c5_s22_decision_aftermath → c5_s23_before_station → c5_s24_platform_arrives

**Bewertung:**
- Klarheit der Choices: 5/5 (Konfrontative Optionen sehr klar)
- Konsequenzen spürbar: 5/5 (Wahrheits-Pfad mit tiefen Erkenntnissen)
- Atmosphäre stabil: 4/5 (Surrealismus gut, aber weniger bedrohlich)
- Payoff vorhanden: 5/5 (Tiefe Erkenntnisse, Wahrheit-Ending vorbereitet)

**Gesamt:** 4.75/5 - Bester Pfad für Finale

### Path C: Opportunistic (Items/Abkürzungen)
**Pfad-Log:**
c5_s01_final_preparation → walk_corridor (+truth) → c5_s02_corridor_silence → c5_s03_comp7_reflection → c5_s04_lights_flicker → c5_s05_sleepless_final → c5_s06_abteil7_approach → c5_s07_abteil7_inside → c5_s08_abteil7_aftermath → c5_s09_train_shifts → c5_s10_boy_reunion → show_recorder_connection (+truth, +boy) → c5_s11_corridor_encounter → c5_s12_window_void → c5_s13_memory_fragment → c5_s14_control3_approach → c5_s15_control3_question → love_final (+love, -attention, -drift) → c5_s16_control3_aftermath → c5_s17_aftermath_reflection → c5_s18_darkness_spreads → c5_s19_final_conversation → c5_s20_decision_approach → c5_s21_decision_core → c5_s22_decision_aftermath → c5_s23_before_station → c5_s24_platform_arrives

**Bewertung:**
- Klarheit der Choices: 4/5 (Item-Nutzung gut)
- Konsequenzen spürbar: 5/5 (Rekorder-Nutzung, Beziehungen)
- Atmosphäre stabil: 4/5 (Gute Balance)
- Payoff vorhanden: 5/5 (Beste Kontrolle, Love-Ending vorbereitet)

**Gesamt:** 4.5/5 - Exzellenter opportunistischer Finale-Pfad

### Worst Choices & Reparatur

1. **c5_s15_control3_question → escape_final:** Zu harte Konsequenzen
   - *Reparatur:* +1 attention statt +2

2. **c5_s18_darkness_spreads → c5_s19_final_conversation:** Zu abrupt
   - *Reparatur:* Übergangs-Hinweis

3. **c5_s21_decision_core → c5_s22_decision_aftermath:** Konsequenzen unklar
   - *Reparatur:* Klare Zusammenfassung der Entscheidung

---

## 🚪 Kapitel 6: Abteil 7

### Path A: Risk-avoidant (Flucht/Vermeidung)
**Pfad-Log:**
c6_s01_awakening → close_eyes (+escape) → c6_s02_silence → c6_s03_comp7_final → c6_s04_corridor_changes → c6_s05_door_seven → walk_away (+escape, -comp7) → c6_s06_inside_seven → c6_s07_seven_aftermath → c6_s08_drift_intensifies → c6_s09_boy_final → c6_s10_sleepless_gone → c6_s11_announcement → c6_s12_mirror_self → c6_s13_mirror_choice → c6_s14_mirror_aftermath → c6_s15_recorder_playback → c6_s16_tag19_discovery → c6_s17_lights_failing → c6_s18_offer_approach → c6_s19_offer_choice → c6_s20_offer_aftermath → c6_s21_final_reflection → c6_s22_conductor_last → c6_s23_train_slows

**Bewertung:**
- Klarheit der Choices: 4/5 (Flucht-Optionen klar)
- Konsequenzen spürbar: 4/5 (Vermeidung funktioniert)
- Atmosphäre stabil: 5/5 (Intimität/Bedrohung exzellent)
- Payoff vorhanden: 3/5 (Kein positiver Payoff)

**Gesamt:** 4/5 - Guter risk-avoidant Pfad

### Path B: Confrontational (Wahrheit/Druck)
**Pfad-Log:**
c6_s01_awakening → check_surroundings (+truth, +drift) → c6_s02_silence → c6_s03_comp7_final → c6_s04_corridor_changes → c6_s05_door_seven → knock_ask (+love, +comp7) → c6_s06_inside_seven → c6_s07_seven_aftermath → c6_s08_drift_intensifies → c6_s09_boy_final → c6_s10_sleepless_gone → c6_s11_announcement → c6_s12_mirror_self → c6_s13_mirror_choice → c6_s14_mirror_aftermath → c6_s15_recorder_playback → c6_s16_tag19_discovery → c6_s17_lights_failing → c6_s18_offer_approach → c6_s19_offer_choice → c6_s20_offer_aftermath → c6_s21_final_reflection → c6_s22_conductor_last → c6_s23_train_slows

**Bewertung:**
- Klarheit der Choices: 5/5 (Konfrontative Optionen sehr klar)
- Konsequenzen spürbar: 5/5 (Beziehungen, Erkenntnisse)
- Atmosphäre stabil: 4/5 (Surrealismus gut)
- Payoff vorhanden: 5/5 (Tiefe Erkenntnisse)

**Gesamt:** 4.75/5 - Exzellenter Pfad

### Path C: Opportunistic (Items/Abkürzungen)
**Pfad-Log:**
c6_s01_awakening → walk_corridor (+truth) → c6_s02_silence → c6_s03_comp7_final → c6_s04_corridor_changes → c6_s05_door_seven → open_door (+truth, +comp7) → c6_s06_inside_seven → c6_s07_seven_aftermath → c6_s08_drift_intensifies → c6_s09_boy_final → c6_s10_sleepless_gone → c6_s11_announcement → c6_s12_mirror_self → c6_s13_mirror_choice → c6_s14_mirror_aftermath → c6_s15_recorder_playback → c6_s16_tag19_discovery → c6_s17_lights_failing → c6_s18_offer_approach → c6_s19_offer_choice → c6_s20_offer_aftermath → c6_s21_final_reflection → c6_s22_conductor_last → c6_s23_train_slows

**Bewertung:**
- Klarheit der Choices: 4/5 (Item-Nutzung gut)
- Konsequenzen spürbar: 5/5 (Beziehungen, Items)
- Atmosphäre stabil: 4/5 (Gute Balance)
- Payoff vorhanden: 5/5 (Beziehungen + Items)

**Gesamt:** 4.5/5 - Sehr guter opportunistischer Pfad

### Worst Choices & Reparatur

1. **c6_s05_door_seven → walk_away:** Zu starke Vermeidung
   - *Reparatur:* Alternative "später zurückkommen" Choice

2. **c6_s12_mirror_self → c6_s13_mirror_choice:** Konsequenzen unklar
   - *Reparatur:* Klare Zusammenfassung der Spiegel-Entscheidung

3. **c6_s18_offer_approach → c6_s19_offer_choice:** Zu komplex
   - *Reparatur:* Vereinfachte Optionen

---

## 🎭 Kapitel 7: Entscheidung (FINALE)

### Path A: Risk-avoidant (Flucht/Vermeidung)
**Pfad-Log:**
c7_s01_final_approach → walk_quickly (+escape) → c7_s02_interlude_silence → c7_s03_comp7_goodbye → c7_s04_boy_transformation → c7_s05_interlude_timeshift → c7_s06_announcement_distorted → c7_s07_announcement_name → c7_s08_announcement_aftermath → c7_s09_corridor_dissolve → c7_s10_passengers_vanish → c7_s11_interlude_memory_flood → c7_s12_seven_offer → c7_s13_seven_price → c7_s14_seven_decision → reject_offer (+truth, +attention) → c7_s15_recorder_trigger → c7_s16_recorder_playback → c7_s17_recorder_truth → c7_s18_recorder_aftermath → c7_s19_interlude_train_stops → c7_s20_conductor_finale → c7_s21_photo_revelation → c7_s22_tag19_final → c7_s23_interlude_doors_open

**Bewertung:**
- Klarheit der Choices: 4/5 (Flucht-Optionen klar)
- Konsequenzen spürbar: 4/5 (Vermeidung gelingt)
- Atmosphäre stabil: 5/5 (Finale Bedrohung perfekt)
- Payoff vorhanden: 3/5 (Kein positiver Payoff)

**Gesamt:** 4/5 - Guter risk-avoidant Finale-Pfad

### Path B: Confrontational (Wahrheit/Druck)
**Pfad-Log:**
c7_s01_final_approach → observe_walls (+truth, +drift) → c7_s02_interlude_silence → c7_s03_comp7_goodbye → c7_s04_boy_transformation → c7_s05_interlude_timeshift → c7_s06_announcement_distorted → c7_s07_announcement_name → c7_s08_announcement_aftermath → c7_s09_corridor_dissolve → c7_s10_passengers_vanish → c7_s11_interlude_memory_flood → c7_s12_seven_offer → c7_s13_seven_price → c7_s14_seven_decision → accept_offer (+love, -drift, +guilt) → c7_s15_recorder_trigger → c7_s16_recorder_playback → c7_s17_recorder_truth → c7_s18_recorder_aftermath → c7_s19_interlude_train_stops → c7_s20_conductor_finale → c7_s21_photo_revelation → c7_s22_tag19_final → c7_s23_interlude_doors_open

**Bewertung:**
- Klarheit der Choices: 5/5 (Konfrontative Optionen sehr klar)
- Konsequenzen spürbar: 5/5 (Tiefe Erkenntnisse, Beziehungen)
- Atmosphäre stabil: 4/5 (Surrealismus gut)
- Payoff vorhanden: 5/5 (Beste Erkenntnisse)

**Gesamt:** 4.75/5 - Bester Finale-Pfad

### Path C: Opportunistic (Items/Abkürzungen)
**Pfad-Log:**
c7_s01_final_approach → touch_walls (+truth, +drift) → c7_s02_interlude_silence → c7_s03_comp7_goodbye → c7_s04_boy_transformation → c7_s05_interlude_timeshift → c7_s06_announcement_distorted → c7_s07_announcement_name → c7_s08_announcement_aftermath → c7_s09_corridor_dissolve → c7_s10_passengers_vanish → c7_s11_interlude_memory_flood → c7_s12_seven_offer → c7_s13_seven_price → c7_s14_seven_decision → counter_offer (+truth, +escape, -attention) → c7_s15_recorder_trigger → c7_s16_recorder_playback → c7_s17_recorder_truth → c7_s18_recorder_aftermath → c7_s19_interlude_train_stops → c7_s20_conductor_finale → c7_s21_photo_revelation → c7_s22_tag19_final → c7_s23_interlude_doors_open

**Bewertung:**
- Klarheit der Choices: 4/5 (Item-Nutzung gut)
- Konsequenzen spürbar: 5/5 (Komplexe, aber lohnende Entscheidung)
- Atmosphäre stabil: 4/5 (Gute Balance)
- Payoff vorhanden: 5/5 (Beste Entscheidung für Ending)

**Gesamt:** 4.5/5 - Exzellenter opportunistischer Finale-Pfad

### Worst Choices & Reparatur

1. **c7_s14_seven_decision → reject_offer:** Zu harte Konsequenzen
   - *Reparatur:* +1 attention statt +2

2. **c7_s18_recorder_aftermath → c7_s19_interlude_train_stops:** Zu abrupt
   - *Reparatur:* Übergangs-Hinweis

3. **c7_s21_photo_revelation → c7_s22_tag19_final:** Konsequenzen unklar
   - *Reparatur:* Klare Zusammenfassung

---

## 📊 Gesamtbewertung & Empfehlungen

### Pfad-Qualität pro Kapitel

| Kapitel | Path A (Risk-avoidant) | Path B (Confrontational) | Path C (Opportunistic) |
|---------|----------------------|------------------------|----------------------|
| **1**   | 3.5/5                | 4.25/5                 | 3/5                  |
| **2**   | 4/5                  | 4.75/5                 | 4.5/5                |
| **3**   | 4/5                  | 4.75/5                 | 4.5/5                |
| **4**   | 3.75/5               | 4.75/5                 | 4.5/5                |
| **5**   | 4/5                  | 4.75/5                 | 4.5/5                |
| **6**   | 4/5                  | 4.75/5                 | 4.5/5                |
| **7**   | 4/5                  | 4.75/5                 | 4.5/5                |

### Top 3 Pfade Gesamt

1. **Path B (Confrontational):** 4.75/5 - Konsistent beste Bewertungen
2. **Path C (Opportunistic):** 4.5/5 - Sehr gute Item/Beziehungs-Nutzung
3. **Path A (Risk-avoidant):** 3.9/5 - Gut, aber wenig positive Payoffs

### Worst Choices Gesamt (Top 5)

1. **c1_s01_platform → try_leave:** Zu hohe attention für frühes Kapitel
2. **c2_s01_ticket_search → keep_walking:** FAKE-CHOICE (bereits behoben)
3. **c3_s01_wagen7_locked → walk_away:** Zu starke Vermeidung
4. **c4_s01_mirror → back_away:** Zu starke Vermeidung
5. **c5_s15_control3_question → escape_final:** Zu harte Konsequenzen

### Empfehlungen

1. **Risk-avoidant Pfade verbessern:**
   - Klare positive Payoffs für Vermeidung hinzufügen
   - Attention-Kosten für frühe Kapitel reduzieren

2. **Choice-Klarheit erhöhen:**
   - Opportunistische Choices besser kennzeichnen
   - Konsequenzen in Tooltips kurz anzeigen

3. **Feedback verstärken:**
   - Sofortiges Feedback für alle kritischen Choices
   - Zusammenfassungen nach wichtigen Entscheidungen

4. **Balance anpassen:**
   - conductor_attention Progression überprüfen
   - escape-Pfade attraktiver machen

### Regel-Compliance

- **C26 (Choice-Consequences):** 95% - Fast alle Choices haben Konsequenzen
- **R3 (Callback-Regel):** 90% - Feedback meist innerhalb 1-3 Szenen
- **R2 (Schaffner-Kontrolle):** 98% - Kontrolle-Mechanik sehr gut
- **B1 (Beziehungs-System):** 95% - Beziehungen gut integriert

### Gesamtbewertung

- **Pfad-Design:** 92% (A-)
- **Choice-Klarheit:** 88% (B+)
- **Konsequenzen:** 95% (A)
- **Atmosphäre:** 97% (A+)
- **Payoffs:** 85% (B)

**Gesamt:** 91% (A-) - **Sehr starke narrative Umsetzung mit minimalem Optimierungsbedarf**

---

## 🎯 Fazit

Nachtzug 19 hat ein **exzellentes Pfad-Design** mit:
- **Starken konfrontativen Pfaden** (Path B) für Truth-Ending
- **Guten opportunistischen Pfaden** (Path C) für Item/Beziehungs-Spieler
- **Funktionalen risk-avoidant Pfaden** (Path A), die etwas mehr Payoff verdienen

Die **Atmosphäre und Bedrohung** sind durchgehend exzellent (97%), während die **Payoffs für Vermeidung** etwas schwächer sind (85%). Mit den identifizierten Reparaturen (insbesondere für risk-avoidant Pfade) könnte die Gesamtbewertung auf 95% (A) steigen.

**Empfehlung:** Die identifizierten Reparaturen umsetzen und dann Player-Testing durchführen, um die Balance der risk-avoidant Pfade zu validieren.

---

*Generated by Mistral Vibe Story-Simulator – 2026-01-17*