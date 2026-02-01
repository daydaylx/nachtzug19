// ============================================================================
// NACHTZUG 19 - MCP Server: Content Auditor
// ============================================================================
// Führt tiefgreifende Analysen durch: State-Flow, Callback-Tracking,
// Narrative Konsistenz. Identifiziert State-Änderungen ohne Echo.
// ============================================================================

import {
  MCPServerBase,
  MCPToolResult
} from '../MCPServerBase';

import {
  Scene,
  EffectTarget
} from '../../domain/types';

/**
 * State Flow Analysis - Analysiert wie State-Variablen durch die Story fließen
 */
interface StateFlowAnalysis {
  target: EffectTarget;
  totalChanges: number;
  scenesWithChanges: string[];
  chaptersWithChanges: number[];
  callbacksFound: number;
  callbacksExpected: number;  // Basierend auf R3: Jede Änderung braucht Echo
  callbackRatio: number;      // callbacksFound / callbacksExpected
}

/**
 * Narrative Consistency Check - Prüft auf Widersprüche
 */
interface NarrativeConsistencyIssue {
  type: 'contradiction' | 'continuity_error' | 'inconsistency';
  severity: 'error' | 'warning';
  description: string;
  sceneIds: string[];
}

/**
 * Content Analysis Result - Vollständiges Analyse-Ergebnis
 */
interface ContentAnalysisResult {
  stateFlowAnalysis: StateFlowAnalysis[];
  narrativeIssues: NarrativeConsistencyIssue[];
  summary: {
    totalScenes: number;
    totalChoices: number;
    totalEffects: number;
    stateVariablesTracked: number;
  };
}

/**
 * MCP Server: Content Auditor
 */
export class ContentAuditorMCPServer extends MCPServerBase {
  getMetadata(): any {
    return {
      id: 'content-auditor',
      name: 'Content Auditor',
      description: 'Führt tiefgreifende Content-Analysen durch: State-Flow, Callback-Tracking, Narrative Konsistenz',
      version: '1.0.0',
      author: 'NACHTZUG 19 Team'
    };
  }

