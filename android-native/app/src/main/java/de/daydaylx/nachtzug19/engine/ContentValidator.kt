package de.daydaylx.nachtzug19.engine

import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.Condition
import de.daydaylx.nachtzug19.model.EffectTarget
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.SceneTag

enum class ValidationLevel { ERROR, WARNING }

data class ValidationIssue(
  val level: ValidationLevel,
  val message: String,
  val sceneId: String? = null,
  val choiceId: String? = null
)

data class ValidationResult(
  val valid: Boolean,
  val errors: List<ValidationIssue>,
  val warnings: List<ValidationIssue>
)

object ContentValidator {
  fun validateContent(
    startSceneId: String,
    scenes: Map<String, Scene>,
    endings: Map<String, de.daydaylx.nachtzug19.model.Ending>
  ): ValidationResult {
    val errors = mutableListOf<ValidationIssue>()
    val warnings = mutableListOf<ValidationIssue>()

    if (!scenes.containsKey(startSceneId)) {
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Start scene '$startSceneId' does not exist"
      )
      return ValidationResult(false, errors, warnings)
    }

    validateUniqueness(scenes, errors)

    scenes.values.forEach { scene ->
      validateScene(scene, scenes, endings, errors, warnings)
    }

    validateCanonRuleR1(scenes, errors, warnings)
    validateCanonRuleR2(scenes, errors)
    validateReachability(startSceneId, scenes, warnings)
    validateNoDeadEnds(scenes, endings, errors)

