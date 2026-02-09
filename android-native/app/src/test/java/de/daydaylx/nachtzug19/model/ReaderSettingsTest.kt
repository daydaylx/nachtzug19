package de.daydaylx.nachtzug19.model

import de.daydaylx.nachtzug19.data.StoryJson
import kotlinx.serialization.decodeFromString
import org.junit.Assert.assertFalse
import org.junit.Test

class ReaderSettingsTest {
  @Test
  fun microbarIsOffByDefault() {
    assertFalse(ReaderSettings().showMicrobar)
  }

  @Test
  fun legacySettingsKeepMicrobarOffWhenFieldIsMissing() {
    val legacySettingsJson = """
      {
        "textSizeSp": 18.0,
        "reduceMotion": false,
        "immersionFx": true,
        "showStatus": true,
        "showRelations": false
      }
    """.trimIndent()

    val decoded = StoryJson.json.decodeFromString<ReaderSettings>(legacySettingsJson)

    assertFalse(decoded.showMicrobar)
  }
}