  getTools(): any[] {
    return [
      {
        name: 'analyzeStateFlow',
        description: 'Analysiert wie State-Variablen durch die Story fließen',
        parameters: {
          target: {
            type: 'string',
            description: 'State-Variable (z.B. "tickets_truth", "memory_drift"). Wenn leer: alle analysieren',
            required: false,
            default: null
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
        name: 'checkCallbacks',
        description: 'Prüft ob alle State-Änderungen ein Echo (Callback) haben',
        parameters: {
          chapter: {
            type: 'number',
            description: 'Kapitel-Nummer (1-7). Wenn leer: alle Kapitel prüfen',
            required: false,
            default: null
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
        name: 'checkNarrativeConsistency',
        description: 'Prüft auf narrative Widersprüche und Kontinuitätsprobleme',
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
        name: 'analyzeChapter',
        description: 'Führt eine komplette Analyse eines Kapitels durch',
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
        name: 'generateReport',
        description: 'Generiert einen kompletten Audit-Report für die gesamte Story',
        parameters: {
          format: {
            type: 'string',
            description: 'Ausgabeformat (console, json, markdown)',
            required: false,
            default: 'console'
          }
        }
      }
    ];
  }

  protected async executeToolInternal(toolName: string, params: Record<string, any>): Promise<Partial<MCPToolResult>> {
    switch (toolName) {
      case 'analyzeStateFlow':
        return await this.analyzeStateFlow(params.target, params.printOutput);

      case 'checkCallbacks':
        return await this.checkCallbacks(params.chapter, params.printOutput);

      case 'checkNarrativeConsistency':
        return await this.checkNarrativeConsistency(params.printOutput);

      case 'analyzeChapter':
        return await this.analyzeChapter(params.chapter, params.printOutput);

      case 'generateReport':
        return await this.generateReport(params.format);

      default:
        return {
          success: false,
          errors: [`Unbekanntes Tool: ${toolName}`]
        };
    }
  }

  /**
   * Analysiert State-Flow für eine oder alle Variablen
   */
  private async analyzeStateFlow(target: string | null, printOutput: boolean) {
    const scenes = this['context'].scenes;
    const targetsToAnalyze = target ? [target as EffectTarget] : this.getAllEffectTargets();

    const results: StateFlowAnalysis[] = [];

    for (const t of targetsToAnalyze) {
      const analysis = this.analyzeStateFlowForTarget(t, scenes);
      results.push(analysis);

      if (printOutput) {
        this.printStateFlowAnalysis(analysis);
      }
    }

    return {
      success: true,
      data: { stateFlowAnalysis: results }
    };
  }

  /**
   * Analysiert State-Flow für eine einzelne Variable
   */
  private analyzeStateFlowForTarget(target: EffectTarget, scenes: Record<string, Scene>): StateFlowAnalysis {
    const scenesWithChanges: string[] = [];
    const chaptersWithChanges = new Set<number>();
    let totalChanges = 0;

    Object.entries(scenes).forEach(([sceneId, scene]) => {
      const hasChange = this.sceneHasTargetChange(scene, target);

      if (hasChange) {
        scenesWithChanges.push(sceneId);
        totalChanges += this.countTargetChanges(scene, target);

        if (scene.chapter !== undefined) {
          chaptersWithChanges.add(scene.chapter);
        }
      }
    });

    // Einfache Callback-Heuristik: state_notes sind ein Hinweis auf Callbacks
    const callbacksFound = this.countCallbacksForTarget(target, scenes);

    return {
      target,
      totalChanges,
      scenesWithChanges,
      chaptersWithChanges: Array.from(chaptersWithChanges).sort(),
      callbacksFound,
      callbacksExpected: totalChanges,  // Ideal: jede Änderung hat ein Echo
      callbackRatio: totalChanges > 0 ? callbacksFound / totalChanges : 1
    };
  }

  /**
   * Prüft ob eine Szene eine State-Änderung für ein Target hat
   */
  private sceneHasTargetChange(scene: Scene, target: EffectTarget): boolean {
    // Prüfe entry_effects
    if (scene.entry_effects?.some(e => e.target === target)) return true;

    // Prüfe exit_effects
    if (scene.exit_effects?.some(e => e.target === target)) return true;

    // Prüfe Choices
    if (scene.choices?.some(choice =>
      choice.effects?.some(e => e.target === target)
    )) return true;

    return false;
  }

  /**
   * Zählt State-Änderungen für ein Target in einer Szene
   */
  private countTargetChanges(scene: Scene, target: EffectTarget): number {
    let count = 0;

    count += scene.entry_effects?.filter(e => e.target === target).length || 0;
    count += scene.exit_effects?.filter(e => e.target === target).length || 0;

    scene.choices?.forEach(choice => {
      count += choice.effects?.filter(e => e.target === target).length || 0;
    });

    return count;
  }

  /**
   * Zählt Callback-Hinweise (state_notes) für ein Target
   */
  private countCallbacksForTarget(target: EffectTarget, scenes: Record<string, Scene>): number {
    let count = 0;

    Object.values(scenes).forEach(scene => {
      if (scene.state_notes) {
        scene.state_notes.forEach(note => {
          // Einfache Heuristik: Wenn der Target-Name im state_note vorkommt
          if (note.toLowerCase().includes(target.toLowerCase().replace('_', ' '))) {
            count++;
          }
        });
      }
    });

    return count;
  }

  /**
   * Gibt State-Flow Analyse aus
   */
  private printStateFlowAnalysis(analysis: StateFlowAnalysis): void {
    console.log(`\n📊 State Flow Analysis: ${analysis.target}`);
    console.log(`   Total Changes: ${analysis.totalChanges}`);
    console.log(`   Scenes: ${analysis.scenesWithChanges.length}`);
    console.log(`   Chapters: ${analysis.chaptersWithChanges.join(', ') || 'none'}`);
    console.log(`   Callbacks: ${analysis.callbacksFound}/${analysis.callbacksExpected} (${(analysis.callbackRatio * 100).toFixed(1)}%)`);

    if (analysis.callbackRatio < 0.5) {
      console.log(`   ⚠️  Warnung: Callback-Rate ist niedrig - viele Änderungen haben kein Echo!`);
    }
  }

  /**
   * Prüft ob alle State-Änderungen ein Echo haben
   */
  private async checkCallbacks(chapter: number | null, printOutput: boolean) {
    const scenes = this['context'].scenes;

    // Filter nach Kapitel
    const scenesToCheck = chapter
      ? Object.fromEntries(
          Object.entries(scenes).filter(([, s]) => s.chapter === chapter)
        )
      : scenes;

    const issues: string[] = [];
    const warnings: string[] = [];

    Object.entries(scenesToCheck).forEach(([sceneId, scene]) => {
      const allEffects = [
        ...(scene.entry_effects || []),
        ...(scene.exit_effects || []),
        ...scene.choices.flatMap(c => c.effects || [])
      ];

      if (allEffects.length > 0 && (!scene.state_notes || scene.state_notes.length === 0)) {
        warnings.push(`Szene '${sceneId}' hat ${allEffects.length} Effects, aber keine state_notes`);
      }

      // Prüfe auf "starke" Effects ohne state_notes
      const strongEffects = allEffects.filter(e =>
        e.type === 'set' || (e.type === 'inc' && typeof e.value === 'number' && Math.abs(e.value) > 1)
      );

      if (strongEffects.length >= 2 && (!scene.state_notes || scene.state_notes.length === 0)) {
        issues.push(`Szene '${sceneId}' hat ${strongEffects.length} starke Effects ohne Callback-Dokumentation`);
      }
    });

    if (printOutput) {
      const scope = chapter ? `Kapitel ${chapter}` : 'alle Kapitel';
      console.log(`\n🔍 === Callback Check: ${scope} ===\n`);

      if (issues.length === 0 && warnings.length === 0) {
        console.log('✅ Alle State-Änderungen haben Callbacks oder sind dokumentiert');
      } else {
        if (issues.length > 0) {
          console.log(`❌ ${issues.length} Callback-Probleme:`);
          issues.forEach(i => console.log(`  - ${i}`));
        }
        if (warnings.length > 0) {
          console.log(`⚠️  ${warnings.length} Warnungen:`);
          warnings.forEach(w => console.log(`  - ${w}`));
        }
      }
    }

    return {
      success: issues.length === 0,
      errors: issues,
      warnings: warnings,
      data: {
        chapter,
        issueCount: issues.length,
        warningCount: warnings.length
      }
    };
  }

  /**
   * Prüft auf narrative Konsistenz
   */
  private async checkNarrativeConsistency(printOutput: boolean) {
    const scenes = this['context'].scenes;
    const issues: NarrativeConsistencyIssue[] = [];

    // TODO: Implementiere echte Konsistenz-Checks
    // Aktuell Platzhalter für zukünftige Implementierung

    // 1. Prüfe auf Duplikate bei Scene IDs
    const sceneIds = Object.keys(scenes);
    const duplicateIds = sceneIds.filter((id, index) => sceneIds.indexOf(id) !== index);

    if (duplicateIds.length > 0) {
      issues.push({
        type: 'contradiction',
        severity: 'error',
        description: `Doppelte Scene IDs gefunden: ${duplicateIds.join(', ')}`,
        sceneIds: duplicateIds
      });
    }

    // 2. Prüfe auf unreachable scenes
    const startSceneId = this['context'].startSceneId;
    const reachable = new Set<string>();
    const queue = [startSceneId];

    while (queue.length > 0) {
      const sceneId = queue.shift()!;
      if (reachable.has(sceneId)) continue;
      reachable.add(sceneId);

      const scene = scenes[sceneId];
      if (!scene) continue;

      scene.choices.forEach(choice => {
        if (choice.next && !reachable.has(choice.next)) {
          queue.push(choice.next);
        }
      });
    }

    Object.keys(scenes).forEach(sceneId => {
      const scene = scenes[sceneId];
      if (!reachable.has(sceneId) && !scene.tags?.includes('secret')) {
        issues.push({
          type: 'continuity_error',
          severity: 'warning',
          description: `Szene '${sceneId}' ist vom Start nicht erreichbar`,
          sceneIds: [sceneId]
        });
      }
    });

    if (printOutput) {
      console.log('\n🔍 === Narrative Consistency Check ===\n');

      if (issues.length === 0) {
        console.log('✅ Keine narrativen Konsistenzprobleme gefunden');
      } else {
        console.log(`❌ ${issues.length} Probleme gefunden:`);
        issues.forEach(issue => {
          const icon = issue.severity === 'error' ? '❌' : '⚠️';
          console.log(`  ${icon} [${issue.type}] ${issue.description}`);
        });
      }
    }

    return {
      success: issues.filter(i => i.severity === 'error').length === 0,
      errors: issues.filter(i => i.severity === 'error').map(i => i.description),
      warnings: issues.filter(i => i.severity === 'warning').map(i => i.description),
      data: { narrativeIssues: issues }
    };
  }

  /**
   * Analysiert ein einzelnes Kapitel
   */
  private async analyzeChapter(chapter: number, printOutput: boolean) {
    const scenes = this['context'].scenes;
    const chapterScenes = Object.fromEntries(
      Object.entries(scenes).filter(([, s]) => s.chapter === chapter)
    );

    if (Object.keys(chapterScenes).length === 0) {
      return {
        success: false,
        errors: [`Kapitel ${chapter} hat keine Szenen`]
      };
    }

    if (printOutput) {
      console.log(`\n🔍 === Kapitel ${chapter} Analyse ===\n`);
      console.log(`Szenen: ${Object.keys(chapterScenes).length}`);
    }

    // Kombiniere alle Analysen
    const stateFlowResult = await this.analyzeStateFlow(null, printOutput);
    const callbackResult = await this.checkCallbacks(chapter, printOutput);

    return {
      success: stateFlowResult.success && callbackResult.success,
      data: {
        chapter,
        sceneCount: Object.keys(chapterScenes).length,
        stateFlow: stateFlowResult.data,
        callbacks: callbackResult.data
      }
    };
  }

  /**
   * Generiert einen kompletten Audit-Report
   */
  private async generateReport(format: string) {
    const scenes = this['context'].scenes;

    const report: ContentAnalysisResult = {
      stateFlowAnalysis: [],
      narrativeIssues: [],
      summary: {
        totalScenes: Object.keys(scenes).length,
        totalChoices: Object.values(scenes).reduce((sum, s) => sum + s.choices.length, 0),
        totalEffects: Object.values(scenes).reduce((sum, s) =>
          sum +
          (s.entry_effects?.length || 0) +
          (s.exit_effects?.length || 0) +
          s.choices.reduce((cSum, c) => cSum + (c.effects?.length || 0), 0),
          0
        ),
        stateVariablesTracked: this.getAllEffectTargets().length
      }
    };

    // Führe State-Flow Analyse für alle Targets durch
    const targets = this.getAllEffectTargets();
    targets.forEach(target => {
      const analysis = this.analyzeStateFlowForTarget(target, scenes);
      report.stateFlowAnalysis.push(analysis);
    });

    // Prüfe narrative Konsistenz
    const consistencyResult = await this.checkNarrativeConsistency(false);
    if (consistencyResult.data?.narrativeIssues) {
      report.narrativeIssues = consistencyResult.data.narrativeIssues;
    }

    // Output basierend auf Format
    switch (format) {
      case 'json':
        console.log(JSON.stringify(report, null, 2));
        break;

      case 'markdown':
        this.printMarkdownReport(report);
        break;

      case 'console':
      default:
        this.printConsoleReport(report);
        break;
    }

    return {
      success: true,
      data: report
    };
  }

  /**
   * Gibt Report in der Konsole aus
   */
  private printConsoleReport(report: ContentAnalysisResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('🔍 NACHTZUG 19 - Content Audit Report');
    console.log('='.repeat(60) + '\n');

    console.log('📊 Summary:');
    console.log(`   Total Scenes: ${report.summary.totalScenes}`);
    console.log(`   Total Choices: ${report.summary.totalChoices}`);
    console.log(`   Total Effects: ${report.summary.totalEffects}`);
    console.log(`   State Variables: ${report.summary.stateVariablesTracked}`);

    console.log('\n📈 State Flow Analysis:');
    report.stateFlowAnalysis.forEach(analysis => {
      console.log(`   ${analysis.target}:`);
      console.log(`     Changes: ${analysis.totalChanges}`);
      console.log(`     Callbacks: ${analysis.callbacksFound}/${analysis.callbacksExpected} (${(analysis.callbackRatio * 100).toFixed(1)}%)`);
    });

    console.log('\n⚠️  Narrative Issues:');
    if (report.narrativeIssues.length === 0) {
      console.log('   Keine Probleme gefunden');
    } else {
      report.narrativeIssues.forEach(issue => {
        const icon = issue.severity === 'error' ? '❌' : '⚠️';
        console.log(`   ${icon} ${issue.description}`);
      });
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }

  /**
   * Gibt Report als Markdown aus
   */
  private printMarkdownReport(report: ContentAnalysisResult): void {
    console.log('# NACHTZUG 19 - Content Audit Report\n');

    console.log('## Summary\n');
    console.log(`- **Total Scenes:** ${report.summary.totalScenes}`);
    console.log(`- **Total Choices:** ${report.summary.totalChoices}`);
    console.log(`- **Total Effects:** ${report.summary.totalEffects}`);
    console.log(`- **State Variables:** ${report.summary.stateVariablesTracked}`);

    console.log('\n## State Flow Analysis\n');
    report.stateFlowAnalysis.forEach(analysis => {
      console.log(`### ${analysis.target}\n`);
      console.log(`- **Total Changes:** ${analysis.totalChanges}`);
      console.log(`- **Scenes:** ${analysis.scenesWithChanges.length}`);
      console.log(`- **Chapters:** ${analysis.chaptersWithChanges.join(', ') || 'none'}`);
      console.log(`- **Callbacks:** ${analysis.callbacksFound}/${analysis.callbacksExpected} (${(analysis.callbackRatio * 100).toFixed(1)}%)\n`);
    });

    console.log('## Narrative Issues\n');
    if (report.narrativeIssues.length === 0) {
      console.log('✅ Keine Probleme gefunden\n');
    } else {
      report.narrativeIssues.forEach(issue => {
        const icon = issue.severity === 'error' ? '❌' : '⚠️';
        console.log(`${icon} **${issue.type}:** ${issue.description}\n`);
      });
    }
  }

  /**
   * Hilfsmethode: Alle bekannten Effect Targets
   */
  private getAllEffectTargets(): EffectTarget[] {
    return [
      // Tickets
      'tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love',
      // Pressure
      'conductor_attention', 'memory_drift',
      // Relations
      'rel_comp7', 'rel_boy', 'rel_sleepless',
      // Items
      'has_recorder', 'has_tag19', 'has_ticket', 'photo_anomaly',
      'played_recorder', 'memory_search_active', 'emma_memory_unlocked',
      // Meta
      'chapter_index', 'station_count',
      // Legacy
      'mut', 'wissen', 'empathie'
    ];
  }
}
