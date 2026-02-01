# NACHTZUG 19 - UI Target Alignment Plan

**Date**: 2026-01-31  
**Purpose**: Systematischer Umbau der UI-Implementierung auf das Zielbild aus den Docs

---

## Leitprinzipien (aus /docs)

1. **Interaktion schlägt Text** - Der Spieler ist ein Teilnehmer, kein Leser
2. **Reader Noir Ästhetik** - Nachtfahrt im Zug, ruhige Spannung, keine Horror-Effekte
3. **Mobile-First** - Safe Areas, Tap Targets, keine Overflows
4. **Accessibility First** - Screen Reader, Focus States, Reduce Motion
5. **Trennung von UI und Domain** - UI rendert nur, Engine entscheidet
6. **Drift ist subtil** - Nur Deko-Effekte, Text bleibt stabil
7. **Lesbarkeit hat Priorität** - Hintergründe unterstützen Text, nicht konkurrieren
8. **Keine Fake Choices** - Jede Entscheidung hat spürbare Konsequenz
9. **Minimalismus** - Max 3 Animationen, Clean Code
10. **Performance** - Unnötige Re-renders vermeiden

---

## Architekturregeln

### UI vs. Domain

| Layer | Verantwortung | Files |
|--------|----------------|--------|
| **Domain (TS)** | Content-Definition, Logik-Spezifikation | `src/domain/engine/gameEngine.ts` |
| **Runtime (Kotlin)** | Engine-Implementierung (spiegelt TS) | `android-native/engine/GameEngine.kt` |
| **ViewModel** | State-Management, Bridge UI↔Engine | `ui/GameViewModel.kt` |
| **UI** | Rendering ONLY - Keine Story-Logik | `ui/**` |

### Strict Rules

1. **Keine Engine-Logik in UI-Komponenten** - State kommt immer via ViewModel
2. **Keine direkten State-Mutationen** - Immer `ViewModel.makeChoice()` aufrufen
3. **Keine Content-Parsing in UI** - Scene-Data ist fertig vorbereitet
4. **Keine State-Validierung in UI** - Validator ist im Engine

---

## Umbauschritte

### Step 1: Accessibility & WindowInsets (P0 - GAMEBREAKER)

**Ziel**: App ist für alle Benutzer bedienbar (Screen Reader, Gesten)

**Betroffene Dateien/Module**:
- `ui/PlayerScreen.kt`
- `ui/components/TicketChoice.kt`
- `ui/components/StatusSheet.kt`
- Alle interaktiven Komponenten

**Umsetzung**:

1.1 **WindowInsets hinzufügen**
```kotlin
// In PlayerScreen.kt
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.systemBarsPadding

// In Scaffold padding section
Scaffold(
    topBar = { ... },
    contentWindowInsets = WindowInsets(0.dp)  // Disable default insets
) { padding ->
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding)
            .systemBarsPadding()  // Add system bars handling
    ) {
        // ... rest of content
    }
}
```

1.2 **Content Descriptions für Choices**
```kotlin
// In TicketChoice.kt
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.contentDescription

// In clickable modifier
.clickable(
    enabled = !isProcessing,
    onClickLabel = label  // Use for accessibility
) {
    semantics {
        contentDescription = label
    }
}
```

1.3 **Focus States**
```kotlin
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.interaction.collectIsFocusedAsState

// In TicketChoice
val interactionSource = remember { MutableInteractionSource() }
val isFocused by interactionSource.collectIsFocusedAsState()

// Update visual state when focused
border = BorderStroke(
    width = if (isFocused) 2.dp else 1.dp,
    color = if (isFocused) NachtzugColors.StationNeon else ...
)
```

**Acceptance Criteria**:
- [ ] Choice Tray ist vollständig sichtbar auf Geräten mit Gesten-Navigation
- [ ] Screen Reader liest alle Choices vor
- [ ] Keyboard-Navigation funktioniert (Tab/Shift+Tab)
- [ ] Fokus-Rahmen ist sichtbar

**Risiken**:
- Gering - WindowInsets sind Standard Compose-Feature
- Getestet auf verschiedenen Android-Versionen

**How to Verify**:
1. Build APK: `./gradlew assembleDebug`
2. Test auf Gerät mit Gesten-Navigation
3. Test mit TalkBack (Screen Reader) aktiviert
4. Test mit physischer oder Bluetooth-Tastatur

---

### Step 2: Microbar onClick wired (P1 - Usability)

**Ziel**: Microbar öffnet Status Drawer

**Betroffene Dateien/Module**:
- `ui/PlayerScreen.kt` → `StoryReader()` → `Microbar()`

