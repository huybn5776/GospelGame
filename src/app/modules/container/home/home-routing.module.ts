import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'input-score',
        loadChildren: () => import('./../input-score/input-score.module').then(m => m.InputScoreModule),
      },
      {
        path: 'final-result',
        loadChildren: () => import('./../final-result/final-result.module').then(m => m.FinalResultModule),
      },
      {
        path: '**',
        redirectTo: 'input-score',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
