import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FAIcon } from '@/components';
import { CONFIG } from '@/constants';
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
  const {
    branding: { logo },
  } = CONFIG;
  const brandLogo = isDarkMode ? logo.dark : logo.light;
  const headerRef = useRef(null);

  const handleShowHeader = useCallback((duration: number) => {
    gsap.to(headerRef.current, { opacity: 1, duration });
  }, []);

  const handleHideHeader = useCallback(
    (duration: number) => {
      if (!hide) return;
      gsap.to(headerRef.current, { opacity: 0, duration });
    },
    [hide]
  );

  useEffect(() => {
    if (hide) handleHideHeader(1);
  }, [handleHideHeader, hide]);

  return (
    <HeaderStyled
      ref={headerRef}
      onMouseEnter={() => handleShowHeader(0.3)}
      onMouseLeave={() => handleHideHeader(0.3)}
    >
      <Container>
        <Toolbar>
          <Link to={'/'}>
            <Logo src={brandLogo} />
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
