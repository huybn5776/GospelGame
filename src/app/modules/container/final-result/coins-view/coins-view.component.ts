import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AnyObject } from '../../../../interface/model/any';

@Component({
  selector: 'app-coins-view',
  templateUrl: './coins-view.component.html',
  styleUrls: ['./coins-view.component.scss']
})
export class CoinsViewComponent implements OnChanges {

  @Input() coinCount: AnyObject<number>;
  value: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.value = Object.entries(this.coinCount)
      .map(([key, value]) => parseInt(key.split('-')[1], 10) * value)
      .reduce((sum, value) => sum + value, 0);
  }

}
