import { Action } from '@ngrx/store';
import { fromDataServiceAction } from './../actions/index.action';

type DataServiceResponse = any;
type DataServiceQuery = any;

interface DataServiceNode<R, Q> {
  isFetching: boolean;
  response: R;
  lastUpdate: number;
  query: Q;
}


export interface DataServiceState {
  [key: string]: DataServiceNode<DataServiceResponse, DataServiceQuery>;
}

const initialState: DataServiceState = {
  [fromDataServiceAction.DataServiceType.Ticker]: {
    isFetching: false,
    response: null,
    lastUpdate: 0,
    query: null
  },
  [fromDataServiceAction.DataServiceType.ToBTC]: {
    isFetching: false,
    response: null,
    lastUpdate: 0,
    query: null
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
