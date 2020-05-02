import { createAction, props } from '@ngrx/store';
import { LayoutView } from './layout.reducer';


export const changeView = createAction(
  '[Core Feature] Change Layout View',
  props<{ view: LayoutView }>()
);
