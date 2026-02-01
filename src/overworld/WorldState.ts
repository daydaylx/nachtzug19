import { Entity, Position, Room, Direction } from './Types';

export class WorldState {
  currentRoom: Room;
  player: Entity;
  
  // Interaction event callback
  onInteraction: (interactionId: string) => void;

  constructor(onInteraction: (id: string) => void) {
    this.onInteraction = onInteraction;
    
    // Setup Demo Room
    this.player = {
      id: 'player',
      type: 'player',
      position: { x: 5, y: 5 },
      spriteId: 'player',
      facing: 'down'
    };

    this.currentRoom = this.createDemoRoom();
    // Add player to room entities for rendering sort, 
    // but usually player is special. We'll handle player separate or in list.
    // For now, let's keep player separate in state, but renderer merges them.
  }

  private createDemoRoom(): Room {
    const width = 20;
    const height = 12;
    const tiles: number[][] = [];

    for (let y = 0; y < height; y++) {
      const row: number[] = [];
      for (let x = 0; x < width; x++) {
        // Borders are walls
        if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
          row.push(1); // Wall
        } else {
          row.push(0); // Floor
        }
      }
      tiles.push(row);
    }
    
    // Add a door
    tiles[0][10] = 2; // Door at top

    return {
      id: 'demo_room',
      width,
      height,
      tiles,
      entities: [
        {
          id: 'npc_1',
          type: 'npc',
          position: { x: 10, y: 4 },
          spriteId: 'npc_conductor',
          interactionId: 'npc_conductor',
          name: 'Conductor'
        },
        {
          id: 'npc_2',
          type: 'npc',
          position: { x: 15, y: 8 },
          spriteId: 'npc_generic',
          interactionId: 'npc_boy',
          name: 'Boy'
        }
      ]
    };
  }

  // Simple Movement Logic
  movePlayer(direction: Direction) {
    if (this.player.isMoving) return;

    const target = { ...this.player.position };
    switch (direction) {
      case 'up': target.y -= 1; break;
      case 'down': target.y += 1; break;
      case 'left': target.x -= 1; break;
      case 'right': target.x += 1; break;
    }

    this.player.facing = direction;

    if (this.isWalkable(target)) {
        this.player.position = target; // Instant snap for prototype (add tween later)
        this.checkProximity();
    }
  }

  moveTo(targetX: number, targetY: number) {
      // Very basic pathfinding or direct teleport for "Tap to Move" prototype
      // For Z1 style, usually orthogonal movement.
      // Let's just try to move one step towards target for now if adjacent
      const dx = targetX - this.player.position.x;
      const dy = targetY - this.player.position.y;

      if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) this.movePlayer('right');
          else if (dx < 0) this.movePlayer('left');
      } else {
          if (dy > 0) this.movePlayer('down');
          else if (dy < 0) this.movePlayer('up');
      }
  }

  private isWalkable(pos: Position): boolean {
    // Check bounds
    if (pos.x < 0 || pos.x >= this.currentRoom.width ||
        pos.y < 0 || pos.y >= this.currentRoom.height) return false;

    // Check tiles
    const tile = this.currentRoom.tiles[pos.y][pos.x];
    if (tile === 1) return false; // Wall

    // Check entities
    if (this.currentRoom.entities.some(e => e.position.x === pos.x && e.position.y === pos.y)) {
        return false;
    }

    return true;
  }

  private checkProximity() {
      // If adjacent to an interactable, we could show indicator
      // The renderer checks this.
  }
  
  interact() {
      // Check facing tile
      const target = { ...this.player.position };
      switch (this.player.facing) {
        case 'up': target.y -= 1; break;
        case 'down': target.y += 1; break;
        case 'left': target.x -= 1; break;
        case 'right': target.x += 1; break;
      }
      
      const entity = this.currentRoom.entities.find(e => e.position.x === target.x && e.position.y === target.y);
      if (entity && entity.interactionId) {
          this.onInteraction(entity.interactionId);
      }
  }
}
