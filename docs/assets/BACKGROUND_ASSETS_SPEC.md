# NACHTZUG 19 – Spezifikation für Hintergrund-Grafiken

**Version:** 1.0
**Zuletzt aktualisiert:** 2026-01-25
**Zweck:** Vollständige Spezifikation für UI-Hintergrundbilder, Benennungskonventionen und Prompts zur Bildgenerierung.

---

## A) Ziel & Prinzipien

### Design-Philosophie

NACHTZUG 19 nutzt Hintergrundgrafiken zur Schaffung von **Atmosphäre**, nicht für Gameplay-Interaktion. Das Spiel folgt einer **"Reader Noir"**-Ästhetik:

- **Mobile-First:** Optimiert für vertikale Hochformat-Bildschirme (9:16 Seitenverhältnis)
- **Minimalistisch:** Hintergründe unterstützen Lesbarkeit, konkurrieren nie mit Text
- **Kinematisch:** 2D-Digital-Malerei-Stil mit Film-Noir-Einflüssen
- **Atmosphärisch:** Mitternachtspalette mit warmgoldenen Highlights, feines Körnig
- **Nicht aufdringlich:** Text bleibt immer vor Hintergründen lesbar

### Wichtige visuelle Themen

1. **Liminal Spaces:** Zugskorridore, Bahnsteige, Übergangsbereiche
2. **Zeitliche Verrzerrung:** Subtile visuelle Hinweise für Memory Drift (Unschärfe, Körnung, Farbversatz)
3. **Noir-Atmosphäre:** Low-Key-Beleuchtung, starker Kontrast, Warm/Kalt-Farbspiel
4. **Psychologisches Mystery:** Mehrdeutige Räume, die gleichzeitig vertraut und verstörend wirken

---

## B) Technische Spezifikationen

### Bildformat & Abmessungen

| **Eigenschaft**          | **Wert**                          | **Anmerkungen**                                    |
|-----------------------|------------------------------------|----------------------------------------------|
| **Hauptformat**    | PNG (verlustfrei)                     | WebP optional für Web-Export                 |
| **Seitenverhältnis**      | 9:16 (Hochformat)                    | Mobile-optimiert                             |
| **Basisauflösung**   | 1440 × 2560 Pixel                     | High-DPI Basis                            |
| **Exportvarianten**   | @1x (720×1280), @2x (1440×2560)    | Zur Leistungsoptimierung                 |
| **Farbraum**       | sRGB                               | Standard Web/Mobile Farbraum              |
| **Max. Dateigröße**     | 500 KB pro Bild (PNG)             | Für schnelles Mobile-Laden                   |

### Sichere Bereiche

Um sicherzustellen, dass Text-Overlays lesbar bleiben:

| **Bereich**              | **Position**     | **Höhe** | **Zweck**                    |
|-----------------------|------------------|------------|--------------------------------|
| **Oberer sicherer Bereich**     | Oben 12%          | ~307 Pixel    | Statusleiste / Kapitel-Anzeige |
| **Unterer sicherer Bereich**  | Unten 18%       | ~460 Pixel    | Auswahl-Tablett / Aktionsschaltflächen   |
| **Lesezone**      | Mitte 70%       | ~1793 Pixel   | Haupttext-Anzeige der Erzählung    |

**Designrichtlinie:** Halten Sie visuellen Fokus und Hochkontrast-Elemente **außerhalb** der sicheren Bereiche. Nutzen Sie subtile Gradienten oder Vignetten für Textlesbarkeit.

---

## C) Benennungsschema

### 1. Ort-Hintergründe (Wiederverwendbar)

**Format:** `bg_loc_<location>__v<version>.png`

**Beispiele:**
- `bg_loc_platform__v1.png`
- `bg_loc_corridor__v1.png`
- `bg_loc_compartment__v1.png`
- `bg_loc_window__v1.png`
- `bg_loc_comp7__v1.png`

**Ort:** `src/assets/backgrounds/locations/`

**Zweck:** Wiederverwendbare Hintergründe für häufige Zugstandorte. Die meisten Szenen verwenden diese.

---

### 2. Szenen-spezifische Hintergründe (Einzigartige Momente)

**Format:** `bg_scene_<sceneId>__v<version>.png`

**Beispiele:**
- `bg_scene_c2_control_01__v1.png` (Schaffner-Kontrolle-Szene)
- `bg_scene_c4_mirror_intro__v1.png` (Erste Spiegel-Begegnung)
- `bg_scene_c7_s06_announcement__v1.png` (Letzte Durchsage)

