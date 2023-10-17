import { useEffect, useState } from 'react';
import { SoundsKingsAndPigs, TexturesKingsAndPigs } from '../../interfaces';
import { Assets } from 'pixi.js';
import { Sound } from '@pixi/sound';

interface TexturePaths {
  [key: string]: {
    [key: string]: string;
  };
}

interface SoundPaths {
  [key: string]: string;
}

const uri = '../kings-and-pigs/sprites/';
const texturePaths: TexturePaths = {
  king: {
    idle: `${uri}king/idle.png`,
    run: `${uri}king/run.png`,
    attack: `${uri}king/attack.png`,
    doorIn: `${uri}king/door-in.png`,
    doorOut: `${uri}king/door-out.png`,
    dead: `${uri}king/dead.png`,
    hit: `${uri}king/hit.png`,
  },
  door: {
    idle: `${uri}door/idle.png`,
    opening: `${uri}door/opening.png`,
    closing: `${uri}door/closing.png`,
  },
  dialogBox: {
    helloIn: `${uri}dialogue-boxes/hello-in.png`,
    helloOut: `${uri}dialogue-boxes/hello-out.png`,
    deadIn: `${uri}dialogue-boxes/dead-in.png`,
    deadOut: `${uri}dialogue-boxes/dead-out.png`,
    exclamationIn: `${uri}dialogue-boxes/exclamation-in.png`,
    exclamationOut: `${uri}dialogue-boxes/exclamation-out.png`,
  },
  livesAndCoins: {
    liveBar: `${uri}lives-and-coins/live-bar.png`,
    smallHeartIdle: `${uri}lives-and-coins/small-heart-idle.png`,
    bigHeartIdle: `${uri}lives-and-coins/big-heart-idle.png`,
    bigDiamondIdle: `${uri}lives-and-coins/big-diamond-idle.png`,
    numbers: `${uri}lives-and-coins/numbers.png`,
    smallDiamondIdle: `${uri}lives-and-coins/small-diamond-idle.png`,
  },
};

const soundPaths: SoundPaths = {
  music: '../kings-and-pigs/sound/music.mp3',
  jump: '../kings-and-pigs/sound/jump.wav',
  sword: '../kings-and-pigs/sound/sword.wav',
  walk: '../kings-and-pigs/sound/walk.wav',
  doorIn: '../kings-and-pigs/sound/door-in.mp3',
  doorOut: '../kings-and-pigs/sound/door-out.mp3',
};

/**
 * Hook that manage resources for the game.
 *
 * @return useResources
 */
const useResources = () => {
  const [textures, setTextures] = useState<TexturesKingsAndPigs>();
  const [sounds, setSounds] = useState<SoundsKingsAndPigs>();

  const loadSounds = async () => {
    const sounds: { [key: string]: Sound } = {};
    const { sound } = await import('@pixi/sound');
    for (const key of Object.keys(soundPaths)) {
      const path = soundPaths[key];
      sounds[key] = sound.add(key, path);
    }
    setSounds(sounds as unknown as SoundsKingsAndPigs);
  };

  useEffect(() => {
    if (sounds) {
      sounds.jump.volume = 0.2;
      sounds.jump.speed = 1.5;
      sounds.music.volume = 0.1;
      sounds.music.loop = true;
      sounds.sword.volume = 0.3;
      sounds.sword.speed = 0.9;
      sounds.doorOut.speed = 0.9;
      sounds.doorOut.volume = 0.15;
      sounds.doorIn.speed = 0.9;
      sounds.doorIn.volume = 0.15;
    }
  }, [sounds]);

  useEffect(() => {
    const loadTextures = async () => {
      const textureKeys = Object.keys(texturePaths);
      const textures: TexturePaths = {};

      for (const key of textureKeys) {
        textures[key] = {};
        const pathMap = texturePaths[key];
        const pathKeys = Object.keys(pathMap);

        for (const pathKey of pathKeys) {
          const path = pathMap[pathKey];
          textures[key][pathKey] = await loadTexture(path);
        }
      }

      setTextures(textures as unknown as TexturesKingsAndPigs);
    };

    const loadTexture = async (path: string) => {
      const resource = await Assets.load(path);
      return resource;
    };

    loadTextures();
  }, []);

  return {
    loadSounds,
    textures,
    sounds,
  };
};

export default useResources;
