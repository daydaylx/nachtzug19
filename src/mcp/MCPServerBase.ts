// ============================================================================
// NACHTZUG 19 - MCP Server Base Interface
// ============================================================================
// Abstrakte Basisklasse für alle MCP-Server im NACHTZUG 19 Projekt
// ============================================================================

import {
  ScenesCollection,
  EndingsCollection,
  ValidationResult
} from '../domain/types';

/**
 * MCP Server Context - Enthält projektweite Daten für MCP-Server
 */
export interface MCPContext {
  projectPath: string;
  scenes: ScenesCollection;
  endings: EndingsCollection;
  startSceneId: string;
}

/**
 * MCP Server Metadata - Informationen über einen MCP-Server
 */
export interface MCPServerMetadata {
  id: string;              // Eindeutige ID (z.B. 'story-validator')
  name: string;             // Anzeigename
  description: string;      // Beschreibung
  version: string;          // Version
  author: string;           // Autor/Team
}

/**
 * MCP Tool Definition - Ein Tool, das ein MCP-Server bereitstellt
 */
export interface MCPToolDefinition {
  name: string;             // Tool-Name (z.B. 'validate')
  description: string;      // Was das Tool tut
  parameters: {             // Parameter-Schema
    [key: string]: {
      type: 'string' | 'number' | 'boolean' | 'array';
      description: string;
      required: boolean;
      default?: any;
    };
  };
}

/**
 * MCP Tool Result - Ergebnis eines Tool-Aufrufs
 */
export interface MCPToolResult {
  success: boolean;
  data?: any;
  errors?: string[];
  warnings?: string[];
  executionTime: number;    // Ausführungszeit in ms
}

/**
 * MCP Server Interface - Das Interface, das alle MCP-Server implementieren müssen
 */
export interface IMCPServer {
  getMetadata(): MCPServerMetadata;
  getTools(): MCPToolDefinition[];
  executeTool(toolName: string, params: Record<string, any>): Promise<MCPToolResult>;
}

/**
 * Abstrakte Basisklasse für MCP-Server mit gemeinsamer Funktionalität
 */
export abstract class MCPServerBase implements IMCPServer {
  protected context: MCPContext;

  constructor(context: MCPContext) {
    this.context = context;
  }

  /**
   * Muss von Subklassen implementiert werden
   */
  abstract getMetadata(): MCPServerMetadata;
  abstract getTools(): MCPToolDefinition[];

  /**
   * Default-Implementierung für Tool-Ausführung mit Error-Handling
   */
  async executeTool(toolName: string, params: Record<string, any>): Promise<MCPToolResult> {
    const startTime = Date.now();

    try {
      // Prüfe, ob Tool existiert
      const tools = this.getTools();
      const tool = tools.find(t => t.name === toolName);

      if (!tool) {
        return {
          success: false,
          errors: [`Tool '${toolName}' nicht gefunden in Server '${this.getMetadata().id}'`],
          executionTime: Date.now() - startTime
        };
      }

      // Validiere Parameter
      const validationError = this.validateParameters(tool, params);
      if (validationError) {
        return {
          success: false,
          errors: [validationError],
          executionTime: Date.now() - startTime
        };
      }

      // Führe Tool aus (wird von Subklassen implementiert)
      const partialResult = await this.executeToolInternal(toolName, params);

      return {
        success: partialResult.success ?? true,
        executionTime: Date.now() - startTime,
        data: partialResult.data,
        errors: partialResult.errors,
        warnings: partialResult.warnings
      };
    } catch (error) {
      return {
        success: false,
        errors: [`Fehler bei Ausführung von '${toolName}': ${error instanceof Error ? error.message : String(error)}`],
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * Muss von Subklassen implementiert werden - eigentliche Tool-Logik
   */
  protected abstract executeToolInternal(toolName: string, params: Record<string, any>): Promise<Partial<MCPToolResult>>;

  /**
   * Validiert Parameter gegen Tool-Definition
   */
  private validateParameters(tool: MCPToolDefinition, params: Record<string, any>): string | null {
    for (const [paramName, paramDef] of Object.entries(tool.parameters)) {
      // Prüfe Required
      if (paramDef.required && params[paramName] === undefined) {
        return `Parameter '${paramName}' ist erforderlich`;
      }

      // Prüfe Type (falls vorhanden und nicht null/undefined)
      if (params[paramName] !== undefined && params[paramName] !== null) {
        const expectedType = paramDef.type;
        const actualType = Array.isArray(params[paramName]) ? 'array' : typeof params[paramName];

        if (actualType !== expectedType) {
          return `Parameter '${paramName}' erwartet Typ '${expectedType}', hat aber '${actualType}'`;
        }
      }
    }

    return null;
  }

  /**
   * Hilfsmethode: Konvertiere ValidationResult zu MCPToolResult
   */
  protected validationResultToMCPResult(result: ValidationResult, executionTime: number): MCPToolResult {
    return {
      success: result.valid,
      executionTime,
      errors: result.errors.map(e => `${e.scene_id ? `[${e.scene_id}] ` : ''}${e.message}`),
      warnings: result.warnings.map(w => `${w.scene_id ? `[${w.scene_id}] ` : ''}${w.message}`),
      data: {
        errorCount: result.errors.length,
        warningCount: result.warnings.length,
        errors: result.errors,
        warnings: result.warnings
      }
    };
  }
}

/**
 * MCP Server Registry - Verwaltet alle registrierten MCP-Server
 */
export class MCPServerRegistry {
  private static instance: MCPServerRegistry;
  private servers: Map<string, IMCPServer> = new Map();

  private constructor() {}

  static getInstance(): MCPServerRegistry {
    if (!MCPServerRegistry.instance) {
      MCPServerRegistry.instance = new MCPServerRegistry();
    }
    return MCPServerRegistry.instance;
  }

  registerServer(server: IMCPServer): void {
    const metadata = server.getMetadata();
    this.servers.set(metadata.id, server);
  }

  getServer(id: string): IMCPServer | undefined {
    return this.servers.get(id);
  }

  getAllServers(): IMCPServer[] {
    return Array.from(this.servers.values());
  }

  getAllMetadata(): MCPServerMetadata[] {
    return Array.from(this.servers.values()).map(s => s.getMetadata());
  }
}
