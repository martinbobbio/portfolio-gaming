import { styled } from 'styled-components';

export const AppStyled = styled.div`
  background: ${({ theme }) => theme.palette.default.background1};
  .box {
    background: ${({ theme }) => theme.palette.default.background2};
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    border-radius: 8px;
    padding: 24px;
  }
`;
