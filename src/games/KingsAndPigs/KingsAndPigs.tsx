import { useCallback, useEffect, useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Game, Menu } from './components';
import { GameProvider } from './contexts';
import { KingsAndPigsStyled } from './KingsAndPigs.styled';
import { TexturesKingsAndPigs } from './interfaces';
import { Assets, Texture } from 'pixi.js';
import { paths } from './data';

const KingsAndPigs = () => {
  const app = usePixiContext();
  const [title, setTitle] = useState('Kings And Pigs');
  const [textures, setTextures] = useState<TexturesKingsAndPigs>();
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
    Assets.load([paths.textures.levels[1]]).then(
      (resources: Record<string, Texture>) => {
        setTextures({
          levels: {
            1: resources[paths.textures.levels[1]],
          },
        });
      }
    );
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
        {isGameRunning && textures && (
          <KingsAndPigsStyled>
            <Game textures={textures} onEndGame={handleEndGame} />
          </KingsAndPigsStyled>
        )}
      </>
    </GameProvider>
  );
};

export default KingsAndPigs;
