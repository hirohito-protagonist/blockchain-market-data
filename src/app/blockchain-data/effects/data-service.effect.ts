import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromDataServiceAction, fromBlockchainDataAction } from './../actions/index.action';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DataServiceType, DataResponseType, ChartsQuery, BTCQuery } from './../blockchain-data.type';
import { ExchangeRatesService } from './../services/exchange-rates.service';
import { StatisticsService } from './../services/statistics.service';

@Injectable()
export class DataServiceEffects {

  @Effect()
  requestData$: Observable<Action> = this.action$.pipe(
    ofType(fromBlockchainDataAction.ActionTypes.FetchData),
    map((action: fromBlockchainDataAction.FetchData) => new fromDataServiceAction.Request({
      key: action.payload.key,
      query: action.payload.query
    }))
  );

  @Effect()
  responseToBTCData$: Observable<Action> = this.responseData$(
    DataServiceType.ToBTC,
    (action: fromBlockchainDataAction.FetchData) => this.exchangeRatesService.tobtc(
      (action.payload.query as BTCQuery).currency,
      (action.payload.query as BTCQuery).value as number
    ).pipe(
      map((response: number) => [action, response]),
      catchError(() => of([action, 0]))
    )
  );

  @Effect()
  responseTcikerData$: Observable<Action> = this.responseData$(
    DataServiceType.Ticker,
    (action: fromBlockchainDataAction.FetchData) =>
    this.exchangeRatesService.ticker().pipe(
      map((response) => [action, (response as DataResponseType)]),
      catchError(() => of([action, 0]))
    )
  );

  @Effect()
  responseStatsData$: Observable<Action> = this.responseData$(
    DataServiceType.Stats,
    (action: fromBlockchainDataAction.FetchData) =>
    this.statisticsService.stats().pipe(
      map((response) => [action, (response as DataResponseType)]),
      catchError(() => of([action, 0]))
    )
  );

  @Effect()
  responseChartsData$: Observable<Action> = this.responseData$(
    DataServiceType.Charts,
    (action: fromBlockchainDataAction.FetchData) =>
    this.statisticsService.charts(action.payload.query as ChartsQuery).pipe(
      map((response) => [action, (response as DataResponseType)]),
      catchError(() => of([action, 0]))
    )
  );

  constructor(
    private action$: Actions,
    private exchangeRatesService: ExchangeRatesService,
    private statisticsService: StatisticsService
  ) {}

  responseData$(serviceType: DataServiceType, fn: Function): Observable<Action> {
    return this.action$.pipe(
      ofType(fromBlockchainDataAction.ActionTypes.FetchData),
      filter((action: fromBlockchainDataAction.FetchData) => action.payload.key === serviceType),
      switchMap((action: fromBlockchainDataAction.FetchData) => fn(action)),
      map(([action, response]) => {
        return new fromDataServiceAction.Response({
          key: (action as fromBlockchainDataAction.FetchData).payload.key,
          response: (response as DataResponseType)
        });
      })
    );
  }
}
