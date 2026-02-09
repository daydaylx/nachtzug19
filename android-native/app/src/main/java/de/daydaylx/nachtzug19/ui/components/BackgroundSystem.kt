package de.daydaylx.nachtzug19.ui.components

import androidx.annotation.DrawableRes
import androidx.compose.animation.Crossfade
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import de.daydaylx.nachtzug19.R
import de.daydaylx.nachtzug19.model.SceneTag
import de.daydaylx.nachtzug19.ui.MotionPolicy

/**
 * Background Asset System for NACHTZUG 19
 *
 * Defines all background images with their resource IDs.
 * Backgrounds crossfade smoothly between scenes.
 */
sealed class BackgroundAsset(@DrawableRes val resourceId: Int?) {
    // Locations
    data object Platform : BackgroundAsset(R.drawable.bg_loc_platform_v1)
    data object PlatformAlt : BackgroundAsset(R.drawable.bg_loc_platform_alt_v1)
    data object Corridor : BackgroundAsset(R.drawable.bg_loc_corridor_v1)
    data object Window : BackgroundAsset(R.drawable.bg_loc_window_v1)
    data object Transition : BackgroundAsset(R.drawable.bg_loc_transition_v1)

    // General scenes
    data object NightGeneral : BackgroundAsset(R.drawable.bg_scene_night_general_v1)

    // Compartments
    data object Compartment : BackgroundAsset(R.drawable.bg_loc_compartment_v1)
    data object Comp7 : BackgroundAsset(R.drawable.bg_loc_comp7_v1)

    // Special scenes
    data object Control : BackgroundAsset(R.drawable.bg_scene_control_v1)
    data object Mirror : BackgroundAsset(R.drawable.bg_scene_mirror_v1)
    data object Void : BackgroundAsset(R.drawable.bg_scene_void_v1)
    data object Announcement : BackgroundAsset(R.drawable.bg_scene_announcement_v1)
    data object Dissolve : BackgroundAsset(R.drawable.bg_scene_dissolve_v1)

    // Endings
    data object EndingCity : BackgroundAsset(R.drawable.bg_ending_city_v1)
    data object EndingReunion : BackgroundAsset(R.drawable.bg_ending_reunion_v1)
    data object EndingHome : BackgroundAsset(R.drawable.bg_ending_home_v1)
    data object EndingLibrary : BackgroundAsset(R.drawable.bg_ending_library_v1)

    // Default fallback (dark gradient)
    data object Default : BackgroundAsset(null)
}

private fun chapterFallbackBackground(chapter: Int?): BackgroundAsset {
    return when (chapter) {
        1 -> BackgroundAsset.Window
        2 -> BackgroundAsset.Corridor
        3 -> BackgroundAsset.Comp7
        4 -> BackgroundAsset.Window
        else -> BackgroundAsset.NightGeneral
    }
}

private fun revealBackground(chapter: Int?): BackgroundAsset {
    return when (chapter) {
        1 -> BackgroundAsset.PlatformAlt
        2 -> BackgroundAsset.Corridor
        3 -> BackgroundAsset.Comp7
        4 -> BackgroundAsset.Window
        else -> chapterFallbackBackground(chapter)
    }
}

private fun endingBackground(sceneId: String?): BackgroundAsset {
    return when {
        sceneId?.contains("truth") == true -> BackgroundAsset.NightGeneral
        sceneId?.contains("love") == true || sceneId?.contains("reunion") == true -> BackgroundAsset.Window
        sceneId?.contains("guilt") == true -> BackgroundAsset.Corridor
        sceneId?.contains("escape") == true || sceneId?.contains("limbo") == true -> BackgroundAsset.PlatformAlt
        sceneId?.contains("city") == true -> BackgroundAsset.NightGeneral
        sceneId?.contains("home") == true -> BackgroundAsset.PlatformAlt
        sceneId?.contains("library") == true -> BackgroundAsset.Corridor
        else -> BackgroundAsset.Window
    }
}

/**
 * Maps scene tags to appropriate background assets
 *
 * @param tags Scene tags from story content (nullable list)
 * @param sceneId Optional scene ID for specific scene matching
 * @param chapter Optional chapter number for chapter-specific backgrounds
 * @return BackgroundAsset matching the scene atmosphere
 */
