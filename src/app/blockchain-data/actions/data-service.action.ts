import { createAction, props, union } from '@ngrx/store';
import { DataServiceType, QueryType, DataResponseType } from './../blockchain-data.type';


export const request = createAction(
  '[Blockchain Data Feature API] Data service request',
  props<{ payload: { key: DataServiceType; query: QueryType; } }>()
);

export const response = createAction(
  '[Blockchain Data Feature API] Data service response',
  props<{ payload: { key: DataServiceType; response: DataResponseType; } }>()
);

const all = union({ request, response });

export type ActionType = typeof all;
