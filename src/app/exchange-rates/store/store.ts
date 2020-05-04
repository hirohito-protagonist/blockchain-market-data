import {
  combineReducers,
  Action
} from '@ngrx/store';


import * as fromUIReducer from './ui.reducer';

export interface ExchangeRatesState {
  version: string;
  ui: fromUIReducer.UIState;
}

export function featureVersion() {
  return '1.0.0';
}

export function reducers(state: ExchangeRatesState | undefined, action: Action) {
  return combineReducers({
    version: featureVersion,
    ui: fromUIReducer.reducer
  })(state, action);
}
