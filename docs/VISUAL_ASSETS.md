# NACHTZUG 19 - Visual Assets Specification

**Version**: 2.0 (Konsolidiert)
**Last Updated**: 2026-01-25
**Zusammenführung von**: VISUAL_ASSETS_PLAN.md + assets/BACKGROUND_ASSETS_SPEC.md

---

## 1. Visueller Stil (Global)

### Design Philosophy

NACHTZUG 19 verwendet Hintergrundbilder für **Atmosphäre**, nicht Gameplay-Interaktion. Das Spiel folgt einer **"Reader Noir"**-Ästhetik:

- **Mobile-First**: Optimiert für vertikale Portrait-Screens (9:16 Seitenverhältnis)
- **Minimalistisch**: Backgrounds unterstützen Lesbarkeit, konkurrieren nie mit Text
- **Cinematic**: 2D Digital Painting-Stil mit Film-Noir-Einflüssen
- **Atmosphärisch**: Mitternachtspalette mit warmen Amber-Highlights, subtiles Grain
- **Non-Intrusive**: Text bleibt immer lesbar gegen Backgrounds

### Ästhetik & Stil

*   **Ästhetik:** 1970s Cinematic Noir, analoge Fotografie
*   **Farben:** Mitternachtsblau/Anthrazit (Schatten) und Amber/Gold (Highlights)
*   **Effekte:** Starkes Filmkorn (Grain), hohe Kontraste, volumetrisches Licht
*   **Format:** 9:16 (Mobile Portrait)

### Key Visual Themes

1. **Liminal Spaces**: Zugkorridore, Bahnsteige, Übergangsräume
2. **Temporal Distortion**: Subtile visuelle Hinweise für Memory Drift (Blur, Grain, Color Shift)
3. **Noir Atmosphere**: Low-key Lighting, starker Kontrast, Warm/Cool Color Interplay
4. **Psychological Mystery**: Ambige Räume, die vertraut und unsettling zugleich wirken

---

## 2. Technische Spezifikationen

### Image Format & Dimensions

| **Property**          | **Value**                          | **Notes**                                    |
|-----------------------|------------------------------------|----------------------------------------------|
| **Primary Format**    | PNG (lossless)                     | WebP optional für Web-Export                 |
| **Aspect Ratio**      | 9:16 (Portrait)                    | Mobile-optimized                             |
| **Base Resolution**   | 1440 × 2560 px                     | High-DPI baseline                            |
| **Export Variants**   | @1x (720×1280), @2x (1440×2560)    | Für Performance-Optimierung                  |
| **Color Space**       | sRGB                               | Standard Web/Mobile Color Space              |
| **Max File Size**     | 500 KB per image (PNG)             | Schnelles Laden auf Mobile                   |

### Safe Areas

Um Text-Overlays lesbar zu halten:

| **Area**              | **Position**     | **Height** | **Purpose**                    |
|-----------------------|------------------|------------|--------------------------------|
| **Top Safe Zone**     | Top 12%          | ~307 px    | Status bar / Kapitel-Indikator |
| **Bottom Safe Zone**  | Bottom 18%       | ~460 px    | Choice tray / Action buttons   |
| **Reading Zone**      | Center 70%       | ~1793 px   | Main narrative text display    |

**Design Guideline**: Visuellen Fokus und High-Contrast-Elemente **außerhalb** der Safe Zones halten. Subtile Gradienten oder Vignetten nutzen für Text-Lesbarkeit.

---

## 3. Asset-Liste & Prompts

### 3.1 Location Backdrops (Wiederverwendbar)

**Format**: `bg_loc_<location>__v<version>.png`

#### 1. `bg_loc_platform__v1` (Der Bahnsteig)
*   **Einsatz**: Kapitelanfang, `station_end` Szenen
*   **Prompt**:
    ```
    An empty, desolate train platform at night in 1973. Dim yellow street lamps casting long,
    eerie shadows on wet concrete. Thick fog in the background. Vintage signs with sans-serif
    typography. No people. Wide street, worn concrete floor with faint yellow safety line,
    metal benches (cold, reflective), vintage clock showing 23:47, dim overhead fluorescent
    lights. Liminal, isolated waiting room aesthetic. Deep blue-black shadows, sickly yellow-green
    fluorescent lighting, cool concrete gray.
    ```

