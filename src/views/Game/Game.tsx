import { Link, useLocation } from 'react-router-dom';
import { Header, MetaTags, Text } from '@/components';
import { routeToTag, routeToTitle } from '@/utils';
import { GameStyled } from './Game.styled';
import { useEffect } from 'react';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags title={title} favicon={tag} />
      <Header breadcrumbs={breadcrumbs} hide={true} />
      <GameStyled className={tag}>{game}</GameStyled>
    </>
  );
};

export default PixiGame;
