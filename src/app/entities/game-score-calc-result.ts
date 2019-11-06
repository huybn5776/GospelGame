import { GameStatus } from './game-status';

export class GameScoreCalcResult {
  id: number;
  scoreA: number;
  scoreB: number;
  gameStatus: GameStatus;
  details: [];
}
