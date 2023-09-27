import { styled } from 'styled-components';

export const HomeStyled = styled.div`
  padding: 96px 0 0 0;
  min-height: calc(100vh - 134px);
  .MuiCard-root {
    background: ${({ theme }) => theme.palette.default.background2};
    box-shadow: ${({ theme }) => theme.boxShadow.high};
  }
  .MuiChip-root {
    margin: 16px 8px;
  }
  img {
    filter: blur(2px);
    min-height: 200px;
  }
`;
