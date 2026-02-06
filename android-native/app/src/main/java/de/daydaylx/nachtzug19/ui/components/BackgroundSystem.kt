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

/**
 * Background Asset System for NACHTZUG 19
 *
 * Defines all background images with their resource IDs.
 * Backgrounds crossfade smoothly between scenes (300ms).
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
    if (tags == null || tags.isEmpty()) return BackgroundAsset.NightGeneral

    // Priority order: Ending > Terminal > Control > Announcement > Reveal > Secret > Station > Setup > General

    // Ending scenes (highest priority - specific atmosphere)
    if (tags.contains(SceneTag.Ending)) {
        // Scene-ID based ending backgrounds
        return when {
            sceneId?.contains("city") == true -> BackgroundAsset.EndingCity
            sceneId?.contains("reunion") == true -> BackgroundAsset.EndingReunion
            sceneId?.contains("home") == true -> BackgroundAsset.EndingHome
            sceneId?.contains("library") == true -> BackgroundAsset.EndingLibrary
            else -> BackgroundAsset.Window
        }
    }

    // Terminal scenes (final destination)
    if (tags.contains(SceneTag.Terminal)) return BackgroundAsset.Platform

    // Control scenes (authority, checkpoints)
    if (tags.contains(SceneTag.Control)) return BackgroundAsset.Control

    // Announcement scenes (public, impersonal)
    if (tags.contains(SceneTag.Announcement)) return BackgroundAsset.Announcement

    // Reveal scenes (truth, reflection)
    if (tags.contains(SceneTag.Reveal)) return BackgroundAsset.Mirror

    // Secret scenes (hidden, mysterious)
    if (tags.contains(SceneTag.Secret)) return BackgroundAsset.Compartment

    // Station scenes
    if (tags.contains(SceneTag.StationEnd)) return BackgroundAsset.Platform

    // Setup scenes - context-aware mapping
    if (tags.contains(SceneTag.Setup)) {
        return when (chapter) {
            1 -> BackgroundAsset.Platform  // Chapter 1: Leerer Bahnsteig
            2 -> BackgroundAsset.Corridor  // Chapter 2: First control
            3 -> BackgroundAsset.Comp7     // Chapter 3: Wagen 7
            4 -> BackgroundAsset.Mirror    // Chapter 4: Spiegelungen
            else -> BackgroundAsset.NightGeneral
        }
    }

    // Interlude scenes (transition)
    if (tags.contains(SceneTag.Interlude)) return BackgroundAsset.Transition

    // Default: Night general atmosphere
    return BackgroundAsset.NightGeneral
}

/**
 * Animated Background Component
 *
 * Displays background images with smooth crossfade transitions (300ms).
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

    Crossfade(
        targetState = currentBackground,
        animationSpec = tween(durationMillis = 300),
        label = "backgroundCrossfade",
        modifier = modifier
    ) { background ->
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
