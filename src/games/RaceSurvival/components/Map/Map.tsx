import { useEffect, useMemo } from 'react';
import { Stage, Container } from '@pixi/react';
import { Point } from 'pixi.js';
import {
  ControlsGame,
  SoundsRaceSurvival,
  TexturesRaceSurvival,
} from '../../interfaces';
import { Game } from '..';

interface GameProps {
  textures: TexturesRaceSurvival;
  sounds: SoundsRaceSurvival;
  onEndGame: () => void;
  setControls: (controls: ControlsGame) => void;
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
const Map = ({ textures, sounds, onEndGame, setControls }: GameProps) => {
  const height = window.innerHeight;
  const width =
    window.innerWidth > textures.background.width
      ? textures.background.width
      : window.innerWidth;

  const scale = useMemo(() => {
    return new Point(width / textures.background.width, 1);
  }, [textures.background, width]);

  useEffect(() => {
    sounds.car.volume = 0.25;
    sounds.car.loop = true;
    sounds.car.speed = 0.3;
    sounds.music.volume = 0.05;
    sounds.music.play();
    sounds.car.play();
  }, [sounds]);

  return (
    <Stage width={width} height={height}>
      <Container scale={scale}>
        <Game
          textures={textures}
          sounds={sounds}
          onEndGame={onEndGame}
          setControls={setControls}
        />
      </Container>
    </Stage>
  );
};

export default Map;
