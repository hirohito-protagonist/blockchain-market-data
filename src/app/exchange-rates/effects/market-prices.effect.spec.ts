import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jest-marbles';

import { Observable, EMPTY } from 'rxjs';

import { MarketPricesEffects } from './market-prices.effect';
import { fromMarketPricesAction } from './../actions/index.action';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

export class TestActions extends Actions {

  constructor() {
    super(EMPTY);
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

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        MarketPricesEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    effects = TestBed.get(MarketPricesEffects);
    actions$ = TestBed.get(Actions);
  });

  it('should dispatch action on fetch market prices data action', () => {

    const action = fromMarketPricesAction.fetchData();
    const completion = fromBlockchainDataAction.fetchData({
      payload: {
        key: DataServiceType.Ticker,
        query: null
      }
    });

    actions$.stream = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.requestData$).toBeObservable(expected);
  });
});
