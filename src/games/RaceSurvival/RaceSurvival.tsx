import { useCallback, useEffect, useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Controls, Game, Menu, Score } from './components';
import {
  ControlsGame,
  SoundsRaceSurvival,
  TexturesRaceSurvival,
} from './interfaces';
import { paths } from './data';
import { GameProvider } from './contexts';
import { RaceSurvivalStyled } from './RaceSurvival.styled';
import { Assets, Texture } from 'pixi.js';

const RaceSurvival = () => {
  const app = usePixiContext();
  const [title, setTitle] = useState('Race Survival');
  const [textures, setTextures] = useState<TexturesRaceSurvival>();
  const [sounds, setSounds] = useState<SoundsRaceSurvival>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [controls, setControls] = useState<ControlsGame>();

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
    <GameProvider>
      <>
        <Menu
          title={title}
          onStartGame={handleStartGame}
          isGameRunning={isGameRunning}
        />
        {isGameRunning && textures && sounds && (
          <RaceSurvivalStyled>
            <Game
              textures={textures}
              sounds={sounds}
              onEndGame={handleEndGame}
              setControls={setControls}
            />
            <Score />
          </RaceSurvivalStyled>
        )}
        {isGameRunning && controls && <Controls controls={controls} />}
      </>
    </GameProvider>
  );
};

export default RaceSurvival;
