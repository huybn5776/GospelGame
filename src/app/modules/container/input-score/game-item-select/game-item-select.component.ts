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

  @Input() items: GameItemInfo[] = [];
  @Input() ngModel = {};
  @Input() maxItemCount = 0;
  @Output() ngModelChange = new EventEmitter<{}>();

  onChange: (value) => void;

  registerOnChange(fn: (value) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { }

  writeValue(obj: any) {
    this.ngModel = obj;
  }
}
