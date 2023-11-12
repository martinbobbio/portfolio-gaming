import { Container } from '@pixi/react';
import { BoxState } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface BoxesProps {
  boxes: BoxState[];
}

/**
 * Functional component that renders the boxes component.
 *
 * @return React.ReactElement <Boxes/>
 */
const Boxes = ({ boxes }: BoxesProps) => {
  return boxes?.map((box, i) => (
    <Container key={i} x={box.position.x} y={box.position.y}>
      <TilingSpriteCustom animation={box.currentAnimation} />
    </Container>
  ));
};

export default Boxes;
