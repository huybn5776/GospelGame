import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule,
  MatIconModule,
  MatRadioModule,
  MatRippleModule,
  MatTabsModule,
} from '@angular/material';

import { DirectivesModule } from './directives/directives.module';

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
    MatDialogModule,
    DirectivesModule,
  ],
})
export class SharedModule {}
