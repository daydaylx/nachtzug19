// ============================================================================
// NACHTZUG 19 - MCP Server: Pacing Analyzer
// ============================================================================
// Analysiert Pacing, Spielzeit (20+ Min/Kapitel), Szenen-Dichte,
// Choice-Dichte gemäß Length & Immersion Specification.
// ============================================================================

import {
  MCPServerBase,
  MCPToolResult
} from '../MCPServerBase';

import {
  Scene
} from '../../domain/types';

/**
 * Chapter Analysis - Analyse eines Kapitels
 */
interface ChapterAnalysis {
  chapter: number;
  title?: string;
  sceneCount: number;
  wordCount: number;
  choiceCount: number;
  estimatedMinutes: number;
  meetsTarget: boolean;  // >= 20 Minuten
  choiceDensity: number; // Choices pro Scene
  wordDensity: number;   // Wörter pro Scene
  issues: string[];
}

/**
 * Pacing Analysis Result - Vollständiges Analyse-Ergebnis
 */
interface PacingAnalysisResult {
  chapters: ChapterAnalysis[];
  summary: {
    totalScenes: number;
    totalWords: number;
    totalChoices: number;
    totalEstimatedMinutes: number;
    chaptersMeetingTarget: number;
    averageChapterLength: number;
  };
  recommendations: string[];
}

/**
 * MCP Server: Pacing Analyzer
 */
export class PacingAnalyzerMCPServer extends MCPServerBase {
  // Annahmen aus NACHTZUG_19_RULES.md:
  // - Durchschnittliche Lesegeschwindigkeit: 160-220 Wörter/Minute
  // - Entscheidung inkl. Nachdenken: 6-12 Sekunden
  // - Runtime-Formel: (Wörter / 190) + (Choices × 0.15)

  private readonly WORDS_PER_MINUTE = 190;
  private readonly SECONDS_PER_CHOICE = 9;

  getMetadata(): any {
    return {
      id: 'pacing-analyzer',
      name: 'Pacing Analyzer',
      description: 'Analysiert Pacing, Spielzeit, Szenen-Dichte, Choice-Dichte gemäß Length & Immersion Specification',
      version: '1.0.0',
      author: 'NACHTZUG 19 Team'
    };
  }

