import { DatePipe } from '@angular/common';
import {
  createFeatureSelector,
  createSelector,
  combineReducers,
  Action
} from '@ngrx/store';

import { fromBlockchainDataSelectors, DataServiceType } from '@bmd/blockchain-data';
import { StatisticsInfo } from './../statistics.type';
import * as fromUIReducer from './ui.reducer';

export interface StatisticsState {
  version: string;
  ui: fromUIReducer.UIState;
}

export function featureVersion() {
  return '1.0.0';
}

export function store(state: StatisticsState | undefined, action: Action) {
  return combineReducers({
    version: featureVersion,
    ui: fromUIReducer.reducer
  })(state, action);
}
