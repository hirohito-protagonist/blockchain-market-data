import { Action } from '@ngrx/store';

export enum ActionTypes {
  UpdateUI = '[Statistics UI] update ui state'
}

export class UpdateUIState implements Action {

  readonly type = ActionTypes.UpdateUI;
  constructor(public payload: { key: string; value: any }) {}
}

export type ActionType = UpdateUIState;
