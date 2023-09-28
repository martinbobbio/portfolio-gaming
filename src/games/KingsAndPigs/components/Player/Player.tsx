import { Container, useTick } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { Block, TilingSpriteCustom } from '..';
import {
  ControlsKingsAndPigs,
  PlayerState,
  TexturesPlayer,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface PlayerProps {
  initialPosition: Point;
  textures: TexturesPlayer;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Functional component that render component animated sprited.
 *
 * @param textures for animations and textures for the player
 * @param setControls for add behaviors
 * @return React.ReactElement <Player/>
 */
const Player = ({ textures, initialPosition, setControls }: PlayerProps) => {
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [inverted, setInverted] = useState(false);
  const offsetX = inverted ? 34 : 10;
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
    },
  });
  const animation = player.animations[player.currentAnimation];

  const applyMovement = () => {
    const x = player.position.x + player.velocity.x;
    const y = player.position.y;
    const position = new Point(x, y);
    setPlayer((prevState) => ({ ...prevState, position }));
  };

  const applyGravity = () => {
    const velocity = new Point(
      player.velocity.x,
      player.velocity.y + player.gravity
    );
    const position = new Point(
      player.position.x,
      player.position.y + player.velocity.y
    );
    setPlayer((prevState) => ({ ...prevState, velocity, position }));
  };

  const updateHitbox = () => {
    const hitbox = player.hitbox;
    hitbox.position.x = player.position.x + offsetX;
    hitbox.position.y = player.position.y + offsetY;
    setPlayer((prevState) => ({ ...prevState, hitbox }));
  };

  const run = useCallback(
    (inverted: boolean) => {
      const x = inverted ? -5 : 5;
      const y = player.velocity.y;
      const velocity = new Point(x, y);
      const currentAnimation = 'run';
      setInverted(inverted);
      setPlayer((prevState) => ({
        ...prevState,
        velocity,
        currentAnimation,
      }));
    },
    [player.velocity.y]
  );

  const stopRun = useCallback(
    (inverted: boolean) => {
      const x = 0;
      const y = player.velocity.y;
      const velocity = new Point(x, y);
      const currentAnimation = 'idle';
      setInverted(inverted);
      setPlayer((prevState) => ({
        ...prevState,
        velocity,
        currentAnimation,
      }));
    },
    [player.velocity.y]
  );

  useEffect(() => {
    setControls({
      onTouchLeftStart: () => run(true),
      onTouchLeftEnd: () => stopRun(true),
      onTouchRightStart: () => run(false),
      onTouchRightEnd: () => stopRun(false),
    });
  }, [run, stopRun, setControls]);

  useTick(() => {
    setElapsedFrames(elapsedFrames + 1);
    applyMovement();
    updateHitbox();
    // collisions horizontal
    applyGravity();
    // updateHitbox();
    // collisions vertical
  });

  return (
    <>
      <Container position={player.position}>
        <TilingSpriteCustom animation={animation} inverted={inverted} />
      </Container>
      <Block block={player.hitbox} />
    </>
  );
};

export default Player;
