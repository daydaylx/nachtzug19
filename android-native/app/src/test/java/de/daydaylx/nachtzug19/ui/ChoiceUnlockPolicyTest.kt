package de.daydaylx.nachtzug19.ui

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ChoiceUnlockPolicyTest {
  @Test
  fun unlockedWhenEnforcementDisabled() {
    assertTrue(
      shouldUnlockChoices(
        enforceReadBeforeChoices = false,
        narrativeLength = 800,
        scrollMaxValue = 1000,
        scrollValue = 0,
        autoUnlockElapsed = false
      )
    )
  }

  @Test
  fun unlockedForShortNarrative() {
    assertTrue(
      shouldUnlockChoices(
        enforceReadBeforeChoices = true,
        narrativeLength = 200,
        scrollMaxValue = 1000,
        scrollValue = 0,
        autoUnlockElapsed = false
      )
    )
  }

  @Test
  fun unlockedWhenNoScrollOverflowExists() {
    assertTrue(
      shouldUnlockChoices(
        enforceReadBeforeChoices = true,
        narrativeLength = 800,
        scrollMaxValue = 0,
        scrollValue = 0,
        autoUnlockElapsed = false
      )
    )
  }

  @Test
  fun lockedBeforeThresholdWithoutAutoUnlock() {
    assertFalse(
      shouldUnlockChoices(
        enforceReadBeforeChoices = true,
        narrativeLength = 800,
        scrollMaxValue = 1000,
        scrollValue = 699,
        autoUnlockElapsed = false
      )
    )
  }

  @Test
  fun unlockedAtProgressThreshold() {
    assertTrue(
      shouldUnlockChoices(
        enforceReadBeforeChoices = true,
        narrativeLength = 800,
        scrollMaxValue = 1000,
        scrollValue = 700,
        autoUnlockElapsed = false
      )
    )
  }

  @Test
  fun unlockedAfterAutoUnlockDelay() {
    assertTrue(
      shouldUnlockChoices(
        enforceReadBeforeChoices = true,
        narrativeLength = 800,
        scrollMaxValue = 1000,
        scrollValue = 200,
        autoUnlockElapsed = true
      )
    )
  }
}
