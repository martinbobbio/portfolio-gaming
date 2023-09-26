import { useContext } from 'react';
import { GameContext } from '../../contexts';

/**
 * Hook that facility game contexts calls.
 *
 * @return useGameContext
 */
const useGameContext = () => {
  const { state, dispatch } = useContext(GameContext);
  const { level, points } = state;

  const setLevel = (payload: number) => {
    dispatch({ type: 'SET_LEVEL', payload });
  };

  const setPoints = (payload: number) => {
    dispatch({ type: 'SET_POINTS', payload });
  };

  return { level, points, setLevel, setPoints };
};

export default useGameContext;
