import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { convert } from './../store/actions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';

@Injectable()
export class ConvertBtcEffects {


  convertToBTC$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(convert),
    map((action) => fromBlockchainDataAction.fetchData({
      key: DataServiceType.ToBTC,
      query: action.convert
    }))
  ));

  constructor(private action$: Actions) {}
}
