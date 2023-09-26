import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, PixiGame } from '@/views';
import { RaceSurvival } from '@/games';
import App from '@/App';

/**
 * Functional component that render the router and wrap the application.
 *
 * @return React.ReactElement <Router/>
 */
const Router = () => {
  /**
   * Functional component that wrap the views and add logics.
   *
   */
  const wrapApplication = (view: React.ReactNode) => {
    return <App>{view}</App>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'home'} element={wrapApplication(<Home />)} />
        <Route
          path={'race-survival'}
          element={wrapApplication(<PixiGame game={<RaceSurvival />} />)}
        />
        <Route path={'*'} element={wrapApplication(<Home />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
