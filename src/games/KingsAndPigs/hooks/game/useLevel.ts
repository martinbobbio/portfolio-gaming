import { Assets, Point, Texture } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';
import { LevelKingAndPigs, AvailablesLevels } from '../../interfaces';
import source from '../../levels/level-1.png';
import data from '../../levels/level-1.json';
import { blocksFrom2D, parse2D } from '@/utils';

const levels = {
  1: {
    source,
    playerPosition: new Point(200, 200),
    data,
  },
  2: {
    source,
    playerPosition: new Point(0, 0),
    data,
  },
  3: {
    source,
    playerPosition: new Point(0, 0),
    data,
  },
};

const useLevel = () => {
  const minLevel = 1;
  const maxLevel = 3;
  const [level, setLevel] = useState<LevelKingAndPigs>({
    current: 1,
    source: levels[1].source,
    texture: null,
    collisionBlocks: [],
    initialPosition: {
      position: new Point(-100, -100),
      width: 0,
      height: 0,
    },
    doors: [],
  });

  const nextLevel = () => {
    if (level.current < maxLevel) {
      const current = (level.current + 1) as AvailablesLevels;
      setLevel({ ...level, current });
    }
  };

  const prevLevel = () => {
    if (level.current > minLevel) {
      const current = (level.current - 1) as AvailablesLevels;
      setLevel({ ...level, current });
    }
  };

  const loadTexture = useCallback(async () => {
    const resources: Record<string, Texture> = await Assets.load([
      level.source,
    ]);
    const texture = resources[level.source];
    setLevel((prevLevel) => ({ ...prevLevel, texture }));
  }, [level.source]);

  const loadTileMap = useCallback(async () => {
    const main = levels[1].data.layers.find(
      ({ name }) => name === 'Detections'
    )?.layers;

    const layers = {
      collisions: main?.find(({ name }) => name === 'Collisions')?.data,
      initialPosition: main?.find(({ name }) => name === 'Initial Position')
        ?.data,
      doorNext: main?.find(({ name }) => name === 'Door Next')?.data,
      doorPrev: main?.find(({ name }) => name === 'Door Prev')?.data,
    };

    const collisionBlocks =
      layers.collisions && blocksFrom2D(parse2D(layers.collisions));
    const initialPosition =
      layers.initialPosition &&
      blocksFrom2D(parse2D(layers.initialPosition))[0];
    const doorNext =
      layers.doorNext && blocksFrom2D(parse2D(layers.doorNext))[0];
    const doorPrev =
      layers.doorPrev && blocksFrom2D(parse2D(layers.doorPrev))[0];

    if (collisionBlocks) {
      setLevel((prevLevel) => ({ ...prevLevel, collisionBlocks }));
    }
    if (initialPosition) {
      setLevel((prevLevel) => ({ ...prevLevel, initialPosition }));
    }
    if (doorNext && doorPrev) {
      setLevel((prevLevel) => ({
        ...prevLevel,
        doors: [
          {
            type: 'next',
            block: doorNext,
          },
          {
            type: 'prev',
            block: doorPrev,
          },
        ],
      }));
    }
  }, []);

  useEffect(() => {
    loadTexture();
    loadTileMap();
  }, [loadTexture, loadTileMap]);

  return {
    level,
    nextLevel,
    prevLevel,
  };
};

export default useLevel;
