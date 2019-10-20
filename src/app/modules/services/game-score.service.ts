import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';

import * as R from 'ramda';

import { ApiService } from '../../services/api.service';
import { GameScoreCalcResult } from '../../entities/game-score-calc-result';
import { GameScorePost } from '../../interface/post-model/game-score-post';
import { AnyObject } from '../../interface/model/any';
import { GameItemInfo } from '../../entities/game-item-info';
import { allCoinTypes, allGameItems } from '../../constants/all-game-items';
import { LocalStorageService } from '../../services/local-storage.service';
import { GAME_SCORE_RESULTS } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class GameScoreService {

  readonly gameItemLookup: AnyObject<GameItemInfo>;

  constructor(
    private readonly apiService: ApiService,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.gameItemLookup = R.indexBy(R.prop('id'), [...allGameItems, ...allCoinTypes]);
  }

  saveScore(gameScore: GameScoreCalcResult): Observable<void> {
    return merge(this.saveToLocal(gameScore), this.postScore(gameScore));
  }

  clearScores() {
    this.localStorageService.remove(GAME_SCORE_RESULTS);
  }

  private saveToLocal(gameScore: GameScoreCalcResult): Observable<void> {
    this.localStorageService.update<GameScoreCalcResult[]>(
      GAME_SCORE_RESULTS,
      gameScoreResults => {
        const scores = (gameScoreResults || []);
        scores.push(gameScore);
        return scores;
      }
    );
    return of(null);
  }

  private postScore(gameScore: GameScoreCalcResult): Observable<void> {
    const postModel = new GameScorePost();
    const gameStatus = gameScore.gameStatus;

    postModel.theory = {'2': '2人賽', '4': '4人賽'}[gameStatus.playerCount];
    postModel.result = {'a': 'A隊贏', 'b': 'B隊贏', 'deuce': '平手'}[gameStatus.winner];
    postModel.propA = this.convertItems(gameStatus.teamAItems);
    postModel.propB = this.convertItems(gameStatus.teamBItems);
    postModel.newFriendA = this.convertItems(gameStatus.teamACoins);
    postModel.newFriendB = this.convertItems(gameStatus.teamBCoins);
    postModel.fractionA = gameScore.teamAScore;
    postModel.fractionB = gameScore.teamBScore;

    return this.apiService.post('http://changelifesys.org/Tool/1116.aspx', postModel);
  }

  private convertItems(gameItems: AnyObject<number>): string {
    return Object.entries(gameItems)
      .filter(([_, count]) => count)
      .map(([itemId, count]) => `${this.gameItemLookup[itemId].name}×${count}`)
      .join(' | ');
  }

}
