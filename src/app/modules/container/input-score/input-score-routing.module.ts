import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputScoreComponent } from './input-score.component';

const routes: Routes = [
  {
    path: '',
    component: InputScoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputScoreRoutingModule {}
