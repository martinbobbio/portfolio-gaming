import { useCallback, useEffect, useState } from 'react';
import { blocksFrom2D, parse2D } from '@/utils';
import {
  LevelKingAndPigs,
  AvailablesLevels,
  LevelData,
} from '../../interfaces';
import { Assets, Point, Texture } from 'pixi.js';

const useLevel = () => {
  const minLevel = 1;
  const maxLevel = 3;
  const [level, setLevel] = useState<LevelKingAndPigs>({
    current: 1,
    texture: null,
    collisionBlocks: [],
    initialPosition: new Point(-100, -100),
    doors: [],
    player: {
      position: new Point(-100, -100),
    },
    camera: {
      position: new Point(-100, -100),
    },
    onNextLevel: () => nextLevel(),
    onPrevLevel: () => prevLevel(),
    updatePlayerPosition: (point: Point) => updatePlayerPosition(point),
    updateCameraPosition: (point: Point) => updateCameraPosition(point),
  });
  const currentLevel = level.current;

  const nextLevel = () => {
    if (level.current < maxLevel) {
      const current = (level.current + 1) as AvailablesLevels;
      setLevel({
        ...level,
        current,
        texture: null,
        collisionBlocks: [],
        doors: [],
      });
    }
  };

  const prevLevel = () => {
    if (level.current > minLevel) {
      const current = (level.current - 1) as AvailablesLevels;
      setLevel({ ...level, current });
    }
  };

  const updatePlayerPosition = (position: Point) => {
    level.player.position = position;
  };

  const updateCameraPosition = (position: Point) => {
    level.camera.position = position;
  };

  const loadLevelTexture = useCallback(async () => {
    const source = await import(`../../levels/level-${currentLevel}.png`).then(
      (module) => module.default
    );
    const resources: Record<string, Texture> = await Assets.load([source]);
    const texture = resources[source];
    setLevel((prevLevel) => ({ ...prevLevel, texture }));
  }, [currentLevel]);

  const loadlLevelData = useCallback(async () => {
    const levelData: LevelData = await import(
      `../../levels/level-${currentLevel}.json`
    ).then((module) => module.default);

    const main = levelData.layers.find(
      ({ name }) => name === 'Detections'
    )?.layers;

    const layers = {
      collisions: main?.find(({ name }) => name === 'Collisions')?.data,
      doorNext: main?.find(({ name }) => name === 'Door Next')?.data,
      doorPrev: main?.find(({ name }) => name === 'Door Prev')?.data,
    };

    const collisionBlocks =
      layers.collisions && blocksFrom2D(parse2D(layers.collisions));
    const doorNext =
      layers.doorNext && blocksFrom2D(parse2D(layers.doorNext))[0];
    const doorPrev =
      layers.doorPrev && blocksFrom2D(parse2D(layers.doorPrev))[0];

    if (collisionBlocks) {
      setLevel((prevLevel) => ({ ...prevLevel, collisionBlocks }));
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
        initialPosition: new Point(
          doorPrev.position.x - 16,
          doorPrev.position.y
        ),
      }));
    }
  }, [currentLevel]);

  useEffect(() => {
    loadLevelTexture();
    loadlLevelData();
  }, [currentLevel, loadLevelTexture, loadlLevelData]);

  return {
    level,
    nextLevel,
    prevLevel,
  };
};

export default useLevel;
