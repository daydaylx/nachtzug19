# Overworld UI Konzept (Z1) – Pixel Overworld

**Ziel:** Nachtzug 19 soll sich auf Mobile wie ein Spiel anfühlen (Top‑Down, Pokémon‑Style).  
**Scope:** Mini‑Overworld (3–5 Screens), keine Scope‑Explosion.

---

## 1) World Layer vs Story Layer
- **World Layer:** Position, Bewegung, Türen, NPC‑Hotspots.
- **Story Layer:** Text, Choices, Konsequenzen (Engine/State).

**Regel:** Overworld entscheidet nur „wo bin ich / was kann ich anklicken“.

---

## 2) Z1 Rooms
- `room_corridor_main`
- `room_compartment`
- `room_transition`
- `room_wagon7`
- `room_platform_station`

---

## 3) Steuerung (Mobile)
- **Tap‑to‑move:** Tap auf Tile/Position → Player läuft dorthin.
- **Tap auf Hotspot:** Auto‑Walk + Interaktion.
- **Optional:** D‑Pad (Settings).
- **Reduce Motion:** Animationen minimal.

---

## 4) Pixel‑Look (GB/GBC inspiriert)
- **Base‑Res:** 320×180 (integer scaling)
- **Palette:** Nachtblau/Anthrazit + warmes Amber + wenige Akzente
- **Atmosphäre:** Subtile Loop‑Animationen (Lichtflimmern, Fensterstreifen)
- **Drift ab memory_drift >= 3:** leichtes Color‑Shift im World Layer

---

## 5) Interaktion (Hotspots)
Stabile IDs:
- `npc_boy`
- `npc_conductor`
- `obj_recorder`
- `door_wagon7`
- `obj_window`
- `npc_comp7`
- `npc_sleepless`

Interaktion öffnet Story‑Overlay mit SceneID.

---

## 6) Story Overlay (kompakt)
- Titelzeile
- Text (kurz, Beat‑Regel)
- 2–4 Choices
- Optional Mini‑Status Pills

**Beat‑Regel:** 1 Szene = 1 Gefühl + 1 Aktion.
