import { reducer } from './data-service.reducer';
import { DataServiceType } from './../blockchain-data.type';
import { request, response } from './../store/actions';

describe('Data service reducer', () => {

  describe('init', () => {

    it('should return default state', () => {

      // Given
      const action = {} as any;

      // When
      const result = reducer(void(0), action);

      // Then
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

        // Given
        const action = request({
          key: testData.serviceType, query: testData.query
        });

        // When
        const result = reducer(void(0), action);

        // Then
        expect(result).toMatchSnapshot();
      });
    });


    it('should not update state for undefined node', () => {

      // Given
      const action = request({
        key: '' as any, query: { currency: 'USD', value: 200 }
      });

      // When
      const result = reducer(void(0), action);

      // Then
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

        // Given
        const requestAction = request({
          key: testData.serviceType, query: testData.query
        });
        const responseAction = response({
          key: testData.serviceType, response: testData.response
        });

        // When
        const requestResult = reducer(void(0), requestAction);
        const responseResult = reducer(requestResult, responseAction);

        // Then
        expect(responseResult).toMatchSnapshot();
      });
    });


    it('should not update state for undefined node', () => {

      // Given
      const requestAction = request({
        key: DataServiceType.ToBTC, query: { currency: 'USD', value: 200 }
      });
      const responseAction = response({
        key: '' as any, response: 123
      });

      // When
      const requestResult = reducer(void(0), requestAction);
      const responseResult = reducer(requestResult, responseAction);

      // Then
      expect(responseResult).toMatchSnapshot();
    });
  });

});
