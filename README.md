# 🚂 NACHTZUG 19 (Android-Edition)

**Ein immersives psychologisches Mystery-Adventure als Native Android App.**

> "Der Zug hält an Stationen, die es nicht gibt. Nach jedem Halt verändert sich ein Detail deiner Erinnerung."

Dieses Projekt ist eine **deterministische Interactive Fiction (IF) Engine**.
Die Architektur ist hybrid:
- **Content & Logik-Prototyping**: TypeScript (`src/content`, `src/domain`).
- **Laufzeitumgebung & UI**: Native Android (Kotlin) in `android-native/`.

---

## ✨ Funktionen

### Story: NACHTZUG 19
- **Psychologisches Mystery**: Ein Zug, der offiziell nicht existiert. Stationen ohne Namen. Erinnerungen, die sich verändern.
- **Ticket-System**: Sammle keine Gegenstände, sondern Entscheidungsmuster (Wahrheit, Flucht, Schuld, Liebe).
- **Memory Drift**: Nach jeder Station verändert sich ein Detail – Namen, Gesichter, Erinnerungen kippen subtil.
- **7 Kapitel**: Vollständig implementiert mit ~24–29 Szenen pro Kapitel.
- **Tag 19 Power-Up**: Synästhetische Effekte und Anker-Mechanik.

### Architektur
- **Single Source of Truth**: Story-Content wird in TypeScript definiert (`src/content`).
- **JSON-Pipeline**: Ein Build-Skript exportiert den Content in eine optimierte `story.json`.
- **Native Performance**: Die Android-App parst das JSON und rendert es nativ (keine WebView).
- **Automatische Validierung**: TypeScript-Tests stellen sicher, dass der Content konsistent ist, bevor er in die App gelangt.
- **MCP-Server**: Fortgeschrittene Analyse-Tools für Content-Validierung, Pacing-Analyse und Callback-Tracking.

---

## 🚀 Entwicklung & Erstellung

### Voraussetzungen
- Node.js 18+
- JDK 17
- Android Studio (oder Gradle CLI)

### 1. Content generieren
Der Content muss zuerst aus den TypeScript-Dateien in ein JSON-Format kompiliert werden, das die Android-App versteht.

```bash
# Abhängigkeiten installieren
npm install

# Story validieren und exportieren
npm run export:story
```

Dies erstellt `export/story.json` und kopiert es automatisch nach `android-native/app/src/main/assets/story.json`.

### 2. Android App erstellen

**Über die Kommandozeile:**
```bash
cd android-native
./gradlew assembleDebug
```
Die APK liegt dann unter `android-native/app/build/outputs/apk/debug/app-debug.apk`.

**Über Android Studio:**
1. Öffne den Ordner `android-native` in Android Studio.
2. Führe "Sync Gradle" aus.
3. Starte die App auf einem Emulator oder Gerät.

---

## 🔍 MCP Server - Content Analyse & Validierung

NACHTZUG 19 verfügt über leistungsstarke MCP (Model Context Protocol) Server für tiefgreifende Content-Analysen. Diese Server automatisieren die Einhaltung der [Canon Rules](docs/NACHTZUG_19_RULES.md) und der [Length & Immersion Specification](docs/NACHTZUG_19_RULES.md).

### Verfügbare MCP-Server

| Server | Zweck | Tools |
|---------|--------|--------|
| **story-validator** | Validiert Content gegen alle Canon Rules (R1-R4) und Graph-Invarianten | `validate`, `validateChapter`, `validateScene`, `checkCanonRule` |
| **content-auditor** | Analysiert State-Flow, Callback-Tracking, Narrative Konsistenz | `analyzeStateFlow`, `checkCallbacks`, `checkNarrativeConsistency`, `analyzeChapter`, `generateReport` |
| **pacing-analyzer** | Analysiert Pacing, Spielzeit (20+ Min/Kapitel), Szenen-Dichte | `analyzeChapter`, `analyzeAllChapters`, `checkChapterLength`, `analyzeChoiceDensity`, `generatePacingReport` |
| **choice-auditor** | Überprüft Choices auf Fake-Choices, Callback-Integrität | `detectFakeChoices`, `checkCallbackIntegrity`, `analyzeChoiceDensity`, `validateChoices`, `generateChoiceReport` |

### Schnellstart mit MCP

```bash
# Liste alle verfügbaren MCP-Server
npm run mcp:list

# Validiere die komplette Story
npm run mcp:validate

# Analysiere Pacing aller Kapitel
npm run mcp:analyze-pacing

# Prüfe Kapitel-Länge
npm run mcp:check-length 3

# Erkenne Fake-Choices
npm run mcp:detect-fake-choices

# Generiere vollständigen Report
npm run mcp:report
```

### Typische Use Cases

**Bevor du Content exportierst:**
```bash
npm run mcp:validate              # Prüfe Canon Rules
npm run mcp:detect-fake-choices    # Finde Fake-Choices
npm run mcp:check-callbacks         # Prüfe Callback-Integrität
```

