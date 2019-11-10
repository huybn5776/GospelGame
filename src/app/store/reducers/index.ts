import { LayoutState, layoutReducer } from './layout.reducer';
import { GameScoreState, gameScoreReducer } from './game-score.reducer';

export interface RootState {
  layout: LayoutState;
  gameScore: GameScoreState;
}

export const rootReducers = {
  layout: layoutReducer,
  gameScore: gameScoreReducer,
};
