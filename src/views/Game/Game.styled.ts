import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

interface IframeProps {
  $loaded: boolean;
}

export const GameStyled = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh);

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

export const Iframe = styled.iframe<IframeProps>`
  position: absolute;
  border: none;
  width: 100%;
  height: 100%;
  display: ${({ $loaded }) => ($loaded ? 'block' : 'none')};
`;
