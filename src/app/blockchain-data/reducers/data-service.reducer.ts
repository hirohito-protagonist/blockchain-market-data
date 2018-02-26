import { Action } from '@ngrx/store';
import { fromDataServiceAction } from './../actions/index.action';


export interface DataServiceState {
  [key: string]: {
    isFetching: boolean;
    response: any;
    lastUpdate: number;
  };
}

const initialState: DataServiceState = {
  ticker: {
    isFetching: false,
    response: null,
    lastUpdate: 0
  },
  tobtc: {
    isFetching: false,
    response: null,
    lastUpdate: 0
  }
};


export function reducer(state: DataServiceState = initialState, action: fromDataServiceAction.ActionType): DataServiceState {

  switch (action.type) {

    case fromDataServiceAction.ActionTypes.Request: {
      const node = action.payload.key;

      if (state[node]) {

        return {
          ...state,
          [node]: {
            ...state[node],
            isFetching: true,
            response: null
          }
        };
      }
      return state;
    }

    case fromDataServiceAction.ActionTypes.Response: {

      const node = action.payload.key;

      if (state[node]) {

        return {
          ...state,
          [node]: {
            ...state[node],
            isFetching: false,
            response: action.payload.response,
            lastUpdate: Date.now()
          }
        };
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
