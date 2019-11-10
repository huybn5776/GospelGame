import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { RootState } from '../../../../store/reducers';
import { fromGameScore } from '../../../../store/selectors';
import { GameScoreActions } from '../../../../store/actions';

@Component({
  selector: 'app-total-score-panel',
  templateUrl: './total-score-panel.component.html',
  styleUrls: ['./total-score-panel.component.scss']
})
export class TotalScorePanelComponent implements OnInit {

  totalScore$: Observable<{ scoreA: number, scoreB: number }>;

  constructor(
    private readonly store: Store<RootState>,
  ) {
    this.totalScore$ = this.store.select(fromGameScore.selectScoreSum);
  }

  ngOnInit() {
    this.store.dispatch(GameScoreActions.loadAll());
  }

}
