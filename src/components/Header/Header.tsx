import { Link } from 'react-router-dom';
import { logoMBDark, logoMBLight } from '@/assets';
import { FAIcon, Text } from '@/components';
import {
  TitleContainer,
  HeaderStyled,
  Logo,
  ThemeButton,
} from './Header.styled';
import { Toolbar, Container } from '@mui/material';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from 'usehooks-ts';

interface HeaderProps {
  title?: string;
}

/**
 * Functional component that render component header.
 *
 * @return React.ReactElement <Header/>
 */
const Header = ({ title }: HeaderProps) => {
  const { toggle, isDarkMode } = useDarkMode();
  const logo = isDarkMode ? logoMBDark : logoMBLight;

  return (
    <HeaderStyled>
      <Container>
        <Toolbar>
          <Link to={'/'}>
            <Logo src={logo} />
          </Link>
          <TitleContainer>
            <Text>{title}</Text>
          </TitleContainer>
          <ThemeButton onClick={() => toggle()}>
            <FAIcon icon={faLightbulb} />
          </ThemeButton>
        </Toolbar>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
