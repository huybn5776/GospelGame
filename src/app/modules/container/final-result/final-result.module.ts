import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FinalResultRoutingModule } from './final-result-routing.module';
import { FinalResultComponent } from './final-result.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FinalResultRoutingModule,
  ],
  declarations: [
    FinalResultComponent,
  ],
})
export class FinalResultModule {}
