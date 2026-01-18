// ============================================================================
// NACHTZUG 19 - Content Validator
// ============================================================================
// Prüft Story-Content auf:
// - Graph-Invarianten (keine Dead-Ends, alle Referenzen existieren)
// - Canon Rules (station_end -> drift, Kontrollen in Kap. 2/3/5)
// - Schema-Validierung (Effects nutzen nur bekannte Variablen)
// ============================================================================

import {
  Scene,
  Choice,
  Condition,
  Effect,
  EffectTarget,
  EffectType,
  ScenesCollection,
  EndingsCollection,
  ValidationError,
  ValidationResult
} from '../types';

// ============================================================================
// Known Effect Targets & Types
// ============================================================================

const KNOWN_EFFECT_TARGETS: Set<EffectTarget> = new Set([
  // Legacy Stats
  'mut', 'wissen', 'empathie',
  // Tickets
  'tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love',
  // Pressure
  'conductor_attention', 'memory_drift',
  // Relations
  'rel_comp7', 'rel_boy', 'rel_sleepless',
  // Items
  'has_recorder', 'has_tag19', 'photo_anomaly',
  // Meta
  'chapter_index', 'station_count'
]);

const KNOWN_EFFECT_TYPES: Set<EffectType> = new Set([
  'inc', 'dec', 'set', 'clamp'
]);

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Prüft, ob ein Effect-Target bekannt ist
 */
function validateEffectTarget(target: string): boolean {
  return KNOWN_EFFECT_TARGETS.has(target as EffectTarget);
}

/**
 * Prüft, ob ein Effect-Type bekannt ist
 */
function validateEffectType(type: string): boolean {
  return KNOWN_EFFECT_TYPES.has(type as EffectType);
}

/**
 * Sammelt alle Targets aus einer Condition
 */
function getConditionTargets(condition: Condition): string[] {
  const targets: string[] = [];

  if (condition.type === 'compare' || condition.type === 'bool') {
    targets.push(condition.target);
  } else if (condition.type === 'and' || condition.type === 'or') {
    condition.conditions.forEach(c => {
      targets.push(...getConditionTargets(c));
    });
  }

  return targets;
}

/**
 * Zählt "starke" Effects (inc/dec mit value > 1, oder mehrere effects)
 */
function countStrongEffects(effects: Effect[]): number {
  return effects.filter(e => {
    if (e.type === 'inc' || e.type === 'dec') {
      return typeof e.value === 'number' && Math.abs(e.value) > 1;
    }
    return true; // set, clamp zählen als strong
  }).length;
}

/**
 * Prüft eine einzelne Choice
 */
