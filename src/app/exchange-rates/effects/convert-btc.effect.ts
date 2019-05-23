import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromConvertBtcAction } from './../actions/index.action';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

@Injectable()
export class ConvertBtcEffects {

  @Effect()
  convertToBTC$: Observable<Action> = this.action$.pipe(
    ofType(fromConvertBtcAction.ActionTypes.Convert),
    map((action: fromConvertBtcAction.Convert) => fromBlockchainDataAction.fetchData({
      payload: {
        key: DataServiceType.ToBTC,
        query: action.payload
      }
    }))
  );

  constructor(private action$: Actions) {}
}
