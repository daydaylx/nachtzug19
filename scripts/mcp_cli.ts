#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - MCP CLI
// ============================================================================
// Command-Line Interface für MCP-Server
// ============================================================================

import { loadNachtzug19Story } from '../src/domain/engine/loadStory.js';
import {
  registerAllMCPServers,
  listAllMCPServers,
  getMCPServer
} from '../src/mcp/index.js';

/**
 * Hauptfunktion
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printHelp();
    process.exit(0);
  }

  // Lade Story
  console.log('🔍 Lade NACHTZUG 19 Story...\n');
  const story = await loadNachtzug19Story();

  // Registriere alle MCP-Server
  const context = {
    projectPath: process.cwd(),
    scenes: story.scenes,
    endings: story.endings,
    startSceneId: story.startSceneId
  };

  registerAllMCPServers(context);

  const command = args[0];

  switch (command) {
    case 'list':
      listServers();
      break;

    case 'server': {
      const serverId = args[1];
      const toolName = args[2];

      if (!serverId) {
        console.error('❌ Server-ID fehlt');
        console.log('   Verwendung: npm run mcp server <server-id> <tool-name> [params...]\n');
        process.exit(1);
      }

      if (!toolName) {
        // List Tools des Servers
        listServerTools(serverId);
      } else {
        // Führe Tool aus
        const params = parseParams(args.slice(3));
        await executeTool(serverId, toolName, params);
      }
      break;
    }

    case 'validate':
      // Alias für story-validator validate
      await executeTool('story-validator', 'validate', { printOutput: true });
      break;

    case 'validate-chapter': {
      const chapter = parseInt(args[1]);
      if (isNaN(chapter)) {
        console.error('❌ Ungültige Kapitel-Nummer');
        process.exit(1);
      }
      await executeTool('story-validator', 'validateChapter', { chapter, printOutput: true });
      break;
    }

    case 'analyze-state': {
      const target = args[1] || null;
      await executeTool('content-auditor', 'analyzeStateFlow', { target, printOutput: true });
      break;
    }

    case 'check-callbacks': {
      const chapter = args[1] ? parseInt(args[1]) : null;
      await executeTool('content-auditor', 'checkCallbacks', { chapter, printOutput: true });
      break;
    }

    case 'analyze-pacing': {
      const chapter = args[1] ? parseInt(args[1]) : null;
      if (chapter) {
        await executeTool('pacing-analyzer', 'analyzeChapter', { chapter, printOutput: true });
      } else {
        await executeTool('pacing-analyzer', 'analyzeAllChapters', { printOutput: true });
      }
      break;
    }

    case 'check-length': {
      const chapter = parseInt(args[1]);
      const targetMinutes = args[2] ? parseInt(args[2]) : 20;
      if (isNaN(chapter)) {
        console.error('❌ Ungültige Kapitel-Nummer');
        process.exit(1);
      }
      await executeTool('pacing-analyzer', 'checkChapterLength', { chapter, targetMinutes });
      break;
    }

    case 'detect-fake-choices': {
      const chapter = args[1] ? parseInt(args[1]) : null;
      await executeTool('choice-auditor', 'detectFakeChoices', { chapter, printOutput: true });
      break;
    }

    case 'check-callback-integrity': {
      const chapter = args[1] ? parseInt(args[1]) : null;
      await executeTool('choice-auditor', 'checkCallbackIntegrity', { chapter, printOutput: true });
      break;
    }

    case 'analyze-choices': {
      const chapter = args[1] ? parseInt(args[1]) : null;
      await executeTool('choice-auditor', 'analyzeChoiceDensity', { chapter, printOutput: true });
      break;
    }

    case 'report': {
      const format = args[1] || 'console';
      const server = args[2];

      if (server === 'pacing') {
        await executeTool('pacing-analyzer', 'generatePacingReport', { format });
      } else if (server === 'choice') {
        await executeTool('choice-auditor', 'generateChoiceReport', { format });
      } else if (server === 'content') {
        await executeTool('content-auditor', 'generateReport', { format });
      } else {
        // Full Report
        console.log('\n' + '='.repeat(60));
        console.log('🔍 NACHTZUG 19 - Vollständiger MCP Report');
        console.log('='.repeat(60) + '\n');

        await executeTool('pacing-analyzer', 'generatePacingReport', { format: 'console' });
        console.log('\n' + '-'.repeat(60) + '\n');
        await executeTool('choice-auditor', 'generateChoiceReport', { format: 'console' });
        console.log('\n' + '-'.repeat(60) + '\n');
        await executeTool('content-auditor', 'generateReport', { format: 'console' });
      }
      break;
    }

    case 'help':
    case '--help':
    case '-h':
      printHelp();
      break;

    default:
      console.error(`❌ Unbekannter Befehl: ${command}`);
      console.log('   Nutze "npm run mcp help" für eine Liste aller Befehle\n');
      process.exit(1);
  }
}

/**
 * Gibt Hilfe aus
 */
