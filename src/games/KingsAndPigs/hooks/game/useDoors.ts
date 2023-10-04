import { useMemo, useState } from 'react';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  DoorState,
  DoorTextures,
  Block,
  DoorAnimations,
} from '../../interfaces';
import { useTick } from '@pixi/react';
import { Point } from 'pixi.js';

interface useDoorProps {
  level: LevelKingAndPigs;
  textures: DoorTextures;
  sounds: SoundsKingsAndPigs;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

const useDoors = ({ textures, level }: useDoorProps) => {
  const [elapsedFrames, setElapsedFrames] = useState(0);

  const animations = useMemo(() => {
    const animations: DoorAnimations = {
      idle: {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.idle,
        frameRate: 1,
      },
      opening: {
        autoplay: true,
        loop: false,
        frameBuffer: 10,
        texture: textures.opening,
        frameRate: 5,
      },
      closing: {
        autoplay: true,
        loop: false,
        frameBuffer: 10,
        texture: textures.closing,
        frameRate: 3,
      },
    };
    return animations;
  }, [textures.closing, textures.idle, textures.opening]);

  const getInitialPosition = (block: Block): Point => {
    const offsetY = 9;
    const offsetX = 25;
    const x = block.position.x - block.width + offsetX;
    const y = block.position.y - block.height + offsetY;
    return new Point(x, y);
  };

  const [doors] = useState<DoorState[]>(
    level.doors.map(({ type, block }) => {
      const currentAnimations = {
        prev: animations.opening,
        next: animations.idle,
      };
      return {
        position: getInitialPosition(block),
        hitbox: block,
        type,
        currentAnimation: currentAnimations[type],
        animations,
      };
    })
  );

  const checkIfCanEnter = (entity: Block): boolean => {
    for (let i = 0; i < doors.length; i++) {
      const hitbox = doors[i].hitbox;
      const canEnter =
        entity.position.x + entity.width <= hitbox.position.x + hitbox.width &&
        entity.position.x >= hitbox.position.x &&
        entity.position.y + entity.height >= hitbox.position.y &&
        entity.position.y <= hitbox.position.y + hitbox.height;
      console.log(canEnter);
    }
    return true;
  };

  useTick(() => {
    setElapsedFrames(elapsedFrames + 1);
  });

  return {
    doors,
    checkIfCanEnter,
  };
};

export default useDoors;
