import { Debugger, Decorations, Doors, Player } from '..';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  TexturesKingsAndPigs,
} from '../../interfaces';
import {
  useDecorations,
  useDialogBox,
  useDoors,
  useParticles,
  usePlayer,
} from '../../hooks';

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
const Game = ({ level, textures, sounds, setControls }: GameProps) => {
  const { doors } = useDoors({
    level,
    textures: textures.door,
  });

  const { dialogBox } = useDialogBox({
    textures: textures.dialogBox,
  });

  const { particles } = useParticles({
    textures: textures.particles,
  });

  const { player } = usePlayer({
    textures: textures.king,
    level,
    doors,
    sounds,
    dialogBox,
    particles,
    setControls,
  });

  const { decorations } = useDecorations({
    textures: textures.decorations,
    objects: level.decorations,
  });

  return (
    <>
      <Decorations decorations={decorations} />
      <Doors doors={doors} />
      <Player player={player} dialogBox={dialogBox} particles={particles} />
      {debug && (
        <Debugger
          player={player}
          doors={doors}
          level={level}
          decorations={decorations}
        />
      )}
    </>
  );
};

export default Game;
