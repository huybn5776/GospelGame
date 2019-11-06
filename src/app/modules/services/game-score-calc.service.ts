import { Injectable } from '@angular/core';

import { GameScoreCalcResult } from '../../entities/game-score-calc-result';
import { GameStatus } from '../../entities/game-status';

@Injectable({
  providedIn: 'root'
})
export class GameScoreCalcService {

  public calcScore(gameStatus: GameStatus): GameScoreCalcResult {
    const calcResult = new GameScoreCalcResult();
    let teamAScore = 0;
    let teamBScore = 0;

    teamAScore += this.getWinLossScore(gameStatus, 'a');
    teamBScore += this.getWinLossScore(gameStatus, 'b');
    teamAScore *= this.applyGameItem(gameStatus, 'a');
    teamBScore *= this.applyGameItem(gameStatus, 'b');
    teamAScore += this.addNewcomerAddition(gameStatus, 'a');
    teamBScore += this.addNewcomerAddition(gameStatus, 'b');

    calcResult.scoreA = teamAScore;
    calcResult.scoreB = teamBScore;
    calcResult.gameStatus = gameStatus;
    return calcResult;
  }

  private getWinLossScore(gameStatus: GameStatus, team: 'a' | 'b'): number {
    let config;
    if (gameStatus.playerCount === 2) {
      config = {
        winner: gameStatus.winner,
        winScore: 200, lossScore: 100, deuceScore: 100,
      };
    }
    if (gameStatus.playerCount === 4) {
      config = {
        winner: gameStatus.winner,
        winScore: 400, lossScore: 200, deuceScore: 300,
      };
    }
    return (team === gameStatus.winner ? config.winScore : 0) +
      (team !== gameStatus.winner && gameStatus.winner !== 'deuce' ? config.lossScore : 0) +
      (gameStatus.winner === 'deuce' ? config.deuceScore : 0);
  }

  private applyGameItem(gameStatus: GameStatus, team: 'a' | 'b'): number {
    const selfItems = team === 'a' ? gameStatus.itemsA : gameStatus.itemsB;
    const opponentItem = team === 'a' ? gameStatus.itemsB : gameStatus.itemsA;

    let multiply2 = selfItems['mushroom'] || 0;
    let multiply3 = selfItems['golden-mushroom'] || 0;
    const invalidateItem = Math.max(0,
      (selfItems['fake-item-box'] || 0) +
      (opponentItem['spiny-shell'] || 0) +
      (-selfItems['star'] || 0)
    );
    for (let i = 0; i < invalidateItem; i++) {
      if (multiply3) {
        multiply3--;
      } else if (multiply2) {
        multiply2--;
      }
    }

    let multiplyNumber = 1;
    multiplyNumber += multiply2 * 2;
    multiplyNumber += multiply3 * 3;

    return multiplyNumber;
  }

  private addNewcomerAddition(gameStatus: GameStatus, team: 'a' | 'b'): number {
    const coins = {'a': gameStatus.coinsA, 'b': gameStatus.coinsB}[team];
    const coin50 = coins['coin-50'] || 0;
    const coin100 = coins['coin-100'] || 0;
    const coin200 = coins['coin-200'] || 0;
    return (coin50 * 50) + (coin100 * 100) + (coin200 * 200);
  }

}
