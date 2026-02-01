export type Position = { x: number; y: number };
export type Direction = 'up' | 'down' | 'left' | 'right';
export type EntityType = 'player' | 'npc' | 'object';

export interface Entity {
  id: string;
  type: EntityType;
  position: Position;
  spriteId: string;
  interactionId?: string;
  name?: string;
  facing?: Direction;
  isMoving?: boolean;
  targetPosition?: Position;
  moveProgress?: number; // 0 to 1
}

export interface Room {
  id: string;
  width: number;
  height: number;
  // Simple tilemap: 0 = Floor, 1 = Wall, 2 = Door
  tiles: number[][]; 
  entities: Entity[];
}

export interface SpriteSet {
  idle: HTMLCanvasElement | ImageBitmap;
  // We can expand this later for animation frames
}

export type AssetMap = Record<string, SpriteSet>;
