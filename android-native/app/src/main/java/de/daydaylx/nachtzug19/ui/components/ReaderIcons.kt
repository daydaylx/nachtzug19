package de.daydaylx.nachtzug19.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.ConfirmationNumber
import androidx.compose.material.icons.rounded.Settings
import androidx.compose.material.icons.rounded.Tune
import androidx.compose.material.icons.rounded.Visibility
import androidx.compose.material.icons.rounded.Waves
import androidx.compose.ui.graphics.vector.ImageVector

/**
 * Zentrales Icon-Set fuer den Reader-Hauptfluss.
 * Alle Core-Icons verwenden dieselbe Material-Rounded-Familie.
 */
object ReaderIcons {
  val Tickets: ImageVector = Icons.Rounded.ConfirmationNumber
  val Drift: ImageVector = Icons.Rounded.Waves
  val Attention: ImageVector = Icons.Rounded.Visibility
  val Status: ImageVector = Icons.Rounded.Tune
  val Settings: ImageVector = Icons.Rounded.Settings
}
