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

export function reducer(state: UIState = initialState, action: fromUIActions.ActionType): UIState {

  switch (action.type) {

    case fromUIActions.ActionTypes.UpdateUI: {

      const { key, value } = action.payload;

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

    default:
      return state;
  }
}
