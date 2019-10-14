import { Component, OnInit } from '@angular/core';

import { GameItemInfo } from '../../../entities/game-item-info';

@Component({
  selector: 'app-input-score',
  templateUrl: './input-score.component.html',
  styleUrls: ['./input-score.component.scss']
})
export class InputScoreComponent implements OnInit {

  gameItems: GameItemInfo[] = [
    {id: 'mushroom', name: '蘑菇', src: 'assets/img/item-mushroom.png'},
    {id: 'golden-mushroom', name: '衝剌蘑菇', src: 'assets/img/item-golden-mushroom.png'},
    {id: 'fake-item-box', name: '假道具', src: 'assets/img/item-fake-item-box.png'},
    {id: 'spiny-shell', name: '飛龜', src: 'assets/img/item-spiny-shell.png'},
    {id: 'star', name: '無敵星', src: 'assets/img/item-star.png'},
  ];
  maxItemCount = 3;

  constructor() { }

  ngOnInit() {
  }

}
