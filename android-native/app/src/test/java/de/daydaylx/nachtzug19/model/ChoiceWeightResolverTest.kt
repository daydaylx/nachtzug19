package de.daydaylx.nachtzug19.model

import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Test

class ChoiceWeightResolverTest {
  @Test
  fun resolvedWeightPrefersExplicitWeight() {
    val choice = Choice(
      id = "explicit",
      weight = ChoiceWeight.Riskant
    )

    assertEquals(ChoiceWeight.Riskant, choice.resolvedWeight())
  }

  @Test
  fun resolvedWeightMarksEndingAsIrreversible() {
    val choice = Choice(
      id = "ending",
      ending = "TRUTH"
    )

    assertEquals(ChoiceWeight.Irreversibel, choice.resolvedWeight())
  }

  @Test
  fun resolvedWeightMarksHighDriftAsRisky() {
    val choice = Choice(
      id = "drift",
      effects = listOf(
        Effect(
          type = EffectType.Inc,
          target = EffectTarget.MemoryDrift,
          value = JsonPrimitive(2)
        )
      )
    )

    assertEquals(ChoiceWeight.Riskant, choice.resolvedWeight())
  }

  @Test
  fun resolvedWeightMarksChapterSetAsIrreversible() {
    val choice = Choice(
      id = "chapter_set",
      effects = listOf(
        Effect(
          type = EffectType.Set,
          target = EffectTarget.ChapterIndex,
          value = JsonPrimitive(7)
        )
      )
    )

    assertEquals(ChoiceWeight.Irreversibel, choice.resolvedWeight())
  }

  @Test
  fun resolvedWeightDefaultsToNeutral() {
    val choice = Choice(
      id = "neutral",
      label = "Weiter",
      next = "c2_s01_ticket_search"
    )

    assertEquals(ChoiceWeight.Neutral, choice.resolvedWeight())
  }
}
