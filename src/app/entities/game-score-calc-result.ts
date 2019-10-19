import { GameStatus } from './game-status';

export class GameScoreCalcResult {
  teamAScore: number;
  teamBScore: number;
  gameStatus: GameStatus;
  details: [];
  timestamp = new Date();
}
