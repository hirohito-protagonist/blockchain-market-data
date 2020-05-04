import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jest-marbles';

import { Observable } from 'rxjs';

import { ConvertBtcEffects } from './convert-btc.effect';
import { convert } from './../store/actions';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';


describe('ConvertBtcEffects', () => {

  let effects: ConvertBtcEffects;
  let actions$: Observable<any>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        ConvertBtcEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ConvertBtcEffects);
    actions$ = TestBed.get(Actions);
  });

  it('should dispatch action to fetch data on convert action', () => {

    // Given
    const action = convert({
      convert: { currency: 'USD', value: 200 }
    });
    const completion = fromBlockchainDataAction.fetchData({
      key: DataServiceType.ToBTC,
      query: {
        currency: 'USD',
        value: 200
      }
    });

    // When
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    // Then
    expect(effects.convertToBTC$).toBeObservable(expected);
  });
});
