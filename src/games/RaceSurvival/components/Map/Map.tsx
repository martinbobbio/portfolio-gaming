import { useEffect, useMemo } from 'react';
import { Stage, Container } from '@pixi/react';
import { useWindowSize } from '@/hooks';
import { Point } from 'pixi.js';
import {
  ControlsGame,
  Points,
  SoundsRaceSurvival,
  TexturesRaceSurvival,
} from '../../interfaces';
import { Game } from '..';

interface MapProps {
  textures: TexturesRaceSurvival;
  sounds: SoundsRaceSurvival;
  onEndGame: () => void;
  setControls: (controls: ControlsGame) => void;
  setPoints: (points: Points) => void;
  points: Points;
}

/**
 * Functional component that render component map.
 *
 * @param textures for the current map textures
 * @param sounds for the sounds of the map
 * @param points for pass point to child component
 * @param onEndGame for stop and finish the map
 * @param setControls for add behaviors
 * @param setPoints for the points
 * @return React.ReactElement <Map/>
 */
const Map = ({
  textures,
  sounds,
  points,
  onEndGame,
  setControls,
  setPoints,
}: MapProps) => {
  const windowSize = useWindowSize();
  const height = windowSize.heigth;
  const width =
    windowSize.width > textures.background.width
      ? textures.background.width
      : windowSize.width;

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
          setPoints={setPoints}
          points={points}
        />
      </Container>
    </Stage>
  );
};

export default Map;