#### 2. `bg_loc_corridor__v1` (Der Gang)
*   **Einsatz**: Bewegung zwischen Abteilen, Interludes
*   **Prompt**:
    ```
    Narrow corridor inside a vintage 1970s passenger train. Deep midnight blue seat upholstery,
    metallic handrails, flickering pale neon lights on the ceiling. Long perspective, claustrophobic
    feeling. Dark wood paneling with brass fixtures, narrow windows on left showing void/darkness
    outside, compartment doors on right, worn red carpet runner. Grainy texture. Warm amber wood
    tones, deep burgundy carpet, brass gold accents, black void outside windows.
    ```

#### 3. `bg_loc_compartment__v1` (Das Abteil)
*   **Einsatz**: Gespräche mit NPCs (Junge, Schlafloser, Comp7)
*   **Prompt**:
    ```
    Interior of a 1970s train compartment. Orange and brown patterned fabric seats, a small wooden
    table with a built-in chrome ashtray. Warm amber glow from a reading lamp. Dark night visible
    through the window. Bench seats (burgundy velvet, slightly worn), folding table (wood veneer),
    overhead luggage rack (brass), vintage reading lamp, heavy curtains (partially drawn), window
    reflecting interior light. Intimate, enclosed, cozy yet isolating.
    ```

#### 4. `bg_loc_window__v1` (Das Fenster)
*   **Einsatz**: "Hinausschauen", C5 Void, C3 Spiegelungen
*   **Prompt**:
    ```
    Extreme close-up of a train window reflecting a subtle, blurred silhouette of a face. Outside
    is a pitch-black void with faint, streaking light trails. Raindrops on the glass. Moody and
    introspective. Thick glass with subtle reflections of interior (blurred face, lamp light),
    brass window latch, thin curtain edge, complete darkness outside (no stars, no landscape,
    pure void), faint condensation. Black void, warm amber reflections, brass frame accents,
    cool blue glass tint.
    ```

#### 5. `bg_loc_comp7__v1` (Wagen 7 / Compartment 7)
*   **Einsatz**: Comp7-Szenen in ihrem speziellen Abteil
*   **Prompt**:
    ```
    An impossibly large, surreal room inside a train. Walls are completely covered from floor
    to ceiling with thousands of old, handwritten notebooks. Warm dust motes dancing in amber
    light beams. A single wooden desk in the center. Same as regular compartment, but subtly
    "off" - everything slightly too perfect, too still. Burgundy seats (pristine, no wear),
    polished table, lamp (brighter, warmer), window (darker, more reflective), air (clearer,
    no dust), subtle golden haze. Uncanny, dreamlike. Richer burgundy, warmer gold tones,
    deeper blacks, slight Gaussian glow effect.
    ```

#### 6. `bg_loc_transition__v1` (Threshold / Doorway)
*   **Einsatz**: C7 Türen öffnen sich, Endings
*   **Prompt**:
    ```
    Open train door, half inside the train (dark interior), half outside (blinding white/gold
    light), perfectly centered composition. Train door frame (dark metal, sharply defined),
    interior (deep shadows, barely visible seats/corridor), exterior (pure light, no details
    visible, overexposed), threshold line (crisp, high contrast), faint silhouette of platform
    edge. The moment of decision, standing between two worlds. Deep black interior, pure white/gold
    exterior, sharp tonal separation.
    ```

---

### 3.2 Scene-Specific Backdrops (Unique Moments)

**Format**: `bg_scene_<sceneId>__v<version>.png`

