import { useCallback, useEffect, useState } from 'react';
import { blocksFrom2D, parse2D } from '@/utils';
import {
  LevelKingAndPigs,
  AvailablesLevels,
  LevelData,
  Block,
} from '../../interfaces';
import { Assets, Point, Texture } from 'pixi.js';

/**
 * Hook that handles manage level important properties
 *
 * @return useLevel
 */
const useLevel = () => {
  const maxLevel = 3;
  const [level, setLevel] = useState<LevelKingAndPigs>({
    current: 1,
    texture: null,
    collisionBlocks: [],
    platformBlocks: [],
    initialPosition: new Point(-100, -100),
    doors: [],
    player: {
      position: new Point(-100, -100),
      attackHitbox: undefined,
    },
    items: {
      diamonds: [],
    },
    stats: {
      diamonds: 0,
      timer: 0,
    },
    onNextLevel: () => nextLevel(),
    deleteDiamond: (id: number) => deleteDiamond(id),
    updatePlayerPosition: (point: Point) => updatePlayerPosition(point),
    updatePlayerAttakHitbox: (block?: Block) => updatePlayerAttakHitbox(block),
    increaseDiamondStats: () => increaseDiamondStats(),
  });
  const currentLevel = level.current;

  const nextLevel = () => {
    if (level.current < maxLevel) {
      const current = (level.current + 1) as AvailablesLevels;
      setLevel((prevLevel) => ({
        ...prevLevel,
        current,
        texture: null,
        collisionBlocks: [],
        doors: [],
      }));
    }
  };

  const deleteDiamond = (id: number) => {
    setLevel((prevLevel) => {
      if (!prevLevel.items?.diamonds) return prevLevel;

      const diamonds = [...prevLevel.items.diamonds];
      diamonds.splice(id, 1);

      return {
        ...prevLevel,
        items: {
          ...prevLevel.items,
          diamonds,
        },
      };
    });
  };

  const increaseDiamondStats = () => {
    setLevel((prevLevel) => ({
      ...prevLevel,
      stats: {
        ...prevLevel.stats,
        diamonds: prevLevel.stats.diamonds + 1,
      },
    }));
  };

  const updatePlayerPosition = (position: Point) => {
    level.player.position = position;
  };

  const updatePlayerAttakHitbox = (block?: Block) => {
    if (block) level.player.attackHitbox = block;
    else level.player.attackHitbox = undefined;
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

    const map = levelData.layers.find(({ name }) => name === 'Map')?.layers;

    const layers = {
      platforms: map?.find(({ name }) => name === 'Platforms')?.data,
      collisions: map?.find(({ name }) => name === 'Blocks')?.data,
      doorNext: main?.find(({ name }) => name === 'Door Next')?.data,
      doorPrev: main?.find(({ name }) => name === 'Door Prev')?.data,
      diamonds: main?.find(({ name }) => name === 'Diamonds')?.data,
      candles: main?.find(({ name }) => name === 'Candles')?.data,
      smallChains: main?.find(({ name }) => name === 'Small Chains')?.data,
      bigChains: main?.find(({ name }) => name === 'Big Chains')?.data,
      windows: main?.find(({ name }) => name === 'Windows')?.data,
      boxes: main?.find(({ name }) => name === 'Box')?.data,
    };

    const collisionBlocks =
      (layers.collisions && blocksFrom2D(parse2D(layers.collisions))) || [];
    const doorNext =
      layers.doorNext && blocksFrom2D(parse2D(layers.doorNext))[0];
    const doorPrev =
      layers.doorPrev && blocksFrom2D(parse2D(layers.doorPrev))[0];
    const diamonds = layers.diamonds && blocksFrom2D(parse2D(layers.diamonds));
    const candles = layers.candles && blocksFrom2D(parse2D(layers.candles));
    const smallChains =
      layers.smallChains && blocksFrom2D(parse2D(layers.smallChains));
    const bigChains =
      layers.bigChains && blocksFrom2D(parse2D(layers.bigChains));
    const windows = layers.windows && blocksFrom2D(parse2D(layers.windows));
    const boxes = layers.boxes && blocksFrom2D(parse2D(layers.boxes));
    const platformBlocks =
      (layers.platforms && blocksFrom2D(parse2D(layers.platforms), 32, 10)) ||
      [];

    if (doorNext && doorPrev) {
      setLevel((prevLevel) => ({
        ...prevLevel,
        collisionBlocks,
        platformBlocks,
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
        boxes,
        decorations: {
          candles,
          smallChains,
          bigChains,
          windows,
        },
        items: {
          diamonds,
        },
      }));
    }
  }, [currentLevel]);

  useEffect(() => {
    loadLevelTexture();
    loadlLevelData();
  }, [currentLevel, loadLevelTexture, loadlLevelData]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setLevel((prevLevel) => ({
        ...prevLevel,
        stats: {
          ...prevLevel.stats,
          timer: prevLevel.stats.timer + 1,
        },
      }));
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return {
    level,
  };
};

export default useLevel;
