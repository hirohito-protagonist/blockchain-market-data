import {
  getMarketPrices,
  getConvertBtcState,
  getCurrencies,
  viewExchangeRatesModel
} from './selectors';

describe('Exchange rates', () => {

  describe('Selectors', () => {

    describe('getConvertBtcState', () => {

      it('should remap data service state to new model', () => {

        // Given
        const serviceResponse = {
          isFetching: true, query: {}, lastUpdate: 123
        };

        // When
        const result = getConvertBtcState.projector(serviceResponse);

        // Then
        expect(result).toMatchSnapshot();
      });

      it('should remap data service query state to new model', () => {

        // Given
        const query = {
          value: '200',
          currency: 'USD',
        };
        const serviceResponse = {
          isFetching: true, query, response: 0.001, lastUpdate: 123
        };

        // When
        const result = getConvertBtcState.projector(serviceResponse);

        // Then
        expect(result).toMatchSnapshot();
      });
    });

    describe('getCurrencies', () => {

      it('should return empty collection by default', () => {

        // Given
        const serviceResponse = {};

        // When
        const result = getCurrencies.projector(serviceResponse);

        // Then
        expect(result).toMatchSnapshot();
      });

      it('should remap market prices to new collection model', () => {

        // Given
        const marketPrices = {
          'USD': { symbol: '$' },
          'PLN': { symbol: 'zł'}
        };
        const serviceResponse = {
          response: marketPrices
        };

        // When
        const result = getCurrencies.projector(serviceResponse);

        // Then
        expect(result).toMatchSnapshot();
      });
    });

    describe('viewExchangeRatesModel', () => {

      it('should compose selectors to create view model', () => {

        // Given
        const marketPrices = {
          'USD': { symbol: '$' },
          'PLN': { symbol: 'zł'}
        };

        // When
        const prices = getMarketPrices.projector({ response: marketPrices });
        const currencies = getCurrencies.projector({ response: marketPrices });
        const convert = getConvertBtcState.projector({ isFetching: true, query: {}, response: 0.001, lastUpdate: 123 });
        const result = viewExchangeRatesModel.projector(prices, currencies, convert, 'USD');

        // THen
        expect(result).toMatchSnapshot();
      });
    });
  });
});
