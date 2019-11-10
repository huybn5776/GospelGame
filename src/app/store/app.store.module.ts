import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { rootReducers } from './reducers';
import { LayoutEffects } from './effects/layout.effects';
import { GameScoreEffects } from './effects/game-score.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(rootReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([LayoutEffects, GameScoreEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
})
export class AppStoreModule {}

