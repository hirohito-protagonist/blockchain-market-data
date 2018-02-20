import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromConvertBtcAction } from './../actions/index.action';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExchangeRatesService } from './../../shared/blockchain-api/blockchain-api.module';

@Injectable()
export class ConvertBtcEffects {

  @Effect()
  requestData$: Observable<Action> = this.action$.pipe(
    ofType(fromConvertBtcAction.ActionTypes.Convert),
    map(() => new fromConvertBtcAction.Request())
  );

  @Effect()
  responseData$: Observable<Action> = this.action$.pipe(
    ofType(fromConvertBtcAction.ActionTypes.Convert),
    switchMap((action: fromConvertBtcAction.Convert) =>
      this.exchangeRatesService.tobtc(action.payload.currency, (action.payload.value as number)).pipe(
        catchError(() => of(0))
      )
    ),
    map((response: number) => new fromConvertBtcAction.Response(response))
  );

  constructor(private action$: Actions, private exchangeRatesService: ExchangeRatesService) {}
}
