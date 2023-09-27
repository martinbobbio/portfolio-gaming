export interface RaceSurvivalState {
  level: number;
  points: number;
}

export type Action =
  | { type: 'SET_LEVEL'; payload: number }
  | { type: 'SET_POINTS'; payload: number };

export const initialRaceSurvivalState: RaceSurvivalState = {
  level: 1,
  points: 0,
};
