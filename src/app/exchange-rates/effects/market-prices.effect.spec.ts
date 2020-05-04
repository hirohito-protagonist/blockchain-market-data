import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jest-marbles';

import { Observable } from 'rxjs';

import { MarketPricesEffects } from './market-prices.effect';
import { fetchData } from './../store/actions';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';


describe('MarketPricesEffects', () => {

  let effects: MarketPricesEffects;
  let actions$: Observable<any>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        MarketPricesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MarketPricesEffects);
    actions$ = TestBed.get(Actions);
  });

  it('should dispatch action on fetch market prices data action', () => {

    // Given
    const action = fetchData();
    const completion = fromBlockchainDataAction.fetchData({
      key: DataServiceType.Ticker,
      query: null
    });

    // When
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    // Then
    expect(effects.requestData$).toBeObservable(expected);
  });
});
