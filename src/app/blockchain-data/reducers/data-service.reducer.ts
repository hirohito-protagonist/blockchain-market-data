import { Action } from '@ngrx/store';
import { fromDataServiceAction } from './../actions/index.action';
import { DataServiceType, QueryType, DataResponseType } from './../blockchain-data.type';

interface DataServiceNode<R, Q> {
  isFetching: boolean;
  response: R;
  lastUpdate: number;
  query: Q;
}

export interface DataServiceState {
  [key: string]: DataServiceNode<DataResponseType, QueryType>;
}

const initialState: DataServiceState = {
  [DataServiceType.Ticker]: {
    isFetching: false,
    response: null,
    lastUpdate: 0,
    query: null
  },
  [DataServiceType.ToBTC]: {
    isFetching: false,
    response: null,
    lastUpdate: 0,
    query: null
  },
  [DataServiceType.Stats]: {
    isFetching: false,
    response: null,
    lastUpdate: 0,
    query: null
  },
  [DataServiceType.Charts]: {
    isFetching: false,
    response: null,
    lastUpdate: 0,
    query: null
  }
};


export function reducer(state: DataServiceState = initialState, action: fromDataServiceAction.ActionType): DataServiceState {

  switch (action.type) {

    case fromDataServiceAction.request.type: {
      const { key, query } = action;

      if (state[key]) {

        return {
          ...state,
          [key]: {
            ...state[key],
            isFetching: true,
            response: null,
            query
          }
        };
      }
      return state;
    }

    case fromDataServiceAction.response.type: {

      const { key, response } = action;

      if (state[key]) {

        return {
          ...state,
          [key]: {
            ...state[key],
            isFetching: false,
            response,
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

