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
        primitive?.booleanOrNull ?: primitive?.intOrNull ?: primitive?.takeIf { it.isString }?.content
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
    // Stance mutual exclusion: setting one clears the other
    if (effect.target == EffectTarget.StanceBold && newValue == true) {
      next = setStateValue(next, EffectTarget.StanceCautious, false)
    } else if (effect.target == EffectTarget.StanceCautious && newValue == true) {
      next = setStateValue(next, EffectTarget.StanceBold, false)
    }
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
      tickets_truth = state.tickets.tickets_truth.coerceIn(0, 20),
      tickets_escape = state.tickets.tickets_escape.coerceIn(0, 20),
      tickets_guilt = state.tickets.tickets_guilt.coerceIn(0, 20),
      tickets_love = state.tickets.tickets_love.coerceIn(0, 20)
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
      val targetValue = primitive?.booleanOrNull ?: primitive?.intOrNull ?: primitive?.takeIf { it.isString }?.content
        ?: error("Unsupported compare value")
      when (condition.operator) {
        de.daydaylx.nachtzug19.model.ComparisonOperator.Eq -> current == targetValue
        de.daydaylx.nachtzug19.model.ComparisonOperator.Neq -> current != targetValue
        de.daydaylx.nachtzug19.model.ComparisonOperator.Gt -> {
          val currentInt = current as? Int ?: error("Operator '>' requires numeric value for ${condition.target}")
          val targetInt = targetValue as? Int ?: error("Operator '>' requires numeric comparison target for ${condition.target}")
          currentInt > targetInt
        }
        de.daydaylx.nachtzug19.model.ComparisonOperator.Lt -> {
          val currentInt = current as? Int ?: error("Operator '<' requires numeric value for ${condition.target}")
          val targetInt = targetValue as? Int ?: error("Operator '<' requires numeric comparison target for ${condition.target}")
          currentInt < targetInt
        }
        de.daydaylx.nachtzug19.model.ComparisonOperator.Gte -> {
          val currentInt = current as? Int ?: error("Operator '>=' requires numeric value for ${condition.target}")
          val targetInt = targetValue as? Int ?: error("Operator '>=' requires numeric comparison target for ${condition.target}")
          currentInt >= targetInt
        }
        de.daydaylx.nachtzug19.model.ComparisonOperator.Lte -> {
          val currentInt = current as? Int ?: error("Operator '<=' requires numeric value for ${condition.target}")
          val targetInt = targetValue as? Int ?: error("Operator '<=' requires numeric comparison target for ${condition.target}")
          currentInt <= targetInt
        }
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
  val baseNarrative = scene.narrative
  val variants = scene.narrative_variants ?: emptyList()
  if (variants.isEmpty()) return baseNarrative

  val currentDrift = state.pressure.memory_drift
  var bestNarrative: String? = null
  var bestScore = Double.NEGATIVE_INFINITY

  for (variant in variants) {
    var matches = false
    val effectivePriority: Int

    if (variant.condition != null) {
      matches = evaluateCondition(state, variant.condition)
      if (matches && variant.min_drift != null) {
        matches = currentDrift >= variant.min_drift
      }
      effectivePriority = variant.priority ?: 10
    } else if (variant.min_drift != null) {
      matches = currentDrift >= variant.min_drift
      effectivePriority = variant.priority ?: 0
    } else {
      continue
    }

    if (matches) {
      val driftTiebreaker = (variant.min_drift ?: 0) * 0.01
      val score = effectivePriority.toDouble() + driftTiebreaker
      if (score > bestScore) {
        bestScore = score
        bestNarrative = variant.narrative
      }
    }
  }

  return bestNarrative ?: baseNarrative
}

/**
 * Checks if a scene has an auto_next transition based on narrative_variants.
 * Used for hub scenes that automatically redirect when conditions are met.
 * 
 * @param scene The scene to check
 * @param state The current game state
 * @return Scene ID for auto_next or null
 */
