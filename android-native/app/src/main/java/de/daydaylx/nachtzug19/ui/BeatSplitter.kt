package de.daydaylx.nachtzug19.ui

/**
 * Beat Splitter Utility
 *
 * Splits narrative text into digestible "beats" for Story Mode.
 * Strategy:
 * 1. Primary split on double newlines (paragraphs)
 * 2. Long paragraphs further split into sentence groups
 * 3. Cap total beats per scene
 */
object BeatSplitter {
  private const val LONG_BEAT_THRESHOLD = 500  // characters
  private const val MAX_BEATS_PER_SCENE = 40

  /**
   * Split narrative into beats
   * @param narrative Source narrative text (resolvedNarrative from engine)
   * @return NarrativeBeats containing split beats and source
   */
  fun splitIntoBeats(narrative: String): NarrativeBeats {
    if (narrative.isBlank()) {
      return NarrativeBeats(
        beats = emptyList(),
        sourceNarrative = narrative
      )
    }

    // 1. Split on double newlines (paragraphs)
    val paragraphs = narrative
      .split("\n\n")
      .map { it.trim() }
      .filter { it.isNotBlank() }

    // 2. Process long paragraphs (split into sentence groups)
    val beats = mutableListOf<String>()
    for (para in paragraphs) {
      if (para.length > LONG_BEAT_THRESHOLD) {
        beats.addAll(splitLongParagraph(para))
      } else {
        beats.add(para)
      }
    }

    // 3. Cap total beats
    val capped = beats.take(MAX_BEATS_PER_SCENE)

    return NarrativeBeats(
      beats = capped,
      sourceNarrative = narrative
    )
  }

  /**
   * Split long paragraph into sentence groups
   * @param text Long paragraph text
   * @return List of sentence groups
   */
  private fun splitLongParagraph(text: String): List<String> {
    // Split after sentence-ending punctuation (. ! ?)
    val sentences = text.split(Regex("(?<=[.!?])\\s+"))
    val groups = mutableListOf<String>()
    var current = ""

    for (sentence in sentences) {
      // If adding this sentence exceeds threshold, flush current group
      if (current.length + sentence.length > LONG_BEAT_THRESHOLD) {
        if (current.isNotEmpty()) {
          groups.add(current.trim())
        }
        current = sentence
      } else {
        current += if (current.isEmpty()) sentence else " $sentence"
      }
    }

    // Add final group
    if (current.isNotEmpty()) {
      groups.add(current.trim())
    }

    return groups
  }
}
