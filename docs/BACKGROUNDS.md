# Background System Documentation

## Übersicht

NACHTZUG 19 verwendet ein Tag-basiertes Background-System, das atmosphärische Bilder basierend auf Szenen-Tags zuweist.

## Verfügbare Backgrounds

### Locations

| Asset | Datei | Beschreibung | Verwendung |
|-------|-------|--------------|------------|
| `Platform` | `bg_loc_platform_v1.png` | Bahnsteig, Hauptstation | StationEnd-Tag |
| `PlatformAlt` | `bg_loc_platform_alt_v1.png` | Alternative Bahnsteig-Ansicht | Variante |
| `Corridor` | `bg_loc_corridor_v1.png` | Gang im Zug | Fallback für verschiedene Szenen |
| `Window` | `bg_loc_window_v1.png` | Zugfenster, Nachtsicht | Ending-Fallback |
| `Transition` | `bg_loc_transition_v1.png` | Übergang zwischen Bereichen | Interlude-Tag |
| `Compartment` | `bg_loc_compartment_v1.png` | Generisches Abteil | Secret-Tag |
| `Comp7` | `bg_loc_comp7_v1.png` | Abteil 7 (ominös) | Spezielle Szenen |

### Scenes

| Asset | Datei | Beschreibung | Verwendung |
|-------|-------|--------------|------------|
| `NightGeneral` | `bg_scene_night_general_v1.png` | Allgemeine Nachtatmosphäre | Default |
| `Control` | `bg_scene_control_v1.png` | Kontrollpunkt, Autorität | Control-Tag |
| `Mirror` | `bg_scene_mirror_v1.png` | Spiegel, Reflexion | Reveal-Tag |
| `Void` | `bg_scene_void_v1.png` | Leere, Dunkelheit | Drift-Szenen |
| `Announcement` | `bg_scene_announcement_v1.png` | Durchsage, PA-System | Announcement-Tag |
| `Dissolve` | `bg_scene_dissolve_v1.png` | Auflösung der Realität | Hoher Memory-Drift |

### Endings

| Asset | Datei | Beschreibung | Verwendung |
|-------|-------|--------------|------------|
| `EndingCity` | `bg_ending_city_v1.png` | Stadtlichter, Urban | City-Ending |
| `EndingReunion` | `bg_ending_reunion_v1.png` | Warme Atmosphäre | Reunion-Ending |
| `EndingHome` | `bg_ending_home_v1.png` | Heimisches Ambiente | Home-Ending |
| `EndingLibrary` | `bg_ending_library_v1.png` | Bibliothek, Archiv | Library-Ending |

## Tag-Mapping-Logik

Die Funktion `getBackgroundForTags()` wählt Backgrounds in folgender Priorität:

1. **Ending** → `Window` (Fallback; kann mit Scene-ID erweitert werden)
2. **Terminal** → `Platform`
3. **Control** → `Control`
4. **Announcement** → `Announcement`
5. **Reveal** → `Mirror`
6. **Secret** → `Compartment`
7. **StationEnd** → `Platform`
8. **Interlude** → `Transition`
9. **Default** → `NightGeneral`

## Zukünftige Erweiterungen

### Scene-ID-basiertes Mapping

Für spezifischere Ending-Backgrounds kann die Logik erweitert werden:

```kotlin
fun getBackgroundForSceneId(sceneId: String, tags: List<SceneTag>?): BackgroundAsset {
    if (tags?.contains(SceneTag.Ending) == true) {
        return when {
            sceneId.contains("city") -> BackgroundAsset.EndingCity
            sceneId.contains("reunion") -> BackgroundAsset.EndingReunion
            sceneId.contains("home") -> BackgroundAsset.EndingHome
            sceneId.contains("library") -> BackgroundAsset.EndingLibrary
            else -> BackgroundAsset.Window
        }
    }
    return getBackgroundForTags(tags)
}
```

### Drift-basierte Varianten

Bei hohem `memory_drift` könnten zusätzliche Backgrounds verwendet werden:

- `Void` für drift >= 5
- `Dissolve` für drift >= 4

## Stock-Bilder ersetzen

Die aktuellen Backgrounds sind Placeholder-Gradienten. Um hochwertige Stock-Bilder zu verwenden:

### Automatisch (Unsplash)

```bash
cd scripts
./download_stock_backgrounds.sh
```

### Manuell

1. Besuche [Unsplash](https://unsplash.com) oder [Pexels](https://pexels.com)
2. Suche nach passenden Bildern (siehe Queries im Script)
3. Lade Bilder in 1620x1080px herunter
4. Benenne sie entsprechend (z.B. `bg_loc_compartment_v1.png`)
5. Platziere sie in `android-native/app/src/main/res/drawable-nodpi/`
6. Rebuild: `cd android-native && ./gradlew assembleDebug`

## Empfohlene Suchbegriffe

- **Compartment**: "train compartment interior dark vintage"
- **Comp7**: "train cabin dark moody night ominous"
- **Control**: "control room industrial dark authority"
- **Mirror**: "mirror reflection dark moody abstract"
- **Void**: "void dark black empty abstract"
- **Announcement**: "speaker announcement industrial station"
- **Dissolve**: "abstract dissolve fade dark surreal"
- **EndingCity**: "city night lights skyline urban"
- **EndingReunion**: "warm light cozy home reunion"
- **EndingHome**: "home interior cozy warm comfortable"
- **EndingLibrary**: "library books archive knowledge vintage"

## Animation & Effekte

- **Crossfade**: 300ms smooth transition zwischen Backgrounds
- **Drift-Tinting**: Bei memory_drift >= 3 werden Backgrounds kühler eingefärbt
  - drift >= 5: Cold tint (alpha 0.3)
  - drift >= 3: Slight cold tint (alpha 0.15)
- **Safe Zone Overlay**: Top 12% und Bottom 18% des Screens werden leicht abgedunkelt für bessere Text-Lesbarkeit
