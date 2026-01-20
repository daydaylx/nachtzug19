# QA Consolidated Action Plan (code-verified)

## Scope
- Sources: reports/*, QA_REPORT_NACHTZUG19.md, UI_TEST_GEMINI_STORY_QA_REPORT.md
- Code checks: src/content/nachtzug19/scenes/c1.ts, c3.ts, c4.ts, c5.ts, c7.ts,
  src/content/nachtzug19/manifest.ts, src/domain/engine/gameEngine.ts,
  src/domain/types/index.ts, scripts/audit_chapters.mjs

## Resolved vs open

### Verified fixed in code
- P0: c1_interlude_01_lights has non-empty effects (memory_drift +1).
- P0: c3_control_02_question has 4 choices.
- P0: c5_s10_boy_reunion has 3 conditional choices.
- FAKE-CHOICE fixes: c4_s01a_double_reflection, c4_s02_recorder_prophecy, c5_s01_final_preparation now have distinct effects.
- photo_anomaly payoff: conditional choice added in c7_s21_photo_revelation.
- Early ticket callbacks: C2 conditional choices added for truth/escape/love/guilt.
- Manifest scene_count values match current chapter sizes.
- SceneTag includes "setup" (UI_TEST report P0 is outdated).
- keep_walking attention fix is present in c2_s01_ticket_search.
- scripts/audit_chapters.mjs now includes c6/c7; re-run completed.

### Confirmed open (code-verified)
- (none)

### Needs re-validation (report conflicts)
- Wordcount/runtime metrics conflict across reports; audit_chapters re-run done (counts narrative only).
- P0 status differs across older reports; align stale docs as needed.

## Prioritized backlog

### P1 (high impact)
1) Address top WACKELT scenes (use reports/qa_issues_list.md top offenders).

### P2 (spec targets / quality)
1) Re-baseline choices metric (player-visible per run vs total conditional options).
2) Increase word count in chapters 1, 5, 6, 7 (3-5 scenes each, +100-150 words).
3) Implement has_tag19 synesthetic narrative variants in c6/c7.

### P3 (tech debt / tooling)
1) Update reports based on re-run (content_graph_audit, problems_summary, STATUS_UPDATE done; NEXT pending).
2) Upgrade vitest and add UI component tests (ChoiceTray, ReaderCard, StatusDrawer).
3) Add Android CI build workflow.

## Immediate next actions (1-2 hours)
- Address top WACKELT scenes (start with 3-5 scenes).
