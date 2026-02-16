package de.daydaylx.nachtzug19.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.intOrNull
import kotlin.math.abs

@Serializable
enum class Atmosphere {
  @SerialName("normal") Normal,
  @SerialName("danger") Danger,
  @SerialName("mystic") Mystic,
  @SerialName("dream") Dream,
  @SerialName("tense") Tense,
  @SerialName("somber") Somber,
  @SerialName("dark") Dark,
  @SerialName("hopeful") Hopeful,
  @SerialName("peaceful") Peaceful,
  @SerialName("bittersweet") Bittersweet
}

@Serializable
enum class SceneTag {
  @SerialName("station_end") StationEnd,
  @SerialName("control") Control,
  @SerialName("reveal") Reveal,
  @SerialName("drift_variant") DriftVariant,
  @SerialName("drift_seed") DriftSeed,
  @SerialName("interlude") Interlude,
  @SerialName("secret") Secret,
  @SerialName("setup") Setup,
  @SerialName("announcement") Announcement,
  @SerialName("ending") Ending,
  @SerialName("terminal") Terminal,
  @SerialName("hub") Hub,
  @SerialName("investigation") Investigation,
  @SerialName("event") Event,
  @SerialName("special_path") SpecialPath,
  @SerialName("emma_thread") EmmaThread
}

@Serializable
enum class EffectType {
  @SerialName("inc") Inc,
  @SerialName("dec") Dec,
  @SerialName("set") Set,
  @SerialName("clamp") Clamp
}

@Serializable
enum class EffectTarget {
  @SerialName("mut") Mut,
  @SerialName("wissen") Wissen,
  @SerialName("empathie") Empathie,
  @SerialName("tickets_truth") TicketsTruth,
  @SerialName("tickets_escape") TicketsEscape,
  @SerialName("tickets_guilt") TicketsGuilt,
  @SerialName("tickets_love") TicketsLove,
  @SerialName("conductor_attention") ConductorAttention,
  @SerialName("memory_drift") MemoryDrift,
  @SerialName("hub_investigations") HubInvestigations,
  @SerialName("train_explorations") TrainExplorations,
  @SerialName("rel_comp7") RelComp7,
  @SerialName("rel_boy") RelBoy,
  @SerialName("rel_sleepless") RelSleepless,
  @SerialName("has_recorder") HasRecorder,
  @SerialName("has_tag19") HasTag19,
  @SerialName("has_ticket") HasTicket,
  @SerialName("photo_anomaly") PhotoAnomaly,
  @SerialName("played_recorder") PlayedRecorder,
  @SerialName("memory_search_active") MemorySearchActive,
  @SerialName("emma_memory_unlocked") EmmaMemoryUnlocked,
  @SerialName("stance_bold") StanceBold,
  @SerialName("stance_cautious") StanceCautious,
  
  // Hub 1: Bahnsteig (K1 Redesign)
  @SerialName("investigated_board") InvestigatedBoard,
  @SerialName("investigated_poster") InvestigatedPoster,
  @SerialName("investigated_person") InvestigatedPerson,
  @SerialName("investigated_device") InvestigatedDevice,
  @SerialName("investigated_edge") InvestigatedEdge,
  @SerialName("called_emma") CalledEmma,
  @SerialName("saw_emma_vision") SawEmmaVision,
  @SerialName("has_emma_note") HasEmmaNote,
  @SerialName("knows_board_pattern") KnowsBoardPattern,
  
  // Hub 2: Zug (K1 Redesign)
  @SerialName("explored_compartment") ExploredCompartment,
  @SerialName("explored_sleepless") ExploredSleepless,
  @SerialName("explored_passengers") ExploredPassengers,
  @SerialName("explored_comp7") ExploredComp7,
  @SerialName("knows_sleepless_warning") KnowsSleeplessWarning,
  @SerialName("saw_passenger_loop") SawPassengerLoop,
  @SerialName("heard_comp7_scratching") HeardComp7Scratching,
  
  @SerialName("chapter_index") ChapterIndex,
  @SerialName("station_count") StationCount
}

@Serializable
enum class ComparisonOperator {
  @SerialName("==") Eq,
  @SerialName("!=") Neq,
  @SerialName(">") Gt,
  @SerialName("<") Lt,
  @SerialName(">=") Gte,
  @SerialName("<=") Lte
}

@Serializable
enum class ChoiceWeight {
  @SerialName("neutral") Neutral,
  @SerialName("riskant") Riskant,
  @SerialName("irreversibel") Irreversibel
}