function validateChoice(
  sceneId: string,
  choice: Choice,
  scenes: ScenesCollection,
  endings: EndingsCollection,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  const choiceLabel = choice.id || choice.text || 'unknown';

  // 1. Choice muss entweder 'next' oder 'ending' haben
  if (!choice.next && !choice.ending) {
    errors.push({
      type: 'error',
      message: `Choice '${choiceLabel}' hat weder 'next' noch 'ending'`,
      scene_id: sceneId,
      choice_id: choice.id
    });
  }

  // 2. 'next' muss auf existierende Szene verweisen
  if (choice.next && !scenes[choice.next]) {
    errors.push({
      type: 'error',
      message: `Choice '${choiceLabel}' verweist auf unbekannte Szene '${choice.next}'`,
      scene_id: sceneId,
      choice_id: choice.id
    });
  }

  // 3. 'ending' muss auf existierendes Ending verweisen
  if (choice.ending && !endings[choice.ending]) {
    errors.push({
      type: 'error',
      message: `Choice '${choiceLabel}' verweist auf unbekanntes Ending '${choice.ending}'`,
      scene_id: sceneId,
      choice_id: choice.id
    });
  }

  // 4. Choice muss mindestens einen Effect haben (R3: Callback-Regel) - nur für NACHTZUG 19
  // Legacy-Choices haben werteAenderung statt effects
  const hasEffects = choice.effects && choice.effects.length > 0;
  const hasLegacyEffects = choice.werteAenderung || choice.flagsAenderung || choice.itemBelohnung || choice.itemVerlust;

  if (!hasEffects && !hasLegacyEffects) {
    errors.push({
      type: 'error',
      message: `Choice '${choiceLabel}' hat keine Effekte (R3: Callback-Regel verlangt mindestens 1 Effect)`,
      scene_id: sceneId,
      choice_id: choice.id || choice.text
    });
  }

  // 5. Alle Effects müssen bekannte Targets verwenden
  if (choice.effects) {
    choice.effects.forEach((effect, idx) => {
      // Prüfe Effect-Type
      if (!validateEffectType(effect.type)) {
        errors.push({
          type: 'error',
          message: `Choice '${choiceLabel}' Effect #${idx}: Unbekannter Effect-Type '${effect.type}' (erlaubt: inc/dec/set/clamp)`,
          scene_id: sceneId,
          choice_id: choice.id
        });
      }

      // Prüfe Target
      if (!validateEffectTarget(effect.target)) {
        errors.push({
          type: 'error',
          message: `Choice '${choiceLabel}' Effect #${idx}: Unbekanntes Target '${effect.target}'`,
          scene_id: sceneId,
          choice_id: choice.id
        });
      }

      // Warnung: clamp ohne clamp_min/clamp_max
      if (effect.type === 'clamp' && (effect.clamp_min === undefined || effect.clamp_max === undefined)) {
        warnings.push({
          type: 'warning',
          message: `Choice '${choiceLabel}' Effect #${idx}: clamp ohne clamp_min/clamp_max`,
          scene_id: sceneId,
          choice_id: choice.id
        });
      }
    });
  }

  // 6. Alle Conditions müssen bekannte Targets verwenden (nur für neue Conditions)
  if (choice.condition && typeof choice.condition !== 'function') {
    const targets = getConditionTargets(choice.condition);
    targets.forEach(target => {
      if (!validateEffectTarget(target)) {
        errors.push({
          type: 'error',
          message: `Choice '${choiceLabel}' Condition: Unbekanntes Target '${target}'`,
          scene_id: sceneId,
          choice_id: choice.id
        });
      }
    });
  }
}

/**
 * Prüft eine einzelne Szene
 */
function validateScene(
  scene: Scene,
  scenes: ScenesCollection,
  endings: EndingsCollection,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // 1. Szene muss mindestens eine Choice haben
  if (!scene.choices || scene.choices.length === 0) {
    errors.push({
      type: 'error',
      message: `Szene '${scene.id}' hat keine Choices`,
      scene_id: scene.id
    });
    return;
  }

  // 2. Szene darf maximal 4 Choices haben
  if (scene.choices.length > 4) {
    errors.push({
      type: 'error',
      message: `Szene '${scene.id}' hat mehr als 4 Choices (${scene.choices.length} gefunden, max. 4 erlaubt)`,
      scene_id: scene.id
    });
  }

  // 3. Prüfe jede Choice
  scene.choices.forEach(choice => {
    validateChoice(scene.id, choice, scenes, endings, errors, warnings);
  });

  // 4. Entry/Exit-Effects müssen bekannte Targets verwenden
  if (scene.entry_effects) {
    scene.entry_effects.forEach((effect, idx) => {
      if (!validateEffectType(effect.type)) {
        errors.push({
          type: 'error',
          message: `Entry-Effect #${idx}: Unbekannter Effect-Type '${effect.type}'`,
          scene_id: scene.id
        });
      }
      if (!validateEffectTarget(effect.target)) {
        errors.push({
          type: 'error',
          message: `Entry-Effect #${idx}: Unbekanntes Target '${effect.target}'`,
          scene_id: scene.id
        });
      }
    });
  }

  if (scene.exit_effects) {
    scene.exit_effects.forEach((effect, idx) => {
      if (!validateEffectType(effect.type)) {
        errors.push({
          type: 'error',
          message: `Exit-Effect #${idx}: Unbekannter Effect-Type '${effect.type}'`,
          scene_id: scene.id
        });
      }
      if (!validateEffectTarget(effect.target)) {
        errors.push({
          type: 'error',
          message: `Exit-Effect #${idx}: Unbekanntes Target '${effect.target}'`,
          scene_id: scene.id
        });
      }
    });
  }

  // 5. state_notes sollte maximal 5 Einträge haben
  if (scene.state_notes && scene.state_notes.length > 5) {
    warnings.push({
      type: 'warning',
      message: `Szene '${scene.id}' hat ${scene.state_notes.length} state_notes (max. 5 empfohlen)`,
      scene_id: scene.id
    });
  }

  // 6. Warnung: Szene hat viele/starke Effects, aber keine state_notes
  const allEffects = [
    ...(scene.entry_effects || []),
    ...(scene.exit_effects || []),
    ...scene.choices.flatMap(c => c.effects || [])
  ];

  if (allEffects.length > 2) {
    const strongEffects = countStrongEffects(allEffects);
    if (strongEffects >= 2 && (!scene.state_notes || scene.state_notes.length === 0)) {
      warnings.push({
        type: 'warning',
        message: `Szene '${scene.id}' hat ${strongEffects} starke Effects, aber keine state_notes (Callback-Dokumentation fehlt)`,
        scene_id: scene.id
      });
    }
  }

  // 7. Prüfe narrative_variants (falls vorhanden)
  if (scene.narrative_variants && scene.narrative_variants.length > 0) {
    validateNarrativeVariants(scene.id, scene.narrative_variants, errors);
  }
}

