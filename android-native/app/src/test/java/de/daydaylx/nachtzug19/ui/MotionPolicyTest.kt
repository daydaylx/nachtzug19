package de.daydaylx.nachtzug19.ui

import de.daydaylx.nachtzug19.model.ReaderSettings
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class MotionPolicyTest {
  @Test
  fun reduceMotionDisablesAllMotion() {
    val policy = ReaderSettings(
      reduceMotion = true,
      immersionFx = true
    ).toMotionPolicy()

    assertFalse(policy.allowTransitions)
    assertFalse(policy.allowContinuousEffects)
    assertFalse(policy.allowBackgroundDrift)
    assertEquals(0, policy.backgroundCrossfadeDurationMs)
    assertEquals(0, policy.overlayTransitionDurationMs)
    assertEquals(0, policy.choiceFeedbackFadeDurationMs)
    assertEquals(0L, policy.choiceFeedbackVisibleMs)
  }

  @Test
  fun fullMotionUsesDefaultDurations() {
    val policy = ReaderSettings(
      reduceMotion = false,
      immersionFx = true
    ).toMotionPolicy()

    assertTrue(policy.allowTransitions)
    assertTrue(policy.allowContinuousEffects)
    assertTrue(policy.allowBackgroundDrift)
    assertEquals(420, policy.backgroundCrossfadeDurationMs)
    assertEquals(200, policy.overlayTransitionDurationMs)
    assertEquals(120, policy.choiceFeedbackFadeDurationMs)
    assertEquals(220L, policy.choiceFeedbackVisibleMs)
  }

  @Test
  fun immersionFxOffKeepsTransitionsButRemovesContinuousEffects() {
    val policy = ReaderSettings(
      reduceMotion = false,
      immersionFx = false
    ).toMotionPolicy()

    assertTrue(policy.allowTransitions)
    assertFalse(policy.allowContinuousEffects)
    assertFalse(policy.allowBackgroundDrift)
  }
}
