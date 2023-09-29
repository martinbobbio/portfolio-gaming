import { Container, useTick } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { GraphicCustom, TilingSpriteCustom } from '..';
import {
  Block,
  ControlsKingsAndPigs,
  PlayerState,
  TexturesPlayer,
} from '../../interfaces';
import { Point } from 'pixi.js';
import { useCollisions } from '../../hooks';
import { PlayerAnimations } from '../../interfaces/player/player';

interface PlayerProps {
  initialPosition: Point;
  textures: TexturesPlayer;
  collisionBlocks: Block[];
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Functional component that render component animated sprited.
 *
 * @param initialPosition for the initial x and y player position
 * @param textures for animations and textures for the player
 * @param collisionBlocks for check collisions with the player
 * @param setControls for add behaviors to controls
 * @return React.ReactElement <Player/>
 */
const Player = ({
  textures,
  initialPosition,
  collisionBlocks,
  setControls,
}: PlayerProps) => {
  const { applyHorizontal, applyVertical } = useCollisions();
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [inverted, setInverted] = useState(false);
  //const offsetX = inverted ? 34 : 10;
  const offsetX = 10;
  const offsetY = 18;
  const [player, setPlayer] = useState<PlayerState>({
    position: initialPosition,
    velocity: new Point(0, 0),
    gravity: 1,
    inverted: false,
    currentAnimation: 'idle',
    hitbox: {
      position: new Point(
        initialPosition.x + offsetX,
        initialPosition.y + offsetY
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
        frameBuffer: 10,
        texture: textures.attack,
        frameRate: 3,
        onComplete: () => {
          setCurrentAnimation('idle');
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
    (inverted: boolean) => {
      const currentAnimation = 'run';
      setInverted(inverted);
      setVelocityX(inverted ? -5 : 5);
      setCurrentAnimation(currentAnimation);
    },
    [setVelocityX]
  );

  const stopRun = useCallback(
    (inverted: boolean) => {
      const currentAnimation = 'idle';
      setInverted(inverted);
      setVelocityX(0);
      setCurrentAnimation(currentAnimation);
    },
    [setVelocityX]
  );

  const jump = useCallback(
    (power: number) => {
      if (player.velocity.y === 0) {
        setVelocityY(-power);
      }
    },
    [player.velocity.y, setVelocityY]
  );

  const attack = useCallback(() => {
    setCurrentAnimation('attack');
  }, []);

  useEffect(() => {
    setControls({
      onTouchLeftStart: () => run(true),
      onTouchLeftEnd: () => stopRun(true),
      onTouchRightStart: () => run(false),
      onTouchRightEnd: () => stopRun(false),
      onTouchUp: () => jump(15),
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

  return (
    <>
      <Container x={player.position.x} y={player.position.y}>
        <TilingSpriteCustom animation={animation} inverted={inverted} />
      </Container>
      <GraphicCustom block={player.hitbox} />
      {collisionBlocks.map((block, i) => (
        <GraphicCustom key={i} block={block} />
      ))}
    </>
  );
};

export default Player;
