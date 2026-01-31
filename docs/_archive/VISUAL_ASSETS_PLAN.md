# NACHTZUG 19 - Visual Assets Plan

Diese Datei definiert die benötigten visuellen Assets für das "2D Reader Noir"-Konzept und deren Zuordnung zu den Szenen-Tags.

## Visueller Stil (Global)
*   **Ästhetik:** 1970s Cinematic Noir, analoge Fotografie.
*   **Farben:** Mitternachtsblau/Anthrazit (Schatten) und Amber/Gold (Highlights).
*   **Effekte:** Starkes Filmkorn (Grain), hohe Kontraste, volumetrisches Licht.
*   **Format:** 9:16 (Mobile Portrait).

---

## Asset-Liste & Prompts

### 1. `loc_station` (Der Bahnsteig)
*   **Einsatz:** Kapitelanfang, `station_end` Szenen.
*   **Prompt:** `An empty, desolate train platform at night in 1973. Dim yellow street lamps casting long, eerie shadows on wet concrete. Thick fog in the background. Vintage signs with sans-serif typography. No people.`

### 2. `loc_corridor` (Der Gang)
*   **Einsatz:** Bewegung zwischen Abteilen, Interludes.
*   **Prompt:** `Narrow corridor inside a vintage 1970s passenger train. Deep midnight blue seat upholstery, metallic handrails, flickering pale neon lights on the ceiling. Long perspective, claustrophobic feeling. Grainy texture.`

### 3. `loc_compartment` (Das Abteil)
*   **Einsatz:** Gespräche mit NPCs (Junge, Schlafloser, Frau).
*   **Prompt:** `Interior of a 1970s train compartment. Orange and brown patterned fabric seats, a small wooden table with a built-in chrome ashtray. Warm amber glow from a reading lamp. Dark night visible through the window.`

### 4. `loc_window` (Das Fenster)
*   **Einsatz:** "Hinausschauen", C5 Void, C3 Spiegelungen.
*   **Prompt:** `Extreme close-up of a train window reflecting a subtle, blurred silhouette of a face. Outside is a pitch-black void with faint, streaking light trails. Raindrops on the glass. Moody and introspective.`

### 5. `loc_conductor` (Die Kontrolle)
*   **Einsatz:** Szenen mit Tag `control` oder `conductor`.
*   **Prompt:** `A tall, ominous silhouette of a train conductor in a formal 1970s uniform and cap. Face hidden in deep shadow. He is holding a metallic ticket punch. Dramatic backlighting from the corridor neon.`

### 6. `loc_mirror` (Der Spiegel)
*   **Einsatz:** Waschraum-Szenen, C4/C6 Spiegel-Momente.
*   **Prompt:** `A cracked, foggy mirror in a small, cramped vintage train restroom. Yellowish fluorescent light. Grime on the edges. The reflection is distorted and dark. High contrast, film noir style.`

### 7. `loc_abteil7` (Wagen 7)
*   **Einsatz:** Comp7-Szenen in ihrem speziellen Abteil.
*   **Prompt:** `An impossibly large, surreal room inside a train. Walls are completely covered from floor to ceiling with thousands of old, handwritten notebooks. Warm dust motes dancing in amber light beams. A single wooden desk in the center.`

---

## Implementierungs-Plan

### Phase 1: Content Tagging (TypeScript)
Die `.ts` Szenendateien müssen um die Tags im `tags`-Array erweitert werden:
```typescript
tags: ['setup', 'loc_station']
```

### Phase 2: Android Resource Import (Kotlin)
Bilder in `android-native/app/src/main/res/drawable-nodpi/` ablegen:
*   `bg_station.jpg`
*   `bg_corridor.jpg`
*   ...

### Phase 3: Logic Mapping (Kotlin)
In `BackgroundLayers.kt` oder einer Helper-Klasse:
```kotlin
fun getBackgroundForTags(tags: List<SceneTag>): Int {
    return when {
        tags.contains("loc_station") -> R.drawable.bg_station
        tags.contains("loc_conductor") -> R.drawable.bg_conductor
        // ...
        else -> R.drawable.bg_corridor
    }
}
```