function printHelp(): void {
  console.log(`
🔍 NACHTZUG 19 - MCP CLI
=========================

Verwendung: npm run mcp <command> [options]

Befehle:
  list                                Liste alle verfügbaren MCP-Server
  server <server-id> [tool-name]       Führt ein Tool eines Servers aus
  validate                            Validiert die komplette Story
  validate-chapter <chapter>           Validiert ein einzelnes Kapitel

  analyze-state [target]               Analysiert State-Flow (optional: target)
  check-callbacks [chapter]            Prüft Callback-Integrität

  analyze-pacing [chapter]              Analysiert Pacing (optional: chapter)
  check-length <chapter> [target]       Prüft Kapitel-Länge (default: 20 min)

  detect-fake-choices [chapter]         Erkennt Fake-Choices
  check-callback-integrity [chapter]     Prüft Choice Callbacks
  analyze-choices [chapter]             Analysiert Choice-Dichte

  report [format] [server]             Generiert Report (format: console/json/markdown)
                                      server: pacing/choice/content (optional)

  help                                Zeigt diese Hilfe

Beispiele:
  npm run mcp list
  npm run mcp validate
  npm run mcp validate-chapter 3
  npm run mcp analyze-state tickets_truth
  npm run mcp analyze-pacing
  npm run mcp check-length 3
  npm run mcp detect-fake-choices
  npm run mcp report json pacing
  npm run mcp report markdown

Server:
  story-validator                      Validiert Content gegen Canon Rules
  content-auditor                     Analysiert State-Flow, Callbacks, Konsistenz
  pacing-analyzer                     Analysiert Pacing, Spielzeit, Dichte
  choice-auditor                      Überprüft Choices auf Fake-Choices, Callbacks

Tools:
  Nutze "npm run mcp server <server-id>" um alle Tools eines Servers zu sehen
`);
}

/**
 * Listet alle MCP-Server
 */
function listServers(): void {
  const servers = listAllMCPServers();

  console.log('\n🔍 Verfügbare MCP-Server:\n');

  servers.forEach(server => {
    console.log(`📦 ${server.id} (${server.name})`);
    console.log(`   ${server.description}`);
    console.log(`   Version: ${server.version}`);
    console.log('');
  });
}

/**
 * Listet Tools eines Servers
 */
function listServerTools(serverId: string): void {
  const server = getMCPServer(serverId);

  if (!server) {
    console.error(`❌ Server '${serverId}' nicht gefunden`);
    process.exit(1);
  }

  const metadata = server.getMetadata();
  const tools = server.getTools();

  console.log(`\n🔍 Tools für Server: ${metadata.name} (${serverId})\n`);

  tools.forEach((tool: any) => {
    console.log(`🛠️  ${tool.name}`);
    console.log(`   ${tool.description}`);

    if (Object.keys(tool.parameters).length > 0) {
      console.log('   Parameter:');
      Object.entries(tool.parameters).forEach(([paramName, paramDef]: [string, any]) => {
        const required = paramDef.required ? ' (erforderlich)' : ' (optional)';
        const defaultVal = paramDef.default !== undefined ? ` [default: ${paramDef.default}]` : '';
        console.log(`     - ${paramName}: ${paramDef.type}${required}${defaultVal}`);
        console.log(`       ${paramDef.description}`);
      });
    }

    console.log('');
  });
}

/**
 * Führt ein Tool aus
 */
async function executeTool(serverId: string, toolName: string, params: Record<string, any>): Promise<void> {
  const server = getMCPServer(serverId);

  if (!server) {
    console.error(`❌ Server '${serverId}' nicht gefunden`);
    process.exit(1);
  }

  console.log(`🔍 Führe aus: ${serverId} > ${toolName}\n`);

  const result = await server.executeTool(toolName, params);

  if (result.success) {
    console.log(`\n✅ Erfolgreich ausgeführt (${result.executionTime}ms)`);
  } else {
    console.error(`\n❌ Fehlgeschlagen (${result.executionTime}ms)`);
  }

  if (result.errors && result.errors.length > 0) {
    console.error('\n❌ Errors:');
    result.errors.forEach((err: any) => console.error(`  - ${err}`));
  }

  if (result.warnings && result.warnings.length > 0) {
    console.warn('\n⚠️  Warnings:');
    result.warnings.forEach((warn: any) => console.warn(`  - ${warn}`));
  }
}

/**
 * Parse Parameter aus Args
 */
function parseParams(args: string[]): Record<string, any> {
  const params: Record<string, any> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];

      if (nextArg && !nextArg.startsWith('--')) {
        // Wert-Parameter
        const value = parseValue(nextArg);
        params[key] = value;
        i++; // Überspringe nächsten Arg
      } else {
        // Boolean-Flag
        params[key] = true;
      }
    } else if (arg.startsWith('-')) {
      // Short-Flag
      params[arg.slice(1)] = true;
    }
  }

  return params;
}

/**
 * Parse einen Wert
 */
function parseValue(value: string): any {
  if (value === 'true') return true;
  if (value === 'false') return false;
  const num = parseInt(value);
  if (!isNaN(num)) return num;
  return value;
}

// Starte
main().catch(error => {
  console.error('❌ Fehler:', error);
  process.exit(1);
});
