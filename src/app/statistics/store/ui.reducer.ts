import { createReducer, on } from '@ngrx/store';
import { updateUIState } from './actions';

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
    updateUIState,
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
