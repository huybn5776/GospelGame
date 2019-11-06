import { AnyObject } from '../interface/model/any';

export class GameStatus {
  playerCount?: 2 | 4;
  winner?: 'a' | 'b' | 'deuce';
  itemsA: AnyObject<number>;
  coinsA: AnyObject<number>;
  itemsB: AnyObject<number>;
  coinsB: AnyObject<number>;
}
