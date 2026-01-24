package de.daydaylx.nachtzug19.engine

import de.daydaylx.nachtzug19.model.Choice
import de.daydaylx.nachtzug19.model.Condition
import de.daydaylx.nachtzug19.model.Effect
import de.daydaylx.nachtzug19.model.EffectTarget
import de.daydaylx.nachtzug19.model.EffectType
import de.daydaylx.nachtzug19.model.GameState
import de.daydaylx.nachtzug19.model.Scene
import de.daydaylx.nachtzug19.model.createInitialState
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.intOrNull

fun applyEffects(state: GameState, effects: List<Effect>): GameState {
  var next = state
  effects.forEach { effect ->
    val current = getStateValue(next, effect.target)
    val newValue: Any = when (effect.type) {
      EffectType.Inc -> {
        val currentNumber = current as? Int ?: error("Cannot increment non-numeric ${effect.target}")
        currentNumber + effect.valueAsInt()
      }
      EffectType.Dec -> {
        val currentNumber = current as? Int ?: error("Cannot decrement non-numeric ${effect.target}")
        currentNumber - effect.valueAsInt()
      }
      EffectType.Set -> {
        val primitive = effect.value as? JsonPrimitive
        primitive?.booleanOrNull ?: primitive?.intOrNull
          ?: error("Unsupported value for set on ${effect.target}")
      }
      EffectType.Clamp -> {
        val currentNumber = current as? Int ?: error("Cannot clamp non-numeric ${effect.target}")
        var clamped = currentNumber
        effect.clamp_min?.let { clamped = clamped.coerceAtLeast(it) }
        effect.clamp_max?.let { clamped = clamped.coerceAtMost(it) }
        clamped
      }
    }
    next = setStateValue(next, effect.target, newValue)
  }
  return autoClamp(next)
}

private fun autoClamp(state: GameState): GameState {
  return state.copy(
    stats = state.stats.copy(
      mut = state.stats.mut.coerceIn(0, 10),
      wissen = state.stats.wissen.coerceIn(0, 10),
      empathie = state.stats.empathie.coerceIn(0, 10)
    ),
    tickets = state.tickets.copy(
      tickets_truth = state.tickets.tickets_truth.coerceIn(0, 50),
      tickets_escape = state.tickets.tickets_escape.coerceIn(0, 50),
      tickets_guilt = state.tickets.tickets_guilt.coerceIn(0, 50),
      tickets_love = state.tickets.tickets_love.coerceIn(0, 50)
    ),
    pressure = state.pressure.copy(
      conductor_attention = state.pressure.conductor_attention.coerceIn(0, 6),
      memory_drift = state.pressure.memory_drift.coerceIn(0, 6)
    ),
    relations = state.relations.copy(
      rel_comp7 = state.relations.rel_comp7.coerceIn(-2, 10),
      rel_boy = state.relations.rel_boy.coerceIn(-2, 10),
      rel_sleepless = state.relations.rel_sleepless.coerceIn(-2, 10)
    )
  )
}

fun evaluateCondition(state: GameState, condition: Condition): Boolean {
  return when (condition) {
    is Condition.Compare -> {
      val current = getStateValue(state, condition.target)
      val primitive = condition.value as? JsonPrimitive
      val targetValue = primitive?.booleanOrNull ?: primitive?.intOrNull
        ?: error("Unsupported compare value")
      when (condition.operator) {
        de.daydaylx.nachtzug19.model.ComparisonOperator.Eq -> current == targetValue
        de.daydaylx.nachtzug19.model.ComparisonOperator.Neq -> current != targetValue
        de.daydaylx.nachtzug19.model.ComparisonOperator.Gt -> (current as Int) > (targetValue as Int)
        de.daydaylx.nachtzug19.model.ComparisonOperator.Lt -> (current as Int) < (targetValue as Int)
        de.daydaylx.nachtzug19.model.ComparisonOperator.Gte -> (current as Int) >= (targetValue as Int)
        de.daydaylx.nachtzug19.model.ComparisonOperator.Lte -> (current as Int) <= (targetValue as Int)
      }
    }
    is Condition.Bool -> {
      val current = getStateValue(state, condition.target)
      current == condition.value
    }
    is Condition.And -> condition.conditions.all { evaluateCondition(state, it) }
    is Condition.Or -> condition.conditions.any { evaluateCondition(state, it) }
  }
}

