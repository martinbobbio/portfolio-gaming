import { useEffect, useMemo, useCallback, useState } from 'react';
import { useKeyPress, usePixiContext } from '@/hooks';
import { Stage, Container, TilingSprite } from '@pixi/react';
import { Point } from 'pixi.js';
import {
  SoundsRaceSurvival,
  TexturesRaceSurvival,
  Vehicle,
} from '../../interfaces';
import { randomInt } from '@/utils';
import { sizeCars, spriteCarsPositions } from '../../data';
import { useGameContext } from '../../hooks';

interface GameProps {
  textures: TexturesRaceSurvival;
  sounds: SoundsRaceSurvival;
  onEndGame: () => void;
}

/**
 * Functional component that render component game.
 *
 * @param textures for the current game textures
 * @param sounds for the sounds of the game
 * @param onEndGame for stop and finish the game
 * @return React.ReactElement <Game/>
 */
const Game = ({ textures, sounds, onEndGame }: GameProps) => {
  const app = usePixiContext();
  const { points, level, setPoints, setLevel } = useGameContext();
  const height = textures.background.height / 1.5;
  const width =
    window.innerWidth > textures.background.width
      ? textures.background.width
      : window.innerWidth;
  const [enemies, setEnemies] = useState<Vehicle[]>([]);
  const [ellapsedFrames, setEllapsedFrames] = useState(0);
  const [isSpeedingUp, setIsSpeedingUp] = useState(false);
  const [player, setPlayer] = useState<Vehicle>({
    position: new Point(200, 0),
    velocity: new Point(0, 0),
    tilePosition: new Point(0, 0),
    width: 36,
    height: 66,
  });
  const [backgroundTilePosition, setBackgroundTilePosition] = useState(
    new Point(0, 0)
  );
  const [shouldUpdateScore, setShouldUpdateScore] = useState(false);
  const [enemiesPassed, setEnemiesPassed] = useState(0);

  const carSpeedMultiplier = useMemo(() => {
    return level / 100;
  }, [level]);

  const speed = useMemo(() => {
    const multiplier = carSpeedMultiplier * 100;
    if (isSpeedingUp) return 5 + multiplier;
    return 1 + multiplier;
  }, [isSpeedingUp, carSpeedMultiplier]);

  const scale = useMemo(() => {
    return new Point(width / textures.background.width, 1);
  }, [textures.background, width]);

  const limits = useMemo(() => {
    return {
      left: Math.round((width * 19.6) / 100) / scale.x,
      right: Math.round((width * 75.7) / 100) / scale.x,
    };
  }, [width, scale]);

  useEffect(() => {
    sounds.car.volume = 0.25;
    sounds.car.loop = true;
    sounds.car.speed = 0.3;
    sounds.music.volume = 0.05;
    sounds.music.play();
    sounds.car.play();
  }, [sounds]);

  const turn = (right: boolean) => {
    const turnSpeed = 4;
    if (right)
      setPlayer((prevState) => ({
        ...prevState,
        velocity: new Point(-turnSpeed, 0),
      }));
    else
      setPlayer((prevState) => ({
        ...prevState,
        velocity: new Point(turnSpeed, 0),
      }));
  };

  const resetVelocity = () => {
    setPlayer((prevState) => ({
      ...prevState,
      velocity: new Point(0, 0),
    }));
  };

  const speedUp = () => {
    sounds.car.speed = 0.4 + carSpeedMultiplier;
    setIsSpeedingUp(true);
  };

  const speedDown = () => {
    sounds.car.speed = 0.3 + carSpeedMultiplier;
    setIsSpeedingUp(false);
  };

  const updateScore = useCallback(() => {
    setPoints(points + (isSpeedingUp ? 10 : 5));
    setShouldUpdateScore(false);
    setLevel(Math.ceil(enemiesPassed / 5));
  }, [setPoints, setLevel, points, enemiesPassed, isSpeedingUp]);

  const getVehicleCenter = (vehicle: Vehicle): Point => {
    return new Point(
      vehicle.position.x + vehicle.width / 2,
      vehicle.position.y + vehicle.height / 2
    );
  };

  useKeyPress('ArrowLeft', () => turn(true), resetVelocity);
  useKeyPress('a', () => turn(true), resetVelocity);
  useKeyPress('ArrowRight', () => turn(false), resetVelocity);
  useKeyPress('d', () => turn(false), resetVelocity);
  useKeyPress('ArrowDown', speedUp, speedDown);
  useKeyPress('s', speedUp, speedDown);

  useEffect(() => {
    if (shouldUpdateScore) updateScore();
  }, [points, shouldUpdateScore, updateScore]);

  useEffect(() => {
    const x = width / 2 - 64 / 2;
    const y = height - 64 - 20;
    setPlayer((prevState) => ({
      ...prevState,
      position: new Point(x, y),
    }));
  }, [width, height]);

  const checkLimitsAndMove = useCallback(() => {
    const isNotLimitLeft = player.position.x >= limits.left;
    const isNotLimitRight = player.position.x <= limits.right;

    if (isNotLimitLeft && isNotLimitRight) {
      setPlayer((prevState) => ({
        ...prevState,
        position: new Point(
          prevState.position.x + player.velocity.x,
          prevState.position.y
        ),
      }));
    } else {
      setPlayer((prevState) => ({
        ...prevState,
        position: new Point(
          isNotLimitLeft ? limits.right : limits.left,
          prevState.position.y
        ),
      }));
    }
  }, [player, limits]);

  const endGame = useCallback(() => {
    app.stop();
    sounds.explosion.volume = 0.5;
    sounds.music.stop();
    sounds.car.stop();
    sounds.explosion.play();
    setEnemies([]);
    setEnemiesPassed(0);
    onEndGame();
    setLevel(1);
    setPoints(0);
  }, [app, onEndGame, setLevel, setPoints, sounds]);

  const checkCollision = useCallback(() => {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const velocity = new Point(
        getVehicleCenter(enemy).x - getVehicleCenter(player).x,
        getVehicleCenter(enemy).y - getVehicleCenter(player).y
      );
      const isHitted = {
        x: Math.abs(velocity.x) < enemy.width,
        y: Math.abs(velocity.y) < enemy.height,
      };

      if (isHitted.x && isHitted.y) endGame();
    }
  }, [enemies, player, endGame]);

  const manageEnemiesOutOfRange = useCallback(() => {
    setEnemies((prevEnemies) => {
      return prevEnemies.filter((enemy) => {
        const enemyPassed = enemy.position.y > height;
        if (enemyPassed) {
          setShouldUpdateScore(true);
          setEnemiesPassed(enemiesPassed + 1);
          return false;
        }
        return true;
      });
    });
  }, [height, enemiesPassed]);

  useEffect(() => {
    const delay = isSpeedingUp ? 25 : 125;
    if (ellapsedFrames % delay !== 0) return;

    const random =
      spriteCarsPositions[randomInt(0, spriteCarsPositions.length - 1)];
    const x = randomInt(limits.left, limits.right);
    const newBot = {
      position: new Point(x, -50),
      tilePosition: new Point(random[0], random[1]),
      velocity: new Point(0, 0),
      width: 36,
      height: 66,
    };
    setEnemies((prevBots) => [...prevBots, newBot]);
  }, [ellapsedFrames, limits, isSpeedingUp, setEnemies]);

  const setBotBehavior = useCallback(() => {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      enemy.position.y += speed;
    }
    setEnemies([...enemies]);
  }, [enemies, speed, setEnemies]);

  useEffect(() => {
    const animate = () => {
      setEllapsedFrames(ellapsedFrames + 1);
      setBackgroundTilePosition(({ x, y }) => new Point(x, (y -= 0.5 * speed)));
      checkLimitsAndMove();
      setBotBehavior();
      checkCollision();
      manageEnemiesOutOfRange();
    };

    app.ticker.add(animate);

    return () => {
      app.ticker.remove(animate);
    };
  }, [
    app,
    limits,
    speed,
    player,
    enemies,
    ellapsedFrames,
    checkLimitsAndMove,
    setBotBehavior,
    checkCollision,
    manageEnemiesOutOfRange,
    sounds.car,
  ]);

  return (
    <Stage width={width} height={height}>
      <Container scale={scale}>
        <TilingSprite
          width={textures.background.width}
          height={textures.background.height}
          texture={textures.background}
          tilePosition={backgroundTilePosition}
        />
        <TilingSprite
          position={player.position}
          texture={textures.car}
          tilePosition={{ x: 0, y: 0 }}
          width={sizeCars.width}
          height={sizeCars.height}
        />
        {enemies.map((enemy, i) => (
          <TilingSprite
            key={i}
            x={enemy.position.x}
            y={enemy.position.y}
            texture={textures.car}
            tilePosition={enemy.tilePosition}
            width={sizeCars.width}
            height={sizeCars.height}
          />
        ))}
      </Container>
    </Stage>
  );
};

export default Game;