/**
 * Prüft narrative_variants einer Scene
 */
function validateNarrativeVariants(
  sceneId: string,
  variants: Array<{ min_drift: number; narrative: string; replace_mode?: 'full' | 'overlay' }>,
  errors: ValidationError[]
): void {
  const seenMinDrifts = new Set<number>();

  variants.forEach((variant, idx) => {
    // 1. min_drift muss >= 1 sein (keine 0)
    if (variant.min_drift < 1) {
      errors.push({
        type: 'error',
        message: `Szene '${sceneId}' narrative_variant #${idx}: min_drift muss >= 1 sein (aktuell: ${variant.min_drift})`,
        scene_id: sceneId
      });
    }

    // 2. Keine Duplikate bei min_drift innerhalb einer Scene
    if (seenMinDrifts.has(variant.min_drift)) {
      errors.push({
        type: 'error',
        message: `Szene '${sceneId}' narrative_variant #${idx}: Doppelter min_drift-Wert ${variant.min_drift}`,
        scene_id: sceneId
      });
    } else {
      seenMinDrifts.add(variant.min_drift);
    }

    // 3. narrative ist nicht leer
    if (!variant.narrative || variant.narrative.trim().length === 0) {
      errors.push({
        type: 'error',
        message: `Szene '${sceneId}' narrative_variant #${idx}: narrative darf nicht leer sein`,
        scene_id: sceneId
      });
    }
  });
}

/**
 * Prüft auf Duplikate bei Scene IDs
 */
function validateUniqueness(
  scenes: ScenesCollection,
  errors: ValidationError[]
): void {
  const idCounts = new Map<string, number>();

  // Zähle wie oft jede scene.id vorkommt (nicht die Collection-Keys!)
  Object.values(scenes).forEach(scene => {
    const id = scene.id;
    idCounts.set(id, (idCounts.get(id) || 0) + 1);
  });

  idCounts.forEach((count, id) => {
    if (count > 1) {
      errors.push({
        type: 'error',
        message: `Doppelte Scene-ID '${id}' (${count}x vorhanden)`,
        scene_id: id
      });
    }
  });
}

/**
 * Prüft R1: Jedes Kapitel muss mind. 1 station_end haben
 */
