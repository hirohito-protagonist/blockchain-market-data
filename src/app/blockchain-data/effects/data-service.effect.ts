import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromDataServiceAction, fromBlockchainDataAction } from './../actions/index.action';
import { map, filter, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExchangeRatesService } from './../../shared/blockchain-api/blockchain-api.module';

@Injectable()
export class DataServiceEffects {

  @Effect()
  requestData$: Observable<Action> = this.action$.pipe(
    ofType(fromBlockchainDataAction.ActionTypes.FetchData),
    map((action: fromBlockchainDataAction.FetchData) => new fromDataServiceAction.Request({ key: action.payload.key }))
  );


  @Effect()
  responseToBTCData$: Observable<Action> = this.action$.pipe(
    ofType(fromBlockchainDataAction.ActionTypes.FetchData),
    filter((action: fromBlockchainDataAction.FetchData) => action.payload.key === 'tobtc'),
    switchMap((action: fromBlockchainDataAction.FetchData) =>
      this.exchangeRatesService.tobtc(action.payload.query.currency, (action.payload.query.value as number)).pipe(
        map((response: number) => of([action, response])),
        catchError(() => of([action, 0]))
      )
    ),
    map((result) => new fromDataServiceAction.Response({ key: result[0].payload.key, response: result[1] }))
  );

  constructor(private action$: Actions, private exchangeRatesService: ExchangeRatesService) {}
}
