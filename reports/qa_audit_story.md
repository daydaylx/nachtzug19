# QA Audit Story

## Executive Summary
- scripts/audit_chapters.mjs (run via npx tsx) meldet fuer c1-c5 deutlich zu niedrige Wordcounts (c1=2772, c2=2375, c4=2427, c5=2253) und kurze Runtime unter 30 Min; c3 liegt bei 4871 Woertern (scripts/audit_chapters.mjs Output).
- Keine offenen MUST-FIXs: Graph/Schema/Tags sind konsistent, Inline-Condition im Narrativ entfernt, station_end Drift/Station-Count wird regelkonform behandelt.
- SHOULD-FIX: FAKE-Choices mit identischen Effekten/next (c4_s01a_double_reflection, c4_s02_recorder_prophecy, c5_s01_final_preparation).
- SHOULD-FIX: photo_anomaly hat keinen Payoff (c3_s03c_notebooks_explore/examine_photo) und wird in keinem Condition-Target wiederverwendet.
- Entscheidungsklarheit faellt oft auf WACKELT, weil viele Szenen nur gleiche next + Ticket/Attention/Drift-Effekte haben (z.B. c1_s01_platform, c2_interlude_03_announcement_glitch, c3_s01_wagen7_locked).
- Tonalitaet bleibt durchgehend noir/bedrohlich mit konsistenten Motiven (Bahnsteig, Recorder, Comp7, Tag19) in c1_s01_platform, c2_s02_boy_recorder, c3_s03b_inside_comp7, c4_s07c_tag19_found, c5_s21_decision_core, c7_s20_conductor_finale.

## Kapitelweise Findings

### Kapitel 1 (src/content/nachtzug19/scenes/c1.ts)
- FAKE-CHOICES: keine gefunden (c1.ts).
- MUDDY: Choice-Label "Weiter" ohne Stakes in c1_interlude_01_lights/continue, c1_interlude_02_silence/continue, c1_interlude_03_window/continue, c1_interlude_04_clock/continue, c1_interlude_05_vibration/continue.
- NO-FEEDBACK (kurzfristig): tickets_escape aus c1_s01_platform/check_phone und c1_s01a_platform_details/step_back hat ersten Condition-Callback erst in c4_s05a_wagen7_changed/ask_about_escape.
- DRIFT/CONTROL WOBBLE: viele memory_drift-Incs vor klaren Variant-Callbacks (narrative_variants z.B. c1_s01_platform, c1_s02_train_appears).
- Ton/Kontinuitaet/Druckkurve: Noir-Setup stabil (c1_s01_platform), Anomalien eskalieren in c1_s05_first_anomaly, Drift-Peak am Station-Ende (c1_end_station).

### Kapitel 2 (src/content/nachtzug19/scenes/c2.ts)
- FAKE-CHOICES: keine gefunden (c2.ts).
- MUDDY: c2_interlude_03_announcement_glitch/continue und c2_end_station/continue_to_chapter_3 mit unklarem Stakes-Text.
- NO-FEEDBACK: tickets_escape aus c2_s01_ticket_search/search_self wirkt erst spaet (c4_s05a_wagen7_changed/ask_about_escape).
- DRIFT/CONTROL WOBBLE: Control 1 sitzt mechanisch (c2_control_01_approach, c2_control_01_question), aber viele gleich-next Interludes glatten die Stakes.
- Ton/Kontinuitaet/Druckkurve: Kontrolle baut Druck sauber auf (c2_s04_announcement -> c2_control_01_question), Recorder-Motiv traegt durch (c2_s02_boy_recorder, c2_control_01_question/use_recorder).

### Kapitel 3 (src/content/nachtzug19/scenes/c3.ts)
- FAKE-CHOICES: keine gefunden (c3.ts).
- MUDDY: Interludes mit Single-Choice (c3_interlude_01_lights, c3_interlude_02_announcement, c3_interlude_03_window, c3_interlude_04_corridor) reduzieren Wahlklarheit.
- NO-PAYOFF: photo_anomaly aus c3_s03c_notebooks_explore/examine_photo wird spaeter nie abgefragt.
- DRIFT/CONTROL WOBBLE: memory_drift steigert sich (z.B. c3_s04a_paradox_window/accept_paradox), aber sichtbare Varianten nur in wenigen Szenen (c3_s03b_inside_comp7, c3_interlude_03_window).
- Ton/Kontinuitaet/Druckkurve: Abteil-7-Arc dicht (c3_s03b_inside_comp7), Kontrolle 2 als Druck-Spitze (c3_control_02_question), Abklingen am Station-Ende (c3_end_station).

### Kapitel 4 (src/content/nachtzug19/scenes/c4.ts)
- FAKE-CHOICES: c4_s01a_double_reflection (try_to_understand vs ask_when), c4_s02_recorder_prophecy (turn_off_recorder vs no_recorder).
- MUDDY: c4_s01b_wrong_memory, c4_s02b_recorder_loop, c4_s04b_ticket_appears haben gleiche next + Ticket-Effekte ohne unmittelbare Stakes.
- NO-FEEDBACK (kurzfristig): tickets_escape/tickets_guilt aus c4_s04b_ticket_appears wirken erst spaet (c6_s13_mirror_choice, c7_end_station).
- DRIFT/CONTROL WOBBLE: Kapitel ohne Control, Drift-Intensitaet hoch (c4_s07a_drift_peak) -> Druckkurve wirkt eher plateau als steigend.
- Ton/Kontinuitaet/Druckkurve: Spiegel/Recorder/Tag19 bleiben konsistent (c4_s01_mirror, c4_s02_recorder_prophecy, c4_s07c_tag19_found).

### Kapitel 5 (src/content/nachtzug19/scenes/c5.ts)
- FAKE-CHOICES: c5_s01_final_preparation (check_recorder vs walk_corridor).
- MUDDY: c5_s02_corridor_silence und c5_s08_abteil7_aftermath mit gleicher next + Ticket-Effekt.
- NO-FEEDBACK: viele Ticket-Splits ohne kurzfristigen Callback (z.B. c5_s11_corridor_encounter, c5_s12_window_void).
- Ton/Kontinuitaet/Druckkurve: Druck steigt bis Control 3 (c5_s14_control3_approach -> c5_s15_control3_question) und kulminiert in c5_s21_decision_core.

### Kapitel 6 (src/content/nachtzug19/scenes/c6.ts)
- FAKE-CHOICES: keine gefunden (c6.ts).
- MUDDY: mehrere Szenen mit gleicher next und reinen Ticket-Varianten (c6_s01_awakening, c6_s06_inside_seven, c6_s10_sleepless_gone).
- DRIFT/CONTROL WOBBLE: Drift-Rueckmeldung nur punktuell (c6_s02_silence, c6_s11_announcement narrative_variants).
- Ton/Kontinuitaet/Druckkurve: Offenbarungs-Ton stimmig (c6_s19_offer_choice, c6_s22_conductor_last), Druckkurve eher flach ohne Control.

### Kapitel 7 (src/content/nachtzug19/scenes/c7.ts)
- FAKE-CHOICES: keine gefunden (c7.ts).
- MUDDY: interlude-Choices mit gleichbleibendem next (c7_s02_interlude_silence, c7_s05_interlude_timeshift, c7_s11_interlude_memory_flood, c7_s19_interlude_train_stops, c7_s23_interlude_doors_open).
- DRIFT/CONTROL WOBBLE: Endphase stark, aber einige Choices sind nur Ticket-Varianten ohne unmittelbaren Feedback (c7_s06_announcement_distorted, c7_s07_announcement_name).
- Ton/Kontinuitaet/Druckkurve: Finale Motive konsistent (Recorder: c7_s15_recorder_trigger, Tag19: c7_s22_tag19_final, Ending-Gates: c7_end_station).

## Pfad-Logs (kompakt)

## Kapitel 1

### Pfad (risk_averse)
Path-Log: c1_s01_platform:check_phone -> c1_s01a_platform_details:step_back -> c1_interlude_01_lights:close_eyes -> c1_s02_train_appears:board_immediately -> c1_s02a_train_exterior:board_now -> c1_interlude_02_silence:continue -> c1_s03_inside_train:find_seat -> c1_s03a_corridor_walk:keep_walking_past -> c1_s03b_find_seat:ignore_voice -> c1_s04_sleepless_intro:deny -> c1_s04a_sleepless_past:admit_searching -> c1_interlude_03_window:touch_glass -> c1_s04b_sleepless_warning:dismiss -> c1_s05_first_anomaly:ignore_anomaly -> c1_s05a_other_passengers:leave_them_alone -> c1_s05b_compartment7_tease:listen_to_sleepless -> c1_s05c_announcement_repeat:stay_back -> c1_s06_corridor_end:stay_in_wagon -> c1_interlude_05_vibration:steady_breath -> c1_end_platform_look:ask_sleepless -> c1_end_station:continue_to_chapter_2

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c1_s01_platform/check_phone; +1 @ c1_s01a_platform_details/step_back; +1 @ c1_interlude_01_lights/close_eyes; +1 @ c1_s02_train_appears/board_immediately; +1 @ c1_s02a_train_exterior/board_now; +1 @ c1_s03_inside_train/find_seat; +1 @ c1_s03a_corridor_walk/keep_walking_past; +1 @ c1_s03b_find_seat/ignore_voice; +1 @ c1_s04_sleepless_intro/deny; +1 @ c1_s04b_sleepless_warning/dismiss; +1 @ c1_s05_first_anomaly/ignore_anomaly; +1 @ c1_s05a_other_passengers/leave_them_alone; +1 @ c1_s05b_compartment7_tease/listen_to_sleepless; +1 @ c1_s05c_announcement_repeat/stay_back; +1 @ c1_s06_corridor_end/stay_in_wagon; +1 @ c1_interlude_05_vibration/steady_breath
- conductor_attention: -1 @ c1_interlude_01_lights/close_eyes; -1 @ c1_interlude_05_vibration/steady_breath; -1 @ c1_end_platform_look/ask_sleepless
- memory_drift: +1 @ c1_interlude_02_silence/continue; +1 @ c1_interlude_03_window/touch_glass; +1 @ c1_end_station/continue_to_chapter_2
- rel_sleepless: -1 @ c1_s04_sleepless_intro/deny; +2 @ c1_s04a_sleepless_past/admit_searching; +1 @ c1_s05b_compartment7_tease/listen_to_sleepless; +1 @ c1_end_platform_look/ask_sleepless
- tickets_love: +1 @ c1_s04a_sleepless_past/admit_searching; +1 @ c1_end_platform_look/ask_sleepless
- tickets_truth: +1 @ c1_interlude_03_window/touch_glass
- chapter_index: +1 @ c1_end_station/continue_to_chapter_2
- station_count: +1 @ c1_end_station/continue_to_chapter_2
Konsequenzen: innerhalb 1-3 Szenen: conductor_attention -> c1_s02_train_appears, c1_end_station; memory_drift -> c1_s05_first_anomaly, c2_s02_boy_recorder
Konsequenzen: spaeter: tickets_escape -> c4_s05a_wagen7_changed; memory_drift -> c1_interlude_03_window; rel_sleepless -> c1_end_platform_look, c2_control_01_approach; tickets_love -> c5_s19_final_conversation; tickets_truth -> c1_s05b_compartment7_tease
Konsequenzen: keine: chapter_index; station_count

### Pfad (confrontational)
Path-Log: c1_s01_platform:try_leave -> c1_s01a_platform_details:look_tracks -> c1_interlude_01_lights:continue -> c1_s02_train_appears:call_out -> c1_s02a_train_exterior:ask_aloud -> c1_interlude_02_silence:continue -> c1_s03_inside_train:examine_suitcase -> c1_s03a_corridor_walk:look_at_drawing -> c1_s03b_find_seat:turn_around -> c1_s04_sleepless_intro:ask_where -> c1_s04a_sleepless_past:ask_about_watch -> c1_interlude_03_window:touch_glass -> c1_s04b_sleepless_warning:ask_more -> c1_s05_first_anomaly:write_it_down -> c1_interlude_04_clock:note_time -> c1_s05a_other_passengers:approach_woman -> c1_s05b_compartment7_tease:knock_on_door -> c1_s05c_announcement_repeat:follow_woman -> c1_s05d_comp7_listen:knock_again -> c1_s06_corridor_end:enter_next_wagon -> c1_s07_stranger_encounter:search_wagon -> c1_interlude_05_vibration:reflect_on_vibration -> c1_end_platform_look:ask_woman -> c1_end_station:nod_to_conductor

State-Verlauf (Keys mit Aenderungen):
- tickets_guilt: +1 @ c1_s01_platform/try_leave; +1 @ c1_end_station/nod_to_conductor
- conductor_attention: +1 @ c1_s01_platform/try_leave; +1 @ c1_s02_train_appears/call_out; +1 @ c1_s02a_train_exterior/ask_aloud; +1 @ c1_s04b_sleepless_warning/ask_more; +1 @ c1_s05_first_anomaly/write_it_down; +1 @ c1_s05a_other_passengers/approach_woman; +2 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again; +1 @ c1_s07_stranger_encounter/search_wagon; +1 @ c1_end_platform_look/ask_woman; +1 @ c1_end_station/nod_to_conductor
- tickets_truth: +1 @ c1_s01a_platform_details/look_tracks; +1 @ c1_s02_train_appears/call_out; +1 @ c1_s03_inside_train/examine_suitcase; +1 @ c1_s03a_corridor_walk/look_at_drawing; +1 @ c1_s03b_find_seat/turn_around; +1 @ c1_s04_sleepless_intro/ask_where; +1 @ c1_s04a_sleepless_past/ask_about_watch; +1 @ c1_interlude_03_window/touch_glass; +1 @ c1_s04b_sleepless_warning/ask_more; +1 @ c1_s05_first_anomaly/write_it_down; +1 @ c1_interlude_04_clock/note_time; +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05c_announcement_repeat/follow_woman; +1 @ c1_s06_corridor_end/enter_next_wagon; +1 @ c1_s07_stranger_encounter/search_wagon; +1 @ c1_interlude_05_vibration/reflect_on_vibration
- memory_drift: +1 @ c1_interlude_01_lights/continue; +1 @ c1_interlude_02_silence/continue; +1 @ c1_s03a_corridor_walk/look_at_drawing; +1 @ c1_interlude_03_window/touch_glass; +1 @ c1_interlude_04_clock/note_time; +1 @ c1_s06_corridor_end/enter_next_wagon; +1 @ c1_interlude_05_vibration/reflect_on_vibration
- tickets_love: +1 @ c1_s02a_train_exterior/ask_aloud; +1 @ c1_s05a_other_passengers/approach_woman; +1 @ c1_s05d_comp7_listen/knock_again; +1 @ c1_end_platform_look/ask_woman
- rel_sleepless: +1 @ c1_s04_sleepless_intro/ask_where; +1 @ c1_s04a_sleepless_past/ask_about_watch
- rel_comp7: +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again
- chapter_index: +1 @ c1_end_station/nod_to_conductor
- station_count: +1 @ c1_end_station/nod_to_conductor
Konsequenzen: innerhalb 1-3 Szenen: conductor_attention -> c1_s02_train_appears, c1_interlude_02_silence, c1_s05a_other_passengers, c1_end_station; tickets_truth -> c1_s02_train_appears, c1_interlude_04_clock, c1_s05b_compartment7_tease, c1_s07_stranger_encounter, c1_interlude_05_vibration, c1_end_station; memory_drift -> c1_s02_train_appears, c1_s05_first_anomaly, c1_s05c_announcement_repeat, c1_s07_stranger_encounter, c1_end_platform_look; rel_comp7 -> c1_s05d_comp7_listen
Konsequenzen: spaeter: tickets_guilt -> c5_s21_decision_core; tickets_truth -> c1_interlude_04_clock, c1_s07_stranger_encounter; tickets_love -> c5_s19_final_conversation; memory_drift -> c1_interlude_03_window; rel_sleepless -> c1_end_platform_look; conductor_attention -> c1_end_station, c4_s04_announcement_glitch; rel_comp7 -> c2_s03b_comp7_warning
Konsequenzen: keine: chapter_index; station_count

### Pfad (opportunistic)
Path-Log: c1_s01_platform:look_around -> c1_s01a_platform_details:step_back -> c1_interlude_01_lights:close_eyes -> c1_s02_train_appears:board_immediately -> c1_s02a_train_exterior:board_now -> c1_interlude_02_silence:continue -> c1_s03_inside_train:talk_to_man -> c1_s04_sleepless_intro:ask_where -> c1_s04a_sleepless_past:admit_searching -> c1_interlude_03_window:touch_glass -> c1_s04b_sleepless_warning:thank_him -> c1_s05_first_anomaly:write_it_down -> c1_interlude_04_clock:note_time -> c1_s05a_other_passengers:count_passengers -> c1_s05b_compartment7_tease:knock_on_door -> c1_s05c_announcement_repeat:follow_woman -> c1_s05d_comp7_listen:knock_again -> c1_s06_corridor_end:enter_next_wagon -> c1_s07_stranger_encounter:search_wagon -> c1_interlude_05_vibration:steady_breath -> c1_end_platform_look:ask_woman -> c1_end_station:confront_jacket_change

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c1_s01_platform/look_around; +1 @ c1_s04_sleepless_intro/ask_where; +1 @ c1_interlude_03_window/touch_glass; +1 @ c1_s05_first_anomaly/write_it_down; +1 @ c1_interlude_04_clock/note_time; +1 @ c1_s05a_other_passengers/count_passengers; +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05c_announcement_repeat/follow_woman; +1 @ c1_s06_corridor_end/enter_next_wagon; +1 @ c1_s07_stranger_encounter/search_wagon; +1 @ c1_end_station/confront_jacket_change
- tickets_escape: +1 @ c1_s01a_platform_details/step_back; +1 @ c1_interlude_01_lights/close_eyes; +1 @ c1_s02_train_appears/board_immediately; +1 @ c1_s02a_train_exterior/board_now; +1 @ c1_interlude_05_vibration/steady_breath
- conductor_attention: -1 @ c1_interlude_01_lights/close_eyes; +1 @ c1_s05_first_anomaly/write_it_down; +2 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again; +1 @ c1_s07_stranger_encounter/search_wagon; -1 @ c1_interlude_05_vibration/steady_breath; +1 @ c1_end_platform_look/ask_woman
- memory_drift: +1 @ c1_interlude_02_silence/continue; +1 @ c1_interlude_03_window/touch_glass; +1 @ c1_interlude_04_clock/note_time; +1 @ c1_s06_corridor_end/enter_next_wagon; +2 @ c1_end_station/confront_jacket_change
- tickets_love: +1 @ c1_s03_inside_train/talk_to_man; +1 @ c1_s04a_sleepless_past/admit_searching; +1 @ c1_s04b_sleepless_warning/thank_him; +1 @ c1_s05d_comp7_listen/knock_again; +1 @ c1_end_platform_look/ask_woman
- rel_sleepless: +1 @ c1_s03_inside_train/talk_to_man; +1 @ c1_s04_sleepless_intro/ask_where; +2 @ c1_s04a_sleepless_past/admit_searching; +1 @ c1_s04b_sleepless_warning/thank_him; +1 @ c1_end_station/confront_jacket_change
- rel_comp7: +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again
- chapter_index: +1 @ c1_end_station/confront_jacket_change
- station_count: +1 @ c1_end_station/confront_jacket_change
Konsequenzen: innerhalb 1-3 Szenen: tickets_truth -> c1_s02_train_appears, c1_interlude_04_clock, c1_s05b_compartment7_tease, c1_s07_stranger_encounter, c1_interlude_05_vibration; conductor_attention -> c1_s02_train_appears, c1_s05a_other_passengers, c1_end_station; memory_drift -> c1_s05_first_anomaly, c1_s05c_announcement_repeat, c1_s07_stranger_encounter, c2_s02_boy_recorder; rel_comp7 -> c1_s05d_comp7_listen
Konsequenzen: spaeter: tickets_escape -> c4_s05a_wagen7_changed; memory_drift -> c1_interlude_03_window; tickets_love -> c5_s19_final_conversation; rel_sleepless -> c1_end_platform_look, c2_control_01_approach; tickets_truth -> c1_interlude_04_clock, c1_s07_stranger_encounter, c2_s03b_comp7_warning; conductor_attention -> c1_end_station; rel_comp7 -> c2_s03b_comp7_warning
Konsequenzen: keine: chapter_index; station_count

### Pfad (dumb)
Path-Log: c1_s01_platform:try_leave -> c1_s01a_platform_details:feel_guilty -> c1_interlude_01_lights:continue -> c1_s02_train_appears:hesitate -> c1_s02a_train_exterior:ask_aloud -> c1_interlude_02_silence:continue -> c1_s03_inside_train:find_seat -> c1_s03a_corridor_walk:keep_walking_past -> c1_s03b_find_seat:ignore_voice -> c1_s04_sleepless_intro:deny -> c1_s04a_sleepless_past:admit_running -> c1_interlude_03_window:continue -> c1_s04b_sleepless_warning:ask_more -> c1_s05_first_anomaly:ignore_anomaly -> c1_s05a_other_passengers:approach_woman -> c1_s05b_compartment7_tease:knock_on_door -> c1_s05c_announcement_repeat:repeat_word -> c1_s05d_comp7_listen:knock_again -> c1_s06_corridor_end:enter_next_wagon -> c1_s07_stranger_encounter:search_wagon -> c1_interlude_05_vibration:continue -> c1_end_platform_look:observe_silently -> c1_end_station:continue_to_chapter_2

State-Verlauf (Keys mit Aenderungen):
- tickets_guilt: +1 @ c1_s01_platform/try_leave; +1 @ c1_s01a_platform_details/feel_guilty; +1 @ c1_s02_train_appears/hesitate; +1 @ c1_s04a_sleepless_past/admit_running
- conductor_attention: +1 @ c1_s01_platform/try_leave; +1 @ c1_s02a_train_exterior/ask_aloud; +1 @ c1_s04b_sleepless_warning/ask_more; +1 @ c1_s05a_other_passengers/approach_woman; +2 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again; +1 @ c1_s07_stranger_encounter/search_wagon
- memory_drift: +1 @ c1_interlude_01_lights/continue; +1 @ c1_s02_train_appears/hesitate; +1 @ c1_interlude_02_silence/continue; +1 @ c1_interlude_03_window/continue; +1 @ c1_s05c_announcement_repeat/repeat_word; +1 @ c1_s06_corridor_end/enter_next_wagon; +1 @ c1_interlude_05_vibration/continue; +1 @ c1_end_station/continue_to_chapter_2
- tickets_love: +1 @ c1_s02a_train_exterior/ask_aloud; +1 @ c1_s05a_other_passengers/approach_woman; +1 @ c1_s05d_comp7_listen/knock_again
- tickets_escape: +1 @ c1_s03_inside_train/find_seat; +1 @ c1_s03a_corridor_walk/keep_walking_past; +1 @ c1_s03b_find_seat/ignore_voice; +1 @ c1_s04_sleepless_intro/deny; +1 @ c1_s05_first_anomaly/ignore_anomaly
- rel_sleepless: -1 @ c1_s04_sleepless_intro/deny; +1 @ c1_s04a_sleepless_past/admit_running
- tickets_truth: +1 @ c1_s04b_sleepless_warning/ask_more; +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05c_announcement_repeat/repeat_word; +1 @ c1_s06_corridor_end/enter_next_wagon; +1 @ c1_s07_stranger_encounter/search_wagon; +1 @ c1_end_platform_look/observe_silently
- rel_comp7: +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again
- chapter_index: +1 @ c1_end_station/continue_to_chapter_2
- station_count: +1 @ c1_end_station/continue_to_chapter_2
Konsequenzen: innerhalb 1-3 Szenen: conductor_attention -> c1_s02_train_appears, c1_interlude_02_silence, c1_s05a_other_passengers, c1_end_station; memory_drift -> c1_s02_train_appears, c1_s05_first_anomaly, c1_s07_stranger_encounter, c1_end_platform_look, c2_interlude_01_toilet; tickets_truth -> c1_s05b_compartment7_tease, c1_s07_stranger_encounter, c1_interlude_05_vibration, c1_end_station; rel_comp7 -> c1_s05d_comp7_listen
Konsequenzen: spaeter: tickets_guilt -> c5_s21_decision_core; memory_drift -> c1_interlude_03_window; tickets_love -> c5_s19_final_conversation; tickets_escape -> c6_s13_mirror_choice; rel_sleepless -> c1_end_platform_look; conductor_attention -> c1_end_station; tickets_truth -> c1_s07_stranger_encounter; rel_comp7 -> c2_end_platform_watch
Konsequenzen: keine: chapter_index; station_count

### Pfad (max_risk)
Path-Log: c1_s01_platform:try_leave -> c1_s01a_platform_details:step_back -> c1_interlude_01_lights:continue -> c1_s02_train_appears:call_out -> c1_s02a_train_exterior:ask_aloud -> c1_interlude_02_silence:continue -> c1_s03_inside_train:examine_suitcase -> c1_s03a_corridor_walk:look_at_drawing -> c1_s03b_find_seat:turn_around -> c1_s04_sleepless_intro:deny -> c1_s04a_sleepless_past:admit_running -> c1_interlude_03_window:touch_glass -> c1_s04b_sleepless_warning:ask_more -> c1_s05_first_anomaly:write_it_down -> c1_interlude_04_clock:note_time -> c1_s05a_other_passengers:approach_woman -> c1_s05b_compartment7_tease:knock_on_door -> c1_s05c_announcement_repeat:repeat_word -> c1_s05d_comp7_listen:knock_again -> c1_s06_corridor_end:enter_next_wagon -> c1_s07_stranger_encounter:search_wagon -> c1_interlude_05_vibration:reflect_on_vibration -> c1_end_platform_look:ask_woman -> c1_end_station:confront_jacket_change

State-Verlauf (Keys mit Aenderungen):
- tickets_guilt: +1 @ c1_s01_platform/try_leave; +1 @ c1_s04a_sleepless_past/admit_running
- conductor_attention: +1 @ c1_s01_platform/try_leave; +1 @ c1_s02_train_appears/call_out; +1 @ c1_s02a_train_exterior/ask_aloud; +1 @ c1_s04b_sleepless_warning/ask_more; +1 @ c1_s05_first_anomaly/write_it_down; +1 @ c1_s05a_other_passengers/approach_woman; +2 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again; +1 @ c1_s07_stranger_encounter/search_wagon; +1 @ c1_end_platform_look/ask_woman
- tickets_escape: +1 @ c1_s01a_platform_details/step_back; +1 @ c1_s04_sleepless_intro/deny
- memory_drift: +1 @ c1_interlude_01_lights/continue; +1 @ c1_interlude_02_silence/continue; +1 @ c1_s03a_corridor_walk/look_at_drawing; +1 @ c1_interlude_03_window/touch_glass; +1 @ c1_interlude_04_clock/note_time; +1 @ c1_s05c_announcement_repeat/repeat_word; +1 @ c1_s06_corridor_end/enter_next_wagon; +1 @ c1_interlude_05_vibration/reflect_on_vibration; +2 @ c1_end_station/confront_jacket_change
- tickets_truth: +1 @ c1_s02_train_appears/call_out; +1 @ c1_s03_inside_train/examine_suitcase; +1 @ c1_s03a_corridor_walk/look_at_drawing; +1 @ c1_s03b_find_seat/turn_around; +1 @ c1_interlude_03_window/touch_glass; +1 @ c1_s04b_sleepless_warning/ask_more; +1 @ c1_s05_first_anomaly/write_it_down; +1 @ c1_interlude_04_clock/note_time; +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05c_announcement_repeat/repeat_word; +1 @ c1_s06_corridor_end/enter_next_wagon; +1 @ c1_s07_stranger_encounter/search_wagon; +1 @ c1_interlude_05_vibration/reflect_on_vibration; +1 @ c1_end_station/confront_jacket_change
- tickets_love: +1 @ c1_s02a_train_exterior/ask_aloud; +1 @ c1_s05a_other_passengers/approach_woman; +1 @ c1_s05d_comp7_listen/knock_again; +1 @ c1_end_platform_look/ask_woman
- rel_sleepless: -1 @ c1_s04_sleepless_intro/deny; +1 @ c1_s04a_sleepless_past/admit_running; +1 @ c1_end_station/confront_jacket_change
- rel_comp7: +1 @ c1_s05b_compartment7_tease/knock_on_door; +1 @ c1_s05d_comp7_listen/knock_again
- chapter_index: +1 @ c1_end_station/confront_jacket_change
- station_count: +1 @ c1_end_station/confront_jacket_change
Konsequenzen: innerhalb 1-3 Szenen: conductor_attention -> c1_s02_train_appears, c1_interlude_02_silence, c1_s05a_other_passengers, c1_end_station; memory_drift -> c1_s02_train_appears, c1_s05_first_anomaly, c1_s05c_announcement_repeat, c1_s07_stranger_encounter, c1_end_platform_look, c2_interlude_01_toilet; tickets_truth -> c1_interlude_04_clock, c1_s05b_compartment7_tease, c1_s07_stranger_encounter, c1_interlude_05_vibration, c1_end_station; rel_comp7 -> c1_s05d_comp7_listen
Konsequenzen: spaeter: tickets_guilt -> c5_s21_decision_core; tickets_escape -> c6_s13_mirror_choice; tickets_truth -> c1_interlude_04_clock, c1_s07_stranger_encounter, c2_s03b_comp7_warning; tickets_love -> c5_s19_final_conversation; memory_drift -> c1_interlude_03_window; rel_sleepless -> c1_end_platform_look, c2_control_01_approach; conductor_attention -> c1_end_station; rel_comp7 -> c2_s03b_comp7_warning
Konsequenzen: keine: chapter_index; station_count

## Kapitel 2

