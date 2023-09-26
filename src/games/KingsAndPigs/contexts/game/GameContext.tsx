import { createContext, Dispatch, useReducer } from 'react';
import { Action, GameState, initialGameState } from './GameState';
import { gameReducer } from './GameReducer';

interface GameContextType {
  state: GameState;
  dispatch: Dispatch<Action>;
}

export const GameContext = createContext<GameContextType>({
  state: initialGameState,
  dispatch: () => true,
});

export const GameProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const contextValue: GameContextType = {
    state,
    dispatch,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
