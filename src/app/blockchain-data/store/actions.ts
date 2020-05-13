import { createAction, props } from '@ngrx/store';
import { DataServiceType, QueryType, DataResponseType } from './../blockchain-data.type';

export const fetchData = createAction(
  '@blockchain-data/fetch',
  props<{ key: DataServiceType; query: QueryType; }>()
);

export const request = createAction(
  '@blockchain-data/request',
  props<{ key: DataServiceType; query: QueryType; }>()
);

export const response = createAction(
  '@blockchain-data/response',
  props<{ key: DataServiceType; response: DataResponseType; }>()
);