fun getAvailableChoices(state: GameState, scene: Scene): List<Choice> {
  return scene.choices.filter { choice ->
    choice.condition?.let { evaluateCondition(state, it) } ?: true
  }
}

fun resolveSceneNarrative(scene: Scene, state: GameState): String {
  val baseNarrative = scene.narrative ?: scene.beschreibung ?: ""
  val variants = scene.narrative_variants ?: emptyList()
  if (variants.isEmpty()) return baseNarrative

  // 1. Condition check (Priority)
  val conditionVariant = variants.find { it.condition != null && evaluateCondition(state, it.condition) }
  if (conditionVariant != null) {
    return conditionVariant.narrative
  }

  // 2. Drift check (Fallback)
  val currentDrift = state.pressure.memory_drift
  val driftVariants = variants.filter { it.min_drift != null }
  val sorted = driftVariants.sortedByDescending { it.min_drift!! }
  val match = sorted.firstOrNull { currentDrift >= it.min_drift!! }
  
  return match?.narrative ?: baseNarrative
}

fun transitionToNextScene(
  state: GameState,
  currentScene: Scene,
  choice: Choice,
  scenes: Map<String, Scene>
): GameState {
  var nextState = state
  if (!choice.effects.isNullOrEmpty()) {
    nextState = applyEffects(nextState, choice.effects)
  }

  if (currentScene.tags?.contains(de.daydaylx.nachtzug19.model.SceneTag.StationEnd) == true) {
    val hasManualDrift = (choice.effects ?: emptyList()).any { it.target == EffectTarget.MemoryDrift }
      || (currentScene.exit_effects ?: emptyList()).any { it.target == EffectTarget.MemoryDrift }
    val hasManualStation = (choice.effects ?: emptyList()).any { it.target == EffectTarget.StationCount }
      || (currentScene.exit_effects ?: emptyList()).any { it.target == EffectTarget.StationCount }

    if (!hasManualDrift) {
      nextState = nextState.copy(
        pressure = nextState.pressure.copy(memory_drift = nextState.pressure.memory_drift + 1)
      )
    }
    if (!hasManualStation) {
      nextState = nextState.copy(
        station_count = nextState.station_count + 1
      )
    }
  }

  if (!currentScene.exit_effects.isNullOrEmpty()) {
    nextState = applyEffects(nextState, currentScene.exit_effects)
  }

  val historyEntry = de.daydaylx.nachtzug19.model.HistoryEntry(
    scene_id = nextState.current_scene_id,
    choice_id = choice.id ?: choice.text ?: "unknown",
    timestamp = System.currentTimeMillis()
  )
  nextState = nextState.copy(history = nextState.history + historyEntry)

  if (choice.ending != null) {
    return nextState.copy(isGameOver = true, endingId = choice.ending)
  }

  val nextSceneId = choice.next ?: error("Choice has neither next nor ending")
  val nextScene = scenes[nextSceneId] ?: error("Scene not found: $nextSceneId")

  var transitioned = nextState.copy(current_scene_id = nextSceneId)
  if (!transitioned.visited_scene_ids.contains(nextSceneId)) {
    transitioned = transitioned.copy(visited_scene_ids = transitioned.visited_scene_ids + nextSceneId)
  }

  if (!nextScene.entry_effects.isNullOrEmpty()) {
    transitioned = applyEffects(transitioned, nextScene.entry_effects)
  }

  if (nextScene.chapter != null && nextScene.chapter != transitioned.chapter_index) {
    transitioned = transitioned.copy(chapter_index = nextScene.chapter)
  }

  return transitioned
}

class GameEngine {
  private var scenes: Map<String, Scene> = emptyMap()
  private var endings: Map<String, de.daydaylx.nachtzug19.model.Ending> = emptyMap()
  var state: GameState = createInitialState("c1_s01_platform")
    private set

  fun setStory(scenes: Map<String, Scene>, endings: Map<String, de.daydaylx.nachtzug19.model.Ending>, startSceneId: String) {
    this.scenes = scenes
    this.endings = endings
    state = createInitialState(startSceneId)
  }

  fun setState(newState: GameState) {
    state = newState
  }

  fun getCurrentScene(): Scene? = scenes[state.current_scene_id]

  fun getEnding(): de.daydaylx.nachtzug19.model.Ending? = state.endingId?.let { endings[it] }

