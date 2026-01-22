// ============================================================================
// NACHTZUG 19 - Szenen Export
// ============================================================================
// Zentraler Export aller Szenen für NACHTZUG 19
// ============================================================================

import { ScenesCollection } from '../../../domain/types';
import { chapter1Scenes } from './c1';
import { chapter2Scenes } from './c2';
import { chapter3Scenes } from './c3';
import { chapter4Scenes } from './c4';
import { c5Scenes } from './c5';
import { c6Scenes } from './c6';
import { c7Scenes } from './c7';
import { endingScenes } from './endings';

/**
 * Alle Szenen der NACHTZUG 19 Story
 */
export const nachtzug19Scenes: ScenesCollection = {
  ...chapter1Scenes,
  ...chapter2Scenes,
  ...chapter3Scenes,
  ...chapter4Scenes,
  ...c5Scenes,
  ...c6Scenes,
  ...c7Scenes,
  ...endingScenes
};
