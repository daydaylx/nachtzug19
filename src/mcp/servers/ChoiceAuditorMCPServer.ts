// ============================================================================
// NACHTZUG 19 - MCP Server: Choice Auditor
// ============================================================================
// Überprüft Choices auf Fake-Choices, Callback-Integrität,
// Choice-Dichte pro Kapitel. Stellt sicher, dass keine "leeren" Choices existieren.
// ============================================================================

import {
  MCPServerBase,
  MCPToolResult
} from '../MCPServerBase';

/**
 * Choice Issue - Ein Problem mit einer Choice
 */
interface ChoiceIssue {
  severity: 'error' | 'warning' | 'info';
  sceneId: string;
  choiceId?: string;
  type: string;
  description: string;
}

/**
 * Fake Choice Analysis - Analyse auf Fake-Choices
 */
interface FakeChoiceAnalysis {
  totalChoices: number;
  potentialFakeChoices: number;
  fakeChoiceRate: number;  // potentialFakeChoices / totalChoices
  issues: ChoiceIssue[];
}

/**
 * Choice Callback Analysis - Analyse auf Callback-Integrität
 */
interface ChoiceCallbackAnalysis {
  choicesWithEffects: number;
  choicesWithCallbacks: number;
  callbackRate: number;
  issues: ChoiceIssue[];
}

/**
 * Chapter Choice Analysis - Choice-Analyse pro Kapitel
 */
interface ChapterChoiceAnalysis {
  chapter: number;
  totalScenes: number;
  totalChoices: number;
  choiceDensity: number;  // Choices pro Scene
  avgChoicesPerScene: number;
  issues: ChoiceIssue[];
}

/**
 * Choice Audit Result - Vollständiges Audit-Ergebnis
 */
interface ChoiceAuditResult {
  fakeChoiceAnalysis: FakeChoiceAnalysis;
  callbackAnalysis: ChoiceCallbackAnalysis;
  chapters: ChapterChoiceAnalysis[];
  summary: {
    totalChoices: number;
    totalScenes: number;
    avgChoicesPerScene: number;
    avgChoiceDensity: number;
  };
  recommendations: string[];
}

/**
 * MCP Server: Choice Auditor
 */
export class ChoiceAuditorMCPServer extends MCPServerBase {
  getMetadata(): any {
    return {
      id: 'choice-auditor',
      name: 'Choice Auditor',
      description: 'Überprüft Choices auf Fake-Choices, Callback-Integrität, Choice-Dichte',
      version: '1.0.0',
      author: 'NACHTZUG 19 Team'
    };
  }

