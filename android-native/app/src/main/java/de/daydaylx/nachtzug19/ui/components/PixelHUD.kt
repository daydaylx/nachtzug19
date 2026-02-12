package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.History
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import de.daydaylx.nachtzug19.ui.theme.NachtzugColors

/**
 * Pixel-basierte Top-Bar für Kapitel-Label, Status und Einstellungen.
 */
@Composable
fun PixelHUD(
  title: String,
  showStatusButton: Boolean,
  onStatusClick: () -> Unit,
  onSettingsClick: () -> Unit,
  modifier: Modifier = Modifier,
  onBacklogClick: (() -> Unit)? = null  // Optional: Only for Story Mode
) {
  val borderOuter = NachtzugColors.PanelBorderOuter
  val borderInner = NachtzugColors.PanelBorderInner
  val background = NachtzugColors.BackgroundPanel

  Box(
    modifier = modifier
      .fillMaxWidth()
      .drawBehind {
        val outer = 2.dp.toPx()
        val inner = 1.dp.toPx()
        drawRect(color = borderOuter, size = size)
        drawRect(
          color = borderInner,
          topLeft = Offset(outer, outer),
          size = Size(size.width - outer * 2, size.height - outer * 2)
        )
        drawRect(
          color = background,
          topLeft = Offset(outer + inner, outer + inner),
          size = Size(size.width - (outer + inner) * 2, size.height - (outer + inner) * 2)
        )
      }
      .background(Color.Transparent)
      .padding(horizontal = 12.dp, vertical = 6.dp)
  ) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      PixelLabel(text = title)

      Row(verticalAlignment = Alignment.CenterVertically) {
        // Backlog button (Story Mode only)
        if (onBacklogClick != null) {
          HudIconButton(
            icon = Icons.Filled.History,
            contentDescription = "Backlog öffnen",
            tint = NachtzugColors.TextMuted,
            onClick = onBacklogClick
          )
          Spacer(modifier = Modifier.width(4.dp))
        }
        if (showStatusButton) {
          HudIconButton(
            icon = ReaderIcons.Status,
            contentDescription = "Status",
            tint = NachtzugColors.StationNeon,
            onClick = onStatusClick
          )
          Spacer(modifier = Modifier.width(4.dp))
        }
        HudIconButton(
          icon = ReaderIcons.Settings,
          contentDescription = "Einstellungen",
          tint = NachtzugColors.TextPrimary,
          onClick = onSettingsClick
        )
      }
    }
  }
}

@Composable
private fun HudIconButton(
  icon: ImageVector,
  contentDescription: String,
  tint: Color,
  onClick: () -> Unit
) {
  IconButton(
    onClick = onClick,
    modifier = Modifier.size(36.dp)
  ) {
    Icon(
      imageVector = icon,
      contentDescription = contentDescription,
      tint = tint,
      modifier = Modifier.size(20.dp)
    )
  }
}

@Composable
private fun PixelLabel(text: String) {
  Text(
    text = text,
    style = MaterialTheme.typography.labelMedium,
    color = NachtzugColors.TextPrimary
  )
}
