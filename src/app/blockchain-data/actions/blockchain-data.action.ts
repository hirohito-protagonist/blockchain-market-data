import { createAction, props, union } from '@ngrx/store';
import { DataServiceType, QueryType } from './../blockchain-data.type';

export const fetchData = createAction(
  '[Blockchain Data Feature API] Fetch data',
  props<{ key: DataServiceType; query: QueryType; }>()
);