#### `bg_scene_control__v1` (Conductor Control Scenes)
*   **Einsatz**: Szenen mit Tag `control` oder `conductor`
*   **Prompt**:
    ```
    A tall, ominous silhouette of a train conductor in a formal 1970s uniform and cap. Face
    hidden in deep shadow. He is holding a metallic ticket punch. Dramatic backlighting from
    the corridor neon. Train control checkpoint area, small alcove with folding table, harsh
    overhead light creating dramatic shadows. Folding inspection table (metal, worn), overhead
    light (single bulb, cone of harsh light), conductor's shadow (elongated, ominous), ticket
    punch tool (metal, reflective), clipboard with illegible forms. Interrogation, judgment,
    power imbalance. Harsh white light, deep black shadows, cold metal grays.
    ```

#### `bg_scene_mirror__v1` (Mirror Encounter Scenes)
*   **Einsatz**: Waschraum-Szenen, C4/C6 Spiegel-Momente
*   **Prompt**:
    ```
    A cracked, foggy mirror in a small, cramped vintage train restroom. Yellowish fluorescent
    light. Grime on the edges. The reflection is distorted and dark. High contrast, film noir
    style. Mirror (rectangular, slightly fogged), sink (white porcelain, brass tap), reflection
    (blurred face, no clear features), overhead light (flickering slightly), tiled walls (vintage
    white/black pattern), door visible in reflection (closed). Confrontation with self, identity
    crisis. Sterile white tiles, cold blue-gray tones, harsh fluorescent lighting, brass accents.
    ```

#### `bg_scene_void__v1` (Window Void - C5/C6)
*   **Einsatz**: C5_s12 window_void, C6_s17 void_approach
*   **Prompt**:
    ```
    Extreme close-up of train window, the void outside is no longer black—it's a churning,
    non-Euclidean space. Window frame (brass, bending slightly), glass (warped, reflecting
    impossible angles), void (not black, but shifting dark colors—deep purples, blues, hints
    of non-light), protagonist's reflection (fragmented, multiple overlapping faces). Cosmic
    horror, the void is aware. Deep purples, abyssal blues, void-blacks, iridescent oil-slick
    shimmer.
    ```

#### `bg_scene_announcement__v1` (Final Announcement - C7)
*   **Einsatz**: c7_s06/s07 announcement scenes
*   **Prompt**:
    ```
    Corridor view looking up at a vintage loudspeaker mounted on the ceiling, distorted sound
    waves visualized as subtle ripples in the air. Loudspeaker (vintage mesh grill, brass cone,
    mounted on ceiling), wood-paneled corridor walls, subtle visual distortion (air ripples,
    heat wave effect), emergency light (red, glowing faintly), corridor stretching behind. The
    announcement is invasive, warping reality itself. Warm wood tones, brass speaker, red
    emergency light glow, subtle motion blur.
    ```

#### `bg_scene_dissolve__v1` (Corridor Dissolve - C7)
*   **Einsatz**: c7_s09 corridor_dissolve
*   **Prompt**:
    ```
    Train corridor, but walls are becoming transparent, revealing overlapping layers of other
    corridors, other times. Primary corridor (foreground, semi-transparent), secondary corridors
    (layered behind, different lighting/time periods), ghost passengers (faint silhouettes,
    walking through), wood panels (fading to wireframe), windows (showing multiple voids
    simultaneously). Reality collapsing, temporal layers merging. Desaturated primaries,
    multiple light sources (conflicting warm/cool), ghostly transparencies.
    ```

---

### 3.3 Ending-Specific Backdrops

#### `bg_ending_city__v1` (Truth Ending - Modern City)
*   **Einsatz**: ending_truth_02, ending_truth_03
*   **Prompt**:
    ```
    Modern city street at dawn, normal and alive, people walking, cars passing, sunlight
    breaking over buildings. Wide street, pedestrians (blurred motion), cars, storefronts
    (lit, open), sunrise light (golden, hopeful), clear sky, modern architecture (glass,
    concrete). Liberation, the real world. Warm sunrise gold, vibrant blues, natural colors
    (no noir palette).
    ```