    return ValidationResult(errors.isEmpty(), errors, warnings)
  }

  private fun validateUniqueness(scenes: Map<String, Scene>, errors: MutableList<ValidationIssue>) {
    val counts = mutableMapOf<String, Int>()
    scenes.values.forEach { scene ->
      counts[scene.id] = (counts[scene.id] ?: 0) + 1
    }
    counts.filterValues { it > 1 }.forEach { (id, count) ->
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Duplicate scene id '$id' ($count times)",
        sceneId = id
      )
    }
  }

  private fun validateScene(
    scene: Scene,
    scenes: Map<String, Scene>,
    endings: Map<String, de.daydaylx.nachtzug19.model.Ending>,
    errors: MutableList<ValidationIssue>,
    warnings: MutableList<ValidationIssue>
  ) {
    if (scene.choices.isEmpty()) {
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Scene '${scene.id}' has no choices",
        sceneId = scene.id
      )
      return
    }
    if (scene.choices.size > 4) {
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Scene '${scene.id}' has more than 4 choices",
        sceneId = scene.id
      )
    }

    scene.choices.forEach { choice ->
      validateChoice(scene.id, choice, scenes, endings, errors, warnings)
    }
  }

  private fun validateChoice(
    sceneId: String,
    choice: Choice,
    scenes: Map<String, Scene>,
    endings: Map<String, de.daydaylx.nachtzug19.model.Ending>,
    errors: MutableList<ValidationIssue>,
    warnings: MutableList<ValidationIssue>
  ) {
    val choiceLabel = choice.id ?: choice.text ?: "unknown"

    if (choice.next == null && choice.ending == null) {
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Choice '$choiceLabel' has neither next nor ending",
        sceneId = sceneId,
        choiceId = choice.id
      )
    }

    if (choice.next != null && !scenes.containsKey(choice.next)) {
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Choice '$choiceLabel' references missing scene '${choice.next}'",
        sceneId = sceneId,
        choiceId = choice.id
      )
    }

    if (choice.ending != null && !endings.containsKey(choice.ending)) {
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Choice '$choiceLabel' references missing ending '${choice.ending}'",
        sceneId = sceneId,
        choiceId = choice.id
      )
    }

    val hasEffects = !choice.effects.isNullOrEmpty()
    val hasLegacyEffects = choice.werteAenderung != null || choice.flagsAenderung != null
      || choice.itemBelohnung != null || choice.itemVerlust != null
    if (!hasEffects && !hasLegacyEffects) {
      errors += ValidationIssue(
        level = ValidationLevel.ERROR,
        message = "Choice '$choiceLabel' has no effects (R3)",
        sceneId = sceneId,
        choiceId = choice.id
      )
    }

    choice.effects?.forEachIndexed { index, effect ->
      if (effect.target !in EffectTarget.values()) {
        errors += ValidationIssue(
          level = ValidationLevel.ERROR,
          message = "Choice '$choiceLabel' effect #$index has unknown target '${effect.target}'",
          sceneId = sceneId,
          choiceId = choice.id
        )
      }
      if (effect.type == de.daydaylx.nachtzug19.model.EffectType.Clamp
        && (effect.clamp_min == null || effect.clamp_max == null)
      ) {
        warnings += ValidationIssue(
          level = ValidationLevel.WARNING,
          message = "Choice '$choiceLabel' effect #$index clamp without min/max",
          sceneId = sceneId,
          choiceId = choice.id
        )
      }
    }

    if (choice.condition != null) {
      val conditionTargets = collectConditionTargets(choice.condition)
      conditionTargets.forEach { target ->
        if (target !in EffectTarget.values()) {
          errors += ValidationIssue(
            level = ValidationLevel.ERROR,
            message = "Choice '$choiceLabel' condition uses unknown target '$target'",
            sceneId = sceneId,
            choiceId = choice.id
          )
        }
      }
    }
  }

  private fun collectConditionTargets(condition: Condition): List<EffectTarget> {
    return when (condition) {
      is Condition.Compare -> listOf(condition.target)
      is Condition.Bool -> listOf(condition.target)
      is Condition.And -> condition.conditions.flatMap { collectConditionTargets(it) }
      is Condition.Or -> condition.conditions.flatMap { collectConditionTargets(it) }
    }
  }

  private fun validateCanonRuleR1(
    scenes: Map<String, Scene>,
    errors: MutableList<ValidationIssue>,
    warnings: MutableList<ValidationIssue>
  ) {
    val chapterStationEnds = mutableMapOf<Int, Int>()
    val existingChapters = mutableSetOf<Int>()

    scenes.values.forEach { scene ->
      scene.chapter?.let { chapter ->
        existingChapters.add(chapter)
        if (scene.tags?.contains(SceneTag.StationEnd) == true) {
          chapterStationEnds[chapter] = (chapterStationEnds[chapter] ?: 0) + 1
        }
      }
    }

    existingChapters.forEach { chapter ->
      val count = chapterStationEnds[chapter] ?: 0
      if (count == 0) {
        errors += ValidationIssue(
          level = ValidationLevel.ERROR,
          message = "Canon Rule R1 violated: chapter $chapter has no station_end scene"
        )
      } else if (count > 1) {
        warnings += ValidationIssue(
          level = ValidationLevel.WARNING,
          message = "Chapter $chapter has $count station_end scenes"
        )
      }
    }
  }

  private fun validateCanonRuleR2(
    scenes: Map<String, Scene>,
    errors: MutableList<ValidationIssue>
  ) {
    val requiredChapters = listOf(2, 3, 5)
    val chapterControlCounts = mutableMapOf<Int, Int>()
    val existingChapters = mutableSetOf<Int>()

    scenes.values.forEach { scene ->
      scene.chapter?.let { chapter ->
        existingChapters.add(chapter)
        if (scene.tags?.contains(SceneTag.Control) == true) {
          chapterControlCounts[chapter] = (chapterControlCounts[chapter] ?: 0) + 1
        }
      }
    }

    requiredChapters.forEach { chapter ->
      if (existingChapters.contains(chapter)) {
        val count = chapterControlCounts[chapter] ?: 0
        if (count == 0) {
          errors += ValidationIssue(
            level = ValidationLevel.ERROR,
            message = "Canon Rule R2 violated: chapter $chapter has no control scene"
          )
        }
      }
    }
  }

  private fun validateReachability(
    startSceneId: String,
    scenes: Map<String, Scene>,
    warnings: MutableList<ValidationIssue>
  ) {
    val reachable = mutableSetOf<String>()
    val queue = ArrayDeque<String>()
    queue.add(startSceneId)

    while (queue.isNotEmpty()) {
      val currentId = queue.removeFirst()
      if (!reachable.add(currentId)) continue
      val scene = scenes[currentId] ?: continue
      scene.choices.forEach { choice ->
        choice.next?.let { queue.add(it) }
      }
    }

    scenes.keys.forEach { sceneId ->
      if (!reachable.contains(sceneId)) {
        val scene = scenes[sceneId]
        if (scene?.tags?.contains(SceneTag.Secret) != true) {
          warnings += ValidationIssue(
            level = ValidationLevel.WARNING,
            message = "Scene '$sceneId' is not reachable from start",
            sceneId = sceneId
          )
        }
      }
    }
  }

  private fun validateNoDeadEnds(
    scenes: Map<String, Scene>,
    endings: Map<String, de.daydaylx.nachtzug19.model.Ending>,
    errors: MutableList<ValidationIssue>
  ) {
    scenes.values.forEach { scene ->
      val hasExit = scene.choices.any { choice ->
        (choice.next != null && scenes.containsKey(choice.next))
          || (choice.ending != null && endings.containsKey(choice.ending))
      }
      if (!hasExit) {
        errors += ValidationIssue(
          level = ValidationLevel.ERROR,
          message = "Scene '${scene.id}' is a dead end",
          sceneId = scene.id
        )
      }
    }
  }
}
