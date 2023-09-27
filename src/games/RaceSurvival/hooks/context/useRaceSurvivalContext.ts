import { useContext } from 'react';
import { RaceSurvivalContext } from '../../contexts';

/**
 * Hook that facility game contexts calls.
 *
 * @return useRaceSurvivalContext
 */
const useRaceSurvivalContext = () => {
  const { state, dispatch } = useContext(RaceSurvivalContext);
  const { level, points } = state;

  const setLevel = (payload: number) => {
    dispatch({ type: 'SET_LEVEL', payload });
  };

  const setPoints = (payload: number) => {
    dispatch({ type: 'SET_POINTS', payload });
  };

  return { level, points, setLevel, setPoints };
};

export default useRaceSurvivalContext;
