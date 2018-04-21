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


export const getMarketPrices = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Ticker), (s) => s);

export const getConvertBtcState = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.ToBTC), (s) => {

  const query = s.query as BTCQuery;

  return {
    isFetching: s.isFetching,
    convert: {
      value: query ? query.value || '' : '',
      currency: query ? query.currency || '' : '',
      btc: typeof s.response !== 'undefined' ? (s.response as number) : 0
    },
    lastUpdate: s.lastUpdate
  };
});

export const getCurrencies = createSelector(getMarketPrices, (d) => {

  return Object.keys(d.response || {}).map((currency: string) => {

    return {
      currency: currency,
      symbol: d.response[currency].symbol
    };
  });
});

export const viewExchangeRatesModel = createSelector(
  getMarketPrices, getCurrencies, getConvertBtcState,
  (marketPrices, currencies, convert) => {

    return {
      update: marketPrices.lastUpdate || convert.lastUpdate,
      data: {
        marketPrices: marketPrices.response,
        currencies,
        convert
      }
    };
  }
);
