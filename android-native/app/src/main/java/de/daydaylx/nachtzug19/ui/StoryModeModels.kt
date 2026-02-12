package de.daydaylx.nachtzug19.ui

import kotlinx.serialization.Serializable

/**
 * Story Mode Models
 *
 * UI-only state models for beat-based Story Mode.
 * These are separate from GameState to avoid TS/Kotlin engine synchronization issues.
 */

/**
 * Beat-Splitting result
 * Contains narrative split into beats and source for reference
 */
data class NarrativeBeats(
  val beats: List<String>,
  val sourceNarrative: String
)

/**
 * Beat Flow State Machine
 * Controls the reader flow in Story Mode
 */
enum class BeatPhase {
  LOADING,              // Initial loading state
  SCENE_READY,          // Beats loaded, ready to display
  BEAT_TYPING,          // Typewriter animation in progress
  BEAT_REVEALED,        // Current beat fully visible
  CHOICES_AVAILABLE,    // All beats shown, choices now visible
  CHOICE_COMMITTING,    // Processing choice selection
  ENDING                // Game over / ending reached
}

/**
 * Reader Progress (UI-only persistence)
 * Saved to DataStore for resume functionality
 */
@Serializable
data class ReaderProgress(
  val sceneId: String,
  val beatIndex: Int,
  val timestamp: Long = System.currentTimeMillis()
)

/**
 * Backlog Entry
 * Stores actual displayed beat text for backlog/history UI
 */
@Serializable
data class BacklogEntry(
  val timestamp: Long,
  val sceneId: String,
  val beatIndex: Int,
  val text: String
)
