import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromMarketPricesAction } from './../actions/index.action';
import { map, switchMap, tap } from 'rxjs/operators';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

@Injectable()
export class MarketPricesEffects {

  @Effect()
  requestData$: Observable<Action> = this.action$.pipe(
    ofType(fromMarketPricesAction.ActionTypes.FetchData),
    map(() => new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Ticker,
      query: null
    }))
  );

  constructor(private action$: Actions) {}
}
