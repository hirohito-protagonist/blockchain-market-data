import { createAction, props, union } from '@ngrx/store';
import { DataServiceType, QueryType, DataResponseType } from './../blockchain-data.type';

enum ActionTypes {
  Request = '[Blockchain Data Feature API] Data service request',
  Response = '[Blockchain Data Feature API] Data service response'
}

export const request = createAction(
  ActionTypes.Request,
  props<{ payload: { key: DataServiceType; query: QueryType; } }>()
);

export const response = createAction(
  ActionTypes.Response,
  props<{ payload: { key: DataServiceType; response: DataResponseType; } }>()
);

const all = union({ request, response });

export type ActionType = typeof all;
