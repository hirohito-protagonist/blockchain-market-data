import { createAction, props } from '@ngrx/store';

export const updateUIState = createAction(
  '@statistics/ui',
  props<{ key: string; value: any }>()
);
