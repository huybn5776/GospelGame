import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatDividerModule,
  MatIconModule,
  MatRadioModule,
  MatRippleModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule,
    MatRippleModule,
    MatDividerModule,
  ],
})
export class SharedModule {}
