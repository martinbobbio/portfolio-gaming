import { Container } from '@pixi/react';
import { BoxState, BoxTextures } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface BoxesProps {
  boxes: BoxState[];
  textures: BoxTextures;
}

/**
 * Functional component that renders the boxes component.
 *
 * @param boxes for render the boxes
 * @param textures for add textures
 * @return React.ReactElement <Boxes/>
 */
const Boxes = ({ boxes, textures }: BoxesProps) => {
  const renderByStatus = (box: BoxState) => {
    const renderIdle = () => {
      const animation = {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.idle,
        frameRate: 1,
      };
      return <TilingSpriteCustom animation={animation} />;
    };

    const renderHit = () => {
      const animation = {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.hit,
        frameRate: 1,
      };
      return <TilingSpriteCustom animation={animation} />;
    };

    const renderBroken = () => {
      const animation = {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.broken1,
        frameRate: 1,
      };
      return <TilingSpriteCustom animation={animation} />;
    };

    switch (box.behavior) {
      case 'IDLE':
        return renderIdle();
      case 'HIT':
        return renderHit();
      case 'BROKEN':
        return renderBroken();
    }
  };

  return boxes?.map((box, i) => (
    <Container key={i} x={box.position.x} y={box.position.y}>
      {renderByStatus(box)}
    </Container>
  ));
};

export default Boxes;
