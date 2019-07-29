import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';
import * as fromLayoutReducer from './layout.reducer';

export {
  fromLayoutReducer
};


export interface CoreState {
  layout: fromLayoutReducer.LayoutState;
  version: string;
}

export function featureVersion() {
  return '1.0.0';
}

export function reducers(state: CoreState | undefined, action: Action) {
  return combineReducers({
    version: featureVersion,
    layout: fromLayoutReducer.reducer
  })(state, action);
}


const getCoreState = createFeatureSelector('core');
const getLayoutState = createSelector(getCoreState, (s: CoreState) => s.layout);
export const getActiveLayoutView = createSelector(getLayoutState, (s: fromLayoutReducer.LayoutState) => s.activeView);
