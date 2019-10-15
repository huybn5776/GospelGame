import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioChange, MatRadioGroup } from '@angular/material';

@Component({
  selector: 'app-newcomer-addition',
  templateUrl: './newcomer-addition.component.html',
  styleUrls: ['./newcomer-addition.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => NewcomerAdditionComponent)}],
})
export class NewcomerAdditionComponent implements ControlValueAccessor {

  @Input() ngModel = 0;
  @Output() ngModelChange = new EventEmitter<number>();
  @ViewChild(MatRadioGroup, {static: true}) radioGroup: MatRadioGroup;

  onChange: (value) => void;

  registerOnChange(fn: (value) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { }

  writeValue(obj: number) {
    this.ngModel = obj;
    this.radioGroup.value = obj;
  }

  onModelChange(event: MatRadioChange) {
    this.ngModel = event.value;
    this.ngModelChange.emit(this.ngModel);
    this.onChange(this.ngModel);
  }
}
