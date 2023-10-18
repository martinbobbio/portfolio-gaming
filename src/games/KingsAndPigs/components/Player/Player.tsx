import { Container } from '@pixi/react';
import { DialogBoxState, PlayerState } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface PlayerProps {
  player: PlayerState;
  dialogBox: DialogBoxState;
}

/**
 * Functional component that renders the player component.
 *
 * @return React.ReactElement <Player/>
 */
const Player = ({ player, dialogBox }: PlayerProps) => {
  return (
    <Container x={player.position.x} y={player.position.y}>
      <TilingSpriteCustom
        animation={player.currentAnimation}
        inverted={player.inverted}
      />
      <Container x={player.inverted ? 25 : 35}>
        {dialogBox.visible && (
          <TilingSpriteCustom animation={dialogBox.currentAnimation} />
        )}
      </Container>
    </Container>
  );
};

export default Player;
