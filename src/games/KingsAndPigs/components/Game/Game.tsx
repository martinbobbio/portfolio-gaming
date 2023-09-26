import { useEffect } from 'react';
import { usePixiContext } from '@/hooks';
import { Stage, Container, Sprite } from '@pixi/react';
import { TexturesKingsAndPigs } from '../../interfaces';

interface GameProps {
  onEndGame: () => void;
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
const Game = ({ textures }: GameProps) => {
  const app = usePixiContext();
  const currentLevel = textures.levels[1];
  const height = currentLevel.height;
  const width = currentLevel.width;

  useEffect(() => {
    const animate = () => {
      console.log('Aniamated');
    };

    app.ticker.add(animate);

    return () => {
      app.ticker.remove(animate);
    };
  }, [app]);

  return (
    <Stage width={width} height={height}>
      <Container>
        <Sprite
          width={currentLevel.width}
          height={currentLevel.height}
          texture={currentLevel}
        />
      </Container>
    </Stage>
  );
};

export default Game;
