# MCP Server - Schnellstart-Guide

Dieser Guide bietet einen schnellen Einstieg in die MCP (Model Context Protocol) Server von NACHTZUG 19.

## Was sind MCP-Server?

Die MCP-Server sind leistungsstarke Analyse-Tools, die automatisch:
- Die Einhaltung der Canon Rules (R1-R4) prüfen
- Pacing und Spielzeit (20+ Min/Kapitel) analysieren
- Fake-Choices und Missing Callbacks erkennen
- State-Flow durch die Story verfolgen

## Schnellstart

### 1. Installation

```bash
# Repository klonen
git clone https://github.com/your-repo/Nachtzug19.git
cd Nachtzug19

# Abhängigkeiten installieren
npm install

# Build
npm run build
```

### 2. Erste Schritte

```bash
# Smoke-Test - alle Server funktionieren?
npm run mcp:smoke-test

# Liste alle verfügbaren Server
npm run mcp:list

# Validiere die komplette Story
npm run mcp:validate
```

### 3. Typischer Workflow

```bash
# Kapitel validieren
npm run mcp:validate-chapter 3

# Pacing prüfen
npm run mcp:check-length 3

# Callbacks prüfen
npm run mcp:check-callbacks 3

# Fake-Choices erkennen
npm run mcp:detect-fake-choices

# Generiere Report
npm run mcp:report
```

## Server & Tools Übersicht

### story-validator

**Zweck**: Validiert Content gegen alle Canon Rules und Graph-Invarianten.

**Wann nutzen?**
- Nachdem du ein Kapitel geschrieben hast
- Bevor du Content exportierst
- Wenn du Graph-Probleme vermutest

**Beispiel:**
```bash
npm run mcp:validate                    # Komplette Story
npm run mcp:validate-chapter 3          # Nur Kapitel 3
npm run mcp:server story-validator checkCanonRule --rule R1  # Canon Rule R1 prüfen
```

### content-auditor

**Zweck**: Analysiert State-Flow, Callbacks, Narrative Konsistenz.

**Wann nutzen?**
- Wenn du wissen willst, wie Tickets durch die Story fließen
- Wenn du Callbacks für State-Änderungen prüfen willst
- Wenn du narrative Konsistenzprobleme vermutest

**Beispiel:**
```bash
npm run mcp:analyze-state tickets_truth    # Ticket-Flow analysieren
npm run mcp:analyze-state memory_drift     # Drift-Flow analysieren
npm run mcp:check-callbacks               # Alle Callbacks prüfen
npm run mcp:check-callbacks 3            # Nur Kapitel 3 prüfen
```

### pacing-analyzer

**Zweck**: Analysiert Pacing, Spielzeit (20+ Min/Kapitel), Szenen-Dichte.

**Wann nutzen?**
- Bevor du ein Kapitel abschließt
- Wenn du die 20+ Minuten Regel prüfen willst
- Wenn du Choice-Dichte optimieren willst

**Beispiel:**
```bash
npm run mcp:analyze-pacing                  # Alle Kapitel
npm run mcp:check-length 3                  # Prüfe 20 Minuten
npm run mcp:check-length 7 30               # Prüfe 30 Minuten
npm run mcp:analyze-choices 3                # Choice-Dichte
npm run mcp:report json pacing               # JSON-Export
```

### choice-auditor

**Zweck**: Überprüft Choices auf Fake-Choices, Callbacks, Konsistenz.

**Wann nutzen?**
- Nachdem du Choices erstellt hast
- Wenn du Fake-Choices vermutest
- Wenn du Choice-Integrität prüfen willst

**Beispiel:**
```bash
npm run mcp:detect-fake-choices             # Alle Kapitel
npm run mcp:detect-fake-choices 3          # Nur Kapitel 3
npm run mcp:check-callback-integrity         # Alle Kapitel
npm run mcp:check-callback-integrity 3      # Nur Kapitel 3
npm run mcp:validate-choices 3               # Choices validieren
```

## Beispiel: Vollständiger Kapitel-Workflow

Du hast Kapitel 4 fertiggestellt. Prüfe es:

```bash
# 1. Canon Rules prüfen
npm run mcp:validate-chapter 4

# 2. Länge prüfen
npm run mcp:check-length 4

# 3. Pacing prüfen
npm run mcp:analyze-pacing | grep "Kapitel 4"

# 4. Callbacks prüfen
npm run mcp:check-callbacks 4

# 5. Fake-Choices prüfen
npm run mcp:detect-fake-choices | grep "c4"

# 6. State-Flow analysieren (optional)
npm run mcp:analyze-state tickets_truth
```

Wenn alle Checks bestanden sind:

```bash
# Exportiere Story
npm run export:story
```

## Fehlerbehebung

### "Server nicht gefunden"
```bash
# Liste Server prüfen
npm run mcp:list

# Erwartete Ausgabe:
# 📦 story-validator (Story Validator)
# 📦 content-auditor (Content Auditor)
# 📦 pacing-analyzer (Pacing Analyzer)
# 📦 choice-auditor (Choice Auditor)
```

### "Tool nicht gefunden"
```bash
# Alle Tools eines Servers auflisten
npm run mcp server story-validator

# Erwartete Ausgabe:
# 🛠️ validate
# 🛠️ validateChapter
# 🛠️ validateScene
# 🛠️ checkCanonRule
```

### Type-Fehler bei Parametern
```bash
# Parameter prüfen
npm run mcp server pacing-analyzer checkChapterLength

# Erwartete Ausgabe zeigt alle Parameter:
# Parameter:
#   - chapter: number (erforderlich)
#   - targetMinutes: number (optional) [default: 20]
```

## Output-Formate

### Console (Default)
```bash
npm run mcp:analyze-pacing
```
Gibt formatierte Konsolen-Ausgabe mit Emojis und Farben.

### JSON
```bash
npm run mcp report json pacing
```
Gibt strukturiertes JSON für weitere Verarbeitung.

### Markdown
```bash
npm run mcp report markdown choice
```
Gibt Markdown-Format für Dokumentation.

## Weiterführende Ressourcen

- **[MCP_SERVERS.md](MCP_SERVERS.md)** - Vollständige Dokumentation aller Server und Tools
- **[NACHTZUG_19_RULES.md](NACHTZUG_19_RULES.md)** - Canon Rules und Specifications
- **[../README.md](../README.md)** - Projektübersicht und Setup

## Häufig gestellte Fragen

**Frage**: Muss ich MCP-Server nutzen?  
**Antwort**: Nein, aber sie sind sehr empfehlenswert für Content-Qualität.

**Frage**: Können MCP-Server neue Szenen erstellen?  
**Antwort**: Nein, sie analysieren nur bestehenden Content.

**Frage**: Warum gibt es Callback-Warnungen?  
**Antwort**: Eine State-Änderung ohne späteres Echo verletzt R3.

**Frage**: Was ist "Choice-Density"?  
**Antwort**: Durchschnittliche Anzahl an Choices pro Szene. Ziel: >= 1.0.

**Frage**: Kann ich eigene MCP-Server erstellen?  
**Antwort**: Ja, siehe `src/mcp/MCPServerBase.ts` für die Basisklasse.
