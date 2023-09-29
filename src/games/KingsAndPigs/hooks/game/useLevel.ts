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

/**
 * Hook that get level properties
 *
 * @return useLevel
 */
const useLevel = () => {
  const minLevel = 1;
  const maxLevel = 3;
  const [level, setLevel] = useState<LevelKingAndPigs>({
    current: 1,
    source: levels[1].source,
    playerPosition: levels[1].playerPosition,
    texture: null,
    collisionBlocks: [],
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
    const collisions = levels[1].data.layers.find(
      (layer) => layer.name === 'Collisions'
    );
    if (collisions?.data) {
      const collisionBlocks = blocksFrom2D(parse2D(collisions.data));
      setLevel((prevLevel) => ({ ...prevLevel, collisionBlocks }));
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
