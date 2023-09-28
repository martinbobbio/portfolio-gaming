import { useEffect, useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Stage, Container, Sprite } from '@pixi/react';
import { ControlsKingsAndPigs, TexturesKingsAndPigs } from '../../interfaces';
import { Player } from '..';
import { Point } from 'pixi.js';

interface GameProps {
  onEndGame: () => void;
  setControls: (controls: ControlsKingsAndPigs) => void;
  textures: TexturesKingsAndPigs;
}

/**
 * Functional component that render component game.
 *
 * @param textures for the current game textures
 * @param sounds for the sounds of the game
 * @param onEndGame for stop and finish the game
 * @param setControls for add behaviors
 * @return React.ReactElement <Game/>
 */
const Game = ({ textures, setControls }: GameProps) => {
  const app = usePixiContext();
  const currentLevel = textures.levels[1];
  const height = currentLevel.height;
  const width = currentLevel.width;
  const [elapsedFrames, setElapsedFrames] = useState(0);

  useEffect(() => {
    const animate = () => {
      setElapsedFrames(elapsedFrames + 1);
    };

    app.ticker.add(animate);

    return () => {
      app.ticker.remove(animate);
    };
  }, [app, elapsedFrames]);

  return (
    <Stage width={width} height={height}>
      <Container>
        <Sprite
          width={currentLevel.width}
          height={currentLevel.height}
          texture={currentLevel}
        />
        <Player
          setControls={setControls}
          textures={textures.king}
          initialPosition={new Point(100, 100)}
        />
      </Container>
    </Stage>
  );
};

export default Game;
