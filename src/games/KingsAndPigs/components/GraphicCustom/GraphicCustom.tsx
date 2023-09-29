import { useCallback } from 'react';
import { Graphics as GraphicsComponent } from '@pixi/react';
import { Graphics } from 'pixi.js';
import { Block } from '../../interfaces';

interface GraphicCustomProps {
  block: Block;
}

/**
 * Functional component that render component graphics customs
 *
 * @param block for draw the GraphicCustom for debugging
 * @return React.ReactElement <GraphicCustom/>
 */
const GraphicCustom = ({ block }: GraphicCustomProps) => {
  const { position, width, height } = block;
  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.beginFill('rgba(255, 0, 0, 0.5)');
      g.drawRect(position.x, position.y, width, height);
      g.endFill();
    },
    [height, position.x, position.y, width]
  );

  return <GraphicsComponent draw={draw} />;
};

export default GraphicCustom;
