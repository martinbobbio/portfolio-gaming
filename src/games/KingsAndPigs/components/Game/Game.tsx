import { Container } from '@pixi/react';
import { GraphicCustom, TilingSpriteCustom } from '..';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  TexturesPlayer,
} from '../../interfaces';
import { usePlayer } from '../../hooks';

interface GameProps {
  textures: TexturesPlayer;
  level: LevelKingAndPigs;
  sounds: SoundsKingsAndPigs;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Functional component that render component animated sprited.
 *
 * @param level for level info
 * @param textures for animations and textures for the player
 * @param sounds for player sounds.
 * @param setControls for add behaviors to controls
 * @return React.ReactElement <Player/>
 */
const Player = (gameProps: GameProps) => {
  const { player, inverted, animation } = usePlayer(gameProps);

  return (
    <>
      <Container x={player.position.x} y={player.position.y}>
        <TilingSpriteCustom animation={animation} inverted={inverted} />
      </Container>
      <GraphicCustom block={player.hitbox} />
      {/* {collisionBlocks.map((block, i) => (
        <GraphicCustom key={i} block={block} />
      ))} */}
    </>
  );
};

export default Player;
