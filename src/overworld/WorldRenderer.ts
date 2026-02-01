import { AssetGenerator } from './AssetGenerator';
import { AssetMap } from './Types';
import { WorldState } from './WorldState';

export class WorldRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: WorldState;
  private assets: AssetMap;
  
  private readonly TILE_SIZE = 16;
  private readonly VIEW_WIDTH = 320;
  private readonly VIEW_HEIGHT = 180;
  
  private lastTime = 0;

  constructor(container: HTMLElement, state: WorldState) {
    this.state = state;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.VIEW_WIDTH;
    this.canvas.height = this.VIEW_HEIGHT;
    
    // Pixel art styling
    this.canvas.style.imageRendering = 'pixelated';
    this.canvas.style.backgroundColor = '#0d0d0d';
    
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    
    this.assets = AssetGenerator.generateAll();
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Input Handling (Basic)
    this.canvas.addEventListener('mousedown', (e) => this.handleClick(e));
    this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
    
    requestAnimationFrame((t) => this.loop(t));
  }

  private resize() {
      // Integer scaling
      const aspect = this.VIEW_WIDTH / this.VIEW_HEIGHT;
      const windowAspect = window.innerWidth / window.innerHeight;
      
      let displayWidth, displayHeight;
      
      if (windowAspect > aspect) {
          displayHeight = window.innerHeight;
          displayWidth = displayHeight * aspect;
      } else {
          displayWidth = window.innerWidth;
          displayHeight = displayWidth / aspect;
      }

      this.canvas.style.width = `${Math.floor(displayWidth)}px`;
      this.canvas.style.height = `${Math.floor(displayHeight)}px`;
  }

  private handleClick(e: MouseEvent) {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (this.VIEW_WIDTH / rect.width);
      const y = (e.clientY - rect.top) * (this.VIEW_HEIGHT / rect.height);
      
      this.handleInput(x, y);
  }

  private handleTouch(e: TouchEvent) {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) * (this.VIEW_WIDTH / rect.width);
      const y = (touch.clientY - rect.top) * (this.VIEW_HEIGHT / rect.height);
      
      this.handleInput(x, y);
  }

  private handleInput(pixelX: number, pixelY: number) {
      const tileX = Math.floor(pixelX / this.TILE_SIZE);
      const tileY = Math.floor(pixelY / this.TILE_SIZE);
      
      // If tapped on player, interact? No, interaction is usually separate button or tapping neighbor.
      // Simple logic: If tap on adjacent tile with entity -> Interact. Else -> Move.
      
      const dx = tileX - this.state.player.position.x;
      const dy = tileY - this.state.player.position.y;
      
      if (Math.abs(dx) + Math.abs(dy) === 1) {
          const targetEntity = this.state.currentRoom.entities.find(e => e.position.x === tileX && e.position.y === tileY);
          if (targetEntity) {
              this.state.player.facing = dx === 1 ? 'right' : dx === -1 ? 'left' : dy === 1 ? 'down' : 'up';
              this.state.interact();
              return;
          }
      }
      
      this.state.moveTo(tileX, tileY);
  }

  private loop(time: number) {
    // const dt = time - this.lastTime;
    this.lastTime = time;

    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  private render() {
    this.ctx.fillStyle = '#0d0d0d';
    this.ctx.fillRect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);

    // Camera center? For now, fixed room view (Zelda 1 style)
    // If room is larger than view, we need camera. 
    // Demo room is 20x12 (320x192). Height is 192 vs 180 view. Close enough.
    // Let's offset slightly to center vertically.
    const offsetX = 0;
    const offsetY = (this.VIEW_HEIGHT - (this.state.currentRoom.height * this.TILE_SIZE)) / 2;

    this.ctx.save();
    this.ctx.translate(Math.floor(offsetX), Math.floor(offsetY));

    // 1. Tiles
    for (let y = 0; y < this.state.currentRoom.height; y++) {
        for (let x = 0; x < this.state.currentRoom.width; x++) {
            const tileType = this.state.currentRoom.tiles[y][x];
            let sprite;
            if (tileType === 1) sprite = this.assets['tile_wall'];
            else if (tileType === 2) sprite = this.assets['tile_door'];
            else sprite = this.assets['tile_floor'];
            
            if (sprite) {
                this.ctx.drawImage(sprite.idle, x * this.TILE_SIZE, y * this.TILE_SIZE);
            }
        }
    }

    // 2. Entities (Sort by Y)
    const allEntities = [...this.state.currentRoom.entities, this.state.player];
    allEntities.sort((a, b) => a.position.y - b.position.y);

    for (const entity of allEntities) {
        let sprite = this.assets[entity.spriteId];
        if (!sprite && entity.type === 'player') sprite = this.assets['player'];
        
        if (sprite) {
             this.ctx.drawImage(sprite.idle, entity.position.x * this.TILE_SIZE, entity.position.y * this.TILE_SIZE);
        }
        
        // Indicator if close to player
        if (entity !== this.state.player && entity.interactionId) {
             const dx = Math.abs(entity.position.x - this.state.player.position.x);
             const dy = Math.abs(entity.position.y - this.state.player.position.y);
             if (dx + dy === 1) {
                 // Draw Indicator
                 const ind = this.assets['indicator_exclaim'];
                 const bounce = Math.sin(this.lastTime / 200) * 2;
                 this.ctx.drawImage(ind.idle, entity.position.x * this.TILE_SIZE, entity.position.y * this.TILE_SIZE - 10 + bounce);
             }
        }
    }

    this.ctx.restore();
  }
}
