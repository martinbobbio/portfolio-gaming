import { Sound } from '@pixi/sound';
import { TexturesPlayer } from '..';

export interface TexturesKingsAndPigs {
  king: TexturesPlayer;
}

export interface SoundsKingsAndPigs {
  music: Sound;
  sword: Sound;
  walk: Sound;
  jump: Sound;
  doorIn: Sound;
  doorOut: Sound;
}
