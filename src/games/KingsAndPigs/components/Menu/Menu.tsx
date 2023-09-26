import { FAIcon, Text } from '@/components';
import {
  BackgroundBlur,
  ButtonPlay,
  Information,
  MenuStyled,
  Screen,
  Title,
} from './Menu.styled';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

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
      {!isGameRunning && <BackgroundBlur />}
      <Screen _active={isGameRunning.toString()}>
        <Title>{title}</Title>
        <ButtonPlay onClick={onStartGame}>
          <FAIcon icon={faCirclePlay} animation='beat' color='primary' />
        </ButtonPlay>
        <Information>
          <Text size='xl'>Controls</Text>
          <br />
          <Text size='md'>
            <span className='underline'>Turn Left:</span> Press A or ArrowLeft
          </Text>
          <Text size='md'>
            <span className='underline'>Turn Right:</span> Press D or ArrowRight
          </Text>
          <Text size='md'>
            <span className='underline'>Speed Up:</span> Press S or ArrowDown
          </Text>
        </Information>
      </Screen>
    </MenuStyled>
  );
};

export default Menu;
