import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ScoringRulesRoutingModule } from './scoring-rules-routing.module';
import { ScoringRulesComponent } from './scoring-rules.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ScoringRulesRoutingModule,
  ],
  declarations: [
    ScoringRulesComponent,
  ],
})
export class ScoringRulesModule {}
