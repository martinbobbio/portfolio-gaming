import { useCallback, useEffect, useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Controls, Game, Menu } from './components';
import { ControlsKingsAndPigs, TexturesKingsAndPigs } from './interfaces';
import { paths } from './data';
import { useLevel } from './hooks';
import { Assets, Texture } from 'pixi.js';
import { KingsAndPigsStyled } from './KingsAndPigs.styled';

/**
 * Functional component that render the main logic and load data
 *
 * @return React.ReactElement <KingsAndPigs/>
 */
const KingsAndPigs = () => {
  const app = usePixiContext();
  const { level } = useLevel();
  const [title, setTitle] = useState('Kings And Pigs');
  const [textures, setTextures] = useState<TexturesKingsAndPigs>();
  const [controls, setControls] = useState<ControlsKingsAndPigs>();
  const [isGameRunning, setIsGameRunning] = useState(false);

  const handleStartGame = () => {
    setIsGameRunning(true);
    app.start();
  };

  const handleEndGame = () => {
    app.stop();
    setTitle('Try Again');
    setIsGameRunning(false);
  };

  const loadTextures = useCallback(async () => {
    const { king } = paths.textures;
    Assets.load([king.idle, king.run]).then(
      (resources: Record<string, Texture>) => {
        setTextures({
          king: {
            idle: resources[king.idle],
            run: resources[king.run],
          },
        });
      }
    );
  }, []);

  useEffect(() => {
    loadTextures();
  }, [loadTextures]);

  return (
    <>
      <Menu
        title={title}
        onStartGame={handleStartGame}
        isGameRunning={isGameRunning}
      />
      {isGameRunning &&
        textures &&
        level.texture &&
        !!level.collisionBlocks.length && (
          <KingsAndPigsStyled>
            <Game
              textures={textures}
              level={level}
              setControls={setControls}
              onEndGame={handleEndGame}
            />
            {controls && <Controls controls={controls} />}
          </KingsAndPigsStyled>
        )}
    </>
  );
};

export default KingsAndPigs;
