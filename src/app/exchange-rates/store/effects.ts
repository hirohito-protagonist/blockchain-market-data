import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { convert, fetchData } from './../store/actions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

@Injectable()
export class Effects {


  convertToBTC$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(convert),
    map((action) => fromBlockchainDataAction.fetchData({
      key: DataServiceType.ToBTC,
      query: action.convert
    }))
  ));

  requestData$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(fetchData),
    map(() => fromBlockchainDataAction.fetchData({
      key: DataServiceType.Ticker,
      query: null
    }))
  ));

  constructor(private action$: Actions) {}
}
