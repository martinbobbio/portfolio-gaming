import { useEffect, useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Controls, Map, Menu } from './components';
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
  const [controls, setControls] = useState<ControlsKingsAndPigs>();
  const [isGameRunning, setIsGameRunning] = useState(false);

  const handleStartGame = () => {
    if (!sounds) loadSounds();
    setIsGameRunning(true);
    app.start();
  };

  useEffect(() => {
    if (sounds) sounds.music.play();
  }, [sounds]);

  return (
    <>
      <Menu onStartGame={handleStartGame} isGameRunning={isGameRunning} />
      {isGameRunning &&
        textures &&
        sounds &&
        level.texture &&
        !!level.collisionBlocks.length && (
          <KingsAndPigsStyled>
            <Map
              textures={textures}
              level={level}
              sounds={sounds}
              setControls={setControls}
            />
            {controls && <Controls controls={controls} />}
          </KingsAndPigsStyled>
        )}
    </>
  );
};

export default KingsAndPigs;
