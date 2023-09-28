import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface PlayerState {
  position: Point;
  velocity: Point;
  hitbox: Block;
  gravity: number;
  inverted: boolean;
  currentAnimation: keyof PlayerAnimations;
  animations: PlayerAnimations;
}

export interface PlayerAnimations {
  idle: Animation;
  run: Animation;
}

export interface TexturesPlayer {
  idle: Texture;
  run: Texture;
}
