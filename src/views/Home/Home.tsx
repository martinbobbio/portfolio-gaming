import { Link } from 'react-router-dom';
import { Footer, Header, Text, MetaTags } from '@/components';
import { GlobalStyle, HomeStyled } from './Home.styled';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Container,
  Grid,
  Chip,
} from '@mui/material';

/**
 * Functional component that render component home.
 *
 * @return React.ReactElement <Home/>
 */
const Home = () => {
  const games = [
    {
      redirect: 'kings-and-pigs',
      title: 'Kings And Pigs',
      image: './kings-and-pigs/img/background-menu.gif',
      tags: ['Pixi.js', 'Adventures'],
      description: 'Navigate puzzles, beat riddles, overcome hurdles. Succeed.',
    },
    {
      redirect: 'race-survival',
      title: 'Race Survival',
      image: './race-survival/img/background-menu.jpg',
      tags: ['Pixi.js', 'Race'],
      description:
        'Speed, points, challenge, compete, victory, thrill, and more.',
    },
  ];

  const breadcrumbs = [<Text key={0}>Games</Text>];

  return (
    <>
      <MetaTags />
      <GlobalStyle />
      <Header hide={false} breadcrumbs={breadcrumbs} />
      <HomeStyled>
        <Container>
          <Grid container justifyContent='center' spacing={4}>
            {games.map((game) => (
              <Grid key={game.redirect} item md={4} xs={12}>
                <Link to={game.redirect}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        height='140'
                        image={game.image}
                      />
                      <CardContent>
                        <Text size='xl'>{game.title}</Text>
                        {game.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            color='primary'
                            label={tag}
                            size='small'
                          />
                        ))}
                        <Text size='md'>{game.description}</Text>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </HomeStyled>
      <Footer />
    </>
  );
};

export default Home;
