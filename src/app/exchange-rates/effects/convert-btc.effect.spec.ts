import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';

import { ConvertBtcEffects } from './convert-btc.effect';
import { fromConvertBtcAction } from './../actions/index.action';
import { fromBlockchainDataAction, DataServiceType } from './../../blockchain-data/blockchain-data.module';

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

    const action = new fromConvertBtcAction.Convert({ currency: 'USD', value: 200 });
    const completion = new fromBlockchainDataAction.FetchData({
      key: DataServiceType.ToBTC,
      query: {
        currency: 'USD',
        value: 200
      }
    });

    actions$.stream = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.convertToBTC$).toBeObservable(expected);
  });
});
