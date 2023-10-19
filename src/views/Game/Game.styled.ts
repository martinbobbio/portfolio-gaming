import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

export const GameStyled = styled.main`
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
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;