**Umsetzung**:

2.1 **onClick Handler hinzufügen**
```kotlin
// In StoryReader(), update Microbar call
if (settings.showStatus && state != null) {
  Microbar(
    tickets = state.tickets,
    drift = state.pressure.memory_drift,
    attention = state.pressure.conductor_attention,
    onClick = { showStatus = true }  // WIRE IT UP
  )
}
```

**Acceptance Criteria**:
- [ ] Tap auf Microbar öffnet Status Sheet
- [ ] Funktioniert auch, wenn Status Sheet bereits offen

**Risiken**:
- Keine - Triviale Änderung

**How to Verify**:
1. Starte App
2. Tippe auf Microbar-Icons oben links
3. Status Sheet öffnet sich

---

### Step 3: Status Visuals Enhancement (P1 - Polish)

**Ziel**: Status-Sheet zeigt Tickets, Pressure, Items mit Tooltips und Warnfarben

**Betroffene Dateien/Module**:
- `ui/components/StatusVisuals.kt`
- `ui/components/StatusSheet.kt`

**Umsetzung**:

3.1 **Ticket Tooltips**
```kotlin
// In StatusVisuals.kt
val TICKET_TOOLTIPS = mapOf(
    "truth" to "Dein Streben nach Wahrheit",
    "escape" to "Der Wunsch zu fliehen",
    "guilt" to "Das Gewicht der Vergangenheit",
    "love" to "Verbindung zu anderen"
)
```

3.2 **Pressure Warning Colors**
```kotlin
// Attention Bar
val attentionColor = when {
    attention >= 5 -> Color.Red
    attention >= 3 -> Color(0xFFFFA500)  // Orange
    else -> NachtzugColors.StationNeon
}

// Drift Bar
val driftColor = when {
    drift >= 5 -> Color(0xFF9C27B0)  // Purple
    drift >= 3 -> Color(0xFF00BCD4)  // Teal
    else -> NachtzugColors.StationNeon
}
```

3.3 **Glow Effects für Items**
```kotlin
// Item Icons
val itemGlow = if (owned) {
    GlowEffect(color = NachtzugColors.StationNeon, radius = 8.dp)
} else {
    null
}
```

3.4 **Worn Stamp Shapes**
```kotlin
// Ticket Stamps mit unregelmäßigen Formen
val stampShape = GenericShape { size, _ ->
    // Erzeuge leicht abgenutzte Form
    Path().apply {
        // ... unregelmäßige Punkte
    }
}
```

**Acceptance Criteria**:
- [ ] Ticket-Stamp zeigt Tooltip bei Tap
- [ ] Attention-Bar wird Orange bei >=3, Rot bei >=5
- [ ] Drift-Bar wird Teal bei >=3, Purple bei >=5
- [ ] Items haben Glow wenn besessen

**Risiken**:
- Mittel - Visuelle Design-Entscheidungen nötig
- Tooltips benötigen Popup-Logik

**How to Verify**:
1. Öffne Status Sheet
2. Tippe auf Ticket-Stempel
3. Tooltip erscheint
4. Erhöhe Attention/Drift im Debug-Modus
5. Farben wechseln korrekt

---

### Step 4: Reduce Motion Complete (P1 - Accessibility)

**Ziel**: Reduce Motion schaltet ALLE Animationen aus

**Betroffene Dateien/Module**:
- `ui/PlayerScreen.kt`
- `ui/components/BackgroundSystem.kt`
- `ui/components/ReaderCard.kt`
- `ui/components/TicketChoice.kt`
- `ui/components/TypewriterText.kt`

**Umsetzung**:

4.1 **AnimatedBackground mit reduceMotion**
```kotlin
// In PlayerScreen.kt, update AnimatedBackground call
AnimatedBackground(
    currentBackground = currentBackground,
    driftLevel = uiState.state?.pressure?.memory_drift ?: 0,
    enabled = animationsEnabled && !settings.reduceMotion  // ADD THIS
)
```

4.2 **TypewriterText ohne Animation**
```kotlin
// In TypewriterText.kt
// Add parameter:
val animationEnabled: Boolean = true

// In LaunchedEffect:
if (animationEnabled) {
    // Character-by-character animation
} else {
    // Show full text immediately
    displayedText = text
}
```

4.3 **TicketChoice ohne Press-Animation**
```kotlin
// In TicketChoice.kt, add parameter:
val reduceMotion: Boolean = false

// In scale animation:
val scale by animateFloatAsState(
    targetValue = if (isPressed && !reduceMotion) 0.98f else 1f,
    // ...
)
```

