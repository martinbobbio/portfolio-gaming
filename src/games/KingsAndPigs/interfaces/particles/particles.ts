import { Point, Texture } from 'pixi.js';
import { Animation } from '..';

export interface ParticlesState {
  currentAnimation?: Animation;
  inverted: boolean;
  position: Point;
  deleteParticles: () => void;
  setParticles: (
    key: keyof ParticlesAnimations,
    point: Point,
    inverted: boolean
  ) => void;
}

export interface ParticlesAnimations {
  fall: Animation;
  jump: Animation;
}

export interface ParticlesTextures {
  fall: Texture;
  jump: Texture;
}
