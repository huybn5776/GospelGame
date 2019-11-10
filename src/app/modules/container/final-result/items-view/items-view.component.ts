import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as R from 'ramda';

import { AnyObject } from '../../../../interface/model/any';
import { allGameItems } from '../../../../constants/all-game-items';
import { GameItemInfo } from '../../../../entities/game-item-info';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss']
})
export class ItemsViewComponent implements OnChanges {
  @Input() itemCount: AnyObject<number>;

  itemIndex: AnyObject<GameItemInfo>;
  items: GameItemInfo[];

  constructor() {
    this.itemIndex = allGameItems
      .reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
  }

  ngOnChanges(changes: SimpleChanges) {
    this.items = [];

    Object.entries(this.itemCount || []).forEach(([key, value]) => {
      const item = this.itemIndex[key];
      let count = value;
      while (count--) {
        this.items.push(item);
      }
    });

    this.items = R.sortBy(item => item.seq, this.items);
  }

}