### Pfad (risk_averse)
Path-Log: c2_s01_ticket_search:search_self -> c2_s01b_ticket_pocket:throw_away -> c2_s02_boy_recorder:ask_why -> c2_s02a_recorder_listening:put_away -> c2_s02c_boy_vanish:insist_boy_real -> c2_interlude_02_window_dark:keep_staring -> c2_s03_comp7_intro:ask_notebook -> c2_s03a_comp7_notebook:ask_purpose -> c2_s03b_comp7_warning:leave_quickly -> c2_s04_announcement:prepare_truth -> c2_s04a_conductor_approach:ask_comp7_help -> c2_interlude_04_lights:continue -> c2_control_01_approach:look_to_sleepless -> c2_control_01_question:use_recorder -> c2_control_01_aftermath:stay_silent -> c2_s05b_reality_shift:ignore_vision -> c2_interlude_05_vibration:steady_breath -> c2_end_platform_watch:keep_silent -> c2_end_station:play_recorder

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c2_s01_ticket_search/search_self; +1 @ c2_s01b_ticket_pocket/throw_away; +1 @ c2_s02a_recorder_listening/put_away; +1 @ c2_s03b_comp7_warning/leave_quickly; +1 @ c2_control_01_aftermath/stay_silent; +1 @ c2_s05b_reality_shift/ignore_vision; +1 @ c2_interlude_05_vibration/steady_breath; +1 @ c2_end_platform_watch/keep_silent
- tickets_love: +1 @ c2_s02_boy_recorder/ask_why; +1 @ c2_s03a_comp7_notebook/ask_purpose; +1 @ c2_s04a_conductor_approach/ask_comp7_help; +1 @ c2_control_01_approach/look_to_sleepless
- rel_boy: +2 @ c2_s02_boy_recorder/ask_why
- has_recorder: +1 @ c2_s02_boy_recorder/ask_why
- tickets_truth: +1 @ c2_s02c_boy_vanish/insist_boy_real; +1 @ c2_interlude_02_window_dark/keep_staring; +1 @ c2_s03_comp7_intro/ask_notebook; +1 @ c2_s04_announcement/prepare_truth; +1 @ c2_control_01_question/use_recorder
- conductor_attention: +1 @ c2_s02c_boy_vanish/insist_boy_real; -1 @ c2_control_01_approach/look_to_sleepless; -2 @ c2_control_01_question/use_recorder; -1 @ c2_interlude_05_vibration/steady_breath
- memory_drift: +1 @ c2_interlude_02_window_dark/keep_staring; +1 @ c2_interlude_04_lights/continue; +1 @ c2_end_station/play_recorder
- rel_comp7: +1 @ c2_s03_comp7_intro/ask_notebook; +2 @ c2_s03a_comp7_notebook/ask_purpose; +1 @ c2_s04a_conductor_approach/ask_comp7_help; +1 @ c2_end_station/play_recorder
- rel_sleepless: +1 @ c2_control_01_approach/look_to_sleepless
- chapter_index: +1 @ c2_end_station/play_recorder
- station_count: +1 @ c2_end_station/play_recorder
Konsequenzen: innerhalb 1-3 Szenen: tickets_truth -> c2_s03b_comp7_warning, c2_s05b_reality_shift; rel_comp7 -> c2_s03b_comp7_warning; memory_drift -> c3_s01_wagen7_locked
Konsequenzen: spaeter: tickets_escape -> c4_s05a_wagen7_changed; tickets_love -> c5_s19_final_conversation; rel_boy -> c2_end_station; has_recorder -> c2_control_01_question; tickets_truth -> c2_s03b_comp7_warning, c2_s05b_reality_shift; conductor_attention -> c2_interlude_04_lights, c4_s04_announcement_glitch; memory_drift -> c2_interlude_04_lights, c2_interlude_05_vibration; rel_comp7 -> c2_end_platform_watch, c3_control_02_approach
Konsequenzen: keine: rel_sleepless; chapter_index; station_count

### Pfad (confrontational)
Path-Log: c2_s01_ticket_search:keep_walking -> c2_s01a_passenger_examination:approach_newspaper_woman -> c2_interlude_01_toilet:stare_back -> c2_s02_boy_recorder:take_recorder -> c2_s02a_recorder_listening:keep_listening -> c2_s02c_boy_vanish:insist_boy_real -> c2_interlude_02_window_dark:keep_staring -> c2_s03_comp7_intro:ask_notebook -> c2_s03a_comp7_notebook:read_future -> c2_s03b_comp7_warning:ask_more_options -> c2_interlude_03_announcement_glitch:continue -> c2_s04_announcement:prepare_hide -> c2_s04b_passengers_shift:try_run -> c2_control_01_approach:interrupt -> c2_control_01_question:offer_truth -> c2_control_01_aftermath:confront_sleepless -> c2_s05a_sleepless_talk:accept_truth -> c2_interlude_05_vibration:continue -> c2_end_platform_watch:tell_others -> c2_end_station:play_recorder

State-Verlauf (Keys mit Aenderungen):
- tickets_guilt: +1 @ c2_s01_ticket_search/keep_walking; +1 @ c2_s04_announcement/prepare_hide
- conductor_attention: +1 @ c2_s01_ticket_search/keep_walking; +1 @ c2_s01a_passenger_examination/approach_newspaper_woman; +1 @ c2_s02c_boy_vanish/insist_boy_real; +2 @ c2_s04_announcement/prepare_hide; +1 @ c2_s04b_passengers_shift/try_run; +1 @ c2_control_01_approach/interrupt; -1 @ c2_control_01_question/offer_truth; +1 @ c2_end_platform_watch/tell_others
- tickets_truth: +1 @ c2_s01a_passenger_examination/approach_newspaper_woman; +1 @ c2_interlude_01_toilet/stare_back; +1 @ c2_s02_boy_recorder/take_recorder; +2 @ c2_s02a_recorder_listening/keep_listening; +1 @ c2_s02c_boy_vanish/insist_boy_real; +1 @ c2_interlude_02_window_dark/keep_staring; +1 @ c2_s03_comp7_intro/ask_notebook; +2 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_s03b_comp7_warning/ask_more_options; +2 @ c2_control_01_question/offer_truth; +1 @ c2_control_01_aftermath/confront_sleepless; +1 @ c2_s05a_sleepless_talk/accept_truth; +1 @ c2_end_platform_watch/tell_others
- memory_drift: +1 @ c2_interlude_01_toilet/stare_back; +1 @ c2_s02a_recorder_listening/keep_listening; +1 @ c2_interlude_02_window_dark/keep_staring; +1 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_interlude_03_announcement_glitch/continue; +1 @ c2_control_01_aftermath/confront_sleepless; +1 @ c2_interlude_05_vibration/continue; +1 @ c2_end_station/play_recorder
- rel_boy: +1 @ c2_s02_boy_recorder/take_recorder
- has_recorder: +1 @ c2_s02_boy_recorder/take_recorder
- rel_comp7: +1 @ c2_s03_comp7_intro/ask_notebook; +1 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_end_station/play_recorder
- tickets_escape: +1 @ c2_s04b_passengers_shift/try_run; +1 @ c2_control_01_approach/interrupt
- rel_sleepless: +1 @ c2_control_01_aftermath/confront_sleepless; +2 @ c2_s05a_sleepless_talk/accept_truth
- chapter_index: +1 @ c2_end_station/play_recorder
- station_count: +1 @ c2_end_station/play_recorder
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c2_s02_boy_recorder, c2_interlude_02_window_dark, c2_interlude_05_vibration, c3_s01_wagen7_locked; tickets_truth -> c2_s03b_comp7_warning, c2_end_platform_watch; rel_comp7 -> c2_s03b_comp7_warning; rel_sleepless -> c2_s05a_sleepless_talk
Konsequenzen: spaeter: tickets_guilt -> c5_s21_decision_core; conductor_attention -> c4_s04_announcement_glitch; tickets_truth -> c2_s03b_comp7_warning, c2_end_platform_watch, c3_s03c_notebooks_explore; rel_boy -> c2_end_station; has_recorder -> c2_control_01_question; memory_drift -> c2_interlude_05_vibration; tickets_escape -> c4_s05a_wagen7_changed; rel_comp7 -> c3_control_02_approach
Konsequenzen: keine: rel_sleepless; chapter_index; station_count

### Pfad (opportunistic)
Path-Log: c2_s01_ticket_search:ask_boy -> c2_s02_boy_recorder:take_recorder -> c2_s02a_recorder_listening:keep_listening -> c2_s02c_boy_vanish:insist_boy_real -> c2_interlude_02_window_dark:keep_staring -> c2_s03_comp7_intro:ask_notebook -> c2_s03a_comp7_notebook:read_future -> c2_s03b_comp7_warning:thank_comp7 -> c2_interlude_03_announcement_glitch:cover_ears -> c2_s04_announcement:prepare_truth -> c2_s04a_conductor_approach:stand_ready -> c2_interlude_04_lights:steady -> c2_control_01_approach:wait_silent -> c2_control_01_question:offer_truth -> c2_control_01_aftermath:confront_sleepless -> c2_s05a_sleepless_talk:accept_truth -> c2_interlude_05_vibration:steady_breath -> c2_end_platform_watch:tell_others -> c2_end_station:think_of_boy

State-Verlauf (Keys mit Aenderungen):
- tickets_love: +1 @ c2_s01_ticket_search/ask_boy; +1 @ c2_s03b_comp7_warning/thank_comp7; +1 @ c2_end_station/think_of_boy
- rel_boy: +1 @ c2_s01_ticket_search/ask_boy; +1 @ c2_s02_boy_recorder/take_recorder; +1 @ c2_end_station/think_of_boy
- tickets_truth: +1 @ c2_s02_boy_recorder/take_recorder; +2 @ c2_s02a_recorder_listening/keep_listening; +1 @ c2_s02c_boy_vanish/insist_boy_real; +1 @ c2_interlude_02_window_dark/keep_staring; +1 @ c2_s03_comp7_intro/ask_notebook; +2 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_s04_announcement/prepare_truth; +1 @ c2_s04a_conductor_approach/stand_ready; +1 @ c2_interlude_04_lights/steady; +1 @ c2_control_01_approach/wait_silent; +2 @ c2_control_01_question/offer_truth; +1 @ c2_control_01_aftermath/confront_sleepless; +1 @ c2_s05a_sleepless_talk/accept_truth; +1 @ c2_end_platform_watch/tell_others
- has_recorder: +1 @ c2_s02_boy_recorder/take_recorder
- memory_drift: +1 @ c2_s02a_recorder_listening/keep_listening; +1 @ c2_interlude_02_window_dark/keep_staring; +1 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_control_01_aftermath/confront_sleepless; +1 @ c2_end_station/think_of_boy
- conductor_attention: +1 @ c2_s02c_boy_vanish/insist_boy_real; -1 @ c2_interlude_03_announcement_glitch/cover_ears; -1 @ c2_interlude_04_lights/steady; -1 @ c2_control_01_question/offer_truth; -1 @ c2_interlude_05_vibration/steady_breath; +1 @ c2_end_platform_watch/tell_others
- rel_comp7: +1 @ c2_s03_comp7_intro/ask_notebook; +1 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_s03b_comp7_warning/thank_comp7
- tickets_escape: +1 @ c2_interlude_03_announcement_glitch/cover_ears; +1 @ c2_interlude_05_vibration/steady_breath
- rel_sleepless: +1 @ c2_control_01_aftermath/confront_sleepless; +2 @ c2_s05a_sleepless_talk/accept_truth
- chapter_index: +1 @ c2_end_station/think_of_boy
- station_count: +1 @ c2_end_station/think_of_boy
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c2_interlude_02_window_dark, c2_interlude_05_vibration, c3_s01_wagen7_locked; tickets_truth -> c2_s03b_comp7_warning, c2_end_platform_watch; rel_comp7 -> c2_s03b_comp7_warning, c2_s04a_conductor_approach; conductor_attention -> c2_interlude_04_lights; rel_sleepless -> c2_s05a_sleepless_talk
Konsequenzen: spaeter: tickets_love -> c5_s19_final_conversation; rel_boy -> c2_end_station, c4_s03_passengers_return; tickets_truth -> c2_s03b_comp7_warning, c2_end_platform_watch, c3_s03c_notebooks_explore; has_recorder -> c2_control_01_question; conductor_attention -> c2_interlude_04_lights, c4_s04_announcement_glitch; memory_drift -> c2_interlude_04_lights; tickets_escape -> c4_s05a_wagen7_changed
Konsequenzen: keine: rel_sleepless; chapter_index; station_count

### Pfad (dumb)
Path-Log: c2_s01_ticket_search:keep_walking -> c2_s01a_passenger_examination:approach_newspaper_woman -> c2_interlude_01_toilet:stare_back -> c2_s02_boy_recorder:refuse_recorder -> c2_s02b_corridor_anomaly:count_compartments -> c2_interlude_02_window_dark:continue -> c2_s03_comp7_intro:ask_name -> c2_s03a_comp7_notebook:refuse_knowledge -> c2_interlude_03_announcement_glitch:continue -> c2_s04_announcement:prepare_hide -> c2_s04b_passengers_shift:try_run -> c2_control_01_approach:wait_silent -> c2_control_01_question:offer_escape -> c2_control_01_aftermath:stay_silent -> c2_s05b_reality_shift:ignore_vision -> c2_interlude_05_vibration:continue -> c2_end_platform_watch:tell_others -> c2_end_station:continue_to_chapter_3

State-Verlauf (Keys mit Aenderungen):
- tickets_guilt: +1 @ c2_s01_ticket_search/keep_walking; +1 @ c2_s02_boy_recorder/refuse_recorder; +1 @ c2_s04_announcement/prepare_hide
- conductor_attention: +1 @ c2_s01_ticket_search/keep_walking; +1 @ c2_s01a_passenger_examination/approach_newspaper_woman; +2 @ c2_s04_announcement/prepare_hide; +1 @ c2_s04b_passengers_shift/try_run; +1 @ c2_end_platform_watch/tell_others
- tickets_truth: +1 @ c2_s01a_passenger_examination/approach_newspaper_woman; +1 @ c2_interlude_01_toilet/stare_back; +1 @ c2_s02b_corridor_anomaly/count_compartments; +1 @ c2_control_01_approach/wait_silent; +1 @ c2_end_platform_watch/tell_others
- memory_drift: +1 @ c2_interlude_01_toilet/stare_back; +1 @ c2_s02b_corridor_anomaly/count_compartments; +1 @ c2_interlude_02_window_dark/continue; +1 @ c2_interlude_03_announcement_glitch/continue; +1 @ c2_interlude_05_vibration/continue; +1 @ c2_end_station/continue_to_chapter_3
- rel_boy: -1 @ c2_s02_boy_recorder/refuse_recorder
- tickets_love: +1 @ c2_s03_comp7_intro/ask_name
- rel_comp7: +1 @ c2_s03_comp7_intro/ask_name; -1 @ c2_s03a_comp7_notebook/refuse_knowledge
- tickets_escape: +1 @ c2_s03a_comp7_notebook/refuse_knowledge; +1 @ c2_s04b_passengers_shift/try_run; +2 @ c2_control_01_question/offer_escape; +1 @ c2_control_01_aftermath/stay_silent; +1 @ c2_s05b_reality_shift/ignore_vision
- chapter_index: +1 @ c2_end_station/continue_to_chapter_3
- station_count: +1 @ c2_end_station/continue_to_chapter_3
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c2_s02_boy_recorder, c2_interlude_02_window_dark, c3_s01_wagen7_locked; tickets_truth -> c2_s05b_reality_shift
Konsequenzen: spaeter: tickets_guilt -> c5_s21_decision_core; conductor_attention -> c4_s04_announcement_glitch; tickets_truth -> c2_s05b_reality_shift, c3_s03c_notebooks_explore; rel_boy -> c2_end_station; memory_drift -> c2_interlude_05_vibration; tickets_love -> c5_s19_final_conversation; rel_comp7 -> c2_end_platform_watch; tickets_escape -> c6_s13_mirror_choice
Konsequenzen: keine: chapter_index; station_count

### Pfad (max_risk)
Path-Log: c2_s01_ticket_search:keep_walking -> c2_s01a_passenger_examination:approach_newspaper_woman -> c2_interlude_01_toilet:stare_back -> c2_s02_boy_recorder:observe_boy_silently -> c2_s02b_corridor_anomaly:question_reality -> c2_interlude_02_window_dark:keep_staring -> c2_s03_comp7_intro:deny_amnesia -> c2_s03a_comp7_notebook:read_future -> c2_s03b_comp7_warning:ask_more_options -> c2_interlude_03_announcement_glitch:continue -> c2_s04_announcement:prepare_hide -> c2_s04b_passengers_shift:try_run -> c2_control_01_approach:interrupt -> c2_control_01_question:offer_search -> c2_control_01_aftermath:confront_sleepless -> c2_s05a_sleepless_talk:reject_truth -> c2_s05b_reality_shift:ignore_vision -> c2_interlude_05_vibration:continue -> c2_end_platform_watch:tell_others -> c2_end_station:continue_to_chapter_3

State-Verlauf (Keys mit Aenderungen):
- tickets_guilt: +1 @ c2_s01_ticket_search/keep_walking; +1 @ c2_s04_announcement/prepare_hide
- conductor_attention: +1 @ c2_s01_ticket_search/keep_walking; +1 @ c2_s01a_passenger_examination/approach_newspaper_woman; +1 @ c2_s02b_corridor_anomaly/question_reality; +2 @ c2_s04_announcement/prepare_hide; +1 @ c2_s04b_passengers_shift/try_run; +1 @ c2_control_01_approach/interrupt; +1 @ c2_end_platform_watch/tell_others
- tickets_truth: +1 @ c2_s01a_passenger_examination/approach_newspaper_woman; +1 @ c2_interlude_01_toilet/stare_back; +1 @ c2_s02b_corridor_anomaly/question_reality; +1 @ c2_interlude_02_window_dark/keep_staring; +2 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_s03b_comp7_warning/ask_more_options; +1 @ c2_control_01_aftermath/confront_sleepless; +1 @ c2_end_platform_watch/tell_others
- memory_drift: +1 @ c2_interlude_01_toilet/stare_back; +1 @ c2_s02_boy_recorder/observe_boy_silently; +1 @ c2_interlude_02_window_dark/keep_staring; +1 @ c2_s03_comp7_intro/deny_amnesia; +1 @ c2_s03a_comp7_notebook/read_future; +1 @ c2_interlude_03_announcement_glitch/continue; +1 @ c2_control_01_aftermath/confront_sleepless; +1 @ c2_interlude_05_vibration/continue; +1 @ c2_end_station/continue_to_chapter_3
- tickets_escape: +1 @ c2_s03_comp7_intro/deny_amnesia; +1 @ c2_s04b_passengers_shift/try_run; +1 @ c2_control_01_approach/interrupt; +1 @ c2_s05a_sleepless_talk/reject_truth; +1 @ c2_s05b_reality_shift/ignore_vision
- rel_comp7: +1 @ c2_s03a_comp7_notebook/read_future
- tickets_love: +2 @ c2_control_01_question/offer_search
- rel_sleepless: +1 @ c2_control_01_aftermath/confront_sleepless; -1 @ c2_s05a_sleepless_talk/reject_truth
- chapter_index: +1 @ c2_end_station/continue_to_chapter_3
- station_count: +1 @ c2_end_station/continue_to_chapter_3
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c2_s02_boy_recorder, c2_s02b_corridor_anomaly, c2_interlude_05_vibration, c3_s01_wagen7_locked; tickets_truth -> c2_s03b_comp7_warning, c2_s05b_reality_shift; rel_comp7 -> c2_s03b_comp7_warning; rel_sleepless -> c2_s05a_sleepless_talk
Konsequenzen: spaeter: tickets_guilt -> c5_s21_decision_core; conductor_attention -> c4_s04_announcement_glitch; tickets_truth -> c2_s03b_comp7_warning, c2_s05b_reality_shift, c3_s03c_notebooks_explore; memory_drift -> c2_interlude_05_vibration; tickets_escape -> c6_s13_mirror_choice; tickets_love -> c5_s19_final_conversation
Konsequenzen: keine: rel_sleepless; chapter_index; station_count

## Kapitel 3

### Pfad (risk_averse)
Path-Log: c3_s01_wagen7_locked:wait_at_door -> c3_s01a_after_station:leave_notebook -> c3_interlude_01_lights:continue -> c3_s01b_boy_return:refuse_to_check -> c3_interlude_02_announcement:continue -> c3_s02b_corridor_shift:ignore_sleepless -> c3_interlude_03_window:continue -> c3_s03_wagen7_approach:enter_immediately -> c3_s03b_inside_comp7:ask_comp7_explain -> c3_s04_comp7_truth:deny_truth -> c3_interlude_05_mirror:continue -> c3_s04b_third_announcement:hide_in_comp7 -> c3_control_02_approach:let_comp7_talk -> c3_control_02_question:offer_recorder -> c3_control_02_aftermath:thank_comp7 -> c3_s06_passengers_vanish:sit_down -> c3_s06a_drift_intensifies:ignore_boy -> c3_end_platform_watch:try_to_exit -> c3_end_station:continue_to_chapter_4

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c3_s01_wagen7_locked/wait_at_door; +1 @ c3_s01a_after_station/leave_notebook; +1 @ c3_s01b_boy_return/refuse_to_check; +1 @ c3_s02b_corridor_shift/ignore_sleepless; +1 @ c3_s03_wagen7_approach/enter_immediately; +1 @ c3_s04_comp7_truth/deny_truth; +1 @ c3_s04b_third_announcement/hide_in_comp7; +1 @ c3_s06_passengers_vanish/sit_down; +1 @ c3_s06a_drift_intensifies/ignore_boy; +1 @ c3_end_platform_watch/try_to_exit
- memory_drift: +1 @ c3_interlude_01_lights/continue; +1 @ c3_interlude_03_window/continue; +1 @ c3_interlude_05_mirror/continue; +1 @ c3_end_station/continue_to_chapter_4
- rel_boy: -1 @ c3_s01b_boy_return/refuse_to_check
- conductor_attention: +1 @ c3_interlude_02_announcement/continue; -1 @ c3_control_02_approach/let_comp7_talk; -2 @ c3_control_02_question/offer_recorder
- tickets_love: +1 @ c3_s03b_inside_comp7/ask_comp7_explain; +1 @ c3_control_02_approach/let_comp7_talk; +1 @ c3_control_02_aftermath/thank_comp7
- rel_comp7: +2 @ c3_s03b_inside_comp7/ask_comp7_explain; -1 @ c3_s04_comp7_truth/deny_truth; +1 @ c3_s04b_third_announcement/hide_in_comp7; +2 @ c3_control_02_aftermath/thank_comp7
- tickets_guilt: +2 @ c3_control_02_question/offer_recorder
- has_recorder: -1 @ c3_control_02_question/offer_recorder
- chapter_index: +1 @ c3_end_station/continue_to_chapter_4
- station_count: +1 @ c3_end_station/continue_to_chapter_4
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c3_s03b_inside_comp7; rel_comp7 -> c3_control_02_approach
Konsequenzen: spaeter: tickets_escape -> c4_s05a_wagen7_changed; memory_drift -> c3_interlude_03_window, c4_interlude_03_window; rel_boy -> c4_s03_passengers_return; conductor_attention -> c4_s04_announcement_glitch; tickets_love -> c5_s19_final_conversation; rel_comp7 -> c3_control_02_approach, c4_s04a_name_confusion; tickets_guilt -> c5_s21_decision_core; has_recorder -> c4_s02_recorder_prophecy
Konsequenzen: keine: chapter_index; station_count

### Pfad (confrontational)
Path-Log: c3_s01_wagen7_locked:try_to_open -> c3_s01a_after_station:read_notebook -> c3_s01b_boy_return:play_own_recorder -> c3_s02_recorder_anomaly:listen_more -> c3_s02a_recorder_listening:ask_what_answer -> c3_s02b_corridor_shift:talk_to_sleepless -> c3_s02c_sleepless_talk:ask_what_to_give -> c3_interlude_03_window:continue -> c3_s03_wagen7_approach:examine_door -> c3_s03a_compartment7_door:enter_cautiously -> c3_s03b_inside_comp7:examine_notebooks -> c3_s03c_notebooks_explore:read_own_entry -> c3_s04_comp7_truth:accept_truth -> c3_s04a_paradox_window:accept_paradox -> c3_s04b_third_announcement:go_to_control -> c3_control_02_approach:stay_inside -> c3_control_02_question:offer_truth -> c3_control_02_aftermath:ask_how_many -> c3_s06_passengers_vanish:search_train -> c3_s06a_drift_intensifies:ask_where_others -> c3_s06b_boy_final:take_boys_recorder -> c3_end_platform_watch:stay_on_train -> c3_end_station:continue_to_chapter_4

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c3_s01_wagen7_locked/try_to_open; +2 @ c3_s01a_after_station/read_notebook; +1 @ c3_s01b_boy_return/play_own_recorder; +2 @ c3_s02_recorder_anomaly/listen_more; +1 @ c3_s02a_recorder_listening/ask_what_answer; +1 @ c3_s02b_corridor_shift/talk_to_sleepless; +1 @ c3_s03_wagen7_approach/examine_door; +1 @ c3_s03a_compartment7_door/enter_cautiously; +2 @ c3_s03b_inside_comp7/examine_notebooks; +2 @ c3_s03c_notebooks_explore/read_own_entry; +2 @ c3_s04_comp7_truth/accept_truth; +2 @ c3_s04a_paradox_window/accept_paradox; +1 @ c3_s04b_third_announcement/go_to_control; +2 @ c3_control_02_question/offer_truth; +1 @ c3_control_02_aftermath/ask_how_many; +1 @ c3_s06_passengers_vanish/search_train; +1 @ c3_s06a_drift_intensifies/ask_where_others; +1 @ c3_s06b_boy_final/take_boys_recorder; +1 @ c3_end_platform_watch/stay_on_train
- conductor_attention: +1 @ c3_s01_wagen7_locked/try_to_open; +2 @ c3_control_02_approach/stay_inside; +1 @ c3_control_02_question/offer_truth
- memory_drift: +1 @ c3_s01a_after_station/read_notebook; +1 @ c3_s02_recorder_anomaly/listen_more; +1 @ c3_interlude_03_window/continue; +1 @ c3_s03b_inside_comp7/examine_notebooks; +2 @ c3_s03c_notebooks_explore/read_own_entry; +1 @ c3_s04a_paradox_window/accept_paradox; +1 @ c3_s06_passengers_vanish/search_train; +1 @ c3_end_station/continue_to_chapter_4
- rel_boy: +1 @ c3_s01b_boy_return/play_own_recorder; +1 @ c3_s02a_recorder_listening/ask_what_answer
- rel_sleepless: +1 @ c3_s02b_corridor_shift/talk_to_sleepless; +1 @ c3_s02c_sleepless_talk/ask_what_to_give
- tickets_guilt: +1 @ c3_s02c_sleepless_talk/ask_what_to_give
- rel_comp7: +1 @ c3_s03a_compartment7_door/enter_cautiously; +1 @ c3_s04_comp7_truth/accept_truth
- tickets_escape: +1 @ c3_control_02_approach/stay_inside
- chapter_index: +1 @ c3_end_station/continue_to_chapter_4
- station_count: +1 @ c3_end_station/continue_to_chapter_4
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c3_s03b_inside_comp7, c3_s03c_notebooks_explore, c3_s04a_paradox_window, c4_s01a_double_reflection; tickets_truth -> c3_s03c_notebooks_explore; rel_comp7 -> c3_control_02_approach
Konsequenzen: spaeter: tickets_truth -> c3_s03c_notebooks_explore, c4_s06_comp7_memory; conductor_attention -> c4_s04_announcement_glitch; memory_drift -> c3_interlude_03_window, c4_s01a_double_reflection; rel_boy -> c4_s03_passengers_return; tickets_guilt -> c5_s21_decision_core; rel_comp7 -> c3_control_02_approach; tickets_escape -> c4_s05a_wagen7_changed
Konsequenzen: keine: rel_sleepless; chapter_index; station_count

### Pfad (opportunistic)
Path-Log: c3_s01_wagen7_locked:try_to_open -> c3_s01a_after_station:read_notebook -> c3_s01b_boy_return:play_own_recorder -> c3_s02_recorder_anomaly:listen_more -> c3_s02a_recorder_listening:ask_what_answer -> c3_s02b_corridor_shift:ignore_sleepless -> c3_interlude_03_window:continue -> c3_s03_wagen7_approach:enter_immediately -> c3_s03b_inside_comp7:examine_notebooks -> c3_s03c_notebooks_explore:examine_photo -> c3_s04_comp7_truth:accept_truth -> c3_s04a_paradox_window:accept_paradox -> c3_s04b_third_announcement:hide_in_comp7 -> c3_control_02_approach:step_outside -> c3_control_02_question:offer_recorder -> c3_control_02_aftermath:thank_comp7 -> c3_s06_passengers_vanish:go_to_comp7 -> c3_s06a_drift_intensifies:talk_to_boy -> c3_s06b_boy_final:take_boys_recorder -> c3_end_platform_watch:try_to_exit -> c3_end_station:continue_to_chapter_4

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c3_s01_wagen7_locked/try_to_open; +2 @ c3_s01a_after_station/read_notebook; +1 @ c3_s01b_boy_return/play_own_recorder; +2 @ c3_s02_recorder_anomaly/listen_more; +1 @ c3_s02a_recorder_listening/ask_what_answer; +2 @ c3_s03b_inside_comp7/examine_notebooks; +1 @ c3_s03c_notebooks_explore/examine_photo; +2 @ c3_s04_comp7_truth/accept_truth; +2 @ c3_s04a_paradox_window/accept_paradox; +1 @ c3_control_02_approach/step_outside; +1 @ c3_s06b_boy_final/take_boys_recorder
- conductor_attention: +1 @ c3_s01_wagen7_locked/try_to_open; +1 @ c3_control_02_approach/step_outside; -2 @ c3_control_02_question/offer_recorder
- memory_drift: +1 @ c3_s01a_after_station/read_notebook; +1 @ c3_s02_recorder_anomaly/listen_more; +1 @ c3_interlude_03_window/continue; +1 @ c3_s03b_inside_comp7/examine_notebooks; +1 @ c3_s03c_notebooks_explore/examine_photo; +1 @ c3_s04a_paradox_window/accept_paradox; +1 @ c3_end_station/continue_to_chapter_4
- rel_boy: +1 @ c3_s01b_boy_return/play_own_recorder; +1 @ c3_s02a_recorder_listening/ask_what_answer; +1 @ c3_s06a_drift_intensifies/talk_to_boy
- tickets_escape: +1 @ c3_s02b_corridor_shift/ignore_sleepless; +1 @ c3_s03_wagen7_approach/enter_immediately; +1 @ c3_s04b_third_announcement/hide_in_comp7; +1 @ c3_end_platform_watch/try_to_exit
- photo_anomaly: +1 @ c3_s03c_notebooks_explore/examine_photo
- rel_comp7: +1 @ c3_s04_comp7_truth/accept_truth; +1 @ c3_s04b_third_announcement/hide_in_comp7; +2 @ c3_control_02_aftermath/thank_comp7; +1 @ c3_s06_passengers_vanish/go_to_comp7
- tickets_guilt: +2 @ c3_control_02_question/offer_recorder
- has_recorder: -1 @ c3_control_02_question/offer_recorder; +1 @ c3_s06b_boy_final/take_boys_recorder
- tickets_love: +1 @ c3_control_02_aftermath/thank_comp7; +1 @ c3_s06_passengers_vanish/go_to_comp7; +1 @ c3_s06a_drift_intensifies/talk_to_boy
- chapter_index: +1 @ c3_end_station/continue_to_chapter_4
- station_count: +1 @ c3_end_station/continue_to_chapter_4
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c3_interlude_03_window, c3_s03b_inside_comp7, c3_s03c_notebooks_explore, c3_s04a_paradox_window, c4_s01a_double_reflection; tickets_truth -> c3_s03c_notebooks_explore; rel_comp7 -> c3_control_02_approach
Konsequenzen: spaeter: tickets_truth -> c3_s03c_notebooks_explore, c4_s06_comp7_memory; conductor_attention -> c4_s04_announcement_glitch; memory_drift -> c3_interlude_03_window, c4_s01a_double_reflection; rel_boy -> c4_s03_passengers_return; tickets_escape -> c4_s05a_wagen7_changed; tickets_guilt -> c5_s21_decision_core; has_recorder -> c4_s02_recorder_prophecy; tickets_love -> c5_s19_final_conversation; rel_comp7 -> c4_s04a_name_confusion
Konsequenzen: keine: photo_anomaly; chapter_index; station_count

