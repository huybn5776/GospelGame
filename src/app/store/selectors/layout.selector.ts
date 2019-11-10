import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RootState } from '../reducers';
import { LayoutState } from '../reducers/layout.reducer';

export const selectLayoutState = createFeatureSelector<RootState, LayoutState>(
  'layout'
);

export const selectCurrentPage = createSelector(
  selectLayoutState,
  (state: LayoutState) => state.currentPage,
);
