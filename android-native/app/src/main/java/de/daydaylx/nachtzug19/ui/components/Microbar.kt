package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.Waves
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import de.daydaylx.nachtzug19.model.Tickets

@Composable
fun Microbar(
  tickets: Tickets,
  drift: Int,
  attention: Int,
  onClick: () -> Unit,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier
      .fillMaxWidth()
      .padding(horizontal = 16.dp, vertical = 8.dp)
      .clip(RoundedCornerShape(20.dp))
      .background(Color.Black.copy(alpha = 0.5f))
      .padding(horizontal = 12.dp, vertical = 8.dp)
      .clickable(onClick = onClick),
    horizontalArrangement = Arrangement.SpaceEvenly,
    verticalAlignment = Alignment.CenterVertically
  ) {
    MicroIcon(
      icon = Icons.Default.Tune,
      value = tickets.total(),
      max = 20,
      color = MaterialTheme.colorScheme.primary
    )
    MicroIcon(
      icon = Icons.Default.Waves,
      value = drift,
      max = 6,
      color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
    )
    MicroIcon(
      icon = Icons.Default.Visibility,
      value = attention,
      max = 6,
      color = MaterialTheme.colorScheme.secondary.copy(alpha = 0.8f)
    )
  }
}

@Composable
private fun MicroIcon(
  icon: androidx.compose.ui.graphics.vector.ImageVector,
  value: Int,
  max: Int,
  color: Color,
  modifier: Modifier = Modifier
) {
  Box(
    modifier = modifier.size(32.dp),
    contentAlignment = Alignment.Center
  ) {
    Icon(
      imageVector = icon,
      contentDescription = null,
      tint = color,
      modifier = Modifier.size(20.dp)
    )
    
    // Small badge for value
    Box(
      modifier = Modifier
        .size(12.dp)
        .align(Alignment.TopEnd)
        .background(
          color = color,
          shape = CircleShape
        ),
      contentAlignment = Alignment.Center
    ) {
      Text(
        text = "$value",
        color = Color.Black,
        fontSize = 8.sp,
        textAlign = TextAlign.Center
      )
    }
  }
}