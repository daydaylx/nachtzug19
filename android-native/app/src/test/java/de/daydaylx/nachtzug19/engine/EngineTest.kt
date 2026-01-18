package de.daydaylx.nachtzug19.engine

import de.daydaylx.nachtzug19.model.Effect
import de.daydaylx.nachtzug19.model.EffectTarget
import de.daydaylx.nachtzug19.model.EffectType
import de.daydaylx.nachtzug19.model.NarrativeVariant
import de.daydaylx.nachtzug19.model.Pressure
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.createInitialState
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Test

class EngineTest {
  @Test
  fun resolveNarrativeSelectsHighestMatchingDrift() {
    val scene = Scene(
      id = "scene",
      choices = emptyList(),
      narrative = "base",
      narrative_variants = listOf(
        NarrativeVariant(min_drift = 3, narrative = "drift-3"),
        NarrativeVariant(min_drift = 5, narrative = "drift-5")
      )
    )
    val state = createInitialState("scene").copy(
      pressure = Pressure(conductor_attention = 0, memory_drift = 4)
    )

    val resolved = resolveSceneNarrative(scene, state)
    assertEquals("drift-3", resolved)
  }

  @Test
  fun applyEffectsIsDeterministic() {
    val base = createInitialState("scene")
    val effects = listOf(
      Effect(
        type = EffectType.Inc,
        target = EffectTarget.TicketsTruth,
        value = JsonPrimitive(1)
      )
    )

    val resultA = applyEffects(base, effects)
    val resultB = applyEffects(base, effects)

    assertEquals(resultA, resultB)
  }
}