**Ort:** `src/assets/backgrounds/scenes/`

**Zweck:** Einzigartige Hintergründe für spezielle Erzähl-Momente (Kontrollen, Spiegel, Enthüllungen).

---

### 3. Overlays (Optionale dekorative Ebenen)

**Format:** `ov_<type>__v<version>.png`

**Beispiele:**
- `ov_station_banner__v1.png` (Bahnhofs-Namen-Overlay)
- `ov_announcement__v1.png` (Lautsprecher-Symbol-Overlay)
- `ov_drift_grain__v1.png` (Memory Drift Textur-Overlay)

**Ort:** `src/assets/backgrounds/overlays/`

**Zweck:** Optionale Compositing-Ebenen für dynamische Effekte (z.B. Bahnhofs-Namen, Drift-Vernebelung).

---

### 4. Incoming Assets (Workspace)

**Format:** Any temporary naming

**Location:** `src/assets/backgrounds/_incoming/`

**Purpose:** Drop zone for newly generated images before final naming and placement.

---

## D) Szenen-zu-Hintergrund-Zuordnungstabelle

Diese Tabelle ordnet **jede Szene** in NACHTZUG 19 zu ihrem empfohlenen Hintergrund-Asset.

### Kapitel 1: Einstieg (14 Szenen)

| **Scene ID**                  | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|-------------------------------|-------------|----------------|----------------------------------|---------------------|
| `c1_s01_platform`             | 1           | setup          | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c1_s01_platform_b`           | 1           | setup          | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c1_s02_ticket_check`         | 1           | setup          | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c1_s03_inside_train`         | 1           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c1_s03a_find_seat`           | 1           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c1_s04_fellow_passengers`    | 1           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c1_s05_first_anomaly`        | 1           | drift_seed     | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c1_s05a_other_passengers`    | 1           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c1_s05b_compartment7_tease`  | 1           | setup          | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c1_s06_sleepless`            | 1           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c1_s07_boy_first`            | 1           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c1_s08_interlude`            | 1           | interlude      | `bg_loc_window__v1`              | `LOC_WINDOW`        |
| `c1_s09_station_1`            | 1           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c1_end_station`              | 1           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |

---

### Kapitel 2: Wiederholung (15 Szenen)

| **Scene ID**                  | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|-------------------------------|-------------|----------------|----------------------------------|---------------------|
| `c2_s01_restart`              | 2           | setup          | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c2_s02_comp7_intro`          | 2           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c2_s03_comp7_bond`           | 2           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c2_s04_announcement`         | 2           | drift_seed     | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c2_s05_boy_recorder`         | 2           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c2_s06_sleepless_insomnia`   | 2           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c2_s07_interlude`            | 2           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c2_s08_window`               | 2           | drift_seed     | `bg_loc_window__v1`              | `LOC_WINDOW`        |
| `c2_s09_conductor`            | 2           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c2_s10_comp7_notes`          | 2           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c2_s11_interlude_drift`      | 2           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c2_control_01_approach`      | 2           | control        | `bg_scene_c2_control_01__v1`     | `SCENE_CONTROL`     |
| `c2_control_02_inspection`    | 2           | control        | `bg_scene_c2_control_01__v1`     | `SCENE_CONTROL`     |
| `c2_s12_station_2`            | 2           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c2_end_station`              | 2           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |

---

### Kapitel 3: Bindung (15 Szenen)

| **Scene ID**                  | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|-------------------------------|-------------|----------------|----------------------------------|---------------------|
| `c3_s01_restart`              | 3           | setup          | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c3_s02_comp7_pattern`        | 3           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c3_s03_wagen7_door`          | 3           | secret         | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c3_s04_boy_drawing`          | 3           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c3_s05_sleepless_confession` | 3           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c3_s06_interlude_time`       | 3           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c3_s07_conductor_attention`  | 3           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c3_s08_comp7_19`             | 3           | reveal         | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c3_s09_window_void`          | 3           | drift_variant  | `bg_loc_window__v1`              | `LOC_WINDOW`        |
| `c3_s10_boy_cassette`         | 3           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c3_s11_interlude_walls`      | 3           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c3_control_02_questions`     | 3           | control        | `bg_scene_c3_control_02__v1`     | `SCENE_CONTROL`     |
| `c3_control_03_release`       | 3           | control        | `bg_scene_c3_control_02__v1`     | `SCENE_CONTROL`     |
| `c3_s12_station_3`            | 3           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c3_end_station`              | 3           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |

