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
        frameBuffer: 4,
        frameRate: 6,
        texture: textures.jump,
      },
      fall: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        frameRate: 3,
        texture: textures.fall,
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
        position.y += 14;
        position.x += inverted ? 28 : 8;
      } else if (key === 'fall') {
        position.y += 28;
        position.x += inverted ? 10 : -10;
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
    deleteParticles: () => {
      setParticles((prev) => ({ ...prev, items: [] }));
    },
    items: [],
  });

  return {
    particles,
  };
};

export default useParticles;
