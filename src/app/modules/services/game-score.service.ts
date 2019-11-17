import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import * as R from 'ramda';

import { ApiService } from '../../services/api.service';
import { SERVER_URLS } from '../../constants/constants';
import { AnyObject } from '../../interface/model/any';
import { allCoinTypes, allGameItems } from '../../constants/all-game-items';
import { GameScorePost } from '../../interface/post-model/game-score-post';
import { GameItemInfo } from '../../entities/game-item-info';
import { GameScoreApiModel } from '../../interface/model/game-score-api-model';
import { GameScore } from '../../entities/game-score';

@Injectable({
  providedIn: 'root'
})
export class GameScoreService {

  readonly gameItemLookup: AnyObject<GameItemInfo>;
  readonly apiUrl = SERVER_URLS.scoreApi;
  // Bypass http-options preflight for Google app script server
  readonly postOption = {headers: {'Content-Type': 'text/plain'}};

  constructor(
    private readonly apiService: ApiService,
  ) {
    this.gameItemLookup = R.indexBy(R.prop('id'), [...allGameItems, ...allCoinTypes]);
  }

  getScores(): Observable<GameScore[]> {
    return this.apiService.get<GameScoreApiModel[]>(this.apiUrl)
      .pipe(map(scores => scores.map(source => this.convertScore(source))));
  }

  postScore(gameScore: GameScore): Observable<GameScore> {
    const postModel = this.toPostModel(gameScore);

    return this.apiService.post<GameScoreApiModel, GameScorePost>(this.apiUrl, postModel, this.postOption)
      .pipe(map(data => this.convertScore(data)));
  }

  update(gameScore: Partial<GameScore>): Observable<GameScore> {
    const postModel = this.toPostModel(gameScore);
    return this.apiService.post <GameScoreApiModel, GameScorePost>(this.apiUrl, {...postModel},
      {...this.postOption, params: {method: 'patch'}})
      .pipe(map(data => this.convertScore(data)));
  }

  remove(id: number): Observable<any> {
    return this.apiService.post<{ ok: boolean, code: number }, { id: number }>(this.apiUrl, {id},
      {...this.postOption, params: {method: 'delete'}})
      .pipe(tap(result => {
        if (result.ok === false) {
          throw result;
        }
      }));
  }

  private toPostModel(gameScore: GameScore  | Partial<GameScore>) {
    const postModel = new GameScorePost();

    postModel.id = gameScore.id;
    postModel.theory = {'2': '2人賽', '4': '4人賽'}[gameScore.playerCount];
    postModel.result = {'a': 'A隊贏', 'b': 'B隊贏', 'deuce': '平手'}[gameScore.winner];
    postModel.itemsA = this.convertItems(gameScore.itemsA);
    postModel.itemsB = this.convertItems(gameScore.itemsB);
    postModel.newFriendA = this.convertItems(gameScore.coinsA);
    postModel.newFriendB = this.convertItems(gameScore.coinsB);
    postModel.scoreA = gameScore.scoreA;
    postModel.scoreB = gameScore.scoreB;
    postModel.time = gameScore.time;
    return postModel;
  }

  private convertScore(score: GameScoreApiModel): GameScore {
    const gameScore = new GameScore();

    gameScore.id = score.id;
    gameScore.inning = score.inning;
    gameScore.scoreA = score.scoreA;
    gameScore.scoreB = score.scoreB;
    gameScore.time = new Date(score.time);

    gameScore.playerCount = parseInt(score.theory, 10) === 2 ? 2 : 4;
    const winner = score.result.toLowerCase();
    gameScore.winner = winner.includes('a') ? 'a' :
      winner.includes('b') ? 'b' : 'deuce';

    gameScore.itemsA = this.parseItems(score.itemsA);
    gameScore.coinsA = this.parseItems(score.newFriendA);
    gameScore.itemsB = this.parseItems(score.itemsB);
    gameScore.coinsB = this.parseItems(score.newFriendB);

    return gameScore;
  }

  private parseItems(itemString: string): AnyObject<number> {
    return itemString.split('|')
      .map(itemWithScore => {
        const splits = itemWithScore.split('×');
        const itemName = splits[0].trim();
        const itemCount = parseInt(splits[1], 10) || 1;
        const orgItem = [...allGameItems, ...allCoinTypes]
          .find(item => item.name === itemName);
        return {itemId: n(orgItem).id, count: itemCount};
      })
      .filter(itemAndCount => itemAndCount.itemId && itemAndCount.count)
      .reduce((acc, itemAndCount) => {
        acc[itemAndCount.itemId] = itemAndCount.count;
        return acc;
      }, {} as AnyObject<number>);
  }

  private convertItems(gameItems: AnyObject<number>): string {
    return Object.entries(gameItems)
      .filter(([_, count]) => count)
      .map(([itemId, count]) => `${this.gameItemLookup[itemId].name}×${count}`)
      .join(' | ');
  }

}
