import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { Observable } from 'rxjs';

import { Effects } from './effects';
import { convert, fetchData } from './../store/actions';
import { fetchData as fd, DataServiceType } from '@bmd/blockchain-data';

describe('Effects', () => {

  describe('convertToBTC$', () => {

    let effects: Effects;
    let actions$: Observable<any>;

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [ HttpClientModule ],
        providers: [
          Effects,
          provideMockActions(() => actions$)
        ]
      });

      effects = TestBed.get(Effects);
      actions$ = TestBed.get(Actions);
    });

    it('should dispatch action to fetch data on convert action', () => {

      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        // Given
        const action = convert({
          convert: { currency: 'USD', value: 200 }
        });
        const completion = fd({
          key: DataServiceType.ToBTC,
          query: {
            currency: 'USD',
            value: 200
          }
        });

        // When
        actions$ = hot('-a', { a: action });

        // Then
        expectObservable(effects.convertToBTC$).toBe('-b', {
          b: completion
        });
      });
    });
  });


  describe('requestData$', () => {

    let effects: Effects;
    let actions$: Observable<any>;

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [ HttpClientModule ],
        providers: [
          Effects,
          provideMockActions(() => actions$)
        ]
      });

      effects = TestBed.get(Effects);
      actions$ = TestBed.get(Actions);
    });

    it('should dispatch action on fetch market prices data action', () => {

      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        // Given
        const action = fetchData();
        const completion = fd({
          key: DataServiceType.Ticker,
          query: null
        });

        // When
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        // Then
        expectObservable(effects.requestData$).toBe('-b', {
          b: completion
        });
      });
    });
  });
});
