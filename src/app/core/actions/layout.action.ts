import { Action } from '@ngrx/store';
import { fromLayoutReducer } from './../reducers/index.reducer';

export enum ActionTypes {
  ChangeView = '[Core Feature] Change Layout View'
}

export class ChangeView implements Action {
  readonly type = ActionTypes.ChangeView;
  constructor(public payload: fromLayoutReducer.LayoutView) {}
}

export type ActionType = ChangeView;

