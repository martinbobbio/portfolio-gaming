import { createContext, Dispatch, useReducer } from 'react';
import {
  Action,
  RaceSurvivalState,
  initialRaceSurvivalState,
} from './RaceSurvivalState';
import { raceSurvivalReducer } from './RaceSurvivalReducer';

interface RaceSurvivalContextType {
  state: RaceSurvivalState;
  dispatch: Dispatch<Action>;
}

export const RaceSurvivalContext = createContext<RaceSurvivalContextType>({
  state: initialRaceSurvivalState,
  dispatch: () => true,
});

export const RaceSurvivalProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(
    raceSurvivalReducer,
    initialRaceSurvivalState
  );

  const contextValue: RaceSurvivalContextType = {
    state,
    dispatch,
  };

  return (
    <RaceSurvivalContext.Provider value={contextValue}>
      {children}
    </RaceSurvivalContext.Provider>
  );
};
