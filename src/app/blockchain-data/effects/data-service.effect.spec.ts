import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jest-marbles';

import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';

import { DataServiceEffects } from './data-service.effect';
import { ExchangeRatesService } from './../services/exchange-rates.service';
import { StatisticsService } from './../services/statistics.service';
import { fromBlockchainDataAction, fromDataServiceAction } from './../actions/index.action';
import { DataServiceType } from '../blockchain-data.type';

export class TestActions extends Actions {

  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}



export function getActions() {
  return new TestActions();
}


describe('DataServiceEffects', () => {

  let effects: DataServiceEffects;
  let actions$: TestActions;
  let exchangeRatesService: ExchangeRatesService;
  let statisticsService: StatisticsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        DataServiceEffects,
        ExchangeRatesService,
        StatisticsService,
        { provide: Actions, useFactory: getActions }
      ]
    });

    effects = TestBed.get(DataServiceEffects);
    actions$ = TestBed.get(Actions);
    exchangeRatesService = TestBed.get(ExchangeRatesService);
    statisticsService = TestBed.get(StatisticsService);
  });

  it('should dispatch request data action on fetch action', () => {

    const action = new fromBlockchainDataAction.FetchData({ key: DataServiceType.Ticker, query: null });
    const completion = new fromDataServiceAction.Request({
      key: DataServiceType.Ticker,
      query: null
    });

    actions$.stream = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.requestData$).toBeObservable(expected);
  });

  it('should request convert to BTC on fetch data action and then dispatch response action', () => {

    const responseData = 0.12331;
    const action = new fromBlockchainDataAction.FetchData({
      key: DataServiceType.ToBTC,
      query: {
        currency: 'USD',
        value: 200
      }
    });
    const completion = new fromDataServiceAction.Response({
      key: DataServiceType.ToBTC,
      response: responseData
    });

    actions$.stream = hot('-a', { a: action });
    const response = cold('-a|', { a: responseData });
    const expected = cold('--b', { b: completion });
    spyOn(exchangeRatesService, 'tobtc').and.returnValue(response);

    expect(effects.responseToBTCData$).toBeObservable(expected);
  });

  it('should request market data prices on fetch data action and then dispatch response action', () => {

    const responseData = {};
    const action = new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Ticker,
      query: null
    });
    const completion = new fromDataServiceAction.Response({
      key: DataServiceType.Ticker,
      response: responseData
    });

    actions$.stream = hot('-a', { a: action });
    const response = cold('-a|', { a: responseData });
    const expected = cold('--b', { b: completion });
    spyOn(exchangeRatesService, 'ticker').and.returnValue(response);

    expect(effects.responseTcikerData$).toBeObservable(expected);
  });

  it('should request stats information on fetch data action and then dispatch response action', () => {

    const responseData = {};
    const action = new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Stats,
      query: null
    });
    const completion = new fromDataServiceAction.Response({
      key: DataServiceType.Stats,
      response: responseData
    });

    actions$.stream = hot('-a', { a: action });
    const response = cold('-a|', { a: responseData });
    const expected = cold('--b', { b: completion });
    spyOn(statisticsService, 'stats').and.returnValue(response);

    expect(effects.responseStatsData$).toBeObservable(expected);
  });
});
