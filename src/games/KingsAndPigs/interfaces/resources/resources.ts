import { Sound } from '@pixi/sound';
import { DoorTextures, PlayerTextures } from '..';

export interface TexturesKingsAndPigs {
  king: PlayerTextures;
  door: DoorTextures;
}

export interface SoundsKingsAndPigs {
  music: Sound;
  sword: Sound;
  walk: Sound;
  jump: Sound;
  doorIn: Sound;
  doorOut: Sound;
}
