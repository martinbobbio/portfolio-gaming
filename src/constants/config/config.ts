import { logoMBDark, logoMBLight } from '@/assets';
import { THEME } from '../theme/theme';

const BRANDING = {
  logo: {
    light: logoMBLight,
    dark: logoMBDark,
  },
};

const SITES = {
  react: 'https://legacy.reactjs.org/',
  vite: 'https://vitejs.dev/',
  githubVersion: 'https://github.com/martinbobbio/portfolio-gaming/tree/',
};

export const CONFIG = {
  branding: BRANDING,
  sites: SITES,
  theme: THEME,
};
