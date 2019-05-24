import { createAction, union } from '@ngrx/store';

export const fetchData = createAction(
  '[Exchange Rates Feature] Market prices fetch data'
);

const all = union({ fetchData });

export type ActionType = typeof all;

