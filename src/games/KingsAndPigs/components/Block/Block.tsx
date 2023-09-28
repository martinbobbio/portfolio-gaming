import { useCallback } from 'react';
import { Graphics as GraphicsComponent } from '@pixi/react';
import { Graphics } from 'pixi.js';
import { Block } from '../../interfaces';

interface RectangleProps {
  block: Block;
}

/**
 * Functional component that render component rectangle
 *
 * @return React.ReactElement <Rectangle/>
 */
const Rectangle = ({ block }: RectangleProps) => {
  const { position, width, height } = block;
  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.beginFill('red');
      g.drawRect(position.x, position.y, width, height);
      g.endFill();
    },
    [height, position.x, position.y, width]
  );

  return <GraphicsComponent draw={draw} />;
};

export default Rectangle;
