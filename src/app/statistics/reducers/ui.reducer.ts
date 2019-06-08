import { createReducer, on } from '@ngrx/store';
import { fromUIActions } from './../actions/index.action';

export interface UIState {
  chartsView: {
    selectedChart: string;
    selectedChartTimeSpan: string;
  };
}

const initialState: UIState = {
  chartsView: {
    selectedChart: 'transactions-per-second',
    selectedChartTimeSpan: '30days'
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromUIActions.updateUIState,
    (state, { key, value }) => {

      if (state[key]) {

        return {
          ...state,
          [key]: {
            ...state[key],
            ...value
          }
        };
      }

      return state;
    }
  )
);
