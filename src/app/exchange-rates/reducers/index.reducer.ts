import { createFeatureSelector, createSelector } from '@ngrx/store';

import { fromBlockchainDataSelectors, DataServiceType } from './../../blockchain-data/blockchain-data.module';
import * as fromMarketPrices from './market-prices.reducer';

export {
  fromMarketPrices
};

export interface ExchangeRatesState {
  marketPrices: fromMarketPrices.MarketPricesState;
}

export const reducers = {
  marketPrices: fromMarketPrices.reducer
};

export interface ConvertToBTC {
  value: string|number;
  currency: string;
}

interface ConvertToBtcData extends ConvertToBTC {
  btc: number;
}

export interface ConvertBtcState {
  isFetching: boolean;
  convert: ConvertToBtcData;
  lastUpdate: number;
}


const getExchangeRatesState = createFeatureSelector('exchangeRates');
const getMarketPricesState = createSelector(getExchangeRatesState, (s: ExchangeRatesState) => s.marketPrices);
export const getMarketPricesData = createSelector(getMarketPricesState, (s: fromMarketPrices.MarketPricesState) => s.data);

export const getConvertBtcState = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.ToBTC), (s) => {

  return {
    isFetching: s.isFetching,
    convert: {
      value: s.query ? s.query.value : '',
      currency: s.query ? s.query.currency : '',
      btc: s.response
    },
    lastUpdate: s.lastUpdate
  };
});

export const getCurrencies = createSelector(getMarketPricesData, (d: fromMarketPrices.MarketPrices) => {

  return Object.keys(d).map((currency: string) => {

    return {
      currency: currency,
      symbol: d[currency].symbol
    };
  });
});
