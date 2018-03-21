import { reducer } from './data-service.reducer';
import { DataServiceType } from './../blockchain-data.type';
import { fromDataServiceAction } from './../actions/index.action';

describe('Data service reducer', () => {

  describe('init', () => {

    it('should return default state', () => {

      const action = {} as any;
      const result = reducer(void(0), action);

      expect(result).toEqual({
        'ticker': { isFetching: false, response: null, lastUpdate: 0, query: null },
        'tobtc': { isFetching: false, response: null, lastUpdate: 0, query: null },
        'stats': { isFetching: false, response: null, lastUpdate: 0, query: null }
      });
    });
  });

  describe('[Blockchain data] data service request action', () => {

    [
      {
        serviceType: DataServiceType.ToBTC,
        query: { currency: 'USD', value: 200 },
        expected: {
          'ticker': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'tobtc': { isFetching: true, response: null, lastUpdate: 0, query: { currency: 'USD', value: 200 } },
          'stats': { isFetching: false, response: null, lastUpdate: 0, query: null }
        }
      },
      {
        serviceType: DataServiceType.Stats,
        query: null,
        expected: {
          'ticker': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'tobtc': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'stats': { isFetching: true, response: null, lastUpdate: 0, query: null }
        }
      },
      {
        serviceType: DataServiceType.Ticker,
        query: null,
        expected: {
          'ticker': { isFetching: true, response: null, lastUpdate: 0, query: null },
          'tobtc': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'stats': { isFetching: false, response: null, lastUpdate: 0, query: null }
        }
      }
    ].forEach((testData) => {

      it(`should set isFetching as true and update query for ${testData.serviceType}`, () => {

        const action = new fromDataServiceAction.Request({ key: testData.serviceType, query: testData.query });
        const result = reducer(void(0), action);

        expect(result).toEqual(testData.expected);
      });
    });


    it('should not update state for undefined node', () => {

      const action = new fromDataServiceAction.Request({ key: '' as any, query: { currency: 'USD', value: 200 } });
      const result = reducer(void(0), action);

      expect(result).toEqual({
        'ticker': { isFetching: false, response: null, lastUpdate: 0, query: null },
        'tobtc': { isFetching: false, response: null, lastUpdate: 0, query: null },
        'stats': { isFetching: false, response: null, lastUpdate: 0, query: null }
      });
    });
  });

  describe('[Blockchain data] data service response action', () => {

    [
      {
        serviceType: DataServiceType.ToBTC,
        query: { currency: 'USD', value: 200 },
        response: 123,
        expected: {
          'ticker': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'tobtc': { isFetching: false, response: 123, lastUpdate: 123, query: { currency: 'USD', value: 200 } },
          'stats': { isFetching: false, response: null, lastUpdate: 0, query: null }
        }
      },
      {
        serviceType: DataServiceType.Stats,
        query: null,
        response: {},
        expected: {
          'ticker': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'tobtc': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'stats': { isFetching: false, response: {}, lastUpdate: 123, query: null }
        }
      },
      {
        serviceType: DataServiceType.Ticker,
        query: null,
        response: {},
        expected: {
          'ticker': { isFetching: false, response: {}, lastUpdate: 123, query: null },
          'tobtc': { isFetching: false, response: null, lastUpdate: 0, query: null },
          'stats': { isFetching: false, response: null, lastUpdate: 0, query: null }
        }
      }
    ].forEach((testData) => {

      it(`should set isFetching as false and update response for ${testData.serviceType}`, () => {

        spyOn(Date, 'now').and.returnValue(123);

        const requestAction = new fromDataServiceAction.Request({ key: testData.serviceType, query: testData.query });
        const requestResult = reducer(void(0), requestAction);
        const responseAction = new fromDataServiceAction.Response({ key: testData.serviceType, response: testData.response });
        const responseResult = reducer(requestResult, responseAction);

        expect(responseResult).toEqual(testData.expected);
      });
    });


    it('should not update state for undefined node', () => {

      const requestAction = new fromDataServiceAction.Request({ key: DataServiceType.ToBTC, query: { currency: 'USD', value: 200 } });
      const requestResult = reducer(void(0), requestAction);
      const responseAction = new fromDataServiceAction.Response({ key: '' as any, response: 123 });
      const responseResult = reducer(requestResult, responseAction);

      expect(responseResult).toEqual({
        'ticker': { isFetching: false, response: null, lastUpdate: 0, query: null },
        'tobtc': { isFetching: true, response: null, lastUpdate: 0, query: { currency: 'USD', value: 200 } },
        'stats': { isFetching: false, response: null, lastUpdate: 0, query: null }
      });
    });
  });

});
