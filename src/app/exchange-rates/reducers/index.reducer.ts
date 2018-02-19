import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMarketPrices from './market-prices.reducer';
import * as fromConvertBtc from './convert-btc.reducer';

export {
  fromMarketPrices,
  fromConvertBtc
};

export interface ExchangeRatesState {
  marketPrices: fromMarketPrices.MarketPricesState;
  convertBtc: fromConvertBtc.ConvertBtcState;
}

export const reducers = {
  marketPrices: fromMarketPrices.reducer,
  convertBtc: fromConvertBtc.reducer
};


const getExchangeRatesState = createFeatureSelector('exchangeRates');
const getMarketPricesState = createSelector(getExchangeRatesState, (s: ExchangeRatesState) => s.marketPrices);
export const getMarketPricesData = createSelector(getMarketPricesState, (s: fromMarketPrices.MarketPricesState) => s.data);

export const getConvertBtcState = createSelector(getExchangeRatesState, (s: ExchangeRatesState) => s.convertBtc);
