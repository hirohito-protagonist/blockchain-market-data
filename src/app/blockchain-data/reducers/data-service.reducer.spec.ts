import { reducer } from './data-service.reducer';
import { DataServiceType } from './../blockchain-data.type';
import { fromDataServiceAction } from './../actions/index.action';

describe('Data service reducer', () => {

  describe('init', () => {

    it('should return default state', () => {

      const action = {} as any;
      const result = reducer(void(0), action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('[Blockchain data] data service request action', () => {

    [
      {
        serviceType: DataServiceType.ToBTC,
        query: { currency: 'USD', value: 200 }
      },
      {
        serviceType: DataServiceType.Stats,
        query: null
      },
      {
        serviceType: DataServiceType.Ticker,
        query: null
      }
    ].forEach((testData) => {

      it(`should set isFetching as true and update query for ${testData.serviceType}`, () => {

        const action = fromDataServiceAction.request({
          key: testData.serviceType, query: testData.query
        });
        const result = reducer(void(0), action);

        expect(result).toMatchSnapshot();
      });
    });


    it('should not update state for undefined node', () => {

      const action = fromDataServiceAction.request({
        key: '' as any, query: { currency: 'USD', value: 200 }
      });
      const result = reducer(void(0), action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('[Blockchain data] data service response action', () => {

    [
      {
        serviceType: DataServiceType.ToBTC,
        query: { currency: 'USD', value: 200 },
        response: 123
      },
      {
        serviceType: DataServiceType.Stats,
        query: null,
        response: {}
      },
      {
        serviceType: DataServiceType.Ticker,
        query: null,
        response: {}
      }
    ].forEach((testData) => {

      it(`should set isFetching as false and update response for ${testData.serviceType}`, () => {

        spyOn(Date, 'now').and.returnValue(123);

        const requestAction = fromDataServiceAction.request({
          key: testData.serviceType, query: testData.query
        });
        const requestResult = reducer(void(0), requestAction);
        const responseAction = fromDataServiceAction.response({
          key: testData.serviceType, response: testData.response
        });
        const responseResult = reducer(requestResult, responseAction);

        expect(responseResult).toMatchSnapshot();
      });
    });


    it('should not update state for undefined node', () => {

      const requestAction = fromDataServiceAction.request({
        key: DataServiceType.ToBTC, query: { currency: 'USD', value: 200 }
      });
      const requestResult = reducer(void(0), requestAction);
      const responseAction = fromDataServiceAction.response({
        key: '' as any, response: 123
      });
      const responseResult = reducer(requestResult, responseAction);

      expect(responseResult).toMatchSnapshot();
    });
  });

});
