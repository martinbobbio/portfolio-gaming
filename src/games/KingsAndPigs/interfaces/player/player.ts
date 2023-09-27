import { Point, Texture } from 'pixi.js';
import { Animation } from '..';

export interface PlayerState {
  position: Point;
  velocity: Point;
  gravity: number;
  inverted: boolean;
  currentAnimation: Animation;
  animations: Animation[];
}

export interface TexturesPlayer {
  idle: Texture;
}
