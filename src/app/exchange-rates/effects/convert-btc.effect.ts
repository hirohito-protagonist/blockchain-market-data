import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromConvertBtcAction } from './../actions/index.action';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

@Injectable()
export class ConvertBtcEffects {

  @Effect()
  convertToBTC$: Observable<Action> = this.action$.pipe(
    ofType(fromConvertBtcAction.convert.type),
    map((action: fromConvertBtcAction.ActionType) => fromBlockchainDataAction.fetchData({
      key: DataServiceType.ToBTC,
      query: action.convert
    }))
  );

  constructor(private action$: Actions) {}
}
