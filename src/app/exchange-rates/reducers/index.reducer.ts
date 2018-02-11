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
