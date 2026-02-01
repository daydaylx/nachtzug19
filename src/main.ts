import { WorldState } from './overworld/WorldState';
import { WorldRenderer } from './overworld/WorldRenderer';
import { gameEngine } from './domain/engine/gameEngine';

const app = document.getElementById('app');

if (app) {
  // Init State
  const worldState = new WorldState((interactionId) => {
    console.log('Interaction triggered:', interactionId);
    // Integration Point:
    // const sceneId = mapInteractionToScene(interactionId);
    // gameEngine.makeChoice(...) or loadScene
    console.log('Current Engine State:', gameEngine.getState());
    alert(`Interaction: ${interactionId}\n(Engine State logged to console)`);
  });

  // Init Renderer
  new WorldRenderer(app, worldState);

  // Keyboard Input (Additional)
  window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': worldState.movePlayer('up'); break;
        case 'ArrowDown': worldState.movePlayer('down'); break;
        case 'ArrowLeft': worldState.movePlayer('left'); break;
        case 'ArrowRight': worldState.movePlayer('right'); break;
        case 'Enter': worldState.interact(); break;
        case ' ': worldState.interact(); break;
    }
  });

} else {
  console.error('App container not found!');
}

