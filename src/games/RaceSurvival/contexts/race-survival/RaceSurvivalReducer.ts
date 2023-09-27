import { Reducer } from 'react';
import { Action, RaceSurvivalState } from './RaceSurvivalState';

export const raceSurvivalReducer: Reducer<RaceSurvivalState, Action> = (
  state,
  action
) => {
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
