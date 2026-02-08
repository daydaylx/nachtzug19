package de.daydaylx.nachtzug19.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.intOrNull

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
  @SerialName("terminal") Terminal
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
data class PlayerStats(
  val mut: Int,
  val wissen: Int,
  val empathie: Int
)

@Serializable
data class Tickets(
  val tickets_truth: Int,
  val tickets_escape: Int,
  val tickets_guilt: Int,
  val tickets_love: Int
) {
  fun total(): Int = tickets_truth + tickets_escape + tickets_guilt + tickets_love
}

@Serializable
data class Pressure(
  val conductor_attention: Int,
  val memory_drift: Int
)

@Serializable
data class Relations(
  val rel_comp7: Int,
  val rel_boy: Int,
  val rel_sleepless: Int
)

@Serializable
data class Items(
  val has_recorder: Boolean,
  val has_tag19: Boolean,
  val has_ticket: Boolean,
  val photo_anomaly: Boolean,
  val played_recorder: Boolean,
  val memory_search_active: Boolean,
  val emma_memory_unlocked: Boolean
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
  val replace_mode: String? = null
)

@Serializable
data class Choice(
  val id: String? = null,
  val label: String? = null,
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
data class ReaderSettings(
  val textSizeSp: Float = 18f,
  val reduceMotion: Boolean = false,
  val immersionFx: Boolean = true,
  val showStatus: Boolean = true,
  val showRelations: Boolean = false
)

@Serializable
data class GameSave(
  val current_scene_id: String,
  val state: GameState,
  val history: List<HistoryEntry>
)

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
      emma_memory_unlocked = false
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
