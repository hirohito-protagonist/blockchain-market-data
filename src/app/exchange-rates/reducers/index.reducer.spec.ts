import {
  getMarketPrices,
  getConvertBtcState,
  getCurrencies,
  viewExchangeRatesModel
} from './index.reducer';

describe('Exchange rates reducer', () => {

  describe('Selectors', () => {

    describe('getConvertBtcState', () => {

      it('should remap data service state to new model', () => {

        const selector = getConvertBtcState.projector({ isFetching: true, query: {}, lastUpdate: 123 });

        expect(selector).toMatchSnapshot();
      });

      it('should remap data service query state to new model', () => {

        const query = {
          value: '200',
          currency: 'USD',
        };
        const selector = getConvertBtcState.projector({ isFetching: true, query, response: 0.001, lastUpdate: 123 });

        expect(selector).toMatchSnapshot();
      });
    });

    describe('getCurrencies', () => {

      it('should return empty collection by default', () => {

        const selector = getCurrencies.projector({});

        expect(selector).toMatchSnapshot();
      });

      it('should remap market prices to new collection model', () => {

        const marketPrices = {
          'USD': { symbol: '$' },
          'PLN': { symbol: 'zł'}
        };
        const selector = getCurrencies.projector({ response: marketPrices });

        expect(selector).toMatchSnapshot();
      });
    });

    describe('viewExchangeRatesModel', () => {

      it('should compose selectors to create view model', () => {

        const marketPrices = {
          'USD': { symbol: '$' },
          'PLN': { symbol: 'zł'}
        };

        const prices = getMarketPrices.projector({ response: marketPrices });
        const currencies = getCurrencies.projector({ response: marketPrices });
        const convert = getConvertBtcState.projector({ isFetching: true, query: {}, response: 0.001, lastUpdate: 123 });
        const selector = viewExchangeRatesModel.projector(prices, currencies, convert);

        expect(selector).toMatchSnapshot();
      });
    });
  });
});
