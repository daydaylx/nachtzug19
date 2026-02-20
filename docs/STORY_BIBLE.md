# NACHTZUG 19 - Story Bible

## 1. Kapitelübersicht (Stand: 2026-02-20)

Quelle: `loadNachtzug19Story()` / `src/content/nachtzug19/manifest.ts`

- **Startszene:** `c1_hub_platform`
- **Gesamtszenen:** 201
- **Endings:** 5

### Kapitelstruktur

- **C1: Leerer Bahnsteig (20 Szenen)**
  - Hub-basierter Einstieg am Bahnsteig und im Zug
  - Emma-Thread, erste Drift-Symptome, Einstieg in Wagen 7
- **C2: Die erste Kontrolle (23 Szenen)**
  - Erste Schaffner-Kontrolle als Pressure-Gate
  - Rekorder/Junge/Comp7 werden mechanisch relevant
- **C3: Wagen 7 (22 Szenen)**
  - Loop-Vertiefung, Recorder-Anomalie, zweite Kontrolle
- **C4: Spiegelungen (21 Szenen)**
  - Spiegel- und Identitätsverschiebungen, Tag19-Vorbereitung
- **C5: Die letzte Kontrolle (31 Szenen)**
  - Verdichtung der Beziehungen, dritte Kontrolle, Kernentscheidungen
- **C6: Ende der Linie (29 Szenen)**
  - Auflösung/Angebot/letzte Vorentscheidungen
- **C7: Entscheidung (55 Szenen inkl. Ending-Szenen)**
  - Finalpfade, Endstation, interaktive Epiloge

## 2. Kanon (Core Entities)

- **Der Schaffner:** Systemdruck über `conductor_attention`
- **Comp7:** Erinnerung/Gegenarchiv über `rel_comp7`
- **Der Junge:** Rekorder-/Identitätsachse über `rel_boy`
- **Der Schlaflose:** frühe Warnfigur über `rel_sleepless`

### Schlüsselgegenstände

- **Recorder** (`has_recorder`)
- **Tag19** (`has_tag19`)
- **Photo Anomaly** (`photo_anomaly`)

## 3. State Index (aktuell)

### Kategorien

- **Tickets (0-20):** `tickets_truth`, `tickets_escape`, `tickets_guilt`, `tickets_love`
- **Pressure (0-6):** `conductor_attention`, `memory_drift`, `hub_investigations`, `train_explorations`
- **Relations (-2 bis +10):** `rel_comp7`, `rel_boy`, `rel_sleepless`
- **Items/Flags (bool + string Nuance-Flags):** siehe `src/domain/types/index.ts`

### Wichtige Meta-States

- `chapter_index`
- `station_count`
- `current_scene_id`
- `visited_scene_ids`

## 4. Hinweise

- `chapter_index` und `station_count` sind primär Meta-/Tracking-Variablen.
- Canon Rules (R1-R4) bleiben in `docs/NACHTZUG_19_RULES.md` die normative Quelle.
