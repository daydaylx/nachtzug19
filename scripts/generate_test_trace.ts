
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadNachtzug19Story } from '../src/domain/engine/loadStory';
import { GameEngine } from '../src/domain/engine/gameEngine';
import { GameState, Choice } from '../src/domain/types';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRACE_OUTPUT_PATH = path.join(__dirname, '../docs/evidence/trace_golden_master.json');
const NUM_TRACES = 20; // Number of random playthroughs

type TraceStep = {
  scene_id: string;
  choice_id: string;
  state_after: Partial<GameState>; // Store key parts of state
};

type Trace = {
  id: number;
  seed: number; // Placeholder if we were using a seeded RNG
  steps: TraceStep[];
  ending: string | null;
};

async function generateTraces() {
  console.log('🤖 Generating Golden Master Traces...');
  
  // 1. Load Story
  const storyBundle = await loadNachtzug19Story();
  console.log(`✅ Story loaded: ${Object.keys(storyBundle.scenes).length} scenes`);

  // 2. Initialize Engine
  const engine = new GameEngine(storyBundle.scenes, storyBundle.endings, storyBundle.startSceneId);
  
  const traces: Trace[] = [];

  for (let i = 0; i < NUM_TRACES; i++) {
    engine.startGame();
    const steps: TraceStep[] = [];
    
    // Play until end
    let stepsCount = 0;
    while (!engine.getState().isGameOver && stepsCount < 100) {
      const state = engine.getState();
      const currentScene = engine.getCurrentScene();
      const choices = engine.getAvailableChoices();
      
      if (choices.length === 0) {
        console.error(`❌ Dead end at ${state.current_scene_id}`);
        break;
      }

      // Random choice
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      
      engine.makeChoice(randomChoice);
      
      // Record step
      // We store a simplified state to keep file size manageable but useful for verification
      const newState = engine.getState();
      steps.push({
        scene_id: currentScene?.id || 'unknown',
        choice_id: randomChoice.id || 'unknown',
        state_after: {
          stats: { ...newState.stats },
          tickets: { ...newState.tickets },
          pressure: { ...newState.pressure },
          relations: { ...newState.relations },
          items: { ...newState.items },
          current_scene_id: newState.current_scene_id,
          chapter_index: newState.chapter_index,
          station_count: newState.station_count,
          visited_scene_ids: [...newState.visited_scene_ids] // important for graph logic
        }
      });
      
      stepsCount++;
    }

    traces.push({
      id: i,
      seed: i, // Not real seed yet
      steps: steps,
      ending: engine.getState().endingId || null
    });
    
    process.stdout.write('.');
  }
  
  console.log('\n✅ Generation complete.');
  
  // 3. Write Output
  await fs.mkdir(path.dirname(TRACE_OUTPUT_PATH), { recursive: true });
  await fs.writeFile(TRACE_OUTPUT_PATH, JSON.stringify(traces, null, 2), 'utf-8');
  console.log(`💾 Saved ${traces.length} traces to ${TRACE_OUTPUT_PATH}`);
}

generateTraces().catch(e => {
  console.error(e);
  process.exit(1);
});
