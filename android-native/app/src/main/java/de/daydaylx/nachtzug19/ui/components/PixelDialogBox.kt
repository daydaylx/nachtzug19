package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import de.daydaylx.nachtzug19.ui.theme.PixelTypography

@Composable
fun PixelDialogBox(
  title: String?,
  narrative: String,
  modifier: Modifier = Modifier,
  contentPadding: Dp = 12.dp
) {
  val borderOuter = Color(0xFF0B0F14)
  val borderInner = Color(0xFF2E3540)
  val background = Color(0xFF141A22)
  val borderSize = 3.dp
  val innerBorderSize = 1.dp

  Box(
    modifier = modifier
      .fillMaxWidth()
      .drawBehind {
        val outer = borderSize.toPx()
        val inner = innerBorderSize.toPx()
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
      .padding(borderSize + innerBorderSize)
  ) {
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .background(Color.Transparent)
        .padding(contentPadding)
    ) {
      if (!title.isNullOrBlank()) {
        Text(
          text = title,
          style = PixelTypography.title,
          color = Color(0xFFE8E8E8)
        )
        Spacer(modifier = Modifier.height(8.dp))
      }
      Text(
        text = narrative,
        style = MaterialTheme.typography.bodyLarge,
        color = Color(0xFFE8E8E8)
      )
    }
  }
}