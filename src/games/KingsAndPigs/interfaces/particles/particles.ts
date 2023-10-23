import { Point, Texture } from 'pixi.js';
import { Animation } from '..';

export interface ParticlesState {
  items: Particle[];
  deleteParticles: () => void;
  addParticle: (
    key: keyof ParticlesAnimations,
    point: Point,
    inverted: boolean
  ) => void;
}

export interface Particle {
  currentAnimation: Animation;
  inverted: boolean;
  position: Point;
}

export interface ParticlesAnimations {
  fall: Animation;
  jump: Animation;
}

export interface ParticlesTextures {
  fall: Texture;
  jump: Texture;
}