fun getBackgroundForTags(
    tags: List<SceneTag>?,
    sceneId: String? = null,
    chapter: Int? = null
): BackgroundAsset {
    // Scene-ID based mapping (highest priority for specific scenes)
    sceneId?.let { id ->
        // Chapter 1: Platform scenes
        if (id.contains("platform") || id.contains("station")) return BackgroundAsset.Platform

        // Chapter 1: Train exterior
        if (id.contains("train_exterior") || id.contains("threshold")) return BackgroundAsset.PlatformAlt

        // Chapter 1-2: Inside train, compartment scenes
        if (id.contains("inside_train") || id.contains("find_seat") || id.contains("window")) return BackgroundAsset.Window

        // Chapter 1-2: Sleepless, corridor scenes
        if (id.contains("sleepless") || id.contains("corridor") || id.contains("breath")) return BackgroundAsset.Corridor

        // Compartment 7 scenes
        if (id.contains("comp7") || id.contains("compartment7")) return BackgroundAsset.Comp7

        // Recorder/listening scenes
        if (id.contains("recorder") || id.contains("listening")) {
            return if ((chapter ?: 0) >= 3) BackgroundAsset.Comp7 else BackgroundAsset.Window
        }

        // Anomaly/passenger scenes: avoid low-detail compartment placeholder
        if (id.contains("anomaly") || id.contains("passenger")) return BackgroundAsset.Corridor
    }

    // Tag-based mapping (fallback)
    tags?.let {
        // Ending scenes (highest priority)
        // NOTE: Use stable high-quality assets until dedicated ending backgrounds are replaced.
        if (it.contains(SceneTag.Ending)) return endingBackground(sceneId)

        // Terminal scenes (final destination)
        if (it.contains(SceneTag.Terminal)) return BackgroundAsset.Platform

        // Control scenes (authority, checkpoints): avoid low-detail control placeholder
        if (it.contains(SceneTag.Control)) return BackgroundAsset.Corridor

        // Announcement scenes (public, impersonal): avoid flat white announcement placeholder
        if (it.contains(SceneTag.Announcement)) return BackgroundAsset.Transition

        // Reveal scenes (truth, reflection) - context-aware
        if (it.contains(SceneTag.Reveal)) return revealBackground(chapter)

        // Secret scenes (hidden, mysterious)
        if (it.contains(SceneTag.Secret)) return BackgroundAsset.Corridor

        // Station scenes
        if (it.contains(SceneTag.StationEnd)) return BackgroundAsset.Platform

        // Setup scenes - context-aware mapping
        if (it.contains(SceneTag.Setup)) {
            return when (chapter) {
                1 -> BackgroundAsset.Platform  // Chapter 1: Leerer Bahnsteig
                2 -> BackgroundAsset.Corridor  // Chapter 2: First control
                3 -> BackgroundAsset.Comp7     // Chapter 3: Wagen 7
                4 -> BackgroundAsset.Window    // Avoid low-detail mirror placeholder
                else -> chapterFallbackBackground(chapter)
            }
        }

        // Interlude scenes (transition)
        if (it.contains(SceneTag.Interlude)) return BackgroundAsset.Transition
    }

    // Chapter-based fallback for scenes without tags
    return chapterFallbackBackground(chapter)
}

/**
 * Animated Background Component
 *
 * Displays background images with smooth crossfade transitions.
 * Applies drift-based color tinting for atmospheric effects.
 *
 * @param currentBackground The background asset to display
 * @param driftLevel Memory drift level (0-6) for color tinting
 * @param enabled Whether to show background (if false, shows dark gradient)
 */
@Composable
fun AnimatedBackground(
    currentBackground: BackgroundAsset,
    driftLevel: Int,
    motionPolicy: MotionPolicy,
    enabled: Boolean,
    modifier: Modifier = Modifier
) {
    // Drift-based color tint
    val tintColor = when {
        driftLevel >= 5 -> Color(0xFF0A0D12) // Very cold at high drift
        driftLevel >= 3 -> Color(0xFF0B0F14) // Slightly cold
        else -> Color.Transparent // No tint
    }

    val tintAlpha = when {
        driftLevel >= 5 -> 0.3f
        driftLevel >= 3 -> 0.15f
        else -> 0f
    }

    val render: @Composable (BackgroundAsset) -> Unit = { background ->
        Box(modifier = Modifier.fillMaxSize()) {
            // Background image or fallback
            if (enabled && background.resourceId != null) {
                Image(
                    painter = painterResource(id = background.resourceId),
                    contentDescription = null,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop,
                    colorFilter = if (tintAlpha > 0f) {
                        ColorFilter.tint(tintColor.copy(alpha = tintAlpha))
                    } else null
                )
            } else {
                // Fallback: Dark gradient (matches BackgroundBase)
                BackgroundBase()
            }
        }
    }

    if (motionPolicy.backgroundCrossfadeDurationMs <= 0) {
        Box(modifier = modifier.fillMaxSize()) {
            render(currentBackground)
        }
    } else {
        Crossfade(
            targetState = currentBackground,
            animationSpec = tween(durationMillis = motionPolicy.backgroundCrossfadeDurationMs),
            label = "backgroundCrossfade",
            modifier = modifier
        ) { background ->
            render(background)
        }
    }
}

/**
 * Safe Zone Overlay
 *
 * Adds subtle darkening to top and bottom of screen for text readability.
 * Top 12% and bottom 18% of screen get gradual darkening.
 *
 * @param enabled Whether to show safe zone overlay
 */
@Composable
fun SafeZoneOverlay(
    enabled: Boolean,
    modifier: Modifier = Modifier
) {
    if (!enabled) return

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color.Black.copy(alpha = 0.15f), // Top - much lighter
                        Color.Transparent,                // Middle transparent
                        Color.Transparent,
                        Color.Transparent,
                        Color.Black.copy(alpha = 0.2f)    // Bottom - much lighter
                    ),
                    startY = 0f,
                    endY = Float.POSITIVE_INFINITY
                )
            )
    )
}
