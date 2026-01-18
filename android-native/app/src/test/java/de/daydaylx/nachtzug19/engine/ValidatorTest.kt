package de.daydaylx.nachtzug19.engine

import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.Effect
import de.daydaylx.nachtzug19.model.EffectTarget
import de.daydaylx.nachtzug19.model.EffectType
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.SceneTag
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertTrue
import org.junit.Test

class ValidatorTest {
  @Test
  fun validatorFlagsMissingNextScene() {
    val choice = Choice(
      id = "go",
      label = "Go",
      next = "missing",
      effects = listOf(
        Effect(
          type = EffectType.Inc,
          target = EffectTarget.Wissen,
          value = JsonPrimitive(1)
        )
      )
    )
    val scene = Scene(
      id = "start",
      choices = listOf(choice),
      chapter = 1,
      tags = listOf(SceneTag.StationEnd)
    )

    val result = ContentValidator.validateContent(
      startSceneId = "start",
      scenes = mapOf("start" to scene),
      endings = emptyMap()
    )

    assertTrue(result.errors.any { it.message.contains("missing scene") })
  }
}