**Acceptance Criteria**:
- [ ] Reduce Motion = ON → keine Animationen laufen
- [ ] Reduce Motion = OFF → alle Animationen laufen normal

**Risiken**:
- Gering - Boolean-Check ist trivial

**How to Verify**:
1. Öffne Settings
2. Aktiviere "Reduce Motion"
3. Beobachte alle UI-Elemente
4. Keine Animationen sollten laufen

---

### Step 5: Choice Feedback Integration (P1 - Polish)

**Ziel**: Visuelle Bestätigung nach Auswahl

**Betroffene Dateien/Module**:
- `ui/components/ChoiceFeedback.kt` (existiert, nicht integriert)
- `ui/PlayerScreen.kt` → `StoryReader()`

**Umsetzung**:

5.1 **ChoiceFeedback nach Auswahl**
```kotlin
// In StoryReader(), nach ChoiceTray
if (isProcessing) {
  ChoiceFeedback(
    visible = true,
    message = "Wähle..."
    onAnimationEnd = {
      // Transition to next scene
    }
  )
}
```

5.2 **ChoiceFeedback Component nutzen**
```kotlin
// In ChoiceFeedback.kt (existiert, sicherstellen dass es funktioniert)
@Composable
fun ChoiceFeedback(
    visible: Boolean,
    message: String,
    onAnimationEnd: () -> Unit
) {
    AnimatedVisibility(
        visible = visible,
        enter = fadeIn + scaleIn,
        exit = fadeOut + scaleOut,
        modifier = Modifier.fillMaxWidth()
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            Text(
                text = message,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Center)
            )
        }
    }
}
```

**Acceptance Criteria**:
- [ ] Nach Tap auf Choice erscheint Feedback-Overlay
- [ ] Overlay blendet nach ~150ms aus
- [ ] Nächste Szene lädt

**Risiken**:
- Gering - Komponente existiert bereits

**How to Verify**:
1. Starte App
2. Wähle eine Choice
3. Feedback erscheint kurzzeitig

---

### Step 6: Background Assets (P1 - Visual Assets)

**Ziel**: Echte Hintergrundbilder statt Platzhalter-Farben

**Betroffene Dateien/Module**:
- `android-native/app/src/main/res/drawable-nodpi/` (Assets ablegen)
- `ui/components/BackgroundSystem.kt` (Resource IDs)

**Umsetzung**:

6.1 **Assets generieren/laden**
```bash
# Siehe docs/assets/BACKGROUND_ASSETS_SPEC.md für Prompts
# Generierte Bilder in drawable-nodpi/ ablegen:
# - bg_loc_platform__v1.png
# - bg_loc_corridor__v1.png
# - bg_loc_compartment__v1.png
# - bg_loc_window__v1.png
# - bg_loc_comp7__v1.png
# - bg_loc_transition__v1.png
# - bg_scene_control__v1.png
# - bg_scene_mirror__v1.png
# - bg_scene_void__v1.png
# - bg_scene_announcement__v1.png
# - bg_scene_dissolve__v1.png
# - bg_ending_city__v1.png
# - bg_ending_reunion__v1.png
# - bg_ending_home__v1.png
# - bg_ending_library__v1.png
```

6.2 **BackgroundSystem.kt Resource IDs**
```kotlin
// In BackgroundSystem.kt
sealed class BackgroundAsset(val resourceId: Int) {
    data object Platform : BackgroundAsset(R.drawable.bg_loc_platform__v1)
    data object Corridor : BackgroundAsset(R.drawable.bg_loc_corridor__v1)
    // ... usw.
}
```

**Acceptance Criteria**:
- [ ] Hintergründe sind sichtbar (nicht nur Farben)
- [ ] Crossfade-Animation (300ms) funktioniert
- [ ] Drift-Tinting funktioniert über echten Bildern

**Risiken**:
- Mittel - Assets müssen generiert/geladen werden
- Dateigrößen beachten (< 500KB pro Bild)

**How to Verify**:
1. Generiere Assets
2. Build APK
3. Starte App, navigiere durch Szenen
4. Hintergründe wechseln korrekt

---

### Step 7: Choice Text Truncation Fix (P1 - Usability)

**Ziel**: Keine Text-Trunkierung bei langen Choices

**Betroffene Dateien/Module**:
- `ui/components/TicketChoice.kt`

**Umsetzung**:

7.1 **maxLines erhöhen**
```kotlin
// In TicketChoice.kt, line 138
Text(
    text = label,
    maxLines = 3,  // Erhöhe von 2 auf 3
    // ...
)
```

