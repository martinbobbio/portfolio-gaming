import { useMemo, useState } from 'react';
import {
  LevelKingAndPigs,
  BoxState,
  Block,
  BoxTextures,
  BoxAnimations,
} from '../../interfaces';
import { Point } from 'pixi.js';
import { useTick } from '@pixi/react';
import { useCollisions } from '..';

interface useBoxesProps {
  level: LevelKingAndPigs;
  textures: BoxTextures;
}

/**
 * Hook that manage boxes in the game.
 *
 * @param level for known data level
 * @param textures for the graphics
 * @return useBoxes
 */
const useBoxes = ({ textures, level }: useBoxesProps) => {
  const gravity = 1;
  const animations = useMemo(() => {
    const animations: BoxAnimations = {
      idle: {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.idle,
        frameRate: 1,
      },
    };
    return animations;
  }, [textures.idle]);

  const getInitialPosition = (block: Block): Point => {
    const offsetY = 40;
    const offsetX = 40;
    const x = block.position.x - block.width + offsetX;
    const y = block.position.y - block.height + offsetY;
    return new Point(x, y);
  };

  const [boxes] = useState<BoxState[]>(
    level?.boxes?.map((block) => {
      const door: BoxState = {
        position: getInitialPosition(block),
        velocity: new Point(0, 0),
        hitbox: {
          height: 18,
          width: 21,
          position: getInitialPosition(block),
        },
        currentAnimation: animations.idle,
      };
      return door;
    }) || []
  );
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const { applyVertical } = useCollisions();

  const updateHitbox = (box: BoxState) => {
    const offsetX = 0;
    const offsetY = 0;
    box.hitbox.position.x = box.position.x + offsetX;
    box.hitbox.position.y = box.position.y + offsetY;
  };

  const applyGravity = (box: BoxState) => {
    box.velocity.y = box.velocity.y + gravity;
    box.position.y = box.position.y + box.velocity.y;
  };

  const applyCollisions = (box: BoxState) => {
    const updatePositionY = (y: number) => (box.position.y = y);
    const updateVelocityY = (y: number) => (box.velocity.y = y);
    const { collisionBlocks } = level;
    const hitboxes = boxes
      .filter((_box) => _box !== box)
      .map((_box) => _box.hitbox);
    applyVertical(box, collisionBlocks, updatePositionY, updateVelocityY);
    applyVertical(box, hitboxes, updatePositionY, updateVelocityY);
  };

  useTick(() => {
    setElapsedFrames(elapsedFrames + 1);
    boxes.map((box) => {
      applyGravity(box);
      updateHitbox(box);
      applyCollisions(box);
    });
  });

  return {
    boxes,
  };
};

export default useBoxes;
