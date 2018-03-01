import { Action } from '@ngrx/store';
import { ConvertToBTC } from './../reducers/index.reducer';

export enum ActionTypes {
  Convert = '[Exchange rates] Convert to BTC'
}

export class Convert implements Action {
  readonly type = ActionTypes.Convert;

  constructor(public payload: ConvertToBTC) {}
}

export type ActionType = Convert;
