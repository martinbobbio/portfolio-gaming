import { useMemo, useState } from 'react';
import {
  Block,
  ItemAnimations,
  ItemState,
  ItemTextures,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface useItemsProps {
  textures: ItemTextures;
  diamonds?: Block[];
}

const useItems = ({ textures, diamonds }: useItemsProps) => {
  const animations = useMemo(() => {
    const animations: ItemAnimations = {
      diamond: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 10,
        loop: true,
        texture: textures.diamond,
      },
      heart: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 8,
        loop: true,
        texture: textures.heart,
      },
    };
    return animations;
  }, [textures]);

  const [items] = useState<ItemState[]>(() => {
    if (!diamonds) return [];
    return diamonds?.map((diamond) => ({
      animation: animations.diamond,
      position: new Point(diamond.position.x + 5, diamond.position.y + 9),
      hitbox: {
        position: new Point(diamond.position.x + 7, diamond.position.y + 9),
        width: diamond.height / 2,
        height: diamond.width / 2,
      },
    }));
  });

  return {
    items,
  };
};

export default useItems;
