import { useState } from 'react';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  DoorState,
  DoorTextures,
} from '../../interfaces';
import { useTick } from '@pixi/react';

interface useDoorProps {
  level: LevelKingAndPigs;
  textures: DoorTextures;
  sounds: SoundsKingsAndPigs;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

const usePlayer = ({ textures, level }: useDoorProps) => {
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [doors, setDoors] = useState<DoorState[]>(
    level.doors.map(({ type, block }) => {
      return {
        position: block.position,
        hitbox: block,
        type,
        currentAnimation: 'idle',
        animations: {
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
            frameBuffer: 4,
            texture: textures.opening,
            frameRate: 5,
          },
          closing: {
            autoplay: true,
            loop: false,
            frameBuffer: 4,
            texture: textures.closing,
            frameRate: 3,
          },
        },
      };
    })
  );

  useTick(() => {
    setElapsedFrames(elapsedFrames + 1);
  });

  return {
    doors,
  };
};

export default usePlayer;
