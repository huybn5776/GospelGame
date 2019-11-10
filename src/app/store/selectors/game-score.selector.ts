import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RootState } from '../reducers';
import { GameScoreState, gameScoreAdapter } from '../reducers/game-score.reducer';
import { GameScore } from '../../entities/game-score';

export const selectGameScoreState = createFeatureSelector<RootState, GameScoreState>(
  'gameScore'
);

export const {
  selectAll: selectAllGameScores,
  selectTotal: selectTotalGameScores,
} = gameScoreAdapter.getSelectors(selectGameScoreState);

export const selectScoreSum = createSelector(
  selectAllGameScores,
  (gameScores: GameScore[]) =>
    gameScores.reduce((total, gameScore) => {
        total.scoreA += gameScore.scoreA;
        total.scoreB += gameScore.scoreB;
        return total;
      }, {scoreA: 0, scoreB: 0}
    ),
);

export const selectScoreLoading = createSelector(
  selectGameScoreState,
  (state: GameScoreState) => state.loading,
);
export const selectNextInning = createSelector(
  selectAllGameScores,
  selectTotalGameScores,
  (gameScores: GameScore[], total) => gameScores[total - 1].inning + 1,
);
