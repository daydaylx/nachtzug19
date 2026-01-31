package de.daydaylx.nachtzug19.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun LoadingScreen(modifier: Modifier = Modifier) {
  Box(
    modifier = modifier.fillMaxSize(),
    contentAlignment = Alignment.Center
  ) {
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
      Text(
        text = "Zugsystem",
        style = MaterialTheme.typography.labelMedium.copy(
          fontSize = 10.sp,
          letterSpacing = 2.sp
        ),
        color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f)
      )

      Text(
        text = "NACHTZUG 19",
        style = MaterialTheme.typography.titleLarge.copy(
          fontSize = 32.sp,
          fontWeight = FontWeight.Bold,
          letterSpacing = 4.sp
        ),
        color = MaterialTheme.colorScheme.onBackground,
        textAlign = TextAlign.Center
      )

      Text(
        text = "Verbindung wird aufgebaut...",
        style = MaterialTheme.typography.bodyMedium.copy(fontSize = 12.sp),
        color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.6f)
      )
    }
  }
}

// Note: AnnouncementBanner is defined in AnnouncementBanner.kt
