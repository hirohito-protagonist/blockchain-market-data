import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jest-marbles';

import { Observable, EMPTY } from 'rxjs';

import { ConvertBtcEffects } from './convert-btc.effect';
import { fromConvertBtcAction } from './../actions/index.action';
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


describe('ConvertBtcEffects', () => {

  let effects: ConvertBtcEffects;
  let actions$: TestActions;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        ConvertBtcEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    effects = TestBed.get(ConvertBtcEffects);
    actions$ = TestBed.get(Actions);
  });

  it('should dispatch action to fetch data on convert action', () => {

    // Given
    const action = fromConvertBtcAction.convert({
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
    actions$.stream = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    // Then
    expect(effects.convertToBTC$).toBeObservable(expected);
  });
});