  getTools(): any[] {
    return [
      {
        name: 'analyzeChapter',
        description: 'Analysiert Pacing und Spielzeit eines Kapitels',
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
        name: 'analyzeAllChapters',
        description: 'Analysiert Pacing und Spielzeit aller Kapitel',
        parameters: {
          printOutput: {
            type: 'boolean',
            description: 'Ob das Ergebnis in der Konsole ausgegeben werden soll',
            required: false,
            default: true
          },
          format: {
            type: 'string',
            description: 'Ausgabeformat (console, json, markdown)',
            required: false,
            default: 'console'
          }
        }
      },
      {
        name: 'checkChapterLength',
        description: 'Prüft ob ein Kapitel die 20+ Minuten Regel erfüllt',
        parameters: {
          chapter: {
            type: 'number',
            description: 'Kapitel-Nummer (1-7)',
            required: true
          },
          targetMinutes: {
            type: 'number',
            description: 'Ziel-Spielzeit in Minuten (Standard: 20)',
            required: false,
            default: 20
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
        name: 'generatePacingReport',
        description: 'Generiert einen kompletten Pacing-Report',
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
      case 'analyzeChapter':
        return await this.analyzeChapter(params.chapter, params.printOutput);

      case 'analyzeAllChapters':
        return await this.analyzeAllChapters(params.printOutput, params.format);

      case 'checkChapterLength':
        return await this.checkChapterLength(params.chapter, params.targetMinutes);

      case 'analyzeChoiceDensity':
        return await this.analyzeChoiceDensity(params.chapter, params.printOutput);

      case 'generatePacingReport':
        return await this.generatePacingReport(params.format);

      default:
        return {
          success: false,
          errors: [`Unbekanntes Tool: ${toolName}`]
        };
    }
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

    const analysis = this.performChapterAnalysis(chapter, chapterScenes);

    if (printOutput) {
      this.printChapterAnalysis(analysis);
    }

    return {
      success: true,
      data: analysis
    };
  }

  /**
   * Analysiert alle Kapitel
   */
  private async analyzeAllChapters(printOutput: boolean, format: string) {
    const scenes = this['context'].scenes;

    // Gruppiere Szenen nach Kapitel
    const chaptersMap = new Map<number, Record<string, Scene>>();

    Object.entries(scenes).forEach(([sceneId, scene]) => {
      if (scene.chapter !== undefined) {
        if (!chaptersMap.has(scene.chapter)) {
          chaptersMap.set(scene.chapter, {});
        }
        chaptersMap.get(scene.chapter)![sceneId] = scene;
      }
    });

    // Analysiere jedes Kapitel
    const analyses: ChapterAnalysis[] = [];
    const sortedChapters = Array.from(chaptersMap.keys()).sort((a, b) => a - b);

    sortedChapters.forEach(chapter => {
      const chapterScenes = chaptersMap.get(chapter)!;
      const analysis = this.performChapterAnalysis(chapter, chapterScenes);
      analyses.push(analysis);
    });

    const result: PacingAnalysisResult = {
      chapters: analyses,
      summary: this.calculateSummary(analyses),
      recommendations: this.generateRecommendations(analyses)
    };

    if (printOutput) {
      switch (format) {
        case 'json':
          console.log(JSON.stringify(result, null, 2));
          break;

        case 'markdown':
          this.printMarkdownReport(result);
          break;

        case 'console':
        default:
          this.printConsoleReport(result);
          break;
      }
    }

    return {
      success: true,
      data: result
    };
  }

  /**
   * Führt die Kapitel-Analyse durch
   */
  private performChapterAnalysis(chapter: number, chapterScenes: Record<string, Scene>): ChapterAnalysis {
    const sceneIds = Object.keys(chapterScenes);
    const sceneCount = sceneIds.length;

    let wordCount = 0;
    let choiceCount = 0;
    const issues: string[] = [];

    // Analysiere jede Szene
    sceneIds.forEach(sceneId => {
      const scene = chapterScenes[sceneId];

      // Wörter zählen (narrative + narrative_variants)
      wordCount += this.countWords(scene);

      // Choices zählen
      choiceCount += scene.choices.length;

      // Prüfe auf Probleme
      if (scene.choices.length === 0) {
        issues.push(`Szene '${sceneId}' hat keine Choices`);
      }
      if (scene.choices.length > 5) {
        issues.push(`Szene '${sceneId}' hat mehr als 5 Choices (${scene.choices.length})`);
      }
      if (!scene.narrative) {
        issues.push(`Szene '${sceneId}' hat keinen Text`);
      }
    });

    // Berechne geschätzte Spielzeit
    const readingMinutes = wordCount / this.WORDS_PER_MINUTE;
    const decisionMinutes = choiceCount * (this.SECONDS_PER_CHOICE / 60);
    const estimatedMinutes = readingMinutes + decisionMinutes;

    // Prüfe 20+ Minuten Regel
    const meetsTarget = estimatedMinutes >= 20;

    // Dichte-Werte
    const choiceDensity = sceneCount > 0 ? choiceCount / sceneCount : 0;
    const wordDensity = sceneCount > 0 ? wordCount / sceneCount : 0;

    return {
      chapter,
      sceneCount,
      wordCount,
      choiceCount,
      estimatedMinutes,
      meetsTarget,
      choiceDensity,
      wordDensity,
      issues
    };
  }

  /**
   * Zählt Wörter in einer Szene
   */
  private countWords(scene: Scene): number {
    let count = 0;

    // Haupt-Text
    const narrative = scene.narrative || '';
    count += narrative.split(/\s+/).length;

    // Narrative Varianten
    if (scene.narrative_variants) {
      scene.narrative_variants.forEach(variant => {
        count += variant.narrative.split(/\s+/).length;
      });
    }

    return count;
  }

  /**
   * Berechnet Summary
   */
  private calculateSummary(analyses: ChapterAnalysis[]): PacingAnalysisResult['summary'] {
    const totalScenes = analyses.reduce((sum, a) => sum + a.sceneCount, 0);
    const totalWords = analyses.reduce((sum, a) => sum + a.wordCount, 0);
    const totalChoices = analyses.reduce((sum, a) => sum + a.choiceCount, 0);
    const totalEstimatedMinutes = analyses.reduce((sum, a) => sum + a.estimatedMinutes, 0);
    const chaptersMeetingTarget = analyses.filter(a => a.meetsTarget).length;
    const averageChapterLength = analyses.length > 0 ? totalEstimatedMinutes / analyses.length : 0;

    return {
      totalScenes,
      totalWords,
      totalChoices,
      totalEstimatedMinutes,
      chaptersMeetingTarget,
      averageChapterLength
    };
  }

  /**
   * Generiert Empfehlungen
   */
  private generateRecommendations(analyses: ChapterAnalysis[]): string[] {
    const recommendations: string[] = [];

    analyses.forEach(analysis => {
      // Kapitel zu kurz?
      if (!analysis.meetsTarget) {
        const deficit = 20 - analysis.estimatedMinutes;
        recommendations.push(
          `Kapitel ${analysis.chapter}: Zu kurz (${analysis.estimatedMinutes.toFixed(1)} min). ` +
          `Füge ca. ${Math.round(deficit * 190)} Wörter oder ${Math.round(deficit * 6)} Choices hinzu.`
        );
      }

      // Choice-Density zu niedrig?
      if (analysis.choiceDensity < 1) {
        recommendations.push(
          `Kapitel ${analysis.chapter}: Choice-Density zu niedrig (${analysis.choiceDensity.toFixed(2)}). ` +
          `Füge mehr Choices hinzu (Ziel: >= 1 Choice pro Scene).`
        );
      }

      // Szenen zu wenig?
      if (analysis.sceneCount < 18) {
        recommendations.push(
          `Kapitel ${analysis.chapter}: Szenenanzahl zu gering (${analysis.sceneCount}). ` +
          `Ziel: 22-28 Szenen (Minimum: 18).`
        );
      }

      // Word-Density zu niedrig?
      if (analysis.wordDensity < 200) {
        recommendations.push(
          `Kapitel ${analysis.chapter}: Word-Density zu niedrig (${analysis.wordDensity.toFixed(0)} Wörter/Scene). ` +
          `Erweitere Narrative in Szenen.`
        );
      }
    });

    return recommendations;
  }

  /**
   * Prüft ob ein Kapitel die 20+ Minuten Regel erfüllt
   */
  private async checkChapterLength(chapter: number, targetMinutes: number) {
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

    const analysis = this.performChapterAnalysis(chapter, chapterScenes);
    const meetsTarget = analysis.estimatedMinutes >= targetMinutes;

    const result = {
      chapter,
      targetMinutes,
      estimatedMinutes: analysis.estimatedMinutes,
      meetsTarget,
      deficit: meetsTarget ? 0 : targetMinutes - analysis.estimatedMinutes
    };

    console.log(`\n🔍 === Kapitel ${chapter}: Längen-Check ===\n`);
    console.log(`Ziel: ${targetMinutes}+ Minuten`);
    console.log(`Geschätzt: ${analysis.estimatedMinutes.toFixed(1)} Minuten`);
    console.log(`Szenen: ${analysis.sceneCount}`);
    console.log(`Choices: ${analysis.choiceCount}`);
    console.log(`Wörter: ${analysis.wordCount}`);

    if (meetsTarget) {
      console.log(`\n✅ Kapitel erfüllt das Ziel!\n`);
    } else {
      console.log(`\n❌ Kapitel ist um ${result.deficit.toFixed(1)} Minuten zu kurz.\n`);
      console.log(`Empfehlung: Füge ca. ${Math.round(result.deficit * 190)} Wörter oder ${Math.round(result.deficit * 6)} Choices hinzu.\n`);
    }

    return {
      success: meetsTarget,
      data: result
    };
  }

  /**
   * Analysiert Choice-Density
   */
  private async analyzeChoiceDensity(chapter: number | null, printOutput: boolean) {
    const scenes = this['context'].scenes;

    // Filter nach Kapitel
    const scenesToCheck = chapter
      ? Object.fromEntries(
          Object.entries(scenes).filter(([, s]) => s.chapter === chapter)
        )
      : scenes;

    const densityByChapter = new Map<number, { sceneCount: number; choiceCount: number; avgDensity: number }>();

    // Analysiere
    if (chapter) {
      const chapterScenes = scenesToCheck;
      const sceneCount = Object.keys(chapterScenes).length;
      const choiceCount = Object.values(chapterScenes).reduce((sum, s) => sum + s.choices.length, 0);
      densityByChapter.set(chapter, {
        sceneCount,
        choiceCount,
        avgDensity: sceneCount > 0 ? choiceCount / sceneCount : 0
      });
    } else {
      // Alle Kapitel
      const chaptersMap = new Map<number, Record<string, Scene>>();
      Object.entries(scenes).forEach(([sceneId, scene]) => {
        if (scene.chapter !== undefined) {
          if (!chaptersMap.has(scene.chapter)) {
            chaptersMap.set(scene.chapter, {});
          }
          chaptersMap.get(scene.chapter)![sceneId] = scene;
        }
      });

      chaptersMap.forEach((chapterScenes, ch) => {
        const sceneCount = Object.keys(chapterScenes).length;
        const choiceCount = Object.values(chapterScenes).reduce((sum, s) => sum + s.choices.length, 0);
        densityByChapter.set(ch, {
          sceneCount,
          choiceCount,
          avgDensity: sceneCount > 0 ? choiceCount / sceneCount : 0
        });
      });
    }

    if (printOutput) {
      const scope = chapter ? `Kapitel ${chapter}` : 'alle Kapitel';
      console.log(`\n🔍 === Choice-Density Analyse: ${scope} ===\n`);

      densityByChapter.forEach((data, ch) => {
        const status = data.avgDensity >= 1 ? '✅' : '⚠️';
        console.log(`${status} Kapitel ${ch}: ${data.choiceCount} Choices in ${data.sceneCount} Szenen (Ø ${data.avgDensity.toFixed(2)})`);
      });

      const allDensities = Array.from(densityByChapter.values()).map(d => d.avgDensity);
      const avgDensity = allDensities.length > 0
        ? allDensities.reduce((sum, d) => sum + d, 0) / allDensities.length
        : 0;

      console.log(`\nDurchschnitt: ${avgDensity.toFixed(2)} Choices/Scene`);

      if (avgDensity < 1) {
        console.log(`⚠️  Warnung: Choice-Density ist zu niedrig (Ziel: >= 1.0)`);
      } else {
        console.log(`✅ Choice-Density ist im Zielbereich`);
      }
    }

    return {
      success: true,
      data: {
        chapter,
        densityByChapter: Array.from(densityByChapter.entries()).map(([ch, data]) => ({
          chapter: ch,
          ...data
        }))
      }
    };
  }

  /**
   * Generiert Pacing-Report
   */
  private async generatePacingReport(format: string) {
    const result = await this.analyzeAllChapters(false, format);

    return result;
  }

  /**
   * Gibt Kapitel-Analyse aus
   */
  private printChapterAnalysis(analysis: ChapterAnalysis): void {
    console.log(`\n🔍 === Kapitel ${analysis.chapter}: Pacing Analyse ===\n`);

    console.log('📊 Metriken:');
    console.log(`   Szenen: ${analysis.sceneCount}`);
    console.log(`   Wörter: ${analysis.wordCount}`);
    console.log(`   Choices: ${analysis.choiceCount}`);
    console.log(`   Choice-Density: ${analysis.choiceDensity.toFixed(2)} Choices/Scene`);
    console.log(`   Word-Density: ${analysis.wordDensity.toFixed(0)} Wörter/Scene`);

    console.log('\n⏱️  Spielzeit:');
    console.log(`   Geschätzt: ${analysis.estimatedMinutes.toFixed(1)} Minuten`);
    console.log(`   Ziel: 20+ Minuten`);

    if (analysis.meetsTarget) {
      console.log(`   ✅ Ziel erreicht!`);
    } else {
      const deficit = 20 - analysis.estimatedMinutes;
      console.log(`   ❌ Ziel verfehlt (Fehlen ${deficit.toFixed(1)} Minuten)`);
    }

    if (analysis.issues.length > 0) {
      console.log('\n⚠️  Probleme:');
      analysis.issues.forEach(issue => {
        console.log(`   - ${issue}`);
      });
    }
  }

  /**
   * Gibt Report in der Konsole aus
   */
  private printConsoleReport(result: PacingAnalysisResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('🔍 NACHTZUG 19 - Pacing Analysis Report');
    console.log('='.repeat(60) + '\n');

    console.log('📊 Summary:');
    console.log(`   Total Scenes: ${result.summary.totalScenes}`);
    console.log(`   Total Words: ${result.summary.totalWords}`);
    console.log(`   Total Choices: ${result.summary.totalChoices}`);
    console.log(`   Total Estimated Minutes: ${result.summary.totalEstimatedMinutes.toFixed(1)}`);
    console.log(`   Chapters Meeting Target (20+ min): ${result.summary.chaptersMeetingTarget}/${result.chapters.length}`);
    console.log(`   Average Chapter Length: ${result.summary.averageChapterLength.toFixed(1)} minutes`);

    console.log('\n📈 Chapter Details:');
    result.chapters.forEach(analysis => {
      const status = analysis.meetsTarget ? '✅' : '❌';
      console.log(`\n   ${status} Kapitel ${analysis.chapter}: ${analysis.estimatedMinutes.toFixed(1)} min (${analysis.sceneCount} Szenen, ${analysis.choiceCount} Choices)`);
    });

    if (result.recommendations.length > 0) {
      console.log('\n💡 Empfehlungen:');
      result.recommendations.forEach(rec => {
        console.log(`   - ${rec}`);
      });
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }

  /**
   * Gibt Report als Markdown aus
   */
  private printMarkdownReport(result: PacingAnalysisResult): void {
    console.log('# NACHTZUG 19 - Pacing Analysis Report\n');

    console.log('## Summary\n');
    console.log(`- **Total Scenes:** ${result.summary.totalScenes}`);
    console.log(`- **Total Words:** ${result.summary.totalWords}`);
    console.log(`- **Total Choices:** ${result.summary.totalChoices}`);
    console.log(`- **Total Estimated Minutes:** ${result.summary.totalEstimatedMinutes.toFixed(1)}`);
    console.log(`- **Chapters Meeting Target (20+ min):** ${result.summary.chaptersMeetingTarget}/${result.chapters.length}`);
    console.log(`- **Average Chapter Length:** ${result.summary.averageChapterLength.toFixed(1)} minutes\n`);

    console.log('## Chapter Details\n');
    result.chapters.forEach(analysis => {
      const status = analysis.meetsTarget ? '✅' : '❌';
      console.log(`### ${status} Kapitel ${analysis.chapter}\n`);
      console.log(`- **Spielzeit:** ${analysis.estimatedMinutes.toFixed(1)} min`);
      console.log(`- **Szenen:** ${analysis.sceneCount}`);
      console.log(`- **Choices:** ${analysis.choiceCount}`);
      console.log(`- **Choice-Density:** ${analysis.choiceDensity.toFixed(2)} Choices/Scene`);
      console.log(`- **Word-Density:** ${analysis.wordDensity.toFixed(0)} Wörter/Scene\n`);
    });

    if (result.recommendations.length > 0) {
      console.log('## Empfehlungen\n');
      result.recommendations.forEach(rec => {
        console.log(`- ${rec}`);
      });
      console.log('');
    }
  }
}
