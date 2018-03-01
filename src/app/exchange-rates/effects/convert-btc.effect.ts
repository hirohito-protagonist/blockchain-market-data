import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fromConvertBtcAction } from './../actions/index.action';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExchangeRatesService } from './../../shared/blockchain-api/blockchain-api.module';
import { fromBlockchainDataAction, DataServiceType } from './../../blockchain-data/blockchain-data.module';

@Injectable()
export class ConvertBtcEffects {

  @Effect()
  convertToBTC$: Observable<Action> = this.action$.pipe(
    ofType(fromConvertBtcAction.ActionTypes.Convert),
    map((action: fromConvertBtcAction.Convert) => new fromBlockchainDataAction.FetchData({
      key: DataServiceType.ToBTC,
      query: action.payload
    }))
  );

  constructor(private action$: Actions, private exchangeRatesService: ExchangeRatesService) {}
}
