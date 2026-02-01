# MCP Server - Implementationsübersicht

## Implementierte MCP-Server

### 1. story-validator
- **Datei**: `src/mcp/servers/StoryValidatorMCPServer.ts`
- **Tools**:
  - `validate` - Validiert die komplette Story
  - `validateChapter` - Validiert ein einzelnes Kapitel
  - `validateScene` - Validiert eine einzelne Szene
  - `checkCanonRule` - Prüft eine spezifische Canon Rule (R1-R4)
- **Validiert**:
  - Canon Rules (R1-R4)
  - Graph-Invarianten (keine Dead-Ends, alle Referenzen existieren)
  - Schema-Validierung (Effects nutzen nur bekannte Variablen)
  - Narrative Konsistenz

### 2. content-auditor
- **Datei**: `src/mcp/servers/ContentAuditorMCPServer.ts`
- **Tools**:
  - `analyzeStateFlow` - Analysiert wie State-Variablen durch die Story fließen
  - `checkCallbacks` - Prüft ob alle State-Änderungen ein Echo haben
  - `checkNarrativeConsistency` - Prüft auf narrative Widersprüche
  - `analyzeChapter` - Führt eine komplette Analyse eines Kapitels durch
  - `generateReport` - Generiert einen kompletten Audit-Report
- **Analysiert**:
  - State-Flow für alle Variablen (tickets_*, relations, pressure, items)
  - Callback-Integrität (R3)
  - Narrative Konsistenz (Widersprüche, Kontinuität)

### 3. pacing-analyzer
- **Datei**: `src/mcp/servers/PacingAnalyzerMCPServer.ts`
- **Tools**:
  - `analyzeChapter` - Analysiert Pacing und Spielzeit eines Kapitels
  - `analyzeAllChapters` - Analysiert Pacing und Spielzeit aller Kapitel
  - `checkChapterLength` - Prüft ob ein Kapitel die 20+ Minuten Regel erfüllt
  - `analyzeChoiceDensity` - Analysiert Choice-Dichte pro Kapitel
  - `generatePacingReport` - Generiert einen kompletten Pacing-Report
- **Analysiert**:
  - Spielzeit (Formel: Wörter/190 + Choices*0.15)
  - Choice-Dichte (Choices/Scene)
  - Word-Density (Wörter/Scene)
  - Szenenanzahl (Ziel: 22-28)
  - Längen-Compliance (Ziel: 20+ Minuten)

### 4. choice-auditor
- **Datei**: `src/mcp/servers/ChoiceAuditorMCPServer.ts`
- **Tools**:
  - `detectFakeChoices` - Erkennt potenzielle Fake-Choices
  - `checkCallbackIntegrity` - Prüft ob Choices mit Effects ein späteres Echo haben
  - `analyzeChoiceDensity` - Analysiert Choice-Dichte pro Kapitel
  - `validateChoices` - Validiert alle Choices auf Konsistenz
  - `generateChoiceReport` - Generiert einen kompletten Choice-Audit-Report
- **Prüft**:
  - Fake-Choices (gleicher next ohne Unterschied)
  - Identische Choices (gleicher next/ending/effects)
  - Callback-Integrität (state_notes für Effects)
  - Choice-Validierung (next/ending existieren, label vorhanden)
  - Choice-Dichte (Ziel: >= 1.0)

## MCP Infrastruktur

### Core-Komponenten

1. **MCPServerBase** (`src/mcp/MCPServerBase.ts`)
   - Abstrakte Basisklasse für alle MCP-Server
   - Bietet gemeinsame Funktionalität (Parameter-Validierung, Error-Handling)
   - Definiert Interfaces: IMCPServer, MCPContext, MCPServerMetadata

2. **MCPServerRegistry** (`src/mcp/MCPServerRegistry.ts`)
   - Zentrales Register für alle MCP-Server
   - Singleton-Pattern
   - Registriert alle Server automatisch

3. **MCP CLI** (`scripts/mcp_cli.ts`)
   - CLI-Schnittstelle für alle MCP-Server
   - Bietet Shortcuts für häufige Operationen
   - Output-Formate: console, json, markdown

