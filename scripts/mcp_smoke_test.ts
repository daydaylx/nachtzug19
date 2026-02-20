#!/usr/bin/env tsx
// ============================================================================
// NACHTZUG 19 - MCP Smoke Test
// ============================================================================
// Führt Smoke-Tests für alle MCP-Server durch
// ============================================================================

import { loadNachtzug19Story } from '../src/domain/engine/loadStory.js';
import {
  registerAllMCPServers,
  listAllMCPServers,
  getMCPServer
} from '../src/mcp/index.js';

/**
 * Smoke-Test
 */
async function runSmokeTest(): Promise<boolean> {
  console.log('\n🔥 === MCP Server Smoke Test ===\n');

  let passed = 0;
  let failed = 0;

  const testPlanByServer: Record<string, { name: string; params: Record<string, any> }> = {
    'story-validator': {
      name: 'validate',
      params: { printOutput: false }
    },
    'content-auditor': {
      name: 'analyzeStateFlow',
      params: { target: 'tickets_truth', printOutput: false }
    },
    'pacing-analyzer': {
      name: 'analyzeChapter',
      params: { chapter: 1, printOutput: false }
    },
    'choice-auditor': {
      name: 'generateChoiceReport',
      params: { format: 'console' }
    }
  };

  // 1. Lade Story
  console.log('1️⃣  Lade Story...');
  try {
    const story = await loadNachtzug19Story();
    console.log(`   ✅ Story geladen: ${Object.keys(story.scenes).length} Szenen\n`);
  } catch (error) {
    console.error(`   ❌ Fehler beim Laden der Story:`, error);
    return false;
  }

  // 2. Registriere alle Server
  console.log('2️⃣  Registriere MCP-Server...');
  try {
    const story = await loadNachtzug19Story();
    const context = {
      projectPath: process.cwd(),
      scenes: story.scenes,
      endings: story.endings,
      startSceneId: story.startSceneId
    };

    registerAllMCPServers(context);

    const servers = listAllMCPServers();
    console.log(`   ✅ ${servers.length} Server registriert\n`);

    // 3. Teste jeden Server
    console.log('3️⃣  Teste MCP-Server...\n');

    for (const serverMeta of servers) {
      console.log(`   📦 ${serverMeta.id}: ${serverMeta.name}`);

      try {
        const server = getMCPServer(serverMeta.id);
        if (!server) {
          console.log(`      ❌ Server konnte nicht geladen werden`);
          failed++;
          continue;
        }

        // Prüfe Metadata
        const metadata = server.getMetadata();
        if (!metadata.id || !metadata.name || !metadata.description) {
          console.log(`      ❌ Metadata unvollständig`);
          failed++;
          continue;
        }

        // Prüfe Tools
        const tools = server.getTools();
        if (tools.length === 0) {
          console.log(`      ❌ Keine Tools definiert`);
          failed++;
          continue;
        }

        console.log(`      ✅ ${tools.length} Tools verfügbar`);

        const plannedTool = testPlanByServer[serverMeta.id];
        if (!plannedTool) {
          console.log(`      ❌ Kein Smoke-Testplan für Server '${serverMeta.id}'`);
          failed++;
          continue;
        }

        const toolDef = tools.find((t: any) => t.name === plannedTool.name);
        if (!toolDef) {
          console.log(`      ❌ Tool '${plannedTool.name}' nicht gefunden`);
          failed++;
          continue;
        }

        console.log(`      🧪 Teste Tool: ${plannedTool.name}...`);
        const result = await server.executeTool(plannedTool.name, plannedTool.params);

        if (result.success === undefined || typeof result.success !== 'boolean') {
          console.log(`      ❌ Tool hat kein gültiges success-Feld`);
          failed++;
        } else if (result.executionTime === undefined || typeof result.executionTime !== 'number') {
          console.log(`      ❌ Tool hat kein gültiges executionTime-Feld`);
          failed++;
        } else if (!result.success) {
          const firstError = result.errors?.[0] || 'Unbekannter Fehler';
          console.log(`      ❌ Tool fehlgeschlagen: ${firstError}`);
          failed++;
        } else {
          console.log(`      ✅ Tool ausgeführt (${result.executionTime}ms)`);
          passed++;
        }
      } catch (error) {
        console.log(`      ❌ Fehler: ${error}`);
        failed++;
      }

      console.log('');
    }

    // 4. Zusammenfassung
    console.log('4️⃣  Zusammenfassung:');
    console.log(`   ✅ Bestanden: ${passed}`);
    console.log(`   ❌ Fehlgeschlagen: ${failed}`);

    const allPassed = failed === 0;

    if (allPassed) {
      console.log('\n🎉 Alle Smoke-Tests bestanden!\n');
    } else {
      console.log('\n❌ Einige Tests fehlgeschlagen!\n');
    }

    return allPassed;
  } catch (error) {
    console.error(`   ❌ Fehler bei MCP-Server Registrierung:`, error);
    return false;
  }
}

// Starte
runSmokeTest().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Smoke Test fehlgeschlagen:', error);
  process.exit(1);
});
