import { createAction, props } from '@ngrx/store';
import { LayoutView } from './layout.reducer';


export const changeView = createAction(
  '@core/layout-view',
  props<{ view: LayoutView }>()
);
