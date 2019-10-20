import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { InputScoreComponent } from './input-score.component';
import { InputScoreRoutingModule } from './input-score-routing.module';
import { GameItemComponent } from './game-item/game-item.component';
import { GameItemSelectComponent } from './game-item-select/game-item-select.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InputScoreRoutingModule,
  ],
  declarations: [
    InputScoreComponent,
    GameItemComponent,
    GameItemSelectComponent,
  ],
})
export class InputScoreModule {}
