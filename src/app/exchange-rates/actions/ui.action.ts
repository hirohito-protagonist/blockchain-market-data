import { createAction, props, union } from '@ngrx/store';

export const updateUIState = createAction(
  '[Exchange Rates Feature] Update UI state',
  props<{ payload: { key: string; value: any } }>()
);

const all = union({ updateUIState });

export type ActionType = typeof all;
