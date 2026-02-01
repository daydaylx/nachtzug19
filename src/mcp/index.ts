// ============================================================================
// NACHTZUG 19 - MCP Index
// ============================================================================
// Re-exports für einfachen Import
// ============================================================================

import {
  MCPServerBase,
  MCPServerRegistry,
  MCPContext,
  MCPServerMetadata,
  MCPToolDefinition,
  MCPToolResult,
  IMCPServer
} from './MCPServerBase';

import {
  registerAllMCPServers,
  getMCPServerRegistry,
  listAllMCPServers,
  getMCPServer
} from './MCPServerRegistry';

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

// Type exports
export type {
  MCPContext,
  MCPServerMetadata,
  MCPToolDefinition,
  MCPToolResult,
  IMCPServer
};

// Value exports
export {
  MCPServerBase,
  MCPServerRegistry,
  registerAllMCPServers,
  getMCPServerRegistry,
  listAllMCPServers,
  getMCPServer,
  StoryValidatorMCPServer,
  ContentAuditorMCPServer,
  PacingAnalyzerMCPServer,
  ChoiceAuditorMCPServer
};
