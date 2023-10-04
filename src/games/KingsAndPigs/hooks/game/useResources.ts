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

const texturePaths: TexturePaths = {
  king: {
    idle: '../kings-and-pigs/sprites/king/idle.png',
    run: '../kings-and-pigs/sprites/king/run.png',
    attack: '../kings-and-pigs/sprites/king/attack.png',
    doorIn: '../kings-and-pigs/sprites/king/door-in.png',
    doorOut: '../kings-and-pigs/sprites/king/door-out.png',
    dead: '../kings-and-pigs/sprites/king/dead.png',
    hit: '../kings-and-pigs/sprites/king/hit.png',
  },
  door: {
    idle: '../kings-and-pigs/sprites/door/idle.png',
    opening: '../kings-and-pigs/sprites/door/opening.png',
    closing: '../kings-and-pigs/sprites/door/closing.png',
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
