// ============================================================================
// NACHTZUG 19 - MCP Server: Story Validator
// ============================================================================
// Validiert Story-Content gegen alle Canon Rules (R1-R4), Graph-Invarianten,
// und Schema-Validierung. Baut auf validateContent.ts auf.
// ============================================================================

import {
  MCPServerBase,
  MCPServerMetadata,
  MCPToolDefinition,
  MCPToolResult
} from '../MCPServerBase';

import {
  validateContent,
  printValidationResult
} from '../../domain/engine/validateContent';

/**
 * MCP Server: Story Validator
 *
 * Validiert Story-Content auf:
 * - Canon Rules (R1-R4)
 * - Graph-Invarianten (keine Dead-Ends, alle Referenzen existieren)
 * - Schema-Validierung (Effects nutzen nur bekannte Variablen)
 * - Narrative Konsistenz (keine Widersprüche)
 */
export class StoryValidatorMCPServer extends MCPServerBase {
  getMetadata(): MCPServerMetadata {
    return {
      id: 'story-validator',
      name: 'Story Validator',
      description: 'Validiert Story-Content gegen alle Canon Rules und Graph-Invarianten',
      version: '1.0.0',
      author: 'NACHTZUG 19 Team'
    };
  }

  getTools(): MCPToolDefinition[] {
    return [
      {
        name: 'validate',
        description: 'Validiert die komplette Story gegen alle Canon Rules und Graph-Invarianten',
        parameters: {
          printOutput: {
            type: 'boolean',
            description: 'Ob das Ergebnis in der Konsole ausgegeben werden soll',
            required: false,
            default: true
          }
        }
      },
      {
        name: 'validateChapter',
        description: 'Validiert ein einzelnes Kapitel',
        parameters: {
          chapter: {
            type: 'number',
            description: 'Kapitel-Nummer (1-7)',
            required: true
          },
          printOutput: {
            type: 'boolean',
            description: 'Ob das Ergebnis in der Konsole ausgegeben werden soll',
            required: false,
            default: true
          }
        }
      },
      {
        name: 'validateScene',
        description: 'Validiert eine einzelne Szene',
        parameters: {
          sceneId: {
            type: 'string',
            description: 'Scene ID (z.B. "c1_s01_platform")',
            required: true
          }
        }
      },
      {
        name: 'checkCanonRule',
        description: 'Prüft eine spezifische Canon Rule (R1-R4)',
        parameters: {
          rule: {
            type: 'string',
            description: 'Regel-Nummer (R1, R2, R3, oder R4)',
            required: true
          },
          printOutput: {
            type: 'boolean',
            description: 'Ob das Ergebnis in der Konsole ausgegeben werden soll',
            required: false,
            default: true
          }
        }
      }
    ];
  }

  protected async executeToolInternal(toolName: string, params: Record<string, any>): Promise<Partial<MCPToolResult>> {

    switch (toolName) {
      case 'validate':
        return await this.validateAll(params.printOutput ?? true);

      case 'validateChapter':
        return await this.validateChapter(params.chapter, params.printOutput ?? true);

      case 'validateScene':
        return await this.validateScene(params.sceneId);

      case 'checkCanonRule':
        return await this.checkCanonRule(params.rule, params.printOutput ?? true);

      default:
        return {
          success: false,
          errors: [`Unbekanntes Tool: ${toolName}`]
        };
    }
  }

  /**
   * Validiert die komplette Story
   */
  private async validateAll(printOutput: boolean) {
    const result = validateContent(
      this['context'].startSceneId,
      this['context'].scenes,
      this['context'].endings
    );

    if (printOutput) {
      console.log('\n🔍 === Story Validator: Komplette Validierung ===\n');
      printValidationResult(result);
    }

    return this['validationResultToMCPResult'](result, Date.now() - Date.now());
  }

