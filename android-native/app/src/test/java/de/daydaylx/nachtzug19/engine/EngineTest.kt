package de.daydaylx.nachtzug19.engine

import de.daydaylx.nachtzug19.model.Effect
import de.daydaylx.nachtzug19.model.EffectTarget
import de.daydaylx.nachtzug19.model.EffectType
import de.daydaylx.nachtzug19.model.Ending
import de.daydaylx.nachtzug19.model.NarrativeVariant
import de.daydaylx.nachtzug19.model.Pressure
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.Condition
import de.daydaylx.nachtzug19.model.ComparisonOperator
import de.daydaylx.nachtzug19.model.createInitialState
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class EngineTest {
  @Test
  fun resolveNarrativeSelectsHighestMatchingDrift() {
    val scene = Scene(
      id = "scene",
      chapter = 1,
      title = "Scene",
      narrative = "base",
      choices = emptyList(),
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

  @Test
  fun applyEffectsSupportsStringTargets() {
    val base = createInitialState("scene")
    val effects = listOf(
      Effect(
        type = EffectType.Set,
        target = EffectTarget.PrepareStance,
        value = JsonPrimitive("truth")
      )
    )

    val result = applyEffects(base, effects)
    assertEquals("truth", result.items.prepare_stance)
  }

  @Test
  fun evaluateConditionSupportsStringCompare() {
    val base = createInitialState("scene")
    val state = base.copy(
      items = base.items.copy(prepare_stance = "truth")
    )
    val condition = Condition.Compare(
      target = EffectTarget.PrepareStance,
      operator = ComparisonOperator.Eq,
      value = JsonPrimitive("truth")
    )

    assertTrue(evaluateCondition(state, condition))
  }

  @Test
  fun autoNextAdvancesWhenNoChoicesRemain() {
    val hubScene = Scene(
      id = "hub",
      chapter = 1,
      title = "Hub",
      narrative = "Hub",
      choices = emptyList(),
      narrative_variants = listOf(
        NarrativeVariant(
          condition = Condition.Compare(
            target = EffectTarget.HubInvestigations,
            operator = ComparisonOperator.Gte,
            value = JsonPrimitive(1)
          ),
          narrative = "Auto next",
          auto_next = "next"
        )
      ),
      exit_effects = listOf(
        Effect(
          type = EffectType.Inc,
          target = EffectTarget.MemoryDrift,
          value = JsonPrimitive(1)
        )
      )
    )

    val nextScene = Scene(
      id = "next",
      chapter = 1,
      title = "Next",
      narrative = "Next",
      choices = emptyList()
    )

    val engine = GameEngine()
    engine.setStory(
      scenes = mapOf("hub" to hubScene, "next" to nextScene),
      endings = mapOf("A" to Ending(id = "A", title = "A", narrative = "A")),
      startSceneId = "hub"
    )
    engine.setState(
      createInitialState("hub").copy(
        pressure = Pressure(
          conductor_attention = 0,
          memory_drift = 0,
          hub_investigations = 1,
          train_explorations = 0
        )
      )
    )

    val advanced = engine.advanceAutoNextIfNeeded()

    assertTrue(advanced)
    assertEquals("next", engine.state.current_scene_id)
    assertEquals(1, engine.state.pressure.memory_drift)
  }
}
