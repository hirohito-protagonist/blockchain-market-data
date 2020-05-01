import {
  StoreModule,
  combineReducers,
  Action
} from '@ngrx/store';
import * as fromUIReducer from './ui.reducer';

export interface StatisticsState {
  version: string;
  ui: fromUIReducer.UIState;
}

export function featureVersion() {
  return '1.0.0';
}

function reducers(state: StatisticsState | undefined, action: Action) {
  return combineReducers({
    version: featureVersion,
    ui: fromUIReducer.reducer
  })(state, action);
}

export const Store = StoreModule.forFeature('statistics', reducers);
