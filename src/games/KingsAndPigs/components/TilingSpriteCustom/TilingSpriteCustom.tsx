import { Container, TilingSprite, useTick } from '@pixi/react';
import { Animation } from '../../interfaces';
import { useEffect, useState } from 'react';
import { Point } from 'pixi.js';

interface TilingSpriteCustomProps {
  animation: Animation;
  inverted: boolean;
}

/**
 * Functional component that render component animated sprited.
 *
 * @return React.ReactElement <TilingSpriteCustom/>
 */
const TilingSpriteCustom = ({
  animation,
  inverted,
}: TilingSpriteCustomProps) => {
  const { texture, frameRate, frameBuffer, autoplay, loop } = animation;
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const height = texture.height;
  const width = texture.width / frameRate;
  const tileScale = new Point(inverted ? -1 : 1, 1);

  useEffect(() => {
    setCurrentFrame(0);
    setElapsedFrames(0);
  }, [animation]);

  useTick(() => {
    if (!autoplay) return;
    setElapsedFrames(elapsedFrames + 1);
    if (elapsedFrames % frameBuffer == 0) {
      if (currentFrame < frameRate - 1) setCurrentFrame(currentFrame + 1);
      else if (loop) setCurrentFrame(0);
    }
  });

  return (
    <Container>
      <TilingSprite
        texture={texture}
        width={width}
        height={height}
        tilePosition={{ x: width * currentFrame, y: 0 }}
        tileScale={tileScale}
      />
    </Container>
  );
};

export default TilingSpriteCustom;
