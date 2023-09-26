import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

export const ControlsStyled = styled.div`
  position: absolute;
  height: 200px;
  width: 100%;
  display: none;
  bottom: 0;
  @media (max-width: ${BREAKPOINTS.small}) {
    display: inline;
  }
`;

export const ButtonControl = styled.div`
  position: absolute;
  padding: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.elements.header.main};
  &.left {
    bottom: 0px;
    left: 0px;
  }
  &.right {
    bottom: 0px;
    right: 0px;
  }
  &.down-right {
    bottom: 78px;
    right: 0;
  }
  &.down-left {
    bottom: 78px;
    left: 0;
  }
`;
