import { Block, PlayerState } from '../../interfaces';

const useCollisions = () => {
  const getIfExistHorizontal = (player: PlayerState, block: Block) => {
    const { hitbox } = player;
    const left = hitbox.position.x <= block.position.x + block.width;
    const right = hitbox.position.x + hitbox.width >= block.position.x;
    const top = hitbox.position.y + hitbox.height >= block.position.y;
    const bottom = hitbox.position.y <= block.position.y + block.height;
    return left && right && top && bottom;
  };

  const applyHorizontal = (
    player: PlayerState,
    blocks: Block[],
    setPositionX: (x: number) => void
  ) => {
    const { hitbox } = player;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (getIfExistHorizontal(player, block)) {
        if (player.velocity.x < 0) {
          const offset = hitbox.position.x - player.position.x;
          setPositionX(block.position.x + block.width - offset + 0.01);
          break;
        }
        if (player.velocity.x > 0) {
          const offset = hitbox.position.x - player.position.x + hitbox.width;
          setPositionX(block.position.x - offset - 0.01);
          break;
        }
      }
    }
  };

  const getIfExistVertical = (player: PlayerState, block: Block) => {
    const { hitbox } = player;
    const left = hitbox.position.x <= block.position.x + block.width;
    const right = hitbox.position.x + hitbox.width >= block.position.x;
    const top = hitbox.position.y + hitbox.height >= block.position.y;
    const bottom = hitbox.position.y <= block.position.y + block.height;

    return left && right && top && bottom;
  };

  const applyVertical = (
    player: PlayerState,
    blocks: Block[],
    setPositionY: (y: number) => void,
    setVelocityY: (y: number) => void
  ) => {
    const { hitbox } = player;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (getIfExistVertical(player, block)) {
        if (player.velocity.y < 0) {
          setVelocityY(0);
          const offset = hitbox.position.y - player.position.y;
          setPositionY(block.position.y + block.height - offset + 0.01);
          break;
        }
        if (player.velocity.y > 0) {
          setVelocityY(0);
          const offset = hitbox.position.y - player.position.y + hitbox.height;
          setPositionY(block.position.y - offset - 0.01);
          break;
        }
      }
    }
  };

  return {
    applyHorizontal,
    applyVertical,
  };
};

export default useCollisions;
