import { AssetMap, SpriteSet } from './Types';

/**
 * Generates placeholder pixel art assets programmatically.
 * Used to avoid external dependencies or file loading issues during prototyping.
 */
export class AssetGenerator {
  // Noir Palette
  private static readonly COLORS = {
    black: '#0d0d0d',
    white: '#f0f0f0',
    gray: '#4a4a4a',
    lightGray: '#888888',
    amber: '#ffb000',
    bg: '#1a1a1a'
  };

  static generateAll(): AssetMap {
    const assets: AssetMap = {};

    assets['player'] = this.createPlayerSprite();
    assets['npc_generic'] = this.createNpcSprite(this.COLORS.lightGray);
    assets['npc_conductor'] = this.createNpcSprite(this.COLORS.white); // Brighter
    assets['indicator_exclaim'] = this.createIndicator('!', this.COLORS.amber);
    assets['tile_floor'] = this.createTile(this.COLORS.bg, this.COLORS.gray, 0);
    assets['tile_wall'] = this.createTile(this.COLORS.black, this.COLORS.gray, 1);
    assets['tile_door'] = this.createTile(this.COLORS.black, this.COLORS.amber, 2);

    return assets;
  }

  private static createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  private static createPlayerSprite(): SpriteSet {
    const c = this.createCanvas(16, 16);
    const ctx = c.getContext('2d')!;

    // Body
    ctx.fillStyle = this.COLORS.white;
    ctx.fillRect(4, 4, 8, 10);
    
    // Hat / Hair (Noir style)
    ctx.fillStyle = this.COLORS.black;
    ctx.fillRect(4, 2, 8, 3);

    // Eyes (simple dots)
    ctx.fillStyle = this.COLORS.black;
    ctx.fillRect(5, 6, 2, 2);
    ctx.fillRect(9, 6, 2, 2);

    return { idle: c };
  }

  private static createNpcSprite(color: string): SpriteSet {
    const c = this.createCanvas(16, 16);
    const ctx = c.getContext('2d')!;

    // Body
    ctx.fillStyle = color;
    ctx.fillRect(4, 5, 8, 9);
    
    // Head
    ctx.fillStyle = this.COLORS.gray;
    ctx.fillRect(5, 2, 6, 4);

    return { idle: c };
  }

  private static createIndicator(symbol: string, color: string): SpriteSet {
    const c = this.createCanvas(16, 16);
    const ctx = c.getContext('2d')!;

    // Floating Bubble
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(8, 8, 6, 0, Math.PI * 2);
    ctx.fill();

    // Symbol
    ctx.fillStyle = this.COLORS.black;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, 8, 9);

    // Bounce animation base (static here, animated in renderer)
    return { idle: c };
  }

  private static createTile(baseColor: string, detailColor: string, type: number): SpriteSet {
    const c = this.createCanvas(16, 16);
    const ctx = c.getContext('2d')!;

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 16, 16);

    if (type === 0) { // Floor
        // Simple noise/grain
        ctx.fillStyle = detailColor;
        ctx.globalAlpha = 0.2;
        ctx.fillRect(4, 4, 2, 2);
        ctx.fillRect(10, 12, 2, 2);
        ctx.globalAlpha = 1.0;
    } else if (type === 1) { // Wall
        ctx.strokeStyle = detailColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, 14, 14);
        ctx.beginPath();
        ctx.moveTo(1,1); ctx.lineTo(15,15);
        ctx.stroke();
    } else if (type === 2) { // Door
        ctx.fillStyle = detailColor; // Amber
        ctx.fillRect(4, 2, 8, 12);
    }

    return { idle: c };
  }
}