  fun getAvailableChoices(): List<Choice> {
    val scene = getCurrentScene() ?: return emptyList()
    return getAvailableChoices(state, scene)
  }

  fun reset(startSceneId: String) {
    state = createInitialState(startSceneId)
  }

  fun makeChoice(choice: Choice) {
    val currentScene = getCurrentScene() ?: error("No current scene")
    state = transitionToNextScene(state, currentScene, choice, scenes)
  }
}

private fun getStateValue(state: GameState, target: EffectTarget): Any {
  return when (target) {
    EffectTarget.Mut -> state.stats.mut
    EffectTarget.Wissen -> state.stats.wissen
    EffectTarget.Empathie -> state.stats.empathie
    EffectTarget.TicketsTruth -> state.tickets.tickets_truth
    EffectTarget.TicketsEscape -> state.tickets.tickets_escape
    EffectTarget.TicketsGuilt -> state.tickets.tickets_guilt
    EffectTarget.TicketsLove -> state.tickets.tickets_love
    EffectTarget.ConductorAttention -> state.pressure.conductor_attention
    EffectTarget.MemoryDrift -> state.pressure.memory_drift
    EffectTarget.RelComp7 -> state.relations.rel_comp7
    EffectTarget.RelBoy -> state.relations.rel_boy
    EffectTarget.RelSleepless -> state.relations.rel_sleepless
    EffectTarget.HasRecorder -> state.items.has_recorder
    EffectTarget.HasTag19 -> state.items.has_tag19
    EffectTarget.HasTicket -> state.items.has_ticket
    EffectTarget.PhotoAnomaly -> state.items.photo_anomaly
    EffectTarget.PlayedRecorder -> state.items.played_recorder
    EffectTarget.MemorySearchActive -> state.items.memory_search_active
    EffectTarget.EmmaMemoryUnlocked -> state.items.emma_memory_unlocked
    EffectTarget.ChapterIndex -> state.chapter_index
    EffectTarget.StationCount -> state.station_count
  }
}

private fun setStateValue(state: GameState, target: EffectTarget, value: Any): GameState {
  return when (target) {
    EffectTarget.Mut -> state.copy(stats = state.stats.copy(mut = value as Int))
    EffectTarget.Wissen -> state.copy(stats = state.stats.copy(wissen = value as Int))
    EffectTarget.Empathie -> state.copy(stats = state.stats.copy(empathie = value as Int))
    EffectTarget.TicketsTruth -> state.copy(tickets = state.tickets.copy(tickets_truth = value as Int))
    EffectTarget.TicketsEscape -> state.copy(tickets = state.tickets.copy(tickets_escape = value as Int))
    EffectTarget.TicketsGuilt -> state.copy(tickets = state.tickets.copy(tickets_guilt = value as Int))
    EffectTarget.TicketsLove -> state.copy(tickets = state.tickets.copy(tickets_love = value as Int))
    EffectTarget.ConductorAttention -> state.copy(pressure = state.pressure.copy(conductor_attention = value as Int))
    EffectTarget.MemoryDrift -> state.copy(pressure = state.pressure.copy(memory_drift = value as Int))
    EffectTarget.RelComp7 -> state.copy(relations = state.relations.copy(rel_comp7 = value as Int))
    EffectTarget.RelBoy -> state.copy(relations = state.relations.copy(rel_boy = value as Int))
    EffectTarget.RelSleepless -> state.copy(relations = state.relations.copy(rel_sleepless = value as Int))
    EffectTarget.HasRecorder -> state.copy(items = state.items.copy(has_recorder = value as Boolean))
    EffectTarget.HasTag19 -> state.copy(items = state.items.copy(has_tag19 = value as Boolean))
    EffectTarget.HasTicket -> state.copy(items = state.items.copy(has_ticket = value as Boolean))
    EffectTarget.PhotoAnomaly -> state.copy(items = state.items.copy(photo_anomaly = value as Boolean))
    EffectTarget.PlayedRecorder -> state.copy(items = state.items.copy(played_recorder = value as Boolean))
    EffectTarget.MemorySearchActive -> state.copy(items = state.items.copy(memory_search_active = value as Boolean))
    EffectTarget.EmmaMemoryUnlocked -> state.copy(items = state.items.copy(emma_memory_unlocked = value as Boolean))
    EffectTarget.ChapterIndex -> state.copy(chapter_index = value as Int)
    EffectTarget.StationCount -> state.copy(station_count = value as Int)
  }
}
