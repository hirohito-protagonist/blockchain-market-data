import { reducer, MarketPrices } from './market-prices.reducer';
import { fromMarketPricesAction } from './../actions/index.action';

describe('Market prices reducer', () => {

  describe('undefined action', () => {

    it('should return default state', () => {

      const action = { type: void(0) };
      const result = reducer(void(0), action);

      expect(result).toEqual({
        isFetching: false,
        data: {},
        lastUpdate: null
      });
    });
  });

  describe('[Exchange rates] Market prices request action', () => {

    it('should mark isFetching as true and reset data to empty object', () => {

      const action = new fromMarketPricesAction.Request();
      const result = reducer({
        isFetching: false,
        data: {
          'USD': {
            '15m': 1,
            'last': 1,
            'buy': 1,
            'sell': 1,
            'symbol': ''
          }
        },
        lastUpdate: 123
      }, action);

      expect(result).toEqual({
        isFetching: true,
        data: {},
        lastUpdate: 123
      });
    });
  });

  describe('[Exchange rates] Market prices response action', () => {


    it('should mark isFetching as false, update lastUpdate and override data with fresh one', () => {

      spyOn(Date, 'now').and.returnValue(456);

      const action = new fromMarketPricesAction.Response({});
      const result = reducer({
        isFetching: true,
        data: {
          'USD': {
            '15m': 1,
            'last': 1,
            'buy': 1,
            'sell': 1,
            'symbol': ''
          }
        },
        lastUpdate: 123
      }, action);

      expect(result).toEqual({
        isFetching: false,
        data: {},
        lastUpdate: 456
      });
    });
  });
});
