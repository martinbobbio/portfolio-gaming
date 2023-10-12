import { Point, Texture } from 'pixi.js';
import { Block } from '..';

export type AvailablesLevels = 1 | 2 | 3;

export interface LevelKingAndPigs {
  current: AvailablesLevels;
  texture: Texture | null;
  collisionBlocks: Block[];
  initialPosition: Point;
  doors: LevelDoor[];
  player: {
    position: Point;
  };
  camera: {
    position: Point;
  };
  onNextLevel: () => void;
  onPrevLevel: () => void;
  updatePlayerPosition: (point: Point) => void;
  updateCameraPosition: (point: Point) => void;
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
