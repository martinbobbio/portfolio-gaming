import { Texture } from 'pixi.js';
import { Animation } from '..';

export interface DialogBoxState {
  animations: DialogBoxAnimations;
  currentAnimation: Animation;
  visible: boolean;
  setAnimation: (key: keyof DialogBoxAnimations) => void;
  deleteAnimation: () => void;
}

export interface DialogBoxAnimations {
  helloIn: Animation;
  helloOut: Animation;
  deadIn: Animation;
  deadOut: Animation;
  exclamationIn: Animation;
  exclamationOut: Animation;
}

export interface DialogBoxTextures {
  helloIn: Texture;
  helloOut: Texture;
  deadIn: Texture;
  deadOut: Texture;
  exclamationIn: Texture;
  exclamationOut: Texture;
}
