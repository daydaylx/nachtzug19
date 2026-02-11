package de.daydaylx.nachtzug19.data

import kotlinx.serialization.json.Json

object StoryJson {
  val json: Json = Json {
    ignoreUnknownKeys = true
    isLenient = true
    explicitNulls = false
    coerceInputValues = true
    classDiscriminator = "type"
  }
}
