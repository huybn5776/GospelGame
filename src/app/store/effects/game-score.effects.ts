import { Injectable } from '@angular/core';
import { catchError, exhaustMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { GameScoreActions } from '../actions';
import { RootState } from '../reducers';
import { GameScore } from '../../entities/game-score';
import { GAME_SCORE_CACHE } from '../../constants/constants';
import { onEffectError } from '../../utils/ngrx';
import { GameScoreService } from '../../modules/services/game-score.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable()
export class GameScoreEffects {

  // noinspection JSUnusedGlobalSymbols
  loadAll = createEffect(() =>
    this.actions$.pipe(
      ofType(GameScoreActions.loadAll),
      exhaustMap(() =>
        this.gameScoreService.getScores().pipe(
          map(gameScores => GameScoreActions.loadAllSuccess({gameScores})),
          catchError(err => of(GameScoreActions.loadFail({errorMsg: err.message}))),
        )
      ),
    ));

  // noinspection JSUnusedGlobalSymbols
  loadCache$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameScoreActions.loadAll),
      take(1),
      map(() => this.localStorageService.get<GameScore[]>(GAME_SCORE_CACHE)),
      filter(gameScoresCache => !!gameScoresCache),
      map(gameScoresCache => GameScoreActions.cacheLoaded({gameScores: gameScoresCache})),
    ));

  // noinspection JSUnusedGlobalSymbols
  saveToCacheWhenLoadSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameScoreActions.loadAllSuccess),
      tap(({gameScores}) => this.localStorageService.set(GAME_SCORE_CACHE, gameScores)),
    ), {dispatch: false});

  // noinspection JSUnusedGlobalSymbols
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameScoreActions.addScore),
      switchMap(({gameScore}) => {
        return this.gameScoreService.postScore(gameScore).pipe(
          tap(gameScoreFromServer => {
            const update = ({gameScore: {id: gameScore.id, changes: gameScoreFromServer}});
            this.store.dispatch(GameScoreActions.updateOne(update));
          })
        );
      }),
      map(() => GameScoreActions.addScoreSuccess()),
      catchError(err => onEffectError(err, GameScoreActions.addScoreFail)),
    ));

  // noinspection JSUnusedGlobalSymbols
  removeOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameScoreActions.removeOne),
      switchMap(({id}) => this.gameScoreService.remove(id)),
      map(() => GameScoreActions.removeOneSuccess()),
      catchError(err => onEffectError(err, GameScoreActions.removeOneFail)),
    ));

  // noinspection JSUnusedGlobalSymbols
  updateOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameScoreActions.updateOne),
      switchMap(({gameScore}) => this.gameScoreService.update(gameScore.changes)),
      map(() => GameScoreActions.updateOneSuccess()),
      catchError(err => onEffectError(err, GameScoreActions.updateOneFail)),
    ));

  constructor(
    private readonly store: Store<RootState>,
    private readonly actions$: Actions,
    private readonly gameScoreService: GameScoreService,
    private readonly localStorageService: LocalStorageService,
  ) { }

}
