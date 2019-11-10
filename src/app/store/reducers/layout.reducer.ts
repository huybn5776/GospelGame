import { Action, createReducer, on } from '@ngrx/store';

import { LayoutActions } from '../actions';

export interface LayoutState {
  currentPage: string;
}

const initialState: LayoutState = {
  currentPage: '',
};

const reducer = createReducer(
  initialState,
  on(LayoutActions.changePage, (state, {page}) => ({currentPage: page})),
);

export function layoutReducer(state: LayoutState, action: Action) {
  return reducer(state, action);
}
