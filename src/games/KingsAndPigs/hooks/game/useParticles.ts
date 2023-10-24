import { useMemo, useState } from 'react';
import {
  ParticlesAnimations,
  ParticlesState,
  ParticlesTextures,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface useParticlesProps {
  textures: ParticlesTextures;
}

const useParticles = ({ textures }: useParticlesProps) => {
  const animations: ParticlesAnimations = useMemo(() => {
    return {
      jump: {
        autoplay: true,
        loop: false,
        frameBuffer: 6,
        frameRate: 6,
        texture: textures.jump,
        invertedTile: true,
      },
      fall: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        frameRate: 5,
        texture: textures.fall,
        invertedTile: true,
      },
    };
  }, [textures]);

  const [particles, setParticles] = useState<ParticlesState>({
    addParticle: (
      key: keyof ParticlesAnimations,
      position: Point,
      inverted: boolean
    ) => {
      const currentAnimation = animations[key];
      if (key === 'jump') {
        position.y += 24;
        position.x += inverted ? 21 : 4;
      } else if (key === 'fall') {
        position.y += 24;
        position.x += inverted ? 21 : 4;
      }
      currentAnimation.onComplete = () => {
        setParticles((prev) => {
          const updatedItems = prev.items.filter(
            (item) => item.currentAnimation !== currentAnimation
          );
          return {
            ...prev,
            items: updatedItems,
          };
        });
      };
      setParticles((prev) => ({
        ...prev,
        items: [...prev.items, { currentAnimation, position, inverted }],
      }));
    },
    items: [],
  });

  return {
    particles,
  };
};

export default useParticles;
