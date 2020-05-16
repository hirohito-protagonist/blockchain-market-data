import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { Observable, of } from 'rxjs';

import { DataServiceEffects } from './effects';
import { ExchangeRatesService } from './../services/exchange-rates.service';
import { StatisticsService } from './../services/statistics.service';
import { fetchData, response, request } from './actions';
import { DataServiceType } from '../blockchain-data.type';



describe('DataServiceEffects', () => {

  let effects: DataServiceEffects;
  let actions$: Observable<any>;
  let exchangeRatesService: ExchangeRatesService;
  let statisticsService: StatisticsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        DataServiceEffects,
        ExchangeRatesService,
        StatisticsService,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(DataServiceEffects);
    actions$ = TestBed.get(Actions);
    exchangeRatesService = TestBed.get(ExchangeRatesService);
    statisticsService = TestBed.get(StatisticsService);
  });

  it('should dispatch request data action on fetch action', () => {

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      // Given
      const action = fetchData({
        key: DataServiceType.Ticker, query: null
      });
      const completion = request({
        key: DataServiceType.Ticker,
        query: null
      });

      // When
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      // Then
      expectObservable(effects.requestData$).toBe('-b', {
        b: completion
      });
    });

  });

  it('should request convert to BTC on fetch data action and then dispatch response action', () => {

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      // Given
      const responseData = {
        status: 200,
        response: 0.12331
      };
      const action = fetchData({
        key: DataServiceType.ToBTC,
        query: {
          currency: 'USD',
          value: 200
        }
      });
      const completion = response({
        key: DataServiceType.ToBTC,
        response: responseData.response
      });

      // When
      actions$ = hot('-a', { a: action });
      spyOn(exchangeRatesService, 'tobtc').and.returnValue(of(responseData));

      // Then
      expectObservable(effects.responseToBTCData$).toBe('-b', {
        b: completion
      });
    });
  });

  it('should request market data prices on fetch data action and then dispatch response action', () => {

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      // Given
      const responseData = {
        status: 200,
        response: {}
      };
      const action = fetchData({
        key: DataServiceType.Ticker,
        query: null
      });
      const completion = response({
        key: DataServiceType.Ticker,
        response: responseData.response
      });

      // When
      actions$ = hot('-a', { a: action });
      spyOn(exchangeRatesService, 'ticker').and.returnValue(of(responseData));

      // Then
      expectObservable(effects.responseTcikerData$).toBe('-b', {
        b: completion
      });
    });
  });

  it('should request stats information on fetch data action and then dispatch response action', () => {

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      // Given
      const responseData = {
        status: 200,
        response: {}
      };
      const action = fetchData({
        key: DataServiceType.Stats,
        query: null
      });
      const completion = response({
        key: DataServiceType.Stats,
        response: responseData.response
      });

      // When
      actions$ = hot('-a', { a: action });
      spyOn(statisticsService, 'stats').and.returnValue(of(responseData));

      // Then
      expectObservable(effects.responseStatsData$).toBe('-b', {
        b: completion
      });
    });
  });
});
