import { useEffect, useMemo, useState } from 'react';
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

  const createParticles = (): ParticlesState => {
    const particles: ParticlesState = {
      currentAnimation: undefined,
      position: new Point(0, 0),
      inverted: false,
      deleteParticles: () => {
        particles.currentAnimation = undefined;
      },
      setParticles: (key, position, inverted) => {
        particles.currentAnimation = animations[key];
        particles.inverted = inverted;
        if (key === 'jump') {
          position.y += 14;
          position.x += inverted ? 28 : 8;
        } else if (key === 'fall') {
          position.y += 28;
          position.x += inverted ? 10 : -10;
        }
        particles.position = position;
      },
    };
    return particles;
  };

  const [particles] = useState<ParticlesState>(() => createParticles());

  useEffect(() => {
    animations.fall.onComplete = () => particles.deleteParticles();
    animations.jump.onComplete = () => particles.deleteParticles();
  }, [animations, particles]);

  return {
    particles,
  };
};

export default useParticles;
