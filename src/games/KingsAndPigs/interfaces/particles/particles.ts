import { Point, Texture } from 'pixi.js';
import { Animation } from '..';

export interface ParticlesState {
  animation: Animation;
  position: Point;
}

export interface ParticlesAnimations {
  run: Animation;
  jump: Animation;
}

export interface ParticlesTextures {
  run: Texture;
  jump: Texture;
}
