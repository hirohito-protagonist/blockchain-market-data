import {
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { CoreState, fromLayoutReducer } from './store';


const getCoreState = createFeatureSelector('core');
const getLayoutState = createSelector(getCoreState, (s: CoreState) => s.layout);
export const getActiveLayoutView = createSelector(getLayoutState, (s: fromLayoutReducer.LayoutState) => s.activeView);
