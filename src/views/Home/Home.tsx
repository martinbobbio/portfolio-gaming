import { Footer, Header } from '@/components';
import { HomeStyled } from './Home.styled';

/**
 * Functional component that render component home.
 *
 * @return React.ReactElement <Home/>
 */
const Home = () => {
  return (
    <>
      <Header />
      <HomeStyled>games..</HomeStyled>
      <Footer />
    </>
  );
};

export default Home;
