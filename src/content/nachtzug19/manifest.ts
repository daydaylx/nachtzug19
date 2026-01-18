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
      scene_count: 24
    },
    {
      number: 2,
      title: 'Die erste Kontrolle',
      scene_count: 25
    },
    {
      number: 3,
      title: 'Wagen 7',
      scene_count: 27
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
 */
export const nachtzug19Endings: EndingsCollection = {
  'ending_test': {
    id: 'ending_test',
    titel: 'Test-Ende',
    beschreibung: 'Dies ist ein temporäres Test-Ende für das MVP.\n\nDu hast die ersten beiden Kapitel durchgespielt. Weitere Kapitel folgen in späteren Versionen.',
    title: 'Test-Ende',
    narrative: 'Dies ist ein temporäres Test-Ende für das MVP.\n\nDu hast die ersten beiden Kapitel durchgespielt. Weitere Kapitel folgen in späteren Versionen.'
  },
  'truth_ending': {
    id: 'truth_ending',
    titel: 'Die Wahrheit',
    title: 'Die Wahrheit',
    beschreibung: 'Du bist ausgestiegen. Der Bahnsteig liegt vor dir. Die Wahrheit wartet.',
    narrative: 'Du bist ausgestiegen. Der Bahnsteig liegt vor dir. Die Wahrheit wartet.'
  },
  'escape_ending': {
    id: 'escape_ending',
    titel: 'Ewige Fahrt',
    title: 'Ewige Fahrt',
    beschreibung: 'Du bleibst im Zug. Für immer. Die Türen schließen sich. Die Fahrt geht weiter.',
    narrative: 'Du bleibst im Zug. Für immer. Die Türen schließen sich. Die Fahrt geht weiter.'
  },
  'guilt_ending': {
    id: 'guilt_ending',
    titel: 'Verantwortung',
    title: 'Verantwortung',
    beschreibung: 'Du steigst aus und trägst die Last dessen, was war. Es ist Zeit, sich zu stellen.',
    narrative: 'Du steigst aus und trägst die Last dessen, was war. Es ist Zeit, sich zu stellen.'
  },
  'love_ending': {
    id: 'love_ending',
    titel: 'Verbindung',
    title: 'Verbindung',
    beschreibung: 'Du folgst jemandem. Jemand, der wichtig war. Wichtig ist. Die Reise geht weiter – aber nicht allein.',
    narrative: 'Du folgst jemandem. Jemand, der wichtig war. Wichtig ist. Die Reise geht weiter – aber nicht allein.'
  },
  'limbo_ending': {
    id: 'limbo_ending',
    titel: 'Limbus',
    title: 'Limbus',
    beschreibung: 'Du bleibst. Weder hier noch dort. Im Zwischenraum. Die Fahrt endet nie – und beginnt nie neu.',
    narrative: 'Du bleibst. Weder hier noch dort. Im Zwischenraum. Die Fahrt endet nie – und beginnt nie neu.'
  }
};
