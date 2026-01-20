# NACHTZUG 19 Story QA Audit Report

**Generated:** 2026-01-20T10:23:50.039Z

## Executive Summary

- **Total Scenes:** 183
- **Total Choices:** 549
- **Total Issues:** 2
  - P0 (Critical): 0
  - P1 (High): 0
  - P2 (Medium): 0
  - P3 (Low): 2

## Graph Metrics

- **Total Edges:** 549
- **Unreachable Scenes:** 0
- **Dead-End Scenes:** 0
- **Self-Loops:** 0
- **Max Outdegree:** 4 (c7_end_station)

## Issues by Severity

### P3 Issues (2)

#### CHOICE-001: State key "chapter_index" is set by 22 effects but never read

- **Category:** CHOICE
- **Root Cause:** Effects modify state that is never checked in conditions or variants (potential fake choice)
- **Evidence:**
  ```json
  {
  "file": "./export/story.json",
  "key": "chapter_index",
  "setters": [
    {
      "sceneId": "c1_end_station",
      "choiceId": "continue_to_chapter_2"
    },
    {
      "sceneId": "c1_end_station",
      "choiceId": "confront_jacket_change"
    },
    {
      "sceneId": "c1_end_station",
      "choiceId": "nod_to_conductor"
    },
    {
      "sceneId": "c2_end_station",
      "choiceId": "play_recorder"
    },
    {
      "sceneId": "c2_end_station",
      "choiceId": "continue_to_chapter_3"
    }
  ]
}
  ```
- **Repro:** Make choices that modify chapter_index - observe no narrative consequences
- **Minimal Fix:** Add conditions/variants that read this key, or remove unused effects

#### CHOICE-002: State key "station_count" is set by 6 effects but never read

- **Category:** CHOICE
- **Root Cause:** Effects modify state that is never checked in conditions or variants (potential fake choice)
- **Evidence:**
  ```json
  {
  "file": "./export/story.json",
  "key": "station_count",
  "setters": [
    {
      "sceneId": "c5_s09_train_shifts",
      "choiceId": "continue_on"
    },
    {
      "sceneId": "c5_s24_platform_arrives",
      "choiceId": "prepare_to_exit"
    },
    {
      "sceneId": "c6_s25_final_moment",
      "choiceId": "open_door"
    },
    {
      "sceneId": "c6_s25_final_moment",
      "choiceId": "hesitate_moment"
    },
    {
      "sceneId": "c7_s25_final_choice",
      "choiceId": "step_off"
    }
  ]
}
  ```
- **Repro:** Make choices that modify station_count - observe no narrative consequences
- **Minimal Fix:** Add conditions/variants that read this key, or remove unused effects