#### `bg_ending_reunion__v1` (Love Ending - Reunion)
*   **Einsatz**: ending_love_02
*   **Prompt**:
    ```
    Train platform bench, two figures sitting close together, warm afternoon light. Bench
    (wood, weathered), platform (clean, modern), sunlight (soft, golden hour), figures
    (silhouettes, intimate posture), distant train (blurred, leaving). Bittersweet, reunion,
    time lost but connection found. Warm gold, soft shadows, muted earth tones.
    ```

#### `bg_ending_home__v1` (Love Ending - Domestic)
*   **Einsatz**: ending_love_03
*   **Prompt**:
    ```
    Small, cozy living room, warm light from lamps, photos on walls, domestic comfort. Sofa
    (worn, comfortable), coffee table (photos, books), lamps (warm glow), family photos
    (blurred faces), window (daylight outside). Home, safety, belonging, temporary but real.
    Warm yellows, soft browns, natural wood tones.
    ```

#### `bg_ending_library__v1` (Guilt Ending)
*   **Einsatz**: ending_guilt_03
*   **Prompt**:
    ```
    Library desk, papers spread out, old newspaper articles, protagonist's hands writing.
    Wooden desk, papers (old newspaper clippings), pen, notebook (handwriting visible but
    unreadable), desk lamp (focused light), bookshelves (blurred background). Solitary,
    purposeful, the weight of memory. Warm desk lamp light, dark wood, aged paper yellows.
    ```

---

## 4. Naming Schema & Organization

### Location Backdrops (Reusable)
```
src/assets/backgrounds/locations/
├── bg_loc_platform__v1.png
├── bg_loc_corridor__v1.png
├── bg_loc_compartment__v1.png
├── bg_loc_window__v1.png
├── bg_loc_comp7__v1.png
└── bg_loc_transition__v1.png
```

### Scene-Specific Backdrops
```
src/assets/backgrounds/scenes/
├── bg_scene_control__v1.png
├── bg_scene_mirror__v1.png
├── bg_scene_void__v1.png
├── bg_scene_announcement__v1.png
└── bg_scene_dissolve__v1.png
```

### Ending Backdrops
```
src/assets/backgrounds/endings/
├── bg_ending_city__v1.png
├── bg_ending_reunion__v1.png
├── bg_ending_home__v1.png
└── bg_ending_library__v1.png
```

### Overlays (Optional)
```
src/assets/backgrounds/overlays/
├── ov_grain__v1.png
├── ov_station_banner__v1.png
└── ov_drift_distortion__v1.png
```

### Incoming Assets (Workspace)
```
src/assets/backgrounds/_incoming/
```

---

## 5. Implementierungs-Plan

### Phase 1: Content Tagging (TypeScript)
Die `.ts` Szenendateien müssen um Tags im `tags`-Array erweitert werden:
```typescript
tags: ['setup', 'loc_station']
```

### Phase 2: Android Resource Import (Kotlin)
Bilder in `android-native/app/src/main/res/drawable-nodpi/` ablegen:
*   `bg_loc_platform.png`
*   `bg_loc_corridor.png`
*   etc.

### Phase 3: Logic Mapping (Kotlin)
In `BackgroundLayers.kt` oder Helper-Klasse:
```kotlin
fun getBackgroundForTags(tags: List<SceneTag>): Int {
    return when {
        tags.contains("loc_station") -> R.drawable.bg_loc_platform
        tags.contains("loc_corridor") -> R.drawable.bg_loc_corridor
        tags.contains("loc_compartment") -> R.drawable.bg_loc_compartment
        tags.contains("loc_window") -> R.drawable.bg_loc_window
        tags.contains("loc_comp7") -> R.drawable.bg_loc_comp7
        tags.contains("control") -> R.drawable.bg_scene_control
        // ...
        else -> R.drawable.bg_loc_corridor // Default
    }
}
```

---

## 6. Global Style Prompt (Apply to All Images)

