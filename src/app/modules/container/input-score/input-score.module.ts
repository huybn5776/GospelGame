import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { InputScoreComponent } from './input-score.component';
import { InputScoreRoutingModule } from './input-score-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InputScoreRoutingModule,
  ],
  declarations: [
    InputScoreComponent,
  ],
})
export class InputScoreModule {}
