import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

interface ScreenProps {
  _active: string;
}

export const MenuStyled = styled.div`
  display: inline-block;
  position: relative;
  height: 100vh;
  width: 100%;
`;

export const Screen = styled.div<ScreenProps>`
  position: absolute;
  z-index: 2;
  top: ${({ _active }) => (_active === 'true' ? '100%' : '0%')};
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: url('./race-survival/img/background-menu.jpg');
  background-position: center center;
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  transition: all 1s;
`;

export const Title = styled.h1`
  animation: beat 0.5s infinite alternate;
  font-size: 80px;
  margin: 0 auto;
  background: linear-gradient(
    ${({ theme }) => theme.palette.primary.main},
    ${({ theme }) => theme.palette.primary.main}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(5px 5px #fff);
  @media (max-width: ${BREAKPOINTS.small}) {
    font-size: 40px;
  }
`;

export const ButtonPlay = styled.div`
  .icon svg {
    cursor: pointer;
    width: 96px;
    height: 96px;
    margin-top: 24px;
    background: linear-gradient(
      ${({ theme }) => theme.palette.primary.main},
      ${({ theme }) => theme.palette.primary.main}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(5px 5px #fff);
    &:active {
      filter: drop-shadow(0px 0px #fff);
    }
    @media (max-width: ${BREAKPOINTS.small}) {
      width: 48px;
      height: 48px;
    }
  }
`;

export const Information = styled.div`
  width: 75%;
  background: red;
  margin: 32px auto 0;
  border-radius: 8px;
  text-align: left;
  padding: 32px;
  background: ${({ theme }) => theme.palette.elements.header.main};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  .underline {
    text-decoration: underline;
  }
`;
