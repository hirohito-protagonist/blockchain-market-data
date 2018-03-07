import { createFeatureSelector, createSelector } from '@ngrx/store';

import { fromBlockchainDataSelectors, DataServiceType } from './../../blockchain-data/blockchain-data.module';
import { MarketPrices } from './../exchange-rates.type';

export interface ExchangeRatesState {
  version: string;
}

export const reducers = {
  version: () => '1.0.0'
};


export const getMarketPricesData = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Ticker), (s) => {

  return (s.response as MarketPrices) || {};
});

export const getConvertBtcState = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.ToBTC), (s) => {

  return {
    isFetching: s.isFetching,
    convert: {
      value: s.query ? s.query.value : '',
      currency: s.query ? s.query.currency : '',
      btc: (s.response as number)
    },
    lastUpdate: s.lastUpdate
  };
});

export const getCurrencies = createSelector(getMarketPricesData, (d: MarketPrices) => {

  return Object.keys(d).map((currency: string) => {

    return {
      currency: currency,
      symbol: d[currency].symbol
    };
  });
});
