import { Text } from '@/components';
import { logoMBDark, logoMBLight } from '@/assets';
import { CONFIG } from '@/constants';
import { version } from '../../../package.json';
import {
  ContentText,
  ExternalLink,
  FooterLogo,
  FooterStyled,
} from './Footer.styled';
import { Grid } from '@mui/material';
import { useDarkMode } from 'usehooks-ts';

/**
 * Functional component that render component footer.
 *
 * @return React.ReactElement <Footer/>
 */
const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const logo = isDarkMode ? logoMBDark : logoMBLight;

  return (
    <FooterStyled>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item xs={12} sm={2}>
          <FooterLogo src={logo} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ContentText>
            <Text fontWeight='medium'>
              Portfolio Gaming{' '}
              <ExternalLink
                target='_blank'
                href={`${CONFIG.sites.githubVersion}${version}`}
                color='inherit'
              >
                v{version}
              </ExternalLink>
            </Text>
            <Text fontWeight='medium'>
              Powered by{' '}
              <ExternalLink
                target='_blank'
                href={CONFIG.sites.react}
                color='inherit'
              >
                React
              </ExternalLink>{' '}
              and{' '}
              <ExternalLink
                target='_blank'
                href={CONFIG.sites.vite}
                color='inherit'
              >
                ViteJS
              </ExternalLink>
            </Text>
            <Text fontWeight='medium'>Developed by Martin Bobbio</Text>
          </ContentText>
        </Grid>
      </Grid>
    </FooterStyled>
  );
};

export default Footer;