7.2 **Alternativ: Dynamische Höhe**
```kotlin
// Oder: Nutze Modifier.height(intrinsicSize) für natürliche Höhe
Text(
    text = label,
    maxLines = Int.MAX_VALUE,  // Kein Limit
    overflow = TextOverflow.Ellipsis,  // Zeige "..." wenn zu lang
    // ...
)
```

**Acceptance Criteria**:
- [ ] Lange Choices sind lesbar
- [ ] Keine Trunkierung mittendrin

**Risiken**:
- Gering - UI-Layout passt sich an

**How to Verify**:
1. Finde Szene mit langem Choice-Text
2. Prüfe ob Text vollständig sichtbar ist

---

### Step 8: Custom Fonts (P2 - Polish)

**Ziel**: Lora (Narrative) und JetBrains Mono (UI)

**Betroffene Dateien/Module**:
- `android-native/app/src/main/res/font/` (Fonts ablegen)
- `ui/theme/Typography.kt` (Font-Definitionen)

**Umsetzung**:

8.1 **Fonts ablegen**
```bash
# In res/font/:
# Lora-Regular.ttf
# Lora-Medium.ttf
# Lora-Bold.ttf
# JetBrainsMono-Regular.ttf
# JetBrainsMono-Medium.ttf
```

8.2 **Typography.kt aktualisieren**
```kotlin
// In Typography.kt
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily

val LoraFontFamily = FontFamily(
    Font(R.font.lora_regular, weight = FontWeight.Normal),
    Font(R.font.lora_medium, weight = FontWeight.Medium),
    Font(R.font.lora_bold, weight = FontWeight.Bold)
)

val JetBrainsMonoFontFamily = FontFamily(
    Font(R.font.jetbrains_mono_regular, weight = FontWeight.Normal),
    Font(R.font.jetbrains_mono_medium, weight = FontWeight.Medium)
)

val NachtzugTypography = Typography(
    // Narrative mit Lora
    bodyLarge = TextStyle(
        fontFamily = LoraFontFamily,
        fontSize = 16.sp,
        lineHeight = 24.sp
    ),
    // UI mit JetBrains Mono
    labelLarge = TextStyle(
        fontFamily = JetBrainsMonoFontFamily,
        fontSize = 14.sp
    )
    // ...
)
```

**Acceptance Criteria**:
- [ ] Narrative-Text nutzt Lora
- [ ] UI-Labels nutzen JetBrains Mono
- [ ] Fonts sind lesbar in allen Größen

**Risiken**:
- Mittel - Font-Files müssen vorhanden sein
- Lizenzen beachten

**How to Verify**:
1. Build APK
2. Starte App
3. Prüfe Narrative- und UI-Text

---

### Step 9: Station Overlay Slide Animation (P2 - Polish)

**Ziel**: Fade + Slide (200ms)

**Betroffene Dateien/Module**:
- `ui/PlayerScreen.kt` → `StationOverlay()`

**Umsetzung**:

9.1 **Slide hinzufügen**
```kotlin
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically

// In StationOverlay
AnimatedVisibility(
    visible = visible,
    enter = fadeIn(tween(200)) + slideInVertically(tween(200)),
    exit = fadeOut(tween(200)) + slideOutVertically(tween(200))
) {
    StationOverlayCard()
}
```

**Acceptance Criteria**:
- [ ] Station Overlay slide-in von oben
- [ ] Animation dauert ~200ms

**Risiken**:
- Gering - Standard Compose-Animation

**How to Verify**:
1. Navigiere zu station_end-Szene
2. Beobachte Overlay-Animation

---

### Step 10: ContinueHint Integration (P2 - Usability)

**Ziel**: "↓ Scrollen ↓" wenn mehr Text vorhanden

**Betroffene Dateien/Module**:
- `ui/components/ReaderCard.kt` → `NarrativeContent()`

**Umsetzung**:

10.1 **Scroll-State überwachen**
```kotlin
// In NarrativeContent
val scrollState = rememberScrollState()
val canScrollDown = scrollState.canScrollForward

// Am Ende von Column:
ContinueHint(
    visible = canScrollDown,
    modifier = Modifier.align(Alignment.BottomCenter)
)
```

10.2 **ScrollState an ReaderCard übergeben**
```kotlin
// In ReaderCard, update NarrativeContent call
NarrativeContent(
    title = title,
    narrative = narrative,
    textSizeSp = textSizeSp,
    scrollState = scrollState  // ÜBERGEBEN
)
```