### Pfad (dumb)
Path-Log: c3_s01_wagen7_locked:try_to_open -> c3_s01a_after_station:read_notebook -> c3_s01b_boy_return:refuse_to_check -> c3_interlude_02_announcement:continue -> c3_s02b_corridor_shift:ignore_sleepless -> c3_interlude_03_window:continue -> c3_s03_wagen7_approach:enter_immediately -> c3_s03b_inside_comp7:examine_notebooks -> c3_s03c_notebooks_explore:deny -> c3_s04_comp7_truth:deny_truth -> c3_interlude_05_mirror:continue -> c3_s04b_third_announcement:hide_in_comp7 -> c3_control_02_approach:stay_inside -> c3_control_02_question:offer_truth -> c3_control_02_aftermath:walk_away -> c3_s06_passengers_vanish:search_train -> c3_s06a_drift_intensifies:ignore_boy -> c3_end_platform_watch:try_to_exit -> c3_end_station:continue_to_chapter_4

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c3_s01_wagen7_locked/try_to_open; +2 @ c3_s01a_after_station/read_notebook; +2 @ c3_s03b_inside_comp7/examine_notebooks; +2 @ c3_control_02_question/offer_truth; +1 @ c3_s06_passengers_vanish/search_train
- conductor_attention: +1 @ c3_s01_wagen7_locked/try_to_open; +1 @ c3_interlude_02_announcement/continue; +2 @ c3_control_02_approach/stay_inside; +1 @ c3_control_02_question/offer_truth
- memory_drift: +1 @ c3_s01a_after_station/read_notebook; +1 @ c3_interlude_03_window/continue; +1 @ c3_s03b_inside_comp7/examine_notebooks; +1 @ c3_interlude_05_mirror/continue; +1 @ c3_s06_passengers_vanish/search_train; +1 @ c3_end_station/continue_to_chapter_4
- tickets_escape: +1 @ c3_s01b_boy_return/refuse_to_check; +1 @ c3_s02b_corridor_shift/ignore_sleepless; +1 @ c3_s03_wagen7_approach/enter_immediately; +1 @ c3_s03c_notebooks_explore/deny; +1 @ c3_s04_comp7_truth/deny_truth; +1 @ c3_s04b_third_announcement/hide_in_comp7; +1 @ c3_control_02_approach/stay_inside; +1 @ c3_control_02_aftermath/walk_away; +1 @ c3_s06a_drift_intensifies/ignore_boy; +1 @ c3_end_platform_watch/try_to_exit
- rel_boy: -1 @ c3_s01b_boy_return/refuse_to_check
- rel_comp7: -1 @ c3_s04_comp7_truth/deny_truth; +1 @ c3_s04b_third_announcement/hide_in_comp7; -1 @ c3_control_02_aftermath/walk_away
- chapter_index: +1 @ c3_end_station/continue_to_chapter_4
- station_count: +1 @ c3_end_station/continue_to_chapter_4
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c3_s03b_inside_comp7, c3_s03c_notebooks_explore, c4_s01a_double_reflection; tickets_truth -> c3_s03c_notebooks_explore; rel_comp7 -> c3_control_02_approach
Konsequenzen: spaeter: tickets_truth -> c3_s03c_notebooks_explore, c4_s06_comp7_memory; conductor_attention -> c4_s04_announcement_glitch; memory_drift -> c3_interlude_03_window, c4_s01a_double_reflection; tickets_escape -> c6_s13_mirror_choice; rel_boy -> c4_s03_passengers_return; rel_comp7 -> c5_s15_control3_question
Konsequenzen: keine: chapter_index; station_count

### Pfad (max_risk)
Path-Log: c3_s01_wagen7_locked:try_to_open -> c3_s01a_after_station:read_notebook -> c3_s01b_boy_return:refuse_to_check -> c3_interlude_02_announcement:continue -> c3_s02b_corridor_shift:count_compartments -> c3_interlude_03_window:continue -> c3_s03_wagen7_approach:enter_immediately -> c3_s03b_inside_comp7:examine_notebooks -> c3_s03c_notebooks_explore:read_own_entry -> c3_s04_comp7_truth:deny_truth -> c3_interlude_05_mirror:continue -> c3_s04b_third_announcement:go_to_control -> c3_control_02_approach:stay_inside -> c3_control_02_question:offer_truth -> c3_control_02_aftermath:walk_away -> c3_s06_passengers_vanish:search_train -> c3_s06a_drift_intensifies:ignore_boy -> c3_end_platform_watch:try_to_exit -> c3_end_station:continue_to_chapter_4

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c3_s01_wagen7_locked/try_to_open; +2 @ c3_s01a_after_station/read_notebook; +1 @ c3_s02b_corridor_shift/count_compartments; +2 @ c3_s03b_inside_comp7/examine_notebooks; +2 @ c3_s03c_notebooks_explore/read_own_entry; +1 @ c3_s04b_third_announcement/go_to_control; +2 @ c3_control_02_question/offer_truth; +1 @ c3_s06_passengers_vanish/search_train
- conductor_attention: +1 @ c3_s01_wagen7_locked/try_to_open; +1 @ c3_interlude_02_announcement/continue; +2 @ c3_control_02_approach/stay_inside; +1 @ c3_control_02_question/offer_truth
- memory_drift: +1 @ c3_s01a_after_station/read_notebook; +1 @ c3_s02b_corridor_shift/count_compartments; +1 @ c3_interlude_03_window/continue; +1 @ c3_s03b_inside_comp7/examine_notebooks; +2 @ c3_s03c_notebooks_explore/read_own_entry; +1 @ c3_interlude_05_mirror/continue; +1 @ c3_s06_passengers_vanish/search_train; +1 @ c3_end_station/continue_to_chapter_4
- tickets_escape: +1 @ c3_s01b_boy_return/refuse_to_check; +1 @ c3_s03_wagen7_approach/enter_immediately; +1 @ c3_s04_comp7_truth/deny_truth; +1 @ c3_control_02_approach/stay_inside; +1 @ c3_control_02_aftermath/walk_away; +1 @ c3_s06a_drift_intensifies/ignore_boy; +1 @ c3_end_platform_watch/try_to_exit
- rel_boy: -1 @ c3_s01b_boy_return/refuse_to_check
- rel_comp7: -1 @ c3_s04_comp7_truth/deny_truth; -1 @ c3_control_02_aftermath/walk_away
- chapter_index: +1 @ c3_end_station/continue_to_chapter_4
- station_count: +1 @ c3_end_station/continue_to_chapter_4
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c3_interlude_03_window, c3_s03b_inside_comp7, c3_s03c_notebooks_explore, c3_interlude_05_mirror, c4_s01a_double_reflection; tickets_truth -> c3_s03c_notebooks_explore; rel_comp7 -> c3_control_02_approach
Konsequenzen: spaeter: tickets_truth -> c3_s03c_notebooks_explore, c4_s06_comp7_memory; conductor_attention -> c4_s04_announcement_glitch; memory_drift -> c3_interlude_03_window, c4_s01a_double_reflection; tickets_escape -> c6_s13_mirror_choice; rel_boy -> c4_s03_passengers_return; rel_comp7 -> c5_s15_control3_question
Konsequenzen: keine: chapter_index; station_count

## Kapitel 4

### Pfad (risk_averse)
Path-Log: c4_s01_mirror:back_away -> c4_interlude_01_lights:continue -> c4_s02_recorder_prophecy:no_recorder -> c4_interlude_02_announcement:continue -> c4_s03_passengers_return:ignore_all -> c4_interlude_03_window:continue -> c4_s04_announcement_glitch:check_own_name -> c4_s04a_name_confusion:ask_comp7_name -> c4_s05_comp7_call:go_to_wagen7 -> c4_s05a_wagen7_changed:ask_about_escape -> c4_s06_comp7_memory:doubt_her -> c4_s07_reality_fracture:remember_comp7 -> c4_s07a_drift_peak:confront_self -> c4_s07b_stabilization:ignore_object -> c4_end_platform_watch:close_eyes -> c4_end_station:continue_to_chapter_5

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c4_s01_mirror/back_away; +1 @ c4_s02_recorder_prophecy/no_recorder; +1 @ c4_s03_passengers_return/ignore_all; +1 @ c4_s05a_wagen7_changed/ask_about_escape; +1 @ c4_s06_comp7_memory/doubt_her; +1 @ c4_s07b_stabilization/ignore_object; +1 @ c4_end_platform_watch/close_eyes
- memory_drift: +1 @ c4_interlude_01_lights/continue; +1 @ c4_interlude_02_announcement/continue; +1 @ c4_interlude_03_window/continue; +1 @ c4_s04_announcement_glitch/check_own_name; +1 @ c4_end_station/continue_to_chapter_5
- tickets_truth: +1 @ c4_s04_announcement_glitch/check_own_name; +1 @ c4_s05_comp7_call/go_to_wagen7; +2 @ c4_s07a_drift_peak/confront_self
- tickets_love: +1 @ c4_s04a_name_confusion/ask_comp7_name; +1 @ c4_s07_reality_fracture/remember_comp7
- rel_comp7: +1 @ c4_s04a_name_confusion/ask_comp7_name; +1 @ c4_s05_comp7_call/go_to_wagen7; +1 @ c4_s05a_wagen7_changed/ask_about_escape; -1 @ c4_s06_comp7_memory/doubt_her; +1 @ c4_s07_reality_fracture/remember_comp7
- chapter_index: +1 @ c4_end_station/continue_to_chapter_5
- station_count: +1 @ c4_end_station/continue_to_chapter_5
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c4_interlude_03_window; tickets_truth -> c4_s06_comp7_memory
Konsequenzen: spaeter: tickets_escape -> c4_s05a_wagen7_changed, c6_s13_mirror_choice; memory_drift -> c4_interlude_03_window, c5_s04_lights_flicker; tickets_truth -> c4_s06_comp7_memory, c5_s15_control3_question; tickets_love -> c5_s19_final_conversation; rel_comp7 -> c5_s15_control3_question
Konsequenzen: keine: chapter_index; station_count

### Pfad (confrontational)
Path-Log: c4_s01_mirror:touch_mirror -> c4_s01a_double_reflection:try_to_understand -> c4_s01b_wrong_memory:fight_memory -> c4_interlude_01_lights:continue -> c4_s02_recorder_prophecy:listen_to_prophecy -> c4_s02a_recording_self:rewind_and_listen -> c4_s02b_recorder_loop:accept_loop -> c4_interlude_02_announcement:continue -> c4_s03_passengers_return:talk_to_sleepless -> c4_s03a_sleepless_changed:ask_about_loop -> c4_interlude_03_window:continue -> c4_s04_announcement_glitch:ignore_announcement -> c4_interlude_04_corridor:continue -> c4_s05_comp7_call:go_to_wagen7 -> c4_s05a_wagen7_changed:ask_how_long -> c4_s06_comp7_memory:ask_about_future -> c4_s06a_shared_memory:reject_memory -> c4_s07_reality_fracture:remember_platform -> c4_s07a_drift_peak:confront_self -> c4_s07b_stabilization:examine_object -> c4_s07c_tag19_found:take_tag19 -> c4_end_platform_watch:observe_copies -> c4_end_station:continue_to_chapter_5

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c4_s01_mirror/touch_mirror; +2 @ c4_s01a_double_reflection/try_to_understand; +1 @ c4_s01b_wrong_memory/fight_memory; +2 @ c4_s02_recorder_prophecy/listen_to_prophecy; +1 @ c4_s02a_recording_self/rewind_and_listen; +2 @ c4_s02b_recorder_loop/accept_loop; +1 @ c4_s03_passengers_return/talk_to_sleepless; +2 @ c4_s03a_sleepless_changed/ask_about_loop; +1 @ c4_s05_comp7_call/go_to_wagen7; +1 @ c4_s05a_wagen7_changed/ask_how_long; +2 @ c4_s06_comp7_memory/ask_about_future; +1 @ c4_s06a_shared_memory/reject_memory; +1 @ c4_s07_reality_fracture/remember_platform; +2 @ c4_s07a_drift_peak/confront_self; +1 @ c4_s07b_stabilization/examine_object; +1 @ c4_s07c_tag19_found/take_tag19; +1 @ c4_end_platform_watch/observe_copies
- memory_drift: +1 @ c4_s01_mirror/touch_mirror; +1 @ c4_interlude_01_lights/continue; +1 @ c4_s02_recorder_prophecy/listen_to_prophecy; +1 @ c4_s02a_recording_self/rewind_and_listen; +1 @ c4_interlude_02_announcement/continue; +1 @ c4_interlude_03_window/continue; +1 @ c4_interlude_04_corridor/continue; +1 @ c4_s06_comp7_memory/ask_about_future; +1 @ c4_s07_reality_fracture/remember_platform; +1 @ c4_end_station/continue_to_chapter_5
- conductor_attention: +1 @ c4_s01b_wrong_memory/fight_memory; +1 @ c4_s04_announcement_glitch/ignore_announcement; +1 @ c4_s07c_tag19_found/take_tag19
- rel_sleepless: +1 @ c4_s03_passengers_return/talk_to_sleepless
- tickets_escape: +1 @ c4_s04_announcement_glitch/ignore_announcement
- rel_comp7: +1 @ c4_s05_comp7_call/go_to_wagen7
- has_tag19: +1 @ c4_s07c_tag19_found/take_tag19
- chapter_index: +1 @ c4_end_station/continue_to_chapter_5
- station_count: +1 @ c4_end_station/continue_to_chapter_5
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c4_s01a_double_reflection, c4_interlude_03_window; tickets_escape -> c4_s05a_wagen7_changed; tickets_truth -> c4_s06_comp7_memory
Konsequenzen: spaeter: tickets_truth -> c4_s06_comp7_memory, c5_s07_abteil7_inside; conductor_attention -> c4_s04_announcement_glitch, c5_s15_control3_question; memory_drift -> c4_interlude_03_window, c5_s04_lights_flicker; rel_comp7 -> c5_s15_control3_question; has_tag19 -> c5_s10_boy_reunion
Konsequenzen: keine: rel_sleepless; chapter_index; station_count

### Pfad (opportunistic)
Path-Log: c4_s01_mirror:touch_mirror -> c4_s01a_double_reflection:try_to_understand -> c4_s01b_wrong_memory:accept_false_memory -> c4_interlude_01_lights:continue -> c4_s02_recorder_prophecy:listen_to_prophecy -> c4_s02a_recording_self:rewind_and_listen -> c4_s02b_recorder_loop:accept_loop -> c4_interlude_02_announcement:continue -> c4_s03_passengers_return:talk_to_sleepless -> c4_s03a_sleepless_changed:ask_about_loop -> c4_interlude_03_window:continue -> c4_s04_announcement_glitch:check_own_name -> c4_s04a_name_confusion:accept_loss -> c4_s05_comp7_call:go_to_wagen7 -> c4_s05a_wagen7_changed:comfort_comp7 -> c4_s06_comp7_memory:ask_about_future -> c4_s06a_shared_memory:accept_memory -> c4_s07_reality_fracture:let_go -> c4_s07a_drift_peak:confront_self -> c4_s07b_stabilization:examine_object -> c4_s07c_tag19_found:take_tag19 -> c4_end_platform_watch:observe_copies -> c4_end_station:continue_to_chapter_5

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c4_s01_mirror/touch_mirror; +2 @ c4_s01a_double_reflection/try_to_understand; +2 @ c4_s02_recorder_prophecy/listen_to_prophecy; +1 @ c4_s02a_recording_self/rewind_and_listen; +2 @ c4_s02b_recorder_loop/accept_loop; +1 @ c4_s03_passengers_return/talk_to_sleepless; +2 @ c4_s03a_sleepless_changed/ask_about_loop; +1 @ c4_s04_announcement_glitch/check_own_name; +1 @ c4_s05_comp7_call/go_to_wagen7; +2 @ c4_s06_comp7_memory/ask_about_future; +2 @ c4_s07a_drift_peak/confront_self; +1 @ c4_s07b_stabilization/examine_object; +1 @ c4_s07c_tag19_found/take_tag19; +1 @ c4_end_platform_watch/observe_copies
- memory_drift: +1 @ c4_s01_mirror/touch_mirror; +2 @ c4_s01b_wrong_memory/accept_false_memory; +1 @ c4_interlude_01_lights/continue; +1 @ c4_s02_recorder_prophecy/listen_to_prophecy; +1 @ c4_s02a_recording_self/rewind_and_listen; +1 @ c4_interlude_02_announcement/continue; +1 @ c4_interlude_03_window/continue; +1 @ c4_s04_announcement_glitch/check_own_name; +2 @ c4_s04a_name_confusion/accept_loss; +1 @ c4_s06_comp7_memory/ask_about_future; +1 @ c4_s06a_shared_memory/accept_memory; +2 @ c4_s07_reality_fracture/let_go; +1 @ c4_end_station/continue_to_chapter_5
- tickets_escape: +1 @ c4_s01b_wrong_memory/accept_false_memory; +2 @ c4_s04a_name_confusion/accept_loss; +2 @ c4_s07_reality_fracture/let_go
- rel_sleepless: +1 @ c4_s03_passengers_return/talk_to_sleepless
- rel_comp7: +1 @ c4_s05_comp7_call/go_to_wagen7; +2 @ c4_s05a_wagen7_changed/comfort_comp7; +2 @ c4_s06a_shared_memory/accept_memory
- tickets_love: +2 @ c4_s05a_wagen7_changed/comfort_comp7; +2 @ c4_s06a_shared_memory/accept_memory
- conductor_attention: +1 @ c4_s07c_tag19_found/take_tag19
- has_tag19: +1 @ c4_s07c_tag19_found/take_tag19
- chapter_index: +1 @ c4_end_station/continue_to_chapter_5
- station_count: +1 @ c4_end_station/continue_to_chapter_5
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c4_s01a_double_reflection, c4_interlude_03_window; tickets_escape -> c4_s05a_wagen7_changed; tickets_truth -> c4_s06_comp7_memory
Konsequenzen: spaeter: tickets_truth -> c4_s06_comp7_memory, c5_s07_abteil7_inside; tickets_escape -> c4_s05a_wagen7_changed, c6_s13_mirror_choice; memory_drift -> c4_interlude_03_window, c5_s04_lights_flicker; rel_comp7 -> c5_s15_control3_question; tickets_love -> c5_s19_final_conversation; conductor_attention -> c5_s15_control3_question; has_tag19 -> c5_s10_boy_reunion
Konsequenzen: keine: rel_sleepless; chapter_index; station_count

### Pfad (dumb)
Path-Log: c4_s01_mirror:touch_mirror -> c4_s01a_double_reflection:leave_quickly -> c4_interlude_01_lights:continue -> c4_s02_recorder_prophecy:no_recorder -> c4_interlude_02_announcement:continue -> c4_s03_passengers_return:ignore_all -> c4_interlude_03_window:continue -> c4_s04_announcement_glitch:ignore_announcement -> c4_interlude_04_corridor:continue -> c4_s05_comp7_call:refuse_call -> c4_interlude_05_time:continue -> c4_s06_comp7_memory:ask_about_future -> c4_s06a_shared_memory:reject_memory -> c4_s07_reality_fracture:let_go -> c4_s07a_drift_peak:run_away -> c4_s07b_stabilization:examine_object -> c4_s07c_tag19_found:take_tag19 -> c4_end_platform_watch:observe_copies -> c4_end_station:continue_to_chapter_5

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c4_s01_mirror/touch_mirror; +2 @ c4_s06_comp7_memory/ask_about_future; +1 @ c4_s06a_shared_memory/reject_memory; +1 @ c4_s07b_stabilization/examine_object; +1 @ c4_s07c_tag19_found/take_tag19; +1 @ c4_end_platform_watch/observe_copies
- memory_drift: +1 @ c4_s01_mirror/touch_mirror; +1 @ c4_interlude_01_lights/continue; +1 @ c4_interlude_02_announcement/continue; +1 @ c4_interlude_03_window/continue; +1 @ c4_interlude_04_corridor/continue; +2 @ c4_s05_comp7_call/refuse_call; +2 @ c4_interlude_05_time/continue; +1 @ c4_s06_comp7_memory/ask_about_future; +2 @ c4_s07_reality_fracture/let_go; +1 @ c4_s07a_drift_peak/run_away; +1 @ c4_end_station/continue_to_chapter_5
- tickets_escape: +1 @ c4_s01a_double_reflection/leave_quickly; +1 @ c4_s02_recorder_prophecy/no_recorder; +1 @ c4_s03_passengers_return/ignore_all; +1 @ c4_s04_announcement_glitch/ignore_announcement; +1 @ c4_s05_comp7_call/refuse_call; +2 @ c4_s07_reality_fracture/let_go; +1 @ c4_s07a_drift_peak/run_away
- conductor_attention: +1 @ c4_s04_announcement_glitch/ignore_announcement; +1 @ c4_s07c_tag19_found/take_tag19
- rel_comp7: -1 @ c4_s05_comp7_call/refuse_call
- has_tag19: +1 @ c4_s07c_tag19_found/take_tag19
- chapter_index: +1 @ c4_end_station/continue_to_chapter_5
- station_count: +1 @ c4_end_station/continue_to_chapter_5
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c4_s01a_double_reflection, c4_interlude_03_window, c4_interlude_05_time
Konsequenzen: spaeter: tickets_truth -> c4_s06_comp7_memory, c5_s07_abteil7_inside; tickets_escape -> c6_s13_mirror_choice; memory_drift -> c4_interlude_03_window, c4_interlude_05_time, c5_s04_lights_flicker; conductor_attention -> c5_s15_control3_question; rel_comp7 -> c5_s15_control3_question; has_tag19 -> c5_s10_boy_reunion
Konsequenzen: keine: chapter_index; station_count

### Pfad (max_risk)
Path-Log: c4_s01_mirror:touch_mirror -> c4_s01a_double_reflection:try_to_understand -> c4_s01b_wrong_memory:accept_false_memory -> c4_interlude_01_lights:continue -> c4_s02_recorder_prophecy:no_recorder -> c4_interlude_02_announcement:continue -> c4_s03_passengers_return:ignore_all -> c4_interlude_03_window:continue -> c4_s04_announcement_glitch:ignore_announcement -> c4_interlude_04_corridor:continue -> c4_s05_comp7_call:refuse_call -> c4_interlude_05_time:continue -> c4_s06_comp7_memory:ask_about_future -> c4_s06a_shared_memory:accept_memory -> c4_s07_reality_fracture:let_go -> c4_s07a_drift_peak:run_away -> c4_s07b_stabilization:examine_object -> c4_s07c_tag19_found:take_tag19 -> c4_end_platform_watch:observe_copies -> c4_end_station:continue_to_chapter_5

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c4_s01_mirror/touch_mirror; +2 @ c4_s01a_double_reflection/try_to_understand; +2 @ c4_s06_comp7_memory/ask_about_future; +1 @ c4_s07b_stabilization/examine_object; +1 @ c4_s07c_tag19_found/take_tag19; +1 @ c4_end_platform_watch/observe_copies
- memory_drift: +1 @ c4_s01_mirror/touch_mirror; +2 @ c4_s01b_wrong_memory/accept_false_memory; +1 @ c4_interlude_01_lights/continue; +1 @ c4_interlude_02_announcement/continue; +1 @ c4_interlude_03_window/continue; +1 @ c4_interlude_04_corridor/continue; +2 @ c4_s05_comp7_call/refuse_call; +2 @ c4_interlude_05_time/continue; +1 @ c4_s06_comp7_memory/ask_about_future; +1 @ c4_s06a_shared_memory/accept_memory; +2 @ c4_s07_reality_fracture/let_go; +1 @ c4_s07a_drift_peak/run_away; +1 @ c4_end_station/continue_to_chapter_5
- tickets_escape: +1 @ c4_s01b_wrong_memory/accept_false_memory; +1 @ c4_s02_recorder_prophecy/no_recorder; +1 @ c4_s03_passengers_return/ignore_all; +1 @ c4_s04_announcement_glitch/ignore_announcement; +1 @ c4_s05_comp7_call/refuse_call; +2 @ c4_s07_reality_fracture/let_go; +1 @ c4_s07a_drift_peak/run_away
- conductor_attention: +1 @ c4_s04_announcement_glitch/ignore_announcement; +1 @ c4_s07c_tag19_found/take_tag19
- rel_comp7: -1 @ c4_s05_comp7_call/refuse_call; +2 @ c4_s06a_shared_memory/accept_memory
- tickets_love: +2 @ c4_s06a_shared_memory/accept_memory
- has_tag19: +1 @ c4_s07c_tag19_found/take_tag19
- chapter_index: +1 @ c4_end_station/continue_to_chapter_5
- station_count: +1 @ c4_end_station/continue_to_chapter_5
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c4_s01a_double_reflection, c4_interlude_03_window, c4_interlude_05_time
Konsequenzen: spaeter: tickets_truth -> c4_s06_comp7_memory, c5_s07_abteil7_inside; tickets_escape -> c6_s13_mirror_choice; memory_drift -> c4_interlude_03_window, c4_interlude_05_time, c5_s04_lights_flicker; conductor_attention -> c5_s15_control3_question; rel_comp7 -> c5_s15_control3_question; tickets_love -> c5_s19_final_conversation; has_tag19 -> c5_s10_boy_reunion
Konsequenzen: keine: chapter_index; station_count

## Kapitel 5

### Pfad (risk_averse)
Path-Log: c5_s01_final_preparation:rest_prepare -> c5_s02_corridor_silence:continue_forward -> c5_s03_comp7_reflection:stay_silent -> c5_s04_lights_flicker:investigate -> c5_s05_sleepless_final:comfort_him -> c5_s06_abteil7_approach:walk_past -> c5_s08_abteil7_aftermath:let_it_go -> c5_s09_train_shifts:continue_on -> c5_s10_boy_reunion:admit_lost_recorder -> c5_s11_corridor_encounter:retreat_to_compartment -> c5_s12_window_void:accept_void -> c5_s13_memory_fragment:let_memory_fade -> c5_s14_control3_approach:show_uncertainty -> c5_s15_control3_question:admit_truth_high -> c5_s16_control3_aftermath:rest_after_control -> c5_s17_aftermath_reflection:reject_staying -> c5_s18_darkness_spreads:keep_walking -> c5_s19_final_conversation:silent_farewell -> c5_s20_decision_approach:resist_arrival -> c5_s21_decision_core:drift_variant_stay -> c5_s22_decision_aftermath:accept_choice -> c5_s23_before_station:look_forward -> c5_s24_platform_arrives:prepare_to_exit -> c5_end_station:enter_wagon_12

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c5_s01_final_preparation/rest_prepare; +1 @ c5_s03_comp7_reflection/stay_silent; +1 @ c5_s06_abteil7_approach/walk_past; +1 @ c5_s08_abteil7_aftermath/let_it_go; +1 @ c5_s11_corridor_encounter/retreat_to_compartment; +1 @ c5_s12_window_void/accept_void; +1 @ c5_s13_memory_fragment/let_memory_fade; +1 @ c5_s14_control3_approach/show_uncertainty; +1 @ c5_s16_control3_aftermath/rest_after_control; +1 @ c5_s19_final_conversation/silent_farewell; +1 @ c5_s20_decision_approach/resist_arrival; +3 @ c5_s21_decision_core/drift_variant_stay
- memory_drift: +1 @ c5_s02_corridor_silence/continue_forward; -1 @ c5_s08_abteil7_aftermath/let_it_go; +1 @ c5_s12_window_void/accept_void; -1 @ c5_s13_memory_fragment/let_memory_fade; +1 @ c5_s18_darkness_spreads/keep_walking
- rel_comp7: -1 @ c5_s03_comp7_reflection/stay_silent
- tickets_truth: +1 @ c5_s04_lights_flicker/investigate; +1 @ c5_s10_boy_reunion/admit_lost_recorder; +1 @ c5_s17_aftermath_reflection/reject_staying; +1 @ c5_s22_decision_aftermath/accept_choice; +1 @ c5_s23_before_station/look_forward; +1 @ c5_end_station/enter_wagon_12
- conductor_attention: +1 @ c5_s04_lights_flicker/investigate; -1 @ c5_s06_abteil7_approach/walk_past; -1 @ c5_s11_corridor_encounter/retreat_to_compartment; -2 @ c5_s15_control3_question/admit_truth_high; -1 @ c5_s16_control3_aftermath/rest_after_control
- tickets_love: +1 @ c5_s05_sleepless_final/comfort_him
- rel_sleepless: +1 @ c5_s05_sleepless_final/comfort_him
- station_count: +1 @ c5_s09_train_shifts/continue_on; +1 @ c5_s24_platform_arrives/prepare_to_exit; +1 @ c5_end_station/enter_wagon_12
- rel_boy: +1 @ c5_s10_boy_reunion/admit_lost_recorder
- tickets_guilt: +3 @ c5_s15_control3_question/admit_truth_high
- chapter_index: +1 @ c5_end_station/enter_wagon_12
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c5_s04_lights_flicker, c5_s09_train_shifts, c5_s15_control3_question, c5_s21_decision_core; tickets_truth -> c5_end_station
Konsequenzen: spaeter: tickets_escape -> c6_s13_mirror_choice; rel_comp7 -> c5_s15_control3_question; tickets_truth -> c5_s15_control3_question, c5_end_station, c6_s05_door_seven; conductor_attention -> c5_s15_control3_question, c6_s18_offer_approach; tickets_love -> c5_s19_final_conversation; rel_boy -> c7_s04_boy_transformation; tickets_guilt -> c5_s21_decision_core
Konsequenzen: keine: rel_sleepless; station_count; chapter_index

### Pfad (confrontational)
Path-Log: c5_s01_final_preparation:check_recorder -> c5_s02_corridor_silence:continue_forward -> c5_s03_comp7_reflection:ask_about_compartment7 -> c5_s04_lights_flicker:investigate -> c5_s05_sleepless_final:tell_truth -> c5_s06_abteil7_approach:open_door -> c5_s07_abteil7_inside:read_names_truth -> c5_s08_abteil7_aftermath:try_to_remember -> c5_s09_train_shifts:continue_on -> c5_s10_boy_reunion:show_tag19 -> c5_s11_corridor_encounter:approach_conductor -> c5_s12_window_void:accept_void -> c5_s13_memory_fragment:chase_memory -> c5_s14_control3_approach:show_confidence -> c5_s15_control3_question:harsh_response -> c5_s16_control3_aftermath:examine_ticket -> c5_s17_aftermath_reflection:reject_staying -> c5_s18_darkness_spreads:keep_walking -> c5_s19_final_conversation:ask_final_question -> c5_s20_decision_approach:prepare_to_decide -> c5_s21_decision_core:step_out_truth -> c5_s22_decision_aftermath:accept_choice -> c5_s23_before_station:look_forward -> c5_s24_platform_arrives:prepare_to_exit -> c5_end_station:enter_wagon_12

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c5_s01_final_preparation/check_recorder; +2 @ c5_s03_comp7_reflection/ask_about_compartment7; +1 @ c5_s04_lights_flicker/investigate; +1 @ c5_s05_sleepless_final/tell_truth; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +2 @ c5_s10_boy_reunion/show_tag19; +1 @ c5_s11_corridor_encounter/approach_conductor; +2 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s14_control3_approach/show_confidence; +1 @ c5_s15_control3_question/harsh_response; +1 @ c5_s16_control3_aftermath/examine_ticket; +1 @ c5_s17_aftermath_reflection/reject_staying; +1 @ c5_s19_final_conversation/ask_final_question; +1 @ c5_s20_decision_approach/prepare_to_decide; +2 @ c5_s21_decision_core/step_out_truth; +1 @ c5_s22_decision_aftermath/accept_choice; +1 @ c5_s23_before_station/look_forward; +1 @ c5_end_station/enter_wagon_12
- memory_drift: +1 @ c5_s02_corridor_silence/continue_forward; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +1 @ c5_s12_window_void/accept_void; +1 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s18_darkness_spreads/keep_walking
- conductor_attention: +1 @ c5_s03_comp7_reflection/ask_about_compartment7; +1 @ c5_s04_lights_flicker/investigate; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s11_corridor_encounter/approach_conductor; +1 @ c5_s14_control3_approach/show_confidence; +2 @ c5_s15_control3_question/harsh_response
- rel_sleepless: -1 @ c5_s05_sleepless_final/tell_truth
- station_count: +1 @ c5_s09_train_shifts/continue_on; +1 @ c5_s24_platform_arrives/prepare_to_exit; +1 @ c5_end_station/enter_wagon_12
- rel_boy: +1 @ c5_s10_boy_reunion/show_tag19
- tickets_escape: +1 @ c5_s12_window_void/accept_void
- rel_comp7: +1 @ c5_s19_final_conversation/ask_final_question
- chapter_index: +1 @ c5_end_station/enter_wagon_12
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c5_s04_lights_flicker, c5_s09_train_shifts, c5_s15_control3_question, c5_s21_decision_core; tickets_truth -> c5_s07_abteil7_inside, c5_s15_control3_question, c5_end_station; conductor_attention -> c5_s15_control3_question
Konsequenzen: spaeter: tickets_truth -> c5_s07_abteil7_inside, c5_s15_control3_question, c5_end_station, c6_s05_door_seven; conductor_attention -> c5_s15_control3_question, c6_s18_offer_approach; rel_boy -> c7_s04_boy_transformation; tickets_escape -> c6_s13_mirror_choice; rel_comp7 -> c6_s03_comp7_final
Konsequenzen: keine: rel_sleepless; station_count; chapter_index

