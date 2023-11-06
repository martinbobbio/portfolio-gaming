import { useCallback } from 'react';
import { Graphics as GraphicsComponent } from '@pixi/react';
import { Graphics } from 'pixi.js';
import {
  Block,
  DecorationsState,
  DoorState,
  ItemState,
  LevelKingAndPigs,
  PlayerState,
} from '../../interfaces';

interface DebuggerProps {
  player: PlayerState;
  doors: DoorState[];
  level: LevelKingAndPigs;
  decorations: DecorationsState[];
  items: ItemState[];
}

/**
 * Functional component that render component graphics customs
 *
 * @param player for draw hitbox player
 * @param doors for draw hitbox doors
 * @param level for draw and debugging collision blocks
 * @param decorations for draw hitbox decorations
 * @return React.ReactElement <Debugger/>
 */
const Debugger = ({
  player,
  doors,
  level,
  decorations,
  items,
}: DebuggerProps) => {
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
      {level.platformBlocks.map((block, i) => (
        <GraphicsComponent key={i} draw={(g) => draw(g, block)} />
      ))}
      {doors?.map(({ hitbox }, i) => (
        <GraphicsComponent key={i} draw={(g) => draw(g, hitbox)} />
      ))}
      {decorations?.map(({ hitbox }, i) => (
        <GraphicsComponent key={i} draw={(g) => draw(g, hitbox)} />
      ))}
      {items?.map(({ hitbox }, i) => (
        <GraphicsComponent key={i} draw={(g) => draw(g, hitbox)} />
      ))}
    </>
  );
};

export default Debugger;
