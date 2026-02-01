# NACHTZUG 19 - Reader Noir UI Status

**Datum**: 2026-02-01
**UI-Richtung**: Reader Noir (Story-fokussiert, text-basiert)
**Status**: Aktiv implementiert in PlayerScreen.kt

---

## Warum Reader Noir?

Nach umfassender Analyse und Evaluation wurde **Reader Noir** als primäre UI-Richtung gewählt.

### Strategische Gründe

1. **Genre-Passung**:
   - NACHTZUG 19 ist ein "psychologisches Mystery-Adventure"
   - Story-fokussiert, nicht gameplay-fokussiert
   - Atmosphäre > Action
   - Drift/Memory-Mechanik braucht subtile visuelle Feedback

2. **Der "Zug" als Metapher**:
   - Linearer Fortschritt (Zug auf Schienen)
   - Fokus auf Passagiere/Begegnungen
   - Kammerspiel, nicht Exploration
   - Reader Noir = Szenen-basiert (passt perfekt)

3. **Bessere Skalierbarkeit für Narrative**:
   - Text-basierte UI = Mehr Platz für lange Dialoge
   - Komplexe Entscheidungen besser darstellbar
   - Drift-Effekte subtiler integrierbar

### Technische Gründe

4. **Weniger Assets nötig**:
   - Reader Noir: 22 Background-Bilder (~300KB je)
   - Overworld würde zusätzlich Tilesets, Sprites, Animation Frames benötigen

5. **Performance auf Low-End Devices**:
   - Reader Noir: Compose + gelegentliche Canvas-Effekte
   - Overworld: Canvas-intensive Tile-Rendering

---

## Implementierungsstatus

### ✅ Vollständig implementiert

- **PlayerScreen.kt** - Hauptansicht für Story-Darstellung
- **PixelDialogBox.kt** - Narrative Text Container (wird verwendet)
- **PixelMenu.kt** - Choice Selection (wird verwendet)
- **PixelHUD.kt** - Top Bar mit Status/Settings (wird verwendet)
- **BackgroundLayers.kt** - Drift-Effekte, Vignette, Film Grain
- **StatusSheet.kt** - Bottom Sheet mit Game State
- **Microbar.kt** - Compact Status Display
- **StationOverlay.kt** - Station Arrival Notification
- **ChoiceFeedback.kt** - Processing Overlay
- **TypewriterText.kt** - Character-by-character Animation

### 🔧 In Arbeit (2026-02-01 Umbau)

- **AppRoot.kt Routing** - Umstellung von Overworld zu PlayerScreen
- **Focus States** - Accessibility für Keyboard-Navigation
- **Station Overlay Animation** - Slide + Fade statt nur Fade
- **Choice Feedback Integration** - Callback-Unterstützung
- **Performance-Optimierungen** - Key-Stabilisierung, TypewriterText Chunking

### 📝 Vorbereitet aber nicht integriert

- **ReaderCard.kt** - Alternative zu PixelDialogBox mit Papier-Textur
- **TicketChoice.kt** - Alternative zu PixelMenu mit Hole-Punch Ästhetik
- **TicketChoiceEnhanced.kt** - Enhanced Version mit besseren Animationen

Diese Komponenten sind hochwertig implementiert, aber aktuell nutzt PlayerScreen die Pixel* Varianten. Langfristig könnten diese ersetzt werden.

### ❌ Fehlt noch

- **Background Assets** - 22 Hintergrundbilder fehlen (Placeholder-Colors aktiv)
- **Custom Fonts** - Lora/JetBrains Mono über Google Fonts (funktioniert, aber lokal wäre besser)
- **ContinueHint Integration** - Scroll-Indicator für lange Texte

---

## Komponenten-Architektur

