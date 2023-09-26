import { styled } from 'styled-components';

interface ScoreChangedProps {
  _changed: string;
}

export const ScoreStyled = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.elements.header.main};
  border-bottom: 1px solid
    ${({ theme }) => theme.palette.elements.header.border};
`;

export const Level = styled.div<ScoreChangedProps>`
  transition: color 0.5s ease;
  margin-left: 10px;
  color: ${({ theme, _changed }) =>
    _changed === 'true'
      ? theme.palette.default.background1
      : theme.palette.default.main};
`;

export const Title = styled.div``;

export const Points = styled.div<ScoreChangedProps>`
  margin-right: 10px;
  color: ${({ theme, _changed }) =>
    _changed === 'true'
      ? theme.palette.default.background1
      : theme.palette.default.main};
`;
