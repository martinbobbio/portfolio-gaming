import { Container } from '@pixi/react';
import { useWindowSize } from '@/hooks';
import { Point } from 'pixi.js';
import { LevelKingAndPigs, TexturesKingsAndPigs } from '../../interfaces';
import { GraphicUserInterface } from '..';

interface CameraProps {
  level: LevelKingAndPigs;
  player: Point;
  children: React.ReactNode;
  width: number;
  height: number;
  textures: TexturesKingsAndPigs;
}

/**
 * Functional component that renders the camera component.
 *
 * @param level for update the camera position
 * @param player for player position and move the camera
 * @param children for wrap the content
 * @param width for according to the map texture
 * @param height for according to the map texture
 * @return React.ReactElement <Camera/>
 */
const Camera = ({
  level,
  player,
  children,
  width,
  height,
  textures,
}: CameraProps) => {
  const windowSize = useWindowSize();

  const scale = 2.5;

  const centerX = windowSize.width / 2;
  const centerY = windowSize.heigth / 2;

  const minX = centerX / scale;
  const minY = centerY / scale;
  const maxX = width - centerX / scale;
  const maxY = height - centerY / scale;

  const cameraX = Math.min(maxX, Math.max(minX, player.x));
  const cameraY = Math.min(maxY, Math.max(minY, player.y));

  const x = centerX - cameraX * scale;
  const y = centerY - cameraY * scale;

  return (
    <>
      <Container scale={scale} x={x} y={y}>
        {children}
      </Container>
      <GraphicUserInterface textures={textures} level={level} />
    </>
  );
};

export default Camera;
