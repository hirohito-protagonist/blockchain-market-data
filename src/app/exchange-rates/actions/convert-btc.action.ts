import { Action } from '@ngrx/store';
import { ConvertToBTC } from './../exchange-rates.type';

export enum ActionTypes {
  Convert = '[Exchange Rates Feature] Convert to BTC'
}

export class Convert implements Action {
  readonly type = ActionTypes.Convert;

  constructor(public payload: ConvertToBTC) {}
}

export type ActionType = Convert;
