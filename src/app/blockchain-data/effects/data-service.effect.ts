import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromDataServiceAction, fromBlockchainDataAction } from './../actions/index.action';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DataServiceType, DataResponseType, ChartsQuery, BTCQuery } from './../blockchain-data.type';
import { ExchangeRatesService } from './../services/exchange-rates.service';
import { StatisticsService } from './../services/statistics.service';

@Injectable()
export class DataServiceEffects {

  requestData$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(fromBlockchainDataAction.fetchData),
    map((action) => fromDataServiceAction.request({
      key: action.key,
      query: action.query
    }))
  ));


  responseToBTCData$: Observable<Action> = createEffect(() => this.responseData$(
    DataServiceType.ToBTC,
    (action) => this.exchangeRatesService.tobtc(
      (action.query as BTCQuery).currency,
      (action.query as BTCQuery).value as number
    ).pipe(
      map((response) => [action, response]),
      catchError(() => of([action, 0]))
    )
  ));


  responseTcikerData$: Observable<Action> = createEffect(() => this.responseData$(
    DataServiceType.Ticker,
    (action) =>
    this.exchangeRatesService.ticker().pipe(
      map((response) => [action, response]),
      catchError(() => of([action, 0]))
    )
  ));


  responseStatsData$: Observable<Action> = createEffect(() => this.responseData$(
    DataServiceType.Stats,
    (action) =>
    this.statisticsService.stats().pipe(
      map((response) => [action, response]),
      catchError(() => of([action, 0]))
    )
  ));


  responseChartsData$: Observable<Action> = createEffect(() => this.responseData$(
    DataServiceType.Charts,
    (action) =>
    this.statisticsService.charts(action.query as ChartsQuery).pipe(
      map((response) => [action, response]),
      catchError(() => of([action, 0]))
    )
  ));

  constructor(
    private action$: Actions,
    private exchangeRatesService: ExchangeRatesService,
    private statisticsService: StatisticsService
  ) {}

  responseData$(serviceType: DataServiceType, fn: Function): Observable<Action> {
    return this.action$.pipe(
      ofType(fromBlockchainDataAction.fetchData),
      filter((action) => action.key === serviceType),
      switchMap((action) => fn(action)),
      filter(([action, response]) => response.status === 200),
      map(([action, response]) => {
        return fromDataServiceAction.response({
          key: action.key,
          response: (response.response as DataResponseType)
        });
      })
    );
  }
}
