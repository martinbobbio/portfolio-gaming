import { useMemo, useState } from 'react';
import {
  Block,
  DecorationsAnimations,
  DecorationsLevel,
  DecorationsState,
  DecorationsTextures,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface useDoorProps {
  textures: DecorationsTextures;
  objects?: DecorationsLevel;
}

const useDecorations = ({ textures, objects }: useDoorProps) => {
  const animations = useMemo(() => {
    const animations: DecorationsAnimations = {
      candle: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 8,
        loop: true,
        texture: textures.candle,
      },
      smallChain: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 10,
        loop: true,
        texture: textures.smallChain,
      },
      bigChain: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 10,
        loop: true,
        texture: textures.bigChain,
      },
    };
    return animations;
  }, [textures]);

  const getPosition = (
    { position }: Block,
    offsetX: number,
    offsetY: number
  ): Point => {
    const x = position.x + offsetX;
    const y = position.y + offsetY;
    return new Point(x, y);
  };

  const [decorations] = useState<DecorationsState[]>(() => {
    const candles = objects?.candles?.map((hitbox) => ({
      hitbox,
      animation: animations.candle,
      position: getPosition(hitbox, 8, -8),
    }));
    const smallChains = objects?.smallChains?.map((hitbox) => ({
      hitbox,
      animation: animations.smallChain,
      position: getPosition(hitbox, 0, 0),
    }));
    const bigChains = objects?.bigChains?.map((hitbox) => ({
      hitbox,
      animation: animations.bigChain,
      position: getPosition(hitbox, 16, 0),
    }));
    return [...(candles || []), ...(smallChains || []), ...(bigChains || [])];
  });

  return {
    decorations,
  };
};

export default useDecorations;
