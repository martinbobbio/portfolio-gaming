import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface DecorationsState {
  animation: Animation;
  hitbox: Block;
  position: Point;
}

export interface DecorationsAnimations {
  candle: Animation;
  smallChain: Animation;
  bigChain: Animation;
}

export interface DecorationsTextures {
  candle: Texture;
  smallChain: Texture;
  bigChain: Texture;
}