```
**Style:** 2D cinematic digital painting, realistic render with painterly touches,
inspired by film noir and liminal space photography.

**Palette:** Midnight blue-black base (#0a0e1a), warm amber highlights (#d4a574),
cool teal shadows (#1a3a3a), desaturated earth tones.

**Lighting:** Low-key lighting with high contrast, single dominant light source
(often overhead or from windows), deep shadows with subtle rim lighting on edges.

**Atmosphere:** Subtle film grain texture, soft vignette around edges, slight
depth-of-field blur in background, cinematic 2.35:1 framing adapted to 9:16 vertical.

**Technical:** 9:16 vertical aspect ratio (portrait), high resolution (1440×2560px),
safe zones: top 12% and bottom 18% should have minimal visual detail or gradual gradients
to ensure text readability.

**Constraints:**
- NO readable text, signage, or logos
- NO clear human faces (silhouettes or blurred figures only)
- NO overly busy compositions (keep visual simplicity)
- NO bright, saturated colors (maintain muted, noir palette)
- ENSURE top 12% and bottom 18% are visually calm (gradients, darkness, or empty space)
```

---

## 7. Rendering & UI Integration

### CSS / Rendering Properties

```css
.scene-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: -webkit-optimize-contrast; /* Sharpen on mobile */
}
```

### Vignette & Grain (Optional Post-Processing)

**Recommendation**: Apply subtile Effekte via CSS/Shader statt baking into assets.

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

**Grain Texture**: Separates `ov_grain__v1.png` Overlay mit low opacity (~5-10%) für Film-Textur.

### Memory Drift Effects (Dynamic)

Für Szenen mit `memory_drift >= 3`, subtile visuelle Distortion via CSS transforms:

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

**Important**: Text-Overlays scharf und unaffected by drift effects halten.

---

## 8. Asset Checklist Summary

### Location Backdrops (6 assets)
- [ ] `bg_loc_platform__v1.png`
- [ ] `bg_loc_corridor__v1.png`
- [ ] `bg_loc_compartment__v1.png`
- [ ] `bg_loc_window__v1.png`
- [ ] `bg_loc_comp7__v1.png`
- [ ] `bg_loc_transition__v1.png`

### Scene-Specific Backdrops (5 assets)
- [ ] `bg_scene_control__v1.png`
- [ ] `bg_scene_mirror__v1.png`
- [ ] `bg_scene_void__v1.png`
- [ ] `bg_scene_announcement__v1.png`
- [ ] `bg_scene_dissolve__v1.png`

### Ending Backdrops (4 assets)
- [ ] `bg_ending_city__v1.png`
- [ ] `bg_ending_reunion__v1.png`
- [ ] `bg_ending_home__v1.png`
- [ ] `bg_ending_library__v1.png`

### Optional Overlays (3 assets)
- [ ] `ov_grain__v1.png`
- [ ] `ov_station_banner__v1.png`
- [ ] `ov_drift_distortion__v1.png`

**Total Core Assets**: 15 images (covers 100% of scenes via reuse strategy)

---

## 9. Implementation Workflow

1. **Generate Core Locations First** (6 assets): Platform, Corridor, Compartment, Window, Comp7, Transition
2. **Test Integration**: Import into Android app, verify safe zones, test text readability
3. **Generate Scene-Specific Backdrops** (5 assets): Control, mirror, void, announcement, dissolve
4. **Generate Ending Backdrops** (4 assets): City, reunion, home, library
5. **Polish & Optimize**: Compress PNGs, create @1x/@2x variants, add optional overlays
6. **Update Asset Manifest**: Document final file paths in `android-native/app/src/main/assets/`

---

## Referenzen

- **Detaillierte Scene-to-Background Mapping**: Siehe [assets/BACKGROUND_ASSETS_SPEC.md](./assets/BACKGROUND_ASSETS_SPEC.md)
- **Android UI/UX Guide**: Siehe [ANDROID_GUIDE.md](./ANDROID_GUIDE.md)
- **Architecture**: Siehe [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**End of Specification**
**Version 2.0** | Konsolidiert: 2026-01-25
