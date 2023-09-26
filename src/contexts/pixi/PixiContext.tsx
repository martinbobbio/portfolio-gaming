import { createContext } from 'react';

import * as PIXI from 'pixi.js';

export const PixiApplicationContext = createContext<PIXI.Application | null>(
  null
);

export const PixiProvider = ({ children }: { children: JSX.Element }) => {
  const app = new PIXI.Application();

  return (
    <PixiApplicationContext.Provider value={app}>
      {children}
    </PixiApplicationContext.Provider>
  );
};
