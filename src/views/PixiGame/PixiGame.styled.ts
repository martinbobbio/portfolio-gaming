import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

export const PixiGameStyled = styled.div`
  padding: 64px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh);
  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 0;
  }
`;
