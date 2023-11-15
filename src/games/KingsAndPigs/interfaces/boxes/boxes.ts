import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface BoxState {
  position: Point;
  velocity: Point;
  hitbox: Block;
  behavior: BoxBehaviors;
  currentAnimation: Animation;
}

export type BoxBehaviors = 'IDLE' | 'HIT' | 'BROKEN';

export interface BoxAnimations {
  idle: Animation;
  hit: Animation;
}

export interface BoxTextures {
  idle: Texture;
  hit: Texture;
}
