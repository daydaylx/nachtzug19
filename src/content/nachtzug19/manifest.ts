// ============================================================================
// NACHTZUG 19 - Manifest
// ============================================================================
// Einstiegspunkt für die Nachtzug 19-Story
// ============================================================================

import { Manifest, EndingsCollection } from '../../domain/types';

export const nachtzug19Manifest: Manifest = {
  id: 'nachtzug19',
  title: 'NACHTZUG 19',
  start_scene_id: 'c1_hub_platform',
  chapters: [
    {
      number: 1,
      title: 'Leerer Bahnsteig',
      scene_count: 18
    },
    {
      number: 2,
      title: 'Die erste Kontrolle',
      scene_count: 18
    },
    {
      number: 3,
      title: 'Wagen 7',
      scene_count: 18
    },
    {
      number: 4,
      title: 'Spiegelungen',
      scene_count: 18
    },
    {
      number: 5,
      title: 'Die letzte Kontrolle',
      scene_count: 27
    },
    {
      number: 6,
      title: 'Ende der Linie',
      scene_count: 21
    },
    {
      number: 7,
      title: 'Entscheidung',
      scene_count: 38
    }
  ]
};

/**
 * Endings für NACHTZUG 19
 * HINWEIS: Endings sind jetzt interaktive Szenen in scenes/endings.ts
 * Diese Collection bleibt leer für Backwards-Kompatibilität
 */
export const nachtzug19Endings: EndingsCollection = {
  'TRUTH': {
    id: 'TRUTH',
    title: 'Wahrheit',
    narrative: 'Du hast die Wahrheit akzeptiert. Den Tod. Das Leben. Dich selbst.'
  },
  'LOVE': {
    id: 'LOVE',
    title: 'Liebe',
    narrative: 'Du hast jemanden gefunden. Oder... sie hat dich gefunden.'
  },
  'GUILT': {
    id: 'GUILT',
    title: 'Schuld',
    narrative: 'Du trägst die Verantwortung für die Toten. Nicht ihre Schuld. Sondern ihre Erinnerung.'
  },
  'ESCAPE': {
    id: 'ESCAPE',
    title: 'Flucht',
    narrative: 'Du bist geblieben. Im Zug. In der Schleife. In der Sicherheit.'
  },
  'LIMBO': {
    id: 'LIMBO',
    title: 'Limbo',
    narrative: 'Du hast nicht gewählt. Weder Wahrheit noch Flucht. Weder Liebe noch Schuld.'
  }
};
