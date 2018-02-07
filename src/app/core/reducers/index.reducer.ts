import { createSelector, createFeatureSelector} from '@ngrx/store';
import * as fromLayoutReducer from './layout.reducer';

export {
  fromLayoutReducer
};

export interface CoreState {
  layout: fromLayoutReducer.LayoutState;
}

export const reducers = {
  layout: fromLayoutReducer.reducer
};


const getCoreState = createFeatureSelector('core');
const getLayoutState = createSelector(getCoreState, (s: CoreState) => s.layout);
export const getActiveLayoutView = createSelector(getLayoutState, (s: fromLayoutReducer.LayoutState) => s.activeView);
