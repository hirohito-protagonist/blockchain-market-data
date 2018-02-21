import { Action } from '@ngrx/store';
import { fromMarketPricesAction } from './../actions/index.action';

export interface MarketPrices {
  [key: string]: {
    '15m': number;
    'last': number;
    'buy': number;
    'sell': number;
    'symbol': string;
  };
}

export interface MarketPricesState {
  isFetching: boolean;
  data: MarketPrices;
  lastUpdate: number;
}

const initialState: MarketPricesState = {
  isFetching: false,
  data: {},
  lastUpdate: null
};

export function reducer(state: MarketPricesState = initialState, action: fromMarketPricesAction.ActionType): MarketPricesState {

  switch (action.type) {

    case fromMarketPricesAction.ActionTypes.Request: {

      return {
        ...state,
        isFetching: true,
        data: {}
      };
    }

    case fromMarketPricesAction.ActionTypes.Response: {

      return {
        ...state,
        isFetching: false,
        data: action.payload.response,
        lastUpdate: action.payload.timestamp
      };
    }

    default: {

      return state;
    }
  }
}
