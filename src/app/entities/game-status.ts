import { AnyObject } from '../interface/model/any';

export class GameStatus {
  playerCount?: 2 | 4;
  winner?: 'a' | 'b' | 'deuce';
  teamANewcomerAddition = 0;
  teamAItems: AnyObject<number>;
  teamBNewcomerAddition = 0;
  teamBItems: AnyObject<number>;
}
