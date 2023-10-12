import { useCallback, useEffect, useState } from 'react';
import { Controls, Map, Menu, Score } from './components';
import {
  ControlsGame,
  Points,
  SoundsRaceSurvival,
  TexturesRaceSurvival,
} from './interfaces';
import { paths } from './data';
import { RaceSurvivalStyled } from './RaceSurvival.styled';
import { Assets, Texture } from 'pixi.js';

/**
 * Functional component that render the main logic and load data
 *
 * @return React.ReactElement <RaceSurvival/>
 */
const RaceSurvival = () => {
  const [title, setTitle] = useState('Race Survival');
  const [textures, setTextures] = useState<TexturesRaceSurvival>();
  const [sounds, setSounds] = useState<SoundsRaceSurvival>();
  const [controls, setControls] = useState<ControlsGame>();
  const [points, setPoints] = useState<Points>({ points: 0, level: 1 });
  const [isGameRunning, setIsGameRunning] = useState(false);

  const handleStartGame = () => {
    setIsGameRunning(true);
    if (!sounds) loadSounds();
  };

  const handleEndGame = () => {
    setTitle('Try Again');
    setIsGameRunning(false);
  };

  const loadTextures = useCallback(async () => {
    Assets.load([paths.textures.background, paths.textures.car]).then(
      (resources: Record<string, Texture>) => {
        setTextures({
          background: resources[paths.textures.background],
          car: resources[paths.textures.car],
        });
      }
    );
  }, []);

  const loadSounds = useCallback(() => {
    import('@pixi/sound').then(({ sound }) => {
      setSounds({
        car: sound.add('car', paths.sounds.car),
        music: sound.add('music', paths.sounds.music),
        explosion: sound.add('explosion', paths.sounds.explosion),
      });
    });
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
      {isGameRunning && textures && sounds && (
        <RaceSurvivalStyled>
          <Map
            textures={textures}
            sounds={sounds}
            onEndGame={handleEndGame}
            setControls={setControls}
            setPoints={setPoints}
            points={points}
          />
          <Score level={points.level} points={points.points} />
        </RaceSurvivalStyled>
      )}
      {isGameRunning && controls && <Controls controls={controls} />}
    </>
  );
};

export default RaceSurvival;
