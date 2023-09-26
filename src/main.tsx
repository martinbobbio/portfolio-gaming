import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import { ThemeWrapper, SWRWrapper } from '@/wrappers';
import GlobalStyles from './GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SWRWrapper>
    <GlobalStyles />
    <ThemeWrapper>
      <Router />
    </ThemeWrapper>
  </SWRWrapper>
);
