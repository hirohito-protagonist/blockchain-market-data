import { createReducer, on } from '@ngrx/store';
import { changeView } from './actions';

export enum LayoutView {
  ExchangeRate = 'Exchange rate',
  Statistic = 'Statistic'
}

export interface LayoutState {
  activeView: LayoutView;
}


const initialState: LayoutState = {
  activeView: LayoutView.ExchangeRate
};

export const reducer = createReducer(
  initialState,
  on(
    changeView,
    (state, { view }) => {

      return {
        ...state,
        activeView: view
      };
    }
  )
);
