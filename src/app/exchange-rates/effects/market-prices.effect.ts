import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromMarketPricesAction } from './../actions/index.action';
import { map } from 'rxjs/operators';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

@Injectable()
export class MarketPricesEffects {


  requestData$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(fromMarketPricesAction.fetchData.type),
    map(() => fromBlockchainDataAction.fetchData({
      key: DataServiceType.Ticker,
      query: null
    }))
  ));

  constructor(private action$: Actions) {}
}
