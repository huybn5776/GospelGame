import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { GameScore } from '../../entities/game-score';

export const loadAll = createAction('[GameScore] Load all scores');
export const cacheLoaded = createAction('[GameScore] Cache data loaded', props<{ gameScores: GameScore[] }>());
export const loadAllSuccess = createAction('[GameScore] Load all scores success', props<{ gameScores: GameScore[] }>());
export const loadFail = createAction('[GameScore] Load scores fail', props<{ errorMsg: string }>());

export const addScore = createAction('[GameScore] Add score', props<{ gameScore: GameScore }>());
export const addScoreSuccess = createAction('[GameScore] Add success');
export const addScoreFail = createAction('[GameScore] Add fail', props<{ errorMsg: string }>());

export const updateScore = createAction('[GameScore] Update score', props<{ gameScore: Update<GameScore> }>());
export const removeScore = createAction('[GameScore] Remove score', props<{ id: number }>());
export const removeAllScore = createAction('[GameScore] Remove all score');