  getTools(): any[] {
    return [
      {
        name: 'detectFakeChoices',
        description: 'Erkennt potenzielle Fake-Choices (gleicher next ohne Unterschied)',
        parameters: {
          chapter: {
            type: 'number',
            description: 'Kapitel-Nummer (1-7). Wenn leer: alle Kapitel',
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
        name: 'checkCallbackIntegrity',
        description: 'Prüft ob Choices mit Effects ein späteres Echo haben',
        parameters: {
          chapter: {
            type: 'number',
            description: 'Kapitel-Nummer (1-7). Wenn leer: alle Kapitel',
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
        name: 'analyzeChoiceDensity',
        description: 'Analysiert Choice-Dichte pro Kapitel',
        parameters: {
          chapter: {
            type: 'number',
            description: 'Kapitel-Nummer (1-7). Wenn leer: alle Kapitel',
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
        name: 'validateChoices',
        description: 'Validiert alle Choices auf Konsistenz und完整性',
        parameters: {
          chapter: {
            type: 'number',
            description: 'Kapitel-Nummer (1-7). Wenn leer: alle Kapitel',
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
        name: 'generateChoiceReport',
        description: 'Generiert einen kompletten Choice-Audit-Report',
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
      case 'detectFakeChoices':
        return await this.detectFakeChoices(params.chapter, params.printOutput);

      case 'checkCallbackIntegrity':
        return await this.checkCallbackIntegrity(params.chapter, params.printOutput);

      case 'analyzeChoiceDensity':
        return await this.analyzeChoiceDensity(params.chapter, params.printOutput);

      case 'validateChoices':
        return await this.validateChoices(params.chapter, params.printOutput);

      case 'generateChoiceReport':
        return await this.generateChoiceReport(params.format);

      default:
        return {
          success: false,
          errors: [`Unbekanntes Tool: ${toolName}`]
        };
    }
  }

  /**
   * Erkennt potenzielle Fake-Choices
   */
  private async detectFakeChoices(chapter: number | null, printOutput: boolean) {
    const scenes = this['context'].scenes;

    // Filter nach Kapitel
    const scenesToCheck = chapter
      ? Object.fromEntries(
          Object.entries(scenes).filter(([, s]) => s.chapter === chapter)
        )
      : scenes;

    const issues: ChoiceIssue[] = [];
    let totalChoices = 0;

    Object.entries(scenesToCheck).forEach(([sceneId, scene]) => {
      scene.choices.forEach(choice => {
        totalChoices++;

        // Prüfe 1: Gleiche next und gleiche/no Effects = potenziell Fake
        const hasEffects = choice.effects && choice.effects.length > 0;
        const hasLegacyEffects = choice.werteAenderung || choice.flagsAenderung ||
                                choice.itemBelohnung || choice.itemVerlust;

        if (choice.next && !choice.ending && !hasEffects && !hasLegacyEffects) {
          // Prüfe ob andere Choices zur selben Szene führen
          const sameNextChoices = scene.choices.filter(c =>
            c.next === choice.next && c.id !== choice.id
          );

          if (sameNextChoices.length > 0) {
            issues.push({
              severity: 'warning',
              sceneId,
              choiceId: choice.id || choice.text,
              type: 'potential_fake_choice',
              description: `Choice führt zur selben Szene '${choice.next}' wie andere Choices und hat keine Effekte. Consider Tone Choice or add consequences.`
            });
          }
        }

        // Prüfe 2: Label nur anders, alles gleich
        const choiceLabel = choice.label || choice.text;
        if (choiceLabel && choice.next) {
          const identicalChoices = scene.choices.filter(c =>
            c.id !== choice.id &&
            c.next === choice.next &&
            c.ending === choice.ending &&
            JSON.stringify(c.effects) === JSON.stringify(choice.effects) &&
            JSON.stringify(c.werteAenderung) === JSON.stringify(choice.werteAenderung) &&
            JSON.stringify(c.flagsAenderung) === JSON.stringify(choice.flagsAenderung)
          );

          if (identicalChoices.length > 0) {
            const otherLabel = identicalChoices[0].label || identicalChoices[0].text;
            issues.push({
              severity: 'warning',
              sceneId,
              choiceId: choice.id || choice.text,
              type: 'identical_choices',
              description: `Choice ist identisch mit "${otherLabel}" (gleicher next/ending/effects).`
            });
          }
        }
      });
    });

    const potentialFakeChoices = issues.filter(i => i.type === 'potential_fake_choice').length;
    const fakeChoiceRate = totalChoices > 0 ? potentialFakeChoices / totalChoices : 0;

    const result: FakeChoiceAnalysis = {
      totalChoices,
      potentialFakeChoices,
      fakeChoiceRate,
      issues
    };

    if (printOutput) {
      const scope = chapter ? `Kapitel ${chapter}` : 'alle Kapitel';
      console.log(`\n🔍 === Fake Choice Detection: ${scope} ===\n`);

      console.log(`Total Choices: ${totalChoices}`);
      console.log(`Potenzielle Fake-Choices: ${potentialFakeChoices} (${(fakeChoiceRate * 100).toFixed(1)}%)`);

      if (issues.length === 0) {
        console.log('\n✅ Keine Fake-Choices gefunden');
      } else {
        console.log(`\n⚠️  ${issues.length} Probleme gefunden:\n`);
        issues.forEach(issue => {
          const icon = issue.severity === 'error' ? '❌' : '⚠️';
          console.log(`${icon} [${issue.sceneId}] ${issue.choiceId ? issue.choiceId + ': ' : ''}${issue.description}`);
        });
      }
    }

    return {
      success: potentialFakeChoices === 0,
      warnings: issues.map(i => i.description),
      data: result
    };
  }

  /**
   * Prüft Callback-Integrität
   */
  private async checkCallbackIntegrity(chapter: number | null, printOutput: boolean) {
    const scenes = this['context'].scenes;

    // Filter nach Kapitel
    const scenesToCheck = chapter
      ? Object.fromEntries(
          Object.entries(scenes).filter(([, s]) => s.chapter === chapter)
        )
      : scenes;

    const issues: ChoiceIssue[] = [];
    let choicesWithEffects = 0;
    let choicesWithCallbacks = 0;

    Object.entries(scenesToCheck).forEach(([sceneId, scene]) => {
      scene.choices.forEach(choice => {
        const hasEffects = choice.effects && choice.effects.length > 0;
        const hasLegacyEffects = choice.werteAenderung || choice.flagsAenderung ||
                                choice.itemBelohnung || choice.itemVerlust;

        if (hasEffects || hasLegacyEffects) {
          choicesWithEffects++;

          // Prüfe auf state_notes (Callback-Hinweis)
          const hasStateNotes = scene.state_notes && scene.state_notes.length > 0;
          const hasStrongEffects = choice.effects!.some(e =>
            e.type === 'set' || (e.type === 'inc' && typeof e.value === 'number' && Math.abs(e.value) > 1)
          );

          if (hasStrongEffects && !hasStateNotes) {
            choicesWithCallbacks++;

            issues.push({
              severity: 'warning',
              sceneId,
              choiceId: choice.id || choice.text,
              type: 'missing_callback_documentation',
              description: `Choice hat starke Effects aber kein state_notes Callback-Hinweis.`
            });
          } else if (hasStateNotes) {
            choicesWithCallbacks++;
          }
        }
      });
    });

    const callbackRate = choicesWithEffects > 0 ? choicesWithCallbacks / choicesWithEffects : 1;

    const result: ChoiceCallbackAnalysis = {
      choicesWithEffects,
      choicesWithCallbacks,
      callbackRate,
      issues
    };

    if (printOutput) {
      const scope = chapter ? `Kapitel ${chapter}` : 'alle Kapitel';
      console.log(`\n🔍 === Callback Integrity Check: ${scope} ===\n`);

      console.log(`Choices mit Effects: ${choicesWithEffects}`);
      console.log(`Choices mit Callback-Dokumentation: ${choicesWithCallbacks}`);
      console.log(`Callback-Rate: ${(callbackRate * 100).toFixed(1)}%`);

      if (issues.length === 0) {
        console.log('\n✅ Alle State-Änderungen sind dokumentiert');
      } else {
        console.log(`\n⚠️  ${issues.length} Callback-Probleme:\n`);
        issues.forEach(issue => {
          console.log(`⚠️  [${issue.sceneId}] ${issue.choiceId ? issue.choiceId + ': ' : ''}${issue.description}`);
        });
      }
    }

    return {
      success: issues.length === 0,
      warnings: issues.map(i => i.description),
      data: result
    };
  }

  /**
   * Analysiert Choice-Dichte
   */
  private async analyzeChoiceDensity(chapter: number | null, printOutput: boolean) {
    const scenes = this['context'].scenes;

    // Filter nach Kapitel
    const scenesToCheck = chapter
      ? Object.fromEntries(
          Object.entries(scenes).filter(([, s]) => s.chapter === chapter)
        )
      : scenes;

    const chapterData = new Map<number, { sceneCount: number; choiceCount: number }>();
    const issues: ChoiceIssue[] = [];

    // Analysiere
    Object.entries(scenesToCheck).forEach(([sceneId, scene]) => {
      const ch = scene.chapter;

      if (ch !== undefined) {
        if (!chapterData.has(ch)) {
          chapterData.set(ch, { sceneCount: 0, choiceCount: 0 });
        }

        const data = chapterData.get(ch)!;
        data.sceneCount++;
        data.choiceCount += scene.choices.length;

        // Prüfe: Keine Choices
        if (scene.choices.length === 0) {
          issues.push({
            severity: 'error',
            sceneId,
            type: 'no_choices',
            description: `Szene hat keine Choices`
          });
        }

        // Prüfe: Zu viele Choices
        if (scene.choices.length > 5) {
          issues.push({
            severity: 'warning',
            sceneId,
            type: 'too_many_choices',
            description: `Szene hat ${scene.choices.length} Choices (max. 5 empfohlen)`
          });
        }
      }
    });

    // Berechne Dichte pro Kapitel
    const chapterAnalyses: ChapterChoiceAnalysis[] = [];

    chapterData.forEach((data, ch) => {
      const choiceDensity = data.sceneCount > 0 ? data.choiceCount / data.sceneCount : 0;
      const avgChoicesPerScene = data.sceneCount > 0 ? data.choiceCount / data.sceneCount : 0;

      // Prüfe Choice-Dichte
      if (choiceDensity < 1) {
        issues.push({
          severity: 'warning',
          sceneId: `chapter_${ch}`,
          type: 'low_choice_density',
          description: `Kapitel ${ch}: Choice-Density zu niedrig (${choiceDensity.toFixed(2)} Choices/Scene). Ziel: >= 1.0`
        });
      }

      chapterAnalyses.push({
        chapter: ch,
        totalScenes: data.sceneCount,
        totalChoices: data.choiceCount,
        choiceDensity,
        avgChoicesPerScene,
        issues: []
      });
    });

    if (printOutput) {
      const scope = chapter ? `Kapitel ${chapter}` : 'alle Kapitel';
      console.log(`\n🔍 === Choice Density Analyse: ${scope} ===\n`);

      chapterAnalyses.forEach(analysis => {
        const status = analysis.choiceDensity >= 1 ? '✅' : '⚠️';
        console.log(`${status} Kapitel ${analysis.chapter}: ${analysis.totalChoices} Choices in ${analysis.totalScenes} Szenen (Ø ${analysis.choiceDensity.toFixed(2)} Choices/Scene)`);
      });

      const totalChoices = Array.from(chapterData.values()).reduce((sum, d) => sum + d.choiceCount, 0);
      const totalScenes = Array.from(chapterData.values()).reduce((sum, d) => sum + d.sceneCount, 0);
      const avgDensity = totalScenes > 0 ? totalChoices / totalScenes : 0;

      console.log(`\nDurchschnitt: ${avgDensity.toFixed(2)} Choices/Scene`);
    }

    return {
      success: issues.filter(i => i.severity === 'error').length === 0,
      errors: issues.filter(i => i.severity === 'error').map(i => i.description),
      warnings: issues.filter(i => i.severity === 'warning').map(i => i.description),
      data: {
        chapter,
        chapters: chapterAnalyses
      }
    };
  }

  /**
   * Validiert alle Choices
   */
  private async validateChoices(chapter: number | null, printOutput: boolean) {
    const scenes = this['context'].scenes;

    // Filter nach Kapitel
    const scenesToCheck = chapter
      ? Object.fromEntries(
          Object.entries(scenes).filter(([, s]) => s.chapter === chapter)
        )
      : scenes;

    const issues: ChoiceIssue[] = [];
    let totalChoices = 0;

    Object.entries(scenesToCheck).forEach(([sceneId, scene]) => {
      scene.choices.forEach(choice => {
        totalChoices++;

        // Prüfe 1: Choice muss next oder ending haben
        if (!choice.next && !choice.ending) {
          issues.push({
            severity: 'error',
            sceneId,
            choiceId: choice.id || choice.text,
            type: 'missing_next_or_ending',
            description: 'Choice hat weder "next" noch "ending"'
          });
        }

        // Prüfe 2: Choice muss ein Label haben
        if (!choice.label && !choice.text) {
          issues.push({
            severity: 'error',
            sceneId,
            choiceId: choice.id,
            type: 'missing_label',
            description: 'Choice hat weder "label" noch "text"'
          });
        }

        // Prüfe 3: Next muss existieren
        if (choice.next && !scenes[choice.next] && !this['context'].scenes[choice.next]) {
          issues.push({
            severity: 'error',
            sceneId,
            choiceId: choice.id || choice.text,
            type: 'invalid_next',
            description: `Choice verweist auf nicht-existente Szene "${choice.next}"`
          });
        }

        // Prüfe 4: Ending muss existieren
        if (choice.ending && !this['context'].endings[choice.ending]) {
          issues.push({
            severity: 'error',
            sceneId,
            choiceId: choice.id || choice.text,
            type: 'invalid_ending',
            description: `Choice verweist auf nicht-existentes Ending "${choice.ending}"`
          });
        }
      });
    });

    const errors = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');

    if (printOutput) {
      const scope = chapter ? `Kapitel ${chapter}` : 'alle Kapitel';
      console.log(`\n🔍 === Choice Validation: ${scope} ===\n`);

      console.log(`Total Choices: ${totalChoices}`);
      console.log(`Errors: ${errors.length}`);
      console.log(`Warnings: ${warnings.length}`);

      if (errors.length > 0) {
        console.log(`\n❌ ${errors.length} Errors:\n`);
        errors.forEach(issue => {
          console.log(`  [${issue.sceneId}] ${issue.choiceId ? issue.choiceId + ': ' : ''}${issue.description}`);
        });
      }

      if (warnings.length > 0) {
        console.log(`\n⚠️  ${warnings.length} Warnings:\n`);
        warnings.forEach(issue => {
          console.log(`  [${issue.sceneId}] ${issue.choiceId ? issue.choiceId + ': ' : ''}${issue.description}`);
        });
      }

      if (errors.length === 0 && warnings.length === 0) {
        console.log('\n✅ Alle Choices sind gültig');
      }
    }

    return {
      success: errors.length === 0,
      errors: errors.map(i => i.description),
      warnings: warnings.map(i => i.description),
      data: {
        chapter,
        totalChoices,
        errorCount: errors.length,
        warningCount: warnings.length
      }
    };
  }

  /**
   * Generiert Choice-Report
   */
  private async generateChoiceReport(format: string) {
    // Führe alle Analysen durch
    const fakeChoiceResult = await this.detectFakeChoices(null, false);
    const callbackResult = await this.checkCallbackIntegrity(null, false);
    const densityResult = await this.analyzeChoiceDensity(null, false);
    const validationResult = await this.validateChoices(null, false);

    const report: ChoiceAuditResult = {
      fakeChoiceAnalysis: fakeChoiceResult.data as FakeChoiceAnalysis,
      callbackAnalysis: callbackResult.data as ChoiceCallbackAnalysis,
      chapters: (densityResult.data as any).chapters,
      summary: {
        totalChoices: (validationResult.data as any).totalChoices,
        totalScenes: (densityResult.data as any).totalScenes,
        avgChoicesPerScene: (densityResult.data as any).avgChoicesPerScene,
        avgChoiceDensity: (densityResult.data as any).avgChoiceDensity
      },
      recommendations: []  // Wird nachfolgend gefüllt
    };

    // Generiere Empfehlungen
    report.recommendations = this.generateRecommendations(report);

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
   * Generiert Empfehlungen
   */
  private generateRecommendations(report: ChoiceAuditResult): string[] {
    const recommendations: string[] = [];

    // Fake-Choice Rate
    if (report.fakeChoiceAnalysis.fakeChoiceRate > 0.1) {
      recommendations.push(
        `Fake-Choice Rate ist hoch (${(report.fakeChoiceAnalysis.fakeChoiceRate * 100).toFixed(1)}%). ` +
        'Überprüfe potenzielle Fake-Choices und füge Konsequenzen hinzu.'
      );
    }

    // Callback Rate
    if (report.callbackAnalysis.callbackRate < 0.8) {
      recommendations.push(
        `Callback-Rate ist niedrig (${(report.callbackAnalysis.callbackRate * 100).toFixed(1)}%). ` +
        'Füge state_notes für State-Änderungen hinzu.'
      );
    }

    // Choice Density
    const lowDensityChapters = report.chapters.filter(c => c.choiceDensity < 1);
    if (lowDensityChapters.length > 0) {
      recommendations.push(
        `Choice-Density ist in ${lowDensityChapters.length} Kapiteln zu niedrig. ` +
        'Füge mehr Choices hinzu (Ziel: >= 1.0 Choices/Scene).'
      );
    }

    return recommendations;
  }

  /**
   * Gibt Report in der Konsole aus
   */
  private printConsoleReport(report: ChoiceAuditResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('🔍 NACHTZUG 19 - Choice Audit Report');
    console.log('='.repeat(60) + '\n');

    console.log('📊 Summary:');
    console.log(`   Total Choices: ${report.summary.totalChoices}`);
    console.log(`   Total Scenes: ${report.summary.totalScenes}`);
    console.log(`   Avg Choices/Scene: ${report.summary.avgChoicesPerScene.toFixed(2)}`);

    console.log('\n🎭 Fake Choices:');
    console.log(`   Total: ${report.fakeChoiceAnalysis.totalChoices}`);
    console.log(`   Potential Fakes: ${report.fakeChoiceAnalysis.potentialFakeChoices} (${(report.fakeChoiceAnalysis.fakeChoiceRate * 100).toFixed(1)}%)`);

    console.log('\n🔗 Callback Integrity:');
    console.log(`   Choices with Effects: ${report.callbackAnalysis.choicesWithEffects}`);
    console.log(`   With Documentation: ${report.callbackAnalysis.choicesWithCallbacks}`);
    console.log(`   Rate: ${(report.callbackAnalysis.callbackRate * 100).toFixed(1)}%`);

    console.log('\n📈 Choice Density by Chapter:');
    report.chapters.forEach(chapter => {
      const status = chapter.choiceDensity >= 1 ? '✅' : '⚠️';
      console.log(`   ${status} Kapitel ${chapter.chapter}: ${chapter.choiceDensity.toFixed(2)} Choices/Scene`);
    });

    if (report.recommendations.length > 0) {
      console.log('\n💡 Empfehlungen:');
      report.recommendations.forEach(rec => {
        console.log(`   - ${rec}`);
      });
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }

  /**
   * Gibt Report als Markdown aus
   */
  private printMarkdownReport(report: ChoiceAuditResult): void {
    console.log('# NACHTZUG 19 - Choice Audit Report\n');

    console.log('## Summary\n');
    console.log(`- **Total Choices:** ${report.summary.totalChoices}`);
    console.log(`- **Total Scenes:** ${report.summary.totalScenes}`);
    console.log(`- **Avg Choices/Scene:** ${report.summary.avgChoicesPerScene.toFixed(2)}\n`);

    console.log('## Fake Choices\n');
    console.log(`- **Total Choices:** ${report.fakeChoiceAnalysis.totalChoices}`);
    console.log(`- **Potential Fakes:** ${report.fakeChoiceAnalysis.potentialFakeChoices} (${(report.fakeChoiceAnalysis.fakeChoiceRate * 100).toFixed(1)}%)\n`);

    console.log('## Callback Integrity\n');
    console.log(`- **Choices with Effects:** ${report.callbackAnalysis.choicesWithEffects}`);
    console.log(`- **With Documentation:** ${report.callbackAnalysis.choicesWithCallbacks}`);
    console.log(`- **Rate:** ${(report.callbackAnalysis.callbackRate * 100).toFixed(1)}%\n`);

    console.log('## Choice Density by Chapter\n');
    report.chapters.forEach(chapter => {
      const status = chapter.choiceDensity >= 1 ? '✅' : '⚠️';
      console.log(`### ${status} Kapitel ${chapter.chapter}\n`);
      console.log(`- **Choice Density:** ${chapter.choiceDensity.toFixed(2)} Choices/Scene`);
      console.log(`- **Total Choices:** ${chapter.totalChoices}`);
      console.log(`- **Total Scenes:** ${chapter.totalScenes}\n`);
    });

    if (report.recommendations.length > 0) {
      console.log('## Empfehlungen\n');
      report.recommendations.forEach(rec => {
        console.log(`- ${rec}`);
      });
      console.log('');
    }
  }
}
