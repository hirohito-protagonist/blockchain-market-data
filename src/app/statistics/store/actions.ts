import { createAction, props } from '@ngrx/store';

export const updateUIState = createAction(
  '[Statistics Feature] Update UI state',
  props<{ key: string; value: any }>()
);
