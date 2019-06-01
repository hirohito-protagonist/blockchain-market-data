import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jest-marbles';

import { Observable, of } from 'rxjs';

import { DataServiceEffects } from './data-service.effect';
import { ExchangeRatesService } from './../services/exchange-rates.service';
import { StatisticsService } from './../services/statistics.service';
import { fromBlockchainDataAction, fromDataServiceAction } from './../actions/index.action';
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

    // Given
    const action = fromBlockchainDataAction.fetchData({
      key: DataServiceType.Ticker, query: null
    });
    const completion = fromDataServiceAction.request({
      key: DataServiceType.Ticker,
      query: null
    });

    // When
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    // Then
    expect(effects.requestData$).toBeObservable(expected);
  });

  it('should request convert to BTC on fetch data action and then dispatch response action', () => {

    // Given
    const responseData = {
      status: 200,
      response: 0.12331
    };
    const action = fromBlockchainDataAction.fetchData({
      key: DataServiceType.ToBTC,
      query: {
        currency: 'USD',
        value: 200
      }
    });
    const completion = fromDataServiceAction.response({
      key: DataServiceType.ToBTC,
      response: responseData.response
    });

    // When
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    spyOn(exchangeRatesService, 'tobtc').and.returnValue(of(responseData));

    // Then
    expect(effects.responseToBTCData$).toBeObservable(expected);
  });

  it('should request market data prices on fetch data action and then dispatch response action', () => {

    // Given
    const responseData = {
      status: 200,
      response: {}
    };
    const action = fromBlockchainDataAction.fetchData({
      key: DataServiceType.Ticker,
      query: null
    });
    const completion = fromDataServiceAction.response({
      key: DataServiceType.Ticker,
      response: responseData.response
    });

    // When
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    spyOn(exchangeRatesService, 'ticker').and.returnValue(of(responseData));

    // Then
    expect(effects.responseTcikerData$).toBeObservable(expected);
  });

  it('should request stats information on fetch data action and then dispatch response action', () => {

    // Given
    const responseData = {
      status: 200,
      response: {}
    };
    const action = fromBlockchainDataAction.fetchData({
      key: DataServiceType.Stats,
      query: null
    });
    const completion = fromDataServiceAction.response({
      key: DataServiceType.Stats,
      response: responseData.response
    });

    // When
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    spyOn(statisticsService, 'stats').and.returnValue(of(responseData));

    // Then
    expect(effects.responseStatsData$).toBeObservable(expected);
  });
});
