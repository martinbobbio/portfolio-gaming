import { BREAKPOINTS } from '@/constants';
import { Link } from '@mui/material';
import { styled } from 'styled-components';

export const FooterStyled = styled.footer`
  padding: 32px;
  width: 100%;
  font-weight: 500;
  background: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: ${BREAKPOINTS.small}) {
    display: none;
  }
`;

export const FooterLogo = styled.img`
  height: 64px;
  width: 64px;
`;

export const ContentText = styled.div`
  text-align: left;
  @media (max-width: ${BREAKPOINTS.small}) {
    text-align: center;
  }
`;

export const ExternalLink = styled(Link)`
  cursor: pointer;
`;
