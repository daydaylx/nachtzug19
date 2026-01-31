# Overworld UI Konzept (Z1) – GBA-Pokémon-Stil Pixel Overworld

**Version**: 2.0
**Ziel:** Nachtzug 19 soll sich auf Mobile wie ein klassisches GBA-RPG anfühlen (Top-Down, Pokémon Ruby/Sapphire-Style).
**Scope:** Mini-Overworld (3–5 Screens), keine Scope-Explosion.
**Referenz:** Pokémon Ruby/Sapphire (GBA), klassische 16-Bit RPG-Ästhetik

---

## 1) World Layer vs Story Layer
- **World Layer:** Position, Bewegung, Türen, NPC-Hotspots.
- **Story Layer:** Text, Choices, Konsequenzen (Engine/State).

**Regel:** Overworld entscheidet nur „wo bin ich / was kann ich anklicken".

---

## 2) Z1 Rooms
- `room_corridor_main` – Hauptkorridor des Zuges
- `room_compartment` – Passagierabteil
- `room_transition` – Übergangsbereich zwischen Wagen
- `room_wagon7` – Mysteriöser Wagen 7
- `room_platform_station` – Bahnsteig

---

## 3) Steuerung (Mobile)
- **Tap-to-move:** Tap auf Tile/Position → Player läuft dorthin.
- **Tap auf Hotspot:** Auto-Walk + Interaktion.
- **Optional:** D-Pad (Settings).
- **Reduce Motion:** Animationen minimal.

---

## 4) GBA-Pokémon-Pixel-Look

### 4.1 Farbpalette (Nachtzug-Atmosphäre)

Orientiert an klassischen 16-Bit RPG-Ästhetiken, aber angepasst für Nachtzug-Stimmung:

| Element | Farbe | Hex | Beschreibung |
|---------|-------|-----|--------------|
| Background | Tiefes Nachtblau | `#0D1117` | Außerhalb des Zuges |
| Floor | Warmes Holzbraun | `#5C4A3D` | Zugboden (Holzdielen) |
| Wall | Dunkles Holz | `#3D3229` | Wände/Paneele |
| Accent | Warmes Amber | `#D4A574` | Lampen/Akzente |
| Player | Helle Figur | `#E8D4B8` | Spieler-Sprite |
| NPC | Gedämpftes Grün | `#7EB88C` | NPC-Kleidung |
| Hotspot | Orange | `#E07856` | Interaktions-Highlight |
| Window | Dunkles Fenster | `#1A2A3A` | Nacht draußen |
| Carpet | Burgunder | `#8B4A4A` | Teppichläufer |
| Metal | Metall-Akzente | `#7B8B9C` | Griffe, Rahmen |
| Lamp | Lampenlicht | `#FFD93D` | Warmes Licht |
| Shadow | Warmer Schatten | `#1A1510` | Schatten |

### 4.2 Rendering-Features (GBA-Stil)

#### Holzboden
- Schachbrett-Muster (hell/dunkel alternierend)
- Subtile Holzmaserung (vertikale Linien)
- Ambience-Tint basierend auf Raum

#### Wände
- Horizontale Paneel-Linien
- Automatisch generierte Fenster (jedes 3. Tile an oberer Wand)
- Fensterrahmen aus Metall

#### Teppichläufer
- Burgunder-Streifen in der Mitte (typisch für Zugkorridore)
- Dezentes Muster

#### Beleuchtung
- Warme Lampen an der Decke (alle 4 Tiles)
- Lichtschein-Effekt um Lampen
- Atmosphärische Wärme

### 4.3 Sprite-Design

#### Spieler-Sprite
- Erkennbare Figur im 16-Bit-Stil
- Kopf, Körper, Haare klar unterscheidbar
- Schatten unter der Figur
- Highlight auf Kopf (GBA-typischer Glanz)

#### NPC-Sprites
- Ähnlicher Stil wie Spieler
- Farblich unterscheidbar (grüne Kleidung)
- Interaktions-Ring um NPCs

### 4.4 Atmosphäre
- Subtile Loop-Animationen (Lichtflimmern, optional)
- Drift ab memory_drift >= 3: leichtes Color-Shift im World Layer
- Warme, einladende aber mysteriöse Stimmung

---

## 5) Interaktion (Hotspots)

Stabile IDs:
- `npc_boy` – Der Junge
- `npc_conductor` – Der Schaffner
- `obj_recorder` – Kassettenrekorder
- `door_wagon7` – Tür zu Wagen 7
- `obj_window` – Fenster (Blick nach draußen)
- `npc_comp7` – Comp7 (mysteriöse Figur)
- `npc_sleepless` – Der Schlaflose

Interaktion öffnet Story-Overlay mit SceneID.

---

## 6) Story Overlay (kompakt)
- Titelzeile
- Text (kurz, Beat-Regel)
- 2–4 Choices
- Optional Mini-Status Pills

**Beat-Regel:** 1 Szene = 1 Gefühl + 1 Aktion.

---

## 7) Technische Umsetzung

### Dateien
- `OverworldScreen.kt` – Haupt-Composable
- `OverworldData.kt` – Room-Definitionen, Palette
- `OverworldModels.kt` – Datenmodelle (WorldPalette, RoomDefinition, etc.)

### WorldPalette-Klasse
```kotlin
data class WorldPalette(
  val background: Color,
  val floor: Color,
  val wall: Color,
  val accent: Color,
  val player: Color,
  val npc: Color,
  val hotspot: Color,
  val window: Color,
  val carpet: Color,
  val metal: Color,
  val lamp: Color,
  val shadow: Color
)
```

### Canvas-Rendering
- `drawRoom()` – Zeichnet Boden, Wände, Fenster, Teppich, Lampen
- `drawPlayer()` – GBA-Sprite-artiger Spieler
- `drawNpcHotspot()` – NPC-Sprites
- `drawObjectHotspot()` – Objekt-Sprites
- `drawDoorHotspot()` – Tür-Sprites
- `drawWindowHotspot()` – Fenster-Hotspots

---

## 8) Referenzen

- **Pokémon Ruby/Sapphire (GBA)** – Farbpalette, Sprite-Stil, Tile-basiertes Design
- **VISUAL_ASSETS.md** – Background-Konzept für Story-Overlay
- **NACHTZUG_19_READER_NOIR_UI_CONCEPT.md** – Allgemeines UI-Konzept

---

**Ende des Dokuments**
