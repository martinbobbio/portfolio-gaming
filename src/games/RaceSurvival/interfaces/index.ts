import { Sound } from '@pixi/sound';
import { Point, Texture } from 'pixi.js';

export interface TexturesRaceSurvival {
  car: Texture;
  background: Texture;
}

export interface SoundsRaceSurvival {
  car: Sound;
  explosion: Sound;
  music: Sound;
}

export interface Vehicle {
  position: Point;
  tilePosition: Point;
  velocity: Point;
  width: number;
  height: number;
}
