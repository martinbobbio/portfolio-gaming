import { useEffect, useState } from 'react';
import { SoundsKingsAndPigs, TexturesKingsAndPigs } from '../../interfaces';
import { Assets, Texture } from 'pixi.js';

const useResources = () => {
  const [textures, setTextures] = useState<TexturesKingsAndPigs>();
  const [sounds, setSounds] = useState<SoundsKingsAndPigs>();

  const loadSounds = () => {
    const sounds = {
      music: '../kings-and-pigs/sound/music.mp3',
      jump: '../kings-and-pigs/sound/jump.wav',
      sword: '../kings-and-pigs/sound/sword.wav',
      walk: '../kings-and-pigs/sound/walk.wav',
      doorIn: '../kings-and-pigs/sound/door-in.mp3',
      doorOut: '../kings-and-pigs/sound/door-out.mp3',
    };
    import('@pixi/sound').then(({ sound }) => {
      setSounds({
        music: sound.add('music', sounds.music),
        jump: sound.add('jump', sounds.jump),
        sword: sound.add('sword', sounds.sword),
        walk: sound.add('walk', sounds.walk),
        doorIn: sound.add('doorIn', sounds.doorIn),
        doorOut: sound.add('doorOut', sounds.doorOut),
      });
    });
  };

  useEffect(() => {
    const loadTextures = () => {
      const textures = {
        king: {
          idle: '../kings-and-pigs/sprites/king/idle.png',
          run: '../kings-and-pigs/sprites/king/run.png',
          attack: '../kings-and-pigs/sprites/king/attack.png',
        },
      };
      const { king } = textures;
      Assets.load([king.idle, king.run, king.attack]).then(
        (resources: Record<string, Texture>) => {
          setTextures({
            king: {
              idle: resources[king.idle],
              run: resources[king.run],
              attack: resources[king.attack],
            },
          });
        }
      );
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
