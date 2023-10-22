import { Texture } from 'pixi.js';
import { Animation } from '..';

export interface ParticlesState {
  currentAnimation?: Animation;
  deleteParticles: () => void;
  setParticles: (key: keyof ParticlesAnimations) => void;
}

export interface ParticlesAnimations {
  run: Animation;
  jump: Animation;
}

export interface ParticlesTextures {
  run: Texture;
  jump: Texture;
}
