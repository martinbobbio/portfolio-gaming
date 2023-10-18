import { Sound } from '@pixi/sound';
import {
  DecorationsTextures,
  DialogBoxTextures,
  DoorTextures,
  LivesAndCoinsTextures,
  PlayerTextures,
} from '..';

export interface TexturesKingsAndPigs {
  king: PlayerTextures;
  door: DoorTextures;
  dialogBox: DialogBoxTextures;
  livesAndCoins: LivesAndCoinsTextures;
  decorations: DecorationsTextures;
}

export interface SoundsKingsAndPigs {
  music: Sound;
  sword: Sound;
  walk: Sound;
  jump: Sound;
  doorIn: Sound;
  doorOut: Sound;
}
