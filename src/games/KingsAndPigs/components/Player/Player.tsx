import { Container, useTick } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { TilingSpriteCustom } from '..';
import {
  Animation,
  ControlsKingsAndPigs,
  PlayerState,
  TexturesPlayer,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface PlayerProps {
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
const Player = ({ textures, setControls }: PlayerProps) => {
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const animation: Animation = {
    autoplay: true,
    loop: true,
    frameBuffer: 4,
    texture: textures.idle,
    frameRate: 11,
    inverted: false,
  };
  const [player, setPlayer] = useState<PlayerState>({
    position: new Point(0, 200),
    velocity: new Point(0, 0),
    gravity: 1,
    inverted: false,
    currentAnimation: animation,
    animations: [animation],
  });

  const updatePlayerPositionWithVelocity = () => {
    const x = player.position.x + player.velocity.x;
    const y = player.position.y;
    const position = new Point(x, y);
    setPlayer((prevState) => ({ ...prevState, position }));
  };

  const run = useCallback(
    (inverted: boolean) => {
      const x = inverted ? -5 : 5;
      const y = player.velocity.y;
      const velocity = new Point(x, y);
      setPlayer((prevState) => ({ ...prevState, velocity, inverted }));
    },
    [player.velocity.y]
  );

  const stopRun = useCallback(
    (inverted: boolean) => {
      const x = 0;
      const y = player.velocity.y;
      const velocity = new Point(x, y);
      setPlayer((prevState) => ({ ...prevState, velocity, inverted }));
    },
    [player.velocity.y]
  );

  useEffect(() => {
    setPlayer((prevState) => ({
      ...prevState,
      currentAnimation: {
        ...prevState.currentAnimation,
        inverted: player.inverted,
      },
    }));
  }, [player.inverted]);

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
    updatePlayerPositionWithVelocity();
  });

  return (
    <Container position={player.position}>
      <TilingSpriteCustom animation={player.currentAnimation} />
    </Container>
  );
};

export default Player;