@Serializable
data class PlayerStats(
  val mut: Int = 5,
  val wissen: Int = 3,
  val empathie: Int = 4
)

@Serializable
data class Tickets(
  val tickets_truth: Int = 0,
  val tickets_escape: Int = 0,
  val tickets_guilt: Int = 0,
  val tickets_love: Int = 0
) {
  fun total(): Int = tickets_truth + tickets_escape + tickets_guilt + tickets_love
}

@Serializable
data class Pressure(
  val conductor_attention: Int = 0,
  val memory_drift: Int = 0,
  val hub_investigations: Int = 0,  // K1 Redesign: Bahnsteig hub counter
  val train_explorations: Int = 0   // K1 Redesign: Zug hub counter
)

@Serializable
data class Relations(
  val rel_comp7: Int = 0,
  val rel_boy: Int = 0,
  val rel_sleepless: Int = 0
)

@Serializable
data class Items(
  val has_recorder: Boolean = false,
  val has_tag19: Boolean = false,
  val has_ticket: Boolean = false,
  val photo_anomaly: Boolean = false,
  val played_recorder: Boolean = false,
  val memory_search_active: Boolean = false,
  val emma_memory_unlocked: Boolean = false,
  val stance_bold: Boolean = false,
  val stance_cautious: Boolean = false,
  
  // Hub 1: Bahnsteig (K1 Redesign)
  val investigated_board: Boolean = false,
  val investigated_poster: Boolean = false,
  val investigated_person: Boolean = false,
  val investigated_device: Boolean = false,
  val investigated_edge: Boolean = false,
  val called_emma: Boolean = false,
  val saw_emma_vision: Boolean = false,
  val has_emma_note: Boolean = false,
  val knows_board_pattern: Boolean = false,
  
  // Hub 2: Zug (K1 Redesign)
  val explored_compartment: Boolean = false,
  val explored_sleepless: Boolean = false,
  val explored_passengers: Boolean = false,
  val explored_comp7: Boolean = false,
  val knows_sleepless_warning: Boolean = false,
  val saw_passenger_loop: Boolean = false,
  val heard_comp7_scratching: Boolean = false
)

@Serializable
data class HistoryEntry(
  val scene_id: String,
  val choice_id: String,
  val timestamp: Long,
  val state_delta: GameState? = null
)

@Serializable
data class GameState(
  val stats: PlayerStats,
  val tickets: Tickets,
  val pressure: Pressure,
  val relations: Relations,
  val items: Items,
  val current_scene_id: String,
  val visited_scene_ids: List<String>,
  val chapter_index: Int,
  val station_count: Int,
  val history: List<HistoryEntry>,
  val isGameOver: Boolean,
  val endingId: String? = null,
  val save_version: Int
)

@Serializable
data class Effect(
  val type: EffectType,
  val target: EffectTarget,
  val value: JsonElement,
  val clamp_min: Int? = null,
  val clamp_max: Int? = null,
  val note: String? = null
) {
  fun valueAsInt(): Int {
    val primitive = value as? JsonPrimitive
    return primitive?.intOrNull
      ?: error("Effect value for ${target.name} must be an integer")
  }

  fun valueAsBoolean(): Boolean {
    val primitive = value as? JsonPrimitive
    return primitive?.booleanOrNull
      ?: error("Effect value for ${target.name} must be a boolean")
  }
}

@Serializable
sealed class Condition {
  @Serializable
  @SerialName("compare")
  data class Compare(
    val target: EffectTarget,
    val operator: ComparisonOperator,
    val value: JsonElement
  ) : Condition()

  @Serializable
  @SerialName("bool")
  data class Bool(
    val target: EffectTarget,
    val value: Boolean
  ) : Condition()

  @Serializable
  @SerialName("and")
  data class And(
    val conditions: List<Condition>
  ) : Condition()

  @Serializable
  @SerialName("or")
  data class Or(
    val conditions: List<Condition>
  ) : Condition()
}

@Serializable
data class NarrativeVariant(
  val min_drift: Int? = null,
  val condition: Condition? = null,
  val narrative: String,
  val priority: Int? = null,
  val auto_next: String? = null  // Hub auto-transition feature
)

@Serializable
data class Choice(
  val id: String? = null,
  val label: String? = null,
  val weight: ChoiceWeight? = null,
  val condition: Condition? = null,
  val effects: List<Effect>? = null,
  val next: String? = null,
  val ending: String? = null
)

