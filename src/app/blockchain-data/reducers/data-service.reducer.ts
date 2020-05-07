import { createReducer, on } from '@ngrx/store';
import { request, response } from './../store/actions';
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

export const reducer = createReducer(
  initialState,
  on(
    request,
    (state, { key, query }) => {

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
  ),
  on(
    response,
    (state, { key, response }) => {

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
  )
);
