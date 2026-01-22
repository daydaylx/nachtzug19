// ============================================================================
// NACHTZUG 19 - Manifest
// ============================================================================
// Einstiegspunkt für die Nachtzug 19-Story
// ============================================================================

import { Manifest, EndingsCollection } from '../../domain/types';

export const nachtzug19Manifest: Manifest = {
  id: 'nachtzug19',
  title: 'NACHTZUG 19',
  start_scene_id: 'c1_s01_platform',
  chapters: [
    {
      number: 1,
      title: 'Leerer Bahnsteig',
      scene_count: 14
    },
    {
      number: 2,
      title: 'Die erste Kontrolle',
      scene_count: 15
    },
    {
      number: 3,
      title: 'Wagen 7',
      scene_count: 15
    },
    {
      number: 4,
      title: 'Spiegelungen',
      scene_count: 26
    },
    {
      number: 5,
      title: 'Die letzte Kontrolle',
      scene_count: 25
    },
    {
      number: 6,
      title: 'Ende der Linie',
      scene_count: 26
    },
    {
      number: 7,
      title: 'Entscheidung',
      scene_count: 26
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
    titel: 'Wahrheit',
    beschreibung: 'Du hast die Wahrheit akzeptiert. Den Tod. Das Leben. Dich selbst.'
  },
  'LOVE': {
    id: 'LOVE',
    titel: 'Liebe',
    beschreibung: 'Du hast jemanden gefunden. Oder... sie hat dich gefunden.'
  },
  'GUILT': {
    id: 'GUILT',
    titel: 'Schuld',
    beschreibung: 'Du trägst die Verantwortung für die Toten. Nicht ihre Schuld. Sondern ihre Erinnerung.'
  },
  'ESCAPE': {
    id: 'ESCAPE',
    titel: 'Flucht',
    beschreibung: 'Du bist geblieben. Im Zug. In der Schleife. In der Sicherheit.'
  },
  'LIMBO': {
    id: 'LIMBO',
    titel: 'Limbo',
    beschreibung: 'Du hast nicht gewählt. Weder Wahrheit noch Flucht. Weder Liebe noch Schuld.'
  }
};