@Serializable
data class Scene(
  val id: String,
  val chapter: Int,
  val title: String,
  val narrative: String,
  val choices: List<Choice>,
  val atmosphere: Atmosphere? = null,
  val narrative_variants: List<NarrativeVariant>? = null,
  val tags: List<SceneTag>? = null,
  val state_notes: List<String>? = null,
  val entry_effects: List<Effect>? = null,
  val exit_effects: List<Effect>? = null,
  val announcement: String? = null
)

@Serializable
data class Ending(
  val id: String,
  val title: String,
  val narrative: String
)

@Serializable
data class ChapterInfo(
  val number: Int,
  val title: String,
  val scene_count: Int? = null
)

@Serializable
data class Manifest(
  val id: String,
  val title: String,
  val start_scene_id: String,
  val chapters: List<ChapterInfo>
)

@Serializable
data class StoryExport(
  val manifest: Manifest,
  val scenes: List<Scene>,
  val endings: Map<String, Ending>
)

@Serializable
data class StoryContent(
  val manifest: Manifest,
  val scenes: List<Scene>,
  val scenesById: Map<String, Scene>,
  val endings: Map<String, Ending>
)

@Serializable
enum class ReaderMode {
  SCROLL,  // Bestehender scroll-basierter Flow
  STORY    // Neu: Beat-basiert mit Tap-to-advance
}

@Serializable
data class ReaderSettings(
  val textSizeSp: Float = 18f,
  val reduceMotion: Boolean = false,
  val immersionFx: Boolean = true,
  val enforceReadBeforeChoices: Boolean = true,
  val showStatus: Boolean = true,
  val showMicrobar: Boolean = false,
  val showRelations: Boolean = false,
  val readerMode: ReaderMode = ReaderMode.STORY,
  val typewriterEnabled: Boolean = true,
  val typewriterSpeed: Float = 1.0f  // 0.5x - 2.0x
)

@Serializable
data class GameSave(
  val current_scene_id: String,
  val state: GameState,
  val history: List<HistoryEntry>
)

fun Choice.resolvedWeight(): ChoiceWeight {
  weight?.let { return it }

  if (ending != null || next?.startsWith("ending_") == true) {
    return ChoiceWeight.Irreversibel
  }

  val effectList = effects.orEmpty()
  val hasIrreversibleEffect = effectList.any { effect ->
    effect.target == EffectTarget.ChapterIndex && effect.type == EffectType.Set
  }
  if (hasIrreversibleEffect) {
    return ChoiceWeight.Irreversibel
  }

  val hasRiskyEffect = effectList.any { effect ->
    val intValue = effect.intValueOrNull()
    when (effect.target) {
      EffectTarget.MemoryDrift -> {
        when (effect.type) {
          EffectType.Set, EffectType.Clamp -> true
          EffectType.Inc, EffectType.Dec -> intValue?.let { abs(it) >= 2 } == true
        }
      }
      EffectTarget.ConductorAttention -> {
        when (effect.type) {
          EffectType.Set, EffectType.Clamp -> true
          EffectType.Inc, EffectType.Dec -> intValue?.let { abs(it) >= 2 } == true
        }
      }
      EffectTarget.StationCount -> {
        when (effect.type) {
          EffectType.Set -> intValue?.let { it >= 1 } == true
          EffectType.Inc -> intValue?.let { it >= 1 } == true
          else -> false
        }
      }
      else -> false
    }
  }

  return if (hasRiskyEffect) ChoiceWeight.Riskant else ChoiceWeight.Neutral
}

private fun Effect.intValueOrNull(): Int? {
  val primitive = value as? JsonPrimitive ?: return null
  return primitive.intOrNull
}

fun createInitialState(startSceneId: String): GameState {
  return GameState(
    stats = PlayerStats(mut = 5, wissen = 3, empathie = 4),
    tickets = Tickets(tickets_truth = 0, tickets_escape = 0, tickets_guilt = 0, tickets_love = 0),
    pressure = Pressure(conductor_attention = 0, memory_drift = 0),
    relations = Relations(rel_comp7 = 0, rel_boy = 0, rel_sleepless = 0),
    items = Items(
      has_recorder = false,
      has_tag19 = false,
      has_ticket = false,
      photo_anomaly = false,
      played_recorder = false,
      memory_search_active = false,
      emma_memory_unlocked = false,
      stance_bold = false,
      stance_cautious = false
    ),
    current_scene_id = startSceneId,
    visited_scene_ids = emptyList(),
    chapter_index = 1,
    station_count = 0,
    history = emptyList(),
    isGameOver = false,
    endingId = null,
    save_version = 1
  )
}
