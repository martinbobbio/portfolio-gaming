import { useCallback } from 'react';
import { Graphics as GraphicsComponent } from '@pixi/react';
import { Graphics } from 'pixi.js';
import {
  Block,
  DoorState,
  LevelKingAndPigs,
  PlayerState,
} from '../../interfaces';

interface DebuggerProps {
  player: PlayerState;
  doors: DoorState[];
  level: LevelKingAndPigs;
}

/**
 * Functional component that render component graphics customs
 *
 * @param player for draw hitbox player
 * @param doors for draw hitbox doors
 * @param level for draw and debugging collision blocks
 * @return React.ReactElement <Debugger/>
 */
const Debugger = ({ player, doors, level }: DebuggerProps) => {
  const draw = useCallback((g: Graphics, block: Block) => {
    const { position, width, height } = block;
    g.clear();
    g.beginFill('rgba(255, 0, 0, 0.5)');
    g.drawRect(position.x, position.y, width, height);
    g.endFill();
  }, []);

  return (
    <>
      <GraphicsComponent draw={(g) => draw(g, player.hitbox)} />
      {level.collisionBlocks.map((block, i) => (
        <GraphicsComponent key={i} draw={(g) => draw(g, block)} />
      ))}
      {doors?.map((door, i) => (
        <GraphicsComponent key={i} draw={(g) => draw(g, door.hitbox)} />
      ))}
    </>
  );
};

export default Debugger;