---

### Kapitel 4: Spiegelung (12 Szenen)

| **Scene ID**                       | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|------------------------------------|-------------|----------------|----------------------------------|---------------------|
| `c4_s01_mirror_intro`              | 4           | setup          | `bg_scene_c4_mirror_intro__v1`   | `SCENE_MIRROR`      |
| `c4_s02_comp7_fear`                | 4           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c4_s03_boy_voice`                 | 4           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c4_s04_sleepless_photo`           | 4           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c4_interlude_01_corridor_mirror`  | 4           | interlude      | `bg_scene_c4_mirror_intro__v1`   | `SCENE_MIRROR`      |
| `c4_s05_tag19_intro`               | 4           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c4_s06_conductor_warning`         | 4           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c4_s07_comp7_vulnerable`          | 4           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c4_s08_window_1973`               | 4           | reveal         | `bg_loc_window__v1`              | `LOC_WINDOW`        |
| `c4_s09_boy_past`                  | 4           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c4_s10_station_4`                 | 4           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c4_end_station`                   | 4           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |

---

### Kapitel 5: Eskalation (25 Szenen)

| **Scene ID**                       | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|------------------------------------|-------------|----------------|----------------------------------|---------------------|
| `c5_s01_restart_drift`             | 5           | setup          | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c5_s02_comp7_dependency`          | 5           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c5_s03_boy_identity`              | 5           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c5_s04_sleepless_photo_anomaly`   | 5           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c5_s05_interlude_split`           | 5           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s06_conductor_confrontation`   | 5           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s07_tag19_heat`                | 5           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s08_comp7_collapse`            | 5           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c5_s09_boy_recorder_play`         | 5           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c5_s10_interlude_passengers`      | 5           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s11_announcement_distorted`    | 5           | drift_variant  | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s12_window_void`               | 5           | drift_variant  | `bg_scene_c5_window_void__v1`    | `SCENE_VOID`        |
| `c5_s13_sleepless_breakdown`       | 5           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c5_s14_interlude_walls_breathe`   | 5           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s15_comp7_truth_hint`          | 5           | reveal         | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c5_s16_boy_merge_hint`            | 5           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c5_s17_conductor_final_warning`   | 5           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s18_interlude_clock`           | 5           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_control_03_approach`           | 5           | control        | `bg_scene_c5_control_03__v1`     | `SCENE_CONTROL`     |
| `c5_control_04_interrogation`      | 5           | control, reveal| `bg_scene_c5_control_03__v1`     | `SCENE_CONTROL`     |
| `c5_control_05_choice`             | 5           | control        | `bg_scene_c5_control_03__v1`     | `SCENE_CONTROL`     |
| `c5_control_06_aftermath`          | 5           | control        | `bg_scene_c5_control_03__v1`     | `SCENE_CONTROL`     |
| `c5_s19_drift_peak`                | 5           | drift_variant  | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c5_s20_station_5`                 | 5           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c5_end_station`                   | 5           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |

---

### Chapter 6: Auflösung (26 scenes)

| **Scene ID**                       | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|------------------------------------|-------------|----------------|----------------------------------|---------------------|
| `c6_s01_restart_fracture`          | 6           | setup          | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c6_s02_comp7_distance`            | 6           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c6_s03_boy_silence`               | 6           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c6_s04_sleepless_acceptance`      | 6           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c6_s05_door_seven_pulse`          | 6           | reveal         | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c6_s06_interlude_dissolve`        | 6           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s07_tag19_vibration`           | 6           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s08_conductor_identity`        | 6           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s09_comp7_fragment`            | 6           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c6_s10_boy_recorder_truth`        | 6           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c6_s11_announcement_name`         | 6           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s12_mirror_self`               | 6           | reveal         | `bg_scene_c6_mirror_self__v1`    | `SCENE_MIRROR`      |
| `c6_s13_interlude_time_collapse`   | 6           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s14_comp7_goodbye_prep`        | 6           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c6_s15_boy_merge_prep`            | 6           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c6_s16_sleepless_final`           | 6           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c6_s17_interlude_void_approach`   | 6           | interlude      | `bg_scene_c6_void__v1`           | `SCENE_VOID`        |
| `c6_s18_window_1973_clear`         | 6           | reveal         | `bg_loc_window__v1`              | `LOC_WINDOW`        |
| `c6_s19_comp7_final_conversation`  | 6           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c6_s20_boy_final_words`           | 6           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c6_s21_conductor_finale`          | 6           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s22_interlude_train_slows`     | 6           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s23_tag19_final_power`         | 6           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c6_s24_dawn_approach`             | 6           | setup          | `bg_loc_window__v1`              | `LOC_WINDOW`        |
| `c6_s25_station_6`                 | 6           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c6_end_station`                   | 6           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |

