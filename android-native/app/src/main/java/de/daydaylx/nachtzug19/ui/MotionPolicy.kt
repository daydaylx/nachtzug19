package de.daydaylx.nachtzug19.ui

import de.daydaylx.nachtzug19.model.ReaderSettings

/**
 * Zentrale Motion-Policy fuer den Reader-Flow.
 * Reduziert Animationen konsistent, sobald Reduce Motion aktiv ist.
 */
data class MotionPolicy(
  val allowTransitions: Boolean,
  val allowContinuousEffects: Boolean,
  val allowBackgroundDrift: Boolean,
  val backgroundCrossfadeDurationMs: Int,
  val overlayTransitionDurationMs: Int,
  val choiceFeedbackFadeDurationMs: Int,
  val choiceFeedbackVisibleMs: Long
)

fun ReaderSettings.toMotionPolicy(): MotionPolicy {
  if (reduceMotion) {
    return MotionPolicy(
      allowTransitions = false,
      allowContinuousEffects = false,
      allowBackgroundDrift = false,
      backgroundCrossfadeDurationMs = 0,
      overlayTransitionDurationMs = 0,
      choiceFeedbackFadeDurationMs = 0,
      choiceFeedbackVisibleMs = 0L
    )
  }

  val ambientFxEnabled = immersionFx
  return MotionPolicy(
    allowTransitions = true,
    allowContinuousEffects = ambientFxEnabled,
    allowBackgroundDrift = ambientFxEnabled,
    backgroundCrossfadeDurationMs = 420,
    overlayTransitionDurationMs = 200,
    choiceFeedbackFadeDurationMs = 120,
    choiceFeedbackVisibleMs = 220L
  )
}
