import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCollisions } from '..';
import {
  Block,
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  PlayerState,
  SoundsKingsAndPigs,
  PlayerTextures,
  Animation,
  PlayerAnimations,
  DoorState,
} from '../../interfaces';
import { Point } from 'pixi.js';
import { useTick } from '@pixi/react';

interface usePlayerProps {
  level: LevelKingAndPigs;
  textures: PlayerTextures;
  sounds: SoundsKingsAndPigs;
  doors: DoorState[];
  setControls: (controls: ControlsKingsAndPigs) => void;
}

const usePlayer = ({
  textures,
  level,
  sounds,
  doors,
  setControls,
}: usePlayerProps) => {
  const { initialPosition, collisionBlocks } = level;
  const { applyHorizontal, applyVertical } = useCollisions();
  const [elapsedFrames, setElapsedFrames] = useState(0);

  const animations = useMemo(() => {
    const animations: PlayerAnimations = {
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
      },
      doorIn: {
        autoplay: true,
        loop: false,
        frameBuffer: 6,
        texture: textures.doorIn,
        frameRate: 8,
      },
      doorOut: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.doorOut,
        frameRate: 8,
      },
      dead: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.dead,
        frameRate: 4,
      },
      hit: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.hit,
        frameRate: 2,
      },
    };
    animations.attack.onComplete = () => {
      setTimeout(() => setCurrentAnimation(animations.idle), 100);
    };
    animations.doorIn.onComplete = () => {
      sounds.doorOut.play();
      setTimeout(() => setCurrentAnimation(animations.idle), 100);
    };
    animations.doorOut.onComplete = () => {
      level.onNextLevel();
    };
    return animations;
  }, [textures, sounds.doorOut, level]);

  const [player, setPlayer] = useState<PlayerState>({
    position: initialPosition,
    velocity: new Point(0, 0),
    gravity: 1,
    inverted: false,
    jump: {
      power: 15,
      double: true,
    },
    currentAnimation: animations.doorIn,
    hitbox: {
      position: new Point(initialPosition.x, initialPosition.y),
      width: 24,
      height: 26,
    },
    animations,
  });

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

  const setCurrentAnimation = (currentAnimation: Animation) => {
    setPlayer((prevState) => ({ ...prevState, currentAnimation }));
  };

  const setInverted = (inverted: boolean) => {
    setPlayer((prevState) => ({ ...prevState, inverted }));
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
    const offsetX = player.inverted ? 36 : 18;
    const offsetY = 18;
    const hitbox = player.hitbox;
    hitbox.position.x = player.position.x + offsetX;
    hitbox.position.y = player.position.y + offsetY;
    setHitbox(hitbox);
  };

  const pressRun = useCallback(
    (isLeft: boolean) => {
      if (player.currentAnimation === animations.idle) {
        setInverted(isLeft);
        setVelocityX(isLeft ? -5 : 5);
        setCurrentAnimation(animations.run);
        if (isLeft !== player.inverted) {
          if (isLeft) setPositionX(player.position.x - 24);
          else setPositionX(player.position.x + 24);
        }
      }
    },
    [
      animations.idle,
      animations.run,
      player.currentAnimation,
      player.inverted,
      player.position.x,
      setPositionX,
      setVelocityX,
    ]
  );

  const pressStopRun = useCallback(
    (isLeft: boolean) => {
      if (player.currentAnimation === animations.idle) return;
      setInverted(isLeft);
      setVelocityX(0);
      setCurrentAnimation(animations.idle);
    },
    [animations.idle, player.currentAnimation, setVelocityX]
  );

  const checkIfCanEnterDoor = useCallback((): boolean => {
    let canEnter = false;
    doors
      .filter((door) => door.type === 'next')
      .map((door) => {
        const hitbox = door.hitbox;
        const entity = player.hitbox;
        const collisions = {
          left: entity.position.x <= hitbox.position.x + hitbox.width,
          right: entity.position.x + entity.width >= hitbox.position.x,
          bottom: entity.position.y + entity.height >= hitbox.position.y,
          top: entity.position.y <= hitbox.position.y + hitbox.height,
        };
        const { right, left, bottom, top } = collisions;
        if (right && left && bottom && top) {
          canEnter = true;
          door.open();
        }
      });
    return canEnter;
  }, [doors, player.hitbox]);

  const enterDoor = useCallback(() => {
    setCurrentAnimation(animations.doorOut);
    sounds.doorIn.play();
  }, [animations.doorOut, sounds.doorIn]);

  const jump = useCallback(() => {
    sounds.jump.play();
    setVelocityY(-player.jump.power);
    setDoubleJump(true);
  }, [player.jump.power, setVelocityY, sounds.jump]);

  const doubleJump = useCallback(() => {
    if (!sounds.jump.isPlaying) sounds.jump.play();
    setVelocityY(-player.jump.power / 1.5);
    setDoubleJump(false);
  }, [player.jump.power, setVelocityY, sounds.jump]);

  const pressUp = useCallback(() => {
    if (player.currentAnimation === animations.doorOut) return;
    if (checkIfCanEnterDoor()) {
      enterDoor();
    } else if (player.velocity.y === 0) {
      jump();
    } else if (player.jump.double) {
      doubleJump();
    }
  }, [
    player.currentAnimation,
    player.velocity.y,
    player.jump.double,
    animations.doorOut,
    checkIfCanEnterDoor,
    enterDoor,
    jump,
    doubleJump,
  ]);

  useEffect(() => {
    const { x } = player.velocity;
    const { currentAnimation } = player;
    if (currentAnimation === animations.idle && x !== 0) {
      setCurrentAnimation(player.animations.run);
    }
  }, [
    animations.idle,
    player,
    player.animations.run,
    player.currentAnimation,
    player.velocity,
    player.velocity.x,
  ]);

  const pressAttack = useCallback(() => {
    if (!sounds.sword.isPlaying) {
      sounds.sword.play();
      setCurrentAnimation(animations.attack);
    }
  }, [animations, sounds.sword]);

  useEffect(() => {
    setControls({
      onTouchLeftStart: () => pressRun(true),
      onTouchLeftEnd: () => pressStopRun(true),
      onTouchRightStart: () => pressRun(false),
      onTouchRightEnd: () => pressStopRun(false),
      onTouchUp: () => pressUp(),
      onTouchSpecial: () => pressAttack(),
    });
  }, [pressRun, pressStopRun, pressUp, pressAttack, setControls]);

  useEffect(() => {
    level.updatePlayerPosition(player.position);
  }, [level, player.position.x, player.position.y, player.position]);

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
  };
};

export default usePlayer;