---

### Kapitel 7: Entscheidung (31 Szenen + Enden)

| **Scene ID**                       | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|------------------------------------|-------------|----------------|----------------------------------|---------------------|
| `c7_s01_final_approach`            | 7           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s02_interlude_silence`         | 7           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s02_interlude_silence_b`       | 7           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s03_comp7_goodbye`             | 7           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c7_s04_boy_transformation`        | 7           | secret         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c7_s04_boy_recognized`            | 7           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c7_s05_interlude_timeshift`       | 7           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s05_interlude_timeshift_b`     | 7           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s06_announcement_distorted`    | 7           | reveal         | `bg_scene_c7_announcement__v1`   | `SCENE_ANNOUNCEMENT`|
| `c7_s07_announcement_name`         | 7           | reveal         | `bg_scene_c7_announcement__v1`   | `SCENE_ANNOUNCEMENT`|
| `c7_s08_announcement_aftermath`    | 7           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s09_corridor_dissolve`         | 7           |                | `bg_scene_c7_dissolve__v1`       | `SCENE_DISSOLVE`    |
| `c7_s10_passengers_vanish`         | 7           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s11_interlude_memory_flood`    | 7           | interlude      | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c7_s12_seven_offer`               | 7           | setup          | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c7_s13_seven_price`               | 7           | reveal, secret | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c7_s13_comp7_recognized`          | 7           | reveal, secret | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c7_s14_seven_decision`            | 7           |                | `bg_loc_comp7__v1`               | `LOC_COMP7`         |
| `c7_s15_recorder_trigger`          | 7           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s16_recorder_playback`         | 7           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c7_s17_recorder_truth`            | 7           | reveal         | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c7_s18_recorder_aftermath`        | 7           |                | `bg_loc_compartment__v1`         | `LOC_COMPARTMENT`   |
| `c7_s19_interlude_train_stops`     | 7           | interlude      | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s20_conductor_finale`          | 7           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s20b_last_sacrifice`           | 7           |                | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s21_photo_revelation`          | 7           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s22_tag19_final`               | 7           | reveal         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `c7_s23_interlude_doors_open`      | 7           | interlude      | `bg_loc_transition__v1`          | `LOC_TRANSITION`    |
| `c7_s24_platform_real`             | 7           |                | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c7_s25_final_choice`              | 7           |                | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `c7_end_station`                   | 7           | station_end    | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |

---

### Enden (14 Szenen)

| **Scene ID**                       | **Chapter** | **Tags**       | **Background Asset**             | **Prompt ID**       |
|------------------------------------|-------------|----------------|----------------------------------|---------------------|
| `ending_truth_01`                  | 7           | ending         | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `ending_truth_02`                  | 7           | ending         | `bg_ending_city__v1`             | `ENDING_CITY`       |
| `ending_truth_03`                  | 7           | ending, terminal| `bg_ending_city__v1`            | `ENDING_CITY`       |
| `ending_love_01`                   | 7           | ending         | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `ending_love_02`                   | 7           | ending         | `bg_ending_reunion__v1`          | `ENDING_REUNION`    |
| `ending_love_03`                   | 7           | ending, terminal| `bg_ending_home__v1`            | `ENDING_HOME`       |
| `ending_guilt_01`                  | 7           | ending         | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `ending_guilt_02`                  | 7           | ending         | `bg_loc_platform__v1`            | `LOC_PLATFORM`      |
| `ending_guilt_03`                  | 7           | ending, terminal| `bg_ending_library__v1`         | `ENDING_LIBRARY`    |
| `ending_escape_01`                 | 7           | ending         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `ending_escape_02`                 | 7           | ending         | `bg_loc_corridor__v1`            | `LOC_CORRIDOR`      |
| `ending_escape_03`                 | 7           | ending, terminal| `bg_loc_corridor__v1`           | `LOC_CORRIDOR`      |
| `ending_limbo_01`                  | 7           | ending         | `bg_loc_transition__v1`          | `LOC_TRANSITION`    |
| `ending_limbo_02`                  | 7           | ending, terminal| `bg_loc_transition__v1`         | `LOC_TRANSITION`    |

