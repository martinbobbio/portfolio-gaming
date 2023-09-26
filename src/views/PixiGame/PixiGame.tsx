import { useLocation } from 'react-router-dom';
import { Header } from '@/components';
import { PixiProvider } from '@/contexts';
import { PixiGameStyled } from './PixiGame.styled';
import { routeToTitle } from '@/utils';

interface PixiGameProps {
  game: React.ReactNode;
}

/**
 * Functional component that render component pixi game.
 *
 * @return React.ReactElement <PixiGame/>
 */
const PixiGame = ({ game }: PixiGameProps) => {
  const location = useLocation();
  const title = routeToTitle(location.pathname);

  return (
    <>
      <Header title={title} />
      <PixiGameStyled>
        <PixiProvider>
          <>{game}</>
        </PixiProvider>
      </PixiGameStyled>
    </>
  );
};

export default PixiGame;
