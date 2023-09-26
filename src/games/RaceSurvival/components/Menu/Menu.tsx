import { FAIcon, Text } from '@/components';
import {
  ButtonPlay,
  Information,
  MenuStyled,
  Screen,
  Title,
} from './Menu.styled';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';

interface MenuProps {
  onStartGame: () => void;
  title: string;
  isGameRunning: boolean;
}

/**
 * Functional component that render component menu.
 *
 * @return React.ReactElement <Menu/>
 */
const Menu = ({ onStartGame, title, isGameRunning }: MenuProps) => {
  return (
    <MenuStyled>
      <Screen _active={isGameRunning.toString()}>
        <Title>{title}</Title>
        <ButtonPlay onClick={onStartGame}>
          <FAIcon icon={faCirclePlay} animation='beat' color='primary' />
        </ButtonPlay>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Information>
              <Text size='xl'>Controls</Text>
              <br />
              <Text size='md'>
                <span className='underline'>Turn Left:</span> Press A or
                ArrowLeft
              </Text>
              <Text size='md'>
                <span className='underline'>Turn Right:</span> Press D or
                ArrowRight
              </Text>
              <Text size='md'>
                <span className='underline'>Speed Up:</span> Press S or
                ArrowDown
              </Text>
            </Information>
          </Grid>
          <Grid item xs={12} md={6}>
            <Information>
              <Text size='xl'>Highscores</Text>
              <br />
              <Text size='md'>
                <span className='underline'>1# Martin:</span> 3020 points
              </Text>
              <Text size='md'>
                <span className='underline'>2# Juan:</span> 2430 points
              </Text>
              <Text size='md'>
                <span className='underline'>3# Martin:</span> 1715 points
              </Text>
            </Information>
          </Grid>
        </Grid>
      </Screen>
    </MenuStyled>
  );
};

export default Menu;