4. **Smoke-Test** (`scripts/mcp_smoke_test.ts`)
   - Testet alle MCP-Server
   - Prüft Metadata, Tools und Ausführung
   - Wird vor dem Build ausgeführt

## npm Scripts

```json
{
  "mcp": "tsx scripts/mcp_cli.ts",
  "mcp:list": "tsx scripts/mcp_cli.ts list",
  "mcp:validate": "tsx scripts/mcp_cli.ts validate",
  "mcp:validate-chapter": "tsx scripts/mcp_cli.ts validate-chapter",
  "mcp:analyze-state": "tsx scripts/mcp_cli.ts analyze-state",
  "mcp:check-callbacks": "tsx scripts/mcp_cli.ts check-callbacks",
  "mcp:analyze-pacing": "tsx scripts/mcp_cli.ts analyze-pacing",
  "mcp:check-length": "tsx scripts/mcp_cli.ts check-length",
  "mcp:detect-fake-choices": "tsx scripts/mcp_cli.ts detect-fake-choices",
  "mcp:check-callback-integrity": "tsx scripts/mcp_cli.ts check-callback-integrity",
  "mcp:analyze-choices": "tsx scripts/mcp_cli.ts analyze-choices",
  "mcp:report": "tsx scripts/mcp_cli.ts report",
  "mcp:smoke-test": "tsx scripts/mcp_smoke_test.ts"
}
```

## Validierungsergebnisse

### Smoke-Test
```
✅ Bestanden: 4
❌ Fehlgeschlagen: 0
```

### Type-Check
```
tsc --noEmit
✅ Keine Errors
```

### Build
```
tsc
✅ Erfolgreich kompiliert
```

### Tests
```
vitest
✅ Test Files 2 passed
✅ Tests 22 passed
```

## Dokumentationsstruktur

```
docs/
├── NACHTZUG_19_RULES.md       # Canon Rules, Choice System, Pacing Rules
├── MCP_SERVERS.md               # Vollständige MCP-Server Dokumentation
├── MCP_GUIDE.md                # Schnellstart-Guide
└── MCP_EXAMPLES.md             # Praxisbeispiele

README.md                       # Projektübersicht mit MCP-Abschnitt
CLAUDE.md                       # Anleitung für Claude Code
```

## Integration in den Workflow

### Typischer Entwicklungszyklus

1. **Kapitel schreiben** in `src/content/nachtzug19/scenes/cX.ts`
2. **Canon Rules prüfen** mit `npm run mcp:validate-chapter X`
3. **Länge prüfen** mit `npm run mcp:check-length X`
4. **Pacing prüfen** mit `npm run mcp:analyze-choices X`
5. **Callbacks prüfen** mit `npm run mcp:check-callbacks X`
6. **Fake-Choices prüfen** mit `npm run mcp:detect-fake-choices X`
7. **Exportieren** mit `npm run export:story`

### CI-Integration

GitHub Actions können MCP-Checks automatisch ausführen:

```yaml
- name: MCP Smoke Test
  run: npm run mcp:smoke-test

- name: Validate Story
  run: npm run mcp:validate
```

## Future Work

Mögliche Erweiterungen:

1. **Ending Simulator** - Simuliert alle möglichen Endings
2. **Narrative Consistency Analyzer** - Erweiterte Konsistenz-Prüfung
3. **State Impact Analyzer** - Analysiert Entscheidungs-Einfluss auf Endings
4. **Visual Reports** - Graphische Darstellung von State-Flows
5. **CI Dashboard** - Web-Interface für MCP-Reports

## Zusammenfassung

✅ 4 MCP-Server implementiert  
✅ 19 Tools verfügbar  
✅ CLI mit 14 Shortcuts  
✅ Vollständige Dokumentation  
✅ Alle Tests bestanden  
✅ Build erfolgreich  

Die MCP-Server bieten eine leistungsstarke Infrastruktur für Content-Qualitätssicherung in NACHTZUG 19.