---

## E) Rendering & UI-Integrations-Hinweise

### CSS / Rendering-Eigenschaften

```css
.scene-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: -webkit-optimize-contrast; /* Auf Mobile schärfen */
}
```

### Vignette & Körnung (Optionale Nachbearbeitung)

**Empfehlung:** Wende subtile Effekte via CSS/Shader an statt sie in Assets einzubrennen.

```css
.scene-background::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

**Körnung-Textur:** Nutze ein separates `ov_grain__v1.png` Overlay mit niedriger Deckkraft (~5-10%) für Film-Textur.

### Memory Drift Effekte (Dynamisch)

Für Szenen mit `memory_drift >= 3`, wende subtile visuelle Verzerrung via CSS Transformationen an:

```css
.scene-background--drift-high {
  animation: drift-wobble 8s ease-in-out infinite;
  filter: blur(1px) hue-rotate(5deg);
}

@keyframes drift-wobble {
  0%, 100% { transform: translateX(0px) scale(1.0); }
  50% { transform: translateX(2px) scale(1.01); }
}
```

**Wichtig:** Halte Text-Overlays scharf und unbeeinflusst von Drift-Effekten.

---

## F) Prompt-Bibliothek für Bildgenerierung

### Globaler Stil-Prompt (Auf alle Bilder anwenden)

```
**Style:** 2D cinematic digital painting, realistic render with painterly touches, inspired by film noir and liminal space photography.

