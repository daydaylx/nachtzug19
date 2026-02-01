# NACHTZUG 19 - MCP Server Dokumentation

## Überblick

Die MCP (Model Context Protocol) Server für NACHTZUG 19 bieten leistungsstarke Tools zur Analyse, Validierung und Optimierung des Story-Contents. Sie basieren auf der hybriden Architektur (TypeScript Content + Kotlin Android) und unterstützen die Einhaltung der [Canon Rules](../docs/NACHTZUG_19_RULES.md) und [Length & Immersion Specification](../docs/NACHTZUG_19_RULES.md#4-length--immersion-specifications).

## Verfügbare MCP-Server

### 1. Story Validator (`story-validator`)

**Zweck**: Validiert Story-Content gegen alle Canon Rules (R1-R4) und Graph-Invarianten.

**Tools**:
- `validate` - Validiert die komplette Story gegen alle Canon Rules und Graph-Invarianten
- `validateChapter` - Validiert ein einzelnes Kapitel
- `validateScene` - Validiert eine einzelne Szene
- `checkCanonRule` - Prüft eine spezifische Canon Rule (R1, R2, R3, R4)

**Warum sinnvoll?**
- Gewährleistet die Einhaltung der Canon Rules, die das NACHTZUG 19 Experience definieren
- Erkennt Dead-Ends, Endlosloops und Graph-Probleme
- Baut auf existing `validateContent.ts` auf und erweitert es mit MCP-Server-Funktionalität

### 2. Content Auditor (`content-auditor`)

**Zweck**: Führt tiefgreifende Analysen durch: State-Flow, Callback-Tracking, Narrative Konsistenz.

**Tools**:
- `analyzeStateFlow` - Analysiert wie State-Variablen durch die Story fließen
- `checkCallbacks` - Prüft ob alle State-Änderungen ein Echo (Callback) haben
- `checkNarrativeConsistency` - Prüft auf narrative Widersprüche und Kontinuitätsprobleme
- `analyzeChapter` - Führt eine komplette Analyse eines Kapitels durch
- `generateReport` - Generiert einen kompletten Audit-Report für die gesamte Story

**Warum sinnvoll?**
- Identifiziert State-Änderungen ohne späteres Echo (R3-Verletzungen)
- Verfolgt, wie Tickets, Relations, und Items durch die Story fließen
- Erkennt narrative Konsistenzprobleme
- Stellt sicher, dass jeder State-Änderung ein Callback hat

### 3. Pacing Analyzer (`pacing-analyzer`)

**Zweck**: Analysiert Pacing, Spielzeit (20+ Min/Kapitel), Szenen-Dichte, Choice-Dichte.

**Tools**:
- `analyzeChapter` - Analysiert Pacing und Spielzeit eines Kapitels
- `analyzeAllChapters` - Analysiert Pacing und Spielzeit aller Kapitel
- `checkChapterLength` - Prüft ob ein Kapitel die 20+ Minuten Regel erfüllt
- `analyzeChoiceDensity` - Analysiert Choice-Dichte pro Kapitel
- `generatePacingReport` - Generiert einen kompletten Pacing-Report

**Warum sinnvoll?**
- Stellt sicher, dass jedes Kapitel die 20+ Minuten Regel erfüllt
- Analysiert Spielzeit basierend auf Wörtern und Choices (190 Wörter/Min + 9 Sek/Choice)
- Prüft Choice-Dichte (Ziel: >= 1 Choice pro Scene)
- Generiert konkrete Empfehlungen zur Längenerweiterung

### 4. Choice Auditor (`choice-auditor`)

**Zweck**: Überprüft Choices auf Fake-Choices, Callback-Integrität, Choice-Dichte.

**Tools**:
- `detectFakeChoices` - Erkennt potenzielle Fake-Choices (gleicher next ohne Unterschied)
- `checkCallbackIntegrity` - Prüft ob Choices mit Effects ein späteres Echo haben
- `analyzeChoiceDensity` - Analysiert Choice-Dichte pro Kapitel
- `validateChoices` - Validiert alle Choices auf Konsistenz und完整性
- `generateChoiceReport` - Generiert einen kompletten Choice-Audit-Report

**Warum sinnvoll?**
- Erkennt Fake-Choices, die suggerieren, unterschiedlich zu sein, aber technisch identisch sind
- Stellt sicher, dass keine "leeren" Choices existieren
- Prüft Choice-Dichte (Ziel: 22-28 Szenen/Kapitel)
- Validiert, dass alle Choices gültige next/ending-Referenzen haben

## Installation

Die MCP-Server sind bereits Teil des NACHTZUG 19 Repositories. Keine zusätzliche Installation erforderlich.

## Verwendung

### CLI-Schnittstelle

```bash
# Liste alle verfügbaren MCP-Server
npm run mcp:list

# Validiere die komplette Story
npm run mcp:validate

# Validiere ein einzelnes Kapitel
npm run mcp:validate-chapter 3

# Analysiere State-Flow
npm run mcp:analyze-state tickets_truth

# Prüfe Callback-Integrität
npm run mcp:check-callbacks

# Analysiere Pacing aller Kapitel
npm run mcp:analyze-pacing

# Prüfe Kapitel-Länge
npm run mcp:check-length 3

# Erkenne Fake-Choices
npm run mcp:detect-fake-choices

# Analysiere Choice-Dichte
npm run mcp:analyze-choices

# Generiere vollständigen Report
npm run mcp:report
```

### Erweiterte CLI

```bash
# Generiere Report als JSON
npm run mcp report json pacing
npm run mcp report markdown choice

# Nutze einen bestimmten Server direkt
npm run mcp server story-validator validate
npm run mcp server content-auditor analyzeStateFlow --target tickets_truth
```

### Programmatische Verwendung

```typescript
import { loadNachtzug19Story } from './domain/engine/loadStory';
import {
  registerAllMCPServers,
  getMCPServer
} from './mcp';

// Lade Story
const story = await loadNachtzug19Story();

// Registriere MCP-Server
const context = {
  projectPath: process.cwd(),
  scenes: story.scenes,
  endings: story.endings,
  startSceneId: story.startSceneId
};

registerAllMCPServers(context);

// Führe Tool aus
const server = getMCPServer('story-validator');
const result = await server.executeTool('validate', { printOutput: true });

if (result.success) {
  console.log('✅ Validierung erfolgreich');
} else {
  console.log('❌ Validierung fehlgeschlagen');
}
```

## Smoke-Test

Führe einen Smoke-Test aus, um sicherzustellen, dass alle MCP-Server funktionieren:

```bash
npm run mcp:smoke-test
```

## Build

Baue das TypeScript-Projekt:

```bash
npm run build
```

## Tests

Führe alle Tests aus:

```bash
npm test
```

## Beispiele

### Beispiel 1: Validiere ein Kapitel

```bash
npm run mcp:validate-chapter 3
```

Output:
```
🔍 Lade NACHTZUG 19 Story...

🔍 === Story Validator: Kapitel 3 (XX Szenen) ===

✅ Content-Validierung erfolgreich

Zusammenfassung: 0 Errors, 0 Warnings
```

### Beispiel 2: Analysiere Pacing aller Kapitel

```bash
npm run mcp:analyze-pacing
```

Output:
```
🔍 Lade NACHTZUG 19 Story...

🔍 === Pacing Analysis: alle Kapitel ===

✅ Kapitel 1: 32.5 min (22 Szenen, 45 Choices)
✅ Kapitel 2: 28.3 min (25 Szenen, 38 Choices)
...

Durchschnitt: 30.2 Choices/Scene
```

### Beispiel 3: Erkenne Fake-Choices

```bash
npm run mcp:detect-fake-choices
```

Output:
```
🔍 Lade NACHTZUG 19 Story...

🔍 === Fake Choice Detection: alle Kapitel ===

Total Choices: 245
Potenzielle Fake-Choices: 3 (1.2%)

⚠️  3 Probleme gefunden:

⚠️  [c2_s03_corridor] "Nach links": Choice führt zur selben Szene "c2_s04_corridor" wie andere Choices und hat keine Effekte.
...
```

## Architektur

Die MCP-Server basieren auf einer konsistenten Architektur:

- **MCPServerBase**: Abstrakte Basisklasse für alle MCP-Server
- **IMCPServer**: Interface, das alle MCP-Server implementieren müssen
- **MCPContext**: Projektweite Daten (scenes, endings, startSceneId)
- **MCPServerRegistry**: Zentrales Register für alle MCP-Server

Jeder MCP-Server:
- Implementiert `IMCPServer`
- Erweitert `MCPServerBase`
- Bietet eine oder mehrere Tools
- Hat Metadata (ID, Name, Description, Version)

## Canon Rules

Die MCP-Server prüfen automatisch folgende Canon Rules:

### R1: Drift After Stations
Jedes Kapitel-Ende erhöht `memory_drift` automatisch.

### R2: Controls at Chapters 2, 3, 5
Feste Kontrollpunkte (Schaffner) in Kapiteln 2, 3, 5.

### R3: Every Choice Has Callback
Keine Choice ohne sichtbare Konsequenz später.

### R4: Train Never Lies Directly
Der Zug (NPCs, Durchsagen, Hinweise) lügt nicht plump, sondern **verschiebt Bedeutung**.

## Troubleshooting

### Problem: "Server nicht gefunden"

Lösung: Prüfe mit `npm run mcp:list` ob der Server registriert ist.

### Problem: "Tool nicht gefunden"

Lösung: Nutze `npm run mcp server <server-id>` um alle Tools eines Servers zu sehen.

### Problem: "Parameter fehlt"

Lösung: Nutze `npm run mcp server <server-id> <tool-name>` um alle Parameter eines Tools zu sehen.

## Weiterentwicklung

Mögliche zukünftige MCP-Server:

- **Ending Simulator** - Simuliert alle möglichen Endings und deren Bedingungen
- **Narrative Consistency Analyzer** - Erweiterte narrative Konsistenz-Prüfung
- **State Impact Analyzer** - Analysiert wie Entscheidungen den State verändern

## Lizenz

MIT License - siehe [LICENSE](../LICENSE) für Details.

## Autor

NACHTZUG 19 Team
