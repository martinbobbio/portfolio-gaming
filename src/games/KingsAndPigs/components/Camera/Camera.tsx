import { Container } from '@pixi/react';
import { Point } from 'pixi.js';

interface MapProps {
  player: Point;
  children: React.ReactNode;
  width: number;
  height: number;
}

/**
 * Functional component that renders the camera component.
 *
 * @param player for player position and move the camera
 * @param children for wrap the content
 * @param width for according to the map texture
 * @param height for according to the map texture
 * @return React.ReactElement <Camera/>
 */
const Camera = ({ player, children, width, height }: MapProps) => {
  const scale = 1.5;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const minX = centerX / scale;
  const minY = centerY / scale;
  const maxX = width - centerX / scale;
  const maxY = height - centerY / scale;

  const cameraX = Math.min(maxX, Math.max(minX, player.x));
  const cameraY = Math.min(maxY, Math.max(minY, player.y));

  const containerX = centerX - cameraX * scale;
  const containerY = centerY - cameraY * scale;

  return (
    <Container scale={scale} position={[containerX, containerY]}>
      {children}
    </Container>
  );
};

export default Camera;
