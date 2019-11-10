import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TotalScorePanelComponent } from './total-score-panel/total-score-panel.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    TotalScorePanelComponent,
  ],
})
export class HomeModule {}
