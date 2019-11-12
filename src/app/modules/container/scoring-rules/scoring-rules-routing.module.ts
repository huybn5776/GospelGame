import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoringRulesComponent } from './scoring-rules.component';

const routes: Routes = [
  {
    path: '',
    component: ScoringRulesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoringRulesRoutingModule {}
