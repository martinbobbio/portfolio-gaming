import { useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Controls, Game, Menu } from './components';
import { ControlsKingsAndPigs } from './interfaces';
import { useLevel, useResources } from './hooks';
import { KingsAndPigsStyled } from './KingsAndPigs.styled';

/**
 * Functional component that render the main logic and load data
 *
 * @return React.ReactElement <KingsAndPigs/>
 */
const KingsAndPigs = () => {
  const app = usePixiContext();
  const { level } = useLevel();
  const { textures, sounds, loadSounds } = useResources();
  const [title, setTitle] = useState('Kings And Pigs');
  const [controls, setControls] = useState<ControlsKingsAndPigs>();
  const [isGameRunning, setIsGameRunning] = useState(false);

  const handleStartGame = () => {
    setIsGameRunning(true);
    app.start();
    if (!sounds) loadSounds();
  };

  const handleEndGame = () => {
    app.stop();
    setTitle('Try Again');
    setIsGameRunning(false);
  };

  return (
    <>
      <Menu
        title={title}
        onStartGame={handleStartGame}
        isGameRunning={isGameRunning}
      />
      {isGameRunning &&
        textures &&
        sounds &&
        level.texture &&
        !!level.collisionBlocks.length && (
          <KingsAndPigsStyled>
            <Game
              textures={textures}
              level={level}
              sounds={sounds}
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
