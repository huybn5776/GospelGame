import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule,
  MatIconModule, MatProgressBarModule,
  MatRadioModule,
  MatRippleModule, MatTableModule,
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
    MatTableModule,
    MatProgressBarModule,
    DirectivesModule,
  ],
})
export class SharedModule {}
