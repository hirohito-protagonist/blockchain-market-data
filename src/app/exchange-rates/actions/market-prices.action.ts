import { Action } from '@ngrx/store';

export enum ActionTypes {
  FetchData = '[Exchange rates] Market prices fetch data'
}


export class FetchData implements Action {
  readonly type = ActionTypes.FetchData;
}

export type ActionType = FetchData;
