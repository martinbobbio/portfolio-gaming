import { Link, useLocation } from 'react-router-dom';
import { Header, MetaTags, Text } from '@/components';
import { routeToTag, routeToTitle, routeToURL } from '@/utils';
import { GameStyled, Iframe } from './Game.styled';
import { useEffect } from 'react';

/**
 * Functional component that render an iframe with the game.
 *
 * @return React.ReactElement <Game/>
 */
const Game = () => {
  const location = useLocation();
  const title = routeToTitle(location.pathname);
  const tag = routeToTag(location.pathname);
  const url = routeToURL(tag);
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
      <GameStyled className={tag}>
        <Iframe src={url}>Game not supported</Iframe>
      </GameStyled>
    </>
  );
};

export default Game;
