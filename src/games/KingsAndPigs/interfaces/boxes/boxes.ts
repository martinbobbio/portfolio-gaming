import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface BoxState {
  position: Point;
  velocity: Point;
  hitbox: Block;
  currentAnimation: Animation;
}

export interface BoxAnimations {
  idle: Animation;
}

export interface BoxTextures {
  idle: Texture;
}
