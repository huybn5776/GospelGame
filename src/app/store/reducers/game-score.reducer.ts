import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { GameScoreActions } from '../actions';
import { GameScore } from '../../entities/game-score';

export interface GameScoreState extends EntityState<GameScore> {
  scores: GameScore[];
  loaded: boolean;
  loading: boolean;
}

const adapter: EntityAdapter<GameScore> = createEntityAdapter<GameScore>();
export const gameScoreAdapter = adapter;

const initialState: GameScoreState = adapter.getInitialState({
  scores: [],
  loaded: false,
  loading: false,
});

const reducer = createReducer(
  initialState,
  on(GameScoreActions.loadAll, state => ({...state, loading: true})),
  on(GameScoreActions.loadAllSuccess,
    (state, {gameScores}) => ({...adapter.addAll(gameScores, state), loaded: true, loading: false})),
  on(GameScoreActions.cacheLoaded,
    (state, {gameScores}) => ({...adapter.addAll(gameScores, state)})),

  on(GameScoreActions.addScore, (state, {gameScore}) => ({...adapter.addOne(gameScore, state), loading: true})),
  on(
    GameScoreActions.addScoreSuccess,
    GameScoreActions.addScoreFail,
    GameScoreActions.loadFail,
    state => ({...state, loading: false})),
  on(GameScoreActions.updateScore, (state, {gameScore}) => adapter.updateOne(gameScore, state)),
  on(GameScoreActions.removeScore, (state, {id}) => adapter.removeOne(id, state)),
  on(GameScoreActions.removeAllScore, state => adapter.removeAll(state)),
);

export function gameScoreReducer(state: GameScoreState, action: Action) {
  return reducer(state, action);
}
