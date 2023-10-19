import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import { ThemeWrapper, SWRWrapper } from '@/wrappers';
import GlobalStyles from './GlobalStyles';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SWRWrapper>
    <GlobalStyles />
    <ThemeWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
    </ThemeWrapper>
  </SWRWrapper>
);
