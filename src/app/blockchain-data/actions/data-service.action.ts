import { Action } from '@ngrx/store';
import { DataServiceType } from './../blockchain-data.type';

export enum ActionTypes {
  Request = '[Blockchain data] data service request',
  Response = '[Blockchain data] data service response'
}

export class Request implements Action {
  readonly type = ActionTypes.Request;

  constructor(public payload: { key: DataServiceType; query: any; }) {}
}

export class Response implements Action {
  readonly type = ActionTypes.Response;

  constructor(public payload: { key: DataServiceType; response: any; }) {}
}

export type ActionType = Request | Response;
