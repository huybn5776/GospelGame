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

    teamAScore += gameStatus.teamANewcomerAddition;
    teamBScore += gameStatus.teamBNewcomerAddition;

    calcResult.teamAScore = teamAScore;
    calcResult.teamBScore = teamBScore;
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
    const selfItems = team === 'a' ? gameStatus.teamAItems : gameStatus.teamBItems;
    const opponentItem = team === 'a' ? gameStatus.teamBItems : gameStatus.teamAItems;

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

    return Math.pow(2, multiply2) * Math.pow(3, multiply3);
  }

}
