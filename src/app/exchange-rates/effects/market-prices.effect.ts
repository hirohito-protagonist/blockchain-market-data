import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromMarketPricesAction } from './../actions/index.action';
import { map, switchMap, tap } from 'rxjs/operators';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

@Injectable()
export class MarketPricesEffects {

  @Effect()
  requestData$: Observable<Action> = this.action$.pipe(
    ofType(fromMarketPricesAction.fetchData.type),
    map(() => fromBlockchainDataAction.fetchData({
      payload: {
        key: DataServiceType.Ticker,
        query: null
      }
    }))
  );

  constructor(private action$: Actions) {}
}
