import { Action } from '@ngrx/store';

export enum ActionTypes {
  FetchData = '[Blockchain data] fetch data'
}

export class FetchData implements Action {
  readonly type = ActionTypes.FetchData;

  constructor(public payload: { key: string; query: any; }) {}
}


export type ActionType = FetchData;