  /**
   * Validiert ein einzelnes Kapitel
   */
  private async validateChapter(chapter: number, printOutput: boolean) {
    // Filtere Szenen nach Kapitel
    const chapterScenes: Record<string, any> = {};
    let sceneCount = 0;

    Object.entries(this['context'].scenes).forEach(([sceneId, scene]: [string, any]) => {
      if (scene.chapter === chapter) {
        chapterScenes[sceneId] = scene;
        sceneCount++;
      }
    });

    if (sceneCount === 0) {
      return {
        success: false,
        errors: [`Kapitel ${chapter} hat keine Szenen`],
        data: { chapter, sceneCount: 0 }
      };
    }

    const result = validateContent(
      this['context'].startSceneId,
      chapterScenes,
      this['context'].endings
    );

    if (printOutput) {
      console.log(`\n🔍 === Story Validator: Kapitel ${chapter} (${sceneCount} Szenen) ===\n`);
      printValidationResult(result);
    }

    return this['validationResultToMCPResult'](result, Date.now() - Date.now());
  }

  /**
   * Validiert eine einzelne Szene
   */
  private async validateScene(sceneId: string) {
    const scene = this['context'].scenes[sceneId];

    if (!scene) {
      return {
        success: false,
        errors: [`Szene '${sceneId}' existiert nicht`]
      };
    }

    // Extrahiere Szene und ihre Nachfolger
    const scenesSubset: Record<string, any> = {
      [sceneId]: scene
    };

    // Füge alle von dieser Szene erreichbaren Szenen hinzu
    const visited = new Set<string>([sceneId]);
    const queue = [sceneId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentScene = this['context'].scenes[currentId];

      if (!currentScene) continue;

      currentScene.choices.forEach((choice: any) => {
        if (choice.next && !visited.has(choice.next)) {
          visited.add(choice.next);
          queue.push(choice.next);
          scenesSubset[choice.next] = this['context'].scenes[choice.next];
        }
      });
    }

    const result = validateContent(
      sceneId,
      scenesSubset,
      this['context'].endings
    );

    return this['validationResultToMCPResult'](result, Date.now() - Date.now());
  }

  /**
   * Prüft eine spezifische Canon Rule
   */
  private async checkCanonRule(rule: string, printOutput: boolean) {
    const validRules = ['R1', 'R2', 'R3', 'R4'];

    if (!validRules.includes(rule)) {
      return {
        success: false,
        errors: [`Ungültige Canon Rule: ${rule} (erlaubt: ${validRules.join(', ')})`]
      };
    }

    const result = validateContent(
      this['context'].startSceneId,
      this['context'].scenes,
      this['context'].endings
    );

    // Filtere Errors/Warnings nach Canon Rule
    const ruleErrors = result.errors.filter((e: any) => e.message.includes('Canon Rule') && e.message.includes(rule));
    const ruleWarnings = result.warnings.filter((w: any) => w.message.includes('Canon Rule') && w.message.includes(rule));

    if (printOutput) {
      console.log(`\n🔍 === Story Validator: Canon Rule ${rule} ===\n`);

      if (ruleErrors.length === 0 && ruleWarnings.length === 0) {
        console.log(`✅ Canon Rule ${rule} wird eingehalten`);
      } else {
        if (ruleErrors.length > 0) {
          console.log(`❌ Canon Rule ${rule} verletzt:`);
          ruleErrors.forEach((err: any) => console.log(`  - ${err.message}`));
        }
        if (ruleWarnings.length > 0) {
          console.log(`⚠️  Warnungen zu ${rule}:`);
          ruleWarnings.forEach((warn: any) => console.log(`  - ${warn.message}`));
        }
      }
    }

    return {
      success: ruleErrors.length === 0,
      errors: ruleErrors.map((e: any) => e.message),
      warnings: ruleWarnings.map((w: any) => w.message),
      data: {
        rule,
        violationCount: ruleErrors.length,
        warningCount: ruleWarnings.length
      }
    };
  }
}