### Pfad (opportunistic)
Path-Log: c5_s01_final_preparation:check_recorder -> c5_s02_corridor_silence:continue_forward -> c5_s03_comp7_reflection:ask_about_compartment7 -> c5_s04_lights_flicker:investigate -> c5_s05_sleepless_final:comfort_him -> c5_s06_abteil7_approach:open_door -> c5_s07_abteil7_inside:read_names_truth -> c5_s08_abteil7_aftermath:try_to_remember -> c5_s09_train_shifts:continue_on -> c5_s10_boy_reunion:show_recorder_connection -> c5_s11_corridor_encounter:approach_conductor -> c5_s12_window_void:accept_void -> c5_s13_memory_fragment:chase_memory -> c5_s14_control3_approach:show_confidence -> c5_s15_control3_question:admit_truth_high -> c5_s16_control3_aftermath:examine_ticket -> c5_s17_aftermath_reflection:consider_staying -> c5_s18_darkness_spreads:keep_walking -> c5_s19_final_conversation:love_farewell -> c5_s20_decision_approach:prepare_to_decide -> c5_s21_decision_core:drift_variant_stay -> c5_s22_decision_aftermath:accept_choice -> c5_s23_before_station:look_forward -> c5_s24_platform_arrives:prepare_to_exit -> c5_end_station:enter_wagon_12

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c5_s01_final_preparation/check_recorder; +2 @ c5_s03_comp7_reflection/ask_about_compartment7; +1 @ c5_s04_lights_flicker/investigate; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +1 @ c5_s11_corridor_encounter/approach_conductor; +2 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s14_control3_approach/show_confidence; +1 @ c5_s16_control3_aftermath/examine_ticket; +1 @ c5_s20_decision_approach/prepare_to_decide; +1 @ c5_s22_decision_aftermath/accept_choice; +1 @ c5_s23_before_station/look_forward; +1 @ c5_end_station/enter_wagon_12
- memory_drift: +1 @ c5_s02_corridor_silence/continue_forward; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +1 @ c5_s12_window_void/accept_void; +1 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s17_aftermath_reflection/consider_staying; +1 @ c5_s18_darkness_spreads/keep_walking
- conductor_attention: +1 @ c5_s03_comp7_reflection/ask_about_compartment7; +1 @ c5_s04_lights_flicker/investigate; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s11_corridor_encounter/approach_conductor; +1 @ c5_s14_control3_approach/show_confidence; -2 @ c5_s15_control3_question/admit_truth_high
- tickets_love: +1 @ c5_s05_sleepless_final/comfort_him; +2 @ c5_s10_boy_reunion/show_recorder_connection; +2 @ c5_s19_final_conversation/love_farewell
- rel_sleepless: +1 @ c5_s05_sleepless_final/comfort_him
- station_count: +1 @ c5_s09_train_shifts/continue_on; +1 @ c5_s24_platform_arrives/prepare_to_exit; +1 @ c5_end_station/enter_wagon_12
- rel_boy: +2 @ c5_s10_boy_reunion/show_recorder_connection
- tickets_escape: +1 @ c5_s12_window_void/accept_void; +2 @ c5_s17_aftermath_reflection/consider_staying; +3 @ c5_s21_decision_core/drift_variant_stay
- tickets_guilt: +3 @ c5_s15_control3_question/admit_truth_high
- rel_comp7: +2 @ c5_s19_final_conversation/love_farewell
- chapter_index: +1 @ c5_end_station/enter_wagon_12
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c5_s04_lights_flicker, c5_s09_train_shifts, c5_s15_control3_question, c5_s21_decision_core; tickets_truth -> c5_s07_abteil7_inside, c5_s15_control3_question, c5_end_station; conductor_attention -> c5_s15_control3_question
Konsequenzen: spaeter: tickets_truth -> c5_s07_abteil7_inside, c5_s15_control3_question, c5_end_station, c6_s05_door_seven; conductor_attention -> c5_s15_control3_question, c6_s18_offer_approach; tickets_love -> c5_s19_final_conversation, c6_s19_offer_choice; rel_boy -> c7_s04_boy_transformation; tickets_escape -> c6_s13_mirror_choice; tickets_guilt -> c5_s21_decision_core; memory_drift -> c5_s21_decision_core; rel_comp7 -> c6_s03_comp7_final
Konsequenzen: keine: rel_sleepless; station_count; chapter_index

### Pfad (dumb)
Path-Log: c5_s01_final_preparation:rest_prepare -> c5_s02_corridor_silence:continue_forward -> c5_s03_comp7_reflection:stay_silent -> c5_s04_lights_flicker:investigate -> c5_s05_sleepless_final:tell_truth -> c5_s06_abteil7_approach:open_door -> c5_s07_abteil7_inside:read_names_truth -> c5_s08_abteil7_aftermath:try_to_remember -> c5_s09_train_shifts:continue_on -> c5_s10_boy_reunion:admit_lost_recorder -> c5_s11_corridor_encounter:approach_conductor -> c5_s12_window_void:accept_void -> c5_s13_memory_fragment:chase_memory -> c5_s14_control3_approach:show_uncertainty -> c5_s15_control3_question:harsh_response -> c5_s16_control3_aftermath:examine_ticket -> c5_s17_aftermath_reflection:consider_staying -> c5_s18_darkness_spreads:keep_walking -> c5_s19_final_conversation:silent_farewell -> c5_s20_decision_approach:prepare_to_decide -> c5_s21_decision_core:stay_in_train -> c5_s22_decision_aftermath:accept_choice -> c5_s23_before_station:look_forward -> c5_s24_platform_arrives:prepare_to_exit -> c5_end_station:enter_wagon_12

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c5_s01_final_preparation/rest_prepare; +1 @ c5_s03_comp7_reflection/stay_silent; +1 @ c5_s12_window_void/accept_void; +1 @ c5_s14_control3_approach/show_uncertainty; +2 @ c5_s17_aftermath_reflection/consider_staying; +1 @ c5_s19_final_conversation/silent_farewell; +2 @ c5_s21_decision_core/stay_in_train
- memory_drift: +1 @ c5_s02_corridor_silence/continue_forward; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +1 @ c5_s12_window_void/accept_void; +1 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s17_aftermath_reflection/consider_staying; +1 @ c5_s18_darkness_spreads/keep_walking
- rel_comp7: -1 @ c5_s03_comp7_reflection/stay_silent
- tickets_truth: +1 @ c5_s04_lights_flicker/investigate; +1 @ c5_s05_sleepless_final/tell_truth; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +1 @ c5_s10_boy_reunion/admit_lost_recorder; +1 @ c5_s11_corridor_encounter/approach_conductor; +2 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s15_control3_question/harsh_response; +1 @ c5_s16_control3_aftermath/examine_ticket; +1 @ c5_s20_decision_approach/prepare_to_decide; +1 @ c5_s22_decision_aftermath/accept_choice; +1 @ c5_s23_before_station/look_forward; +1 @ c5_end_station/enter_wagon_12
- conductor_attention: +1 @ c5_s04_lights_flicker/investigate; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s11_corridor_encounter/approach_conductor; +2 @ c5_s15_control3_question/harsh_response
- rel_sleepless: -1 @ c5_s05_sleepless_final/tell_truth
- station_count: +1 @ c5_s09_train_shifts/continue_on; +1 @ c5_s24_platform_arrives/prepare_to_exit; +1 @ c5_end_station/enter_wagon_12
- rel_boy: +1 @ c5_s10_boy_reunion/admit_lost_recorder
- chapter_index: +1 @ c5_end_station/enter_wagon_12
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c5_s04_lights_flicker, c5_s09_train_shifts, c5_s15_control3_question, c5_s21_decision_core; tickets_truth -> c5_s07_abteil7_inside, c5_s15_control3_question, c5_end_station
Konsequenzen: spaeter: tickets_escape -> c6_s13_mirror_choice; rel_comp7 -> c5_s15_control3_question; conductor_attention -> c5_s15_control3_question, c6_s18_offer_approach; tickets_truth -> c5_s15_control3_question, c5_end_station, c6_s05_door_seven; rel_boy -> c7_s04_boy_transformation; memory_drift -> c5_s21_decision_core
Konsequenzen: keine: rel_sleepless; station_count; chapter_index

### Pfad (max_risk)
Path-Log: c5_s01_final_preparation:rest_prepare -> c5_s02_corridor_silence:continue_forward -> c5_s03_comp7_reflection:ask_about_compartment7 -> c5_s04_lights_flicker:investigate -> c5_s05_sleepless_final:leave_quietly -> c5_s06_abteil7_approach:open_door -> c5_s07_abteil7_inside:read_names_truth -> c5_s08_abteil7_aftermath:try_to_remember -> c5_s09_train_shifts:continue_on -> c5_s10_boy_reunion:admit_lost_recorder -> c5_s11_corridor_encounter:approach_conductor -> c5_s12_window_void:accept_void -> c5_s13_memory_fragment:chase_memory -> c5_s14_control3_approach:show_confidence -> c5_s15_control3_question:harsh_response -> c5_s16_control3_aftermath:examine_ticket -> c5_s17_aftermath_reflection:consider_staying -> c5_s18_darkness_spreads:keep_walking -> c5_s19_final_conversation:silent_farewell -> c5_s20_decision_approach:prepare_to_decide -> c5_s21_decision_core:drift_variant_stay -> c5_s22_decision_aftermath:accept_choice -> c5_s23_before_station:look_forward -> c5_s24_platform_arrives:prepare_to_exit -> c5_end_station:enter_wagon_12

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c5_s01_final_preparation/rest_prepare; +1 @ c5_s05_sleepless_final/leave_quietly; +1 @ c5_s12_window_void/accept_void; +2 @ c5_s17_aftermath_reflection/consider_staying; +1 @ c5_s19_final_conversation/silent_farewell; +3 @ c5_s21_decision_core/drift_variant_stay
- memory_drift: +1 @ c5_s02_corridor_silence/continue_forward; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +1 @ c5_s12_window_void/accept_void; +1 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s17_aftermath_reflection/consider_staying; +1 @ c5_s18_darkness_spreads/keep_walking
- tickets_truth: +2 @ c5_s03_comp7_reflection/ask_about_compartment7; +1 @ c5_s04_lights_flicker/investigate; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s07_abteil7_inside/read_names_truth; +1 @ c5_s08_abteil7_aftermath/try_to_remember; +1 @ c5_s10_boy_reunion/admit_lost_recorder; +1 @ c5_s11_corridor_encounter/approach_conductor; +2 @ c5_s13_memory_fragment/chase_memory; +1 @ c5_s14_control3_approach/show_confidence; +1 @ c5_s15_control3_question/harsh_response; +1 @ c5_s16_control3_aftermath/examine_ticket; +1 @ c5_s20_decision_approach/prepare_to_decide; +1 @ c5_s22_decision_aftermath/accept_choice; +1 @ c5_s23_before_station/look_forward; +1 @ c5_end_station/enter_wagon_12
- conductor_attention: +1 @ c5_s03_comp7_reflection/ask_about_compartment7; +1 @ c5_s04_lights_flicker/investigate; +2 @ c5_s06_abteil7_approach/open_door; +2 @ c5_s11_corridor_encounter/approach_conductor; +1 @ c5_s14_control3_approach/show_confidence; +2 @ c5_s15_control3_question/harsh_response
- rel_sleepless: -2 @ c5_s05_sleepless_final/leave_quietly
- station_count: +1 @ c5_s09_train_shifts/continue_on; +1 @ c5_s24_platform_arrives/prepare_to_exit; +1 @ c5_end_station/enter_wagon_12
- rel_boy: +1 @ c5_s10_boy_reunion/admit_lost_recorder
- chapter_index: +1 @ c5_end_station/enter_wagon_12
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c5_s04_lights_flicker, c5_s09_train_shifts, c5_s15_control3_question, c5_s21_decision_core; tickets_truth -> c5_s07_abteil7_inside, c5_s15_control3_question, c5_end_station; conductor_attention -> c5_s15_control3_question
Konsequenzen: spaeter: tickets_escape -> c6_s13_mirror_choice; tickets_truth -> c5_s07_abteil7_inside, c5_s15_control3_question, c5_end_station, c6_s05_door_seven; conductor_attention -> c5_s15_control3_question, c6_s18_offer_approach; rel_boy -> c7_s04_boy_transformation; memory_drift -> c5_s21_decision_core
Konsequenzen: keine: rel_sleepless; station_count; chapter_index

## Kapitel 6

### Pfad (risk_averse)
Path-Log: c6_s01_awakening:close_eyes -> c6_s02_silence:continue_walking -> c6_s03_comp7_final:stay_silent -> c6_s04_corridor_changes:approach_door -> c6_s05_door_seven:walk_away -> c6_s07_seven_aftermath:process_experience -> c6_s08_drift_intensifies:observe_changes -> c6_s09_boy_final:comfort_without_recorder -> c6_s10_sleepless_gone:leave_photo -> c6_s11_announcement:process_message -> c6_s12_mirror_self:turn_away -> c6_s13_mirror_choice:refuse_hand -> c6_s14_mirror_aftermath:embrace_memory -> c6_s15_recorder_playback:resist_playing -> c6_s16_tag19_discovery:ignore_implications -> c6_s17_lights_failing:wait_for_conductor -> c6_s18_offer_approach:refuse_immediately -> c6_s19_offer_choice:choose_forget_escape -> c6_s20_offer_aftermath:prepare_for_end -> c6_s21_final_reflection:feel_afraid -> c6_s22_conductor_last:resist_memory -> c6_s23_train_slows:observe_platform -> c6_s24_platform_ahead:feel_hope -> c6_s25_final_moment:open_door -> c6_end_station:continue_to_chapter_7

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c6_s01_awakening/close_eyes; +1 @ c6_s03_comp7_final/stay_silent; +2 @ c6_s05_door_seven/walk_away; +1 @ c6_s10_sleepless_gone/leave_photo; +1 @ c6_s12_mirror_self/turn_away; +1 @ c6_s13_mirror_choice/refuse_hand; +1 @ c6_s15_recorder_playback/resist_playing; +1 @ c6_s16_tag19_discovery/ignore_implications; +1 @ c6_s18_offer_approach/refuse_immediately; +3 @ c6_s19_offer_choice/choose_forget_escape; +1 @ c6_s21_final_reflection/feel_afraid; +1 @ c6_s22_conductor_last/resist_memory
- memory_drift: +1 @ c6_s02_silence/continue_walking; +1 @ c6_s08_drift_intensifies/observe_changes; +1 @ c6_s11_announcement/process_message
- tickets_truth: +1 @ c6_s04_corridor_changes/approach_door; +1 @ c6_s07_seven_aftermath/process_experience; +1 @ c6_s08_drift_intensifies/observe_changes; +1 @ c6_s11_announcement/process_message; +1 @ c6_s14_mirror_aftermath/embrace_memory; +1 @ c6_s20_offer_aftermath/prepare_for_end; +1 @ c6_s23_train_slows/observe_platform
- tickets_guilt: +1 @ c6_s07_seven_aftermath/process_experience; +1 @ c6_s14_mirror_aftermath/embrace_memory
- tickets_love: +1 @ c6_s09_boy_final/comfort_without_recorder; +1 @ c6_s24_platform_ahead/feel_hope
- rel_boy: +1 @ c6_s09_boy_final/comfort_without_recorder
- conductor_attention: +1 @ c6_s17_lights_failing/wait_for_conductor
- station_count: +1 @ c6_s25_final_moment/open_door; +1 @ c6_end_station/continue_to_chapter_7
- chapter_index: +1 @ c6_end_station/continue_to_chapter_7
Konsequenzen: innerhalb 1-3 Szenen: tickets_truth -> c6_s05_door_seven; memory_drift -> c6_s11_announcement, c6_s12_mirror_self; tickets_escape -> c6_s13_mirror_choice, c6_s19_offer_choice; conductor_attention -> c6_s18_offer_approach
Konsequenzen: spaeter: tickets_escape -> c6_s13_mirror_choice, c6_s19_offer_choice, c7_s13_seven_price; memory_drift -> c6_s11_announcement; tickets_truth -> c7_s07_announcement_name; tickets_guilt -> c6_s13_mirror_choice, c7_s13_seven_price; tickets_love -> c6_s19_offer_choice, c7_s13_seven_price; rel_boy -> c7_s04_boy_transformation
Konsequenzen: keine: station_count; chapter_index

### Pfad (confrontational)
Path-Log: c6_s01_awakening:check_surroundings -> c6_s02_silence:continue_walking -> c6_s03_comp7_final:ask_directly_high_rel -> c6_s04_corridor_changes:approach_door -> c6_s05_door_seven:open_door_truth -> c6_s06_inside_seven:remember_hard -> c6_s07_seven_aftermath:process_experience -> c6_s08_drift_intensifies:observe_changes -> c6_s09_boy_final:tell_truth_harsh -> c6_s10_sleepless_gone:examine_closely -> c6_s11_announcement:process_message -> c6_s12_mirror_self:confront_drift -> c6_s13_mirror_choice:take_hand_guilt -> c6_s14_mirror_aftermath:embrace_memory -> c6_s15_recorder_playback:play_recorder -> c6_s16_tag19_discovery:understand_tag -> c6_s17_lights_failing:wait_for_conductor -> c6_s18_offer_approach:ask_about_offer_high_attention -> c6_s19_offer_choice:refuse_choice -> c6_s20_offer_aftermath:prepare_for_end -> c6_s21_final_reflection:feel_ready -> c6_s22_conductor_last:remember_high_attention -> c6_s23_train_slows:observe_platform -> c6_s24_platform_ahead:feel_peace -> c6_s25_final_moment:open_door -> c6_end_station:continue_to_chapter_7

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c6_s01_awakening/check_surroundings; +2 @ c6_s03_comp7_final/ask_directly_high_rel; +1 @ c6_s04_corridor_changes/approach_door; +2 @ c6_s05_door_seven/open_door_truth; +3 @ c6_s06_inside_seven/remember_hard; +1 @ c6_s07_seven_aftermath/process_experience; +1 @ c6_s08_drift_intensifies/observe_changes; +1 @ c6_s09_boy_final/tell_truth_harsh; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +2 @ c6_s12_mirror_self/confront_drift; +3 @ c6_s13_mirror_choice/take_hand_guilt; +1 @ c6_s14_mirror_aftermath/embrace_memory; +3 @ c6_s15_recorder_playback/play_recorder; +3 @ c6_s16_tag19_discovery/understand_tag; +2 @ c6_s18_offer_approach/ask_about_offer_high_attention; +2 @ c6_s19_offer_choice/refuse_choice; +1 @ c6_s20_offer_aftermath/prepare_for_end; +1 @ c6_s21_final_reflection/feel_ready; +3 @ c6_s22_conductor_last/remember_high_attention; +1 @ c6_s23_train_slows/observe_platform; +1 @ c6_s24_platform_ahead/feel_peace
- memory_drift: +1 @ c6_s01_awakening/check_surroundings; +1 @ c6_s02_silence/continue_walking; +1 @ c6_s06_inside_seven/remember_hard; +1 @ c6_s08_drift_intensifies/observe_changes; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +1 @ c6_s12_mirror_self/confront_drift; +1 @ c6_s15_recorder_playback/play_recorder; +2 @ c6_s16_tag19_discovery/understand_tag
- rel_comp7: +1 @ c6_s03_comp7_final/ask_directly_high_rel
- conductor_attention: +1 @ c6_s05_door_seven/open_door_truth; +1 @ c6_s17_lights_failing/wait_for_conductor; +2 @ c6_s19_offer_choice/refuse_choice
- tickets_guilt: +1 @ c6_s06_inside_seven/remember_hard; +1 @ c6_s07_seven_aftermath/process_experience; +1 @ c6_s13_mirror_choice/take_hand_guilt; +1 @ c6_s14_mirror_aftermath/embrace_memory; +2 @ c6_s15_recorder_playback/play_recorder; +2 @ c6_s22_conductor_last/remember_high_attention
- rel_boy: -1 @ c6_s09_boy_final/tell_truth_harsh
- station_count: +1 @ c6_s25_final_moment/open_door; +1 @ c6_end_station/continue_to_chapter_7
- chapter_index: +1 @ c6_end_station/continue_to_chapter_7
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c6_s02_silence, c6_s11_announcement, c6_s12_mirror_self, c6_s17_lights_failing; tickets_truth -> c6_s05_door_seven, c6_s06_inside_seven; conductor_attention -> c6_s18_offer_approach, c6_s22_conductor_last
Konsequenzen: spaeter: tickets_truth -> c6_s05_door_seven, c7_s07_announcement_name; memory_drift -> c6_s06_inside_seven, c6_s11_announcement, c6_s17_lights_failing; rel_comp7 -> c7_s03_comp7_goodbye; conductor_attention -> c6_s18_offer_approach; tickets_guilt -> c6_s13_mirror_choice, c7_s13_seven_price; rel_boy -> c7_s04_boy_transformation
Konsequenzen: keine: station_count; chapter_index

### Pfad (opportunistic)
Path-Log: c6_s01_awakening:check_surroundings -> c6_s02_silence:continue_walking -> c6_s03_comp7_final:ask_directly_high_rel -> c6_s04_corridor_changes:approach_door -> c6_s05_door_seven:open_door_truth -> c6_s06_inside_seven:remember_hard -> c6_s07_seven_aftermath:process_experience -> c6_s08_drift_intensifies:observe_changes -> c6_s09_boy_final:share_recorder_experience -> c6_s10_sleepless_gone:examine_closely -> c6_s11_announcement:process_message -> c6_s12_mirror_self:confront_drift -> c6_s13_mirror_choice:take_hand_escape -> c6_s14_mirror_aftermath:embrace_memory -> c6_s15_recorder_playback:play_recorder -> c6_s16_tag19_discovery:understand_tag -> c6_s17_lights_failing:wait_for_conductor -> c6_s18_offer_approach:ask_about_offer_high_attention -> c6_s19_offer_choice:choose_memory_love -> c6_s20_offer_aftermath:prepare_for_end -> c6_s21_final_reflection:feel_ready -> c6_s22_conductor_last:remember_high_attention -> c6_s23_train_slows:observe_platform -> c6_s24_platform_ahead:feel_hope -> c6_s25_final_moment:open_door -> c6_end_station:continue_to_chapter_7

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c6_s01_awakening/check_surroundings; +2 @ c6_s03_comp7_final/ask_directly_high_rel; +1 @ c6_s04_corridor_changes/approach_door; +2 @ c6_s05_door_seven/open_door_truth; +3 @ c6_s06_inside_seven/remember_hard; +1 @ c6_s07_seven_aftermath/process_experience; +1 @ c6_s08_drift_intensifies/observe_changes; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +2 @ c6_s12_mirror_self/confront_drift; +2 @ c6_s13_mirror_choice/take_hand_escape; +1 @ c6_s14_mirror_aftermath/embrace_memory; +3 @ c6_s15_recorder_playback/play_recorder; +3 @ c6_s16_tag19_discovery/understand_tag; +2 @ c6_s18_offer_approach/ask_about_offer_high_attention; +2 @ c6_s19_offer_choice/choose_memory_love; +1 @ c6_s20_offer_aftermath/prepare_for_end; +1 @ c6_s21_final_reflection/feel_ready; +3 @ c6_s22_conductor_last/remember_high_attention; +1 @ c6_s23_train_slows/observe_platform
- memory_drift: +1 @ c6_s01_awakening/check_surroundings; +1 @ c6_s02_silence/continue_walking; +1 @ c6_s06_inside_seven/remember_hard; +1 @ c6_s08_drift_intensifies/observe_changes; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +1 @ c6_s12_mirror_self/confront_drift; +1 @ c6_s15_recorder_playback/play_recorder; +2 @ c6_s16_tag19_discovery/understand_tag
- rel_comp7: +1 @ c6_s03_comp7_final/ask_directly_high_rel
- conductor_attention: +1 @ c6_s05_door_seven/open_door_truth; +1 @ c6_s17_lights_failing/wait_for_conductor
- tickets_guilt: +1 @ c6_s06_inside_seven/remember_hard; +1 @ c6_s07_seven_aftermath/process_experience; +2 @ c6_s13_mirror_choice/take_hand_escape; +1 @ c6_s14_mirror_aftermath/embrace_memory; +2 @ c6_s15_recorder_playback/play_recorder; +2 @ c6_s22_conductor_last/remember_high_attention
- tickets_love: +2 @ c6_s09_boy_final/share_recorder_experience; +3 @ c6_s19_offer_choice/choose_memory_love; +1 @ c6_s24_platform_ahead/feel_hope
- rel_boy: +2 @ c6_s09_boy_final/share_recorder_experience
- station_count: +1 @ c6_s25_final_moment/open_door; +1 @ c6_end_station/continue_to_chapter_7
- chapter_index: +1 @ c6_end_station/continue_to_chapter_7
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c6_s02_silence, c6_s11_announcement, c6_s12_mirror_self, c6_s17_lights_failing; tickets_truth -> c6_s05_door_seven, c6_s06_inside_seven; conductor_attention -> c6_s18_offer_approach
Konsequenzen: spaeter: tickets_truth -> c6_s05_door_seven, c7_s07_announcement_name; memory_drift -> c6_s06_inside_seven, c6_s11_announcement, c6_s17_lights_failing; rel_comp7 -> c7_s03_comp7_goodbye; conductor_attention -> c6_s18_offer_approach; tickets_guilt -> c6_s13_mirror_choice, c7_s13_seven_price; tickets_love -> c6_s19_offer_choice, c7_s13_seven_price; rel_boy -> c7_s04_boy_transformation
Konsequenzen: keine: station_count; chapter_index

### Pfad (dumb)
Path-Log: c6_s01_awakening:check_surroundings -> c6_s02_silence:continue_walking -> c6_s03_comp7_final:stay_silent -> c6_s04_corridor_changes:approach_door -> c6_s05_door_seven:walk_away -> c6_s07_seven_aftermath:forget_quickly -> c6_s08_drift_intensifies:observe_changes -> c6_s09_boy_final:comfort_without_recorder -> c6_s10_sleepless_gone:examine_closely -> c6_s11_announcement:process_message -> c6_s12_mirror_self:confront_drift -> c6_s13_mirror_choice:refuse_hand -> c6_s14_mirror_aftermath:push_away_memory -> c6_s15_recorder_playback:resist_playing -> c6_s16_tag19_discovery:understand_tag -> c6_s17_lights_failing:wait_for_conductor -> c6_s18_offer_approach:ask_about_offer_high_attention -> c6_s19_offer_choice:refuse_choice -> c6_s20_offer_aftermath:prepare_for_end -> c6_s21_final_reflection:feel_uncertain -> c6_s22_conductor_last:remember_high_attention -> c6_s23_train_slows:observe_platform -> c6_s24_platform_ahead:feel_hope -> c6_s25_final_moment:open_door -> c6_end_station:continue_to_chapter_7

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c6_s01_awakening/check_surroundings; +1 @ c6_s04_corridor_changes/approach_door; +1 @ c6_s08_drift_intensifies/observe_changes; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +2 @ c6_s12_mirror_self/confront_drift; +3 @ c6_s16_tag19_discovery/understand_tag; +2 @ c6_s18_offer_approach/ask_about_offer_high_attention; +2 @ c6_s19_offer_choice/refuse_choice; +1 @ c6_s20_offer_aftermath/prepare_for_end; +3 @ c6_s22_conductor_last/remember_high_attention; +1 @ c6_s23_train_slows/observe_platform
- memory_drift: +1 @ c6_s01_awakening/check_surroundings; +1 @ c6_s02_silence/continue_walking; +1 @ c6_s07_seven_aftermath/forget_quickly; +1 @ c6_s08_drift_intensifies/observe_changes; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +1 @ c6_s12_mirror_self/confront_drift; +1 @ c6_s14_mirror_aftermath/push_away_memory; +2 @ c6_s16_tag19_discovery/understand_tag
- tickets_escape: +1 @ c6_s03_comp7_final/stay_silent; +2 @ c6_s05_door_seven/walk_away; +1 @ c6_s07_seven_aftermath/forget_quickly; +1 @ c6_s13_mirror_choice/refuse_hand; +1 @ c6_s14_mirror_aftermath/push_away_memory; +1 @ c6_s15_recorder_playback/resist_playing
- tickets_love: +1 @ c6_s09_boy_final/comfort_without_recorder; +1 @ c6_s24_platform_ahead/feel_hope
- rel_boy: +1 @ c6_s09_boy_final/comfort_without_recorder
- conductor_attention: +1 @ c6_s17_lights_failing/wait_for_conductor; +2 @ c6_s19_offer_choice/refuse_choice
- tickets_guilt: +1 @ c6_s21_final_reflection/feel_uncertain; +2 @ c6_s22_conductor_last/remember_high_attention
- station_count: +1 @ c6_s25_final_moment/open_door; +1 @ c6_end_station/continue_to_chapter_7
- chapter_index: +1 @ c6_end_station/continue_to_chapter_7
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c6_s02_silence, c6_s11_announcement, c6_s12_mirror_self, c6_s17_lights_failing; tickets_truth -> c6_s05_door_seven; conductor_attention -> c6_s18_offer_approach, c6_s22_conductor_last
Konsequenzen: spaeter: tickets_truth -> c6_s05_door_seven, c7_s07_announcement_name; memory_drift -> c6_s11_announcement, c6_s17_lights_failing; tickets_escape -> c6_s13_mirror_choice, c6_s19_offer_choice; tickets_love -> c6_s19_offer_choice, c7_s13_seven_price; rel_boy -> c7_s04_boy_transformation; tickets_guilt -> c7_s13_seven_price
Konsequenzen: keine: station_count; chapter_index

