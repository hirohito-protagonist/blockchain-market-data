import { createAction, props, union } from '@ngrx/store';
import { fromLayoutReducer } from './../reducers/index.reducer';


export const changeView = createAction(
  '[Core Feature] Change Layout View',
  props<{ view: fromLayoutReducer.LayoutView }>()
);

const all = union({ changeView });

export type ActionType = typeof all;
