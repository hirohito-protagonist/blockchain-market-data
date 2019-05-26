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
    ofType(fromBlockchainDataAction.fetchData.type),
    map((action: fromBlockchainDataAction.ActionType) => fromDataServiceAction.request({
      key: action.key,
      query: action.query
    }))
  );

  @Effect()
  responseToBTCData$: Observable<Action> = this.responseData$(
    DataServiceType.ToBTC,
    (action: fromBlockchainDataAction.ActionType) => this.exchangeRatesService.tobtc(
      (action.query as BTCQuery).currency,
      (action.query as BTCQuery).value as number
    ).pipe(
      map((response: number) => [action, response]),
      catchError(() => of([action, 0]))
    )
  );

  @Effect()
  responseTcikerData$: Observable<Action> = this.responseData$(
    DataServiceType.Ticker,
    (action: fromBlockchainDataAction.ActionType) =>
    this.exchangeRatesService.ticker().pipe(
      map((response) => [action, (response as DataResponseType)]),
      catchError(() => of([action, 0]))
    )
  );

  @Effect()
  responseStatsData$: Observable<Action> = this.responseData$(
    DataServiceType.Stats,
    (action: fromBlockchainDataAction.ActionType) =>
    this.statisticsService.stats().pipe(
      map((response) => [action, (response as DataResponseType)]),
      catchError(() => of([action, 0]))
    )
  );

  @Effect()
  responseChartsData$: Observable<Action> = this.responseData$(
    DataServiceType.Charts,
    (action: fromBlockchainDataAction.ActionType) =>
    this.statisticsService.charts(action.query as ChartsQuery).pipe(
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
      ofType(fromBlockchainDataAction.fetchData.type),
      filter((action: fromBlockchainDataAction.ActionType) => action.key === serviceType),
      switchMap((action: fromBlockchainDataAction.ActionType) => fn(action)),
      map(([action, response]) => {
        return fromDataServiceAction.response({
          key: (action as fromBlockchainDataAction.ActionType).key,
          response: (response as DataResponseType)
        });
      })
    );
  }
}
