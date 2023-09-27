import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { logoMBDark, logoMBLight } from '@/assets';
import { FAIcon } from '@/components';
import {
  TitleContainer,
  HeaderStyled,
  Logo,
  ThemeButton,
} from './Header.styled';
import { Toolbar, Container, Breadcrumbs } from '@mui/material';
import { faChevronRight, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from 'usehooks-ts';
import gsap from 'gsap';

interface HeaderProps {
  breadcrumbs: React.ReactNode[];
  hide: boolean;
}

/**
 * Functional component that render component header.
 *
 * @return React.ReactElement <Header/>
 */
const Header = ({ hide, breadcrumbs }: HeaderProps) => {
  const { toggle, isDarkMode } = useDarkMode();
  const logo = isDarkMode ? logoMBDark : logoMBLight;
  const headerRef = useRef(null);

  const handleShowHeader = () => {
    gsap.to(headerRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleHideHeader = () => {
    if (!hide) return;
    gsap.to(headerRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <HeaderStyled
      ref={headerRef}
      onMouseEnter={handleShowHeader}
      onMouseLeave={handleHideHeader}
    >
      <Container>
        <Toolbar>
          <Link to={'/'}>
            <Logo src={logo} />
          </Link>
          <TitleContainer>
            <Breadcrumbs separator={<FAIcon icon={faChevronRight} />}>
              {breadcrumbs}
            </Breadcrumbs>
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
