import { reducer } from './convert-btc.reducer';
import { fromConvertBtcAction } from './../actions/index.action';

describe('Convert btc reducer', () => {

  describe('undefined action', () => {

    it('should return default state', () => {

      const action = { type: void(0) };
      const result = reducer(void(0), action);

      expect(result).toEqual({
        isFetching: false,
        convert: {
          value: 0,
          currency: '',
          btc: 0
        },
        lastUpdate: null
      });
    });
  });

  describe('[Exchange rates] Convert to BTC', () => {

    it('should update convert data', () => {

      const action = new fromConvertBtcAction.Convert({ currency: 'USD', value: 40 });
      const result = reducer({
        isFetching: false,
        convert: {
          value: 0,
          currency: '',
          btc: 0
        },
        lastUpdate: 123
      }, action);

      expect(result).toEqual({
        isFetching: false,
        convert: {
          value: 40,
          currency: 'USD',
          btc: 0
        },
        lastUpdate: 123
      });
    });
  });

  describe('[Exchange rates] Request convert action', () => {

    it('should mark isFetching as true and reset data to empty object', () => {

      const action = new fromConvertBtcAction.Request();
      const result = reducer({
        isFetching: false,
        convert: {
          value: 0,
          currency: '',
          btc: 0
        },
        lastUpdate: 123
      }, action);

      expect(result).toEqual({
        isFetching: true,
        convert: {
          value: 0,
          currency: '',
          btc: 0
        },
        lastUpdate: 123
      });
    });
  });

  describe('[Exchange rates] Response convert action', () => {


    it('should mark isFetching as false, update lastUpdate and override data with fresh one', () => {

      spyOn(Date, 'now').and.returnValue(456);

      const action = new fromConvertBtcAction.Response(20);
      const result = reducer({
        isFetching: true,
        convert: {
          value: 0,
          currency: '',
          btc: 0
        },
        lastUpdate: 123
      }, action);

      expect(result).toEqual({
        isFetching: false,
        convert: {
          value: 0,
          currency: '',
          btc: 20
        },
        lastUpdate: 456
      });
    });
  });
});
