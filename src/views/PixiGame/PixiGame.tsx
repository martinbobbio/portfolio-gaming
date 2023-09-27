import { Link, useLocation } from 'react-router-dom';
import { Header, MetaTags, Text } from '@/components';
import { PixiProvider } from '@/contexts';
import { routeToTag, routeToTitle } from '@/utils';
import { PixiGameStyled } from './PixiGame.styled';

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
  const tag = routeToTag(location.pathname);
  const breadcrumbs = [
    <Text key={0}>
      <Link to='/'>Games</Link>
    </Text>,
    <Text key={1}>{title}</Text>,
  ];

  return (
    <>
      <MetaTags title={title} favicon={tag} />
      <Header breadcrumbs={breadcrumbs} hide={true} />
      <PixiProvider>
        <PixiGameStyled className={tag}>{game}</PixiGameStyled>
      </PixiProvider>
    </>
  );
};

export default PixiGame;
