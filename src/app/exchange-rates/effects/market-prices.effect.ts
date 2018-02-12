import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromMarketPricesAction } from './../actions/index.action';
import { map, switchMap, tap } from 'rxjs/operators';
import { ExchangeRatesService, TickerResponse } from './../../shared/blockchain-api/blockchain-api.module';

@Injectable()
export class MarketPricesEffects {

  @Effect()
  requestData$: Observable<Action> = this.action$.pipe(
    ofType(fromMarketPricesAction.MarketPricesActions.FetchData),
    map(() => new fromMarketPricesAction.Request())
  );

  @Effect()
  responseData$: Observable<Action> = this.action$.pipe(
    ofType(fromMarketPricesAction.MarketPricesActions.FetchData),
    switchMap(() => this.exchangeRatesService.ticker()),
    map((response: TickerResponse) => new fromMarketPricesAction.Response(response))
  );

  constructor(private action$: Actions, private exchangeRatesService: ExchangeRatesService) {}
}
