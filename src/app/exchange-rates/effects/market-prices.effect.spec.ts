import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';

import { MarketPricesEffects } from './market-prices.effect';
import { ExchangeRatesService, TickerResponse } from './../../shared/blockchain-api/blockchain-api.module';
import { fromMarketPricesAction } from './../actions/index.action';

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


describe('MarketPricesEffects', () => {

  let effects: MarketPricesEffects;
  let actions$: TestActions;
  let service: ExchangeRatesService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        MarketPricesEffects,
        ExchangeRatesService,
        { provide: Actions, useFactory: getActions }
      ]
    });

    effects = TestBed.get(MarketPricesEffects);
    actions$ = TestBed.get(Actions);
    service = TestBed.get(ExchangeRatesService);
  });

  it('should create request action on fetch data event', () => {

    const action = new fromMarketPricesAction.FetchData();
    const completion = new fromMarketPricesAction.Request();

    actions$.stream = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.requestData$).toBeObservable(expected);
  });

  it('should create response action and fetch data on fetch data event', () => {

    spyOn(Date, 'now').and.returnValue(123);
    const responseData = {} as TickerResponse;
    const action = new fromMarketPricesAction.FetchData();
    const completion = new fromMarketPricesAction.Response(responseData);

    actions$.stream = hot('-a', { a: action });
    const response = cold('-a|', { a: responseData });
    const expected = cold('--b', { b: completion });
    spyOn(service, 'ticker').and.returnValue(response);

    expect(effects.responseData$).toBeObservable(expected);
  });
});
