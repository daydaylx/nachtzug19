package de.daydaylx.nachtzug19.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.animation.core.tween

@Composable
fun AnnouncementBanner(
  text: String,
  visible: Boolean,
  animationsEnabled: Boolean = true
) {
  if (animationsEnabled) {
    AnimatedVisibility(
      visible = visible,
      enter = slideInVertically(
        initialOffsetY = { -it },
        animationSpec = tween(150)
      ),
      exit = slideOutVertically(
        targetOffsetY = { -it },
        animationSpec = tween(150)
      )
    ) {
      BannerContent(text)
    }
  } else if (visible) {
    BannerContent(text)
  }
}

@Composable
private fun BannerContent(text: String) {
  Box(
    modifier = Modifier
      .fillMaxWidth()
      .background(MaterialTheme.colorScheme.primary)
      .padding(horizontal = 16.dp, vertical = 8.dp)
  ) {
    Text(
      text = text,
      style = MaterialTheme.typography.labelMedium,
      color = MaterialTheme.colorScheme.onPrimary
    )
  }
}