```
PlayerScreen (Reader Noir)
├── PixelHUD (Top Bar)
│   ├── Title Display
│   ├── Status Button → StatusSheet
│   └── Settings Button
│
├── BackgroundLayers
│   ├── AnimatedBackground (300ms Crossfade)
│   ├── SafeZoneOverlay (Top 12% / Bottom 18%)
│   ├── BackgroundDrift (Horizontal Lines, Drift-based)
│   ├── VignetteLayer (Radial Gradient)
│   └── NoiseLayer (Film Grain)
│
├── Content Area
│   ├── LoadingScreen
│   ├── ErrorMessage
│   ├── EndingView
│   └── StoryReader
│       ├── AnnouncementBanner
│       ├── StationOverlay (Pulse Animation)
│       ├── Microbar (Compact Status)
│       ├── PixelDialogBox (Narrative + Title)
│       └── PixelMenu (Choice Selection)
│
├── StatusSheet (Modal Bottom Sheet)
│   ├── Tickets (Truth, Escape, Guilt, Love)
│   ├── Pressure (Conductor Attention, Memory Drift)
│   ├── Items (Recorder, Tag19, Photo)
│   └── Relations (Comp7, Boy, Sleepless)
│
└── ChoiceFeedback (Processing Overlay)
```

---

## Veraltete Komponenten (Deprecated)

### GBA-Pixel-Overworld (Nicht mehr aktiv)

Diese Komponenten waren ein Experiment mit GBA-Pokémon-Ästhetik, passen aber nicht zum Genre:

- **OverworldScreen.kt** - Tile-based Exploration View
- **TileMap.kt** - Room Layout Management
- **TileRenderer.kt** - Canvas-based Tile Drawing
- **Tileset.kt** - Tile Definition System
- **SpriteSheet.kt** - Character Sprite Management
- **GameViewport.kt** - Pixel-perfect Camera System

**Status**: Als `@Deprecated` markiert, Code bleibt vorhanden für Referenz.

**Grund für Deprecation**:
- Overworld suggeriert Exploration (nicht das Kern-Gameplay)
- Pixel-Ästhetik wirkt zu "spielerisch" für psychologisches Mystery
- Hoher Asset-Aufwand (Tilesets, Sprites, Animationen)
- Performance-intensiver als Reader Noir

---

## Feature-Roadmap

### P0 - Critical (Vor Release)

- [x] WindowInsets Safe Area Handling
- [x] Content Descriptions für Screen Reader
- [x] Reduce Motion Toggle
- [ ] **Focus States für Keyboard-Navigation** (In Arbeit 2026-02-01)
- [ ] Background Assets generieren (22 Bilder)

### P1 - High Priority (Polish)

- [ ] **AppRoot Routing auf PlayerScreen** (In Arbeit 2026-02-01)
- [ ] **Station Overlay Slide-Animation** (In Arbeit 2026-02-01)
- [ ] **Choice Feedback mit Callback** (In Arbeit 2026-02-01)
- [ ] Status Visuals Enhancement (Tooltips, Warning Colors)
- [ ] Choice Text maxLines = 3 (statt 2)

### P2 - Medium Priority (Nice-to-Have)

- [ ] **Performance-Optimierungen** (Key-Stabilität, TypewriterText Chunking)
- [ ] ContinueHint Integration (Scroll-Indicator)
- [ ] ReaderCard/TicketChoice Integration (ersetze Pixel* Komponenten)
- [ ] Custom Fonts lokal ablegen (statt Google Fonts)

### P3 - Low Priority (Future)

- [ ] Beat Chunking Visuals (visuelle Trennung langer Szenen)
- [ ] Enhanced Drift Effects (Chromatic Aberration bei Drift 4+)
- [ ] Worn Stamp Shapes (unregelmäßige Ticket-Stempel)

---

## Design-Prinzipien (Reader Noir)

### Visuelle Sprache

**Farbpalette**:
```kotlin
NachtzugColors:
- Background: #0D1117 (Deep Night Blue)
- Card: #1A1F26 (Warm Dark Gray)
- Text: #E8EDF3 (Off-White)
- Accent: #00BCD4 (Station Neon Cyan)
- TicketFilled: #D4A574 (Warm Amber)
- TicketEmpty: #3D3229 (Dark Wood)
```

