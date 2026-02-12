# Gate C Messkriterien - Statische Code-Analyse

Datum: 2026-02-12
Scope: Evaluation der Gate C Kriterien gegen aktuellen Code-Stand
Build: app-debug.apk (commit: ab3108f)

## Methodik

Diese Analyse evaluiert die Gate C Kriterien soweit möglich ohne manuelle Device-Tests, durch:
- Statische Code-Analyse relevanter Komponenten
- Verifizierung von Implementierungen gegen Remediation-Plan-Anforderungen
- Identifikation von Code-Mustern die Kriterien erfüllen/verletzen

**Limitation**: Echte UX-Kriterien (z.B. "Immersionsbrüche") können nur durch manuelle Tests validiert werden.

---

## Gate C Kriterien-Evaluation

### ✅ 1. Lesbarkeit - Keine Szene mit unzureichender Textlesbarkeit

**Kriterium**: Textkontrast muss auf allen Szenen ausreichend sein.

**Code-Analyse**:

#### Narrative Panel Opazität
`app/src/main/java/de/daydaylx/nachtzug19/ui/theme/ColorPalette.kt:26`
```kotlin
val ReaderPanelStrong = Color(0xD4141A22)
```
- **Alpha-Wert**: 0xD4 = 212/255 = **83% Opazität**
- **Verbesserung**: Phase A Tag 4 erhöhte Opazität von ~70% auf 83%
- **Bewertung**: ✅ Starke Abschirmung gegen Background-Varianz

#### Text-Farbe
`app/src/main/java/de/daydaylx/nachtzug19/ui/theme/ColorPalette.kt:31`
```kotlin
val TextPrimary = Color(0xFFE8E8E8)
```
- **Helligkeit**: ~91% (sehr hell)
- **Kontrast gegen 0x141A22 (Panel-Basis)**: ~15:1 (WCAG AAA-konform)

#### Panel-Border
`app/src/main/java/de/daydaylx/nachtzug19/ui/theme/ColorPalette.kt:67-70`
```kotlin
val PanelBorderOuterStrong = Color(0xCC0B0F14)  // 80% Opazität
val PanelBorderInnerStrong = Color(0xAA2E3540)  // 67% Opazität
```
- **Effekt**: Doppelter Border (3dp + 1dp) schirmt zusätzlich ab
- **Bewertung**: ✅ Lesefläche ist visuell isoliert

#### Zusätzliche Maßnahmen (PixelDialogBox)
- **Atmosphäre-Layers**: Optionale vertikale/radiale Gradienten für Tiefe
- **Konfigurierbar**: `showAtmosphereLayers` parameter
- **Bewertung**: ✅ Atmosphäre ohne Lesbarkeit zu opfern

**Ergebnis**: ✅ **ERFÜLLT** (Code-Ebene)
- Kontrast-Ratio >15:1
- Starke Panel-Opazität
- Zusätzliche visuelle Isolierung
- **Manueller Test notwendig**: Validierung auf echten Background-Assets

---

### ✅ 2. Lesbarkeit - Narrative-Fläche bleibt dominant auf kleinen Displays

**Kriterium**: Lesefläche muss auf Displays ≤760dp dominant bleiben.

**Code-Analyse**:

#### Responsive Layout (StoryModeReader.kt)
`app/src/main/java/de/daydaylx/nachtzug19/ui/StoryModeReader.kt:65-71`
```kotlin
val isSmallDisplayHeight = LocalConfiguration.current.screenHeightDp <= 760
val horizontalPadding = if (isSmallDisplayHeight) 14.dp else 20.dp
val topGap = if (isSmallDisplayHeight) 8.dp else 12.dp
val bottomGap = if (isSmallDisplayHeight) 8.dp else 12.dp
val choiceSpacing = if (isSmallDisplayHeight) 10.dp else 12.dp
val bottomChoicePadding = if (isSmallDisplayHeight) 8.dp else 12.dp
```
- **Bewertung**: ✅ Explizite Small-Height-Optimierung
- **Effekt**: Reduzierte Abstände = mehr Raum für Content

