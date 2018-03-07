import { Action } from '@ngrx/store';
import { DataServiceType, QueryType, DataResponseType } from './../blockchain-data.type';

export enum ActionTypes {
  Request = '[Blockchain data] data service request',
  Response = '[Blockchain data] data service response'
}

export class Request implements Action {
  readonly type = ActionTypes.Request;

  constructor(public payload: { key: DataServiceType; query: QueryType; }) {}
}

export class Response implements Action {
  readonly type = ActionTypes.Response;

  constructor(public payload: { key: DataServiceType; response: DataResponseType; }) {}
}

export type ActionType = Request | Response;
