import { useCallback, useEffect, useState } from 'react';
import {
  Block,
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  PlayerState,
  SoundsKingsAndPigs,
  TexturesPlayer,
} from '../../interfaces';
import { Point } from 'pixi.js';
import { useCollisions } from '..';
import { PlayerAnimations } from '../../interfaces/player/player';
import { useTick } from '@pixi/react';

interface usePlayerProps {
  level: LevelKingAndPigs;
  textures: TexturesPlayer;
  sounds: SoundsKingsAndPigs;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

const usePlayer = ({
  textures,
  level,
  sounds,
  setControls,
}: usePlayerProps) => {
  const { initialPosition, collisionBlocks } = level;
  const { applyHorizontal, applyVertical } = useCollisions();
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [inverted, setInverted] = useState(false);
  const offsetX = inverted ? 34 : 10;
  const offsetY = 18;
  const [player, setPlayer] = useState<PlayerState>({
    position: initialPosition.position,
    velocity: new Point(0, 0),
    gravity: 1,
    jump: {
      power: 15,
      double: true,
    },
    currentAnimation: 'idle',
    hitbox: {
      position: new Point(
        initialPosition.position.x + offsetX,
        initialPosition.position.y + offsetY
      ),
      width: 35,
      height: 25,
    },
    animations: {
      idle: {
        autoplay: true,
        loop: true,
        frameBuffer: 4,
        texture: textures.idle,
        frameRate: 11,
      },
      run: {
        autoplay: true,
        loop: true,
        frameBuffer: 4,
        texture: textures.run,
        frameRate: 8,
      },
      attack: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.attack,
        frameRate: 3,
        onComplete: () => {
          setTimeout(() => setCurrentAnimation('idle'), 100);
        },
      },
    },
  });

  const animation = player.animations[player.currentAnimation];

  const setPositionX = useCallback(
    (x: number) => {
      const position = player.position;
      position.x = x;
      setPlayer((prevState) => ({ ...prevState, position }));
    },
    [player.position]
  );

  const setPositionY = useCallback(
    (y: number) => {
      const position = player.position;
      position.y = y;
      setPlayer((prevState) => ({ ...prevState, position }));
    },
    [player.position]
  );

  const setVelocityX = useCallback(
    (x: number) => {
      const velocity = player.velocity;
      velocity.x = x;
      setPlayer((prevState) => ({ ...prevState, velocity }));
    },
    [player.velocity]
  );

  const setVelocityY = useCallback(
    (y: number) => {
      const velocity = player.velocity;
      velocity.y = y;
      setPlayer((prevState) => ({ ...prevState, velocity }));
    },
    [player.velocity]
  );

  const setHitbox = (hitbox: Block) => {
    setPlayer((prevState) => ({ ...prevState, hitbox }));
  };

  const setCurrentAnimation = (currentAnimation: keyof PlayerAnimations) => {
    setPlayer((prevState) => ({ ...prevState, currentAnimation }));
  };

  const setDoubleJump = (double: boolean) => {
    setPlayer((prevState) => ({
      ...prevState,
      jump: {
        power: prevState.jump.power,
        double,
      },
    }));
  };

  const applyMovement = () => {
    setPositionX(player.position.x + player.velocity.x);
  };

  const applyGravity = () => {
    setVelocityY(player.velocity.y + player.gravity);
    setPositionY(player.position.y + player.velocity.y);
  };

  const autodetectHitbox = () => {
    const hitbox = player.hitbox;
    hitbox.position.x = player.position.x + offsetX;
    hitbox.position.y = player.position.y + offsetY;
    setHitbox(hitbox);
  };

  const run = useCallback(
    (isLeft: boolean) => {
      setInverted(isLeft);
      setVelocityX(isLeft ? -5 : 5);
      setCurrentAnimation('run');
      if (isLeft !== inverted) {
        if (isLeft) setPositionX(player.position.x - 24);
        else setPositionX(player.position.x + 24);
      }
    },
    [inverted, player.position.x, setPositionX, setVelocityX]
  );

  const stopRun = useCallback(
    (isLeft: boolean) => {
      setInverted(isLeft);
      setVelocityX(0);
      setCurrentAnimation('idle');
    },
    [setVelocityX]
  );

  const jump = useCallback(() => {
    if (player.velocity.y === 0) {
      sounds.jump.play();
      setVelocityY(-player.jump.power);
      setDoubleJump(true);
    } else if (player.jump.double) {
      if (!sounds.jump.isPlaying) sounds.jump.play();
      setVelocityY(-player.jump.power / 1.5);
      setDoubleJump(false);
    }
  }, [player.velocity.y, setVelocityY, sounds, player.jump]);

  const attack = useCallback(() => {
    if (!sounds.sword.isPlaying) {
      sounds.sword.play();
      setCurrentAnimation('attack');
    }
  }, [sounds]);

  useEffect(() => {
    setControls({
      onTouchLeftStart: () => run(true),
      onTouchLeftEnd: () => stopRun(true),
      onTouchRightStart: () => run(false),
      onTouchRightEnd: () => stopRun(false),
      onTouchUp: () => jump(),
      onTouchSpecial: () => attack(),
    });
  }, [run, stopRun, jump, attack, setControls]);

  useTick(() => {
    setElapsedFrames(elapsedFrames + 1);
    applyMovement();
    autodetectHitbox();
    applyHorizontal(player, collisionBlocks, setPositionX);
    applyGravity();
    autodetectHitbox();
    applyVertical(player, collisionBlocks, setPositionY, setVelocityY);
  });

  return {
    player,
    animation,
    inverted,
  };
};

export default usePlayer;