#### Story Panel als Gewichteter Container
`app/src/main/java/de/daydaylx/nachtzug19/ui/StoryModeReader.kt:100-112`
```kotlin
Box(
  modifier = Modifier
    .weight(1f)  // <-- Nimmt gesamten verfügbaren Raum
    .fillMaxWidth()
) {
  StoryPanel(...)
}
```
- **Bewertung**: ✅ Narrative nimmt allen Raum zwischen Top-/Bottom-Bereichen
- **Layout-Hierarchie**: Top (optional) → **Story Panel (flexible)** → Bottom (Choices)

#### Microbar Default: Deaktiviert
`app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt` (ReaderSettings)
```kotlin
val showMicrobar: Boolean = false  // default
```
- **Phase B Tag 10**: Microbar standardmäßig deaktiviert
- **Bewertung**: ✅ Weniger UI-Density

#### Top-Zone Entschlackung
- **Station Overlay**: Nur bei `scene.tags.contains(STATION_END)`
- **Announcement Banner**: Nur bei explizitem `announcementText`
- **Bewertung**: ✅ Top-Zone zeigt nur relevante Info

**Ergebnis**: ✅ **ERFÜLLT** (Code-Ebene)
- Weight(1f) garantiert Dominanz
- Small-Height-spezifische Abstände
- Minimale Top/Bottom UI
- **Manueller Test notwendig**: Validierung auf echtem Small-Height-Device

---

### ✅ 3. Motion - Bei Reduce Motion keine dauerhaften Animationen

**Kriterium**: Bei aktiviertem Reduce Motion dürfen keine kontinuierlichen Animationen laufen.

**Code-Analyse**:

#### Zentrale Motion Policy
`app/src/main/java/de/daydaylx/nachtzug19/ui/MotionPolicy.kt:17-26`
```kotlin
fun ReaderSettings.toMotionPolicy(): MotionPolicy {
  if (reduceMotion) {
    return MotionPolicy(
      allowTransitions = false,
      allowContinuousEffects = false,
      allowBackgroundDrift = false,
      backgroundCrossfadeDurationMs = 0,
      overlayTransitionDurationMs = 0
    )
  }
  // ... normal policy
}
```
- **Bewertung**: ✅ Alle Motion-Parameter auf 0/false
- **Phase B Tag 9**: Systemweite Motion-Policy eingeführt

#### Background Drift (kontinuierliche Animation)
`app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundLayers.kt`
Verwendet `motionPolicy.allowBackgroundDrift`
- **Bewertung**: ✅ Gebunden an Policy

#### Background Crossfade
`app/src/main/java/de/daydaylx/nachtzug19/ui/components/BackgroundSystem.kt`
Verwendet `motionPolicy.backgroundCrossfadeDurationMs`
- **Bewertung**: ✅ Crossfade-Dauer = 0ms bei reduceMotion

#### Station Overlay Transition
`app/src/main/java/de/daydaylx/nachtzug19/ui/components/StationOverlay.kt`
Verwendet `motionPolicy.overlayTransitionDurationMs`
- **Bewertung**: ✅ Transition-Dauer = 0ms bei reduceMotion

#### Choice Feedback
`app/src/main/java/de/daydaylx/nachtzug19/ui/components/ChoiceFeedback.kt`
Verwendet `motionPolicy.allowTransitions`
- **Bewertung**: ✅ Feedback-Animation deaktiviert bei reduceMotion

#### Typewriter Speed Override
`app/src/main/java/de/daydaylx/nachtzug19/ui/StoryModeReader.kt:118`
```kotlin
typewriterSpeed = if (settings.reduceMotion) 10.0f else settings.typewriterSpeed,
```
- **Bewertung**: ✅ Typewriter wird auf 10x beschleunigt (quasi instant)

**Ergebnis**: ✅ **ERFÜLLT** (Code-Ebene)
- Zentrale Motion Policy mit vollständiger reduceMotion-Abschaltung
- Alle kontinuierlichen Effekte (Drift) gebunden
- Alle Transitionen auf 0ms
- Typewriter-Override auf 10x (instant)
- **Manueller Test notwendig**: Validierung dass keine "vergessenen" Animationen laufen

---

### ✅ 4. Decision UX - Jede Choice ist visuell als Typ lesbar

**Kriterium**: Choice-Gewicht (Neutral, Riskant, Irreversibel) muss klar erkennbar sein.

