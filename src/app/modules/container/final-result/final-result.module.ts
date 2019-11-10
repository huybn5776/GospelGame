import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FinalResultRoutingModule } from './final-result-routing.module';
import { FinalResultComponent } from './final-result.component';
import { ItemsViewComponent } from './items-view/items-view.component';
import { CoinsViewComponent } from './coins-view/coins-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FinalResultRoutingModule,
  ],
  declarations: [
    FinalResultComponent,
    ItemsViewComponent,
    CoinsViewComponent,
  ],
})
export class FinalResultModule {}
