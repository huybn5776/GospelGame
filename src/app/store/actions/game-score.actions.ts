import { createAction, props } from '@ngrx/store';
import { UpdateNum } from '@ngrx/entity/src/models';

import { GameScore } from '../../entities/game-score';

export const loadAll = createAction('[GameScore] Load all scores');
export const cacheLoaded = createAction('[GameScore] Cache data loaded', props<{ gameScores: GameScore[] }>());
export const loadAllSuccess = createAction('[GameScore] Load all scores success', props<{ gameScores: GameScore[] }>());
export const loadFail = createAction('[GameScore] Load scores fail', props<{ errorMsg: string }>());

export const addScore = createAction('[GameScore] Add score', props<{ gameScore: GameScore }>());
export const addScoreSuccess = createAction('[GameScore] Add success');
export const addScoreFail = createAction('[GameScore] Add fail', props<{ errorMsg: string }>());

export const updateOne = createAction('[GameScore] Update one score', props<{ gameScore: UpdateNum<GameScore> }>());
export const updateOneSuccess = createAction('[GameScore] Update one success');
export const updateOneFail = createAction('[GameScore] Update one fail', props<{ errorMsg: string }>());

export const removeOne = createAction('[GameScore] Remove one', props<{ id: number }>());
export const removeOneSuccess = createAction('[GameScore] Remove one success');
export const removeOneFail = createAction('[GameScore] Delete one fail', props<{ errorMsg: string }>());
export const removeAllScore = createAction('[GameScore] Remove all score');

