export interface GameScoreApiModel {
  id: number;
  inning: number;
  theory: string;
  result: string;
  newFriendA: string;
  newFriendB: string;
  itemsA: string;
  itemsB: string;
  scoreA: number;
  scoreB: number;
  time: Date;
}
