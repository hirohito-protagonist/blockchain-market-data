import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { ExchangeRatesState } from './store';

import { fromBlockchainDataSelectors, DataServiceType, BTCQuery } from '@bmd/blockchain-data';
import * as fromUIReducer from './ui.reducer';

const getExchangeRatesState = createFeatureSelector('exchangeRates');
const getUIState = createSelector(getExchangeRatesState, (s: ExchangeRatesState) => s.ui);
const getActiveCurrency = createSelector(getUIState, fromUIReducer.activeCurrency);

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
  getMarketPrices, getCurrencies, getConvertBtcState, getActiveCurrency,
  (marketPrices, currencies, convert, activeCurrency) => {

    return {
      update: marketPrices.lastUpdate || convert.lastUpdate,
      data: {
        marketPrices: marketPrices.response,
        currencies,
        convert,
        activeCurrency
      }
    };
  }
);