### Pfad (max_risk)
Path-Log: c6_s01_awakening:check_surroundings -> c6_s02_silence:continue_walking -> c6_s03_comp7_final:stay_silent -> c6_s04_corridor_changes:approach_door -> c6_s05_door_seven:open_door_truth -> c6_s06_inside_seven:speak_high_drift -> c6_s07_seven_aftermath:forget_quickly -> c6_s08_drift_intensifies:observe_changes -> c6_s09_boy_final:tell_truth_harsh -> c6_s10_sleepless_gone:examine_closely -> c6_s11_announcement:process_message -> c6_s12_mirror_self:confront_drift -> c6_s13_mirror_choice:attack_mirror -> c6_s14_mirror_aftermath:push_away_memory -> c6_s15_recorder_playback:resist_playing -> c6_s16_tag19_discovery:understand_tag -> c6_s17_lights_failing:wait_for_conductor -> c6_s18_offer_approach:ask_about_offer_high_attention -> c6_s19_offer_choice:refuse_choice -> c6_s20_offer_aftermath:prepare_for_end -> c6_s21_final_reflection:feel_ready -> c6_s22_conductor_last:remember_high_attention -> c6_s23_train_slows:observe_platform -> c6_s24_platform_ahead:feel_hope -> c6_s25_final_moment:open_door -> c6_end_station:continue_to_chapter_7

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c6_s01_awakening/check_surroundings; +1 @ c6_s04_corridor_changes/approach_door; +2 @ c6_s05_door_seven/open_door_truth; +2 @ c6_s06_inside_seven/speak_high_drift; +1 @ c6_s08_drift_intensifies/observe_changes; +1 @ c6_s09_boy_final/tell_truth_harsh; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +2 @ c6_s12_mirror_self/confront_drift; +3 @ c6_s16_tag19_discovery/understand_tag; +2 @ c6_s18_offer_approach/ask_about_offer_high_attention; +2 @ c6_s19_offer_choice/refuse_choice; +1 @ c6_s20_offer_aftermath/prepare_for_end; +1 @ c6_s21_final_reflection/feel_ready; +3 @ c6_s22_conductor_last/remember_high_attention; +1 @ c6_s23_train_slows/observe_platform
- memory_drift: +1 @ c6_s01_awakening/check_surroundings; +1 @ c6_s02_silence/continue_walking; +2 @ c6_s06_inside_seven/speak_high_drift; +1 @ c6_s07_seven_aftermath/forget_quickly; +1 @ c6_s08_drift_intensifies/observe_changes; +2 @ c6_s10_sleepless_gone/examine_closely; +1 @ c6_s11_announcement/process_message; +1 @ c6_s12_mirror_self/confront_drift; +2 @ c6_s13_mirror_choice/attack_mirror; +1 @ c6_s14_mirror_aftermath/push_away_memory; +2 @ c6_s16_tag19_discovery/understand_tag
- tickets_escape: +1 @ c6_s03_comp7_final/stay_silent; +1 @ c6_s07_seven_aftermath/forget_quickly; +1 @ c6_s14_mirror_aftermath/push_away_memory; +1 @ c6_s15_recorder_playback/resist_playing
- conductor_attention: +1 @ c6_s05_door_seven/open_door_truth; +1 @ c6_s17_lights_failing/wait_for_conductor; +2 @ c6_s19_offer_choice/refuse_choice
- rel_boy: -1 @ c6_s09_boy_final/tell_truth_harsh
- tickets_guilt: +1 @ c6_s13_mirror_choice/attack_mirror; +2 @ c6_s22_conductor_last/remember_high_attention
- tickets_love: +1 @ c6_s24_platform_ahead/feel_hope
- station_count: +1 @ c6_s25_final_moment/open_door; +1 @ c6_end_station/continue_to_chapter_7
- chapter_index: +1 @ c6_end_station/continue_to_chapter_7
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c6_s02_silence, c6_s11_announcement, c6_s12_mirror_self, c6_s17_lights_failing; tickets_truth -> c6_s05_door_seven, c6_s06_inside_seven; conductor_attention -> c6_s18_offer_approach, c6_s22_conductor_last
Konsequenzen: spaeter: tickets_truth -> c6_s05_door_seven, c7_s07_announcement_name; memory_drift -> c6_s06_inside_seven, c6_s11_announcement, c6_s17_lights_failing; tickets_escape -> c6_s13_mirror_choice, c6_s19_offer_choice; conductor_attention -> c6_s18_offer_approach; rel_boy -> c7_s04_boy_transformation; tickets_guilt -> c7_s13_seven_price; tickets_love -> c7_s13_seven_price
Konsequenzen: keine: station_count; chapter_index

## Kapitel 7

### Pfad (risk_averse)
Path-Log: c7_s01_final_approach:walk_quickly -> c7_s02_interlude_silence:accept_silence -> c7_s03_comp7_goodbye:say_goodbye_high_rel -> c7_s04_boy_transformation:leave_quickly -> c7_s05_interlude_timeshift:continue_forward -> c7_s06_announcement_distorted:deny_message -> c7_s07_announcement_name:resist_memory -> c7_s08_announcement_aftermath:stand_up -> c7_s09_corridor_dissolve:keep_walking -> c7_s10_passengers_vanish:panic -> c7_s11_interlude_memory_flood:understand -> c7_s12_seven_offer:enter_seven -> c7_s13_seven_price:stay_together -> c7_s14_seven_decision:feel_complete -> c7_s15_recorder_trigger:no_recorder -> c7_s19_interlude_train_stops:prepare -> c7_s20_conductor_finale:say_nothing -> c7_s21_photo_revelation:put_away_photo -> c7_s22_tag19_final:no_tag -> c7_s23_interlude_doors_open:step_forward -> c7_s24_platform_real:look_back -> c7_s25_final_choice:step_off -> c7_end_station:truth_path

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c7_s01_final_approach/walk_quickly; +1 @ c7_s04_boy_transformation/leave_quickly; +1 @ c7_s06_announcement_distorted/deny_message; +2 @ c7_s07_announcement_name/resist_memory; +1 @ c7_s09_corridor_dissolve/keep_walking; +1 @ c7_s10_passengers_vanish/panic; +3 @ c7_s13_seven_price/stay_together; +1 @ c7_s15_recorder_trigger/no_recorder; +1 @ c7_s21_photo_revelation/put_away_photo; +1 @ c7_s22_tag19_final/no_tag; +1 @ c7_s24_platform_real/look_back
- tickets_truth: +1 @ c7_s02_interlude_silence/accept_silence; +1 @ c7_s03_comp7_goodbye/say_goodbye_high_rel; +1 @ c7_s08_announcement_aftermath/stand_up; +2 @ c7_s11_interlude_memory_flood/understand; +3 @ c7_s12_seven_offer/enter_seven; +1 @ c7_s14_seven_decision/feel_complete; +1 @ c7_s19_interlude_train_stops/prepare; +1 @ c7_s23_interlude_doors_open/step_forward
- tickets_love: +2 @ c7_s03_comp7_goodbye/say_goodbye_high_rel
- memory_drift: +1 @ c7_s05_interlude_timeshift/continue_forward; +1 @ c7_s11_interlude_memory_flood/understand
- tickets_guilt: +1 @ c7_s20_conductor_finale/say_nothing
- station_count: +1 @ c7_s25_final_choice/step_off
- chapter_index: +1 @ c7_end_station/truth_path
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c7_s06_announcement_distorted; tickets_escape -> c7_s13_seven_price, c7_end_station; tickets_truth -> c7_s12_seven_offer, c7_end_station
Konsequenzen: spaeter: tickets_escape -> c7_s13_seven_price, c7_end_station; tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_end_station; tickets_love -> c7_s13_seven_price; memory_drift -> c7_s19_interlude_train_stops; tickets_guilt -> c7_end_station
Konsequenzen: keine: station_count; chapter_index

### Pfad (confrontational)
Path-Log: c7_s01_final_approach:observe_walls -> c7_s02_interlude_silence:accept_silence -> c7_s03_comp7_goodbye:say_goodbye_high_rel -> c7_s04_boy_transformation:comfort_boy_high_rel -> c7_s05_interlude_timeshift:continue_forward -> c7_s06_announcement_distorted:realize_truth_high_drift -> c7_s07_announcement_name:accept_memory_truth -> c7_s08_announcement_aftermath:stand_up -> c7_s09_corridor_dissolve:enter_empty_compartment -> c7_s10_passengers_vanish:accept_solitude -> c7_s11_interlude_memory_flood:understand -> c7_s12_seven_offer:enter_seven -> c7_s13_seven_price:leave_shadow -> c7_s14_seven_decision:feel_complete -> c7_s15_recorder_trigger:play_recorder_final -> c7_s16_recorder_playback:listen_more -> c7_s17_recorder_truth:accept_death -> c7_s18_recorder_aftermath:choose_leave -> c7_s19_interlude_train_stops:prepare -> c7_s20_conductor_finale:thank_conductor_high_attention -> c7_s21_photo_revelation:understand_photo -> c7_s22_tag19_final:let_go_tag -> c7_s23_interlude_doors_open:step_forward -> c7_s24_platform_real:look_around -> c7_s25_final_choice:step_off -> c7_end_station:truth_path

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c7_s01_final_approach/observe_walls; +1 @ c7_s02_interlude_silence/accept_silence; +1 @ c7_s03_comp7_goodbye/say_goodbye_high_rel; +1 @ c7_s04_boy_transformation/comfort_boy_high_rel; +3 @ c7_s06_announcement_distorted/realize_truth_high_drift; +3 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s08_announcement_aftermath/stand_up; +1 @ c7_s09_corridor_dissolve/enter_empty_compartment; +1 @ c7_s10_passengers_vanish/accept_solitude; +2 @ c7_s11_interlude_memory_flood/understand; +3 @ c7_s12_seven_offer/enter_seven; +2 @ c7_s13_seven_price/leave_shadow; +1 @ c7_s14_seven_decision/feel_complete; +3 @ c7_s15_recorder_trigger/play_recorder_final; +2 @ c7_s16_recorder_playback/listen_more; +3 @ c7_s17_recorder_truth/accept_death; +2 @ c7_s18_recorder_aftermath/choose_leave; +1 @ c7_s19_interlude_train_stops/prepare; +1 @ c7_s20_conductor_finale/thank_conductor_high_attention; +2 @ c7_s21_photo_revelation/understand_photo; +2 @ c7_s22_tag19_final/let_go_tag; +1 @ c7_s23_interlude_doors_open/step_forward; +1 @ c7_s24_platform_real/look_around
- memory_drift: +1 @ c7_s01_final_approach/observe_walls; +1 @ c7_s05_interlude_timeshift/continue_forward; +1 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s09_corridor_dissolve/enter_empty_compartment; +1 @ c7_s11_interlude_memory_flood/understand; +1 @ c7_s16_recorder_playback/listen_more
- tickets_love: +2 @ c7_s03_comp7_goodbye/say_goodbye_high_rel; +2 @ c7_s04_boy_transformation/comfort_boy_high_rel; +2 @ c7_s20_conductor_finale/thank_conductor_high_attention
- tickets_guilt: +1 @ c7_s06_announcement_distorted/realize_truth_high_drift; +2 @ c7_s07_announcement_name/accept_memory_truth; +2 @ c7_s13_seven_price/leave_shadow; +2 @ c7_s15_recorder_trigger/play_recorder_final; +1 @ c7_s17_recorder_truth/accept_death
- station_count: +1 @ c7_s25_final_choice/step_off
- chapter_index: +1 @ c7_end_station/truth_path
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c7_s02_interlude_silence, c7_s06_announcement_distorted, c7_s19_interlude_train_stops; tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_s17_recorder_truth, c7_end_station
Konsequenzen: spaeter: tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_s17_recorder_truth, c7_end_station; tickets_love -> c7_s13_seven_price, c7_end_station; tickets_guilt -> c7_s13_seven_price, c7_end_station; memory_drift -> c7_s19_interlude_train_stops
Konsequenzen: keine: station_count; chapter_index

### Pfad (opportunistic)
Path-Log: c7_s01_final_approach:observe_walls -> c7_s02_interlude_silence:accept_silence -> c7_s03_comp7_goodbye:say_goodbye_high_rel -> c7_s04_boy_transformation:comfort_boy_high_rel -> c7_s05_interlude_timeshift:continue_forward -> c7_s06_announcement_distorted:realize_truth_high_drift -> c7_s07_announcement_name:accept_memory_truth -> c7_s08_announcement_aftermath:stand_up -> c7_s09_corridor_dissolve:enter_empty_compartment -> c7_s10_passengers_vanish:call_out -> c7_s11_interlude_memory_flood:understand -> c7_s12_seven_offer:enter_seven -> c7_s13_seven_price:leave_shadow -> c7_s14_seven_decision:feel_complete -> c7_s15_recorder_trigger:play_recorder_final -> c7_s16_recorder_playback:listen_more -> c7_s17_recorder_truth:accept_death -> c7_s18_recorder_aftermath:choose_leave -> c7_s19_interlude_train_stops:prepare -> c7_s20_conductor_finale:thank_conductor_high_attention -> c7_s21_photo_revelation:understand_photo -> c7_s22_tag19_final:let_go_tag -> c7_s23_interlude_doors_open:step_forward -> c7_s24_platform_real:look_around -> c7_s25_final_choice:step_off -> c7_end_station:truth_path

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c7_s01_final_approach/observe_walls; +1 @ c7_s02_interlude_silence/accept_silence; +1 @ c7_s03_comp7_goodbye/say_goodbye_high_rel; +1 @ c7_s04_boy_transformation/comfort_boy_high_rel; +3 @ c7_s06_announcement_distorted/realize_truth_high_drift; +3 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s08_announcement_aftermath/stand_up; +1 @ c7_s09_corridor_dissolve/enter_empty_compartment; +2 @ c7_s11_interlude_memory_flood/understand; +3 @ c7_s12_seven_offer/enter_seven; +2 @ c7_s13_seven_price/leave_shadow; +1 @ c7_s14_seven_decision/feel_complete; +3 @ c7_s15_recorder_trigger/play_recorder_final; +2 @ c7_s16_recorder_playback/listen_more; +3 @ c7_s17_recorder_truth/accept_death; +2 @ c7_s18_recorder_aftermath/choose_leave; +1 @ c7_s19_interlude_train_stops/prepare; +1 @ c7_s20_conductor_finale/thank_conductor_high_attention; +2 @ c7_s21_photo_revelation/understand_photo; +2 @ c7_s22_tag19_final/let_go_tag; +1 @ c7_s23_interlude_doors_open/step_forward; +1 @ c7_s24_platform_real/look_around
- memory_drift: +1 @ c7_s01_final_approach/observe_walls; +1 @ c7_s05_interlude_timeshift/continue_forward; +1 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s09_corridor_dissolve/enter_empty_compartment; +1 @ c7_s11_interlude_memory_flood/understand; +1 @ c7_s16_recorder_playback/listen_more
- tickets_love: +2 @ c7_s03_comp7_goodbye/say_goodbye_high_rel; +2 @ c7_s04_boy_transformation/comfort_boy_high_rel; +1 @ c7_s10_passengers_vanish/call_out; +2 @ c7_s20_conductor_finale/thank_conductor_high_attention
- tickets_guilt: +1 @ c7_s06_announcement_distorted/realize_truth_high_drift; +2 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s10_passengers_vanish/call_out; +2 @ c7_s13_seven_price/leave_shadow; +2 @ c7_s15_recorder_trigger/play_recorder_final; +1 @ c7_s17_recorder_truth/accept_death
- station_count: +1 @ c7_s25_final_choice/step_off
- chapter_index: +1 @ c7_end_station/truth_path
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c7_s02_interlude_silence, c7_s06_announcement_distorted, c7_s19_interlude_train_stops; tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_s17_recorder_truth, c7_end_station; tickets_guilt -> c7_s13_seven_price; tickets_love -> c7_s13_seven_price
Konsequenzen: spaeter: tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_s17_recorder_truth, c7_end_station; tickets_love -> c7_s13_seven_price, c7_end_station; tickets_guilt -> c7_s13_seven_price, c7_end_station; memory_drift -> c7_s19_interlude_train_stops
Konsequenzen: keine: station_count; chapter_index

### Pfad (dumb)
Path-Log: c7_s01_final_approach:walk_quickly -> c7_s02_interlude_silence:accept_silence -> c7_s03_comp7_goodbye:open_door -> c7_s04_boy_transformation:observe_cassette -> c7_s05_interlude_timeshift:continue_forward -> c7_s06_announcement_distorted:deny_message -> c7_s07_announcement_name:accept_memory_truth -> c7_s08_announcement_aftermath:stand_up -> c7_s09_corridor_dissolve:keep_walking -> c7_s10_passengers_vanish:panic -> c7_s11_interlude_memory_flood:understand -> c7_s12_seven_offer:enter_seven -> c7_s13_seven_price:refuse_choice -> c7_s14_seven_decision:feel_complete -> c7_s15_recorder_trigger:no_recorder -> c7_s19_interlude_train_stops:prepare -> c7_s20_conductor_finale:say_nothing -> c7_s21_photo_revelation:put_away_photo -> c7_s22_tag19_final:no_tag -> c7_s23_interlude_doors_open:step_forward -> c7_s24_platform_real:look_around -> c7_s25_final_choice:step_off -> c7_end_station:guilt_path

State-Verlauf (Keys mit Aenderungen):
- tickets_escape: +1 @ c7_s01_final_approach/walk_quickly; +1 @ c7_s06_announcement_distorted/deny_message; +1 @ c7_s09_corridor_dissolve/keep_walking; +1 @ c7_s10_passengers_vanish/panic; +1 @ c7_s15_recorder_trigger/no_recorder; +1 @ c7_s21_photo_revelation/put_away_photo; +1 @ c7_s22_tag19_final/no_tag
- tickets_truth: +1 @ c7_s02_interlude_silence/accept_silence; +1 @ c7_s03_comp7_goodbye/open_door; +1 @ c7_s04_boy_transformation/observe_cassette; +3 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s08_announcement_aftermath/stand_up; +2 @ c7_s11_interlude_memory_flood/understand; +3 @ c7_s12_seven_offer/enter_seven; +1 @ c7_s13_seven_price/refuse_choice; +1 @ c7_s14_seven_decision/feel_complete; +1 @ c7_s19_interlude_train_stops/prepare; +1 @ c7_s23_interlude_doors_open/step_forward; +1 @ c7_s24_platform_real/look_around
- memory_drift: +1 @ c7_s04_boy_transformation/observe_cassette; +1 @ c7_s05_interlude_timeshift/continue_forward; +1 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s11_interlude_memory_flood/understand
- tickets_guilt: +2 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s20_conductor_finale/say_nothing
- station_count: +1 @ c7_s25_final_choice/step_off
- chapter_index: +1 @ c7_end_station/guilt_path
Konsequenzen: innerhalb 1-3 Szenen: tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_end_station; memory_drift -> c7_s06_announcement_distorted; tickets_escape -> c7_s13_seven_price
Konsequenzen: spaeter: tickets_escape -> c7_s13_seven_price, c7_end_station; tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_end_station; tickets_guilt -> c7_s13_seven_price, c7_end_station; memory_drift -> c7_s19_interlude_train_stops
Konsequenzen: keine: station_count; chapter_index

### Pfad (max_risk)
Path-Log: c7_s01_final_approach:observe_walls -> c7_s02_interlude_silence:accept_silence -> c7_s03_comp7_goodbye:say_goodbye_high_rel -> c7_s04_boy_transformation:observe_cassette -> c7_s05_interlude_timeshift:continue_forward -> c7_s06_announcement_distorted:realize_truth_high_drift -> c7_s07_announcement_name:accept_memory_truth -> c7_s08_announcement_aftermath:stand_up -> c7_s09_corridor_dissolve:enter_empty_compartment -> c7_s10_passengers_vanish:call_out -> c7_s11_interlude_memory_flood:understand -> c7_s12_seven_offer:enter_seven -> c7_s13_seven_price:leave_shadow -> c7_s14_seven_decision:feel_complete -> c7_s15_recorder_trigger:no_recorder -> c7_s19_interlude_train_stops:prepare -> c7_s20_conductor_finale:thank_conductor_high_attention -> c7_s21_photo_revelation:understand_photo -> c7_s22_tag19_final:let_go_tag -> c7_s23_interlude_doors_open:step_forward -> c7_s24_platform_real:look_around -> c7_s25_final_choice:step_off -> c7_end_station:truth_path

State-Verlauf (Keys mit Aenderungen):
- tickets_truth: +1 @ c7_s01_final_approach/observe_walls; +1 @ c7_s02_interlude_silence/accept_silence; +1 @ c7_s03_comp7_goodbye/say_goodbye_high_rel; +1 @ c7_s04_boy_transformation/observe_cassette; +3 @ c7_s06_announcement_distorted/realize_truth_high_drift; +3 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s08_announcement_aftermath/stand_up; +1 @ c7_s09_corridor_dissolve/enter_empty_compartment; +2 @ c7_s11_interlude_memory_flood/understand; +3 @ c7_s12_seven_offer/enter_seven; +2 @ c7_s13_seven_price/leave_shadow; +1 @ c7_s14_seven_decision/feel_complete; +1 @ c7_s19_interlude_train_stops/prepare; +1 @ c7_s20_conductor_finale/thank_conductor_high_attention; +2 @ c7_s21_photo_revelation/understand_photo; +2 @ c7_s22_tag19_final/let_go_tag; +1 @ c7_s23_interlude_doors_open/step_forward; +1 @ c7_s24_platform_real/look_around
- memory_drift: +1 @ c7_s01_final_approach/observe_walls; +1 @ c7_s04_boy_transformation/observe_cassette; +1 @ c7_s05_interlude_timeshift/continue_forward; +1 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s09_corridor_dissolve/enter_empty_compartment; +1 @ c7_s11_interlude_memory_flood/understand
- tickets_love: +2 @ c7_s03_comp7_goodbye/say_goodbye_high_rel; +1 @ c7_s10_passengers_vanish/call_out; +2 @ c7_s20_conductor_finale/thank_conductor_high_attention
- tickets_guilt: +1 @ c7_s06_announcement_distorted/realize_truth_high_drift; +2 @ c7_s07_announcement_name/accept_memory_truth; +1 @ c7_s10_passengers_vanish/call_out; +2 @ c7_s13_seven_price/leave_shadow
- tickets_escape: +1 @ c7_s15_recorder_trigger/no_recorder
- station_count: +1 @ c7_s25_final_choice/step_off
- chapter_index: +1 @ c7_end_station/truth_path
Konsequenzen: innerhalb 1-3 Szenen: memory_drift -> c7_s02_interlude_silence, c7_s06_announcement_distorted; tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_end_station; tickets_guilt -> c7_s13_seven_price; tickets_love -> c7_s13_seven_price
Konsequenzen: spaeter: tickets_truth -> c7_s07_announcement_name, c7_s12_seven_offer, c7_end_station; tickets_love -> c7_s13_seven_price, c7_end_station; tickets_guilt -> c7_s13_seven_price, c7_end_station; memory_drift -> c7_s19_interlude_train_stops; tickets_escape -> c7_end_station
Konsequenzen: keine: station_count; chapter_index



## Decision Cards (schlimmste zuerst)

### c4_s01a_double_reflection (src/content/nachtzug19/scenes/c4.ts)
Situation: Du beruehrst den Spiegel
Stakes: Effekte beruehren tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- try_to_understand: Erwartung: Versuchen zu verstehen | Realitaet: tickets_truth +2; next=c4_s01b_wrong_memory; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_quickly: Erwartung: Schnell weggehen | Realitaet: tickets_escape +1; next=c4_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_when: Erwartung: "Wann war ich hier?" | Realitaet: tickets_truth +2; next=c4_s01b_wrong_memory; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: IST FAKE (Identische Effekte + gleicher next (c4_s01b_wrong_memory) bei try_to_understand/ask_when)
Minimaler Fix: Effekte oder next zwischen den betroffenen Choices differenzieren (z.B. zusaetzliche Kosten oder abweichende Folgeszene).

### c4_s02_recorder_prophecy (src/content/nachtzug19/scenes/c4.ts)
Situation: Du sitzt in deinem Abteil
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- listen_to_prophecy: Erwartung: Weiterhoeren | Realitaet: tickets_truth +2, memory_drift +1; next=c4_s02a_recording_self; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- turn_off_recorder: Erwartung: Den Rekorder ausschalten | Realitaet: tickets_escape +1; next=c4_interlude_02_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- no_recorder: Erwartung: Weitergehen | Realitaet: tickets_escape +1; next=c4_interlude_02_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: IST FAKE (Identische Effekte + gleicher next (c4_interlude_02_announcement) bei turn_off_recorder/no_recorder)
Minimaler Fix: Effekte oder next zwischen den betroffenen Choices differenzieren (z.B. zusaetzliche Kosten oder abweichende Folgeszene).

### c5_s01_final_preparation (src/content/nachtzug19/scenes/c5.ts)
Situation: Du sitzt wieder in deinem Abteil
Stakes: Effekte beruehren tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s02_corridor_silence.
Choices:
- check_recorder: Erwartung: Den Rekorder noch einmal ansehen | Realitaet: tickets_truth +1; next=c5_s02_corridor_silence; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- rest_prepare: Erwartung: Ausruhen und sich vorbereiten | Realitaet: tickets_escape +1; next=c5_s02_corridor_silence; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- walk_corridor: Erwartung: In den Gang gehen | Realitaet: tickets_truth +1; next=c5_s02_corridor_silence; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: IST FAKE (Identische Effekte + gleicher next (c5_s02_corridor_silence) bei check_recorder/walk_corridor)
Minimaler Fix: Effekte oder next zwischen den betroffenen Choices differenzieren (z.B. zusaetzliche Kosten oder abweichende Folgeszene).

