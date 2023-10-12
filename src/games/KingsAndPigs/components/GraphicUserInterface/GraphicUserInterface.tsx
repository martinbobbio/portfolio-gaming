import { Container, Sprite } from '@pixi/react';
import { LevelKingAndPigs, TexturesKingsAndPigs } from '../../interfaces';
import { TilingSpriteCustom } from '..';
import { useMemo } from 'react';

interface GUIProps {
  textures: TexturesKingsAndPigs;
  level: LevelKingAndPigs;
}

/**
 * Functional component that render GUI with lives and coins customs
 *
 * @param level for updating positions
 * @param textures for drawing the gui
 * @return React.ReactElement <GUI/>
 */
const GraphicUserInterface = ({ level, textures }: GUIProps) => {
  const animations = useMemo(() => {
    return {
      smallHeartIdle: {
        autoplay: true,
        loop: true,
        frameBuffer: 9,
        texture: textures.livesAndCoins.smallHeartIdle,
        frameRate: 8,
      },
    };
  }, [textures.livesAndCoins.smallHeartIdle]);

  const hearts = [
    { x: 12, y: 10 },
    { x: 22, y: 10 },
    { x: 32, y: 10 },
  ];
  const { x, y } = level.camera.position;

  return (
    <Container scale={1.5} x={x} y={y}>
      <Sprite texture={textures.livesAndCoins.liveBar} />
      {hearts.map((heart, i) => (
        <Container key={i} x={heart.x} y={heart.y}>
          <TilingSpriteCustom animation={animations.smallHeartIdle} />
        </Container>
      ))}
    </Container>
  );
};

export default GraphicUserInterface;
