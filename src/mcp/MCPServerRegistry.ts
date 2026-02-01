// ============================================================================
// NACHTZUG 19 - MCP Server Registry
// ============================================================================
// Zentraler Einstiegspunkt für alle MCP-Server
// ============================================================================

import {
  MCPServerRegistry
} from './MCPServerBase';

import {
  StoryValidatorMCPServer
} from './servers/StoryValidatorMCPServer';

import {
  ContentAuditorMCPServer
} from './servers/ContentAuditorMCPServer';

import {
  PacingAnalyzerMCPServer
} from './servers/PacingAnalyzerMCPServer';

import {
  ChoiceAuditorMCPServer
} from './servers/ChoiceAuditorMCPServer';

/**
 * Registriert alle MCP-Server
 */
export function registerAllMCPServers(context: import('./MCPServerBase').MCPContext): void {
  const registry = MCPServerRegistry.getInstance();

  // Story Validator
  const storyValidator = new StoryValidatorMCPServer(context);
  registry.registerServer(storyValidator);

  // Content Auditor
  const contentAuditor = new ContentAuditorMCPServer(context);
  registry.registerServer(contentAuditor);

  // Pacing Analyzer
  const pacingAnalyzer = new PacingAnalyzerMCPServer(context);
  registry.registerServer(pacingAnalyzer);

  // Choice Auditor
  const choiceAuditor = new ChoiceAuditorMCPServer(context);
  registry.registerServer(choiceAuditor);
}

/**
 * Gibt die MCP Server Registry zurück
 */
export function getMCPServerRegistry(): MCPServerRegistry {
  return MCPServerRegistry.getInstance();
}

/**
 * Listet alle verfügbaren MCP-Server auf
 */
export function listAllMCPServers(): any[] {
  const registry = MCPServerRegistry.getInstance();
  return registry.getAllMetadata();
}

/**
 * Gibt einen spezifischen MCP-Server zurück
 */
export function getMCPServer(serverId: string): any {
  const registry = MCPServerRegistry.getInstance();
  return registry.getServer(serverId);
}
