import { GameItemInfo } from '../entities/game-item-info';

export const allGameItems: GameItemInfo[] = [
  {id: 'mushroom', name: '蘑菇', src: 'assets/img/item-mushroom.png'},
  {id: 'golden-mushroom', name: '衝剌蘑菇', src: 'assets/img/item-golden-mushroom.png'},
  {id: 'fake-item-box', name: '假道具', src: 'assets/img/item-fake-item-box.png'},
  {id: 'spiny-shell', name: '飛龜', src: 'assets/img/item-spiny-shell.png'},
  {id: 'star', name: '無敵星', src: 'assets/img/item-star.png'},
];

export const allCoinTypes: GameItemInfo[] = [
  {id: 'coin-50', name: '金幣 50', src: 'assets/img/item-coin.png'},
  {id: 'coin-100', name: '金幣 100', src: 'assets/img/item-coin.png'},
  {id: 'coin-200', name: '金幣 200', src: 'assets/img/item-coin.png'},
];