function validateCanonRuleR1(
  scenes: ScenesCollection,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  const chapterStationEnds: Record<number, number> = {};
  const existingChapters = new Set<number>();

  // Zähle station_end-Szenen pro Kapitel und sammle alle vorhandenen Kapitel
  Object.values(scenes).forEach(scene => {
    if (scene.chapter !== undefined) {
      existingChapters.add(scene.chapter);
      if (scene.tags?.includes('station_end')) {
        const chapter = scene.chapter;
        chapterStationEnds[chapter] = (chapterStationEnds[chapter] || 0) + 1;
      }
    }
  });

  // Prüfe nur Kapitel, die tatsächlich Szenen enthalten
  existingChapters.forEach(chapter => {
    const count = chapterStationEnds[chapter] || 0;
    if (count === 0) {
      errors.push({
        type: 'error',
        message: `Canon Rule R1 verletzt: Kapitel ${chapter} hat keine station_end-Szene`,
        location: `chapter_${chapter}`
      });
    } else if (count > 1) {
      warnings.push({
        type: 'warning',
        message: `Kapitel ${chapter} hat ${count} station_end-Szenen (normalerweise 1)`,
        location: `chapter_${chapter}`
      });
    }
  });
}

/**
 * Prüft R2: Kontrollen in Kapiteln 2, 3, 5
 */
function validateCanonRuleR2(
  scenes: ScenesCollection,
  errors: ValidationError[]
): void {
  const requiredControlChapters = [2, 3, 5];
  const chapterControlCounts: Record<number, number> = {};
  const existingChapters = new Set<number>();

  // Zähle control-Szenen pro Kapitel und sammle alle vorhandenen Kapitel
  Object.values(scenes).forEach(scene => {
    if (scene.chapter !== undefined) {
      existingChapters.add(scene.chapter);
      if (scene.tags?.includes('control')) {
        const chapter = scene.chapter;
        chapterControlCounts[chapter] = (chapterControlCounts[chapter] || 0) + 1;
      }
    }
  });

  // Prüfe nur erforderliche Kapitel, die tatsächlich Szenen enthalten
  requiredControlChapters.forEach(chapter => {
    if (existingChapters.has(chapter)) {
      if (!chapterControlCounts[chapter] || chapterControlCounts[chapter] === 0) {
        errors.push({
          type: 'error',
          message: `Canon Rule R2 verletzt: Kapitel ${chapter} hat keine control-Szene`,
          location: `chapter_${chapter}`
        });
      }
    }
  });
}

/**
 * Prüft, ob alle Szenen vom Start aus erreichbar sind
 */
function validateReachability(
  startSceneId: string,
  scenes: ScenesCollection,
  warnings: ValidationError[]
): void {
  const reachable = new Set<string>();
  const queue = [startSceneId];

  // BFS
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

  // Finde unerreichbare Szenen (außer secret)
  Object.keys(scenes).forEach(sceneId => {
    if (!reachable.has(sceneId)) {
      const scene = scenes[sceneId];
      if (!scene.tags?.includes('secret')) {
        warnings.push({
          type: 'warning',
          message: `Szene '${sceneId}' ist vom Start nicht erreichbar (keine secret-Markierung)`,
          scene_id: sceneId
        });
      }
    }
  });
}

/**
 * Prüft auf Dead-Ends (Szenen ohne Ending, die nirgendwohin führen)
 */
function validateNoDeadEnds(
  scenes: ScenesCollection,
  endings: EndingsCollection,
  errors: ValidationError[]
): void {
  Object.values(scenes).forEach(scene => {
    const hasValidExit = scene.choices.some(choice => {
      return (choice.next && scenes[choice.next]) || (choice.ending && endings[choice.ending]);
    });

    if (!hasValidExit) {
      errors.push({
        type: 'error',
        message: `Szene '${scene.id}' ist ein Dead-End (keine gültige Choice führt weiter)`,
        scene_id: scene.id
      });
    }
  });
}

/**
 * Prüft auf potenzielle Endlosloops (SCCs ohne Exit)
 * Verwendet Tarjan's Algorithm für SCC-Detection
 */
