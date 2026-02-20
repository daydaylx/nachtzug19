plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
  id("org.jetbrains.kotlin.plugin.serialization")
}

import java.io.FileInputStream
import java.util.Properties

fun readReleaseSigningValue(key: String, envKey: String): String? {
  val localPropsFile = rootProject.file("local.properties")
  val localProps = Properties()
  if (localPropsFile.exists()) {
    FileInputStream(localPropsFile).use { localProps.load(it) }
  }

  val fromLocal = localProps.getProperty(key)?.trim()
  if (!fromLocal.isNullOrEmpty()) return fromLocal

  val fromEnv = System.getenv(envKey)?.trim()
  if (!fromEnv.isNullOrEmpty()) return fromEnv

  return null
}

val releaseStoreFileRaw = readReleaseSigningValue("RELEASE_STORE_FILE", "NACHTZUG_RELEASE_STORE_FILE")
val releaseStorePassword = readReleaseSigningValue("RELEASE_STORE_PASSWORD", "NACHTZUG_RELEASE_STORE_PASSWORD")
val releaseKeyAlias = readReleaseSigningValue("RELEASE_KEY_ALIAS", "NACHTZUG_RELEASE_KEY_ALIAS")
val releaseKeyPassword = readReleaseSigningValue("RELEASE_KEY_PASSWORD", "NACHTZUG_RELEASE_KEY_PASSWORD")

val hasReleaseSigning = !releaseStoreFileRaw.isNullOrBlank()
  && !releaseStorePassword.isNullOrBlank()
  && !releaseKeyAlias.isNullOrBlank()
  && !releaseKeyPassword.isNullOrBlank()

val releaseStoreFile = releaseStoreFileRaw?.let { path ->
  val candidate = file(path)
  if (candidate.isAbsolute) candidate else rootProject.file(path)
}

android {
  namespace = "de.daydaylx.nachtzug19"
  compileSdk = 35

  signingConfigs {
    create("release") {
      if (hasReleaseSigning && releaseStoreFile != null) {
        storeFile = releaseStoreFile
        storePassword = releaseStorePassword
        keyAlias = releaseKeyAlias
        keyPassword = releaseKeyPassword
      }
    }
  }

  defaultConfig {
    applicationId = "de.daydaylx.nachtzug19"
    minSdk = 26
    targetSdk = 35
    versionCode = 1
    versionName = "1.0.0"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
      )
      // Für lokale RC-Builds fallback auf debug-signing; Store-Release muss per assertReleaseSigningConfigured abgesichert werden.
      signingConfig = if (hasReleaseSigning) signingConfigs.getByName("release") else signingConfigs.getByName("debug")
      manifestPlaceholders["appLabel"] = "Nachtzug 19"
    }
    create("player") {
      isMinifyEnabled = true
      isShrinkResources = true
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
      )
      manifestPlaceholders["appLabel"] = "Nachtzug 19"
      signingConfig = signingConfigs.getByName("debug")
    }
    debug {
      manifestPlaceholders["appLabel"] = "Nachtzug 19 Dev"
      applicationIdSuffix = ".dev"
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  kotlinOptions {
    jvmTarget = "17"
  }

  buildFeatures {
    compose = true
  }

  composeOptions {
    kotlinCompilerExtensionVersion = "1.5.14"
  }

  packaging {
    resources {
      excludes += "/META-INF/{AL2.0,LGPL2.1}"
    }
  }
}

dependencies {
  implementation(platform("androidx.compose:compose-bom:2024.10.00"))
  implementation("androidx.activity:activity-compose:1.9.3")
  implementation("androidx.compose.ui:ui")
  implementation("androidx.compose.ui:ui-tooling-preview")
  implementation("androidx.compose.material:material-icons-extended")
  implementation("androidx.compose.material3:material3")
  implementation("androidx.navigation:navigation-compose:2.8.3")
  implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.6")
  implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.6")
  implementation("androidx.datastore:datastore-preferences:1.1.1")
  implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
  implementation("androidx.compose.ui:ui-text-google-fonts:1.7.5")

  debugImplementation("androidx.compose.ui:ui-tooling")
  debugImplementation("androidx.compose.ui:ui-test-manifest")

  testImplementation("junit:junit:4.13.2")
}

val storySource = rootProject.file("../export/story.json")
val storyAssetsDir = layout.projectDirectory.dir("src/main/assets")

tasks.register<Copy>("syncStoryAssets") {
  onlyIf { storySource.exists() }
  from(storySource)
  into(storyAssetsDir)
  rename { "story.json" }
}

tasks.register("printReleaseSigningStatus") {
  doLast {
    if (hasReleaseSigning && releaseStoreFile != null && releaseStoreFile.exists()) {
      println("✅ Release signing configured: ${releaseStoreFile.absolutePath}")
    } else {
      println("⚠️  Release signing NOT configured.")
      println("Set one of:")
      println("- local.properties keys: RELEASE_STORE_FILE, RELEASE_STORE_PASSWORD, RELEASE_KEY_ALIAS, RELEASE_KEY_PASSWORD")
      println("- env vars: NACHTZUG_RELEASE_STORE_FILE, NACHTZUG_RELEASE_STORE_PASSWORD, NACHTZUG_RELEASE_KEY_ALIAS, NACHTZUG_RELEASE_KEY_PASSWORD")
      if (releaseStoreFile != null && !releaseStoreFile.exists()) {
        println("Configured store file does not exist: ${releaseStoreFile.absolutePath}")
      }
    }
  }
}

tasks.register("assertReleaseSigningConfigured") {
  doLast {
    if (!hasReleaseSigning || releaseStoreFile == null || !releaseStoreFile.exists()) {
      throw GradleException(
        "Release signing missing. Configure RELEASE_* in local.properties or NACHTZUG_RELEASE_* env vars."
      )
    }
  }
}

tasks.matching { it.name.startsWith("merge") && it.name.endsWith("Assets") }.configureEach {
  dependsOn("syncStoryAssets")
}
