import { Action } from '@ngrx/store';
import { fromLayoutReducer } from './../reducers/index.reducer';

export enum LayoutActions {
  ChangeView = '[Core Layout] Change View'
}

export class ChangeView implements Action {
  readonly type = LayoutActions.ChangeView;
  constructor(public payload: fromLayoutReducer.LayoutView) {}
}

export type LayoutActionType = ChangeView;

