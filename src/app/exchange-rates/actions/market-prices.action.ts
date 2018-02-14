import { Action } from '@ngrx/store';
import { fromMarketPrices } from './../reducers/index.reducer';

export enum ActionTypes {
  Request = '[Exchange rates] Market prices request',
  Response = '[Exchange rates] Market prices response',
  FetchData = '[Exchange rates] Market prices fetch data'
}


export class FetchData implements Action {
  readonly type = ActionTypes.FetchData;
}

export class Request implements Action {
  readonly type = ActionTypes.Request;
}

export class Response implements Action {
  readonly type = ActionTypes.Response;
  payload: { response: fromMarketPrices.MarketPrices; timestamp: number; } = {
    response: {},
    timestamp: Date.now()
  };

  constructor(response: fromMarketPrices.MarketPrices) {
    this.payload.response = response;
  }
}

export type ActionType = Request | Response | FetchData;
