import { Reducer } from 'react';
import { Action, GameState } from './GameState';

export const gameReducer: Reducer<GameState, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_LEVEL':
      return {
        ...state,
        level: action.payload,
      };
    case 'SET_POINTS':
      return {
        ...state,
        points: action.payload,
      };
    default:
      return state;
  }
};
