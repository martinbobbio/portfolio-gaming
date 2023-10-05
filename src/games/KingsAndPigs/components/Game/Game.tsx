import { Container } from '@pixi/react';
import { Debugger, TilingSpriteCustom } from '..';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  TexturesKingsAndPigs,
} from '../../interfaces';
import { useDoors, usePlayer } from '../../hooks';

const debug = false;

interface GameProps {
  textures: TexturesKingsAndPigs;
  level: LevelKingAndPigs;
  sounds: SoundsKingsAndPigs;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Functional component that render component game with main logic.
 *
 * @param level for level info
 * @param textures for animations and textures for the player
 * @param sounds for player sounds.
 * @param setControls for add behaviors to controls
 * @return React.ReactElement <Game/>
 */
const Game = (gameProps: GameProps) => {
  const { level, textures } = gameProps;
  const { doors } = useDoors({
    ...gameProps,
    textures: textures.door,
  });

  const { player } = usePlayer({
    ...gameProps,
    textures: textures.king,
    doors,
  });

  return (
    <>
      {doors?.map((door, i) => (
        <Container key={i} x={door.position.x} y={door.position.y}>
          <TilingSpriteCustom animation={door.currentAnimation} />
        </Container>
      ))}
      <Container x={player.position.x} y={player.position.y}>
        <TilingSpriteCustom
          animation={player.currentAnimation}
          inverted={player.inverted}
        />
      </Container>
      {debug && <Debugger player={player} doors={doors} level={level} />}
    </>
  );
};

export default Game;
