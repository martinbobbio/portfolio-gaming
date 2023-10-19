import { Suspense, useEffect, useState } from 'react';
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
  const { level } = useLevel();
  const { textures, sounds, loadSounds } = useResources();
  const [controls, setControls] = useState<ControlsKingsAndPigs>();
  const [isGameRunning, setIsGameRunning] = useState(false);

  const handleStartGame = () => {
    if (!sounds) loadSounds();
    setIsGameRunning(true);
  };

  useEffect(() => {
    if (sounds) sounds.music.play();
  }, [sounds]);

  return (
    <Suspense fallback={<div>Loading</div>}>
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
          </KingsAndPigsStyled>
        )}
      {isGameRunning && controls && <Controls controls={controls} />}
    </Suspense>
  );
};

export default KingsAndPigs;
