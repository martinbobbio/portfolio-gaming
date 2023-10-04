import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface PlayerState {
  position: Point;
  velocity: Point;
  hitbox: Block;
  gravity: number;
  currentAnimation: Animation;
  animations: PlayerAnimations;
  inverted: boolean;
  jump: {
    power: number;
    double: boolean;
  };
}

export interface PlayerAnimations {
  idle: Animation;
  run: Animation;
  attack: Animation;
  doorIn: Animation;
  doorOut: Animation;
  dead: Animation;
  hit: Animation;
}

export interface PlayerTextures {
  idle: Texture;
  run: Texture;
  attack: Texture;
  doorIn: Texture;
  doorOut: Texture;
  dead: Texture;
  hit: Texture;
}