fun checkAutoNext(scene: Scene, state: GameState): String? {
  val variants = scene.narrative_variants ?: return null
  if (variants.isEmpty()) return null

  val currentDrift = state.pressure.memory_drift
  var bestAutoNext: String? = null
  var bestScore = Double.NEGATIVE_INFINITY

  for (variant in variants) {
    if (variant.auto_next == null) continue

    var matches = false
    val effectivePriority: Int

    if (variant.condition != null) {
      matches = evaluateCondition(state, variant.condition)
      if (matches && variant.min_drift != null) {
        matches = currentDrift >= variant.min_drift
      }
      effectivePriority = variant.priority ?: 10
    } else if (variant.min_drift != null) {
      matches = currentDrift >= variant.min_drift
      effectivePriority = variant.priority ?: 0
    } else {
      continue
    }

    if (matches) {
      val driftTiebreaker = (variant.min_drift ?: 0) * 0.01
      val score = effectivePriority.toDouble() + driftTiebreaker
      if (score > bestScore) {
        bestScore = score
        bestAutoNext = variant.auto_next
      }
    }
  }

  return bestAutoNext
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
    choice_id = choice.id ?: choice.label ?: "unknown",
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

  if (nextScene.chapter != transitioned.chapter_index) {
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

  fun advanceAutoNextIfNeeded(): Boolean {
    if (state.isGameOver) return false

    val scene = getCurrentScene() ?: return false
    val availableChoices = getAvailableChoices(state, scene)
    if (availableChoices.isNotEmpty()) return false

    val autoNextSceneId = checkAutoNext(scene, state) ?: return false
    val nextScene = scenes[autoNextSceneId] ?: error("Auto-next scene not found: $autoNextSceneId")

    var transitioned = state
    if (!scene.exit_effects.isNullOrEmpty()) {
      transitioned = applyEffects(transitioned, scene.exit_effects)
    }

    transitioned = transitioned.copy(current_scene_id = autoNextSceneId)
    if (!transitioned.visited_scene_ids.contains(autoNextSceneId)) {
      transitioned = transitioned.copy(
        visited_scene_ids = transitioned.visited_scene_ids + autoNextSceneId
      )
    }

    if (!nextScene.entry_effects.isNullOrEmpty()) {
      transitioned = applyEffects(transitioned, nextScene.entry_effects)
    }

    if (nextScene.chapter != transitioned.chapter_index) {
      transitioned = transitioned.copy(chapter_index = nextScene.chapter)
    }

    state = transitioned
    return true
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
    EffectTarget.HubInvestigations -> state.pressure.hub_investigations
    EffectTarget.TrainExplorations -> state.pressure.train_explorations
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
    EffectTarget.StanceBold -> state.items.stance_bold
    EffectTarget.StanceCautious -> state.items.stance_cautious
    
    // Hub 1: Bahnsteig
    EffectTarget.InvestigatedBoard -> state.items.investigated_board
    EffectTarget.InvestigatedPoster -> state.items.investigated_poster
    EffectTarget.InvestigatedPerson -> state.items.investigated_person
    EffectTarget.InvestigatedDevice -> state.items.investigated_device
    EffectTarget.InvestigatedEdge -> state.items.investigated_edge
    EffectTarget.CalledEmma -> state.items.called_emma
    EffectTarget.SawEmmaVision -> state.items.saw_emma_vision
    EffectTarget.HasEmmaNote -> state.items.has_emma_note
    EffectTarget.KnowsBoardPattern -> state.items.knows_board_pattern
    
    // Hub 2: Zug
    EffectTarget.ExploredCompartment -> state.items.explored_compartment
    EffectTarget.ExploredSleepless -> state.items.explored_sleepless
    EffectTarget.ExploredPassengers -> state.items.explored_passengers
    EffectTarget.ExploredComp7 -> state.items.explored_comp7
    EffectTarget.KnowsSleeplessWarning -> state.items.knows_sleepless_warning
    EffectTarget.SawPassengerLoop -> state.items.saw_passenger_loop
    EffectTarget.HeardComp7Scratching -> state.items.heard_comp7_scratching

    // Nuance Flags (K1/K2)
    EffectTarget.InspectedDevice -> state.items.inspected_device
    EffectTarget.LookedIntoVoid -> state.items.looked_into_void
    EffectTarget.GazedIntoDarkness -> state.items.gazed_into_darkness
    EffectTarget.PrepareStance -> state.items.prepare_stance
    EffectTarget.BreathControl -> state.items.breath_control
    EffectTarget.ConductorStance -> state.items.conductor_stance
    EffectTarget.ApproachResponse -> state.items.approach_response
    EffectTarget.CountedCompartments -> state.items.counted_compartments
    EffectTarget.WentToLight -> state.items.went_to_light
    EffectTarget.KeptNoTicketNote -> state.items.kept_no_ticket_note
    EffectTarget.DestroyedEvidence -> state.items.destroyed_evidence
    EffectTarget.NoticedJacketChange -> state.items.noticed_jacket_change

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
    EffectTarget.HubInvestigations -> state.copy(pressure = state.pressure.copy(hub_investigations = value as Int))
    EffectTarget.TrainExplorations -> state.copy(pressure = state.pressure.copy(train_explorations = value as Int))
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
    EffectTarget.StanceBold -> state.copy(items = state.items.copy(stance_bold = value as Boolean))
    EffectTarget.StanceCautious -> state.copy(items = state.items.copy(stance_cautious = value as Boolean))
    
    // Hub 1: Bahnsteig
    EffectTarget.InvestigatedBoard -> state.copy(items = state.items.copy(investigated_board = value as Boolean))
    EffectTarget.InvestigatedPoster -> state.copy(items = state.items.copy(investigated_poster = value as Boolean))
    EffectTarget.InvestigatedPerson -> state.copy(items = state.items.copy(investigated_person = value as Boolean))
    EffectTarget.InvestigatedDevice -> state.copy(items = state.items.copy(investigated_device = value as Boolean))
    EffectTarget.InvestigatedEdge -> state.copy(items = state.items.copy(investigated_edge = value as Boolean))
    EffectTarget.CalledEmma -> state.copy(items = state.items.copy(called_emma = value as Boolean))
    EffectTarget.SawEmmaVision -> state.copy(items = state.items.copy(saw_emma_vision = value as Boolean))
    EffectTarget.HasEmmaNote -> state.copy(items = state.items.copy(has_emma_note = value as Boolean))
    EffectTarget.KnowsBoardPattern -> state.copy(items = state.items.copy(knows_board_pattern = value as Boolean))
    
    // Hub 2: Zug
    EffectTarget.ExploredCompartment -> state.copy(items = state.items.copy(explored_compartment = value as Boolean))
    EffectTarget.ExploredSleepless -> state.copy(items = state.items.copy(explored_sleepless = value as Boolean))
    EffectTarget.ExploredPassengers -> state.copy(items = state.items.copy(explored_passengers = value as Boolean))
    EffectTarget.ExploredComp7 -> state.copy(items = state.items.copy(explored_comp7 = value as Boolean))
    EffectTarget.KnowsSleeplessWarning -> state.copy(items = state.items.copy(knows_sleepless_warning = value as Boolean))
    EffectTarget.SawPassengerLoop -> state.copy(items = state.items.copy(saw_passenger_loop = value as Boolean))
    EffectTarget.HeardComp7Scratching -> state.copy(items = state.items.copy(heard_comp7_scratching = value as Boolean))

    // Nuance Flags (K1/K2)
    EffectTarget.InspectedDevice -> state.copy(items = state.items.copy(inspected_device = value as Boolean))
    EffectTarget.LookedIntoVoid -> state.copy(items = state.items.copy(looked_into_void = value as Boolean))
    EffectTarget.GazedIntoDarkness -> state.copy(items = state.items.copy(gazed_into_darkness = value as Boolean))
    EffectTarget.PrepareStance -> state.copy(items = state.items.copy(prepare_stance = value as String))
    EffectTarget.BreathControl -> state.copy(items = state.items.copy(breath_control = value as String))
    EffectTarget.ConductorStance -> state.copy(items = state.items.copy(conductor_stance = value as String))
    EffectTarget.ApproachResponse -> state.copy(items = state.items.copy(approach_response = value as String))
    EffectTarget.CountedCompartments -> state.copy(items = state.items.copy(counted_compartments = value as Boolean))
    EffectTarget.WentToLight -> state.copy(items = state.items.copy(went_to_light = value as Boolean))
    EffectTarget.KeptNoTicketNote -> state.copy(items = state.items.copy(kept_no_ticket_note = value as Boolean))
    EffectTarget.DestroyedEvidence -> state.copy(items = state.items.copy(destroyed_evidence = value as Boolean))
    EffectTarget.NoticedJacketChange -> state.copy(items = state.items.copy(noticed_jacket_change = value as Boolean))

    EffectTarget.ChapterIndex -> state.copy(chapter_index = value as Int)
    EffectTarget.StationCount -> state.copy(station_count = value as Int)
  }
}
