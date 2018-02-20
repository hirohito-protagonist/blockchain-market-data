import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';

import { ConvertBtcEffects } from './convert-btc.effect';
import { ExchangeRatesService, TickerResponse } from './../../shared/blockchain-api/blockchain-api.module';
import { fromConvertBtcAction } from './../actions/index.action';

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


describe('ConvertBtcEffects', () => {

  let effects: ConvertBtcEffects;
  let actions$: TestActions;
  let service: ExchangeRatesService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        ConvertBtcEffects,
        ExchangeRatesService,
        { provide: Actions, useFactory: getActions }
      ]
    });

    effects = TestBed.get(ConvertBtcEffects);
    actions$ = TestBed.get(Actions);
    service = TestBed.get(ExchangeRatesService);
  });

  it('should create request action on convert event', () => {

    const action = new fromConvertBtcAction.Convert({ currency: 'USD', value: 200 });
    const completion = new fromConvertBtcAction.Request();

    actions$.stream = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.requestData$).toBeObservable(expected);
  });

  it('should create response action and fetch data on convert event', () => {

    const responseData = 123;
    const action = new fromConvertBtcAction.Convert({ currency: 'USD', value: 200 });
    const completion = new fromConvertBtcAction.Response(123);

    actions$.stream = hot('-a', { a: action });
    const response = cold('-a|', { a: responseData });
    const expected = cold('--b', { b: completion });
    spyOn(service, 'tobtc').and.returnValue(response);

    expect(effects.responseData$).toBeObservable(expected);
  });
});
