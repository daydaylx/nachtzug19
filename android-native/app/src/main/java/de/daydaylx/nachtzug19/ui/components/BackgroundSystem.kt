package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.Crossfade
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import de.daydaylx.nachtzug19.model.SceneTag

/**
 * Background Asset System for NACHTZUG 19
 * Manages loading, caching, and displaying background images
 * 
 * Phase 1: Core background system with drift tinting
 * Note: Resource IDs will be updated when actual assets are added
 */
sealed class BackgroundAsset(val resourceId: Int, val name: String) {
    // Locations
    data object Platform : BackgroundAsset(android.R.color.black, "Platform")
    data object Corridor : BackgroundAsset(android.R.color.black, "Corridor")
    data object Compartment : BackgroundAsset(android.R.color.black, "Compartment")
    data object Window : BackgroundAsset(android.R.color.black, "Window")
    data object Comp7 : BackgroundAsset(android.R.color.black, "Compartment 7")
    data object Transition : BackgroundAsset(android.R.color.black, "Transition")
    
    // Scenes
    data object Control : BackgroundAsset(android.R.color.black, "Control")
    data object Reveal : BackgroundAsset(android.R.color.black, "Reveal")
    data object Announcement : BackgroundAsset(android.R.color.black, "Announcement")
    
    // Default fallback
    data object Default : BackgroundAsset(android.R.color.black, "Default")
}

/**
 * Select appropriate background based on scene tags
 * Uses only available SceneTag values
 * Priority:
 * 1. StationEnd -> Platform
 * 2. Control -> Control scene
 * 3. Announcement -> Announcement scene
 * 4. Interlude -> Corridor
 * 5. Setup -> Platform
 * 6. Reveal -> Corridor
 * 7. Ending -> Transition
 * 8. Default -> Corridor
 */
fun getBackgroundForTags(tags: List<SceneTag>?): BackgroundAsset {
    if (tags == null) return BackgroundAsset.Default
    
    return when {
        tags.contains(SceneTag.StationEnd) -> BackgroundAsset.Platform
        tags.contains(SceneTag.Control) -> BackgroundAsset.Control
        tags.contains(SceneTag.Reveal) -> BackgroundAsset.Corridor
        tags.contains(SceneTag.Announcement) -> BackgroundAsset.Announcement
        tags.contains(SceneTag.Interlude) -> BackgroundAsset.Corridor
        tags.contains(SceneTag.Setup) -> BackgroundAsset.Platform
        tags.contains(SceneTag.Ending) -> BackgroundAsset.Transition
        // Default for unknown tags
        else -> BackgroundAsset.Default
    }
}

/**
 * Background Layer with drift color tinting
 * 
 * @param background Background asset to display
 * @param driftLevel Current drift level (0-6)
 * @param enabled Whether drift effects are enabled
 * @param modifier Modifier for layout
 */
@Composable
fun BackgroundLayer(
    background: BackgroundAsset,
    driftLevel: Int = 0,
    enabled: Boolean = true,
    modifier: Modifier = Modifier
) {
    // Drift color tint based on drift level
    val tint = when {
        !enabled || driftLevel < 2 -> null
        driftLevel >= 4 -> ColorFilter.tint(Color(0xFF0A0F12).copy(alpha = 0.15f))
        driftLevel >= 2 -> ColorFilter.tint(Color(0xFF0A0F14).copy(alpha = 0.08f))
        else -> null
    }
    
    // Subtle scale animation for drift
    val scale by animateFloatAsState(
        targetValue = if (enabled && driftLevel >= 4) 1.01f else 1.0f,
        animationSpec = tween(durationMillis = 2000, easing = LinearEasing),
        label = "backgroundScale"
    )
    
    Image(
        painter = painterResource(background.resourceId),
        contentDescription = "Background: ${background.name}",
        modifier = modifier
            .fillMaxSize()
            .graphicsLayer {
                this.scaleX = scale
                this.scaleY = scale
            },
        contentScale = ContentScale.Crop,
        colorFilter = tint
    )
}

/**
 * Animated Background with smooth crossfade transition
 * 
 * @param currentBackground Current background asset
 * @param driftLevel Current drift level
 * @param enabled Whether animations are enabled
 * @param modifier Modifier for layout
 */
@Composable
fun AnimatedBackground(
    currentBackground: BackgroundAsset,
    driftLevel: Int = 0,
    enabled: Boolean = true,
    modifier: Modifier = Modifier
) {
    var previousBackground by remember { mutableStateOf(currentBackground) }
    
    Crossfade(
        targetState = currentBackground,
        label = "backgroundTransition",
        animationSpec = tween(durationMillis = 300, easing = FastOutSlowInEasing)
    ) { bg ->
        BackgroundLayer(
            background = bg,
            driftLevel = driftLevel,
            enabled = enabled,
            modifier = modifier
        )
    }
    
    LaunchedEffect(currentBackground) {
        previousBackground = currentBackground
    }
}
