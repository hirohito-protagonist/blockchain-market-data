import { createAction, props, union } from '@ngrx/store';

export const updateUIState = createAction(
  '[Exchange Rates Feature] Update UI state',
  props<{ key: string; value: any }>()
);
