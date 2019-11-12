import { GameItemInfo } from '../entities/game-item-info';

export const allGameItems: GameItemInfo[] = [
  {id: 'mushroom', name: '蘑菇', src: 'assets/img/item-mushroom.png', seq: 1, desc: '分數加乘 + 2'},
  {id: 'golden-mushroom', name: '衝剌蘑菇', src: 'assets/img/item-golden-mushroom.png', seq: 2, desc: '分數加乘 + 3'},
  {id: 'fake-item-box', name: '假道具', src: 'assets/img/item-fake-item-box.png', seq: 3, desc: '自己隊的一個蘑菇無效，衝剌蘑菇優先無效'},
  {id: 'spiny-shell', name: '飛龜', src: 'assets/img/item-spiny-shell.png', seq: 4, desc: '別隊的一個蘑菇無效，衝剌蘑菇優先無效'},
  {id: 'star', name: '無敵星', src: 'assets/img/item-star.png', seq: 5, desc: '扺消自已隊的假道具，或別隊的飛龜'},
];

export const allCoinTypes: GameItemInfo[] = [
  {id: 'coin-50', name: '金幣 50', src: 'assets/img/item-coin.png', seq: 1},
  {id: 'coin-100', name: '金幣 100', src: 'assets/img/item-coin.png', seq: 2},
  {id: 'coin-200', name: '金幣 200', src: 'assets/img/item-coin.png', seq: 3},
];
