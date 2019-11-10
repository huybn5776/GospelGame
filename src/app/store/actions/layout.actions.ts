import { createAction, props } from '@ngrx/store';

export const changePage = createAction('[Layout] Change page', props<{ page: string }>());
