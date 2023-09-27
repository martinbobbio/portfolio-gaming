import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

export const PixiGameStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh);
  &.race-survival,
  &.race-survival p {
    font-family: 'Kavoon', cursive;
  }
  &.kings-and-pigs,
  &.kings-and-pigs p {
    font-family: 'Skranji', sans-serif;
  }

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 0;
  }
`;