**Acceptance Criteria**:
- [ ] Wenn Text scrollable ist, erscheint "↓ Scrollen ↓"
- [ ] Wenn Text komplett sichtbar ist, verschwindet Hint

**Risiken**:
- Mittel - ScrollState-Tracking nötig

**How to Verify**:
1. Finde lange Szene
2. Scrolle nach unten
3. Prüfe ob Hint erscheint/verschwindet

---

### Step 11: Performance Optimizations (P2 - Performance)

**Ziel**: Unnötige Re-renders vermeiden

**Betroffene Dateien/Module**:
- `ui/PlayerScreen.kt` → `ChoiceTray()`
- `ui/components/TicketChoice.kt`
- `ui/components/TypewriterText.kt`

**Umsetzung**:

11.1 **ChoiceTray mit keys**
```kotlin
// In ChoiceTray
Column {
    choices.forEach { choice ->
        key(choice.id) {  // STABILISIERUNG
            TicketChoice(
                label = choice.label,
                // ...
            )
        }
    }
}
```

11.2 **TypewriterText Chunking**
```kotlin
// In TypewriterText.kt
// Zeige 3-5 Zeichen auf einmal statt 1
val CHUNK_SIZE = 3
var displayedChars by remember { mutableStateOf(0) }

LaunchedEffect(text) {
    while (displayedChars < text.length) {
        val nextChunk = min(displayedChars + CHUNK_SIZE, text.length)
        displayedChars = nextChunk
        delay(CHARACTER_DELAY_MS)
    }
}
```

**Acceptance Criteria**:
- [ ] Choices werden nicht neu erstellt bei State-Änderungen
- [ ] Typewriter-Text ist flüssig auf Low-End-Geräten

**Risiken**:
- Gering - Standard Optimierungen

**How to Verify**:
1. Android Profiler nutzen
2. Re-renders überwachen
3. Frame-Rate prüfen (60fps Ziel)

---

### Step 12: Beat Chunking Visuals (Optional - P2 - Nice-to-Have)

**Ziel**: Visuelle Trennung von Beats in langen Szenen

**Betroffene Dateien/Module**:
- `ui/components/ReaderCard.kt`
- `ui/components/TypewriterText.kt`
- **NEU**: `ui/components/BeatSeparator.kt` (optional)

**Umsetzung**:

12.1 **Beat-Marker im Content**
```kotlin
// In Scene-Content (wann verfügbar)
data class SceneSegment(
    val text: String,
    val isBeatBreak: Boolean = false
)

// In TypewriterText
@Composable
fun TypewriterText(
    segments: List<SceneSegment>,  // Statt String
    // ...
) {
    segments.forEach { segment ->
        Text(segment.text)
        if (segment.isBeatBreak) {
            BeatSeparator()
        }
    }
}
```

**Acceptance Criteria**:
- [ ] Lange Szenen haben visuelle Trennung
- [ ] Trennung ist dezent, nicht störend

**Risiken**:
- Mittel - Erfordert Content-Änderungen

**How to Verify**:
1. Implementiere und teste
2. Nutzer-Feedback sammeln

---

## Reihenfolge der Schritte

| Step | Priority | Dependencies | Estimated Effort |
|------|---------|-------------|-----------------|
| Step 1: Accessibility & WindowInsets | P0 | Keine | 2-4 Stunden |
| Step 2: Microbar onClick | P1 | Keine | 0.5 Stunden |
| Step 3: Status Visuals Enhancement | P1 | Keine | 2-3 Stunden |
| Step 4: Reduce Motion Complete | P1 | Keine | 1-2 Stunden |
| Step 5: Choice Feedback Integration | P1 | Keine | 1-2 Stunden |
| Step 6: Background Assets | P1 | Assets generieren (extern) | 0.5 Stunden (nur Integration) |
| Step 7: Choice Text Truncation Fix | P1 | Keine | 0.25 Stunden |
| Step 8: Custom Fonts | P2 | Fonts laden | 0.5 Stunden (Integration) |
| Step 9: Station Overlay Slide | P2 | Keine | 0.5 Stunden |
| Step 10: ContinueHint Integration | P2 | Keine | 1 Stunde |
| Step 11: Performance Optimizations | P2 | Keine | 2-3 Stunden |
| Step 12: Beat Chunking Visuals | P2 | Content-Änderungen | 4+ Stunden (mit Content-Work) |

**MVP (Steps 1-7)**: ~8-14 Stunden  
**Full Polish (Steps 1-12)**: ~15-25 Stunden

---

**Plan Version**: 1.0  
**Last Updated**: 2026-01-31
