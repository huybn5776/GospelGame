import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { GameItemInfo } from '../../../../entities/game-item-info';

@Component({
  selector: 'app-game-item-select',
  templateUrl: './game-item-select.component.html',
  styleUrls: ['./game-item-select.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => GameItemSelectComponent)}],
})
export class GameItemSelectComponent implements ControlValueAccessor {

  @Input() ngModel = {};
  @Input() maxItemCount = 0;
  @Output() ngModelChange = new EventEmitter<{}>();

  onChange: (value) => void;

  gameItems: GameItemInfo[] = [
    {id: 'mushroom', name: '蘑菇', src: 'assets/img/item-mushroom.png'},
    {id: 'golden-mushroom', name: '衝剌蘑菇', src: 'assets/img/item-golden-mushroom.png'},
    {id: 'fake-item-box', name: '假道具', src: 'assets/img/item-fake-item-box.png'},
    {id: 'spiny-shell', name: '飛龜', src: 'assets/img/item-spiny-shell.png'},
    {id: 'star', name: '無敵星', src: 'assets/img/item-star.png'},
  ];

  registerOnChange(fn: (value) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { }

  writeValue(obj: any) {
    this.ngModel = obj;
  }
}
