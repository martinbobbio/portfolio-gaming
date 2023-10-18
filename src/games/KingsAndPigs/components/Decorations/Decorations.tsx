import { Container } from '@pixi/react';
import { DecorationsState } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface DecorationsProps {
  decorations: DecorationsState[];
}

/**
 * Functional component that renders the decoration component.
 *
 * @return React.ReactElement <Decorations/>
 */
const Decorations = ({ decorations }: DecorationsProps) => {
  return decorations.map(({ position, animation }, i) => (
    <Container key={i} position={position}>
      <TilingSpriteCustom animation={animation} />
    </Container>
  ));
};

export default Decorations;
