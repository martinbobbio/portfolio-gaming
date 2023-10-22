import { useEffect, useMemo, useState } from 'react';
import {
  ParticlesAnimations,
  ParticlesState,
  ParticlesTextures,
} from '../../interfaces';

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
      run: {
        autoplay: true,
        loop: false,
        frameBuffer: 50,
        frameRate: 3,
        texture: textures.run,
      },
    };
  }, [textures]);

  const [particles] = useState<ParticlesState>(() => {
    const particles: ParticlesState = {
      currentAnimation: undefined,
      deleteParticles: () => (particles.currentAnimation = undefined),
      setParticles: (key: keyof ParticlesAnimations) => {
        particles.currentAnimation = animations[key];
      },
    };
    return particles;
  });

  useEffect(() => {
    animations.run.onComplete = () => particles.deleteParticles();
    animations.jump.onComplete = () => particles.deleteParticles();
  }, [animations, particles]);

  return {
    particles,
  };
};

export default useParticles;
