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

});