**Palette:** Midnight blue-black base (#0a0e1a), warm amber highlights (#d4a574), cool teal shadows (#1a3a3a), desaturated earth tones.

**Lighting:** Low-key lighting with high contrast, single dominant light source (often overhead or from windows), deep shadows with subtle rim lighting on edges.

**Atmosphere:** Subtle film grain texture, soft vignette around edges, slight depth-of-field blur in background, cinematic 2.35:1 framing adapted to 9:16 vertical.

**Technical:** 9:16 vertical aspect ratio (portrait), high resolution (1440×2560px), safe zones: top 12% and bottom 18% should have minimal visual detail or gradual gradients to ensure text readability.

**Constraints:**
- NO readable text, signage, or logos
- NO clear human faces (silhouettes or blurred figures only)
- NO overly busy compositions (keep visual simplicity)
- NO bright, saturated colors (maintain muted, noir palette)
- ENSURE top 12% and bottom 18% are visually calm (gradients, darkness, or empty space)
```

---

### Ort-Prompts (Wiederverwendbare Hintergründe)

#### `LOC_PLATFORM` (Bahnsteig)

```
**Scene:** Empty train platform at night, long and narrow, vanishing into darkness at both ends.

**Elements:** Worn concrete floor with faint yellow safety line, metal benches (cold, reflective), vintage clock showing 23:47, dim overhead fluorescent lights creating pools of harsh light, ticket machines (dark, inactive), poster boards with unreadable faded advertisements.

**Mood:** Liminal, isolated, waiting room between worlds. A sense of "just missed the last train."

**Color:** Deep blue-black shadows, sickly yellow-green fluorescent lighting, cool concrete gray.

**Safe Zones:** Top 12% fades to dark sky/ceiling, bottom 18% shows empty platform floor with minimal detail.

**Reference Vibe:** Gregory Crewdson photography, Edward Hopper's "Nighthawks" isolation, liminal space aesthetic.
```

---

#### `LOC_CORRIDOR` (Zugkorridor)

```
**Scene:** Narrow train corridor, wood-paneled walls, dimly lit by warm overhead lights, stretching forward into soft focus.

**Elements:** Dark wood paneling with brass fixtures, narrow windows on left showing void/darkness outside, compartment doors on right (numbered but unreadable), worn red carpet runner, handrails (brass, slightly tarnished), subtle motion blur suggesting movement.

**Mood:** Claustrophobic yet endless, the corridor seems to curve slightly, creating uncertainty about how long it is. A sense of traveling through time rather than space.

**Color:** Warm amber wood tones, deep burgundy carpet, brass gold accents, black void outside windows.

**Safe Zones:** Top 12% shows ceiling with subtle lighting fixtures, bottom 18% shows carpet fading into shadow.

**Reference Vibe:** Wes Anderson symmetry meets David Lynch unsettling atmosphere, vintage European sleeper trains (Orient Express aesthetic).
```

---

#### `LOC_COMPARTMENT` (Zugabteil)

```
**Scene:** Small train compartment interior, facing seats upholstered in worn burgundy fabric, small table between them, window showing darkness outside.

**Elements:** Bench seats (burgundy velvet, slightly worn), folding table (wood veneer), overhead luggage rack (brass), vintage reading lamp (warm glow), curtains (heavy fabric, partially drawn), window reflecting interior light, floor (dark carpet).

**Mood:** Intimate, enclosed, cozy yet isolating. A private bubble moving through nothingness.

**Color:** Deep burgundy fabric, warm amber lamp light, dark wood accents, black window void.

**Safe Zones:** Top 12% shows luggage rack/ceiling, bottom 18% shows floor and seat base.

**Reference Vibe:** Classic European sleeper train compartments, Agatha Christie "Murder on the Orient Express" aesthetic, vintage travel nostalgia.
```

---

#### `LOC_WINDOW` (Fensteraussicht)

```
**Scene:** View through train window, close-up perspective, showing the window frame and the void beyond.

**Elements:** Thick glass with subtle reflections of interior (blurred face, lamp light), brass window latch, thin curtain edge visible, complete darkness outside (no stars, no landscape, pure void), faint condensation on glass, subtle vibration blur.

**Mood:** Existential, the void outside is unnaturally empty, suggesting the train exists in a space outside normal reality. Reflections hint at the protagonist's presence without showing them clearly.

**Color:** Black void, warm amber reflections, brass frame accents, cool blue glass tint.

**Safe Zones:** Top 12% and bottom 18% are pure darkness (void extends beyond frame).

**Reference Vibe:** Hiroshi Sugimoto's seascapes (endless void), Andrei Tarkovsky's use of windows as thresholds.
```

---

#### `LOC_COMP7` (Abteil 7)

```
**Scene:** Same as LOC_COMPARTMENT, but subtly "off." Everything is slightly too perfect, slightly too still.

**Elements:** Burgundy seats (pristine, no wear), polished table (no scratches), lamp (brighter, warmer), window (darker, more reflective), air (clearer, no dust), subtle golden haze around edges.

**Mood:** Uncanny, dreamlike, a memory rather than a place. This compartment exists in a liminal state—both real and unreal.

**Color:** Richer burgundy, warmer gold tones, deeper blacks, slight Gaussian glow effect.

**Safe Zones:** Top 12% shows ceiling with soft golden gradient, bottom 18% shows floor with subtle glow.

**Difference from LOC_COMPARTMENT:** More saturated colors, softer edges, dreamlike glow, no visible wear/tear.

**Reference Vibe:** Dream sequences in Wong Kar-wai films (soft focus, golden hour lighting), Lynchian "Red Room" aesthetic.
```

---

#### `LOC_TRANSITION` (Schwelle / Tür)

```
**Scene:** Open train door, half inside the train (dark interior), half outside (blinding white/gold light), perfectly centered composition.

**Elements:** Train door frame (dark metal, sharply defined), interior (deep shadows, barely visible seats/corridor), exterior (pure light, no details visible, overexposed), threshold line (crisp, high contrast), faint silhouette of platform edge.

**Mood:** The moment of decision, standing between two worlds. The light outside is both inviting and terrifying.

**Color:** Deep black interior, pure white/gold exterior, sharp tonal separation.

**Safe Zones:** Top 12% is pure light, bottom 18% shows dark train floor.

**Reference Vibe:** Minimal, abstract, high-contrast photography (Hiroshi Sugimoto, Wolfgang Tillmans), near-death experience aesthetic.
```

---

### Szenen-spezifische Prompts (Einzigartige Momente)

#### `SCENE_CONTROL` (Schaffner-Kontroll-Szenen)

```
**Scene:** Train control checkpoint area, small alcove with folding table, harsh overhead light creating dramatic shadows, conductor's silhouette looming.

**Elements:** Folding inspection table (metal, worn), overhead light (single bulb, creating cone of harsh light), conductor's shadow (elongated, ominous), ticket punch tool (metal, reflective), clipboard with illegible forms, narrow corridor visible behind.

**Mood:** Interrogation, judgment, power imbalance. The light isolates the protagonist, making them feel exposed.

**Color:** Harsh white light overhead, deep black shadows, cold metal grays.

**Safe Zones:** Top 12% shows ceiling/light fixture, bottom 18% shows dark floor.

**Reference Vibe:** Film noir interrogation scenes, Kafka's "The Trial" bureaucratic nightmare, German Expressionist lighting.
```

---

#### `SCENE_MIRROR` (Spiegel-Begegnungs-Szenen)

```
**Scene:** Train washroom, small and cramped, centered on a mirror above the sink, reflection shows protagonist's face (blurred, indistinct).

**Elements:** Mirror (rectangular, slightly fogged), sink (white porcelain, brass tap), reflection (blurred face, no clear features), overhead light (flickering slightly), tiled walls (vintage white/black pattern), door visible in reflection (closed).

**Mood:** Confrontation with self, identity crisis, the reflection is wrong somehow—either too clear or too blurred, features shifting.

**Color:** Sterile white tiles, cold blue-gray tones, harsh fluorescent lighting, brass accents.

**Safe Zones:** Top 12% shows ceiling tiles, bottom 18% shows sink edge.

**Reference Vibe:** Psychological horror mirror scenes (Repulsion, Black Swan), clinical bathroom lighting.
```

---

#### `SCENE_ANNOUNCEMENT` (Letzte Durchsage-Szene c7_s06/s07)

```
**Scene:** Corridor view looking up at a vintage loudspeaker mounted on the ceiling, distorted sound waves visualized as subtle ripples in the air.

**Elements:** Loudspeaker (vintage mesh grill, brass cone, mounted on ceiling), wood-paneled corridor walls, subtle visual distortion (air ripples, heat wave effect), emergency light (red, glowing faintly), corridor stretching behind.

**Mood:** The announcement is invasive, impossible to ignore, warping reality itself.

**Color:** Warm wood tones, brass speaker, red emergency light glow, subtle motion blur.

**Safe Zones:** Top 12% shows ceiling with speaker, bottom 18% shows corridor floor.

**Reference Vibe:** Sound made visible (synesthesia), Blade Runner PA announcement scenes, vintage train intercom aesthetic.
```

---

#### `SCENE_DISSOLVE` (Korridor-Auflösung c7_s09)

```
**Scene:** Train corridor, but walls are becoming transparent, revealing overlapping layers of other corridors, other times.

**Elements:** Primary corridor (foreground, semi-transparent), secondary corridors (layered behind, different lighting/time periods), ghost passengers (faint silhouettes, walking through), wood panels (fading to wireframe), windows (showing multiple voids simultaneously).

**Mood:** Reality collapsing, temporal layers merging, the train's structure is failing.

**Color:** Desaturated primaries, multiple light sources (conflicting warm/cool), ghostly transparencies.

**Safe Zones:** Top 12% shows layered ceilings, bottom 18% shows layered floors.

**Reference Vibe:** Double-exposure photography, VFX temporal echoes, Inception spatial folding.
```

---

#### `SCENE_VOID` (Fenster-Leere c5_s12, c6_s17)

```
**Scene:** Extreme close-up of train window, the void outside is no longer black—it's a churning, non-Euclidean space.

**Elements:** Window frame (brass, bending slightly), glass (warped, reflecting impossible angles), void (not black, but shifting dark colors—deep purples, blues, hints of non-light), protagonist's reflection (fragmented, multiple overlapping faces).

**Mood:** Cosmic horror, the void is aware, the train is traveling through something that should not exist.

**Color:** Deep purples, abyssal blues, void-blacks, iridescent oil-slick shimmer.

**Safe Zones:** Top 12% and bottom 18% fade to pure void.

**Reference Vibe:** H.R. Giger biomechanical voids, cosmic horror (Event Horizon, Annihilation), non-Euclidean geometry.
```

---

### Enden-spezifische Prompts

#### `ENDING_CITY` (Wahrheits-Ende - Moderne Stadt)

```
**Scene:** Modern city street at dawn, normal and alive, people walking, cars passing, sunlight breaking over buildings.

**Elements:** Wide street, pedestrians (blurred motion), cars, storefronts (lit, open), sunrise light (golden, hopeful), clear sky, modern architecture (glass, concrete).

**Mood:** Liberation, the real world, overwhelming but beautiful.

**Color:** Warm sunrise gold, vibrant blues, natural colors (no noir palette).

**Safe Zones:** Top 12% shows sky, bottom 18% shows pavement.
```

---

#### `ENDING_REUNION` (Liebes-Ende - Bahnsteig-Wiedersehen)

```
**Scene:** Train platform bench, two figures sitting close together, warm afternoon light.

**Elements:** Bench (wood, weathered), platform (clean, modern), sunlight (soft, golden hour), figures (silhouettes, intimate posture), distant train (blurred, leaving).

**Mood:** Bittersweet, reunion, time lost but connection found.

**Color:** Warm gold, soft shadows, muted earth tones.

**Safe Zones:** Top 12% shows platform canopy, bottom 18% shows platform floor.
```

---

#### `ENDING_HOME` (Liebes-Ende - Häusliches Interieur)

```
**Scene:** Small, cozy living room, warm light from lamps, photos on walls, domestic comfort.

**Elements:** Sofa (worn, comfortable), coffee table (photos, books), lamps (warm glow), family photos (blurred faces), window (daylight outside).

**Mood:** Home, safety, belonging, temporary but real.

**Color:** Warm yellows, soft browns, natural wood tones.

**Safe Zones:** Top 12% shows ceiling, bottom 18% shows floor/rug.
```

---

#### `ENDING_LIBRARY` (Schuld-Ende - Forschungs-Bibliothek)

```
**Scene:** Library desk, papers spread out, old newspaper articles, protagonist's hands writing.

**Elements:** Wooden desk, papers (old newspaper clippings), pen, notebook (handwriting visible but unreadable), desk lamp (focused light), bookshelves (blurred background).

**Mood:** Solitary, purposeful, the weight of memory.

**Color:** Warm desk lamp light, dark wood, aged paper yellows.

**Safe Zones:** Top 12% shows bookshelves, bottom 18% shows desk surface.
```

---

## G) Checkliste für Asset-Zusammenfassung

### Ort-Hintergründe (6 Assets)

- [ ] `bg_loc_platform__v1.png`
- [ ] `bg_loc_corridor__v1.png`
- [ ] `bg_loc_compartment__v1.png`
- [ ] `bg_loc_window__v1.png`
- [ ] `bg_loc_comp7__v1.png`
- [ ] `bg_loc_transition__v1.png`

### Szenen-spezifische Hintergründe (9 Assets)

- [ ] `bg_scene_c2_control_01__v1.png`
- [ ] `bg_scene_c3_control_02__v1.png`
- [ ] `bg_scene_c4_mirror_intro__v1.png`
- [ ] `bg_scene_c5_control_03__v1.png`
- [ ] `bg_scene_c5_window_void__v1.png`
- [ ] `bg_scene_c6_mirror_self__v1.png`
- [ ] `bg_scene_c6_void__v1.png`
- [ ] `bg_scene_c7_announcement__v1.png`
- [ ] `bg_scene_c7_dissolve__v1.png`

### Enden-Hintergründe (4 Assets)

- [ ] `bg_ending_city__v1.png`
- [ ] `bg_ending_reunion__v1.png`
- [ ] `bg_ending_home__v1.png`
- [ ] `bg_ending_library__v1.png`

### Optionale Overlays (3 Assets)

- [ ] `ov_grain__v1.png`
- [ ] `ov_station_banner__v1.png`
- [ ] `ov_drift_distortion__v1.png`

**Gesamt-Core-Assets:** 22 Bilder (deckt 100% der Szenen via Wiederverwendungs-Strategie ab)

---

## H) Implementierungs-Arbeitsablauf

1. **Generiere zuerst Kern-Orte** (6 Assets): Bahnsteig, Korridor, Abteil, Fenster, Abteil 7, Schwelle
2. **Teste Integration:** Importiere in Android-App, verifiziere sichere Bereiche, teste Textlesbarkeit
3. **Generiere Szenen-spezifische Hintergründe** (9 Assets): Kontrollen, Spiegel, Leere, Durchsage, Auflösung
4. **Generiere Enden-Hintergründe** (4 Assets): Stadt, Wiedersehen, Zuhause, Bibliothek
5. **Poliere & Optimiere:** Komprimiere PNGs, erstelle @1x/@2x Varianten, füge optionale Overlays hinzu
6. **Aktualisiere Asset-Manifest:** Dokumentiere endgültige Dateipfade in `android-native/app/src/main/assets/`

---

**Ende der Spezifikation**
