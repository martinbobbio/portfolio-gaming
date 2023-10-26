import { Point, Texture } from 'pixi.js';
import { Block } from '..';

export type AvailablesLevels = 1 | 2 | 3;

export interface LevelKingAndPigs {
  current: AvailablesLevels;
  texture: Texture | null;
  collisionBlocks: Block[];
  decorations?: DecorationsLevel;
  diamonds?: Block[];
  initialPosition: Point;
  doors: LevelDoor[];
  player: {
    position: Point;
  };
  onNextLevel: () => void;
  onPrevLevel: () => void;
  updatePlayerPosition: (point: Point) => void;
}

export interface DecorationsLevel {
  candles?: Block[];
  smallChains?: Block[];
  bigChains?: Block[];
  windows?: Block[];
}

export interface LevelDoor {
  type: 'next' | 'prev';
  block: Block;
}

export interface LevelData {
  width: number;
  height: number;
  layers: {
    id: number;
    opacity: number;
    name: string;
    type: string;
    visible: boolean;
    x: number;
    y: number;
    layers: {
      data: number[];
      id: number;
      opacity: number;
      name: string;
      type: string;
      visible: boolean;
      x: number;
      y: number;
    }[];
  }[];
}