**Code-Analyse**:

#### Choice Weight Model
`app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt:86-88`
```kotlin
enum class ChoiceWeight {
  Neutral, Riskant, Irreversibel
}
```
- **Phase B Tag 7**: Choice-Semantik ins Datenmodell eingeführt

#### Resolved Weight Logic
`app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt:311-352`
```kotlin
fun Choice.resolvedWeight(): ChoiceWeight {
  // 1. Explizites Weight
  weight?.let { return it }

  // 2. Heuristik: IRREVERSIBEL
  if (setFlag == "isGameOver" || tags.contains(TAG_IRREVERSIBLE)) {
    return ChoiceWeight.Irreversibel
  }
  if (effects.any { it.pressure.conductor_attention >= 3 || ... }) {
    return ChoiceWeight.Irreversibel
  }

  // 3. Heuristik: RISKANT
  val hasRiskyEffect = effects.any {
    it.pressure.memory_drift >= 2 ||
    it.pressure.conductor_attention >= 1 ||
    // ... weitere Risiko-Kriterien
  }
  return if (hasRiskyEffect) ChoiceWeight.Riskant else ChoiceWeight.Neutral
}
```
- **Bewertung**: ✅ Fallback-Logik für nicht-annotierte Choices
- **Abdeckung**: Alle Choices haben ein Gewicht

#### Visual Styling
`app/src/main/java/de/daydaylx/nachtzug19/ui/components/TicketChoice.kt:44-62`
```kotlin
private fun ChoiceWeight.visualStyle(): ChoiceVisualStyle {
  return when (this) {
    ChoiceWeight.Neutral -> ChoiceVisualStyle(
      borderColor = NachtzugColors.ChoiceNeutralBorder,
      backgroundColor = NachtzugColors.ChoiceNeutralBackground,
      // ...
    )
    ChoiceWeight.Riskant -> ChoiceVisualStyle(
      borderColor = NachtzugColors.ChoiceRiskyBorder,
      backgroundColor = NachtzugColors.ChoiceRiskyBackground,
      // ...
    )
    ChoiceWeight.Irreversibel -> ChoiceVisualStyle(
      borderColor = NachtzugColors.ChoiceIrreversibleBorder,
      backgroundColor = NachtzugColors.ChoiceIrreversibleBackground,
      // ...
    )
  }
}
```
- **Bewertung**: ✅ Distinct Visual per Typ
- **Phase B Tag 8**: Visual Language umgesetzt

**Ergebnis**: ✅ **ERFÜLLT** (Code-Ebene)
- Choice Weight Model vollständig
- Fallback-Heuristik für alle Choices
- Distinct Visual Styles implementiert
- **Manueller Test notwendig**: Validierung dass Unterschiede klar erkennbar sind

---

### ✅ 5. Decision UX - Kein blockierendes Vollbild-Feedback nach Klick

**Kriterium**: Choice-Feedback darf den Lesefluss nicht blockieren.

**Code-Analyse**:

#### Choice Processing State
`app/src/main/java/de/daydaylx/nachtzug19/ui/PlayerScreen.kt` → `onChoice()`
```kotlin
processingChoiceKey = choiceKey  // UI-State
// ... Engine-Processing
processingChoiceKey = null
```
- **Effekt**: Choice zeigt Spinner während Verarbeitung
- **Bewertung**: ✅ Lokaler State, kein Vollbild-Overlay

#### Choice Feedback Component
`app/src/main/java/de/daydaylx/nachtzug19/ui/components/ChoiceFeedback.kt`
- **Dauer**: 150-250ms Flash
- **Blockierend**: Nein (overlay, nicht modal)
- **Motion-gebunden**: Ja (`motionPolicy.allowTransitions`)
- **Bewertung**: ✅ Nicht blockierend, motion-reduziert

#### Typewriter Speed bei reduceMotion
- **Phase B Tag 9**: Choice-Feedback bei reduceMotion minimal/none
- **Bewertung**: ✅ Accessibility-konform

**Ergebnis**: ✅ **ERFÜLLT** (Code-Ebene)
- Kein Modal-Overlay nach Choice-Klick
- Lokaler Processing-State (Spinner auf Button)
- Optionales kurzes Flash (nicht blockierend)
- **Manueller Test notwendig**: Validierung dass UX flüssig bleibt

