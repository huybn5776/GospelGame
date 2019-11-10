import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { LocalStorageService } from '../../../services/local-storage.service';
import { GameScore } from '../../../entities/game-score';
import { RootState } from '../../../store/reducers';
import { GameScoreActions } from '../../../store/actions';
import { fromGameScore } from '../../../store/selectors';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {

  displayedColumns: string[] = ['inning', 'time', 'playerCount', 'winner', 'itemsA', 'itemsB', 'coins', 'scores'];

  gameScores$: Observable<GameScore[]>;
  gameScoresLoading$: Observable<boolean>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly store: Store<RootState>,
  ) {
    this.gameScores$ = this.store.select(fromGameScore.selectAllGameScores);
    this.gameScoresLoading$ = this.store.select(fromGameScore.selectScoreLoading);
  }

  ngOnInit() {
    this.store.dispatch(GameScoreActions.loadAll());
  }

  asScore(gameScore): GameScore {
    return gameScore;
  }
}
