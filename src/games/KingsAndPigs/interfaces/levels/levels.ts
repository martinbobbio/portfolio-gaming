import { Texture } from 'pixi.js';
import { Block } from '..';

export type AvailablesLevels = 1 | 2 | 3;

export interface LevelKingAndPigs {
  current: AvailablesLevels;
  source: string;
  texture: Texture | null;
  collisionBlocks: Block[];
  initialPosition: Block;
  doors: LevelDoor[];
}

export interface LevelDoor {
  type: 'next' | 'prev';
  block: Block;
}
