import { Texture } from 'pixi.js';
import { Animation } from '..';

export interface LivesAndCoinsAnimations {
  liveBar: Animation;
  smallHeartIdle: Animation;
  bigHeartIdle: Animation;
  bigDiamondIdle: Animation;
  numbers: Animation;
}

export interface LivesAndCoinsTextures {
  liveBar: Texture;
  smallHeartIdle: Texture;
  bigHeartIdle: Texture;
  bigDiamondIdle: Texture;
  numbers: Texture;
}