### c1_s01_platform (src/content/nachtzug19/scenes/c1.ts)
Situation: Der Bahnsteig ist leer
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c1_s01a_platform_details.
Choices:
- look_around: Erwartung: Umsehen und warten | Realitaet: tickets_truth +1; next=c1_s01a_platform_details; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- check_phone: Erwartung: Handy checken | Realitaet: tickets_escape +1; next=c1_s01a_platform_details; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- try_leave: Erwartung: Versuchen zu gehen | Realitaet: tickets_guilt +1, conductor_attention +1; next=c1_s01a_platform_details; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s01a_platform_details (src/content/nachtzug19/scenes/c1.ts)
Situation: Du setzt dich in Bewegung, unschluessig ob du suchen oder fliehen willst
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c1_interlude_01_lights.
Choices:
- step_back: Erwartung: Einen Schritt zuruecktreten | Realitaet: tickets_escape +1; next=c1_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- look_tracks: Erwartung: Die Schienen fixieren | Realitaet: tickets_truth +1; next=c1_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- feel_guilty: Erwartung: Denken: "Ich sollte nicht hier sein" | Realitaet: tickets_guilt +1; next=c1_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_interlude_01_lights (src/content/nachtzug19/scenes/c1.ts)
Situation: Die Neonroehre ueber dir flackert schneller
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape. Alle Choices fuehren nach c1_s02_train_appears.
Choices:
- close_eyes: Erwartung: Augen schliessen und atmen | Realitaet: tickets_escape +1, conductor_attention +1; next=c1_s02_train_appears; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- continue: Erwartung: Weiter | Realitaet: memory_drift +1; next=c1_s02_train_appears; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s02_train_appears (src/content/nachtzug19/scenes/c1.ts)
Situation: Das Brummen wird lauter
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c1_s02a_train_exterior.
Choices:
- board_immediately: Erwartung: Sofort einsteigen | Realitaet: tickets_escape +1; next=c1_s02a_train_exterior; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- inspect_train: Erwartung: Den Zug genauer ansehen | Realitaet: tickets_truth +1; next=c1_s02a_train_exterior; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- hesitate: Erwartung: Zoegern | Realitaet: tickets_guilt +1, memory_drift +1; next=c1_s02a_train_exterior; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- call_out: Erwartung: In den Zug rufen | Realitaet: tickets_truth +1, conductor_attention +1; next=c1_s02a_train_exterior; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s02a_train_exterior (src/content/nachtzug19/scenes/c1.ts)
Situation: Du stehst vor der offenen Tuer
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c1_interlude_02_silence.
Choices:
- board_now: Erwartung: Einsteigen | Realitaet: tickets_escape +1; next=c1_interlude_02_silence; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- touch_exterior: Erwartung: Die Aussenwand beruehren | Realitaet: tickets_truth +1; next=c1_interlude_02_silence; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_aloud: Erwartung: "Ist da jemand?" rufen | Realitaet: tickets_love +1, conductor_attention +1; next=c1_interlude_02_silence; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_interlude_02_silence (src/content/nachtzug19/scenes/c1.ts)
Situation: Du steigst ein
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape. Alle Choices fuehren nach c1_s03_inside_train.
Choices:
- stay_quiet: Erwartung: Ganz still bleiben | Realitaet: tickets_escape +1, conductor_attention +1; next=c1_s03_inside_train; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- continue: Erwartung: Weiter | Realitaet: memory_drift +1; next=c1_s03_inside_train; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s03a_corridor_walk (src/content/nachtzug19/scenes/c1.ts)
Situation: Du gehst den Gang entlang
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c1_s03b_find_seat.
Choices:
- ask_child: Erwartung: "Was malst du?" | Realitaet: tickets_love +1; next=c1_s03b_find_seat; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- look_at_drawing: Erwartung: Die Zeichnung genauer ansehen | Realitaet: tickets_truth +1, memory_drift +1; next=c1_s03b_find_seat; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- keep_walking_past: Erwartung: Weitergehen | Realitaet: tickets_escape +1; next=c1_s03b_find_seat; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s03b_find_seat (src/content/nachtzug19/scenes/c1.ts)
Situation: Du suchst dir ein Abteil
Stakes: Effekte beruehren tickets_escape, tickets_truth. Alle Choices fuehren nach c1_s04_sleepless_intro.
Choices:
- turn_around: Erwartung: Sich umdrehen | Realitaet: tickets_truth +1; next=c1_s04_sleepless_intro; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ignore_voice: Erwartung: Ignorieren | Realitaet: tickets_escape +1; next=c1_s04_sleepless_intro; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_interlude_03_window (src/content/nachtzug19/scenes/c1.ts)
Situation: Der Schlaflose geht zurueck zu seinem Platz
Stakes: Effekte beruehren memory_drift, tickets_truth. Alle Choices fuehren nach c1_s04b_sleepless_warning.
Choices:
- touch_glass: Erwartung: Die Hand ans Glas legen | Realitaet: tickets_truth +1, memory_drift +1; next=c1_s04b_sleepless_warning; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- continue: Erwartung: Weiter | Realitaet: memory_drift +1; next=c1_s04b_sleepless_warning; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_interlude_04_clock (src/content/nachtzug19/scenes/c1.ts)
Situation: Du siehst auf dein Handgelenk
Stakes: Effekte beruehren memory_drift, tickets_truth. Alle Choices fuehren nach c1_s05a_other_passengers.
Choices:
- note_time: Erwartung: Die Anzeige mitzaehlen | Realitaet: tickets_truth +1, memory_drift +1; next=c1_s05a_other_passengers; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- continue: Erwartung: Weiter | Realitaet: memory_drift +1; next=c1_s05a_other_passengers; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s05a_other_passengers (src/content/nachtzug19/scenes/c1.ts)
Situation: Du schaust dich um
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c1_s05b_compartment7_tease.
Choices:
- count_passengers: Erwartung: Die Passagiere zaehlen | Realitaet: tickets_truth +1; next=c1_s05b_compartment7_tease; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- approach_woman: Erwartung: Die Frau ansprechen | Realitaet: tickets_love +1, conductor_attention +1; next=c1_s05b_compartment7_tease; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- leave_them_alone: Erwartung: Sie in Ruhe lassen | Realitaet: tickets_escape +1; next=c1_s05b_compartment7_tease; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- stay_inconspicuous: Erwartung: Unauffaellig bleiben | Realitaet: tickets_escape +1, conductor_attention +1; next=c1_s05b_compartment7_tease; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s07_stranger_encounter (src/content/nachtzug19/scenes/c1.ts)
Situation: Du gehst in den leeren Wagen
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c1_interlude_05_vibration.
Choices:
- search_wagon: Erwartung: Den Wagen durchsuchen | Realitaet: tickets_truth +1, conductor_attention +1; next=c1_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- answer_voice: Erwartung: Der Stimme leise antworten | Realitaet: tickets_truth +1, memory_drift +1; next=c1_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- go_back: Erwartung: Zurueck in den ersten Wagen | Realitaet: tickets_escape +1, memory_drift +1; next=c1_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_interlude_05_vibration (src/content/nachtzug19/scenes/c1.ts)
Situation: Der Boden unter dir vibriert
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c1_end_platform_look.
Choices:
- steady_breath: Erwartung: Festhalten und zaehlen | Realitaet: tickets_escape +1, conductor_attention +1; next=c1_end_platform_look; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- reflect_on_vibration: Erwartung: Die Vibration analysieren | Realitaet: tickets_truth +1, memory_drift +1; next=c1_end_platform_look; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- continue: Erwartung: Weiter | Realitaet: memory_drift +1; next=c1_end_platform_look; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_interlude_01_toilet (src/content/nachtzug19/scenes/c2.ts)
Situation: Du gehst zur Toilette am Ende des Wagens
Stakes: Effekte beruehren memory_drift, tickets_truth. Alle Choices fuehren nach c2_s02_boy_recorder.
Choices:
- stare_back: Erwartung: Dem Spiegelbild standhalten | Realitaet: tickets_truth +1, memory_drift +1; next=c2_s02_boy_recorder; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- continue: Erwartung: Rausgehen | Realitaet: memory_drift +1; next=c2_s02_boy_recorder; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_interlude_02_window_dark (src/content/nachtzug19/scenes/c2.ts)
Situation: Du gehst ans Fenster
Stakes: Effekte beruehren memory_drift, tickets_truth. Alle Choices fuehren nach c2_s03_comp7_intro.
Choices:
- keep_staring: Erwartung: Trotzdem hinschauen | Realitaet: tickets_truth +1, memory_drift +1; next=c2_s03_comp7_intro; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- continue: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c2_s03_comp7_intro; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_interlude_03_announcement_glitch (src/content/nachtzug19/scenes/c2.ts)
Situation: Die Durchsage knistert:
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape. Alle Choices fuehren nach c2_s04_announcement.
Choices:
- cover_ears: Erwartung: Ohren zuhalten | Realitaet: tickets_escape +1, conductor_attention +1; next=c2_s04_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- continue: Erwartung: Weiter | Realitaet: memory_drift +1; next=c2_s04_announcement; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_s04b_passengers_shift (src/content/nachtzug19/scenes/c2.ts)
Situation: Du versuchst, dich zu verstecken
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_truth. Alle Choices fuehren nach c2_control_01_approach.
Choices:
- face_conductor: Erwartung: Sich umdrehen und ihm gegenueberstehen | Realitaet: tickets_truth +1; next=c2_control_01_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- try_run: Erwartung: Versuchen wegzulaufen | Realitaet: tickets_escape +1, conductor_attention +1; next=c2_control_01_approach; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_interlude_04_lights (src/content/nachtzug19/scenes/c2.ts)
Situation: Die Lichter gehen aus
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_truth. Alle Choices fuehren nach c2_control_01_approach.
Choices:
- steady: Erwartung: Ruhig bleiben | Realitaet: tickets_truth +1, conductor_attention +1; next=c2_control_01_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- continue: Erwartung: Kontrolle beginnt | Realitaet: memory_drift +1; next=c2_control_01_approach; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_control_01_question (src/content/nachtzug19/scenes/c2.ts)
Situation: Der Schaffner spricht weiter:
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c2_control_01_aftermath.
Choices:
- offer_truth: Erwartung: "Ich weiss es nicht. Ich kann mich nicht erinnern." | Realitaet: tickets_truth +2, conductor_attention +1; next=c2_control_01_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- offer_search: Erwartung: "Ich suche jemanden." | Realitaet: tickets_love +2; next=c2_control_01_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- offer_escape: Erwartung: "Ich musste weg." | Realitaet: tickets_escape +2; next=c2_control_01_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- use_recorder: Erwartung: Den Rekorder zeigen | Realitaet: tickets_truth +1, conductor_attention +2; next=c2_control_01_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_interlude_05_vibration (src/content/nachtzug19/scenes/c2.ts)
Situation: Der Boden unter dir vibriert
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape. Alle Choices fuehren nach c2_end_platform_watch.
Choices:
- steady_breath: Erwartung: Atem zaehlen | Realitaet: tickets_escape +1, conductor_attention +1; next=c2_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- continue: Erwartung: Zur Station | Realitaet: memory_drift +1; next=c2_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c2_end_platform_watch (src/content/nachtzug19/scenes/c2.ts)
Situation: Du gehst ans Fenster
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c2_end_station.
Choices:
- tell_others: Erwartung: Den anderen erzaehlen | Realitaet: tickets_truth +1, conductor_attention +1; next=c2_end_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- keep_silent: Erwartung: Fuer sich behalten | Realitaet: tickets_escape +1; next=c2_end_station; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- recognize_figure: Erwartung: Versuchen, die Gestalt zu erkennen | Realitaet: tickets_truth +1, memory_drift +1; next=c2_end_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_s01_wagen7_locked (src/content/nachtzug19/scenes/c3.ts)
Situation: Du stehst vor einer Tuer am Ende des Gangs
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c3_s01a_after_station.
Choices:
- try_to_open: Erwartung: Versuchen die Tuer zu oeffnen | Realitaet: tickets_truth +1, conductor_attention +1; next=c3_s01a_after_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- wait_at_door: Erwartung: Vor der Tuer warten | Realitaet: tickets_escape +1; next=c3_s01a_after_station; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- knock_on_door: Erwartung: An die Tuer klopfen | Realitaet: tickets_love +1, memory_drift +1; next=c3_s01a_after_station; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_interlude_01_lights (src/content/nachtzug19/scenes/c3.ts)
Situation: Die Neonroehren flackern
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c3_s01b_boy_return.
Choices:
- continue: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c3_s01b_boy_return; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_interlude_02_announcement (src/content/nachtzug19/scenes/c3.ts)
Situation: Die Lautsprecher knacken
Stakes: Effekte beruehren conductor_attention. Alle Choices fuehren nach c3_s02b_corridor_shift.
Choices:
- continue: Erwartung: Weitergehen | Realitaet: conductor_attention +1; next=c3_s02b_corridor_shift; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_02_silence/stay_quiet
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_interlude_03_window (src/content/nachtzug19/scenes/c3.ts)
Situation: Du schaust aus dem Fenster
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c3_s03_wagen7_approach.
Choices:
- continue: Erwartung: Wegschauen | Realitaet: memory_drift +1; next=c3_s03_wagen7_approach; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_interlude_04_corridor (src/content/nachtzug19/scenes/c3.ts)
Situation: Du verlaesst Wagen 7
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c3_s04_comp7_truth.
Choices:
- continue: Erwartung: Zurueck zu Comp7 | Realitaet: memory_drift +1; next=c3_s04_comp7_truth; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_s04a_paradox_window (src/content/nachtzug19/scenes/c3.ts)
Situation: Du schaust aus dem Fenster von Wagen 7
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c3_s04b_third_announcement.
Choices:
- accept_paradox: Erwartung: Das Paradox akzeptieren | Realitaet: tickets_truth +2, memory_drift +1; next=c3_s04b_third_announcement; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- look_away: Erwartung: Wegschauen | Realitaet: tickets_escape +1; next=c3_s04b_third_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- try_to_reach: Erwartung: Versuchen das andere Du zu erreichen | Realitaet: tickets_love +1, memory_drift +1; next=c3_s04b_third_announcement; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_interlude_05_mirror (src/content/nachtzug19/scenes/c3.ts)
Situation: Du gehst durch den Gang
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c3_s04b_third_announcement.
Choices:
- continue: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c3_s04b_third_announcement; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_control_02_approach (src/content/nachtzug19/scenes/c3.ts)
Situation: Die Schritte werden lauter
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c3_control_02_question.
Choices:
- step_outside: Erwartung: Nach draussen gehen | Realitaet: tickets_truth +1, conductor_attention +1; next=c3_control_02_question; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stay_inside: Erwartung: In Wagen 7 bleiben | Realitaet: tickets_escape +1, conductor_attention +2; next=c3_control_02_question; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- let_comp7_talk: Erwartung: Comp7 sprechen lassen | Realitaet: tickets_love +1, conductor_attention +1; next=c3_control_02_question; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_end_platform_watch (src/content/nachtzug19/scenes/c3.ts)
Situation: Der Zug wird langsamer
Stakes: Effekte beruehren tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c3_end_station.
Choices:
- try_to_exit: Erwartung: Versuchen auszusteigen | Realitaet: tickets_escape +1; next=c3_end_station; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- stay_on_train: Erwartung: Im Zug bleiben | Realitaet: tickets_truth +1; next=c3_end_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- wave_to_figure: Erwartung: Der Gestalt zuwinken | Realitaet: tickets_love +1; next=c3_end_station; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c3_end_station (src/content/nachtzug19/scenes/c3.ts)
Situation: Die Tuer oeffnet sich
Stakes: Effekte beruehren chapter_index, memory_drift, station_count. Alle Choices fuehren nach c4_s01_mirror.
Choices:
- continue_to_chapter_4: Erwartung: Weitergehen | Realitaet: chapter_index +4, station_count +1, memory_drift +1; next=c4_s01_mirror; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_s01b_wrong_memory (src/content/nachtzug19/scenes/c4.ts)
Situation: Du erinnerst dich an etwas
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c4_interlude_01_lights.
Choices:
- accept_false_memory: Erwartung: Die falsche Erinnerung akzeptieren | Realitaet: tickets_escape +1, memory_drift +2; next=c4_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- fight_memory: Erwartung: Gegen die Erinnerung ankaempfen | Realitaet: tickets_truth +1, conductor_attention +1; next=c4_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_who_spoke: Erwartung: "Wer hat das gesagt?" | Realitaet: tickets_love +1; next=c4_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_interlude_01_lights (src/content/nachtzug19/scenes/c4.ts)
Situation: Die Neonroehren flackern
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c4_s02_recorder_prophecy.
Choices:
- continue: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c4_s02_recorder_prophecy; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_s02b_recorder_loop (src/content/nachtzug19/scenes/c4.ts)
Situation: Du spulst zurueck
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_truth. Alle Choices fuehren nach c4_interlude_02_announcement.
Choices:
- accept_loop: Erwartung: Die Schleife akzeptieren | Realitaet: tickets_truth +2; next=c4_interlude_02_announcement; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- try_to_break: Erwartung: Versuchen die Schleife zu brechen | Realitaet: tickets_escape +2, conductor_attention +1; next=c4_interlude_02_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_interlude_02_announcement (src/content/nachtzug19/scenes/c4.ts)
Situation: Die Lautsprecher knacken
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c4_s03_passengers_return.
Choices:
- continue: Erwartung: Im Zug bleiben | Realitaet: memory_drift +1; next=c4_s03_passengers_return; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_s03a_sleepless_changed (src/content/nachtzug19/scenes/c4.ts)
Situation: Du setzt dich neben den Schlaflosen
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c4_interlude_03_window.
Choices:
- correct_him: Erwartung: "Aber wir hatten drei Stationen" | Realitaet: tickets_truth +1, memory_drift +1; next=c4_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- accept_his_memory: Erwartung: "Du hast recht" | Realitaet: tickets_escape +1, memory_drift +2; next=c4_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_about_loop: Erwartung: "Wie oft sind wir schon gefahren?" | Realitaet: tickets_truth +2; next=c4_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_interlude_03_window (src/content/nachtzug19/scenes/c4.ts)
Situation: Du schaust aus dem Fenster
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c4_s04_announcement_glitch.
Choices:
- continue: Erwartung: Wegschauen | Realitaet: memory_drift +1; next=c4_s04_announcement_glitch; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_s04b_ticket_appears (src/content/nachtzug19/scenes/c4.ts)
Situation: Du gehst durch den Gang
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_truth. Alle Choices fuehren nach c4_s05_comp7_call.
Choices:
- keep_ticket: Erwartung: Das Ticket behalten | Realitaet: tickets_truth +1; next=c4_s05_comp7_call; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- destroy_ticket: Erwartung: Das Ticket zerreissen | Realitaet: tickets_escape +2, conductor_attention +2; next=c4_s05_comp7_call; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_interlude_04_corridor (src/content/nachtzug19/scenes/c4.ts)
Situation: Du gehst durch den Gang
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c4_s05_comp7_call.
Choices:
- continue: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c4_s05_comp7_call; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_interlude_05_time (src/content/nachtzug19/scenes/c4.ts)
Situation: Du bleibst im Gang stehen
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c4_s06_comp7_memory.
Choices:
- continue: Erwartung: Weitergehen | Realitaet: memory_drift +2; next=c4_s06_comp7_memory; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_s07a_drift_peak (src/content/nachtzug19/scenes/c4.ts)
Situation: Alles stoppt
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c4_s07b_stabilization.
Choices:
- confront_self: Erwartung: "Wer bist du?" | Realitaet: tickets_truth +2; next=c4_s07b_stabilization; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- run_away: Erwartung: Weglaufen | Realitaet: tickets_escape +1, memory_drift +1; next=c4_s07b_stabilization; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- accept_double: Erwartung: "Ich weiss" | Realitaet: tickets_love +1; next=c4_s07b_stabilization; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_end_platform_watch (src/content/nachtzug19/scenes/c4.ts)
Situation: Der Zug haelt
Stakes: Effekte beruehren tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c4_end_station.
Choices:
- observe_copies: Erwartung: Die Kopien beobachten | Realitaet: tickets_truth +1; next=c4_end_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- close_eyes: Erwartung: Die Augen schliessen | Realitaet: tickets_escape +1; next=c4_end_station; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- wave_to_copies: Erwartung: Den Kopien zuwinken | Realitaet: tickets_love +1; next=c4_end_station; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c4_end_station (src/content/nachtzug19/scenes/c4.ts)
Situation: Niemand steigt ein
Stakes: Effekte beruehren chapter_index, memory_drift, station_count. Alle Choices fuehren nach c5_s01_final_preparation.
Choices:
- continue_to_chapter_5: Erwartung: Im Zug bleiben | Realitaet: chapter_index +5, station_count +1, memory_drift +1; next=c5_s01_final_preparation; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s02_corridor_silence (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Gang ist leer
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c5_s03_comp7_reflection.
Choices:
- continue_forward: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c5_s03_comp7_reflection; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s04_lights_flicker (src/content/nachtzug19/scenes/c5.ts)
Situation: Die Lichter flackern wieder
Stakes: Effekte beruehren conductor_attention, tickets_truth. Alle Choices fuehren nach c5_s05_sleepless_final.
Choices:
- investigate: Erwartung: Dem Geraeusch nachgehen | Realitaet: tickets_truth +1, conductor_attention +1; next=c5_s05_sleepless_final; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s07_abteil7_inside (src/content/nachtzug19/scenes/c5.ts)
Situation: Du oeffnest die Tuer
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c5_s08_abteil7_aftermath.
Choices:
- read_names_truth: Erwartung: Die Namen genau ansehen | Realitaet: tickets_truth +2, memory_drift +2; next=c5_s08_abteil7_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_immediately: Erwartung: Sofort das Abteil verlassen | Realitaet: tickets_escape +2, conductor_attention +1; next=c5_s08_abteil7_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- touch_wall: Erwartung: Die Wand beruehren | Realitaet: tickets_guilt +1, memory_drift +1; next=c5_s08_abteil7_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s08_abteil7_aftermath (src/content/nachtzug19/scenes/c5.ts)
Situation: Du stehst wieder im Gang
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s09_train_shifts.
Choices:
- try_to_remember: Erwartung: Versuchen, sich zu erinnern | Realitaet: tickets_truth +1, memory_drift +1; next=c5_s09_train_shifts; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- let_it_go: Erwartung: Es loslassen | Realitaet: tickets_escape +1, memory_drift +1; next=c5_s09_train_shifts; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s09_train_shifts (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Zug schwankt
Stakes: Effekte beruehren station_count. Alle Choices fuehren nach c5_s10_boy_reunion.
Choices:
- continue_on: Erwartung: Weitergehen | Realitaet: station_count +1; next=c5_s10_boy_reunion; ending=none | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s11_corridor_encounter (src/content/nachtzug19/scenes/c5.ts)
Situation: Du gehst zurueck in den Gang
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s12_window_void.
Choices:
- approach_conductor: Erwartung: Auf ihn zugehen | Realitaet: tickets_truth +1, conductor_attention +2; next=c5_s12_window_void; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- retreat_to_compartment: Erwartung: Zurueck ins Abteil gehen | Realitaet: tickets_escape +1, conductor_attention +1; next=c5_s12_window_void; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s12_window_void (src/content/nachtzug19/scenes/c5.ts)
Situation: Du blickst aus dem Fenster
Stakes: Effekte beruehren memory_drift, tickets_escape. Alle Choices fuehren nach c5_s13_memory_fragment.
Choices:
- accept_void: Erwartung: Die Leere akzeptieren | Realitaet: tickets_escape +1, memory_drift +1; next=c5_s13_memory_fragment; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s13_memory_fragment (src/content/nachtzug19/scenes/c5.ts)
Situation: Ploetzlich - eine Erinnerung
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c5_s14_control3_approach.
Choices:
- chase_memory: Erwartung: Der Erinnerung nachjagen | Realitaet: tickets_truth +2, memory_drift +1; next=c5_s14_control3_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- let_memory_fade: Erwartung: Die Erinnerung loslassen | Realitaet: tickets_escape +1, memory_drift +1; next=c5_s14_control3_approach; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- write_down_memory: Erwartung: Versuchen, sie festzuhalten | Realitaet: tickets_guilt +1, tickets_truth +1; next=c5_s14_control3_approach; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s14_control3_approach (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Schaffner erscheint in deinem Abteil
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s15_control3_question.
Choices:
- show_confidence: Erwartung: "Ich habe ein Recht, hier zu sein." | Realitaet: tickets_truth +1, conductor_attention +1; next=c5_s15_control3_question; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- show_uncertainty: Erwartung: "Ich... ich weiss nicht." | Realitaet: tickets_escape +1; next=c5_s15_control3_question; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s15_control3_question (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Schaffner legt die Fahrkarte auf den Tisch
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c5_s16_control3_aftermath.
Choices:
- admit_truth_high: Erwartung: "Ich wollte es vergessen. Ich habe es verdient." | Realitaet: tickets_guilt +3, conductor_attention +2; next=c5_s16_control3_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- ask_comp7_help: Erwartung: An Comp7 denken - sie koennte helfen | Realitaet: tickets_love +2, conductor_attention +1; next=c5_s16_control3_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- harsh_response: Erwartung: "Ich schulde dir keine Antwort." | Realitaet: tickets_truth +1, conductor_attention +2; next=c5_s16_control3_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- deny_everything: Erwartung: "Ich weiss es wirklich nicht." | Realitaet: tickets_escape +2; next=c5_s16_control3_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s16_control3_aftermath (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Schaffner steht auf
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s17_aftermath_reflection.
Choices:
- examine_ticket: Erwartung: Die Fahrkarte ansehen | Realitaet: tickets_truth +1; next=c5_s17_aftermath_reflection; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- rest_after_control: Erwartung: Ausruhen | Realitaet: tickets_escape +1, conductor_attention +1; next=c5_s17_aftermath_reflection; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s17_aftermath_reflection (src/content/nachtzug19/scenes/c5.ts)
Situation: Du sitzt da und denkst nach
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s18_darkness_spreads.
Choices:
- consider_staying: Erwartung: Den Gedanken zulassen | Realitaet: tickets_escape +2, memory_drift +1; next=c5_s18_darkness_spreads; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- reject_staying: Erwartung: Den Gedanken verwerfen | Realitaet: tickets_truth +1; next=c5_s18_darkness_spreads; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s18_darkness_spreads (src/content/nachtzug19/scenes/c5.ts)
Situation: Die Dunkelheit ist jetzt ueberall
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c5_s19_final_conversation.
Choices:
- keep_walking: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c5_s19_final_conversation; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s20_decision_approach (src/content/nachtzug19/scenes/c5.ts)
Situation: Du spuerst es:
Stakes: Effekte beruehren tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s21_decision_core.
Choices:
- prepare_to_decide: Erwartung: Sich vorbereiten | Realitaet: tickets_truth +1; next=c5_s21_decision_core; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- resist_arrival: Erwartung: Der Ankunft widerstehen | Realitaet: tickets_escape +1; next=c5_s21_decision_core; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s21_decision_core (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Zug haelt
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c5_s22_decision_aftermath.
Choices:
- drift_variant_stay: Erwartung: Im Zug bleiben - alles vergessen | Realitaet: tickets_escape +3; next=c5_s22_decision_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- guilt_sacrifice: Erwartung: Aussteigen - die Verantwortung tragen | Realitaet: tickets_guilt +3; next=c5_s22_decision_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- step_out_truth: Erwartung: Aussteigen - der Wahrheit begegnen | Realitaet: tickets_truth +2; next=c5_s22_decision_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stay_in_train: Erwartung: Im Zug bleiben - weiterfahren | Realitaet: tickets_escape +2; next=c5_s22_decision_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s22_decision_aftermath (src/content/nachtzug19/scenes/c5.ts)
Situation: Deine Entscheidung ist gefallen
Stakes: Effekte beruehren tickets_guilt, tickets_truth. Alle Choices fuehren nach c5_s23_before_station.
Choices:
- accept_choice: Erwartung: Die Wahl akzeptieren | Realitaet: tickets_truth +1; next=c5_s23_before_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- doubt_choice: Erwartung: Zweifeln | Realitaet: tickets_guilt +1; next=c5_s23_before_station; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s23_before_station (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Zug faehrt langsam an
Stakes: Effekte beruehren tickets_guilt, tickets_truth. Alle Choices fuehren nach c5_s24_platform_arrives.
Choices:
- look_forward: Erwartung: Nach vorn blicken | Realitaet: tickets_truth +1; next=c5_s24_platform_arrives; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- look_back: Erwartung: Zurueckblicken | Realitaet: tickets_guilt +1; next=c5_s24_platform_arrives; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c5_s24_platform_arrives (src/content/nachtzug19/scenes/c5.ts)
Situation: Draussen taucht etwas auf
Stakes: Effekte beruehren station_count. Alle Choices fuehren nach c5_end_station.
Choices:
- prepare_to_exit: Erwartung: Bereit machen | Realitaet: station_count +1; next=c5_end_station; ending=none | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s01_awakening (src/content/nachtzug19/scenes/c6.ts)
Situation: Du sitzt wieder im Abteil
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c6_s02_silence.
Choices:
- check_surroundings: Erwartung: Die Umgebung genau ansehen | Realitaet: tickets_truth +1, memory_drift +1; next=c6_s02_silence; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- close_eyes: Erwartung: Augen schliessen und warten | Realitaet: tickets_escape +1; next=c6_s02_silence; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- walk_corridor: Erwartung: In den Gang gehen | Realitaet: tickets_truth +1; next=c6_s02_silence; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s02_silence (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Gang ist... anders
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c6_s03_comp7_final.
Choices:
- continue_walking: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c6_s03_comp7_final; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s04_corridor_changes (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Gang... veraendert sich
Stakes: Effekte beruehren tickets_truth. Alle Choices fuehren nach c6_s05_door_seven.
Choices:
- approach_door: Erwartung: Zur Tuer gehen | Realitaet: tickets_truth +1; next=c6_s05_door_seven; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s06_inside_seven (src/content/nachtzug19/scenes/c6.ts)
Situation: Du oeffnest die Tuer
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c6_s07_seven_aftermath.
Choices:
- speak_high_drift: Erwartung: "Wer bist du?" | Realitaet: tickets_truth +2, memory_drift +2; next=c6_s07_seven_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- remember_hard: Erwartung: Versuchen, sich zu erinnern | Realitaet: tickets_truth +3, tickets_guilt +1, memory_drift +1; next=c6_s07_seven_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- reach_out: Erwartung: Die Hand ausstrecken | Realitaet: tickets_love +2, memory_drift +1; next=c6_s07_seven_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- close_door_quickly: Erwartung: Die Tuer schnell schliessen | Realitaet: tickets_escape +1, tickets_guilt +1; next=c6_s07_seven_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s07_seven_aftermath (src/content/nachtzug19/scenes/c6.ts)
Situation: Du stehst wieder im Gang
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s08_drift_intensifies.
Choices:
- process_experience: Erwartung: Verarbeiten, was passiert ist | Realitaet: tickets_truth +1, tickets_guilt +1; next=c6_s08_drift_intensifies; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- forget_quickly: Erwartung: Es vergessen wollen | Realitaet: tickets_escape +1, memory_drift +1; next=c6_s08_drift_intensifies; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s08_drift_intensifies (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Zug... verschiebt sich
Stakes: Effekte beruehren memory_drift, tickets_truth. Alle Choices fuehren nach c6_s09_boy_final.
Choices:
- observe_changes: Erwartung: Die Veraenderungen beobachten | Realitaet: tickets_truth +1, memory_drift +1; next=c6_s09_boy_final; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s10_sleepless_gone (src/content/nachtzug19/scenes/c6.ts)
Situation: Du gehst zum Abteil des schlaflosen Mannes
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c6_s11_announcement.
Choices:
- take_photo: Erwartung: Das Foto mitnehmen | Realitaet: tickets_truth +1, memory_drift +1; next=c6_s11_announcement; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_photo: Erwartung: Das Foto liegen lassen | Realitaet: tickets_escape +1; next=c6_s11_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- examine_closely: Erwartung: Das Foto genau ansehen | Realitaet: tickets_truth +2, memory_drift +2; next=c6_s11_announcement; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s11_announcement (src/content/nachtzug19/scenes/c6.ts)
Situation: Die Lautsprecher knistern
Stakes: Effekte beruehren memory_drift, tickets_truth. Alle Choices fuehren nach c6_s12_mirror_self.
Choices:
- process_message: Erwartung: Ueber die Ansage nachdenken | Realitaet: tickets_truth +1, memory_drift +1; next=c6_s12_mirror_self; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s12_mirror_self (src/content/nachtzug19/scenes/c6.ts)
Situation: Du gehst zurueck zu deinem Abteil
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c6_s13_mirror_choice.
Choices:
- confront_drift: Erwartung: "Du bist nicht real." | Realitaet: tickets_truth +2, memory_drift +1; next=c6_s13_mirror_choice; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- engage_mirror: Erwartung: "Wer bist du?" | Realitaet: tickets_truth +1; next=c6_s13_mirror_choice; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- turn_away: Erwartung: Sich abwenden | Realitaet: tickets_escape +1; next=c6_s13_mirror_choice; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s13_mirror_choice (src/content/nachtzug19/scenes/c6.ts)
Situation: Die Gestalt lacht leise
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s14_mirror_aftermath.
Choices:
- take_hand_escape: Erwartung: Die Hand nehmen | Realitaet: tickets_truth +2, tickets_guilt +2; next=c6_s14_mirror_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- take_hand_guilt: Erwartung: "Zeig es mir. Ich bin bereit." | Realitaet: tickets_truth +3, tickets_guilt +1; next=c6_s14_mirror_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- refuse_hand: Erwartung: Die Hand ablehnen | Realitaet: tickets_escape +1; next=c6_s14_mirror_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- attack_mirror: Erwartung: Die Gestalt angreifen | Realitaet: tickets_guilt +1, memory_drift +2; next=c6_s14_mirror_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s14_mirror_aftermath (src/content/nachtzug19/scenes/c6.ts)
Situation: Du bist allein im Abteil
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s15_recorder_playback.
Choices:
- embrace_memory: Erwartung: Die Erinnerungen akzeptieren | Realitaet: tickets_truth +1, tickets_guilt +1; next=c6_s15_recorder_playback; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- push_away_memory: Erwartung: Die Erinnerungen verdraengen | Realitaet: tickets_escape +1, memory_drift +1; next=c6_s15_recorder_playback; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s15_recorder_playback (src/content/nachtzug19/scenes/c6.ts)
Situation: Du sitzt da und blickst auf den Kassettenrekorder
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s16_tag19_discovery.
Choices:
- play_recorder: Erwartung: Die Kassette abspielen | Realitaet: tickets_truth +3, tickets_guilt +2, memory_drift +1; next=c6_s16_tag19_discovery; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- resist_playing: Erwartung: Den Rekorder weglegen | Realitaet: tickets_escape +1; next=c6_s16_tag19_discovery; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s16_tag19_discovery (src/content/nachtzug19/scenes/c6.ts)
Situation: Du findest das Tag19-Etikett in deiner Tasche
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s17_lights_failing.
Choices:
- understand_tag: Erwartung: Die Bedeutung verstehen | Realitaet: tickets_truth +3, memory_drift +2; next=c6_s17_lights_failing; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ignore_implications: Erwartung: Es ignorieren | Realitaet: tickets_escape +1; next=c6_s17_lights_failing; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- accept_truth: Erwartung: Die Wahrheit akzeptieren | Realitaet: tickets_truth +2, tickets_guilt +1; next=c6_s17_lights_failing; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s17_lights_failing (src/content/nachtzug19/scenes/c6.ts)
Situation: Die Lichter flackern
Stakes: Effekte beruehren conductor_attention. Alle Choices fuehren nach c6_s18_offer_approach.
Choices:
- wait_for_conductor: Erwartung: Warten | Realitaet: conductor_attention +1; next=c6_s18_offer_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_02_silence/stay_quiet
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s18_offer_approach (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Schaffner steht vor dir
Stakes: Effekte beruehren tickets_escape, tickets_truth. Alle Choices fuehren nach c6_s19_offer_choice.
Choices:
- ask_about_offer_high_attention: Erwartung: "Was ist der Preis?" | Realitaet: tickets_truth +2; next=c6_s19_offer_choice; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_simply: Erwartung: "Warum bietest du mir das an?" | Realitaet: tickets_truth +1; next=c6_s19_offer_choice; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- refuse_immediately: Erwartung: "Nein." | Realitaet: tickets_escape +1; next=c6_s19_offer_choice; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s19_offer_choice (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Schaffner laechelt
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c6_s20_offer_aftermath.
Choices:
- choose_memory_love: Erwartung: "Ich will mich erinnern. Um ihretwillen." | Realitaet: tickets_love +3, tickets_truth +2; next=c6_s20_offer_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- choose_forget_escape: Erwartung: "Ich will vergessen." | Realitaet: tickets_escape +3; next=c6_s20_offer_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- refuse_choice: Erwartung: "Ich waehle weder das eine noch das andere." | Realitaet: tickets_truth +2, conductor_attention +2; next=c6_s20_offer_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- accept_truth: Erwartung: "Ich nehme die Erinnerung." | Realitaet: tickets_truth +2, tickets_guilt +1; next=c6_s20_offer_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s20_offer_aftermath (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Schaffner nickt langsam
Stakes: Effekte beruehren tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s21_final_reflection.
Choices:
- prepare_for_end: Erwartung: Sich vorbereiten | Realitaet: tickets_truth +1; next=c6_s21_final_reflection; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- doubt_choice: Erwartung: Die Wahl anzweifeln | Realitaet: tickets_guilt +1; next=c6_s21_final_reflection; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s21_final_reflection (src/content/nachtzug19/scenes/c6.ts)
Situation: Du denkst nach
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s22_conductor_last.
Choices:
- feel_ready: Erwartung: "Ja. Ich bin bereit." | Realitaet: tickets_truth +1; next=c6_s22_conductor_last; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- feel_uncertain: Erwartung: "Ich weiss es nicht." | Realitaet: tickets_guilt +1; next=c6_s22_conductor_last; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- feel_afraid: Erwartung: "Nein. Aber ich habe keine Wahl." | Realitaet: tickets_escape +1; next=c6_s22_conductor_last; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s22_conductor_last (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Schaffner erscheint ein letztes Mal
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s23_train_slows.
Choices:
- remember_high_attention: Erwartung: Sich vollstaendig erinnern | Realitaet: tickets_truth +3, tickets_guilt +2; next=c6_s23_train_slows; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- remember_partial: Erwartung: Teilweise erinnern | Realitaet: tickets_truth +2; next=c6_s23_train_slows; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- resist_memory: Erwartung: Der Erinnerung widerstehen | Realitaet: tickets_escape +1; next=c6_s23_train_slows; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s23_train_slows (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Zug wird langsamer
Stakes: Effekte beruehren tickets_truth. Alle Choices fuehren nach c6_s24_platform_ahead.
Choices:
- observe_platform: Erwartung: Den Bahnsteig beobachten | Realitaet: tickets_truth +1; next=c6_s24_platform_ahead; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s24_platform_ahead (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Bahnsteig ist... real
Stakes: Effekte beruehren tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c6_s25_final_moment.
Choices:
- feel_hope: Erwartung: Hoffnung spueren | Realitaet: tickets_love +1; next=c6_s25_final_moment; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- feel_fear: Erwartung: Angst spueren | Realitaet: tickets_guilt +1; next=c6_s25_final_moment; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- feel_peace: Erwartung: Frieden spueren | Realitaet: tickets_truth +1; next=c6_s25_final_moment; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_s25_final_moment (src/content/nachtzug19/scenes/c6.ts)
Situation: Der Zug haelt
Stakes: Effekte beruehren station_count. Alle Choices fuehren nach c6_end_station.
Choices:
- open_door: Erwartung: Die Tuer oeffnen | Realitaet: station_count +1; next=c6_end_station; ending=none | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c6_end_station (src/content/nachtzug19/scenes/c6.ts)
Situation: Du trittst hinaus
Stakes: Effekte beruehren chapter_index, station_count. Alle Choices fuehren nach c7_s01_final_approach.
Choices:
- continue_to_chapter_7: Erwartung: Weiter zur letzten Station | Realitaet: chapter_index +7, station_count +1; next=c7_s01_final_approach; ending=none | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s01_final_approach (src/content/nachtzug19/scenes/c7.ts)
Situation: Du steigst wieder ein
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c7_s02_interlude_silence.
Choices:
- observe_walls: Erwartung: Die durchsichtigen Waende beobachten | Realitaet: tickets_truth +1, memory_drift +1; next=c7_s02_interlude_silence; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- walk_quickly: Erwartung: Schnell weitergehen | Realitaet: tickets_escape +1; next=c7_s02_interlude_silence; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- touch_walls: Erwartung: Die Wand beruehren | Realitaet: tickets_truth +1; next=c7_s02_interlude_silence; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s02_interlude_silence (src/content/nachtzug19/scenes/c7.ts)
Situation: Das Rattern der Raeder... ist weg
Stakes: Effekte beruehren tickets_truth. Alle Choices fuehren nach c7_s03_comp7_goodbye.
Choices:
- accept_silence: Erwartung: Die Stille akzeptieren | Realitaet: tickets_truth +1; next=c7_s03_comp7_goodbye; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s03_comp7_goodbye (src/content/nachtzug19/scenes/c7.ts)
Situation: Du findest Comp7
Stakes: Effekte beruehren tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s04_boy_transformation.
Choices:
- say_goodbye_high_rel: Erwartung: "Danke. Fuer alles." | Realitaet: tickets_love +2, tickets_truth +1; next=c7_s04_boy_transformation; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- open_door: Erwartung: Die Tuer oeffnen | Realitaet: tickets_truth +1; next=c7_s04_boy_transformation; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- hesitate: Erwartung: Zoegern | Realitaet: tickets_guilt +1; next=c7_s04_boy_transformation; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s04_boy_transformation (src/content/nachtzug19/scenes/c7.ts)
Situation: Der Junge sitzt in seinem Abteil
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s05_interlude_timeshift.
Choices:
- comfort_boy_high_rel: Erwartung: "Du wirst es herausfinden. Ausserhalb." | Realitaet: tickets_love +2, tickets_truth +1; next=c7_s05_interlude_timeshift; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- observe_cassette: Erwartung: Das rueckwaerts laufende Band beobachten | Realitaet: tickets_truth +1, memory_drift +1; next=c7_s05_interlude_timeshift; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_quickly: Erwartung: Das Abteil verlassen | Realitaet: tickets_escape +1; next=c7_s05_interlude_timeshift; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s05_interlude_timeshift (src/content/nachtzug19/scenes/c7.ts)
Situation: Die Uhren an den Waenden...
Stakes: Effekte beruehren memory_drift. Alle Choices fuehren nach c7_s06_announcement_distorted.
Choices:
- continue_forward: Erwartung: Weitergehen | Realitaet: memory_drift +1; next=c7_s06_announcement_distorted; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s06_announcement_distorted (src/content/nachtzug19/scenes/c7.ts)
Situation: Die Lautsprecher knistern
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c7_s07_announcement_name.
Choices:
- realize_truth_high_drift: Erwartung: Die Wahrheit verstehen | Realitaet: tickets_truth +3, tickets_guilt +1; next=c7_s07_announcement_name; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- check_ticket: Erwartung: Deine Fahrkarte ansehen | Realitaet: tickets_truth +2; next=c7_s07_announcement_name; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- deny_message: Erwartung: Die Ansage ignorieren | Realitaet: tickets_escape +1; next=c7_s07_announcement_name; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s07_announcement_name (src/content/nachtzug19/scenes/c7.ts)
Situation: Die Lautsprecher knistern wieder
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s08_announcement_aftermath.
Choices:
- accept_memory_truth: Erwartung: Die Erinnerung vollstaendig annehmen | Realitaet: tickets_truth +3, tickets_guilt +2, memory_drift +1; next=c7_s08_announcement_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- accept_partial: Erwartung: Teilweise erinnern | Realitaet: tickets_truth +2, tickets_guilt +1; next=c7_s08_announcement_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- resist_memory: Erwartung: Gegen die Erinnerung ankaempfen | Realitaet: tickets_escape +2; next=c7_s08_announcement_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- weep: Erwartung: Weinen | Realitaet: tickets_guilt +1, tickets_love +1; next=c7_s08_announcement_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s08_announcement_aftermath (src/content/nachtzug19/scenes/c7.ts)
Situation: Du stehst im Gang
Stakes: Effekte beruehren tickets_guilt, tickets_truth. Alle Choices fuehren nach c7_s09_corridor_dissolve.
Choices:
- stand_up: Erwartung: Aufstehen | Realitaet: tickets_truth +1; next=c7_s09_corridor_dissolve; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stay_down: Erwartung: Sitzen bleiben | Realitaet: tickets_guilt +1; next=c7_s09_corridor_dissolve; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s09_corridor_dissolve (src/content/nachtzug19/scenes/c7.ts)
Situation: Der Gang... loest sich auf
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Alle Choices fuehren nach c7_s10_passengers_vanish.
Choices:
- enter_empty_compartment: Erwartung: Ein leeres Abteil betreten | Realitaet: tickets_truth +1, memory_drift +1; next=c7_s10_passengers_vanish; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- keep_walking: Erwartung: Weitergehen | Realitaet: tickets_escape +1; next=c7_s10_passengers_vanish; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s10_passengers_vanish (src/content/nachtzug19/scenes/c7.ts)
Situation: Du siehst sie
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s11_interlude_memory_flood.
Choices:
- call_out: Erwartung: Nach ihnen rufen | Realitaet: tickets_love +1, tickets_guilt +1; next=c7_s11_interlude_memory_flood; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- accept_solitude: Erwartung: Die Einsamkeit akzeptieren | Realitaet: tickets_truth +1; next=c7_s11_interlude_memory_flood; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- panic: Erwartung: In Panik geraten | Realitaet: tickets_escape +1; next=c7_s11_interlude_memory_flood; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s11_interlude_memory_flood (src/content/nachtzug19/scenes/c7.ts)
Situation: Die Erinnerungen kommen
Stakes: Effekte beruehren memory_drift, tickets_truth. Alle Choices fuehren nach c7_s12_seven_offer.
Choices:
- understand: Erwartung: Verstehen | Realitaet: tickets_truth +2, memory_drift +1; next=c7_s12_seven_offer; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s12_seven_offer (src/content/nachtzug19/scenes/c7.ts)
Situation: Du stehst wieder vor Abteil 7
Stakes: Effekte beruehren tickets_guilt, tickets_truth. Alle Choices fuehren nach c7_s13_seven_price.
Choices:
- enter_seven: Erwartung: Abteil 7 betreten | Realitaet: tickets_truth +3; next=c7_s13_seven_price; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- hesitate_at_door: Erwartung: An der Tuer zoegern | Realitaet: tickets_guilt +1; next=c7_s13_seven_price; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- ask_questions: Erwartung: "Was ist der Preis?" | Realitaet: tickets_truth +1; next=c7_s13_seven_price; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s13_seven_price (src/content/nachtzug19/scenes/c7.ts)
Situation: Du trittst ein
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s14_seven_decision.
Choices:
- leave_shadow: Erwartung: "Ich muss diesen Teil loslassen." | Realitaet: tickets_truth +2, tickets_guilt +2; next=c7_s14_seven_decision; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- embrace_shadow: Erwartung: "Wir gehen zusammen." | Realitaet: tickets_love +3, tickets_truth +1; next=c7_s14_seven_decision; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- stay_together: Erwartung: "Wir bleiben beide." | Realitaet: tickets_escape +3; next=c7_s14_seven_decision; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- refuse_choice: Erwartung: "Es gibt einen anderen Weg." | Realitaet: tickets_truth +1; next=c7_s14_seven_decision; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s14_seven_decision (src/content/nachtzug19/scenes/c7.ts)
Situation: Die Gestalt nickt
Stakes: Effekte beruehren tickets_guilt, tickets_truth. Alle Choices fuehren nach c7_s15_recorder_trigger.
Choices:
- feel_complete: Erwartung: Sich vollstaendig fuehlen | Realitaet: tickets_truth +1; next=c7_s15_recorder_trigger; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- feel_fractured: Erwartung: Sich zerbrochen fuehlen | Realitaet: tickets_guilt +1; next=c7_s15_recorder_trigger; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s17_recorder_truth (src/content/nachtzug19/scenes/c7.ts)
Situation: Die Kassette laeuft weiter
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s18_recorder_aftermath.
Choices:
- accept_death: Erwartung: "Ich bin bereit." | Realitaet: tickets_truth +3, tickets_guilt +1; next=c7_s18_recorder_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- deny_death: Erwartung: "Das ist nicht wahr." | Realitaet: tickets_escape +2; next=c7_s18_recorder_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- cry: Erwartung: Weinen | Realitaet: tickets_guilt +1, tickets_love +1; next=c7_s18_recorder_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s18_recorder_aftermath (src/content/nachtzug19/scenes/c7.ts)
Situation: Du legst den Rekorder weg
Stakes: Effekte beruehren tickets_escape, tickets_truth. Alle Choices fuehren nach c7_s19_interlude_train_stops.
Choices:
- choose_leave: Erwartung: Gehen | Realitaet: tickets_truth +2; next=c7_s19_interlude_train_stops; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- choose_stay: Erwartung: Bleiben | Realitaet: tickets_escape +2; next=c7_s19_interlude_train_stops; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s19_interlude_train_stops (src/content/nachtzug19/scenes/c7.ts)
Situation: Der Zug... haelt
Stakes: Effekte beruehren tickets_truth. Alle Choices fuehren nach c7_s20_conductor_finale.
Choices:
- prepare: Erwartung: Sich vorbereiten | Realitaet: tickets_truth +1; next=c7_s20_conductor_finale; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s20_conductor_finale (src/content/nachtzug19/scenes/c7.ts)
Situation: Der Schaffner erscheint
Stakes: Effekte beruehren tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s21_photo_revelation.
Choices:
- thank_conductor_high_attention: Erwartung: "Danke. Fuer alles." | Realitaet: tickets_love +2, tickets_truth +1; next=c7_s21_photo_revelation; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- say_nothing: Erwartung: Schweigen | Realitaet: tickets_guilt +1; next=c7_s21_photo_revelation; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- take_ticket: Erwartung: Die Fahrkarte nehmen | Realitaet: tickets_truth +1; next=c7_s21_photo_revelation; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s21_photo_revelation (src/content/nachtzug19/scenes/c7.ts)
Situation: Du erinnerst dich an das Foto
Stakes: Effekte beruehren tickets_escape, tickets_truth. Alle Choices fuehren nach c7_s22_tag19_final.
Choices:
- understand_photo: Erwartung: Das Foto verstehen | Realitaet: tickets_truth +2; next=c7_s22_tag19_final; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- put_away_photo: Erwartung: Das Foto weglegen | Realitaet: tickets_escape +1; next=c7_s22_tag19_final; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s22_tag19_final (src/content/nachtzug19/scenes/c7.ts)
Situation: Das Tag19-Etikett
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c7_s23_interlude_doors_open.
Choices:
- let_go_tag: Erwartung: Loslassen | Realitaet: tickets_truth +2; next=c7_s23_interlude_doors_open; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- keep_tag: Erwartung: Festhalten | Realitaet: tickets_guilt +1; next=c7_s23_interlude_doors_open; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- no_tag: Erwartung: Weitergehen | Realitaet: tickets_escape +1; next=c7_s23_interlude_doors_open; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s23_interlude_doors_open (src/content/nachtzug19/scenes/c7.ts)
Situation: Die Tueren...
Stakes: Effekte beruehren tickets_truth. Alle Choices fuehren nach c7_s24_platform_real.
Choices:
- step_forward: Erwartung: Einen Schritt nach vorne | Realitaet: tickets_truth +1; next=c7_s24_platform_real; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s24_platform_real (src/content/nachtzug19/scenes/c7.ts)
Situation: Du trittst hinaus
Stakes: Effekte beruehren tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c7_s25_final_choice.
Choices:
- look_around: Erwartung: Sich umsehen | Realitaet: tickets_truth +1; next=c7_s25_final_choice; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- look_back: Erwartung: Zurueckblicken | Realitaet: tickets_escape +1; next=c7_s25_final_choice; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- breathe: Erwartung: Tief einatmen | Realitaet: tickets_love +1; next=c7_s25_final_choice; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: WACKELT (Alle Choices gleicher next; nur Tickets/Attention/Drift)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c7_s25_final_choice (src/content/nachtzug19/scenes/c7.ts)
Situation: Du stehst auf dem Bahnsteig
Stakes: Effekte beruehren station_count. Alle Choices fuehren nach c7_end_station.
Choices:
- step_off: Erwartung: Aussteigen | Realitaet: station_count +1; next=c7_end_station; ending=none | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
Urteil: WACKELT (Nur eine Choice)
Minimaler Fix: Choice-Text schaerfen oder minimalen Preis/Feedback (z.B. attention/drift) anhaengen, damit die Wahl spuerbar wird.

### c1_s03_inside_train (src/content/nachtzug19/scenes/c1.ts)
Situation: Der Zug setzt sich in Bewegung - sanft, als wuerde er schweben
Stakes: Effekte beruehren rel_sleepless, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- talk_to_man: Erwartung: Den Mann ansprechen | Realitaet: tickets_love +1, rel_sleepless +1; next=c1_s04_sleepless_intro; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- examine_suitcase: Erwartung: Den Koffer untersuchen | Realitaet: tickets_truth +1; next=c1_s03a_corridor_walk; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- find_seat: Erwartung: Einfach einen Platz suchen | Realitaet: tickets_escape +1; next=c1_s03a_corridor_walk; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s04_sleepless_intro (src/content/nachtzug19/scenes/c1.ts)
Situation: Der Mann steht im Gang
Stakes: Effekte beruehren rel_sleepless, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c1_s04a_sleepless_past.
Choices:
- ask_where: Erwartung: "Wo faehrt der Zug hin?" | Realitaet: tickets_truth +1, rel_sleepless +1; next=c1_s04a_sleepless_past; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_how_long: Erwartung: "Wie lange bist du schon hier?" | Realitaet: tickets_love +1, rel_sleepless +1; next=c1_s04a_sleepless_past; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- deny: Erwartung: "Das kann nicht sein." | Realitaet: tickets_escape +1, rel_sleepless +1; next=c1_s04a_sleepless_past; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s04a_sleepless_past (src/content/nachtzug19/scenes/c1.ts)
Situation: Der Schlaflose lehnt sich gegen die Wand
Stakes: Effekte beruehren rel_sleepless, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c1_interlude_03_window.
Choices:
- admit_searching: Erwartung: "Ich suche jemanden." | Realitaet: tickets_love +1, rel_sleepless +2; next=c1_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- admit_running: Erwartung: "Ich laufe weg." | Realitaet: tickets_guilt +1, rel_sleepless +1; next=c1_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- ask_about_watch: Erwartung: "Was ist mit deiner Uhr passiert?" | Realitaet: tickets_truth +1, rel_sleepless +1; next=c1_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s04b_sleepless_warning (src/content/nachtzug19/scenes/c1.ts)
Situation: Der Schlaflose ruft von seinem Platz: "Wenn der Schaffner kommt-"
Stakes: Effekte beruehren conductor_attention, rel_sleepless, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c1_s05_first_anomaly.
Choices:
- thank_him: Erwartung: "Danke." | Realitaet: tickets_love +1, rel_sleepless +1; next=c1_s05_first_anomaly; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- ask_more: Erwartung: "Was meinst du mit anders?" | Realitaet: tickets_truth +1, conductor_attention +1; next=c1_s05_first_anomaly; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- dismiss: Erwartung: "Ich komme schon klar." | Realitaet: tickets_escape +1; next=c1_s05_first_anomaly; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s05_first_anomaly (src/content/nachtzug19/scenes/c1.ts)
Situation: Eine Lautsprecherdurchsage knistert durch den Wagen:
Stakes: Effekte beruehren conductor_attention, memory_drift, rel_sleepless, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- write_it_down: Erwartung: Versuche, es aufzuschreiben | Realitaet: tickets_truth +1, conductor_attention +1; next=c1_interlude_04_clock; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ignore_anomaly: Erwartung: Ignorieren und weitergehen | Realitaet: tickets_escape +1; next=c1_s05a_other_passengers; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_sleepless: Erwartung: Den Schlaflosen fragen | Realitaet: tickets_love +1, rel_sleepless +1; next=c1_s05a_other_passengers; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- analyze_announcement: Erwartung: Die Durchsage aufmerksam analysieren | Realitaet: tickets_truth +1, memory_drift +1; next=c1_interlude_04_clock; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s05b_compartment7_tease (src/content/nachtzug19/scenes/c1.ts)
Situation: Du gehst weiter durch den Wagen
Stakes: Effekte beruehren conductor_attention, rel_comp7, rel_sleepless, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c1_s05c_announcement_repeat.
Choices:
- knock_on_door: Erwartung: An die Tuer klopfen | Realitaet: tickets_truth +1, conductor_attention +2, rel_comp7 +1; next=c1_s05c_announcement_repeat; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- listen_to_sleepless: Erwartung: Auf den Schlaflosen hoeren | Realitaet: tickets_escape +1, rel_sleepless +1; next=c1_s05c_announcement_repeat; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- feel_drawn: Erwartung: Die Hand auf die Tuer legen | Realitaet: tickets_love +1, rel_comp7 +1; next=c1_s05c_announcement_repeat; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- examine_door_quietly: Erwartung: Die Tuer untersuchen, ohne zu klopfen | Realitaet: tickets_truth +1, rel_comp7 +1; next=c1_s05c_announcement_repeat; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s05c_announcement_repeat (src/content/nachtzug19/scenes/c1.ts)
Situation: Die Durchsage wiederholt sich
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- follow_woman: Erwartung: Der Frau folgen | Realitaet: tickets_truth +1; next=c1_s05d_comp7_listen; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- repeat_word: Erwartung: Das Wort leise wiederholen | Realitaet: tickets_truth +1, memory_drift +1; next=c1_s05d_comp7_listen; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stay_back: Erwartung: Zurueckbleiben | Realitaet: tickets_escape +1; next=c1_s06_corridor_end; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s05d_comp7_listen (src/content/nachtzug19/scenes/c1.ts)
Situation: Du gehst zurueck zu Abteil 7
Stakes: Effekte beruehren conductor_attention, rel_comp7, tickets_guilt, tickets_love. Alle Choices fuehren nach c1_s06_corridor_end.
Choices:
- knock_again: Erwartung: Klopfen | Realitaet: tickets_love +1, conductor_attention +1, rel_comp7 +1; next=c1_s06_corridor_end; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- step_away: Erwartung: Zuruecktreten | Realitaet: tickets_guilt +1; next=c1_s06_corridor_end; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- speak_through_door: Erwartung: Leise durch die Tuer sprechen | Realitaet: tickets_love +1, rel_comp7 +2; next=c1_s06_corridor_end; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_s06_corridor_end (src/content/nachtzug19/scenes/c1.ts)
Situation: Du gehst zurueck durch den Gang
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- enter_next_wagon: Erwartung: Den naechsten Wagen betreten | Realitaet: tickets_truth +1, memory_drift +1; next=c1_s07_stranger_encounter; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stay_in_wagon: Erwartung: Im Wagen bleiben | Realitaet: tickets_escape +1; next=c1_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_end_platform_look (src/content/nachtzug19/scenes/c1.ts)
Situation: Du gehst zurueck ans Fenster
Stakes: Effekte beruehren conductor_attention, memory_drift, rel_sleepless, tickets_love, tickets_truth. Alle Choices fuehren nach c1_end_station.
Choices:
- ask_woman: Erwartung: Die Frau fragen | Realitaet: tickets_love +1, conductor_attention +1; next=c1_end_station; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- observe_silently: Erwartung: Beobachten, nichts sagen | Realitaet: tickets_truth +1; next=c1_end_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_sleepless: Erwartung: Den Schlaflosen leise fragen | Realitaet: tickets_love +1, rel_sleepless +1, conductor_attention +1; next=c1_end_station; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- check_clock_again: Erwartung: Die Uhr ueberpruefen | Realitaet: tickets_truth +1, memory_drift +1; next=c1_end_station; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c1_end_station (src/content/nachtzug19/scenes/c1.ts)
Situation: Als du dich umdrehst, faellt dir etwas auf:
Stakes: Effekte beruehren chapter_index, conductor_attention, memory_drift, rel_sleepless, station_count, tickets_guilt, tickets_truth. Alle Choices fuehren nach c2_s01_ticket_search.
Choices:
- continue_to_chapter_2: Erwartung: Weiter | Realitaet: chapter_index +2, station_count +1, memory_drift +1; next=c2_s01_ticket_search; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
- confront_jacket_change: Erwartung: Die Jackenfarbe direkt ansprechen | Realitaet: chapter_index +2, station_count +1, memory_drift +2, tickets_truth +1, rel_sleepless +1; next=c2_s01_ticket_search; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears, c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- nod_to_conductor: Erwartung: Dem Schaffner zunicken | Realitaet: chapter_index +2, station_count +1, conductor_attention +1, tickets_guilt +1; next=c2_s01_ticket_search; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_02_silence/stay_quiet
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s01_ticket_search (src/content/nachtzug19/scenes/c2.ts)
Situation: Der Zug faehrt weiter
Stakes: Effekte beruehren conductor_attention, rel_boy, tickets_escape, tickets_guilt, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- ask_boy: Erwartung: Den Jungen ansprechen | Realitaet: tickets_love +1, rel_boy +1; next=c2_s02_boy_recorder; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- examine_passengers: Erwartung: Andere Passagiere beobachten | Realitaet: tickets_truth +1; next=c2_s01a_passenger_examination; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- search_self: Erwartung: Die eigenen Taschen durchsuchen | Realitaet: tickets_escape +1; next=c2_s01b_ticket_pocket; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- keep_walking: Erwartung: Weitergehen | Realitaet: tickets_guilt +1, conductor_attention +1; next=c2_s01a_passenger_examination; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s01a_passenger_examination (src/content/nachtzug19/scenes/c2.ts)
Situation: Du bleibst im Gang stehen
Stakes: Effekte beruehren conductor_attention, rel_boy, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- approach_newspaper_woman: Erwartung: Die Frau mit der Zeitung ansprechen | Realitaet: tickets_truth +1, conductor_attention +1; next=c2_interlude_01_toilet; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- watch_laptop_man: Erwartung: Den Mann mit Laptop beobachten | Realitaet: tickets_escape +1; next=c2_s02_boy_recorder; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- go_to_boy: Erwartung: Zum Jungen gehen | Realitaet: tickets_love +1, rel_boy +1; next=c2_s02_boy_recorder; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s01b_ticket_pocket (src/content/nachtzug19/scenes/c2.ts)
Situation: Du greifst in deine Jackentasche
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- keep_note: Erwartung: Den Zettel behalten | Realitaet: tickets_truth +1, memory_drift +1; next=c2_interlude_01_toilet; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- throw_away: Erwartung: Den Zettel zerreissen | Realitaet: tickets_escape +1; next=c2_s02_boy_recorder; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s02_boy_recorder (src/content/nachtzug19/scenes/c2.ts)
Situation: Der Junge nimmt die Kopfhoerer ab
Stakes: Effekte beruehren has_recorder, memory_drift, rel_boy, tickets_guilt, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- take_recorder: Erwartung: Den Rekorder nehmen | Realitaet: has_recorder true, tickets_truth +1, rel_boy +1; next=c2_s02a_recorder_listening; ending=none | Konsequenz sichtbar? ja: c2_control_01_question/use_recorder, c2_end_station/play_recorder
- refuse_recorder: Erwartung: "Das kann ich nicht annehmen" | Realitaet: tickets_guilt +1, rel_boy +1; next=c2_s02b_corridor_anomaly; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- ask_why: Erwartung: "Warum gibst du mir das?" | Realitaet: has_recorder true, tickets_love +1, rel_boy +2; next=c2_s02a_recorder_listening; ending=none | Konsequenz sichtbar? ja: c2_control_01_question/use_recorder, c2_end_station/play_recorder
- observe_boy_silently: Erwartung: Den Jungen stumm beobachten | Realitaet: memory_drift +1; next=c2_s02b_corridor_anomaly; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s02a_recorder_listening (src/content/nachtzug19/scenes/c2.ts)
Situation: Du nimmst den Rekorder
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- rewind_again: Erwartung: Noch einmal zurueckspulen | Realitaet: tickets_truth +1, memory_drift +1; next=c2_s02b_corridor_anomaly; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- put_away: Erwartung: Den Rekorder weglegen | Realitaet: tickets_escape +1; next=c2_s02c_boy_vanish; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- keep_listening: Erwartung: Weiterhoeren | Realitaet: tickets_truth +2, memory_drift +1; next=c2_s02c_boy_vanish; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s02b_corridor_anomaly (src/content/nachtzug19/scenes/c2.ts)
Situation: Du gehst weiter durch den Gang
Stakes: Effekte beruehren conductor_attention, memory_drift, rel_sleepless, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- count_compartments: Erwartung: Die Abteile zaehlen | Realitaet: tickets_truth +1, memory_drift +1; next=c2_interlude_02_window_dark; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- check_sleepless: Erwartung: Zum Schlaflosen zurueckgehen | Realitaet: tickets_escape +1, rel_sleepless +1; next=c2_s03_comp7_intro; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- approach_lit_compartment: Erwartung: Zum beleuchteten Abteil gehen | Realitaet: tickets_love +1; next=c2_s03_comp7_intro; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- question_reality: Erwartung: Laut fragen: "Was passiert hier?" | Realitaet: tickets_truth +1, conductor_attention +1; next=c2_interlude_02_window_dark; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s02c_boy_vanish (src/content/nachtzug19/scenes/c2.ts)
Situation: Du gehst zurueck zu dem Abteil, wo der Junge sass
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_guilt, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- insist_boy_real: Erwartung: "Er war hier. Ich habe ihn gesehen." | Realitaet: tickets_truth +1, conductor_attention +1; next=c2_interlude_02_window_dark; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- doubt_self: Erwartung: An sich selbst zweifeln | Realitaet: tickets_guilt +1, memory_drift +2; next=c2_s03_comp7_intro; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s03_comp7_intro (src/content/nachtzug19/scenes/c2.ts)
Situation: Du gehst weiter
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c2_s03a_comp7_notebook.
Choices:
- ask_notebook: Erwartung: "Was schreibst du auf?" | Realitaet: tickets_truth +1, rel_comp7 +1; next=c2_s03a_comp7_notebook; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_name: Erwartung: "Du weisst deinen Namen nicht?" | Realitaet: tickets_love +1, rel_comp7 +1; next=c2_s03a_comp7_notebook; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- deny_amnesia: Erwartung: "Ich weiss meinen Namen." | Realitaet: tickets_escape +1, memory_drift +1; next=c2_s03a_comp7_notebook; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s03a_comp7_notebook (src/content/nachtzug19/scenes/c2.ts)
Situation: Comp7 schiebt das Notizbuch zu dir
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- read_future: Erwartung: Die naechste Seite lesen | Realitaet: tickets_truth +2, memory_drift +1, rel_comp7 +1; next=c2_s03b_comp7_warning; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- refuse_knowledge: Erwartung: "Ich will es nicht wissen" | Realitaet: tickets_escape +1, rel_comp7 +1; next=c2_interlude_03_announcement_glitch; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_purpose: Erwartung: "Warum schreibst du das auf?" | Realitaet: tickets_love +1, rel_comp7 +2; next=c2_s03b_comp7_warning; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s03b_comp7_warning (src/content/nachtzug19/scenes/c2.ts)
Situation: Du liest die naechste Seite:
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- thank_comp7: Erwartung: "Danke." | Realitaet: tickets_love +1, rel_comp7 +1; next=c2_interlude_03_announcement_glitch; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- ask_more_options: Erwartung: "Was sind die anderen Optionen?" | Realitaet: tickets_truth +1; next=c2_interlude_03_announcement_glitch; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_quickly: Erwartung: Schnell gehen | Realitaet: tickets_escape +1; next=c2_s04_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s04_announcement (src/content/nachtzug19/scenes/c2.ts)
Situation: Die Lautsprecherdurchsage wieder, diesmal klar:
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_guilt, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- prepare_truth: Erwartung: "Ich sage die Wahrheit" | Realitaet: tickets_truth +1; next=c2_s04a_conductor_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- prepare_lie: Erwartung: "Ich erfinde eine Geschichte" | Realitaet: tickets_escape +1, conductor_attention +1; next=c2_s04a_conductor_approach; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- prepare_hide: Erwartung: "Ich verstecke mich" | Realitaet: tickets_guilt +1, conductor_attention +2; next=c2_s04b_passengers_shift; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s04a_conductor_approach (src/content/nachtzug19/scenes/c2.ts)
Situation: Du stehst im Gang zwischen Abteil 3 und 4
Stakes: Effekte beruehren conductor_attention, rel_comp7, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- stand_ready: Erwartung: Stehenbleiben und warten | Realitaet: tickets_truth +1; next=c2_interlude_04_lights; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- move_to_next_car: Erwartung: In den naechsten Wagen gehen | Realitaet: tickets_escape +1, conductor_attention +2; next=c2_s04b_passengers_shift; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_comp7_help: Erwartung: Comp7 um Hilfe bitten | Realitaet: tickets_love +1, rel_comp7 +1; next=c2_interlude_04_lights; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_control_01_approach (src/content/nachtzug19/scenes/c2.ts)
Situation: Der Schaffner steht vor dir
Stakes: Effekte beruehren conductor_attention, rel_sleepless, tickets_escape, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c2_control_01_question.
Choices:
- wait_silent: Erwartung: Schweigend warten | Realitaet: tickets_truth +1; next=c2_control_01_question; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- look_to_sleepless: Erwartung: Kurz zum Schlaflosen blicken | Realitaet: tickets_love +1, rel_sleepless +1, conductor_attention +1; next=c2_control_01_question; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- interrupt: Erwartung: "Was bedeutet das?" | Realitaet: tickets_escape +1, conductor_attention +1; next=c2_control_01_question; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- apologize: Erwartung: "Es tut mir leid." | Realitaet: tickets_guilt +1; next=c2_control_01_question; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_control_01_aftermath (src/content/nachtzug19/scenes/c2.ts)
Situation: Der Schaffner nickt
Stakes: Effekte beruehren memory_drift, rel_comp7, rel_sleepless, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- confront_sleepless: Erwartung: "Deine Jacke. Sie aendert sich staendig." | Realitaet: tickets_truth +1, rel_sleepless +1, memory_drift +1; next=c2_s05a_sleepless_talk; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_comp7_meaning: Erwartung: Comp7: "Was bedeutet das alles?" | Realitaet: tickets_love +1, rel_comp7 +1; next=c2_s05b_reality_shift; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- stay_silent: Erwartung: Schweigen und nachdenken | Realitaet: tickets_escape +1; next=c2_s05b_reality_shift; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s05a_sleepless_talk (src/content/nachtzug19/scenes/c2.ts)
Situation: Der Schlaflose sieht dich an
Stakes: Effekte beruehren rel_sleepless, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- accept_truth: Erwartung: "Ich glaube dir." | Realitaet: tickets_truth +1, rel_sleepless +2; next=c2_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_for_anchor: Erwartung: "Sag mir, was sich nicht aendert." | Realitaet: tickets_truth +1, rel_sleepless +1; next=c2_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- reject_truth: Erwartung: "Das kann nicht sein." | Realitaet: tickets_escape +1, rel_sleepless +1; next=c2_s05b_reality_shift; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_s05b_reality_shift (src/content/nachtzug19/scenes/c2.ts)
Situation: Du siehst aus dem Fenster
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_truth. Alle Choices fuehren nach c2_interlude_05_vibration.
Choices:
- ask_comp7_more: Erwartung: "Wann bin ich bereit?" | Realitaet: tickets_truth +1, rel_comp7 +1; next=c2_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ignore_vision: Erwartung: Nicht darueber nachdenken | Realitaet: tickets_escape +1; next=c2_interlude_05_vibration; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c2_end_station (src/content/nachtzug19/scenes/c2.ts)
Situation: Du drehst dich um
Stakes: Effekte beruehren chapter_index, memory_drift, rel_boy, rel_comp7, station_count, tickets_love. Alle Choices fuehren nach c3_s01_wagen7_locked.
Choices:
- play_recorder: Erwartung: Die Aufnahme vorspielen | Realitaet: chapter_index +3, station_count +1, memory_drift +1, rel_comp7 +1; next=c3_s01_wagen7_locked; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears, c1_s05b_compartment7_tease/examine_door_quietly, c1_s05d_comp7_listen/speak_through_door
- continue_to_chapter_3: Erwartung: Weiter | Realitaet: chapter_index +3, station_count +1, memory_drift +1; next=c3_s01_wagen7_locked; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears
- think_of_boy: Erwartung: An den Jungen denken | Realitaet: chapter_index +3, station_count +1, memory_drift +1, rel_boy +1, tickets_love +1; next=c3_s01_wagen7_locked; ending=none | Konsequenz sichtbar? ja: c1_s01_platform, c1_s02_train_appears, c2_end_station/think_of_boy, c4_s03_passengers_return/talk_to_boy
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s01a_after_station (src/content/nachtzug19/scenes/c3.ts)
Situation: Der Zug faehrt weiter
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- take_notebook: Erwartung: Das Notizbuch nehmen | Realitaet: tickets_truth +1, rel_comp7 +1; next=c3_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_notebook: Erwartung: Das Notizbuch liegenlassen | Realitaet: tickets_escape +1; next=c3_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- read_notebook: Erwartung: Im Notizbuch lesen | Realitaet: tickets_truth +2, memory_drift +1; next=c3_s01b_boy_return; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s01b_boy_return (src/content/nachtzug19/scenes/c3.ts)
Situation: Der Junge sitzt wieder in seinem Abteil
Stakes: Effekte beruehren rel_boy, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- play_own_recorder: Erwartung: Den eigenen Rekorder abspielen | Realitaet: tickets_truth +1, rel_boy +1; next=c3_s02_recorder_anomaly; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- refuse_to_check: Erwartung: "Ich will es nicht wissen" | Realitaet: tickets_escape +1, rel_boy +1; next=c3_interlude_02_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_about_duplication: Erwartung: "Was meinst du mit "mehr"?" | Realitaet: tickets_love +1, rel_boy +1; next=c3_s02_recorder_anomaly; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s02_recorder_anomaly (src/content/nachtzug19/scenes/c3.ts)
Situation: Du drueckst auf Play
Stakes: Effekte beruehren memory_drift, rel_boy, tickets_guilt, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- listen_more: Erwartung: Weiterhoeren | Realitaet: tickets_truth +2, memory_drift +1; next=c3_s02a_recorder_listening; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stop_recorder: Erwartung: Den Rekorder ausschalten | Realitaet: tickets_guilt +1; next=c3_interlude_02_announcement; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- ask_boy_how: Erwartung: "Wie funktioniert das?" | Realitaet: tickets_love +1, rel_boy +2; next=c3_s02a_recorder_listening; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s02a_recorder_listening (src/content/nachtzug19/scenes/c3.ts)
Situation: Die Kassette laeuft weiter
Stakes: Effekte beruehren rel_boy, tickets_escape, tickets_truth. Alle Choices fuehren nach c3_s02b_corridor_shift.
Choices:
- ask_what_answer: Erwartung: "Welche Antwort soll ich geben?" | Realitaet: tickets_truth +1, rel_boy +1; next=c3_s02b_corridor_shift; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- take_recorder_back: Erwartung: Den Rekorder zuruecknehmen | Realitaet: tickets_escape +1; next=c3_s02b_corridor_shift; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s02b_corridor_shift (src/content/nachtzug19/scenes/c3.ts)
Situation: Du gehst durch den Gang
Stakes: Effekte beruehren memory_drift, rel_sleepless, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- ignore_sleepless: Erwartung: Weitergehen ohne zu reagieren | Realitaet: tickets_escape +1; next=c3_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- talk_to_sleepless: Erwartung: Zum Schlaflosen gehen | Realitaet: tickets_truth +1, rel_sleepless +1; next=c3_s02c_sleepless_talk; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- count_compartments: Erwartung: Die Abteile nochmal zaehlen | Realitaet: tickets_truth +1, memory_drift +1; next=c3_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s02c_sleepless_talk (src/content/nachtzug19/scenes/c3.ts)
Situation: Du setzt dich neben den Schlaflosen
Stakes: Effekte beruehren rel_sleepless, tickets_escape, tickets_guilt. Alle Choices fuehren nach c3_interlude_03_window.
Choices:
- ask_what_to_give: Erwartung: "Was soll ich geben?" | Realitaet: tickets_guilt +1, rel_sleepless +1; next=c3_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- refuse_advice: Erwartung: "Ich finde einen anderen Weg" | Realitaet: tickets_escape +1, rel_sleepless +1; next=c3_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s03_wagen7_approach (src/content/nachtzug19/scenes/c3.ts)
Situation: Du gehst nach vorne
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- enter_immediately: Erwartung: Sofort eintreten | Realitaet: tickets_escape +1; next=c3_s03b_inside_comp7; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- examine_door: Erwartung: Die Tuer untersuchen | Realitaet: tickets_truth +1; next=c3_s03a_compartment7_door; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- call_out: Erwartung: "Comp7?" | Realitaet: tickets_love +1, rel_comp7 +1; next=c3_s03a_compartment7_door; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s03a_compartment7_door (src/content/nachtzug19/scenes/c3.ts)
Situation: Du stehst vor der Tuer
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_truth. Alle Choices fuehren nach c3_s03b_inside_comp7.
Choices:
- enter_cautiously: Erwartung: Vorsichtig eintreten | Realitaet: tickets_truth +1, rel_comp7 +1; next=c3_s03b_inside_comp7; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_from_doorway: Erwartung: "Was ist das hier?" | Realitaet: tickets_escape +1; next=c3_s03b_inside_comp7; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s03b_inside_comp7 (src/content/nachtzug19/scenes/c3.ts)
Situation: Du trittst ein
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- examine_notebooks: Erwartung: Die Notizbuecher untersuchen | Realitaet: tickets_truth +2, memory_drift +1; next=c3_s03c_notebooks_explore; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- look_out_window: Erwartung: Aus dem Fenster schauen | Realitaet: tickets_escape +1, memory_drift +1; next=c3_interlude_04_corridor; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_comp7_explain: Erwartung: "Erklaere mir das" | Realitaet: tickets_love +1, rel_comp7 +2; next=c3_s04_comp7_truth; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s03c_notebooks_explore (src/content/nachtzug19/scenes/c3.ts)
Situation: Du gehst zu den Notizbuechern
Stakes: Effekte beruehren memory_drift, photo_anomaly, tickets_escape, tickets_truth. Alle Choices fuehren nach c3_s04_comp7_truth.
Choices:
- ask_when: Erwartung: "Wann war ich hier?" | Realitaet: tickets_truth +1, memory_drift +1; next=c3_s04_comp7_truth; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- deny: Erwartung: "Das kann nicht sein" | Realitaet: tickets_escape +1; next=c3_s04_comp7_truth; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- examine_photo: Erwartung: Das Foto genauer betrachten | Realitaet: tickets_truth +1, photo_anomaly true, memory_drift +1; next=c3_s04_comp7_truth; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- read_own_entry: Erwartung: Nach dem eigenen Eintrag suchen | Realitaet: tickets_truth +2, memory_drift +2; next=c3_s04_comp7_truth; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s04_comp7_truth (src/content/nachtzug19/scenes/c3.ts)
Situation: Comp7 blaettert in einem der Notizbuecher
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_guilt, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- accept_truth: Erwartung: "Ich verstehe" | Realitaet: tickets_truth +2, rel_comp7 +1; next=c3_s04a_paradox_window; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- deny_truth: Erwartung: "Das kann nicht sein" | Realitaet: tickets_escape +1, rel_comp7 +1; next=c3_interlude_05_mirror; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_who: Erwartung: "Wer haelt uns hier?" | Realitaet: tickets_guilt +1, rel_comp7 +1; next=c3_s04a_paradox_window; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s04b_third_announcement (src/content/nachtzug19/scenes/c3.ts)
Situation: Die Lautsprecher knacken
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c3_control_02_approach.
Choices:
- hide_in_comp7: Erwartung: In Wagen 7 bleiben | Realitaet: tickets_escape +1, rel_comp7 +1; next=c3_control_02_approach; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- go_to_control: Erwartung: Rausgehen zur Kontrolle | Realitaet: tickets_truth +1; next=c3_control_02_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_comp7_help: Erwartung: Comp7 um Hilfe bitten | Realitaet: tickets_love +1, rel_comp7 +2; next=c3_control_02_approach; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_control_02_question (src/content/nachtzug19/scenes/c3.ts)
Situation: Der Schaffner steht vor dir
Stakes: Effekte beruehren conductor_attention, has_recorder, tickets_guilt, tickets_love, tickets_truth. Alle Choices fuehren nach c3_control_02_aftermath.
Choices:
- offer_recorder: Erwartung: Den Rekorder anbieten | Realitaet: has_recorder false, tickets_guilt +2, conductor_attention +2; next=c3_control_02_aftermath; ending=none | Konsequenz sichtbar? ja: c2_control_01_question/use_recorder, c2_end_station/play_recorder
- offer_recorder_memory: Erwartung: Vom Rekorder erzaehlen (Erinnerung) | Realitaet: tickets_truth +1, conductor_attention +1; next=c3_control_02_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- offer_truth: Erwartung: "Die Wahrheit: Rueckfahrt." | Realitaet: tickets_truth +2, conductor_attention +1; next=c3_control_02_aftermath; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- offer_someone: Erwartung: "Was meinst du mit "jemandem"?" | Realitaet: tickets_love +2, conductor_attention +1; next=c3_control_02_aftermath; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_control_02_aftermath (src/content/nachtzug19/scenes/c3.ts)
Situation: Der Schaffner bleibt stehen
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c3_s06_passengers_vanish.
Choices:
- thank_comp7: Erwartung: "Danke" | Realitaet: tickets_love +1, rel_comp7 +2; next=c3_s06_passengers_vanish; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- ask_how_many: Erwartung: "Wie viele Stationen noch?" | Realitaet: tickets_truth +1; next=c3_s06_passengers_vanish; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- walk_away: Erwartung: Weggehen ohne zu antworten | Realitaet: tickets_escape +1, rel_comp7 +1; next=c3_s06_passengers_vanish; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s06_passengers_vanish (src/content/nachtzug19/scenes/c3.ts)
Situation: Du gehst durch den Gang
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c3_s06a_drift_intensifies.
Choices:
- go_to_comp7: Erwartung: Zu Comp7 zurueckgehen | Realitaet: tickets_love +1, rel_comp7 +1; next=c3_s06a_drift_intensifies; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- search_train: Erwartung: Den Zug durchsuchen | Realitaet: tickets_truth +1, memory_drift +1; next=c3_s06a_drift_intensifies; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- sit_down: Erwartung: Sich hinsetzen und warten | Realitaet: tickets_escape +1; next=c3_s06a_drift_intensifies; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s06a_drift_intensifies (src/content/nachtzug19/scenes/c3.ts)
Situation: Der Gang veraendert sich
Stakes: Effekte beruehren rel_boy, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- talk_to_boy: Erwartung: Mit dem Jungen reden | Realitaet: tickets_love +1, rel_boy +1; next=c3_s06b_boy_final; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- ignore_boy: Erwartung: Weitergehen | Realitaet: tickets_escape +1; next=c3_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_where_others: Erwartung: "Wo sind die anderen?" | Realitaet: tickets_truth +1; next=c3_s06b_boy_final; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c3_s06b_boy_final (src/content/nachtzug19/scenes/c3.ts)
Situation: Du setzt dich neben den Jungen
Stakes: Effekte beruehren has_recorder, rel_boy, tickets_love, tickets_truth. Alle Choices fuehren nach c3_end_platform_watch.
Choices:
- take_boys_recorder: Erwartung: Den Rekorder nehmen | Realitaet: tickets_truth +1, has_recorder true; next=c3_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_recorder: Erwartung: Den Rekorder beim Jungen lassen | Realitaet: tickets_love +1, rel_boy +1; next=c3_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s01_mirror (src/content/nachtzug19/scenes/c4.ts)
Situation: Du stehst vor dem Waschbecken
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- touch_mirror: Erwartung: Den Spiegel beruehren | Realitaet: tickets_truth +1, memory_drift +1; next=c4_s01a_double_reflection; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- back_away: Erwartung: Zurueckweichen | Realitaet: tickets_escape +1; next=c4_interlude_01_lights; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- talk_to_reflection: Erwartung: "Wer bist du?" | Realitaet: tickets_love +1, memory_drift +1; next=c4_s01a_double_reflection; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s02a_recording_self (src/content/nachtzug19/scenes/c4.ts)
Situation: Die Aufnahme laeuft weiter
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- rewind_and_listen: Erwartung: Zurueckspulen und nochmal hoeren | Realitaet: tickets_truth +1, memory_drift +1; next=c4_s02b_recorder_loop; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- put_recorder_away: Erwartung: Den Rekorder weglegen | Realitaet: tickets_escape +1; next=c4_interlude_02_announcement; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s03_passengers_return (src/content/nachtzug19/scenes/c4.ts)
Situation: Die Tueren schliessen sich
Stakes: Effekte beruehren rel_boy, rel_sleepless, tickets_escape, tickets_love, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- talk_to_sleepless: Erwartung: Den Schlaflosen ansprechen | Realitaet: tickets_truth +1, rel_sleepless +1; next=c4_s03a_sleepless_changed; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- talk_to_boy: Erwartung: Den Jungen ansprechen | Realitaet: tickets_love +1, rel_boy +1; next=c4_s03b_boy_paradox; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- ignore_all: Erwartung: Alle ignorieren | Realitaet: tickets_escape +1; next=c4_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s03b_boy_paradox (src/content/nachtzug19/scenes/c4.ts)
Situation: Du gehst zum Jungen
Stakes: Effekte beruehren rel_boy, tickets_escape, tickets_truth. Alle Choices fuehren nach c4_interlude_03_window.
Choices:
- believe_boy: Erwartung: "Wie oft habe ich das gemacht?" | Realitaet: tickets_truth +2, rel_boy +1; next=c4_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- deny: Erwartung: "Das kann nicht sein" | Realitaet: tickets_escape +1, rel_boy +1; next=c4_interlude_03_window; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s04_announcement_glitch (src/content/nachtzug19/scenes/c4.ts)
Situation: Die Lautsprecher knacken
Stakes: Effekte beruehren conductor_attention, memory_drift, tickets_escape, tickets_guilt, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- check_own_name: Erwartung: Versuchen sich an den eigenen Namen zu erinnern | Realitaet: tickets_truth +1, memory_drift +1; next=c4_s04a_name_confusion; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ignore_announcement: Erwartung: Die Durchsage ignorieren | Realitaet: tickets_escape +1, conductor_attention +1; next=c4_interlude_04_corridor; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- go_to_control: Erwartung: Zur Kontrolle gehen | Realitaet: tickets_guilt +1, conductor_attention +1; next=c4_s04b_ticket_appears; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s04a_name_confusion (src/content/nachtzug19/scenes/c4.ts)
Situation: Du versuchst dich an deinen Namen zu erinnern
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c4_s05_comp7_call.
Choices:
- accept_loss: Erwartung: Den Verlust akzeptieren | Realitaet: tickets_escape +2, memory_drift +2; next=c4_s05_comp7_call; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- insist_on_name: Erwartung: "Ich weiss noch, wer ich bin" | Realitaet: tickets_truth +1; next=c4_s05_comp7_call; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_comp7_name: Erwartung: "Wie heisst du wirklich?" | Realitaet: tickets_love +1, rel_comp7 +1; next=c4_s05_comp7_call; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s05_comp7_call (src/content/nachtzug19/scenes/c4.ts)
Situation: Du hoerst eine Stimme
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- go_to_wagen7: Erwartung: Nach Wagen 7 gehen | Realitaet: tickets_truth +1, rel_comp7 +1; next=c4_s05a_wagen7_changed; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- refuse_call: Erwartung: Nicht hingehen | Realitaet: tickets_escape +1, rel_comp7 +1, memory_drift +2; next=c4_interlude_05_time; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s05a_wagen7_changed (src/content/nachtzug19/scenes/c4.ts)
Situation: Du trittst in Wagen 7
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c4_s06_comp7_memory.
Choices:
- ask_how_long: Erwartung: "Wie lange bist du schon hier?" | Realitaet: tickets_truth +1; next=c4_s06_comp7_memory; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_about_escape: Erwartung: "Kann man noch raus?" | Realitaet: tickets_escape +1, rel_comp7 +1; next=c4_s06_comp7_memory; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- comfort_comp7: Erwartung: Comp7 troesten | Realitaet: tickets_love +2, rel_comp7 +2; next=c4_s06_comp7_memory; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s06_comp7_memory (src/content/nachtzug19/scenes/c4.ts)
Situation: Comp7 blaettert in einem der Notizbuecher
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- believe_her: Erwartung: "Vielleicht hast du recht" | Realitaet: tickets_truth +1, rel_comp7 +1; next=c4_s06a_shared_memory; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- doubt_her: Erwartung: "Ich glaube, du verwechselst mich" | Realitaet: tickets_escape +1, rel_comp7 +1; next=c4_s07_reality_fracture; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- ask_about_future: Erwartung: "Was passiert als Naechstes?" | Realitaet: tickets_truth +2, memory_drift +1; next=c4_s06a_shared_memory; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s06a_shared_memory (src/content/nachtzug19/scenes/c4.ts)
Situation: Comp7 nimmt deine Hand
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_love, tickets_truth. Alle Choices fuehren nach c4_s07_reality_fracture.
Choices:
- accept_memory: Erwartung: Die Erinnerung als echt akzeptieren | Realitaet: tickets_love +2, rel_comp7 +2, memory_drift +1; next=c4_s07_reality_fracture; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- reject_memory: Erwartung: "Das ist nicht meine Erinnerung" | Realitaet: tickets_truth +1; next=c4_s07_reality_fracture; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s07_reality_fracture (src/content/nachtzug19/scenes/c4.ts)
Situation: Der Zug schuettelt
Stakes: Effekte beruehren memory_drift, rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c4_s07a_drift_peak.
Choices:
- remember_platform: Erwartung: An den Bahnsteig denken | Realitaet: tickets_truth +1, memory_drift +1; next=c4_s07a_drift_peak; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- remember_comp7: Erwartung: An Comp7 denken | Realitaet: tickets_love +1, rel_comp7 +1; next=c4_s07a_drift_peak; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- let_go: Erwartung: Loslassen | Realitaet: tickets_escape +2, memory_drift +2; next=c4_s07a_drift_peak; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s07b_stabilization (src/content/nachtzug19/scenes/c4.ts)
Situation: Das Doppel loest sich auf
Stakes: Effekte beruehren tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- examine_object: Erwartung: Den Gegenstand aufheben | Realitaet: tickets_truth +1; next=c4_s07c_tag19_found; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ignore_object: Erwartung: Liegenlassen | Realitaet: tickets_escape +1; next=c4_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c4_s07c_tag19_found (src/content/nachtzug19/scenes/c4.ts)
Situation: Du hebst es auf
Stakes: Effekte beruehren conductor_attention, has_tag19, rel_comp7, tickets_love, tickets_truth. Alle Choices fuehren nach c4_end_platform_watch.
Choices:
- take_tag19: Erwartung: Den Anhaenger einstecken | Realitaet: has_tag19 true, tickets_truth +1, conductor_attention +1; next=c4_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c5_s10_boy_reunion/show_tag19, c5_end_station/enter_wagon_12
- give_to_comp7: Erwartung: Ihn Comp7 geben | Realitaet: tickets_love +1, rel_comp7 +1; next=c4_end_platform_watch; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c5_s03_comp7_reflection (src/content/nachtzug19/scenes/c5.ts)
Situation: Du findest Comp7 am Ende des Ganges
Stakes: Effekte beruehren conductor_attention, rel_comp7, tickets_escape, tickets_truth. Alle Choices fuehren nach c5_s04_lights_flicker.
Choices:
- ask_about_destination: Erwartung: "Wohin faehrt dieser Zug?" | Realitaet: tickets_truth +1, rel_comp7 +1; next=c5_s04_lights_flicker; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- ask_about_compartment7: Erwartung: "Was ist in Abteil 7?" | Realitaet: tickets_truth +2, conductor_attention +1; next=c5_s04_lights_flicker; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stay_silent: Erwartung: Schweigen | Realitaet: tickets_escape +1, rel_comp7 +1; next=c5_s04_lights_flicker; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c5_s05_sleepless_final (src/content/nachtzug19/scenes/c5.ts)
Situation: Du findest den schlaflosen Mann in seinem Abteil
Stakes: Effekte beruehren rel_sleepless, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c5_s06_abteil7_approach.
Choices:
- comfort_him: Erwartung: "Wir kommen beide durch." | Realitaet: tickets_love +1, rel_sleepless +1; next=c5_s06_abteil7_approach; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- tell_truth: Erwartung: "Ich weiss es nicht. Ich erinnere mich nicht." | Realitaet: tickets_truth +1, rel_sleepless +1; next=c5_s06_abteil7_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- leave_quietly: Erwartung: Ihn allein lassen | Realitaet: tickets_escape +1, rel_sleepless +2; next=c5_s06_abteil7_approach; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c5_s06_abteil7_approach (src/content/nachtzug19/scenes/c5.ts)
Situation: Du gehst den Gang entlang
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- open_door: Erwartung: Die Tuer oeffnen | Realitaet: tickets_truth +2, conductor_attention +2; next=c5_s07_abteil7_inside; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- walk_past: Erwartung: Vorbeigehen | Realitaet: tickets_escape +1, conductor_attention +1; next=c5_s08_abteil7_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c5_s10_boy_reunion (src/content/nachtzug19/scenes/c5.ts)
Situation: Du findest den Jungen mit dem Kassettenrekorder
Stakes: Effekte beruehren rel_boy, tickets_love, tickets_truth. Alle Choices fuehren nach c5_s11_corridor_encounter.
Choices:
- show_recorder_connection: Erwartung: Deinen Rekorder zeigen | Realitaet: tickets_love +2, rel_boy +2; next=c5_s11_corridor_encounter; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- admit_lost_recorder: Erwartung: "Ich habe meinen verloren." | Realitaet: tickets_truth +1, rel_boy +1; next=c5_s11_corridor_encounter; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- show_tag19: Erwartung: Das Tag19-Etikett zeigen | Realitaet: tickets_truth +2, rel_boy +1; next=c5_s11_corridor_encounter; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c5_s19_final_conversation (src/content/nachtzug19/scenes/c5.ts)
Situation: Du findest Comp7 ein letztes Mal
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_love, tickets_truth. Alle Choices fuehren nach c5_s20_decision_approach.
Choices:
- love_farewell: Erwartung: "Danke. Fuer alles." | Realitaet: tickets_love +2, rel_comp7 +2; next=c5_s20_decision_approach; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- ask_final_question: Erwartung: "Wirst du auch aussteigen?" | Realitaet: tickets_truth +1, rel_comp7 +1; next=c5_s20_decision_approach; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- silent_farewell: Erwartung: Schweigen und gehen | Realitaet: tickets_escape +1; next=c5_s20_decision_approach; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c5_end_station (src/content/nachtzug19/scenes/c5.ts)
Situation: Der Zug haelt
Stakes: Effekte beruehren chapter_index, station_count, tickets_truth. Alle Choices fuehren nach c6_s01_awakening.
Choices:
- enter_wagon_12: Erwartung: Dem verborgenen Pfad folgen (Wagen 12) | Realitaet: chapter_index +6, station_count +1, tickets_truth +1; next=c6_s01_awakening; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- continue_normal: Erwartung: Wieder einsteigen | Realitaet: chapter_index +6, station_count +1; next=c6_s01_awakening; ending=none | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c6_s03_comp7_final (src/content/nachtzug19/scenes/c6.ts)
Situation: Du findest Comp7 in ihrem Abteil
Stakes: Effekte beruehren rel_comp7, tickets_escape, tickets_guilt, tickets_truth. Alle Choices fuehren nach c6_s04_corridor_changes.
Choices:
- ask_directly_high_rel: Erwartung: "Sag es mir. Was ist dort?" | Realitaet: tickets_truth +2, rel_comp7 +1; next=c6_s04_corridor_changes; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- admit_fear: Erwartung: "Ich habe Angst, es herauszufinden." | Realitaet: tickets_guilt +1, rel_comp7 +1; next=c6_s04_corridor_changes; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- stay_silent: Erwartung: Schweigen | Realitaet: tickets_escape +1; next=c6_s04_corridor_changes; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c6_s05_door_seven (src/content/nachtzug19/scenes/c6.ts)
Situation: Du stehst vor der Tuer
Stakes: Effekte beruehren conductor_attention, tickets_escape, tickets_guilt, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- open_door_truth: Erwartung: Die Tuer oeffnen | Realitaet: tickets_truth +2, conductor_attention +1; next=c6_s06_inside_seven; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- hesitate: Erwartung: Zoegern | Realitaet: tickets_guilt +1; next=c6_s06_inside_seven; ending=none | Konsequenz sichtbar? ja: c5_s21_decision_core/guilt_sacrifice, c6_s13_mirror_choice/take_hand_guilt
- walk_away: Erwartung: Weggehen | Realitaet: tickets_escape +2; next=c6_s07_seven_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c6_s09_boy_final (src/content/nachtzug19/scenes/c6.ts)
Situation: Du findest den Jungen in seinem Abteil
Stakes: Effekte beruehren rel_boy, tickets_love, tickets_truth. Alle Choices fuehren nach c6_s10_sleepless_gone.
Choices:
- share_recorder_experience: Erwartung: Von deiner Kassette erzaehlen | Realitaet: tickets_love +2, rel_boy +2; next=c6_s10_sleepless_gone; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- comfort_without_recorder: Erwartung: "Du musst nicht aussteigen, wenn du nicht bereit bist." | Realitaet: tickets_love +1, rel_boy +1; next=c6_s10_sleepless_gone; ending=none | Konsequenz sichtbar? ja: c5_s19_final_conversation/love_farewell, c6_s19_offer_choice/choose_memory_love
- tell_truth_harsh: Erwartung: "Wir koennen nicht ewig hierbleiben." | Realitaet: tickets_truth +1, rel_boy +1; next=c6_s10_sleepless_gone; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c7_s15_recorder_trigger (src/content/nachtzug19/scenes/c7.ts)
Situation: Du blickst auf den Kassettenrekorder
Stakes: Effekte beruehren tickets_escape, tickets_guilt, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- play_recorder_final: Erwartung: Abspielen | Realitaet: tickets_truth +3, tickets_guilt +2; next=c7_s16_recorder_playback; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- destroy_recorder: Erwartung: Den Rekorder zerstoeren | Realitaet: tickets_escape +2; next=c7_s19_interlude_train_stops; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
- no_recorder: Erwartung: Weitergehen | Realitaet: tickets_escape +1; next=c7_s19_interlude_train_stops; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c7_s16_recorder_playback (src/content/nachtzug19/scenes/c7.ts)
Situation: Du drueckst Play
Stakes: Effekte beruehren memory_drift, tickets_escape, tickets_truth. Branches: mehrere next/ending Ziele.
Choices:
- listen_more: Erwartung: Weiterhoeren | Realitaet: tickets_truth +2, memory_drift +1; next=c7_s17_recorder_truth; ending=none | Konsequenz sichtbar? ja: c1_s02_train_appears/call_out, c1_interlude_04_clock/note_time
- stop_playback: Erwartung: Stoppen | Realitaet: tickets_escape +1; next=c7_s18_recorder_aftermath; ending=none | Konsequenz sichtbar? ja: c4_s05a_wagen7_changed/ask_about_escape, c6_s13_mirror_choice/take_hand_escape
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

### c7_end_station (src/content/nachtzug19/scenes/c7.ts)
Situation: Du stehst auf dem Bahnsteig
Stakes: Effekte beruehren chapter_index. Branches: mehrere next/ending Ziele.
Choices:
- truth_path: Erwartung: Der Wahrheit begegnen - koste es, was es wolle | Realitaet: chapter_index +8; next=none; ending=truth_ending | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
- escape_path: Erwartung: Zurueck in den Zug - fuer immer sicher | Realitaet: chapter_index +8; next=none; ending=escape_ending | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
- guilt_path: Erwartung: Die Verantwortung tragen - und weitergehen | Realitaet: chapter_index +8; next=none; ending=guilt_ending | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
- love_path: Erwartung: Jemandem folgen - nicht allein sein | Realitaet: chapter_index +8; next=none; ending=love_ending | Konsequenz sichtbar? nein (kein Condition-/Variant-Callback gefunden)
Urteil: SITZT (Unterscheidbare Effekte/Labels oder Branching)
Minimaler Fix: Kein Fix noetig.

