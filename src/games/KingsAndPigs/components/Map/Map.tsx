import { useEffect, useState } from 'react';
import { usePixiContext } from '@/hooks';
import { Stage, Container, Sprite } from '@pixi/react';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  TexturesKingsAndPigs,
} from '../../interfaces';
import { Game } from '..';
import { Texture } from 'pixi.js';

interface MapProps {
  textures: TexturesKingsAndPigs;
  level: LevelKingAndPigs;
  sounds: SoundsKingsAndPigs;
  onEndGame: () => void;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Functional component that render component game.
 *
 * @param level for the current level with their blocks and objects
 * @param textures for the current game textures
 * @param sounds for the music and effects
 * @param onEndGame for stop and finish the game
 * @param setControls for add behaviors
 * @return React.ReactElement <Game/>
 */
const Map = ({ textures, sounds, level, setControls }: MapProps) => {
  level.texture = level.texture as Texture;
  const app = usePixiContext();
  const height = level.texture.height;
  const width = level.texture.width;
  const [elapsedFrames, setElapsedFrames] = useState(0);

  useEffect(() => {
    sounds.music.play();
  }, [sounds]);

  useEffect(() => {
    const animate = () => {
      setElapsedFrames(elapsedFrames + 1);
    };

    app.ticker.add(animate);

    return () => {
      app.ticker.remove(animate);
    };
  }, [app, elapsedFrames]);

  return (
    <Stage width={width} height={height}>
      <Container>
        <Sprite
          width={level.texture.width}
          height={level.texture.height}
          texture={level.texture}
        />
        <Game
          setControls={setControls}
          sounds={sounds}
          textures={textures.king}
          level={level}
        />
      </Container>
    </Stage>
  );
};

export default Map;
