import {
  combineReducers,
  Action,
  StoreModule
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Effects } from './effects';

import * as fromUIReducer from './ui.reducer';

export interface ExchangeRatesState {
  version: string;
  ui: fromUIReducer.UIState;
}

export function featureVersion() {
  return '1.0.0';
}

function reducers(state: ExchangeRatesState | undefined, action: Action) {
  return combineReducers({
    version: featureVersion,
    ui: fromUIReducer.reducer
  })(state, action);
}


export const Store = [
  StoreModule.forFeature('exchangeRates', reducers),
  EffectsModule.forFeature([Effects])
];
