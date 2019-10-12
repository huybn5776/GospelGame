import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalResultComponent } from './final-result.component';

const routes: Routes = [
  {
    path: '',
    component: FinalResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalResultRoutingModule {}