**Typografie** (via Google Fonts):
- **Narrative**: Lora (Serif) - 16sp, lineHeight 24sp
- **UI**: JetBrains Mono (Monospace) - 14sp
- **Pixel**: Press Start 2P (Pixel Font) - 12sp (für Retro-Elemente)

**Animationen**:
- Maximal 3 gleichzeitige Animationen
- Drift-Effekte: Subtil, nicht störend
- Reduce Motion: Alle Animationen abschaltbar
- Dauer: 150-300ms (Quick, nicht langsam)

### Drift-Mechanik (Visuelles Feedback)

| Drift Level | Effekt | Komponente |
|-------------|--------|------------|
| 0-2 | Keine Effekte | - |
| 3 | Subtle Drift Lines, Color Shift | BackgroundDrift |
| 4 | Chromatic Aberration (leicht) | BackgroundDrift |
| 5+ | Intensivere Drift, Card Shake | ReaderCard (Drift Level 5: 3px shake) |

**Wichtig**: Drift beeinflusst nur Deko-Elemente. Text bleibt stabil und lesbar.

---

## Testing-Checkliste

### Accessibility

- [ ] Screen Reader (TalkBack) liest alle UI-Elemente vor
- [ ] Keyboard-Navigation (Tab/Shift+Tab) funktioniert
- [ ] Focus States sichtbar (Cyan Border)
- [ ] Reduce Motion schaltet alle Animationen aus
- [ ] Tap Targets mindestens 48x48dp
- [ ] Kontrast-Ratio mindestens 4.5:1 (WCAG AA)

### Performance

- [ ] 60fps Frame-Rate auf Mid-Range Devices
- [ ] Keine Recomposition-Spikes bei Choice-Interaktionen
- [ ] TypewriterText flüssig auf Low-End Devices
- [ ] APK-Größe < 50MB

### Visual Quality

- [ ] Background Crossfade 300ms smooth
- [ ] Station Overlay Slide-in flüssig
- [ ] Drift-Effekte subtil, nicht störend
- [ ] Text lesbar auf allen Backgrounds
- [ ] Choice Feedback erscheint konsistent

### Functional

- [ ] App startet mit PlayerScreen (nicht Overworld)
- [ ] Status Sheet öffnet/schließt korrekt
- [ ] Microbar onClick öffnet Status Sheet
- [ ] Choice-Selection führt zu korrekter nächster Szene
- [ ] Settings speichern/laden persistent

---

## Ressourcen & Dokumentation

### Primäre Dokumentation

- `UI_TARGET_ALIGNMENT_PLAN.md` - Implementierungs-Roadmap
- `UI_AUDIT_REPORT.md` - Umfassendes Audit vom 2026-01-31
- `UI_BACKLOG.md` - Offene UI-Tasks
- `UI_QUICK_FIXES_APPLIED.md` - Bereits behobene Issues

### Code-Referenzen

- **PlayerScreen**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt`
- **Components**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/components/*.kt`
- **Theme**: `android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/theme/*.kt`

### Assets (Noch zu generieren)

- `docs/assets/BACKGROUND_ASSETS_SPEC.md` - Spezifikation für Background-Bilder
- `docs/assets/FONT_LICENSES.md` - Font-Lizenzen (Google Fonts)

---

## Kontakt & Feedback

Bei Fragen zur Reader Noir UI-Richtung:
1. Check diese Datei (`UI_READER_NOIR_STATUS.md`)
2. Review `UI_TARGET_ALIGNMENT_PLAN.md` für Implementierungs-Details
3. Check `UI_AUDIT_REPORT.md` für Kontext und Analyse

**Letzte Aktualisierung**: 2026-02-01
**Nächstes Review**: Nach Abschluss der 9 Implementierungs-Phasen
