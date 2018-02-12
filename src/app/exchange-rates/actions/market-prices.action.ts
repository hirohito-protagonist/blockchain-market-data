import { Action } from '@ngrx/store';
import { fromMarketPrices } from './../reducers/index.reducer';

export enum MarketPricesActions {
  Request = '[Exchange rates] Market prices request',
  Response = '[Exchange rates] Market prices response',
  FetchData = '[Exchange rates] Market prices fetch data'
}


export class FetchData implements Action {
  readonly type = MarketPricesActions.FetchData;
}

export class Request implements Action {
  readonly type = MarketPricesActions.Request;
}

export class Response implements Action {
  readonly type = MarketPricesActions.Response;
  payload: { response: fromMarketPrices.MarketPrices; timestamp: number; } = {
    response: {},
    timestamp: Date.now()
  };

  constructor(response: fromMarketPrices.MarketPrices) {
    this.payload.response = response;
  }
}

export type MarketPricesType = Request | Response | FetchData;
