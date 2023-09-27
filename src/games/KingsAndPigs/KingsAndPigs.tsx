import { useCallback, useEffect, useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Controls, Game, Menu } from './components';
import { KingsAndPigsStyled } from './KingsAndPigs.styled';
import { ControlsKingsAndPigs, TexturesKingsAndPigs } from './interfaces';
import { Assets, Texture } from 'pixi.js';
import { paths } from './data';

const KingsAndPigs = () => {
  const app = usePixiContext();
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
    Assets.load([paths.textures.levels[1], paths.textures.king.idle]).then(
      (resources: Record<string, Texture>) => {
        setTextures({
          levels: {
            1: resources[paths.textures.levels[1]],
          },
          king: {
            idle: resources[paths.textures.king.idle],
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
      {isGameRunning && textures && (
        <KingsAndPigsStyled>
          <Game
            textures={textures}
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