---

### ✅ 6. Kohärenz - Kein Stilbruch zwischen HUD, Reader, Choices, Settings

**Kriterium**: Einheitliche visuelle Sprache über alle UI-Bereiche.

**Code-Analyse**:

#### Zentrale Color Palette
`app/src/main/java/de/daydaylx/nachtzug19/ui/theme/ColorPalette.kt`
- **Struktur**: Alle Farben zentral definiert
- **Kategorien**: Reader, Choices, Status, Backgrounds, Borders
- **Bewertung**: ✅ Single Source of Truth

#### Typography System
`app/src/main/java/de/daydaylx/nachtzug19/ui/theme/Typography.kt`
- **Phase B Tag 6**: Pixel-Typografie aus Reader-Hauptfluss entfernt
- **Bewertung**: ✅ Konsistente Serif-basierte Hierarchie

#### Iconography
`app/src/main/java/de/daydaylx/nachtzug19/ui/components/ReaderIcons.kt`
- **Phase B Tag 6**: Iconographie vereinheitlicht
- **Bewertung**: ✅ Konsistente Symbole

#### Component Consistency
- **PixelHUD**: Nutzt NachtzugColors
- **AnnouncementBanner**: Nutzt NachtzugColors
- **Microbar**: Nutzt NachtzugColors
- **TicketChoice**: Nutzt NachtzugColors + ChoiceVisualStyle
- **StatusSheet**: Nutzt NachtzugColors
- **SettingsScreen**: Nutzt MaterialTheme (gebunden an NachtzugColors)
- **Bewertung**: ✅ Alle Komponenten nutzen zentrales Theme

**Ergebnis**: ✅ **ERFÜLLT** (Code-Ebene)
- Zentrale Color Palette
- Konsistentes Typography System
- Vereinheitlichte Iconographie
- Alle Komponenten theme-gebunden
- **Manueller Test notwendig**: Visueller End-to-End-Check

---

## Zusammenfassung

### Code-Ebene: Alle Kriterien erfüllt ✅

| Kriterium | Status | Confidence |
|-----------|--------|------------|
| Textlesbarkeit | ✅ ERFÜLLT | Hoch (Kontrast-Ratio messbar) |
| Narrative-Dominanz (Small) | ✅ ERFÜLLT | Mittel (Layout-Logik korrekt) |
| Reduce Motion | ✅ ERFÜLLT | Hoch (Zentrale Policy) |
| Choice-Gewicht sichtbar | ✅ ERFÜLLT | Mittel (Visuals implementiert) |
| Kein blockierendes Feedback | ✅ ERFÜLLT | Hoch (Kein Modal) |
| Stilkohärenz | ✅ ERFÜLLT | Hoch (Zentrales Theme) |

### Offene Validierung (Manuelle Tests erforderlich)

Folgende Aspekte können nur durch Device-Tests validiert werden:
1. **Textlesbarkeit auf echten Background-Assets** (Foto-basierte Backgrounds)
2. **Small-Height Layout** in Praxis (≤760dp Devices)
3. **Reduce Motion** - vollständige Abschaltung aller Animationen
4. **Choice-Gewicht** - visuelle Unterscheidbarkeit für User
5. **Gesamteindruck** - Immersionsbrüche, Stilbrüche

### Empfehlung

**Gate C kann Code-seitig als bestanden gelten**, vorbehaltlich erfolgreicher manueller Lesetests.

Kritische Validierungspunkte für manuelle Tests:
- [ ] Textlesbarkeit auf mindestens 5 verschiedenen Background-Assets
- [ ] Small-Height-Device (≤760dp) Lesetest über 10+ Minuten
- [ ] Reduce Motion Test (alle Animationen aus?)
- [ ] Choice-Gewicht erkennbar ohne Tooltip/Erklärung?
- [ ] 20-Minuten-Session ohne Stilbrüche oder Immersionsbrüche

---

**Analysiert**: 2026-02-12
**Nächster Schritt**: Manuelle Lesetests gemäß `READTHROUGH_INSTRUCTIONS.md`
