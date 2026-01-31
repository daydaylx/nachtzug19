# WORLD → STORY MAPPING (Z1)

**Status:** AKTUELL  
**Scope:** Mini‑Overworld (Z1), 3–5 Screens  
**Regel:** Overworld entscheidet nur *wo bin ich / was kann ich anklicken*.  
**Story Engine:** entscheidet Conditions, Effects, Branches.

---

## Rooms (Z1)

1. `room_corridor_main`
2. `room_compartment`
3. `room_transition`
4. `room_wagon7`
5. `room_platform_station`

---

## Mapping: Hotspots → SceneIDs

> **Hinweis:** SceneIDs sind jetzt echte Z1‑IDs aus `c1–c3`.  
> **Fallback** wird genutzt, wenn `active_when` nicht erfüllt ist.

### 1) `npc_boy`
- **room_id:** `room_corridor_main`
- **default_scene_id:** `c2_s02_boy_recorder`
- **fallback_scene_id:** `c2_s02c_boy_vanish`
- **active_when:** `items.has_recorder == false`
- **world_effects:** `npc_boy` bleibt sichtbar

### 2) `npc_conductor`
- **room_id:** `room_corridor_main`
- **default_scene_id:** `c2_control_01_approach`
- **fallback_scene_id:** `c2_control_01_aftermath`
- **active_when:** `pressure.conductor_attention < 2`
- **world_effects:** `npc_conductor` verschiebt Position (setzt Kontroll‑Atmosphäre)

### 3) `obj_recorder`
- **room_id:** `room_compartment`
- **default_scene_id:** `c2_s02_boy_recorder`
- **fallback_scene_id:** `c2_s02a_recorder_listening`
- **active_when:** `items.has_recorder == false`
- **world_effects:** Objekt verschwindet, wenn aufgenommen

### 4) `door_wagon7`
- **room_id:** `room_transition`
- **default_scene_id:** `c3_s03_wagen7_approach`
- **fallback_scene_id:** `c3_s01_wagen7_locked`
- **active_when:** `chapter_index >= 3` **oder** `relations.rel_comp7 >= 1` **oder** `tickets.tickets_truth >= 2`
- **world_effects:** Tür wechselt Sprite (locked → unlocked)

### 5) `obj_window`
- **room_id:** `room_corridor_main`
- **default_scene_id:** `c1_s03a_find_seat`
- **fallback_scene_id:** `c1_s01_platform`
- **active_when:** `pressure.memory_drift >= 1`
- **world_effects:** Kein World‑State

### 6) `npc_comp7`
- **room_id:** `room_wagon7`
- **default_scene_id:** `c3_s03b_inside_comp7`
- **fallback_scene_id:** `c2_s03_comp7_intro`
- **active_when:** `chapter_index >= 3`
- **world_effects:** NPC bleibt sichtbar (später: Position leicht verschoben)

### 7) `npc_sleepless`
- **room_id:** `room_compartment`
- **default_scene_id:** `c2_control_01_aftermath`
- **fallback_scene_id:** `c1_s04_sleepless_intro`
- **active_when:** `chapter_index >= 2`
- **world_effects:** NPC kann bei `rel_sleepless < 0` verschwinden

---

## World‑State (nur visuell)

Erlaubte World‑Effekte (rein visuell / Positions‑Updates):
- NPC sichtbar / unsichtbar
- NPC Position ändern
- Door State: locked/unlocked

**Nicht erlaubt:** neue Story‑States oder Logik außerhalb der Engine.
