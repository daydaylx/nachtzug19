# 🚂 NACHTZUG 19 (Android Edition)

**Ein immersives psychologisches Mystery-Adventure als Native Android App.**

> "Der Zug hält an Stationen, die es nicht gibt. Nach jedem Halt verändert sich ein Detail deiner Erinnerung."

Dieses Projekt ist eine **deterministische Interactive Fiction (IF) Engine**.
Die Architektur ist hybrid:
- **Content & Logik-Prototyping**: TypeScript (`src/content`, `src/domain`).
- **Runtime & UI**: Native Android (Kotlin) in `android-native/`.

---

## ✨ Features

### Story: NACHTZUG 19
- **Psychologisches Mystery**: Ein Zug, der offiziell nicht existiert. Stationen ohne Namen. Erinnerungen, die sich verändern.
- **Ticket-System**: Sammle keine Gegenstände, sondern Entscheidungsmuster (Wahrheit, Flucht, Schuld, Liebe).
- **Memory Drift**: Nach jeder Station verändert sich ein Detail – Namen, Gesichter, Erinnerungen kippen subtil.
- **7 Kapitel**: Vollständig implementiert mit ~24–29 Szenen pro Kapitel.
- **Tag 19 Power-Up**: Synästhetische Effekte und Anker-Mechanik.

### Architektur
- **Single Source of Truth**: Story-Content wird in TypeScript definiert (`src/content`).
- **JSON Pipeline**: Ein Build-Skript exportiert den Content in eine optimierte `story.json`.
- **Native Performance**: Die Android-App parst das JSON und rendert es nativ (keine WebView).
- **Automated Validation**: TypeScript-Tests stellen sicher, dass der Content konsistent ist, bevor er in die App gelangt.

---

## 🚀 Entwicklung & Build

### Voraussetzungen
- Node.js 18+
- JDK 17
- Android Studio (oder Gradle CLI)

### 1. Content Generieren
Der Content muss zuerst aus den TypeScript-Dateien in ein JSON-Format kompiliert werden, das die Android-App versteht.

```bash
# Abhängigkeiten installieren
npm install

# Story validieren und exportieren
npm run export:story
```

Dies erstellt `export/story.json` und kopiert es automatisch nach `android-native/app/src/main/assets/story.json`.

### 2. Android App bauen

**Via Kommandozeile:**
```bash
cd android-native
./gradlew assembleDebug
```
Die APK liegt dann unter `android-native/app/build/outputs/apk/debug/app-debug.apk`.

**Via Android Studio:**
1. Öffne den Ordner `android-native` in Android Studio.
2. Führe "Sync Gradle" aus.
3. Starte die App auf einem Emulator oder Gerät.

---

## 🛠️ Projektstruktur

```
.
├── src/                    # TypeScript Source (Content & Logic Validation)
│   ├── content/            # Die eigentliche Story (Kapitel 1-7)
│   └── domain/             # Typ-Definitionen und Validierungs-Logik
│
├── android-native/         # Native Android App (Kotlin)
│   ├── app/src/main/java/  # Kotlin Source Code (Engine, UI, Models)
│   └── app/src/main/assets # Hier landet die story.json
│
├── scripts/                # Build-Tools
│   ├── export_story_json.ts # Kompiliert TS -> JSON
│   └── validate.ts          # Prüft Content-Integrität
│
└── reports/                # QA & Status-Berichte
```

---

## 🧪 Testing

### Content & Logik (TypeScript)
Bevor die App gebaut wird, sollte der Content geprüft werden.

```bash
# Führt Validierung und Engine-Unit-Tests aus
npm test
```

### App (Kotlin)
Android-Tests befinden sich in `android-native/app/src/test`.

---

## 📝 Lizenz

**Code**: MIT License.
**Story & Inhalt**: Copyright beim Autor.
