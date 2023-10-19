import { Button } from '@mui/material';
import { styled } from 'styled-components';

export const HeaderStyled = styled.header`
  height: 64px;
  width: 100%;
  top: 0;
  background: ${({ theme }) => theme.palette.elements.header.main};
  border-bottom: 1px solid
    ${({ theme }) => theme.palette.elements.header.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(4px);
  position: fixed;
  z-index: 3;
  button {
    color: ${({ theme }) => theme.palette.white.main};
  }
`;

export const Logo = styled.img`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

export const TitleContainer = styled.div`
  margin: 0 auto;
`;

export const ThemeButton = styled(Button)`
  img {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
`;