function validateNoInfiniteLoops(
  scenes: ScenesCollection,
  warnings: ValidationError[]
): void {
  // Tarjan's Algorithm für SCC
  let index = 0;
  const stack: string[] = [];
  const indices = new Map<string, number>();
  const lowlinks = new Map<string, number>();
  const onStack = new Set<string>();
  const sccs: string[][] = [];

  function strongconnect(sceneId: string): void {
    indices.set(sceneId, index);
    lowlinks.set(sceneId, index);
    index++;
    stack.push(sceneId);
    onStack.add(sceneId);

    const scene = scenes[sceneId];
    if (!scene) return;

    scene.choices.forEach(choice => {
      if (!choice.next) return;
      const nextId = choice.next;

      if (!indices.has(nextId)) {
        strongconnect(nextId);
        lowlinks.set(sceneId, Math.min(lowlinks.get(sceneId)!, lowlinks.get(nextId)!));
      } else if (onStack.has(nextId)) {
        lowlinks.set(sceneId, Math.min(lowlinks.get(sceneId)!, indices.get(nextId)!));
      }
    });

    if (lowlinks.get(sceneId) === indices.get(sceneId)) {
      const scc: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        scc.push(w);
      } while (w !== sceneId);

      if (scc.length > 1) {
        sccs.push(scc);
      }
    }
  }

  // Finde alle SCCs
  Object.keys(scenes).forEach(sceneId => {
    if (!indices.has(sceneId)) {
      strongconnect(sceneId);
    }
  });

  // Prüfe SCCs auf Exits
  sccs.forEach(scc => {
    const sccSet = new Set(scc);
    let hasExit = false;

    // Prüfe, ob es einen Ausgang aus der SCC gibt
    scc.forEach(sceneId => {
      const scene = scenes[sceneId];
      if (!scene) return; // Szene existiert nicht (sollte bereits anderswo als Error gemeldet sein)

      scene.choices.forEach(choice => {
        if (choice.ending) {
          hasExit = true;
        } else if (choice.next && !sccSet.has(choice.next)) {
          hasExit = true;
        }
      });
    });

    if (!hasExit) {
      warnings.push({
        type: 'warning',
        message: `Potenzielle Endlosschleife erkannt: ${scc.join(', ')} (SCC ohne Ausgang)`,
        location: 'graph'
      });
    }
  });
}

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * Validiert eine komplette Story-Collection
 */
export function validateContent(
  startSceneId: string,
  scenes: ScenesCollection,
  endings: EndingsCollection
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Prüfe, ob Start-Szene existiert
  if (!scenes[startSceneId]) {
    errors.push({
      type: 'error',
      message: `Start-Szene '${startSceneId}' existiert nicht`,
      location: 'manifest'
    });
    return { valid: false, errors, warnings };
  }

  // 2. Prüfe auf Duplikate bei Scene IDs
  validateUniqueness(scenes, errors);

  // 3. Prüfe jede Szene einzeln
  Object.values(scenes).forEach(scene => {
    validateScene(scene, scenes, endings, errors, warnings);
  });

  // 4. Prüfe Canon Rule R1 (mind. 1 station_end pro Kapitel)
  validateCanonRuleR1(scenes, errors, warnings);

  // 5. Prüfe Canon Rule R2 (Kontrollen in Kap. 2/3/5)
  validateCanonRuleR2(scenes, errors);

  // 6. Prüfe Erreichbarkeit
  validateReachability(startSceneId, scenes, warnings);

  // 7. Prüfe auf Dead-Ends
  validateNoDeadEnds(scenes, endings, errors);

  // 8. Prüfe auf Endlosloops
  validateNoInfiniteLoops(scenes, warnings);

  // Ergebnis
  const valid = errors.length === 0;
  return { valid, errors, warnings };
}

/**
 * Gibt Validation-Ergebnisse formatiert in der Konsole aus
 */
export function printValidationResult(result: ValidationResult): void {
  if (result.valid) {
    console.log('✅ Content-Validierung erfolgreich');
  } else {
    console.error('❌ Content-Validierung fehlgeschlagen');
  }

  if (result.errors.length > 0) {
    console.group('🔴 Errors:');
    result.errors.forEach(err => {
      const location = err.scene_id || err.location || 'unknown';
      console.error(`  [${location}] ${err.message}`);
    });
    console.groupEnd();
  }

  if (result.warnings.length > 0) {
    console.group('⚠️  Warnings:');
    result.warnings.forEach(warn => {
      const location = warn.scene_id || warn.location || 'unknown';
      console.warn(`  [${location}] ${warn.message}`);
    });
    console.groupEnd();
  }

  console.log(`\nZusammenfassung: ${result.errors.length} Errors, ${result.warnings.length} Warnings`);
}