**Pacing-Optimierung:**
```bash
npm run mcp:analyze-pacing         # Prüfe 20+ Minuten Regel
npm run mcp:check-length 7 30     # Prüfe Kapitel 7 gegen 30 Minuten
npm run mcp:report json pacing     # Exportiere Pacing-Report als JSON
```

**State-Flow Analyse:**
```bash
npm run mcp:analyze-state tickets_truth    # Verfolge Tickets
npm run mcp:analyze-state memory_drift     # Analysiere Drift
npm run mcp:check-callbacks 3             # Prüfe Callbacks in Kapitel 3
```

### Vollständige Dokumentation

Für eine umfassende Dokumentation aller MCP-Server, Tools und Programmbeispiele siehe:
- **[docs/MCP_SERVERS.md](docs/MCP_SERVERS.md)** - Vollständige MCP-Server Dokumentation

### Smoke-Test

Führe einen Smoke-Test aus, um sicherzustellen, dass alle MCP-Server funktionieren:

```bash
npm run mcp:smoke-test
```

### Troubleshooting

**Problem**: "Server nicht gefunden"  
**Lösung**: Prüfe mit `npm run mcp:list` ob der Server registriert ist.

**Problem**: "Tool nicht gefunden"  
**Lösung**: Nutze `npm run mcp server <server-id>` um alle Tools eines Servers zu sehen.

---

## 🛠️ Projektstruktur

```
.
├── src/                    # TypeScript-Quellen (Content & Logik)
│   ├── content/            # Die eigentliche Story (Kapitel 1-7)
│   ├── domain/             # Typ-Definitionen und Validierungs-Logik
│   └── mcp/                # MCP Server Infrastruktur
│       ├── MCPServerBase.ts              # Abstrakte Basisklasse
│       ├── MCPServerRegistry.ts          # Zentrales Register
│       ├── servers/                    # Alle MCP-Server
│       │   ├── StoryValidatorMCPServer.ts
│       │   ├── ContentAuditorMCPServer.ts
│       │   ├── PacingAnalyzerMCPServer.ts
│       │   └── ChoiceAuditorMCPServer.ts
│       └── index.ts                    # Re-exports
│
├── android-native/         # Native Android App (Kotlin)
│   ├── app/src/main/java/  # Kotlin-Quellcode (Engine, UI, Modelle)
│   └── app/src/main/assets # Hier landet die story.json
│
├── scripts/                # Build- & Analyse-Werkzeuge
│   ├── export_story_json.ts # Kompiliert TS → JSON
│   ├── validate.ts          # Prüft Content-Integrität
│   ├── mcp_cli.ts          # CLI für MCP-Server
│   └── mcp_smoke_test.ts   # Smoke-Tests für MCP-Server
│
├── docs/                   # Dokumentation
│   ├── NACHTZUG_19_RULES.md            # Canon Rules & Specs
│   └── MCP_SERVERS.md                  # MCP-Server Dokumentation
│
└── reports/                # QA & Status-Berichte
```

---

## 🧪 Tests

### Content & Logik (TypeScript)
Bevor die App gebaut wird, sollte der Content geprüft werden.

```bash
# Führt Validierung und Engine-Unit-Tests aus
npm test

# Type-Check ohne Build
npm run type-check

# MCP Smoke-Tests
npm run mcp:smoke-test
```

### App (Kotlin)
Android-Tests befinden sich in `android-native/app/src/test`.

---

## 📖 Wichtige Dokumentation

- **[CLAUDE.md](CLAUDE.md)** - Anleitung für Claude Code bei der Arbeit mit Code
- **[docs/NACHTZUG_19_RULES.md](docs/NACHTZUG_19_RULES.md)** - Canon Rules (R1-R4), Choice System, Mobile Pacing Rules
- **[docs/MCP_SERVERS.md](docs/MCP_SERVERS.md)** - Vollständige MCP-Server Dokumentation
- **[docs/ANDROID_GUIDE.md](docs/ANDROID_GUIDE.md)** (falls vorhanden) - Android-Implementierungsdetails

---

## 🔄 Entwicklungstool-Workflow

Ein typischer Workflow beim Entwickeln eines neuen Kapitels:

1. **Kapitel schreiben** in `src/content/nachtzug19/scenes/cX.ts`
2. **Validieren** mit `npm run mcp:validate` und `npm run mcp:validate-chapter X`
3. **Pacing prüfen** mit `npm run mcp:check-length X` und `npm run mcp:analyze-choices`
4. **Callbacks prüfen** mit `npm run mcp:check-callbacks X`
5. **Exportieren** mit `npm run export:story`
6. **Testen** in der Android-App

---

## 📝 Lizenz

**Code**: MIT-Lizenz.  
**Story & Inhalt**: Copyright beim Autor.

---

## 🤝 Beiträge

Beiträge sind willkommen! Bitte:
1. Lesen Sie [CLAUDE.md](CLAUDE.md) für Anleitungen
2. Befolgen Sie die [Canon Rules](docs/NACHTZUG_19_RULES.md)
3. Führen Sie `npm test` und `npm run mcp:smoke-test` aus, bevor Sie einen PR erstellen
