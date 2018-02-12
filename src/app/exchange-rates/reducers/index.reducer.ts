import { createFeatureSelector, createSelector } from '@ngrx/store';

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


const getExchangeRatesState = createFeatureSelector('exchangeRates');
const getMarketPricesState = createSelector(getExchangeRatesState, (s: ExchangeRatesState) => s.marketPrices);
export const getMarketPricesData = createSelector(getMarketPricesState, (s: fromMarketPrices.MarketPricesState) => s.data);
