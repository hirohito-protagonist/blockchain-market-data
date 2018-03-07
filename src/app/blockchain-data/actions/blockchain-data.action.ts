import { Action } from '@ngrx/store';
import { DataServiceType, QueryType } from './../blockchain-data.type';

export enum ActionTypes {
  FetchData = '[Blockchain data] fetch data'
}

export class FetchData implements Action {
  readonly type = ActionTypes.FetchData;

  constructor(public payload: { key: DataServiceType; query: QueryType; }) {}
}


export type ActionType = FetchData;
