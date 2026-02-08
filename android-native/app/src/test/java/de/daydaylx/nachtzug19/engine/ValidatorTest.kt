package de.daydaylx.nachtzug19.engine

import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.Effect
import de.daydaylx.nachtzug19.model.EffectTarget
import de.daydaylx.nachtzug19.model.EffectType
import de.daydaylx.nachtzug19.model.Ending
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.SceneTag
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ValidatorTest {
  private val endings = mapOf(
    "A" to Ending(id = "A", title = "A", narrative = "A")
  )

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
      chapter = 1,
      title = "Start",
      narrative = "Test narrative",
      choices = listOf(choice),
      tags = listOf(SceneTag.StationEnd)
    )

    val result = ContentValidator.validateContent(
      startSceneId = "start",
      scenes = mapOf("start" to scene),
      endings = emptyMap()
    )

    assertTrue(result.errors.any { it.message.contains("missing scene") })
  }

  @Test
  fun validatorAllowsToneChoiceWithoutEffects() {
    val scene = Scene(
      id = "start",
      chapter = 1,
      title = "Start",
      narrative = "Test narrative",
      tags = listOf(SceneTag.StationEnd),
      choices = listOf(
        Choice(
          id = "tone",
          label = "Observe",
          ending = "A"
        )
      )
    )

    val result = ContentValidator.validateContent(
      startSceneId = "start",
      scenes = mapOf("start" to scene),
      endings = endings
    )

    assertTrue(result.valid)
    assertTrue(result.errors.isEmpty())
  }

  @Test
  fun validatorAllowsFiveChoicesButRejectsSix() {
    val fiveChoices = (1..5).map { index ->
      Choice(
        id = "c$index",
        label = "Choice $index",
        ending = "A"
      )
    }
    val sixChoices = fiveChoices + Choice(
      id = "c6",
      label = "Choice 6",
      ending = "A"
    )

    val validScene = Scene(
      id = "valid",
      chapter = 1,
      title = "Valid",
      narrative = "Valid narrative",
      tags = listOf(SceneTag.StationEnd),
      choices = fiveChoices
    )
    val invalidScene = Scene(
      id = "invalid",
      chapter = 1,
      title = "Invalid",
      narrative = "Invalid narrative",
      tags = listOf(SceneTag.StationEnd),
      choices = sixChoices
    )

    val validResult = ContentValidator.validateContent(
      startSceneId = "valid",
      scenes = mapOf("valid" to validScene),
      endings = endings
    )
    val invalidResult = ContentValidator.validateContent(
      startSceneId = "invalid",
      scenes = mapOf("invalid" to invalidScene),
      endings = endings
    )

    assertTrue(validResult.valid)
    assertFalse(invalidResult.valid)
    assertTrue(
      invalidResult.errors.any { it.message.contains("more than 5 choices") }
    )
  }
}
