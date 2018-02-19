import { Action } from '@ngrx/store';
import { fromConvertBtc } from './../reducers/index.reducer';

export enum ActionTypes {
  Convert = '[Exchange rates] Convert to BTC',
  Request = '[Exchange rates] Request convert',
  Response = '[Exchange rates] Response convert'
}

export class Convert implements Action {
  readonly type = ActionTypes.Convert;

  constructor(public payload: fromConvertBtc.ConvertToBTC) {}
}

export class Request implements Action {
  readonly type = ActionTypes.Request;
}

export class Response implements Action {
  readonly type = ActionTypes.Response;

  constructor(public payload: number) {}
}

export type ActionType = Convert | Request | Response;
