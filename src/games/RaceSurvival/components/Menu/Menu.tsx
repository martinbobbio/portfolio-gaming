import { FAIcon } from '@/components';
import { ButtonPlay, MenuStyled, Screen, Title } from './Menu.styled';
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
      <Screen _active={isGameRunning.toString()}>
        <Title>{title}</Title>
        <ButtonPlay onClick={onStartGame}>
          <FAIcon icon={faCirclePlay} animation='beat' color='primary' />
        </ButtonPlay>
      </Screen>
    </MenuStyled>
  );
};

export default Menu;
