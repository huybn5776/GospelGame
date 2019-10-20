import { AnyObject } from '../interface/model/any';

export class GameStatus {
  playerCount?: 2 | 4;
  winner?: 'a' | 'b' | 'deuce';
  teamAItems: AnyObject<number>;
  teamACoins: AnyObject<number>;
  teamBItems: AnyObject<number>;
  teamBCoins: AnyObject<number>;
}
