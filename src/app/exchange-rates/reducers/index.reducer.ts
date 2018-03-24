import { createFeatureSelector, createSelector } from '@ngrx/store';

import { fromBlockchainDataSelectors, DataServiceType, BTCQuery } from '@bmd/blockchain-data';
import { MarketPrices } from './../exchange-rates.type';

export interface ExchangeRatesState {
  version: string;
}

export function featureVersion() {
  return '1.0.0';
}

export const reducers = {
  version: featureVersion
};


export const getMarketPricesData = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Ticker), (s) => {

  return (s.response as MarketPrices) || {};
});

export const getConvertBtcState = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.ToBTC), (s) => {

  const query = s.query as BTCQuery;

  return {
    isFetching: s.isFetching,
    convert: {
      value: query ? query.value : '',
      currency: query ? query.currency : '',
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
