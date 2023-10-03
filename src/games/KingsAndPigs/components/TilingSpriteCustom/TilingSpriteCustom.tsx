import { TilingSprite, useTick } from '@pixi/react';
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
 * @param animation for the main logic of the tilingsprite
 * @param inverted for invert and scale tilingsprite
 * @return React.ReactElement <TilingSpriteCustom/>
 */
const TilingSpriteCustom = ({
  animation,
  inverted,
}: TilingSpriteCustomProps) => {
  const { texture, frameRate, frameBuffer, autoplay, loop, onComplete } =
    animation;
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const height = texture.height;
  const width = texture.width / frameRate;
  const tilePosition = new Point(width * currentFrame + width, 0);
  const scale = new Point(inverted ? -1 : 1, 1);
  const position = new Point(inverted ? width : 0, 0);

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

    if (onComplete) {
      if (currentFrame === frameRate - 1) {
        onComplete();
      }
    }
  });

  return (
    <TilingSprite
      texture={texture}
      width={width}
      height={height}
      tilePosition={tilePosition}
      position={position}
      scale={scale}
    />
  );
};

export default TilingSpriteCustom;
