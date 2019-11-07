import { AnyObject } from '../interface/model/any';

export class GameScore {
  id: number;
  scoreA: number;
  scoreB: number;
  playerCount?: 2 | 4;
  winner?: 'a' | 'b' | 'deuce';
  itemsA: AnyObject<number>;
  coinsA: AnyObject<number>;
  itemsB: AnyObject<number>;
  coinsB: AnyObject<number>;
}
