import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface PlayerState {
  position: Point;
  velocity: Point;
  hitbox: Block;
  gravity: number;
  currentAnimation: keyof PlayerAnimations;
  animations: PlayerAnimations;
  jump: {
    power: number;
    double: boolean;
  };
}

export interface PlayerAnimations {
  idle: Animation;
  run: Animation;
  attack: Animation;
}

export interface PlayerTextures {
  idle: Texture;
  run: Texture;
  attack: Texture;
}
